# Partner Revenue OS — Product Definition & Operating System
## PDR v5

**Document type:** Product Definition Requirements (PDR) + Product Operating System.
**Supersedes:** PDR v4.1 (which superseded v3). The architecture and the ten decisions are carried forward intact; v5 adds the strategy, journey, requirement-structure, metric, and risk layers that make the document decision-ready and build-ready.
**Source inputs:** the Partner Lifecycle Touchpoint Atlas v2 (requirements source), the v3 architecture audit (resolved here as ADRs), the partner-lifecycle economic deep-structure (thesis, metrics, moat).
**How to read:** start with the Executive Summary. Part I is *why and for whom*; Part II is *what it does* (capabilities, journeys, requirements); Part III is *how it is built* (architecture and the ten decisions); Part IV is *how it ships and runs* (releases, metrics, risks, operating model). Appendix A (glossary) is binding language; §18 (ADR index) records every hard-to-reverse decision.

---

## Executive summary

Partner Revenue OS is the **system of record and control layer for partner-sourced revenue**. It governs one canonical object — the Partner Revenue Claim — attributes credit to partners defensibly, and turns partner economics into something finance can audit and leadership can invest against.

**The problem.** In most companies, partner activity is scattered across spreadsheets, CRM notes, chat, contract PDFs, and manual payout files, so partner revenue cannot be attributed, forecast, or defended to finance. Beneath that symptom sit four structural problems every partner program must solve: screening partners whose true quality you cannot observe (adverse selection), eliciting effort you cannot verify (moral hazard), protecting sunk selling investment under incomplete contracts (hold-up), and sustaining a self-enforcing relationship on trust (credible commitment).

**The strategy.** Every competing tool instruments the *transaction* layer — registration, the order, the invoice, the dashboard. The **wedge** is to become the trusted system of record for partner-sourced revenue (capture first). The **moat** is to instrument the **information and trust** layer that actually determines outcomes and that competitors are structurally blind to: time-to-first-payout, effort-share, shadow contribution, fair and contestable attribution, protection as an audited right, and a humane reverse/clawback path. Capture first, attribute second.

**Who it's for.** The economic owner is the **Head of Partnerships**; the validator and second buyer is **Finance / Revenue Accounting**. The **partner** is a first-class user whose fast, fair, transparent experience is a design goal, not an afterthought. The product is built segment-agnostic and global-ready (multi-currency, multi-entity, Arabic/RTL, ZATCA/WHT/VAT), so it can serve the regulated and GCC buyers that incumbents underserve.

**The MVP** proves one visible loop in days, not months: a partner registers a deal → a human attributes it (model-advised) → eligibility is previewed *with an explanation* → the first-payout milestone is visible. Finance-grade depth (ledger, tax, clawback) and the intelligence layer (effort-share, ROI, forecasting) follow on a sequenced roadmap.

**The architecture** rests on ten decisions (Part III), led by: one canonical, human-authoritative Attribution of Record; an append-only double-entry payout ledger with clawback-by-netting; a single bitemporal rule-evaluation service; event-sourced writes; multi-tenancy with a cross-tenant partner identity; and a strict system-of-record boundary.

**The bet.** In a category where everyone competes on payout speed and recruitment volume, the durable position is finance-grade attribution *plus* the instrumentation of the moments that actually decide partner-program outcomes — which is also the position regulated and GCC buyers cannot get anywhere else.

---

## Table of contents

**Part I — Strategy & Definition**
1. Vision & product thesis
2. The problem & opportunity
3. Product strategy: wedge, moat, and the bet
4. Target users & personas
5. Product principles
6. Scope & non-goals

**Part II — The Product**
7. Capability model & prioritization
8. Key user journeys
9. Functional requirements
10. Non-functional requirements

**Part III — Architecture & Decisions**
11. Domain model
12. State machines & lifecycles
13. The rule-evaluation service
14. The financial ledger model
15. Cross-cutting subsystems
16. Integration architecture & semantics
17. Closed-loop wiring
18. Architecture Decision Records

**Part IV — Delivery, Metrics & Operating Model**
19. Release plan
20. Success metrics: North Star & metric tree
21. Risks, assumptions & validation
22. Open questions & resolution plan
23. Product operating model

**Appendices**
- A. Glossary (CONTEXT.md)
- B. Traceability & how the prior work maps in

---

# PART I — STRATEGY & DEFINITION

## 1. Vision & product thesis

- **One line:** Partner Revenue OS is the system of record and control layer for partner-sourced revenue — it governs the canonical claim, attributes credit defensibly, and makes partner economics finance-ready and investable.
- **What it is not:** a PRM directory, an affiliate tracker, a partner portal, a dashboard, a contract repository, or a commission calculator. Those are features it subsumes, not the product.
- **The differentiating thesis (the moat):** competitors instrument the *transaction* layer. Partner Revenue OS instruments the **information and trust** layer — the touchpoints that determine partner-program outcomes and that operational tooling cannot see (time-to-first-value, time-to-first-payout, shadow contribution, effort-share, champion continuity, protection as an audited right, fair and contestable attribution, the humane reverse path).
- **Strategic posture:** overlay and integrations first; a selective system of record for the partner-revenue objects it owns, expanding over time.

## 2. The problem & opportunity

**The symptom.** Partner revenue is run on scattered truth — spreadsheets, CRM notes, chat threads, contract PDFs, manual payout files. The consequence is that no one can answer, with evidence, *which revenue a partner drove, what the company owes for it, and whether the program is worth the investment.*

**The four structural problems** beneath the symptom — the product exists to make them operationally solvable:

- **Adverse selection (screening).** Neither side observes the other's true type before committing; selection is *mutual* and most tooling solves only the vendor's half, so the best partners self-select away.
- **Moral hazard (hidden effort).** Partner and vendor effort is unobservable and non-contractible; it must be elicited and measured, not assumed.
- **Hold-up (relationship-specific investment).** Both sides sink non-redeployable investment under incomplete contracts and are exposed to expropriation — which is *why* deal-registration and protection exist, as engineered quasi-property rights.
- **Credible commitment (relational contract).** The relationship is governed by a self-enforcing agreement sustained by trust; trust is relational capital that lowers every transaction cost in the system.

**Why now.** Partner and ecosystem-led revenue is a growing share of B2B GTM; finance and audit scrutiny of it is rising (revenue recognition, tax, ZATCA e-invoicing in KSA); and incumbents optimize payouts and recruitment while leaving attribution and finance-grade governance thin — a widening gap, most acute for regulated and GCC buyers.

**Cost of the status quo.** Overpayment and underpayment of partners; channel conflict that suppresses pipeline; disputes that consume executive time; partner churn driven by slow or unexplained payouts; and a partner P&L that leadership cannot trust at budget time — so good programs get cut for lack of defensible numbers.

**The opportunity.** Own the canonical record of partner-sourced revenue and the trust/information layer around it — becoming the place partner economics are proven, defended, and optimized.

## 3. Product strategy: wedge, moat, and the bet

- **Wedge (how we earn the first yes):** become the trusted **system of record for partner-sourced revenue** — registration, deterministic tracking, CRM linkage, and finance-grade evidence. It delivers fast, visible value ("we now know, with evidence, which revenue came from which partner") and produces the data exhaust everything else needs.
- **Moat (why we stay and why we're hard to copy):** instrument the **information and trust touchpoints** competitors are blind to — time-to-first-payout, effort-share, shadow contribution, informativeness-weighted and contestable attribution, protection as an audited right, and a humane reverse/clawback path. These accrue switching costs (data, integrations, relational history) and are the unserved position for regulated/GCC buyers.
- **Sequence:** *capture first, attribute second.* Multi-touch attribution is the premium, defensible layer — but it requires the touchpoint graph that capture produces, so it is built on top of the record, not led with.
- **Where we win vs. the field:** PartnerStack-class tools win on payout speed and recruitment volume; Impartner-class on enterprise PRM workflow; Crossbeam-class on co-sell data overlap. Partner Revenue OS wins where all are weak — finance-grade attribution and the trust/information layer — and where regulated and GCC buyers are unserved (Arabic/RTL, multi-entity, ZATCA/WHT/VAT).
- **What we deliberately don't do:** become a CRM, ERP, billing engine, or full CLM; replace the customer's systems of record; move money before entitlement is trusted; or let an algorithm assign credit without human authority.

## 4. Target users & personas

Each persona is given its context, job-to-be-done, top pains, what success looks like, and the surface it primarily lives in.

- **Head of Partnerships — primary economic owner.** *Context:* owns the program and its number; judged on partner-sourced revenue and ROI. *JTBD:* run partnerships as a predictable revenue line; prove contribution; defend ROI; allocate investment. *Top pains:* can't prove partner impact; disputes; no forecast; the budget conversation. *Success:* a defensible partner P&L and a program that survives budget scrutiny. *Surface:* command center, program and partner views.
- **RevOps / Partner Ops — primary daily operator.** *Context:* runs the machine day to day. *JTBD:* keep claims, matches, and CRM linkage clean; clear exceptions; maintain attribution integrity. *Top pains:* duplicate records, broken matches, exception pile-ups, manual reconciliation. *Success:* a low, draining exception queue and trustworthy data. *Surface:* work queues, exception drain, match review.
- **Finance / Revenue Accounting — validator and second buyer.** *Context:* owns payout liability and audit. *JTBD:* know what the company owes and why; trust the evidence; reconcile to ERP; satisfy audit, tax (ZATCA/WHT/VAT), and revenue recognition. *Top pains:* paying on weak evidence; unexplained eligibility; reconciliation breaks; tax exposure. *Success:* every payout has an explanation and an immutable evidence pack; clean reconciliation. *Surface:* eligibility, evidence packs, the ledger, settlement.
- **CRO — validator.** *Context:* owns the revenue number and the sales force. *JTBD:* see partner influence in pipeline and forecast; manage channel conflict; align sales credit. *Top pains:* channel conflict; partner activity invisible in CRM. *Success:* partner context visible in CRM with minimal rep effort; conflict managed. *Surface:* CRM write-backs, forecast/pipeline views.
- **Sales rep / AE — internal stakeholder, often adversarial.** *Context:* carries quota; may see partners as a threat. *JTBD:* see partner context with minimal data entry; not be penalized by partner involvement. *Top pains:* feeling their deal/credit is taken. *Success:* partner involvement is clear and their comp is not silently harmed. *Surface:* CRM (in-context partner fields).
- **Partner — alliance/BD lead (your champion).** *Context:* the human the relationship lives inside; chooses where to spend finite selling effort. *JTBD:* register and protect deals, see status, get paid fast, contest fairly. *Top pains:* opaque status; slow/disputed payouts; silent protection expiry. *Success:* fast first payout, transparent statements, fair and contestable credit. *Surface:* the partner portal.
- **Partner — finance/AP (a separate human).** *Context:* met only at payment time. *JTBD:* invoice and get paid cleanly; resolve tax and bank setup. *Top pains:* payee setup friction; unexplained deductions. *Success:* clean, explained payments. *Surface:* statements, payout/tax details.
- **CEO / GM, Strategy, Board — existential validators.** *Context:* decide whether the program lives or dies. *JTBD:* partner revenue as a governed strategic line. *Top pains:* anecdotal partner reporting; no confidence at budget time. *Success:* trustworthy partner economics and investment decisions tied to data. *Surface:* executive packs, program P&L/ROI.

## 5. Product principles

The decision-making guardrails. When a design choice is unclear, these decide it.

- **The Partner Revenue Claim is the atomic control object**; the Ecosystem touchpoint graph explains the contribution behind it. Neither the partner profile nor the CRM opportunity is the center.
- **Separate Contribution, Attribution, Eligibility, and Payment** rigorously and never conflate them (see glossary).
- **One canonical Attribution of Record** — human-decided, model-advised. The model recommends; a named human decides; the result is single and contestable.
- **Governance before automation.** Prove entitlement before moving money: manual-safe → controlled claim ledger → attribution integrity → finance evidence → eligibility → reconciliation → settlement automation.
- **Respect systems-of-record boundaries.** CRM owns pipeline; ERP/billing own money facts; the OS owns the partner-revenue objects and never authoritatively writes records it does not own.
- **Instrument information and trust, not only transactions.** Capture time-to-value, time-to-first-payout, effort-share, shadow contribution, protection-expiry, and sentiment — the moments competitors leave dark.
- **Single source of rule evaluation.** Eligibility is computed by exactly one service; no phase re-implements it.
- **Append-only financial truth.** Money facts are immutable entries; corrections are reversals, never mutations.
- **Every state change is an event with an audit trail** — who, what, when, why, under which rule, with which evidence and approval.
- **Configurable without custom code.** Taxonomies, rules, workflows, and forms are metadata, not engineering.

## 6. Scope & non-goals

- **In scope (the product line):** partner strategy/program; sourcing, qualification, approval; agreement→rule; onboarding and enablement; ecosystem touchpoint capture; the claim; preflight; attribution (one canonical decision + multi-touch advisory); protection; CRM linkage; revenue validation; eligibility; finance evidence; the financial ledger; statements; disputes; settlement; the reverse/clawback path; partner P&L/ROI; and the executive operating cadence.
- **Explicit non-goals:** becoming a CRM, ERP, billing engine, or full CLM; replacing the customer's systems of record; executing payments before entitlement is trusted; algorithmic attribution without human authority; and (for this product document) the GTM beachhead choice, which is settled separately and which the architecture is built not to constrain.
- **Boundaries to other systems:** CRM is the system of record for pipeline; billing/ERP for invoices, collections, and payments; CLM for the signed contract. The OS owns the partner-revenue objects and integrates with the rest under a field-ownership map (§16).


---

# PART II — THE PRODUCT

## 7. Capability model & prioritization

The product is ten capability layers. Each is tagged by **role** — *Table-stakes* (you can't compete without it), *Differentiator* (where we win), *Delighter* (disproportionate love) — and by the **earliest release** it appears in.

- **Partner Operating Layer** — identity, lifecycle, contacts, ownership, onboarding, status. *Table-stakes · MVP.* (Atlas P3–P12)
- **Partner Revenue Claim Ledger** — the canonical claim and its lifecycle. *Table-stakes; the canonical-claim framing is differentiating · MVP.* (Atlas P10, P15–P16)
- **Attribution & Protection Layer** — one Attribution of Record, protection as an audited right, conflict detection. *Differentiator · MVP (basic) → V3 (full multi-touch).* (Atlas P12, P16, P19)
- **Ecosystem Attribution Hub** — touchpoint capture, contribution scoring, multi-touch *recommendation*, journey timeline, identity resolution. *Differentiator (the moat) · V1 (capture) → V3 (scoring).* (Atlas P4, P9, P14–P15, P19)
- **Agreement & Rule Engine** — terms → executable, versioned, bitemporal rules. *Table-stakes; correctness is differentiating · MVP (metadata) → V2 (full).* (Atlas P8–P9)
- **Revenue & Eligibility Layer** — revenue validation and the single eligibility service. *Table-stakes · MVP (preview) → V2 (full).* (Atlas P18, P20)
- **Financial Ledger & Settlement Layer** — append-only ledger, evidence packs, statements, settlement, clawback. *Differentiator (finance-grade) · MVP (accrued/eligible) → V2 (full).* (Atlas P20)
- **Governance & Operating Cadence Layer** — review rituals, scorecards, decision packs, the decision→outcome loop. *Differentiator · V1 → V3.* (Atlas executive cadence)
- **Intelligence & Forecasting Layer** — partner ROI, effort-share, forecasts, risk, recommendations. *Differentiator/Delighter · V3.* (Atlas cross-cutting)
- **Platform, Admin, Security & Integration Layer** — tenancy, identity/SSO, ABAC, configuration, integrations, sync monitoring, i18n/RTL. *Table-stakes; multi-tenant + ABAC + ZATCA/Arabic is differentiating for GCC · MVP → V2.* (Atlas P9, cross-cutting)

## 8. Key user journeys

Six end-to-end flows carry the product. Each names the actor, the trigger, the flow (with atlas references), the end state, and what makes ours different.

**J1 — Stand up the program and bring on a partner.** *Actor:* Head of Partnerships, approvers. *Trigger:* a commercial constraint a channel could solve. *Flow:* form the thesis and settle the internal-comp stance (P0) → design tiers/economics/rules and the attribution model (P1) → define the partner value proposition and ICP (P2) → source and intake with dedup and an owner (P3–P5) → mutually qualify (you screen them; they screen you) and decide (P6) → approve and create the governed Partner Profile (P7). *End state:* an approved, governed partner attached to a program. *Different:* mutual-evaluation capture and a settled own-rep comp stance — channel conflict is addressed before it exists.

**J2 — Onboard and reach first value (the activation aha).** *Actor:* partner (BD + reps + finance), partnerships, finance. *Trigger:* signed partner. *Flow:* negotiate and sign, with reverse payee setup begun (P8) → configure rules and tax (P9) → onboard to activation: invite → KYB → tax → bank → access → kickoff, with payout-readiness tracked separately (P10) → enable the *reps*, not just the champion (P11) → first claim, first accepted claim, **first payout** (P12). *End state:* a producing partner with the first-payout milestone recorded. *Different:* time-to-first-value and time-to-first-payout are measured milestones; the first payout is treated as the equilibrium-selecting event it is.

**J3 — The core revenue loop: co-sell, register/protect, execute, attribute.** *Actor:* partner, your sales, finance; the model (advisory). *Trigger:* a partner-influenced opportunity. *Flow:* joint plan and account map (P13) → co-marketing and co-sell, capturing touchpoints incl. shadow influence (P14–P15) → register the claim and grant a scoped protection window (P16) → progress in CRM with bounded write-back; capture the sub-tier where two-tier (P17) → validate the revenue event and basis; handle reverse events (P18) → score the journey, the model recommends, a human decides → **one Attribution of Record** (P19). *End state:* a validated revenue event with a single canonical, contestable credit. *Different:* informativeness-weighted recommendation with human authority; protection is an audited right; shadow contribution is captured.

**J4 — Realize attribution: eligibility → evidence → statement → payout.** *Actor:* finance, the partner (and their AP), system. *Trigger:* a validated revenue event on an attributed claim. *Flow:* the single eligibility service computes a verdict *with an explanation* and missing-condition list (P20.1–P20.4) → assemble and freeze the finance evidence pack (P20.5–P20.6) → update the partner statement; partner views, acknowledges, or disputes (P20.7–P20.9) → group for settlement; apply FX and withholding/VAT, explained before payment (P20.11–P20.12) → execute the payout idempotently; import status (P20.13–P20.15). *End state:* a paid, explained, audit-ready payout. *Different:* every payout carries an explanation and an immutable evidence pack; deductions are explained before settlement, not after.

**J5 — The reverse path, done humanely.** *Actor:* finance, the partner, system. *Trigger:* a refund/cancellation, a tier change, or a termination. *Flow:* reverse revenue event ingested (P18.9) → eligibility reversal (R1) → ledger reversal as an offsetting entry, never a mutation (R2) → clawback recovered by **netting against future payouts**, with advance explanation (R3/P20.17); for status, tier demotion is communicated with a glide path (R9); on exit, in-flight claims, protections, and pending payouts are resolved and access revoked (R10). *End state:* money correctly reversed and trust preserved. *Different:* the reverse path is first-class and designed for loss aversion — the thing competitors botch.

**J6 — The operating-cadence and investment loop.** *Actor:* Head of Partnerships, CRO, CFO, CEO/Strategy. *Trigger:* the monthly/quarterly cadence. *Flow:* review pipeline, claims, disputes, and data quality → partner P&L and ROI separating sourced/influenced/cost → an investment decision (scale/maintain/fix/renegotiate/pause/terminate/launch) recorded as a Decision → actions routed to the phases they trigger → the next review measures whether the decision improved the outcome (closed-loop §17). *End state:* capital reallocated on evidence, with the loop closed. *Different:* decisions are linked to outcomes and measured, not asserted.

## 9. Functional requirements

Requirements use this schema: **FR-ID · capability · priority** (Must / Should / Could) — statement; **Acceptance:** verifiable criteria; **Trace:** atlas IDs / ADRs. The **MVP cut is specified in full below.** The complete set across all 254 atlas touchpoints and the R1–R12 reverse/exception touchpoints is enumerated in the v2 atlas and its instrumentation backlog; later-release capabilities are specified there and promoted into FRs per release (§19).

**Partner Operating**
- **FR-01 · Partner Operating · Must** — Governed intake: every partner is captured as a record with a source and an owner, with duplicate detection before qualification. **Acceptance:** an active partner cannot be created without a source and owner; duplicate detection runs at intake; a provisional type is assigned. **Trace:** P5.8–P5.13, ADR-0007.
- **FR-02 · Partner Operating · Must** — Qualification with decision states: fit and risk scoring with decisions reject / park / nurture / pilot / approve, where park/nurture sets a re-engagement review. **Acceptance:** decision recorded with owner and timestamp; park/nurture sets a review trigger (no dead-end). **Trace:** P6.12–P6.15.
- **FR-03 · Partner Operating · Must** — Approval with condition tracking: an approval matrix by type/program/geo/risk; conditional approval records conditions as tracked tasks that gate full activation. **Acceptance:** a conditionally-approved partner cannot reach Activated until conditions are closed. **Trace:** P7.1–P7.8.
- **FR-04 · Partner Operating · Must** — Onboarding to activation with payout-readiness distinct: invite → KYB → tax → bank → access → certification; activation status is separate from payout-readiness. **Acceptance:** payout-bearing claims are blocked until bank and tax are verified; the time-to-first-value clock starts at activation and is recorded. **Trace:** P10.1–P10.23.

**Claim Ledger**
- **FR-05 · Claim Ledger · Must** — Create and validate a claim by role and type, checking partner eligibility, account match, duplicates, protection, and agreement coverage. **Acceptance:** invalid or out-of-role claims are rejected with a reason; a claim without agreement coverage is accepted for attribution but flagged not-payout-eligible without an explicit exception. **Trace:** P10, P16.1–P16.6.
- **FR-06 · Claim Ledger · Must** — Preflight and status engine: preflight produces an outcome (Pass / NeedsInfo / DuplicateRisk / AgreementGap / ProtectionConflict / ManualReview) that routes the claim forward or to the exception queue. **Acceptance:** every preflight flag is visible to the reviewer; a missing mandatory field blocks progress to attribution. **Trace:** P16.2–P16.9.

**Attribution & Protection**
- **FR-07 · Attribution · Must** — One Attribution of Record: the model recommends a split (stubbed in MVP), a named human decides, and the result is the single canonical credit; re-decision is versioned. **Acceptance:** exactly one Attribution of Record exists per claim; the decision has owner, timestamp, and reason; a re-decision creates a new version and never overwrites. **Trace:** P19.6–P19.13, ADR-0001.
- **FR-08 · Protection · Must** — Protection as an audited right: granted with scope/start/end; expiry notifies the partner and frees the account; override requires a reason and approver. **Acceptance:** expiry emits a partner notification and a re-claim event; an override without reason/approver is blocked and every override is audited. **Trace:** P16.8, P16.10, P16.11.

**Revenue & Eligibility**
- **FR-09 · Revenue · Must** — Revenue event creation and basis selection from CRM/billing, with the basis chosen by the active rule version. **Acceptance:** the revenue event is linked to the claim and the basis is set from the rule version active at the relevant time. **Trace:** P18.1–P18.4.
- **FR-10 · Eligibility · Must** — Single eligibility service with explanation: one service returns a verdict, a human-readable explanation, and the missing-condition list. **Acceptance:** every verdict carries an explanation, and the same explanation appears in finance review and on the partner statement. **Trace:** P20.1–P20.2, ADR-0006.

**Financial Ledger**
- **FR-11 · Ledger · Must** — Append-only ledger (accrued and eligible states in MVP; approved/paid/reversed in V2): money facts are immutable entries; corrections are offsetting entries. **Acceptance:** no ledger entry is ever mutated; a correction creates an offsetting entry. **Trace:** P20.11+, ADR-0005.
- **FR-12 · Ledger · Must** — First-payout milestone: the first accepted claim and first payout are recorded as distinct milestones with their own monitor. **Acceptance:** time-to-first-payout is computed and the milestone is visible to the operator. **Trace:** P12.10–P12.11.

**Platform**
- **FR-13 · Platform · Must** — Event and audit log: writes are event-sourced; the domain event log is distinct from the human-readable audit log. **Acceptance:** every state change emits an event; the audit log reconstructs who/what/when/why for any record. **Trace:** ADR-0002.
- **FR-14 · Platform · Must** — Multi-tenant with ABAC field-level authorization: tenant isolation; partners see only their own records; internal-vs-partner fields are separated. **Acceptance:** cross-tenant access is impossible; a partner cannot see internal or finance-only fields. **Trace:** ADR-0003, ADR-0008.
- **FR-15 · Platform · Must** — CRM link with bounded write-back: link claim to opportunity; write back only configured partner fields; never authoritatively create records the OS does not own. **Acceptance:** write-back is limited to the field-ownership map; any OS-initiated CRM object is a proposal, not an authoritative write. **Trace:** P17.1–P17.4, ADR-0004.

## 10. Non-functional requirements

Targets marked *(target)* are to be confirmed against design-partner constraints before V1.

- **Security:** SOC 2-equivalent controls; encryption in transit and at rest; field-level authorization; tenant isolation; full audit trail.
- **Compliance & data residency:** PDPL (KSA) and GDPR-class handling; ZATCA e-invoicing references; a KSA/GCC data-residency option; withholding-tax and VAT correctness.
- **Financial correctness:** append-only ledger; reproducible bitemporal rule evaluation (same inputs → same verdict); idempotent settlement (zero double-pays); immutable approved evidence.
- **Performance & availability:** interactive reads p95 < 1s on projections *(target)*; integration sync SLAs with health monitoring and dead-letter; availability 99.9% *(target)*; RPO ≤ 5 min, RTO ≤ 1 hr *(target)*.
- **Internationalization:** multi-currency, multi-entity, and full Arabic/RTL parity — first-class, not a localization afterthought.
- **Observability:** the event log, evidence lineage/provenance, sync health, exception-queue aging, and SLO dashboards are all available.
- **Auditability:** 100% of money-affecting records are reconstructable — who, what, when, why, under which rule, with which evidence and approval.


---

# PART III — ARCHITECTURE & DECISIONS

## 11. Domain model

Existing objects preserved from v3 (Partner, Partner Contact/User, Internal User, Partner Organization, Agreement, Agreement Rule, Product/SKU, Customer Account/Contact, Lead, Opportunity, Deal Registration, **Partner Revenue Claim**, Attribution Decision, Protection Window, Evidence Item, Revenue Event, Payout Eligibility Record, Partner Statement, Invoice Reference, Payment Reference, Dispute, Approval, Task, Activity, Audit Log, Partner Tier, Partner Program, Partner P&L Record, Forecast Record) plus the Ecosystem Hub objects (Ecosystem Touchpoint, Contribution Event, Ecosystem Actor, Relationship Edge, Journey Timeline, Evidence Provenance, Contribution Score, Credit Allocation, Influence Decay, Attribution Recommendation, Conflict Signal).

**New objects added to close the audit gaps (mandatory, not optional):**

- **Tenant** — the customer organization; the isolation and configuration boundary.
- **Currency & FX Rate** — rate captured at revenue recognition and at payment; supports revaluation.
- **Tax Profile / Withholding Record** — partner tax status, withholding and VAT treatment, ZATCA references.
- **Ledger Entry (Payout Ledger)** — append-only monetary entry; the liability/payment truth distinct from "eligible."
- **Attribution of Record** — the single canonical, human-decided credit result that reconciles the human decision and the model recommendation.
- **Event (Event Log)** — the immutable domain-event stream, distinct from the human-readable Audit Log; the basis for reconciliation, replay, and temporal queries.
- **Rule Version (bitemporal)** — agreement rules with valid-time and transaction-time so claims are judged against the rule active at the relevant time.

**Aggregate boundaries:** the **Claim** is the aggregate root for commercial control; the **Attribution of Record** hangs off the Claim and is the only credit truth; the **Revenue Event** and the **Ledger Entry** are linked but independently lifecycled; the Ecosystem graph is a separate aggregate that *informs* the Claim's Attribution but never overrides it.

## 12. State machines & lifecycles (transitions defined; reverse paths first-class)

Each lifecycle is specified by states + guarded transitions; the reverse paths (refund/clawback) are first-class, not adjustments.

- **Claim:** Draft → Submitted → Preflight(Pass | NeedsInfo | DuplicateRisk | AgreementGap | ProtectionConflict | ManualReview) → InAttribution → Decided. Reverse: Withdrawn (partner-initiated), Reopened (post-decision via dispute).
- **Attribution of Record:** Recommended(model) → UnderReview → Decided(Accepted | Partial | Rejected | Duplicate) → Final. Reverse: Reopened → Re-decided (versioned, never overwritten).
- **Protection Window:** Granted(scope, start, end) → Active → Expiring(notified) → Expired | Overridden(reason, approver). On expiry/override: emits an event that frees the account for re-claim and notifies the partner (closes the silent-expiry loop).
- **Revenue Event:** None → OpportunityCreated → PipelineActive → ClosedWon → Invoiced → Collected → Recognized. Reverse: Refunded | Cancelled | Adjusted → triggers eligibility reversal.
- **Payout Eligibility:** NotEvaluated → Eligible | NotEligible | FinanceReviewRequired | MissingEvidence | Disputed. Recomputed (versioned) on any change to claim, attribution, revenue, or rule.
- **Ledger Entry:** Accrued → Eligible → Approved → Paid. Reverse: Reversed (by a new offsetting entry — never mutation), Clawed-Back (recovery netted against future entries).
- **Dispute:** Open → UnderReview → Decided(Uphold | Adjust | Reject | Escalate | Reopen) → Closed. Decisions emit adjustment entries downstream.

## 13. The rule-evaluation service (single, authoritative, bitemporal)

- **One service** evaluates eligibility; preflight, attribution, and the eligibility layer all *call* it and never re-implement checks (resolves the v3 triple-evaluation defect).
- **Rule representation:** structured, composable predicates over claim/partner/agreement/revenue context; explicit composition and conflict-resolution order (caps, floors, exclusions, clawbacks, multi-agreement precedence).
- **Bitemporal:** every evaluation is against the **Rule Version active at the relevant valid-time**, with transaction-time recorded; re-evaluations are reproducible.
- **Output:** an eligibility verdict + a human-readable explanation + the missing-condition list — the same explanation surfaced in finance review and the partner statement.

## 14. The financial ledger model

- **Append-only, double-entry-style** liability ledger; corrections are offsetting entries, never mutations.
- **Three distinct states of money:** Accrued (liability recognized) → Eligible (conditions met) → Approved → Paid; each is a separate, queryable fact, not a status flag on one record.
- **FX:** rate captured at recognition *and* at payment; revaluation handled; payout batches grouped by currency and entity.
- **Tax:** withholding and VAT computed and recorded against the Tax Profile; ZATCA references attached; deductions explained on the statement before settlement.
- **Clawback:** executed as a reversal entry and recovered by netting against future eligible entries by default — never a bare demand for return — with advance partner explanation (closes the v3 missing reverse path; designed for loss aversion).
- **Idempotent settlement:** payout batches carry idempotency keys; replays do not double-pay.

## 15. Cross-cutting subsystems (each a real architecture, not a feature)

- **Identity Resolution / MDM:** deterministic + probabilistic matching across CRM, portal, billing, marketplace, warehouse; golden record, survivorship rules, merge/split handling, and a match-review workflow at scale. Confidence scores route low-confidence matches to review.
- **Data Quality Engine:** validation, completeness scoring, dedupe, anomaly detection — cross-cutting, not a step.
- **Workflow / Orchestration Engine:** configurable routing, approvals, SLAs, escalations, and the **exception-queue drain** (every routed exception has a defined owner, SLA, and re-entry path into the main flow — closing the universal-sink loop).
- **Configuration / Metadata Layer:** role taxonomies, attribution models, agreement rules, approval matrices, protection logic, write-back fields, and forms are all metadata — configured, not coded — so customers self-serve without bespoke builds.
- **Authorization (ABAC / policy engine):** attribute-based, field-level, with strict internal-vs-partner data separation and delegation-of-authority; partners see only their own records.
- **Multi-tenancy:** tenant-isolated data and configuration, with a **cross-tenant Partner identity** so a partner working with several customers has one portal identity (also the substrate for a future partner network).

## 16. Integration architecture & semantics

- **Connectors:** CRM (Salesforce, HubSpot, Dynamics, Zoho), billing (Stripe, Chargebee, Zuora, HyperPay, Checkout.com, others), ERP/accounting (SAP, Oracle, NetSuite, QuickBooks, Xero, Odoo), CLM/e-sign, marketing/campaign, CS/support, marketplace, identity/SSO, data warehouse/BI.
- **Semantics (the contract, not the list):** idempotency keys on all inbound events; ordering and out-of-order handling (e.g., closed-won reverting to a prior stage); replay; dedupe; and a **reconciliation model** for divergence between the OS and the external system of record. Webhooks are reliable-delivery with retry and dead-letter.
- **Boundary enforcement:** a field-level ownership map; the OS proposes (e.g., suggests a CRM opportunity) but never authoritatively creates records it does not own; write-backs are selective and configurable.

## 17. Closed-loop wiring

- **Feedback loops are wired, not narrated:** expected-vs-actual contribution feeds back from P&L to the Program; performance feeds back to refine the role taxonomy and rules; executive decisions (tier change, renegotiate, redesign incentive, launch program) route to the phases they trigger; decision→outcome is instrumented via a Decision object linked to subsequent performance deltas.
- **Dangling outputs are consumed:** shadow-influence and multi-touch credit drive investment decisions rather than dead-ending in dashboards; parked/nurtured partners enter a re-engagement loop.
- **The reverse loop closes:** refund/cancellation → revenue-event reversal → eligibility reversal → ledger reversal → clawback recovery → statement update.

## 18. Architecture Decision Records (index)

Recorded in the project ADR format — each is hard to reverse, surprising without context, and a real trade-off.

- **ADR-0001 — Canonical attribution is human-authoritative, model-advisory.** The multi-touch model recommends a split; a named human decides; the result is the single Attribution of Record. Rejected: model-authoritative auto-credit (contestable, can't anchor payout or survive disputes).
- **ADR-0002 — Event-sourced write model, projected read models.** A domain Event Log is the source of truth, distinct from the human-readable Audit Log; reads are projections. Enables reconciliation, replay, and temporal queries. Rejected: CRUD-only (no replay, weak temporal correctness).
- **ADR-0003 — Multi-tenant with cross-tenant partner identity.** Tenant-isolated data/config; one partner identity spans tenants. Rejected: single-tenant (no network substrate, duplicate partner records).
- **ADR-0004 — Strict systems-of-record boundary with a field-ownership map.** The OS owns its objects and only proposes (never authoritatively writes) records owned by CRM/ERP/billing. Rejected: OS as authoritative writer into CRM/ERP (divergence, double-write).
- **ADR-0005 — Append-only double-entry payout ledger.** Money facts are immutable entries; corrections are reversals; accrued/eligible/approved/paid are distinct facts. Rejected: status-flag-on-record (no audit-grade financial truth, unsafe clawbacks).
- **ADR-0006 — Single, bitemporal rule-evaluation service.** One service computes eligibility against the rule version active at the relevant time; all phases call it. Rejected: per-phase re-implementation (inconsistent eligibility).
- **ADR-0007 — Dedicated identity-resolution/MDM service.** Deterministic + probabilistic matching, golden record, survivorship, merge/split, match review. Rejected: a confidence score bolted onto CRM linkage.
- **ADR-0008 — ABAC policy engine for authorization.** Attribute-based, field-level, internal-vs-partner separation, delegation-of-authority. Rejected: coarse RBAC (cannot safely separate partner-facing from internal/finance data).
- **ADR-0009 — Metadata-driven configuration.** Taxonomies, rules, workflows, forms are configuration, not code. Rejected: per-customer custom builds (no scale).
- **ADR-0010 — Idempotent, ordered, reconcilable integration semantics.** Idempotency keys, ordering/out-of-order handling, replay, dead-letter, and SoR reconciliation. Rejected: best-effort webhooks (silent data loss, double-processing).


---

# PART IV — DELIVERY, METRICS & OPERATING MODEL

## 19. Release plan

The v3 roadmap front-loaded slow, invisible governance and had no fast aha. This sequence fixes that: capture and a visible first loop come first; finance-grade depth and the intelligence layer follow. Each release has a goal, a scope, explicit exit criteria (its definition of done), and the aha it unlocks.

**MVP — Control the claim and prove the first loop.**
- *Goal:* become the trusted record of a partner-sourced deal and show one visible loop end to end.
- *Scope:* partner registry, program, intake; agreement metadata; claim ledger; preflight; one Attribution of Record (human-decided, model recommendation stubbed); basic protection with expiry notification; CRM link; single eligibility service (preview); basic append-only ledger (accrued/eligible); executive view; event + audit log; CSV in/out. *(FR-01–FR-15.)*
- *Exit criteria:* a partner can register a deal, have it attributed by a human, see eligibility previewed *with an explanation*, and reach a recorded first-payout milestone; every state change emits an event and is auditable; no cross-tenant access; payout-bearing claims are blocked until bank/tax verified.
- *Aha (days, not months):* register → attribute → preview eligibility → first-payout milestone visible.
- *Do not build yet:* full ERP integration, settlement automation, full P&L, advanced multi-touch scoring, marketplace attribution.

**V1 — Operational.**
- *Goal:* run a real program day to day without spreadsheets.
- *Scope:* native CRM integration + selective write-back; partner statements; disputes; finance evidence pack; data-quality engine; integration health monitor; ABAC + delegation; warehouse export; basic ecosystem touchpoint ledger and journey timeline; configuration layer v1; time-to-first-payout and TTFV instrumented.
- *Exit criteria:* a program runs end to end in-product with a draining exception queue; partners self-serve status and raise disputes; finance reviews against an evidence pack; the activation metrics are live.

**V2 — Finance-ready.**
- *Goal:* finance trusts the money, including the reverse path.
- *Scope:* billing + ERP integration; invoice/collection matching; full ledger (approved/paid/reversed); FX; tax/withholding/VAT + ZATCA; clawback-by-netting; payable aging; revenue-recognition references; attribution evidence pack; post-sale contribution.
- *Exit criteria:* settlement is automated and idempotent (zero double-pays); deductions are explained pre-settlement; refunds flow through eligibility and ledger reversal to clawback-by-netting; reconciliation to ERP is clean.

**V3 — Investable.**
- *Goal:* leadership reallocates capital on the product's evidence.
- *Scope:* partner P&L and ROI; effort-share and partner-health scoring; forecasting; cohort and concentration analysis; tier/incentive simulation; full multi-touch credit recommendation; influence decay; identity-resolution/MDM at scale; decision→outcome measurement; AI recommendations.
- *Exit criteria:* a defensible partner P&L exists per partner and program; the executive review runs from the product; decisions are logged and their outcomes measured.

## 20. Success metrics: North Star & metric tree

**North Star — Trusted partner-attributed revenue realized.** The dollar value of partner-attributed revenue that has been (a) credited via a canonical Attribution of Record, (b) made eligible *with an explanation*, and (c) realized (paid or cleanly netted) without dispute reversal. It rises only when the product does its actual job — capture, attribute defensibly, and realize with trust — and it resists gaming because it requires both a defensible attribution and a clean financial outcome.

**Input metrics (the drivers the team moves):**
- *Activation:* time-to-first-value, time-to-first-claim, time-to-first-payout, onboarding and payout-readiness completion.
- *Partner health / mindshare:* effort-share (output relative to the partner's capacity), engagement and sentiment, dormant-but-active detection, champion tenure / single-threading risk.
- *Attribution quality:* attribution informativeness, shadow-contribution captured vs. expected, customer-confirmation rate.
- *Finance trust:* evidence-pack completeness, eligibility-explanation coverage, reconciliation cleanliness.
- *Data integrity:* identity-match accuracy, exception-queue aging.

**Output metrics (the business results):** partner ROI (sourced vs. influenced vs. cost), program profitability, partner-sourced and partner-influenced revenue, partner retention.

**Guardrail & counter-metrics (must not be sacrificed to move the North Star):** dispute rate, override rate, clawback rate, payout error rate (double-pays = 0), partner churn, partner CSAT, time-in-exception-queue. If the North Star rises while these degrade, the gain is not real.

## 21. Risks, assumptions & validation

**Risk register** — likelihood × impact, with mitigation and owner.

- **Identity resolution at scale** — *High × High.* The hardest subsystem; it gates attribution quality. *Mitigation:* prototype early on design-partner data (precision/recall), deterministic-first + probabilistic, a match-review workflow; treat as a gate even though full MDM is V3. *Owner:* Platform/Data lead.
- **Agreement→rule translation** — *Med-High × High.* Expressing real agreements without per-customer code. *Mitigation:* a dedicated design spike before V1; a constrained, composable rule representation with explicit conflict-resolution; model the ten hardest real agreements against it. *Owner:* Rules squad lead.
- **Finance won't trust the numbers** — *Med × High.* The validator is the gatekeeper to adoption. *Mitigation:* an explanation on every eligibility verdict, immutable evidence packs, reconciliation, and a design-partner CFO in discovery. *Owner:* PM + Finance-Eng lead.
- **Partner-side adoption** — *Med × High.* Partners won't use the portal or log touchpoints. *Mitigation:* a fast first payout, low-friction UX, and capture from connected systems rather than manual entry. *Owner:* PM / UX.
- **Channel conflict suppresses pipeline** — *Med × Med-High.* Reps quietly bury partners. *Mitigation:* own-rep comp visibility, conflict flags, CRO alignment in design. *Owner:* PM.
- **Integration fragility / SoR divergence** — *Med × High.* Out-of-order events and drift corrupt state. *Mitigation:* idempotency, ordering/out-of-order handling, replay, dead-letter, and a reconciliation model (ADR-0010). *Owner:* Integration squad.
- **Scope creep into CRM/ERP/CLM** — *Med × Med.* The product bloats into systems it shouldn't replace. *Mitigation:* the explicit non-goals (§6) and the field-ownership map (§16). *Owner:* CPO.

**Key assumptions & how we'll test them:**
- *Buyers will pay for finance-grade attribution and trust instrumentation over cheaper payout-first tools.* Test: willingness-to-pay interviews and design-partner LOIs.
- *The information/trust touchpoints can be captured at low enough friction to be reliable.* Test: capture-rate measurement in the pilot.
- *A single bitemporal rule service can express real agreements without bespoke code.* Test: the rule spike against the ten hardest real agreements.
- *Identity resolution can reach acceptable match accuracy on real CRM/billing data.* Test: a prototype on design-partner data with measured precision/recall.
- *GCC/regulated requirements (ZATCA/WHT/VAT/Arabic) are a real wedge.* Test: discovery with GCC design partners.

## 22. Open questions & resolution plan

- **The informativeness model for multi-touch scoring** (how credit is weighted by signal diagnosticity). *Resolve:* a research spike on design-partner journey data, before the V3 attribution build.
- **Default protection-window policy per motion.** *Resolve:* benchmark plus design-partner norms, before protection goes GA in V1.
- **Partner-network (cross-tenant) rollout timing.** *Resolve:* after the multi-tenant base is proven (post-V2), gated on a credible network-effect thesis.
- **The GTM beachhead/segment.** *Resolve:* in the separate GTM track; the architecture is segment-agnostic and global-ready, so this does not block the build.
- **North Star target levels and the numeric NFR targets.** *Resolve:* set with design partners before V1.

## 23. Product operating model

- **Team topology:** squads aligned to the capability layers — Claim & Attribution, Agreement & Rules, Revenue/Eligibility/Ledger, Ecosystem Hub, Platform/Integration — each owning its domain objects and outcomes; a platform squad owns tenancy, identity, authorization, and the event backbone.
- **Discovery & delivery:** an outcome-based roadmap (the metrics in §20), opportunity-solution trees against the four problems, continuous discovery with design-partner customers; delivery measured in outcomes, not features.
- **Operating cadence (mirrors the customer cadence the product enables):** daily exception/claim clearing; weekly pipeline/claim/dispute/data-quality review; monthly partner revenue, payout liability, and P&L review; quarterly executive portfolio and investment review with decision logging.
- **Decision rights:** the ADR process governs hard-to-reverse decisions; the glossary governs language; capability squads own reversible product decisions within their domain.

---

# APPENDICES

## Appendix A — Glossary (CONTEXT.md)

Opinionated canonical language (the project CONTEXT-FORMAT). General programming terms are excluded by design.

**Partner Revenue Claim**: A partner's formal assertion, as a controlled object, that it contributed to a commercial outcome. The atomic control object.
_Avoid_: deal reg (as the value object), lead, opportunity.

**Contribution**: A meaningful action a partner took toward an outcome, as observed.
_Avoid_: credit, influence (used loosely).

**Attribution (of Record)**: The single, human-decided, contestable recognition of a partner's credit — the canonical result.
_Avoid_: credit allocation (as a separate truth), attribution score (as a truth rather than an input).

**Credit Allocation**: The model's *recommended* split across partners; advisory input to Attribution, never authoritative.
_Avoid_: using it interchangeably with Attribution.

**Eligibility**: The finance determination of whether and how much a partner may be paid.
_Avoid_: "eligible" used to mean "credited."

**Protection Window**: A time-bounded, scoped right that protects a partner's claimed opportunity from being bypassed.
_Avoid_: lock, exclusivity (which imply more than a bounded right).

**Revenue Event**: A validated fact that attributed pipeline became real revenue under the agreed basis.
_Avoid_: closed-won (as a synonym for payable), sale.

**Ledger Entry**: An immutable monetary fact in the payout ledger (accrued, eligible, approved, paid, or reversed).
_Avoid_: payout (as a record you mutate).

**Clawback**: A reversal entry recovering money already paid, recovered by netting against future entries.
_Avoid_: refund (which is a customer-side concept).

**Ecosystem Touchpoint**: A partner-related interaction or event captured around an account/opportunity.
_Avoid_: activity (the CRM term), engagement.

**Tenant**: A customer organization; the isolation and configuration boundary.
_Avoid_: account, org (overloaded with customer-account).

## Appendix B — Traceability & how the prior work maps in

**Traceability chain.** The document is wired so any requirement can be traced both ways: **Persona (§4) → Journey (§8, J1–J6) → Capability (§7) → Functional requirement (§9) → Atlas touchpoint ID → ADR (§18).** For example: the *partner champion* persona → J2 (reach first value) and J4 (realize attribution) → the Financial Ledger & Settlement and Attribution capabilities → FR-10/FR-12 → atlas P12.10, P20.1–P20.2 → ADR-0001/ADR-0005/ADR-0006. The *finance* persona → J4 and J5 → Revenue/Eligibility/Ledger → FR-09–FR-11 → P18–P20, R1–R3 → ADR-0005/ADR-0006.

**How the prior work maps in:**
- **The Touchpoint Atlas (v2)** is the exhaustive requirements source; §9 specifies the MVP cut in full and the atlas IDs (`P{phase}.{n}`) trace to capabilities. v2's added layers connect directly: its reverse/exception touchpoints (R1–R12) realize the reverse paths in §12 and the clawback ledger in ADR-0005/§14; its dependency/gating map orders the release plan (§19); its variation overlays inform scope (§6) and the operating model (§23); its metrics framework backs §20; and its instrumentation backlog seeds the capability map (§7) and the full FR set beyond the MVP.
- **The architecture audit** findings are resolved here as concrete decisions: the two-attribution-engines problem → ADR-0001; the missing entities → §11; the parallel state machines and reverse path → §12; the triple rule-evaluation → ADR-0006/§13; the ledger gap → ADR-0005/§14; identity/config/authorization/tenancy → §15; integration semantics → ADR-0010/§16; the open loops and exception-sink → §17.
- **The economic deep-structure** supplies the problem framing (§2), the wedge/moat strategy (§3), the moat thesis (§1), and the activation and effort-share metrics (§20).
