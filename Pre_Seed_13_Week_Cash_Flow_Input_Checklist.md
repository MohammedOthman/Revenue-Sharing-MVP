# Partner Revenue OS — 13-Week Cash-Flow (Near-Term Runway): Founder Input Checklist
## What I still need from you to build the end-to-end 13-week weekly cash forecast · KSA/GCC-calibrated · No-Hallucination

> **Companion to:** `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` (the strategic model builder) and
> `Pre_Seed_12M_Model_Founder_Questionnaire.md` (the 12-month input sheet). This sheet is the **near-term,
> weekly** cut — the **13-Week Cash-Flow Forecast (TWCF)** called for in that prompt (Pillar 2 / computation
> 4B-9: *"near-term 13-week weekly cash view — surface WPS Day-10 + VAT-remit crunches"*). Fill it and I build
> the full weekly model **only from your answers** — nothing is invented.

---

## Why a 13-week forecast needs *different* inputs than the 12-month model

The 12-month model is **strategic** — it forecasts a funnel, ramps reps, and projects ARR. A 13-week forecast
is a **treasury / liquidity** tool: one quarter out, **most of your cash is already committed or known**, not
forecast. So I need **fewer speculative assumptions** but **far more precise weekly timing** of largely-known
events. The whole point is to catch the exact weeks where cash dips below your floor — **WPS payroll Day-10,
VAT remittance, GOSI, a one-time legal bill** — *before* they happen.

**Four streams kept distinct (do not conflate):** bookings ≠ billings (invoiced) ≠ recognized revenue ≠ **cash
collected**. A 13-week forecast tracks **cash collected and cash paid only**. **VAT is working capital, never
revenue.** Currency = **SAR** (USD costs convert at the USD/SAR peg ~3.75 — confirm).

**Three input tiers (every number ends up flagged as one):** 🟢 FOUNDER INPUT · 📊 REFERENCE (cited; used only
if you write `ADOPT`) · 🔴 INPUT REQUIRED (blank → visible placeholder; the model still runs symbolically
around it).

---

## Status: what the repo already gives me (so I will NOT ask you to re-answer these)

| Already available | Source in repo | What I still need from you |
|---|---|---|
| Full model formulas, scaffold, self-check | `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` (Part 7A/7B) | — (machinery is done) |
| KSA statutory rates — VAT 15%, GOSI 11.75%/12.25%, EOSB ~4.17%/mo, WHT 5/15%, Zakat 2.5%, expat levy SAR 700–800, dependent SAR 400, WPS Day-10, FX peg 3.75 | Both files' "Part 3" regulatory table | Just **confirm** which apply to you + the **dates** they hit in the window |
| A real working MVP (Node/Express + PostgreSQL + React/Vite) → a credible **cloud/COGS baseline** to confirm | `revenue-share-platform/` | Confirm your **actual** monthly cloud/AI/tooling bill |
| Phase model — the 13 weeks sit **entirely inside Phase 1 Capture**: no payout execution, no money movement | `ROADMAP_ALIGNMENT_AUDIT.md`, `partner-revenue-os-PDR-v5.md` | — |
| Operating constants — pilot 60–90 days, ICP 20–200 partners, activation scoring | `Large_Enterprise_Client_Onboarding_Manual.md`, `GTM_Operating_Manual.md` | Only matters if a deal closes **and collects** inside 13 weeks |
| Pricing **ranges** (strategy, *not* decided) — Starter $6–12K / Growth $18–40K / Enterprise $50–150K+ ACV; impl. fee 15–30% of Y1 ACV; pilot $5–15K | `Reven_Pricing_*`, `..._Pricing_and_Commercial_Strategy.md` | A **decision**, only if you'll invoice inside the window |

**Bottom line:** the build is 100% ready; your numbers are 0% filled in. The blocking gap is **Tier 1 below.**

---

# TIER 1 — BLOCKING (only you know these; I cannot build a real forecast without them)

### 1A. The anchor
| # | Question | 🟢 Your answer |
|---|---|---|
| T1 | **Cash on hand today** (SAR), and the exact date / start of Week 1? | |
| T2 | Across how many **bank accounts**, and is any cash **ring-fenced** (e.g. VAT collected, a deposit)? | |
| T3 | **Minimum cash floor** you will never breach (SAR)? | |

### 1B. Cash IN over the next 13 weeks (only what you'll actually *collect*)
| # | Question | 🟢 Your answer |
|---|---|---|
| T4 | Any **funding inflow** in the window — pre-seed tranche / SAFE drawdown / grant — **amount + week expected**? | |
| T5 | **Invoices already issued** that you expect to collect in the window — amount + expected week each (apply your real DSO)? | |
| T6 | Any deal/pilot you realistically expect to **sign AND collect cash from** within 13 weeks — amount, week, how confident? | |
| T7 | Any other inflow (refund, deposit return, Murabaha profit, founder loan)? | |

### 1C. Cash OUT over the next 13 weeks — with **exact pay weeks** (this is where the model earns its keep)
| # | Question | 🟢 Your answer |
|---|---|---|
| T8 | **Payroll:** per person — gross SAR/mo, Saudi/expat, and the **WPS pay date** (which week each month)? Include founders. | |
| T9 | **Founder cash salary** actually drawn (vs deferred) — SAR/mo each? | |
| T10 | **Rent / office / coworking** — SAR and which week it's due? | |
| T11 | **Recurring SaaS / tooling / cloud / AI** — total SAR/mo and billing week (confirm the ~MVP cloud baseline)? | |
| T12 | **Contractors / agencies** (dev, design, legal, accounting) — SAR and pay weeks? | |
| T13 | **One-time costs landing in the window** — entity/CR, MISA license, bilingual legal, brand/site, security + pen-test, ZATCA e-invoicing integration, equipment — **amount + week** each? | |

### 1D. Statutory cash events that fall inside the window (timing is everything)
| # | Question | 🟢 Your answer | 📊 Reference (confirm/ADOPT) |
|---|---|---|---|
| T14 | Are you **VAT-registered**? If so, the **VAT remittance date + estimated amount** landing in the window? | | 📊 remit ≤30 days after period-end; quarterly if ≤ SAR 40M turnover |
| T15 | **GOSI** monthly amount + pay week? | | 📊 employer 11.75% existing / 12.25% new-hire Saudi; 2% expat |
| T16 | Any **WHT** due on foreign SaaS/AI/contractor payments in the window (amount + by-10th-of-month timing)? | | 📊 SaaS/API often royalty 15% (disputed); services 5% |
| T17 | **Zakat / CIT** filing or instalment date in the window? | | 📊 Zakat 2.5% on net assets, owed even pre-revenue; file ≤120d after FY-end |
| T18 | **Expat work-permit levy + dependent fees** due in the window? | | 📊 levy SAR 700–800/mo; dependent SAR 400/mo |

---

# TIER 2 — IMPROVES ACCURACY (I can apply a clearly-flagged default if you skip these)

| # | Question | 🟢 Your answer | 📊 Default I'll use if blank |
|---|---|---|---|
| T19 | Comp split (basic / housing / transport) — sets the GOSI base | | basic+housing = GOSI base |
| T20 | GOSI cohort per Saudi hire (existing 11.75% vs new-regime 12.25%) | | new-hire 12.25% |
| T21 | # expats + # dependents on payroll | | 0 unless told |
| T22 | DSO / payment terms on any **outstanding** invoice (T5) | | net-60 (GCC enterprise norm) |
| T23 | Revenue leakage / failed-collection assumption | | 0% near-term |
| T24 | FX confirm (USD/SAR) | | 3.75 |
| T25 | Treasury: idle cash in a Murabaha deposit? earning what? | | none (no yield line) |

---

# TIER 3 — ONLY IF you want the 13-week view to roll up into the full 12-month model / scenarios

(Skip for a pure near-term liquidity forecast. Needed only to nest the quarter inside the strategic model — these come from the **12-month questionnaire** `Pre_Seed_12M_Model_Founder_Questionnaire.md`.)

- Hiring you'll commit to **inside** the quarter (role, start week, gross, Saudi/expat).
- Pricing / ACV / mix **decisions** (from the strategy ranges above) + pilot price/duration + pilot→paid %.
- Sales-cycle length, funnel conversions, go-live lag — for bookings→cash beyond the window.
- Scenario deltas (Base / Downside / Upside), raise-slip stress, raise-size logic + buffer months.

---

# DECISIONS TO CONFIRM (a few yes/no choices that set the model's rules)

| # | Decision | 🟢 Your answer |
|---|---|---|
| D1 | **Ownership split** Saudi/GCC % vs foreign % (drives Zakat vs CIT vs mixed)? | |
| D2 | **Fiscal year-end** (for Zakat/VAT timing)? | |
| D3 | **Target cash buffer** — months of forward net burn (📊 3 aggressive / 4 normal / 6 conservative)? | |
| D4 | **Next-raise trigger** — start raising at how many months of runway remaining (📊 9–12; MENA process 6–9 mo)? | |
| D5 | Do founders draw a **cash salary** in the window, or fully defer? | |

---

## What I'll produce once Tier 1 (+ ideally Tier 2) is filled

A board-grade **13-week weekly cash forecast**, direct-method, per the repo's formulas:

1. **Weekly cash grid (W1–W13):** opening cash → cash in (collections + financing + VAT collected) → cash out
   (payroll, opex, one-time, VAT remitted, GOSI/WHT/Zakat) → **ending cash + runway each week.**
2. **Floor-breach radar:** the exact week(s) cash crosses your minimum floor / zero, with the driver named
   (e.g. *"W6: WPS Day-10 + quarterly VAT remit collide → SAR X below floor"*).
3. **Working-capital lines:** AR collection timing, **VAT float** (collected vs remitted), WHT on foreign
   vendors — tracked separately from burn.
4. **Assumptions Register:** every input flagged 🟢 / 📊 / 🔴 with confidence + source, fully editable.
5. **Actions:** which weeks need a cut/defer, when to trigger the raise, and a roll-forward into the 12-month model.
6. **Open questions:** every 🔴 ranked by how much it moves the cash-out week.

> **Fastest path:** answer **Tier 1** (especially T1, T4–T6, T8–T13) and I can build the real forecast. Leave
> anything blank and it becomes a visible 🔴 placeholder — the model still runs symbolically around it.
