# Reven — Revenue Share Platform

A Phase 1 **Capture** workspace for partner revenue and revenue-sharing
governance: manage partners, revenue-sharing contracts, governed contract
amendment journeys, revenue-share records, KPIs, and legal-document metadata,
with a dashboard overview and JWT authentication.

> **Phase boundary — Reven does not move money.** In this phase the platform
> records and previews revenue-share data (including an estimated share amount)
> and tracks payout-readiness *status*. It does not initiate transfers, run
> settlement, hold funds, clear tax, or post to an ERP. Status labels describe
> what the system actually does (recorded, pending, ready, notified,
> acknowledged, recorded-as-paid).

## Features

- **Partners** — CRUD for referral, affiliate, strategic, and reseller partners.
- **Contracts** — revenue-sharing agreements with dates, share %, minimum
  payout, payment terms, and status, linked to a partner.
- **Amendment Journeys** — the flagship governance workflow: turn a legal
  contract article into a controlled change with legal guardrails (public
  interest / actual need basis, necessity, no-new-contract, no-change-of-nature),
  authority and decision/effective dates, partner impact, calculation method,
  amendment-letter evidence, notice channels, and an Arabic/RTL notice. Sending
  a notice is blocked until every readiness requirement is met, and a notified
  journey becomes immutable.
- **Revenue** — record revenue-share periods and preview the share amount
  (no payment execution).
- **KPIs** — contract-linked metrics with target/actual values and progress.
- **Legal Documents** — document metadata / evidence links (no file upload yet).
- **Dashboard** — program overview including amendment readiness and notice
  metrics.

## Technical Stack

**Backend:** Node.js + Express, PostgreSQL (`pg`), JWT auth, ES modules.
**Frontend:** React 18 + Vite, React Router, Axios.

## Project Structure

```
revenue-share-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # SQL data-access + schema
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth
│   │   ├── utils/          # JWT, password hashing
│   │   ├── config/         # Database pool
│   │   └── server.js       # Entry point (creates tables on boot)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Layout
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # Auth context
│   │   └── styles/         # CSS
│   └── package.json
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+ (local or cloud)

### Backend

```bash
cd backend
npm install
cp .env.example .env       # then edit DB_* and JWT_SECRET
npm run dev                # http://localhost:5000
```

On startup the server connects to PostgreSQL and creates any missing tables
(`CREATE TABLE IF NOT EXISTS`). Create the database named in `DB_NAME` first.

Load (or reset) a coherent Saudi/GCC demo dataset and the demo admin login:

```bash
npm run seed               # resets domain tables, then seeds demo data
```

Demo login: `admin@example.com` / `password123`.

### Frontend

```bash
cd frontend
npm install
npm run dev                # http://localhost:3000
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so run the
backend alongside it.

## Environment Variables (backend `.env`)

| Variable      | Description                          | Example              |
|---------------|--------------------------------------|----------------------|
| `PORT`        | API port                             | `5000`               |
| `NODE_ENV`    | environment                          | `development`        |
| `DB_HOST`     | PostgreSQL host                      | `localhost`          |
| `DB_PORT`     | PostgreSQL port                      | `5432`               |
| `DB_NAME`     | database name                        | `revenue_share`      |
| `DB_USER`     | database user                        | `postgres`           |
| `DB_PASSWORD` | database password                    | `postgres`           |
| `JWT_SECRET`  | secret used to sign JWTs             | `change-me`          |

See `backend/.env.example`.

## API

All business routes require a `Bearer` JWT (obtained from login/register).

### Authentication
- `POST /api/auth/register` — register, returns `{ user, token }`
- `POST /api/auth/login` — login, returns `{ user, token }`
- `GET  /api/auth/profile` — current user

### Partners — `/api/partners`
`GET /` · `POST /` · `GET /stats` · `GET /:id` · `PUT /:id` · `DELETE /:id`

### Contracts — `/api/contracts`
`GET /` · `POST /` · `GET /stats` · `GET /:id` · `PUT /:id` · `DELETE /:id`

### Amendment Journeys — `/api/amendments`
`GET /` · `POST /` · `GET /stats` · `GET /:id` · `PUT /:id` · `DELETE /:id`
· `POST /:id/send-notice` (blocked until readiness is met)
· `POST /:id/acknowledge`

### Revenue — `/api/revenue`
`GET /` · `POST /` · `GET /stats` · `GET /trends` · `GET /:id` · `PUT /:id`
· `DELETE /:id`  *(no payment-execution endpoint — Phase 1 records only)*

### KPIs — `/api/kpis`
`GET /` · `POST /` · `GET /stats` · `GET /:id` · `PUT /:id` · `DELETE /:id`

### Legal Documents — `/api/documents`
`GET /` · `POST /` · `GET /stats` · `GET /:id` · `PUT /:id` · `DELETE /:id`

### Dashboard — `/api/dashboard`
- `GET /overview` — partners, contracts, revenue, KPIs, documents, amendments
- `GET /revenue-trends` — revenue by period
- `GET /top-partners`

## License

MIT License
