# Reven — Zero-Based Cost Input & Decision-Package Sheet
## Fill-in companion to `Zero_Based_Cost_Architecture.md` and `Zero_Based_Cost_Model.xlsx`

> Answer the 🟢 cells. Each answer feeds the cost model and turns an inherited line into an owned,
> justified one. Every row carries a plain rationale — the reason the line exists. If a line has no
> rationale you can state in one sentence, it should not be funded. That is the whole method.

Companion to the [Founder Questionnaire](Pre_Seed_12M_Model_Founder_Questionnaire.md), which sizes the
burn. This sheet governs the *cost* side: who owns each cost, what drives it, and what it should be.

---

## How to use this sheet

1. Fill the **🟢 answer** cells. A blank becomes a visible **🔴 [INPUT REQUIRED]** and the model still
   runs around it.
2. The **rationale** column is not optional decoration. It is the justification the owner defends at the
   quarterly challenge. Write it in plain words.
3. Flags: **🟢** your input · **📊** a benchmark you adopt only if you mark `ADOPT` · **🔴** unanswered ·
   **verify** = statutory, confirm before filing.
4. Currency is **SAR**; convert USD at the peg ~3.75. Keep bookings, billings, revenue, and cash distinct
   (see the Questionnaire). VAT is working capital, never revenue.
5. Nothing here overrides a canonical fact. The 2,000,000 SAR round stays as recorded.

---

## A. Cost owners and the cost council

Every cost needs one accountable owner who defends it. Name them before the first challenge.

| Role | 🟢 Name | Rationale (why this role exists) |
|---|---|---|
| Cost-council chair | | Runs the zero-based process and arbitrates package ranking; owns the envelope. |
| CoR / infrastructure owner | | Owns cloud unit cost and the FinOps levers; the largest variable cost pool. |
| R&D owner | | Defends engineering spend against roadmap outcomes; protects build velocity. |
| S&M owner | | Owns sales capacity and demand-gen efficiency; gates adds on the magic number. |
| G&A / finance owner | | Owns statutory, tax, tooling, and facilities; the biggest waste-attack surface. |
| FinOps owner | | Owns the cloud unit-cost trend; the health signal is unit cost falling as volume grows. |

---

## B. Business-driver inputs (feeds the model's Drivers tab)

These are the volumes every downstream cost scales from. Answer them first.

| # | Driver | 🟢 Answer | Unit | Rationale (what it drives) |
|---|---|---|---|---|
| B1 | Product phase (1 / 2 / 3) | | phase | Gates rails and settlement cost; none of it exists before the Settle gate. |
| B2 | Customers by tier (SME/SMB/Mid/Semi-gov/Large) | | count | The logo base; each tier has a different cost-to-serve and margin. |
| B3 | Avg active partners per customer, by tier | | partners | Active partners is the pricing metric and the main cost driver. |
| B4 | Claims / revenue events per active partner / month | | events | The variable throughput behind inference, storage, and compute. |
| B5 | Payouts per active partner / month | | payouts | Money-movement cost; zero until Phase 2. |
| B6 | Evidence storage retained | | GB | Grows every period; the storage bill ratchets up without tiering. |
| B7 | Residency (L2) tenants | | tenants | Each in-Kingdom tenant carries a fixed premium — the GCC wedge. |
| B8 | Support tickets per non-SME customer / month | | tickets | Human support is real COGS; SME must stay self-serve. |
| B9 | Onboardings / month | | onboardings | Drives implementation cost, fenced from subscription margin. |

---

## C. Should-cost / rate inputs (feeds the model's Rates tab)

Set each rate to what it *should* cost — a quote or instrumented actual, not last year's number.
Everything here is **📊 benchmark-to-validate** until you replace it with your own data.

| # | Rate | 🟢 Answer | Unit | Rationale (basis) |
|---|---|---|---|---|
| C1 | Cloud base per customer / month | | SAR | The always-on footprint each tenant needs at zero activity. |
| C2 | Cloud per active partner / month | | SAR | Compute/storage scales with partners — the dominant variable cost. |
| C3 | Compute + inference per claim (capped) | | SAR | Per-claim processing and AI; capped so it can't erode margin. |
| C4 | Object storage per GB / month | | SAR | Unit cost of the monotonic evidence store; tier it hot→cold. |
| C5 | KYB/AML per active partner | | SAR | One-time verification per partner; a compliance must. |
| C6 | e-signature per document | | SAR | Third-party rail cost to execute claims and contracts. |
| C7 | Payout rail per payout (Phase 2) | | SAR | Per-payout cost of moving money; add basis points on volume. |
| C8 | Security & compliance runtime / month | | SAR | WAF/SIEM/audit baseline; cutting it fails the enterprise sale. |
| C9 | Residency premium per L2 tenant / month | | SAR | Incremental cost of in-Kingdom / dedicated tenancy. |
| C10 | Support loaded cost per ticket | | SAR | Fully burdened; deflection via self-serve is what shrinks it. |
| C11 | CS loaded cost per account / month, by tier | | SAR | Retention labor; SME is zero because it is self-serve. |
| C12 | Implementation fee and loaded cost per onboarding | | SAR | Services revenue and its COGS; fenced below 20% of revenue. |
| C13 | Subscription ACV per customer / year, by tier | | SAR | The price that, against cost-to-serve, must clear the 70% floor. |
| C14 | Blended statutory burden % (GOSI+EOSB+medical+levy) | | % | **verify** — uplift on base pay; law, not a company choice. |
| C15 | Fully-loaded cost per head, by function | | SAR | Base plus burden plus tooling plus facilities; the only honest labor cost. |

---

## D. Decision-package catalog

The package is the unit of funding. Copy the template per activity. Cost it at three service levels so
the funding call is about *level*, not just yes/no. Rank packages, then fund down the ranked list to the
envelope.

**Template**

| Field | 🟢 Answer |
|---|---|
| Package ID / name | |
| Owner (sponsor) | |
| Outcome (what result it buys) | |
| Primary driver | |
| Cost behavior (fixed / variable / step) | |
| Minimum-viable cost / month | |
| Target cost / month | |
| Gold cost / month | |
| Deferrability (Protect / Defer / Cut-first) | |
| Should-cost basis | |
| Public P&L line (CoR / R&D / S&M / G&A) | |
| Rank within category | |

**Worked example**

| Field | Answer |
|---|---|
| Package ID / name | A6-SUPPORT-T1 — Tier-1 customer support |
| Owner (sponsor) | Head of Support |
| Outcome | First response < 4h, CSAT > 90%, on the ticket load self-serve does not absorb |
| Primary driver | Ticket volume (non-SME customers × tickets each) |
| Cost behavior | Step / variable |
| Minimum-viable / Target / Gold | 3,000 / 4,455 / 7,000 SAR per month |
| Deferrability | Defer — buy up only after self-serve deflection is exhausted |
| Should-cost basis | Loaded cost per ticket × residual ticket volume |
| Public P&L line | Cost of Revenue (support-as-COGS) |
| Rank | Funded at MV before any Gold package elsewhere |

**Your catalog** (one row per package; the rationale is the outcome the money buys)

| Package | Owner | Cat | Deferrability | Target/mo (SAR) | Rationale (why funded) |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## E. Governance cadence and RAG levers

The cost architecture only works if it runs on a rhythm and the cuts are pre-agreed.

| # | Item | 🟢 Answer | Rationale (why it matters) |
|---|---|---|---|
| E1 | Annual zero-base rebuild date | | Every package rebuilt from zero once a year, so nothing coasts on history. |
| E2 | Quarterly challenge dates | | Sponsors defend packages and the council re-ranks; catches drift early. |
| E3 | Monthly variance-vs-zero-base owner | | Ties into the Monthly CFO Review; every variance is a re-justification question. |
| E4 | RAG thresholds (green/amber/red) | | Pre-set triggers turn a cash scare into a plan, not an improvisation. |
| E5 | Pre-committed cut levers, in rank order | | Decide what gets cut *before* red, so red executes cleanly. |
| E6 | Protected set (never cut) | | Statutory, security, core R&D, productive quota capacity, WPS payroll buffer. |
| E7 | New-vendor / new-tool gate | | "Does an existing tool cover this?" — the control on SaaS sprawl. |

Reference RAG bands (📊, adopt or override): green > 9 months runway, amber 6–9, red < 6.

---

## F. Capitalization and accounting policy

These policy choices move gross margin, R&D%, and S&M% before a single riyal changes. Set them with the
auditor early.

| # | Policy | 🟢 Answer | Rationale (why it matters) |
|---|---|---|---|
| F1 | Software-development capitalization (IAS 38) | | Capitalized dev amortizes into CoR, not R&D — it shifts reported gross margin. |
| F2 | Commission capitalization (IFRS 15) | | Capitalized commissions smooth S&M over the customer life once a sales motion exists. |
| F3 | Share-based comp treatment | | Non-cash but real dilution; tracked apart so cash burn and reported cost never merge. |
| F4 | WHT classification of foreign SaaS/AI vendors | | **verify** — often royalty 15% in KSA (disputed); model at 15% and withhold. |

---

## G. Validation checklist

- [ ] Every cost owner in section A is named.
- [ ] B1–B9 drivers answered or left 🔴 (never guessed).
- [ ] Every rate in C is a quote or instrumented actual, not last year's figure.
- [ ] Every package has an owner, an outcome, three service levels, and a deferrability class.
- [ ] Statutory items are verify-flagged and never cut below the legal minimum.
- [ ] Cost-to-serve clears the ≥70% blended floor by tier and blended (check the model's Dashboard).
- [ ] Implementation and support sit in Cost of Revenue, not CAC.
- [ ] The Phase-1 zero-base still reconciles to 2,000,000.00 SAR (model's Recon tab).

> Return this sheet filled or partial, and the model rebuilds the cost architecture from your answers —
> cost by driver, cost-to-serve by tier, gross margin against the floor, and the phase-shifted zero-base,
> with every figure flagged 🟢 / 📊 / 🔴.
