# Tools and frictions — Revenue Share Platform → live product

The stack you need is decided by three facts: the code is **Node/Express + React/Vite + PostgreSQL**; the buyers in your strategy docs are **Saudi B2B companies handling revenue and partner money**; and the code today is a **single-tenant CRUD app with a broken UI**, not the multi-company Reven PRM you pitched. Every tool below earns its place against one of those facts.

"Friction" here means a specific gap between "runs on a laptop" and "a Saudi finance team trusts it with their revenue data." Frictions are ranked at the end.

---

## 1. Build — write, integrate, and catch mistakes

**GitHub + pull-request review** (you have this; PR #46). Why it matters here specifically: the single largest defect in this repo — the frontend calling a MongoDB-shaped API that the PostgreSQL backend never served — is exactly what a reviewer or a required status check catches before merge. Turn on branch protection so nothing merges without CI green.

**TypeScript** (not used — the code is plain `.js`/`.jsx`). This is the highest-leverage build tool you're missing. Your bugs are type bugs: `partner._id` vs `partner.id`, `partnerAmount` vs `share_amount`, a create form sending `{amount, period}` to an endpoint that requires `{totalRevenue, periodStart, sharePercentage, shareAmount}`. TypeScript with shared request/response types turns every one of those into a red squiggle at build time instead of a blank screen in production. Friction: converting an existing JS codebase is a few days of work and forces you to name the contract explicitly (which is the point).

**A single source of truth for the API contract** — pick one: **Zod** schemas shared between front and back, **tRPC** (if you stay all-TypeScript), or **OpenAPI** + generated clients. Rationale: the frontend and backend disagreed on field names, request shapes, response wrapping, and even URL paths (`/legal-documents` vs `/documents`), with nothing forcing them to agree. One shared contract makes that disagreement impossible to compile. This is the durable fix for the whole class of bug I found; the manual repair I'm doing now is the one-time cleanup.

**ESLint + Prettier** (not configured). Catches the dead `import { query } from 'express-validator'` that's imported and never used, and stops formatting churn in PRs. Low effort, run it in CI.

**Vite + npm** (you have these; the frontend builds clean to ~260 KB). Nothing to change.

**Docker Compose for local Postgres** (added a Dockerfile; no compose yet). Rationale: I had to hand-build a Postgres instance to test your app. A `docker-compose.yml` with a Postgres service means any new developer runs `docker compose up` and has a working database in one command. Removes onboarding friction.

**AI coding tools (Claude Code, Cursor, Copilot)** — the honest entry. These produced this codebase fast, and they produced its gaps: a frontend and backend generated in separate sessions against different assumptions, with no integration test to reveal the mismatch. Keep using them, but treat their output as a draft that a test harness and a type system verify — not as done. The friction with vibe-coded work is never the first 80%; it's the integration, the edge cases, and the "looks finished but was never run end-to-end" screens (your dashboard shows hardcoded "Recent Activity" and permanently-zero stat cards — classic tells).

## 2. Verify — prove it actually runs

**API/integration tests: node:test or Vitest + Supertest** (none exist; there's no `test` script). A 20-line test that boots the API against a throwaway Postgres and runs register → login → create-partner → list would have caught every contract mismatch in this repo on day one. This is the cheapest high-value thing you can add.

**End-to-end: Playwright** (already available in your environment). Drives the real browser against the real UI. It catches the failure mode your unit tests can't: a page that fetches successfully but renders nothing because `partners.map` was called on `{partners: [...]}`. Run the critical path (log in → each page loads → create one record) on every deploy.

**CI: GitHub Actions** (none). Wire the two above to run on every push to a PR, with a Postgres service container. Green-before-merge converts "we think it works" into "the machine confirmed it works." Friction: ~half a day to set up; pays for itself the first time it blocks a regression.

## 3. Ship — put it on the internet

**Managed PostgreSQL.** You need SSL, backups, and (for serverless hosts) connection pooling — none of which a raw `pg` pool gives you.

| Option | Why pick it | Friction |
|---|---|---|
| **Neon** | Postgres that scales to zero, generous free tier, built-in pooler; the code already supports its `DATABASE_URL`+SSL | US/EU/Asia regions — **verify a region acceptable under Saudi PDPL** before storing real customer data |
| **Supabase** | Postgres + auth + file storage + realtime in one; could replace three tools below | You adopt their platform conventions; same region-residency check |
| **AWS RDS / Aurora, Google Cloud SQL** | Middle East regions exist (AWS Bahrain; Google Dammam), which matters for latency and data residency | More setup and ops than Neon/Supabase; you manage more |

**Application host** (the Node service; it serves the built frontend, so one service hosts everything):

| Option | Why pick it | Friction |
|---|---|---|
| **Render** | Simplest Docker deploy; the runbook targets it | Free tier cold-starts and sleeps; no Saudi region |
| **Railway** | Similar simplicity, fast builds | No Saudi region |
| **Fly.io** | Deploys close to users; has a region near the Gulf | More config than Render |
| **Google Cloud Run** | Scales to zero, Dammam region available, container-native | GCP learning curve |

The region point is a real Saudi friction, not a detail: the convenient hosts (Render, Railway) have no KSA presence, so for latency and PDPL residency you may be pushed toward Cloud Run (Dammam), AWS, Oracle (Jeddah), or a local provider (stc cloud, Sela). Decide this with counsel before you store real partner data, because moving it later is painful.

**Docker** (added). Deterministic builds, portability across every host above, and it's how Render/Fly/Cloud Run want the app. Keeps "works on my machine" from being a sentence you ever say.

**Secrets management: host env vars now, Doppler / 1Password / AWS Secrets Manager later.** Your repo shipped with no documented secrets and the server threw at request time when `JWT_SECRET` was missing (now it fails fast at boot with a clear message, and `.env.example` documents every variable). Rule: `JWT_SECRET`, DB credentials, and any API keys live in the host's secret store, never in git.

**Cloudflare (DNS + TLS + CDN + WAF).** Terminates HTTPS, serves your static assets fast, absorbs DDoS, and gives you a web application firewall in front of the API. One account covers domain, certificates, and a security layer you otherwise hand-build.

## 4. Operate — keep it alive and know when it breaks

**Error tracking: Sentry.** Right now a frontend crash is a blank screen and a backend error is a `console.log` nobody reads. Sentry captures the stack trace, the user, and the release, so `partners.map is not a function` reaches you as an alert instead of a support ticket. First thing to add after deploy.

**Logs + uptime: Better Stack, Axiom, or the host's built-in logs; plus a pinger on `/api/health`** (that endpoint already exists). Rationale: you need to know the service is down before your customer tells you. The health check is built; point an uptime monitor at it.

**Database migrations: node-pg-migrate, Prisma Migrate, or Flyway** (none — the schema is created with `CREATE TABLE IF NOT EXISTS` on every boot). This is fine for launch and dangerous after. The moment real data exists, every schema change needs a versioned, reversible migration; boot-time table creation can't add a column safely or roll back. Adopt a migration tool before your first real customer, not after.

**Backups / point-in-time recovery** (managed provider feature — turn it on). Revenue and partner-payment data is the one thing you cannot lose and keep customers. Non-negotiable before real data.

**Product analytics: PostHog (open-source, self-hostable for residency) or Plausible.** Tells you whether anyone opens the dashboard or creates a second contract. Without it you're guessing which of the pitched features people actually use.

## 5. Protect — auth, validation, compliance (heaviest Saudi weight)

**Authentication — the current JWT is MVP-grade and enterprise Saudi buyers will reject it.** It has no email verification, no password reset, no refresh tokens, no MFA, and no SSO, and it stores a 7-day token in `localStorage` (XSS-reachable). Banks and large dealers — your ICP — require SSO (SAML/OIDC) and MFA in procurement. Options: keep and extend the JWT for the MVP; or adopt **WorkOS** (enterprise SSO/SCIM, built for exactly this B2B requirement), **Auth0/Clerk** (fuller auth UX), or **Supabase Auth** (if you're already on Supabase). Trade-off: building enterprise auth yourself is months and a security-audit liability; buying it is a per-MAU cost. For a product that sells to Saudi finance teams, buy it.

**Input validation: Zod, or the express-validator you already installed but never used.** No endpoint validates its input beyond manual null checks; the revenue endpoint trusts a client-supplied `shareAmount` instead of computing it. Validation prevents bad data and a class of injection, and it's the natural home for the server-side share calculation.

**Rate limiting + WAF: express-rate-limit on `/api/auth/*`, plus Cloudflare.** There's nothing slowing a credential-stuffing attack on login today. Cheap to add.

**Security headers: helmet** (not present). One line of middleware sets the standard protective headers.

**Dependency + secret scanning: GitHub Dependabot, `npm audit`, Snyk, gitleaks.** Automated so a vulnerable package or a committed key is caught in CI, not in an incident.

**Payments (your Phase 2, per your own docs): Saudi-native gateways — Moyasar, HyperPay, Tap, or PayTabs — support mada and local rails; Stripe's KSA coverage is limited.** Your strategy explicitly defers money movement and flags MoR/PayFac/money-transmitter as a separate licensed decision — correct, because moving money in Saudi touches **SAMA** licensing. Don't wire a payment rail until that Phase-2 gate; when you do, start with a mada-capable local gateway.

**Compliance — the Saudi frictions a generic answer misses:**
- **PDPL (Personal Data Protection Law, enforced by SDAIA):** governs how you store and transfer personal data and likely constrains you to KSA-resident or approved-transfer hosting. This is the friction that overrides "just deploy to Render." Get counsel; it decides your host region.
- **ZATCA (Fatoora) e-invoicing:** if you generate invoices for settled revenue, they must meet ZATCA's phased e-invoicing standard (structured format, cryptographic stamp, QR). Directly relevant to a revenue/settlement product in Phase 2.
- **Arabic + RTL:** the UI is English-only, left-to-right. Saudi B2B users expect Arabic and right-to-left layout. Add `react-i18next` and RTL-aware styling. This is a go-to-market friction, not a nicety, in your market.
- **E-signature for the legal-documents module:** today it stores document *metadata* only — no actual signing. Real agreements need DocuSign or a local e-sign provider; wire one before claiming a legal-document workflow.

## 6. Scale — when it grows (not before)

**Multi-tenant isolation — this is an architecture gap, not a tool, and it's the one that will bite first.** The schema has no organization/tenant boundary: `getAllPartners` filters only by status and type, so **every logged-in user sees every company's partners, contracts, and revenue.** For a multi-company SaaS that's a data-leak on day one of your second customer. You need a `tenant_id` on every table and enforced row scoping (or Postgres row-level security / schema-per-tenant) before you onboard two companies. Ranked #1 in frictions below.

**Connection pooling: pgBouncer or the Neon/Supabase pooler.** Serverless hosts open many short-lived connections; Postgres caps them. You'll hit the ceiling under light load without a pooler.

**Object storage: Cloudflare R2, AWS S3, or Supabase Storage.** The `legal_documents` table has `file_path`/`file_url` columns but there's no storage backend and no upload handling wired. Real document upload needs one of these.

**Redis (Upstash) + a job queue (BullMQ):** for settlement calculations, scheduled reconciliation, and email sending — the Phase-2 work. Not needed for the CRUD MVP.

**Read replicas, autoscaling, caching:** later, driven by measured load, not anticipated load.

---

## The frictions, ranked by what blocks you first

1. **No multi-tenant isolation** — customer B sees customer A's revenue data. Blocks your second customer. *(Architecture change: `tenant_id` + row scoping.)*
2. **Frontend/backend contract is broken** — the UI doesn't work against the current backend; only login functions. Blocks any demo. *(Being repaired now on PR #46; the durable fix is a shared typed contract.)*
3. **No tests, no CI** — regressions are invisible until a user hits them. *(Add API smoke test + Playwright + GitHub Actions.)*
4. **Auth is MVP-grade** — no reset/verify/MFA/SSO; enterprise Saudi buyers reject it. *(Extend JWT for MVP; buy WorkOS/Auth0 for enterprise.)*
5. **No migrations or backups** — schema changes and data loss are unmanaged. *(Adopt a migration tool + turn on PITR before real data.)*
6. **Saudi compliance** — PDPL residency (drives host region), ZATCA e-invoicing (Phase 2), Arabic/RTL (GTM). *(Counsel + region choice + i18n.)*
7. **No observability or secrets store** — you learn about outages from customers. *(Sentry + uptime monitor + host secrets.)*
8. **Product ≠ strategy** — this is a generic revenue tracker, not the claim-centric Reven PRM (no claim registration, attribution, protection windows, or ledger exist in code). *(A build project, not a deploy step — decide whether to ship the tracker as v0 or build toward the pitch.)*

The tools in sections 1–5 clear frictions 2–7. Friction 1 and friction 8 are design decisions no tool solves — they need your call.
