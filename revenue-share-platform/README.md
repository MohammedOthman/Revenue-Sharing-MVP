# Revenue Share Platform

A B2B web app for managing partners, revenue-share contracts, revenue records, KPIs, and legal documents. Node/Express API, React/Vite frontend, PostgreSQL database, JWT auth.

This is a working CRUD application. Before treating it as the "Reven / Partner Revenue OS" product described in the strategy docs at the repo root, read `../DEPLOYMENT.md` §"What this code is and is not" — the coded features and the strategy product are not the same thing yet.

## Stack

**Backend:** Node.js 18+, Express 4, PostgreSQL (via `pg`), JWT auth (`jsonwebtoken`), bcrypt password hashing.
**Frontend:** React 18, Vite 5, React Router 6, Axios.

## Run it locally

You need Node 18+ and a PostgreSQL database (local install, Docker, or a free managed instance from Neon/Supabase).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # then edit .env — set JWT_SECRET and your DB connection
npm run dev                # starts on http://localhost:5000, auto-creates tables
```

Required environment variables (see `backend/.env.example`):
- `JWT_SECRET` — any long random string. The server refuses to start without it.
- Database — either `DATABASE_URL` (managed Postgres) **or** `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD` (local).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:3000, proxies /api to :5000
```

Open http://localhost:3000 and register the first user at `/login` (there is no seeded account).

## Deploy

The app runs as a single service: the backend serves the built frontend, so one URL hosts everything. See **`../DEPLOYMENT.md`** for a step-by-step runbook (managed Postgres + Render/Railway, or Docker).

Quick version:
```bash
cd frontend && npm install && npm run build   # produces frontend/dist
cd ../backend && npm install && NODE_ENV=production node src/server.js
```
When `frontend/dist` exists, the backend serves it at `/` and the API at `/api`.

## API endpoints

Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`
Partners: `GET|POST /api/partners`, `PUT|DELETE /api/partners/:id`
Contracts: `GET|POST /api/contracts`, `PUT|DELETE /api/contracts/:id`
Revenue: `GET|POST /api/revenue`, `POST /api/revenue/:id/process-payment`
KPIs: `GET|POST /api/kpis`, `PATCH /api/kpis/:id/value`
Documents: `GET|POST /api/documents`
Dashboard: `GET /api/dashboard/overview`, `GET /api/dashboard/analytics/trends`
Health: `GET /api/health`

## Known gaps

These are real and listed so nobody ships assuming they work:
- **Dashboard stat cards read the wrong response fields** (`overview.totalPartners` vs the API's `overview.partners.total_partners`), so they always show 0. "Recent Activity" is hardcoded placeholder rows.
- **Revenue share amount is sent by the client**, not computed server-side from revenue × percentage.
- **No automated tests, no CI.**
- **Minimal input validation** (`express-validator` is a dependency but unused), no rate limiting, no password-strength rules.

## License

MIT
