# Reven kernel

Journals are the book. The `claims` row is a projection the desks read.

## Actors

| Actor | May fire |
|---|---|
| `user` | Every frozen verb |
| `webhook` | `register_claim`, `record_revenue_fact` |
| `api` | Everything except the human desks |
| `recipe` | `run_preflight`, `evaluate_eligibility`, `compose_statement`, `issue_statement` |

Human desks: `decide_attribution`, `open_dispute`, `resolve_dispute`, `record_payout_milestone`.

## Recipes

- **follow** — outbox drains them. Pause holds the row; unpause resumes.
- **human** — listed so operators can see the desk. Never auto-fired.
- **operator** — a button (period close, evidence pack).

Connectors cannot record a payout. Eligibility is computed from the agreement.
