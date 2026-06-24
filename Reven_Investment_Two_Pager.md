# Reven (Partner Revenue OS) — Investment Two-Pager

*Pre-seed · Confidential · Prepared 2026-06-24 · All figures sourced from the company's own repository; nothing added or estimated beyond what the documents state. Currency: SAR (USD shown at the SAR peg of ~3.75 used in the company's own model).*

---

## PAGE 1 — COMPANY

### Executive summary
**Reven** (product/legal name **Partner Revenue OS**) is an early-stage **B2B revenue-sharing software** company. Its one-line positioning is *"the operating system for shared revenue."* The thesis: when two companies do business together through partners, resellers, affiliates or co-sell, **nobody owns the neutral, audit-clean record of who earned what, whether it's eligible, and how it gets reconciled and paid.** Reven aims to be that record.

The product is sequenced in three gated phases (the company's governing model):

| Phase | Name | What it is | Status |
|---|---|---|---|
| 1 | **Capture** (~mo 0–9) | A claim-centric PRM: partner registry, deal/claim registration, attribution, payout-**readiness** (no money movement) | Target / not yet built to spec |
| 2 | **Settle** (~mo 9–24) | The moat: a bilateral revenue **system-of-record** — rule engine, append-only ledger, reconciliation, dispute workflow, ZATCA/WHT compliance | Not started |
| 3 | **Orchestrate** (mo 24+) | A multi-company partnership network monetized on settled flow (bps) | Vision only |

The atomic object is the **Partner Revenue Claim**; the key early architectural primitive is **cross-tenant partner identity**. The intended beachhead is **GCC / Saudi Arabia regulated B2B**, where Saudi-specific compliance (ZATCA e-invoicing, withholding tax, Sharia-aligned revenue structures) is positioned as a wedge incumbents won't replicate. Buyer: Head of Partnerships (champion); CFO (economic validator).

### Market & positioning (independent anchors cited in the company's research)
- Partner-delivered IT ≈ **70% of IT spend** in 2025 (Canalys/Omdia).
- Cloud-marketplace software **$30B → $163B by 2030** (Omdia).
- **50% of orgs attribute 26%+ of revenue to partners; 40% have no partner-ops headcount** (HubSpot×Canalys, 2022).
- Gartner is transitioning the category to **PERM** (Partner & Ecosystem Relationship Management) — a sign of an immature, forming market.
- **Whitespace claim:** the company's research (and a self-audit) concludes that **neutral, two-sided bilateral partner settlement is genuinely unowned** today (~75% confidence). **Competitive clock:** AppDirect acquired Tackle.io (Dec 2025) and PartnerStack (Apr 2026) and could assemble an adjacent offering within 2–4 quarters — the main external risk.

### The raise & equity *(source: canonical 2,000,000 SAR Pre-Seed Financial Model Blueprint)*

| Term | Value |
|---|---|
| **Round** | Pre-seed |
| **Amount** | **2,000,000 SAR** (≈ $533K) |
| **Equity offered** | **10%** |
| **Implied post-money** | **20,000,000 SAR** (≈ $5.33M) |
| **Implied pre-money** | **18,000,000 SAR** (≈ $4.8M) |
| **Modeling basis** | 12-month, **zero-revenue** runway (default-alive on cash alone) |
| **Avg monthly burn** | ≈ **159,466 SAR/mo** (≈ $42.5K); buffer left at mo 12 = 86,410 SAR (4.32%) |
| **Headcount funded** | 10 by Month 2 (4 founders + 6 hires) |

> **Equity detail available is limited to the round terms above.** The founder/ESOP ownership split and full cap table are **not disclosed** in the repository (the company's own finance questionnaire leaves the ESOP-pool field blank). Any equity diligence beyond "10% offered for 2M SAR" requires founder-provided data.

---

## PAGE 2 — RESULTS / PROGRESS TO DATE

> **Read this first — honest framing.** Reven is **pre-revenue, pre-MVP, and (per its own model) pre-incorporation** — Month 1 of the plan still budgets company formation, licenses and visas. There are therefore **no past-year financial or commercial results to report**: no revenue, no bookings, no customers, no signed design partners, no live product. The company's own internal audit states it plainly: *"plan complete, build not started."* Observable work in the repository spans roughly **April–June 2026** (~2–3 months of git history), not a full trailing year. Everything below is **what genuinely exists**, with explicit "not yet" lines so nothing is overstated.

### What has actually been produced (verifiable in-repo)
- **A venture-grade strategy & operating corpus (~25 documents):** canonical strategy dossier, product requirements (PDR v5), pricing/commercial strategy + red-team, GTM / onboarding / internal-cadence / CFO operating manuals, integration-layer manual, market-analysis PDFs, and a 100- and 1,000-item strategic-implications atlas. The company's own internal audit grades the **strategy/plan A− ("genuinely venture-grade")**.
- **An investor pitch deck** — *"Partner Revenue OS Investor Pitch, June 2026"* (16 slides). Notably, it contains **no traction, metrics, or financial-projection slide** — consistent with a pre-revenue company.
- **A canonical, internally-reconciled pre-seed financial model** (2,000,000 SAR; every line sums exactly to the round).
- **A prototype application** (`revenue-share-platform/`: Node/Express + React) — but the company's **own architecture audit grades it "D / throwaway scaffold"**: a single-tenant CRUD demo with no ledger, no multi-tenancy, no tests/CI, a broken UI, and documentation that describes a different database than the code uses. The latest git commit is literally *"Remove the UI prototype and all references to it."* **It should be treated as a clickable demo, not product progress.**

### What has NOT happened yet (stated plainly)
- **No revenue** — the model is explicitly a zero-revenue scenario.
- **No customers and no signed design partners** — 3–5 design partners is a **target/exit-gate**, not an achievement.
- **No MVP** — none of the defensible components (claim ledger, cross-tenant identity, attribution, reconciliation, compliance) is built.
- **No external validation** of unit economics, ACV, pricing, churn or NRR — all are unset placeholders in the finance questionnaire.

### Use of funds *(canonical blueprint)*
~**88% to people** (4 founders + 6-person execution team), ~**8%** one-time legal/setup (KSA entity, MISA/MOC, visas/Iqamas, ZATCA/GOSI/insurance), ~**4%** emergency cash buffer. Pillars: P1 Setup/Legal 7.90% · P2 Founders+Cloud 41.47% · P3 Execution Team 46.31% · P4 Buffer 4.32%.
*(Minor discrepancy to flag for diligence: the pitch deck shows the same total but a different split — P3 37.89% / P4 reserve 12.74% — i.e., a larger liquid reserve than the canonical model. The two should be reconciled before the data room goes out.)*

### Team
The deck describes a **founding team organized in three layers** — (01) Product & Capital (incl. a fractional CPO and capital allocation), (02) Commercial (client activation, RFP/sales governance), (03) Legal & Contract (contract lifecycle, revenue governance). The funded plan names four founder roles (**CEO, CTO, CRO, COO**). **Individual founder names and backgrounds are not disclosed in the repository.**

### What an investor is actually underwriting
This is a **pre-product, pre-revenue bet on (a) a rigorous, well-sequenced plan and (b) a real market whitespace (neutral bilateral partner settlement) against a closing competitive window.** The single biggest risk, in the company's own words, is mistaking the throwaway demo for progress while the moat (ledger + cross-tenant identity + compliance) stays unbuilt. Key open items to diligence: the unresolved GCC-vs-global beachhead, whether the reconciliation pain is *urgent vs. tolerated*, the full cap table/ESOP, founder identities/track record, and the doc-vs-code truth gap.

---

*Disclaimer: This two-pager is a faithful summary of the contents of the Reven / Partner-Revenue-OS repository as of 2026-06-24. It contains no projections, traction, or commercial figures beyond what those documents state. External market statistics are the company's own cited (not independently primary-verified) figures. "No revenue / no customers / no MVP" reflects the explicit, repeated statements in the source material.*
