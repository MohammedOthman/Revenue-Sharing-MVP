# Pre-Launch Checklist — Reven (Partner Lifecycle Platform)

Reven manages **partnerships across their full lifecycle** — capture and onboard
partners, run agreements, track performance, settle what's owed, and renew or
part ways cleanly. This checklist follows that lifecycle, aligned with the
governing phase model (Capture → Settle → Orchestrate). Settlement is one stage
of the lifecycle, not the product's identity.

Status reflects the platform in this repo (verified by the automated test suite
and a live production-mode boot). Re-verify any ☐/◐ item on the deployment
target before announcing launch.

Legend: ☑ done & verified ◐ partial / owner action needed ☐ not done

## 1. Capture — Partner Onboarding & Identity

- ☑ Partner records with type (referral, affiliate, strategic, reseller), contact person, and status
- ☑ Partner status lifecycle: pending → active → inactive
- ☑ Team access is controlled: first user = admin bootstrap, then admin-created accounts (`ALLOW_OPEN_REGISTRATION` opt-in); no role escalation via signup
- ☑ Guided dependency order in the UI (partner first → then contract → then revenue/KPIs/documents)
- ☐ Partner-facing onboarding touch: first-login pointer to "add your first partner"
- ☐ Partner self-service portal (partners see their own contracts/payouts) — Orchestrate-phase item, explicitly out of MVP scope

## 2. Agreement Lifecycle — Contracts & Legal Documents

- ☑ Contract lifecycle states: draft → active → expired / terminated
- ☑ Terms captured per agreement: share %, minimum payout, payment terms, start/end dates
- ☑ Contract terms validated at the door (share % 0–100, dates in order, payout non-negative)
- ☑ Legal documents attached per contract with their own lifecycle (draft → pending review → approved → signed → expired), versions, and expiry dates
- ☑ Deleting a team member never breaks agreements they created (FK → SET NULL)
- ☐ Expiry visibility: surface contracts/documents nearing end date on the dashboard (renewal is where partnerships die silently)
- ☐ Renewal flow: one-click "renew contract" carrying terms forward

## 3. Performance — KPIs & Partnership Health

- ☑ KPIs per contract with target vs actual, unit, period, and status (active / at-risk / achieved)
- ☑ Quick value updates from the KPI board; progress computed live
- ☑ Dashboard shows the real state of the book: partners, active agreements, revenue, pending obligations, contract status mix
- ☑ Top-performing partners ranked from actual settlement data (not a stub)
- ☐ Partnership health roll-up per partner (KPIs + payment recency in one view) — strong v1.1 candidate

## 4. Settle — Revenue Sharing & Payouts

- ☑ Revenue recorded per contract per period; the partner's share computed **by the system from the agreement terms** — never trusted from user input
- ☑ Mismatched manually-entered amounts rejected loudly
- ☑ Payout processing guarded against double-payment
- ☑ Pending vs paid obligations visible at a glance
- ☑ Database-level guardrails: share % 0–100, non-negative amounts, period order
- ☐ Settlement export (CSV of payouts per partner per period) for sharing statements with partners

## 5. Trust — Auditability & Data Stewardship

Partnerships run on trust; every number must be explainable.

- ☑ Full audit trail on every change: who, what, when, payload (secrets redacted)
- ☑ Real recent activity on the dashboard from the audit log — zero fake/placeholder data anywhere in the UI
- ☑ Secrets out of the repo; `.env.example` documents every variable
- ◐ Privacy policy + terms of service pages/links (owner/legal — required before external users)
- ☐ Data retention & deletion answer (what happens when a partner relationship ends and they ask for removal)

## 6. Platform Engineering Readiness

- ☑ Security: helmet + CSP, CORS allowlist, rate limiting (strict on login), 1 MB body limit, bcrypt (min 8 chars), JWT secret required in production, invalid ids → 400, no stack traces leaked
- ☑ Reliability: health endpoint with DB probe, transient DB errors don't crash the process, graceful shutdown, managed Postgres (`DATABASE_URL` + SSL), idempotent schema upgrades
- ☑ Testing: 16-test API suite (onboarding lockdown, escalation, validation, computed shares, payout idempotency, audit log) green in CI against real Postgres; frontend production build in CI
- ☑ UX resilience: session expiry → clean re-login, error boundary (no blank pages), empty states with guidance, real server error messages, no demo credentials shown
- ◐ Mobile/responsive pass on the top 3 flows (login, dashboard, record revenue)
- ◐ One full manual UAT pass by the founder on the deployed URL (owner)
- ☐ Error tracking (e.g. Sentry) for backend + frontend
- ☐ Dependency audit in CI (`npm audit`) and a patching cadence

## 7. Go-Live Operations

- ☑ Dockerfile + docker-compose (app + Postgres, healthchecked, single-port serve)
- ☑ README deploy guides (Docker, Render/Railway-style, Replit)
- ◐ **Database backups** enabled on the managed Postgres (owner — provider setting; partnership history is the asset)
- ◐ Production domain + HTTPS (owner — host/provider step)
- ◐ Real `JWT_SECRET`, `SEED_ADMIN_*`, `CORS_ORIGINS` set on the production host; rotate seed admin password after first login (owner)
- ☐ Uptime monitoring + alerting on `/api/health`
- ☐ Rollback plan: previous image kept; DB backup before each deploy
- ☐ Load sanity: one 5-minute smoke at expected concurrent-user level

## 8. Launch Logistics

- ☐ Support channel end users can reach (email alias is enough at MVP)
- ☐ Known-issues / feedback capture loop for the first two weeks
- ☐ Success metrics tied to the lifecycle: partners onboarded, first contract activated, first settlement processed, first renewal

---

**Bottom line:** every engineering-controlled lifecycle item is done and
test-verified. What remains splits into (a) launch operations that need the
owner or hosting provider — backups, domain, monitoring, legal pages, UAT —
and (b) lifecycle depth for right after launch: expiry/renewal visibility,
settlement exports, and partner health roll-ups. The Orchestrate-phase items
(partner portal, network features) are deliberately out of MVP scope per the
phasing strategy.
