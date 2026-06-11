# Reven — Pricing Architecture & Commercial Strategy (Deep Research)

**Product:** **Reven** — the enterprise orchestration and finance-grade control layer for partner revenue. (In this repository the product is documented as **Partner Revenue OS**; "Reven" is treated as the commercial brand for the same product, and `partner-revenue-os-PDR-v5.md` is the binding product source of truth.)

**Document type:** Source-based pricing & packaging architecture · GCC/KSA market-entry lens · segment-specific (SME → large enterprise → semi-government) · 15 deliverables + 30 strategic answers.

**Date:** 2026-06-11.

**What this document adds to the repo.** The repository already contains a sophisticated pricing corpus — `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` (52 structures, a Capture→Settle→Orchestrate journey) and its own adversarial `..._Pricing_Strategy_Red_Team.md`. This document does **three** things those do not: (1) it restructures the strategy into the **exact 15-deliverable commercial format** requested; (2) it grounds every benchmark in **fresh 2024–2026 competitor pricing** gathered through adversarial web research; and (3) it adds the **five-segment design the brief requires — including a fully-priced semi-government tier** the repo had not yet built out — with indicative numbers in **SAR and USD**.

---

## 0. Evidence discipline (read first)

This inherits the repo's non-negotiable rule: **do not invent traction, willingness-to-pay, ACV, or company financials.** Every Reven price below is a **benchmarked hypothesis to test**, not a fact. Five evidence tags are used throughout, exactly as the brief requires:

| Tag | Meaning |
|---|---|
| **[Verified]** | Vendor-published list price, confirmed via vendor page or ≥2 corroborating third-party sources (G2/Vendr/Capterra/TrustRadius). |
| **[Estimated-market]** | Sales-quoted/undisclosed vendor; ACV band triangulated from review sites/Vendr/case studies. Directional. |
| **[Inferred-comp]** | Reasoned from a comparable enterprise-software category, not a direct Reven competitor. |
| **[Reven-recommended]** | This document's proposed Reven price/structure — a hypothesis, benchmarked, **not validated**. |
| **[Assumption→validate]** | A load-bearing assumption that must be converted to evidence (paid pilot, WTP study, real ACV) before launch. |

**Currency convention.** USD shown for comparability with the global comp set; **SAR at the USD/SAR ≈ 3.75 peg [Verified — SAMA]**. KSA contracts are signed in **SAR, VAT-inclusive (15%)** per GCC norms. So `$10,000 ≈ SAR 37,500`. VAT under B2B reverse-charge nets to nil for a fully-taxable customer (working capital, never revenue).

**Method.** Six parallel web-research streams (PRM; ecosystem/account-mapping; affiliate/referral; commissions/ICM; billing/rev-rec; CLM/enterprise-platform) plus a GCC/procurement stream, each instructed to separate verified list prices from estimates and to cite sources. Many vendor and aggregator pages (Salesforce, Vendr, Crossbeam, Chargebee, Stripe, etc.) block automated fetch (HTTP 403); figures were extracted from search-indexed snapshots of those same pages and cross-checked across ≥2 independent sources. Treat all **[Estimated-market]** as directional, not point estimates.

---

# Deliverable 1 — Executive recommendation

## 1.1 The recommended primary pricing architecture

> **A hybrid platform subscription, priced on *active (transacting) partners* in bands with *unlimited internal seats*, packaged Good-Better-Best by capability depth, sold annually (prepaid) above a deliberate ACV floor — with a *stackable GCC compliance premium*, a *fenced* implementation fee, and a *flat per-payout rail fee* introduced only once Reven is the settlement system of record. The resented percentage-of-payout/percentage-of-attributed-revenue model is refused early and re-introduced late only as a capped, Sharia-structured basis-point layer on revenue-under-management.**

This is **Scenario B ("Hybrid control layer")** from the repo, sequenced across the **Capture → Settle → Orchestrate** journey but **governed toward software-margin economics throughout** — and tightened with the red-team's discipline (a real ACV floor, "active = transacted," NRR modelled conservatively, services fenced <20%).

## 1.2 Why it is best for Reven

1. **It matches how the economic buyer budgets.** The Head of Partnerships thinks in *number of partners*; the entire dedicated-PRM category meters there (Kiflo "per active partner, unlimited seats"; Impartner partner-account bands; Crossbeam per-seat+platform). It is the lowest-friction "yes" in Phase 1. [Verified comps]
2. **Unlimited internal seats removes the adoption tax.** Per-seat pricing (Salesforce PRM $25/member, Magentrix $79–199/seat) suppresses the internal usage that builds the moat; seat growth has stalled industry-wide. Reven should make unlimited seats a *feature of the wedge*. [Verified comps]
3. **It refuses the most-resented model at the moment the finance buyer is most sensitive.** The take-rate models (impact.com ~2.5% network fee; PartnerStack "take fee"; PartnerStack-class 3–15%) are repeatedly described by buyers as "a tax on your own success," and the CFO explicitly resists uncapped %. Refusing it early *is* the counter-position. [Verified comps]
4. **It still expands automatically (the NRR engine).** Active-partner growth + module attach + compliance-ladder + entities + (later) payout volume give the **≥3 pricing dimensions** that $100M+ SaaS converge on — without bill-shock.
5. **It fits GCC procurement.** A predictable annual (or multi-year) license with line-item add-ons is what semi-government and regulated buyers can put through Etimad/committee procurement; usage-based bill-shock is a procurement blocker. [Repo + GCC research]
6. **It protects gross margin and the equity multiple.** The subscription + (eventually) ~100%-GM data layer stay dominant in gross profit; flow/percentage fees are capped, fenced, and reported separately so Reven is valued like software, not a processor.

## 1.3 Why the other models stay secondary

| Model | Role | Why not primary |
|---|---|---|
| **% of partner-attributed revenue / payouts** | Late, capped, Sharia-structured (Ju'ala) | Resented; thin *net* (~25–60 bps); WHT-royalty & Sharia risk; multiple-compressing; needs scale Reven lacks early. |
| **Per-internal-seat** | Never | Anti-adoption, anti-moat; taxes the usage that makes Reven sticky. |
| **Per-claim / per-revenue-event** | Optional high-volume add-on only | Discourages the data capture that feeds attribution — the cardinal usage-pricing trap. |
| **Pure flat license** | Transitional / very large accounts only | No NRR engine; leaves money on the table; caps the multiple. |
| **Outcome-based (leakage share)** | CFO *land* overlay on a subscription floor | Powerful ROI story but attribution-dispute and volatility risk; only with airtight measurement and a base floor. |

## 1.4 How pricing differs across segments (one-line each)

- **SME:** low-touch, productized Starter — **optional / land-wedge only** (see Q14); never a high-touch motion on a sub-$25K deal.
- **SMB:** published "Growth" tier; fast implementation; clear ROI; annual prepay.
- **Mid-market:** sales-assisted GBB + modules + active-partner bands + dedicated CSM; the land-and-expand core.
- **Semi-government:** custom annual/multi-year **platform license**; in-Kingdom residency, Arabic/RTL, Etimad/RHQ-aware, training & change-management, SLA; usage-based pricing minimized; procurement-friendly line items.
- **Large enterprise:** custom platform license + modules + per-entity + premium security (SSO/SCIM) + capped flow layer; multi-year with volume commitments.

## 1.5 The five metrics, kept distinct (as the brief requires)

| Metric type | Definition for Reven | What it is |
|---|---|---|
| **Value metric** | **Trusted partner-attributed revenue realized** (the North Star: credited via a canonical Attribution of Record, made eligible *with an explanation*, realized without dispute reversal). | What the customer actually values; rises only when the product does its job. |
| **Pricing metric** | **Active (transacting) partners, in bands × capability tier.** | The unit on the invoice that scales the headline subscription. |
| **Usage metric** | **Payouts processed, revenue events, claims (as an allowance), and — late & capped — revenue-under-management (bps).** | What is metered for overage/expansion in Settle/Orchestrate. |
| **Packaging boundary** | **Capability depth (Operations → Control → Orchestration → Ecosystem Enterprise) × compliance level (L0–L3) × deployment model.** | What separates one package/tier from the next. |
| **Contracting metric** | **Annual / multi-year term, prepayment, entity & country count, uplift clause.** | The commercial terms that govern the deal. |

**Primary expansion metrics, in sequence:** more **active partners** → **modules** (statements, disputes, analytics) → **compliance tier** (L1→L2→L3) → **entities/countries** → **payout/revenue-event volume** → (late) **capped bps on revenue-under-management** + **data/benchmark licensing**.

---

# Deliverable 2 — Market & competitor pricing benchmark

All figures 2024–2026. **[V]** = verified list, **[E]** = estimated/undisclosed. Sources are vendor pages + G2/Vendr/Capterra/TrustRadius/Spendflo/Hyperstart snapshots, cross-checked ≥2 sources. "Undisclosed" means no public list; the estimate is reasoned, not fabricated.

## 2.1 Direct & near-direct comparables (PRM, ecosystem, affiliate/referral)

| Company | Category | Target customer | Public pricing | Est. enterprise ACV | Primary pricing metric | Packaging | Implementation | Relevance to Reven | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| **Impartner** | PRM | Mid→Enterprise | $25K/$45K/$75K editions (G2-reported) **[V]** | $80K–$150K+ with modules **[E]** | Tiered flat by partner-account band + modules | 3 editions + add-on modules (TCMA, LMS, Orchestration) | Quote-only; modules stack on top | **High** — the enterprise-PRM ACV anchor | High |
| **Kiflo** | PRM (SMB) | SMB→low-mid | $149 / $399 / $699–799 per mo; unlimited users; −10% annual **[V]** | ~$8–10K/yr top tier **[E]** | **Per active partner (banded), unlimited seats** | 3 flat tiers; SSO/CSM at top | None (self-serve) | **Very high** — the model Reven should emulate (per-active-partner, unlimited seats) | High |
| **Channeltivity** | PRM | SMB→Mid | ~$1,899/mo Standard; ~$2,199/mo CRM editions **[V]** | ~$25–30K/yr **[E]** | Tiered flat + partner-count | 3 editions by CRM integration | Premium onboarding ~+10–30% **[E]** | High — mid-market PRM anchor | High |
| **Allbound** (Channelscaler) | PRM | Mid-market | From $3,495/mo **[V]** | ~$42K/yr entry+ **[E]** | Tiered flat (partner/seat bands) | Rich single bundle + scaling | Quote-only | Med-high — mid-market bundle anchor | High |
| **ZiftONE** (Unifyr) | PRM/TCMA | Mid→Enterprise | Undisclosed | ~$32.5K median **[E]** | Partner-tier bands | Platform + managed services | Setup fee | Med — "no transaction pricing" posture | Med |
| **Magentrix** | PRM portal | SMB→Mid | Undisclosed exact; +10% monthly **[V-partial]** | ~$23K median ($18–42K) **[E]** | **Per external partner user** + add-ons | Portal plans + add-ons | Quote-only | Med — example of partner-seat pricing (what to avoid) | Med |
| **Salesforce PRM** | PRM (platform) | Mid→Enterprise | **$10/login or $25/member/mo**; External Apps $15/$35 **[V]** | $50K–$250K+ all-in **[E]** | **Per external partner user** (login or member) | Add-on to Sales Cloud + license types | SI-led, often > license | High — the "partner seat" benchmark Reven undercuts | High |
| **Microsoft** (Power Pages + D365) | Partner portal | Mid→Enterprise | Power Pages ~$2/auth external user/mo (100-packs); $200/site/mo **[V]** | $30K–$150K+ **[E]** | Per external user packs + internal D365 seats | Capacity packs on Power Platform | Build-your-own (SI) | Med — platform DIY alternative | High |
| **Oracle PRM** | PRM (platform) | Enterprise | Undisclosed; 50K records free then $10/1,000 **[V-partial]** | $50K–$250K+ **[E]** | Per external user add-on + record overage | Add-on to CX Sales | Enterprise SI | Med — platform comp | Med |
| **SAP** (Partner Channel Mgmt) | PRM (platform) | Enterprise | Undisclosed | $100K+ **[E]** | Per named user, volume agreements | Within SAP Sales/Service Cloud | Enterprise SI | Low-med — platform comp | Low |
| **Crossbeam** (incl. Reveal) | Ecosystem/account mapping | SMB→Enterprise | Free; **Connector $4,800/yr + $1,800/seat/yr**; Supernode from $25K/yr, seats $250/user/mo (min 10) **[V]** | $25K–$75K+ **[E]** | **Flat: platform fee + per-seat** (no take-rate) | Tiers by seats/populations/records | Bundled (self-serve at Connector) | High — the "base + per-unit" template (#6) and free-on-density network play | High |
| **PartnerTap** | Ecosystem/co-sell | Enterprise | Free + Channel Essentials + Enterprise (custom) **[V-tiers]** | ~$5K entry → $150K+ **[E]** | Flat/per-seat; **partner side free** | Free / Essentials / Enterprise | Enterprise onboarding | Med-high — "partners free" precedent | Med |
| **Introw** | PRM (CRM-native) | SMB→Mid | Free (1 partner); from $329/mo **[V]** | ~$15–40K/yr **[E]** | By partners + seats | 3 editions | Low/self-serve | Med — modern CRM-native entry point | Med |
| **PartnerStack** | Affiliate/referral/reseller | B2B SaaS | Undisclosed; ~$800/mo base + **"take fee" % of partner-reward invoice** **[E]** | $25K–$120K+ **[E]** | **Hybrid: base + % take-rate** (~1–3%; up to 3–15% cited, soft) | Modules + Marketplace + payouts | Setup fees common | **Very high (as counter-position)** — the resented rake Reven refuses | Med |
| **impact.com** | Partnership/affiliate network | Mid→Enterprise | Starter **$30/mo or 3% (higher of)**; + **~2.5% network fee** on partner-driven txns **[V/E]** | $50K+/yr Enterprise **[E]** | **Hybrid: subscription + ~2.5% take-rate** | Starter/Essential/Pro/Enterprise + modules | Onboarding + fees | **Very high (counter-position)** — the take-rate to undercut | High (the 2.5%/$30 floor) |
| **Everflow** | Affiliate/partner marketing | Mid-market | **$750/mo** base (unlimited); Everflow Pay +$150/mo + **0.5%→0.2%** payout fee **[V]** | $9–30K+/yr **[E]** | **Flat SaaS**; % only on optional payouts | Platform + Pay add-on | Setup fees | Med — flat-rail precedent; payout fee benchmark | High |
| **TUNE** (HasOffers) | Affiliate (networks) | Networks/advertisers | $499 / $799 / $1,500 per mo published **[V]** | ~$275K avg (high variance) **[E]** | Flat tiered + volume contracts | Bootstrap/Pro/Enterprise/Scale | Enterprise onboarding | Low-med — flat-tier precedent | Med |
| **Rewardful** | Referral (Stripe-native) | SMB | $49 / $99 / $149 per mo **[V]** | ~$1.8–3K/yr **[E]** | **Flat, banded by affiliate-revenue processed; 0% take-rate** | 3 tiers by revenue cap | None (self-serve) | Med — "0% take-rate as a wedge" precedent | High |
| **FirstPromoter** | Referral tracking | SMB→Mid | $49 / $99 / $149 per mo **[V]** | ~$1.8–5K/yr **[E]** | **Flat, banded by tracked revenue; 0% take-rate** | 3 tiers by revenue cap | None (self-serve) | Med — "0% take-rate" precedent | High |

## 2.2 Monetization comparables (commissions/ICM, billing/rev-rec, CLM, enterprise control)

| Company | Category | Target | Public pricing | Est. enterprise ACV | Primary pricing metric | Implementation | Relevance to Reven | Confidence |
|---|---|---|---|---|---|---|---|---|
| **Salesforce Spiff** | ICM | Mid→Ent | **$75/user/mo** (annual) **[V]** | $18–98K by headcount **[E]** | Per-payee/seat; +$250/mo per connector; support 30% | Sales-quoted; biggest negotiation lever | High — per-payee anchor; "settle commissions" adjacency | High (list) |
| **CaptivateIQ** | ICM | Mid→Ent | Undisclosed (~$55/payee/mo list) **[E]** | Median ~$35K; Ent $150–500K+ **[E]** | Per-payee/month | $10–30K typ (5–100K+) | High — per-payee + implementation norm | Med |
| **Xactly** | ICM | Mid→Large Ent | Undisclosed (~$60/user entry) **[E]** | MM $36–216K; Ent $200–750K+ **[E]** | Per-payee/month + modules | **20–40% of ACV** | High — enterprise ICM ACV + impl ratio | Med |
| **Varicent** | ICM | Enterprise | Undisclosed (~$56/user) **[E]** | $150–500K+ **[E]** | Per-payee + modules | Five-/six-figure, consultants | Med-high — enterprise ICM | Low-Med |
| **Performio** | ICM | Mid→Ent | Undisclosed (~$50–120/user) **[E]** | MM $30–120K; Ent $200K+ **[E]** | Per-payee/month | Connectors $5–15K; migration $20–75K+ | Med | Med |
| **Everstage** | ICM | Mid→Ent | Undisclosed (~$25–50/payee) **[E]** | Median $41K ($30–107K) **[E]** | Per-payee/month | Often **waived** to win | Med-high — modern, impl-waived precedent | Med |
| **Stripe Billing** | Billing | SMB→Mid | **0.70% of billings** (+0.25% RevRec; Invoicing 0.4–0.5%) **[V]** | $25–150K+ **[E]** | **% of billings — 0.70%** | None (developer-led) | **Very high** — the SaaS-billing % anchor for any Reven bps | High |
| **Chargebee** | Billing | SMB→Ent | Free <$250K then **0.75%**; Performance **$599/mo** ≤$100K MRR +0.75% **[V]** | $30–120K+ **[E]** | **Platform fee + % overage** | Low-4-figures→$10–25K Ent | High — platform+% overage template | High (list) |
| **Maxio** | Billing/metrics | Mid-market | Grow **$599/mo** ≤$100K/mo; Scale custom **[V-partial]** | $20–90K **[E]** | Platform fee + billings volume | ~$5–25K **[E]** | Med — mid-market billing | Med |
| **Zuora** | Billing/rev-rec | Enterprise | Undisclosed; entry **~$75K/yr** **[E]** | $75–250K+ **[E]** | Platform fee + volume tiers | **15–75% of platform fee** | High — enterprise billing floor & impl intensity | Med |
| **RightRev** | Rev-rec | Enterprise | Floor **$30K/yr** ($2,500/mo) **[V-partial]** | $30–300K+ **[E]** | **% of revenue under management**, $30K floor | 5-figure PS, not in base | High — "% of revenue under management" precedent + floor | Med |
| **Ordway** | Billing/rev-rec | SMB→Mid | Undisclosed; flat annual (NOT %) **[E]** | $20–60K **[E]** | **Flat annual fee** (counter-positions vs %) | $2–20K+ by tier | Med — "predictable flat vs %" precedent | Low-Med |
| **Ironclad** | CLM | Mid→Ent | Quote-only | $30–250K+ **[E]** | Per seat + contract-volume bands | ~0.2–0.6× ACV | Med — workflow-centric, lighter services | Med |
| **Icertis** | CLM | Large Ent | Quote-only | $100–500K+ **[E]** | Per user + volume + modules | **0.8–1.5× ACV** | Med-high — "system-of-record" ACV & services | Med |
| **DocuSign CLM** | CLM | Mid→Ent | Business Pro $40/user/mo unlocks CLM essentials; full CLM quote **[V-partial]** | $10–50K+ **[E]** | Per seat; envelope overages | PS $200–350/hr | Med — agreement adjacency | Med-High |
| **Sirion** | CLM | Large Ent | Quote-only | $150–400K **[E]** | Per user + volume | ~0.7–1.3× ACV | Med — obligation/governance SoR | Med |
| **ServiceNow** | Enterprise workflow/control | Large Ent | Quote-only; **Vendr median $130K** | ITSM Pro $100–140/fulfiller/mo; Ent $150–200+ **[E]** | **Per fulfiller; requesters free**; uplift 3–5%; 3-yr 20–35% off | SI-led, multiples of license | High — "control plane" licensing & ACV multiplier | Med-High |
| **Coupa** | Spend/control | Large/global Ent | Quote-only | MM $50–150K; global $800K–2M+ **[E]** | Per user + transaction/spend + modules | $400K–1.5M+ | Med — global multi-module enterprise control | Med |
| **Salesforce** (ref) | CRM platform | All | **Enterprise $175/user/mo; Unlimited $350** **[V]** | per-seat × thousands | Per seat, edition-gated | SI 0.5–2×+ license | Ref — per-seat platform anchor | High |
| **Workday / SAP / Oracle HCM** (ref) | Enterprise SoR | Large Ent | Undisclosed | $80–400 per employee/yr **[E]** | **Per employee/worker (per-population)** | SI 1–2×+ | High — per-population pricing precedent for multi-entity | Med |

## 2.3 Net-take-rate reality (the wall table for any % decision) [Verified — SEC filings / repo]

| Company | Gross take | **Net take (GP ÷ volume)** | Lesson for Reven |
|---|---|---|---|
| Toast | ~2.53% | **~54 bps** | ~78% is pass-through; valued on gross profit. |
| ServiceTitan | — | **~25 bps** | software take is sub-1% net. |
| BILL | ~0.26% | **~26 bps** | ACH take is structurally tiny. |
| Stripe Billing | **0.70%** | — | the SaaS-billing comp for any Reven bps. |
| Adyen (blended) | — | **~15.5 bps** | a neutral non-custodian targeting >15.5 bps strains credibility. |

> **Discipline:** a "2.5% take rate" and a "50 bps take rate" can be the *same business*. **Model on net, present on gross profit, keep subscription dominant.**

## 2.4 Three structural reads from the benchmark

1. **The category splits on the core metric.** Dedicated PRMs band on **partner count with unlimited seats** (Kiflo/Impartner/Channeltivity); platforms charge **per external partner seat** (Salesforce/Magentrix/Oracle). Reven should sit firmly in the first camp — it is the buyer-friendly, adoption-maximizing choice.
2. **Take-rate pricing is real but concentrated and resented.** It appears in affiliate/marketplace networks (impact.com ~2.5%, PartnerStack take-fee) and in billing/rev-rec (Stripe 0.70%, RightRev % of revenue-under-management) — **not** in PRM. Reven's neutrality wedge is precisely to refuse it early and introduce a *capped, flat-first* money layer late.
3. **"System-of-record / control plane" positioning is the ACV multiplier — and it pulls services up.** Icertis/Sirion/ServiceNow/Coupa command $100K–$2M ACVs *because* they are the authoritative layer, and they carry **0.5–1.5× ACV implementation**. Reven's "finance-grade control layer" framing earns the higher ACV — but the repo's discipline (fence services <20%, push to SI partners) is what protects the multiple.

---

# Deliverable 3 — Pricing-metric scorecard

Each metric scored **1 (poor) – 5 (excellent)** on the brief's 13 criteria. Columns: **CV**=customer-value alignment · **Pr**=predictability · **EU**=ease of understanding · **RS**=revenue scalability · **PA**=procurement acceptance · **EI**=ease of implementation (to meter) · **¬G**=resistance to gaming · **¬D**=does *not* discourage usage · then suitability by segment **SME / SMB / MM / Gov / Ent**. Higher is better on every column (so "¬G" = high means hard to game; "¬D" = high means it won't suppress usage).

| Pricing metric | CV | Pr | EU | RS | PA | EI | ¬G | ¬D | SME | SMB | MM | Gov | Ent |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **Active (transacting) partners — banded** ★ | 4 | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 5 | 5 | 4 | 4 |
| Registered (all) partners | 2 | 4 | 4 | 3 | 4 | 5 | 2 | 2 | 3 | 3 | 2 | 3 | 2 |
| Internal users (seats) | 2 | 5 | 5 | 2 | 4 | 5 | 4 | 1 | 2 | 2 | 2 | 3 | 2 |
| External partner users (seats) | 2 | 3 | 4 | 3 | 3 | 4 | 2 | 1 | 2 | 2 | 2 | 2 | 2 |
| Partnership programs | 3 | 4 | 4 | 3 | 4 | 5 | 3 | 3 | 3 | 4 | 4 | 4 | 3 |
| Agreements | 2 | 4 | 3 | 2 | 3 | 4 | 3 | 3 | 2 | 2 | 3 | 3 | 3 |
| **Claims / attributed deals** | 4 | 2 | 4 | 4 | 2 | 4 | 2 | **1** | 2 | 3 | 3 | 2 | 3 |
| Revenue events | 4 | 3 | 3 | 4 | 3 | 3 | 3 | 2 | 2 | 2 | 4 | 3 | 4 |
| **Payouts / disbursements (flat rail)** ★ | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 5 | 4 | 5 |
| Per-statement | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| Per-dispute / exception | 3 | 2 | 3 | 2 | 2 | 3 | 2 | 2 | 2 | 2 | 3 | 2 | 3 |
| Integrations / connectors | 3 | 4 | 4 | 3 | 4 | 4 | 4 | 2 | 3 | 3 | 4 | 4 | 4 |
| Entities / business units ★ | 4 | 5 | 5 | 4 | 5 | 5 | 4 | 4 | 1 | 2 | 4 | 5 | 5 |
| Countries | 4 | 5 | 5 | 3 | 5 | 5 | 4 | 4 | 1 | 1 | 3 | 4 | 5 |
| **% of partner-attributed revenue** | 5 | 1 | 3 | 5 | 1 | 2 | 2 | 2 | 1 | 2 | 2 | 1 | 3 |
| **% of partner payouts / rev-share** | 5 | 2 | 3 | 5 | 2 | 3 | 3 | 3 | 1 | 2 | 3 | 1 | 3 |
| **Capped bps on revenue-under-mgmt** ★(late) | 5 | 3 | 3 | 5 | 3 | 3 | 4 | 4 | 1 | 1 | 2 | 2 | 4 |
| Modules activated ★ | 4 | 5 | 4 | 4 | 4 | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 5 |
| Platform / flat annual license ★ | 3 | 5 | 5 | 2 | 5 | 5 | 5 | 5 | 3 | 3 | 4 | 5 | 4 |
| API consumption | 3 | 2 | 3 | 4 | 2 | 3 | 3 | 2 | 1 | 2 | 3 | 2 | 4 |
| Outcome / leakage-recovery share | 5 | 1 | 2 | 4 | 2 | 1 | 2 | 4 | 1 | 2 | 3 | 2 | 3 |
| Implementation / PS (one-time) ★ | 3 | 4 | 4 | 1 | 5 | 4 | 5 | 5 | 4 | 4 | 5 | 5 | 5 |

★ = recommended into Reven's model. **Reading the scorecard:**
- **Winners (broad fit, expand with value, hard to bill-shock):** active transacting partners, modules, entities/countries, flat platform license, per-payout flat rail, implementation. These form the recommended stack.
- **% metrics** score top on *customer-value alignment* and *revenue scalability* but **bottom on predictability and procurement** — exactly why they are deferred, capped, and Sharia-structured, never the headline.
- **Claims** is the purest tie to the value object but scores **1 on "does not discourage usage"** — metering it would suppress the data capture that feeds the moat. Keep claims an *allowance*, not a meter.
- **Per-seat** (internal or external) scores **1 on "does not discourage usage"** — the anti-adoption trap. Unlimited seats instead.

# Deliverable 4 — Recommended pricing structures

Six structures, each with the brief's full template. Verdict: **Adopt / Test / Reject** (and *when*).

### Structure A — Good-Better-Best subscription on active partners *(the Capture spine)*

- **Description:** three public-ish tiers (Starter / Growth / Enterprise-lite) differentiated by **active-partner bands × capability depth**, unlimited internal seats.
- **Intended segment:** SME, SMB, lower mid-market.
- **Formula:** `Annual fee = tier price (by active-partner band)`. E.g. Starter ≤25 partners; Growth 25–75; Enterprise-lite 75–150.
- **Advantages:** category-standard (Kiflo/Impartner/Channeltivity); easy to reason about; built-in upgrade ladder; unlimited seats maximizes adoption; finance-friendly predictability.
- **Risks:** "active" is gameable (customers prune partners at renewal); feature-only tier fences have ~2× the churn of value-metric fences.
- **Customer objections:** "we have 200 partners but only 30 transact" → answered by defining **active = transacted/attributed/paid in the period** and billing on a trailing band.
- **Revenue implications:** GM ≥75%; NRR via band upgrades + tier upgrades; the middle "Growth" tier anchors the buy.
- **Operational implications:** needs a clean "active partner" meter + trailing-average billing; low CPQ complexity.
- **Use case:** the everyday land motion for partner-ops buyers replacing spreadsheets.
- **Verdict:** **Adopt now.**

### Structure B — Hybrid: base platform fee + active-partner bands + modules *(the recommended primary)*

- **Description:** a platform base (covers fixed value + cost + finance-grade "seriousness") + a per-active-partner-band component + optional modules (statements, disputes, analytics, compliance).
- **Intended segment:** mid-market and the floor of enterprise — the land-and-expand core.
- **Formula:** `Annual = base platform fee + (active-partner band) + Σ(modules) + compliance tier`.
- **Advantages:** base = revenue floor + predictability (Crossbeam's "$4,800 platform + $1,800/seat" template); per-partner = NRR engine; modules = the ≥3-dimension expansion the $100M+ SaaS norm requires.
- **Risks:** two-to-three components to explain; set the base low enough not to deter SMB but high enough to floor margin.
- **Customer objections:** "why a base *and* a per-partner fee?" → the base buys the control-layer/finance-grade platform; the meter scales with your program.
- **Revenue implications:** best blend of floor + expansion; supports NRR 110–118% at mid-market/enterprise ACV.
- **Operational implications:** needs CPQ + entitlement tracking; a true-up mechanic for partner-band growth.
- **Use case:** the deal Reven wants to sign most often above ~$25–30K ACV.
- **Verdict:** **Adopt now (primary).**

### Structure C — Per-payout flat rail fee + capped overage *(the Settle money layer)*

- **Description:** once Reven is the settlement system of record, a **flat fee per partner payout** (the neutral alternative to a % skim) + gentle overage on payout/revenue-event volume above the tier allowance.
- **Intended segment:** mid-market, enterprise, and (selectively) semi-gov once finance is the buyer.
- **Formula:** `+ (payouts × flat fee) + capped overage`; flat fee benchmarked to **Trolley $0.25 / Tipalti $0.40–2 / Everflow Pay 0.2–0.5%**.
- **Advantages:** finance *loves* flat, *resists* uncapped %; reinforces neutral-Switzerland; predictable; monetizes the flow without taxing it.
- **Risks:** revenue concentrated in a few large payouts; net margin depends on PSP/bank cost per payout — keep the fee above marginal cost.
- **Customer objections:** "another fee?" → it's a *rail* fee for audit-clean, ZATCA/WHT-correct settlement, not a cut of the partner's money.
- **Revenue implications:** lifts ACV and NRR in Settle; blended GM held ≥70% by fencing the pass-through.
- **Operational implications:** requires V2 settlement + reconciliation + idempotent payout; ZATCA/WHT engine.
- **Use case:** the Phase-2 expansion that turns partner-ops software into finance infrastructure.
- **Verdict:** **Test in Phase 2 → Adopt** once settlement-of-record is trusted.

### Structure D — Enterprise & semi-government platform license *(the procurement-shaped deal)*

- **Description:** a negotiated annual (or multi-year) **platform license** scoped by entities, countries, revenue/ecosystem scale, security, and deployment — billed as procurement-friendly line items.
- **Intended segment:** large enterprise, conglomerates, **semi-government**.
- **Formula:** `Annual license = platform base + per-entity + per-country + compliance/residency tier + security (SSO/SCIM) + premium SLA + (training & change-mgmt) + implementation`.
- **Advantages:** budget/CAPEX-style number procurement can encumber; suits Etimad/committee buying; high ACV; predictable for both sides.
- **Risks:** a flat license *breaks the NRR engine* if usage isn't an axis — recover expansion via entities, compliance tier, and modules; long cycles + long DSO.
- **Customer objections:** "we need it in SAR, in-Kingdom, in Arabic, on our paper" → all answered as priced line items, not concessions.
- **Revenue implications:** largest ACVs (SAR 600K–2.5M+ semi-gov; $150–500K+ enterprise); cash drag from net-60–120+ DSO → require annual-upfront.
- **Operational implications:** in-KSA/dedicated deployment, ECC/CCC + PDPL evidence, RHQ/local-content, SI delivery.
- **Use case:** Vision-2030 partner/concessionaire ecosystems; multi-entity GCC groups.
- **Verdict:** **Adopt** for Gov/Large-Enterprise (with usage minimized for semi-gov).

### Structure E — Compliance-premium ladder (stackable add-on) *(the GCC wedge incumbents can't retrofit)*

- **Description:** a stackable premium — **L0 Standard → L1 Regulated-ready (ZATCA Phase-2, WHT 5/15/20%, PDPL) → L2 In-Kingdom (residency, NCA ECC/CCC, continuous KYB) → L3 Sharia-certified (Ju'ala/Wakala + fatwa)**.
- **Intended segment:** every KSA customer; mandatory de-facto for fintech/SAMA, gov.
- **Formula:** `+ compliance tier (L1 mid-tier uplift; L2 +~15–30% residency/dedicated; L3 premium + trust asset)`.
- **Advantages:** the clearest WTP uplift global incumbents lack; finance/IT hot button; converts stalled regulated deals.
- **Risks:** migrating to table-stakes (ZATCA Wave 24 sweeps all B2B > SAR 375K by Jun 2026) — charge now, plan to rebundle; some sub-components (clearance) are thin-margin pass-through.
- **Customer objections:** "isn't ZATCA just required?" → yes, and Reven makes partner-payout invoices clear it *and* tie to attribution evidence; the premium is for residency/accreditation/Sharia, which are genuinely differentiated.
- **Revenue implications:** high-margin software add-on; the residency/dedicated uplift is anchored to the BCG **~15–30%** sovereign benchmark.
- **Operational implications:** in-KSA region (Google Dammam live; Oracle Riyadh; Azure KSA Q4 2026; AWS KSA 2026), ECC/CCC controls, KYB via Elm/Mozn/Uqudo, Shariah-board sign-off.
- **Use case:** the wedge that opens fintech/insurance/semi-gov and justifies a distinct, higher KSA price book.
- **Verdict:** **Adopt now** (L1–L2); **Test** L3 with Islamic-finance buyers.

### Structure F — Capped bps on revenue-under-management + Ju'ala outcome overlay *(the Orchestrate prize, sequenced last)*

- **Description:** at real scale, a **net basis-point rate on partner-revenue/GMV under management**, declining tiers + hard caps, structured as **Ju'ala (fee-for-result)**; optionally a leakage-recovery success fee over a subscription floor.
- **Intended segment:** large enterprise / network, late.
- **Formula:** `+ min(cap, bps × RUM)`, bps modelled at the **low end (≤25 bps net)**; outcome fee = `base + share of provably-recovered leakage`.
- **Advantages:** rides the flow; compounds with customer growth; the venture-scale line.
- **Risks:** "tax on success" resentment; thin *net* (~25–60 bps; Adyen blended ~15.5 bps); multiple-compression; WHT-royalty trap; needs Toast/ServiceTitan-scale volume; disintermediation of bilateral settlement.
- **Customer objections:** "you're taxing our growth" → capped, declining, Ju'ala-structured, and only on flow Reven provably orchestrates; keep subscription dominant.
- **Revenue implications:** NRR accelerant, **not** a multiple-expander — model on net, present on gross profit, keep SaaS+data dominant.
- **Operational implications:** orchestration/ledger-of-record so the executing bank is interchangeable; rigorous net-margin tracking; fatwa before marketing "Sharia-compliant."
- **Use case:** Stage-5 "own the ledger every Partner P&L runs on."
- **Verdict:** **Defer; Test late, capped, on willing accounts only.** Never the headline pre-scale.

---

# Deliverable 5 — Final tier structure (indicative, SAR + USD)

**Pricing-visibility strategy:** **publish** SME and SMB anchors (ACV <$25K converts far better with visible pricing; hiding all numbers drives ~30% abandonment); show **"starting at"** for mid-market; **custom-quote** semi-government and large enterprise (procurement expects it). All numbers **[Reven-recommended / Assumption→validate]**, benchmarked to the comps in Deliverable 2.

| Tier | Ideal customer | Annual platform fee (USD) | Annual (SAR) | Monthly equiv. | Incl. internal users | Incl. active partners | Incl. programs | Incl. claims / activity | Incl. integrations | Incl. modules (package) | Support | Implementation fee | Overage | Term | Visibility |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1 · SME (Starter)** | Small partner/referral program, low complexity | **$6–12K** | **SAR 22–45K** | ~$500–1,000 | Unlimited | up to ~25 | 1 | allowance (e.g. 1.5K claims/yr) | 1 CRM connector | **Partner Operations** (registry, programs, claim ledger, basic attribution-of-record, protection, evidence export) | Digital / KB, pooled | Templated, **$2–5K or waived on annual prepay** | Partner-band step-up | Annual (monthly option +) | **Published** |
| **2 · SMB (Growth)** | Growing multi-type channel, manual statements | **$18–40K** | **SAR 67–150K** | ~$1.5–3.3K | Unlimited | ~25–75 | up to 3 | allowance (e.g. 6K/yr) | up to 2 (CRM + 1) | **+ Partner Revenue Control** (statements, disputes, finance evidence pack, payout-eligibility preview, data-quality, conflict/dedup) | Named CSM (pooled), faster SLA | **$8–20K** (productized) | Partner band + payout overage | Annual (12-mo) | **"Starting from"** |
| **3 · Mid-market** | Material partner-attributed revenue, multi-program, finance+legal involved | **$50–120K** | **SAR 188–450K** | ~$4.2–10K | Unlimited | ~75–250 (banded) | unlimited | high allowance / metered | 3–5 (CRM/ERP/billing) | **+ Partner Revenue Orchestration** (multi-party attribution, revenue-event matching, reversals/clawback, advanced workflows, multi-entity-lite, analytics) | Dedicated CSM | **15–30% of Y1 ACV** | Active-partner band + per-payout + capped event overage | Annual / 2-yr | **Sales-assisted ("starting at")** |
| **4 · Semi-government** | Vision-2030 entity, concessionaire/vendor ecosystem, audit & sovereignty mandates | **$160–650K+** | **SAR 600K–2.5M+** | — | Unlimited | negotiated / unlimited | unlimited | committed floor + minimal usage | all required + Etimad/Nafath/sector rails | **Ecosystem Enterprise** + **L2 In-Kingdom** (+ optional **L3 Sharia**), Arabic/RTL, multi-entity | Dedicated CSM + Solution Architect, **premium SLA** | **SAR 300K–1.5M+** (config, migration, Arabic, change-mgmt, accreditation) | Minimized; entity/country expansion | **Multi-year (3–5 yr) + annual uplift, SAR, upfront** | **Custom quoted** |
| **5 · Large enterprise** | Large multi-entity/multi-country ecosystem, high event volume | **$150–500K+** | **SAR 560K–1.9M+** | — | Unlimited | negotiated / unlimited (bands) | unlimited | metered with commit | all + premium API/sandbox | **Ecosystem Enterprise** (SSO/SCIM, multi-entity, dedicated tenant option, capped flow layer, data/benchmark licensing) | Dedicated CSM + SA, exec reviews | **0.5–1.0× Y1 ACV** (or fixed bands) | Per-entity + per-country + capped bps (late) | Multi-year + volume commit | **Custom quoted** |

**Notes.** (1) Implementation is **fenced** (reported separately, contribution-positive, pushed to SI partners over time). (2) Semi-gov & large-enterprise omit "monthly equivalent" by design — these are committed annual/multi-year licenses. (3) The **active-partner band**, not seats, is the headline scaling unit at every tier; **internal seats are unlimited everywhere**. (4) Minimum ACVs (Deliverable 11) gate which tier a buyer may enter — there is no sub-$6K Reven.

---

# Deliverable 6 — Three alternative pricing scenarios

| | **A · Adoption-led** | **B · Balanced (RECOMMENDED)** | **C · Enterprise-value** |
|---|---|---|---|
| **Goal** | Maximize logos/data fast | Adoption + margin + value capture | Maximize ACV; position as critical infrastructure |
| **Model** | Low published SME/SMB GBB on active partners; generous limits; implementation waived on annual; no flow layer | GBB + hybrid base + modules + compliance ladder + fenced implementation; **flat per-payout in Settle**; capped bps + data licensing late | Platform-license-led; modules + compliance L2/L3 + per-entity + premium security + capped flow; services-rich; semi-gov/enterprise first |
| **Entry ACV** | $6–18K | $18–120K (floor real high-touch ≥$25–30K) | $120K–650K+ |
| **Blended GM** | ~80% (pure SaaS) but low ARPU | **~72–78%** (subscription dominant, flow fenced) | 68–75% (services/residency heavier) |
| **NRR** | ~100–108% (SMB ceiling ~97%) | **~112–120%** (module + band + payout + data) | ~115–122% (entity + compliance expansion) |
| **CAC payback** | fast logo count, slow $ payback (valley-of-death risk) | <18 mo with annual prepay (toward ~8 mo) | long (6–18-mo cycles) but high ACV; prepay essential |
| **Multiple posture** | software but capped ceiling | **software-like 6–10×** on gross-profit quality | risk of services/utility drag if flow/PS dominate |
| **Procurement fit (GCC)** | weak above SME | strong | strongest (built for Etimad/committee) |
| **Primary risk** | underpricing; ACV/motion mismatch; all-SMB book caps multiple | execution complexity (multi-axis assembled too early) | slow cash; services-heavy; long sales cycles |
| **When to use** | a deliberate land-wedge *only* into accounts underwritten to expand | **the default trajectory** — sequence A→B→C over time, govern toward B's economics throughout | lead motion for semi-gov/large-enterprise *within* B |

**Trade-off synthesis:** the three are **not a one-time choice** — they are a *trajectory*. Launch with A's simplicity for the published SME/SMB tiers, run B as the company's governing economics, and deploy C's license-led motion specifically for semi-gov and large enterprise. **Bias the *book* toward mid-market/enterprise/semi-gov** (SMB NRR rarely clears ~110%); an all-SME book caps the multiple.

---

# Deliverable 7 — Packaging matrix

Four packages mapped to the tiers: **Ops** (Partner Operations · SME) · **Control** (Partner Revenue Control · SMB) · **Orch** (Partner Revenue Orchestration · Mid-market) · **Ent** (Ecosystem Enterprise · Semi-gov + Large enterprise). ✓ = included · **A** = paid add-on · — = not in package. Principle: **never withhold a capability essential to the product's core value** (e.g. attribution-of-record, audit trail) just to fence a tier — fence on *scale, compliance, deployment, and depth*, not on integrity.

| Capability | Ops (SME) | Control (SMB) | Orch (Mid-mkt) | Ent (Gov / Large) |
|---|:--:|:--:|:--:|:--:|
| Partner registry | ✓ | ✓ | ✓ | ✓ |
| Program management | ✓ (1) | ✓ (3) | ✓ (∞) | ✓ (∞) |
| Agreement metadata | ✓ | ✓ | ✓ (+rule engine) | ✓ (+rule engine) |
| **Claim Ledger** | ✓ | ✓ | ✓ | ✓ |
| Evidence management | ✓ (basic) | ✓ | ✓ | ✓ |
| **Attribution of Record** | ✓ (single, human) | ✓ | ✓ (+multi-touch advisory) | ✓ (+multi-party) |
| Protection windows | ✓ | ✓ | ✓ | ✓ |
| Duplicate detection | ✓ | ✓ | ✓ | ✓ |
| Conflict management | — | ✓ | ✓ | ✓ |
| Revenue-event matching | — | A | ✓ | ✓ |
| Eligibility (single service) | ✓ (preview) | ✓ | ✓ (full) | ✓ (full) |
| Statements | — | ✓ | ✓ | ✓ |
| Disputes | — | ✓ | ✓ | ✓ |
| Reversals / clawback | — | A | ✓ | ✓ |
| Audit exports | ✓ (CSV) | ✓ | ✓ | ✓ (immutable, ZATCA/WHT) |
| Analytics / intelligence | basic reports | A | ✓ (program ROI) | ✓ (ecosystem + forecasting) |
| Multi-entity | — | — | ✓ (lite) | ✓ (full) |
| API | — | A | ✓ | ✓ (premium capacity) |
| SSO | — | A | ✓ | ✓ |
| SCIM | — | — | A | ✓ |
| Data residency (in-KSA) | — | — | A (L2) | ✓ (L2 standard) |
| Dedicated tenant | — | — | A | ✓ / A |
| Sandbox | — | — | ✓ | ✓ |
| Premium SLA | — | A | A | ✓ |
| Customer-success level | Digital/pooled | Named (pooled) | Dedicated CSM | CSM + Solution Architect |
| Compliance ladder | L0 | L0–L1 (A) | L1–L2 (A) | L2 standard, L3 (A) |

**Is a four-package structure optimal?** Yes — it cleanly maps outcomes (replace spreadsheets → add finance control → orchestrate complexity → enterprise/sovereign), supports land-and-expand, and matches the repo's capability layering. The refinement vs the brief's draft: **fold "Partner Portal" and "Advanced Integrations / Enterprise Security / AI" into the package/compliance/add-on axes** rather than as standalone packages, to avoid SKU sprawl. AI-assisted attribution is an add-on (metered) so inference cost never erodes the ≥70% GM line.

# Deliverable 8 — Add-on pricing

Indicative **[Reven-recommended / Assumption→validate]**, anchored to comps (ICM connector $250/mo; Crossbeam seat $1,800/yr; ZATCA middleware SAR 0.5–2/clearance; sovereign premium ~15–30%; support 30% of license).

| Add-on | Pricing basis | Indicative range (USD) | Indicative (SAR) | Cost-to-serve | Tiers | Recurring/one-time |
|---|---|---|---|---|---|---|
| Additional active-partner block | per band (e.g. +25) | $3–8K/block/yr | SAR 11–30K | low (software) | All | Recurring |
| Additional claim/activity volume | per allowance block | $2–6K/yr | SAR 7.5–22K | low | SMB+ | Recurring |
| Additional revenue-event volume | per allowance block | $3–8K/yr | SAR 11–30K | low-med | MM+ | Recurring |
| Additional business entity | per entity | $8–25K/entity/yr | SAR 30–94K | low-med | MM+ / Gov | Recurring |
| Additional country | per country | $6–20K/country/yr | SAR 22–75K | med (tax/locale) | Ent / Gov | Recurring |
| Additional program/partner-type module | per module | $3–10K/yr | SAR 11–37K | low | All | Recurring |
| Additional integration / connector | per connector | $4–15K/yr | SAR 15–56K | med (maintenance) | SMB+ | Recurring |
| Premium API capacity | tier / per-call band | $10–40K/yr | SAR 37–150K | med | Ent | Recurring |
| Advanced analytics / ecosystem intelligence | module | $12–40K/yr | SAR 45–150K | low (software) | MM+ | Recurring |
| AI-assisted attribution | metered (capped) | $0.5–2 / scored claim or $10–50K/yr cap | SAR 37–188K cap | **high (inference)** — fence/cap | MM+ | Recurring (metered) |
| **L2 In-Kingdom residency / dedicated tenant** | % uplift on license | **+15–30% of license** | proportional | high (infra) | Ent / Gov | Recurring |
| **L3 Sharia certification (Ju'ala/Wakala + fatwa)** | premium + setup | $15–40K setup + premium | SAR 56–150K + | med + one-time fatwa | Regulated | Recurring + one-time |
| **Compliance pack (ZATCA/WHT/PDPL)** | module / per-clearance | $10–30K/yr (or SAR ~1–2/clearance pass-through) | SAR 37–112K | med (middleware pass-through) | All KSA | Recurring |
| Data migration / historical claim reconciliation | fixed by volume | $10–60K | SAR 37–225K | high (services) | MM+ / Gov | One-time |
| Agreement digitization / rule configuration | fixed by complexity | $8–40K | SAR 30–150K | high (services) | MM+ / Gov | One-time |
| Custom workflow / custom reporting | T&M or fixed | $150–350/hr or $8–30K | SAR 560–1,300/hr | high (services) | Ent / Gov | One-time |
| Dedicated sandbox | flat | $5–15K/yr | SAR 19–56K | low-med | Ent | Recurring |
| Premium support / 24-7 / custom SLA | % of ACV | **15–30% of ACV** | proportional | med | Ent / Gov | Recurring |
| Managed partner operations / finance reconciliation | retainer (FTE-equiv) | $3–12K/mo | SAR 11–45K/mo | **high (services)** — fence | Gov / Ent | Recurring |
| Partner onboarding services | per cohort | $5–25K | SAR 19–94K | high | All | One-time |
| Training / change management | per program | $8–40K | SAR 30–150K | high | Gov / Ent | One-time |
| Solution architecture / advisory | retainer / T&M | $200–400/hr | SAR 750–1,500/hr | high | Ent / Gov | Either |
| Audit support (period-end / external audit) | per engagement | $5–20K | SAR 19–75K | med | Finance-led | One-time/recurring |

**Rules:** recurring add-ons should be **high-margin software** (residency infra excepted); **services add-ons are fenced** (reported separately, contribution-positive, pushed to SI partners over time) to protect the ≥70% blended GM and the multiple. AI is **always metered/capped** because inference runs 50–60% GM vs 80–90% SaaS.

---

# Deliverable 9 — Implementation pricing

Implementation is **priced separately from subscription**, recommended as **fixed-fee + milestone-based** (predictable for procurement, protects scope), **never pure T&M for the customer-facing scope**, with custom work billed as paid services. Mandatory for mid-market+ (it deepens switching cost and filters tire-kickers); **waivable/templated for SME** on annual prepay.

| Package | Segment | Scope | Effort driver | Indicative fee | SAR | Pricing model |
|---|---|---|---|---|---|---|
| **Templated** | SME | Self-serve config, 1 CRM connector, standard workflow, digital training, go-live | ~10–25 hrs | **$2–5K or waived on annual** | SAR 7.5–19K | Fixed / waived |
| **Standard** | SMB | Config, basic data import, 1 CRM integration, workflow setup, role training, go-live support | ~40–80 hrs | **$8–20K** (≈15–30% Y1 ACV) | SAR 30–75K | Fixed |
| **Advanced** | Mid-market | Multiple integrations, data mapping, agreement-rule config, historical migration, RBAC/ABAC design, finance workflows, custom reports, change mgmt | ~120–300 hrs | **15–30% of Y1 ACV** (e.g. $15–60K) | SAR 56–225K | Fixed + milestones |
| **Enterprise transformation** | Large enterprise | Multi-entity rollout, multiple ERPs/CRMs, identity architecture (SSO/SCIM), custom security, historical reconciliation, process redesign, program governance, exec reporting, regional rollout, adoption program | 600–2,000+ hrs | **0.5–1.0× Y1 ACV** | proportional | Milestone-based + SI |
| **Semi-government** | Semi-gov | Above + in-KSA/dedicated deployment, ECC/CCC + PDPL evidence, Arabic/RTL, Etimad/Nafath/sector-rail integration, Arabic contract/SLA pack, accreditation, change management | 800–3,000+ hrs | **SAR 300K–1.5M+** | — | Milestone-based + local SI |

**Why these ratios:** they mirror the enterprise comps — ICM implementations run **20–40% of ACV** (Xactly/Varicent), CLM/control-layer "system-of-record" platforms run **0.5–1.5× ACV** (Icertis/Coupa/Zuora), while workflow-centric tools are lighter (Ironclad ~0.2–0.6×). Reven sits in the **finance-grade control-layer band**, so 15–30% (mid-market) rising to 0.5–1.0×+ (enterprise/gov) is correct — **but the strategic goal is to drive these down over time** via productization and SI partners, keeping services <20% of revenue (a board metric).

---

# Deliverable 10 — ROI & willingness-to-pay model

**Discipline (from the red team):** sell ROI on the **customer's own measured numbers from a paid pilot**, never on untraceable market-leakage stats. The formulas below are the *structure*; the customer fills the cells.

## 10.1 The four value pools (formulas)

```
V1  Revenue protection   = Partner-attributed revenue × measured leakage rate × Reven recovery factor
                           (leakage = lost/duplicate referrals + mis-attribution + protection-expiry losses)
V2  Cost reduction       = Σ(hours saved by function × loaded hourly cost) + avoided-hire cost
                           (partner-ops + finance reconciliation + legal review + dispute handling)
V3  Financial-control    = (overpayment rate × partner-payout volume × prevention factor)
                           + audit/misstatement/compliance-penalty risk reduction (probability × cost)
V4  Strategic (option)   = faster program launch + more partners scaled + ROI visibility
                           (raises WTP; rarely line-item billable)

Total measurable annual value  TMV = V1 + V2 + V3        (V4 as a WTP premium)
Reven WTP ceiling (year)       ≈ capture share × TMV + strategic premium
Recommended Reven price         = 10–20% of TMV   → customer ROI of 5–10×
```

## 10.2 Worked examples (illustrative cells; all [Assumption→validate])

| Driver | SMB | Mid-market | Large enterprise | Semi-gov |
|---|---|---|---|---|
| Partner-attributed revenue/yr | SAR 15M | SAR 80M | SAR 400M | SAR 250M |
| Active partners | 40 | 150 | 600 | 300 (vendors/concessionaires) |
| Measured leakage rate | 2.0% | 1.5% | 1.2% | 1.5% |
| Reven recovery factor | 35% | 40% | 45% | 40% |
| **V1 revenue protection** | SAR 105K | SAR 480K | SAR 2.16M | SAR 1.5M |
| Ops/finance hours saved (FTE-equiv) | 1.0 | 2.5 | 6 | 4 |
| **V2 cost reduction** | SAR 180K | SAR 450K | SAR 1.1M | SAR 800K |
| Overpayment prevented | SAR 60K | SAR 250K | SAR 900K | SAR 600K |
| **V3 financial control** | SAR 90K | SAR 320K | SAR 1.2M | SAR 1.0M |
| **TMV (V1+V2+V3)** | **SAR 375K** | **SAR 1.25M** | **SAR 4.46M** | **SAR 3.3M** |
| **Reven ACV @ ~12–18% TMV** | SAR 55–70K | SAR 150–225K | SAR 600–800K | SAR 500K–1.5M+ |
| Implied customer ROI | ~5–7× | ~6–8× | ~6–7× | ~3–6× (incl. compliance value) |

## 10.3 How much of customer value Reven can capture

- **Recommended capture: 10–20% of measurable annual value** — high enough for venture economics, low enough to leave the customer a 5–10× ROI (so the renewal is obvious) and to stay clear of "tax on success."
- Crucially, that capture expressed as **a % of partner-attributed revenue is far below 1%** (e.g. SAR 150–225K on SAR 80M ≈ 0.19–0.28%). This is the quantitative reason the *headline* should never be "1–3% of attributed revenue": the value-justified price is **sub-30 bps**, consistent with the net-take reality (Toast ~54 bps, ServiceTitan ~25 bps, Adyen ~15.5 bps). **Capture value through the subscription + modules, not a visible percentage.**
- **Growth-rate effect:** because V1–V3 scale with partner-attributed revenue and partner count, a customer growing its ecosystem 30%/yr raises TMV ~30%/yr — the **NRR engine** that lets Reven raise active-partner bands and attach modules without a percentage fee.

---

# Deliverable 11 — Pricing fences

The limits that separate tiers (avoid arbitrary feature-withholding where the feature is essential to value — fence on **scale, compliance, deployment, depth, support**):

| Fence | SME | SMB | Mid-market | Semi-gov | Large enterprise |
|---|---|---|---|---|---|
| **Active partners** | ≤25 | ≤75 | ≤250 (banded) | negotiated | negotiated/unlimited |
| **Business entities** | 1 | 1 | ≤3 | multi (priced) | multi (priced) |
| **Programs** | 1 | ≤3 | unlimited | unlimited | unlimited |
| **Annual claim/activity** | ~1.5K allowance | ~6K allowance | high/metered | committed floor | metered + commit |
| **Revenue-event volume** | — | add-on | included (metered) | minimal usage | metered + commit |
| **Integrations** | 1 (CRM) | ≤2 | 3–5 | all required + gov rails | all + premium API |
| **Security** | standard | +SSO (A) | SSO incl., SCIM (A) | SSO/SCIM + ECC/CCC | SSO/SCIM + premium |
| **Deployment** | shared cloud | shared cloud | shared (+L2 A) | **in-KSA / dedicated** | dedicated option |
| **Workflow complexity** | basic approvals | + disputes | + multi-party/reversals | + governance/Etimad | + custom governance |
| **Support** | digital/pooled | named (pooled) | dedicated CSM | CSM+SA, premium SLA | CSM+SA, exec reviews |
| **Minimum ACV** | **$6K / SAR 22K** | **$18K / SAR 67K** | **$50K / SAR 188K** | **~$160K / SAR 600K** | **$150K / SAR 560K** |

**Minimum-ACV rationale:** the red team's load-bearing fix is to **floor the high-touch motion at ~$25–30K** — so SME ($6–18K) is served **low-touch/self-serve only**, and anything requiring a sales+implementation motion must clear ~$25–30K. Below that, route to self-serve or disqualify. Semi-gov/enterprise floors reflect procurement cost-to-serve (6–18-mo cycles, accreditation, residency).

---

# Deliverable 12 — Expansion & upsell map

The land-and-expand graph and the **natural upgrade triggers** (the events that *automatically* justify more spend):

| Expansion axis | Mechanism | Natural trigger |
|---|---|---|
| **More active partners** | active-partner band step-up | program crosses a band threshold (e.g. 25→26) |
| **More programs / partner types** | per-program module | launches reseller/marketplace motion on top of referral |
| **More entities / business units** | per-entity license | rolls Reven from one BU to the group (GCC conglomerate path) |
| **More countries** | per-country license | expands partner program to UAE/GCC |
| **More integrations** | per-connector | connects ERP/billing after CRM (deepens switching cost) |
| **More claims / revenue events** | allowance overage / metered | partner motion scales; continuous attribution begins |
| **Advanced attribution** | multi-touch / multi-party module | channel conflict or co-sell complexity emerges |
| **Finance modules** | revenue-event matching, reversals, statements | finance becomes the second buyer (Capture→Settle) |
| **Settlement layer** | flat per-payout + capped overage | Reven becomes settlement system of record |
| **Analytics / ecosystem intelligence** | analytics module | exec wants program ROI / forecasting |
| **Compliance ladder** | L1→L2→L3 | ZATCA Wave 24 deadline; SAMA/NCA audit; Islamic-finance buyer |
| **Enterprise security** | SSO/SCIM, dedicated tenant, residency | IT/security review gates the enterprise tier |
| **Premium services / support** | 24-7 SLA, managed ops, advisory | mission-critical dependence |
| **Geographic / network** | per-country + (late) network/data licensing | cross-tenant partner density appears |

**Strongest upgrade triggers (rank-ordered):** (1) **active-partner band crossings** (frictionless, automatic); (2) **finance becoming the buyer** (unlocks statements/settlement/compliance — the biggest ACV step); (3) **multi-entity/multi-country rollout** (one logo → many entities); (4) **ZATCA/residency compliance deadlines** (regulatory forcing function); (5) **module attach** as channel complexity grows.

# Deliverable 13 — Five-year monetization logic

How ACV, expansion, implementation, and gross margin evolve as Reven moves from operational software to financial infrastructure. (All [Assumption→validate]; "govern toward Scenario B" throughout.)

| Stage | What's monetized | Primary buyer | Value/pricing metric | Indicative ACV | Implementation | NRR | Blended GM | Multiple narrative |
|---|---|---|---|---|---|---|---|---|
| **1 · Claim Ledger + attribution wedge** | System of record for partner-sourced revenue | Head of Partnerships | Active partners (GBB) | ~$20–25K | 15–30% of ACV | ~105% | ~80% | pure SaaS |
| **2 · Revenue eligibility + statements** | Finance trust: eligibility, evidence, statements | + CFO/Finance | + per-payout flat + modules | ~$40–60K | 15–30% (productizing) | ~112% | ~75% | SaaS spine + finance modules |
| **3 · Program economics + ecosystem intelligence** | Program ROI, analytics, benchmarks | + CRO/CEO | + analytics module + capped overage | ~$80–120K | falling as % (SI-led) | ~115–118% | ~74% | recurring + data dominant in GP |
| **4 · Multi-entity / multi-country orchestration** | Group-wide, cross-border partner revenue | + Group CFO / Board | + per-entity + per-country + residency | ~$150–300K | milestone, SI-delivered | ~118–120% | ~72% | enterprise control layer |
| **5 · Enterprise partner-revenue infrastructure** | The ledger every Partner P&L runs on; network | Board / network | + capped bps on RUM + data licensing + network | 6–7 figures | productized + SI | ~120–125% | ~70–72% blended (data ~100% GM offsets flow) | infrastructure, **narrated on recurring + fintech gross profit** |

**The through-line:** ACV climbs ~6–10× from Stage 1 to Stage 5; **expansion revenue overtakes new-logo revenue** by Stage 3 (the NRR engine); **implementation grows in absolute dollars but shrinks as a % of revenue** (productized + pushed to SI partners), protecting the multiple; and **gross margin is deliberately held software-like (≥70%)** by keeping subscription + ~100%-GM data licensing dominant in gross profit even as the flow layer is added. This is how a flow-touching business stays valued like software.

---

# Deliverable 14 — Pricing validation plan

**Principle:** only **revealed** willingness-to-pay counts (paid pilots, $-committed LOIs). Stated-preference methods are *hypothesis generators*, not validation (people overstate WTP "by a factor of two or three").

| Method | Purpose | When | Weight |
|---|---|---|---|
| **Discovery interviews (15–20)** | Map value pools, budget source, buyer | now | Hypothesis |
| **Van Westendorp PSM** | Acceptable price range with no reference price | now | Hypothesis |
| **MaxDiff on V1/V2 features** | Which capabilities drive WTP (fence Growth vs Enterprise) | now | Hypothesis |
| **Gabor-Granger** | Demand curve once a reference price exists | after pilots | Directional |
| **Conjoint (choice-based)** | Trade-offs across tier/partners/modules/compliance | pre-scale | Directional |
| **Sales-call / proposal testing** | Real reactions to real quotes | continuous | Strong |
| **Paid pilots (3–5)** | The only pre-revenue WTP proof; sets the price floor | now→seed | **Decisive** |
| **Win-loss analysis** | Why deals close/stall; price vs value vs procurement | continuous | Strong |
| **Competitor quote collection** | Real Impartner/Salesforce-PRM/ICM quotes from prospects | continuous | Strong |
| **Procurement interviews** | Etimad/committee line-item acceptability, payment terms | pre-gov | Strong (gov) |
| **Pricing-page experiments** | Published-anchor conversion (SME/SMB) | post-launch | Directional |

### Interview questions by stakeholder

**Partnership leaders (Head of Partnerships / Ecosystems / Channel):**
1. How many partners do you have vs how many *actually transact* in a quarter? (validates "active = transacted")
2. When a partner deal is disputed today, what does it cost you in time and relationship?
3. What's your annual partner-ops budget, and what line does new tooling come from?
4. If we proved attribution per partner, what decision would you make differently?
5. At what price would this be an easy "yes" without finance escalation — and at what price would you not bother?

**CFOs / Finance leadership:**
1. What is your *measured* partner-payout leakage / overpayment rate last year? (the only ROI number that counts)
2. How long does partner-statement preparation and reconciliation take, in FTE-hours?
3. Would you accept a flat per-payout fee? At what point does a *percentage* of payouts become unacceptable?
4. What audit/ZATCA/WHT exposure on partner payments keeps you up at night?
5. Annual-upfront vs quarterly — what term gets the best price through your process?

**RevOps / Partner Ops:**
1. How much of your week is reconciliation, dedup, and exception-clearing?
2. Which systems would Reven need to integrate before it's trusted (CRM/ERP/billing)?
3. What would make you *not* record a claim? (tests whether per-claim pricing would suppress capture)
4. How do you define an "active" partner internally today?

**Finance controllers / Revenue accounting:**
1. What evidence does your auditor require to accept a partner payout?
2. How are clawbacks/reversals handled today, and what breaks?
3. What would "audit-ready partner liabilities" be worth at period-end?

**IT & Security / Enterprise architecture:**
1. Is in-KSA data residency a hard gate or a preference for this data class (CST L2/L3)?
2. SSO/SCIM, ECC/CCC, PDPL evidence — which are mandatory for procurement to proceed?
3. Shared multi-tenant vs dedicated/single-tenant — what does your policy require, and who pays the premium?

**Procurement:**
1. Which contract structure clears fastest — annual license, multi-year, or usage? What line items must appear?
2. SAR-only? VAT treatment? Payment terms you can actually commit to (vs Art. 109 reality)?
3. Is an RHQ / local entity / IKTVA local-content score required for us to bid?

**Semi-government buyers:**
1. Does this data fall under CST L2 or L3 — i.e., is full in-KSA dedicated deployment with Saudi-national operation mandatory?
2. Is Arabic UI + Arabic contract/SLA a scored requirement?
3. Etimad tender vs direct purchase (<SAR 1M exemption) — which path, and what timeline?
4. Multi-year with escalation acceptable? Annual-upfront or milestone disbursement?

---

# Deliverable 15 — Final recommendation

1. **Pricing architecture:** **Hybrid platform subscription** — base platform fee + **active-(transacting-)partner bands** + modules + stackable **compliance ladder**, unlimited internal seats, packaged Good-Better-Best (Operations → Control → Orchestration → Ecosystem Enterprise), with a **flat per-payout rail fee** added in Settle and a **capped, Ju'ala-structured bps on revenue-under-management + data licensing** added only at Orchestrate scale.
2. **Recommended starting prices [Reven-recommended / validate]:** SME $6–12K (SAR 22–45K) · SMB $18–40K (SAR 67–150K) · Mid-market $50–120K (SAR 188–450K) · Large enterprise $150–500K+ (SAR 560K–1.9M+) · Semi-gov $160–650K+ (SAR 600K–2.5M+). High-touch floor **~$25–30K**.
3. **Public vs custom:** **publish** SME; **"starting from"** SMB; **sales-assisted** mid-market; **custom-quote** semi-gov and large enterprise.
4. **Primary value metric:** **trusted partner-attributed revenue realized** (the North Star).
5. **Primary pricing metric:** **active (transacting) partners, banded × capability tier** (unlimited internal seats).
6. **Primary expansion metric:** active partners → modules → compliance tier → entities/countries → payout/revenue-event volume → (late, capped) bps on revenue-under-management + data licensing.
7. **Implementation model:** **fixed-fee + milestone-based, fenced**; templated/waivable for SME; mandatory and 15–30% of ACV (mid-market) rising to 0.5–1.0×+ (enterprise/gov); driven down over time via productization + SI partners; services <20% of revenue.
8. **Discount guardrails:** max discount **≤25%** by default (≤15% SMB, up to ~30% strategic enterprise with give-gets); every discount tied to a *commitment* (term/volume/prepay) and ideally a case-study/reference/expansion right; **minimum gross margin ≥70% blended**; annual-prepay default; auto-renew with max(CPI, 3–5%) uplift; approval ladder (AE ≤10%, leadership ≤25%, exec >25%).
9. **Pilot structure:** **paid, ≤45 days, CFO-co-sponsored, binary success criteria, creditable to Y1, ≤3 concurrent** — fee $5–15K (SMB/MM), higher and scoped for semi-gov/enterprise; converts on a pre-committed budget line.
10. **Assumptions to validate before launch (the load-bearing five):** (a) the **"active = transacted" partner definition** doesn't under-monetize high-value-per-partner accounts; (b) buyers pay a real **≥$25–30K** for finance-grade attribution over cheaper PRM; (c) the **compliance/residency premium** commands the assumed uplift before it commoditizes; (d) **implementation hours/logo** stay low enough to hold services <20%; (e) the **semi-gov tier's deployment/residency cost-to-serve** leaves ≥70% GM at the quoted license.

---

# Strategic questions — explicit answers

1. **Price by users, partners, claims, revenue events, modules, or scope?** → Primarily **active (transacting) partners**, evolving to add **modules + per-payout + (late, capped) revenue-under-management**, with **enterprise scope (entities/countries)** for top tiers. Not users; not claims.
2. **Which metric best increases with value?** → **Partner-attributed revenue** (value metric), proxied operationally by active partners → payouts → revenue-under-management.
3. **Least likely to discourage adoption?** → **Active partners + unlimited seats + flat per-payout.** (Per-seat and per-claim discourage the usage that builds the moat.)
4. **External partner users free?** → **Yes, always** (single-sided; company pays). Partner-side monetized only late via the network.
5. **Internal users unlimited for enterprise?** → **Yes — at every tier.** Unlimited seats is a feature of the wedge.
6. **Active partners individually or in bands?** → **Bands**, billed on a trailing average — defuses "tax on success" and forecast noise.
7. **Claim volume — allowance or charged?** → **Generous allowance**, never a primary meter (metering claims suppresses capture); overage only at high volume.
8. **% of partner-attributed revenue?** → **No as headline.** Only a **late, capped, Ju'ala-structured** bps on willing accounts; the value-justified capture is **sub-30 bps**.
9. **% of partner payouts?** → **Prefer a flat per-payout rail fee**; a **capped** % only late — never uncapped (the most-resented model).
10. **Capture value without taxing growth?** → Expand via **bands + modules + compliance + entities + per-payout volume + data licensing** (value scales through NRR), and keep any % **capped/declining and invisible** relative to the partner's money.
11. **Minimum ACV by segment?** → SME **$6K** · SMB **$18K** · Mid **$50K** · Semi-gov **~$160K (SAR 600K)** · Large ent **$150K**; high-touch floor **~$25–30K**.
12. **Which segment gets public pricing?** → **SME (published)** and **SMB ("starting from")**.
13. **Which segment custom pricing?** → **Semi-government and large enterprise** (mid-market sales-assisted).
14. **Is an SME tier valuable or distracting?** → **Potentially distracting** — offer only as a **low-touch/self-serve land-wedge** into accounts underwritten to expand; never a high-touch motion on a sub-$25K deal. **Minimum complexity for Reven to be justified:** a partner program with *material* partner-attributed revenue **and** real claim/attribution ambiguity **and** finance involvement in payouts — not merely "an SME with partners."
15. **Reflect integration complexity?** → **Per-connector add-on + implementation tier**, metered *lightly* to encourage depth (integration depth is a switching-cost moat).
16. **Semi-gov vs private-enterprise pricing?** → **Committed annual/multi-year license (usage minimized)**; **in-KSA residency + Arabic + Etimad/RHQ + accreditation as line items**; SAR, upfront, escalation; SI-delivered; **higher TCV but disciplined headline discount**.
17. **Dedicated deployment a recurring premium?** → **Yes — recurring +15–30%** (sovereign-cloud-anchored), because it carries ongoing infra/ops cost.
18. **Arabic localization & local support packaging?** → **Paid localization/PS packages + bundled into Gov/Ent tiers + delivered via local SI**; effectively **mandatory for gov**, not free goodwill.
19. **Implementation mandatory?** → **Yes for mid-market+**; templated/waivable for SME on annual prepay.
20. **Onboarding fees waived for larger commitments?** → **Waive/credit templated SME implementation on annual prepay**; for enterprise, **credit a portion against multi-year** but never fully waive (it filters and sticks).
21. **Avoid becoming services-heavy?** → **Fence services <20% of revenue (board metric)**, productize onboarding, push to SI partners, price services contribution-positive.
22. **Capabilities in platform vs add-on?** → **Core integrity always included** (claim ledger, attribution-of-record, protection, eligibility, dedup, audit trail); **add-ons:** AI attribution, in-KSA residency, premium API, advanced analytics, managed services. Fence on **scale/compliance/deployment/depth**, never on integrity.
23. **Strongest natural upgrade triggers?** → **Active-partner band crossings; finance becoming the buyer; multi-entity rollout; compliance deadlines; module attach.**
24. **Contractual limits protecting GM?** → Fence implementation/services; **cap AI usage**; **cap & decline bps**; **annual prepay**; **uplift clause**; **minimum ACV**; price residency **above** the infra delta.
25. **Multi-entity & multi-country pricing?** → **Per-entity + per-country recurring** (the Workday/SAP/Oracle per-population precedent); land-and-expand within one logo.
26. **When is unlimited usage offered?** → **Unlimited seats always**; **unlimited partners only** inside a negotiated enterprise/semi-gov license where value is captured via compliance/modules/entities. **Never unlimited on the cost-bearing flow** (payouts/AI).
27. **How are enterprise-wide agreements calculated?** → **Platform base + per-entity + per-country + compliance/residency + security + SLA + implementation**, with volume commitments and multi-year uplift.
28. **How does pricing change from operational software to financial infrastructure?** → **Buyer shifts partnerships → CFO**; **metric evolves** active-partners → +per-payout → +capped bps/RUM; **ACV rises**; **compliance/residency premium** attaches; **narrate on gross profit**.
29. **How much customer value can Reven capture?** → **10–20% of measurable annual value** (≈ **sub-30 bps** of partner-attributed revenue), leaving the customer a **5–10× ROI**.
30. **Strongest NRR structure?** → The **multi-axis hybrid** — active-partner bands + module attach + compliance ladder + per-entity/country + per-payout volume + auto-uplift + (late) data licensing — **assembled incrementally, never launched whole.**

---

# Closing — assumptions, risks, and what must be validated

**The recommendation in one paragraph.** Price Reven as a **hybrid, finance-grade control-layer subscription on active (transacting) partners with unlimited seats**, packaged Good-Better-Best, sold above a **~$25–30K high-touch floor**, with a **stackable GCC compliance/residency premium** that is the wedge incumbents can't retrofit, a **fenced fixed-fee implementation**, **annual-prepay** to beat the GCC cash cycle, and a **flat per-payout rail fee** introduced only once Reven is the settlement system of record. **Refuse the resented percentage-of-payout model early; re-introduce a capped, Sharia-structured bps on revenue-under-management — plus ~100%-GM data licensing — only at scale, and always narrate on gross profit.** Publish SME/SMB anchors; custom-quote semi-government and large enterprise. Govern the whole book toward **≥70% blended gross margin, services <20% of revenue, NRR modelled at 100–105% base / 115%+ bull**, and bias the mix toward mid-market, enterprise, and semi-government.

**The five assumptions that change the plan if wrong:**

| Assumption | Why reasonable | How to test | What changes if wrong |
|---|---|---|---|
| Buyers pay **≥$25–30K** for finance-grade attribution over cheaper PRM | Impartner floors at $25K; finance pain is non-discretionary; ZATCA forcing function | 3–5 paid pilots converting at ≥$25K from an existing budget line | If they won't, Reven is an SMB tool at $6–18K — re-baseline ACV, motion, and the entire venture-scale thesis (red team Bet 11/24) |
| **"Active = transacted"** captures value fairly | Tracks realized value; resists pruning | Model ACV vs partner-attributed revenue across pilot cohort | If a few partners drive huge revenue, **add a revenue-under-management expansion axis sooner** |
| **Compliance/residency premium** holds before commoditizing | ZATCA Wave 24 still a 2026 differentiator; residency is a hard gate | Win-loss on the L2/L3 line item; procurement interviews | If it commoditizes fast, **rebundle into base** and rebuild the moat on trusted-custody + SoR lock-in |
| **Implementation stays <20%** of revenue | Productizable; SI-deliverable | Instrument hours/logo from pilot #1 | If it balloons, the **multiple compresses** — accelerate productization and SI hand-off |
| **Semi-gov deployment** leaves ≥70% GM at the quoted license | Residency premium priced above infra delta | Cost-to-serve model on a real dedicated/in-KSA deployment | If GM <70%, **raise the residency/dedicated premium or the license**, or decline sub-scale gov deals |

**Inherited strategic caveat (from the repo's own red team).** This pricing architecture is sound *as pricing mechanics and financial discipline*. The open question it cannot resolve is **venture-scale framing**: GCC TAM is shallow, the compliance wedge doesn't travel across the world's five incompatible e-invoicing models, and a funded incumbent (AppDirect = PartnerStack + Tackle) has already assembled a converged stack. The honest reading is that the same assets describe an excellent **$20–60M-ARR, capital-efficient, default-alive business with a credible $50–300M strategic exit**, with unicorn outcomes as *optionality funded only if cross-tenant density and observed NRR ≥120% actually appear* — and the pricing should be operated to that reality, not a $1B clock.

> **Disclaimer.** This is a pricing-strategy and market-research design document, not an offer, valuation, financial projection, or tax/Shariah opinion. Every Reven-specific commercial figure is a **benchmarked hypothesis** labelled [Reven-recommended] or [Assumption→validate]. External figures are third-party estimates that vary by source and method and are used directionally; many vendor pages block automated fetch, so list prices were corroborated across ≥2 indexed sources. Tax (VAT/WHT/Zakat), Sharia, PDPL, CST/NCA, and Etimad/procurement specifics require qualified local advisory and a Shariah-board sign-off before being relied upon or marketed.

---

*Sources: this repository's product & strategy corpus (`partner-revenue-os-PDR-v5.md`, `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`, `..._Pricing_Strategy_Red_Team.md`, `GTM_Operating_Manual.md`, `Integration_Layer_and_API_Data_Flows_Manual.md`, `Large_Enterprise_Client_Onboarding_Manual.md`, et al.) as product source of truth; plus 2024–2026 competitor pricing from vendor pages and G2 / Vendr / Capterra / TrustRadius / Spendflo / Hyperstart, and GCC/KSA regulatory & procurement sources (CST CCRF, NCA ECC/CCC, SDAIA PDPL, ZATCA, LCGPA/Etimad, Aramco IKTVA, SAMA, AAOIFI, BCG sovereign-cloud) gathered via adversarial multi-stream web research with verified-vs-estimate tagging.*



