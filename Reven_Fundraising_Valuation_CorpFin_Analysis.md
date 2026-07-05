# Reven (Partner Revenue OS) — Fundraising, Valuation & Corporate Finance Analysis
## Pre-Seed → Seed → Series A

**Document type:** CFO / valuation-engineer analysis — financing strategy, valuation, cap-table engineering, and second-order corporate-finance consequences across three rounds.
**Company:** Partner Revenue OS (commercial brand **Reven**) — claim-centric PRM → bilateral revenue-sharing system of record → revenue-sharing infrastructure (Capture → Settle → Orchestrate).
**Geography:** Saudi Arabia (Riyadh) / GCC. **Currency:** SAR primary; USD reference at the peg **USD 1 = SAR 3.75**.
**As-of:** 2026-07.

> **Fact hygiene (repo convention).** Every figure is tagged:
> **[Confirmed]** — stated in this repository's canonical documents (chiefly `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Reven_Pricing_Executive_Summary.md`, `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`, `Partner_Revenue_OS_Venture_Scale_Narrative.md`, `README.md`).
> **[Assumption]** — this analysis's modeling input, benchmarked to GCC/MENA norms (MAGNiTT/SVC-class data), not a company fact.
> **[Derived]** — arithmetic on the above.
> Nothing here is an offer, a tax/Shariah opinion, or an audited projection. Seed and Series A rounds are **entirely forward-looking models**: no such round exists, is priced, or is committed.

---

## 1. Executive Summary

**Current position [Confirmed].** Reven is pre-revenue, pre-MVP, Saudi-based, with 4 founders (CEO, CTO, CRO, COO), a canonical pre-seed ask of **SAR 2,000,000 for 10% (SAR 20M post-money / SAR 18M pre-money)**, a 12-month zero-revenue runway plan (average burn ≈ SAR 159.5K/month, 10 headcount by Month 2), and no existing investors, option pool, SAFEs, or notes. Strategy, pricing architecture, ICP, and validation gates are unusually well-documented for the stage; traction is zero by design (the round *is* the validation round).

**Fundraising readiness.** Fundable at pre-seed **on thesis and team discipline** — the repo's own venture-scale narrative scores it ~7.0/10, "fundable on thesis, gated on first proof." The seed bar is already internally defined (MVP + 100+ real claims + 3–5 paying design partners + repeatable motion); Series A is gated on the Phase-2 settlement proof (finance-of-record trust) plus ~SAR 4–6M ARR.

**Valuation view [Derived].** The canonical SAR 20M (~$5.3M) post-money pre-seed sits at the **top of the KSA pre-seed band** for a pre-product company (typical KSA/MENA pre-seed post-money ≈ SAR 8–20M / $2–5.3M). It is defensible only because dilution is unusually low (10%) and the use-of-funds is fully reconciled — but it *pre-spends* part of the seed step-up: the seed must clear ~SAR 40–55M post to show a healthy 2–2.5× markup, which requires the full seed bar to be hit, not approached.

**Recommended strategy in one line [Derived]:**
> Raise the canonical **SAR 2M pre-seed as a priced round (or KSA-standard convertible at a SAR 20M cap) at 10% dilution with 4-year founder vesting and no pool yet**; hit the Phase-1 gate inside 12 months; raise a **SAR 8–10M seed at SAR 40–50M pre-money (~16–18% dilution) with a 10% post-money ESOP** to fund Phase 2 Settle; then a **SAR 25–35M Series A at SAR 90–130M pre-money (~20–25% dilution, pool refreshed to 12%)** on SAR 4–6M ARR to fund GCC expansion and the settlement layer. This path lands founders at **~45–50% fully diluted post-A** with cumulative capital of ~SAR 40M — a financeable, control-preserving trajectory.

**Biggest financing risks:** (1) missing the Phase-1 gate inside the 12-month zero-revenue runway leaves ~SAR 86K buffer and no bridge plan — the single most dangerous point in the whole path; (2) the premium pre-seed price makes a flat/down seed likely if traction is partial; (3) four equal founders with no vesting stated is a diligence red flag every institutional seed investor will probe.

---

## 2. Core Assumptions

### 2.1 Fact base (all [Confirmed] unless noted)

| Item | Value | Source |
|---|---|---|
| Pre-seed ask / equity / post-money | SAR 2.0M / 10% / SAR 20M | `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` §1 |
| Modeled Year-1 revenue | **Zero** (deliberate) | same, §8 |
| Year-1 burn | SAR 1,913,590 deployed; SAR 86,410 buffer; avg ≈ SAR 159.5K/mo | same, §5 |
| Team | 4 founders + 6 hires (Month 2); 10 total | same, §4 |
| Cost structure | ~88% people, ~8% one-time legal/setup, ~4% buffer | same, §2 |
| Phase gates | Phase-1 exit: 100+ real claims, 3–5 design partners w/ finance-accepted evidence packs, weekly active usage. Phase-2 gate: idempotent settlement, clean ERP reconciliation, CFO reference trust | `README.md` |
| Pricing bands | SME from SAR 50/mo; SMB SAR 67–150K; mid-market SAR 188–450K; semi-gov SAR 600K–2.5M+; enterprise SAR 560K–1.9M+; sales-motion floor ~SAR 95–110K; GM floor ≥70% | `Reven_Pricing_Executive_Summary.md` |
| Market | KSA software SAM ~$150–400M (control-layer lens); 3-yr SOM ~$5–10M ARR; governed flow pool $15–20B, +14–23%/yr | `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (labeled [derived] there) |
| Cap table today | Founders only; no investors, SAFEs, notes, or ESOP recorded | absence of any instrument in repo |
| Comparable vendors (category) | Impartner, PartnerStack, Crossbeam, Kiflo, impact.com, Salesforce PRM | pricing/venture docs |

### 2.2 Modeling assumptions (all [Assumption])

| Assumption class | Conservative | Base | Aggressive |
|---|---|---|---|
| **Founder split** | 4 × 25%, no vesting in place | 4 × 25%, 4-yr vesting / 1-yr cliff adopted at pre-seed close | same as base |
| **Revenue — first 12 mo (pre-seed year)** | 0 (canonical) | 0 booked; 3–5 *paid* pilots signed late-year (cash SAR 150–400K, treated as contra-validation, not plan) | SAR 0.5M exiting ARR |
| **ARR at seed raise (Mo 12–15)** | SAR 0.3M | SAR 0.6–1.0M (3–5 customers × SAR 120–250K blended) | SAR 1.5M+ |
| **ARR at Series A raise (Mo 30–36)** | SAR 2.5M | SAR 4–6M (~$1.1–1.6M) | SAR 10M+ (repo SOM upper path) |
| **Growth (post-first-revenue)** | 2.0× YoY | 2.5–3.0× YoY | 3.5–4× YoY |
| **Gross margin** | 62% (services-heavy early) | 70% (pricing-doc floor) rising to 78% | 80%+ |
| **Monthly burn — Year 1** | SAR 175K (buffer drawn) | SAR 159.5K (canonical) | SAR 150K (hiring slips) |
| **Monthly burn — post-seed** | SAR 420K | SAR 330–380K (HC ~18–22) | SAR 300K |
| **Monthly burn — post-A** | SAR 1.3M | SAR 0.9–1.1M (HC ~40–50) | SAR 0.8M |
| **KSA hiring cost** | Loaded cost per senior eng/GTM hire SAR 25–45K/mo (extrapolated from the blueprint's SAR 7.9–19.2K junior–mid band + GOSI) | same | same |
| **Market benchmark set** | MENA/KSA rounds (MAGNiTT/SVC norms), *not* US/Carta | same | same |
| **Pre-seed dilution** | 15% (price negotiated down) | 10% (canonical) | 8% |
| **Seed dilution (equity only)** | 20% | 16–18% | 15% |
| **Series A dilution** | 25–28% | 20–25% | 18–20% |
| **ESOP** | 12% at seed | 10% post-money at seed; refresh to 12% at A | 8% at seed; 10% at A |
| **Exit horizon / type** | 7–9 yrs; regional strategic sale | 7–9 yrs; strategic/PE (SAMA-adjacent fintech or global PRM consolidator) | 8–10 yrs; global strategic or IPO (Tadawul/Nomu path exists) |

---

## 3. Pre-Seed Round Analysis

### 3.1 The canonical round [Confirmed] and its corporate-finance read [Derived]

| Term | Value | CFO assessment |
|---|---|---|
| Size | SAR 2,000,000 (~$533K) | Correctly sized to milestones: covers 12 months zero-revenue with a 4.3% buffer. Not a vanity number — every riyal is reconciled. |
| Pre/post | SAR 18M / SAR 20M | **Premium for the stage.** ~$4.8M pre for pre-product KSA is top-decile; typical KSA pre-seed post ≈ SAR 8–20M. Defensible only via the low 10% dilution and documented discipline. |
| Dilution | 10% | Founder-friendly (regional norm 10–20%). The *price* carries the risk, not the dilution. |
| Instrument | Implied priced equity ("equity offered") | See 3.2. |
| Runway | 12 months | Adequate to the Phase-1 gate **only if** the gate is hit on schedule; contains **no seed-raise-process buffer** — the venture narrative itself recommends a ~6-month raise buffer, which this round does not fund. ⚠️ |

**Milestones this round must fund [Confirmed]:** MVP claim ledger + attribution/protection engine; 100+ real Partner Revenue Claims processed; 3–5 **paid** design partners with finance-accepted evidence packs; weekly active usage; locked GCC beachhead; GCC-calibrated unit-economics directionals. No money movement, no settlement (Phase-1 finance boundary).

**Investor profile to target [Derived]:** KSA/GCC pre-seed funds and angel syndicates with Vision-2030 B2B SaaS theses (SVC-backed micro-funds, Saudi angel networks, GCC operator angels who are themselves Heads of Partnerships/CFOs at target ICP accounts — these double as design-partner channels). Avoid: pure fintech funds expecting money movement in Phase 1 (strategy explicitly forbids it), and any investor demanding a board seat or 2x preference at pre-seed.

### 3.2 Instrument recommendation [Derived]

**Recommended: priced equity round** (as the blueprint implies), with a **convertible/SAFE at a SAR 20M post-money cap, no discount, MFN** as the acceptable fallback for speed.

- *For priced:* KSA angels/funds are more comfortable with straight equity than US-style SAFEs; a priced round crystallizes the 10%/20M terms now, sets a clean reference for the seed, and forces the founder-vesting + ESOP-free baseline to be papered properly (MISA/MOC structure already budgeted in Pillar 1).
- *Against stacking SAFEs:* multiple caps compound into surprise dilution at seed conversion — with a premium cap (20M) any *lower*-cap follow-on SAFE would also trigger MFN mess. One instrument, one cap, one close.
- *If convertible is used:* insist post-money cap language (fixes dilution at 10%), 24-month maturity converting to equity (not repayable debt), no interest or minimal (Sharia-structured if the investor requires — Ju'ala/Wakala structuring precedent already exists in the pricing docs).

### 3.3 Pre-seed scenarios [Derived]

| | **Lean** | **Standard (canonical)** | **Aggressive** |
|---|---|---|---|
| Capital raised | SAR 1.2M | **SAR 2.0M** | SAR 3.0M |
| Post-money | SAR 12M | **SAR 20M** | SAR 25M |
| Dilution | 10% | **10%** | 12% |
| Runway | ~8 mo (founders + 3 hires only) | **12 mo, 10 HC** | ~16 mo, 10 HC + buffer |
| Founder ownership after | 90% | **90%** | 88% |
| P(hit seed bar) | ~35% — MVP yes; 3–5 *paid* partners on 8 months with 7 people is a stretch | **~55–60%** — gate is reachable but paid-pilot conversion is the binding constraint | ~65% — more time, not more proof-per-month; marginal capital buys raise-process buffer, not probability |
| Seed signaling | "Scrappy" but under-proofed | Clean if gate hit; **premium price must be grown into** | 25M post pre-product forces a ≥SAR 50M seed post to avoid flat round — highest graduation bar |

**Risk of raising too much:** at SAR 3M/25M post, the seed must clear ~SAR 50–60M post-money on ≤SAR 1M ARR — a >50× multiple only "hot" rounds pay; anything less reads flat, and flat-at-seed poisons Series A psychology. Extra cash also invites hiring ahead of proof (the blueprint's 6 hires are already aggressive for pre-MVP).
**Risk of raising too little:** the lean case leaves zero raise-process buffer; a 3-month seed process (normal in GCC; semi-gov-adjacent investors are slow) forces raising from weakness or a bridge — and bridges on a premium pre-seed cap are ugly (cap must drop, MFN cascades).
**Second-order effect on seed:** the canonical round's 10%-for-20M structure means the pre-seed investor's markup, not their ownership, is the seed negotiation anchor. A seed at SAR 45M pre prints a 2.25× step-up — healthy signaling. A seed below SAR 27M pre would be a down-markup — at that point take the valuation hit quickly rather than structure around it (structure compounds; price clears).

**Recommendation: execute the canonical SAR 2M / 10% round**, but (a) paper 4-year founder vesting at close, (b) hold hires 5–6 until first design partner signs (converts ~SAR 170K of Pillar-3 spend into 1+ month of raise buffer), (c) start the seed process at Month 8, not Month 10.

---

## 4. Seed Round Analysis

*(Entirely forward-looking [Derived/Assumption]; no seed round exists in the repo.)*

### 4.1 Timing and entry metrics

**Raise when the Phase-1 gate is *evidenced*, not merely near — target process start Month 8–9, close Month 11–14.** Metrics before raising:

| Metric | Minimum credible | Strong |
|---|---|---|
| Real claims processed | 100+ (the gate) | 500+ |
| Paid design partners | 3 with real commercial terms | 5, ≥1 mid-market tier (SAR 188K+) |
| ARR / committed ACV | SAR 400–600K | SAR 1.0M+ |
| Evidence pack | Accepted by ≥1 real finance reviewer | Passed a real audit touchpoint |
| Usage | Weekly active at all partners; time-to-first-claim <14 days | ≥70% activation score |
| Pipeline | 3× coverage of seed-period targets from 50–100 named accounts | Semi-gov/enterprise LOI |

### 4.2 Recommended structure (base case)

| Term | Recommendation |
|---|---|
| Size | **SAR 8–10M (~$2.1–2.7M)** — funds 22–26 months at SAR 330–380K/mo burn: Phase 2 Settle build + GTM repeatability + 6-month A-raise buffer |
| Pre-money | **SAR 40–50M** (post SAR 48–60M) — 2.2–2.5× step-up, 40–75× current ARR but ~10–15× *forward* ARR at base growth |
| Dilution | 16–18% new money + **10% post-money ESOP** created at close (pool shuffle: carved pre-money, borne by existing holders — negotiate hard here, see §12) |
| Instrument | Priced preferred equity, 1x non-participating, broad-based weighted-average anti-dilution |
| Board | 5 seats: 2 founders, 1 seed investor, 2 independent/vacant — do **not** give up 2 investor seats at seed |
| Hiring funded | HC 10 → ~20: rule-engine/ledger engineers (Phase 2 core), 1 enterprise AE + 1 SE (the SAR 95–110K+ floor motion), finance-domain product lead, compliance (ZATCA/WHT) specialist |
| Milestones | Phase-2 settlement gate (idempotent settlement, ERP reconciliation, CFO reference trust); ARR SAR 4–6M; NRR signal ≥110%; implementation hours/logo falling; 2+ mid-market or 1 semi-gov logo |
| Investor profile | GCC institutional seed (SVC-backed funds, STV/Wa'ed/Raed-class), one strategic angel from the ERP/payments ecosystem; a regional-fintech-savvy lead matters for Phase-3 optionality |

**Revenue target before Series A:** SAR 4–6M ARR at 2.5–3× growth (conservative vs the repo's $5–10M 3-yr SOM, deliberately — the SOM is the aggressive path).

### 4.3 Seed scenarios

| | **Weak** | **Market-standard** | **Strong** | **Overpriced** |
|---|---|---|---|---|
| Raise / pre / post (SAR M) | 5 / 20 / 25 | **9 / 45 / 54** | 12 / 60 / 72 | 15 / 85 / 100 |
| New-money dilution | 20% | **16.7%** | 16.7% | 15% |
| ESOP created (post) | 12% | **10%** | 10% | 8% |
| Founders after (from 90%) | 61.2% | **66.0%** | 66.0% | 69.3% |
| Runway | ~14 mo | **~24 mo** | ~30 mo | ~30 mo+ |
| Growth expectation created | 2× to survive | **2.5–3× to a SAR 90–130M pre A** | 3× to a SAR 150M+ pre A | ~3.5–4× to a SAR 250M+ pre A |
| Series A signaling | Down-markup vs 20M pre-seed post → A investors smell distress | **Clean 2.25× step; standard** | Strong, but A must clear 2×72=SAR 144M post | **Highest down-round risk in the whole plan**: needs SAR 10M+ ARR to re-mark |
| Down-round risk | Moderate (cheap base) | **Low-moderate** | Moderate | High |
| Founder control risk | Low ownership loss but weak board leverage | **Low** | Low | Low now, severe later (structured terms likely on the next round) |
| Employee equity | 12% pool but low-value strike | **Healthy: 10% pool at rising value** | Healthy | Pool squeezed to 8%; hiring at inflated strike |

**Second-order effect on Series A:** the seed post-money sets the A's *floor psychology*. At 54M post, an A at 90–130M pre is a 1.7–2.4× markup on 4–6M ARR — believable. At 100M post (overpriced case), the identical business performance produces a *flat* A, and flat rounds in MENA routinely arrive with participation or >1x preference attached. **Price the seed to what the A can beat, not to what the seed market will pay.**

---

## 5. Series A Round Analysis

*(Forward-looking [Derived/Assumption].)*

### 5.1 Readiness criteria

- **Traction:** SAR 4–6M ARR (~$1.1–1.6M — the regional Series A bar), 2.5–3× YoY, ≥12 logos with ≥2 at mid-market/enterprise tier, NRR ≥110%, GRR ≥90%, ≥70% GM (the pricing hard floor), CAC payback <18 mo on gross profit.
- **Product/phase:** Phase-2 settlement gate passed — this is Reven's unique A-story: *"the CFO trusts us as finance-of-record"* is worth more than an extra SAR 1M ARR. At least one clean ERP reconciliation cycle and one finance-accepted audit trail at a reference customer.
- **Category proof:** compliance ladder monetizing (L1/L2 premiums attached to ≥30% of ARR); land-to-expand evidence (module attach, band upgrades).

### 5.2 Recommended structure (base case)

| Term | Recommendation |
|---|---|
| Size | **SAR 25–35M (~$6.7–9.3M)** |
| Pre-money | **SAR 90–130M** (post SAR 120–160M; ~20–27× ARR at SAR 4.5–6M — rich by global norms, in-band for scarce KSA enterprise-SaaS assets with Vision-2030 tailwind) |
| Dilution | 20–25% + ESOP refresh to **12% post** |
| Board | 5–7 seats: 2 founders, 1 seed, 1 A lead, 1–3 independent. Founders keep ≥ co-control via independents; never concede investor majority at A |
| Runway | 24–30 months at SAR 0.9–1.1M/mo |
| Use of funds | See §9 — settlement layer + GCC (UAE) expansion + enterprise GTM |
| Growth target after | 2.5× then 2× (to SAR 25–35M ARR at B-readiness); burn multiple ≤1.5 |
| Investor profile | Regional growth lead (STV/Sanabil-class) or global SaaS fund with MENA mandate; strategic (hyperscaler/ERP) money only as minority, never lead — neutrality ("multi-cloud Switzerland") is a stated moat, and a conflicted strategic on the cap table taxes it |

**Strategic risks created by the round:** (1) growth-committed burn makes the Phase-3 "basis points on settled flow" temptation acute — moving money before the money-transmitter decision is made is a regulatory landmine the strategy explicitly defers; (2) a US-style A lead may push the global co-sell beachhead prematurely, unwinding the compliance-wedge focus; (3) semi-gov revenue (SAR 600K–2.5M deals, paid in arrears) can swing quarters — investors must underwrite lumpy enterprise cadence.

### 5.3 Series A scenarios

| | **Efficient** | **Growth-heavy** | **Competitive/high-val** | **Difficult/down-market** |
|---|---|---|---|---|
| Raise / pre / post (SAR M) | 25 / 100 / 125 | 40 / 120 / 160 | 50 / 200 / 250 | 20 / 60 / 80 |
| Dilution (new money) | 20% | 25% | 20% | 25% + likely structure |
| Valuation logic | ~20× ARR on 5M ARR, efficiency story (burn multiple <1.5) | ~22× on 5.5M, land-grab into UAE | 35–45× — only printable in a hot cycle or with a semi-gov mega-contract | ~12× on 5M; market repricing, or metrics missed |
| Investor expectation created | 2.5× growth, path to default-alive | 3× growth, efficiency deferred | 3.5×+ growth for 2+ years — miss once and the B is down | Survival + proof; investor holds the leverage |
| Flat/down-round risk at B | Low | Moderate | **High** — B must clear SAR 500M+ post | Already the down case; B risk resets low if targets modest |
| Exit impact | Clean stack, options open at $100M+ exits | More capital = higher exit hurdle for founder outcome parity | Preference stack (SAR ~61M+) makes sub-$70M exits investor-dominated | Structure (participation/1.5x) if accepted can take 15–25% of founder proceeds at mid exits — resist, trade price instead |

---

## 6. Cap Table Engineering

Method: single fully-diluted table per case; ESOP created/refreshed **pre-money** (borne by pre-round holders); all preferred 1x non-participating. Founder start: 4 × 25% [Assumption].

### 6.1 Base case

| Holder | Start | Post pre-seed (2M @ 20M post) | Post seed (9M @ 54M post, 10% pool) | Post A (30M @ 120M post, 12% pool) |
|---|---:|---:|---:|---:|
| Founders (4) | 100.0% | 90.0% | 66.0% | **46.2%** |
| Pre-seed investor | — | 10.0% | 7.3% | 5.1% |
| Seed investors | — | — | 16.7% | 11.7% |
| Series A investors | — | — | — | 25.0% |
| ESOP | — | — | 10.0% | 12.0% |
| **Total** | 100% | 100% | 100% | 100% |
| Cumulative founder dilution | — | 10% | 34% | **53.8%** |
| Implied founder paper value (SAR) | — | 18.0M | 35.6M | 55.4M |

### 6.2 Conservative case (harder pricing throughout)

Pre-seed 2M @ 13.3M post (15%); seed 7M @ 35M post (20%) + 12% pool; A 30M @ 120M post at 25% (28M pre... modeled: 25% + pool to 12%).

| Holder | Start | Post pre-seed | Post seed | Post A |
|---|---:|---:|---:|---:|
| Founders (4) | 100.0% | 85.0% | 57.8% | **40.3%** |
| Pre-seed investor | — | 15.0% | 10.2% | 7.1% |
| Seed investors | — | — | 20.0% | 13.9% |
| Series A investors | — | — | — | 25.0% |
| ESOP | — | — | 12.0% | 13.7% (11.7% scaled + 2% top-up → 12% floor honored) |
| Cumulative founder dilution | — | 15% | 42.2% | **59.7%** |

### 6.3 Aggressive case (strong execution, priced up)

Pre-seed 2M @ 25M post (8%); seed 12M @ 72M post (16.7%) + 8% pool; A 40M @ 200M post (20%) + pool to 10%.

| Holder | Start | Post pre-seed | Post seed | Post A |
|---|---:|---:|---:|---:|
| Founders (4) | 100.0% | 92.0% | 69.3% | **53.2%** |
| Pre-seed investor | — | 8.0% | 6.0% | 4.6% |
| Seed investors | — | — | 16.7% | 12.8% |
| Series A investors | — | — | — | 20.0% |
| ESOP | — | — | 8.0% | 9.4% → top-up to 10.0% |
| Cumulative founder dilution | — | 8% | 30.7% | **46.8%** |

**Reading:** across all three cases founders retain **40–53% post-A** — above the ~35% median at A and consistent with long-run motivation (§10). The single biggest lever is not round pricing but **pool mechanics**: every 1% of ESOP carved pre-money costs existing holders ~1% pro-rata; negotiating the seed pool from 12%→10% is worth roughly as much to founders as SAR 5M of pre-money. Advisors: if used, cap at 0.25–0.5% each from the pool, 2-yr vest, never direct equity.

---

## 7. Valuation Methodology

| Method | Pre-seed | Seed | Series A |
|---|---|---|---|
| **Scorecard / milestone-based** | **Primary.** Team (4 complete C-suite founders, documented discipline) + reconciled plan + regulatory wedge justify top-of-band | Secondary sanity check | Not used |
| **Comparable rounds (MAGNiTT/SVC KSA data)** | Primary anchor: KSA pre-seed post SAR 8–20M | **Primary.** KSA seed post SAR 30–75M for B2B SaaS w/ first revenue | Secondary |
| **VC method (target-return back-solve)** | Directional only | **Primary discipline check** (below) | Secondary |
| **Revenue multiple** | N/A (zero revenue) | Forward-ARR only (~10–15× forward) | **Primary:** 15–25× ARR for 2.5–3×-growth, 70%+ GM, compliance-moat SaaS in a scarce regional market |
| **Discounted exit value** | Too noisy | Directional | Cross-check at A |
| **Risk-adjusted (First Chicago tri-scenario)** | Used implicitly via low/base/high | Useful for structuring | Useful |

**VC-method discipline check [Derived].** Assume base exit SAR 940M (~$250M, §13) at year 8. Required multiples: pre-seed ~25–40×, seed ~12–20×, A ~6–10× (MENA-adjusted, net of future dilution ~35–45% for early holders).
- Pre-seed: investor's 10% dilutes to ~5.1% by A and ~4% by exit → proceeds ~SAR 38M on SAR 2M = **19×**. Below the 25–40× pre-seed target — confirming the canonical price is *investor-tight*; it clears only for investors who underwrite the $1B+ tail (where it returns 75×+). This is the quantitative reason the round targets thesis-driven regional funds, not spreadsheet-driven ones.
- Seed at 54M post: seed's 16.7% → ~11.7% at A, ~9.5% at exit → SAR 89M on SAR 9M = **~10×** at base exit, 30×+ at the tail. In-band.
- A at 120–160M post: 25% → ~20% at exit → SAR 188M on SAR 30M = **~6×**. In-band.

**Stage valuation ranges [Derived]:**

| Stage | Low | Base | High | Key drivers |
|---|---|---|---|---|
| Pre-seed (post) | SAR 12M | **SAR 20M (canonical)** | SAR 25M | Team completeness; reconciled plan; regulatory wedge scarcity; zero traction caps the top |
| Seed (post) | SAR 30M | **SAR 48–54M** | SAR 72M | Paid-pilot count & ACV; evidence-pack acceptance; pipeline coverage; KSA seed scarcity premium |
| Series A (post) | SAR 80M | **SAR 120–160M** | SAR 250M | ARR level & growth; Phase-2 settlement proof; NRR; semi-gov contract option value; market cycle |

---

## 8. Financial Model Overview

High-level, SAR M, fiscal years from pre-seed close [Derived; Year 1 columns anchored to the canonical blueprint].

| | **Y1 (pre-seed)** | **Y2 (seed yr 1)** | **Y3 (seed yr 2 / A raise)** | **Y4 (post-A)** |
|---|---:|---:|---:|---:|
| **Exit ARR — cons.** | 0 | 0.8 | 2.5 | 5.5 |
| **Exit ARR — base** | 0 | 1.5 | 5.0 | 12.5 |
| **Exit ARR — aggr.** | 0.5 | 3.0 | 10.0 | 25.0 |
| Recognized revenue (base) | 0 | 0.9 | 3.2 | 8.5 |
| Gross margin | — | 62% | 70% | 75% |
| Opex (base) | 1.91 | 4.3 | 5.2 | 12.5 |
| Headcount (exit) | 10 | 18 | 22 | 45 |
| Net burn (base) | 1.91 | 3.7 | 3.0 | 6.1 |
| Avg monthly burn | 0.159 | 0.31 | 0.25→0.38 | 0.51→0.95 |
| Cash (base, end) | 0.09 | 5.4* | 2.4 → +30 (A) | 26.3 |

\* assumes seed of SAR 9M closes Month 13–14. **Cash-out dates:** without seed — Month 12–13 (the blueprint leaves only SAR 86K buffer; this is the model's hardest wall). Without A — around Month 34–36. **Break-even possibility:** base case reaches contribution-margin break-even ~Y5 at SAR 25–30M ARR; the model is deliberately not run for profitability before B — but the *conservative fallback* (freeze at HC ~22, KSA-only, ~SAR 8–10M ARR) plausibly reaches cash-flow break-even in Y5, which is Reven's genuine walk-away option and a negotiating asset in every round.

**Capital to next milestone:** SAR 2M → Phase-1 gate; ~SAR 9M → Phase-2 gate + SAR 4–6M ARR; ~SAR 30M → SAR 25M+ ARR + GCC footprint + B-readiness. Cumulative ≈ SAR 41M (~$11M) to Series B door.

---

## 9. Use of Funds

| Category | Pre-seed (SAR 2.0M) [Confirmed] | Seed (SAR 9M) [Derived] | Series A (SAR 30M) [Derived] |
|---|---|---|---|
| Product/engineering | 46.3% (execution team incl. eng-heavy 6 hires)* | 40% — rule engine, ledger, ERP integrations | 30% — settlement layer, attribution hub, multi-entity |
| Sales & marketing | *included in team* (1 inside sales + 1 CSM ≈ 13%) | 25% — 2 AEs, SE, ABM into 50–100 named accts | 32% — enterprise pods, UAE launch, category marketing |
| Operations | — | 8% | 10% |
| Hiring (recruitment costs) | — | 4% | 5% |
| Legal/accounting/compliance | 7.9% (one-time KSA setup) | 6% — ZATCA/PDPL depth, SOC2-class audit | 6% — UAE entity, security certifications |
| Founder salaries | 35.8% (4 founders, SAR 715K + GOSI) | 9% (modest raise; keep below-market until A) | 5% (market-adjusted) |
| Infrastructure/software | 2.8% (GCP Riyadh) | 5% | 6% |
| Contingency reserve | 4.3% | 3% | 6% |

\* The pre-seed's 88%-people allocation is *appropriate* for a validation round (proof is made of engineer- and founder-hours), but two flags: founder payroll at 35.8% of the round is at the top of what pre-seed investors accept — be ready to defend it as 4 full-time C-level salaries at below-market KSA rates; and zero marketing spend means all pipeline is founder-network — consistent with design-partner GTM, fragile beyond it.

---

## 10. Second-Order Thinking Analysis

1. **Today's valuation is next round's obligation.** The 20M pre-seed post is a *forward contract on proof*: it borrows ~SAR 5–8M of valuation from the seed. If the Phase-1 gate is fully hit, the loan repays invisibly; if half-hit, the seed is flat and every future round inherits the "they always price ahead of proof" label.
2. **Dilution → founder motivation is convex, and ¼-split quadruples the exposure.** Four equal founders means each holds ~11.5% post-A (base). That is healthy *only if all four are genuinely C-level contributors through A*. If one founder disengages post-pre-seed without vesting in place, ~23% of the company (their stake pre-A) is dead weight — the classic KSA cap-table killer. **Vesting at pre-seed close is worth more than any term in this document.**
3. **Option pool sizing is hiring capacity.** The Phase-2 build needs rule-engine/ledger engineers who have global offers. A 10% pool at seed ≈ 20–25 competitive grants. Under-pool (8%) and the A-stage refresh lands *pre-money* on founders anyway — under-pooling only defers and worsens the cost.
4. **Investor quality compounds like interest.** A seed lead who has taken a KSA company to Series A imports the A investors, the semi-gov introductions (Etimad procurement), and the term-sheet discipline. A passive-money seed saves 5 points of valuation and costs the A process 3 months — negative NPV.
5. **Raising too much manufactures expectations.** The overpriced-seed case (SAR 100M post) doesn't just risk a down round — it forces GTM to chase semi-gov mega-deals (the only line that can grow into the number), which are 9–18-month cycles paid in arrears: the *cash-flow profile* deteriorates precisely because the *valuation* rose.
6. **Raising too little forces weak negotiation later.** The lean pre-seed's Month-8 wall means the seed is negotiated with <3 months of cash — every GCC investor can see the bank balance in diligence; expect a 20–30% price haircut purely from timing weakness. Runway *is* negotiating leverage.
7. **Aggressive burn narrows strategy.** At SAR 1.3M/mo post-A (conservative-case burn), the "walk-away to profitable KSA niche" option disappears; every subsequent negotiation happens without a BATNA. The burn multiple, not the growth rate, is what preserves strategic freedom.
8. **Market cycles:** KSA venture is countercyclically funded (SVC/sovereign-linked LPs) but *valuation-correlated* with global SaaS. Plan the A window against the global cycle (raise into strength, take the efficient A in a weak tape) — and note the semi-gov revenue line is itself Vision-2030-budget-cyclical.
9. **Cap-table complexity is a tax on every future round.** Stacked SAFEs, >15 angels unrolled into the table, advisor common shares, or a >15% single-angel pre-seed stake each individually can kill an institutional seed in KSA's small diligence community. One clean SPV for angels; roll everything at seed.
10. **Liquidation preferences compound silently.** Base path stacks SAR 41M of 1x preferences. Harmless at a SAR 400M+ exit; decisive below SAR 100M (§13). Every point of *participation* accepted at A is worth ~2–3 points of founder proceeds at mid-range exits — always trade price for clean structure.

---

## 11. Scenario Matrix

Nine paths from pre-seed close; probabilities are subjective [Assumption] and sum to 100%.

| # | Path (pre-seed size + execution) | P | Cash position at Mo 12 | Founder FD % at A (or end-state) | Next-round readiness | Strategic risk | Recommended action |
|---|---|---:|---|---|---|---|---|
| 1 | Lean raise + strong growth | 4% | Empty; proof strong | ~48% | Seed raisable but rushed | Timing weakness haircut | Bridge from pre-seed investor at seed-minus-20%, then full seed |
| 2 | Lean raise + average growth | 5% | Empty; proof partial | — | Bridge or die | Severe | Cut to 6 HC at Mo 6 (don't wait); founders-only runway to gate |
| 3 | Lean raise + weak growth | 3% | Empty | — | Not raisable | Terminal | Orderly wind-down or acqui-hire; return remaining cash |
| 4 | **Standard (canonical) + strong growth** | **20%** | ~SAR 0.1M + pilot cash | **~46–50%** | **Seed at 54–72M post** | Low | **Execute base plan; start seed Mo 8** |
| 5 | **Standard + average growth** (gate ~70% hit) | **30%** | ~SAR 0.1M | ~42–46% | Seed at 30–40M post (small markup) | Moderate — premium pre-seed price bites here | Take the modest-priced seed fast; do NOT hold out for 54M; extend runway via pilot prepayments (annual-prepay is already the pricing default) |
| 6 | Standard + weak growth | 15% | Empty Mo 12–13 | — | Bridge only | High | Convert 1–2 pilots to multi-year prepay; SAR 0.5–1M insider bridge on seed-discount terms; re-scope to PRM-only wedge |
| 7 | Large raise + strong growth | 8% | SAR 1M+ buffer | ~50–53% | Seed strong or skip-to-large-seed | Expectation inflation | Raise the strong seed but price at ≤72M post regardless of offers |
| 8 | Large raise + average growth | 10% | SAR 1M buffer | ~40–44% | Flat seed vs 25M post | Signaling damage | Use buffer to extend to real proof before raising; flat > down |
| 9 | Large raise + weak growth | 5% | Buffer masks failure | — | Not raisable at any markup | High + sunk expectations | Hard pivot decision at Mo 9 while cash remains; the buffer is a pivot budget, not life support |

Expected value is dominated by rows 4–5 (50% mass): **the plan's central risk is not catastrophe but the "average growth" middle, where the premium pre-seed valuation turns an objectively fine year into a signaling problem.** The recommended posture (start seed early, accept modest markup fast, pre-negotiate pilot prepayments) is aimed squarely at row 5.

---

## 12. Investor Terms Analysis

| Term | Pre-seed | Seed | Series A |
|---|---|---|---|
| **Valuation cap** (if convertible) | SAR 20M post-money cap = the deal. Acceptable. Uncapped: never | N/A (priced) | N/A |
| **Discount** | 0% alongside cap; if both demanded, cap OR discount, not stacking | — | — |
| **MFN** | Acceptable (single instrument makes it moot) | — | — |
| **Pro-rata rights** | Grant to lead only | Grant to lead; major-investor threshold SAR 2M+ | Standard; watch super-pro-rata (blocks future round construction) — refuse |
| **Liquidation preference** | 1x non-participating only | 1x non-participating. 1x participating = reject; it costs founders ~SAR 9M at a SAR 200M exit | 1x non-participating. In the down-market scenario expect 1.25–1.5x asks: trade price down before accepting >1x |
| **Participation rights** | Never | Never — this is the hill to die on at seed | Cap at 3x if unavoidable in a rescue; otherwise never |
| **Anti-dilution** | None (or weighted-average in priced) | Broad-based weighted average. Full ratchet = walk | Same. Full ratchet at A converts any stumble into founder wipe-out mechanics |
| **Board seats** | None; information rights + observer at most | 1 seat to lead (of 5) | 1 more (of 5–7); founders + independents ≥ investors |
| **Protective provisions** | None | Standard list (new senior security, sale, debt >SAR 2M, budget). Resist veto over hiring/pricing | Standard; resist veto over next-round *pricing* (creates a hostage dynamic) |
| **Option pool shuffle** | No pool yet — correct | The most expensive "standard" term: 10% pre-money pool = ~4.5 points of effective extra dilution at base seed. Counter: size pool to a *named 18-month hiring plan* (usually justifies 8%, not 12%) | Refresh to 12% post; insist unused seed pool rolls forward before top-up |
| **Founder vesting** | Adopt voluntarily: 4yr/1yr cliff, 12-mo acceleration on change-of-control (double-trigger) | Re-vest asks on remaining unvested only; refuse full reset | Refuse re-vest; negotiate credit for time served |
| **Sharia structuring** | Ju'ala/Wakala wrappers fine if economics identical | Same | Same — but keep documentation convertible to standard preferred for global B investors |

**Danger ranking for this specific company:** (1) participation rights at seed, (2) full-ratchet anti-dilution anywhere, (3) oversized pool shuffle, (4) strategic-investor blocking rights that compromise neutrality (the "Switzerland" moat), (5) >1x preference in the down-market A.

---

## 13. Exit Outcome Analysis

Base-case post-A cap table (§6.1): founders 46.2%, ESOP 12.0%, investors 41.8% (pre-seed 5.1 + seed 11.7 + A 25.0). Preference stack SAR 41M, all 1x non-participating. Conversion cliff: investors convert when pro-rata > preference → exit > ~SAR 98M (~$26M). FX 3.75. [Derived]

| Exit value | SAR | Founder proceeds | Investor proceeds | ESOP value | Preference effect |
|---|---:|---:|---:|---:|---|
| **$25M** | 94M | $11.2M (SAR 42M) | $10.9M — take SAR 41M preference (investors ~44% of exit) | $2.9M | **Binding.** Investors below 1x return except A ~1x; founders still clear ~$2.8M each — why clean 1x structure matters |
| **$50M** | 187.5M | $23.1M | $20.9M | $6.0M | Everyone converts; preferences irrelevant |
| **$100M** | 375M | $46.2M | $41.8M | $12.0M | None |
| **$250M** | 937.5M | $115.5M | $104.5M | $30.0M | None. Seed ~10×, A ~6× — the VC-method base case clears |
| **$500M** | 1,875M | $231M | $209M | $60M | None |
| **$1B+** | 3,750M | $462M | $418M | $120M | None. Pre-seed SAR 2M returns ~SAR 190M (~95×) — the tail that justifies the premium entry price |

**Dilution impact:** each 5 points of extra cumulative dilution (e.g., conservative vs base case) costs founders $12.5M at a $250M exit. **Preference impact:** with 1x participating at seed+A instead (the terms §12 rejects), founder proceeds at $50M drop from $23.1M to ~$18.6M (−20%) — the dollar value of the "never participate" rule. **Regional reality check [Assumption]:** the modal successful outcome for a KSA B2B SaaS category leader is a $100–400M strategic/PE sale (regional consolidator, global PRM/ERP acquirer, or sovereign-linked PE) or a Tadawul/Nomu listing; the $1B+ path requires winning the *global* co-sell/marketplace expansion, not just KSA.

---

## 14. Recommendations

| Parameter | Pre-seed | Seed | Series A |
|---|---|---|---|
| Round size | **SAR 2.0M** (canonical) | **SAR 8–10M** | **SAR 25–35M** |
| Valuation target (post) | **SAR 20M** (hold; floor SAR 15M before restructuring the ask) | **SAR 48–54M** (accept ≥SAR 35M fast in the average-growth case) | **SAR 120–160M** |
| Dilution budget/round | 10% (max 15%) | 16–18% + 10% pool (max 22% all-in) | 20–25% + 2% pool top-up |
| Cumulative founder floor | ≥85% post pre-seed | ≥62% post seed | **≥40% post A** |
| Minimum acceptable terms | 1x NP, no board seat, cap-or-discount not both | 1x NP, WA anti-dilution, 1 board seat, pool ≤10% | 1x NP, founders+independents ≥ investor seats, no participation |
| Milestones before raising | (now) team + reconciled plan + locked beachhead | 100+ claims, 3–5 **paid** partners, evidence pack accepted, SAR 0.5M+ ARR, 3× pipeline | SAR 4–6M ARR, 2.5×+ growth, Phase-2 gate passed, NRR ≥110%, GM ≥70% |

**Red flags to avoid:** stacked SAFEs; any participating preferred; full ratchet; >15% single-angel ownership; strategic lead compromising neutrality; pool >10% at seed; founder salaries raised before A; revenue-based financing or venture debt before SAR 5M ARR (KSA venture debt terms are punitive at this scale); moving money (Phase 3 economics) before the licensing decision.

**How to maximize valuation without manufacturing future risk:** (1) sell scarcity, not projections — the only KSA-native, compliance-wedge partner-revenue system of record; (2) time each raise to a *just-passed* gate (evidence in hand beats forecast every time); (3) convert the pricing architecture into proof early — one mid-market logo at SAR 188K+ re-rates the seed more than SAR 0.5M of SME ARR; (4) run every round as a 6–8 week process with 2+ term sheets (the only reliable price-setting mechanism in a thin regional market); (5) keep the burn multiple ≤1.5 from seed onward so every raise is optional — optionality *is* valuation leverage.

---

## 15. Final CFO / Valuation-Engineer Verdict

**Is the company financeable?** **Yes — at pre-seed, on thesis, now.** The combination of a complete founding C-suite, a fully reconciled use-of-funds (rare at this stage anywhere, rarer in the region), a genuine regulatory wedge (ZATCA/WHT/PDPL/Sharia-structured revenue share), and documented anti-hallucination discipline makes this a top-quartile pre-seed *story*. It is **not yet financeable at seed terms** — and should not pretend to be: the honest "validation round" framing is its strongest asset.

**What must improve before raising (the next 60 days):** (1) adopt founder vesting and a shareholders' agreement — the current 4×25%-no-vesting posture is the likeliest diligence killer; (2) lock the GCC beachhead decision formally (the repo still carries two beachhead theses); (3) get 1–2 *signed or verbally committed paid* design partners — the single cheapest valuation-defense asset for holding SAR 20M post; (4) pre-agree the bridge protocol with the lead (row 5–6 of the scenario matrix) *before* it's needed.

**Optimal fundraising path:** the base path of this document — canonical SAR 2M/10% priced pre-seed → Month-8 seed process → SAR 9M at ~SAR 45M pre with 10% pool → Phase-2 proof → SAR 30M Series A at SAR 90–130M pre with pool to 12%. Founders exit the A at ~46% fully diluted with ~SAR 41M raised, 1x-clean preferences, and a board they still anchor. Every deviation should be toward *earlier, smaller, cleaner* rather than *later, larger, structured*.

**Biggest risks, ranked:** (1) **the Month-12 cash wall** — a 4.3% buffer against a 12-month zero-revenue plan with no raise-process reserve is the plan's only truly fragile joint; mitigate with Month-8 seed start and pilot prepayments; (2) **the average-growth trap** (scenario 5, the single most likely path) — the premium pre-seed price converts a decent year into a flat-round signal; mitigate by taking the fast modest seed; (3) **paid-pilot conversion risk** — everything above assumes 3–5 companies pay before the category exists; the entire valuation ladder rests on this one behavioral bet; (4) **four-founder cap-table integrity** over a 7–9 year path; (5) **premature fintech drift** — settlement economics before the regulatory decision would put the whole SaaS multiple at risk.

**What the founders should do next, in order:** paper the vesting → sign the first paid design partner → close the canonical SAR 2M → hold hires 5–6 until that first signature → build to the gate with the seed process starting Month 8 — and treat every riyal of burn as buying *evidence*, because in this plan, evidence is the only currency that compounds.

---

*Prepared as a confidential corporate-finance analysis. Facts are cited to canonical repo documents; all round structures beyond the canonical pre-seed ask, all probabilities, and all valuation ranges are labeled assumptions/derivations benchmarked to GCC norms — decision-framing, not an offer, audit, or fairness opinion. Supersede only with an explicitly dated revision.*
