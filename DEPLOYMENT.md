# Reven production operations

Reven is one web service backed by PostgreSQL. The Express process serves both
the API and the compiled React application, so browser requests and secure
session cookies remain same-origin.

## Required environment

| Variable | Required | Purpose |
|---|---:|---|
| `DATABASE_URL` | Yes | PostgreSQL connection URL. Keep the database in the same region as the app. |
| `NODE_ENV` | Yes | Set to `production`. |
| `PORT` | Yes | CranL uses `3000`. |
| `DB_SSL` | Yes | `disable` for a private same-region URL; `require` for a public TLS URL. |
| `ADMIN_EMAIL` | First boot | Initial administrator email. |
| `ADMIN_PASSWORD` | First boot | Initial password, at least 14 characters. |
| `ADMIN_NAME` | First boot | Initial administrator display name. |
| `ORGANIZATION_NAME` | First boot | Initial tenant name. |

The four administrator values are consumed only when the user table is empty.
Changing them later does not reset the administrator. The first administrator
is required to replace the bootstrap password on first sign-in.

## Product lifecycle

The production workflow is deliberately claim-centric:

1. Capture the partner, program, and governing agreement.
2. Register a claim and its supporting ecosystem touchpoints.
3. Accept or reject attribution of record with an explicit percentage.
4. Record the closed-won, invoiced, collected, or recognized revenue evidence.
5. Evaluate payout readiness on the server against attribution and that
   confirmed revenue evidence.
6. Draft a partner statement, route exceptions through disputes, and record a
   payout only after eligibility. Recording a payout is an auditable ledger
   milestone; Reven does not move money.

Viewers have read-only access. Operators can capture records and perform
attribution and eligibility reviews. Administrators additionally manage team
access and record payout milestones.

## Release process

1. Run `npm ci` in both `backend/` and `frontend/`.
2. Run the backend test and check scripts.
3. Build the frontend.
4. Build the root Dockerfile or let CranL's Node builder run the root scripts.
5. Deploy and wait for `/api/health/ready` to return HTTP 200.
6. Sign in and smoke-test partner creation, claim creation, claim updates, and audit history.

Database migrations run transactionally at process startup under a PostgreSQL
advisory lock. Multiple instances can start without racing the migration.
The HTTP process exposes liveness and the login interface while the database is
initializing, retries the connection with bounded exponential backoff, and
keeps all state-changing APIs unavailable until initialization succeeds.

## Backups and recovery

- Enable daily managed PostgreSQL backups and retain at least 14 days.
- Take an on-demand backup before a schema migration or large import.
- Test a restore into a non-production database quarterly.
- Roll back application code to the previous known-good commit. Database
  migrations in this release are additive and remain backward compatible.

## Monitoring

- Liveness: `/api/health/live`
- Readiness: `/api/health/ready`
- Logs: structured JSON on stdout, with cookie and authorization values redacted.
- Alert on repeated readiness failures, HTTP 5xx responses, restart loops, and
  sustained login rate limiting.
