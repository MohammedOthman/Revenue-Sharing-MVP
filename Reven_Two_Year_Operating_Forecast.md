# Reven — First Two-Year Operating Forecast (SAR, Capability-Driven)

**Document type:** Bottoms-Up Operating Forecast · Capability → Tier → Logos → ARR · Cash & Headcount Model · Audit-Corrected
**Product:** Partner Revenue OS (brand: **Reven**)
**Built from:** the capability/build sequence (`Reven_Execution_Plan_Next_2_Quarters.md`, `partner-revenue-os-PDR-v5.md`), the SAR pricing tiers (`Reven_Pricing_Executive_Summary.md`, `…Pricing_and_Commercial_Strategy.md` §2.5/§3), the canonical cost model (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`), and the corrections in `Reven_T2D3_Plans_Reverse_Audit.md` (A1, A3, A4, A7).
**Currency:** **SAR throughout.** **Scope:** Months 1–24 from the pre-seed start; **KSA-only** (global expansion is a Series-A/Year-3 line per audit A2 — not in this window).
**Date:** 2026-06-23.

> **Reading discipline.** This is an *engineered, bottoms-up* forecast — logos by tier × SAR ACV, built on what the **product can actually sell each quarter**. Costs are taken **verbatim from the canonical SAR 2.0M model** for Year 1 (not re-invented). Revenue in Year 1 is treated as **upside to the deliberately zero-revenue runway** — it extends runway, it is never relied upon. Tags: **[Confirmed]** = repo fact; **[Model]** = from the SAR 2.0M financial model; **[Derived]** = computed here; **[Assumption]** = a chosen input. Every revenue/logo figure is a hypothesis to validate, consistent with the repo's anti-hallucination discipline.

---

## 1. The forecast on one page

**The two-year arc:** **Year 1** builds the Capture capability and lands 3–5 paid design partners on the canonical SAR 2.0M pre-seed (zero-revenue runway; revenue is upside). **Year 2** raises a seed round and runs the **"seed-year ramp"** the audit flagged (A1) — scaling Capture monetization and switching on early Settle — exiting **mid-ramp**, with the T2D3 "Y0" base (SAR 5.6M ARR) landing in **early-mid Year 3**, not at month 24.

| Headline (SAR) | **End Year 1** (M12) | **End Year 2** (M24) |
|---|---:|---:|
| **Exit ARR** | **~0.9M** (~75K MRR) | **~3.3M** (~275K MRR) |
| Paying logos (sales-led book) | ~7 | ~28 |
| SME wedge logos (self-serve, tracked separately) | ~25 | ~110 |
| Blended ACV (paying book) | ~128K | ~118K |
| Recognized revenue (in-period) | ~0.4–0.5M | ~2.0–2.2M |
| Headcount (end) | 10 | ~23 |
| Gross burn (year) | **~1.91M** [Model] | ~6.5M |
| Net burn (year, after revenue) | ~1.4M | ~4.5M |
| Cash at year-end | ~0.6M → **+seed ~14M** | ~10.1M |
| Capital event | Pre-seed **2.0M @ 20M post** [Confirmed] | Seed **~11–19M @ ~41–68M post** [External] |
| Phase / gate | **Phase-1 Capture exit gate** | **Phase-2 Settle readiness** → open Series-A |

> **The single most important framing.** Year 1's job is **proof, not revenue** — the SAR 2.0M is sized to survive 12 months on cash alone, and the ~SAR 0.9M ARR it exits with is the *evidence* (3–5 paid logos, 100+ claims, a CFO who says "these reconcile") that unlocks the seed. Year 2's job is to convert that proof into a **repeatable motion** and begin the ramp toward T2D3 — but the audit's correction stands: **end-Y2 (~SAR 3.3M) is mid-ramp**, and anyone expecting SAR 5.6M by month 24 is reading the clean ladder, not the engineered one.

---

## 2. How this forecast is engineered (method)

Five inputs, combined:

1. **Capability gates the sale (§3).** You can only sell a tier once its capability ships. Starter needs the claim ledger + attribution + evidence export; **Growth** needs statements/disputes/finance-evidence-pack; **Enterprise** needs ZATCA/WHT + multi-entity + residency; **Settle revenue** (per-payout) needs the clearance engine + bilateral reconciliation. So the **tier mix is a function of the build calendar**, not a wish.
2. **SAR tiers set the ACV** [Confirmed §2.5]: paid pilot ~19–56K (creditable) · SME (Reven Start) from **SAR 50/mo** (wedge, not ARR) · **SMB Growth 67–150K** · **Mid-market 188–450K** · Enterprise/Semi-gov 560K+.
3. **Logos build bottoms-up** from the founder-led (Y1) → first-hired (Y2) motion, at KSA enterprise cycle lengths (6–18 mo).
4. **Costs are the canonical model** [Model]: Year-1 burn is the exact SAR 1,913,590 deployment (M1 = 227,193; M2–12 = 153,309 each) + the 86,410 buffer = SAR 2.0M. Year-2 costs are a seed-funded scale-up of that base.
5. **Audit corrections applied:** the **seed-year ramp** is named (A1); **NRR governed on revenue mix**, SME kept off the ARR line (A3); **annual prepay** assumed on every deal that can bear it, to beat net-60–120 DSO (A4); the compliance forcing function is the **rolling later ZATCA waves + RHQ/PDPL**, *not* the already-missed 30 Jun 2026 Wave 24 (A7).

---

## 3. Capability & expansion timeline (what's sellable, when)

| Qtr | Capability shipped (the build) | Tier it unlocks | Geo | Layer |
|---|---|---|:--:|:--:|
| **Q1** (M1–3) | Append-only **claim ledger** + **cross-tenant identity** + one visible loop (claim→attribution→eligibility→audited statement) | Paid pilots; **Starter** | KSA | Capture |
| **Q2** (M4–6) | **ZATCA/WHT *capture*** (fields + eligibility evidence, no money moved) + first CRM integration (Salesforce/HubSpot) | Pilots convert; **Growth** (statements, disputes, evidence pack) | KSA | Capture |
| **Q3** (M7–9) | Data-quality engine, partner statements, payout-eligibility preview; reliable webhooks | **Growth** at scale | KSA | Capture |
| **Q4** (M10–12) | Multi-entity (lite), Arabic/RTL, SSO/SCIM; second integration (billing/ERP) | First **Enterprise** scope; **Phase-1 exit gate** | KSA | Capture |
| **Q5** (M13–15) | **ZATCA clearance engine + WHT engine** (the first Settle build, timed to the **next applicable wave** — not Wave 24); idempotent settlement design | Enterprise; **early Settle** | KSA | →Settle |
| **Q6** (M16–18) | **Per-payout rail fee** + **bilateral reconciliation** (both sides settle one ruleset) | First **Mid-market**; per-payout revenue | KSA | Settle |
| **Q7** (M19–21) | **Revenue-under-management axis** (the A9 fix) + module attach + clawback-by-netting | NRR expansion turns on | KSA | Settle |
| **Q8** (M22–24) | In-Kingdom residency / dedicated-tenant option; finance evidence-pack v2; ERP reconciliation hardening | First **Semi-gov / Large** reference | KSA | Settle |

> **Expansions in this window are *layer* and *tier*, not *geography*.** Capture→Settle (layer) and pilots→Growth→Mid→first Enterprise (tier) are the two-year expansion engines. **Geographic expansion (MENA/global) is deliberately out of scope until Series A / Year 3** (audit A2) — pulling it forward now would split a founder-led team before the KSA motion is repeatable.

---

## 4. Year 1 (Months 1–12) — Pre-seed, Phase-1 Capture

**Mandate:** ship the moat (ledger → identity → loop → ZATCA capture), land **3–5 paid design partners**, hit the exit gate. Revenue is upside.

| | Q1 (M1–3) | Q2 (M4–6) | Q3 (M7–9) | Q4 (M10–12) |
|---|---:|---:|---:|---:|
| Paid pilots signed (cum.) | 2 | 4 | 5–6 | 5–6 |
| Paying annual logos (cum.) | 1 | 3 | 5 | **7** |
| SME wedge logos (cum.) | 3 | 8 | 15 | **25** |
| **Exit ARR (SAR)** | ~0.06M | ~0.25M | ~0.50M | **~0.90M** |
| Exit MRR (SAR) | ~5K | ~21K | ~42K | **~75K** |
| Recognized rev / Q (SAR) | ~0.08M | ~0.11M | ~0.13M | ~0.17M |
| Headcount | 10 | 10 | 10 | 10 |
| Gross burn / Q (SAR) [Model] | ~0.53M | ~0.46M | ~0.46M | ~0.46M |
| Cash end of Q (SAR) | ~1.55M | ~1.20M | ~0.87M | **~0.58M** |

- **Cost side is the canonical model, unchanged** [Model]: SAR 1,913,590 deployed + 86,410 buffer; 4 founders (M1–12) + 6 execution hires (M2–12). The one seller is the **Inside Sales Executive**; the motion is **founder-led**.
- **Revenue side (upside to the zero-revenue runway):** ~**SAR 0.4–0.5M recognized** across the year (pilot fees + partial-year Growth subscriptions). This **cuts net burn from ~1.91M to ~1.42M** and leaves **~SAR 0.58M cash** at M12 *before* the seed — i.e., revenue bought ~3–4 extra weeks of runway. **Never planned as a dependency.**
- **Phase-1 exit gate (the real deliverable), hit ~Q3–Q4** [Confirmed]: 100+ real claims through the ledger; **3–5 paid design partners** with a finance-accepted evidence pack; weekly active usage; time-to-first-claim < 14 days; one CFO reference — *"these numbers reconcile."* Exit MRR **~SAR 75K (≈ SAR 0.9M ARR)** sits inside the repo's stated **SAR 37.5–112.5K MRR** gate band.
- **Capital event ~M12:** with the gate met, raise the **seed (~SAR 11–19M @ ~41–68M post)**. Audit A1: **size to the *top* of the band** to fund the ramp, not just "3–5 logos."

---

## 5. Year 2 (Months 13–24) — Seed-funded Capture-scale + early Settle

**Mandate:** convert proof into a **repeatable motion**, switch on **early Settle** (per-payout, ZATCA clearance), land the first **Mid-market** and a **Semi-gov reference**, and run the seed-year ramp toward T2D3.

| | Q5 (M13–15) | Q6 (M16–18) | Q7 (M19–21) | Q8 (M22–24) |
|---|---:|---:|---:|---:|
| Paying logos (cum.) | 11 | 16 | 22 | **28** |
| of which Mid-market | 0 | 1 | 1 | **2** |
| of which Enterprise/Semi-gov | 0 | 0 | pilot | **1 signed** |
| SME wedge logos (cum.) | 40 | 60 | 85 | **110** |
| **Exit ARR (SAR)** | ~1.3M | ~1.9M | ~2.6M | **~3.3M** |
| Exit MRR (SAR) | ~108K | ~158K | ~217K | **~275K** |
| Recognized rev / Q (SAR) | ~0.35M | ~0.45M | ~0.55M | ~0.65M |
| Headcount (end) | 14 | 18 | 21 | **23** |
| Gross burn / Q (SAR) | ~1.2M | ~1.5M | ~1.8M | ~2.0M |
| Cash end of Q (SAR) | ~13.7M | ~12.7M | ~11.4M | **~10.1M** |

- **Team scale-up (10 → ~23)** [Assumption]: +2–3 AEs, +1–2 sales engineers, +2 CSMs, +2–3 engineers (Settle build), +1 KSA tax/compliance SME, +marketing/RevOps. The audit's GTM-ramp note (A8) is honored: **hire AEs gated on magic number ≥1.0**, not ahead of it.
- **Revenue mix discipline (A3):** the **28 paying logos are revenue-skewed to Growth + the first 2 Mid-market** (blended ACV ~SAR 118K); the **110 SME wedge logos contribute ~SAR 0.1M and are tracked on land-to-expand %**, never counted as ARR pillars. This keeps the early **NRR signal at ~105–110%** honest (tier upgrades + module attach on the first cohort) and pointed at the enterprise mix the 120% target later needs.
- **Cash & efficiency:** seed (~SAR 14M base case) + ~SAR 0.58M carried → ~SAR 14.6M opening; net burn **~SAR 4.5M**; **~SAR 10.1M cash at M24 (~18–22 months runway).** **Annual prepay** (A4) on every deal that can bear it funds the ramp and beats net-60–120 DSO. **Year-2 burn multiple ≈ 1.9** (net burn 4.5 ÷ net-new ARR 2.4) — under the <2 gate but **elevated, as expected in a ramp year**; it should trend down as the cohort expands.
- **Phase-2 (Settle) readiness gate, end-Y2** [Confirmed]: settlement idempotent (zero double-pays), clean ERP reconciliation, NRR signal >110% via module attach, a CFO reference says "we trust these numbers." This **opens the Series-A motion** (toward ~SAR 188M valuation [External]).

---

## 6. The integrated two-year model (one table)

| Metric (SAR) | M3 | M6 | M9 | **M12** | M15 | M18 | M21 | **M24** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **Exit ARR** | 0.06M | 0.25M | 0.50M | **0.90M** | 1.3M | 1.9M | 2.6M | **3.3M** |
| Exit MRR | 5K | 21K | 42K | **75K** | 108K | 158K | 217K | **275K** |
| Paying logos | 1 | 3 | 5 | **7** | 11 | 16 | 22 | **28** |
| SME wedge logos | 3 | 8 | 15 | **25** | 40 | 60 | 85 | **110** |
| Blended ACV (paying) | 60K | 83K | 100K | **128K** | 118K | 119K | 118K | **118K** |
| Headcount | 10 | 10 | 10 | **10** | 14 | 18 | 21 | **23** |
| Cash | 1.55M | 1.20M | 0.87M | **0.58M / +seed** | 13.7M | 12.7M | 11.4M | **10.1M** |
| Blended GM | ~75% | ~75% | ~76% | **~76%** | ~76% | ~75% | ~75% | **~75%** |
| NRR signal | — | — | — | — | ~105% | ~107% | ~109% | **~110%** |
| Burn multiple (TTM) | n/a | n/a | n/a | n/a | ~2.3 | ~2.1 | ~2.0 | **~1.9** |
| Phase | Capture | Capture | Capture | **Capture (gate)** | →Settle | Settle | Settle | **Settle (gate)** |

---

## 7. Scenarios — end-Year-2 ARR (SAR)

The base case is deliberately conservative-realistic (audit's "don't draw it too clean"). The swing factor is **conversion speed × first Mid/Enterprise timing**.

| Case | End-Y1 ARR | End-Y2 ARR | End-Y2 paying logos | What it assumes |
|---|---:|---:|---:|---|
| **Bear** | ~0.6M | **~2.2M** | ~20 | Slow KSA cycles; Mid-market slips to Y3; SME over-indexes; NRR ~104%. Still default-alive on the seed. |
| **Base (this doc)** | ~0.9M | **~3.3M** | ~28 | Gate hit on time; 2 Mid + 1 Semi-gov reference; early Settle live; NRR ~110%. |
| **Bull** | ~1.2M | **~5.0M** | ~36 | Fast pilot conversion; 3–4 Mid + 1 large; per-payout revenue meaningful; NRR ~113%. **Reaches the T2D3 Y0 base by M24.** |

---

## 8. Where this lands vs. the T2D3 ladder (audit A1, addressed)

The clean T2D3 ladder calls month-24 "approaching Y0" (SAR 5.6M ARR). **This engineered forecast says base-case end-Y2 is ~SAR 3.3M — mid-ramp.** That is the audit's A1 finding made concrete:

- Pre-seed exits at **~SAR 0.9M ARR** (M12).
- The **seed-year ramp** runs ~SAR 0.9M → ~SAR 3.3M in Year 2 (**~3.7×** — one strong triple).
- The T2D3 **"Y0" base (SAR 5.6M)** is reached in **early-mid Year 3** (another ~1.7×), *then* the official ×3 Y1 triple begins.

> **The honest implication for planning.** Counting from today, the path to the *first official T2D3 rung* is **~30 months, not 12** — pre-seed build (12) + seed-year ramp to Y0 (~12–15) + the Y1 triple. Plan the seed runway to cover the ramp **plus** the start of the first triple, or the company re-raises mid-ramp from a position of weakness. The bull case collapses this by ~6 months; the bear pushes Y0 into late Year 3.

---

## 9. Risks & the operating disciplines for these two years

| Risk (this window) | Discipline / mitigation |
|---|---|
| **Treating Y1 revenue as a dependency** | It isn't — the SAR 2.0M survives at zero revenue. Revenue extends runway; never staff or commit against it. |
| **The $6–50K (SAR 22–185K) "valley of death"** | Everything below the **SAR 95–110K high-touch floor is self-serve**; no human-delivered SME deals. Keep the SME tier zero-touch. |
| **SME over-indexing the book** | Govern on **revenue mix** (A3): SME stays a land-to-expand wedge, capped out of the ARR line. |
| **Gov DSO (net-60–120) starves cash** | **Annual prepay / milestone disbursement** on every deal that can bear it (A4); decline sub-≥70%-GM gov deals; measure unit economics on the **mid-market** cohort. |
| **Banking the missed ZATCA Wave 24** | Re-anchor the compliance pitch to the **next applicable wave + RHQ/PDPL/WHT** mandates (A7); drop "land before 30 Jun 2026." |
| **Hiring AEs ahead of efficiency** | Gate GTM hiring on **magic number ≥1.0** (A8); Y2 burn multiple ~1.9 is the early-warning line — if it breaches 2.5, slow hiring. |
| **The RUM/per-payout axis slips** | It is a **committed Settle deliverable** (Q6–Q7), not optional — the NRR engine and the ACV climb depend on it (A9). |
| **Re-raising mid-ramp** | Size the seed to the **seed-year ramp + the start of the first triple** (§8), not to the pre-seed deliverables. |

---

## Sources & confidence

**Internal [Confirmed]/[Model]:** `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` (the exact SAR 2.0M cost deployment, burn profile, headcount — used verbatim for Year-1 costs); `Reven_Execution_Plan_Next_2_Quarters.md` (build order, Phase-1 exit gate, two-quarter cadence); `partner-revenue-os-PDR-v5.md` (capability/feature sequence by tier); `Reven_Pricing_Executive_Summary.md` + `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` §2.5/§3 (the SAR tiers and exit-gate MRR band); `Reven_T2D3_Plans_Reverse_Audit.md` (corrections A1/A3/A4/A7/A8/A9); `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (ICP, KSA cycle lengths, gov DSO).

**External [External]:** MENA seed sizing (~SAR 41–68M post) and Series-A valuation (~SAR 188M); KSA enterprise sales-cycle lengths (6–18 mo); NRR-by-segment and burn-multiple benchmarks. Directional.

**Derived/Assumption [Derived]:** the entire quarterly logo/ARR/headcount/cash build, the Year-2 cost scale-up, the GM/NRR/burn-multiple paths, and the three scenarios. These are **engineered hypotheses to validate** — the Van Westendorp/MaxDiff WTP work and the first paid pilots replace them with evidence.

> **Disclaimer.** A bottoms-up operating forecast for internal planning, not an offer, projection of results, or guidance. The company is pre-revenue/pre-seed; Year-1 costs are the canonical model, but all revenue, logo, and Year-2 figures are assumptions to be proven. The deliberate conservatism — Year-1 revenue as upside, end-Y2 as mid-ramp — is the point: it is engineered to be *beaten with evidence*, not to flatter a deck.
