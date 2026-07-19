# Plan 002: Close revenue-share money-integrity holes (update bypass + double-payout race)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d11e200..HEAD -- revenue-share-platform/backend/src/controllers/revenue.controller.js revenue-share-platform/backend/src/models/revenue.model.js`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Why this matters

The create path enforces that a revenue share's amount is computed server-side
from the contract's percentage and rejects mismatches — the core integrity
guarantee of the product. Two holes bypass it:

1. **Update bypass**: `PUT /api/revenue/:id` has no validation rules and its model
   allowlist includes `total_revenue`, `share_percentage`, and `share_amount`, so
   after creating a valid record anyone can `PUT {shareAmount: 999999}` and set an
   arbitrary payout unrelated to the contract terms.
2. **Double-payout race**: `process-payment` reads the record, checks
   `status === 'paid'` in JS, then updates in a separate query with no row lock or
   guarded WHERE. Two concurrent requests both pass the check and both mark the
   record paid — a double-payout signal.

This plan makes the update path re-derive/validate the amount the same way create
does, and makes payment processing atomic.

## Current state

- `revenue-share-platform/backend/src/controllers/revenue.controller.js`:
  - Create recomputes and validates (lines ~19-40): `computedAmount = round2((Number(totalRevenue) * sharePercentage) / 100)` and rejects if a supplied `shareAmount` differs by > 0.05.
  - `updateRevenueShareController` (lines ~96-111) does `const updates = toSnakeCaseKeys(req.body)` then `updateRevenueShare(id, updates)` — no recomputation, no validation.
  - `processPaymentController` (lines ~113-135):
    ```js
    const existing = await findRevenueShareById(id);
    if (!existing) return res.status(404)...
    if (existing.status === 'paid') return res.status(400)...
    const revenueShare = await updateRevenueShare(id, { status: 'paid', paid_at: new Date() });
    ```
- `revenue-share-platform/backend/src/models/revenue.model.js`:
  - `updateRevenueShare` (lines ~73-95) allowlist: `['total_revenue', 'share_percentage', 'share_amount', 'status', 'paid_at', 'notes']`, builds a dynamic UPDATE, returns the row.
  - `createRevenueShare` and `findRevenueShareById` show the query style to match (parameterized `$1..$n`, `pool.query`, return `result.rows[0]`).

Convention: raw parameterized SQL via `pool` (no ORM); money math uses a local
`round2` helper; controllers return `{ error }` JSON with the right status.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `cd revenue-share-platform/backend && npm ci` | exit 0 |
| Run API tests | `cd revenue-share-platform/backend && TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test` | all pass |

A disposable Postgres `revenue_share_test` DB must be reachable (suite truncates
it). No DB = STOP condition.

## Scope

**In scope**:
- `revenue-share-platform/backend/src/controllers/revenue.controller.js`
- `revenue-share-platform/backend/src/models/revenue.model.js`
- `revenue-share-platform/backend/test/api.test.js` (add cases)

**Out of scope**:
- The create path — it is already correct; do not change its behavior.
- Any other controller/model/route.
- The float-vs-decimal money representation (a separate deferred finding) — keep
  using the existing `round2` helper here; do NOT switch to a decimal library in
  this plan.

## Git workflow

- Branch: `advisor/002-revenue-integrity`
- Commit per logical unit (update-guard, then payment-atomicity); imperative messages matching repo style.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Make payment processing atomic

In `revenue.model.js`, add a dedicated guarded update that only transitions a
non-paid row to paid, returning the row only if it actually transitioned:
```js
export const markRevenueSharePaid = async (id) => {
  const result = await pool.query(
    `UPDATE revenue_shares SET status = 'paid', paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND status <> 'paid' RETURNING *`,
    [id]
  );
  return result.rows[0] || null;
};
```
In `revenue.controller.js` `processPaymentController`, replace the read-check-update
sequence: still 404 if the record does not exist, but perform the transition with
`markRevenueSharePaid(id)`; if it returns `null`, the row was already paid →
respond `400 { error: 'This revenue share has already been paid' }`. The atomic
`WHERE status <> 'paid'` makes concurrent requests safe (only one UPDATE affects a row).

**Verify**: `grep -n "status <> 'paid'" revenue-share-platform/backend/src/models/revenue.model.js` → matches.

### Step 2: Enforce amount consistency on update

Extract the create path's derivation into a shared helper (top of
`revenue.controller.js`), then apply it in the update path. When an update touches
any of `totalRevenue`/`total_revenue`, `sharePercentage`/`share_percentage`, or
`shareAmount`/`share_amount`, recompute the expected amount from the effective
total × percentage (falling back to the existing record's values for fields not
being changed) and reject a supplied amount that differs by more than 0.05, mirroring
create. Simplest correct approach: after `toSnakeCaseKeys`, load the current row
(`findRevenueShareById`), compute `effectiveTotal`/`effectivePct`/`expectedAmount`,
and if `share_amount` is present and inconsistent return `400`; otherwise force
`updates.share_amount = expectedAmount` so the stored amount always matches.

**Verify**: reading the code, an update that changes `total_revenue` without a
matching `share_amount` results in a recomputed `share_amount` (covered by the test below).

### Step 3: Add tests

In `api.test.js`, after the existing revenue tests, add:
```js
test('revenue update cannot set an inconsistent share amount', { skip: !dbAvailable }, async () => {
  const create = await api('POST', '/api/revenue', {
    token: state.adminToken,
    body: { contractId: state.contractId, periodStart: '2026-08-01', periodEnd: '2026-08-31', totalRevenue: 20000 },
  });
  assert.equal(create.status, 201);
  const id = create.data.revenueShare.id;

  const bad = await api('PUT', `/api/revenue/${id}`, {
    token: state.adminToken, body: { shareAmount: 999999 },
  });
  assert.equal(bad.status, 400);

  const good = await api('PUT', `/api/revenue/${id}`, {
    token: state.adminToken, body: { totalRevenue: 40000 },
  });
  assert.equal(good.status, 200);
  assert.equal(Number(good.data.revenueShare.share_amount), 6000); // 15% of 40000
});
```
(The contract behind `state.contractId` has a 15% share.) If plan 001 has already
landed, use `state.adminToken` as shown — mutations require admin.

**Verify**: full API suite passes with the new test.

## Test plan

- New test asserting: inconsistent `shareAmount` on update → 400; changing
  `totalRevenue` recomputes `share_amount` server-side. Model on the existing
  `revenue share amount is computed server-side from contract terms` test.
- The existing `payment processing is idempotent-guarded` test already covers the
  sequential double-pay 400; it must still pass against the new atomic path.
- Verification: `npm test` → all pass including the added case.

## Done criteria

ALL must hold:

- [ ] `grep -n "markRevenueSharePaid" revenue-share-platform/backend/src/models/revenue.model.js revenue-share-platform/backend/src/controllers/revenue.controller.js` shows the atomic helper defined and used.
- [ ] `processPaymentController` no longer decides paid/not-paid from a separate read then unconditional update.
- [ ] Update path rejects an inconsistent `shareAmount` (new test returns 400) and recomputes on `totalRevenue` change (returns 6000).
- [ ] `npm test` passes with the two behaviors covered.
- [ ] No files outside scope modified (`git status`).
- [ ] `plans/README.md` row for 002 updated.

## STOP conditions

Stop and report if:

- The create-path excerpt or `updateRevenueShare` allowlist does not match "Current state" (drift).
- No test Postgres is available.
- Enforcing consistency on update breaks a legitimate existing test that expected
  a free-form amount update — report which and stop.

## Maintenance notes

- The `> 0.05` tolerance is inherited from the create path; it exists because money
  is currently JS floats against DECIMAL columns. A separate deferred finding
  proposes moving to exact decimal math — when that lands, this tolerance and the
  `round2` helper should be revisited together so create and update stay identical.
- `getRevenueByPeriod` interpolates a whitelisted `TO_CHAR` format string (safe
  today, but the one query that abandons parameterization); if you touch it, switch
  to a mapped constant rather than a template literal.
- Reviewer should confirm the atomic UPDATE's `RETURNING *` row is what the response
  serializes (so the client still gets `paid_at`).
