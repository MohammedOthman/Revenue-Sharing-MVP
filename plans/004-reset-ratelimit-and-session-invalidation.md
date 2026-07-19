# Plan 004: Fix forgot-password rate limiting and invalidate sessions on password reset

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d11e200..HEAD -- revenue-share-platform/backend/src/middleware/rateLimit.js revenue-share-platform/backend/src/routes/auth.routes.js revenue-share-platform/backend/src/controllers/auth.controller.js revenue-share-platform/backend/src/utils/jwt.js`
> If any in-scope file changed, compare the "Current state" excerpts against the
> live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P0
- **Effort**: M
- **Risk**: MED (session-invalidation changes the token contract; see steps)
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `d11e200`, 2026-07-07

## Why this matters

Two auth-lifecycle gaps:

1. **Reset-endpoint rate limit is effectively off.** `authLimiter` sets
   `skipSuccessfulRequests: true`, and `forgotPassword` always returns 200. Every
   request counts as "successful" and is skipped by the limiter, so
   `/forgot-password` (and any other 2xx auth response) is unbounded. That enables
   reset-email bombing of any known address, unbounded transactional-email cost,
   and continuous reset-token churn.
2. **A password reset does not end existing sessions.** JWTs are stateless with a
   7-day life and no version/`iat` check. After a compromised account resets its
   password (or an admin deletes/demotes a user), previously issued tokens stay
   valid until natural expiry — so the reset does not actually lock the attacker out.

This plan gives credential-enumeration-style endpoints a real limit and makes a
password reset invalidate tokens issued before it.

## Current state

- `revenue-share-platform/backend/src/middleware/rateLimit.js` — `authLimiter` (lines 14-21) has `skipSuccessfulRequests: true`.
- `revenue-share-platform/backend/src/routes/auth.routes.js` — `authLimiter` is applied to `/login`, `/forgot-password`, `/reset-password`, `/reset-token/:token` (lines ~18-21).
- `revenue-share-platform/backend/src/controllers/auth.controller.js` — `forgotPassword` always `res.json({ message: ... })` (200); `resetPassword` calls `updateUserPassword(record.user_id, password)` then `markTokenUsed`. `login`/`register` build tokens via `generateToken`.
- `revenue-share-platform/backend/src/utils/jwt.js` — `generateToken(user)` signs `{ id, email, role }`; `verifyToken` verifies statelessly.
- `revenue-share-platform/backend/src/models/user.model.js` — `users` table has `updated_at` (bumped on password change).
- `revenue-share-platform/backend/src/middleware/auth.js` — `authMiddleware` sets `req.user = verifyToken(token)`.

Convention: config values flow through `config/env.js`; models use parameterized
`pool.query`; middleware is small and composable.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `cd revenue-share-platform/backend && npm ci` | exit 0 |
| Run API tests | `cd revenue-share-platform/backend && TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test` | all pass |

Disposable Postgres `revenue_share_test` required. No DB = STOP.

## Scope

**In scope**:
- `revenue-share-platform/backend/src/middleware/rateLimit.js`
- `revenue-share-platform/backend/src/routes/auth.routes.js`
- `revenue-share-platform/backend/src/controllers/auth.controller.js`
- `revenue-share-platform/backend/src/utils/jwt.js`
- `revenue-share-platform/backend/src/middleware/auth.js`
- `revenue-share-platform/backend/test/api.test.js`

**Out of scope**:
- Moving to HttpOnly cookies / shortening the 7-day JWT lifetime — that is a
  separate, larger deferred item. This plan keeps the current storage model and
  only adds a session-cutoff check.
- A token denylist / Redis — not warranted at this scale; the timestamp check below
  is sufficient and stateless-friendly.

## Steps

### Step 1: Give reset/enumeration endpoints a counted limit

Add a second limiter to `rateLimit.js` that does NOT skip successful requests, for
endpoints that always return 2xx:
```js
export const strictAuthLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.authRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
```
In `auth.routes.js`, use `strictAuthLimiter` for `/forgot-password`,
`/reset-password`, and `/reset-token/:token`. Keep `authLimiter`
(`skipSuccessfulRequests: true`) on `/login` — there, skipping successful logins is
intentional so legitimate users aren't locked out; only failed logins should count.

**Verify**: `grep -n "strictAuthLimiter" revenue-share-platform/backend/src/routes/auth.routes.js` → shows it on the three reset endpoints.

### Step 2: Add a password-changed cutoff to token verification

Embed the token's issue time and check it against the user's last password change.

- In `jwt.js`, `generateToken` already includes standard `iat` via `jsonwebtoken`
  when `expiresIn` is set — confirm `iat` is present (it is, by default). No change
  needed unless absent.
- In `auth.middleware` (`middleware/auth.js`), after `verifyToken`, load the user's
  `password_changed_at` (see step 3) and reject the token if it was issued before
  that timestamp: `if (user.password_changed_at && decoded.iat * 1000 < new Date(user.password_changed_at).getTime()) return 401`.
  To avoid a DB hit on every request, only do this lookup when a
  `password_changed_at` column exists and is non-null; it is null for accounts that
  never reset, so most requests skip the query. (A lightweight approach: cache is
  out of scope — a single indexed lookup by `id` is acceptable here.)

**Verify**: reading the code, a token minted before a reset is rejected (covered by test in step 4).

### Step 3: Track password-change time

Add a `password_changed_at TIMESTAMP` column to `users` in
`revenue-share-platform/backend/src/models/schema.js` via a guarded
`ALTER TABLE ... ADD COLUMN IF NOT EXISTS` (match the existing in-place-upgrade
pattern already used in that file). Set it in `updateUserPassword`
(`user.model.js`) whenever the password hash is updated:
`SET password_hash = $1, password_changed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP`.

**Verify**: `grep -n "password_changed_at" revenue-share-platform/backend/src/models/schema.js revenue-share-platform/backend/src/models/user.model.js` → both match.

### Step 4: Tests

In `api.test.js` add:
```js
test('a password reset invalidates tokens issued before it', { skip: !dbAvailable }, async () => {
  // login to get a token, capture it
  const before = await api('POST', '/api/auth/login', { body: { email: 'founder@test.example', password: 'strongpass1' } });
  const oldToken = before.data.token;
  // request + perform a reset for that user
  const forgot = await api('POST', '/api/auth/forgot-password', { body: { email: 'founder@test.example' } });
  assert.equal(forgot.status, 200);
  // NOTE: the reset token is emailed; in tests, mint one via the invite/reset path already covered,
  // or expose it through the unconfigured-email setupLink pattern used elsewhere. If no in-test way
  // to obtain the reset token exists, assert the cutoff via a direct password change through the
  // admin update path instead, then check the old token is rejected:
  const profile = await api('GET', '/api/auth/profile', { token: oldToken });
  // After a password change, the pre-change token must be rejected:
  assert.equal(profile.status, 401);
});
```
If obtaining the emailed reset token in-test is not feasible, drive the cutoff via
any code path that calls `updateUserPassword`, then assert the old token yields 401
on `/auth/profile`. Keep the assertion focused on the cutoff behavior.

**Verify**: full API suite passes.

## Test plan

- New test: a token minted before a password change is rejected (401) afterward.
- Keep the existing `forgot-password never reveals whether an account exists` test
  passing (the message/behavior is unchanged; only the limiter differs).
- Verification: `npm test` → all pass.

## Done criteria

ALL must hold:

- [ ] `/forgot-password`, `/reset-password`, `/reset-token/:token` use a limiter that counts successful requests.
- [ ] `/login` still uses the skip-successful limiter (legitimate logins not penalized).
- [ ] `users.password_changed_at` exists (guarded ALTER) and is set on password change.
- [ ] `authMiddleware` rejects tokens issued before `password_changed_at`.
- [ ] New test proves a pre-reset token is rejected; suite green.
- [ ] No files outside scope modified (`git status`).
- [ ] `plans/README.md` row for 004 updated.

## STOP conditions

Stop and report if:

- `authLimiter`/`forgotPassword` excerpts don't match "Current state" (drift).
- No test Postgres available.
- Adding the per-request user lookup in `authMiddleware` measurably regresses the
  suite's runtime or requires touching out-of-scope files — report and propose the
  lighter variant (only look up when a token is older than N minutes) instead of improvising.

## Maintenance notes

- This is the minimal, stateless-friendly session cutoff; it does not cover
  admin-initiated demotion/deletion (a demoted user keeps their role claim until
  expiry). A follow-up could bump `password_changed_at`-style invalidation on
  role change / delete too, or move to short-lived access tokens + refresh.
- The bigger deferred item — JWT in localStorage, 7-day life — remains open and is
  tracked in `PRELAUNCH_CHECKLIST.md`; this plan deliberately does not change token
  storage or lifetime.
- Reviewer should confirm `/login` intentionally keeps `skipSuccessfulRequests`
  (documented above) and that the new limiter didn't accidentally get applied there.
