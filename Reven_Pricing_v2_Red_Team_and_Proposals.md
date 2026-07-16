# Reven Pricing v2 — Skeptic's Review of the Rate Card, and What Replaces It

**Status:** adversarial review of `Reven_Pricing_Tiers_and_Rate_Card.md` (v1) plus the stack
beneath it, followed by ten concrete proposals (P1–P10). The v1 card stands until the
pricing council adopts or rejects each proposal; §4 lists the adoption decisions with
owners. Several attacks below target v1's own additions, and are labeled as such — the
review would be worthless if it only re-attacked the older documents.
**Date:** 15 July 2026. **Evidence convention:** [V] verified · [derived] computed from
cited inputs · [A→validate] hypothesis with a test. Prices SAR, ex-VAT.

---

## 0. The verdict

Five findings, ranked by money at stake:

1. **The headline pricing metric under-prices the #1 ICP by roughly 2–5×.** Active-partner
   bands charge for counterparty count, but the beachhead (insurers and aggregators) has
   few counterparties and enormous governed flow. The metric is right for the mid-market
   and wrong for the exact segment the riyal map ranks first. Fix now, not in 2027 (P2).
2. **The sales-assisted book sells tomorrow's product at today's price.** Every 2026
   contract spans the Capture→Settle value discontinuity. Flat annual pricing (and v1's
   founding program as written) hands the settlement value step to the customer for free.
   Ramp contracts with activation-priced modules fix it and create contracted-ARR evidence
   for the Series A (P3).
3. **The SAR 50 Start tier is billing theater.** Its plausible revenue is immaterial
   (~200 accounts ≈ SAR 120K/yr ≈ 0.75 months of burn [derived]), yet it forces card
   billing, dunning, and a support tightrope, and it filters out nothing that a
   partner-count cap wouldn't. The real acquisition asset at the bottom is the free
   partner-side account and the statement artifact itself. Replace Start with a free rung
   and make the first paid price SAR 295 (P1).
4. **v1 re-created the void it claimed to close.** Self-serve tops out at SAR 20.8K; the
   field motion starts at SAR 126K year-one cash. The 21–96K band — where the riyal map
   puts 1,500–3,500 accounts at SAR 30–60K willingness-to-pay [derived] — is served by
   nothing. The red team's own fix said route sub-floor demand to *low-touch*, not to
   nowhere. A digital-sales tier at SAR 36K, gated and comp-fenced, is consistent with
   that fix (P5).
5. **v1's delta 3 over-folded compliance.** Post-Wave-24, *readiness* is table stakes and
   should stay free — but v1 also gave away the customer's commission-specific compliance
   *automation* (self-billed e-invoice emission for payouts, WHT computation and filing
   exports), which is a product module with standalone value, absent from generic ERP
   e-invoicing. Un-fold it as a charged Settle attach (P4).

What survives the pass unchanged: the two-surface publication strategy, unlimited internal
seats, the take-rate refusal, fenced implementation, the ledger-derived billing metric, the
≥SAR 96K floor **for the field motion specifically**, and the phase-gated rollout. The
attacks that follow sharpen the rest.

---

## 1. The attacks

Each: the claim, the mechanism and evidence, the magnitude, and the verdict.

### 1.1 Partner bands price the wrong side of variance (v1 §3 deferred this; wrongly)

Value tracks money-at-stake and dispute intensity, not counterparty count. Two accounts
with 40 active partners: a franchisor settling SAR 15M of royalties, and an insurer
settling SAR 400M of broker commissions under IA conduct rules and IFRS-17. Partner bands
price both into the same neighborhood; the second buyer gets finance-grade custody of a
flow 25× larger for the same fee. The beachhead ICP is precisely the concentrated shape:
the riyal map's rank-1 segment is ~50 logos with a SAR ~3B commission pool [derived], i.e.
tens of millions governed per logo across dozens — not hundreds — of counterparties.

Magnitude: an insurer-shaped account that lands at Growth-top or Enterprise-entry on
partner count (SAR 144–188K) is a SAR 450K-band account on governed flow — a 2.4–3.1×
under-charge, on the segment sales will call first [derived, illustrative; counterparty
counts per insurer unverified — see §7 gap].

v1 acknowledged this attack and deferred the fix to a 2027 overlay pending pilot data.
That was too timid: the mispricing is visible in the map today, and the first 10 logos are
disproportionately the mispriced shape. **Verdict: fix now (P2).**

### 1.2 Flat contracts across the Capture→Settle discontinuity (v1 error, inherited shape)

The product's value roughly steps a class upward when statements, disputes, reconciliation,
and ZATCA-clean payouts ship. A CFO who signs a flat SAR 96K annual in 2026 receives that
step silently; v1's founding program ("list −15% locked 3 years") is ambiguous between a
*discount lock* and a *price freeze*, and read as a freeze it donates the entire Settle
uplift to the first ten logos for three years. Multi-year private deals signed pre-Settle
have the same defect at larger size.

The mechanism that fixes it also strengthens the fundraising story: order forms that
pre-price Settle modules with binary activation criteria convert roadmap risk into
customer-committed, not-yet-billing ARR — evidence no survey can fake. **Verdict: fix now
(P3); founding program restated as discount-lock (P3c).**

### 1.3 The SAR 50 rung fails its own justification (v1 carried it from the stack)

The tier's stated jobs: adoption data, logos, expansion seeding, anchor relatability. Test
each. *Revenue*: immaterial by design. *Filter*: a card payment does filter junk, but a
3-partner cap plus activation gates filters as well without billing infrastructure.
*Expansion*: partner programs do not grow the way seat counts grow; a 5-partner SME
usually stays one (the PLG expansion physics this borrows from — seats growing with
headcount — does not exist here). *Anchor*: Salla and Zid, the two local anchors that
matter most, both lead with **free** plans [V, Deliverable 2.5], so SAR 50 is not even the
local convention at the bottom — free is.

Meanwhile the product's actual bottom-of-funnel engine is structural, and v1 underused it:
**every claim and statement has a counterparty.** Partner-side accounts are already free by
necessity (bilateral reconciliation requires the partner to participate; D15 Q4 commits to
this). Each operator therefore broadcasts branded, finance-relevant artifacts to dozens of
businesses monthly — and some fraction of those partners run partner programs of their own.
That loop, not a SAR 50 checkout, is the acquisition asset. **Verdict: replace Start with
free; instrument the partner→operator loop (P1).**

### 1.4 The 21–96K void contradicts the red team the card cites (v1 error)

The red team's accepted fix reads: "**≥$25–30K high-touch *or* <$25K low-touch — never
mixed**." v1 implemented the floor and the never-mixing but quietly deleted the low-touch
half: nothing purchasable exists between Scale-with-blocks (20.8K) and the field motion
(126K+ year-one cash). The riyal-map tail (1,500–3,500 accounts, WTP SAR 30–60K [derived])
is the largest logo population in the corridor and currently has no SKU and no planned
motion. An inside-sales digital close at 1–2 calls, no implementation, guided setup
productized at a fixed fee, carries CAC an order of magnitude below field CAC [A→validate]
and pays back inside two quarters at SAR 36K. The risk is motion erosion (field reps
dipping down) — a comp-design problem, solvable with zero quota credit. **Verdict: build
the tier, gated (P5).**

### 1.5 Compliance fold: right instinct, one module too far (v1 error)

Post-mandate, charging for *readiness* would read as selling the law — that part of
delta 3 stands. But the customer's own compliance **automation** on commission flows —
emitting their self-billed ZATCA e-invoices per payout, computing WHT at 5/15/20% by
payment type [V], producing filing exports and the IFRS-17 commission subledger view — is
work their ERP's generic e-invoicing does not do (the riyal map's §4 surface E prices this
at SAR 20–80K/entity/yr). v1 folded it invisibly into Growth. That is a SAR 24–48K/yr
recurring attach per KSA logo [A→validate, priced at the low end of surface E given
post-mandate commoditization pressure] deleted from the NRR stack. **Verdict: un-fold the
automation module; keep readiness free (P4).**

### 1.6 Cheap pilots destroy the evidence they exist to produce (inherited from the stack)

A SAR 19K, 45-day pilot is ~SAR 13K/month of commitment — sub-threshold for the CFO
co-sponsorship it demands, and it answers the wrong question ("will you pay 19K for a
trial?") when the load-bearing bet is "will you pay ≥96K from an existing budget line?"
The pilot **is** the willingness-to-pay instrument; its price must be set where the signal
is. **Verdict: pilot fee ≥25% of target Y1 ACV (P7).**

### 1.7 First renewals land in the worst possible month (v1 omission)

Twelve-month 2026 contracts renew in H2 2027 — plausibly *before* Settle GA delivers the
value step, and exactly when the company needs GRR evidence for the Series A. Renewal risk
concentrates at the point of maximum narrative damage. An 18-month standard first term for
2026–early-2027 signings moves the first renewal cohort past the Settle proof and collects
1.5× annual cash upfront (founding Growth deal: ~SAR 174–219K year-one cash ≈ 34–43 days of
modeled burn each [derived]). **Verdict: adopt (P3d).**

### 1.8 Smaller findings, quickly

- **Enterprise's internal points (188/300/450) were invented, not derived** (v1 admitted
  [A→validate]). Replace the three points with a configurator price book (base + band +
  module components) so AEs price consistently and give-gets trade components, not
  percentages (P6).
- **Scale monthly billing fights the local norm.** Its anchor (Salla Pro) is an annual
  price; Rewaa is annual-only and wins SMEs with it [V]. Make Scale annual-only; keep
  monthly at Team. Also: mada recurring-billing reliability for card-on-file SME billing
  is unverified [A→verify with PSP before any monthly SKU ships] (P9).
- **Claims allowances can rot into a stealth meter.** D8 lists claim-volume overage
  blocks; one mid-term overage invoice breaks the no-bill-shock promise procurement was
  sold. Rule: claim allowances true-up at renewal into the band price; never a mid-term
  invoice; self-serve gets soft product limits instead (P9).
- **Semi-gov "from 600K" is probably below loaded cost.** Residency infra, accreditation,
  Etimad process, an SA on the account, milestone cash in arrears, 6–18-month cycles. The
  research already flags the GM risk; the floor should assume the risk is real until the
  loaded model proves otherwise (P8).
- **No pre-authorized competitive play.** If the AppDirect–PartnerStack entity (or a funded
  clone) enters KSA bundling PRM + payouts on override pricing, the panic response will be
  invented in a week. Pre-authorize the correct one: compress entry (e.g., Growth 96→72K
  on a 2-year prepaid ramp), never match with a percentage (P10).

---

## 2. The v2 proposals

### P1 — Replace Start (SAR 50) with Free, and make the partner side the funnel

- **Reven Free** (operator side): ≤3 active partners, 1 program, unlimited seats, full
  ledger integrity, CSV import, community/AI support, no card. "Powered by Reven" on
  partner-facing statements and claim pages. Opens at the same Early-Settle gate as the
  rest of self-serve; no billing build required to launch it.
- **Partner-side accounts stay free forever** (already committed in D15 Q4) and become an
  instrumented channel from the first design partner: every statement recipient is a
  tracked candidate operator.
- First paid rung: **Team, SAR 295/mo** — the first invoice is the qualification filter.
- Kill metrics [A→validate, owner CRO]: partner→operator signup ≥2% within 6 months of
  first statement received; free→paid conversion ≥4%/yr; human-touched support on free
  accounts <0.1 tickets/account/mo (breach → gate signups behind a waitlist; never fix
  free-tier load with a price).
- Anchor-contamination control tightens accordingly: "free" never appears on any
  enterprise-facing surface (the §6 v1 tripwire now also watches this).

### P2 — Dual-axis bands at Enterprise and Ecosystem, effective now

Tier band = **the higher of** the active-partner band and the **governed-revenue band**
(partner-attributed revenue under ledger governance, trailing 12 months — computed by the
product, auditable by the customer, same trust property as the partner metric; assessed at
signing and renewal only, never a monthly float, and still a flat banded fee — no
percentage anywhere).

| Enterprise band | Active partners | OR governed revenue (trailing 12m) | Annual fee |
|---|---|---|---:|
| E1 | ≤125 | ≤ SAR 100M | 188,000 |
| E2 | ≤185 | ≤ SAR 300M | 300,000 |
| E3 | ≤250 | ≤ SAR 600M | 450,000 |
| Above either axis | → Ecosystem (custom) | | |

All figures [A→validate]. Growth and self-serve keep single-axis partner bands: at those
sizes partner count and value still correlate, and a second axis would add procurement
friction where simplicity is the selling point. Sales narrative for the second axis: "we
size on what the platform governs, the way an ERP sizes on your revenue" — a familiar,
non-take-rate convention.

### P3 — Ramp + activation contracts as the standard sales-assisted shape

a. **Order forms pre-price the Settle modules** with binary activation criteria: statements
   + disputes (+SAR 30K/yr), revenue-event matching (+24K), commission-compliance
   automation (+24–48K, KSA) [all A→validate]. Billing starts only on GA **plus** written
   acceptance (e.g., "two consecutive monthly statement cycles accepted by finance") — no
   shelfware billing, no renegotiation at the value step.
b. **Multi-year private deals longer than 2 years are banned pre-Settle-GA** unless fully
   ramp-priced (per-year steps written in).
c. **Founding program restated as a discount lock, not a price freeze:** −15% on every
   component the customer activates, for 3 years; cap 10 logos; reference + case study +
   roadmap council unchanged. The 2026 base price is not frozen through the Settle step.
d. **Standard first term 18 months** for contracts signed before Settle GA (1.5× annual
   prepaid), moving the first renewal cohort past the settlement proof.

Consequence worth naming for the raise: activation components create
**customer-committed, not-yet-billing ARR** — a contracted expansion backlog that is
stronger Series-A evidence than any NRR benchmark citation.

### P4 — Compliance: readiness free, automation charged

Included in every sales-assisted tier (unchanged): ZATCA/WHT/PDPL *readiness* — capture
fields, evidence structure, platform-side compliance, residency-basic posture.
Charged at Settle as an activation module (P3): **Commission Compliance Automation** —
customer's self-billed e-invoice emission per payout, WHT computation (5/15/20%) and filing
exports, IFRS-17 commission-subledger view. SAR 24–48K/yr per KSA entity [A→validate,
surface-E low end]. L2 residency (+15–30%) and L3 Sharia unchanged.

### P5 — Growth Essentials: the digital tier for the 30–60K tail (gated)

- SAR 36,000/yr, ≤40 active partners, single entity. Statements + disputes + full
  eligibility only — no evidence-pack customization, no CSM, no compliance automation, no
  multi-entity. Guided setup productized at SAR 7,500 fixed. Inside-sales close (≤2 calls)
  or PLG upgrade; zero field-AE quota credit, so the field motion has no reason to touch it.
- **Gates before launch:** Settle GA (statements must be self-configurable) + two quarters
  of self-serve support data at threshold. Target: first cohort H2 2027 [A].
- **Tripwires:** >15% of qualified field pipeline (>40 partners or finance-led) attempting
  to buy down → raise Essentials price or cap partners at 30. Win-rate drop at Growth
  co-incident with Essentials growth → same response. If pilots meanwhile reveal the tail
  paying 30–60K happily, this tier supersedes the v1 "Scale+" idea entirely (one bridge,
  not two).

### P6 — Enterprise prices from a configurator, not three invented points

Internal price book: base platform (SAR 150K) + partner/governed band component + module
components + entity/country components [A→validate each]. The E1–E3 table in P2 remains
the published envelope; the configurator is how AEs assemble and defend it, and discounts
become visible per component (give-gets trade modules and terms, not percentages).
Boundary add-ons purchasable *at Growth* without a tier jump — multi-party attribution
(+24K), program analytics (+18K), API write (+12K) [A→validate] — smooth the 96→188K step
and add expansion surface.

### P7 — Pilot fee ≥25% of target Y1 ACV

Growth pilots ≥ SAR 24K; Enterprise ≥ SAR 47K; Ecosystem scoped ≥ SAR 112K. 100%
creditable against the annual contract if signed within 60 days of pilot end; the credit
then expires. Everything else about the pilot discipline (≤45 days, CFO co-sponsor, binary
criteria, ≤3 concurrent) is unchanged. A pilot the buyer won't fund at a quarter of the
ACV is a disqualification signal, not a discount opportunity.

### P8 — Semi-gov floor: decline below SAR 2.5M TCV over 3 years

Equivalent to ~SAR 850K–1M/yr, pending the COO's loaded cost-to-serve model (residency
infra, accreditation, SA allocation, milestone-cash carry). The published "from 600K"
stays only if that model proves ≥70% GM at 600K — the research's standing rule, now with
the burden of proof reversed: assume sub-scale semi-gov destroys money until shown
otherwise.

### P9 — Subscription mechanics, tightened

- Scale becomes **annual-only** (its anchor is an annual price; Rewaa precedent [V]).
  Team keeps monthly (+20%) and annual. Free has no billing.
- **Claims are never invoiced mid-term at any tier.** Allowances true-up into the band
  price at renewal; self-serve hits soft product limits with an upgrade prompt.
- Verify mada/card recurring-billing reliability with the PSP **before** any monthly SKU
  ships [A→verify]; if recurring rails are fragile, self-serve launches annual-first and
  monthly follows.
- Uplift, prepay, discount ladder, pocket-price governance: unchanged from v1.

### P10 — Pre-authorized competitive response

If a take-rate bundler (AppDirect–PartnerStack or a funded local clone) enters KSA: the
response is **entry compression on term** — Growth at 72K on a 2-year prepaid ramp — plus
the neutrality/conflict story. Never a percentage, never an unbounded discount. Written
down now so the week it happens is execution, not invention.

---

## 3. The v2 tier surface (proposed)

| Rung / tier | Price (SAR, ex-VAT) | Axis | Motion | Status |
|---|---:|---|---|---|
| **Free** | 0 | ≤3 partners | Self-serve | P1 — replaces Start |
| **Team** | 295/mo (annual) · 355 monthly | ≤15 partners | Self-serve | Unchanged |
| **Scale** | 1,150/mo, annual-only | ≤25→40 partners | Self-serve | P9 billing change |
| **Growth Essentials** | 36,000/yr + 7,500 setup | ≤40 partners | Digital / inside sales | P5 — new, gated to H2 2027 |
| **Growth** | 96,000–144,000/yr | 25–75 partners | Field | Floor unchanged; P3 ramp shape; P4 module attach |
| **Enterprise** | 188K / 300K / 450K | max(partners, governed revenue) | Field | P2 dual-axis; P6 configurator |
| **Ecosystem** | custom; semi-gov ≥ ~850K/yr equivalent | negotiated, dual-axis | Field / SI | P8 floor raised |
| Partner-side accounts | 0, always | — | Product-led | P1 — the instrumented funnel |

Revenue consequences worth stating [all derived, illustrative]: P2 alone re-prices the
beachhead-shaped logo from ~SAR 144–188K to ~SAR 450K (2.4–3.1×); P4 restores a
SAR 24–48K/yr attach per KSA logo; P3d pulls ~1.5× year-one cash per founding deal
(~34–43 days of burn each); P1 forgoes ~SAR 0.1–0.2M/yr of micro revenue that was never
load-bearing.

---

## 4. Adoption decisions for the pricing council

| # | Proposal | Decision needed | Owner | When |
|---|---|---|---|---|
| P2 | Dual-axis Enterprise/Ecosystem bands | Adopt before the first insurer/aggregator proposal goes out | CRO propose, CEO approve | Immediately — the next proposal is the exposure |
| P3 | Ramp + activation contracts; founding = discount-lock; 18-month first terms | Adopt as the standard order form | CRO + CEO | Immediately — every signed flat contract is un-fixable later |
| P7 | Pilot ≥25% of target ACV | Adopt | CRO | Immediately |
| P4 | Un-fold compliance automation | Adopt (module priced at Settle) | CRO, COO GM check | With Settle price book |
| P8 | Semi-gov floor | Adopt pending loaded cost model | COO | Before any semi-gov proposal |
| P1 | Free replaces Start | Adopt in principle; launches at the Early-Settle gate anyway | CRO | Decision now, launch unchanged |
| P9 | Billing mechanics | Adopt; PSP verification task opens now | COO | Before self-serve launch |
| P6 | Configurator price book | Build | CRO | Before Enterprise GA |
| P5 | Growth Essentials | Approve as a **gated experiment** only — not a launch commitment | Council | Gate check at Settle GA |
| P10 | Competitive play | Adopt into the do-not-do list | CEO | Now |

If the council adopts P1–P4 and P7–P10, `Reven_Pricing_Tiers_and_Rate_Card.md` gets a v2
revision reflecting them; until then v1 governs and this document is the argument.

---

## 5. What this review could not resolve

- Per-insurer counterparty counts (the exact magnitude of the §1.1 under-charge) —
  closable only in the first two insurer discoveries.
- Whether the partner→operator loop converts at anything like 2% — the number that decides
  how much the free tier is worth; instrumentable from the first design partner's first
  statement cycle.
- mada recurring-billing behavior for SME card-on-file (P9 task).
- KSA HR-SaaS anchors (Jisr, Bayzat) — still missing from the benchmark table; still the
  open check on Team's price point.
- Whether governed-revenue banding survives procurement contact at a semi-government
  entity, where any revenue-linked sizing may read as a percentage in disguise; the first
  Etimad-shaped negotiation answers it.

The order of operations is unchanged by everything above: sign the first ≥SAR 96K paid
pilot against a named budget line. Every proposal here shapes the contract that pilot
converts into — which is exactly why P2, P3, and P7 are the three that cannot wait for
more evidence.
