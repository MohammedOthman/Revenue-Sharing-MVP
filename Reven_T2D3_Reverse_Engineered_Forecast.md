# Reven — T2D3 Reverse-Engineered Financial Forecast (Price · Capture · Grow, End-to-End)

**Document type:** Reverse-Engineering Analysis · Financial Forecast · T2D3 Growth-Shape Decomposition · Price/Capture/Grow Synthesis
**Product:** Partner Revenue OS (brand: **Reven**) — *the finance-grade control layer and system of record for partner revenue*
**Companion to:** `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` (§6 scenarios, §8.4 T2D3 ladder), `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (value pool / SOM), `Partner_Revenue_OS_Venture_Scale_Narrative.md` (Land→Expand→Own), `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` (the round), `Reven_Execution_Plan_Next_2_Quarters.md` (near-term gates), `Reven_Pricing_Executive_Summary.md`.
**Scope:** Reverse-engineers the company's *goal* and the **T2D3** (triple-triple-double-double-double) growth shape into an explicit, internally-consistent forecast. KSA-first → MENA → global, as the model requires.
**Date:** 2026-06-23. **FX:** USD 1 ≈ SAR 3.75. **VAT** 15% excluded from ARR.

> **Reading discipline / evidence hygiene.** This is a *reverse-engineering*, not a forecast of observed results. The company is **pre-revenue, pre-seed** (`Partner_Revenue_OS_Venture_Scale_Narrative.md`): every customer, ARR, ACV, and CAC number below is a **[Derived]** consequence of a stated goal plus **[External]** benchmarks, not a booked fact. Tags: **[Confirmed]** = stated in the repo; **[External]** = third-party benchmark, cited directionally; **[Assumption]** = a modeling input chosen here; **[Derived]** = computed from the others. The point is to expose *what must be true* at each rung — the inputs the validation round must convert into evidence — not to predict. Where the aspiration (T2D3) and the grounded bottoms-up (the SOM) diverge, §10 says so plainly rather than papering over it.

---

## 1. The reverse-engineering, on one page

**The goal, decoded in one line.** Become a **Centaur — ~$100M real ARR** — built on **gross-profit quality** (subscription + ~100%-GM data dominant), so a flow-touching business is still valued **like software (~8–10×)** and clears the **~$1B unicorn** bar; reached in **~5–6 years from a ~$1–2M seed base** by riding the **T2D3** growth shape. [Confirmed goal-shape: `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` §6.1, §8.4]

**The reverse-engineered spine (central path; USD; SAR ≈ ×3.75).** Read it as the *answer to "what must be true."*

| T2D3 rung | Mult. | End ARR (USD) | End ARR (SAR) | Cum. logos | Blended ACV | NRR | Phase / engine |
|---|:--:|---:|---:|---:|---:|:--:|---|
| **Y0 — seed base** | — | **$1.5M** | SAR 5.6M | ~60 | ~$25K | — | Capture (PRM), KSA |
| **Y1** | ×3 | **$4.5M** | SAR 16.9M | ~142 | ~$32K | 108% | Capture scale + compliance premium |
| **Y2** | ×3 | **$13.5M** | SAR 50.6M | ~293 | ~$46K | 115% | Settle (per-payout + capped bps), MENA |
| **Y3** | ×2 | **$27M** | SAR 101M | ~430 | ~$63K | 120% | Settle scale + global co-sell + data |
| **Y4** | ×2 | **$54M** | SAR 203M | ~640 | ~$85K | 122% | Orchestrate (net bps on RUM, capped) + network |
| **Y5** | ×2 | **~$100M** | SAR 375M | ~910 | ~$110K | 125% | Network + data licensing + ad-valorem |

**The three dials this document turns (the user's question, restated):**

| Dial | The question | The reverse-engineered answer | Where |
|---|---|---|---|
| **PRICE** | *How much do we charge?* | A per-logo **ACV ladder $25K→$120K**, priced on **active partners → +per-payout/capped-bps → net-bps-on-RUM**, capturing **10–20% of measured customer value (≈ sub-30 bps of governed partner revenue)** — never a visible % of the partner's money. | §5 |
| **CAPTURE** | *How much of the pool do we convert?* | At $100M ARR we capture a **fraction of a percent** of an **L1 governed-revenue pool measured in the tens of billions** — but **well over 100% of the KSA software SAM**, which is *why the model is forced to travel* (MENA by Y2, global co-sell by Y3). | §6 |
| **GROW** | *How do we get there?* | Four stacked engines: **(a)** ~910 cumulative logos via a CAC-disciplined motion; **(b)** an **NRR engine 105%→125%**; **(c)** geography KSA→MENA→global; **(d)** layer Capture→Settle→Orchestrate. T2D3 is the *output*, not an input. | §7 |

> **The single most important reverse-engineered fact.** The KSA software SAM (~$150–400M, base ~$200M; `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §4.2) **mathematically cannot** produce a $100M-ARR book — the repo states GCC alone caps at **~$30–60M ARR**. Therefore the T2D3 ladder is *self-proving as an expansion thesis*: somewhere around **Y3 (~$27–30M ARR)** the model exhausts the home market and **must** already be selling in MENA and global co-sell. Any plan that keeps the company KSA-only is not a T2D3 plan — it is a default-alive ~$30–50M outcome (an excellent business, a sub-unicorn). The expansion is not optional flavor; it is load-bearing arithmetic.

---

## 2. The goal, reverse-engineered (what "win" actually is)

Before reverse-engineering a number you must reverse-engineer the *objective function*. Decoded from the corpus, the company is optimizing for **six nested goals**, not one:

1. **Financial goal — a Centaur valued like software.** `$1B = ARR × multiple`. With multiples compressed (**~5× broad public SaaS, ~20× elite Cloud-100, ~4.5× payments-flavored**; Cloud-100 26×→23×→20× 2023→25) [External], the 2021 trick of a $30–40M-ARR "unicorn" at 30× is dead. The honest bar is **real ~$100M ARR at a software-like ~8–10×** → ~$0.8–1.0B. [Confirmed: §6.1] This is the terminal node we reverse from.
2. **Strategic goal — own the system of record.** Not "a PRM," but the canonical **Partner Revenue Claim** ledger → settlement-of-record → the partner P&L the quarterly investment decision runs on. The financial goal is *downstream* of this control point. [Confirmed: Venture Narrative §3, §6]
3. **Sequencing goal — Capture → Settle → Orchestrate** (= Land → Expand → Own = Scenario A→B→C *over time*), **governed toward Scenario-B economics throughout**: subscription + data dominant in gross profit, flow capped and fenced. [Confirmed: §6.2 synthesis]
4. **Geographic goal — KSA wedge → MENA → global co-sell.** The compliance wedge (ZATCA/WHT/PDPL/Sharia) is the *un-retrofittable* entry; the global co-sell/marketplace pool ($30B→$163B, ~29% CAGR) is the *scale*. [Confirmed: Narrative §7–8]
5. **Margin/multiple goal — protect the multiple.** Keep flow revenue from collapsing blended GM toward Toast (~21.5%) / Shopify (~51%) territory; narrate the equity story on **recurring + fintech gross profit**. [Confirmed: §6.3 Decision 5]
6. **Discipline goal — default-alive, evidence-based, phase-gated.** Burn multiple <2, anti-hallucination, no Phase-2 spend before the Phase-1 exit gate. [Confirmed: Execution Plan; financial model]

> **Why this matters for the forecast.** Goals 5–6 are *constraints on the path*, not the destination. They are why the reverse-engineering below is **Scenario B** (hybrid, capped flow) rather than Scenario C (flow-maximalist) even though C can post a bigger headline: a $100M *gross-flow* ARR at 21% GM is worth ~4.5× (~$95M of gross profit valued as a utility), while a $100M *Scenario-B* ARR at ~73% blended GM, software-narrated, is worth ~8–10×. **The mix is the valuation.** We therefore reverse-engineer toward the ARR shape *and* the gross-profit shape simultaneously.

---

## 3. T2D3 — the growth shape, and where the clock actually starts

**T2D3** (Battery Ventures, Neeraj Agrawal, 2015) = **Triple, Triple, Double, Double, Double**: the empirical cadence by which a SaaS company compounds **~$1–2M ARR to ~$100M in 5–6 years**. [External] It is a *shape*, not a plan — you do not "do T2D3," you build a growth engine whose output *happens* to trace ×3, ×3, ×2, ×2, ×2. Reverse-engineering it means deriving the engine inputs (logos, ACV, NRR, CAC, capital) that produce that output.

**The clock does not start at the pre-seed.** This is the most common framing error, and the repo's discipline avoids it. The 2,000,000 SAR pre-seed is a **12-month, zero-revenue, Phase-1 Capture validation round** [Confirmed: `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` §1]. Its job is to *manufacture the seed base*, not to ride T2D3. So the timeline has a **pre-roll** before the T2D3 ladder begins:

| Stage | When | Capital | ARR | What it proves |
|---|---|---|---|---|
| **Pre-seed (now)** | 2026, 12 mo | **2,000,000 SAR** (~$533K), 10% equity, SAR 20M post [Confirmed] | **$0 (zero-revenue by design)** | The Phase-1 exit gate: 100+ real claims, 3–5 paid design partners, finance-accepted evidence, weekly active usage, time-to-first-claim <14 days [Confirmed: Execution Plan] |
| **Seed / T2D3 "Y0"** | ~2027 | MENA seed **$1–5M @ ~$11–18M post** [External] | **~$1–2M ARR** | Repeatable Capture motion; the **starting line** of the ladder |
| **T2D3 Y1→Y5** | ~2027–2032 | Series A → B → growth | **$1.5M → ~$100M** | The reverse-engineered spine (§4) |

> **Reverse-engineered implication.** The pre-seed is sized to *milestones, not vanity* [Confirmed]; the relevant question it must answer is not "how much ARR in year 1" (the answer is zero) but **"does the seed base of ~$1–2M ARR become reachable within ~6–9 months of the seed raise?"** That requires exiting the pre-seed with **~$10–30K+ MRR and 2–3 anchor logos** (the repo's stated Phase-1/seed bar [Confirmed: §3 exit gate]) — i.e., a run-rate already pointed at the $1–2M Y0 base. The pre-seed buys the *right to start the clock*, nothing more.

---

## 4. The reverse-engineered ARR ladder (the spine)

T2D3 fixes the *endpoints*. Reverse-engineering fills the *mechanism* between them. Every SaaS year obeys one identity:

```
End ARR  =  (Begin ARR × NRR)  +  New-logo ARR
              └─ expansion engine ─┘   └─ acquisition engine ─┘
```

So **New-logo ARR required = End ARR − (Begin ARR × NRR)**. Given the T2D3 End-ARR targets and an NRR ramp, the new-logo bookings *fall out* as a derived requirement. This is the heart of the reverse-engineering: T2D3 tells you the answer; this identity tells you the work.

**Inputs chosen [Assumption], all inside repo-cited bands:**
- **NRR ramp:** 108% → 115% → 120% → 122% → 125% (repo target 105%→120%→120–130% across phases; SMB ~97% / enterprise ~118% medians mean the *mix must skew enterprise* to hit these — see §7b). [External bands; §2.1, §8.1]
- **New-logo blended ACV:** $35K → $55K → $80K → $100K → $120K (repo Scenario-B ACV path: seed ~$25K → A ~$60K → scale ~$120K). [Assumption within §6.2]
- **Seed base Y0:** $1.5M ARR (mid of the $1–2M band), ~60 logos at ~$25K. [Assumption]

**The derived ladder (central path):**

| Year | Begin ARR | × NRR | = Retained+expanded | + New-logo ARR (derived) | New-logo ACV | **New logos (derived)** | **End ARR** | Cum. logos | Blended ACV |
|---|---:|:--:|---:|---:|---:|---:|---:|---:|---:|
| **Y0** | — | — | — | $1.5M (base) | ~$25K | ~60 | **$1.5M** | ~60 | ~$25K |
| **Y1** | $1.5M | 108% | $1.62M | **$2.88M** | $35K | **~82** | **$4.5M** | ~142 | ~$32K |
| **Y2** | $4.5M | 115% | $5.18M | **$8.32M** | $55K | **~151** | **$13.5M** | ~293 | ~$46K |
| **Y3** | $13.5M | 120% | $16.2M | **$10.8M** | $80K | **~135** | **$27.0M** | ~430 | ~$63K |
| **Y4** | $27.0M | 122% | $32.9M | **$21.1M** | $100K | **~211** | **$54.0M** | ~640 | ~$85K |
| **Y5** | $54.0M | 125% | $67.5M | **$32.5M** | $120K | **~271** | **~$100M** | ~910 | ~$110K |

**Cross-check against the repo's own arithmetic.** §6.2 states "$100M ARR ≈ ~830 customers at $120K" (Scenario B). This reverse-engineering lands at **~910 logos at ~$110K blended** — same order, slightly more logos at a slightly lower blend because the model carries the early low-ACV cohorts forward. **Internally consistent.** [Derived vs. Confirmed]

**What the decomposition *exposes* (the reason to do it this way):**

- **The acquisition mountain is Y2.** The single hardest year is not Y5 — it is **Y2**, which demands **~151 new logos and $8.3M of fresh new-logo ARR** to hit the second triple. This is the year the motion must transition from founder-led to a *repeatable, hired sales engine*, and the year MENA must already be contributing pipeline. If Y2 slips, the whole ladder reschedules.
- **Expansion overtakes acquisition around Y3–Y4.** At Y4, **$32.9M of the $54M (61%) is retained+expanded** existing-customer ARR; new logos add the other 39%. The business *flips* from an acquisition machine to an expansion machine — which is exactly when NRR (the multiple's biggest lever) must be proven >120%. **The NRR engine is not a Phase-3 nicety; it is the Y3-onward growth source.**
- **Logo growth decelerates while ARR keeps doubling.** Cumulative logos grow ~2.4× from Y2→Y5 (~293→~910) while ARR grows ~7.4× ($13.5M→$100M). **The back half of T2D3 is bought with ACV and NRR, not logo count** — i.e., with *price and expansion*, not just *grow*. This is why §5 (price) and §6 (capture) are not separate from §7 (grow); they *are* the back half of the ladder.

---

## 5. PRICE — how much to charge (the ACV engine)

Price is the first dial because, per §4, **ACV and NRR carry the back half of the ladder**. The reverse-engineering of price has three layers: the *metric* (what scales), the *ladder* (the ACV path), and the *rule* (the ceiling).

### 5a. The three-metric model (keep them separate)
[Confirmed: `Reven_Pricing_Executive_Summary.md` §1]

| | Metric | Why |
|---|---|---|
| **Value metric** | Trusted partner-attributed revenue realized | What the customer actually buys — the North Star the ACV must stay *below* |
| **Pricing metric** | Active (transacting) partners, banded × tier → evolving to attributed-revenue / per-payout / net-bps | Buyer-friendly, category-standard, expands with the program |
| **Expansion metric** | partners → modules → compliance tier → entities/countries → settlement volume → data licensing | The NRR engine, assembled incrementally |

### 5b. The ACV ladder, reverse-engineered by phase
The §4 blended-ACV path ($25K→$110K) is a *consequence* of moving the buyer up the value stack. Decomposed:

| Phase | Buyer | Pricing metric added | Per-logo ACV band [Assumption] | Blended ACV in model | Corp-finance target |
|---|---|---|---:|---:|---|
| **Capture (Y0–Y1)** | Head of Partnerships | Active-partner GBB + compliance premium + fenced implementation | $6–50K (SAR ~95–110K high-touch floor for any sales-led deal) | ~$25–32K | GM ≥75%, NRR ≥105%, payback <18mo |
| **Settle (Y2–Y3)** | + CFO/Finance | + flat per-payout + **capped** bps + per-entity | $25–250K+ | ~$46–63K | GM ≥70% blended, NRR ≥115–120% |
| **Orchestrate (Y4–Y5)** | + Board / network | + **net bps on revenue-under-management** (declining tiers + caps) + data licensing | 6–7 figures | ~$85–110K | NRR ≥120–130%, story on **gross profit** |

[Confirmed bands: `Reven_Pricing_Executive_Summary.md` §2; `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` §3, §7.2]

### 5c. The pricing rule (the ceiling that prevents over-extraction)
The per-logo price is bounded by a **max() of three anchors**, and capped by a **value-share rule**: [Confirmed: `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §8]

```
ACV/logo ≈ max[ platform tier ($50–90K KSA),  ~3% × attributed transaction GMV,  ~5–10% × partner payouts ]
   subject to:  total capture ≤ 10–20% of measured customer value  (≈ sub-30 bps of partner-attributed revenue)
   and:         price below the leakage we recover (3–8% of payouts) so the purchase is self-funding
```

> **The discipline that protects the multiple.** Charge the % **on the payout/commission base, never on gross revenue** (the take-rate ceiling is ~3% and the finance buyer *resents* metering on gross). Refuse the uncapped take-rate in Phases 1–2 entirely — that refusal *is* the neutral-Switzerland wedge against AppDirect/PartnerStack. The net durable take is **~25–60 bps**, not the headline 2–3%; model **net, not gross** (Toast: 2.53% gross = 54 bps net). [Confirmed: §6.3 Decision 2, §8.2]

**Price → ladder linkage:** every $1 of ACV uplift across ~910 logos at Y5 is ~$0.9M of ARR. The move from $80K (Y3) to $110K (Y5) blended is therefore worth ~$27M of the terminal ARR — **roughly a quarter of the Centaur is bought by price realization alone** (annual uplift 3–5%/yr + tier/compliance/flow mix-shift), not by new logos. This is the cheapest ARR in the model and the most multiple-accretive.

---

## 6. CAPTURE — how much of the value pool we convert

"Capture" is the bridge between *price* (per logo) and the *market* (the pool). Reverse-engineering it answers: **at $100M ARR, what fraction of the value pool have we taken — and where does the home market run out?**

**The value-pool stack (KSA, annual; `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §1):**

| Layer | What it is | KSA size | Conf. | Reven capture at scale |
|---|---|---:|:--:|---|
| **L1 — Economic pool** | Partner-attributed tech revenue *under management* | **~$15–20B** | MED–LOW | We govern it; we price a **fraction of a bp** of it |
| **L1 — Leakage/labour** | Hard-dollar recoverable (mis-attribution + ops labour) | **~$40–480M** | LOW–MED | The **ROI we underwrite** — price below this |
| **L2 — Software SAM** | What KSA firms will *pay* for the OS | **~$150–400M** (base ~$200M) | LOW–MED | Our **fundable revenue line** |
| **L2 — SOM (3-yr)** | Realistic capturable ARR by year 3 | **~$5–10M ARR** | LOW | The grounded bottoms-up (see §10) |
| **L3 — Adjacent (flow)** | Margin on payout orchestration + WHT/FX | ≈ **doubles ACV ceiling** | LOW | Capped, fenced, valued on gross profit |

**The capture arithmetic, reverse-engineered:**

- **Against L2 KSA software SAM (~$200M base):** the Y3 rung (~$27M ARR) is already **~13% of the entire KSA SAM**, and Y4 (~$54M) is **~27%**. No company takes a quarter of its home SAM by year 4. **Therefore the ladder is mathematically forced out of KSA by ~Y3.** [Derived] This is the same conclusion the pricing doc reaches independently ("GCC alone caps ~$30–60M ARR" [Confirmed: §6.1]) — two methods, one answer.
- **Against L1 governed revenue:** $100M ARR at the "sub-30 bps of governed partner revenue" rule implies governing **~$33–100B+ of partner-attributed revenue** ($100M ÷ 30 bps ≈ $33B; ÷ 10 bps ≈ $100B). KSA tech L1 is only ~$15–20B. **So the Centaur requires a governed-revenue base several times the KSA tech pool** — again only reachable via MENA + global co-sell. [Derived] The capture rate stays *tiny and defensible* (a fraction of a percent of the pool); it is the *denominator* that must grow, by traveling.
- **Against L1 leakage/labour (the ROI):** we price **below** the 3–8% of payouts we recover, so the purchase is self-funding. On the ~$1.2–1.6B KSA tech payout base, that recoverable leakage (~$40–128M conservative) **exceeds the entire KSA SOM** — i.e., the ROI envelope is never the binding constraint; *willingness-to-organize-around-it* is. [Confirmed: §3.4, §8]

> **The reverse-engineered capture verdict.** Reven is never "extracting a lot from a little" — it is extracting *a sliver of an enormous, compounding flow*. The strategic risk is **not** over-extraction (the rule prevents it) but **under-denominator**: staying in a pool too small to host $100M of even a thin slice. The capture dial therefore reduces to a **geography-and-layer timing problem** — light up MENA before the KSA SAM saturates (Y2), and global co-sell + the L3 flow attach before Y3 — which is precisely the §7 grow plan. **Capture discipline and growth necessity are the same instruction viewed from two ends.**

---

## 7. GROW — the four engines that produce the ladder

T2D3 is the *output*. Four stacked engines are the *input*. Reverse-engineering "grow" means specifying each engine to the level the §4 ladder demands.

### 7a. Engine 1 — New-logo acquisition (the §4 logo column)
The ladder demands **~850 net new logos Y0→Y5** (~60 → ~910), front-loaded into Y1–Y2 (~233 of them). Reverse-engineered requirements:
- **Motion shift by Y2.** Founder-/AE-led closes the first ~140 logos; **Y2's ~151 new logos in one year cannot be founder-led** — this is the hire-the-engine year (repeatable playbook, inside sales + field, SI/channel for implementation). [Confirmed motion: GTM manual; Execution Plan]
- **CAC efficiency gate.** CAC payback **<18mo** (GCC enterprise cycles run 6–18mo), pulled toward **~8mo** by **annual prepay** (prepaid logos also renew ~30% higher and the deferred revenue funds growth → burn multiple down). **Magic number ~1.0–1.5**; **LTV:CAC ≥3:1**. [Confirmed/External: §8.1, §8.3]
- **Pipeline coverage.** 3× pipeline of the next rung's logo target; the MISA-licence inflow (14,303 in 2024, +67%) is a *self-replenishing greenfield funnel* with no legacy tool to displace. [Confirmed: §7.2-L8]

### 7b. Engine 2 — The NRR expansion engine (the §4 NRR column)
NRR ramping **105%→125%** is the back-half growth source (§4: 61% of Y4 ARR is expansion). Reverse-engineered build, in order of arrival:
`partner-count growth → tier upgrade → module attach → compliance-tier climb (L0→L3) → per-payout/bps volume → 3–5%/yr uplift → data layer`. [Confirmed: §8.3]
> **The mix constraint that makes-or-breaks it.** Private NRR medians are ~101%; **SMB ~97%, enterprise ~118%** [External]. An all-SMB book **cannot** reach 120% — so the **book must skew mid-market/enterprise** even though SMB closes faster. The SME (Reven Start, SAR 50/mo) tier is a *land-wedge measured on land-to-expand %*, **not** an ARR pillar; if it ever dominates the book, the NRR engine (and the multiple) caps out. [Confirmed: `Reven_Pricing_Executive_Summary.md` §2 guardrails]

### 7c. Engine 3 — Geography (KSA → MENA → global)
Forced by §6's capture ceiling. Reverse-engineered timing:
- **KSA (Y0–Y1):** compliance wedge (ZATCA Wave 24 by 30 Jun 2026 is the dated forcing function); ICP = IT-channel × RHQ intersection. [Confirmed: ICP analysis §6.2]
- **MENA (Y2):** UAE e-invoicing live, shared GCC patterns; **must contribute pipeline by Y2** or the second triple misses.
- **Global co-sell / marketplace (Y3):** ride the $30B→$163B (~29% CAGR) hyperscaler-marketplace migration on the *same claim ledger*. This is the Y3+ ARR that KSA cannot supply.

### 7d. Engine 4 — Layer / phase climb (Capture → Settle → Orchestrate)
Each layer is a price step *and* a deeper moat; the climb is what converts a wedge into a platform (the NRR engine's fuel). [Confirmed: ICP analysis §7.3; Narrative §8]
`Capture (claim ledger) → Trust (attribution quality) → Finance (ZATCA/WHT/ledger) → Settlement/flow (L3) → Intelligence (partner P&L) → Network (cross-tenant identity)`.
> **The non-negotiable sequence.** Never sell a higher layer before the one beneath it is *trusted*. The cross-tenant identity graph (the deepest moat) must be **seeded in the MVP** — it is impossible to retrofit — even though it only "lights up" as a network in Orchestrate. [Confirmed: Execution Plan build order]

---

## 8. The capital ladder (raises reverse-engineered from the milestones)

Capital is sized to **milestones, not to a vanity number** [Confirmed]. Reverse-engineering the raises from the §4 ladder and §7 engines:

| Round | Trigger / proof | Size [External MENA benchmarks] | Post-money | Funds (the §7 engine it buys) |
|---|---|---|---|---|
| **Pre-seed (now)** | Pre-product thesis | **2,000,000 SAR** (~$533K), 10% equity [Confirmed] | **SAR 20M** (~$5.3M) [Confirmed] | The Phase-1 exit gate (the seed base's pre-roll) |
| **Seed (Y0)** | 100+ claims, 3–5 paid logos, repeatable Capture motion | **$1–5M** [External] | **~$11–18M** [External] | Engine 1 (hire the motion) + Engine 4 (Capture→early Settle) |
| **Series A (~Y2)** | Settle proof: "the CFO trusts these numbers"; NRR >100%, ~$9–18M ARR | (MENA Series A) | **toward ~$50M** [External] | Engine 1 scale + Engine 3 (MENA) + Engine 2 (NRR) |
| **Series B (~Y4)** | Orchestrate igniting; NRR ≥120%; ~$36–72M ARR | growth round | **$100–300M territory [Assumption]** | Engine 3 (global) + Engine 2 (data/network) |
| **Centaur (Y5)** | ~$100M ARR @ ~8–10×, software-narrated | — | **~$0.8–1.0B** (unicorn) [External arithmetic] | — |

> **The valuation step-change is at the ledger, not the portal.** [Confirmed: Execution Plan §Capital] Sequence the *moat story* to the raise: **Seed = counter-positioning** (we refuse the resented take-rate); **Series A = switching-cost / retention data** (the NRR engine turning); **Series B = network economies igniting** (the cross-tenant graph densifying).

**The efficiency envelope (a guardrail, not a forecast).** The §4 ladder adds **~$98.5M of net-new ARR Y0→Y5**. The repo's **burn-multiple gate (<2, target <1.5)** [Confirmed] bounds *lifetime cash burned* at roughly **1.3–1.5× cumulative net-new ARR ≈ $130–150M ceiling** — but the disciplined Scenario-B target sits **well below** that ceiling because (a) **annual prepay** funds growth from deferred revenue, (b) **implementation/services are fenced and contribution-positive** (pushed to SI partners by Phase 2), and (c) the **~100%-GM data layer** is multiple-accretive cash. The raises above are sized to *milestones within* this envelope, never to the ceiling itself. All figures **[Derived/Assumption]** — the repo deliberately leaves cash blank, and so does this. [Confirmed discipline: Venture Narrative §12]

---

## 9. The end-to-end financial forecast (one integrated table)

Pulling §4–§8 into a single reverse-engineered model. **Every cell is [Derived] from the goal + [External] benchmarks — none is a booked figure.** This is the "what must be true" table.

| Driver | Pre-seed | **Y0 seed** | **Y1** | **Y2** | **Y3** | **Y4** | **Y5** |
|---|---:|---:|---:|---:|---:|---:|---:|
| **End ARR (USD)** | $0 | $1.5M | $4.5M | $13.5M | $27M | $54M | ~$100M |
| **End ARR (SAR)** | 0 | 5.6M | 16.9M | 50.6M | 101M | 203M | 375M |
| **T2D3 multiple** | — | base | ×3 | ×3 | ×2 | ×2 | ×2 |
| **Cum. logos** | 3–5 | ~60 | ~142 | ~293 | ~430 | ~640 | ~910 |
| **Net new logos** | 3–5 | ~55 | ~82 | ~151 | ~135 | ~211 | ~271 |
| **Blended ACV (USD)** | pilots | ~$25K | ~$32K | ~$46K | ~$63K | ~$85K | ~$110K |
| **NRR** | — | — | 108% | 115% | 120% | 122% | 125% |
| **% ARR from expansion** | — | — | ~4% | ~14% | ~36% | ~61% | ~68% |
| **Blended GM** | — | ~80% | ~80% | ~75% | ~73% | ~73% | ~72% |
| **Revenue mix dominant in GP** | — | sub | sub | sub | sub+data | sub+data | **sub+data** |
| **CAC payback (mo, w/ prepay)** | — | <18 | ~12 | ~10 | ~9 | ~9 | ~8 |
| **Magic number** | — | — | ~1.0 | ~1.2 | ~1.2 | ~1.3 | ~1.3 |
| **Burn multiple (gate <2)** | n/a (pre-rev) | <2 | <1.8 | <1.6 | <1.5 | <1.3 | <1.2 |
| **Rule of 40** | — | — | — | ✓ (growth-led) | ✓ | ✓ | ✓ (≥40) |
| **Geography live** | KSA | KSA | KSA | **+MENA** | **+global co-sell** | global | global |
| **Phase / value metric** | Capture | active partners | active partners | +per-payout/capped bps | +bps/data | net-bps on RUM | network+data |
| **Round** | 2M SAR | Seed | — | Series A | — | Series B | Centaur |
| **Post-money** | SAR 20M | ~$11–18M | — | ~$50M | — | $100–300M | **~$0.8–1.0B** |

> **How to read this table.** It is *not* a prediction; it is the **system of constraints** the venture must satisfy to trace T2D3 at a software multiple. Each row is a thing the validation round and the early operating cadence must instrument and prove. If any row breaks — NRR stalls below the enterprise-mix line, geography doesn't turn on by Y2, blended GM drifts toward payments territory — the achievable outcome is the §10 grounded case, not the Centaur.

---

## 10. Reconciliation with the grounded bottoms-up (the honesty check)

The repo contains **two numbers that must be reconciled**, and intellectual honesty (the house standard) requires naming the gap rather than hiding it:

| Lens | Year 3 ARR | Source | Nature |
|---|---|---|---|
| **T2D3 aspiration** (this doc) | **~$27M** | reverse-engineered from the $100M goal | top-down, goal-first |
| **Grounded SOM** | **~$5–10M ARR** | `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §4.3 | bottoms-up, KSA-only, venture-ramp |

**These are not contradictory — they measure different things, and the gap *is the thesis*:**

1. **The SOM is KSA-only and 3-year; T2D3 Y3 assumes MENA + global co-sell already contributing.** The SOM explicitly scopes "a focused, compliance-led KSA beachhead" and names **GCC replication + L3 flow attach as the upside levers** [Confirmed: §4.3]. T2D3 Y3 (~$27M) *is* the SOM (~$5–10M KSA) **plus** the MENA/global/flow upside the SOM brackets out. The reconciliation: **KSA SOM ≈ $5–10M is the floor; the $27M T2D3 rung is that floor + the expansion the same documents call mandatory.**
2. **Where they agree.** At the **Capture/seed base** they nearly coincide: SOM Y1–Y2 ($0.3–1M → $2–4M) sits right under the T2D3 Y0–Y1 ($1.5M → $4.5M). The divergence opens *only* at Y3, exactly where §6's KSA SAM ceiling forces the geographic jump. **The two models agree on the home market and disagree only about whether the company travels — which is the single biggest strategic bet (§2, goal 4).**
3. **The honest read for an investor.** The **grounded, defensible, KSA-only outcome is a ~$30–60M-ARR, default-alive, capital-efficient company** (Scenario A) — "an excellent result, but sub-unicorn at compressed multiples." [Confirmed: §6.2] **T2D3 to $100M is the Scenario-B bet that the GCC-wedge → MENA → global expansion executes.** This document reverse-engineers the *bet*; the SOM bounds the *floor if the bet on travel is only partly won*. Both are true; presenting only one is the dishonesty the repo's culture forbids.

> **Bottom line of the reconciliation.** Do not promise the Centaur off the KSA pool — it isn't there. **Earn the KSA SOM ($5–10M) as proof, then let MENA + global co-sell + the L3 flow attach carry the ladder from Y3.** The pre-seed/seed rounds are underwritten on the *floor*; the Series A/B story is underwritten on the *travel*.

---

## 11. Risks, sensitivities & what breaks the model

| Risk | Effect on the ladder | Tell / mitigation |
|---|---|---|
| **NRR stalls below ~115%** (SMB-heavy mix) | Back half (Y3–Y5) collapses — expansion is 36–68% of those years | Bias the book enterprise; keep SME as a measured land-wedge, not an ARR pillar; instrument NRR from logo #1 |
| **Geography doesn't turn on by Y2** | KSA SAM saturates ~Y3; ladder caps at ~$30–60M (the SOM/Scenario A) | MENA pipeline as a Series-A use-of-funds milestone; global co-sell design from the same claim ledger |
| **Flow revenue dominates GM** | Blended GM → payments territory (~21–51%); multiple → ~4.5×; "$100M ARR" worth ~half | Cap and fence flow; keep subscription + ~100%-GM data dominant in **gross profit**; narrate on gross profit (the Toast discipline) |
| **Partner-program incidence < estimate** | SAM halves to ~$75–200M; logo math (§4) gets harder | The repo's stated next step: 15–20 discovery interviews to convert incidence from estimate to evidence |
| **Take-rate resistance / WHT royalty trap** | Caps L3 monetization; mis-structured reseller fees trigger 15% WHT | Fixed-fee A2A + payout-base % (never gross); Sharia-clean Ju'ala; isolate from royalty treatment |
| **GCC enterprise CAC / 6–18mo cycles** | Magic number and payback degrade; burn multiple breaches the gate | Annual prepay (payback →~8mo, deferred revenue funds growth); SI channel offloads services |
| **Multiples compress further** | Even $100M ARR < $1B | The model already assumes compressed ~8–10×; the hedge is gross-profit quality, which travels across multiple regimes |
| **Window closes** (AppDirect/Impartner add bilateral KSA-compliant settlement) | The wedge is copied before the ledger is trusted | Speed to trusted ledger + cross-tenant identity in the MVP; the moat is *built order*, not features [Confirmed: Execution Plan] |

---

## 12. The reverse-engineered operating scorecard (instrument from logo #1)

What §9 demands you *measure* — the leading indicators that tell you, early, whether the ladder is on or off:

- **Time-to-first-claim** (<14 days) and **weekly active usage** — the Phase-1 adoption proof. [Confirmed gate]
- **Land-to-expand %** on the SME wedge — the kill metric that keeps the low anchor from diluting the book.
- **NRR, decomposed** (partner-count vs. tier vs. module vs. flow) — so you know *which* expansion lever is (or isn't) firing.
- **Pocket-price ÷ list (price realization)** by deal/rep — worth ~5–10% realized price; only ~29% of SaaS track it.
- **Implementation hours per logo** — the margin/scalability signal the repo flags as "must know by month 12."
- **Documented leakage/ROI from one real customer's own data** — replaces untraceable market-leakage stats with a defensible, priceable number (the only WTP proof that counts).
- **Magic number & burn multiple, every quarter** — the repo's own efficiency gates; the early-warning system for the §9 envelope.
- **MENA pipeline coverage by Y2** — the single tell that separates the T2D3 path from the Scenario-A floor.

> **The one-sentence operating instruction this reverse-engineering produces:** *Price on active partners below the leakage you recover; refuse the gross take-rate; climb the buyer from Head of Partnerships to CFO to Board as you climb Capture→Settle→Orchestrate; skew the book enterprise so NRR clears 120%; and turn on MENA before Y2 and global co-sell before Y3 — because the KSA pool can prove you, but only travel can scale you.*

---

## Sources & confidence

**Internal (this repository) — [Confirmed]:** `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` (§6 three scenarios, §6.1 unicorn arithmetic, §7.2 phase stack, §8.1 benchmarks, §8.4 T2D3 ladder); `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (L1/L2/L3 pools, SAM/SOM, ICP, §8 capture sequence + pricing rule); `Reven_Pricing_Executive_Summary.md` (tiers, three-metric model); `Partner_Revenue_OS_Venture_Scale_Narrative.md` (Land→Expand→Own, NRR 120%+ target); `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` (the 2M SAR round, zero-revenue Phase 1); `Reven_Execution_Plan_Next_2_Quarters.md` (build order, exit gate, capital sequencing); `README.md` (Capture→Settle→Orchestrate phase model).

**External (third-party, directional — not company facts) — [External]:** Battery Ventures / Neeraj Agrawal, *T2D3* (2015); Bessemer (Centaur / Cloud-100 multiples 26×→23×→20×); KeyBanc / SaaS Capital 2024 (NRR, CAC payback ~20mo median, magic number ~0.90); Sacks (burn multiple); ICONIQ (Rule of 40); Toast / ServiceTitan / BILL / Stripe primary filings (net-take-rate reality, ~25–60 bps); MENA seed median ~$11.6M, Series A → ~$50M (MAGNiTT-class); marketplace migration $30B→$163B / ~29% CAGR; KSA macro (GASTAT, SAMA, CST, IDC ~$39.6B ICT 2025); ZATCA Wave 24 (30 Jun 2026); MISA 14,303 licences 2024 (+67%).

**Derived / lower-confidence (decision-framing, not audited) — [Derived]/[Assumption]:** the entire §4 ARR ladder and §9 integrated table (logos, blended ACV, NRR ramp, GM, CAC payback, magic number, burn multiple, post-money), all value-pool *sizes*, the capture percentages, and the capital envelope. These are *consequences of the stated goal* under cited benchmarks, exposed to show what must be true — **not** predictions, traction, or an offer.

> **Disclaimer.** A reverse-engineering and strategy analysis, not an offer, valuation, forecast of results, or tax/Shariah opinion. The company is pre-revenue and pre-seed; every commercial figure is an assumption or derived requirement to be validated, consistent with the repository's anti-hallucination discipline. The honest floor is the KSA SOM (§10); the Centaur is the bet that the model travels.
