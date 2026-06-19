# Revenue-Sharing-MVP

**Product:** Partner Revenue OS (commercial brand: **Reven**)
**Strategy in one sentence:** Enter the market as a **claim-centric PRM**, earn the right to become the **bilateral revenue-sharing system of record**, and expand — over gated phases — into **Revenue-Sharing Infrastructure for B2B entities**.

## The governing phase model

All documents in this repository conform to this sequencing. Where a document uses different phase names (MVP/V1/V2/V3, Wedge/Repeatable/Platform, Foundation/Pilot/Activation), see the concordance table in [`ROADMAP_ALIGNMENT_AUDIT.md`](ROADMAP_ALIGNMENT_AUDIT.md) §2.

| Phase | Name | Timeline | What it is | Finance boundary |
|---|---|---|---|---|
| 1 | **Capture** — the PRM | ~Months 0–9 | Partner registry, deal/claim registration, attribution, protection windows, payout-**readiness preview**, compliance **capture stubs** | **No money movement. No settlement automation. Calculate, track, and prepare only.** |
| 2 | **Settle** — revenue system-of-record | ~Months 9–24 | Rule engine, append-only ledger, bilateral reconciliation, dispute workflow, compliance engine, ERP/billing integration | Settlement/disbursement built **last** in the phase, or **partnered to a rail**. Ledger-of-record before money movement. |
| 3 | **Orchestrate** — partnership network | Months 24+ | Partner P&L, forecasting, co-sell, multi-company network on cross-tenant identity | Basis points on settled flow. MoR/PayFac/money-transmitter = a separate explicit later decision. |

**Positioning rule:** the entry product is sold and experienced as an easy, claim-centric **PRM** — never a generic PRM, and **never a fintech in Phase 1**. "Control layer" / "revenue OS" language describes the architecture underneath, not the Phase-1 go-to-market.

**Phase discipline:** no Phase-2 capability ships before the Phase-1 exit gate (100+ real claims, 3–5 design partners with finance-accepted evidence packs, weekly active usage); no money moves before the Phase-2 settlement gate (idempotent settlement, clean ERP reconciliation, CFO reference trust).

## Repository guide

| Area | Documents |
|---|---|
| **Canonical strategy & phasing** | `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` (source of truth), `Partner_Revenue_OS_Master_Strategy_Dossier.md`, `Reverse_Engineered_Strategy_Deep_Dive_Companion.md` |
| **Product requirements** | `Partner_Revenue_OS_PDR.md`, `partner-revenue-os-PDR-v5.md` |
| **Pricing & commercial** | `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`, `Partner_Revenue_OS_Pricing_Strategy_Red_Team.md`, `Reven_Pricing_Architecture_Deep_Research.md` |
| **Operating manuals** | `GTM_Operating_Manual.md`, `Internal_Operating_Cadence_Manual.md`, `Monthly_CFO_Review_Manual.md`, `Large_Enterprise_Client_Onboarding_Manual.md`, `Integration_Layer_and_API_Data_Flows_Manual.md` |
| **Narrative & finance model** | `Partner_Revenue_OS_Venture_Scale_Narrative.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, [`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`](Pre_Seed_2M_SAR_Financial_Model_Blueprint.md) — the canonical 2,000,000 SAR pre-seed ask & use-of-funds (10% equity, 12-month zero-revenue) |
| **Pitch deck** | `Reven_Pitch_Deck.pdf` — the definitive investor pitch deck |
| **Audit & alignment** | [`ROADMAP_ALIGNMENT_AUDIT.md`](ROADMAP_ALIGNMENT_AUDIT.md) — doc-by-doc verification against the phase model, with the outstanding edit checklist |
