# Pre-Launch Technical Readiness — Reven, Zero-to-One

Engineering spec for taking Reven from "verified build" to **first paying
external clients**. Organized by priority, not category: P0 blocks onboarding
client #1, P1 lands within the first two weeks of real usage, P2 is deferred
until client count forces it. Each item states what to build, why it gates
zero-to-one, and how to verify.

Current verified baseline (do not re-litigate): hardened auth (bootstrap
admin, locked registration, no role escalation), validated writes, server-side
settlement math with DB constraints, double-payout guard, full audit trail,
health probe + graceful shutdown, Docker/compose packaging, 16-test CI suite
against real Postgres, production-mode boot verified.

---

## P0 — Blockers: cannot onboard client #1 without these

### P0.1 Tenancy model — DECIDE FIRST, everything else inherits it

The schema has no `org_id`; every authenticated user sees the entire
workspace. Two viable zero-to-one paths:

- **Option A (recommended): single-tenant instance per client.**
  One container + one Postgres database per client, provisioned from the
  existing Docker image. Zero code changes; isolation is physical; a client's
  data cannot leak by definition. Cost: ~$10–15/client/month on Render/Railway;
  provisioning is `docker compose up` + env file. Sustainable to ~10 clients.
- **Option B: shared multi-tenant.** `organizations` table, `org_id` FK +
  index on all 7 domain tables, org claim in the JWT, mandatory org scoping in
  every model query, org-scoped uniqueness (e.g. partner email unique per org,
  not globally), per-org rate limits. ~3–5 days of careful work + full test
  rewrite. Do this at ~5+ clients, not before revenue.

**Action:** commit to Option A for launch. ✅ **DONE** — runbook at
`deploy/new-client.md` (provision, first-boot checks, hand-off checklist,
update and decommission procedures).
**Verify (owner):** provision a staging instance in < 30 minutes from the runbook alone.

### P0.2 Account lifecycle: password reset + user invitations (needs email)

Today a locked-out user is unrecoverable without DB surgery, and an admin
"creating an account" has no way to hand over credentials safely.

- Transactional email service (Resend/Postmark/SES — one env var + tiny client).
- `password_reset_tokens` table (user_id, token hash, expiry ≤ 1h, single-use).
- `POST /api/auth/forgot-password` (always 200 to prevent email enumeration,
  rate-limited) + `POST /api/auth/reset-password`.
- Invitation flow: admin creates user → system emails a set-password link
  (same token mechanism); remove any flow where an admin knows a user's password.
- Forced password change for the seeded admin on first login.

✅ **DONE and verified** — implemented with single-use hashed tokens
(`password_reset_tokens`), Resend HTTP email (console + copyable-setup-link
fallback when email isn't configured), forgot/reset endpoints hardened
against email enumeration, admin **Team page** (invite, role change,
remove), and a randomly generated seed-admin password. Covered by API
tests (invite → set password → login → token replay rejected; forgot-password
indistinguishable responses) and browser E2E (admin invites → teammate
activates via link → logs in → non-admin cannot see Team).

### P0.3 Production infrastructure (per client instance)

- Managed Postgres with **automated daily backups + PITR enabled** — partner
  history is the asset; verify a restore once, not just the backup checkbox.
- Domain + TLS (host-managed cert), `CORS_ORIGINS` set, real `JWT_SECRET`
  from the host's secret store (never in the repo/env file committed anywhere).
- CD: deploy on merge to main (host auto-deploy or a GitHub Actions deploy job
  gated on the existing CI passing).
- Rollback: previous image tag retained; `pg_dump` before every deploy
  (one line in the deploy job).

**Verify:** kill the app container → auto-restarts; restore yesterday's
backup to a scratch DB; deploy + rollback drill once.

### P0.4 Observability — you cannot support clients blind

- Error tracking: Sentry (or equivalent) in Express error middleware + React
  ErrorBoundary; release tag = git SHA.
- Uptime: external monitor on `/api/health` (checks DB, already built),
  5-minute interval, alert to founder email/phone.
- Log retention: host log drain or provider default ≥ 7 days; the request
  logger (status + latency) already emits the needed lines.

**Verify:** throw a deliberate staging error → Sentry event with SHA; stop
DB → uptime alert fires on the 503.

### P0.5 Zero-to-one product gaps that block real workflows

- **Expiry/renewal visibility:** dashboard panel + `GET
  /api/contracts?expiring=30d` for contracts/documents within 30 days of
  `end_date`/`expiry_date` (indexes exist). Renewal is where partnerships
  churn silently.
- **Settlement statement export:** `GET /api/revenue/export?partnerId=&period=`
  → CSV (period, contract, total revenue, share %, share amount, status,
  paid date). First thing a partner asks: "show me how you got this number."
- **Mobile pass:** login, dashboard, record-revenue, process-payout usable at
  375 px (fix overflow/table scroll only — no redesign).

✅ **DONE and verified** — renewal radar on the dashboard
(`GET /api/dashboard/expiring`, contracts + documents within N days),
settlement CSV export (`GET /api/revenue/export` with partner/period/status
filters + Export button), and a responsive pass (single-column grids,
scrollable tables, full-width modals ≤768px). Covered by API tests and
browser E2E (radar renders for a contract ending in 14 days; CSV download
fires with correct rows).

---

## P1 — First two weeks of real usage

- **Pagination + caps:** `limit/offset` (default 50, max 200) on the 6 list
  endpoints; frontend "load more". Prevents payload blowup at a few hundred
  records.
- **Session hardening:** shorten JWT to 24h once reset flow exists (7d was a
  crutch); optional refresh-token rotation only if clients complain.
- **Partner health roll-up:** `GET /api/partners/:id/summary` — contracts,
  KPI attainment %, last settlement date, pending balance in one call; UI
  detail view.
- **`npm audit` gate in CI** (fail on high/critical) + monthly dependency
  patch cadence.
- **Restore runbook test** repeated after first real data (backups only count
  when restored).
- **Support intake:** support@ alias + a "report a problem" mailto in the app
  footer with app version/SHA prefilled.

## P2 — Deferred until client count forces it (do NOT build now)

- Shared multi-tenancy (P0.1 Option B) — at ~5+ clients.
- Partner self-service portal (Orchestrate phase — partners view their own
  contracts/statements).
- SSO/SAML, granular RBAC beyond admin/user — first enterprise deal, not before.
- File upload/storage for signed documents (S3 + signed URLs) — metadata +
  `file_url` field covers MVP; build when a client refuses external links.
- Read replicas, caching, background job queue — no load justifies it.

---

## Launch gate (all must be true for client #1)

1. ◐ Staging instance provisioned **from the runbook alone** in < 30 min (P0.1 — runbook done, drill is owner)
2. ✅ Invite → login → forgot → reset loop green, API + browser tests extended (P0.2)
3. ◐ Backups verified by an actual restore; rollback drill done once (P0.3 — owner/provider)
4. ◐ Sentry event + uptime alert both proven to fire (P0.4 — owner/provider signup)
5. ✅ Expiring-soon panel + CSV export live; mobile pass done (P0.5)
6. ◐ Founder UAT: full lifecycle on staging — onboard partner → activate
   contract → record revenue → verify computed share → process payout →
   export statement → check audit trail (automated equivalent is green:
   20-step browser E2E + 20 API tests)
7. ◐ Seed admin password: now randomly generated (done); privacy/ToS links (owner)

**Engineering P0 items (P0.1 runbook, P0.2, P0.5) are built and verified**
— 20 API tests + 20 browser E2E checks green. What remains for launch is
operations: the provisioning drill, backups/restore, monitoring signup,
founder UAT, and legal pages.
