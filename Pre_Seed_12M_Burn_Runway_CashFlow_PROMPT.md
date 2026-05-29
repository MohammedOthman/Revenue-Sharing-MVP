# Partner Revenue OS — Pre-Seed 12-Month Burn, Runway & Cash-Flow Model
## Questionnaire-Driven AI Prompt (CFO / Board-Ready · No-Hallucination · KSA/GCC-Calibrated · 13-Pillar)

---

## What this is

A self-contained, **questionnaire-driven** prompt you hand to a capable AI (with this repo) to build an
**end-to-end 12-month pre-seed Burn, Runway & Cash-Flow analysis** for Partner Revenue OS, delivered as a
**CFO / board-ready narrative**. The AI builds the model **only from your answers** to the questionnaire in
Part 2 — it never invents your financial numbers. It covers **13 model pillars** and a set of advanced,
research-backed computations, calibrated to Saudi/GCC reality.

## How to use it

1. Hand the AI this entire file (plus the repo).
2. Answer the **Founder Questionnaire (Part 2)** — fill values inline, or let the AI walk you through it question by question.
3. The AI builds the model from your answers, covering the **13 pillars (Part 4A)** and computing the **advanced levers (Part 4B)**.
4. Anything you leave blank becomes a visible `🔴 [INPUT REQUIRED]` placeholder — the model runs symbolically around it.
5. The **📊 reference ranges** beside questions are *cited external benchmarks for guidance only* — NOT written into your model unless you explicitly adopt them.

## Non-negotiable rules (read first)

- **NEVER invent or hallucinate a financial figure.** No value enters the model unless (a) you provided it, or (b) you explicitly adopted a cited reference. Otherwise → `🔴 [INPUT REQUIRED]`.
- **Three input tiers, flag every number:** `🟢 FOUNDER INPUT` (your answer) · `📊 REFERENCE` (cited benchmark, guidance only) · `🔴 INPUT REQUIRED` (unanswered placeholder).
- **Benchmark ≠ fact, and ≠ your number.** A cited range may inform your answer; it is never silently used as your value.
- **Keep four things distinct:** bookings ≠ billings (invoiced) ≠ recognized revenue ≠ cash collected. **VAT is working capital, never revenue.**
- **Currency: SAR.** USD-denominated costs convert at the USD/SAR peg (~3.75 — `🟢` confirm).
- **Regulatory rates** in Part 3 are cited and dated, but **must be verified** before filing — model them, flag "verify."
- **Mandatory Assumptions Register:** ONE consolidated, editable table of every input — Item | Value/Range | Unit | Tier (🟢/📊/🔴) | Source (if adopted from 📊) | Confidence (H/M/L) | Driver? (Y/N) | Impact on burn/runway | Editable (Y).
- **No false precision** — ranges where benchmarks are wide; sensible rounding; always show confidence.

---

# PART 1 — INSTRUCTIONS TO THE AI

## Role
You are a hybrid **startup CFO + pre-seed VC investment associate** with deep expertise in **Saudi Arabia / GCC B2B SaaS** finance, FP&A, fundraising, and KSA tax/labor regulation. You produce board-grade, defensible analyses and you are ruthlessly disciplined about never overstating certainty or inventing data.

## Objective
Produce an **end-to-end 12-month pre-seed Burn, Runway & Cash-Flow analysis** for **Partner Revenue OS**, as a **CFO/board-ready narrative** (interpretation + summary tables, not a raw spreadsheet dump). The reader must finish knowing: how much cash burns and when, what proof each riyal buys, exactly when cash crosses the buffer and zero, how big the raise must be, which levers most move survival, and what to do month-by-month.

## Analytical lenses to apply
- **Venture / runway lens:** default-alive vs default-dependent, burn multiple, capital efficiency (ARR per SAR burned), CAC payback, runway-to-milestone vs runway-to-zero, milestone-based raise sizing, bridge/extension risk, use-of-funds tied to de-risking, "burn must buy proof."
- **FP&A / budgeting lens:** driver-based bottom-up build, cost-behavior (fixed/variable/step), working-capital & VAT mechanics, deferred-revenue and AR/AP roll-forwards, 13-week near-term cash, scenario + sensitivity, and an "actuals-ready" structure that plugs into the monthly CFO review.

## Business context
Partner Revenue OS is a Saudi/GCC **B2B SaaS "Partner Revenue Control Layer"** — NOT a PRM, affiliate tool, or dashboard. It turns partner activity into attributable, governed, forecastable, finance-ready revenue. Core object = **Partner Revenue Claim**; North Star = **Controlled Partner Revenue**; buyer = Head of Partnerships (validated by CRO/CFO/CEO). MVP wedge = Claim Ledger + Attribution Integrity; overlay-first. The motion is **consultative, enterprise-heavy**: education → diagnostic workshop → paid pilot → implementation-heavy onboarding → activation → expansion, with **~60–180 day sales cycles**. Revenue = SaaS subscription (annual/semi-annual/quarterly/monthly mix) + implementation fees + paid pilots + services. The company is **pre-seed**: cash must be converted into the proof that unlocks the seed round.

If available, READ THESE REPO FILES FIRST and reuse their formulas, cost taxonomy, KSA treatment, proof framework, phase architecture, and decision gates — but scope strictly to 12 months:
`Partner_Revenue_OS_PDR.md`, `Monthly_CFO_Review_Manual.md`, `GTM_Operating_Manual.md`, `Internal_Operating_Cadence_Manual.md`, `Large_Enterprise_Client_Onboarding_Manual.md`, plus the **Market Analysis — Growth Drivers & Market Forces** PDFs (Strategic Growth Thesis · 200 Driver Catalogue · 200 Market Forces Reference) for market sizing/context. Map the 12 months to the repo's phases: **Foundation (M1–3) → Pilot (M4–6) → Activation (M7–9) → Commercial Hardening (M10–12)**.

## Procedure
1. Present the **Part 2 questionnaire** to the founder (or use the answers already filled in).
2. Build the model **bottom-up, driver-based, monthly (M1–M12)** using ONLY founder answers + any reference values they explicitly adopt.
3. Cover all **13 pillars (Part 4A)** and compute the **advanced levers (Part 4B)**. Where an input is missing, insert `🔴 [INPUT REQUIRED]` and continue symbolically — never fabricate.
4. Produce the **Part 5 output** and pass the **Part 6 self-check**.
5. Treat Part 3 (KSA reference) as cited guidance the founder confirms — never as invented company data.

---

# PART 2 — THE FOUNDER QUESTIONNAIRE (answer these; blanks → 🔴 INPUT REQUIRED)

> Notation: **🟢** = your input · **📊** = cited reference range for guidance only (do not use unless you adopt it).

## A. Capital, runway policy & raise
| # | Question | Your answer (🟢) | Reference (📊, guidance only) |
|---|---|---|---|
| A1 | Starting cash at M1 (SAR)? |  | — |
| A2 | Pre-seed already raised/committed (SAR), instrument (SAFE/convertible/priced), cap/valuation? |  | 📊 GCC pre-seed pre-money ~$3–7M ≈ SAR 11–26M; post-money SAFE ~87% globally |
| A3 | Any further raise planned within the 12 months? Amount + target month? |  | — |
| A4 | Minimum cash floor you will never breach (SAR)? |  | — |
| A5 | Target cash buffer (months of forward net burn)? |  | 📊 3 aggressive / 4 normal / 6 conservative |
| A6 | Target **seed-ready milestone** (what must be true to raise the seed)? |  | 📊 e.g. MVP + 3–5 paying/activated customers + repeatable motion |
| A7 | Ownership split: Saudi/GCC % vs foreign %? (drives Zakat vs CIT) |  | — |
| A8 | Fiscal year-end (for Zakat/VAT timing)? |  | — |

## B. Founders & salary deferral
| # | Question | Your answer (🟢) | Reference (📊) |
|---|---|---|---|
| B1 | # founders; per founder: market salary, **cash** salary M1–M12, deferral? |  | 📊 ~65–75% of market; total founder cash ≤10–15% of raise |
| B2 | Founder/ESOP equity pool? |  | 📊 ~15% ESOP common at early stage (MENA) |

## C. Headcount & hiring plan (one row per role)
| Role | Start month (🟢) | Saudi / Expat (🟢) | Gross monthly SAR (🟢) | FTE / Contractor (🟢) | Hiring trigger (🟢) |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Also answer:
- **C-ramp:** monthly productivity ramp for each sales/CS hire? 📊 enterprise Q1 0% / Q2 25% / Q3 50% / Q4 100% (full productivity 6–9mo).
- **C-attrition:** annual attrition + replacement-hire lag? 📊 20–25%/yr; ~2mo sourcing lag.
- **C-Nitaqat:** planned # Saudi vs expat, and your CR economic-activity code? 📊 **verify your exact Saudization quota on the Qiwa platform** (sector-specific; do not hard-code 30%).
- **C-salary refs (📊, KSA/Riyadh, guidance only):** Eng junior SAR 8–12k / mid 13–20k / senior 21–32k (AI/cloud +20–40%); CSM SAR 9–23k; AE SAR 12–20k base + ~1.5–2× OTE. Expats typically +25%.

## D. Payroll-burden rates (confirm, or adopt the Part 3 reference)
| # | Question | Your answer (🟢) | Reference (📊, see Part 3) |
|---|---|---|---|
| D1 | GOSI cohort per Saudi hire (existing vs new-regime) + employer rate used? |  | 📊 existing 11.75%; **new hires (post-3 Jul 2024) 12.25% FY25–26 → 13.75% by 2028**; expat 2% |
| D2 | EOSB accrual base (basic only vs basic + fixed allowances)? |  | 📊 ≈4.17%/mo of last wage (yrs 1–5); legal base = "actual wage" incl. fixed allowances |
| D3 | Medical insurance per employee/year (SAR)? |  | 📊 startup group plan ~SAR 3,000–5,000/employee/yr |
| D4 | # expats + # dependents (work-permit levy + dependent fee)? |  | 📊 levy SAR 700/mo (expats ≤ Saudis) or 800 (expats > Saudis); dependent SAR 400/mo |
| D5 | Comp structure (basic/housing/transport split)? |  | 📊 ~60% / 25% / 15% (housing+basic in GOSI base) |

## E. Pricing, packaging & ACV (one row per package)
| Package | ARR/ACV SAR (🟢) | Implementation fee SAR (🟢) | Target mix % (🟢) |
|---|---|---|---|
| Starter |  |  |  |
| Growth |  |  |  |
| Enterprise |  |  |  |

Also: **pilot price** + **pilot duration** + **pilot→paid conversion %** (📊 50–70%, bear 35% — unconverted pilot cash is NOT ARR); **annual-prepay discount** (📊 15–20%); discount policy.

## F. Revenue funnel & ramp (drives bookings → cash timing)
- **F1** Funnel stages, per-stage conversion %, and avg days-in-stage? 📊 pipeline coverage 3–7×; B2B win rate ~19%.
- **F2** Sales-cycle length (days)? 📊 60–180.
- **F3** Founder/rep selling capacity (qualified diagnostics or demos per month)? *(hard ceiling on ramp)*
- **F4** Implementation duration / **go-live lag** (months from close)? *(subscription revenue recognition starts at go-live, not signature)*
- **F5** Implementation capacity (max parallel onboardings)?
- **F6** Time-to-first-value target?

## G. Billing & collections (working capital)
- **G1** Billing-frequency mix % (annual upfront / semi / quarterly / monthly)? 📊 GCC enterprise usually annual-upfront on PO.
- **G2** Payment terms / **DSO** by customer type (days)? 📊 GCC enterprise often net-60/90.
- **G3** % of customers on annual prepay?
- **G4** Implementation-fee collection milestones (% at signing / kickoff / go-live / acceptance)?
- **G5** Revenue leakage / write-off assumption? 📊 1–2% of billed ARR (involuntary churn 5–9%/cycle).

## H. COGS & infrastructure
- **H1** Base cloud cost before customers (SAR/mo)? **H2** Per-customer variable (app/db/**evidence storage**/logs/notifications/security)? 📊 use the repo's per-customer SAR ranges.
- **H3** AI/API monthly cap + per-customer usage? **H4** Support tooling? **H5** Per-customer implementation delivery cost (loaded CS hours × rate)?

## I. One-time / setup costs (front-loaded)
| Item | SAR (🟢) | Month (🟢) | Reference (📊) |
|---|---|---|---|
| Entity / CR / bank |  |  | — |
| MISA foreign-investment license (if foreign-owned) |  |  | 📊 Yr1 ~SAR 20–25k; Yr2+ annual service fee ~SAR 60k (**verify with MISA**) |
| Legal templates / bilingual contracts |  |  | — |
| Brand / website |  |  | — |
| Security baseline + pen-test |  |  | — |
| ZATCA e-invoicing integration |  |  | 📊 one-time ~SAR 5–30k |
| Accounting setup + equipment |  |  | — |

## J. Tax & regulatory (confirm treatment + timing — see Part 3)
- **J1** Zakat vs CIT vs mixed (from A7)? Model **Zakat on net assets even pre-revenue**? 📊 yes — 2.5% on net-asset floor, owed even at a loss (Saudi/GCC-owned share).
- **J2** VAT registration month + filing cadence? 📊 register at SAR 375k turnover; quarterly if ≤ SAR 40M (else monthly); remit within 30 days of period-end.
- **J3** List top foreign SaaS/AI/contractor vendors + WHT classification (royalty 15% vs technical service 5%)? 📊 ZATCA tends to treat SaaS/API as **royalty 15%** — *disputed; model conservatively at 15% and verify.*
- **J4** ZATCA Fatoorah Phase-2 wave/deadline applicable? 📊 Wave 24 (> SAR 375k) → ~30 Jun 2026 API integration.
- **J5** Include the draft Income-Tax-Law scenario (services WHT 5%→10%) as a downside flag? 📊 not enacted as of mid-2026.

## K. Churn, retention & expansion
- **K1** Logo churn / GRR? 📊 pre-seed 85–90%. **K2** NRR target + expansion start (months post-go-live)? 📊 NRR 95–105% at pre-seed; lock expansion to 0 until ~9–12mo post-go-live. **K3** Customer-concentration flag if any logo > 30% of ARR?

## L. Scenarios & sensitivity
- **L1** Define Base / Downside / Upside deltas (ramp, ACV & mix, sales cycle, conversion, pilot→paid, collection/DSO, hiring pace, churn, gross margin).
- **L2** Survival/floor scenario (founder-only, hiring frozen — minimum viable burn)?
- **L3** Raise-slip stress (months)? 📊 MENA raise process 6–9 months.
- **L4** Your top 2–3 sensitivity drivers? **L5** (optional) Min/Mode/Max per key driver for a **probabilistic (Monte-Carlo) runway** view.

## M. Decision gates & triggers
- **M1** Hiring triggers (pipeline/activation thresholds per role)? **M2** Cash-trigger RAG thresholds + pre-committed SAR cut levers? 📊 >9mo green / 6–9 amber / <6 red. **M3** Next-raise trigger month? 📊 start at 9–12mo runway remaining. **M4** Treasury policy (idle cash in Murabaha deposits? bank diversification)? 📊 ~4.5–5.5% SIBOR-linked; no FDIC-equivalent — diversify ≥2 banks; never co-mingle VAT cash.

## N. Fundraising & capital structure
- **N1** Raise-size logic (milestone runway + buffer)? **N2** Expected valuation/dilution? 📊 GCC pre-seed 10–15% dilution. **N3** Existing SAFEs (amount/cap/discount) for a **cap-table/SAFE-stack tracker**? **N4** Non-dilutive applications — amounts only if confirmed, else `🔴` (📊 Kafalah = loan *guarantee*; SVC/Jada = fund-of-funds accessed *via* VCs; TAQADAM = non-dilutive grant ~$40–140k; NTDP grants; Islamic Murabaha/Musharaka). **N5** Use-of-funds priorities?

---

# PART 3 — KSA/GCC REGULATORY REFERENCE (cited, dated — model these, flag "verify")

External, cited figures (as of 2025/2026) offered as guidance for Parts D/I/J. Facts to confirm, not invented company data. **Verify current rates before filing.**

| Item | Reference figure | As-of / source | Confidence |
|---|---|---|---|
| VAT | 15%; register at SAR 375k; quarterly filing if ≤ SAR 40M turnover (else monthly); remit ≤30d after period | 2025 · ZATCA | High |
| GOSI — Saudi (existing) | Employer 11.75% (9% pension + 2% occ-hazard + 0.75% SANED), base = basic+housing, cap SAR 45k | Jul 2025 · ZenHR/Fragomen | High |
| GOSI — Saudi (new, post-3 Jul 2024) | Employer **12.25%** (FY25–26) → 12.75 → 13.25 → **13.75% (Jul 2028)** | Jul 2025 · CRS/Oracle/Saudi Gazette | High |
| GOSI — Expat | Employer **2%** only (occ-hazard); employee 0% | 2025 · SaudiHR | High |
| EOSB | ½-mo last wage/yr (yrs 1–5), 1 mo/yr after; **accrue ~4.17%/mo**; resignation cuts (<2y 0%, 2–5y ⅓, 5–10y ⅔, 10y+/employer-term 100%) | 2025 · Art.84 Labor Law | High (base disputed → verify) |
| Nitaqat | Sector/size-based quota; **verify your activity code on Qiwa** | 2025 · HRSD/Qiwa | Med (sector-specific) |
| Expat work-permit levy | SAR 700/mo (expats ≤ Saudis) or SAR 800/mo (expats > Saudis); ≥3-mo billing; first 90d exempt | 2025 · Soul of Saudi | High |
| Dependent fee | SAR 400/mo per expat dependent | 2025 | High |
| Medical insurance (CCHI) | ~SAR 3,000–5,000/employee/yr (startup group plan) | 2025 · CCHI | Med (plan-dependent) |
| WPS | Salaries via approved channels, upload by ~Day 10; penalties escalate → keep ≥1-mo payroll buffer | 2025 · Mudad/MHRSD | High |
| Zakat | 2.5% of Zakat base; **Apr-2024 regs floor base at net assets → owed even pre-revenue**; file ≤120d after FY-end | Apr 2024 · PwC/EY/Dhruva | High |
| CIT (foreign-owned) | 20% of net adjusted profit; losses carry forward | 2025 · PwC | High |
| WHT | Royalties 15%; technical/consulting services 5%; management fees 20%; others 15%; due by 10th of next month; **foreign SaaS/AI often classed as royalty 15% (disputed)** | 2024–25 · PwC/DLA Piper | High (rates) / Med (SaaS class) |
| ZATCA e-invoicing | Phase-2 Wave 24 (> SAR 375k) → integrate by ~30 Jun 2026 | 2025 · ZATCA/EY | High |
| MISA license (if foreign-owned) | Yr1 ~SAR 20–25k; Yr2+ annual service fee ~SAR 60k | Mar 2025 · MISA Guide | Med (**verify**) |
| RHQ 0% CIT/WHT (30y) | MNCs with ≥2 foreign markets only — **not** applicable to native pre-seed | 2024 · KPMG/EY | High |
| Draft Income-Tax-Law | Proposes services WHT 5%→10% — **not enacted** (model as scenario flag); tax amnesty to 30 Jun 2026 | mid-2026 · EY/KPMG | High (status) |
| FX | USD/SAR peg ~3.75 → USD cloud/AI/tooling stable in SAR | 2025 · SAMA | High |

---

# PART 4 — MODEL PILLARS & ADVANCED COMPUTATIONS

## 4A — The 13 Pillars (cover ALL; expose each key driver as an editable lever and show how it moves runway)

1. **Revenue Engine (funnel-to-cash).** Build bottom-up through the enterprise funnel (targets → outreach → meetings → qualified opps → diagnostics → demos → paid pilots → closed-won → activated) — never "X customers/month." Levers: per-stage conversion, sales-cycle lag, pilot price/duration/conversion, founder/rep selling capacity (hard ceiling), time-to-first-value, implementation capacity.
2. **Cash Timing & Working Capital (the #1 overlooked runway lever).** Billing-mix cash impact, DSO/collection lag, implementation-fee milestone collection, deferred-revenue build, VAT collected-vs-remitted timing, AP/vendor terms, commission timing. Show the cash-vs-revenue gap explicitly.
3. **People & Payroll (usually 60–80% of pre-seed burn).** Gate-based hiring tied to triggers; **fully-loaded** cost (GOSI two-rate, EOSB accrual, medical, allowances, expat levy/dependent); founder salary + deferral; new-hire ramp; contractor vs FTE; severance/wind-down.
4. **COGS, Gross Margin & Unit Economics.** Base cloud + per-customer variable (incl. growing evidence storage) + capped AI/API + support + per-customer implementation delivery cost. Compute contribution margin, blended vs new-cohort gross margin, implementation margin by cohort.
5. **One-Time / Setup / Capex-like Costs.** Entity/CR/MISA, bank, bilingual legal, brand/website, security+pen-test, e-invoicing & accounting setup, equipment — separated from recurring so run-rate isn't distorted.
6. **Tax, Regulatory & Compliance.** Treat VAT, GOSI, EOSB, Zakat/CIT, WHT, Nitaqat levies, ZATCA, MISA as explicit cash lines with correct timing (per Part 3) — not an afterthought.
7. **Burn, Runway & Capital Efficiency.** Gross/net/net-cash burn; forward-3-mo net burn; runway each month; cash-out & buffer-breach months; default-alive/dependent; burn multiple; ARR per SAR burned; runway-to-milestone vs runway-to-zero.
8. **Fundraising & Capital Structure.** Milestone-based raise sizing + buffer; tranche timing; use-of-funds; instrument/dilution; SAFE-stack; non-dilutive options; raise-slip stress.
9. **Scenarios, Sensitivity & Triggers.** Base/Downside/Upside + survival + raise-slip; tornado; break-even; pre-committed if/then triggers (see Part 4B / Part 5).
10. **Financial-Statement Integrity & Reconciliation.** bookings→billings→revenue→cash waterfall; ARR bridge; deferred-rev/AR/AP/VAT/EOSB roll-forwards; three-statement-lite (cash flow + accrual P&L + key BS items); ending cash reconciles; **classify every cost fixed / variable / step**.
11. **Decision Gates & Management Levers.** Hiring/GTM/integration/fundraising gates; a **deferrability matrix** (protect / defer / cut-first); a cash-trigger freeze list.
12. **Proof / Milestone Linkage (the spine).** Tie each phase's burn to the proof it buys (problem / buyer / product / WTP / activation / implementation / GTM / finance / investor) and to the pre-seed proof score (0–5). Every major cost answers "what proof does this buy?"
13. **Churn, Retention & Concentration Risk.** Logo churn / pilot non-conversion, GRR/NRR, expansion paths, and customer-concentration fragility (one/two logos = most ARR).

## 4B — Advanced computations the engine must perform (operationalizing the pillars; all from founder inputs, never invented)

1. **Ramped-Rep-Equivalent (RRE):** effective capacity = Σ(rep quota × ramp%(months since hire)); apply attrition + replacement lag; pipeline creation is *gated* by ramped capacity (headcount ≠ capacity).
2. **Pipeline waterfall with stage lags:** opps → stage-weighted conversion → bookings by close month → cash by DSO.
3. **Per-deal cohort/vintage build:** subscription revenue starts at **go-live (= close + implementation duration)**, not signature; expansion locked to 0 until ~9–12mo post-go-live; founder-sold vs AE-sold cohorts may differ.
4. **IFRS 15 / SOCPA multi-element rev-rec:** split each contract into POBs (subscription, *distinct vs non-distinct* implementation, pilot, services) by standalone-selling-price; recognize each appropriately.
5. **Pilots as a separate stream:** pilot cash recognized over pilot period; only converted pilots feed ARR; unconverted-pilot cash tracked separately (≠ ARR/LTV).
6. **bookings → billings → recognized revenue → cash** waterfall (4 distinct lines) + ARR bridge + **deferred-revenue waterfall**; flag the "false-runway" gap from annual prepay.
7. **Fully-loaded payroll schedule** per employee: gross + GOSI (two-rate per Part 3) + EOSB monthly accrual + medical + allowances + (expat) levy/dependent; ramp; **EOSB is a non-cash accrual** (add-back in cash flow until paid).
8. **Working-capital lines:** DSO/AR roll-forward, AP, **VAT float** (collected vs remitted, input/reverse-charge), **WHT** on foreign vendors, **Zakat-on-net-assets** (even pre-revenue), revenue leakage.
9. **Burn & cash:** gross burn; net burn; net cash burn (incl. VAT/WHT/Zakat); monthly **direct-method cash flow**; near-term **13-week** weekly cash view (surface WPS Day-10 + VAT-remit crunches).
10. **Runway & default-alive (compounding):** runway = cash ÷ forward-3-mo net burn; cash-out & buffer-breach months; project revenue forward at modeled MoM growth and report default-alive/dead AND the **minimum MoM growth** needed to flip to alive.
11. **Burn multiple** (rolling 3-mo net burn ÷ net new ARR) with thresholds (<1 amazing / 1–1.5 great / 1.5–2 good / >2 suspect / >3 bad; note pre-seed/GCC tolerance ~2.5–3.4×), AND as a **forward hiring gate** (each proposed hire must pass a marginal burn-multiple test).
12. **Probabilistic runway (Monte-Carlo):** if L5 ranges given, resample key drivers (triangular Min/Mode/Max) → P10/P50/P90 cash-out month; else two-point (P10/P90) proxy.
13. **Round-sizing:** raise = (milestone runway × avg burn) + (6-mo raise-process buffer × burn) + reserve; **next-raise trigger** at 9–12mo runway remaining (MENA process 6–9mo).
14. **GCC valuation & dilution + SAFE-stack tracker:** model post-money SAFE conversion + cumulative dilution; flag founders <60% pre-Series-A.
15. **Non-dilutive integration:** Kafalah-backed debt as a liability w/ repayments; TAQADAM/NTDP grants as grant income; keep separate from equity; don't imply SVC/Jada are direct.
16. **Investor-diligence dashboard (RAG):** CAC payback (gross profit), LTV:CAC, burn multiple, NRR/GRR, gross & implementation margin, revenue concentration — vs thresholds (red flags: CAC payback >18mo, LTV:CAC <3, burn >2×, NRR <100%, concentration >30%, linear revenue).
17. **Decision-trigger dashboard (RAG):** live runway → pre-committed SAR cut levers per band (>9 green / 6–9 amber / <6 red); **treasury** (idle cash in Murabaha, bank diversification, never co-mingle VAT) with a small yield line.
18. **Model governance (FAST):** inputs only in the Assumptions Register; **check-cells** (cash ties, BS balances, deferred-rev ties to liability, VAT reconciliation, EOSB roll-forward) that flag if broken; explicit sign conventions; version stamp.
19. **Rolling + actuals-ready:** plan-vs-actual columns and a flux note for any >10% variance, feeding the monthly CFO review and a monthly investor-update / board-pack output.
20. **Scenario & sensitivity:** Base/Downside/Upside + survival + raise-slip; tornado on top drivers; break-even (what ramp/ACV/collection reaches the seed milestone within runway).
21. **Cost-behavior & deferrability:** classify every cost fixed/variable/step; maintain a protect/defer/cut-first matrix wired to the cash-trigger freeze list.

---

# PART 5 — OUTPUT (CFO / board narrative + dashboards)

1. **Executive summary** — 12-mo gross/net burn, peak-burn month, min ending cash, cash-out month (unfunded), recommended raise + buffer, default-alive verdict, top risks, one-line recommendation.
2. **Founder inputs confirmed** — 🟢 values used + every 🔴 INPUT REQUIRED.
3. **Assumptions Register** — every input: tier, source (if adopted from 📊), confidence, driver flag, runway impact.
4. **Revenue engine** — funnel/RRE → bookings/billings/revenue/cash waterfall + ARR & deferred-revenue bridges.
5. **Cost & headcount** — fully-loaded payroll; burn by function / behavior (fixed/variable/step) / phase; one-time vs recurring.
6. **Working capital & cash flow** — monthly direct cash flow + 13-week view + DSO/AR/AP/VAT/WHT/Zakat/EOSB roll-forwards.
7. **Burn & runway** — monthly burn + runway; default-alive (compounding) + min-growth breakeven; buffer-breach & cash-out months.
8. **Scenarios & sensitivity** — Base/Downside/Upside + survival + raise-slip; tornado + break-even; Monte-Carlo P10/P50/P90 (if ranges given).
9. **Funding need & use of funds** — milestone-based raise sizing; GCC dilution + SAFE-stack; non-dilutive options; next-raise trigger month.
10. **Unit economics & KPIs** — CAC, CAC payback (gross profit), burn multiple, gross/implementation margin, NRR/GRR — with pre-seed caveats; investor-diligence RAG dashboard.
11. **Risks, red flags & decision gates** — concentration, DSO, pilot-conversion, services drag, Nitaqat/WPS, WHT/Zakat exposure; hiring/GTM/integration/fundraising gates + deferrability matrix + cash-trigger freeze list.
12. **Recommendations & monthly action plan** — hire/delay/cut/protect; decisions by M3/M6/M12; weekly-watch vs monthly-watch metrics; each phase's burn linked to the proof it buys.
13. **Open questions & data gaps** — every 🔴 item ranked by impact on the conclusion + every "verify" regulatory item.

---

# PART 6 — FINAL SELF-CHECK (must pass before returning)

- [ ] No invented numbers; every figure is 🟢 (founder) or 📊 (cited, explicitly adopted) or 🔴 (placeholder).
- [ ] Starting cash & raise are founder inputs; blanks are 🔴, not guessed.
- [ ] Assumptions Register lists EVERY input with tier, source, confidence, driver flag.
- [ ] All 13 pillars covered; key drivers exposed as editable levers with runway impact shown.
- [ ] Revenue built via RRE + pipeline lag + per-deal cohort with go-live lag; IFRS 15 POB split applied; pilots separated; bookings/billings/revenue/cash distinct; VAT never revenue.
- [ ] Payroll fully loaded (GOSI two-rate, EOSB accrual, medical, levy/dependent, ramp); EOSB treated as non-cash accrual; costs classified fixed/variable/step; one-time vs recurring separated.
- [ ] Working capital modeled (DSO, deferred rev, AP, VAT float, WHT, Zakat-on-net-assets); ending cash reconciles; FAST check-cells present.
- [ ] Runway uses forward burn; default-alive computed as a compounding test with min-growth breakeven; cash-out & buffer-breach months identified; 13-week view includes WPS Day-10.
- [ ] Burn multiple computed + used as a hiring gate; Monte-Carlo P10/P50/P90 if ranges given.
- [ ] Funding need = milestone runway + buffer; next-raise trigger at 9–12mo; GCC dilution + SAFE-stack; non-dilutive mechanics correct (Kafalah=guarantee, SVC/Jada=FoF, TAQADAM=grant).
- [ ] 3 scenarios + survival + raise-slip + sensitivity/tornado + break-even, internally consistent.
- [ ] Scoped to 12 months; mapped to repo phases; KSA rates from Part 3 flagged "verify"; each phase's burn linked to pre-seed proof.

---

# PART 7 — FORMULAS, BUILD SCAFFOLD & OPERATING DISCIPLINE
*(merged from the prior 18-month burn-rate model builder, scoped to 12 months — this prompt is now the single source of truth; no separate burn-rate doc remains)*

## 7A — Core formulas (use these exact definitions)

```text
Gross Burn = Product/R&D + GTM + CS/Implementation + COGS + G&A/Compliance

Net Burn  = Gross Burn − Customer Cash Receipts

Net Cash Burn = Gross Burn + VAT Remitted + WHT/Tax/Zakat Paid
              − Customer Cash Receipts (excl VAT) − VAT Collected
              (track VAT, WHT and Zakat liabilities separately)

Ending Cash = Opening Cash + Financing Inflow + Customer Cash Receipts + VAT Collected
            − Gross Burn − VAT Remitted − WHT/Tax/Zakat Paid

Forward 3-Month Avg Net Burn = Average(Net Burn M+1, M+2, M+3)
Runway (months)              = Ending Cash ÷ Forward 3-Month Avg Net Burn

Target Minimum Cash Buffer = Forward 3-Month Avg Net Burn × Buffer Months   (3 aggressive / 4 normal / 6 conservative)
Funding Need               = MAX(0, Target Minimum Cash Buffer − Minimum Ending Cash)

Burn Multiple = Net Burn ÷ Net New ARR        (use trailing-3-month / quarterly, not single months)

CAC                               = Sales & Marketing Spend ÷ New Customers
CAC per ARR                       = Sales & Marketing Spend ÷ New ARR
Monthly Gross Profit per Customer = ARPA × Gross Margin ÷ 12
CAC Payback (months)              = CAC ÷ Monthly Gross Profit per Customer

Ending ARR = Beginning ARR + New ARR + Expansion ARR − Churned ARR − Contraction ARR

Customer Cash Receipts = Annual Upfront + Monthly Subscription + Implementation Fee + Professional Services collections

Deferred Revenue = Subscription Cash Collected − Subscription Revenue Recognized
```

## 7B — Build scaffold (tabs, if rendered to Excel/Google Sheets)
`01_Control_Panel` (scenario switches, key assumptions, start date, currency) · `02_Assumptions` · `03_Product_Roadmap` · `04_Headcount` · `05_Payroll_Burden` (GOSI/EOSB/benefits/founder deferral) · `06_Cloud_AI_COGS` · `07_GTM_Burn` · `08_Implementation_CS` · `09_GA_Compliance` (legal/accounting/Saudi) · `10_Revenue_Cash` (ARR/MRR/bookings/receipts/deferred) · `11_VAT_WHT_Working_Capital` · `12_Burn_Model` (gross/net/ending cash/runway) · `13_SaaS_KPIs` · `14_Scenarios` · `15_Decision_Gates` · `16_Management_Summary`.

## 7C — Phase-based burn architecture (12 months)
| Phase | Months | Cost emphasis | Do NOT overspend on | Gate to pass before advancing |
|---|---|---|---|---|
| Foundation | M1–3 | R&D high; GTM low–med; G&A med; COGS/CS low | paid ads, PR, full sales team, full ERP, SOC 2, enterprise custom work | Founder can clearly state who buys, why, the urgent pain, a credible price, and what blocks purchase |
| Pilot | M4–6 | R&D high; GTM med; CS med; G&A med | multi-country, big sales hiring, heavy custom integrations | ≥1 real pilot/paid customer, working claim workflow, buyers understand the problem, implementation playbook drafted |
| Activation | M7–9 | CS high; R&D & GTM med–high; COGS med | multiple salespeople before proof | founder has closed/near-closed deals, pipeline > founder capacity, narrative repeatable, implementation not breaking |
| Commercial Hardening | M10–12 | GTM high; CS high; R&D med; G&A med–high | unsupported vertical expansion, custom-heavy deals, AI without willingness-to-pay | by M12 know actual ACV, implementation hours/customer, early gross margin, activation rate, sales cycle, CAC trend, strongest segment |

## 7D — Cost-behavior classification (classify every cost: fixed / variable / step)
| Cost | Fixed | Variable | Step | Notes |
|---|---|---|---|---|
| Founder salary | Yes | No | No | Can be deferred |
| Engineers | Yes | No | Step | Hired by roadmap |
| Cloud base | Yes | No | No | Minimum platform cost |
| Cloud usage | No | Yes | No | Scales with customers |
| AI/API | No | Yes | No | Usage cap required |
| Sales salaries | Yes | No | Step | Hire only after pipeline proof |
| Commissions | No | Yes | No | Tie to cash collected |
| Implementation labor | No | Yes | Step | Scales with customers |
| CSM | No | No | Step | Hire by customer capacity |
| Legal setup | One-time | No | No | Front-loaded |
| Legal review | No | Yes | No | Scales with deals |
| Accounting | Fixed | No | Step | More complex with revenue |
| Events | No | Yes | No | Discretionary |
| Office | Fixed | No | Step | Defer if possible |

## 7E — Deferrability matrix (protect / defer / cut-first)
| Cost | Protect | Defer | Cut first | Why |
|---|---|---|---|---|
| Core engineering (claim ledger) | Yes | No | No | Strategic IP |
| Attribution workflow | Yes | No | No | Core value |
| Audit log | Yes | No | No | Finance/legal trust |
| Payout-preview basic logic | Yes | Maybe | No | CFO relevance |
| Full ERP integration | No | Yes | Yes | Too early |
| Advanced AI | No | Yes | Yes | Needs data first |
| Large paid ads | No | Yes | Yes | Weak until message proven |
| Big event sponsorship | No | Yes | Yes | High cost, uncertain ROI |
| CS for first customers | Yes | No | No | Protect activation |
| Implementation quality | Yes | No | No | Protect references |
| Founder-led sales | Yes | No | No | Highest learning rate |
| PR agency | No | Yes | Yes | Defer before proof |
| Large office | No | Yes | Yes | Not core early |

## 7F — Practical decision rules
1. Don't scale GTM before activation proof. 2. Don't build integrations before repeatable, paid, ACV-tied demand. 3. Don't undercharge implementation (free implementation hides COGS). 4. Don't confuse ARR with cash (runway depends on collection timing). 5. Don't count VAT as revenue. 6. Don't hire sales before founder-led learning. 7. Don't overbuild AI before clean data. 8. Protect customer success (references, renewals, expansion). 9. Manage burn by gates, not emotion — every hire or major spend needs a measurable trigger.

## 7G — Monthly CFO review questions (answer every month)
1. What did we burn this month? 2. What did the burn produce? 3. Did we hit product milestones? 4. Did we create qualified pipeline? 5. Did pipeline convert? 6. Did customers pay cash? 7. Did customers activate? 8. Did implementation cost exceed plan? 9. Did COGS grow faster than revenue? 10. Did GTM spend improve efficiency? 11. Are we hiring ahead of proof? 12. Which costs should be cut or delayed? 13. What is current runway? 14. What is runway after committed hires? 15. What decision must be made before next month?

## 7H — Pre-use audit checklist (before trusting the model)
- [ ] All assumptions are editable (in the Assumptions Register)
- [ ] Revenue and cash are separated; bookings ≠ billings ≠ revenue ≠ cash
- [ ] VAT is not counted as revenue
- [ ] Payroll burden (GOSI/EOSB/insurance/levies) is separate from gross salary
- [ ] Founder salary deferral is explicit
- [ ] Implementation cost is not hidden (sits in COGS, not CAC)
- [ ] AI/API has a usage cap
- [ ] Cloud cost has base and variable components
- [ ] GTM spend has gates; sales hiring has pipeline triggers; CS hiring has capacity triggers
- [ ] Integrations are deferred unless paid/repeatable
- [ ] Monthly ending cash and runway are shown; ending cash reconciles
- [ ] Funding need includes buffer; next-raise trigger set at 9–12 months
- [ ] Scenario cases (Base/Downside/Upside + survival + raise-slip) are included
- [ ] Deferrable costs are identified; cash-trigger freeze list exists
- [ ] Monthly CFO questions (7G) are answered
- [ ] No invented numbers — every figure is 🟢 / 📊 / 🔴
