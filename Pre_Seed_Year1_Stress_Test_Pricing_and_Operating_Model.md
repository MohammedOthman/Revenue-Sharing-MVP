# Pre-Seed Year-1 Stress Test — Pricing & Operating Model

**Scope:** The first 12 months only (Phase 0 → early Phase 1 "Capture").
**Goal under test:** *Pre-seed survival + paid pilots* — do not run out of cash before
we have proof, and exit Year 1 with the evidence needed to raise a seed round.
**Binding constraint:** *GTM capacity* — founder selling and onboarding time is the
scarce resource that caps how many logos we can land and serve. Everything in this
document is sized against that ceiling, not against market demand.

This is written as **plain rationale**: it walks through the reasoning step by step.
Terminology is defined inline the first time it appears, so the document is readable
without prior finance/GTM vocabulary. Numbers are worked openly so every figure can be
checked.

Sources: `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`,
`Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, `Pre_Seed_12M_Model_Founder_Questionnaire.md`,
`GTM_Operating_Manual.md`, `Internal_Operating_Cadence_Manual.md`,
`Reven_Pricing_Executive_Summary.md`, `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`,
`Partner_Revenue_OS_Pricing_Strategy_Red_Team.md`, `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`.
Currency: SAR, with USD at the pegged rate **USD/SAR ≈ 3.75**.

---

## 0. How to read this — the lenses and the vocabulary

A "stress test" means we deliberately push the plan until something breaks, then ask
whether the break is fatal and how to prevent it. We look through four lenses at once:

1. **Survival lens (cash).** Will the 2M SAR last long enough to reach proof *and* to
   raise the next round? This is pure arithmetic: cash in, cash out, time.
2. **Capacity lens (GTM).** Can a founder-led team actually *land and serve* the pilots
   the plan assumes, given that founders are also building product and raising money?
3. **Pricing lens (monetization).** Is the pilot priced so that it (a) is a real
   commitment, (b) generates a credible willingness-to-pay signal, and (c) sets up the
   annual contract — without being so expensive it kills conversion?
4. **Proof lens (evidence).** Does the year produce the specific, falsifiable evidence a
   seed investor needs, in the right order, before the cash runs out?

**Key terms used throughout** (defined once here, reused below):

- **Burn / gross burn:** total cash spent in a month. **Net burn:** cash spent minus cash
  collected. At pre-seed with near-zero revenue, gross ≈ net.
- **Runway:** months of cash left = cash balance ÷ monthly net burn.
- **Raise-slip:** the gap between when you *plan* to close the next round and when it
  *actually* closes. MENA rounds slip more than US rounds; the model must survive a slip.
- **Design partner / paid pilot:** an early customer who pays (or commercially commits) to
  run the product on real data for a fixed period. "No free pilots" is doctrine here.
- **Locked future price (LFP):** the pilot contract fixes the post-pilot annual price and
  terms *now*. The design partner gets early-adopter certainty; we get a contractual
  conversion path and a real price anchor.
- **ACV (Annual Contract Value):** the annual subscription value of a converted customer.
- **ARR (Annual Recurring Revenue):** the run-rate of recurring contracts. **MRR:** the
  monthly equivalent (ARR ÷ 12).
- **Activation:** the customer actually *using* the product to a defined threshold. Our
  scorecard is 10 milestones × 10 points; **70%+ = "activated."**
- **CAC (Customer Acquisition Cost):** cost to acquire one customer. **CAC payback:**
  months of that customer's gross profit needed to repay the CAC.
- **Gross margin (GM):** revenue minus the direct cost of delivering it (cloud, support,
  implementation labour), as a %. Software wants GM ≥ 70–75%.
- **Burn multiple:** net burn ÷ net new ARR. Lower is better (<1 amazing, 1–1.5 great,
  1.5–2 good, >2 suspect). It answers "how much cash did we burn for each riyal of new
  recurring revenue?"
- **Land-to-expand:** landing a small first deal explicitly to grow it later. The cheap
  entry is a *wedge*, not a destination.

---

## 1. The goal, restated as a falsifiable bar

"Survival + paid pilots" is vague until we make it pass/fail. Pulling the explicit
targets from our own operating docs, **Year 1 succeeds only if all of the following are
true by Month 12:**

| # | Success criterion (from our docs) | Why it is the bar |
|---|---|---|
| S1 | **We never hit the minimum cash floor** — cash stays positive through the seed close, including a realistic raise-slip. | This is literal survival. Everything else is moot if cash hits zero. |
| S2 | **3–5 paid pilots / design partners signed**, with the conversion price and path agreed upfront (locked future price). | The OKR is "close 5 paid pilots or customers" in M1–9. |
| S3 | **3 customers at ≥70% activation**, **100+ real Partner Revenue Claims** processed, weekly active usage. | The Phase-1 exit gate. Proof that the product *works on real data*, not in a demo. |
| S4 | **A finance-accepted evidence pack** exists — at least one customer's finance team accepts our attribution/payout-readiness output. | This is the wedge's whole thesis: finance-grade trust, not another PRM. |
| S5 | **First defensible ACV** known — we can state, with revealed evidence, what a customer pays and why. | Pricing stops being a survey guess and becomes a fact. |
| S6 | **A seed raise is in motion or closed**, with ≥18 months of post-raise runway in sight. | Survival is not "reach M12 alive"; it is "reach M12 *funded*." |

Note what is **not** on the bar: hitting the full GCC seed revenue bar (~$10–30K MRR ≈
SAR 450K–1.35M ARR). That is the *next* milestone. At realistic Year-1 ACVs (SAR 67–150K),
even 2–3 converted logos is ~SAR 134–450K ARR ≈ $3–10K MRR — the *low end* of the seed bar.
**This gap is the first stress finding: Year 1 produces the *evidence to raise seed*, but
will not fully clear the seed revenue bar — so the seed raise has to begin on proof-of-
traction, before the revenue bar is met.** That timing pressure drives everything in §3.

---

## 2. The starting position — the 2M SAR plan exactly as written

Before stress-testing, state the plan honestly. The blueprint sizes a **2,000,000 SAR**
pre-seed (10% equity, 20M post-money) as a **12-month, zero-revenue runway** — i.e. it is
deliberately sized to survive on cash alone, counting no customer money. The cash is
allocated in four pillars:

| Pillar | What | SAR | Share | Timing |
|---|---|---:|---:|---|
| 1 | Official setup & legal (licenses, visas, portals, compliance, office, ZATCA init) | 158,084 | 7.9% | Month 1, one-time |
| 2 | Founders + base cloud (4 founders @ 715K/yr, GOSI 58.5K, cloud 55.8K) | 829,306 | 41.5% | Months 1–12, even |
| 3 | Execution team — 6 hires | 926,200 | 46.3% | **Months 2–12 (all six start M2)** |
| 4 | Emergency cash buffer | 86,410 | 4.3% | Held in bank |
| | **Total** | **2,000,000** | **100%** | |

The six execution hires, all starting Month 2, total **84,200 SAR/month**:

| Role | SAR/mo | Stated mandate |
|---|---:|---|
| Technical Solutions Architect | 19,160 | Lead enterprise deployment architecture |
| Lead Cloud DevOps Engineer | 17,120 | Tenant schema isolation, VPC provisioning |
| Backend Integration Engineer | 15,715 | CRM API sync channels |
| Inside Sales Executive | 13,040 | Accelerate mid-market conversion |
| Customer Success Manager | 11,225 | Onboarding loops, retention |
| Technical Support Specialist | 7,940 | Resolve self-service ticket streams |

**The resulting burn profile:**

- **Month 1:** 227,193 SAR (setup front-loaded) — the peak month.
- **Months 2–12:** 153,309 SAR/month steady state (69,109 founders/cloud + 84,200 team).
- **Average:** ~159,466 SAR/month.
- **Cumulative spend by end M12:** 1,913,590 SAR, leaving the **86,410 buffer** in the bank.

So on paper the round lasts **exactly 12 months** and ends with ~0.56 months of buffer.
That neat fit is the problem the next section attacks.

---

## 3. The structural collisions (the core of the stress test)

Four collisions emerge when the cash plan, the GTM doctrine, the sales cycle, and the
founder time budget are forced to share the same 12 months.

### Collision A — Runway vs. the raise process (the survival squeeze) **[severity: fatal if unaddressed]**

The plan provides ~12.5 months of effective runway (12 months of spend + 0.56 month
buffer). But raising the *next* round is not instantaneous. Our own finance doc states the
rule: **start raising with 9–12 months of runway remaining, because the MENA raise process
takes 6–9 months.**

Run that rule against a 12.5-month runway:

- To start raising with 9 months left, you begin the seed raise at **~Month 3.5**.
- A 6–9 month process closes the seed between **~Month 9.5 and Month 12.5** — i.e. *exactly*
  as the cash runs out, with **zero margin for slip**.
- A normal raise-slip of even 2–3 months pushes the close past zero cash. **The plan has no
  survival buffer against the single most predictable risk it faces.**

And worse — see §1 — you must *start* raising at ~M3.5, but your pilots don't sign until
M5–6 and don't activate until M7–9. **You would be opening the seed raise before you have
the proof that justifies it.** That is the squeeze: the cash clock forces fundraising to
begin ahead of the evidence the raise depends on.

This single collision is the reason the whole Year-1 plan needs reshaping. The fix is in
§6 (extend runway by deferring premature hires) and §4/§12 (compress time-to-proof so the
raise opens on traction, not just narrative).

### Collision B — The hiring plan vs. the GTM-capacity doctrine **[severity: serious; also the survival lever]**

The blueprint hires **all six** execution roles at Month 2 — including an **Inside Sales
Executive** and a **Customer Success Manager** — *before any pilot exists.* The GTM
Operating Manual's hiring gates say the opposite, explicitly:

- *Do not hire an AE/sales rep until* "founder has closed or nearly closed customers,
  pipeline exceeds founder capacity, pricing has been tested, sales process is documented."
- *Do not hire CS until* "implementation becomes a bottleneck… founder/product time is
  being drained."

So the financial plan **hires ahead of proof**, which the operating doctrine forbids. Under
the *GTM-capacity* lens we were told to respect, this is not a nuance — it is the core
tension, and resolving it is also how we buy the runway Collision A lacks. Deferring the
roles that should not be hired yet converts premature payroll directly into survival
months. Quantified in §6; the headline is **~378K SAR freed ≈ ~2.4 extra months of runway**
or a real ~3-month raise-slip buffer.

There is a real counter-argument — a leaner team builds the product more slowly. §4 and §6
show why the Phase-1 scope (read-only claim capture, no settlement) is modest enough that
CTO + 1–2 engineers can deliver it, so the deferral is appropriate rather than reckless.

### Collision C — KSA sales cycle vs. the 12-month window **[severity: serious]**

KSA/GCC enterprise sales cycles run **6–18 months** (procurement, security review,
multi-stakeholder committees). The survival window is ~12 months. If we sell the way the
*tiers* doc describes the Enterprise and Semi-government segments — long, committee-driven,
accreditation-heavy — **no deal closes inside the runway.** The Enterprise/Semi-gov tiers
are structurally incompatible with a Year-1 survival sprint.

The resolution is a deliberate **segment choice for Year 1**: target the sub-population that
can move in 2–4 months — smaller, founder-network-reachable, compliance-*urgent* logos where
a single champion + finance can say yes, sold as a *paid design-partner pilot* (a lighter
instrument than a full procurement). We knowingly leave the big Enterprise/Semi-gov logos
for Year 2+, when there is reference proof and runway to absorb a long cycle.

### Collision D — Founder time fragmentation **[severity: serious]**

There are four founders (CEO, CTO, CRO, COO), but the three things Year 1 needs most —
*build the product*, *sell the pilots*, *raise the seed* — all pull on founder time at the
same moment:

- **CTO** → builds (with the engineers). Not selling.
- **CRO** → the primary seller. ~1.0 FTE of selling.
- **CEO** → category/narrative + *first strategic sales* + *fundraising*. Here is the
  conflict: Collision A forces fundraising to start ~M3.5, exactly when pilots need founder
  selling (M3–8). The CEO cannot fully do both.
- **COO** → ops, hiring, compliance, finance cadence. Supports; does not sell or build.

So effective **founder selling capacity ≈ 1.3–1.5 FTE in M3–6, falling toward ~1.0 FTE in
M7–12** as fundraising consumes the CEO. That number is the real ceiling the funnel in §4
has to live within — not an abstract "the founders will sell."

---

## 4. The GTM capacity engine (the binding constraint, modeled)

This section sizes the constraint we were told is binding. The question: **can ~1.3–1.5
founder selling FTE actually produce 5 paid pilots and serve them to 70% activation inside
the window?**

### 4.1 Selling capacity → funnel, worked backward from 5 pilots

The funnel stages (from the GTM manual) are: Target → Researched → Contacted → Engaged →
Discovery → Qualified → **Diagnostic** → Demo → Business case → Proposal → **Pilot
(paid)**. Working backward from the goal of **5 paid pilots**, with conversion rates set for
a *warm, founder-led, compliance-urgent* motion (not cold volume):

| Stage transition | Assumed conversion | Implied volume needed |
|---|---:|---:|
| Diagnostic → Paid pilot | 25% (warm, urgent, locked-price) | **20 diagnostics** |
| Discovery/Qualified → Diagnostic | ~45% | ~45 qualified discoveries |
| Engaged (meeting) → Discovery | ~80% | ~56 booked meetings |
| Contacted → Engaged | ~25% (warm + intro-led) | ~220 targeted contacts |
| Researched → Contacted | — | from a 50–100 account list, worked in waves |

Now check that against capacity. A founder running complex, multi-session diagnostics
(60–120 min each, 2–3 sessions for bigger accounts, plus prep and follow-up) can sustain
roughly **4–6 diagnostics per selling FTE per month.** At ~1.3 FTE that is **~6–8
diagnostics/month**, and across the active selling window (M3–M8, ramping) realistically
**~24–36 diagnostics.**

**The verdict:** 20 diagnostics to reach 5 pilots is *inside* capacity — but only at the
**high-conversion end**. If diagnostic→pilot conversion falls to 10–15% (a colder, less
urgent list), you need **33–50 diagnostics**, which is *at or beyond* the founder ceiling.
So the plan is feasible **only** if the motion stays warm and concentrated: a tight ICP
list, heavy on Tier-1 founder-network accounts, with compliance urgency (ZATCA/WHT) as the
opener. A broad cold-outbound push cannot work — founder capacity physically cannot run the
volume a low-conversion motion would demand. **This is the central GTM-capacity finding.**

### 4.2 Onboarding / activation capacity (the second ceiling)

Landing a pilot is only half the job — S3 requires **70% activation** and 100+ real claims.
Each pilot's onboarding (data setup, training, first claims, weekly cadence — the 10-item
activation scorecard) is roughly **30–60 hours over 60–90 days**, front-loaded. With pilots
signing M5–6 and running ~90 days, several onboardings **overlap across M5–M9**. Five
overlapping onboardings ≈ **150–300 hours ≈ ~1 dedicated FTE** during that window.

This is exactly the "implementation becomes a bottleneck" condition the CS hiring gate
names. So the model says: **the CSM hire is justified — but at ~M5–6 (when onboarding
actually starts), not at M2.** Hiring CS at M2 pays four months of salary for work that
doesn't exist yet; hiring at M5–6 lands the capacity precisely when the second ceiling
binds. (And the CTO/engineers will still get pulled into pilot data/integration issues — so
*productized onboarding* with standard data templates and strictly read-only scope is a
capacity tactic, not just a quality one.)

### 4.3 What the capacity engine concludes

- 5 pilots is achievable, **but with little slack**, and only on a warm/concentrated motion.
- Founder selling time is the M3–6 ceiling; onboarding time is the M5–9 ceiling.
- The plan should therefore (a) protect founder selling time fiercely in M3–6, (b) defer the
  Inside Sales role entirely in Year 1 (founders sell), and (c) time the CS hire to M5–6.
  All three line up with both the GTM gates *and* the runway fix in §6.

---

## 5. Pilot pricing construct (Phase-0 monetization)

Pricing in Year 1 is not about revenue — it is about manufacturing a **revealed
willingness-to-pay signal** and a **contracted path to the annual deal.** Three design
choices:

### 5.1 The instrument: paid pilot + locked future price (LFP)

A **paid pilot** (never free — free pilots have no signal and no urgency) of **60–90 days**
on real data, priced at **$5–15K (SAR ~19–56K)**, with the post-pilot **annual price and
terms fixed in the same contract (the LFP).** The LFP does three things at once:

1. Gives the design partner certainty and an early-adopter discount (their reason to sign).
2. Gives us a **contracted conversion path** — converting is a pre-agreed trigger, not a new
   negotiation.
3. Produces a **real price anchor** — the number a real buyer signed, which is the only
   credible WTP evidence at pre-seed (stated-preference surveys overstate by 2–3×; this is
   the Red Team's explicit warning, so we anchor on signed paper instead).

### 5.2 Sizing the pilot price: self-funding ROI, not a cost

Frame the pilot fee *below the leakage it recovers.* A partner program running SAR X in
annual payouts typically loses **3–8%** to mis-attribution, duplicates, and manual error.
Even a 90-day pilot surfaces enough recovered/avoided leakage to dwarf a SAR 19–56K fee, so
the pilot is sold as **ROI-positive from day one** — "the pilot pays for itself out of money
you're currently losing." This also pre-validates the eventual pricing logic
(`price < leakage recovered`).

### 5.3 The cash reality: pilots fund *proof*, not *survival*

Be honest about the arithmetic. 5 pilots × SAR 19–56K = **SAR 94–281K** of pilot cash —
against ~1.9M of burn, that is ~5–15% of spend, extending runway by only **~0.6–1.8
months.** Useful, not salvific. **Survival is the raise vs. the burn; pilots buy the
evidence that makes the raise possible** (and a little runway on the side).

The number that *does* matter for the seed story is the **converted ACV**: if 2–3 of 5
pilots convert at the LFP (Growth tier ≈ SAR 67–150K), that is **SAR 134–450K of new ARR** —
the seed-ready traction in S2/S5. So price the pilot for *commitment and conversion*, and
price the *annual LFP* for the tier we actually want them in.

---

## 6. The runway / cash survival model

### 6.1 The plan as written (baseline)

- Effective runway ≈ **12.5 months** (1,913,590 spend + 86,410 buffer at 153,309/mo steady).
- Raise must start ~M3.5; closes ~M9.5–12.5; **zero slip buffer** (Collision A).
- **Verdict: fails S1 under any raise-slip.** Not survivable as written.

### 6.2 The reallocation under GTM-capacity discipline (the fix)

Apply the GTM hiring gates to the Month-2 hiring wave. Keep what *builds the Phase-1 MVP*;
defer what *scales* an unproven motion. An illustrative disciplined sequence:

| Role | As-written | Disciplined timing | Rationale | SAR saved |
|---|---|---|---|---:|
| Backend Integration Eng | M2–12 | **M2–12 (keep)** | Builds the read-only MVP | 0 |
| Technical Solutions Architect | M2–12 | **M6–12** | "Enterprise deployment" is premature pre-pilot | 76,640 |
| Lead Cloud DevOps | M2–12 | **M6–12** | Tenant isolation/VPC premature for 5 read-only pilots | 68,480 |
| Customer Success Manager | M2–12 | **M5–12** | Hire when onboarding bottleneck appears (§4.2) | 33,675 |
| Inside Sales Executive | M2–12 | **Defer to Year 2** | Violates AE gate; founders sell in Year 1 | 143,440 |
| Technical Support Specialist | M2–12 | **M9–12** | No self-service tickets to absorb yet | 55,580 |
| | | | **Total freed** | **~377,815** |

**What ~378K SAR buys:**

- **Option 1 — runway:** 377,815 ÷ 153,309 ≈ **+2.4 months**, taking effective runway from
  ~12.5 to **~14.9 months** — enough to absorb a normal raise-slip and still close.
- **Option 2 — buffer:** convert it to a **~3-month raise-slip buffer** (vs. the 0.56 month
  in the plan), much closer to the doc's own "4 months normal / 6 conservative" policy.

Either way, **the GTM-capacity discipline we were told to respect is *also* the survival
lever.** Not hiring ahead of proof (doctrine) is the same act as extending runway (survival).
This is the single most important output of the stress test.

### 6.3 Runway under the four stress scenarios

Defining each scenario in plain terms, then the survival read:

| Scenario | Definition | Effective runway | Survives to funded seed? |
|---|---|---:|---|
| **Base (as written)** | Plan unchanged, raise starts M3.5, no slip | ~12.5 mo | **Only if zero slip — fragile** |
| **Base + reallocation** | Disciplined hiring (§6.2), founders sell | ~14.9 mo | **Yes, absorbs a ~2–3 mo slip** |
| **Downside** | Pilots slow (3 not 5), raise slips 3 mo, conversion weak | reallocation buys the 3 mo | **Yes if reallocated; No as written** |
| **Survival (founder-only)** | Hiring frozen, founders + 1 engineer only, minimum viable burn | runway extends well past 18 mo | **Yes — but product/proof builds slowly** |
| **Raise-slip stress** | Seed takes 9 mo not 6, opens M5 on first 1–2 pilots | needs ≥14 mo runway → reallocation required | **Yes only with reallocation** |

The pattern is consistent: **as written, the plan dies on any slip; reallocated, it lives
through the realistic ones.** The "survival" scenario (freeze hiring) is the ultimate
backstop but trades cash for slower proof — acceptable as a break-glass, not as plan A.

---

## 7. Unit economics at the pilot stage (define, compute, interpret)

At pre-seed these metrics are mostly **not yet meaningful** — but they must be *instrumented
from day one*, because the seed raise (§1, S5/S6) will be diligenced on the early reads.
Define each, then state what it is at Year 1 and what to watch.

- **CAC (Customer Acquisition Cost):** here, almost entirely *founder time* (cash S&M is
  near zero). The real "cost" is the opportunity cost of founder hours — which is why §4's
  capacity ceiling, not a marketing budget, governs acquisition. **Watch:** founder hours
  per signed pilot; if it climbs, the motion isn't repeatable.
- **Cost-to-serve / implementation cost:** the onboarding labour per pilot (§4.2, ~30–60
  hrs). At Year 1 this is *high relative to pilot fee* — pilots are near-zero or negative
  gross margin, and **that is acceptable**, because the pilot's product is *proof*, not
  profit. **Watch:** hours/pilot trending *down* across the 5 — that downward slope is the
  single best evidence the business can scale.
- **Gross margin:** not a Year-1 KPI on pilots. **But** the eventual SaaS GM must read ≥70%
  for the seed story; so keep implementation *productized and fenced* now so it doesn't
  silently become a services business later (the corpus' "is this even software?" risk).
- **Burn multiple (net burn ÷ net new ARR):** with tiny ARR, this number is *huge and
  noisy* in Year 1 — do not over-read single months. **Watch:** the *trend* once 2–3 logos
  convert; it should start marching toward <2.
- **CAC payback (months of gross profit to repay CAC):** not computable on pilots; becomes
  real only post-conversion. The seed-relevant target is **<18 months** (red-flag above).
- **The one unit-economics fact that *is* load-bearing in Year 1:** the **converted ACV**
  and the **pilot→paid conversion rate.** Those two, revealed from signed paper, are what
  turn "we have users" into "we have a business" for the seed investor.

**Interpretation:** Year-1 unit economics are a *measurement-discipline* exercise, not a
profitability exercise. We instrument everything, accept thin pilot economics, and let the
*slopes* (hours/pilot down, conversion up, ACV firming) tell the seed story.

---

## 8. Scenario analysis in plain narrative

- **Base case (reallocated):** Founders run a warm, concentrated motion on a 50–100 account
  ICP list. ~20 diagnostics over M3–8 yield **5 paid pilots** (M5–6). CSM hired M5; pilots
  onboarded to 70% activation by M8–9; **100+ claims by M9**. 2–3 convert to annual at the
  LFP → **SAR 134–450K ARR.** Seed raise opens M5–6 on the first 1–2 signed pilots, closes
  ~M11–13 with the reallocation runway holding. **All of S1–S6 met.**
- **Bull case:** Compliance urgency (ZATCA Wave-24 deadline ~Jun 2026) and a strong founder
  network push diagnostic→pilot conversion above 30%. 5 pilots by M5, 3–4 convert,
  ARR toward the top of the band, seed opens early on real traction at a better valuation.
- **Bear case:** Motion runs colder than hoped; only 3 pilots sign and slip to M7; one
  converts. The reallocation's +2–3 months is what prevents a cash-out while the seed
  raise (now opened on thinner proof) grinds through a 9-month MENA process. **Survives, but
  raises a smaller/harder seed** — and triggers the break-glass freeze if the raise slips
  again.
- **Catastrophe (and the backstop):** No pilot reaches activation by M9, or the seed market
  is shut. Pull the **survival lever** — freeze all hiring, drop to founders + 1 engineer,
  minimum viable burn — which extends runway past 18 months and buys time to either reach
  proof or bridge. This is why the freeze list (§13) must be pre-wired, not improvised.

---

## 9. Sensitivity — the three levers the whole year pivots on

If you change only one thing, change one of these — they dominate every other input:

1. **Diagnostic→pilot conversion rate.** This is the difference between "20 diagnostics is
   inside founder capacity" and "you need 50 and the founder can't" (§4.1). It is set by ICP
   tightness and compliance urgency, not by working harder. **Highest-impact lever.**
2. **Raise-slip duration.** The plan lives or dies on whether the seed closes before zero
   cash (§3A, §6.3). Every month of slip must be pre-funded by runway. The reallocation (§6.2)
   exists to buy slip-insurance.
3. **Hiring timing (the reallocation itself).** Whether the 6 hires land at M2 or are gated
   to M5–9 swings ~378K SAR ≈ ~2.4 months of life. It is the only large, *fully-controllable*
   lever — the other two are partly market-driven.

A useful way to hold this: levers 1 and 2 are *partly exogenous* (market sets them); lever 3
is *fully in our hands*. So **pull lever 3 hard** (discipline the hiring) to create the
buffer that protects you from adverse moves in levers 1 and 2.

---

## 10. Failure modes and mitigations (the "stress")

Every concrete way Year 1 dies, and the pre-committed countermeasure:

| # | Failure mode | Leading indicator | Mitigation (pre-committed) |
|---|---|---|---|
| F1 | Cash-out before seed closes | Runway < 9 mo with raise not started | Reallocation (§6.2) + start raise on 1–2 pilots, not 5 |
| F2 | Hired ahead of proof; burn too high | 10 heads at M2, no pilots | Gate hires (§6.2); freeze list pre-wired (§13) |
| F3 | Sales cycle longer than window | Diagnostics stall in committee | Year-1 segment = fast, warm, compliance-urgent only (§3C) |
| F4 | Founder selling time eaten by fundraising | Pipeline stalls M4–6 | CRO carries selling; CEO raises; protect CRO's calendar |
| F5 | Pilots sign but never activate | Activation score < 40 by mid-pilot | Productized onboarding; involve economic buyer by mid-pilot; CSM at M5 |
| F6 | Pilots don't convert (no WTP) | LFP not signed at pilot start | LFP mandatory *in the pilot contract*; no LFP, no pilot |
| F7 | Implementation turns custom/services-heavy | Hours/pilot rising, GM sinking | Standard packages; reject low-ACV custom; fence services <20% |
| F8 | Scope creep into Phase-2 (settlement) | Pilot promises payouts/ZATCA clearance | Hard rule: Year-1 pilots are read-only — no payout execution |
| F9 | Concentration fragility (1 logo = most ARR) | One pilot dominates the story | Aim for 3 converts, not 1; treat single-logo proof as fragile |
| F10 | Raise-market freeze | Seed term sheets dry up | Survival lever (§8) + non-dilutive options (TAQADAM/NTDP grants, Kafalah guarantee) |

---

## 11. The proof calendar — validation gates mapped to months

Mapping the finance doc's phase gates and the GTM roadmap onto the same 12 months, so each
month has a falsifiable test ("proof score" = did this gate pass, yes/no):

| Months | Phase | Must produce (the gate) | If it fails |
|---|---|---|---|
| **M1–3** | Foundation | Founder can state: who buys, why, urgent pain, credible price, what blocks purchase. ICP list of 50–100. MVP build underway. | Don't open the raise; fix the ICP/narrative first |
| **M3–4** | Market testing | First qualified diagnostics; repeating pain patterns; first design partners identified | Re-segment; the motion is too cold (lever 1) |
| **M4–6** | Pilot conversion | **≥1–3 paid pilots signed with LFP**; working claim workflow; implementation playbook drafted; **seed raise opens on this proof** | Pull founder time off everything else onto closing |
| **M7–9** | Activation | **3 customers ≥70% activation; 100+ real claims; finance-accepted evidence pack**; pipeline > founder capacity | Trigger CS support; if still failing, freeze hiring |
| **M10–12** | Commercial hardening | Known **ACV, hours/customer, early GM, activation rate, sales cycle, strongest segment**; 1+ reference; **seed closing with ≥18 mo runway ahead** | Pull survival lever; extend on minimum burn |

If the M1–3 gate ("founder can clearly state who buys and why") does not pass, **do not
spend on pilots or hires** — that gate failing is the cheapest possible place to learn the
wedge is wrong.

---

## 12. The recommended Year-1 plan that survives the stress test

Synthesizing all four lenses, the plan that passes S1–S6:

1. **Reshape the hiring wave (the survival act).** Keep the Backend Integration Engineer at
   M2 to build the read-only MVP; **defer** the Solutions Architect and DevOps to ~M6
   (when real deployments and multi-tenancy actually matter), hire the **CSM at ~M5** (the
   onboarding bottleneck), push **Tech Support to ~M9**, and **defer the Inside Sales
   Executive to Year 2** (founders sell). This frees ~378K SAR → ~14.9 months runway / a
   ~3-month raise-slip buffer. *This is the difference between dying on a slip and not.*
2. **Run a warm, concentrated, compliance-urgent motion** on a 50–100 account ICP list,
   heavily Tier-1/founder-network. Protect the CRO's selling calendar; the CEO carries the
   raise. Target **20 quality diagnostics → 5 paid pilots**, accepting that this only works
   at high conversion (lever 1), which the ICP tightness must manufacture.
3. **Make every pilot a paid pilot with a locked future price**, priced SAR 19–56K below the
   leakage it recovers, with the annual LFP set at the Growth tier (SAR 67–150K). Pilots buy
   proof and a price anchor; **2–3 conversions** = the seed-ready ARR.
4. **Hold Phase-1 scope sacred:** read-only claim capture, attribution, protection, payout
   *preview*. No settlement, no payout execution, no ZATCA clearance in Year 1. Scope
   discipline is a capacity and cash control, not just a product one.
5. **Open the seed raise at ~M5–6 on the first 1–2 signed pilots**, not at M3.5 on narrative
   and not at M9 on full proof. The reallocation runway makes this timing survivable.
6. **Pre-wire the break-glass:** a written freeze list (which costs cut, in what order) tied
   to RAG cash triggers (>9 mo green / 6–9 amber / <6 red), so a raise-slip or market freeze
   triggers the survival lever automatically rather than in a panic.

In one line: **respect the GTM-capacity doctrine (don't hire ahead of proof), and the same
discipline that the operating manual demands also buys the runway the finance plan is
missing — turning a plan that dies on any raise-slip into one that survives the realistic
ones, while still producing the 3–5 activated paid pilots the seed raise needs.**

---

## 13. Open decisions / inputs that materially move the model

These are the blanks in the finance questionnaire that the stress test is most sensitive to.
They are the next inputs to lock (in priority order):

1. **Starting cash at M1 / any pre-seed already in the bank** — sets the true runway zero.
2. **Per-founder salary split & any founder salary deferral** — founders deferring even
   part of 715K/yr is another large, controllable runway lever (parallel to §6.2).
3. **Minimum cash floor & buffer policy (3/4/6 months)** — defines what "survive" means
   numerically and when RAG triggers fire.
4. **Pilot price, duration, and target pilot→paid conversion %** — drives §5 and lever 1.
5. **Annual LFP price per tier & target tier mix** — drives the converted ARR (S2/S5).
6. **Sales-cycle length actually observed** & **go-live lag** — validates or breaks
   Collision C in practice.
7. **Billing mix / DSO / annual-prepay %** — even small pilot cash lands faster or slower;
   annual prepay on conversions is a real working-capital lever.
8. **Next-raise trigger month & target seed size/valuation** — closes the loop on §3A.

> This document is a stress test, not a forecast. Every number is either taken from the
> cited repo docs or worked transparently from them so it can be challenged. The figures in
> §6.2 are illustrative of the *mechanism* (gate hires → free cash → buy runway); the exact
> reallocation should be finalized against the locked inputs in §13.
