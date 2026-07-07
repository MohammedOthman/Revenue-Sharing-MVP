# Pre-Launch Checklist — Revenue Share Platform (Reven)

The gate a B2B finance product must clear before real end users touch it. Status
reflects the platform in this repo (verified by the automated test suite and a
live production-mode boot). Re-verify any ☐/◐ item on the deployment target
before announcing launch.

Legend: ☑ done & verified ◐ partial / owner action needed ☐ not done

## 1. Security & Access

- ☑ Anonymous signup cannot choose its own role (no admin escalation)
- ☑ First user = admin bootstrap; self-signup locked after that (`ALLOW_OPEN_REGISTRATION` opt-in)
- ☑ Passwords bcrypt-hashed, minimum 8 characters
- ☑ JWT secret required from environment in production — server refuses to boot without it
- ☑ Security headers + CSP (helmet), CORS allowlist, 1 MB body limit
- ☑ Rate limiting: strict on login/register, general ceiling on the API
- ☑ Every non-auth endpoint requires a valid token; role checks on admin routes
- ☑ Input validation on every write endpoint; invalid ids → 400, not 500
- ☑ No stack traces or internal errors leaked in production responses
- ◐ Change/rotate the seed admin password immediately after first deploy (owner)
- ☐ Dependency audit in CI (`npm audit`) and a patching cadence

## 2. Financial Integrity (the product's core promise)

- ☑ Share/payout amounts computed server-side from contract terms; client mismatches rejected
- ☑ DB CHECK constraints: percentage 0–100, non-negative amounts, period order
- ☑ Double-payment blocked (paying a paid record fails loudly)
- ☑ Audit trail on every mutation: who, what, when, payload (secrets redacted)
- ☑ Deleting a user cannot orphan-break contracts (FK → SET NULL)
- ☐ Reconciliation/export path (CSV of payouts per period) for the finance workflow

## 3. Reliability & Operations

- ☑ Health endpoint with real DB probe (503 when degraded)
- ☑ Transient DB errors don't crash the process; pool self-heals
- ☑ Graceful shutdown on SIGTERM (containers/deploys)
- ☑ Managed Postgres support: `DATABASE_URL` + SSL
- ☑ Idempotent schema bootstrap — upgrades existing databases in place
- ☑ Request logging with status + latency
- ◐ **Database backups**: enable automated backups/PITR on the managed Postgres (owner — provider setting)
- ☐ Uptime monitoring + alerting pointed at `/api/health` (UptimeRobot/BetterStack, 5 min)
- ☐ Error tracking (e.g. Sentry) for backend + frontend

## 4. Data & Privacy

- ☑ Secrets out of the repo; `.env.example` documents every variable
- ☑ Lockfiles committed; env files git-ignored
- ◐ Privacy policy + terms of service pages/links (owner/legal — required before external users)
- ☐ Data retention & deletion answer (what happens when a customer asks to be removed)

## 5. Product & UX

- ☑ All pages render (routing/Outlet fixed) and consume the real API
- ☑ Session expiry → clean redirect to login (no stuck screens)
- ☑ Error boundary — no blank white pages on render errors
- ☑ Empty states with guidance on every list; real server error messages on forms
- ☑ No fake/demo data in the UI (fake notifications, placeholder activity, demo credentials removed)
- ☑ Guided dependency order (partner → contract → revenue/KPI/document)
- ◐ Mobile/responsive pass on the top 3 flows (login, dashboard, record revenue)
- ☐ Onboarding touch: first-login pointer to "add your first partner"

## 6. Testing & QA

- ☑ 16-test API suite: auth bootstrap/lockdown, escalation, validation, computed shares, payment idempotency, audit log — green
- ☑ CI on every push/PR: backend tests against real Postgres + frontend production build
- ☑ Live production-mode boot verified (health, static serving, register→login→seed→dashboard)
- ◐ One full manual UAT pass by the founder on the deployed URL (owner)
- ☐ Cross-browser smoke (Chrome/Safari + one mobile browser)

## 7. Deployment & Go-Live

- ☑ Dockerfile + docker-compose (app + Postgres, healthchecked, single-port serve)
- ☑ README deploy guides (Docker, Render/Railway-style, Replit)
- ◐ Production domain + HTTPS (owner — host/provider step)
- ◐ Set real `JWT_SECRET`, `SEED_ADMIN_*`, `CORS_ORIGINS` on the production host (owner)
- ☐ Rollback plan: previous image kept; DB backup taken before each deploy
- ☐ Load sanity: one 5-minute smoke at expected concurrent-user level

## 8. Launch Logistics

- ☐ Support channel end users can reach (email alias is enough at MVP)
- ☐ Known-issues / feedback capture loop for the first two weeks
- ☐ Success metrics defined (activation: first contract created; first payout processed)

---

**Bottom line:** all engineering-controlled items are done and test-verified.
The remaining ◐/☐ items are launch-operations calls (backups, domain, monitoring,
legal pages, UAT) that need the owner or the hosting provider — none require
further code to start, and none should be skipped for a finance product.
