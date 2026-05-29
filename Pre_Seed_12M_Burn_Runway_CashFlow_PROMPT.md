# Partner Revenue OS — Pre-Seed 12-Month Burn, Runway & Cash-Flow Model
## Questionnaire-Driven AI Prompt (CFO / Board-Ready · No-Hallucination · KSA/GCC-Calibrated)

---

## What this is

A self-contained, **questionnaire-driven** prompt you hand to a capable AI (with this repo) to build an
**end-to-end 12-month pre-seed Burn, Runway & Cash-Flow analysis** for Partner Revenue OS, delivered as a
**CFO / board-ready narrative**. The AI builds the model **only from your answers** to the questionnaire in
Part 2 — it never invents your financial numbers.

## How to use it

1. Hand the AI this entire file (plus the repo).
2. Answer the **Founder Questionnaire (Part 2)** — fill values inline, or let the AI walk you through it question by question.
3. The AI builds the model from your answers, computing the advanced levers in **Part 4**.
4. Anything you leave blank becomes a visible `🔴 [INPUT REQUIRED]` placeholder — the model runs symbolically around it.
5. The **📊 reference ranges** beside questions are *cited external benchmarks for guidance only* — they are NOT written into your model unless you explicitly adopt them.

## Non-negotiable rules (read first)

- **NEVER invent or hallucinate a financial figure.** No value is entered into the model unless (a) you provided it, or (b) you explicitly adopted a cited reference. Otherwise → `🔴 [INPUT REQUIRED]`.
- **Three input tiers, flag every number:** `🟢 FOUNDER INPUT` (your answer) · `📊 REFERENCE` (cited benchmark, guidance only) · `🔴 INPUT REQUIRED` (unanswered placeholder).
- **Benchmark ≠ fact, and ≠ your number.** A cited range may inform your answer; it is never silently used as your value.
- **Keep four things distinct:** bookings ≠ billings (invoiced) ≠ recognized revenue ≠ cash collected. **VAT is working capital, never revenue.**
- **Currency: SAR.** USD-denominated costs convert at the USD/SAR peg (~3.75 — `🟢` confirm).
- **Regulatory rates** in Part 3 are cited and dated, but **must be verified** before filing — model them, flag them "verify."
- Maintain a single **Assumptions Register** listing every input, its tier, source (if adopted from reference), confidence, and whether it is a runway driver — so you can edit later.

---

# PART 1 — INSTRUCTIONS TO THE AI

You are a hybrid **startup CFO + pre-seed VC investment associate** fluent in **KSA/GCC B2B SaaS** finance, FP&A, fundraising, and Saudi tax/labor regulation.

**Procedure:**
1. Present the **Part 2 questionnaire** to the founder (or use the answers already filled in).
2. Build the model **bottom-up, driver-based, monthly (M1–M12)** using ONLY founder answers + any reference values they explicitly adopt.
3. Compute every lever/pillar in **Part 4**. Where an input is missing, insert `🔴 [INPUT REQUIRED]` and continue symbolically — do not fabricate.
4. Produce the **Part 5 output** (CFO/board narrative + dashboards), and pass the **Part 6 self-check**.
5. Treat Part 3 (KSA reference) as cited guidance the founder confirms — never as invented company data.

Apply both lenses throughout: **venture/runway** (default-alive, burn multiple, milestone-based raise sizing, capital efficiency) and **FP&A/budgeting** (driver-based build, cost-behavior, working capital, scenario + sensitivity, actuals-ready).

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

These are external, cited figures (as of 2025/2026) offered as guidance for Parts D/I/J. They are facts to confirm, not invented company data. **Verify current rates before filing.**

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

# PART 4 — ADVANCED LEVERS THE MODEL MUST COMPUTE (the analytical engine)

Build each of these from the founder's answers (never invented). Expose key drivers as editable levers and show their runway impact.

**Revenue & cash engine**
1. **Ramped-Rep-Equivalent (RRE) capacity:** effective capacity = Σ(rep quota × ramp%(months since hire)); apply attrition + replacement lag. Pipeline creation is *gated* by ramped capacity; headcount ≠ capacity.
2. **Pipeline waterfall with stage lags:** opps → stage-weighted conversion → bookings by close month → cash by DSO. Coverage and win-rate are inputs.
3. **Per-deal cohort/vintage build:** subscription revenue starts at **go-live (= close + implementation duration)**, not signature; expansion locked to 0 until ~9–12mo post-go-live; founder-sold vs AE-sold cohorts can differ.
4. **IFRS 15 / SOCPA multi-element rev-rec:** split each contract into POBs (subscription, *distinct vs non-distinct* implementation, pilot, services) by standalone-selling-price; recognize each appropriately.
5. **Pilots as a separate stream:** pilot cash recognized over pilot period; only converted pilots feed ARR; track unconverted-pilot cash separately (≠ ARR/LTV).
6. **bookings → billings → recognized revenue → cash** waterfall (4 distinct lines) + ARR bridge + **deferred-revenue waterfall**; flag the "false-runway" gap from annual prepay.

**Cost & working capital**
7. **Fully-loaded payroll schedule:** per employee — gross + GOSI (two-rate regime per Part 3) + EOSB monthly accrual + medical + allowances + (expat) levy/dependent; new-hire ramp; **EOSB is a non-cash accrual** (add-back in cash flow until paid).
8. **Working-capital lines:** DSO/AR roll-forward, AP, **VAT float** (collected vs remitted, input/reverse-charge), **WHT** on foreign vendors, **Zakat-on-net-assets** (even pre-revenue), revenue leakage.
9. **One-time vs recurring** separated so run-rate isn't distorted.

**Burn, runway & capital efficiency**
10. Gross burn; net burn; **net cash burn** (incl. VAT/WHT/Zakat); monthly **direct-method cash flow**; near-term **13-week** weekly cash view (surface WPS Day-10 + VAT-remit crunches).
11. Runway each month = cash ÷ forward-3-mo net burn; **cash-out month**; **buffer-breach month**.
12. **Default-alive test (compounding):** project revenue forward at the modeled MoM growth; report default-alive/dead AND the **minimum MoM growth** needed to flip to alive on current cash.
13. **Burn multiple** (rolling 3-mo net burn ÷ net new ARR) with thresholds (<1 amazing / 1–1.5 great / 1.5–2 good / >2 suspect / >3 bad; note pre-seed/GCC tolerance ~2.5–3.4×), AND as a **forward hiring gate** (each proposed hire must pass a marginal burn-multiple test).
14. **Probabilistic runway (Monte-Carlo):** if L5 ranges given, resample key drivers (triangular Min/Mode/Max) → report P10/P50/P90 cash-out month; else state two-point (P10/P90) proxy.

**Fundraising & governance**
15. **Round-sizing:** raise = (milestone runway × avg burn) + (6-mo raise-process buffer × burn) + reserve; **next-raise trigger** at 9–12mo runway remaining (MENA process 6–9mo).
16. **GCC valuation & dilution + SAFE-stack tracker:** model post-money SAFE conversion + cumulative dilution; flag founders <60% pre-Series-A.
17. **Non-dilutive integration:** model Kafalah-backed debt as a liability w/ repayments; TAQADAM/NTDP grants as grant income; keep separate from equity. Don't imply SVC/Jada are direct.
18. **Investor-diligence dashboard (RAG):** CAC payback (on gross profit), LTV:CAC, burn multiple, NRR/GRR, gross & implementation margin, revenue concentration — red/amber/green vs thresholds (red flags: CAC payback >18mo, LTV:CAC <3, burn >2×, NRR <100%, concentration >30%, linear revenue).
19. **Decision-trigger dashboard (RAG):** live runway → pre-committed SAR cut levers per band; **treasury** (idle cash in Murabaha, bank diversification, never co-mingle VAT) with a small yield line.
20. **Model governance (FAST):** inputs only in the Assumptions Register; **check-cells** (cash ties, BS balances, deferred-rev ties to liability, VAT reconciliation, EOSB roll-forward) that flag if broken; explicit sign conventions; version stamp.
21. **Rolling + actuals-ready:** plan-vs-actual columns and a flux note for any >10% variance, so the model feeds the monthly CFO review and a monthly investor-update / board-pack output.

---

# PART 5 — OUTPUT (CFO / board narrative + dashboards)

1. **Executive summary** — 12-mo gross/net burn, peak-burn month, min ending cash, cash-out month (unfunded), recommended raise + buffer, default-alive verdict, top risks, one-line recommendation.
2. **Founder inputs confirmed** — 🟢 values used + every 🔴 INPUT REQUIRED.
3. **Assumptions Register** — every input: tier, source (if adopted from 📊), confidence, driver flag, runway impact.
4. **Revenue engine** — funnel/RRE → bookings/billings/revenue/cash waterfall + ARR & deferred-revenue bridges.
5. **Cost & headcount** — fully-loaded payroll; burn by function / behavior / phase; one-time vs recurring.
6. **Working capital & cash flow** — monthly direct cash flow + 13-week view + DSO/AR/AP/VAT/WHT/Zakat/EOSB roll-forwards.
7. **Burn & runway** — monthly burn + runway; default-alive (compounding) + min-growth breakeven; buffer-breach & cash-out months.
8. **Scenarios & sensitivity** — Base/Downside/Upside + survival + raise-slip; tornado + break-even; Monte-Carlo P10/P50/P90 (if ranges given).
9. **Funding need & use of funds** — milestone-based raise sizing; GCC dilution + SAFE-stack; non-dilutive options; next-raise trigger month.
10. **Unit economics & KPIs** — CAC, CAC payback (gross profit), burn multiple, gross/implementation margin, NRR/GRR — with pre-seed caveats; investor-diligence RAG dashboard.
11. **Risks, red flags & decision gates** — concentration, DSO, pilot-conversion, services drag, Nitaqat/WPS, WHT/Zakat exposure; hiring/GTM/integration/fundraising gates + cash-trigger freeze list.
12. **Recommendations & monthly action plan** — hire/delay/cut/protect; decisions by M3/M6/M12; weekly-watch vs monthly-watch metrics.
13. **Open questions & data gaps** — every 🔴 item ranked by impact on the conclusion + every "verify" regulatory item.

---

# PART 6 — FINAL SELF-CHECK (must pass before returning)

- [ ] No invented numbers; every figure is 🟢 (founder) or 📊 (cited, explicitly adopted) or 🔴 (placeholder).
- [ ] Starting cash & raise are founder inputs; blanks are 🔴, not guessed.
- [ ] Assumptions Register lists EVERY input with tier, source, confidence, driver flag.
- [ ] Revenue built via RRE + pipeline lag + per-deal cohort with go-live lag; IFRS 15 POB split applied; pilots separated; bookings/billings/revenue/cash distinct; VAT never revenue.
- [ ] Payroll fully loaded (GOSI two-rate, EOSB accrual, medical, levy/dependent, ramp); EOSB treated as non-cash accrual; one-time vs recurring separated.
- [ ] Working capital modeled (DSO, deferred rev, AP, VAT float, WHT, Zakat-on-net-assets); ending cash reconciles; FAST check-cells present.
- [ ] Runway uses forward burn; default-alive computed as a compounding test with min-growth breakeven; cash-out & buffer-breach months identified; 13-week view includes WPS Day-10.
- [ ] Burn multiple computed + used as a hiring gate; Monte-Carlo P10/P50/P90 if ranges given.
- [ ] Funding need = milestone runway + buffer; next-raise trigger at 9–12mo; GCC dilution + SAFE-stack; non-dilutive mechanics correct (Kafalah=guarantee, SVC/Jada=FoF, TAQADAM=grant).
- [ ] 3 scenarios + survival + raise-slip + sensitivity/tornado + break-even, internally consistent.
- [ ] Scoped to 12 months; mapped to repo phases; KSA rates from Part 3 flagged "verify"; each phase's burn linked to pre-seed proof.
