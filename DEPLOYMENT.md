# Deployment runbook — Revenue Share Platform

This is the step-by-step guide to putting the app in `revenue-share-platform/` on the internet as a live website people can sign up for and use.

## What this code is and is not

The code is a working revenue-share **admin CRUD app**: register/login, then create and list partners, contracts, revenue records, KPIs, and legal documents, backed by PostgreSQL. It builds and runs — verified end to end (register → login → create partner → dashboard → 401 on unauthed calls).

The code is **not** the "Reven / Partner Revenue OS" product the strategy documents at the repo root describe. Those describe a claim-centric PRM with deal/claim registration, attribution, protection windows, payout-readiness preview, an append-only ledger, and a dispute workflow. **None of those tables or flows exist in the code.** The database has five business tables: `partners`, `contracts`, `revenue_shares`, `kpis`, `legal_documents`. Deploying this gives you a live generic revenue-share tracker, not the pitched product. Closing that gap is product-build work, not deployment work.

Also: this is a **website (SaaS)**, not a file end users "download." People reach it at a URL, register, and log in. There is no desktop or mobile app and no app-store package. If you want an installable app later, the cleanest route is to make the existing React frontend a PWA (installable from the browser); a native app is a separate build.

## The deployment shape

The app is designed to run as **one service on one URL**. When you build the frontend (`frontend/dist`), the Express backend serves those files at `/` and the API at `/api`. So you deploy a single Node service plus a Postgres database. No separate frontend host is required.

You provide three things the code can't create for you:
1. A **PostgreSQL database** (managed — Neon, Supabase, Render, Railway).
2. A **host** to run the Node service (Render, Railway, Fly, or any box with Docker).
3. A **domain name** (optional but expected for real users).

Every path below needs accounts and, past free tiers, a payment method. That part is yours; the steps are exact.

---

## Database: Supabase (already provisioned)

The database is a Supabase project named **Reven** (`lstbxcynaraigwreeqjg`, region `ap-southeast-1`). The full Reven Phase-1 schema is already applied there (21 tables) and secured: Row Level Security is enabled deny-by-default on every table, and the append-only event/ledger/audit triggers are active. Migration history is seeded, so the app will not re-run migrations against it.

To point the backend at it, get the connection string from the Supabase dashboard → **Project Settings → Database → Connection string → URI**. Use the **Transaction pooler** URI for a serverless/PaaS host:
```
postgresql://postgres.lstbxcynaraigwreeqjg:[YOUR-DB-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```
Set it as the backend's `DATABASE_URL` and set `DB_SSL=true`. The backend connects as `postgres` (which bypasses RLS), so it reads/writes normally while the public anon key stays denied.

Note on residency: `ap-southeast-1` is Singapore, not KSA. If PDPL data residency applies to real customer data, that region choice needs review before go-live (see TOOLS_AND_FRICTIONS.md §5).

---

## Path A — Render + Supabase (recommended)

Use the Supabase `DATABASE_URL` above in place of the Neon step.

## Path A (alt) — Render + Neon (has free tiers)

**1. Create the database (Neon).**
- Sign up at neon.tech, create a project. Copy the connection string. It looks like
  `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`.

**2. Deploy the service (Render).**
- Push this repo to GitHub (the branch you're on is fine).
- In Render: New → Web Service → connect the repo.
- Root directory: `revenue-share-platform`
- Runtime: Docker (the `Dockerfile` is already here and builds frontend + backend into one image).
- Add environment variables:
  - `JWT_SECRET` = a long random string (`openssl rand -base64 48`)
  - `DATABASE_URL` = the Neon string from step 1
  - `DB_SSL` = `true`
  - `NODE_ENV` = `production`
  - `CORS_ORIGIN` = your final URL (e.g. `https://reven.onrender.com`), or leave unset at first
- Deploy. On boot the app auto-creates its tables. Visit the URL and register the first user.

**3. Domain (optional).**
- Buy a domain (Namecheap, Cloudflare). In Render, add it as a custom domain and follow the DNS instructions. Set `CORS_ORIGIN` to the domain.

Render's free web service sleeps after inactivity and cold-starts slowly; the DB retry logic in `server.js` covers the cold start. For paying users, use a paid instance.

---

## Path B — Docker anywhere

The `revenue-share-platform/Dockerfile` builds and runs the whole app.

```bash
cd revenue-share-platform
docker build -t revenue-share .
docker run -p 5000:5000 \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e DB_SSL=true \
  -e NODE_ENV=production \
  revenue-share
```

Point any reverse proxy / load balancer at port 5000. Works on Fly.io, a VPS, ECS, Cloud Run, etc.

---

## Fix before real users touch it

Deployment makes it reachable. These make it safe and correct. Ranked by how much they hurt if skipped:

1. **Dashboard shows zeros.** The frontend reads `overview.totalPartners`; the API returns `overview.partners.total_partners`. Every stat card renders 0 regardless of data, and "Recent Activity" is hardcoded. First thing a user sees looks broken. Fix the field mapping in `frontend/src/pages/Dashboard.jsx`.
2. **Revenue share is not calculated server-side.** `share_amount` is whatever the client sends. For a product whose job is computing partner shares, compute it in `revenue.model.js` from `total_revenue × share_percentage` and ignore the client value.
3. **No input validation or rate limiting.** `express-validator` is installed but unused. Add validation on auth and create endpoints, and rate-limit `/api/auth/*` to slow credential stuffing.
4. **Secrets and CORS.** Set a strong `JWT_SECRET` and a real `CORS_ORIGIN` allowlist (the code already supports both). Tokens live in `localStorage` (7-day expiry) — acceptable for an MVP, exposed to XSS; revisit if you add untrusted content.
5. **No tests, no CI.** There is no test script and no pipeline. At minimum add a smoke test that boots the API against a throwaway Postgres and runs register→login→create, and a GitHub Action that builds both halves on every push.
6. **Backups and migrations.** Tables are created with `CREATE TABLE IF NOT EXISTS` on boot — fine for launch, but there are no migrations. Once real data exists, schema changes need a migration tool (e.g. `node-pg-migrate`), and the managed DB needs backups turned on.

## What's already been fixed to make deploy possible

- `backend/.env.example` and `frontend/.env.example` now document every required variable (there were none).
- The backend fails fast with a clear message if `JWT_SECRET` or the DB config is missing, instead of throwing at request time.
- `database.js` accepts a managed `DATABASE_URL` with SSL, not just discrete local vars.
- The backend serves the built frontend, so the app deploys as one service on one URL.
- A dropped idle DB connection no longer crashes the process; DB connect retries on a cold start.
- `Dockerfile` + `.dockerignore` build the whole app into one image.
- Root `.gitignore` no longer swallows the `.env.example` templates.
