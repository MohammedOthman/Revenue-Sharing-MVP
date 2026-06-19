# Partner Revenue OS — Pre-Seed Financial Model Blueprint (2,000,000 SAR)

> **Status: Canonical, board-ready fact.** This document is the single source of truth for the
> Partner Revenue OS pre-seed ask and its use-of-funds allocation. Every figure below has been
> internally reconciled — all pillar subtotals and line items sum exactly to **2,000,000.00 SAR**
> (see [§6 Reconciliation & Verification](#6-reconciliation--verification)).

---

## 1. The Ask (Round Headline)

| Term | Value |
| --- | --- |
| **Amount raised** | **2,000,000.00 SAR** |
| **Equity offered** | **10%** |
| **Implied post-money valuation** | **20,000,000.00 SAR** (2,000,000 ÷ 10%) |
| **Implied pre-money valuation** | **18,000,000.00 SAR** (20,000,000 − 2,000,000) |
| **Round stage** | Pre-seed |
| **Modeling scenario** | 12-month, **zero-revenue** runway |
| **Team expansion** | Execution team (6 hires) activates in **Month 2** |
| **Currency** | SAR (Saudi Riyal) |

This blueprint models the full first-year capital commitment under a deliberately conservative
**zero-revenue** assumption: the round is sized so the company survives all 12 months on cash
alone, with a buffer left in the bank, before any revenue is counted.

> **Phase concordance.** All twelve modeled months sit inside **Product Phase 1 — Capture (the PRM)**.
> No payout execution, settlement automation, or money movement is in scope for this period (those are
> Phase 2 Settle, post-gate). See `README.md` and `ROADMAP_ALIGNMENT_AUDIT.md` §2.

---

## 2. Master Allocation Ledger

| # | Category | Description | Cost (SAR) | Share |
| --- | --- | --- | ---: | ---: |
| 1 | **Official Setup & Legal Fees** | Visas, business licenses, office rent, insurance (Month 1) | 158,083.75 | 7.90% |
| 2 | **Founders & Basic Cloud Costs** | 12 months of pay for 4 founders + main servers | 829,306.25 | 41.47% |
| 3 | **The Execution Team** | 11 months of pay for 6 new hires (start Month 2) | 926,200.00 | 46.31% |
| 4 | **Emergency Cash Buffer** | Back-up cash held in bank for unexpected costs | 86,410.00 | 4.32% |
| — | **TOTAL PRE-SEED ROUND** | **Complete first-year capital commitment** | **2,000,000.00** | **100.00%** |

**Read in one line:** ~88% of the round goes to **people** (founders + execution team), ~8% to
**one-time legal/setup**, ~4% held as **emergency buffer**.

---

## 3. Detailed Operational Itemization

### Pillar 1 — Official Setup & Legal Fees (Month 1 baseline)
**Total: 158,083.75 SAR** — one-time, front-loaded into Month 1.

| Line item | Cost (SAR) | What it covers |
| --- | ---: | --- |
| Government Licenses (MISA & MOC setup) | 17,800.00 | Investor licenses, Commercial Registration main fee, official translations |
| Team Visas (Sponsorships & Iqamas) | 93,498.75 | Naql Kafala, legal Iqama cards, required medical screenings |
| Government Portals (annual subscriptions) | 4,665.00 | Enterprise access tokens on Qiwa, Muqeem, and Mudad |
| Compliance & Security (local mandates) | 4,200.00 | SDAIA data-controller registration, CST secure-domain setup, sandbox billing-gateway tokens |
| Office & Utilities (workspace contract) | 17,920.00 | Riyadh office footprint, Ejar lease deposit, Baladiya municipal validation |
| Company Basics (financial & insurance) | 20,000.00 | ZATCA Phase 2 ERP corporate-platform initialization, upfront CCHI medical-insurance premiums |
| **Subtotal** | **158,083.75** | |

### Pillar 2 — Founders & Basic Cloud Costs (12-month baseline)
**Total: 829,306.25 SAR** — spread evenly across Months 1–12.

| Line item | Cost (SAR) | What it covers |
| --- | ---: | --- |
| Core Founder Payroll (base compensation) | 715,000.00 | Flat salary for CEO, CTO, CRO, COO over 12 months |
| Regulatory Labor Burden (GOSI & levies) | 58,506.25 | Mandatory Saudi GOSI employer contributions, expat occupational-hazard funds, worker fees |
| Cloud Infrastructure (production environment) | 55,800.00 | Main cloud DB node, VPC networks, regional DR pipelines, SSO middleware — Google Cloud Riyadh |
| **Subtotal** | **829,306.25** | |

### Pillar 3 — The Execution Team (Months 2–12 / 11-month sub-allocation)
**Total: 926,200.00 SAR** — 6 hires, each starting Month 2, paid a flat monthly rate for 11 months.

| Role | Monthly (SAR) | × 11 mo (SAR) | Mandate |
| --- | ---: | ---: | --- |
| Technical Solutions Architect | 19,160.00 | 210,760.00 | Lead enterprise deployment architecture |
| Lead Cloud DevOps Engineer | 17,120.00 | 188,320.00 | Automate tenant schema isolation and VPC provisioning |
| Backend Integration Engineer | 15,715.00 | 172,865.00 | Design and supervise live CRM API sync channels |
| Inside Sales Executive | 13,040.00 | 143,440.00 | Accelerate mid-market conversion speed |
| Customer Success Manager | 11,225.00 | 123,475.00 | Oversee onboarding loops, maximize retention metrics |
| Technical Support Specialist | 7,940.00 | 87,340.00 | Absorb and resolve incoming ticket streams from self-service |
| **Subtotal** | **84,200.00** | **926,200.00** | |

### Pillar 4 — Emergency Cash Buffer
**Total: 86,410.00 SAR** — back-up cash retained in the bank for unexpected costs; **not** allocated to
any line item. This is the liquidity that remains after all planned Pillar 1–3 outlays.

---

## 4. Headcount Summary

| Group | Count | Compensation window | Pillar |
| --- | ---: | --- | --- |
| Founders (CEO, CTO, CRO, COO) | 4 | Months 1–12 (12 mo) | 2 |
| Execution team (6 hires) | 6 | Months 2–12 (11 mo) | 3 |
| **Total headcount by Month 2** | **10** | | |

---

## 5. Derived Monthly Burn Profile

All Pillar 1–3 spend (**1,913,590.00 SAR**) deployed over 12 months, leaving the **86,410.00 SAR**
buffer untouched at Month 12. *(Illustrative timing: Pillar 1 is a one-time Month-1 cost; Pillar 2 is
spread evenly across 12 months; Pillar 3 begins in Month 2.)*

| Period | Pillar 1 | Pillar 2 (≈/mo) | Pillar 3 (/mo) | Monthly outlay |
| --- | ---: | ---: | ---: | ---: |
| Month 1 | 158,083.75 | 69,108.85 | — | **227,192.60** |
| Months 2–12 (each) | — | 69,108.85 | 84,200.00 | **153,308.85** |
| **12-month average burn** | | | | **≈ 159,465.83** |

- **Planned cash deployed (Pillars 1–3):** 1,913,590.00 SAR
- **Buffer remaining at Month 12 (Pillar 4):** 86,410.00 SAR
- **Funded runway:** the full 12-month zero-revenue period, with 4.32% of the round still in the bank.

---

## 6. Reconciliation & Verification

Every subtotal sums exactly to the round size — no rounding drift, no unallocated remainder.

**Pillar 1 line items → 158,083.75**
`17,800.00 + 93,498.75 + 4,665.00 + 4,200.00 + 17,920.00 + 20,000.00 = 158,083.75` ✅

**Pillar 2 line items → 829,306.25**
`715,000.00 + 58,506.25 + 55,800.00 = 829,306.25` ✅

**Pillar 3 line items → 926,200.00**
`210,760.00 + 188,320.00 + 172,865.00 + 143,440.00 + 123,475.00 + 87,340.00 = 926,200.00`
(monthly `19,160 + 17,120 + 15,715 + 13,040 + 11,225 + 7,940 = 84,200` × 11 = 926,200.00) ✅

**Consolidated outlays (Pillars 1–3) → 1,913,590.00**
`158,083.75 + 829,306.25 + 926,200.00 = 1,913,590.00` ✅

**Total round → 2,000,000.00**
`1,913,590.00 (outlays) + 86,410.00 (buffer) = 2,000,000.00` ✅

**Allocation shares → 100.00%**
`7.90% + 41.47% + 46.31% + 4.32% = 100.00%` ✅

---

## 7. Reconciliation Metrics (headline)

| Metric | Value (SAR) |
| --- | ---: |
| Total Consolidated Capital Outlays (Pillars 1–3) | 1,913,590.00 |
| Remaining Bank Liquidity (Pillar 4 buffer) | 86,410.00 |
| **Total Balanced Pre-Seed Capital Acquisition** | **2,000,000.00** |

---

## 8. Assumptions & Notes

- **Zero-revenue scenario.** No revenue, billings, or collections are modeled in the 12-month window;
  the round is sized to survive on cash alone. (Consistent with `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`,
  which treats all twelve months as Phase 1 — Capture, pre-monetization gate.)
- **Flat compensation.** Founder and hire salaries are modeled as flat monthly figures (no raises,
  bonuses, or equity-vesting cash events in the window).
- **Month-1 front-loading.** All Pillar 1 setup/legal costs land in Month 1; the execution team
  starts in Month 2 (hence 11, not 12, months of Pillar 3 pay).
- **KSA-specific line items** (MISA/MOC, Iqama/Naql Kafala, Qiwa/Muqeem/Mudad, SDAIA, CST, Ejar,
  Baladiya, ZATCA Phase 2, GOSI, CCHI) are statutory/regulatory in nature — verify current rates and
  fees before filing.
- **Cloud region:** Google Cloud Riyadh (data residency aligned to KSA).
- **Buffer discipline.** The 86,410.00 SAR buffer is reserve liquidity, not a spend line; if drawn,
  it shortens runway accordingly.

---

*Source: founder-provided pre-seed budget allocation. Figures recorded here verbatim and reconciled.
This file is the canonical reference; supersede only with an explicitly dated revision.*
