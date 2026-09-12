# Reven — Partnership Action Runtime

Governed verbs on an append-only claim ledger.

Connectors may submit evidence. Only a signed operator may declare what was earned. Phase 1 records payout milestones. It does not move money.

**Read [`docs/RUNTIME.md`](docs/RUNTIME.md) before any strategy paper.** Strategy in `docs/` is the venture roadmap. The software is one OS with three desks.

## Start here

The product is in [`app/`](./app).

| Path | Role |
|---|---|
| [`app/src/lib/reven/catalog.ts`](app/src/lib/reven/catalog.ts) | Frozen verbs. Actor policy. Recipe graphs. |
| [`app/src/lib/reven/engine.ts`](app/src/lib/reven/engine.ts) | `dispatchAction`. Journals. Outbox drain. |
| [`app/src/lib/reven/ledger.ts`](app/src/lib/reven/ledger.ts) | Balanced double-entry in integer minor units. |
| [`app/src/lib/reven/queries.ts`](app/src/lib/reven/queries.ts) | Tenant-scoped server functions. |
| [`app/src/lib/reven/seed.ts`](app/src/lib/reven/seed.ts) | GCC book (Diriyah, Elm, Nearpay, Return·ANB). |
| [`app/src/routes/_app/`](app/src/routes/_app) | Runtime, claims, partners, ledger, recipes, statements, connectors, audit. |
| [`app/src/routes/api/v1.actions.ts`](app/src/routes/api/v1.actions.ts) | Tenant Actions API. Human desks return 403. |
| [`app/src/routes/api/v1.webhook.ts`](app/src/routes/api/v1.webhook.ts) | Evidence only: `register_claim`, `record_revenue_fact`. |
| [`app/migrations/`](app/migrations) | Schema. Every row is `user_id` scoped. |

Journals are the book. The `claims` row is a projection.

## Contract

Eleven verbs:

`register_claim` → `run_preflight` → `bind_agreement` → `decide_attribution` → `record_revenue_fact` → `evaluate_eligibility` → `record_payout_milestone` → `compose_statement` → `issue_statement` → `open_dispute` → `resolve_dispute`

A webhook cannot record a payout. Attribution is a named human. Eligibility is computed from the agreement, never typed in.

API keys cannot fire `decide_attribution`, `open_dispute`, `resolve_dispute`, or `record_payout_milestone`.

## Run

```bash
cd app
npm ci
npm run dev
```

TanStack Start + Postgres (PGLite locally, Neon in production). The live book seeds on first open.

## Docs

Governing software contract: [`docs/RUNTIME.md`](docs/RUNTIME.md). Operating manuals, pricing, GTM, market papers: [`docs/`](./docs). Brand marks: [`brand/`](./brand).

Issues opened before 2026-09-12 refer to the retired Express app.
