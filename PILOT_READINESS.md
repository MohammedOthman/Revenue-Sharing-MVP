# Pilot launch readiness — Reven Partner Revenue OS (Phase 1: Capture)

The code-buildable Phase-1 foundation is in place and green in CI: tenant isolation is
enforced at the database and proven through the HTTP layer, financial figures are
calculated server-side, the audit trail is immutable, and the scoped journeys — partner
revenue claim, attribution decision, protection window, contract-amendment notice, and
evidence pack — work end to end without moving money. What stands between this branch and a
client pilot is mostly **not** code: hosting and data region, SSO, encryption at rest, a
penetration test, PDPL/ZATCA sign-off, and signed pilot agreements. Five in-scope code gaps
and a short list of product/legal decisions remain and are named below.

Scope of this document: it maps the readiness definition distributed across the strategy
corpus to the concrete state of `revenue-share-platform/`. Sources cited inline:
`partner-revenue-os-PDR-v5.md` §9–§10, §19 (MVP exit criteria and non-functional
requirements); `Reven_Product_Architecture_Audit.md` (the earlier code-gap audit);
`Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` and
`Reven_Execution_Plan_Next_2_Quarters.md` (the Phase-1 exit gate); `ROADMAP_ALIGNMENT_AUDIT.md`
(the finance boundary).

Status labels:

- **Done** — built, exercised, and covered by a test or a live check.
- **Partial** — the core is built; a named piece is missing.
- **Needs build** — in Phase-1 scope, code-buildable, not yet built.
- **Needs infra** — depends on hosting/deployment decisions outside this repo.
- **Needs legal** — depends on legal/compliance work or a counterparty.
- **Needs pilot** — can only be measured by running a pilot.

## The finance boundary this release holds

`ROADMAP_ALIGNMENT_AUDIT.md` §2 states the rule: *"Calculate / track / prepare only. No money
movement, no settlement automation, no payout execution, no automated tax clearance."*

This release records and previews only. There is no payout execution, settlement, fund
routing, ERP write-back, or automated ZATCA/WHT clearance anywhere in the code. "Send notice"
and "finalize evidence pack" record immutable states; they do not move money or post to an
external system. The boundary holds by construction, not by discipline alone — no payment or
settlement dependency exists to invoke.

## Product journeys — definition of done (`partner-revenue-os-PDR-v5.md` §19)

| Exit criterion | Status | Evidence / what's left |
|---|---|---|
| Register a partner-sourced deal (Partner Revenue Claim) | Done | `claim.model.js` / `claim.controller.js`; submit → review → approve/reject; amounts server-controlled; `claim.integration.test.js` |
| Human attribution of record | Done | `attribution.model.js`; proposed → confirmed; edits blocked after confirm |
| Protection window with expiry | Partial | `protection_windows` with derived `expired` status and audited release exist. FR-08's expiry **notification + re-claim event** and "override without reason/approver is blocked and audited" are **not** built (**Needs build**) |
| Eligibility previewed **with an explanation** | Needs build | Amounts are stored and displayed; there is no eligibility service that returns the rule/explanation behind a figure |
| Recorded first-payout milestone | Done | `POST /claims/{id}/mark-payout-ready` records a `payout_ready` milestone (migration 010), gated by the readiness check below; `claim.payout.integration.test.js` proves the flow. It records a fact only — no money moves |
| Every state change emits an event and is auditable | Done | Governance objects and basic CRUD (partner, contract, revenue, KPI, legal document) both audit create/update/delete via `safeAudit`; `crud.audit.integration.test.js` proves it through the API. The rule/evidence linkage FR-13 describes for a money-affecting decision is not yet captured (see below) |
| No cross-tenant access | Done | Enforced by RLS as the `reven_app` role; proven through HTTP in `rls-http.integration.test.js` |
| Payout-bearing claims blocked until bank + tax verified (FR-04) | Done | A claim carries `bank_verified` / `tax_verified` state; `mark-payout-ready` returns 422 with the missing requirements until the claim is approved and both are verified, and verification locks once payout-ready. Who is *authorized* to verify or mark is an open org decision (today any tenant member may) |
| Evidence pack a finance reviewer can accept | Done | Evidence items + packs; `finalize` locks the pack read-only; `evidence.integration.test.js` proves the finalized-pack guarantee end to end |
| Contract-amendment notice (real, readiness-gated) | Done | Amendment journey; send-notice blocked (422) until 14 readiness checks pass |
| CSV in/out | Needs build | Not present in the current API surface |

## Security and tenant isolation (`partner-revenue-os-PDR-v5.md` §10, FR-14)

| Requirement | Status | Evidence / what's left |
|---|---|---|
| Multi-tenant isolation; cross-tenant access impossible | Done | `tenant_id` on every client table; RLS policies (migrations 004–009); app serves requests as non-superuser `reven_app` via `tenantScope` middleware; proven in `rls.integration.test.js` and `rls-http.integration.test.js` |
| Full audit trail | Done | `audit_events` is append-only (DB trigger, migration 003) and tenant-isolated (migration 009); every governance transition and every basic-CRUD create/update/delete records an event |
| Field-level authorization / partner-vs-internal separation | Needs build | Isolation is per-tenant, not per-role-field. There is no partner user role and no internal-vs-finance field masking; user administration is global |
| SSO (Entra ID) | Needs infra | JWT login exists; enterprise SSO is a deployment/integration item (`Large_Enterprise_Client_Onboarding_Manual.md` §21.1) |
| Encryption in transit and at rest | Needs infra | `helmet` and a CORS allowlist are set; TLS termination and disk/field encryption are hosting concerns |
| Request hardening (rate limiting, schema validation) | Done | `express-rate-limit` (general + stricter auth cap); `express-validator` on writes; environment validation on boot |

## Financial integrity and audit (`partner-revenue-os-PDR-v5.md` §10)

| Requirement | Status | Evidence / what's left |
|---|---|---|
| Share amount derived server-side, never client-supplied (FR-12) | Done | `revenue.model.js` `calculateShareAmount`; the create validator intentionally does not accept `shareAmount` |
| Immutable approved evidence | Done | A finalized evidence pack and its items reject edits, additions, and deletes (409) |
| Append-only ledger; corrections are offsetting entries (FR-11) | Partial → Needs build | The immutable record today is `audit_events`. Claim and `revenue_shares` rows are still mutable status rows, not an append-only double-entry ledger with reversal entries. `Reven_Product_Architecture_Audit.md` names this as the load-bearing gap |
| Reproducible rule evaluation (same inputs → same verdict) | Needs build | No rule engine yet; amendment readiness checks are the closest deterministic evaluation |
| Auditability: money-affecting records reconstructable (who/what/when/why) | Partial | The audit log captures actor, action, entity, tenant, timestamp, and metadata for governed changes; it does not yet capture the rule/evidence linkage FR-13 describes for a money-affecting decision |

## Reproducible production

| Requirement | Status | Evidence |
|---|---|---|
| Versioned DB migrations | Done | `migrations/001`–`009`, tracked in `schema_migrations`, applied in order |
| CI on every push | Done | `.github/workflows/ci.yml`: full test suite against `postgres:16` (`RUN_DB_TESTS=1`) + frontend build; green on this branch |
| Containerized deploy | Done | Docker + compose (Postgres + backend + frontend) |
| `.env.example` / config validation | Done | `.env.example` documents owner and `reven_app` roles; `assertEnv` fails fast on missing config |
| API contract in sync | Done | OpenAPI 3 served at `/api/docs`; `openapi.test.js` fails if a documented path drifts |
| Backups, DR (RPO ≤ 5 min, RTO ≤ 1 hr), 99.9% availability | Needs infra | Deployment/operations targets from §10; not a code artifact |
| Performance (interactive reads p95 < 1s) | Needs infra | Target to validate under real hosting and data volume |

## Compliance and data residency (`partner-revenue-os-PDR-v5.md` §10)

| Requirement | Status | Notes |
|---|---|---|
| PDPL (KSA) / GDPR-class handling | Needs legal | Data-handling and DPA review; retention and deletion policy |
| KSA/GCC data-residency option | Needs infra | Region selection is a hosting decision; the schema already supports a `region` per tenant |
| ZATCA e-invoicing references; WHT/VAT correctness | Needs legal + needs build | Phase 1 captures compliance fields only. Field capture is **Needs build**; correctness sign-off is **Needs legal**. Execution/clearance is explicitly Phase 2 |
| Penetration test; SOC 2-equivalent controls | Needs infra | External security review; `Large_Enterprise_Client_Onboarding_Manual.md` §21.1 lists the client-facing security pack |

## Decisions needed before or at the pilot (product / legal)

These block correct implementation, not compilation, and were deferred rather than guessed:

- The authoritative definition of a claim and of an attribution of record for the pilot client.
- Who approves payout-readiness, and what evidence is mandatory per claim type.
- The pilot client, a signed pilot agreement, and an onboarding plan
  (`Large_Enterprise_Client_Onboarding_Manual.md`).

## Business exit gate — measured during the pilot, not before

The Phase-1 exit gate that unlocks Phase 2 (Settle) is not a build target; it is an outcome
of running pilots (`Reverse_Engineered_Strategy...md`; `Reven_Execution_Plan_Next_2_Quarters.md`):

- 100+ real claims processed on messy CRM data — **Needs pilot**
- 3–5 design partners, each with a finance-accepted evidence pack — **Needs pilot**
- Weekly active usage by partner-ops/finance — **Needs pilot**
- Time-to-first-claim < ~14 days — **Needs pilot**
- One CFO proof sentence ("these numbers reconcile") — **Needs pilot**

## Summary

Ready now: tenant isolation (enforced and proven), server-side financial figures, immutable
audit trail, the five scoped journeys, migrations, CI, Docker, and the OpenAPI contract.

Code gaps still in Phase-1 scope: the append-only ledger with offsetting corrections, the
eligibility-with-explanation preview, the activation / time-to-first-value clock, and
field-level/partner-facing access. None of these move money.

Outside this repo: hosting and region, encryption at rest, SSO, backups/DR, PDPL/ZATCA
sign-off, a penetration test, and signed pilot agreements — plus the product/legal decisions
listed above.
