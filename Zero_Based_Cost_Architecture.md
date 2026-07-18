# Partner Revenue OS (Reven) — Zero-Based Cost Architecture
## The cost operating system: methodology · taxonomy · driver tree · decision packages · governance
### CFO-grade · KSA/GCC-calibrated · phase-aligned · public-SaaS-legible · No-Hallucination

> **Status: Canonical cost-methodology reference.** This document defines *how Reven decides, structures,
> defends, and governs every riyal of cost from a zero base* — as a permanent operating discipline, not a
> one-off cut. It sits **above** the two existing quantitative artifacts and generates the discipline behind them:
>
> | Artifact | Role | Relationship to this doc |
> |---|---|---|
> | `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` | The **allocation** (where 2,000,000 SAR goes) | The Phase-1 zero-base, re-expressed as decision packages (§11) |
> | `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` + Founder Questionnaire | The **projection** (monthly burn/runway/cash) | Consumes this doc's cost taxonomy, drivers & cost-behavior classes |
> | `Monthly_CFO_Review_Manual.md` | The **actuals loop** (monthly variance) | Runs the monthly leg of the zero-based cadence (§8) |
> | **This document** | The **operating system** (method + taxonomy + governance) | The source of cost discipline the other three inherit |
>
> **No figure in this document overrides a canonical fact.** The 2,000,000.00 SAR round, its four pillars,
> and every statutory rate remain as recorded in their source files. Unit costs and benchmarks here are
> flagged **📊 benchmark-to-validate** or **🔴 input-required**; statutory items are flagged **verify** and
> cited to `Pre_Seed_12M_Model_Founder_Questionnaire.md` Part 3.

---

## Table of contents

1. [Executive thesis — the CFO one-pager](#1-executive-thesis--the-cfo-one-pager)
2. [What "zero-based" means here — and what it is not](#2-what-zero-based-means-here--and-what-it-is-not)
3. [The public-listed B2B SaaS cost lens (target-state P&L geography)](#3-the-public-listed-b2b-saas-cost-lens-target-state-pl-geography)
4. [The Zero-Based Cost Breakdown Structure (CBS)](#4-the-zero-based-cost-breakdown-structure-cbs)
5. [Cost drivers & the driver tree](#5-cost-drivers--the-driver-tree)
6. [Decision packages — the zero-based unit of funding](#6-decision-packages--the-zero-based-unit-of-funding)
7. [Should-cost baselines, benchmarks & cloud FinOps](#7-should-cost-baselines-benchmarks--cloud-finops)
8. [Cost governance & operating cadence](#8-cost-governance--operating-cadence)
9. [Phase-based cost architecture (Capture → Settle → Orchestrate)](#9-phase-based-cost-architecture-capture--settle--orchestrate)
10. [Zero-based unit economics & gross-margin architecture](#10-zero-based-unit-economics--gross-margin-architecture)
11. [Integration & reconciliation with the finance stack](#11-integration--reconciliation-with-the-finance-stack)
12. [The end-to-end build & 30/60/90 stand-up](#12-the-end-to-end-build--306090-stand-up)
13. [Assumptions register, confidence flags & validation checklist](#13-assumptions-register-confidence-flags--validation-checklist)
- [Appendix A — Glossary](#appendix-a--glossary)
- [Appendix B — Formula reference](#appendix-b--formula-reference)
- [Appendix C — Driver dictionary](#appendix-c--driver-dictionary)

---

## 1. Executive thesis — the CFO one-pager

**Reven sells finance-grade control over other companies' partner revenue. It must run its own cost with the
same discipline it promises its customers.** A company whose entire value proposition is *"every riyal of
partner revenue is attributable, defensible, and owned"* cannot run a cost base where riyals are inherited,
unexamined, and un-owned. The Zero-Based Cost Architecture (ZBC) is how Reven makes its **internal cost base
as auditable as the ledger it sells.**

**The binding commercial constraint is the multiple.** The pricing strategy is explicit: Reven is to be
**valued like software** — a **≥70% blended gross-margin floor**, with the settlement/percentage layer
**capped, fenced, and reported separately** so it never contaminates the software multiple
(`Reven_Pricing_Executive_Summary.md` §4–5). ZBC is the operational guarantee behind that promise: it is the
mechanism that keeps cost-of-revenue *structurally* below 30 points of revenue and keeps low-margin
activities (services, rails, AI inference) fenced, capped, and visible rather than silently eroding gross
margin.

**Seven governing principles:**

1. **Zero base, every cycle.** No cost survives because it existed last period. Every riyal is re-justified
   from zero against the outcome it produces, the driver that scales it, and the owner who defends it.
2. **No cost without a driver.** Every cost element maps to exactly one *primary driver* (a countable unit of
   the business) and a *cost-behavior class* (fixed / variable / step). Costs with no driver are, by
   definition, candidates for elimination.
3. **Protect the numerator, attack the denominator's waste.** ZBB in a growth-stage SaaS destroys value when
   it cuts R&D velocity or quota-carrying capacity, and creates value when it attacks G&A sprawl, tool
   redundancy, cloud waste, and undifferentiated heavy-lifting. Reven's ZBC is **growth-protective by design.**
4. **Should-cost, not last-cost.** Every material pool is benchmarked to what it *should* cost (unit
   economics, market rates, right-sized cloud), not to what it *did* cost.
5. **Cost geography is IPO-legible from day one.** Every internal package maps to the exact line it will
   occupy in a public SaaS P&L (Cost of Revenue / R&D / S&M / G&A). We build the public-company cost taxonomy
   while private, so diligence and, later, segment reporting are a re-label, not a rebuild.
6. **Fence the dilutive, celebrate the accretive.** Services, settlement, and AI inference are fenced and
   capped so they can be *sold* without dragging the blended margin the equity story depends on.
7. **The cadence is permanent.** ZBC is an annual rebuild + quarterly challenge + monthly variance loop — an
   operating system, not a project. The day it becomes a one-time slash exercise is the day it starts
   destroying enterprise value.

**Three-horizon cost posture, aligned to the governing phase model:**

| Horizon | Phase | Dominant cost question | Zero-base center of gravity |
|---|---|---|---|
| **Now (pre-revenue)** | **Capture — the PRM** (M0–9; all 12 pre-seed months) | *"What is the minimum cost to prove the wedge and survive to the seed gate?"* | Runway discipline: people (~88% of the round), zero settlement/rails cost, cloud at base + first tenants |
| **Next (system-of-record)** | **Settle** (M9–24) | *"What does it cost to serve one more claim / payout / residency tenant — and does it clear the 70% floor?"* | Cost-to-serve architecture: rails, KYB/AML, evidence storage, settlement ops switch on and must be fenced |
| **Later (network)** | **Orchestrate** (M24+) | *"Where is the operating leverage — what cost grows sub-linearly to the network?"* | Operating leverage: G&A and platform cost per entity fall; data/network cost ≈ 100% GM |

The rest of this document builds the machinery: the taxonomy (§4), the drivers (§5), the funding unit (§6),
the benchmarks (§7), the governance (§8), the phase shape (§9), the margin architecture (§10), and the
reconciliation to the existing finance stack (§11).

---

## 2. What "zero-based" means here — and what it is not

**Zero-Based Budgeting (ZBB)** — originated by Peter Pyhrr at Texas Instruments (1970) and modernized by the
cost-transformation practices (Bain, McKinsey, AlixPartners) — inverts the default budgeting logic. Instead
of *"last period ± a delta"*, every cost starts at **zero** and must be *built up and justified* from the
activities that consume it.

| Dimension | Traditional / incremental budgeting | Zero-based costing (this architecture) |
|---|---|---|
| **Starting point** | Prior-period actuals | **Zero** — nothing is pre-approved |
| **Unit of debate** | Departments & line items | **Decision packages** (activity + service level + driver + owner) |
| **Default answer** | "Keep it, adjust at the margin" | "Justify it, or it does not get funded" |
| **Question asked** | "How much more/less than last year?" | "Should this activity exist, at what service level, and what should it cost?" |
| **Cost visibility** | Cost by cost-center | **Cost by driver and by outcome**, owner-attributed |
| **Cadence** | Annual, incremental | **Annual rebuild + quarterly challenge + monthly variance** |
| **Cultural effect** | Entitlement ("it's in my budget") | Ownership ("I sponsor and defend this package") |

**Three related disciplines — kept distinct:**

- **ZBB (Zero-Based Budgeting)** — the *forward* funding decision: build next period's spend from zero.
- **ZBC (Zero-Based Costing)** — the *analytical* view: decompose the existing cost base to driver level and
  a should-cost baseline. **This document is primarily a ZBC + ZBB architecture** — taxonomy and drivers (ZBC)
  feeding the funding cadence (ZBB).
- **ZBO (Zero-Based Organization)** — spans-and-layers/headcount rebuild. Reven's master cost driver is
  **headcount** (≈88% of the pre-seed round is people), so ZBO discipline — span of control, backfill gates,
  ramp curves — is embedded in §6 and §8 rather than run as a separate exercise.

**What zero-based is NOT here — the failure modes we explicitly design against:**

1. **It is not a one-time slash.** A single "cut 20%" event demoralizes teams, cuts muscle with fat, and
   rebounds within a year. ZBC is a *permanent operating rhythm*.
2. **It is not anti-growth austerity.** We will *increase* spend on any package where the marginal riyal
   returns above threshold (quota-carrying reps below capacity, R&D on the settlement engine, KYB coverage
   that unlocks a residency deal). Zero-based means *justified*, not *minimized*.
3. **It is not finance imposing numbers on the business.** Packages are **owned and defended by the operator**,
   challenged by a cross-functional council, and arbitrated by the CFO. Finance runs the process; operators
   own the cost.
4. **It is not cost-center accounting relabeled.** The unit is the *decision package* (an activity at a
   service level), not the GL cost-center. This is what lets us ask "should this exist at all?" — a question
   cost-center budgeting structurally cannot pose.
5. **It is not blind to false economies.** Cutting a SOC 2 audit, a pen-test, WPS payroll buffer, or Zakat
   provisioning to shave burn is a false economy that fails the enterprise/semi-gov sale or breaches KSA law.
   The deferrability matrix (§8) hard-codes what is **protected** regardless of RAG state.

**Where ZBB creates vs destroys value in a growth-stage SaaS** (the map that governs every challenge):

| Attack aggressively (waste, undifferentiated) | Protect / invest (value-creating, differentiating) |
|---|---|
| G&A tooling & SaaS-subscription sprawl | R&D velocity on the ledger/rule-engine/settlement core |
| Cloud over-provisioning, idle non-prod, egress, un-tiered storage | Quota-carrying sales capacity below productivity ceiling |
| Duplicated vendors, shelfware, auto-renew creep | Security/compliance posture (SOC 2, ISO 27001, PDPL, residency) |
| Travel, events, real estate beyond need | Customer Success where it protects NRR/GRR |
| Manual, low-value ops that should be automated | KYB/AML/rails coverage that unlocks Settle-phase revenue |
| "Nice-to-have" analytics/BI tool overlap | Data-residency capability (the GCC wedge incumbents can't retrofit) |

---

## 3. The public-listed B2B SaaS cost lens (target-state P&L geography)

Reven's cost taxonomy is built to be **legible to a public-SaaS investor from day one.** Every internal cost
package maps to the line it will occupy in a listed company's income statement, so that (a) diligence is a
re-label rather than a forensic rebuild, and (b) the company can later produce IFRS/segment reporting without
re-architecting its books.

### 3.1 How a listed B2B SaaS reports cost

```
Revenue
  ├─ Subscription revenue
  └─ Professional-services revenue
Cost of Revenue (COGS / "Cost of Sales")
  ├─ Subscription COGS        → hosting, evidence storage, third-party rails, support-as-COGS,
  │                              observability, security runtime, AI inference, DPO/residency,
  │                              amortization of capitalized software
  └─ Services COGS            → delivery labor (loaded), partner/SI subcontract
= Gross Profit  →  Gross Margin %   (the number the multiple keys off)
Operating expenses
  ├─ Research & Development (R&D)      → engineering, product, design (net of capitalized dev)
  ├─ Sales & Marketing (S&M)          → quota-carrying + demand-gen + amortization of capitalized commissions
  └─ General & Administrative (G&A)   → finance, legal, HR, IT, facilities, statutory/compliance ops
= Operating income
  ± Below-the-line: SBC (disclosed), FX, interest, tax (Zakat/CIT/WHT)
= Net income  →  and separately: Free Cash Flow (the second number that matters)
```

**Three accounting treatments that materially shape a SaaS cost base — designed-in now:**

- **Capitalized software development (IAS 38 / ASC 350-40).** Qualifying development cost is capitalized and
  amortized into *subscription COGS*, not expensed in R&D. Policy must be set early; it moves both gross
  margin and R&D%.
- **Capitalized contract-acquisition cost (IFRS 15 / ASC 606-340-40).** Incremental commissions are
  capitalized and amortized over the expected customer life, smoothing S&M. Relevant once a commissioned
  sales motion exists (Settle phase).
- **Share-based compensation (SBC).** Non-cash but real dilution; disclosed and add-backs scrutinized.
  Tracked in the cost architecture as a *non-cash* line so cash burn and GAAP/IFRS cost never conflate — the
  same discipline the Founder Questionnaire applies to *"bookings ≠ billings ≠ revenue ≠ cash."*

### 3.2 Best-in-class public-SaaS cost benchmarks (📊 benchmarks-to-validate)

These are the reference envelopes a listed B2B SaaS is measured against. They are **targets to validate
against Reven's own instrumented data**, never plugged as fact — consistent with the repo's no-hallucination
discipline.

| Metric | Benchmark envelope (📊) | Best-in-class | Reven target posture |
|---|---|---:|---|
| **Blended gross margin** | 70–85% | 80%+ | **≥70% floor (hard)**; drive to 78–82% at scale |
| **Subscription gross margin** | 75–85% | 85%+ | 80–85% (software + data) |
| **Services gross margin** | 0–30% (often run ≈ breakeven by design) | — | Fenced <20% of revenue; near-breakeven acceptable |
| **S&M as % revenue** | 40–55% (high-growth) → 25–35% (scale) | — | Phase-dependent; efficiency-gated by magic number |
| **R&D as % revenue** | 15–25% | — | Protected pool; higher in Settle build-out |
| **G&A as % revenue** | 8–15% → <10% (scale) | <8% | Aggressive ZBB target; sub-linear to revenue |
| **Rule of 40** (growth% + FCF margin%) | ≥40 | 50–60+ | North-star composite |
| **CAC payback** | <18 mo (enterprise) / <12 mo (good) | <12 mo | Gate on new S&M packages |
| **Sales magic number** | >0.75 | >1.0 | Governs quota-capacity funding |
| **Net revenue retention (NRR)** | >110% | >120% | Expansion engine (bands→modules→compliance→entities) |
| **Gross revenue retention (GRR)** | >90% | >95% | Protects the recurring base |
| **FCF margin (at scale)** | 20%+ | 30%+ | The second number behind Rule of 40 |
| **Hosting/cloud as % revenue** | 5–10% | <5% | The dominant subscription-COGS pool — FinOps-governed (§7) |

### 3.3 Reven's target operating model (illustrative, at scale)

Illustrative *shape* only (not a forecast — the 12-month model is zero-revenue). It shows the **cost geography
the ZBC is steering toward**, with the ≥70% GM floor as the binding constraint.

| P&L line | Early (Capture) | Scaling (Settle) | Mature (Orchestrate) |
|---|---|---|---|
| Gross margin | n/a (pre-rev) | 70–75% (floor-defended) | 78–82% |
| R&D % rev | — | 25–35% (settlement build) | 15–20% |
| S&M % rev | — | 45–55% | 30–40% |
| G&A % rev | — | 15–20% | <10% |
| Operating margin | negative (funded burn) | approaching breakeven | positive, Rule-of-40 |

---

## 4. The Zero-Based Cost Breakdown Structure (CBS)

The CBS is the backbone taxonomy: a four-level tree from *Total Cost* down to *cost driver*. It is built to
reconcile **exactly** with (a) the existing Gross Burn identity —
`Gross Burn = Product/R&D + GTM + CS/Implementation + COGS + G&A/Compliance` — and (b) the COGS Section H
elements from the Founder Questionnaire, and to roll **up** into the public-SaaS P&L lines of §3.

### 4.1 Level 0–1 — the cost categories

| L1 code | Category | Public P&L line | Primary purpose |
|---|---|---|---|
| **A. CoR** | Cost of Revenue | Cost of Revenue | Deliver & run the service for paying customers |
| **B. R&D** | Research & Development | R&D | Build the product & platform |
| **C. S&M** | Sales & Marketing | S&M | Acquire & expand customers |
| **D. G&A** | General & Administrative | G&A | Run the company & meet statutory obligations |

### 4.2 Level 2–4 — pools, elements & drivers

Legend — cost behavior: **F** fixed · **V** variable · **S** step. Every element carries a **primary driver**
(the unit that scales it) and a **cost-behavior class** (reused from the model's §7D discipline).

#### A. Cost of Revenue (the gross-margin engine — must stay < ~30 pts of revenue)

| Pool | Cost element | Behavior | Primary driver | Owner |
|---|---|---|---|---|
| **A1 Cloud infrastructure** | Compute (app/API nodes) | S/V | # tenants, request volume | DevOps |
| | Managed PostgreSQL (primary + replica) | S/V | # tenants, data volume, IOPS | DevOps |
| | Object/blob storage — **evidence store (grows monotonically)** | V | GB evidence retained | DevOps |
| | Network / egress / load balancing | V | traffic, cross-AZ/region egress | DevOps |
| | Backup, snapshots, **DR (regional pipelines)** | S/V | data volume, RPO/RTO policy | DevOps |
| | Non-prod (dev/stage/sandbox) environments | S | # environments | DevOps |
| **A2 Observability & runtime** | Logging, metrics, tracing, APM | V | event/log volume | DevOps |
| | Uptime/synthetic monitoring, on-call tooling | F/S | # services / SLA tier | DevOps |
| **A3 Security & compliance runtime** | WAF, SIEM, secrets/KMS, vuln scanning | S | # tenants / compliance tier | Security |
| | Pen-test & audit amortization (SOC 2 / ISO 27001) | F | audit cadence | Security |
| | **In-Kingdom data residency / dedicated tenancy** premium | S | # residency (L2) tenants | DevOps/Security |
| **A4 Third-party rails & data** | KYB/KYC & sanctions/AML screening | V | # partners onboarded/verified | Compliance |
| | e-signature / contract execution | V | # documents executed | Product Ops |
| | **Payment/payout rails (Phase-2 only)** | V | # payouts, settled volume | Settlement Ops |
| | **ZATCA e-invoicing / Fatoorah integration** | V/S | # invoices | Finance Ops |
| | Notifications (email/SMS/push) | V | # notifications | Product Ops |
| **A5 AI / ML inference** | Attribution-assist & doc-parsing inference (**capped**) | V (capped) | # claims/events processed | Product |
| **A6 Support-as-COGS** | Tier-1/2 support labor (loaded) + tooling | S/V | ticket volume, # accounts | Support |
| **A7 Customer Success-as-COGS** | CSM loaded cost (retention-serving portion) | S | # accounts by tier | CS |
| **A8 Professional-services delivery** | Implementation labor (loaded) + SI subcontract | V | # onboardings, config hours | Services |

> **Reconciliation to Section H:** A1(compute/db/storage)=H1/H2 · A2/A3=H2 (logs/security) · A4/A5=H3
> (capped AI/API + rails) · A6=H4 (support tooling) · A8=H5 (per-customer implementation delivery, **in COGS,
> not CAC**). The "evidence store grows monotonically" flag mirrors the model's explicit warning.

#### B. Research & Development

| Pool | Cost element | Behavior | Primary driver | Owner |
|---|---|---|---|---|
| **B1 Core engineering** | Backend (ledger, rule engine, reconciliation) | S | roadmap scope, headcount | CTO |
| | Frontend / product surfaces | S | roadmap scope | CTO |
| | Data/integration (CRM/ERP sync channels) | S | # integration targets | CTO |
| **B2 Product & design** | PM, UX/UI, research | S | roadmap scope | CPO |
| **B3 DevEx & tooling** | CI/CD, source control, test infra, IaC | F/S | # engineers, pipeline minutes | DevOps |
| **B4 Capitalizable dev (policy)** | Qualifying dev cost → capitalized/amortized to A (CoR) | — | capitalization policy | Finance |

#### C. Sales & Marketing

| Pool | Cost element | Behavior | Primary driver | Owner |
|---|---|---|---|---|
| **C1 Quota-carrying sales** | AE/inside-sales comp (base + variable) | S | # reps × quota capacity | CRO |
| **C2 Sales engineering / solution architecture** | Pre-sales SA loaded cost | S | # enterprise/gov pursuits | CRO |
| **C3 Demand generation** | Digital, content, events, ABM | V/F | pipeline-coverage target | Marketing |
| **C4 Partner/channel & SI enablement** | Channel margin, SI enablement | V | # channel deals | CRO |
| **C5 Capitalized commissions (policy)** | Incremental commissions → capitalized/amortized | — | contract life | Finance |

#### D. General & Administrative (highest ZBB-attack surface)

| Pool | Cost element | Behavior | Primary driver | Owner |
|---|---|---|---|---|
| **D1 Founders & leadership** | Founder cash comp + burden | F | headcount plan | CEO |
| **D2 Finance & accounting** | Controller/ops, audit, tax filing | S | # entities, txn volume | CFO |
| **D3 Legal & compliance** | Bilingual contracts, PDPL/SDAIA, regulatory | S/F | # contracts, jurisdictions | Legal |
| **D4 People / HR / Nitaqat** | Recruiting, HR ops, Saudization admin | S | headcount, hiring pace | People |
| **D5 IT & internal SaaS** | Internal tooling, endpoints, identity | S/V | headcount | IT |
| **D6 Facilities** | Office (Riyadh), utilities, Ejar lease | F/S | headcount, footprint | Ops |
| **D7 Statutory labor burden** | **GOSI, EOSB, work-permit levy, dependent fee, medical (CCHI)** | V | headcount (Saudi/expat mix) | Finance |
| **D8 Corporate tax & regulatory** | **Zakat (2.5% net-asset floor, owed pre-revenue), CIT, WHT, VAT ops** | V/F | net assets, foreign spend, turnover | Finance |
| **D9 One-time setup (front-loaded)** | MISA/MOC, CR, Iqama/Naql Kafala, ZATCA init, insurance | F (one-time) | entity setup | Finance |

> **KSA statutory rates** (D7/D8) are applied per `Pre_Seed_12M_Model_Founder_Questionnaire.md` Part 3 and
> flagged **verify**: GOSI employer 11.75% (existing) / 12.25% (new-regime FY25–26) / expat 2%; EOSB accrue
> ≈4.17%/mo; work-permit levy SAR 700–800/mo; dependent SAR 400/mo; Zakat 2.5% on net-asset floor
> (**owed even pre-revenue**); WHT on foreign SaaS/AI often 15% (disputed — model at 15%); VAT 15%
> (working capital, never revenue).

---

## 5. Cost drivers & the driver tree

**The core ZBC assertion: every riyal has exactly one primary driver.** A cost with no driver is a cost with
no owner and no justification — a default elimination candidate. The driver tree cascades from a handful of
*business drivers* (things the company sells/serves) down through *operational* and *resource* drivers to the
riyal.

### 5.1 The driver cascade

```
BUSINESS DRIVERS (what we sell/serve — the countable units of the business)
  # customers (by tier) · # active (transacting) partners · # claims/revenue events
  # payouts & settled volume (Phase 2+) · # entities · # countries/residency tenants
  data/evidence volume (GB) · headcount
        │
        ▼
OPERATIONAL DRIVERS (activity generated per business unit)
  requests/sec · DB queries · GB stored/retained · tickets · onboardings · KYB checks
  documents signed · notifications · inference calls · pipeline meetings · hires
        │
        ▼
RESOURCE CONSUMPTION (what the activity consumes)
  vCPU-hours · GB-months · egress-GB · rail transactions · loaded labor-hours · licenses
        │
        ▼
COST (SAR)  ← unit rate × quantity, benchmarked to should-cost (§7)
```

### 5.2 Master driver map (element → driver → unit → behavior → scales-with)

| Cost element (CBS) | Primary driver | Unit | Behavior | Scales with |
|---|---|---|---|---|
| Compute (A1) | request volume / # tenants | vCPU-hr | S/V | usage, tenants |
| PostgreSQL (A1) | data volume / IOPS | GB-mo, IOPS | S/V | tenants, history |
| Evidence storage (A1) | evidence retained | GB-mo | **V (monotonic)** | claims × retention |
| Egress (A1) | cross-region/AZ traffic | GB | V | integrations, DR |
| DR/backup (A1) | RPO/RTO policy × data | GB-mo | S/V | data, policy tier |
| Observability (A2) | event/log volume | GB ingested | V | usage |
| Security runtime (A3) | # tenants / compliance tier | tenant × tier | S | enterprise/gov mix |
| Residency premium (A3) | # L2 residency tenants | tenant | S | sovereign deals |
| KYB/AML (A4) | # partners verified | check | V | partner onboarding |
| e-sign (A4) | # documents executed | doc | V | contracts, claims |
| Payout rails (A4) | # payouts / settled volume | txn, SAR | V | **Phase-2 settlement** |
| ZATCA e-invoicing (A4) | # invoices | invoice | V/S | customers, billing freq |
| Notifications (A4) | # notifications | message | V | usage |
| AI inference (A5) | # claims/events processed | inference call | **V capped** | claim volume |
| Support (A6) | ticket volume | ticket | S/V | accounts, self-serve % |
| CS (A7) | # accounts by tier | account | S | mid-market+ logos |
| Implementation (A8) | # onboardings × config hrs | loaded hr | V | new logos, complexity |
| Engineering (B1) | roadmap scope | FTE | S | phase, roadmap |
| Sales comp (C1) | # reps × quota capacity | FTE | S | pipeline coverage |
| Demand gen (C3) | pipeline-coverage target | SAR | V/F | bookings target |
| Statutory burden (D7) | headcount (Saudi/expat) | employee | V | headcount, mix |
| Zakat/tax (D8) | net assets / turnover / foreign spend | SAR | V/F | balance sheet, spend |

### 5.3 The cost-to-serve stack (zero-based unit economics)

Cost-to-serve is built **bottom-up from drivers**, not top-down from a cost-center average. This is the model
that proves the ≥70% floor deal-by-deal and tier-by-tier (computed live in the cost-model workbook, §12).

```
Cost to serve ONE customer (per period) =
    Σ shared-platform cost allocated by usage share      (A1–A3 base, driver-weighted)
  + # active partners      × cost/active-partner         (KYB amortized, storage, compute)
  + # claims/events        × cost/event                  (inference, storage, compute)
  + # payouts              × cost/payout                  (rails, reconciliation — Phase 2+)
  + evidence GB retained   × storage unit cost            (monotonic — model the ratchet)
  + residency/tenancy tier × premium cost                 (A3 — if L2/L3)
  + support tickets        × loaded cost/ticket           (net of self-serve deflection)
  + CS allocation by tier                                 (A7)
  + amortized implementation cost                         (A8 — spread over contract life)

Contribution margin = Recognized revenue − cost-to-serve
Gross margin (tier)  = Contribution margin ÷ recognized revenue   → must clear tier floor
Blended GM           = Σ contribution ÷ Σ revenue                 → **≥70% hard floor**
```

**Design implication baked into pricing:** the **SME self-serve tier (SAR 50/mo)** works *only* at
near-zero human cost-to-serve — "one human support call erases a year's revenue"
(`Reven_Pricing_Executive_Summary.md`). ZBC enforces this by classifying any SME human-touch cost as a
**breach event**, not a line item. The enterprise/gov tiers carry residency + services drag and are priced to
absorb it while still clearing the floor.

---

## 6. Decision packages — the zero-based unit of funding

The **decision package** is the atom of ZBB: a discrete activity, described at a *service level*, with its
cost, driver, owner, alternatives, and ranking. Budgets are assembled by **funding a ranked stack of
packages up to the available envelope** — not by adjusting last year's lines.

### 6.1 The package template (reusable spec)

| Field | Content |
|---|---|
| **Package ID / name** | e.g. `A6-SUPPORT-T1` — Tier-1 customer support |
| **Owner (sponsor)** | The operator who defends it (not finance) |
| **Outcome** | The business result it produces (e.g. "<4h first-response, >90% CSAT") |
| **Primary driver** | The unit that scales it (e.g. ticket volume) |
| **Cost behavior** | Fixed / Variable / Step |
| **Service-level options** | **Minimum-viable** → **Target** → **Gold**, each costed |
| **Marginal value** | What the next riyal buys; what the last riyal saved would cost |
| **Alternatives** | Automate / outsource / defer / eliminate — each costed |
| **Deferrability class** | **Protect / Defer / Cut-first** (§8) |
| **Should-cost baseline** | Benchmark unit cost (§7) |
| **Public P&L line** | CoR / R&D / S&M / G&A (§3) |
| **Ranking** | Priority rank within its category envelope |

### 6.2 Service-level laddering — the key ZBB move

Every package is costed at **three service levels** so funding decisions are about *level*, not just
*yes/no*:

- **Minimum-viable (MV):** the least that keeps the outcome credible and compliant.
- **Target:** the level that matches current business ambition and benchmarks.
- **Gold:** the level justified only when the marginal return clears threshold.

The council funds MV for everything mandatory, then buys up to Target/Gold in **ranked** order until the
envelope is exhausted. This is what converts "how much is the budget?" into "what outcomes are we buying, in
what order?"

### 6.3 Illustrative package inventory (Reven)

A representative slice of the package catalog (the full catalog lives in the input sheet / workbook, §12).
Deferrability: 🟩 Protect · 🟧 Defer · 🟥 Cut-first.

| Package | Category | Driver | Behavior | Defer. | Note |
|---|---|---|---|---|---|
| `B1-CORE-ENG` Core engineering (ledger/rule-engine) | R&D | roadmap | S | 🟩 | The product; protect velocity |
| `A3-SEC-AUDIT` SOC 2 / ISO 27001 / pen-test | CoR | audit cadence | F | 🟩 | Enterprise/gov gate; false economy to cut |
| `D7-STAT-BURDEN` GOSI/EOSB/levies/medical | G&A | headcount | V | 🟩 | **Statutory — non-negotiable** |
| `D8-ZAKAT` Zakat/CIT/WHT/VAT ops | G&A | net assets/spend | V/F | 🟩 | **Statutory — owed even pre-revenue** |
| `C1-QUOTA` Quota-carrying reps | S&M | quota capacity | S | 🟩→🟧 | Protect *productive* capacity; gate *adds* on magic number |
| `A6-SUPPORT-T1` Tier-1 support | CoR | tickets | S/V | 🟧 | Deflect via self-serve first |
| `A8-IMPL` Implementation delivery | CoR | onboardings | V | 🟧 | Fenced <20% rev; push to SI over time |
| `C3-DEMANDGEN` Paid demand gen | S&M | pipeline target | V | 🟥 | First lever to cut in RED; founder-led motion at pre-seed |
| `D5-IT-SAAS` Internal SaaS stack | G&A | headcount | S/V | 🟥 | Sprawl-prone; consolidate aggressively |
| `D6-FACILITIES` Office footprint | G&A | headcount | F/S | 🟧 | Right-size to actual need |
| `A5-AI` AI inference | CoR | claims | V capped | 🟧 | **Hard usage cap required** |

### 6.4 Ranking & the "should it exist" test

Each package faces four sequential questions before it is funded:

1. **Should this activity exist at all?** (If the outcome is not needed this phase → eliminate.)
2. **Must *we* do it, or can it be automated / outsourced / partnered?** (e.g. implementation → SI partners.)
3. **At what service level does the marginal riyal still clear threshold?** (MV vs Target vs Gold.)
4. **Who owns and defends it, and what is its should-cost?** (No owner → no funding.)

---

## 7. Should-cost baselines, benchmarks & cloud FinOps

Zero-based costing replaces *last-cost* with *should-cost*: what each pool **ought** to cost at benchmarked
unit rates and right-sized consumption. All figures below are **📊 benchmarks-to-validate** against Reven's
instrumented actuals — never plugged as fact.

### 7.1 Should-cost reference shelf (📊 — validate before use)

| Pool | Should-cost basis (📊) | Validation source |
|---|---|---|
| Cloud compute/db | Right-sized vCPU/GB at committed-use discount; hosting <5–10% of rev | GCP Riyadh pricing calculator, actual utilization |
| Evidence storage | Tiered (hot→nearline→cold) unit cost × retained GB; model the ratchet | GCP storage tiers; retention policy |
| Support | Loaded cost/ticket net of self-serve deflection | Actual ticket + labor data |
| CS | Loaded CSM cost ÷ accounts served, by tier | Actual CS ratios |
| Implementation | Loaded delivery hr × hours/onboarding; fenced <20% rev | Actual onboarding timesheets |
| KYB/AML | Per-check vendor rate | KYB vendor quote |
| Payout rails (P2) | Per-txn + bps on settled volume | Rail/PSP quote |
| Fully-loaded engineer (KSA) | Base + GOSI + EOSB + medical + tooling + facilities | Salary survey + Part 3 burden |
| Fully-loaded seller (KSA) | Base + variable + burden; test vs CAC payback | Salary survey + pipeline data |

> **Loaded-cost rule:** every labor should-cost is **fully burdened** — base + GOSI/EOSB + medical + levies +
> tooling + facilities allocation — never bare salary. This is the only honest denominator for CAC,
> cost-to-serve, and implementation margin.

### 7.2 Cloud FinOps — the zero-based cloud model

Cloud is the dominant subscription-COGS pool and the single largest driver-based waste surface. The zero-based
cloud discipline (FinOps) has seven standing levers, each an owned, monitored control:

1. **Allocation & tagging** — 100% of cloud spend tagged to tenant/environment/service; no untagged spend.
2. **Right-sizing** — continuous match of instance/DB size to real utilization; kill idle.
3. **Commitment discounts** — CUDs/committed-use for the stable base; on-demand only for burst.
4. **Storage tiering** — the **evidence store grows monotonically**; lifecycle hot→nearline→cold/archive by
   access age is the highest-leverage single control.
5. **Egress control** — architect to minimize cross-region/AZ egress; DR pipelines sized to actual RPO/RTO,
   not gold-plated.
6. **Environment hygiene** — non-prod auto-stop off-hours; ephemeral preview environments torn down on merge.
7. **Unit-cost trending** — track **cost per tenant / per active partner / per claim / per GB** over time; the
   ZBC health signal is *unit cost falling as volume grows* (operating leverage), not absolute spend.

### 7.3 SaaS & tooling sprawl (the G&A attack surface)

Internal SaaS is the classic ZBB target. Standing controls: a single **tool register** with owner + renewal
date + seats + utilization; **auto-renew off by default**; a **new-tool gate** (does an existing tool cover
this?); quarterly **utilization purge** of shelfware; consolidation onto fewer platforms.

---

## 8. Cost governance & operating cadence

ZBC lives or dies on cadence and ownership. This section defines **who owns cost, how it is challenged, and on
what rhythm** — the operating system that makes zero-based permanent.

### 8.1 Roles

| Role | Who | Mandate |
|---|---|---|
| **Cost-council chair** | CFO | Runs the process; arbitrates package ranking; owns the envelope |
| **Package sponsors** | Function owners (CTO, CRO, CS, Security, …) | Build, defend, and own their decision packages |
| **Driver owners (from §5)** | DevOps, Compliance, People, Finance | Own the unit rate & consumption of each driver |
| **FinOps owner** | DevOps lead | Owns the cloud unit-cost trend and the seven levers (§7.2) |
| **Challenger** | A rotating peer sponsor + CFO | Adversarially tests each package ("should this exist? at this level?") |

### 8.2 The zero-based cadence (annual → quarterly → monthly)

| Rhythm | Activity | Ties to |
|---|---|---|
| **Annual — zero-base rebuild** | Every package rebuilt from zero, re-ranked, re-funded to the envelope; should-costs refreshed | Sets the year's cost architecture |
| **Quarterly — challenge & re-rank** | Sponsors defend packages; council re-ranks; RAG re-assessed; levers armed | `Internal_Operating_Cadence_Manual.md` |
| **Monthly — variance vs zero-base** | Actuals vs zero-based plan by package & driver; unit-cost trend; RAG action | **`Monthly_CFO_Review_Manual.md`** (the actuals loop) |
| **Continuous — driver telemetry** | Cloud/support/rails unit costs tracked live; anomalies flagged | Cost-model workbook (§12) |

The monthly leg **is** the existing Monthly CFO Review, now framed against the zero-base: every variance is a
question — *"is this package still justified at this service level, at this unit cost?"* — not just a
red/green tick.

### 8.3 RAG triggers & pre-committed cut levers

Cash-trigger RAG is inherited from the model (`>9 mo green / 6–9 amber / <6 red`). ZBC pre-commits the levers
**before** the trigger fires, so a RED month executes a plan rather than improvising.

| RAG | Runway | Standing posture | Pre-committed levers (in rank order) |
|---|---|---|---|
| 🟢 Green | >9 mo | Fund Target/Gold on accretive packages | Invest in quota capacity & R&D velocity within magic-number/threshold gates |
| 🟧 Amber | 6–9 mo | Hold at Target; freeze new Gold | Pause 🟥 cut-first packages; defer 🟧; freeze discretionary hiring; tighten cloud |
| 🟥 Red | <6 mo | MV service levels only | Execute the deferrability matrix: cut all 🟥, defer all 🟧, protect all 🟩; founder-only survival mode (model's L2 floor scenario) |

### 8.4 The deferrability matrix (protect / defer / cut-first)

Reused and formalized from the model's §7E. This is the **pre-agreed** classification so cuts are never
ad-hoc:

- **🟩 Protect (cut only in extremis, some never):** statutory (GOSI/EOSB/Zakat/VAT/WPS buffer), security &
  compliance posture (SOC 2/ISO/pen-test/PDPL/residency), core R&D velocity, *productive* quota capacity,
  CS that protects NRR/GRR, the WPS one-month payroll buffer.
- **🟧 Defer (slip timing without breaking the business):** non-critical hires, Gold service levels,
  facilities expansion, secondary integrations, discretionary R&D, events.
- **🟥 Cut-first (eliminate on amber/red):** paid demand-gen beyond founder-led motion, tooling/SaaS sprawl,
  travel, premium-tier vendor plans, non-prod over-provisioning, discretionary marketing.

### 8.5 Spend-control policies (standing guardrails)

- **Approval ladder by spend depth** (mirrors the pricing doc's discount-approval logic, applied to cost):
  owner → function head → CFO → CEO/board as amount/commitment rises.
- **Vendor/procurement gate:** every new vendor answers "does an existing tool/vendor cover this?"; contracts
  reviewed for WHT classification (foreign SaaS/AI often royalty 15% — model and withhold).
- **Headcount as master driver:** every hire is a decision package with a *hiring trigger* (pipeline/activation
  threshold), a Saudi/expat classification (Nitaqat, burden), a ramp curve, and a backfill gate on attrition.
- **Cloud budget guardrails:** per-service budgets with alerts; the seven FinOps levers (§7.2) as standing
  controls; unit-cost-down as the KPI.
- **VAT ring-fence:** VAT cash is working capital, **never** co-mingled or treated as revenue (Questionnaire
  rule 5 / M4 treasury policy).

---

## 9. Phase-based cost architecture (Capture → Settle → Orchestrate)

The zero-base **changes shape** across the governing phases. New cost pools switch **on** only at their phase
gate; the challenge questions and protected set shift accordingly. This is the phase-based burn architecture
(model §7C) expressed as a cost operating model.

### 9.1 Phase × cost-category posture

| Category | **Phase 1 — Capture** (M0–9; all pre-seed) | **Phase 2 — Settle** (M9–24) | **Phase 3 — Orchestrate** (M24+) |
|---|---|---|---|
| **CoR** | Base cloud + first tenants; **no rails, no settlement, no payout cost** | Rails/KYB/AML/e-sign/ZATCA/settlement-ops switch **on**; defend the 70% floor as they do | Network/data-serving cost ≈ 100% GM; unit cost falls |
| **R&D** | **High** — build the PRM (registry, claims, attribution, evidence) | High — ledger, rule engine, reconciliation, dispute, compliance engine | Med — forecasting, co-sell, cross-tenant identity |
| **S&M** | Low — **founder-led** motion; no paid scale | Med–high — first reps, magic-number-gated | High — but efficiency-gated; expansion-led (NRR) |
| **G&A** | Med — one-time setup front-loaded (MISA/CR/Iqama/ZATCA init) + statutory | Med — controls, audit (SOC 2), multi-entity finance | Falls sub-linearly — the operating-leverage prize |
| **Protected set** | Runway, statutory, security baseline | + rails reliability, settlement idempotency, audit | + network integrity, data governance |
| **Gate to next** | 100+ real claims · 3–5 finance-accepted design partners · WAU | Idempotent settlement · clean ERP recon · CFO reference trust | — |

### 9.2 Phase 1 = the pre-seed zero-base

**All twelve pre-seed months sit inside Phase 1 — Capture, zero-revenue** (per the Blueprint and the model).
Therefore the Phase-1 zero-base **is** the 2,000,000 SAR allocation, re-expressed as decision packages:

| Pillar (Blueprint) | SAR | ZBC category | Package framing |
|---|---:|---|---|
| Founders & basic cloud | 829,306.25 | G&A (D1) + CoR (A1) | Founder comp packages + cloud base package (the only pre-revenue CoR) |
| Execution team (6 hires) | 926,200.00 | R&D + S&M + CoR (support/CS) | Six hire packages, each with a hiring trigger & ramp |
| Setup & legal (one-time) | 158,083.75 | G&A (D9) | Front-loaded one-time package, Month 1 |
| Emergency buffer | 86,410.00 | (reserve, not a package) | Liquidity floor — never a spend line |
| **Total** | **2,000,000.00** | | **Reconciles exactly (§11)** |

The zero-based lens does not change the *total* (a canonical fact) — it changes the *defense*: each pillar is
now an owned, ranked, service-leveled package with a driver, not an inherited allocation.

---

## 10. Zero-based unit economics & gross-margin architecture

The ZBC exists to **protect the ≥70% blended gross-margin floor and the software multiple.** This section
makes that mechanical.

### 10.1 Contribution-margin waterfall (per cohort/tier)

```
Recognized subscription revenue (by tier)
  − A1–A3 shared platform cost      (driver-allocated: usage share)
  − A4 rails/KYB/e-sign             (per active partner / event / payout — Phase 2+)
  − A5 AI inference                 (capped)
  − A6/A7 support + CS as COGS      (by tier)
  = Subscription contribution       → Subscription GM% (target 80–85%)

Professional-services revenue
  − A8 implementation delivery      (loaded; fenced <20% rev)
  = Services contribution           → Services GM% (near-breakeven acceptable)

Blended GM = (Σ subscription + services contribution) ÷ Σ revenue   → **≥70% hard floor**
```

### 10.2 Gross margin by tier (the mix that defends the blend)

| Tier | Revenue character | Cost-to-serve character | GM posture |
|---|---|---|---|
| **SME (Reven Start, SAR 50/mo)** | Self-serve subscription | **Near-zero human touch** (any human call = breach) | ~100% software GM — a *land* wedge, not a margin source |
| **SMB / Mid-market** | Subscription + fenced implementation | CSM + support + implementation (fenced) | Clears floor; implementation near-breakeven by design |
| **Semi-gov / Large enterprise** | High ACV + residency premium + services | Residency (A3) + services (A8) drag, priced to absorb | Priced to clear floor *including* the drag |
| **Data licensing / add-ons (scale)** | Recurring software / data | ≈ zero marginal | ≈100% GM — pulls the blend **up** |

### 10.3 The "valued-like-software" defense (ZBC's strategic job)

The pricing strategy's fifth pillar — *"protects the margin and the multiple"* — is operationally enforced
here: **fence and separately report** the low-margin, high-variability activities (professional services,
settlement/% take, AI inference) so the **software gross margin the equity story keys off stays clean and
high.** ZBC is the accounting-and-cost discipline that keeps the fences standing:

- Services & settlement are **separate revenue and separate COGS lines** — never netted into subscription GM.
- AI inference is **capped** at the driver level so it cannot silently erode CoR.
- Data/add-on software (≈100% GM) is grown deliberately to lift the blend.
- The settlement/% layer, when it arrives (Phase 2+), is **capped, fenced, and reported separately**, so
  Reven continues to be valued like software rather than like a payments business.

---

## 11. Integration & reconciliation with the finance stack

### 11.1 The map

```
Zero-Based Cost Architecture (THIS DOC — method, taxonomy, drivers, governance)
        │  supplies cost taxonomy, drivers, cost-behavior classes, should-costs
        ▼
Founder Questionnaire ──► 12M Burn/Runway/Cash-Flow Model ──► Monthly CFO Review (actuals loop)
   (inputs, 🟢/📊/🔴)         (projection: bookings→cash,          (monthly variance vs zero-base)
        │                       burn, runway, scenarios)
        ▼
2M SAR Pre-Seed Blueprint (the Phase-1 allocation — a canonical fact)
```

### 11.2 Reconciliation guarantees

- **Round total unchanged.** The Phase-1 zero-base re-expresses, but does not alter, the canonical
  **2,000,000.00 SAR** (pillars 829,306.25 + 926,200.00 + 158,083.75 + 86,410.00 buffer = 2,000,000.00). ✅
- **Gross Burn identity preserved.** The CBS (§4) maps 1:1 onto
  `Gross Burn = Product/R&D + GTM + CS/Implementation + COGS + G&A/Compliance`:
  B→Product/R&D · C→GTM · A6/A7/A8→CS/Implementation · A1–A5→COGS · D→G&A/Compliance. ✅
- **COGS Section H preserved.** A1–A8 map onto H1–H5 (§4.2 note). ✅
- **Cost-behavior classes preserved.** F/V/S reused from model §7D. ✅
- **Deferrability preserved.** Protect/Defer/Cut-first reused from model §7E (§8.4). ✅
- **Currency & statutory consistency.** SAR throughout; USD/SAR 3.75; GOSI/EOSB/Zakat/WHT/VAT per Part 3,
  flagged **verify**. ✅

### 11.3 What this doc adds that the stack did not have

The existing stack answers *"how much will we spend and when will we run out?"* The ZBC adds *"is every riyal
justified from zero, driver-attributed, owner-defended, benchmarked to should-cost, and fenced to protect the
margin?"* — the **methodology, taxonomy, driver tree, decision-package machinery, and governance cadence**
that generate and defend the numbers, plus the **public-SaaS cost geography** that makes them IPO-legible.

---

## 12. The end-to-end build & 30/60/90 stand-up

"End-to-end" means the architecture is not just a document but a **running cost operating system.** Three
artifacts complete the build (this doc is artifact 1):

| # | Artifact | Form | Status |
|---|---|---|---|
| 1 | **This dossier** — method, taxonomy, drivers, packages, governance | `Zero_Based_Cost_Architecture.md` | ✅ built |
| 2 | **Driver-based cost-model workbook** — computes CoR/OpEx & cost-to-serve from zero on editable driver levers; live GM-floor & unit-cost outputs | Spreadsheet (tabs: Drivers · CBS · Cost-to-Serve · Packages · Phase view · GM waterfall · Dashboard) | ⏳ next |
| 3 | **ZBC input & decision-package sheet** — founder/owner fill-in for packages, service levels, should-costs (mirrors the Questionnaire's 🟢/📊/🔴 discipline) | `.md` fill-in sheet | ⏳ next |

### 12.1 Cost-model workbook — design spec (artifact 2)

- **Drivers tab** — editable business-driver levers (# customers by tier, # active partners, # claims, #
  payouts, evidence GB, headcount by role/Saudi-expat, # residency tenants).
- **CBS tab** — the §4 taxonomy with unit rates (should-cost, 📊-flagged) × driver quantities → cost by
  element, rolled to CoR/R&D/S&M/G&A and to the public P&L lines.
- **Cost-to-serve tab** — the §5.3 stack, per tier, with GM% vs the tier and blended floor.
- **Packages tab** — the §6 catalog with MV/Target/Gold service levels and ranking.
- **Phase tab** — the §9 posture, switching rails/settlement pools on at the Phase-2 gate.
- **GM waterfall & Dashboard** — blended GM vs 70% floor, R&D/S&M/G&A %, unit-cost trend, Rule-of-40 shell.
- **Discipline:** every input flagged 🟢 founder / 📊 benchmark / 🔴 required; statutory rates **verify**;
  reconciles to 2,000,000.00 SAR for the Phase-1 base.

### 12.2 30/60/90 to stand up ZBC in the org

- **Days 0–30:** adopt this taxonomy; tag 100% of spend to CBS + driver; instrument cloud/support unit costs;
  name package sponsors & driver owners.
- **Days 31–60:** build the package catalog at MV/Target/Gold; set should-cost baselines; run the first
  quarterly challenge; arm RAG levers.
- **Days 61–90:** wire the monthly variance-vs-zero-base loop into the Monthly CFO Review; publish the
  dashboard; lock the annual zero-base rebuild date.

---

## 13. Assumptions register, confidence flags & validation checklist

**Flag legend** (mirrors the Questionnaire): 🟢 founder input · 📊 benchmark adopted only if explicitly marked
· 🔴 input-required placeholder · **verify** = statutory, confirm before filing.

| # | Assumption / input | Flag | Note |
|---|---|---|---|
| Z1 | ≥70% blended gross-margin floor | 🟢 | From pricing strategy — the binding constraint |
| Z2 | Public-SaaS benchmark envelopes (§3.2) | 📊 | Validate vs Reven actuals; never plug as fact |
| Z3 | Cloud/support/rails unit costs (§7.1) | 📊/🔴 | Quote/instrument before use |
| Z4 | KSA statutory rates (GOSI/EOSB/Zakat/WHT/VAT/levies) | verify | Per Questionnaire Part 3 |
| Z5 | Evidence storage grows monotonically | 🟢 | Model the retention ratchet explicitly |
| Z6 | AI inference hard-capped | 🟢 | Cost-control requirement, not an estimate |
| Z7 | Implementation fenced <20% of revenue | 🟢 | From pricing strategy |
| Z8 | Phase-2 rails/settlement cost = 0 until the Settle gate | 🟢 | Phase discipline |
| Z9 | 2,000,000.00 SAR round & pillars | 🟢 | Canonical — not overridden here |
| Z10 | Capitalization policy (software dev, commissions) | 🔴 | Set with auditor before it moves GM/R&D/S&M |

**Validation checklist (before trusting any ZBC output):**

- [ ] Every cost element has exactly one primary driver and a cost-behavior class.
- [ ] Every decision package has an owner, an outcome, MV/Target/Gold levels, and a deferrability class.
- [ ] Cost-to-serve is built bottom-up from drivers and clears the ≥70% floor by tier and blended.
- [ ] Implementation & support-as-COGS sit in **CoR, not CAC**.
- [ ] Statutory items are **verify**-flagged and never cut below legal minimum.
- [ ] Phase-2 rails/settlement pools are **off** until the Settle gate.
- [ ] The Phase-1 zero-base reconciles to **2,000,000.00 SAR**.
- [ ] Benchmarks are 📊-flagged; nothing invented is presented as fact.

---

## Appendix A — Glossary

- **ZBB / ZBC / ZBO** — Zero-Based Budgeting (forward funding from zero) / Costing (decompose to
  driver + should-cost) / Organization (spans-and-layers rebuild).
- **Decision package** — the ZBB atom: an activity at a service level, with cost, driver, owner, alternatives,
  and rank.
- **Cost Breakdown Structure (CBS)** — the four-level cost taxonomy (§4).
- **Cost driver** — the countable unit that scales a cost (§5).
- **Should-cost** — benchmarked/right-sized target cost, vs *last-cost* (prior actual).
- **Cost-to-serve** — bottom-up cost of serving one customer/unit (§5.3).
- **FinOps** — cloud financial operations; the seven levers (§7.2).
- **Cost of Revenue (CoR/COGS)** — cost to deliver the service; the gross-margin denominator.
- **Gross margin (GM)** — (Revenue − CoR) ÷ Revenue; **≥70% blended floor**.
- **Rule of 40** — growth% + FCF-margin% ≥ 40.
- **CAC payback / Magic number** — S&M efficiency: months to recover CAC / net-new ARR per S&M riyal.
- **NRR / GRR** — net / gross revenue retention.
- **SBC** — share-based compensation (non-cash cost, disclosed).
- **Capitalized commissions** — incremental acquisition cost capitalized & amortized (IFRS 15 / ASC 606).
- **Capitalized software** — qualifying dev cost capitalized & amortized to CoR (IAS 38 / ASC 350-40).
- **Deferrability matrix** — pre-agreed Protect / Defer / Cut-first classification (§8.4).
- **RAG** — runway red/amber/green trigger (>9 / 6–9 / <6 months).

## Appendix B — Formula reference

```
Gross Burn        = Product/R&D + GTM + CS/Implementation + COGS + G&A/Compliance   (model §7A)
Cost of an element = unit rate (should-cost) × driver quantity
Cost-to-serve      = Σ driver-allocated cost (see §5.3)
Contribution       = Recognized revenue − cost-to-serve
Gross margin       = Contribution ÷ Recognized revenue            (≥70% blended floor)
Subscription GM    = Subscription contribution ÷ Subscription revenue
Fully-loaded labor = Base + GOSI + EOSB + medical + levies + tooling + facilities allocation
Rule of 40         = Revenue-growth% + FCF-margin%
CAC payback (mo)   = CAC ÷ (new-cohort ARR × gross margin) × 12
Magic number       = Net-new ARR (quarter, annualized) ÷ prior-quarter S&M spend
Unit-cost trend    = cost per {tenant | active partner | claim | payout | GB} over time  (should fall)
```

## Appendix C — Driver dictionary

| Driver | Definition | Feeds cost elements |
|---|---|---|
| # customers (by tier) | Paying logos, tiered | shared platform, support, CS |
| # active (transacting) partners | The pricing metric | KYB, compute, storage |
| # claims / revenue events | Core throughput | inference, compute, storage |
| # payouts / settled volume | **Phase-2 only** | payout rails, reconciliation |
| evidence GB retained | Monotonic store | object storage, backup, DR |
| # entities / countries | Multi-entity/geo | residency, compliance, finance ops |
| # residency (L2) tenants | Sovereignty tier | residency premium, dedicated tenancy |
| headcount (Saudi/expat) | Master cost driver | comp, GOSI/EOSB, levies, medical, tooling, facilities |
| ticket volume | Support demand | support labor & tooling |
| # onboardings × config hrs | Delivery load | implementation (fenced <20% rev) |
| roadmap scope | R&D demand | engineering, product, design |
| # reps × quota capacity | Sales capacity | quota comp, SE |
| pipeline-coverage target | Demand-gen demand | marketing spend |
| net assets / turnover / foreign spend | Tax base | Zakat/CIT/WHT/VAT ops |

---

*Source: authored as the canonical cost-methodology reference for Partner Revenue OS (Reven). Reconciled
against `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`,
`Pre_Seed_12M_Model_Founder_Questionnaire.md`, `Monthly_CFO_Review_Manual.md`, and
`Reven_Pricing_Executive_Summary.md`. All non-canonical figures are 📊 benchmarks-to-validate or 🔴
input-required; statutory items are flagged **verify**. This file is the canonical cost-methodology reference;
supersede only with an explicitly dated revision.*
