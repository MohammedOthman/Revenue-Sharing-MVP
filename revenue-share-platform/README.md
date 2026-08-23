# Reven — Partner Revenue OS

This folder contains the complete self-hosted Reven product. It does not depend
on an external application backend.

- `frontend/` — React, Vite, and the Reven design system.
- `backend/` — Express API, secure session authentication, PostgreSQL migrations,
  organization isolation, role-based writes, and immutable audit history.

The production Express process serves both the API and the compiled frontend on
one origin. The legacy prototype backend has been removed.

## Product loop

Register a partner-revenue claim, decide the attribution of record, evaluate
payout eligibility with an explanation, record the first-payout milestone, and
retain a finance-reviewable history of every change. Phase 1 records and
prepares payouts; it does not move money.

## Local development

Create a PostgreSQL database, copy `backend/.env.example` to `backend/.env`, and
set a valid `DATABASE_URL` plus the four initial administrator values. Then run:

```bash
npm ci --prefix backend
npm ci --prefix frontend
npm run dev --prefix backend
npm run dev --prefix frontend
```

The API listens on port 5000 in the example environment. Vite listens on port
3000 and proxies `/api` to the API. For a complete containerized environment,
run `docker compose up --build` from the repository root.

## Authentication and tenancy

The first server start creates one organization and administrator only when the
database has no users. Authentication uses a random opaque session token in a
Secure, HttpOnly, SameSite cookie. Only a SHA-256 hash of that token is stored.
Every product record is scoped to the signed-in user's organization.

Roles:

- `admin` — read, create, update, and delete.
- `operator` — read, create, and update.
- `viewer` — read only.

## Build and deployment

From the repository root:

```bash
npm run build
npm start
```

The root scripts are compatible with CranL's automatic Node builder. The root
`Dockerfile` provides the preferred reproducible deployment artifact. Both bind
to `PORT` and expose:

- `/api/health/live` — process liveness.
- `/api/health/ready` — database readiness.

See `DEPLOYMENT.md` at the repository root for environment variables, backups,
monitoring, smoke tests, and rollback.

## Verification

```bash
npm test --prefix backend
npm run check --prefix backend
npm run build --prefix frontend
npm audit --omit=dev --audit-level=high --prefix backend
npm audit --omit=dev --audit-level=high --prefix frontend
```

CI runs these checks and builds the production image on every pull request and
push to `main`.

## Technology

React 18, Vite 8, React Router 7, Express 5, PostgreSQL, structured Pino logs,
transactional schema migrations, Helmet security headers, compression, and
request/authentication rate limiting.
