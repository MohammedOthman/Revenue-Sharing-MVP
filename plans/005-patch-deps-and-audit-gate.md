# Plan 005: Patch vulnerable dependencies and add an npm-audit CI gate

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d11e200..HEAD -- revenue-share-platform/backend/package.json revenue-share-platform/frontend/package.json .github/workflows/platform-ci.yml`
> If any in-scope file changed, re-run the audits below before proceeding; the
> advisory set may differ from what this plan recorded.

## Status

- **Priority**: P0
- **Effort**: S
- **Risk**: LOW (patch/minor bumps only; no major upgrades in this plan)
- **Depends on**: none
- **Category**: dependencies / dx
- **Planned at**: commit `d11e200`, 2026-07-07

## Why this matters

`npm audit` reports known-vulnerable packages in both apps: the frontend pulls in
vulnerable **axios** and **form-data** (both HIGH), plus esbuild/vite and
react-router advisories; the backend pulls in a vulnerable **qs** (DoS) via
express/body-parser. axios is the app's only HTTP client and carries auth tokens;
the react-router open-redirect and axios prototype-pollution gadgets are reachable
in a browser app. There is no automated gate, so new advisories accumulate
silently — the project's own checklist flags an `npm audit` CI gate as an unmet
item. This plan applies the non-breaking fixes and adds the gate so regressions
are caught pre-merge.

## Current state

- `revenue-share-platform/frontend/package.json` — `axios ^1.6.2`, `react-router-dom ^6.20.1`, `vite ^5.0.8`.
- `revenue-share-platform/backend/package.json` — `express ^4.18.2` (pulls `qs`/`body-parser`/`brace-expansion`).
- `.github/workflows/platform-ci.yml` — jobs `backend` (tests w/ Postgres) and `frontend` (build). No audit step.

Recorded advisory snapshot at plan time (re-verify — advisories move):
- frontend: 7 vulns (3 high, 3 moderate, 1 low); `npm audit fix` resolves
  axios/form-data/react-router without a major bump. A clean vite fix needs a major
  (`--force`) bump — OUT OF SCOPE here.
- backend: 4 moderate (qs DoS, brace-expansion) via express 4; `npm audit fix`
  patches without leaving express 4.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Backend audit | `cd revenue-share-platform/backend && npm audit` | lists advisories (informational) |
| Backend fix | `cd revenue-share-platform/backend && npm audit fix` | updates lockfile, no `--force` |
| Backend tests | `cd revenue-share-platform/backend && TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test` | all pass |
| Frontend audit | `cd revenue-share-platform/frontend && npm audit` | lists advisories |
| Frontend fix | `cd revenue-share-platform/frontend && npm audit fix` | updates lockfile, no `--force` |
| Frontend build | `cd revenue-share-platform/frontend && npm run build` | exit 0, `dist/` produced |

## Scope

**In scope**:
- `revenue-share-platform/backend/package.json` + `package-lock.json` (via `npm audit fix`)
- `revenue-share-platform/frontend/package.json` + `package-lock.json` (via `npm audit fix`)
- `.github/workflows/platform-ci.yml` (add audit step)

**Out of scope**:
- Any `npm audit fix --force` or major-version upgrade (vite 5→8, express 4→5).
  If the only remaining fix for a HIGH advisory requires `--force`, STOP and report
  — that is a judgment call for the maintainer, not this plan.
- Application source code — do not change app code to accommodate a bump; if a
  patched dep breaks the build or tests, STOP and report.

## Steps

### Step 1: Patch backend, verify tests

Run `npm audit fix` in `backend/`. Then run the API test suite. All 20+ tests must
still pass. If `npm audit` still shows HIGH/critical advisories that only `--force`
would resolve, record them and STOP (do not force).

**Verify**: `cd revenue-share-platform/backend && npm audit --audit-level=high` → no high/critical remaining (moderates acceptable and noted).

### Step 2: Patch frontend, verify build

Run `npm audit fix` in `frontend/`. Then `npm run build`. The build must succeed
and produce `dist/`. If the browser E2E harness is available, running it is a bonus
but not required by this plan.

**Verify**: `cd revenue-share-platform/frontend && npm audit --audit-level=high` → no high/critical remaining; `npm run build` → exit 0.

### Step 3: Add an audit gate to CI

In `.github/workflows/platform-ci.yml`, add an `npm audit --audit-level=high` step
to both the `backend` and `frontend` jobs, after `npm ci` and before/after the
existing test/build step. Use `--audit-level=high` so the build fails only on
high/critical (moderates don't block), matching the checklist's intent. Keep it a
real gate (non-zero exit fails the job) — do not append `|| true`.

Example step:
```yaml
      - name: Audit dependencies
        run: npm audit --audit-level=high
```

**Verify**: `grep -n "npm audit" .github/workflows/platform-ci.yml` → present in both jobs.

## Test plan

- No new unit tests; this is a dependency + CI change.
- Regression gates: backend API suite passes post-bump (Step 1); frontend
  production build succeeds post-bump (Step 2).
- The new CI step is itself the ongoing test: it will fail future PRs that
  introduce a high/critical advisory.

## Done criteria

ALL must hold:

- [ ] `cd revenue-share-platform/backend && npm audit --audit-level=high` → 0 high/critical.
- [ ] `cd revenue-share-platform/frontend && npm audit --audit-level=high` → 0 high/critical.
- [ ] Backend API suite passes; frontend `npm run build` exits 0.
- [ ] `.github/workflows/platform-ci.yml` runs `npm audit --audit-level=high` in both jobs (no `|| true`).
- [ ] Only `package.json`, `package-lock.json` (both apps), and the workflow file changed (`git status`).
- [ ] `plans/README.md` row for 005 updated.

## STOP conditions

Stop and report if:

- The only remaining fix for a HIGH/critical advisory requires `npm audit fix --force`
  or a major-version bump — report the advisory and the required major, don't force it.
- `npm audit fix` changes a dependency that breaks the backend tests or frontend
  build — report which dep and the failure; do not patch app code to compensate.
- The advisory set at execution time differs materially from the snapshot above
  (expected over time) — proceed using the live `npm audit` output, and note the
  difference in your report.

## Maintenance notes

- Major upgrades deferred here: **vite 5→8** (frontend dev/build; the esbuild
  advisory is dev-server-only) and **express 4→5** (GA, but a real migration).
  Each deserves its own plan with a build/E2E gate.
- `--audit-level=high` is deliberately lenient on moderates to avoid blocking on
  transitive noise; tighten to `moderate` once the tree is clean if the team wants.
- Reviewer should confirm the CI step is a hard gate (no `continue-on-error`,
  no `|| true`) — a soft audit step provides false assurance.
