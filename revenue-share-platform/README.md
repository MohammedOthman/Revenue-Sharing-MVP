# Revenue Share Platform

A full-stack B2B platform for managing revenue-sharing partnerships: partners, contracts, revenue shares and payouts, KPIs, and legal documents — with JWT auth, role-based access, and an audit trail on every financial mutation.

## Stack

- **Backend:** Node.js 18+ / Express, **PostgreSQL** (`pg`), JWT auth, express-validator, helmet, rate limiting, audit logging
- **Frontend:** React 18 + Vite, React Router, Axios
- **Packaging:** Docker multi-stage build (API serves the built frontend on one port), docker-compose with Postgres, GitHub Actions CI

## Quick start (Docker — recommended)

```bash
cd revenue-share-platform
echo "JWT_SECRET=$(openssl rand -hex 32)" > .env
docker compose up --build
```

Open http://localhost:5000 — **the first account you register becomes the admin** (after that, self-signup is disabled unless `ALLOW_OPEN_REGISTRATION=true`; admins create further accounts).

Optional demo data:

```bash
docker compose exec app node src/seed.js --demo
```

## Local development

Prerequisites: Node.js 18+, PostgreSQL 14+.

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # set DB_* (or DATABASE_URL) and JWT_SECRET
npm run dev            # starts on :5000, creates/upgrades tables automatically
```

**Frontend**

```bash
cd frontend
npm install
npm run dev            # starts on :3000, proxies /api to :5000
```

Optional seed (admin + sample data): `cd backend && npm run seed:demo`

## Configuration

All backend settings come from environment variables (see `backend/.env.example`):

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Single-URL Postgres connection (managed hosts). Or use `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD` |
| `DB_SSL` | `true` for managed Postgres requiring TLS (Render, Neon, Supabase, …) |
| `JWT_SECRET` | **Required in production.** Generate: `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| `CORS_ORIGINS` | Comma-separated browser origins; empty = same-origin only |
| `ALLOW_OPEN_REGISTRATION` | `true` to allow public self-signup (default off) |
| `APP_BASE_URL` | Public URL used in invite/reset email links |
| `RESEND_API_KEY` / `EMAIL_FROM` | Transactional email; leave unset to get copyable setup links instead |
| `PORT` | API port (default 5000) |

The production server serves the built frontend from `frontend/dist` (override with `FRONTEND_DIST`), so a single process handles both the app and the API.

## Deployment notes

- **Any Docker host:** use the provided `Dockerfile` / `docker-compose.yml`.
- **Render / Railway / Fly / Heroku-style:** deploy the repo, build command `cd frontend && npm ci && npm run build && cd ../backend && npm ci`, start command `node backend/src/server.js` with `FRONTEND_DIST=frontend/dist`, plus a managed Postgres add-on (`DATABASE_URL`, `DB_SSL=true`).
- **Replit:** run backend and frontend build the same way; Replit's Postgres provides `DATABASE_URL`.
- Health probe: `GET /api/health` returns `{status:"ok",database:"up"}` (503 when the DB is unreachable).
- Schema management is automatic and idempotent at boot (tables, constraints, indexes, in-place upgrades).

## Onboarding a client

See `deploy/new-client.md` — the single-tenant provisioning runbook (one
instance + one database per client, < 30 minutes, with first-boot checks,
hand-off checklist, update and decommission procedures).

## Security model

- First registered user = admin (bootstrap); registration then locks down; admins invite teammates from the **Team** page (email invite or copyable setup link; single-use hashed tokens; no one ever knows another user's password).
- Password reset: `Forgot password?` flow with 1-hour single-use tokens; responses never reveal whether an account exists.
- Passwords: bcrypt, minimum 8 characters. Auth endpoints are strictly rate-limited; all input is validated.
- Helmet security headers + CSP, CORS allowlist, 1 MB body limit, JSON-only errors without stack traces in production.
- Every successful mutating request is written to `audit_logs` (user, method, path, entity, redacted payload) and surfaces in the dashboard's Recent Activity.

## API overview

All routes are prefixed with `/api`. Everything except `/auth/register`, `/auth/login`, and `/health` requires `Authorization: Bearer <token>`.

| Area | Routes |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `GET /auth/reset-token/:token`, `GET /auth/profile`, admin: `POST /auth/invite`, `GET/PUT/DELETE /auth/users[/:id]` |
| Partners | `GET/POST /partners`, `GET/PUT/DELETE /partners/:id`, `GET /partners/stats` |
| Contracts | `GET/POST /contracts`, `GET/PUT/DELETE /contracts/:id`, `GET /contracts/partner/:partnerId`, `GET /contracts/stats` |
| Revenue | `GET/POST /revenue`, `GET/PUT/DELETE /revenue/:id`, `POST /revenue/:id/process-payment`, `GET /revenue/pending-payments`, `GET /revenue/export` (CSV statement), `GET /revenue/contract/:contractId`, `GET /revenue/stats`, `GET /revenue/trends` |
| KPIs | `GET/POST /kpis`, `GET/PUT/DELETE /kpis/:id`, `PATCH /kpis/:id/value`, `GET /kpis/contract/:contractId`, `GET /kpis/stats` |
| Legal docs | `GET/POST /legal-documents`, `GET/PUT/DELETE /legal-documents/:id`, `GET /legal-documents/contract/:contractId`, `GET /legal-documents/stats` (alias: `/documents`) |
| Dashboard | `GET /dashboard/overview`, `/revenue-trends`, `/top-partners`, `/recent-activity`, `/expiring` (renewal radar), `/analytics/contract-status` |

Notes: revenue share amounts are **computed server-side** from the contract's percentage (a mismatched client-supplied amount is rejected); write endpoints accept camelCase or snake_case field names.

## Testing

```bash
cd backend
TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/revenue_share_test npm test
```

The suite covers auth bootstrap/lockdown, role escalation prevention, validation, CRUD, payment processing, computed shares, and audit logging. **It truncates the target database** — always point it at a disposable one. CI (`.github/workflows/platform-ci.yml`) runs it against a throwaway Postgres service plus a frontend production build.

## License

MIT License
