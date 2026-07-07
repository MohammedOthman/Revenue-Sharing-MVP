# Plan 003: Neutralize CSV formula injection in settlement export

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d11e200..HEAD -- revenue-share-platform/backend/src/controllers/revenue.controller.js`
> If the file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as a
> STOP condition.

## Status

- **Priority**: P0
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `d11e200`, 2026-07-07

## Why this matters

The settlement CSV export escapes only quotes, commas, and newlines. It does not
neutralize leading formula characters (`=`, `+`, `-`, `@`, and tab/CR). User-
controlled fields — partner name, contract title, and free-text notes — are
written straight into cells. When an admin opens the exported statement in Excel
or Google Sheets, a cell beginning with `=` is evaluated as a formula. This is CSV
(formula) injection: a crafted partner name or note can run a formula on the
reviewer's machine (data exfiltration via `HYPERLINK`/web queries, or command
execution through legacy DDE) the moment the statement is opened. The export is
literally the artifact handed to partners and finance staff, so the blast radius
is exactly the trusted reviewers.

## Current state

`revenue-share-platform/backend/src/controllers/revenue.controller.js`, the export helper and its use:
```js
const csvEscape = (value) => {
  const s = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
// ...
const lines = rows.map((r) => [
  r.partner_name, r.contract_title, /* dates */, r.total_revenue,
  r.share_percentage, r.share_amount, r.status, /* paid_at */, r.notes,
].map(csvEscape).join(','));
```
`partner_name`, `contract_title`, and `notes` are user-controlled free text.
`csvEscape` quotes only when the value contains `"`, `,`, or `\n` — a value like
`=HYPERLINK(...)` contains none of those and is emitted unescaped and formula-active.

Convention: the export is a single controller function using a local `csvEscape`
helper; keep the fix local to this file.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `cd revenue-share-platform/backend && npm ci` | exit 0 |
| Run API tests | `cd revenue-share-platform/backend && TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test` | all pass |

Disposable Postgres `revenue_share_test` required (suite truncates it). No DB = STOP.

## Scope

**In scope**:
- `revenue-share-platform/backend/src/controllers/revenue.controller.js` (the `csvEscape` helper only)
- `revenue-share-platform/backend/test/api.test.js` (add a case)

**Out of scope**:
- The query/filtering logic in the export or `getAllRevenueShares`.
- Any other CSV/serialization code (there is none elsewhere).
- The response headers — the `Content-Disposition: attachment` is already correct.

## Git workflow

- Branch: `advisor/003-csv-injection`
- One commit; imperative message matching repo style.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Harden `csvEscape` to neutralize formula-triggering cells

Update `csvEscape` so that any value whose first character is one of `= + - @`
(or a tab/carriage-return) is prefixed with a single apostrophe `'` — the standard
spreadsheet defense that forces the cell to be treated as text — and is then
always quoted. Preserve the existing quote-doubling for `"`, `,`, `\n`. Target shape:
```js
const csvEscape = (value) => {
  let s = value === null || value === undefined ? '' : String(value);
  // Prevent spreadsheet formula injection: force risky leading chars to text.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  if (/[",\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
};
```

**Verify**: `grep -n "formula injection" revenue-share-platform/backend/src/controllers/revenue.controller.js` → matches the new comment.

### Step 2: Add a regression test

In `api.test.js`, add a test that creates a partner whose name begins with `=`,
a contract and a revenue record for it, then fetches the export and asserts the
dangerous cell was neutralized:
```js
test('CSV export neutralizes formula-injection in user text', { skip: !dbAvailable }, async () => {
  const p = await api('POST', '/api/partners', {
    token: state.adminToken,
    body: { name: '=HYPERLINK("http://evil.example")', email: 'csv@test.example' },
  });
  assert.equal(p.status, 201);
  const c = await api('POST', '/api/contracts', {
    token: state.adminToken,
    body: { partnerId: p.data.partner.id, title: 'CSV Test', startDate: '2026-01-01', revenueSharePercentage: 10, status: 'active' },
  });
  await api('POST', '/api/revenue', {
    token: state.adminToken,
    body: { contractId: c.data.contract.id, periodStart: '2026-09-01', periodEnd: '2026-09-30', totalRevenue: 1000 },
  });
  const res = await fetch(`${baseUrl}/api/revenue/export`, { headers: { Authorization: `Bearer ${state.adminToken}` } });
  const csv = await res.text();
  assert.ok(!/(^|,)=HYPERLINK/.test(csv), 'raw formula cell must not appear');
  assert.ok(csv.includes("'=HYPERLINK") || csv.includes("\"'=HYPERLINK"), 'formula cell must be text-escaped');
});
```
(If plan 001 landed, `state.adminToken` is required for the writes, as shown.)

**Verify**: full API suite passes with the new test.

## Test plan

- New test: a partner name starting with `=` must not appear as an active formula
  cell in the export; it must be apostrophe-prefixed. Model on the existing
  `settlement CSV export returns correct rows` test (same fetch-and-parse shape).
- Verification: `npm test` → all pass including the new case.

## Done criteria

ALL must hold:

- [ ] `csvEscape` prefixes values starting with `= + - @ \t \r` with `'` and quotes them.
- [ ] The new regression test passes and asserts the raw `=HYPERLINK` cell is absent.
- [ ] Existing `settlement CSV export returns correct rows` test still passes (numeric cells like `1500` are unaffected — leading digits are not risky chars).
- [ ] No files outside scope modified (`git status`).
- [ ] `plans/README.md` row for 003 updated.

## STOP conditions

Stop and report if:

- The `csvEscape` excerpt does not match "Current state" (drift — the export may
  have been refactored).
- No test Postgres is available.
- The existing export test starts failing on a numeric/normal value (means the
  new escaping is too aggressive — e.g. quoting a negative number `-5` breaks a
  consumer). Note: a leading `-` on a numeric amount WILL now be text-prefixed;
  if any consumer parses those columns as numbers this is a behavior change —
  report it rather than silently shipping.

## Maintenance notes

- Negative numeric values (e.g. a future refund/clawback column) will be
  apostrophe-prefixed by this rule. That is safe for display but changes how a
  downstream parser reads them; if a numeric-import consumer is added later,
  apply the prefix only to the known free-text columns rather than universally.
- Reviewer should confirm the apostrophe defense is applied before, not after,
  the quote-wrapping (order matters: the `'` must be inside the quotes).
