# Path A roadmap — Reven on Render + Supabase

Path A: deploy the Reven monolith (Node/Express serving the built React UI) to **Render** as a Docker web service, using the existing **Supabase** Postgres as the database. One service, one database, one region.

The single most important thing on this path is not technical — it's that Supabase lives in `ap-southeast-1` (Singapore), and a Saudi B2B finance product storing partner PII will hit **PDPL data-residency** before its first real customer. Everything else is straightforward; that one is a gate. It's covered in Stage 3, and it's the reason the rest of the architecture should stay portable.

The immediate win: you can be live and demoable this week on infrastructure that costs nothing until you have real usage.

---

## Stage 0 — Go live (today, ~1 hour, your action)

1. **Render → New → Blueprint → connect the repo.** It reads `render.yaml`.
2. Set env vars in Render:
   - `DATABASE_URL` = the Supabase **Transaction pooler** URI (Project Settings → Database → Connection string → URI). Use the pooler host on port **6543**, not the direct connection on 5432 — see the pooler note below.
   - `DB_SSL` = `true`
   - `JWT_SECRET` = a **new** `openssl rand -base64 48`. Do not reuse the value pasted earlier in chat — that one is compromised the moment it entered the transcript.
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = your Render URL (tighten to your custom domain once you have one).
3. Deploy. The app auto-runs migrations at boot; the Supabase schema is already applied and its history seeded, so it starts serving immediately. Health check is `/api/health`.
4. Smoke it: open the URL, create a workspace, run one claim to an eligible preview.

**The pooler gotcha (this one actually bites).** Supabase's free tier caps *direct* Postgres connections at roughly 60. A Node `pg` Pool with `max: 20`, times a couple of Render instances or a restart storm, exhausts that and you get intermittent `too many connections` 500s — during a demo, which is the worst time. Use the **transaction pooler** (Supavisor, 6543): it multiplexes many clients over few Postgres connections. Your code is compatible because it uses plain parameterized queries and short per-request transactions (`BEGIN…COMMIT` in one checkout) — no session state, no cross-statement prepared statements, which are the things transaction-mode pooling breaks. Keep the pool `max` modest (≤10). This is a config choice, not a code change.

---

## Stage 1 — Demo-grade (week 1)

- **Get off the free web tier before the first external demo.** Render's free service sleeps after ~15 minutes idle and cold-starts in 30–60s. A CFO clicking your link and watching a spinner concludes the product is broken — in a *trust* product, that first impression is expensive. The DB-retry logic in `server.js` covers the cold start technically, but not the perception. Move to Starter (~$7–25/mo, estimate — check current pricing) so the app is always warm.
- **Custom domain + TLS + Cloudflare in front.** Cloudflare gives you TLS, a CDN for the static assets, a WAF, and DDoS protection in one place. Lock `CORS_ORIGIN` to the domain.
- **Observability from day one.** Sentry on both halves (a frontend crash is currently a blank screen; a backend error is a log line nobody reads), an uptime monitor pinging `/api/health`, and Render's logs. You want to hear about an outage before your design partner does.
- **Turn on backups.** This is not optional for you specifically: your product's whole claim is to be a *system of record* with an append-only ledger. A system of record that loses its records is worthless. Enable Supabase point-in-time recovery (Pro plan) or at minimum daily backups before any real data lands.

---

## Stage 2 — Production-grade (weeks 2–6)

- **CI before auto-deploy.** Render auto-deploys on push to the connected branch. Without a gate, a broken push auto-ships. Add a GitHub Action that runs the backend smoke test (`scripts/smoke-reven.sh` against a throwaway Postgres service) and the Playwright UI flow, and require it green before merge.
- **Move migrations out of the boot path.** Running `createTables` + `runMigrations` in-process on every boot is fine now and idempotent, but on a real dataset a slow or failed migration wedges startup, and two instances booting together race. Switch to a Render **pre-deploy/release command** (`npm run migrate`) so schema changes happen once, before the new version takes traffic.
- **Auth maturity.** Add password reset and email verification (needs an email provider — Resend or Postmark), rate-limit `/api/reven/auth/*` against credential stuffing, and shorten token lifetime or add refresh tokens. The tenant token currently lives in `localStorage` (XSS-reachable, 7-day) — acceptable for a pilot, revisit before you hold sensitive data at scale. Enterprise SSO (WorkOS/SAML) is a "when a buyer demands it" item, not now.
- **Secrets hygiene.** Env vars in Render are fine to start; graduate to a secret manager (Doppler / 1Password) when more than one person deploys.

---

## Stage 3 — The residency reckoning (before the first real customer)

This is the Path-A decision that everything else should be arranged around.

- **Where you are:** Supabase `ap-southeast-1` (Singapore). Two consequences.
  - *Latency:* round-trip Singapore↔KSA is on the order of 150–250ms (estimate); the app will feel a little sluggish for Saudi users but is usable. Putting Render in Frankfurt (~100ms to KSA, estimate) helps; it doesn't fix residency.
  - *Residency (the real issue):* Saudi PDPL, enforced by SDAIA, governs where personal data lives and how it transfers. Partner and customer PII in `partner_identities`, `claims`, and `tax_profile` is exactly the data it covers. Supabase has no KSA region. **Get counsel** on whether your pilot data and your first real customer's data can sit in Singapore, or whether you need KSA-resident (or approved-transfer) hosting.
- **The move, if required:** migrate the database to a KSA-resident Postgres — AWS Bahrain (`me-south-1`), Google Dammam, Oracle Jeddah, or a local provider (stc cloud, Sela). Because you use plain Postgres (see the lock-in note below), this is a `pg_dump`/`pg_restore` plus a `DATABASE_URL` change and a short maintenance window — not a rewrite. Render itself is portable too, or you re-point at a KSA app host.
- **The threshold:** pilot and demo on **synthetic data** anywhere. Resolve residency **before** onboarding the first customer that stores real personal or financial data. The cost of moving grows with every row and every integration you add, so decide early even if you act later.

---

## Stage 4 — Scale boundaries (when growth forces it)

- **The monolith holds a long way** — one service, frontend and backend coupled, is fine into the thousands of users. The boundary is *deploy cadence*: today a one-line CSS change redeploys the backend. When frontend and backend need independent release rhythms (usually once you have more than one or two engineers), split them — frontend to a CDN host (Cloudflare Pages/Vercel), backend stays on Render/Fly. Your `VITE_API_URL` switch already supports split hosting.
- **Database scale:** vertical first (a bigger Supabase instance), then read replicas for reporting, then attention to the append-only tables (`claim_events`, `ledger_entries`, `audit_log`) which grow without bound — they'll want partitioning or archival eventually. The transaction pooler already handles connection scaling.
- **Background work:** eligibility recomputes, protection-window expiry notifications, and V1's evidence-pack assembly are synchronous today. They'll want a job runner (Render Cron, or a queue like Upstash + BullMQ) as volume grows.
- **HA:** one Render service + one Supabase instance is a single point of failure. Fine for pilots; a system-of-record for money needs redundancy before it's load-bearing for real customers.

---

## The architecture, drawn

```
Browser ──HTTPS──► Cloudflare (TLS, CDN, WAF)
                        │
                        ▼
              Render web service (Docker)
              ├─ Express API  /api/reven/*   (JWT tenant auth, business logic)
              └─ serves built React SPA      (everything else → index.html)
                        │
                        │ Postgres over TLS, Transaction pooler :6543
                        ▼
              Supabase Postgres (ap-southeast-1)
              ├─ RLS deny-by-default (anon API blocked)
              ├─ append-only triggers (events / ledger / audit)
              └─ backend connects as postgres (bypasses RLS)
```

Boundaries this makes explicit: the browser never touches Postgres or the Supabase anon API — everything routes through your Express layer, which is where auth, the attribution state machine, and the eligibility calculation live. Supabase is used as **plain Postgres**, nothing else.

---

## Second- and third-order consequences (the part that matters)

**1. Free tier → cold start → lost design partner.**
Free web service sleeps → first click is a 30–60s spinner → the demo looks broken → you start "warming it up" before sharing links → friction in the exact sales motion the product exists to remove → momentum lost with a scarce design partner (you need only 3–5, so each one is precious). *Act:* paid tier before the first external demo.

**2. Singapore region → residency block → migration debt that compounds.**
Non-KSA region → first real customer's PII can't (likely) live there → first real pilot blocked → forced region migration → data + downtime + re-pointing → and the cost grows with every row and integration you add before you move. *Act:* synthetic data for pilots; resolve residency before real PII; move early if you're moving.

**3. You used raw `pg`, not supabase-js — and that quietly saved you.**
Because the code talks to Supabase as plain Postgres (no PostgREST, no Supabase Auth, no proprietary SDK), your lock-in is near zero → the residency migration in (2) is a `pg_dump`/restore, not a rewrite → your architecture preserved the optionality your geography will demand. This was the right call; keep it. Don't adopt Supabase-proprietary features casually, or you trade that optionality away.

**4. US-hosted infra → procurement objection → the need for a sovereign tier.**
Render and Supabase are both US companies → fine for pilots → but a Saudi bank or government buyer may reject US-hosted infrastructure for partner financial data → your hosting becomes a sales objection, not just a tech choice → you'll need a KSA-hosted "sovereign" deployment as an enterprise SKU. Your Docker image + standard Postgres make that a *deployment target*, not a rebuild — so treat "dedicated KSA deployment" as a priced enterprise tier, planned, not a scramble mid-deal.

**5. Boot-time migrations → startup wedge at scale.**
Convenient now → but a heavy migration on a large table, run in-process on boot, blocks the service from taking traffic, and concurrent instances race → move to release-phase migrations before your data is big enough to make a migration slow.

**6. Append-only ledger without backups → an un-recoverable trust failure.**
The ledger/audit design is your credibility → but on Path A without PITR, a Supabase data incident loses it → a "system of record" that lost its records can't be trusted again → backups are existential here in a way they aren't for a typical CRUD app. Non-negotiable before real data.

**7. Ship-this-week speed → entrenched Phase-1 shortcuts.**
Path A gets you live fast → early gate metrics → pre-seed proof → but speed can quietly harden shortcuts (single region, no SSO, localStorage tokens) into "how it works" → set explicit "before real money/data" gates so velocity now doesn't become debt you discover during due diligence.

**8. One shared Supabase project → noisy-neighbour and enterprise-isolation limits.**
All tenants share one database, isolated by `tenant_id` + RLS → cheap and simple → but a heavy or compromised tenant can affect others, and a large enterprise buyer may demand a dedicated instance → your `tenant_id` isolation plus Docker portability lets you offer "dedicated deployment" as an upsell rather than re-architecting. Design new features tenant-scoped from the start so this stays true.

---

## Business / 360 view

- **Cost curve:** $0 to start → roughly $25–75/mo for real pilots (Render Starter + Supabase Pro, estimate) → scales with usage. Trivial relative to the runway in your pre-seed model until real scale.
- **Speed to market:** Path A demos this week. Given the competitive clock your own audit flags (AppDirect consolidating Capture + marketplace), being able to put a working, claim-centric, compliance-aware product in front of a Saudi design partner *now* is worth more than a perfect architecture later.
- **Fundraising:** your pre-seed proof is the Phase-1 exit gate — 100+ real claims, 3–5 design partners with a finance-accepted evidence pack, time-to-first-claim under 14 days. The app already instruments those metrics on the Command Center. Path A is the fastest way to start generating that evidence with real users.
- **Sovereignty as a sales axis:** in KSA B2B/gov, *where the data lives and who owns the infra* is a buying criterion, not a footnote. Path A's honest position: "portable by design — pilot in the cloud, deploy sovereign for enterprise." Say that out loud; it turns a weakness into a roadmap.
- **Team/ops:** a monolith on Render is one thing to operate — the right complexity for a pre-seed team. Don't add Kubernetes, microservices, or a service mesh because a blog said to; you have neither the load nor the people to justify the operational tax.

---

## Decision thresholds (do X when Y)

| Do this | When |
|---|---|
| Move off Render free tier | Before the first external demo |
| Add Cloudflare + custom domain + CORS lock | Before sharing a public link |
| Turn on Supabase PITR/backups | Before any real (non-synthetic) data |
| Add CI gate before auto-deploy | Before a second person can push |
| Move migrations to release phase | Before the DB is large enough to make a migration slow |
| Resolve PDPL residency / plan KSA hosting | Before the first customer with real PII |
| Add SSO (WorkOS) | When an enterprise buyer requires it in procurement |
| Split frontend/backend hosting | When their deploy cadences diverge (usually 2+ engineers) |
| Offer a dedicated/sovereign deployment | When an enterprise buyer requires isolation or KSA residency |

---

## What Path A cannot do (the honest limits)

- It is **not KSA-resident** and has no KSA region option on Supabase — the residency gate is real.
- The free tier is **not demo-grade** — cold starts will undercut you.
- It is **single-region, single-instance** — no HA until you add it.
- It runs on **US-headquartered vendors** — a procurement objection for some Saudi enterprise/gov buyers.
- It does **not** move you past Phase-1 — it's the fastest way to *run* Phase-1 Capture with real users, nothing more. Settle (the real moat) is still unbuilt, by design.

Path A is the right call precisely because it maximizes the one thing you're short on at pre-seed — time-to-real-users — while your `pg`-only, Docker-packaged, standard-Postgres architecture keeps the expensive later decisions (residency, sovereignty, scale) cheap to act on when they arrive.
