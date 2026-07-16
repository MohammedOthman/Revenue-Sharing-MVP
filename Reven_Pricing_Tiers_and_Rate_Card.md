# Reven — Pricing Tiers & Rate Card (v1, Operative)

**Status:** operative pricing decision. This document turns the research stack
(`Reven_Pricing_Architecture_Deep_Research.md`, `Reven_Pricing_Executive_Summary.md`,
`Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`, the accepted fixes in
`Partner_Revenue_OS_Pricing_Strategy_Red_Team.md` §5, and the market corridor in
`Saudi_Riyal_Map_Market_Sizing_and_Value_Capture.md`) into one rate card with owners,
thresholds, and validation gates. Where it changes a prior figure, §8 says so and why.
**Date:** 15 July 2026 — two weeks after the ZATCA Wave-24 integration deadline (30 Jun 2026),
which changes the compliance packaging (§2.2, chain 6).
**Owners:** CRO proposes and runs the rate card; COO verifies cost-to-serve and the ≥70%
gross-margin floor; CEO approves list changes, new SKUs, and discounts above 25%.
**Evidence convention** (same as the research docs): **[V]** published/verified ·
**[derived]** computed from cited inputs · **[A→validate]** hypothesis with a named test in §7.
All prices in SAR, excluding 15% VAT. USD at the 3.75 peg for reference only. Not an offer.

---

## 0. The rate card

Two motions that never mix (red team, bet 11): a **self-serve ladder** the buyer can start
without talking to anyone, and a **sales-assisted book** that begins only above the
SAR 96K floor. One pricing metric everywhere: **active (transacting) partners**, banded,
computed from the ledger on a trailing-12-month basis. Internal seats are unlimited at
every tier.

### Self-serve (published prices; card payment; no implementation, no CSM)

| Rung | Who it is for | SAR/mo (billed annually) | Month-to-month | Active partners | What it adds | Local anchor it matches |
|---|---|---:|---:|---|---|---|
| **Start** | A team tracking its first referral or reseller deals in a spreadsheet | **50** (600/yr) | 60 | ≤ 5 | Partner registry, 1 program, claim ledger, attribution-of-record, protection windows, duplicate detection, CSV import, basic reports. 1,500 claims/yr allowance | Below one Zoho CRM seat (~53) and Marn POS (~56) [V] |
| **Team** | A program past its first partners, still run by one owner | **295** (3,540/yr) | 355 | ≤ 15 | + 1 CRM connector, evidence attachments, payout-readiness preview, 2 programs, email support. 3,000 claims/yr | A Foodics POS branch (279–392) or Rewaa (287–495, unlimited users) [V] |
| **Scale** | A real channel, ~15–25 partners, before finance gets involved | **1,150** (13,800/yr) | 1,380 | ≤ 25, expandable to 40 (+5 partners = SAR 95/mo) | + full eligibility preview, conflict management, read-only API, 3 programs, priority support. 6,000 claims/yr | Exactly a Salla/Zid Pro store (13,800/yr) — the ceiling of what KSA SMEs already pay for front-office SaaS [V] |

### Sales-assisted (annual prepay default; fixed-fee implementation quoted separately, never waived into the license)

| Tier | Who it is for | Annual platform fee (SAR) | Active partners | What it adds | Implementation | Visibility |
|---|---|---:|---|---|---|---|
| **Growth** (SMB) | Multi-type channel, manual statements, finance newly involved. Franchisors, F&B franchise groups, smaller RHQ principals | **from 96,000** (≤40) · +24,000 per +20 partners · 144,000 at ≤75 | 25–75, banded | Partner Revenue Control package: statements, disputes, finance evidence pack, full eligibility, revenue-event matching (add-on), conflict management. **ZATCA/WHT/PDPL capture included** (§2.2). Named CSM (pooled). 12,000 claims/yr | 30–75K fixed-fee, mandatory | "Starting from" published |
| **Enterprise** (mid-market) | Material partner-attributed revenue; finance and legal both at the table. Insurers/aggregators, RHQ channel principals | **188,000 / 300,000 / 450,000** at ≤125 / ≤185 / ≤250 partners [A→validate] | 75–250, banded | + Partner Revenue Orchestration package: multi-party attribution, agreement rule engine, reversals and clawback-by-netting, multi-entity (≤3), program analytics, full API, SSO. Dedicated CSM, sandbox. SCIM and L2 residency as add-ons | 15–30% of Y1 ACV | Sales-assisted |
| **Ecosystem** (large enterprise / semi-government) | Multi-entity or multi-country ecosystems; Vision-2030 entities with sovereignty and audit mandates | **custom: private from ~560K, semi-gov from ~600K, observed ceiling 1.9–2.5M+** | Negotiated (unlimited only inside a scoped license) | + SSO/SCIM standard, in-Kingdom residency (L2) standard for semi-gov, dedicated-tenant option, premium SLA, CSM + Solution Architect, premium API. Formula: base + per-entity (30–94K) + per-country (22–75K) + compliance + security + SLA | 0.5–1.0× Y1 ACV; milestone-billed for semi-gov | Custom quoted |

**Money layer (Settle phase, when live):** a **flat fee per executed payout**, launch corridor
SAR 1.5–7.5 [derived: Tipalti $0.40–2, Trolley ~$0.25, × 3.75], priced ≥2× marginal PSP +
clearance cost, capped per account per month. Never a percentage.
**Orchestrate-phase network SKUs** (cross-tenant co-sell, partner P&L, benchmarking data,
capped Ju'ala bps ≤25 bps net on willing accounts) are deliberately **unpriced today**:
no public price exists for a capability that has not shipped.

### The six locked principles

1. **Price on active (transacting) partners**, banded, derived from the ledger — never on
   internal seats (unlimited everywhere) and never on claims (generous allowances only;
   metering claims would suppress the data capture that builds the moat).
2. **Two motions, never mixed.** Self-serve tops out at SAR 20,820/yr (Scale at 40 partners).
   Sales-assisted starts at SAR 96K. Nothing human-sold lives between them.
3. **No percentage of the partner's money** before Orchestrate scale; then only capped,
   declining, Ju'ala-structured, on willing accounts, with subscription still the majority
   of gross profit.
4. **Integrity is never fenced.** Claim ledger, attribution-of-record, protection windows,
   duplicate detection, and the audit trail exist at every price point, including SAR 50.
   Fences are scale, depth, compliance, deployment, and support.
5. **Implementation is always fenced**: fixed-fee, quoted separately, contribution-positive,
   pushed to SI partners over time, and capped below 20% of company revenue (board metric).
6. **Compliance ladder starts at L2.** ZATCA/WHT/PDPL readiness (the old L1) is folded into
   every sales-assisted tier as of this document; residency/dedicated tenancy (+15–30%) and
   Sharia certification remain charged.

### What this card changes vs. the prior pricing docs

| # | Change | Was (exec summary / deep research) | Now | Why |
|---|---|---|---|---|
| 1 | SMB list floor | SAR 67–150K | **SAR 96–144K** | The red team's accepted fix floors the high-touch motion at ~SAR 95–110K; a SAR 67K list price invited exactly the valley-of-death deals the fix forbids. 67–95K deals had sales+implementation cost with sub-floor revenue. |
| 2 | SME shape | One rung (Start ≤10 partners, SAR 50–149/mo), then a cliff to SAR 67K | **Three rungs: 50 / 295 / 1,150**, caps 5/15/25(→40) | SAR 1,788 → 67,000 was a 37× step. Expansion needs stairs: the land-to-expand kill metric is unmeasurable without rungs to expand into, and the riyal map's 1,500–3,500-account tail (WTP SAR 30–60K) had no SKU at all. |
| 3 | L1 compliance | Charged add-on, "expect to rebundle toward table-stakes by 2026" | **Folded into Growth and above** | Wave 24 passed on 30 Jun 2026. Charging for baseline ZATCA readiness after the mandate reads as selling the law. L2/L3 stay premium because residency and fatwa are genuinely differentiated. |
| 4 | Claim allowances | SME 1.5K, SMB 6K | **1.5K / 3K / 6K / 12K by rung** | Monotonic allowances so no upgrade ever shrinks an allowance. Claims remain an allowance, never a meter. |

Everything else — the metric, unlimited seats, the packages (Operations → Control →
Orchestration → Ecosystem Enterprise), the Enterprise and Ecosystem bands, discount
guardrails, the payout rail fee, the take-rate refusal — carries over from the research
stack unchanged.

---

## 1. The self-serve ladder: priced to KSA muscle memory

The brief for this tier family: an SME should adopt Reven the way it adopts a CRM, an HR
tool, or a POS — a small, published, monthly number that needs no committee. The
deep-research benchmark (Deliverable 2.5) shows what that number is in Saudi Arabia: flat
SAR 0–500/mo for the working band, hard ceiling ~SAR 13,800/yr. Every rung sits on a
verified anchor inside that band (table in §0). A merchant already paying Foodics
SAR 295/mo for a branch license recognizes Team without explanation; nobody has to be
taught what SAR 1,150/mo means when Salla Pro costs the same.

One gap in the benchmark: it has no KSA HR-SaaS quotes (Jisr, Bayzat). Collect them during
the §7 SME test; if the HR band undercuts the POS band materially, Team's price point is the
one to re-examine. [A→validate]

### 1.1 Why three rungs instead of one

The prior card had a single SME rung and then nothing until SAR 67K. Three failures follow
from that shape. A 10-partner account that outgrows Start faces a 37× renewal ask, which in
practice means churn or a stalled account: an uplift that far past its anchor re-opens the
purchase decision instead of renewing it [A — practitioner heuristic; no KSA sample behind
the ~3× line]. The strategy's own kill metric for this tier
is land-to-expand, which cannot be instrumented when there is nothing adjacent to expand
into. And the riyal map's tail segment (1,500–3,500 accounts, SAR 30–60K willingness-to-pay
[derived]) had no purchasable SKU: too big for Start, below the sales floor.

Three rungs give the account a staircase (600 → 3,540 → 13,800 → 20,820 with blocks) where
each step is 2.4–5.9×, each is self-serve, and each is triggered by an event the product can
detect and prompt on.

### 1.2 The designed upgrade triggers

- **Start → Team:** the 6th active partner appears in the ledger, or CSV fatigue (the
  product counts manual imports and prompts when a connector would have saved the work).
- **Team → Scale:** the 16th partner, or the first eligibility dispute between partners
  (conflict management lives in Scale), or an API request.
- **Scale → Growth:** the 41st partner (hard cap), or finance asks for statements and a
  dispute workflow — the moment the buyer changes from the partnerships owner to finance,
  which is the single biggest ACV step in the expansion map (Deliverable 12).

Per-partner effective rates rise along the self-serve ladder — Start SAR 120/partner/yr,
Team 236, Scale 552 (431 at the 40-partner block ceiling) — then peak at Growth entry
(2,400) and decline through Enterprise (1,500–1,800) as normal volume economics take over.
The self-serve inversion is deliberate: each rung prices feature depth, not partner
capacity, the same way Salla's Pro rung prices capability. The Growth-entry peak is the
finance-control premium, and §6 watches it in win/loss.

### 1.3 Wedge economics: the tier only works at zero human cost

The exec summary's guardrail stands: at SAR 50/mo, **one human support call erases a year's
revenue**. Consequences, each with an owner and a number [all A→validate, instrumented from
the first beta cohort]:

- **Support:** AI + community + knowledge base only; no CSM, no implementation, no phone
  queue. Tripwire: >0.25 human-touched tickets per account per month across a cohort →
  onboarding is broken; fix activation before spending another riyal on acquisition. (COO)
- **Acquisition:** paid CAC ceiling ~SAR 400 for Start on its own economics (3:1 LTV:CAC at
  a 24-month median life [A]); blended self-serve paid CAC ≤ SAR 1,000 works only if Team and
  Scale are ≥40% of the mix. Below those ceilings the channels are content, accountant and
  bookkeeper referral, and the platform app markets where the anchor tools already live
  (Salla and Zid both run app stores — listing terms unverified [gap]). (CRO)
- **Kill metric:** land-to-expand. Pass = ≥8% of a cohort expands a rung or adds partner
  blocks within 12 months **and** expansion revenue ≥25% of cohort ARR by month 12. Two
  consecutive cohorts below both thresholds → freeze paid acquisition on the ladder, keep it
  organic, and re-examine packaging rather than price. (CRO)
- **Brand fence:** the ladder lives on its own pricing surface, and no public page ever
  shows SAR 50 beside a SAR 600K conversation. Tripwire in §6.

### 1.4 The 25–40 partner overlap is deliberate, and watched

Between 25 and 75 partners, an account could sit in Scale-with-blocks (SAR 14–21K/yr,
zero-touch) or in Growth (SAR 96K+, human motion). The same partner count, up to a 4.6×
price difference. The difference is the price of the Control package: statements,
disputes, the finance evidence pack, a named CSM, and included compliance. An account whose
finance team has not yet felt month-end pain should stay in Scale, cheaply, until the pain
arrives — the product's statement-day friction grows with partner count, so the fence
tightens itself.

Two tripwires. If >20% of Scale accounts sit at the 40-partner block ceiling for two
consecutive quarters with no Growth conversation, the fence is miscalibrated: either add a
statements add-on to Scale (monetize the stuck) or lower the Growth entry band. And if §7's
pilots reveal tail accounts happily paying SAR 30–60K (revealed, not surveyed), open the
gated rung **Scale+** (SAR 2,995/mo, ≤60 partners, still zero-touch) earlier than planned.
Scale+ is explicitly not launched at v1; its gate is a proven support load <0.2
tickets/account/mo, because a fourth rung at today's support automation would import the
cost problem the SAR 50 guardrail exists to prevent.

---

## 2. The sales-assisted book: floor, bands, and what "custom" means

### 2.1 The SAR 96K floor is a capacity allocator, not just a price

The red team's most load-bearing accepted fix: the SAR ~25–95K band is the valley of death
(too big for self-serve, too small to fund field sales at a sales-led CAC of ~SAR 43K
[derived: KeyBanc $11.4K × 3.75]), so the human motion floors at ~SAR 95–110K. This card
sets the floor at **SAR 96,000** and makes it operational:

- No AE or founder time on any opportunity below it; inbound 25–75-partner leads without
  finance pain route to Scale with an automated nurture, not a meeting.
- No implementation is ever sold below it (implementation cost is what makes sub-floor
  deals negative-margin).
- The floor allocates scarce capacity: the funded team has one inside-sales hire plus
  founder selling (finance blueprint, Pillar 3), which supports roughly 3–5 concurrent
  pilots — the same ≤3-concurrent pilot rule the research set. Every sub-floor deal
  displaces a core-ICP pilot slot; that displacement, not the discount, is the real cost.

At list, a Growth deal collects SAR 126–171K in year-one cash (96K prepaid license +
30–75K implementation) against ~SAR 43K benchmark CAC: under six months' cash payback even
at a 25% discount. Tripwire: if measured payback exceeds 18 months once real KSA cycle
times land, the floor moves up before the motion gets cheaper. (CRO, quarterly)

### 2.2 Growth: the Control tier, with compliance now inside

Growth exists for the account whose finance team has entered the room: statements are
manual, disputes live in email, and month-end takes days. The package adds exactly that
(statements, disputes, finance evidence pack, full eligibility, conflict management), plus
a named (pooled) CSM and a mandatory SAR 30–75K fixed-fee implementation.

**Compliance decision, dated.** Wave 24 completed on 30 June 2026: every VAT registrant
above SAR 375K now emits structured, cryptographically stamped invoices [V]. Two pricing
consequences. First, baseline ZATCA/WHT/PDPL readiness stops being a chargeable add-on —
charging for the legal minimum after the mandate lands reads as selling the law, and the
exec summary already predicted this rebundling. It is now included in every sales-assisted
tier (capture today; clearance-model emission lights up with Settle). Second, the premium
window narrows to what incumbents genuinely cannot retrofit quickly: **L2 in-Kingdom
residency / dedicated tenancy (+15–30% of license)** and **L3 Sharia certification**
(Ju'ala/Wakala structure + fatwa, SAR 56–150K setup + premium). Charge those now; assume
the window is 12–24 months and re-underwrite it annually (chain 6).

**Founding-customer bridge.** Until Settle ships, Control's settlement features are
roadmap-committed rather than live. Founding terms therefore exist as a program, not ad-hoc
discounting: list −15%, locked for three years, in exchange for a named reference, a case
study, and a roadmap-council seat; capped at 10 logos. [A→validate] Pilots stay as
specified in the research: paid, SAR 19–56K, ≤45 days, CFO-co-sponsored, binary success
criteria, fee creditable to the year-one contract, ≤3 concurrent.

### 2.3 Enterprise: orchestration depth, and a hard line on "custom"

Enterprise (188–450K, banded) carries the Orchestration package — multi-party attribution,
the agreement rule engine, reversals and clawback-by-netting, multi-entity lite, program
analytics, full API, SSO — because this is where channel complexity (co-sell, multi-touch
conflict, entity structure) actually lives. The ICP is the riyal map's top ranks: insurers
and aggregators first (regulator-manufactured budget: IA conduct rules, the 2% motor-TPL
cap, IFRS-17 subledgers), RHQ channel principals second (WHT + PDPL + ZATCA concentration).

"More customization," in this card, means two different things and only one of them is in
the license:

- **Configuration** — rules, workflows, fields, approval chains, statement formats — is
  product, included in the tier.
- **Custom development** — bespoke reports, one-off integrations, custom governance — is a
  fenced paid service (SAR 30–112K fixed or SAR 560–1,300/hr, from the add-on catalog),
  delivered increasingly by SI partners, and never merged into the core license price.

The line protects both the ≥70% gross-margin floor and the roadmap: a custom feature priced
into a license is a permanent unpaid maintenance obligation.

### 2.4 Ecosystem: the procurement-shaped deal

Large enterprise and semi-government buy a committed platform license assembled from priced
line items (Structure D): base + per-entity (SAR 30–94K) + per-country (SAR 22–75K) +
compliance tier + security + SLA + implementation (0.5–1.0× ACV). Semi-government gets L2
residency as standard, Arabic/RTL, Etimad-aware paperwork, milestone billing (it pays in
arrears — never model semi-gov cash as prepay), multi-year terms with a fixed-percentage
escalation floor, and a Solution Architect beside the CSM. "Unlimited partners" is
negotiable only inside a scoped license where value is captured on entities, countries, and
modules instead — never unlimited on cost-bearing flow (payouts, AI).

The Orchestrate-phase network capabilities (cross-tenant co-sell, partner P&L, benchmark
data) are sold today as architecture readiness and priced only at GA. Publishing prices for
unshipped network features would repeat the exact promise-ahead-of-product pattern the
execution plan killed.

### 2.5 The rail fee: flat, capped, and above marginal cost

When Settle is live and trusted, each executed payout carries a flat fee (corridor
SAR 1.5–7.5 [derived]), set per account at ≥2× the marginal PSP + clearance cost, with a
monthly cap so no CFO ever meets an uncapped line. It is a rail fee for audit-clean,
ZATCA-correct settlement, not a cut of the partner's money — the distinction the finance
buyer cares about and the one that keeps Reven priced as software (chain 10). Reported as
its own revenue line from day one so the gross-margin story never muddies.

---

## 3. Every locked decision against its strongest counter

The 360° check. Each row: the decision, the strongest evidence for it, the strongest case
against it (and what the decision costs), and the tripwire that reopens it. Sources are the
research stack unless noted.

| Decision | Strongest case for (lens) | Strongest case against — the accepted cost | Tripwire that reopens it |
|---|---|---|---|
| Active (transacting) partners as the pricing metric | Category norm the buyer already budgets (competitive); scores highest on the 13-criterion scorecard (D3); expands with the program (NRR) | Under-charges high-value-few-partner accounts — a bank with 12 dealer groups pays Growth-band money for Enterprise-band value (value lens) | Pilots show top-quartile attributed revenue concentrated in <50-partner accounts → add attributed-revenue band overlay to the 2027 book |
| Unlimited internal seats | Adoption density inside the account builds SoR lock-in, the red team's re-based moat (strategy); local winners headline it (Rewaa, Absolute CRM) (competitive) | Forgoes seat revenue at enterprises with hundreds of users (revenue) — accepted; entities/countries/compliance carry that value instead | Enterprise win/loss shows seats were the *buyer's preferred* metric (procurement asks for per-user) in ≥3 consecutive deals |
| Two motions, hard-split at SAR 96K | Valley-of-death CAC math (unit economics); capacity allocation with a 1-AE team (org) | Abandons the SAR 21–96K band to competitors or non-consumption (coverage) — accepted until support automation matures | Revealed WTP at 30–60K in pilots → open gated Scale+ (§1.4) |
| SAR 50 published wedge | Frictionless vs. every local anchor (psychology); data + logos + expansion optionality (strategy); whitespace — no local competitor to price against (competitive) | Anchors the category low and can dilute the finance-grade premium (brand); near-zero margin (cost) | Enterprise win/loss cites the SAR 50 anchor >once/quarter → rebrand or unpublish the ladder; land-to-expand kill metric (§1.3) |
| Refuse % take-rate early | The single most-resented model with the KSA finance buyer; % lives only in the payments layer locally (buyer); Sharia-clean posture (regulatory); protects the software multiple (valuation) | Leaves flow-scaled upside unmonetized for years (venture upside) — accepted; richness (compliance, disputes, data) monetizes instead | Orchestrate density gate passes (shared-counterparty density + observed NRR ≥120%) → introduce capped Ju'ala bps on willing accounts |
| L1 folded in post-Wave-24 | Post-mandate, readiness is table stakes (regulatory); charging for the legal minimum damages the trust story a record-custodian sells (brand) | Gives up SAR 37–112K/yr of add-on revenue per account (revenue) — accepted as the cost of credibility | Enforcement slips or phased waves push the real deadline out ≥12 months → restore L1 as a charged accelerator |
| Implementation fenced, never bundled | GM ≥70% floor and services <20% (finance); SI channel economics (chain 7) | Slower to close deals that want one number (sales friction); smaller services revenue | Services >20% of revenue for two quarters, or SI partners refuse the model |
| Publish SME + "from 96K"; custom above | Low-ACV conversion needs visible prices; hiding everything drives ~30% abandonment (D5 note); procurement above expects custom (buyer) | Competitors see the card (competitive exposure) — accepted; whitespace means there is no local competitor to arm | A funded local copycat prices directly against the published card |
| Annual prepay default | Beats the GCC cash cycle; each Growth prepay ≈ 19 days of runway (cash, chain 1) | Excludes buyers who can only pay quarterly (coverage); semi-gov structurally pays in arrears — carved out via milestone billing | Prepay objection kills ≥2 core-ICP deals in a quarter → CRO may offer quarterly at +5% with COO GM sign-off |
| Claims as allowance, never meter | Metering claims suppresses the capture that feeds the moat (D3: claims score 1 on usage-encouragement) | Heavy-usage accounts consume real infra unpriced (cost) — bounded by generous allowances + overage blocks only at extremes | Infra cost per account >5% of its ARR at p95 |

---

## 4. Second-order chains: what each pricing choice does two steps later

Ordered by materiality; the first three gate survival.

**1 · Price → cash → runway.** The pre-seed model burns SAR 153,309/month from Month 2 and
assumes zero revenue for 12 months [canonical blueprint]. Annual prepay makes the rate card
a runway instrument: one Growth deal at list collects SAR 126–171K in year-one cash ≈ 25–33
days of burn; five founding deals ≈ 4+ months of extension. The CRO's pipeline is therefore
denominated in weeks-of-runway, not just ARR, until the seed round closes. The COO holds the
discipline that pilot revenue is upside, never a reason to relax burn: the model's
zero-revenue assumption is the plan of record.

**2 · Floor → CAC payback → default-alive.** Sales-led CAC benchmarks ~SAR 43K [derived,
KeyBanc]; below the SAR 96K floor a human deal pays back in years (the red team's
cash-incinerator), above it in months. The floor is what keeps the company default-alive to
the next gate without needing the 120% NRR the red team disallowed. Measured payback >18
months → raise the floor or strip motion cost; never solve it with volume.

**3 · Metric → NRR composition → what the model may assume.** The financial model may
assume NRR 100–105% base / 115% bull, nothing more (red team, accepted). The expansion
stack that delivers it, in trigger order: partner-band crossings (automatic), finance-buyer
module attach (the big step), entities/countries, compliance tier, payout volume. GRR floor
target ≥90% [A→validate]. Instrument all five axes from customer one; any bull-case
spending decision requires two quarters of observed axis data, not benchmark citations.

**4 · Ledger-derived metric → billing nobody disputes → trust compounding.** "Active =
transacted in trailing 12 months" is computed from the same append-only ledger the customer
audits. The bill is therefore self-evidencing: procurement can re-derive it. Gaming is
structurally hard — splitting one partner into three fails against cross-tenant identity;
archiving a partner that still transacts fails because status is derived from events, not
flags. Billing mechanics: band set at signing from trailing data, auto step-up after two
consecutive months above band (pro-rated), step-down only at renewal; self-serve rungs
soft-block at cap with an upgrade prompt, never a surprise charge. An invoice the customer
can re-derive from their own ledger data is itself monthly evidence for the
system-of-record claim.

**5 · Published SAR 50 → anchor contamination risk → surface separation.** The wedge and
the SAR 600K conversation must never share a pricing surface: separate pages, no public
comparison table spanning both motions, "Reven Start" branding kept distinct from the
enterprise materials. The tripwire (§3) is measured in win/loss records.

**6 · Wave 24 passed → compliance premium half-life → charge now, re-underwrite annually.**
The mandate universalized structured invoicing on 30 Jun 2026, so the GTM hook flips from
"be ready" to "your commission flows are now machine-verifiable — bind claims to them."
Readiness itself commoditizes (hence delta 3), and global vendors will localize; the
AppDirect–PartnerStack entity's KSA roadmap is unknown [gap — watchlist per the execution
plan]. Underwrite L2/L3 premium revenue for 12–24 months, not the five-year plan; the CEO
re-prices the ladder every January against observed competitor localization.

**7 · Fenced implementation → SI channel → semi-gov reach without payroll.** Because
implementation is priced separately and margin-thin for Reven, handing it to local SIs
costs little and buys a sales channel: SIs source deals to win the services. Threshold:
when >30% of implementations are SI-delivered, stop internal PS hiring entirely; Reven's
services organization should peak at "enablement," never "delivery."

**8 · Two-motion split → hiring order → who not to hire.** The floor decides the org chart
before revenue does: no field AEs until ≥6 quarters of core-ICP pipeline exist above the
floor; solutions engineering before account executives (red team); the self-serve ladder
hires a growth engineer, not a support team. A mixed motion shows up first as a hiring
mistake: field AEs recruited for sub-floor pipeline burn Pillar-3 salary months the 2M SAR
round cannot replace.

**9 · Repricing policy set at deal one → renewal trust → the neutrality moat.** Contracts
carry auto-renew with uplift = max(CPI, 3–5%) from the first signature; self-serve prices
are protected 12 months, then change on 60 days' notice; founding logos hold −15% for three
years. A record-custodian is held to a higher fairness standard than a tool vendor — a
surprise repricing would damage the neutrality story that *is* the positioning, so pricing
behavior is part of the moat itself.

**10 · Revenue mix → the multiple → who buys the story.** Subscription + data must dominate
gross profit; rail fees and services report as separate lines; the % refusal keeps the
company valued on software gross profit (the 6–10× posture) instead of processor economics
(Adyen's blended ~15.5 bps world). This is also the seed narrative: SOM math at the card's
core ACVs (riyal map base case: 50–90 logos × SAR 180–250K blended → SAR 10–20M ARR by Y3)
without assuming a single basis point of flow revenue.

**11 · SAR peg → GCC portability → what does not travel.** The card exports mechanically
(AED and USD are pegged; publish SAR-only until UAE entry), but the L2 premium is
KSA-specific — the UAE has no ZATCA-clearance equivalent — so GCC ACVs land ~10–20% lighter
[A]. Plan GCC expansion on the subscription spine, not the compliance ladder.

**12 · Rake refusal → Sharia posture → beachhead fit.** Refusing a percentage of the
partner's money is also the clean posture with Islamic-finance buyers in the insurance
beachhead; when Orchestrate bps eventually arrive, the Ju'ala fee-for-result structure gets
a fatwa *before* any marketing says "Sharia-compliant." A sequence violation here costs
credibility with the insurance and Islamic-finance buyers the beachhead depends on.

---

## 5. Rollout: pricing follows the product gates

The phase discipline (README) binds pricing: nothing is sold ahead of its gate.

| When | Gate | What goes on sale | Terms |
|---|---|---|---|
| **Now (Q3 2026, Phase 1)** | — | Design-partner pilots only: paid SAR 19–56K, ≤45 days, CFO-co-sponsored, binary criteria, creditable, ≤3 concurrent. "From SAR 96K" soft-published to qualify inbound | Founding program: list −15% locked 3 yrs + reference + case study + roadmap council; cap 10 logos |
| **Phase-1 exit gate** (100+ real claims, 3–5 design partners with finance-accepted evidence packs, weekly active usage, first-claim <14 days) | Exit gate passed | Growth and Enterprise general availability: Capture live + Control roadmap-committed | Annual prepay; implementation mandatory; founding terms still open to the cap |
| **Early Settle** (statements + disputes live) | Support-automation thresholds from §1.3 met in beta | **Self-serve ladder public launch** (Start/Team/Scale). Founding discount closes to new logos | Card payment; monthly or annual |
| **Settle GA** (bilateral reconciliation, idempotent payouts, ZATCA-clean emission) | CFO reference trust ("these numbers reconcile") | Payout rail fee switches on; compliance pack emission live; Ecosystem GA for semi-gov (L2 standard) | Rail fee flat + capped; milestone billing for semi-gov |
| **Orchestrate** | Density gate: shared-counterparty density + observed NRR ≥120% on the eligible cohort | Network SKUs priced at GA; capped Ju'ala bps (≤25 bps net) offered to willing accounts; data licensing | Fatwa precedes any Sharia claim |

Self-serve launching *after* the sales motion is deliberate, and unusual: the funded team
(one support specialist) cannot absorb self-serve ticket load until automation proves out,
and the design partners are worth more as references than a thousand SAR 50 logos are as
revenue.

---

## 6. Governance: who owns which number

- **CRO** owns the rate card, band definitions, and the discount ladder; proposes all
  changes with a written win/loss basis.
- **COO** verifies loaded cost-to-serve and blocks any deal or SKU that breaches the ≥70%
  blended gross-margin floor; owns support-load and services-share (<20%) metrics.
- **CEO** approves list changes, new SKUs, founding-program exceptions, and any discount
  >25%.
- **Approval ladder:** AE ≤10% (Growth only) · CRO ≤25% with a give-get (term, prepay,
  reference, expansion rights) · CEO above 25% or anything structural. Discounts are
  governed on pocket price (net of the 15–30% SI/channel margin), never on list.
- **Pricing council** (CEO, CRO, COO, CTO) meets quarterly. The first-year team has no CFO
  (finance blueprint headcount), so the council explicitly carries the CFO function for
  pricing until that hire exists.

**Standing reprice triggers** (evaluated at each council):

| Signal | Threshold | Action |
|---|---|---|
| Win rate at list, sales-assisted | >55% for 2 consecutive quarters | Raise list 10–15% on the affected tier |
| Median realized discount | >20% | Fix the value story and qualification before touching list |
| Self-serve trial→paid conversion | <8% after onboarding fixes | Packaging review, not a price cut |
| Growth band distribution | >30% of new logos signing at the ≤75 band | Raise the Growth ceiling or open an Enterprise-lite band |
| Scale accounts pinned at 40-partner cap | >20% for 2 quarters, no Growth pipeline | §1.4 remedies |
| CAC payback, sales-assisted | >18 months measured | Raise the floor / cut motion cost |

Grandfathering rules from chain 9 apply to every contract from the first signature.

---

## 7. Validation: revealed evidence only, with pass thresholds and consequences

Surveys and Van Westendorp are hypothesis generators, not validation (red team, accepted).
Only revealed behavior — signed pilots, conversions, expansions, riyal-denominated
objections — moves a price. Owner for the program: CRO; COO audits the GM claims.

| # | Assumption at risk | Test | Pass threshold | If it fails |
|---|---|---|---|---|
| 1 | Buyers pay ≥SAR 96K for finance-grade attribution over cheaper PRM | 3–5 paid pilots (SAR 19–56K) through Q4 2026, each tied to a named existing budget line | ≥60% convert to ≥96K annual within 90 days of pilot end | Re-baseline as an SMB tool: ACV 30–60K, low-touch motion, riyal-map SOM rebuilt; the floor was the load-bearing bet |
| 2 | The budget line exists (not category creation) | In every discovery: "which line item does this come from?" | Existing line named in ≥70% of qualified deals | Pivot pitch to reconciliation/clawback/penalty cost reduction until an existing line appears |
| 3 | "Active = transacted" doesn't under-monetize | Instrument partner-count vs. attributed revenue across all pilots | High-value-few-partner accounts <25% of pipeline | Attributed-revenue band overlay enters the 2027 price book |
| 4 | The SME ladder economics | 50–100-account beta cohort at Early-Settle launch | Activation (first claim ≤14 days) ≥40%; support ≤0.25 tickets/acct/mo; §1.3 land-to-expand thresholds | Kill Start, keep Team/Scale; or postpone self-serve to post-Settle |
| 5 | Team/Scale price points | Sequential-cohort test: cohort B at +20% list, 60-day windows | Conversion delta <25% relative | Take the higher point (headroom is real: local norms supported SAR 99–149 at the bottom rung) |
| 6 | L2 residency premium holds ≥70% GM | Two regulated/semi-gov deals priced at +15–30% with full loaded-cost model | GM ≥70% after residency infra + accreditation cost | Raise the premium or decline sub-scale gov deals (the exec summary's standing rule) |
| 7 | Rail-fee corridor | Settle design partners accept flat SAR X/payout where X ≥2× marginal cost | 2 of 3 accept without discount | Fold payout costs into subscription allowances; revisit at volume |

---

## 8. Concordance with the existing pricing stack

| This card | Exec summary tier | Deep-research source | Status |
|---|---|---|---|
| Start / Team / Scale | Tier 1 · SME (Reven Start) | D5 row 1, D2.5 anchors, D11 SME fence | **Supersedes**: three rungs replace one; caps 5/15/25(→40) replace ≤10 (delta 2) |
| Growth | Tier 2 · SMB (Growth) | D5 row 2, Structure B | **Supersedes** on floor: 96–144K replaces 67–150K (delta 1); L1 folded in (delta 3) |
| Enterprise | Tier 3 · Mid-market | D5 row 3 | Consistent (188–450K); internal band anchors added [A→validate] |
| Ecosystem (semi-gov) | Tier 4 · Semi-government | D5 row 4, Structure D | Consistent |
| Ecosystem (private) | Tier 5 · Large enterprise | D5 row 5, Structure D | Consistent |
| Rail fee | Commercial model §4 | Structure C | Consistent; corridor stated in SAR |
| Compliance ladder | L0–L3 | Structure E | **Supersedes**: ladder now starts at L2 (delta 3) |
| Ju'ala bps, data licensing | "at scale" | Structure F | Consistent: deferred, capped, density-gated, unpriced today |

**Open gaps this document names rather than papers over:** KSA HR-SaaS benchmark quotes
(Jisr, Bayzat) missing from the anchor table; Salla/Zid app-market listing terms unverified;
the AppDirect–PartnerStack KSA localization roadmap unknown (standing watchlist item); the
Enterprise internal band anchors (188/300/450) and every §7 threshold are launch hypotheses,
not observed prices.

The next action is already scheduled in §5: convert the current design-partner
conversations into the first ≥SAR 96K paid pilot against a named budget line. Until one
signs, every number above the self-serve ladder is a well-anchored guess, and §7 row 1 is
the test that turns it into a price.
