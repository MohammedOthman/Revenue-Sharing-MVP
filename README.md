# Reven — Partner Revenue OS

**A PRM first. Revenue-sharing infrastructure for B2B entities later — in gated phases.**

This repository is the strategy corpus for Partner Revenue OS ("Reven"). This README is the
**canonical statement of positioning and phasing**. Every other document in this repo must be read
against it; where any document's wording appears to conflict with this page, this page governs.

---

## 1. What the product is (and is not) today

**Phase 1 (current focus) is a Partner Relationship Management (PRM) product** — a B2B SaaS
workflow tool: partner registry and onboarding, deal/claim registration, partner tracking,
attribution of record, protection windows, commission/payout-eligibility **calculation and
reporting**, evidence and audit trail, executive visibility.

Two positioning rules that hold simultaneously (this is deliberate, not a contradiction):

1. **The product surface is PRM.** The buyer adopts it as an easy, concrete partner-management
   tool. "Manage the PRM first" is the entry strategy.
2. **The marketing category is not "a generic PRM."** We never sell "a better PRM" (a
   commoditized, weakly-adopted category). We sell the *Partner Revenue Control Layer* — a
   claim-centric PRM whose data model (Revenue Claim + cross-tenant partner identity) is the
   substrate for the later phases. See the Master Strategy Dossier, Part II.

**The company is NOT a fintech today.** In the current phase the product does **not**:

- execute payments or payouts of any kind;
- move, hold, custody, or escrow funds (no FBO accounts, no float);
- perform settlement execution or act as merchant-of-record / PayFac;
- engage in any activity requiring a money-transmission, PSP, or SAMA payments licence.

What it **does** do with money in Phase 1 is *informational only*: calculate what is owed,
explain eligibility, and export evidence/statements for the customer's own finance systems to act
on. Calculation, never execution.

---

## 2. The canonical phase model

| Canonical phase | Name | Indicative timing | Product scope | Money posture |
|---|---|---|---|---|
| **Phase 1 — PRM** | **Capture** | ~Months 0–9 (MVP → V1) | Claim-centric PRM: registry, deal/claim registration, attribution of record, protection windows, payout-eligibility *preview*, CRM link, evidence + audit log, GCC compliance *capture fields* (stubs only) | **No money movement.** SaaS subscription pricing only (per active partner). |
| **Phase 2 — Revenue-sharing system of record** | **Settle** | ~Months 9–24 (V2) | Bilateral revenue-share ledger: agreement→rule engine, append-only ledger, reconciliation + dispute workflow, finance evidence packs, ZATCA/WHT/VAT computation, billing/ERP integration, **approved-payout export** (customer's systems pay) | **Ledger-of-record WITHOUT moving money.** Payments still execute in the customer's systems. Thin per-payout/module fees may be added late in phase. |
| **Phase 3 — Revenue control & orchestration** | **Orchestrate** | Months 24+ (V3) | Partner P&L/ROI, forecasting, incentive simulation, multi-touch attribution, partner network on cross-tenant identity; **payout execution via PSP/open-banking rails** (or rail partner) | **Money movement only here**, and only after an explicit **regulatory/licensing review gate** (PayFac/MTL/SAMA analysis). bps-on-flow pricing only at this stage. |

**Hard gate:** nothing from a later phase is built or sold before the prior phase's exit criteria
are met (see the PDR §19 release plan and the Dossier Part IV exit gates). Any feature that
touches actual funds is additionally gated behind a documented legal/licensing review — this gate
applies regardless of phase timing.

---

## 3. Phase-vocabulary cross-walk

Different documents in this repo were written at different times and use different phase
vocabularies. They all map to the same three canonical phases:

| Document(s) | Its vocabulary | Maps to canonical phases |
|---|---|---|
| `Partner_Revenue_OS_PDR.md`, `partner-revenue-os-PDR-v5.md`, `Partner_Revenue_OS_End_to_End_Business_Workflow.pdf`, `Integration_Layer_and_API_Data_Flows_Manual.md` | **MVP → V1 → V2 → V3** | MVP+V1 = Phase 1 · V2 = Phase 2 · V3 = Phase 3 |
| `Partner_Revenue_OS_Master_Strategy_Dossier.md`, `Reverse_Engineered_Strategy_*.md` | **Capture → Settle → Orchestrate** | Direct 1:1 with Phases 1–3 |
| `Partner_Revenue_OS_Venture_Scale_Narrative.md` | **Stage 1–5** (Wedge → Repeatable → Platform → Category → Outcome) | Stages 1–2 = Phase 1 · Stage 3 = Phase 2 · Stages 4–5 = Phase 3 |
| `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`, `Reven_Pricing_Architecture_Deep_Research.md` | **Phase 0–3** (Design partners → Capture → Settle → Orchestrate); 5-stage monetization ladder | Phase 0+1 = Phase 1 · Phase 2 = Phase 2 · Phase 3 = Phase 3 (stage 1 ↔ Ph1, stage 2 ↔ Ph2, stages 3–5 ↔ Ph3) |
| `GTM_Operating_Manual.md`, `Internal_Operating_Cadence_Manual.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` | **Execution timeline** (Foundation → Pilot → Activation → Commercial Hardening, M1–18; 29 GTM stages) | The entire 18-month execution plan operates **inside Phase 1** (and prepares Phase 2). It is a company timeline, not a product roadmap. |
| `Large_Enterprise_Client_Onboarding_Manual.md` | "Phases 1–25" | These are **customer-journey steps**, not product phases. All 25 occur within whatever product phase is current. |
| `Monthly_CFO_Review_Manual.md` | "Pre-seed" / "MVP" | Pre-seed = Phase 1. |
| Market Analysis PDFs (01–03) | **Horizons: Now / 6–18mo / 18mo+** | Now = Phase 1 · 6–18mo = Phase 2 · 18mo+ = Phase 3. Settlement-rail drivers (G4, J133) are 18mo+ = Phase 3 only. |

---

## 4. Repository index

**Product definition**
- `Partner_Revenue_OS_PDR.md` — full PDR (capability layers, journeys, FRs, ADRs, release plan)
- `partner-revenue-os-PDR-v5.md` — PDR v5 (current canonical product definition)
- `Partner_Revenue_OS_End_to_End_Business_Workflow.pdf` — end-to-end workflow by phase

**Strategy**
- `Partner_Revenue_OS_Master_Strategy_Dossier.md` — consolidated strategy (supersedes the two below)
- `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` — PRM wedge → revenue-sharing moat → orchestration
- `Reverse_Engineered_Strategy_Deep_Dive_Companion.md` — eight verified research tracks
- `Partner_Revenue_OS_Venture_Scale_Narrative.md` — investor narrative *(carries two known stale stats — see audit §F6)*

**Pricing & commercial**
- `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` · `Partner_Revenue_OS_Pricing_Strategy_Red_Team.md` · `Reven_Pricing_Architecture_Deep_Research.md`

**GTM & operations**
- `GTM_Operating_Manual.md` · `Internal_Operating_Cadence_Manual.md` · `Large_Enterprise_Client_Onboarding_Manual.md` · `Integration_Layer_and_API_Data_Flows_Manual.md` · `Monthly_CFO_Review_Manual.md` · `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`

**Market analysis**
- `Market Analysis - Growth Drivers & Market Forces 01–03` (PDFs)

**Governance**
- `Roadmap_Audit_PRM_First_Alignment.md` — full audit of this corpus against the PRM-first /
  no-finance-now / phased-expansion strategy (June 2026)
