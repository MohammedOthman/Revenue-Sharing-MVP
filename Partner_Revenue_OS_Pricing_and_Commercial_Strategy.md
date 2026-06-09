# Partner Revenue OS — Pricing & Commercial Strategy (Pre-Seed → Unicorn)

**Document type:** Pricing & Commercial Architecture · Venture-Scale Journey · 50-Structure Strategy Catalog
**Product:** Partner Revenue OS — *Partner Revenue Control Layer / system of record for the Partner Revenue Claim*
**Companion to:** `Partner_Revenue_OS_Venture_Scale_Narrative.md`, `Partner_Revenue_OS_Master_Strategy_Dossier.md`, `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md`, `partner-revenue-os-PDR-v5.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, `GTM_Operating_Manual.md`, `Integration_Layer_and_API_Data_Flows_Manual.md`
**Stage reality:** pre-revenue · pre-MVP/early-build · no signed customers, pilots, or bookings · pre-seed · SAR/GCC operating base.

---

## 0. How to read this document (evidence discipline)

This document inherits the repository's one non-negotiable rule: **do not invent traction, customer validation, willingness-to-pay, ACV, or company financials.** Every company-specific commercial number in the repo is *deliberately blank* (a commit — *"Remove weakly-sourced planted figures from the prompt (de-hallucinate)"* — shows the founders strip invented numbers). So this is a **pricing-design and corporate-finance case, not a pricing-result case.** Every price point below is a **benchmarked hypothesis to test**, not a fact.

| Tag | Meaning |
|---|---|
| **[Confirmed]** | Stated in this repository's internal documents (product/GTM/financial/market thesis). Confirms *intent and design*, not market traction. |
| **[External]** | Sourced third-party figure or finding, cited. Directional, not company-specific. Many carry their own skeptic flag (see §11 sources). |
| **[Assumption]** | A pricing hypothesis (the company's or this document's). Plausible, **not yet validated**. |
| **[Validation need]** | Must be converted into evidence (paid pilot, WTP study, real ACV) before it can be claimed. |

**Currency convention.** Prices are quoted in **USD** for comparability with the global comp set, with **SAR** equivalents at the **USD/SAR ≈ 3.75 peg [External — SAMA]**. Local contracts are signed in **SAR**, VAT-inclusive, per GCC procurement norms [Confirmed]. So `$10,000 ≈ SAR 37,500`.

**The reader's contract.** You asked for *skeptical, 10x-aggressive validation, multi-scenario, corporate-finance-grade* pricing. This document is adversarial by design: it red-teams its own recommendations, separates the *gross* headline from the *net* economics, flags where the famous benchmarks are actually thin, and tells you what to **not** do. Read §2 (first principles + the skeptic's gauntlet) before §5 (the 50 structures) — the gauntlet is the lens that makes the 50 legible.

---

## 1. The pricing thesis on one page

**The product is a finance-grade control layer over the Partner Revenue Claim. Therefore the pricing must do three jobs the product's *architecture* already implies, in sequence — and it must never, at any phase, be the thing the buyer resents.** [Confirmed thesis; Assumption on sequencing]

1. **Get adopted (Capture).** Price like the PRM/partner-ops category the Head of Partnerships already understands and budgets for: a **predictable annual subscription on a buyer-friendly value metric (per *active partner*, unlimited internal seats)**, plus an implementation fee. This is the only phase you can actually charge for today. The job of the price here is **to be easy to say yes to and to seed the data** (claims + cross-tenant identity) that every later phase monetizes. [Confirmed]
2. **Earn the money layer (Settle).** Once you are the system of record for what's owed and you produce an **audit-/ZATCA-clean statement that ties out**, add a **thin transactional layer** — a small per-payout fee and, *only with caps and declining tiers*, a few **basis points on settled volume**. The CFO now owns this budget and **resists uncapped percentages** [Confirmed]. The job of the price here is to **convert finance trust into recurring, expansion revenue without becoming a "tax on success."**
3. **Price the network (Orchestrate).** At real scale (nine-/ten-figure volume under management), and only then, take a **small net basis-point rate on partner-revenue/GMV under management**, with **declining tiers + caps**, positioned as cost-of-rail not rake. The job of the price here is to **ride the flow you now sit on** — but you tell the *equity* story on **gross profit**, because the market values payments-flavored revenue like a utility, not like software (§2.4). [External]

**The single most important pricing decision in the whole company:** the category's **most-resented model is the % take-rate on payouts** (PartnerStack 3–15%, Paddle 5%, Tremendous 4–6% — repeatedly described by buyers as "a tax on your own success") [External]. Two credible incumbents — **WorkSpan ("no transaction pricing")** and **Kiflo ("per active partner, unlimited seats")** — *market against it* as a buyer-friendly contrast [External]. **Partner Revenue OS should adopt the same posture: be the neutral Switzerland that does *not* skim a percentage of the partner's money in Phases 1–2, and introduce ad-valorem pricing late, capped, and only on flow you provably enable.** This is both a pricing choice and the GTM wedge against AppDirect/PartnerStack (a marketplace that *is* structurally a rake-taker) [Confirmed positioning].

**Recommended headline architecture (the rest of the document defends this):**

| Phase | Funding stage | Primary value metric | Headline model | Indicative ACV band | Corp-finance target |
|---|---|---|---|---|---|
| **0 · Design partners** | Pre-seed (now) | Per logo (flat) | Paid pilot + locked future price | $5–15K pilot [Assumption] | *Proof, not economics* |
| **1 · Capture** | Seed | **Active partners** | Good-Better-Best annual SaaS + implementation | $6–50K [Assumption], anchored to comps | GM ≥ 75%, NRR ≥ 105%, CAC payback < 18mo |
| **2 · Settle** | Series A | Active partners **+** thin per-payout + capped bps | Hybrid: base + usage, finance-owned | $25–250K+ [Assumption] | GM ≥ 70% blended, **NRR ≥ 115–120%** |
| **3 · Orchestrate** | Series B → unicorn | **Net bps on revenue/GMV under management** | Value-based, declining tiers + caps + network fee | 6–7 figures | Tell story on **gross profit**; NRR ≥ 120–130% |

Everything below — the journey, the segmentation, the 50 structures, the three scenarios, and the corporate-finance model — is an elaboration and stress-test of this table.

---

## 2. First principles & the corporate-finance lenses

Pricing for *this* company is constrained by five facts that most generic SaaS pricing advice ignores. Internalize them before reading the menu.

### 2.1 The product is "software-to-software," so the value metric should scale with the customer's *network*, not their headcount

a16z's durable rule of thumb: monetize **software-to-human** products on seats; monetize **software-to-software** products on usage, because "what removes friction for software-to-software customers actually creates friction for software-to-human customers" [External — a16z]. Partner Revenue OS sits *between systems* (CRM → billing → ERP → banks → ZATCA) and governs *flows* (claims, attributions, statements, payouts). It is structurally software-to-software. The textbook "good value metric" (OpenView: **value-based, flexible, scalable, predictable, feasible to meter**) [External] points at a metric that **grows as the customer's partner business grows** — *active partners → claims/attributed deals → payouts → revenue under management*. That progression is, not coincidentally, the **Capture → Settle → Orchestrate** arc. The value metric *evolves up that ladder* as the product earns the right to meter deeper.

Why this matters financially: a metric that expands automatically with the customer's success is the **NRR engine**. ProfitWell's dataset (vendor data, directional) finds value-metric pricing yields **~half the logo churn and +10–25% expansion** versus feature-only pricing [External]. The public proof points are consumption companies: **Snowflake NRR peaked ~178%, normalized ~125–127%; Datadog sustained >130% for years** [External — SEC filings]. The whole reason to climb the metric ladder is to build a business whose revenue grows even if you never sign another logo.

### 2.2 The gross-margin hierarchy is the master valuation lens — and it is the single biggest risk in this plan

Investors price a *dollar of revenue by its quality*, and quality ≈ gross margin (Damodaran: gross margin is the cleanest proxy for pricing power and unit economics; "firms are priced on *expected* margins") [External]. The hierarchy, highest multiple to lowest:

> **Recurring subscription (75–85% GM) > usage/consumption (high-GM, high-NRR) > one-time services (20–40% GM) > payments/embedded-fintech (≈20–30% GM).** [External]

The empirical gut-punch every founder underestimates: **Toast books ~82% of revenue from fintech, but that fintech line runs only ~21.5% gross margin — ~78% of it is interchange/processing pass-through.** Toast's *net* take is **~54 bps of payment volume**, not the ~2.5% headline. ServiceTitan's payments take is **~0.25% of GTV** ("roughly constant"); BILL's is **~0.26%** (low because it's ACH) [External — SEC filings/S-1]. The market knows this, so it **values Toast and Shopify on EV/gross-profit, not EV/revenue**, and pays **~9–12x for SaaS-like fintech vs. ~4.5x for payments ("utility-type") vs. ~2.6x for lending** [External].

**Implication for Partner Revenue OS — this is the plan's central trap and its central discipline:**
- The "1–3% of partner-attributed revenue" and "bps on GMV" intents in the repo [Confirmed] are *gross* headlines. The **durable net you keep is ~25–60 bps** if any money actually moves [External]. **Never model the business on the gross number.**
- **Keep blended gross margin ≥ 70%.** Below 70%, diligence asks "is this even software?"; below 60% you eat a services/payments discount [External]. That means: (a) the **subscription/SaaS layer must remain the spine**; (b) **implementation/services must be fenced** and priced at least to contribution-positive, ideally pushed to SI partners; (c) if you ever move money, **report "recurring + fintech *gross profit*"** the way Toast does, and tell the equity story there.
- The "Orchestrate" bps layer is a **growth-and-stickiness accelerant, not a multiple-expander.** Pursue it for NRR and moat, present it honestly, and do not let it dominate the P&L in a way that compresses the multiple.

### 2.3 The corporate-finance scorecard every pricing choice must serve

Pricing is not a revenue tactic; it is the control surface for the metrics that determine survival and valuation. The benchmark set (with vintages and skeptic flags) [External]:

| Metric | Definition | "Good → Great" | Reality check |
|---|---|---|---|
| **NRR / NDR** | (start ARR + expansion − contraction − churn) ÷ start ARR; excludes new logos | 100 / 110 / **120+** (Bessemer) | Private **median only ~101%**; venture-backed ~106%. **120%+ is top-quartile, not typical.** SMB <$25K ACV rarely clears 110% (~97%); enterprise >$100K ACV ~118%. |
| **GRR** | retention before expansion; caps at 100% | ~88–91% median; **>95% enterprise** | The honest floor; expansion can't paper over a leaky bucket. |
| **CAC payback** | months of gross-profit to recover S&M | <12 SMB / <18 mid / <24 ent | **2024 median ~20 months** (worse than textbook). Annual prepay can crush this to **~8mo, or month-1 with full upfront.** |
| **LTV:CAC** | lifetime GM value ÷ fully-loaded CAC | **≥ 3:1** | Below 3:1, growth destroys value. |
| **Gross margin** | (rev − COGS) ÷ rev | software **75–85%** | services 20–40%, payments 20–30% (see §2.2). |
| **Rule of 40** | growth% + FCF margin% | **≥ 40** | Only ~11–30% cleared it in 2024–25; **ICONIQ calls it the top predictor of public multiples.** |
| **Magic Number** | net-new ARR ÷ prior-Q S&M | ~1.0 standard, 1.0–1.5 efficient | Private median ~0.90. |
| **Burn Multiple** | net burn ÷ net-new ARR | **<1 great, 1–2 good, >2 suspect** (Sacks) | The repo's own gate; pre-seed runs noisier/higher. [Confirmed the company uses this] |
| **Centaur / Unicorn math** | $100M ARR = "Centaur"; $1B = ARR × multiple | $100M ARR @ 10x = $1B | **Multiples compressed:** Cloud-100 26x→23x→**20x** (2023→25); broad public SaaS **~5x**; private LMM ~4.5–5.3x. **You now need real $100M ARR for a unicorn — nobody underwrites 20–30x outside AI.** T2D3 (Battery, 2015) = triple-triple-double-double-double ≈ $1–2M → ~$100M in 5–6 yrs. |

**How pricing moves each lever (the causal map you will use throughout):**
- **Value metric that scales with the customer → NRR up → multiple up** (the single biggest lever; §2.1).
- **Subscription spine + fenced services/payments → gross margin ≥70% → multiple up** (§2.2).
- **Annual prepay → deferred revenue funds growth → CAC payback and burn multiple down** (and prepaid logos renew ~30% higher) [External]. The cost is a discount — keep that discount **below your cost of capital** so you don't trade away the margin/retention signal the multiple actually pays for.
- **Implementation fee → front-loads cash, filters tire-kickers, deepens switching cost** — but it is low-margin services revenue, so **cap it and fence it.**
- **Discounting destroys quality:** a 10% discount needs ~30% more volume to hold profit; discount-acquired customers carry **~30% lower LTV**; disciplined orgs keep average discount **<25%** and gain ~5–10% realized price [External].

### 2.4 GCC structural constraints rewrite the pricing mechanics (not just the language)

These are not localization niceties; they change the *legal shape* of the fee [External, confirmed against ZATCA/PwC/AAOIFI/SAMA].

- **The Withholding-Tax pivot is the most important contract-structuring fact in the company.** A pure **SaaS "right-to-use" subscription is "business profits" → 0% KSA WHT**, and the customer's reverse-charge VAT nets to nil. But the moment a fee grants **reproduce / resell / distribute / modify-and-cloud-resell rights, ZATCA's Jan-2024 software-payments guideline reclassifies it as a *royalty → 15% WHT*** — and there is **no US–KSA treaty** for relief. ZATCA is actively reassessing distributor/reseller fees as royalties. **Therefore:** keep the subscription a clean usage license; isolate any white-label/OEM/reseller economics into separate, deliberately-structured contracts; and **gross-up or price for 15%** wherever royalty treatment is unavoidable. This single rule constrains structures #46–#49 below.
- **VAT 15%, B2B reverse-charge** nets to nil for a fully-taxable customer [External] — so VAT is a cash-flow/working-capital item (the repo treats it as "working capital, never revenue" [Confirmed]), not a pricing barrier.
- **Sharia compliance is a *pricing-structure* requirement, not a label.** A commission/success fee maps cleanly to **Ju'ala (AAOIFI Shariah Standard 15, "fee-for-result")**, which *uniquely tolerates the fee being a share of an uncertain outcome* because entitlement crystallizes only on the defined result — this is the clean basis for a performance/% fee. A managed-program flat-fee maps to **Wakala (SS-46, agency-for-fee)**. **Hard constraints:** never guarantee a return (→ *riba*); never leave fee terms open-ended/undefined (→ *gharar*) [External]. A **Shariah-board fatwa** is both a compliance gate (if regulated) and a *marketable asset* and **investor de-risking signal**.
- **In-Kingdom data residency is now a real, sellable SKU.** PDPL is enforced (since 14 Sep 2024; SDAIA has issued ~48 violation decisions), and AWS Riyadh reached GA (Jan 2026) alongside Google/Oracle/Azure KSA regions — so a **PDPL-compliant, in-Kingdom-hosted, ZATCA-integrated enterprise tier** is technically deliverable and demanded by SAMA/NCA-regulated buyers [External].
- **Cash and cycle reality:** **net-90 to 120+ day DSO**, **6–18-month enterprise/government sales cycles**, **RHQ required for government deals > SAR 1M**, **GCC local-content price preferences up to 10%**, and channel/local-entity GTM [External]. Pricing must assume slow cash (favor annual prepay; see §2.3) and procurement friction (favor paid pilots that pre-qualify; publish anchors but expect negotiation).

### 2.5 The journey is real: pricing must *change shape* as the company scales

The evidence is unambiguous that pricing is a staged discipline, not a one-time decision [External]: start radically simple → add one value metric → add good-better-best tiering → add a usage/expansion axis → move to value/outcome with commitments and ramps. **86% of $100M+ SaaS companies use ≥3 pricing dimensions** [External, directional]. Repricing is normal: customers absorb **3–5%** increases easily; **>15–20%** needs grandfathering; SaaS leaves an estimated **11–17% of revenue/yr** on the table by under-optimizing [External]. The repo already institutionalizes this: a **monthly pricing & packaging review for the first ~18 months** [Confirmed]. So the 50 structures are not a buffet to pick one from once — they are a **time-sequenced toolkit**, and §3 is the sequence.

### 2.6 The skeptic's gauntlet — every pricing structure in §5 is scored against these 7 tests

> A pricing structure earns "Adopt now" only if it passes the gauntlet *at the company's current phase*. This is the "10x-aggressive validation" lens applied uniformly.

1. **Adoption test:** Will the *Head of Partnerships* (Phase 1 budget owner) say yes without finance escalation, at a price they can defend internally? Resented mechanics (uncapped %) fail here.
2. **Net-economics test:** After pass-through cost (interchange/PSP split 1–3%, KYB, ZATCA middleware, in-Kingdom hosting premium 20–40%), does the structure leave **≥70% blended GM**? If it's a flow-based fee, what's the **net** take, not the gross?
3. **Predictability test:** Can the customer *forecast* their bill, and can *you* forecast revenue? Finance buyers reject bill-shock; investors reward predictable recurring revenue.
4. **NRR test:** Does it expand automatically as the customer grows (good), or does it require a re-negotiation/upsell motion (worse), or cap out (worst)?
5. **Moat/neutrality test:** Does it reinforce the "neutral Switzerland, finance-grade, compliance-native" position — or does it make you look like the rake-taking marketplace you're positioned against?
6. **Regulatory test:** Does it survive the WHT royalty trap, VAT, Sharia (no riba/gharar), and PDPL — or does it create a tax/Shariah problem?
7. **Stage-fit test:** Is it monetizable *now* given pre-revenue/pre-scale reality, or does it require volume/trust the company does not yet have? (bps-on-flow fails this at pre-seed; it needs Toast/ServiceTitan-scale volume.)

Verdicts used in §5: **🟢 Adopt now · 🟡 Pilot/stage-gated · 🔵 Defer (later phase) · 🔴 Avoid (or only in a narrow case).**

---

## 3. The pricing journey — current phase → unicorn

This section unifies the three phase-models in the repo into one spine and attaches a pricing posture, a corporate-finance target, the comps that anchor it, the risks, and the **exit gate** to the next phase. The three repo models map as follows [Confirmed], and this document adds the pricing layer:

| This doc | Venture Narrative stage | Dossier arc | Build path | Burn phase (12-mo model) | Funding |
|---|---|---|---|---|---|
| Phase 0 | (pre-Stage 1) | pre-Capture | pre-MVP | Foundation M1–3 / Pilot M4–6 | Pre-seed |
| Phase 1 | Stage 1 Wedge → Stage 2 Repeatable | **Capture** (0–9mo) | MVP → V1 | Activation M7–9 / Hardening M10–12 | Seed |
| Phase 2 | Stage 3 Platform Expansion | **Settle** (9–24mo) | V2 | (post-model) | Series A |
| Phase 3 | Stage 4 Category → Stage 5 Venture-Scale | **Orchestrate** (24+mo) | V3 | — | Series B → growth → unicorn |

### Phase 0 — Design partners (pre-seed, *now*)

- **What you sell:** not a product — *proof and partnership.* A **paid** design-partner agreement / pilot, scoped narrow (one partner type, one workflow, one finance review, one executive report) [Confirmed GTM].
- **Pricing posture:** **charge *something* — paid pilots, never free.** Best practice for design partners is a **locked, deep discount (30–50% off future list) for 12–24 months, with a hard "go paid or stop" conversion deadline**, agreed *now* [External]. The repo is explicit: the pilot is paid and has a conversion path [Confirmed]. The point is **skin in the game and a real ACV data point**, not unit economics.
- **Indicative number [Assumption]:** a $5–15K (SAR ~19–56K) paid pilot, creditable toward Year-1 ACV on conversion. Validate with the buyer; do not anchor too low (you set your future floor here).
- **Corp-finance target:** *none on economics.* The deliverables are the repo's own seed bar inputs — **a working MVP on 100+ real claims, 3–5 paid pilots, first defensible ACV, ≥70% activation, time-to-first-claim <14 days** [Confirmed].
- **Run these validation experiments now (the "10x" part):** (a) **Van Westendorp price-sensitivity** interviews (works with no reference price — ideal pre-revenue) to find the acceptable range and optimal point; (b) **MaxDiff** on the V1/V2 feature list to learn which capabilities drive WTP (Leaders vs. Fillers vs. Killers, à la Ramanujam); (c) a **paid-pilot conversion** as the only WTP proof that counts. Stated interest ≠ paying behavior — run scenarios, not hypotheticals [External].
- **Exit gate → Phase 1:** repo's Phase-1 gate met (3–5 design partners, evidence pack accepted by a finance reviewer, weekly active usage) **plus a defensible price range from WTP work** [Confirmed + Assumption].

### Phase 1 — Capture (seed)

- **The job of price:** be **easy to adopt and seed the data.** This is the only phase you can broadly monetize today.
- **Primary value metric:** **active partners** — the market-norm, buyer-friendly axis (Kiflo, Channeltivity, Crossbeam all meter on partner/connection count) [External; Confirmed intent]. **Unlimited internal seats** (so you never tax internal adoption — the opposite of Magentrix's per-seat friction). "Active" must be defined precisely to avoid gaming (Validation need).
- **Headline model:** **Good-Better-Best annual SaaS + a fenced implementation fee.** Three public tiers + a custom enterprise tier is the category norm (~3.2 tiers average) [External]. Name them **Starter / Growth / Enterprise** [Confirmed].
- **Indicative packaging [Assumption — benchmarked, to validate]:**

  | Tier | Active partners | Core scope | Indicative annual | Comp anchor |
  |---|---|---|---|---|
  | **Starter** | up to ~25 | Claim ledger + attribution-of-record + protection + 1 CRM connector + evidence export | **$6–12K** (SAR 22–45K) | Kiflo $299–799/mo; category SMB band $149–799/mo |
  | **Growth** | ~25–100 | + partner statements, disputes, finance evidence pack, payout-eligibility preview, data-quality engine | **$18–40K** (SAR 67–150K) | mid-market $25–50K; vertical SaaS $25–50K |
  | **Enterprise** | 100+ (capped, custom) | + multi-entity, ZATCA/WHT/VAT, Arabic/RTL, SSO/SCIM, in-Kingdom residency, SLA, dedicated CSM | **$50–150K+** (SAR 190–560K+) | Impartner $25/45/75K tiers; enterprise >$100K |
  | **Implementation** | — | productized onboarding, fenced | **15–30% of Y1 ACV** or fixed $5–25K bands | GTM manual: paid, scope-limited [Confirmed] |

- **Corp-finance targets:** **GM ≥ 75%** (pure SaaS; implementation fenced and contribution-positive), **NRR ≥ 105%** (early expansion via partner-count growth + tier upgrades), **CAC payback < 18 months** (favor **annual prepay** to pull it toward ~8mo and protect runway against 90–120-day DSO), **burn multiple trending < 2** per the repo's gate.
- **Pricing-page posture:** **publish Starter/Growth anchors** (ACV <$25K converts far better with visible pricing; hiding all numbers drives ~30% abandonment), **"starting at $X, contact sales"** for Enterprise [External].
- **What to *avoid* now (🔴):** any **% take-rate / bps-on-flow** (fails the stage-fit and net-economics tests — no volume, no trust, and it cannibalizes the neutral-Switzerland wedge); pure **per-seat** (penalizes adoption, seat growth has stalled to ~2.2% industry-wide [External]); **free trials/freemium** at this ACV/sales-led motion (freemium converts ~2–5%; this is a committee sale, not PLG).
- **Exit gate → Phase 2 (repo's Phase-1/seed bar):** MVP on 100+ real claims; **3–5 paid logos**; the proof sentence *"their payouts now reconcile and produce a ZATCA-clean invoice"*; **~$10–30K+ MRR, 2–3 anchor logos, 15–20% MoM (or 2–3× YoY), NRR >100%, demonstrated ZATCA/localization moat, 18–24mo runway** [Confirmed]. Map to MENA seed reality: **$1–5M raise at ~$11–18M post-money** [External].

### Phase 2 — Settle (Series A)

- **The job of price:** **convert finance trust into expansion revenue** without becoming the resented rake. The economic buyer shifts to the **CFO/Finance**, who owns the payout budget and **resists uncapped %** [Confirmed].
- **Value-metric evolution:** keep the active-partner subscription as the floor, and **add a thin transactional layer**: a **per-payout fee (~$0.25–0.50; Trolley charges $0.25)** and/or **10–30 bps on settled volume** *once you are the settlement system of record* [Confirmed; External comps]. Run the **first value-based test: ~1–3% of partner-attributed revenue under management** on a *subset* of willing accounts [Confirmed] — but treat 1–3% as a **gross** number and watch the **net** (after PSP/KYB/compliance cost) against the ≥70% GM line.
- **Headline model:** **hybrid — base subscription + capped usage.** Hybrid is the evidence-backed modern default (≈61% of SaaS by 2026) and has the best retention profile [External]. The discipline that makes it survive finance scrutiny: **declining tiers + hard caps + minimums + "more carrots, less stick"** (avoid punitive overages; use true-ups, dashboards, optional prepaid commits) [External].
- **Critical neutrality move:** position the transactional fee as **per-payout (a flat rail fee), not a % skim**, for as long as possible. If you must take bps, **cap the percentage** (Stripe caps ACH at 0.8%/$5) so large payouts aren't penalized, and keep it well under the disliked PartnerStack 3–15% band. This *is* the AppDirect counter-positioning expressed in pricing.
- **Indicative bands [Assumption]:** ACV **$25–250K+**; finance-grade Enterprise deals add the compliance premium (§5 Family F). Introduce **multi-year + ramp** deals (Y1 discounted to land, Y2/3 step toward list) and **annual prepay with drawdown** to lock retention and cash.
- **Corp-finance targets:** **blended GM ≥ 70%** (the transactional layer's pass-through cost starts to bite — fence and watch it), **NRR ≥ 115–120%** (this is the phase where the NRR engine must visibly turn — module attach + payout-volume growth + tier upgrades), **GRR ≥ 90%**, **Rule-of-40 in view.** The repo's own Phase-2 gate: *settlement idempotent (zero double-pays), clean ERP reconciliation, NRR signal >110–120% via module attach, a CFO says on a reference call "we trust these numbers"* [Confirmed].
- **Exit gate → Phase 3:** durable NRR ≥ 120%; settlement-of-record trusted across multiple logos; the **cross-tenant identity graph** (seeded in Phase 1) is dense enough that a partner appears across many customers — i.e., the network is ready to light up. Series A metrics support a Series B (Series A in MENA steps to ~$50M valuation territory [External]).

### Phase 3 — Orchestrate (Series B → growth → unicorn)

- **The job of price:** **ride the flow you now sit on**, and **monetize the network.** This is where venture-scale economics are won — and where the gross-vs-net discipline is existential.
- **Value metric:** **net basis points on partner-revenue / GMV under management**, with **declining tiers + caps**, plus a **network membership/access fee** for the cross-tenant settlement graph. Comps: **Stripe Billing 0.7% of billing volume**; **durable embedded-fintech net take ~25–60 bps** (Toast ~54, ServiceTitan ~25, BILL ~26) [External]. **Heed Gurley ("A Rake Too Far"): extract less than you can — a low durable rake maximizes GMV-under-management and defensibility** [External]. Booking.com beat incumbents by taking 10% vs 30%.
- **Headline model:** value-based ad-valorem on flow + network fee, *on top of* the subscription spine. **Two-sided potential** (company-side + partner-side), and **free-to-discover / pay-to-settle** to maximize network liquidity (the Crossbeam playbook: free on density, paywall at the differentiated layer — here, settlement) [External; Confirmed network design].
- **The equity-story discipline (do not skip):** because payments-flavored revenue is multiple-compressed (~4.5x vs ~9–12x for SaaS-like), **report and narrate on "recurring + fintech *gross profit*"** exactly as Toast does; **keep the SaaS subscription a large, growing share of *gross profit*** so the blended multiple stays software-like; consider **net revenue recognition** for any pure pass-through so the top line isn't inflated by interchange [External].
- **Corp-finance targets:** **NRR ≥ 120–130%** (consumption-grade), **gross-profit growth** as the headline, **Rule-of-40 ≥ 40** as the public-multiple driver, and the **Centaur path**: real **$100M ARR** (or ARR-equivalent gross profit) is the unicorn bar now that multiples have compressed to ~5x broad / ~20x elite. T2D3 cadence is the growth shape that gets you there in ~5–6 years from ~$1–2M [External].
- **Regulatory gate on the ad-valorem layer:** structure the % as **Ju'ala (fee-for-result)** to stay Sharia-clean; keep it distinct from any reproduce/resell rights to avoid the **15% royalty WHT** trap; obtain the **Shariah fatwa** before marketing "Sharia-compliant"; host in-Kingdom for regulated flow [External].
- **Endgame:** the credit-allocation and Partner-P&L system of record for partner-led revenue — *"own the ledger every Partner P&L runs on"* [Confirmed], value-priced on revenue-under-management, defended by the identity-resolution data network effect + finance/compliance trust + switching costs.

---

## 4. Segmentation architecture (multi-tier, multi-segment)

Pricing is segmentation made operational. Generic SaaS uses one or two axes; a finance-grade, compliance-native control layer in the GCC has **six legitimate price-fencing axes** [External taxonomy: identity/role, geography, quantity, bundle, version, commitment]. The art is layering them without SKU sprawl — **86% of $100M+ SaaS run ≥3 pricing dimensions** [External], so multi-axis is the destination, but you *add* axes phase by phase (§2.5), you don't launch with all six.

### 4.1 Axis A — Company size (the ACV spine)

Anchored to the repo's bands [Confirmed] and the comp set [External]:

| Segment | Active partners (typical) | ACV band | Motion | Pricing-page | Primary fence |
|---|---|---|---|---|---|
| **SMB / early-stage** | 10–30 | **$5–15K** (early-stage median ~$12K) | Low-touch sales-assist | Published | Per-active-partner, Starter tier |
| **Mid-market** | 30–150 | **$15–50K** (vertical SaaS $25–50K) | Founder/AE-led | "Starting at" | Tier + partner count + module attach |
| **Enterprise** | 150–500+ | **$50–250K+** | Multi-stakeholder, 6–18mo | Contact sales | Multi-entity + compliance + SLA + volume |
| **Strategic / conglomerate** | 500+ / multi-BU | **6–7 figures** | Account-based, RHQ-aware | Bespoke | Per-entity + network + ad-valorem (Phase 3) |

Skeptic note: **SMB NRR rarely clears 110% (~97%); enterprise ~118%** [External]. So the *mix* you sell determines whether the NRR engine can reach venture-scale. **Bias the book toward mid-market/enterprise** even though SMB is easier to close — an all-SMB book caps your multiple.

### 4.2 Axis B — Vertical (willingness-to-pay & compliance intensity differ by industry)

The repo's KSA/GCC strong segments [Confirmed], re-ordered by *pricing power* (urgency of the non-discretionary compliance/finance pain → higher WTP):

1. **Fintech & payments** — highest WTP: SAMA-regulated, audit-heavy, partner/agent networks where money moves; ZATCA + WHT + Sharia all bite. *Premium compliance tier lands here first.*
2. **IT / cloud / cybersecurity resellers & digital-transformation vendors** — large, multi-touch co-sell/marketplace motion; the global-expansion bridge (Phase 3).
3. **Insurance / insurtech (brokers)** — commission-driven by construction; Ju'ala/Wakala structures resonate; Najm/Nphies rails.
4. **B2B SaaS** — the global-template segment; the bridge to non-GCC markets.
5. **Telecom ecosystem, logistics/last-mile, real estate platforms, healthcare aggregators, procurement platforms, tourism/hospitality, franchise operators, retail groups** — vary by partner-revenue materiality; qualify on the ICP scorecard, not the logo.

Pricing use: **vertical editions** (industry-specific rule libraries, connectors, evidence templates) are a legitimate fence and a Phase-2 expansion lever — *but* don't build vertical SKUs before the horizontal claim ledger is proven (the repo's "too broad too early" risk).

### 4.3 Axis C — Geography (the expansion ladder, and the compliance moat)

| Ring | Pricing implication |
|---|---|
| **KSA (beachhead)** | SAR contracts, VAT-inclusive, ZATCA/WHT/PDPL/Sharia native — **the compliance premium is the wedge incumbents can't retrofit.** RHQ for gov >SAR 1M. |
| **GCC (UAE, etc.)** | Multi-entity/multi-jurisdiction tier; UAE data-residency option (Azure UAE); GCC price-preference dynamics. |
| **MENA / adjacent high-compliance emerging markets** | Expand *here* before US/EU (Crossbeam/WorkSpan/AppDirect entrenched there) [Confirmed]. PPP/regional pricing fence. |
| **Global co-sell / marketplace (Phase 3 prize)** | The same claim ledger governs a global SaaS company's marketplace co-sell; ride the $30B→$163B marketplace migration. Compete on neutrality, not localization, here. |

### 4.4 Axis D — Buyer & budget (who signs, and from which pocket)

This axis *is* the Capture→Settle transition. The repo confirms the budget split [Confirmed]:

- **Partnerships budget** (growth-funded, %-tolerant, predictability-seeking) **buys Capture.** Sell the Head of Partnerships a predictable per-partner subscription.
- **Finance budget** (cost-control, predictability-seeking, **resists uncapped %**) **co-signs Settle.** Sell the CFO reconciliation, audit-clean statements, leakage reduction, ZATCA-clean payouts — and price the money layer as a *rail*, not a rake.
- **Supporting validators/blockers to price around:** RevOps (process/implementation), IT/Security (SSO/SCIM/residency — gate to Enterprise), CRO (channel-conflict; can block if partner attribution threatens direct comp), CEO/Board (strategic ROI).

### 4.5 Axis E — Compliance intensity (the premium ladder, now sellable)

A clean, defensible up-sell ladder unique to this product [Confirmed product capability + External feasibility]:

| Level | Buyer | What's gated | Premium |
|---|---|---|---|
| **L0 Standard** | SMB | Public-cloud region, ZATCA references, VAT fields | base |
| **L1 Regulated-ready** | Mid-market | ZATCA Phase-2 clearance, WHT engine (5/15/20%), PDPL handling, 72-hr breach | +mid-tier |
| **L2 In-Kingdom** | Enterprise / SAMA-NCA | In-Kingdom residency (AWS KSA/Azure UAE), NCA ECC/CCC, continuous KYB, audit/evidence pack | **+10–20% (and rising to table-stakes)** |
| **L3 Sharia-certified** | Islamic-finance buyers/investors | Ju'ala/Wakala fee structures + **Shariah-board fatwa** | premium + trust asset |

Skeptic note: ZATCA Wave 24 pulls **all** B2B > SAR 375K into Phase-2 by 30 Jun 2026 [External] — so compliance is **migrating from premium upsell to table-stakes.** Charge for it *now* while it's still a differentiator; expect to bundle more of it into base over 2026–27.

### 4.6 Axis F — Partner-model & usage (the metric that scales)

The product supports **12 partner roles** (referrer, influencer, co-seller, reseller, distributor, implementation, marketplace, strategic alliance, affiliate, white-label, franchise, service-delivery) [Confirmed]. The usage meters available, in ascending order of "depth earned" (and mapped to the journey):

**Capture meters:** active partners · partner types/programs · internal seats (free) · CRM connectors · claims submitted/attributed.
**Settle meters:** revenue events · payouts/disbursements · statements generated · ZATCA clearances/invoices · reconciliations/exceptions resolved · KYB checks.
**Orchestrate meters:** revenue/GMV under management (bps) · cross-tenant network connections · multi-entity/currency pairs · API/developer calls · third-party app rev-share.

### 4.7 The packaging synthesis — how the axes combine into SKUs

> **Spine:** Good-Better-Best (Starter / Growth / Enterprise) on **active partners** (Axis F), with **internal seats free**.
> **× Compliance ladder** (Axis E) as a stackable premium (L1/L2/L3 add-ons or higher tiers).
> **× Geography/vertical editions** (Axes B/C) as Phase-2 expansion fences.
> **+ Settle usage layer** (per-payout, capped bps) added when finance becomes the buyer.
> **+ Orchestrate ad-valorem + network fee** added only at scale.
> **+ Fenced implementation/services and premium support/SLA** across all tiers.

This is the **≥3-dimension model** the data says $100M+ SaaS converge on — reached *incrementally*, never launched all at once.

---

## 5. The 50 pricing structures (a time-sequenced strategy, not a buffet)

These are **52 structures** (50 core + 2 bonus) organized into seven families. **They are not alternatives to pick one of — they are a phased toolkit.** Each entry carries a gauntlet verdict (§2.6): **🟢 Adopt now (Phase 1) · 🟡 Pilot/stage-gated · 🔵 Defer to Settle/Orchestrate · 🔴 Avoid / narrow-case.** Read the master index first, then the detail.

Each detailed entry uses one template: **Mechanism → Best for → Anchor (comp) → Corp-finance read → Pros → Cons/risks → Narrative tie-in.**

### 5.0 Master index

| # | Structure | Family | Phase | Primary metric | Verdict |
|---:|---|---|---|---|:--:|
| 1 | Flat single-price platform fee | A Subscription | 0–1 | per company | 🟡 |
| 2 | **Good-Better-Best three-tier** | A | 1 | tier + partners | **🟢** |
| 3 | Per-active-partner (linear) | A | 1 | active partners | 🟢 |
| 4 | Per-active-partner, declining tiers | A | 1 | active partners | 🟢 |
| 5 | Per-internal-seat | A | 1 | seats | 🔴 |
| 6 | **Hybrid base + per-active-partner** | A | 1 | base + partners | **🟢** |
| 7 | Per-partner-type / per-program module | A | 1–2 | programs | 🟡 |
| 8 | Single-sided (free partners, paid company) | A | 1 | per company | 🟢 |
| 9 | Per-claim / per-attributed-deal | B Usage | 1–2 | claims | 🟡 |
| 10 | Per-revenue-event tracked | B | 2 | revenue events | 🟡 |
| 11 | **Per-payout / per-disbursement (flat rail)** | B | 2 | payouts | **🟢→2** |
| 12 | Per-statement generated | B | 2 | statements | 🔵 |
| 13 | Per-integration / per-connector | B | 1–2 | connectors | 🟡 |
| 14 | Per-ZATCA-clearance / per-invoice | B | 2 | clearances | 🟡 |
| 15 | Per-reconciliation / per-exception | B | 2 | exceptions | 🔵 |
| 16 | Prepaid credits / fungible usage pool | B | 2 | credits | 🟡 |
| 17 | Bps on settled payout volume (10–30) | C Value | 2 | settled volume | 🔵 |
| 18 | % of partner-attributed revenue (1–3%) | C | 2–3 | revenue under mgmt | 🔵 |
| 19 | **Net bps on GMV/RUM, declining + caps** | C | 3 | RUM | **🔵** |
| 20 | Two-sided take-rate | C | 3 | both sides | 🔵 |
| 21 | Free-to-discover, pay-to-settle (network) | C | 3 | settlement events | 🔵 |
| 22 | Savings-/leakage-recovery share (outcome) | C | 2–3 | recovered leakage | 🟡 |
| 23 | Float / interest on funds held | C | 3 | float | 🔴 |
| 24 | FX / cross-border spread pass-through | C | 2–3 | FX volume | 🟡 |
| 25 | Base subscription + metered overage | D Hybrid | 2 | base + usage | 🟢→2 |
| 26 | Platform fee + capped bps-on-flow | D | 2–3 | base + flow | 🔵 |
| 27 | Seat (humans) + usage (AI agents) | D | 2–3 | seats + agent runs | 🔵 |
| 28 | Committed-use + on-demand burst | D | 2–3 | commit + burst | 🔵 |
| 29 | Subscription floor + outcome fee | D | 2–3 | base + outcome | 🟡 |
| 30 | **Three-axis: tier + partners + bps** | D | 3 | multi-dimensional | **🔵** |
| 31 | Minimum platform commit + all metered | D | 2–3 | commit + meters | 🟡 |
| 32 | Entitlement/quota + true-up | D | 2 | quota | 🟢→2 |
| 33 | **Annual prepay with drawdown** | E Contract | 1 | term | **🟢** |
| 34 | Multi-year ramp deal (Y1→Y3) | E | 2 | term | 🟡 |
| 35 | Enterprise platform license (uncapped) | E | 2–3 | flat | 🟡 |
| 36 | Per-entity / per-business-unit | E | 2 | entities | 🟢→2 |
| 37 | **Paid pilot / POC → conversion** | E | 0 | per pilot | **🟢** |
| 38 | **Implementation / onboarding fee (fenced)** | E | 1 | one-time | **🟢** |
| 39 | Premium support / SLA tiers + CSM | E | 1–2 | tier | 🟢 |
| 40 | Auto-renew + annual uplift clause | E | 1 | CPI/fixed % | 🟢 |
| 41 | **Compliance premium module** | F Compliance | 1–2 | add-on | **🟢** |
| 42 | **Sharia-compliant Ju'ala fee-for-result** | F | 2–3 | result | **🟡** |
| 43 | In-Kingdom data-residency tier | F | 2 | add-on | 🟢→2 |
| 44 | Regulated-buyer (SAMA/CMA) premium | F | 2 | tier | 🟡 |
| 45 | Government / Etimad / RHQ-ready tier | F | 2–3 | tier | 🔵 |
| 46 | Audit & evidence-pack-as-a-service | F | 1–2 | add-on/usage | 🟢 |
| 47 | White-label / OEM embed (WHT-structured) | G Ecosystem | 3 | royalty/per-unit | 🔵 |
| 48 | Marketplace / app-store rev-share | G | 3 | % of app sales | 🔵 |
| 49 | Channel / reseller / SI margin | G | 2–3 | margin | 🟡 |
| 50 | Data & benchmark intelligence licensing | G | 3 | subscription | 🔵 |
| 51 | Network membership / access fee | G | 3 | per member | 🔵 |
| 52 | Developer / API platform metered access | G | 3 | API calls | 🔵 |

---

### Family A — Subscription / access core *(the Capture spine)*

**#1 — Flat single-price platform fee** · `A · Phase 0–1 · per company · 🟡`
- **Mechanism:** one price, all features, no metering. The simplest possible model.
- **Best for:** the very first design-partner deals, where simplicity > optimization and you want zero negotiation friction.
- **Anchor:** ~$10–20K/yr [Assumption]; category SMB band $149–799/mo [External].
- **Corp-finance:** GM high (pure SaaS); **NRR weak** (no built-in expansion — flat fee's #1 cited flaw [External]); maximally predictable.
- **Pros:** trivial to sell/forecast; no gaming.
- **Cons/risks:** leaves money on the table at the top; no NRR engine → caps the multiple; you'll outgrow it by Phase 1.
- **Narrative tie-in:** acceptable as a *transitional* Phase-0 simplicity, but the venture thesis needs an expanding metric — graduate to #2/#6 fast.

**#2 — Good-Better-Best three-tier (the spine)** · `A · Phase 1 · tier + active partners · 🟢`
- **Mechanism:** Starter / Growth / Enterprise, differentiated by partner-count bands *and* capability depth (claim ledger → +statements/disputes/evidence → +multi-entity/compliance/SLA).
- **Best for:** the core Capture motion across SMB→Enterprise.
- **Anchor:** $6–12K / $18–40K / $50–150K+ [Assumption]; mirrors Impartner $25/45/75K and Kiflo $299–799/mo [External].
- **Corp-finance:** GM ≥75%; NRR via tier-upgrade + partner growth; the middle "Growth" tier is the anchor (captures the majority of buyers; premium tier makes it look reasonable [External]); supports a published pricing page <$25K and "contact sales" Enterprise.
- **Pros:** category-standard (~3.2 tiers norm), easy to reason about, built-in upgrade ladder.
- **Cons/risks:** tiers must be fenced by a *value metric* or they cannibalize; feature-only differentiation has ~2× the churn of value-metric pricing [External].
- **Narrative tie-in:** **the recommended Phase-1 headline.** Directly operationalizes the repo's named Starter/Growth/Enterprise.

**#3 — Per-active-partner (linear)** · `A · Phase 1 · active partners · 🟢`
- **Mechanism:** $X per active partner per month/year; internal seats unlimited.
- **Best for:** buyers who think of their program in "number of partners"; the market-norm axis.
- **Anchor:** category per-partner pricing **$15–50/partner/mo** [External]; Kiflo's "per active partner, unlimited seats" is the buyer-friendly exemplar.
- **Corp-finance:** GM high; **NRR strong** (expands automatically as the program grows — the value-metric ideal); predictable for the buyer if "active" is clearly defined.
- **Pros:** scales with customer value; aligns with how partnerships leaders budget; unlimited seats removes adoption friction.
- **Cons/risks:** "active" definition can be gamed (customers prune partners to cut cost); linear pricing punishes large programs (fix with #4).
- **Narrative tie-in:** the repo's confirmed Capture metric — *"price per active partners (Kiflo/Impartner norm); don't tax flow yet."*

**#4 — Per-active-partner with declining tiers** · `A · Phase 1 · active partners · 🟢`
- **Mechanism:** #3 but the per-partner rate steps down across volume bands (first 25 at $X, next 75 at $0.7X, 100+ custom).
- **Best for:** mid-market/enterprise with large partner counts who'd balk at linear pricing.
- **Anchor:** declining-tier schedules are standard so large customers don't face linear cost growth [External].
- **Corp-finance:** preserves NRR while defusing the "tax on success" objection *before* it appears; protects expansion into big accounts.
- **Pros:** lands large programs; signals partnership not penalty.
- **Cons/risks:** margin compression at top bands (model it); slightly harder to quote.
- **Narrative tie-in:** the buyer-friendly refinement that lets the Capture metric scale into Enterprise without resentment.

**#5 — Per-internal-seat** · `A · Phase 1 · seats · 🔴`
- **Mechanism:** charge per internal user (partner managers, finance, RevOps).
- **Best for:** *almost nothing here* — included only to mark it as a deliberate non-choice.
- **Anchor:** Magentrix $79–199/seat/mo; Crossbeam +$1,800/seat/yr [External].
- **Corp-finance:** **anti-NRR** — penalizes internal adoption, and industry seat growth has stalled to ~2.2%; AI further decouples value from seat count [External].
- **Pros:** familiar, predictable.
- **Cons/risks:** suppresses the very usage that makes you sticky; wrong for a software-to-software control layer.
- **Narrative tie-in:** 🔴 **Avoid.** Unlimited seats is a *feature* of the wedge (#3); charging for them undercuts adoption and the moat.

**#6 — Hybrid base + per-active-partner** · `A · Phase 1 · base + partners · 🟢`
- **Mechanism:** a platform base fee (covers fixed value + your fixed cost) + a per-active-partner component.
- **Best for:** the cleanest Phase-1 model that protects margin floors *and* expands.
- **Anchor:** Crossbeam's "$4,800/yr platform + $1,800/seat" is the template (base + per-unit) [External].
- **Corp-finance:** base = revenue floor + predictability; per-partner = NRR engine. Best blend of the flat-fee floor (#1) and pure-usage expansion (#3).
- **Pros:** predictable for both sides; protects you on small accounts (floor) and grows on large ones.
- **Cons/risks:** two components to explain; set the base low enough not to deter SMB.
- **Narrative tie-in:** **co-recommended Phase-1 model with #2** — the base anchors finance-grade seriousness; the per-partner meter is the value axis.

**#7 — Per-partner-type / per-program module** · `A · Phase 1–2 · programs · 🟡`
- **Mechanism:** price by which partner programs are switched on (referral, reseller, co-sell, marketplace…), each a module.
- **Best for:** customers running several distinct motions who want to start with one.
- **Anchor:** the product's 12 partner roles [Confirmed] make natural module fences.
- **Corp-finance:** module attach is a classic expansion lever (NRR); aligns price to breadth of use.
- **Pros:** land-with-one, expand-to-many; maps to real program structure.
- **Cons/risks:** can fragment the offer; risk of under-pricing the first module.
- **Narrative tie-in:** supports Land→Expand; pairs well with the GBB tiers as an add-on axis in Phase 2.

**#8 — Single-sided (free for partners, paid for company)** · `A · Phase 1 · per company · 🟢`
- **Mechanism:** the customer company pays; external partners use the portal free.
- **Best for:** *always, in Phases 1–2* — it's a posture, not a tier.
- **Anchor:** the repo is explicit the **payer is the company, not the partner** [Confirmed].
- **Corp-finance:** keeps the sale simple (one payer); avoids the two-sided complexity until the network phase.
- **Pros:** maximizes partner adoption (free) → more data → better attribution; no partner-side billing ops.
- **Cons/risks:** leaves partner-side monetization on the table (deliberately — capture that in Phase 3 via #20/#21).
- **Narrative tie-in:** the right default; partner-side/network monetization is a *late* unlock once density exists.

---

### Family B — Usage / consumption meters *(Capture → Settle)*

**#9 — Per-claim / per-attributed-deal processed** · `B · Phase 1–2 · claims · 🟡`
- **Mechanism:** meter on Partner Revenue Claims submitted/attributed.
- **Best for:** a usage axis that ties directly to the canonical object, for high-volume programs.
- **Anchor:** no clean comp; analogous to per-transaction infra pricing [External].
- **Corp-finance:** scales with the core activity; GM high (software). Risk: claims volume is lumpy → revenue less predictable.
- **Pros:** purest tie to the value object (the claim); software-to-software-appropriate.
- **Cons/risks:** can deter the very data capture you want (customers under-submit to save cost) — the cardinal usage-pricing trap; bill-shock risk.
- **Narrative tie-in:** 🟡 use as an *optional* high-volume add-on, never as the gate on data capture (capture must stay frictionless to feed the moat).

**#10 — Per-revenue-event tracked** · `B · Phase 2 · revenue events · 🟡`
- **Mechanism:** meter on revenue events (invoiced/collected/recognized) linked to claims.
- **Best for:** customers with continuous/usage-based partner revenue (the "why now" tailwind).
- **Anchor:** AvidXchange's per-transaction "yield" model ($4.76→$5.45/txn) shows per-event pricing works at scale [External].
- **Corp-finance:** aligns to continuous revenue; predictable if event volume is stable.
- **Pros:** matches the shift from one-time to continuous partner revenue; fair.
- **Cons/risks:** requires deep billing/ERP integration (V2); double-counting risk vs #11.
- **Narrative tie-in:** a Settle-phase meter that proves the product handles *continuous* attribution — directly the repo's "no spreadsheet survives continuous attribution."

**#11 — Per-payout / per-disbursement (flat rail fee)** · `B · Phase 2 · payouts · 🟢→Phase 2`
- **Mechanism:** a small flat fee per partner payout processed (e.g., $0.25–0.50).
- **Best for:** the Settle phase, as the *neutral* alternative to a % skim.
- **Anchor:** **Trolley $0.25/payout; repo intent $0.25–0.50** [External; Confirmed]. Tipalti per-txn $0.40–$2 ACH.
- **Corp-finance:** flat per-unit keeps it a *rail* (predictable, finance-friendly); net margin depends on your PSP/bank cost per payout — keep the fee above marginal cost.
- **Pros:** **finance loves flat, hates uncapped %**; reinforces neutral-Switzerland; predictable.
- **Cons/risks:** revenue concentrated in a few large payouts; doesn't capture value of *large* payouts (that's fine — see neutrality).
- **Narrative tie-in:** **the single best Settle-phase money-layer entry** — it's the anti-rake that counter-positions AppDirect/PartnerStack while still monetizing the flow.

**#12 — Per-statement generated** · `B · Phase 2 · statements · 🔵`
- **Mechanism:** meter on partner statements / evidence packs produced.
- **Best for:** finance-heavy accounts that value the audit artifact.
- **Anchor:** none direct; analogous to per-document compliance pricing.
- **Corp-finance:** low volume, low salience; better as an Enterprise-tier inclusion than a standalone meter.
- **Pros:** ties price to a tangible finance deliverable.
- **Cons/risks:** too small to matter alone; risks nickel-and-diming finance.
- **Narrative tie-in:** 🔵 bundle into tiers/compliance module rather than meter separately.

**#13 — Per-integration / per-connector** · `B · Phase 1–2 · connectors · 🟡`
- **Mechanism:** each connected system (CRM, ERP, billing, bank, ZATCA, KYB) is a billable connector.
- **Best for:** enterprises with deep stacks; recovers real integration cost.
- **Anchor:** unified-API vendors (Codat/Merge) meter per connector [External]; the integration manual confirms a long connector catalog [Confirmed].
- **Corp-finance:** aligns price to integration cost/value; integration depth *is* a switching-cost moat, so charging for it monetizes stickiness.
- **Pros:** fair cost-recovery; scales with deployment complexity.
- **Cons/risks:** can deter the integrations that deepen the moat — price connectors to *encourage* depth, not deter it; risk of feeling like a tax.
- **Narrative tie-in:** the integration layer is the moat [Confirmed] — meter it lightly to fund it without slowing adoption.

**#14 — Per-ZATCA-clearance / per-compliant-invoice** · `B · Phase 2 · clearances · 🟡`
- **Mechanism:** meter on ZATCA Phase-2 clearances / compliant partner invoices produced.
- **Best for:** KSA customers, post-Wave-24, where every B2B invoice must clear.
- **Anchor:** ZATCA middleware charges ~SAR 0.5–2/clearance [External, estimate].
- **Corp-finance:** pass-through-plus; thin margin (you may buy clearance from a middleware) — keep it cost-recovery, not profit center.
- **Pros:** directly monetizes the compliance wedge; volume is real (all B2B in scope by Jun 2026).
- **Cons/risks:** low net margin (middleware cost); migrating to table-stakes.
- **Narrative tie-in:** the ZATCA moat [Confirmed] — better expressed as the compliance *module* (#41) than a per-clearance meter, unless volume is huge.

**#15 — Per-reconciliation / per-exception-resolved** · `B · Phase 2 · exceptions · 🔵`
- **Mechanism:** meter on reconciliation sweeps or exception-queue items resolved.
- **Best for:** ops-heavy accounts; ties price to manual-work displaced (~25% of RevOps time on reconciliation [External]).
- **Anchor:** none direct; analogous to per-ticket ops pricing.
- **Corp-finance:** clever ROI framing (you charge a fraction of the labor you save) but operationally complex to meter/bill.
- **Pros:** strong ROI story for the CFO.
- **Cons/risks:** complexity; perverse incentive (you profit from more exceptions); hard to forecast.
- **Narrative tie-in:** 🔵 better told as an ROI *justification* for the subscription than as its own meter.

**#16 — Prepaid credits / fungible usage pool** · `B · Phase 2 · credits · 🟡`
- **Mechanism:** customer buys a credit pool spent across payouts/clearances/API/AI features.
- **Best for:** accounts wanting one budget line across multiple meters; AI-feature monetization.
- **Anchor:** credit-based pricing surged ~126% YoY [External].
- **Corp-finance:** smooths multi-meter billing; deferred-revenue (prepaid) helps cash. *But* widely seen as a *workaround*, opaque on value [External].
- **Pros:** flexible; front-loads cash; good for usage-volatile AI features.
- **Cons/risks:** opacity erodes trust with finance buyers (the opposite of your brand); breakage optics.
- **Narrative tie-in:** 🟡 use narrowly for AI/intelligence features (Phase 3), not for core finance flows where transparency is the brand.

---

### Family C — Value-based / take-rate *(Settle → Orchestrate; handle with extreme skepticism)*

> **Read §2.2 again before this family.** Every structure here is a *gross* headline whose *net* economics (~25–60 bps) and *multiple* (utility-like ~4.5x) are far below the SaaS layer. These are NRR/moat accelerants, **not** the thing you build the valuation on, and most fail the stage-fit test until real scale.

**#17 — Bps on settled payout volume (10–30 bps)** · `C · Phase 2 · settled volume · 🔵`
- **Mechanism:** a few basis points on the volume you settle, *once you're the system of record.*
- **Best for:** Settle-phase accounts where you provably move/reconcile the money.
- **Anchor:** **repo intent 10–30 bps**; Stripe Billing 0.7%; durable embedded net take 25–60 bps [Confirmed; External].
- **Corp-finance:** the "bridge to value-based" [Confirmed]; but **finance resists uncapped %** — so **cap it**; net margin after PSP/bank cost is thin.
- **Pros:** scales with value; the on-ramp to Orchestrate.
- **Cons/risks:** the resented-model risk; needs volume to matter; pass-through compresses GM.
- **Narrative tie-in:** 🔵 introduce *capped* and *late in Settle*, framed as rail-cost — and only after the flat per-payout (#11) has established the money layer without resentment.

**#18 — % of partner-attributed revenue under management (1–3%)** · `C · Phase 2–3 · revenue under mgmt · 🔵`
- **Mechanism:** the repo's value-based thesis — a small % of the partner-attributed revenue the system governs.
- **Best for:** the first value-based *test* on willing accounts (Settle), scaling in Orchestrate.
- **Anchor:** **repo intent ~1–3%** [Confirmed]; a16z "fintech 2–5× revenue per customer" is a *gross thesis* [External].
- **Corp-finance:** highest theoretical value capture; **but 1–3% is gross** — net after cost and the multiple-compression of flow-revenue is the real story. Keep the SaaS spine dominant in gross profit.
- **Pros:** aligns price with governed value; large ceiling.
- **Cons/risks:** "tax on success" resentment; measurement/attribution disputes; WHT royalty trap if it touches resale rights; Sharia (structure as Ju'ala).
- **Narrative tie-in:** the repo's explicit value-pricing thesis — pursue as a *capped, Sharia-structured, late* layer, validated on a subset, never the headline pre-scale.

**#19 — Net bps on GMV/RUM, declining tiers + caps** · `C · Phase 3 · RUM · 🔵`
- **Mechanism:** ad-valorem on revenue/GMV under management, with declining marginal bps and hard caps.
- **Best for:** the Orchestrate endgame at nine-/ten-figure volume.
- **Anchor:** **net 25–60 bps** (Toast ~54, ServiceTitan ~25, BILL ~26); Stripe ACH caps at 0.8%/$5 [External].
- **Corp-finance:** the venture-scale flow monetizer — **but model on NET and tell the equity story on gross profit**; declining tiers + caps defuse "tax on success" (Gurley: extract less than you can).
- **Pros:** rides the flow; compounds with customer growth; the unicorn-scale revenue line.
- **Cons/risks:** multiple compression; needs Toast/ServiceTitan-scale volume to matter (fails stage-fit until Phase 3); regulatory structuring required.
- **Narrative tie-in:** Stage-4/5 "own the ledger every Partner P&L runs on," value-priced on revenue-under-management [Confirmed] — the prize, sequenced last for a reason.

**#20 — Two-sided take-rate** · `C · Phase 3 · both sides · 🔵`
- **Mechanism:** monetize both the company side and the partner side once the network exists.
- **Best for:** the network phase, where partners derive standalone value (discovery, fast/clean payouts, dispute fairness).
- **Anchor:** marketplace two-sided models; Crossbeam freemium-on-density [External].
- **Corp-finance:** unlocks a second revenue pool; tune each side to its elasticity.
- **Pros:** expands TAM to the partner side; network monetization.
- **Cons/risks:** complexity; risk of partner resentment; only works after density (cold-start).
- **Narrative tie-in:** the cross-tenant network unlock — deferred until the identity graph is dense (post-Settle).

**#21 — Free-to-discover, pay-to-settle (network)** · `C · Phase 3 · settlement events · 🔵`
- **Mechanism:** free to discover/map partners across tenants; pay only when money/settlement moves through the network.
- **Best for:** maximizing network liquidity then monetizing the differentiated (settlement) layer.
- **Anchor:** **Crossbeam playbook** (free on density, paywall at the differentiated layer); ~30K-company network [External; Confirmed design].
- **Corp-finance:** maximizes adoption → data moat; monetizes the high-value event only.
- **Pros:** solves cold-start via free discovery; aligns charge with value moment.
- **Cons/risks:** leakage (parties settle off-platform); needs the network to exist.
- **Narrative tie-in:** **the explicit network-effect design in the repo** — "freemium on density, paywall at settlement." The terminal monetization.

**#22 — Savings-/leakage-recovery share (outcome)** · `C · Phase 2–3 · recovered leakage · 🟡`
- **Mechanism:** charge a % of provable leakage recovered / overpayments prevented.
- **Best for:** a CFO ROI wedge where you can *measure* recovered dollars.
- **Anchor:** gainshare/savings-share procurement models; Intercom Fin's outcome model ($0.99/resolution, $1M→$100M+ ARR) shows outcome pricing can scale [External].
- **Corp-finance:** maximal incentive alignment; **but** baseline disputes, attribution, revenue volatility, and a no-fee ramp period are the documented failure modes — **always pair with a base subscription floor** [External].
- **Pros:** irresistible ROI framing; differentiator.
- **Cons/risks:** attribution disputes (did *you* recover it?); gaming; only ~9% of firms fully implement outcome pricing.
- **Narrative tie-in:** 🟡 a powerful *land* wedge for the CFO (quantify the leakage the repo's thesis claims), but only as an overlay on a subscription floor, with airtight measurement clauses.

**#23 — Float / interest on funds held** · `C · Phase 3 · float · 🔴`
- **Mechanism:** earn interest on partner funds held in transit (BILL earns material float).
- **Best for:** *not the startup* — requires holding regulated funds (MTL/PayFac), the trap the repo explicitly says to dodge.
- **Anchor:** BILL float revenue $113.8M in a high-rate year [External].
- **Corp-finance:** attractive at scale but demands a money-transmitter/PI license and balance-sheet/regulatory exposure.
- **Pros:** high-margin at scale.
- **Cons/risks:** **SAMA licensing, Sharia (riba!) — interest on held funds is a direct riba problem**; regulatory burden; not neutral.
- **Narrative tie-in:** 🔴 **Avoid.** Contradicts both the "don't move money initially / dodge the MTL trap" design *and* Sharia compliance. Out of scope.

**#24 — FX / cross-border spread pass-through** · `C · Phase 2–3 · FX volume · 🟡`
- **Mechanism:** a transparent margin on cross-border partner payouts' currency conversion.
- **Best for:** cross-border partner programs (the repo's pass-through-FX intent).
- **Anchor:** Tipalti FX ~2–2.5%, Trolley ~1.9–3.5% [External]; repo intent "pass-through FX" [Confirmed].
- **Corp-finance:** real revenue on real cost; keep it transparent (finance buyers audit it).
- **Pros:** monetizes a genuine service; common and accepted.
- **Cons/risks:** WHT/Sharia structuring on cross-border; optics if opaque; thin if purely pass-through.
- **Narrative tie-in:** a Settle-phase add-on for cross-border programs; keep transparent to protect the finance-grade brand.

---

### Family D — Hybrid combinators *(the evidence-backed modern default)*

> Hybrid (base + usage) is ~61% of SaaS by 2026 and has the best retention profile [External]. These structures combine Families A–C. The discipline that makes them survive finance scrutiny: caps, minimums, "more carrots, less stick."

**#25 — Base subscription + metered overage** · `D · Phase 2 · base + usage · 🟢→Phase 2`
- **Mechanism:** tier includes an allotment (partners/payouts/claims); usage beyond it bills as overage.
- **Best for:** the natural Settle evolution of the GBB tiers.
- **Anchor:** standard SaaS hybrid; a16z warns to handle overages gently [External].
- **Corp-finance:** base = floor/predictability; overage = expansion. **Use true-ups + alerts, not punitive surprise overages** (the documented churn driver).
- **Pros:** predictable + expanding; familiar.
- **Cons/risks:** overage bill-shock if not pre-notified; define allotments carefully.
- **Narrative tie-in:** the clean bridge from Capture subscription to Settle usage without re-papering the model.

**#26 — Platform fee + capped bps-on-flow** · `D · Phase 2–3 · base + flow · 🔵`
- **Mechanism:** subscription base + a *capped* basis-point fee on settled flow.
- **Best for:** Settle→Orchestrate accounts where some ad-valorem is justified.
- **Anchor:** Stripe (Billing 0.7% + capped ACH); repo "pair bps with SaaS" [External; Confirmed].
- **Corp-finance:** the base protects GM/predictability while bps adds value-capture; **cap defuses resentment**; model net not gross.
- **Pros:** best-of-both; investor-legible (SaaS spine + flow upside).
- **Cons/risks:** complexity; the bps still carries multiple-compression — keep SaaS dominant in gross profit.
- **Narrative tie-in:** the repo's explicit "pair bps-on-flow with SaaS" instruction, made concrete.

**#27 — Seat (humans) + usage (AI agents/runs)** · `D · Phase 2–3 · seats + agent runs · 🔵`
- **Mechanism:** small seat fee for human users + usage fee for AI/automation (recommendations, anomaly detection, agentic actions).
- **Best for:** the V3 "AI partner intelligence" layer.
- **Anchor:** Bessemer: ~92% of AI software uses a usage component; AI runs at 50–60% GM vs 80–90% SaaS, so flat fees don't cover inference [External].
- **Corp-finance:** the *only* responsible way to price AI features (variable inference cost must be metered or capped).
- **Pros:** covers AI COGS; monetizes the intelligence layer.
- **Cons/risks:** AI margins dilute blended GM — fence and cap AI usage; "~70% agentic AI is press-release vapor" [Confirmed] so don't over-rotate.
- **Narrative tie-in:** Stage-4 "investable" intelligence — priced so AI cost never erodes the ≥70% GM line.

**#28 — Committed-use + on-demand burst** · `D · Phase 2–3 · commit + burst · 🔵`
- **Mechanism:** customer commits an annual volume at a discount; bursts above bill on-demand at a higher rate.
- **Best for:** enterprises that want budget certainty + headroom (Snowflake's capacity-vs-on-demand model).
- **Anchor:** enterprise commit-contract / drawdown norms [External].
- **Corp-finance:** committed revenue + deferred cash (improves CAC payback & burn multiple); confident customers get better economics.
- **Pros:** predictable revenue; cash forward; rewards commitment.
- **Cons/risks:** unused commit → renewal friction ("shelfware"); needs usage maturity.
- **Narrative tie-in:** a Settle/Orchestrate enterprise structure that improves the corporate-finance scorecard via prepaid cash.

**#29 — Subscription floor + outcome/success fee** · `D · Phase 2–3 · base + outcome · 🟡`
- **Mechanism:** base subscription + a success fee tied to a defined outcome (leakage recovered, disputes avoided, time-to-payout cut).
- **Best for:** ROI-led enterprise deals; the Sharia-clean way to do performance pricing (Ju'ala on the result).
- **Anchor:** Intercom Fin (outcome pricing scaled to $100M+); only ~9% fully implement [External].
- **Corp-finance:** strong alignment; **the base floor is mandatory** (handles attribution/volatility failure modes).
- **Pros:** differentiator; aligns with the CFO's definition of value.
- **Cons/risks:** attribution disputes; volatility; measurement complexity; Sharia structuring.
- **Narrative tie-in:** the outcome overlay that proves "finance-grade value," structured as Ju'ala fee-for-result (#42) with a subscription floor.

**#30 — Three-axis: tier + active-partner + bps** · `D · Phase 3 · multi-dimensional · 🔵`
- **Mechanism:** the full model — GBB tier (capability) × active partners (Capture metric) × capped bps on RUM (Orchestrate metric).
- **Best for:** the mature Orchestrate state.
- **Anchor:** **86% of $100M+ SaaS use ≥3 pricing dimensions; multi-dimensional ~34% higher LTV/CAC** (directional) [External].
- **Corp-finance:** maximal value capture across capability, footprint, and flow; the destination model.
- **Pros:** captures every value dimension; expands automatically.
- **Cons/risks:** complexity (needs a strong CPQ/billing engine and a mature sales org); **only assemble incrementally** — launching this at Phase 1 would be a disaster.
- **Narrative tie-in:** the end-state that the journey *converges on* — explicitly built up axis-by-axis, never launched whole.

**#31 — Minimum platform commit + everything metered** · `D · Phase 2–3 · commit + meters · 🟡`
- **Mechanism:** a floor commitment, with all activity metered against it (consumption-first with a revenue floor).
- **Best for:** usage-mature enterprises comfortable with consumption pricing.
- **Anchor:** consumption + minimum-commit (Snowflake-style) [External].
- **Corp-finance:** floor protects revenue; metering drives NRR; but consumption NRR can mean-revert (Snowflake 178%→126%) — don't assume it's permanent.
- **Pros:** strong NRR; revenue floor.
- **Cons/risks:** forecasting volatility; finance buyers may prefer fixed (test it).
- **Narrative tie-in:** an Orchestrate option where the customer is sophisticated; not for the predictability-seeking GCC finance buyer by default.

**#32 — Entitlement/quota + true-up** · `D · Phase 2 · quota · 🟢→Phase 2`
- **Mechanism:** set a quota (partners/payouts), reconcile overage as a true-up at term-end.
- **Best for:** letting customers grow without re-papering, while protecting your expansion.
- **Anchor:** standard enterprise true-up mechanics [External].
- **Corp-finance:** captures growth (NRR) with low friction; predictable base + annual true-up cash.
- **Pros:** frictionless growth; clean expansion capture.
- **Cons/risks:** true-up surprises if not tracked transparently (give the customer a live dashboard).
- **Narrative tie-in:** the low-friction expansion mechanic that supports the NRR engine without a heavy upsell motion.

---

### Family E — Enterprise & contract structures *(cash, retention, and the corporate-finance scorecard)*

**#33 — Annual prepay with drawdown** · `E · Phase 1 · term · 🟢`
- **Mechanism:** bill the full year upfront; usage draws down against it.
- **Best for:** *every viable deal you can get it on*, from Phase 1.
- **Anchor:** GCC enterprise norm is annual-upfront-on-PO; Trolley/Stripe drawdown models [External; Confirmed].
- **Corp-finance:** **the single highest-leverage cash structure** — CAC payback from ~14mo to ~8mo (month-1 with full upfront); deferred revenue funds growth → **burn multiple down**; prepaid logos renew ~30% higher [External]. Directly counters 90–120-day DSO.
- **Pros:** transforms the cash/efficiency scorecard; improves retention.
- **Cons/risks:** usually traded for a discount — **keep that discount below your cost of capital** so you don't trade away the margin signal.
- **Narrative tie-in:** the financial-discipline lever the repo's burn model implicitly needs — prepay is how a pre-seed company extends runway without cutting headcount.

**#34 — Multi-year ramp deal (Y1→Y3 step-up)** · `E · Phase 2 · term · 🟡`
- **Mechanism:** discounted Y1 to land, escalating to list by Y2/Y3 as adoption grows.
- **Best for:** landing strategic logos that need a low entry but will expand.
- **Anchor:** standard enterprise ramp; rev-rec complexity noted [External].
- **Corp-finance:** locks multi-year retention + predictable expansion; Y1 discount is an acquisition investment.
- **Pros:** lands whales; aligns price to adoption curve.
- **Cons/risks:** Y2 sticker-shock churn if value isn't realized; rev-rec complexity; don't ramp faster than the customer's value curve.
- **Narrative tie-in:** a Settle-phase enterprise tool to convert design-partner momentum into durable multi-year ARR.

**#35 — Enterprise platform license (uncapped partners, fixed)** · `E · Phase 2–3 · flat · 🟡`
- **Mechanism:** a flat enterprise fee for unlimited partners within defined bounds.
- **Best for:** very large programs that hate per-unit metering and want budget certainty.
- **Anchor:** enterprise PRM quote-only licenses (Impartner/ZINFI/WorkSpan) [External].
- **Corp-finance:** predictable; but **breaks the NRR engine** (no per-unit expansion) — only use when the account is already at the top of the value curve and you capture value via compliance/modules/flow instead.
- **Pros:** simple for huge accounts; high ACV.
- **Cons/risks:** caps expansion on the partner axis — recover NRR via compliance tier (#41–44), modules (#7), or flow (#26).
- **Narrative tie-in:** an Enterprise convenience SKU, paired with other expansion axes so NRR doesn't flatline.

**#36 — Per-entity / per-business-unit** · `E · Phase 2 · entities · 🟢→Phase 2`
- **Mechanism:** price per legal entity / business unit (multi-entity conglomerates).
- **Best for:** GCC conglomerates and multi-entity groups (the integration manual's T4 conglomerate segment).
- **Anchor:** multi-entity is a real cost/complexity driver [Confirmed]; per-tenant pricing norm.
- **Corp-finance:** expansion axis that maps to org structure; lands the whole group entity-by-entity (land-and-expand within one logo).
- **Pros:** big-account expansion; matches GCC group structures.
- **Cons/risks:** intercompany complexity; define entity boundaries clearly.
- **Narrative tie-in:** the GCC-conglomerate expansion path — one logo becomes many entities, each an expansion.

**#37 — Paid pilot / POC → conversion** · `E · Phase 0 · per pilot · 🟢`
- **Mechanism:** a scoped, *paid* pilot (60–90 days) with a defined conversion path; pilot fee creditable to Y1.
- **Best for:** *now* — the Phase-0 motion.
- **Anchor:** repo: paid, scope-limited pilots, never free; First Round/Bessemer design-partner norms (30–50% off locked, hard conversion deadline) [Confirmed; External].
- **Corp-finance:** the only pre-revenue WTP proof that counts; filters tire-kickers; sets the price anchor.
- **Pros:** real ACV data; commitment signal; de-risks the sale.
- **Cons/risks:** must convert (track conversion %); don't let it become free consulting.
- **Narrative tie-in:** **the Phase-0 cornerstone** — 3–5 paid pilots is the repo's seed bar.

**#38 — Implementation / onboarding fee (fenced)** · `E · Phase 1 · one-time · 🟢`
- **Mechanism:** a one-time, productized implementation fee separate from subscription.
- **Best for:** every Phase-1+ deal needing setup/integration/training.
- **Anchor:** repo confirms "annual SaaS + implementation"; 15–30% of Y1 ACV or fixed bands [Confirmed; External].
- **Corp-finance:** **front-loads cash, deepens switching cost, filters non-serious buyers** — but it is *low-margin services revenue*, so **fence it, report it separately, keep it contribution-positive, and push toward SI partners over time** to protect the ≥70% blended GM and the subscription multiple.
- **Pros:** cash + commitment + stickiness.
- **Cons/risks:** dilutes margin/multiple if it grows unfenced; "high implementation hours with low fees" is a repo red flag.
- **Narrative tie-in:** confirmed model; the discipline is to keep it a *fenced* cash/retention investment, never a growing services business that compresses the multiple.

**#39 — Premium support / SLA tiers + dedicated CSM** · `E · Phase 1–2 · tier · 🟢`
- **Mechanism:** support/SLA tiers (standard → priority → 24/7 + named CSM/TAM).
- **Best for:** enterprise/regulated buyers who pay for uptime and risk reduction.
- **Anchor:** standard enterprise support-tier monetization [External]; CS cadence in the onboarding manual [Confirmed].
- **Corp-finance:** high-margin recurring add-on; supports NRR; aligns to enterprise WTP for risk.
- **Pros:** clean premium; reinforces finance-grade seriousness.
- **Cons/risks:** must staff to the SLA; don't over-promise at pre-seed.
- **Narrative tie-in:** an Enterprise-tier inclusion that monetizes the operating-cadence stickiness (a named moat).

**#40 — Auto-renew + annual uplift clause** · `E · Phase 1 · CPI/fixed % · 🟢`
- **Mechanism:** auto-renewal with a contractual annual increase (e.g., max(CPI, 3–5%)).
- **Best for:** every annual contract from Phase 1.
- **Anchor:** 3–5% absorbed easily; uplift = max(CPI, fixed%) norm [External].
- **Corp-finance:** **compounding price realization** — the cheapest NRR you'll ever get; counters the "SaaS leaves 11–17%/yr on the table" trap.
- **Pros:** automatic expansion; protects against inflation; no re-negotiation.
- **Cons/risks:** keep ≤ the painless 3–5% band; >15–20% needs grandfathering; disclose clearly (finance buyers scrutinize renewal clauses).
- **Narrative tie-in:** a baseline contract hygiene that quietly compounds NRR toward the 120% venture-scale bar.

---

### Family F — Compliance, regulatory & GCC-specific *(the wedge incumbents can't retrofit)*

**#41 — Compliance premium module (ZATCA + WHT + PDPL)** · `F · Phase 1–2 · add-on · 🟢`
- **Mechanism:** a stackable module: ZATCA Phase-2 clearance, WHT engine (5/15/20%), VAT correctness, PDPL handling, evidence pack.
- **Best for:** *every KSA customer* — the differentiator global incumbents lack.
- **Anchor:** repo's confirmed compliance-native design; Wave-24 forces all B2B >SAR 375K into scope by Jun 2026 [Confirmed; External].
- **Corp-finance:** high-margin software add-on; +10–20% premium today (migrating to table-stakes — **charge now while it differentiates**).
- **Pros:** the clearest WTP uplift unavailable elsewhere; finance buyer's hot button.
- **Cons/risks:** becoming baseline — bundle more into base over 2026–27; some sub-components (clearance) are thin-margin pass-through.
- **Narrative tie-in:** **the GCC compliance moat expressed as price** — the repo's "lead with payout accuracy + reconciliation + ZATCA/audit compliance."

**#42 — Sharia-compliant Ju'ala fee-for-result** · `F · Phase 2–3 · result · 🟡`
- **Mechanism:** structure any commission/success/% fee as **Ju'ala** (AAOIFI SS-15, fee-for-result) — the structure that *uniquely tolerates* the fee being a share of an uncertain outcome.
- **Best for:** Islamic-finance buyers, and the legal wrapper for all ad-valorem/outcome fees (#18, #22, #29).
- **Anchor:** AAOIFI SS-15 (Ju'ala), SS-46 (Wakala); never riba/gharar [External].
- **Corp-finance:** *enables* value-based pricing in-region that would otherwise be non-compliant; the **fatwa is a moat + investor de-risking asset**.
- **Pros:** unlocks % pricing for Islamic buyers; trust/marketing asset.
- **Cons/risks:** requires Shariah-board sign-off (cost/time); must define fee/result precisely (gharar); never guarantee a return (riba).
- **Narrative tie-in:** the structure that makes the repo's "1–3% of revenue" thesis *Sharia-viable* — a wedge no global incumbent has bothered to build.

**#43 — In-Kingdom data-residency tier** · `F · Phase 2 · add-on · 🟢→Phase 2`
- **Mechanism:** premium tier hosting customer data in-Kingdom (AWS KSA/Azure UAE) with NCA ECC/CCC alignment.
- **Best for:** SAMA/NCA-regulated and government-adjacent buyers.
- **Anchor:** AWS Riyadh GA Jan 2026; PDPL enforced; 20–40% hosting premium [External].
- **Corp-finance:** premium SKU with real cost (sovereign-cloud premium) — price above the hosting delta; converts stalled regulated deals.
- **Pros:** unlocks regulated/gov segments; defensible premium.
- **Cons/risks:** real infra cost; partly migrating to table-stakes for regulated buyers.
- **Narrative tie-in:** the "data residency as procurement gate" insight — a paid tier that opens the highest-WTP segment (fintech/SAMA).

**#44 — Regulated-buyer (SAMA/CMA) premium** · `F · Phase 2 · tier · 🟡`
- **Mechanism:** an enterprise tier meeting SAMA Cyber Security Framework / CMA requirements, with the controls and attestations bundled.
- **Best for:** banks, NBFIs, insurers, capital-market institutions.
- **Anchor:** SAMA CSF / CMA Shariah-governance instructions [External].
- **Corp-finance:** highest-WTP segment; 20–30% deal premium reported for regulated buyers [Confirmed reasoning].
- **Pros:** premium pricing; high stickiness (compliance lock-in).
- **Cons/risks:** heavy compliance build; long cycles; needs the security posture first.
- **Narrative tie-in:** monetizes the finance/compliance-trust moat at its highest-value buyer.

**#45 — Government / Etimad / RHQ-ready tier** · `F · Phase 2–3 · tier · 🔵`
- **Mechanism:** a public-sector package (Etimad integration, RHQ-aware contracting, WHT-check, SAR/local-content compliant).
- **Best for:** government and public-sector ecosystems (Vision 2030 demand).
- **Anchor:** RHQ required for gov >SAR 1M; GCC price preferences; Etimad procurement [External].
- **Corp-finance:** large deals but long cycles and heavy procurement; net-120+ DSO — price for the cash drag.
- **Pros:** Vision-2030 tailwind; large contracts.
- **Cons/risks:** RHQ/local-entity requirements; slow cash; procurement complexity.
- **Narrative tie-in:** a Phase-3 expansion into the state-sponsored partner-led B2B activity the "why now" thesis rests on.

**#46 — Audit & evidence-pack-as-a-service** · `F · Phase 1–2 · add-on/usage · 🟢`
- **Mechanism:** monetize the audit-defensible evidence pack (the artifact a CFO/auditor accepts) as a premium capability or per-pack.
- **Best for:** finance/audit-driven buyers at period-end/audit-time.
- **Anchor:** the repo's "evidence pack accepted by a finance reviewer" is the core proof artifact [Confirmed].
- **Corp-finance:** high-margin software; ties price to the exact thing finance values.
- **Pros:** sells the finance-trust value directly; renewal-sticky at audit time.
- **Cons/risks:** better as a tier inclusion than nickel-and-dimed per pack.
- **Narrative tie-in:** prices the "finance-of-record" value that turns "partner tooling" into "revenue infrastructure."

---

### Family G — Ecosystem, channel & platform *(Orchestrate → unicorn; mind the WHT trap)*

**#47 — White-label / OEM embed (WHT-structured)** · `G · Phase 3 · royalty/per-unit · 🔵`
- **Mechanism:** embed the claim-ledger/settlement engine inside a PRM/CRM/marketplace partner's product.
- **Best for:** distribution leverage once the engine is proven.
- **Anchor:** OEM rev-share 15–40% (best 30–40%); hybrid fixed+rev-share rising [External].
- **Corp-finance:** distribution scale — **but rev-share caps margin forever, and OEM/distribution fees risk the 15% royalty WHT reclassification** (§2.4). Structure as a per-unit/per-embed royalty with deliberate tax planning; isolate from the clean usage-license.
- **Pros:** reach without direct sales; embeds the moat in others' products.
- **Cons/risks:** **WHT royalty trap**; margin cap; channel conflict; audit rights.
- **Narrative tie-in:** a Phase-3 distribution play — gated on tax structuring and on the engine being a proven, defensible asset.

**#48 — Marketplace / app-store rev-share** · `G · Phase 3 · % of app sales · 🔵`
- **Mechanism:** take a % of third-party apps/connectors sold on your platform/network.
- **Best for:** once the network has developers building on it.
- **Anchor:** app-store rev-share norms; marketplace take 10–30% (but <$10B GMV) [External].
- **Corp-finance:** high-margin platform revenue; network-effect monetization.
- **Pros:** ecosystem leverage; compounds with network.
- **Cons/risks:** needs a real developer ecosystem first; far-future.
- **Narrative tie-in:** a terminal network-economics layer (Stage 5), not a near-term lever.

**#49 — Channel / reseller / SI margin** · `G · Phase 2–3 · margin · 🟡`
- **Mechanism:** sell *through* SIs/resellers/channel (essential in GCC), giving them 20–40% margin.
- **Best for:** GCC distribution (channel-led market) and offloading low-margin implementation.
- **Anchor:** SI/implementation margin 20–30%; reseller 15–40% [External]; GCC is channel-led [Confirmed].
- **Corp-finance:** lowers your CAC and moves low-margin services *off* your P&L (protects blended GM) — but the channel margin is a discount to your realized price; **and reseller fees risk WHT royalty treatment** (structure carefully).
- **Pros:** GCC market access; protects software margin by outsourcing services.
- **Cons/risks:** margin give-up; WHT structuring; channel control.
- **Narrative tie-in:** the GCC go-to-market reality (channel-led, local-entity) turned into a margin-protecting structure.

**#50 — Data & benchmark intelligence licensing** · `G · Phase 3 · subscription · 🔵`
- **Mechanism:** license aggregated, anonymized benchmark/intelligence data (partner ROI benchmarks, payout norms, attribution patterns) built from the network.
- **Best for:** the data-moat monetization once you have scale and density.
- **Anchor:** Crossbeam-style data/intelligence value; the identity-resolution data network effect [Confirmed; External].
- **Corp-finance:** **the highest-margin revenue line possible** (near-zero marginal cost) and a *pure* multiple-expander — the opposite of payments-flow revenue. The strategic prize for valuation.
- **Pros:** ~100% GM; defensible (data network effect); multiple-accretive.
- **Cons/risks:** PDPL/privacy (anonymize/aggregate rigorously); needs network density first.
- **Narrative tie-in:** **monetizes the repo's #1 moat (the identity-resolution data network effect)** — and does so in the highest-margin, most multiple-friendly way, balancing the margin-dilutive flow layer.

**#51 — Network membership / access fee (bonus)** · `G · Phase 3 · per member · 🔵`
- **Mechanism:** a membership fee to join the cross-tenant settlement/identity network.
- **Best for:** the network phase, once membership has standalone value.
- **Anchor:** data co-op / network membership models [External].
- **Corp-finance:** recurring, high-margin; monetizes network access distinct from usage.
- **Pros:** recurring network revenue; reinforces lock-in.
- **Cons/risks:** needs density to justify; cold-start.
- **Narrative tie-in:** the membership layer of "own the ledger every Partner P&L runs on."

**#52 — Developer / API platform metered access (bonus)** · `G · Phase 3 · API calls · 🔵`
- **Mechanism:** meter programmatic access to the claim/attribution/settlement APIs for customers building on top.
- **Best for:** platform customers and embedded use cases.
- **Anchor:** standard API metering (per-call/tier) [External]; the product exposes a REST/webhook surface [Confirmed].
- **Corp-finance:** high-margin usage; software-to-software-appropriate; supports a platform multiple.
- **Pros:** monetizes platform extensibility; sticky.
- **Cons/risks:** needs a stable public API and developer demand (far-future).
- **Narrative tie-in:** the platform-API monetization of the integration layer once the product is the system of record.

---

## 6. Multi-scenario modeling & the 10x-skeptic red-team

The request was for *skeptical, 10x-aggressive* validation across *multiple scenarios*. This section (a) models three pricing-architecture scenarios to the unicorn bar with explicit math, (b) red-teams the five load-bearing pricing decisions, and (c) audits which external benchmarks are solid vs. shaky. **All numbers here are illustrative, clearly-labeled [Assumption] mechanics — not company forecasts.** Per the repo's anti-hallucination rule, they exist to show *structure and sensitivity*, not to predict.

### 6.1 The unicorn arithmetic everyone must accept first

`$1B valuation = ARR × revenue multiple.` With multiples compressed to **~5x broad public SaaS / ~20x elite Cloud-100 / ~4.5x payments-flavored** [External], the honest conclusion is: **a unicorn now requires roughly real $100M ARR** (the "Centaur"), not the $30–40M that 26–34x multiples crowned in 2021. T2D3 (triple-triple-double-double-double) is the growth *shape* that gets ~$1–2M ARR to ~$100M in 5–6 years [External]. So every scenario below is judged on: *can the pricing architecture plausibly compound to ~$100M ARR (or ARR-equivalent gross profit) at a software-like multiple?*

A TAM reality check bounds this: there is **no clean bottom-up GCC figure**; KSA ICT spend is ~$39.6B (2025) and the GCC universe of B2B companies with 20–200+ partners is plausibly low-thousands [External]. **Conclusion: GCC alone cannot produce a $100M-ARR SaaS book** at these ACVs — the unicorn case *requires* the narrative's GCC-wedge → MENA → global-co-sell expansion. The pricing architecture must therefore travel.

### 6.2 Three scenarios

**Scenario A — "Disciplined SaaS" (conservative; subscription-only, never moves money)**
- **Model:** Families A + E + F only. Active-partner GBB subscription, compliance premium, annual prepay, implementation fenced. **No Settle flow layer, no bps.** Pure software.
- **ACV path [Assumption]:** seed ~$20K → Series A ~$40K → scale ~$80K (mix shifts to enterprise/compliance).
- **To $100M ARR:** ~1,250 customers at $80K. *In GCC/MENA alone this likely caps at ~$30–60M ARR* (TAM-bound); global expansion needed to approach $100M.
- **Corp-finance:** **GM ~80%, NRR ~108–112%** (expansion via partner-count + tier + 3–5% uplift), Rule-of-40 achievable. **Multiple ~5–8x.**
- **Outcome:** a **$300–500M, highly-capital-efficient, default-alive** company — *an excellent result, but sub-unicorn at compressed multiples* unless it travels globally. **Lowest risk, lowest ceiling.**

**Scenario B — "Hybrid control layer" (base case; RECOMMENDED)**
- **Model:** A + E + F spine **+ Settle layer** (#11 flat per-payout, #25 overage, #26 *capped* bps) **+ Orchestrate selectively** (#19 net bps late, #50 data licensing) **+ global co-sell expansion.**
- **ACV path [Assumption]:** seed ~$25K → Series A ~$60K (finance layer + compliance + multi-entity) → scale ~$120K.
- **To $100M ARR:** ~830 customers at $120K — reachable with GCC → MENA → global co-sell, plus the per-payout/flow layer lifting ACV.
- **Corp-finance:** **blended GM ~72–75%** (flow layer fenced, subscription dominant in gross profit), **NRR ~118–122%** (the engine turns: module attach + payout-volume + tier upgrades + data layer), Rule-of-40 in view. **Multiple ~6–10x.**
- **Outcome:** the path that **plausibly reaches the ~$100M ARR / unicorn bar** while keeping the multiple software-like. **Moderate risk, high ceiling. This is the recommendation.**

**Scenario C — "Flow-maximalist" (aggressive; network + heavy ad-valorem)**
- **Model:** full #30 three-axis + #19 aggressive bps on RUM + #20 two-sided + #21 network + #51 membership, flow-revenue-dominant, global.
- **GMV/RUM:** large; headline *gross* revenue can grow fast.
- **The trap:** if flow revenue dominates, **blended GM collapses toward Shopify (~51%) or Toast (~21.5%) territory**, and the market values you at **~4.5x (utility)** not ~10x. Headline ARR could be large but the *valuation* lags unless you (a) keep the SaaS+data layers dominant in **gross profit** and (b) narrate on **recurring + fintech gross profit** (the Toast discipline).
- **Corp-finance:** **NRR 125–135%** (consumption-grade) but **GM risk is existential**; multiple bifurcates — software-narrated ~8–10x on gross profit, or payments-narrated ~4.5x on revenue.
- **Outcome:** **highest ceiling *and* highest risk** — can be the biggest company or the one whose multiple is permanently compressed. Only run this with rigorous gross-profit discipline and Gurley's "extract less than you can." **Do not lead here; arrive here, late, disciplined.**

| Scenario | Model | Blended GM | NRR | Multiple | $100M-ARR reachable? | Risk |
|---|---|---|---|---|---|---|
| **A Disciplined SaaS** | Subscription only | ~80% | 108–112% | 5–8x | Only if global; GCC caps ~$30–60M | Low / low ceiling |
| **B Hybrid (rec.)** | SaaS spine + capped flow + data | 72–75% | 118–122% | 6–10x | Yes, with expansion | Moderate / high ceiling |
| **C Flow-maximalist** | Heavy ad-valorem + network | 50–75% (risk) | 125–135% | 4.5–10x (bifurcates) | Yes on revenue; valuation risk | High / highest ceiling |

**The synthesis:** sequence **A→B→C** *over time* (it's the Capture→Settle→Orchestrate journey), but **govern toward B's economics throughout** — subscription + data dominant in gross profit, flow capped and fenced. The scenarios aren't a choice; they're a trajectory with a discipline.

### 6.3 Red-team: the five load-bearing decisions (strongest case *against*, then the verdict)

**Decision 1 — "Active partners" as the Phase-1 value metric.**
- *Against:* it's gameable (customers prune inactive partners to cut cost); "active" is hard to define; it may under-monetize a customer whose *few* partners drive *huge* revenue (value ≠ partner count).
- *Verdict:* **Hold, with a fix.** It's the category norm and buyer-friendly (lowest adoption friction — the Phase-1 priority). Mitigate gaming with a clear "active = submitted a claim / had an attributed deal in the period" definition, and add a **revenue-under-management expansion axis in Settle** to capture the high-value-per-partner case. The metric *evolves*; it doesn't have to be perfect at Phase 1.

**Decision 2 — Refusing the % take-rate in Phases 1–2 (the neutral-Switzerland posture).**
- *Against:* you're leaving the highest-value-capture model on the table; PartnerStack/AppDirect capture 3–15%; aren't you under-monetizing?
- *Verdict:* **Hold, strongly.** (a) The % model is the **most-resented** in the category and the thing the *finance buyer explicitly resists* — adopting it sacrifices the wedge for short-term ARPU. (b) Pre-scale, bps-on-flow is *also* tiny in absolute terms (you need Toast-scale volume), so you'd take the resentment cost without the revenue benefit. (c) The *net* economics are thin regardless. You're not refusing value capture — you're **sequencing** it (flat per-payout now, capped bps later), which is both better economics pre-scale *and* the GTM counter-position against AppDirect. The one risk: if a competitor establishes a *better* flat-fee neutral position first — so move on #11 in Settle.

**Decision 3 — Charging for compliance (#41–44) when it's migrating to table-stakes.**
- *Against:* Wave 24 makes ZATCA mandatory for everyone by Jun 2026 — you can't charge a premium for what's legally required and universal.
- *Verdict:* **Charge now, plan to rebundle.** It is *currently* a differentiator global incumbents lack; capture the premium in 2026 while it differentiates, and gracefully fold components into base as they commoditize (the repo's monthly pricing review is the mechanism). Compliance as table-stakes still *wins the deal* even when it stops commanding a separate line — it's a moat either way.

**Decision 4 — The implementation fee (margin-dilutive services).**
- *Against:* services revenue compresses the multiple and signals "this is hard to deploy"; high-growth SaaS minimizes services.
- *Verdict:* **Keep it, fence it hard.** At pre-seed/seed the **cash, commitment-filter, and switching-cost** value outweighs the multiple concern (which only bites at scale). The discipline: report it separately, keep it contribution-positive, productize it down over time, and **push it to SI/channel partners by Phase 2** (#49) so it leaves your P&L. The repo's own red flag — "high implementation hours with low fees" — is the failure mode to instrument against.

**Decision 5 — Betting the unicorn on bps-on-flow (Scenario C).**
- *Against:* flow revenue is how you get to huge top-line fast; isn't the SaaS-only path (A) too small?
- *Verdict:* **Bet on B, not C, and never on gross flow revenue.** The corporate-finance evidence is decisive: payments-flavored revenue is **multiple-compressed (~4.5x) and low-margin (20–30%)**; the market values it on **gross profit**. Scenario A is too small (TAM-bound in GCC); Scenario C destroys the multiple if flow dominates. **B** keeps the high-margin subscription + **data-licensing (#50, ~100% GM, multiple-accretive)** dominant in gross profit while using capped flow for NRR and moat. The unicorn is built on *gross profit quality*, not GMV headline.

### 6.4 Adversarial verification of the benchmarks (what's solid, what's shaky)

The "10x-skeptic" discipline applied to my own inputs, so no decision rests on a thin number:

- **🟢 Solid (primary filings / multi-source):** Toast fintech ~82% of revenue at ~21.5% GM, net take ~54 bps; ServiceTitan payments ~0.25%; BILL ~0.26%; Stripe Billing 0.7%, ACH 0.8% capped $5; Snowflake/Datadog NRR; competitor published SMB pricing (Kiflo, Trolley, Tipalti entry, Crossbeam tiers); AppDirect–PartnerStack (~$150–250M, Apr 2026) and AppDirect–Tackle (Dec 2025); GCC tax/ZATCA/PDPL/AAOIFI specifics (confirmed against ZATCA/PwC/AAOIFI/SAMA); KSA VC FY2025 ~$1.72bn; MENA seed median ~$11.6M.
- **🟡 Directional (vendor/VC surveys, selection-biased):** OpenView usage-based adoption levels (trend solid, exact % varies 27/34/45 by year/definition); hybrid "61% by 2026"; ProfitWell churn/expansion deltas; the "86% of $100M+ use ≥3 dimensions / +34% LTV:CAC"; NRR-by-segment medians. *Use as direction, not point estimates.*
- **🔴 Shaky / explicitly discounted:** the **"usage-based = +50% multiple"** stat (2020-vintage, often mis-dated as current); the **"+38% faster growth"** (solid as 2020 OpenView, not re-confirmed for 2025); **PartnerStack "15–25% take rate"** (uncorroborated; the defensible figure is **3–15%**); Impartner's exact $25/45/75K tiers (G2-reported, not official); the repo's own dropped figures (**"~24% median partner revenue," "EY 1–5% EBITDA leakage," "42% of CFOs"** — untraceable/likely fabricated, *do not use in any pricing ROI claim*); Mindbody take-rates (private since 2019, unverifiable).

**The discipline this enforces on pricing:** ROI/leakage selling must rest on the customer's *own* measured numbers from a paid pilot (the only WTP proof that counts), **not** on the untraceable market-leakage stats — exactly the anti-hallucination posture that is itself a diligence signal.

---

## 7. The recommended path (synthesis & action)

### 7.1 The one-paragraph recommendation

**Adopt Scenario B, sequenced over the Capture→Settle→Orchestrate journey, governed toward software-margin economics throughout.** Launch Phase 1 on **Good-Better-Best (Starter/Growth/Enterprise) priced on active partners with unlimited seats (#2 + #6), annual prepay (#33), a fenced implementation fee (#38), an auto-renew uplift (#40), and a GCC compliance premium (#41)** — sold to the Head of Partnerships, anchored to the Kiflo/Impartner comp band, with published prices below $25K and "contact sales" above. In Phase 2, when the CFO becomes the buyer and you are the settlement system of record, **add a flat per-payout rail fee (#11) and a capped overage/bps layer (#25/#26)** — never the resented uncapped %, structured Sharia-clean as Ju'ala (#42) and isolated from the WHT royalty trap. In Phase 3, at real scale, **add net-bps on revenue-under-management with declining tiers + caps (#19), free-to-discover/pay-to-settle network monetization (#21), and — critically — high-margin data/benchmark licensing (#50)**, telling the equity story on recurring + fintech *gross profit*. Refuse the float/riba model (#23) and pure per-seat (#5) entirely.

### 7.2 The phase-by-phase recommended stack

| | Phase 0 (now) | Phase 1 Capture (seed) | Phase 2 Settle (Series A) | Phase 3 Orchestrate (Series B→unicorn) |
|---|---|---|---|---|
| **Buyer** | Design partner | Head of Partnerships | + CFO/Finance | + Board / network |
| **Core structures** | #37 paid pilot | #2 GBB, #6 base+partners, #8 single-sided | + #11 per-payout, #25 overage, #36 per-entity | + #19 net bps (capped), #21 network, #30 three-axis |
| **Always-on** | #38 impl, locked future price | #33 prepay, #38 impl, #40 uplift, #39 support | #34 ramp, #43 residency, #44 regulated | #50 data licensing, #51 membership, #52 API |
| **Compliance** | — | #41 ZATCA/WHT/PDPL premium | #42 Ju'ala, #43 in-Kingdom, #46 evidence-pack | #45 gov/Etimad, #42 fatwa |
| **Value metric** | per logo | **active partners** | + per-payout, capped bps | **net bps on RUM** + data |
| **Corp-finance target** | proof | GM≥75%, NRR≥105%, payback<18mo | GM≥70%, **NRR≥115–120%** | NRR≥120–130%, story on gross profit |
| **Avoid** | free pilots | #5 seats, any % skim | uncapped %, surprise overage | #23 float/riba, flow-dominant GM |

### 7.3 Pricing governance (the operating cadence makes pricing a system)

The repo already institutionalizes a **monthly pricing & packaging review for the first ~18 months** and a quarterly strategy review [Confirmed]. Use it to:
- Track **price realization** (pocket-price ÷ list) by deal/rep — only ~29% of SaaS do this; it's worth ~5–10% realized price [External].
- Hold **average discount < 25%**; tie every discount to a *commitment* (term/volume/prepay), never to "win" [External].
- Re-test WTP each time you add a tier/axis; absorb-able increases are **3–5%/yr**; **grandfather** anything >15–20% [External].
- Watch the repo's pricing **red flags**: unpaid implementation, unlimited users/claims, broad integrations, vague support, low price for high complexity, custom features for low-ACV customers [Confirmed].
- Gate every new module/integration on the repo's decision gates (does it improve paid conversion, retention, or ACV; does it delay MVP proof) [Confirmed].

### 7.4 The validation experiments to run *now* (the 10x-aggressive part, made actionable)

Because every price here is a hypothesis, the next 90 days should *manufacture evidence*:
1. **Van Westendorp PSM** in 15–20 discovery interviews (works with no reference price) → acceptable range + optimal point per segment.
2. **MaxDiff** on the V1/V2 feature list → which capabilities are Leaders (drive WTP) vs. Fillers vs. Killers → confirms what to fence into Growth vs. Enterprise.
3. **Gabor-Granger** on the leading 1–2 tier price points once a reference exists → demand curve / revenue-max point.
4. **3–5 paid pilots (#37)** with locked future pricing and a hard conversion deadline → the *only* WTP proof that counts, and the seed bar.
5. **A documented leakage/ROI number from one real customer's own data** → replaces the untraceable market-leakage stats with a defensible ROI you can price against.
6. **Implementation-hours-per-logo** instrumented from pilot #1 → the margin/scalability signal the repo flags as "must know by month 12."

### 7.5 The "do-not-do" list (as important as the do-list)

- ❌ Don't price on **per-seat** (#5) — it taxes the adoption that builds the moat.
- ❌ Don't take an **uncapped % of payouts** in Phases 1–2 — it's the resented model and it forfeits the neutral-Switzerland wedge.
- ❌ Don't model the business on **gross** take-rate — the durable net is ~25–60 bps and the multiple is utility-like.
- ❌ Don't let **implementation/services** grow unfenced — keep blended GM ≥70%.
- ❌ Don't build the unicorn on **flow revenue** (Scenario C unguarded) — build it on gross-profit quality (subscription + data).
- ❌ Don't earn **float/interest** on held funds (#23) — it's a riba problem and the MTL trap the repo says to dodge.
- ❌ Don't claim "Sharia-compliant" without a **fatwa**, or use a fee structure that guarantees a return (riba) or leaves terms open-ended (gharar).
- ❌ Don't grant **reproduce/resell/distribute** rights inside the subscription — it triggers 15% royalty WHT with no US-treaty relief.
- ❌ Don't sell ROI on the **untraceable leakage stats** — use the customer's own measured numbers.
- ❌ Don't launch the **multi-axis model (#30) at Phase 1** — assemble it incrementally or you'll drown adoption in complexity.

---

## 8. Corporate-finance appendix

### 8.1 Benchmark reference table (with vintages & skeptic flags)

| Metric | Good → Great | Reality / median | Source (vintage) |
|---|---|---|---|
| NRR/NDR | 100 / 110 / 120+ | private ~101%; SMB ~97%, ent ~118% | Bessemer 2023; KeyBanc/SaaS Capital 2024 |
| GRR | 88–91% / >95% | enterprise target 95%+ | SaaS Capital 2023 |
| CAC payback | <12 / <18 / <24 mo | **2024 median ~20mo** | Bessemer; KeyBanc 2024 |
| LTV:CAC | ≥3:1 | — | universal convention |
| Gross margin | software 75–85% | services 20–40%; payments 20–30% | SaaS Capital; Damodaran 2025 |
| Rule of 40 | ≥40 | only ~11–30% clear it | KeyBanc 2024; ICONIQ |
| Magic Number | ~1.0; 1.0–1.5 | median ~0.90 | KeyBanc 2024 |
| Burn Multiple | <1 / 1–2 / >2 | repo's own gate | Sacks 2020 |
| Revenue multiple | broad SaaS ~5x; elite ~20x; payments ~4.5x; SaaS-fintech 9–12x | Cloud-100 26→23→20x (2023→25) | Bessemer; Finro 2025 |
| Unicorn bar | ~$100M ARR @ ~10x | T2D3 ≈ $1–2M→$100M in 5–6yr | Bessemer (Centaur); Battery (T2D3) |

### 8.2 Net-take-rate reality (the table to keep on the wall)

| Company | Gross take (of volume) | **Net take (gross profit ÷ volume)** | Fintech GM | Lesson |
|---|---|---|---|---|
| Toast | ~2.53% | **~54 bps** | ~21.5% | ~78% is pass-through; valued on gross profit |
| ServiceTitan | — | **~25 bps** ("roughly constant") | low | software take is sub-1% net |
| BILL | ~0.26% gross | **~26 bps** | low (ACH) | ACH take is structurally tiny |
| Stripe Billing | **0.7%** of billing volume | — | — | the SaaS-billing comp for #18/#19 |
| Embedded benchmark | card ~2.9% | **10–100 bps net** (typ. 25–60) | — | software markup ~10–30 bps |

> **Use net, not gross, in every model.** A "2.5% take rate" and a "50 bps take rate" can be the same business.

### 8.3 Illustrative unit-economics skeleton (SAR; populate with real inputs — all [Validation need])

The repo's burn model supplies the cost frame [Confirmed]; pricing supplies the revenue frame. The skeleton to populate (do **not** invent the company's numbers — these are the cells the WTP work and pilots must fill):

- **Per-logo revenue:** ACV (subscription) + implementation (one-time, fenced) + Settle usage (per-payout × volume + capped bps × net volume).
- **Per-logo cost:** cloud base + per-customer variable (in-Kingdom premium 20–40%) + AI/API (capped) + implementation delivery (loaded CS hours) + KYB/ZATCA-middleware pass-through + support.
- **Gross margin:** target ≥75% Phase 1, ≥70% blended Phase 2; **fence implementation and flow pass-through separately.**
- **CAC:** founder/AE-led (GCC enterprise CAC is high — 6–18mo cycles); **annual prepay** pulls payback toward ~8mo.
- **NRR build:** partner-count growth + tier upgrade + module attach + per-payout/bps volume + 3–5% uplift + data layer → target 105% → 120% across phases.
- **Cash:** model **net-90/120 DSO**, VAT float (working capital, never revenue), Zakat 2.5% (owed pre-revenue), WHT on foreign vendors; favor annual prepay to fund growth (deferred revenue) and improve the burn multiple.
- **Round sizing:** repo method = greater of deficit-coverage or milestone-based; next-raise trigger at 9–12mo runway (MENA process 6–9mo longer); map to MENA seed **$1–5M @ ~$11–18M post**, Series A toward **~$50M** valuation [External].

### 8.4 Path-to-unicorn (Scenario B, illustrative shape only)

T2D3 cadence from a seed base, judged on **gross-profit quality** not GMV:

| Year | ARR shape [Assumption] | Primary engine | Multiple narrative |
|---|---|---|---|
| Seed | ~$1–2M | Capture: GBB + active partners, GCC | pure SaaS ~80% GM |
| +1 (3×) | ~$3–6M | Capture scale + compliance premium | SaaS spine |
| +2 (3×) | ~$9–18M | Settle: per-payout + capped bps, MENA | blended GM ≥72% |
| +3 (2×) | ~$18–36M | Settle scale + global co-sell + data layer | recurring + data dominant in gross profit |
| +4 (2×) | ~$36–72M | Orchestrate: net bps on RUM (capped) + network | story on gross profit |
| +5 (2×) | **~$70–100M+** | Network + data licensing + ad-valorem | Centaur / unicorn at software-like multiple |

**The whole point:** at every year, the *recommendation governs the mix so the high-margin subscription + ~100%-GM data layers stay dominant in gross profit* — that is what lets a flow-touching business still be valued like software at the unicorn line.

---

## 9. Sources

**Internal (this repository):** `Partner_Revenue_OS_Venture_Scale_Narrative.md`, `Partner_Revenue_OS_Master_Strategy_Dossier.md`, `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md`, `Reverse_Engineered_Strategy_Deep_Dive_Companion.md`, `Partner_Revenue_OS_PDR.md`, `partner-revenue-os-PDR-v5.md`, `GTM_Operating_Manual.md`, `Large_Enterprise_Client_Onboarding_Manual.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, `Monthly_CFO_Review_Manual.md`, `Internal_Operating_Cadence_Manual.md`, `Integration_Layer_and_API_Data_Flows_Manual.md`. *(Per the repo's discipline, all company-specific commercial figures are deliberately blank and treated here as [Validation need].)*

**External (third-party, directional — not company facts):**
- **Pricing theory & evolution:** a16z ("Usage-Based Pricing Rule of Thumb"; "Fintech Scales Vertical SaaS," Strange/Shen/Tan/Amble, Sep 2020; overages/predictability essays); OpenView/Kyle Poyar (value-metric checklist; usage-based & State-of-SaaS-pricing reports); Bessemer ("State of the Cloud" 2022/2023; "Scaling to $100M"; AI Pricing Playbook; Cloud 100); ProfitWell/Paddle (value-metric churn/expansion deltas); Lenny's Newsletter / Madhavan Ramanujam ("Monetizing Innovation"); Simon-Kucher (pricing-mistakes, decoy/psychological pricing, tiered pricing); First Round (early-stage pricing); Metronome/Greyhound ("State of Usage-Based Pricing 2025").
- **Embedded fintech / take-rates (primary filings):** Toast 10-K FY2023 (SEC); Shopify FY2023 (SEC 6-K); ServiceTitan S-1 (Nov 2024, SEC); BILL FY2023 (IR); AvidXchange 10-K FY2023 (SEC); Squarespace 10-K FY2023 (SEC); Stripe published pricing (Billing/Connect/ACH); Bill Gurley "A Rake Too Far" (2013); Tidemark "Marketplace Take Rates"; Rainforest (embedded-payments margin); Finro (fintech multiples 2025); Meritech (multiple regressions).
- **Competitor pricing:** Crossbeam, PartnerStack, Impartner, Kiflo, ZINFI, Channelscaler/Allbound, Channeltivity, Zomentum, Introw, Magentrix, WorkSpan, Tipalti, Trolley, Tremendous, Paddle, AppDirect, Tackle.io, RecVue, SETTL, Reditus, Rewardful, FirstPromoter (vendor pricing pages, G2/Capterra/Vendr, BetaKit/BusinessWire on AppDirect–PartnerStack ~$150–250M Apr 2026 and AppDirect–Tackle Dec 2025).
- **Corporate finance / valuation:** Bessemer; SaaS Capital (retention/valuation); KeyBanc/Sapphire 2024 SaaS Survey; Meritech; ICONIQ Growth (Rule of 40 as top predictor); Battery Ventures (Neeraj Agrawal, T2D3, 2015); Damodaran (Stern — gross margin as pricing-power/unit-economics proxy, sector margins).
- **GCC/Saudi:** ZATCA (VAT Implementing Regs; RCM Circular Jan 2023; e-invoicing roll-out & Wave 24, >SAR 375K by 30 Jun 2026; software-payments WHT guideline Jan/Feb 2024); PwC/KPMG/Deloitte/DLA Piper/A&M (WHT 5/15/20%; no US-KSA treaty; TIEA Apr 2026 info-only); AAOIFI Shariah Standards SS-15 (Ju'ala) & SS-46 (Wakala); SAMA (Shariah Governance Framework; FX peg ~3.75); SDAIA/PDPL (enforced 14 Sep 2024); AWS Riyadh GA (Jan 2026); trade.gov (procurement, GTPL, RHQ); MAGNiTT/SVC (KSA VC FY2024 ~$750M, FY2025 ~$1.72bn; MENA seed median ~$11.6M; Series A ~$51M; JADA/INSEAD valuation-reality caution); Vision 2030 (digital-economy targets).

**Method & skeptic note:** External figures were gathered via fan-out web research with adversarial verification; §6.4 grades each input 🟢/🟡/🔴. Where automated full-page fetch was blocked, figures were extracted from search-surfaced primary content and cross-checked across ≥2 independent sources. Treat all 🟡 as directional and all 🔴 as discounted. Several widely-circulated stats (the "usage-based +50% multiple," "+38% growth," PartnerStack "15–25%") are explicitly *not* relied upon.

> **Disclaimer.** This is a pricing-strategy and corporate-finance design document, not an offer, valuation, financial projection, or tax/Shariah opinion. Every company-specific commercial figure is *not yet established* and is labelled [Assumption] or [Validation need]. External figures are third-party estimates that vary by source/method and are used directionally. Tax, WHT, VAT, Zakat, Sharia, PDPL, and procurement specifics require qualified local advisory and a Shariah-board sign-off before being relied upon or marketed.
