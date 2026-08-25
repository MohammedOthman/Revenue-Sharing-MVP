# Palantir Ontology — Deep Benchmark & The "Partnership Ontology" Gap Analysis

**Document type:** Competitive/architecture benchmark + gap analysis
**Product:** Partner Revenue OS (brand: **Reven**)
**Question answered:** What is Palantir's Ontology (architecture, engineering, design logic)? How does it compare to Reven's partnership-intelligence system? What is the gap between what we have and becoming *"the Ontology for partnerships and commercial excellence"*?
**Method:** Deep research over Palantir's own engineering docs + blog and independent expert practitioners, cross-verified; then mapped against this repo's PDR, Integration Layer manual, and prototype. Confidence labels and sources at the end.

> **One-line thesis.** Palantir's Ontology is not a data model — it is an **operational decision layer**: a semantic graph of an organization's real-world objects fused with a *kinetic* layer of governed actions/functions and a *dynamic* security layer, sitting on top of integrated data, that lets humans and AI **read truth, simulate, decide, and write the decision back** into systems of record as new data. Reven is *already architected as a domain-specific Ontology for one functional domain: partner revenue* (horizontal across industries and markets, purpose-built for one need). The gap to "the Ontology for partnerships" is not conceptual — it is **build depth**: turning our canonical-object model, claim ledger, rule engine, and controlled write-back from documented intent + static prototype into a live, simulatable, AI-activated, closed-loop system.

---

## PART A — Palantir Ontology: verified technical anatomy

### A.1 What it actually is

The Palantir Ontology is the **core semantic + operational layer** of Foundry and AIP. It maps an organization's existing data sources into **real-world concepts** — `Customer`, `Order`, `Equipment`, `Flight`, `Invoice` — and the **relationships and actions** that connect them, producing what Palantir calls a *digital twin of the organization* ([Palantir docs, Ontology overview](https://www.palantir.com/docs/foundry/ontology/overview); [core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts)).

The decisive design claim — repeated across Palantir's engineering writing — is that **the Ontology represents the *decisions* of an enterprise, not simply its data** ([Connecting AI to Decisions, Palantir blog](https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72)). That is what separates it from a warehouse semantic layer or a knowledge graph: it is built to be *acted through*, not just queried.

It is organized in **three layers** (Palantir frames the first two as primary; analysts often split out the third) ([Caruso, "Semantic, Kinetic, and Dynamic Layers"](https://pythonebasta.medium.com/understanding-palantirs-ontology-semantic-kinetic-and-dynamic-layers-explained-c1c25b39ea3c); [architecture-center/ontology-system](https://www.palantir.com/docs/foundry/architecture-center/ontology-system)):

| Layer | Primitives | Responsibility |
|---|---|---|
| **Semantic** | **Object types**, **property types**, **link types** | Models *what exists* and *how it relates* — the noun graph. An object type = an entity/event; a link type = a relationship; properties = attributes. |
| **Kinetic** | **Action types**, **Functions** | Models *what can change* — the verb layer. Actions capture operator decisions and orchestrate change; Functions express business logic of arbitrary complexity. |
| **Dynamic (security)** | **Mandatory controls**, **object security policies**, granular row/column/cell policies | Models *who may see and do what* — permissions that propagate with the data via lineage. |

### A.2 The architecture & core primitives (engineering, verified)

**Semantic layer — objects, properties, links.**
- An **object type** defines an entity or event; a **link type** defines a relationship between two object types; an **action type** defines how an object type can be modified ([object types overview](https://www.palantir.com/docs/foundry/object-link-types/object-types-overview); [link types overview](https://www.palantir.com/docs/foundry/object-link-types/link-types-overview)).
- Object instances are **backed by Foundry datasets/pipelines** — the Ontology is not a separate database you hand-load; it is *projected* from governed data (datasets, restricted views, streams) plus user edits.

**The object backend (how objects are stored, indexed, served).**
- **Ontology Metadata Service (OMS)** — the authority that defines which ontological entities exist: the metadata of object types, link types, and action types ([object-backend overview](https://www.palantir.com/docs/foundry/object-backend/overview)).
- **Object Storage V1 (Phonograph)** [legacy/deprecating] — stored objects in a distributed set of **indices** in a durable, horizontally scalable cluster, traversed by the Ontology query engine ([Object Storage V1 / Phonograph](https://www.palantir.com/docs/foundry/object-databases/object-storage-v1)).
- **Object Storage V2** — the current architecture. The **Object Data Funnel ("Funnel")** is the microservice that **orchestrates writes**: it reads from Foundry datasources *and* user edits (from Actions) and **indexes them into object databases** ([object-backend overview](https://www.palantir.com/docs/foundry/object-backend/overview)).
- **Object Set Service (OSS)** — serves **reads**: lets other services/apps **search, filter, aggregate, and load** object sets from the Ontology ([object-backend overview](https://www.palantir.com/docs/foundry/object-backend/overview); [indexing overview](https://www.palantir.com/docs/foundry/object-indexing/overview)). Indexing supports search, time-series, and geospatial access.

**Kinetic layer — Actions and Functions.**
- **Action types** are the **only sanctioned way to write** to the Ontology. Every write goes through an action that enforces **rules** (parameter → Ontology-edit transforms), **submission criteria** (formerly "validations" — conditions combining user/parameter/object/relation context that must pass), **permissions**, **approvals**, **audit trails**, and **side effects** ([action types overview](https://www.palantir.com/docs/foundry/action-types/overview); [submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria); [rules](https://www.palantir.com/docs/foundry/action-types/rules)). The most-current edited state is captured in the object type's **writeback dataset**.
- **Functions** (incl. **Functions-on-Objects**) author business logic **in TypeScript or Python**, with first-class support for reading properties, traversing links, and making Ontology edits; edit-functions only commit when wired to a **function-backed Action** ([functions overview](https://www.palantir.com/docs/foundry/functions/overview); [Ontology edits](https://www.palantir.com/docs/foundry/functions/edits-overview)).
- **Ontology SDK (OSDK)** — typed, ergonomic access to the Ontology (read + write-back) from external dev environments via **npm/TypeScript, pip/conda/Python, Maven/Java, OpenAPI** ([OSDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview)). This is how custom/operational/mobile apps are built on the Ontology.

**Simulation / what-if — Scenarios.**
- A **Scenario** is a **"fork"/"branch" of the Ontology's data** produced by applying one or more Actions (optionally driven by models via functions-on-models), enabling **"what-if" comparison** of operating conditions *before committing* ([Workshop Scenarios overview](https://www.palantir.com/docs/foundry/workshop/scenarios-overview)). This is the in-Ontology simulation/digital-twin mechanism.

**Security / governance — dynamic layer.**
- **Mandatory controls propagate with each unit of data via Palantir's provenance/lineage**; **granular row/column/cell policies** restrict by user attributes; **mandatory control properties** can hide all other properties on a datasource unless the user satisfies the control; object security policies **inherit** mandatory controls from their data sources by default ([security overview](https://www.palantir.com/docs/foundry/security/overview); [object security policies](https://www.palantir.com/docs/foundry/object-permissioning/object-security-policies); [mandatory control properties](https://www.palantir.com/docs/foundry/object-link-types/mandatory-control-properties)). Security is *inherited from source through the whole stack*, not re-implemented per app.

**AI activation — AIP.**
- **AIP Logic** is a (largely no-code) environment for building LLM-powered functions composed of **blocks** that read/write the Ontology, compute, aggregate, call other functions, or call an LLM ([AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview)).
- LLMs are given **three categories of Ontology-driven tools — data, logic, action** — to query, reason, and *safely act* ([Reducing Hallucinations with the Ontology in AIP](https://blog.palantir.com/reducing-hallucinations-with-the-ontology-in-palantir-aip-288552477383)). Crucially: **LLMs never touch tools directly — they *request* tool calls, which AIP executes within the *invoking user's permissions*.** The Ontology is the grounding context that keeps reasoning scoped and reduces hallucination.

### A.3 The engineering logic (why it's built this way)

1. **Decisions-as-data / closed loop.** The signature loop: *data is ingested (Foundry/Gotham) → contextualized (Ontology) → activated (AIP: humans + AI simulate and propose) → a decision's action **and its outcome are written back** into the Ontology* ([Connecting AI to Decisions](https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72)). **Closing this action loop is what makes a system *operational* rather than *analytical*.** The write-back is not a side effect — it is the point: it turns the Ontology into a continuously enriched digital twin that learns from the captured effects of past decisions.

2. **All writes through governed Actions.** By forcing every mutation through Action types (validation + permissions + approvals + audit), Palantir gets **governed, auditable change** with a complete decision lineage — the same discipline finance demands of money-grade data.

3. **Operational ≠ analytical.** A dashboard *tells you*; the Ontology *lets you act, and remembers that you did.* This is the recurring distinction in their writing and the reason for the kinetic layer.

4. **Security inherited via lineage** so a model/app can't accidentally over-expose; controls travel with the data.

5. **Digital twin + simulation** so leaders can test interventions in a branched copy before committing, then commit through the same governed Actions.

6. **Multi-modal** — structured + unstructured + ML models + geospatial/time-series unified under the same object grammar, so AI and apps operate on one harmonized layer instead of raw silos.

### A.4 How enterprises actually use it
Operational, closed-loop workflows: re-route a supply chain on a disruption, re-plan hospital capacity, reconcile a financial position, dispatch field crews — where each screen is bound (via OSDK/Workshop) to object sets, and each button is an **Action** that proposes/commits a real change and **pushes to systems outside Foundry** ([operational apps](https://www.palantir.com/docs/foundry/app-building/operational-apps); [OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/overview)).

### A.5 Credible critiques & limitations (verified, balanced)
- **Vendor lock-in / proprietary gravity.** The Ontology is *not a buyable metadata layer bolted on a warehouse* — it is deeply woven into the platform, creating high switching costs; once the Ontology and apps are deeply built, "the true exit path is not especially transparent" ([van der Laan, "Beyond Palantir's Ontology"](https://medium.com/towards-data-engineering/beyond-palantirs-ontology-the-paradigm-the-platform-and-the-path-to-open-semantics-f8e8b3b5fe93); [Lokad review](https://www.lokad.com/review-of-palantir-com/)).
- **Services-heavy / FDE model.** Critics frame the **Forward Deployed Engineer** program as "consulting + staff augmentation" that risks making buyers feel they're buying unfathomable core tech rather than "an overpriced systems-integration contract" ([Lokad](https://www.lokad.com/review-of-palantir-com/); [Everest Group](https://www.everestgrp.com/palantir-inside-the-category-of-one-forward-deployed-software-engineers-blog/)).
- **Cost / TCO opacity.** Total cost of ownership is "not very transparent and difficult to compare with open stacks without a deep PoC."
- **The "ontology" label is partly narrative.** Skeptics argue Palantir's "Ontology" is, technically, a well-engineered object/semantic + app layer dressed in heavier philosophical language; the deepest customer decision logic isn't publicly inspectable ([Vonng, critical](https://vonng.com/en/db/ontology-bullshit/); [Lokad](https://www.lokad.com/review-of-palantir-com/)).
- **Strategic read for us:** their *moat is the closed loop + lineage + governed write-back*, not the word "ontology." Their *weakness is generality* — it must be hand-built per customer by expensive engineers. **A single-function product that ships the loop pre-built for one high-value domain — yet sells horizontally across markets — attacks exactly that weakness.**

---

## PART B — Palantir Ontology (enterprise) vs Reven (partnership intelligence)

The striking finding: **Reven's documented architecture is already an Ontology pattern, scoped to one function (partner revenue) rather than one industry.** The Integration Layer manual's reference architecture — *Ingest → Identity Resolution → Revenue Events + Claim Ledger → Agreement Rule + Eligibility Engine → Payout → Finance Evidence/Audit → Controlled write-back* ([`Integration_Layer_and_API_Data_Flows_Manual.md` §3](Integration_Layer_and_API_Data_Flows_Manual.md)) — is structurally the same loop Palantir describes, with the **Partner Revenue Claim** as the central object ([`Partner_Revenue_OS_PDR.md` §1](Partner_Revenue_OS_PDR.md)).

| Dimension | **Palantir Ontology** | **Reven (Partner Revenue OS)** |
|---|---|---|
| **Scope** | Horizontal & **general-purpose** — any enterprise object/decision | **Horizontal across markets, but single-function** — partner revenue / commercial excellence (every industry where B2B entities share revenue) |
| **Central object** | Customer-defined (`Order`, `Equipment`…) | **Partner Revenue Claim** (partner × customer × opportunity × role × agreement × protection × attribution × evidence × revenue × payout × approvals × disputes) |
| **Semantic layer** | Object/property/link types, built per customer | Pre-defined **canonical objects**: Partner, Revenue Event, Claim, Agreement Rule, Payout, Evidence ([§E1 canonical data model](Integration_Layer_and_API_Data_Flows_Manual.md)) |
| **Identity/graph fusion** | Generic entity resolution | **Identity Resolution Engine** fusing CRM+billing+marketplace+marketing+support into one **contribution graph** ([§1.4](Integration_Layer_and_API_Data_Flows_Manual.md)) |
| **Kinetic layer (governed writes)** | Action types + Functions (TS/Python) | **Agreement Rule + Eligibility Engine**; "all writes through Action types" analog = **claim lifecycle** + **controlled write-back** (write only what sales needs back to CRM) |
| **Provenance / evidence** | Mandatory-control lineage | **Finance Evidence + Audit + cleared ZATCA XML store** — domain-specialized, *legally* grounded (the cleared XML, not the ERP row, is canonical) |
| **Simulation** | **Scenarios** (branch/fork + what-if) | **Not yet** — no claim/payout what-if simulation in spec or prototype |
| **AI activation** | AIP Logic, Ontology-grounded tools (data/logic/action) | **Not yet** — no AIP-equivalent; attribution/eligibility are rule-based, not AI-grounded-on-objects |
| **System-of-record posture** | Becomes the operational SoR | **Deliberately narrow** — owns *only* the claim/attribution/eligibility/dispute/statement; reads truth from CRM/ERP/billing/ZATCA ([§4 SoR map](Integration_Layer_and_API_Data_Flows_Manual.md)) |
| **Money movement** | N/A | **Phased & gated** — Phase 1 never moves money; settlement is Phase-2-late or partnered to a rail ([`README.md`](README.md)) |
| **GTM / delivery** | FDE-led, services-heavy, 7–8 figure | **Self-serve-able, single-function platform** (SMB self-serve + enterprise sales), claim-centric PRM wedge — *the anti-FDE play* |
| **Current maturity** | Production platform | **Strategy + 57-screen static prototype**; engine is documented intent, not built |

**Net:** Reven is, by design, *"a pre-built, finance-grade, compliance-aware Ontology for the partner-revenue domain."* Palantir's generality is its strength (any use case) and its cost (must be hand-built). Reven's **functional** narrowness — one need, not one industry — is both its constraint and its wedge (the loop ships pre-wired, no FDE army, while still selling horizontally across markets). For our clients, "partnership system intelligence" = **the contribution graph + claim ledger + eligibility engine + evidence/audit**, which is precisely an Ontology specialized to commercial partnerships.

---

## PART C — Gap Analysis: from where we are → "the Ontology for partnerships & commercial excellence"

### C.1 What we have (assets)
- ✅ **A correct architectural blueprint** — the canonical-object model, claim ledger, rule/eligibility engine, controlled write-back, and evidence/audit spine are *already specified* ([Integration Layer manual](Integration_Layer_and_API_Data_Flows_Manual.md); [PDR](Partner_Revenue_OS_PDR.md)).
- ✅ **The right central object** — the Partner Revenue Claim is a genuine, ownable control point (like Palantir's object types but pre-chosen for the domain).
- ✅ **Domain-grade provenance design** — ZATCA cleared-XML-as-evidence is a *stronger, legally-anchored* lineage story than generic mandatory controls, for KSA finance.
- ✅ **A 57-screen UI prototype** mapping all 22 workflow phases (the "operational apps" surface, in mockup form).
- ✅ **Phase discipline** — a gated roadmap (Capture → Settle → Orchestrate) that sequences risk sensibly.

### C.2 What's missing (the gaps vs the Ontology pattern)

| # | Gap | Palantir analog we lack | Severity |
|---|---|---|---|
| **G1** | **The objects aren't live.** We have canonical-object *definitions*, not a running object store fed by real datasources + user edits. | OMS + Object Storage V2 (Funnel/OSS) + indexing | **Critical / foundational** |
| **G2** | **No governed write/Action engine.** Claim lifecycle transitions exist as UI states, not as validated, permissioned, audited, reversible **Actions**. | Action types: rules + submission criteria + audit + writeback dataset | **Critical** |
| **G3** | **No Identity Resolution Engine in code.** The contribution graph that fuses CRM+billing+marketplace+support is documented, not built. | Entity resolution / link graph | **Critical** (this *is* "partnership intelligence") |
| **G4** | **Attribution & eligibility are conceptual, not an engine.** No rule engine evaluating agreements → eligibility net of WHT/VAT/clawback. | Functions / Functions-on-Objects | **High** |
| **G5** | **No simulation / what-if.** Can't fork a claim/payout scenario ("what if we change the protection window / split / tier?"). | **Scenarios** (branch/fork) | **High** (executive "investability" lever) |
| **G6** | **No AI activation grounded on the objects.** No AIP-Logic-equivalent where an LLM/agent reads the claim graph via governed *data/logic/action* tools, within the user's permissions. | AIP Logic + Ontology-grounded tools | **High** (the differentiator for "intelligence") |
| **G7** | **No closed loop / write-back in production.** Decisions (approvals, eligibility, payouts) aren't written back to systems of record + re-ingested to enrich the twin. | Decisions-as-data write-back loop | **High** |
| **G8** | **Security model not implemented.** Row/field-level controls, partner-tenant isolation, mandatory-control inheritance for payout data are designed, not enforced in code. | Dynamic security layer + lineage | **High** (gates enterprise/bank sign-off) |
| **G9** | **No partner/developer SDK or API surface live.** No OSDK-analog for the claim graph (the manual specs "the OS's own API surface" but it isn't built). | OSDK + API | **Medium** (Phase 3 network/orchestrate enabler) |
| **G10** | **No partner P&L / forecasting graph traversal.** Cost-to-serve and forecast objects are listed but not modeled/linked. | Object/link traversal + functions-on-models | **Medium** (Phase 3) |

### C.3 The path to "the Ontology for partnerships" (sequenced, phase-aligned)

**Foundation (maps to Phase 1 — Capture):**
1. **Stand up the live object store + claim ledger (G1, G2).** Implement the canonical objects (Partner, Revenue Event, Claim, Agreement Rule, Payout, Evidence) as a real, append-only, indexed store; make **every claim-state change a governed Action** (validation + permission + audit + write-back dataset). *This is the single highest-leverage build — it converts the prototype into an Ontology.*
2. **Build the Identity Resolution Engine + contribution graph (G3).** Even read-only at first: fuse CRM + billing + (later) marketplace/support into one partner-contribution graph with a human-review queue for low-confidence matches. **This is the literal "partnership system intelligence."**
3. **Make attribution + eligibility a real engine (G4).** Agreement rules → eligibility net of WHT/VAT, with clawback semantics — the domain's Functions-on-Objects.
4. **Implement the dynamic security layer (G8)** with partner-tenant isolation and field-level controls on payout data — a precondition for any enterprise/bank review.

**Differentiation (late Phase 1 → Phase 2 — Settle):**
5. **Closed-loop write-back (G7):** push approved eligibility/statement signals back to CRM/ERP, re-ingest outcomes, and *enrich the claim twin* — the move from analytical to operational.
6. **Scenarios / simulation (G5):** fork a claim/payout to answer "what if we change the split, tier, or protection window?" — the executive "investability/forecast" lever the PDR promises.
7. **AI activation (G6):** an AIP-Logic-equivalent where an agent answers "which partners are profitable / which claims are at risk / where should we invest?" by calling **governed data/logic/action tools over the claim graph, inside the user's permissions** — grounded reasoning, not free-floating LLM output.

**Network (Phase 3 — Orchestrate):**
8. **Partner-graph SDK/API (G9)** and **partner P&L + forecasting traversal (G10)** to enable co-sell, cross-tenant identity, and the multi-company partnership network.

### C.4 The strategic positioning (how we win where Palantir is exposed)
- **Pre-built loop, no FDE army.** Palantir's loop must be hand-built by expensive forward-deployed engineers; **we ship it pre-wired for one domain** — that is the anti-FDE, self-serve wedge.
- **Legally-grounded provenance beats generic lineage** in our market: cleared ZATCA XML as canonical evidence is a sharper trust story for CFOs than abstract mandatory controls.
- **Narrow system-of-record posture** (own only the claim/attribution/eligibility) makes us *adoptable as an overlay* where Palantir asks for a platform commitment.
- **The honest framing:** we don't need to *be* Palantir. We need to be **the Ontology of one extremely valuable object — the Partner Revenue Claim** — with the same engineering disciplines (governed Actions, lineage, closed-loop write-back, simulation, AI-grounded-on-objects) that make their pattern defensible.

---

## Sources & confidence

**Confidence: High** on Palantir architecture/primitives (corroborated across Palantir's own engineering docs *and* multiple independent practitioners) and on the documented critiques (multiple independent reviewers). **Medium** where noted as Palantir framing/marketing vs. engineering fact (e.g., "three-layer" naming, "digital twin" language). The Reven half is grounded in this repo's own docs.

**Palantir primary (engineering docs + blog):**
- [Ontology system architecture](https://www.palantir.com/docs/foundry/architecture-center/ontology-system) · [Ontology overview](https://www.palantir.com/docs/foundry/ontology/overview) · [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts)
- [Object backend overview (OMS, Funnel, OSS)](https://www.palantir.com/docs/foundry/object-backend/overview) · [Object Storage V1 / Phonograph](https://www.palantir.com/docs/foundry/object-databases/object-storage-v1) · [Indexing](https://www.palantir.com/docs/foundry/object-indexing/overview)
- [Object types](https://www.palantir.com/docs/foundry/object-link-types/object-types-overview) · [Link types](https://www.palantir.com/docs/foundry/object-link-types/link-types-overview)
- [Action types overview](https://www.palantir.com/docs/foundry/action-types/overview) · [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria) · [Rules](https://www.palantir.com/docs/foundry/action-types/rules)
- [Functions overview](https://www.palantir.com/docs/foundry/functions/overview) · [Ontology edits](https://www.palantir.com/docs/foundry/functions/edits-overview) · [OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/overview)
- [Workshop Scenarios (what-if/branch)](https://www.palantir.com/docs/foundry/workshop/scenarios-overview)
- [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview) · [Connecting AI to Decisions (blog)](https://blog.palantir.com/connecting-ai-to-decisions-with-the-palantir-ontology-c73f7b0a1a72) · [Reducing Hallucinations with the Ontology (blog)](https://blog.palantir.com/reducing-hallucinations-with-the-ontology-in-palantir-aip-288552477383) · [Ontology-Oriented Software Development (blog)](https://blog.palantir.com/ontology-oriented-software-development-68d7353fdb12)
- [Security overview](https://www.palantir.com/docs/foundry/security/overview) · [Object security policies](https://www.palantir.com/docs/foundry/object-permissioning/object-security-policies) · [Mandatory control properties](https://www.palantir.com/docs/foundry/object-link-types/mandatory-control-properties)

**Independent experts / critiques:**
- [Jaco van der Laan — "Beyond Palantir's Ontology: …Open Semantics"](https://medium.com/towards-data-engineering/beyond-palantirs-ontology-the-paradigm-the-platform-and-the-path-to-open-semantics-f8e8b3b5fe93)
- [Pankaj Kumar — "How It Works… and Where It Falls Short"](https://medium.com/@cloudpankaj/palantir-foundry-ontology-how-it-works-what-problems-it-solves-and-where-it-falls-short-d8b4a1ae4900)
- [Lokad — critical vendor review](https://www.lokad.com/review-of-palantir-com/) · [Vonng — skeptical "Ontology narrative"](https://vonng.com/en/db/ontology-bullshit/)
- [Cristian Caruso — Semantic/Kinetic/Dynamic layers](https://pythonebasta.medium.com/understanding-palantirs-ontology-semantic-kinetic-and-dynamic-layers-explained-c1c25b39ea3c) · [Roberto Dias Duarte — decision-centric architecture](https://www.robertodiasduarte.com.br/en/palantir-ontology-a-arquitetura-decision-centric/)
- [Everest Group — FDE "category of one"](https://www.everestgrp.com/palantir-inside-the-category-of-one-forward-deployed-software-engineers-blog/) · [Towards AI — "The Context Advantage"](https://towardsai.net/p/machine-learning/the-context-advantage-how-palantir-aip-operates-the-modern-enterprise) · [Cognizant — power of Ontology in Foundry](https://www.cognizant.com/us/en/the-power-of-ontology-in-palantir-foundry)

**Reven (this repo):** [`Partner_Revenue_OS_PDR.md`](Partner_Revenue_OS_PDR.md) · [`Integration_Layer_and_API_Data_Flows_Manual.md`](Integration_Layer_and_API_Data_Flows_Manual.md) · [`README.md`](README.md)
