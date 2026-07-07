# Plan 001: Enforce role-based authorization on all mutating routes

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d11e200..HEAD -- revenue-share-platform/backend/src/routes revenue-share-platform/backend/src/middleware/auth.js`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P0
- **Effort**: S
- **Risk**: MED (tightening access can break a client who relied on `user` accounts doing everything; see maintenance notes)
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `d11e200`, 2026-07-07

## Why this matters

Every domain route mounts only `authMiddleware` (authentication) and no
`roleMiddleware` (authorization). Any account with a valid JWT — including a
teammate invited as a plain `user` — can process payouts, delete revenue
records, rewrite contract terms, and delete partners. For a B2B revenue-sharing
platform that is full financial tampering with only a login. The role model
already exists (`roleMiddleware` is implemented and used on the admin user-management
routes); it is simply not applied to the money-handling routes. This plan applies
it, establishing that **writes to financial data require an `admin`**, while reads
stay available to any authenticated user.

## Current state

- `revenue-share-platform/backend/src/middleware/auth.js` — auth + role middleware. `roleMiddleware` exists (lines 32-39) and works:
  ```js
  export const roleMiddleware = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
      next();
    };
  };
  ```
- `revenue-share-platform/backend/src/routes/revenue.routes.js` — mounts `router.use(authMiddleware)` at line 14, then POST/PUT/DELETE and `POST /:id/process-payment` with **no** role check.
- Same gap in `partner.routes.js`, `contract.routes.js`, `kpi.routes.js`, `legalDocument.routes.js` — each does `router.use(authMiddleware)` then unguarded mutations.
- `auth.routes.js` is the exemplar of the correct pattern (line 26-28): `roleMiddleware('admin')` is already used there. Match it.

Convention: routes import middleware from `../middleware/auth.js`; validation
chains are listed left-to-right in the route definition (e.g.
`router.post('/', revenueRules, handleValidation, controller)`). Insert
`roleMiddleware('admin')` immediately after `authMiddleware`/`router.use` and
before the validation rules.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `cd revenue-share-platform/backend && npm ci` | exit 0 |
| Run API tests | `cd revenue-share-platform/backend && TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test` | all pass |

A local Postgres must be reachable at that URL with a disposable
`revenue_share_test` database (the suite truncates it). If none is available,
that is a STOP condition — report it; do not skip the tests.

## Scope

**In scope** (the only files you should modify):
- `revenue-share-platform/backend/src/routes/revenue.routes.js`
- `revenue-share-platform/backend/src/routes/partner.routes.js`
- `revenue-share-platform/backend/src/routes/contract.routes.js`
- `revenue-share-platform/backend/src/routes/kpi.routes.js`
- `revenue-share-platform/backend/src/routes/legalDocument.routes.js`
- `revenue-share-platform/backend/test/api.test.js` (add coverage)

**Out of scope** (do NOT touch):
- `auth.routes.js` — already correct; changing it risks the admin flows.
- `middleware/auth.js` — `roleMiddleware` is correct as-is; do not modify it.
- Any controller or model — this is a routing-layer change only.
- Dashboard routes (`dashboard.routes.js`) — read-only endpoints, leave open to all authenticated users.

## Git workflow

- Branch: `advisor/001-role-authz`
- Commit message style (match repo, e.g. `git log --oneline -3`): imperative, capitalized, no type prefix.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Guard mutating routes on the five domain routers

For each of the five route files, import `roleMiddleware` alongside `authMiddleware`
and add `roleMiddleware('admin')` to every `POST`, `PUT`, `PATCH`, and `DELETE`
route. Leave every `GET` untouched (reads stay available to all authenticated users).

Example — `revenue.routes.js` mutations become:
```js
router.post('/', roleMiddleware('admin'), revenueRules, handleValidation, createRevenueShareController);
router.put('/:id', roleMiddleware('admin'), idParamRule, handleValidation, updateRevenueShareController);
router.post('/:id/process-payment', roleMiddleware('admin'), idParamRule, handleValidation, processPaymentController);
router.delete('/:id', roleMiddleware('admin'), idParamRule, handleValidation, deleteRevenueShareController);
```
Apply the equivalent to the POST/PUT/DELETE routes in `partner.routes.js`,
`contract.routes.js`, `kpi.routes.js` (including `PATCH /:id/value`), and
`legalDocument.routes.js`. Update each file's import line to include
`roleMiddleware`.

**Verify**: `grep -rn "roleMiddleware('admin')" revenue-share-platform/backend/src/routes/` → shows the guard on every mutating route across all five files plus the existing auth routes.

### Step 2: Add authorization tests

In `revenue-share-platform/backend/test/api.test.js`, the suite already creates a
non-admin token (`state.userToken`, set in the "admin can create users" test).
Add a test near the end asserting a `user`-role token is refused on representative
mutations and still allowed on reads:
```js
test('non-admin users cannot mutate financial data but can read', { skip: !dbAvailable }, async () => {
  const pay = await api('POST', `/api/revenue/${state.revenueId}/process-payment`, { token: state.userToken });
  assert.equal(pay.status, 403);
  const del = await api('DELETE', `/api/partners/${state.partnerId}`, { token: state.userToken });
  assert.equal(del.status, 403);
  const create = await api('POST', '/api/contracts', {
    token: state.userToken,
    body: { partnerId: state.partnerId, title: 'x', startDate: '2026-01-01', revenueSharePercentage: 10 },
  });
  assert.equal(create.status, 403);
  const read = await api('GET', '/api/partners', { token: state.userToken });
  assert.equal(read.status, 200);
});
```
Place it before the "unknown API routes return JSON 404" test so shared `state`
IDs are still valid.

**Verify**: the test command above → all pass, including the new test.

## Test plan

- New test: `non-admin users cannot mutate financial data but can read` (above),
  covering 403 on process-payment / delete / create and 200 on a GET.
- Model it on the existing `admin can create users; role from body is ignored`
  test, which already demonstrates using `state.userToken`.
- Verification: full API suite passes with one added test (21 total).

## Done criteria

ALL must hold:

- [ ] `grep -rn "roleMiddleware" revenue-share-platform/backend/src/routes/` shows `roleMiddleware('admin')` on every POST/PUT/PATCH/DELETE in the five domain route files.
- [ ] `grep -n "router.get" revenue-share-platform/backend/src/routes/revenue.routes.js` confirms GET routes have NO `roleMiddleware`.
- [ ] API test suite passes with the new authorization test present.
- [ ] No files outside the in-scope list are modified (`git status`).
- [ ] `plans/README.md` status row for 001 updated to DONE.

## STOP conditions

Stop and report back (do not improvise) if:

- `roleMiddleware` in `middleware/auth.js` does not match the excerpt above (drift).
- No Postgres is available for the test database — report; do not mark done on unverified code.
- Adding the guard breaks an existing passing test in a way that implies a test
  legitimately expected a non-admin to mutate data — report which test and stop
  (this is a product-policy decision, not an improvisation).

## Maintenance notes

- **Policy choice**: this plan makes financial writes admin-only. If the product
  later needs a middle role (e.g. an "operator" who can record revenue but not
  delete partners), introduce a named role and pass it to `roleMiddleware(...)`
  per route rather than reverting to open access.
- **Related deferred finding**: role values are not validated against an enum on
  register/update (`user.model.js`, `auth.controller.js`). If a typo'd role is
  ever persisted, these guards silently fail closed (403), which is safe — but
  constraining the role set is worth a follow-up.
- **`trust proxy: 1`** (`app.js:28`) is correct for a single reverse proxy; if the
  deployment ever runs with 0 or 2+ proxies, revisit it (affects rate-limit IPs).
- Reviewer should scrutinize that no GET route accidentally gained a role guard
  (would break the dashboard/read flows for non-admins).
