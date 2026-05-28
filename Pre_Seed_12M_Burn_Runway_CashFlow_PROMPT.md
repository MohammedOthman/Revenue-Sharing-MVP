# Partner Revenue OS — Pre-Seed 12-Month Burn, Runway & Cash-Flow Analysis
## Reusable AI Prompt (CFO / Board-Ready, Benchmark-Driven, No-Hallucination)

---

## What this is

A self-contained prompt you hand to a capable AI (alongside this repository) to generate an
**end-to-end 12-month pre-seed Burn, Runway, and Cash-Flow analysis** for Partner Revenue OS,
delivered as a **CFO / board-ready narrative** with summary tables.

## How to use it

1. Open a session with a capable AI and give it access to this repo (or paste the relevant manuals).
2. Copy everything inside the prompt block below and send it.
3. Supply your two hard inputs when asked (or edit them directly afterwards):
   **starting cash** and **target pre-seed raise** (these are the only `🟢 FOUNDER INPUT` items).
4. The AI will build the model on **cited benchmarks** for everything else, list every assumed
   number in a single **Assumptions Register**, and flag anything it cannot benchmark as
   `🔴 [INPUT REQUIRED]` rather than inventing it.
5. Edit the Assumptions Register over time with your real figures to sharpen the model.

## Core philosophy

- **Benchmark-with-citation, or flag `🔴` — never fabricate.**
- **Bookings ≠ billings ≠ recognized revenue ≠ cash collected.** VAT is working capital, never revenue.
- **Burn must buy proof.** Every riyal is tied to a pre-seed proof milestone.
- Built **"actuals-ready"** so it plugs straight into the monthly CFO review.

## Input tiers (flag convention used throughout the output)

| Flag | Tier | Meaning |
|---|---|---|
| 🟢 | Founder input | You provide it (starting cash, target raise). Never assumed. |
| 🟡 | Benchmark assumption | Sourced from a named, reliable benchmark. Cited. Editable. Never stated as fact. |
| 🔴 | Input required | Company-specific, no credible benchmark. Placeholder — never invented. |

---

## THE PROMPT (copy everything in the block below)

````text
# ROLE
You are a hybrid **startup CFO + pre-seed venture-capital investment associate** with deep expertise in **Saudi Arabia / GCC B2B SaaS** finance, FP&A, fundraising, and KSA tax/labor regulation. You produce board-grade, defensible analyses and you are ruthlessly disciplined about never overstating certainty or inventing data.

# OBJECTIVE
Produce an **end-to-end 12-month pre-seed Burn, Runway, and Cash-Flow analysis** for **Partner Revenue OS**, delivered as a **CFO / board-ready narrative** (interpretation + summary tables; not a raw spreadsheet dump). The reader must finish knowing: how much cash burns and when, what proof each riyal buys, exactly when cash crosses the buffer and zero, how big the raise must be, which levers most move survival, and what to do month-by-month.

# ANALYTICAL LENSES TO APPLY
- **Venture / runway lens:** default-alive vs default-dependent, burn multiple, capital efficiency (ARR per SAR burned), CAC payback, runway-to-milestone vs runway-to-zero, milestone-based raise sizing, bridge/extension risk, use-of-funds tied to de-risking, "burn must buy proof."
- **FP&A / budgeting lens:** driver-based bottom-up build, cost-behavior (fixed/variable/step), working-capital & VAT mechanics, deferred-revenue and AR/AP roll-forwards, 13-week near-term cash, scenario + sensitivity, and an "actuals-ready" structure that plugs into the monthly CFO review.

# BUSINESS CONTEXT
Partner Revenue OS is a Saudi/GCC **B2B SaaS "Partner Revenue Control Layer"** — NOT a PRM, affiliate tool, or dashboard. It turns partner activity into attributable, governed, forecastable, finance-ready revenue. Core object = **Partner Revenue Claim**; North Star = **Controlled Partner Revenue**; buyer = Head of Partnerships (validated by CRO/CFO/CEO). MVP wedge = Claim Ledger + Attribution Integrity; overlay-first. The motion is **consultative, enterprise-heavy**: education → diagnostic workshop → paid pilot → implementation-heavy onboarding → activation → expansion, with **~60–180 day sales cycles**. Revenue = SaaS subscription (annual/semi-annual/quarterly/monthly mix) + implementation fees + paid pilots + services. The company is **pre-seed**: cash must be converted into the proof that unlocks the seed round.

If available, READ THESE REPO FILES FIRST and reuse their formulas, cost taxonomy, KSA treatment, proof framework, phase architecture, and decision gates — but scope strictly to 12 months:
`Partner_Revenue_OS_PDR.md`, `18M_Burn_Rate_QA_Model.md`, `Monthly_CFO_Review_Manual.md`, `GTM_Operating_Manual.md`, `Internal_Operating_Cadence_Manual.md`, `Large_Enterprise_Client_Onboarding_Manual.md`. Map the 12 months to the repo's phases: **Foundation (M1–3) → Pilot (M4–6) → Activation (M7–9) → Commercial Hardening (M10–12)**.

# NON-NEGOTIABLE DATA-INTEGRITY RULES (most important section — the deeper the model, the stricter these get)
1. **NEVER hallucinate or invent a financial figure.** If a value is not provided AND has no reliable benchmark, output `🔴 [INPUT REQUIRED]` and carry the model symbolically. Do not fabricate to make a table look complete.
2. **Tag EVERY number with one tier:**
   - `🟢 FOUNDER INPUT` — founder-provided. **Starting cash and target pre-seed raise are founder inputs**: pin them as editable fields at the top; never assume them.
   - `🟡 BENCHMARK ASSUMPTION` — from a **named, reliable** source (ZATCA, GOSI, KSA labor law, published GCC SaaS salary/conversion/collection/CAC benchmarks, or the repo's own ranges). Cite the source + one-line rationale; for any regulatory rate, instruct yourself to use the **current, verified** rate and say "verify." Never phrase as fact.
   - `🔴 INPUT REQUIRED` — company-specific, no credible benchmark → placeholder.
3. **Mandatory Assumptions Register** — ONE consolidated, highlighted, editable table of EVERY financial input: Item | Value/Range | Unit | Tier | Source & rationale | Confidence (H/M/L) | Driver? (Y/N) | Impact on burn/runway | Editable (Y).
4. **No false precision** — ranges where benchmarks are wide; sensible rounding; always show confidence.
5. **Benchmark ≠ fact** — wording must always signal an assumption.
6. **Keep four things distinct:** bookings ≠ billings (invoiced) ≠ recognized revenue ≠ cash collected. **VAT is working capital, never revenue.**

# CURRENCY, TAX & KSA/GCC TREATMENT (expand — do not reduce KSA to "VAT")
- **Currency: SAR.** Note the **USD peg (~3.75)** → USD-denominated cloud/AI/tooling costs are ~stable in SAR; flag any non-USD FX exposure.
- **VAT 15%** (verify): output VAT collected on invoices, input VAT on costs, net remitted on the filing cadence (monthly/quarterly per turnover). Ring-fence VAT cash; model the **timing gap** between collecting VAT on an upfront annual invoice and remitting it.
- **Payroll — fully loaded, not gross salary.** Build: gross + **GOSI** (Saudi vs non-Saudi employer rates differ — verify & cite) + **mandatory medical insurance** + housing/transport allowances (typical KSA comp) + **EOSB / end-of-service accrual** (KSA labor law — accrues monthly, real future liability) + visa/iqama/work-permit + dependent fees for **non-Saudi** hires + recruiting + per-head equipment & software seats.
- **Saudization (Nitaqat):** model the required Saudi-to-non-Saudi ratio as a constraint on the hiring plan (affects feasibility, salary levels, and visa costs). Flag if the plan risks non-compliance.
- **Entity & licensing one-offs:** commercial registration, **MISA/foreign-investment license + renewal** (if foreign-owned), bank setup, ZATCA e-invoicing setup, accounting system, legal templates, trademark.
- **Zakat vs CIT vs mixed:** 2.5% Zakat base (Saudi/GCC-owned) vs 20% CIT (foreign-owned) vs blended — **ownership-dependent → flag as input**; pre-seed losses likely minimize it, but state the assumption and model a provision placeholder.
- **Withholding tax (WHT)** on payments to non-resident vendors/contractors (foreign SaaS, AI APIs, offshore devs) — verify rate, model if material.
- **Non-dilutive funding (KSA):** include an optional, clearly-flagged line for grants/soft funding / accelerator or government programs as a potential inflow — do NOT assume amounts; mark `🔴` unless founder-confirmed.

# MODEL LEVERS & PILLARS — BUILD ALL 13; EXPOSE EACH KEY DRIVER AS AN EDITABLE LEVER AND SHOW HOW IT MOVES RUNWAY

**Pillar 1 — Revenue Engine (funnel-to-cash, driver-based — do NOT just assume "X customers/month").**
Build revenue bottom-up through the enterprise funnel: target accounts → outreach → meetings → qualified opps → diagnostic workshops → demos → **paid pilots** → closed-won → activated. Expose as levers: per-stage conversion rates, **sales-cycle length / lag (60–180d)**, **pilot price + pilot→annual conversion rate + pilot duration**, and **founder-led selling capacity** (max diagnostics/demos per month — a hard ceiling on ramp regardless of demand). Model **time-to-first-value** and **implementation capacity** (max parallel onboardings) as caps on activation and revenue realization.

**Pillar 2 — Cash Timing & Working Capital (the #1 overlooked runway lever).**
Model: billing-frequency mix (annual upfront / semi-annual / quarterly / monthly) and its cash impact; **collection lag / DSO** (KSA enterprise procurement can be 30–90+ days — benchmark & flag); **implementation-fee milestone collection** (signing / kickoff / go-live / acceptance); **deferred-revenue build** from upfront annual cash; VAT collected-vs-remitted timing; **AP / vendor payment terms** (annual-prepaid tools = lumpy outflows); **commission payment timing** (on booking vs on cash). Show the cash-vs-revenue gap explicitly.

**Pillar 3 — People & Payroll (usually 60–80% of pre-seed burn).**
Gate-based hiring sequence tied to triggers (not just dates); fully-loaded cost per role (per Pillar/KSA section); **founder salary level + deferral**; **new-hire productivity ramp** (a rep/CS isn't productive in month 1); contractor vs FTE mix; **severance/wind-down cost** if forced to cut. Expose: each hire's start month, the trigger that justifies it, and loaded cost.

**Pillar 4 — COGS, Gross Margin & Unit Economics.**
Base cloud + **per-customer variable** (app/db/**evidence storage that grows over time**/logs/notifications/security — use the repo's per-customer SAR ranges) + **AI/API with an explicit usage cap** + support tooling + **per-customer implementation delivery cost** (loaded CS hours). Compute: per-customer **contribution margin**, blended vs new-cohort **gross margin**, and **implementation margin by cohort** (repo targets: 20–40% first 5, 40–60% next, 50–70% later). Flag where COGS grows faster than revenue.

**Pillar 5 — One-Time / Setup / Capex-like Costs (front-loaded, often missed).**
Incorporation/CR/MISA, bank, legal templates & contracts (bilingual), brand/website, initial **security baseline + pen-test**, accounting & e-invoicing setup, data-residency setup, equipment. Separate one-time from recurring so the run-rate isn't distorted.

**Pillar 6 — Tax, Regulatory & Compliance (per KSA section above) — treat as explicit cash lines with correct timing,** not an afterthought.

**Pillar 7 — Burn, Runway & Capital Efficiency.**
Gross burn; net burn (gross − customer cash receipts); **net cash burn** incl. VAT/tax movement; forward-3-month avg net burn; **runway months each month-end**; **cash-out date**; **buffer-breach month**; **default-alive vs default-dependent**; **burn multiple** (net burn ÷ net new ARR, trailing/quarterly); **capital efficiency** (ARR per SAR burned); **runway-to-seed-milestone vs runway-to-zero**.

**Pillar 8 — Fundraising & Capital Structure.**
Size the pre-seed = cash to reach a **seed-ready milestone** + buffer (state buffer policy; default 4 months forward net burn; show 3- & 6-month). Model **tranche timing** if staged; **use-of-funds** table; investor-update cadence; optionally note instrument (SAFE/convertible) and that dilution is out of scope unless founder supplies terms. Include a **"what if the raise slips 3–6 months"** stress.

**Pillar 9 — Scenarios, Sensitivity & Triggers** (see dedicated section below).

**Pillar 10 — Financial-Statement Integrity & Reconciliation (FP&A rigor).**
Provide a **bookings → billings → recognized revenue → cash** waterfall (four distinct lines), an **ARR bridge** (beginning + new + expansion − contraction − churn), and roll-forwards for **deferred revenue, AR, AP, VAT payable, and EOSB accrual**. Give a **three-statement-lite** view: monthly cash-flow (direct method) + a simplified accrual P&L (recognized revenue vs cash) + key balance-sheet items (cash, AR, deferred revenue, VAT payable, EOSB). Confirm ending cash reconciles (opening + inflows − outflows).

**Pillar 11 — Decision Gates & Management Levers (practicality).**
Encode the repo's gates: hire AE/SDR/CS only on pipeline/activation triggers; build integrations only when paid + repeatable; scale GTM only when win-rate/activation clear; start raise on proof-score + runway. Provide a **deferrability matrix** (protect / defer / cut-first) and a **cash-trigger freeze list** ("if cash < buffer by month X, cut Y to extend runway Z months").

**Pillar 12 — Proof / Milestone Linkage (the spine).**
Tie each phase's burn to the proof it must buy (problem / buyer / product / willingness-to-pay / activation / implementation / GTM / finance / investor proof) and to the **pre-seed proof score (0–5)** from the CFO manual. Every major cost answers "what proof does this buy?"

**Pillar 13 — Churn, Retention & Concentration Risk.**
Even pre-seed: logo churn / pilot non-conversion, GRR/NRR assumptions, expansion paths (seats, modules, partner scope), and **customer-concentration risk** (one or two logos = most ARR). Flag fragility.

# SCENARIOS, SENSITIVITY & TRIGGERS
- **Three cases — Base / Downside / Upside** — with explicit per-driver deltas (ramp & conversion, ACV & package mix, sales cycle, win rate, pilot conversion, implementation load & margin, collection timing/DSO, hiring pace, churn, gross margin). Report each case's ending-cash path, min runway, cash-out date, and funding need.
- **A "survival / floor" scenario** — minimum viable burn (founder-led, hiring frozen) — to show the worst-case runway extension.
- **A "raise slips 3–6 months" bridge scenario.**
- **Sensitivity / tornado** on the 2–3 drivers that most move runway (likely: ramp/conversion, ACV, collection timing, key-hire timing, churn) — show runway-month and funding-need deltas per ±change.
- **Break-even analysis:** what ramp/ACV/collection terms are required to reach the seed milestone within runway.
- **Pre-committed if/then triggers** per scenario (what to cut/accelerate and when).

# OUTPUT STRUCTURE (CFO / board narrative + summary tables)
1. **Executive summary** — 12-mo gross & net burn, peak-burn month, min ending cash, cash-out month (unfunded), recommended raise + buffer, top risks, one-line recommendation.
2. **Founder inputs to confirm** — 🟢 starting cash & raise (editable) + all 🔴 INPUT REQUIRED.
3. **Assumptions Register** — full highlighted, editable table (every number, tier, source, confidence, driver flag, impact).
4. **Revenue engine** — funnel-to-cash narrative + monthly bookings/billings/revenue/cash waterfall + ARR bridge.
5. **Cost & headcount build** — burn by function, by cost-behavior, by phase; loaded-payroll schedule; one-time vs recurring.
6. **Working capital & cash-flow** — monthly direct-method cash flow + deferred-revenue/AR/AP/VAT/EOSB roll-forwards + a near-term **13-week** cash view.
7. **Burn & runway analysis** — monthly gross/net burn, ending cash, runway; default-alive/dependent verdict; buffer-breach & cash-out months.
8. **Scenario & sensitivity analysis** — Base/Down/Up + survival + raise-slip; tornado + break-even tables; interpretation.
9. **Funding need & use of funds** — milestone-based raise sizing; what the round must prove to unlock the seed.
10. **Unit economics & KPIs** — CAC, CAC payback, burn multiple, capital efficiency, gross & implementation margin, contribution margin — each with explicit pre-seed caveats.
11. **Risks, red flags & decision gates** — concentration, DSO, pilot-conversion, implementation overrun, Saudization/licensing, key-person; plus hiring/GTM/integration/fundraising gates and the cash-trigger freeze list.
12. **Recommendations & monthly action plan** — hire/delay/cut/protect; decisions to make by M3, M6, M12; weekly-watch vs monthly-watch metrics.
13. **Open questions & data gaps** — every 🔴 item ranked by impact on the conclusion.

# STYLE
Board-ready, decision-oriented, concise. SAR throughout. Numbers in tables, judgment in prose. Lead with the answer, then support it. Every number visibly carries its tier flag (🟢/🟡/🔴). Build it "actuals-ready" (plan-vs-actual columns) so it feeds the monthly CFO review.

# FINAL SELF-CHECK (must pass before returning)
- [ ] No invented numbers; every figure is 🟢/🟡/🔴 and every 🟡 cites a source (regulatory rates marked "verify").
- [ ] Starting cash & raise = founder inputs, not assumed.
- [ ] Assumptions Register lists EVERY input, highlighted and editable, with driver flags.
- [ ] Revenue built funnel-to-cash; bookings/billings/revenue/cash kept distinct; VAT ring-fenced, never revenue.
- [ ] Payroll fully loaded (GOSI, EOSB, insurance, iqama, Saudization, ramp); one-time vs recurring separated.
- [ ] Working capital modeled (DSO, deferred revenue, AP, VAT/EOSB roll-forwards); ending cash reconciles.
- [ ] Runway uses forward burn; default-alive/dependent stated; cash-out & buffer-breach months identified.
- [ ] Funding need = max cumulative deficit + buffer; use-of-funds milestone-linked; raise-slip stress included.
- [ ] All 13 pillars present; key drivers exposed as editable levers with runway impact shown.
- [ ] 3 cases + survival + sensitivity/tornado + break-even, internally consistent.
- [ ] Scoped to 12 months; mapped to repo phases; KSA tax/labor treatment correct; each phase's burn linked to pre-seed proof.
````
