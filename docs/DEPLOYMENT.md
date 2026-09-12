# Reven operations

Reven is the TanStack Start app in `app/`. Postgres is the store.

## Run

```bash
cd app
npm ci
npm run dev
npm run typecheck
npm test
```

Locally the database is PGLite. Set `DATABASE_URL` for Neon (or any Postgres) in production.

## Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres URL. Required in production. |
| `VITE_AUTH_ENABLED` | `false` in the live preview (single operator). Production with a database URL must keep auth on. |

There is no Docker image, no `/api/health/*`, and no `ADMIN_EMAIL` bootstrap. Those belonged to the retired Express app.

## Product lifecycle (smoke)

1. Register a claim (or send the sample webhook).
2. Preflight runs from the `webhook_capture` recipe.
3. A named operator accepts or rejects attribution.
4. Billing submits a collected fact. Eligibility is computed.
5. Finance records a payout **milestone**. Nothing moves.
6. Period close composes and issues partner statements.

## Backups

- Daily managed Postgres backups, 14-day retention.
- On-demand backup before a schema change.
- Roll back application code independently. Migrations in this cut are additive.
