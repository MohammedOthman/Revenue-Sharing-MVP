# Runtime contract

This is the source of truth for **what the software does**. Strategy papers in this folder are the venture roadmap. Where they disagree with this file, this file wins.

## Product

Reven is a partnership **action runtime**. Connectors submit evidence. Only a signed operator may declare what was earned. Phase 1 records payout milestones. It does not move money.

The UI exposes three **desks** in one OS — Capture, Settle, Orchestrate. That is the software cut. The commercial roadmap may still sell Capture first and gate Settle as a SKU. Desks are not years.

## Kernel

| Path | Role |
|---|---|
| `app/src/lib/reven/catalog.ts` | Frozen verbs. Actor policy. Recipe modes. |
| `app/src/lib/reven/engine.ts` | `dispatchAction`. Outbox drain. Claim **projection**. |
| `app/src/lib/reven/ledger.ts` | Balanced double-entry in integer minor units. |
| `app/src/lib/reven/queries.ts` | Tenant-scoped server functions. |
| `app/migrations/` | Schema. Every row is `user_id` scoped. |

Journals are append-only. The `claims` row is a denormalized projection the desks read. Status changes by firing a verb, which writes a journal and then updates the projection.

## Actors

| Actor | May fire |
|---|---|
| Signed operator (`user`) | Every verb |
| Webhook | `register_claim`, `record_revenue_fact` |
| API key | Every verb except human desks |
| Recipe | `run_preflight`, `evaluate_eligibility`, `compose_statement`, `issue_statement` |

Human desks: `decide_attribution`, `open_dispute`, `resolve_dispute`, `record_payout_milestone`.

## Recipes

- **follow** — outbox drains them. Pause **holds** the row. Unpause resumes. Paused rows do not starve other recipes.
- **human** — visible desks. Never auto-fired.
- **operator** — a button (period close, evidence pack).

## Tenancy

Every table is `user_id` scoped. Preview may run as a single operator (`VITE_AUTH_ENABLED=false`). That is a demo gate, not a second data model. Production with a database URL must not run with auth off.

## Stack

TanStack Start in `app/`. Postgres (PGLite locally, Neon when `DATABASE_URL` is set). Not Express. Not Docker. Issues opened before 2026-09-12 refer to the retired `revenue-share-platform` tree.
