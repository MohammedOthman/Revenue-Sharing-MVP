# New Client Provisioning Runbook (single-tenant)

One isolated instance (app + database) per client. Target: **under 30 minutes**
from zero to a client admin logged in. No code changes involved.

## 1. Provision (choose one)

### Option A — Any Docker host (VPS, on-prem)

```bash
git clone <repo> && cd Revenue-Sharing-MVP/revenue-share-platform
cat > .env << EOF
JWT_SECRET=$(openssl rand -hex 32)
DB_PASSWORD=$(openssl rand -hex 16)
APP_PORT=5000
EOF
docker compose up -d --build
```

### Option B — Render / Railway (managed, recommended for speed)

1. New Web Service from this repo.
   - Build: `cd frontend && npm ci && npm run build && cd ../backend && npm ci`
   - Start: `node backend/src/server.js`
2. Add a managed Postgres instance; note its connection string.
3. Environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<from the Postgres add-on>`
   - `DB_SSL=true`
   - `JWT_SECRET=<openssl rand -hex 32>`
   - `FRONTEND_DIST=frontend/dist`
   - `APP_BASE_URL=https://<client-subdomain>.<your-domain>` (used in invite/reset emails)
   - `RESEND_API_KEY=<key>` and `EMAIL_FROM=Reven <no-reply@your-domain>` — optional;
     without it, invites show a copyable setup link instead of sending email.

## 2. Immediately after first boot

- [ ] `GET https://<host>/api/health` returns `{"status":"ok","database":"up"}`
- [ ] **Enable automated backups / PITR** on the Postgres instance (provider setting)
- [ ] Open the app → **register the first account** → it becomes the client's admin
      (registration locks itself after this)
- [ ] Log in as that admin → **Team** page → invite the client's teammates
      (email delivery if configured, otherwise copy each setup link and share securely)

## 3. Hand-off checklist (per client)

- [ ] Client admin logged in and password set (chosen by them, never known to you)
- [ ] At least one teammate invited successfully
- [ ] Client walked through: add partner → create contract → record revenue →
      process payout → Export CSV
- [ ] Uptime monitor added for `https://<host>/api/health`
- [ ] Instance recorded in your client registry: host, DB, backup schedule, version (git SHA)

## 4. Updating a client instance

```bash
# Docker host:
git pull && docker compose build && \
docker compose exec db pg_dump -U postgres revenue_share > backup-$(date +%F).sql && \
docker compose up -d
# Managed host: trigger redeploy after the same pg_dump via the provider's tools.
```

Schema migrations run automatically and idempotently at boot.

## 5. Decommissioning

Final `pg_dump`, store per your retention policy, then delete the service and
database. Physical isolation means no cross-client cleanup is ever needed.
