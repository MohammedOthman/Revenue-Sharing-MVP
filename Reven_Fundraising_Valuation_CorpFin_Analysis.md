# Reven (Partner Revenue OS) — Fundraising, Valuation & Corporate Finance Analysis
## A Reasoned Narrative from Pre-Seed to Series A

**Document type:** CFO / valuation-engineer analysis — the financing story of this company told forward through three rounds, with the reasoning behind every number.
**Company:** Partner Revenue OS (commercial brand **Reven**) — a claim-centric PRM that earns the right to become the bilateral revenue-sharing system of record, phased as Capture → Settle → Orchestrate.
**Geography:** Saudi Arabia (Riyadh) / GCC. **Currency:** SAR primary; USD reference at the peg USD 1 = SAR 3.75.
**As-of:** 2026-07.

> **Fact hygiene (repo convention).** Facts drawn from this repository's canonical documents are marked **[Confirmed]** — chiefly `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Reven_Pricing_Executive_Summary.md`, `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`, `Partner_Revenue_OS_Venture_Scale_Narrative.md`, and `README.md`. Everything about the seed and Series A is a **forward-looking model** — no such round exists, is priced, or is committed; those figures are labeled **[Assumption]** or **[Derived]** and are benchmarked to GCC/MENA norms, not US ones. Nothing here is an offer, an audit, or a tax/Shariah opinion.

---

## 1. Executive Summary — the story in one page

Reven today is a company with an unusually complete *plan* and deliberately zero *proof*. Four full-time founders covering the entire C-suite (CEO, CTO, CRO, COO), a strategy corpus that most seed-stage companies never produce, a pricing architecture already red-teamed, a sized Saudi market thesis — and, by explicit design, no revenue, no MVP, no customers, and no investors on the cap table. The founders have even stripped invented numbers out of their own documents. That discipline is the company's single most valuable fundraising asset, because it lets us tell the honest version of the story: **this is a validation round company, and the pre-seed's entire job is to convert thesis into evidence.** [Confirmed]

The canonical ask is already set: **SAR 2,000,000 for 10%, implying SAR 20M post-money**, funding a 12-month zero-revenue runway for a team of ten. [Confirmed] The corporate-finance question this document answers is not "what should the pre-seed be" — that decision is made and, as I argue in Section 3, it is defensible. The real questions are downstream: *what obligations does that price create, what must be true at each subsequent gate, and how do the founders arrive at Series A still owning enough of the company to care?*

The short version of the answer: the SAR 20M post-money sits at the very top of what the Saudi pre-seed market pays for a pre-product company. It works only because the dilution is unusually low (10%) and the plan is unusually credible — but it quietly borrows valuation from the seed round. To repay that loan, the seed must print a healthy markup (roughly SAR 40–55M post-money), which in turn requires the company's own Phase-1 gate — 100+ real claims, 3–5 *paying* design partners, weekly usage — to be genuinely hit, not approached. If it is, the natural path is a **SAR 8–10M seed at ~16–18% dilution plus a 10% option pool**, funding the Phase-2 "Settle" build, followed by a **SAR 25–35M Series A at 20–25% dilution** on roughly SAR 4–6M of ARR. Walk that path and the founders reach the far side of Series A holding **about 46% of the company fully diluted**, with a clean 1x-preference stack and a board they still anchor — a control-preserving trajectory that keeps every exit outcome from SAR 100M to SAR 3B+ genuinely attractive for them.

The dangers are equally nameable. The plan's one fragile joint is the **Month-12 cash wall**: the budget leaves a 4.3% buffer and no fundraising-process reserve, so the seed process must start around Month 8, not when the money runs low. The most *likely* failure mode is not catastrophe but mediocrity: a year of partial proof, where the premium pre-seed price turns an objectively decent result into a flat-round signal. And the likeliest diligence killer has nothing to do with numbers at all — it is four equal founders with no vesting schedule anywhere in the record. Each of these has a concrete mitigation, argued below.

---

## 2. Core Assumptions — what we know, what we're assuming, and why

### What the repository establishes as fact [Confirmed]

The financial spine is the pre-seed blueprint: SAR 2M raised for 10%, all of it reconciled to the riyal — roughly 88% to people (SAR 715K founder payroll plus a six-person execution team hired from Month 2), 8% to one-time Saudi legal and setup costs, and a SAR 86,410 emergency buffer. Average burn is about SAR 159,500 a month, and the model deliberately assumes *zero revenue for twelve months*: the round is sized so the company survives on cash alone. The strategy documents define the graduation gates precisely — Phase 1 ends when 100+ real Partner Revenue Claims have been processed for 3–5 design partners whose finance teams have accepted the evidence packs; Phase 2 ends when settlement is idempotent, ERP reconciliation is clean, and a CFO trusts the ledger. The pricing architecture gives us the revenue texture: a self-serve micro-tier from SAR 50/month as a wedge, real deals starting above a ~SAR 95–110K floor, mid-market at SAR 188–450K, semi-government reaching SAR 600K–2.5M, and a hard gross-margin floor of 70%. The market analysis sizes the capturable Saudi software pool at roughly $150–400M with a realistic three-year capture of $5–10M ARR — a credible venture, the analysis itself notes, not a unicorn TAM on its own.

### What this analysis must assume, and the reasoning [Assumption]

Because the repo records no shareholders' agreement, I model the founders at **4 × 25% with no vesting currently in place** — the conservative reading, and one that matters enormously (Section 10). Because Year 1 is zero-revenue by design, the first real commercial numbers appear in the seed year: I assume 3–5 paying customers translate into **SAR 0.6–1.0M of ARR at the time the seed is raised**, blending the pricing tiers (a couple of SMB-tier deals, one mid-market anchor). From there I assume **2.5–3× annual growth in the base case** — the pace regional B2B SaaS needs to earn a Series A, and consistent with (indeed more conservative than) the repo's own three-year SOM. Gross margin starts services-heavy around 62% and climbs toward the 70%+ floor the pricing strategy demands. Post-seed burn steps up to roughly SAR 330–380K/month as headcount roughly doubles, and post-A to about SAR 1M/month.

Each assumption carries a conservative and an aggressive sibling — roughly: slower 2× growth with 62% margins and SAR 2.5M ARR at the A on the low side; SAR 10M+ ARR (the repo's SOM upper path) with 3.5–4× growth on the high side. Where a specific number matters to a conclusion, I show all three cases in place rather than in a separate grid, because the *reasoning* differs by case, not just the arithmetic.

The exit assumption deserves its own sentence: I model a 7–9 year horizon where the modal successful outcome is a **$100–400M strategic or PE sale** (a regional consolidator, a global PRM/ERP acquirer, or sovereign-linked private equity — a Tadawul/Nomu listing is the domestic alternative), with the $1B+ outcome available only if the company wins the *global* co-sell/marketplace expansion rather than just Saudi Arabia. That shape drives the valuation discipline in Section 7.

---

## 3. The Pre-Seed Round — a made decision, and what it obligates

### Why the canonical round is defensible

Start with what the SAR 2M ask actually is: a milestone-sized number, not a vanity number. Twelve months of runway for ten people, every line item reconciled, with the explicit job of clearing the Phase-1 gate. Rounds like this are easy to defend in a term-sheet conversation precisely because the use of funds *is* the milestone plan — burn buys proof, nothing else. [Confirmed]

The valuation is the part that needs an argument. SAR 20M post-money is about $5.3M for a company with no product — the top of the Saudi pre-seed band, which typically runs SAR 8–20M post for pre-product teams. Three things justify holding the top of that band. First, **the team is the asset at this stage**, and this one is complete: four full-time C-level founders is rare anywhere and rarer in the region. Second, **scarcity**: the market analysis found no Saudi-built competitor in this category, and the ZATCA/WHT/PDPL compliance wedge is a story no imported product tells. Third — and this is the subtle one — **the price and the dilution trade against each other**. Regional pre-seeds commonly take 15–20% of the company; this one takes 10%. An investor who accepts the structure is buying less of the company at a higher price, which only makes sense for a thesis-driven fund underwriting the tail outcome. That is not a flaw; it is a *filter*, and Section 7 quantifies it.

But honesty requires stating the cost: **a premium pre-seed price is a loan against the seed round.** The seed must mark up meaningfully from SAR 20M — anything under roughly SAR 27M pre-money reads as a down-markup, and the psychological damage of "they always price ahead of their proof" follows a company for rounds. The whole pre-seed year should be understood as working off that loan.

### Instrument: price it, or cap it at the same number

The blueprint's language ("equity offered") implies a priced round, and that is the right call. Saudi angels and funds are more comfortable with straight equity than with US-style SAFEs; a priced round crystallizes the 10%/20M terms now, creates a clean reference point for the seed, and — critically — forces the corporate housekeeping (shareholders' agreement, founder vesting) to be papered properly, using the legal budget already sitting in Pillar 1. If speed demands a convertible instead, the acceptable version is a single instrument with a **SAR 20M post-money cap, no discount, MFN** — post-money cap language because it fixes dilution at exactly 10% regardless of the seed's size. What must be avoided is *stacking*: multiple SAFEs at drifting caps compound into surprise dilution at conversion, and in Saudi Arabia's small diligence community a messy stack is a known seed-killer. One instrument, one cap, one close. If an investor requires Sharia structuring, Ju'ala/Wakala wrappers are fine so long as the economics are identical and the documentation can convert to standard preferred later.

### Sizing: why SAR 2M is right, and what more or less would actually buy

Consider the lean alternative — say SAR 1.2M, founders plus three hires, eight months of runway. The MVP probably still ships. But the binding constraint on the Phase-1 gate is not code; it is *convincing three to five companies to pay* before the category exists, and that is a months-long, founder-led sales motion. Eight months with seven people gives it perhaps a one-in-three chance, and leaves zero fundraising-process buffer — meaning the seed gets negotiated from visible weakness. In the Gulf, where investors will see the bank balance in diligence and processes run long, short runway translates directly into a 20–30% price haircut. **Runway is negotiating leverage**; the lean round spends it.

Now the aggressive alternative — SAR 3M at, say, SAR 25M post. The extra million buys about four more months. But it does not buy more *proof per month*, and it raises the graduation bar: a SAR 25M post-money pre-product company needs its seed to clear SAR 50–60M post to avoid a flat round, which on SAR 1M of ARR is a multiple only frothy markets pay. Worse, surplus cash invites hiring ahead of proof — and the blueprint's six hires are already an aggressive commitment for a pre-MVP company. Raising more here doesn't reduce risk; it *relocates* risk into the seed negotiation, at worse odds.

So the canonical round stands, with three execution amendments that cost nothing and buy real option value: **(1)** adopt four-year founder vesting with a one-year cliff at the close — Section 10 explains why this single act is worth more than any pricing term in this document; **(2)** hold hires five and six until the first design partner actually signs, which converts roughly SAR 170K of planned payroll into an extra month-plus of fundraising buffer at exactly the moment it's needed; **(3)** begin the seed process at Month 8, treating Months 8–12 as the raise window rather than the last hundred meters of runway.

### Who should write the check

The right investors are Saudi and GCC pre-seed funds and angel networks with Vision-2030 B2B software theses — SVC-backed micro-funds and, ideally, **operator angels who are themselves CFOs or Heads of Partnerships at companies matching the ICP**, because those angels double as design-partner pipeline: their money and their logo can arrive together. The wrong investors are equally identifiable: fintech funds who will push for money movement in Phase 1 (the strategy explicitly forbids it before the Phase-2 gate), and anyone asking for a board seat, participation, or more than a 1x preference at this stage. A pre-seed that arrives with governance strings is mispriced no matter what the valuation says.

---

## 4. The Seed Round — pricing the first evidence

*(Everything in this section is a forward-looking model [Assumption/Derived].)*

### When to raise, and on what proof

The seed should be raised **on the far side of the Phase-1 gate, with the evidence in hand** — not on a forecast of hitting it. Practically that means the process starts around Month 8–9 and closes around Month 11–14, and the data room contains: 100+ real claims processed (500+ is the strong version), three to five design partners *paying real money* under real commercial terms, at least one finance team that has formally accepted an evidence pack, weekly active usage with time-to-first-claim under two weeks, and a researched universe of 50–100 named accounts giving 3× pipeline coverage. Between SAR 400K and SAR 1M of ARR should exist by then — small in absolute terms, enormous in informational terms, because it answers the question every investor will ask: *will anyone pay for a control layer before the category exists?* The single most valuable incremental asset is **one mid-market-tier logo at SAR 188K+**, because it validates the pricing architecture's central bet (that this is a six-figure product, not an SMB tool) in a way no volume of SAR-600 self-serve signups can.

### The structure, and the reasoning behind each term

**Size: SAR 8–10M (~$2.1–2.7M).** The logic is runway-to-milestone, the same discipline as the pre-seed: the seed must fund the Phase-2 "Settle" build (rule engine, append-only ledger, ERP reconciliation — the hardest engineering in the roadmap), a first repeatable sales motion above the SAR 95–110K floor, and still leave a six-month buffer for the Series A process. At a post-seed burn of SAR 330–380K/month with headcount roughly doubling to twenty, SAR 9M is 22–26 months. Less than SAR 7M and the A gets raised from weakness; more than SAR 12M and the company is pre-spending its Series A story.

**Price: SAR 40–50M pre-money (SAR 48–60M post).** Three forces triangulate here. The step-up discipline: 2.2–2.5× over the pre-seed post-money is the healthy signal — large enough to reward the first investor, small enough to be re-earned by the A. The market: Saudi seed rounds for B2B SaaS with first revenue cluster in the SAR 30–75M post range, and scarcity (no local competitor) argues for the upper half. And the forward multiple: on trailing ARR of SAR 1M the price looks absurd (~50×), but seed pricing is forward-looking — at base-case growth it is 10–15× *forward* ARR, which is where the regional market actually clears. The trailing multiple is the number to *defend against*; the forward multiple is the number to *sell*.

**Dilution: 16–18% new money, plus a 10% post-money option pool.** The pool deserves the most negotiating energy of any seed term, because of how the "option pool shuffle" works: the pool is created *pre-money*, meaning existing holders — overwhelmingly the founders — pay for all of it. Every point of pool is worth roughly a point of founder ownership; talking the pool from 12% to 10% is worth about as much to the founders as SAR 5M of headline pre-money. The counter to an oversized pool ask is not resistance but specificity: size the pool to a *named eighteen-month hiring plan*. This company's plan needs perhaps 20–25 competitive grants — rule-engine and ledger engineers who hold global offers, one enterprise AE and a sales engineer for the six-figure motion, a finance-domain product lead, a ZATCA/WHT compliance specialist. That plan justifies 10%, not 12%.

**Governance:** a five-seat board — two founders, one seed lead, two independent or vacant. One investor seat is standard and healthy; two at seed is a mistake that can never be unwound. Preferences: 1x non-participating, broad-based weighted-average anti-dilution, nothing exotic. The lead should be a GCC institutional fund that has actually carried a Saudi company to Series A, because that lead imports the A-round investors, the semi-government procurement introductions, and the term-sheet discipline. Passive money at seed saves perhaps five points of valuation and costs the Series A process three months — a trade with negative expected value.

### The four seeds that could happen, and what each one means

**The weak seed** — say SAR 5M at SAR 25M post — happens if the gate is only partly hit. It is survivable but corrosive: the markup over the pre-seed is negligible, runway is only ~14 months, and Series A investors will read the history as a company that priced ahead of itself. If this is the seed on offer, the right move is to take it *fast* rather than shop for months — in a thin market, a stale process is worse than a modest price.

**The market-standard seed** — SAR 9M at SAR 45M pre / 54M post — is the base case this document builds on: a clean 2.25× step, two years of runway, founders at 66% afterward, and a Series A bar (roughly SAR 90–130M pre on SAR 4–6M ARR) that base-case execution can actually clear.

**The strong seed** — SAR 12M at SAR 72M post — is earned by overshooting the gate (SAR 1.5M+ ARR, a semi-gov LOI). Take it, but understand what it purchases: thirty months of runway *and* a Series A that must clear roughly SAR 144M post. Strong seeds are loans too.

**The overpriced seed** — SAR 15M at SAR 100M post, the round a hot market sometimes offers — is the one to refuse, and the reasoning is worth spelling out because refusing money feels irrational in the moment. At SAR 100M post, the Series A only marks up if ARR reaches SAR 10M+, which forces go-to-market toward the only line item that can grow that fast: semi-government mega-deals — 9-to-18-month sales cycles, paid in arrears. The *valuation* choice degrades the *cash-flow* profile, then the missed A arrives with structure attached (participation, ratchets) that costs more than the extra headline was ever worth. **Price the seed to what the A can beat, not to what the seed market will pay.** This is the single most important pricing sentence in the document.

---

## 5. The Series A — selling trust, not just ARR

*(Forward-looking model [Assumption/Derived].)*

### What "ready" means for this specific company

The regional Series A bar is roughly $1M+ of ARR growing 2.5–3× with sound retention, and Reven should meet it conventionally: **SAR 4–6M ARR, a dozen-plus logos with at least two at mid-market or enterprise tier, net revenue retention above 110%, gross retention above 90%, gross margin at or above the 70% floor, CAC payback under 18 months.** But Reven has a second readiness axis that most SaaS companies lack, and it is worth more than an extra million of ARR: **the Phase-2 settlement gate.** A Series A pitched as "we grew nicely" competes with every SaaS deck in the region. A Series A pitched as *"a real CFO now trusts our ledger as the finance system of record for partner revenue — here is the clean ERP reconciliation cycle and the audit trail their auditors accepted"* is a category-creation story, and category creation is what commands the premium end of the valuation range. The sequencing implication is direct: if at Month 28 the company must choose between one more quarter of ARR growth and closing the settlement proof at a reference customer, it should choose the settlement proof.

### The structure and its logic

**Size: SAR 25–35M (~$6.7–9.3M)** buying 24–30 months at roughly SAR 1M/month of burn. The funds have three jobs, in order: build the settlement layer and the premium attribution hub (the Phase-2/3 engineering), take the compliance wedge to the UAE (whose e-invoicing regime rhymes with ZATCA — the cheapest possible second market), and industrialize the enterprise sales motion beyond founder-led deals.

**Price: SAR 90–130M pre-money (SAR 120–160M post).** On SAR 4.5–6M ARR that is roughly 20–27× — rich against global comps, but the honest regional logic is scarcity: enterprise-grade Saudi SaaS assets with a regulatory moat are rare, Vision-2030-aligned capital is abundant, and multiples clear accordingly. The cross-check is the step-up discipline again: 1.7–2.4× over the base seed post-money, believable on delivered numbers.

**Dilution: 20–25% plus a pool refresh to 12% post-money** — and insist that whatever remains unused of the seed pool rolls forward before any top-up is computed, or the refresh silently double-charges the founders. **Board:** expands to five-to-seven — two founders, seed, A lead, and independents chosen jointly. The line that must hold: founders plus independents at least match investors. Never concede an investor-majority board at A; every hard conversation for the following decade happens in that room.

**Who leads:** a regional growth fund (STV/Sanabil-class) or a global SaaS fund with a MENA mandate. A strategic investor — hyperscaler, ERP vendor, payments company — may join as a minority but must not lead, for a reason specific to this company: the strategy's stated moat includes *neutrality*, the "multi-cloud Switzerland" position that conflicted incumbents cannot occupy. A conflicted name at the top of the cap table taxes that story in every enterprise procurement conversation thereafter.

### Four Series A weathers

An **efficient A** (SAR 25M at ~SAR 125M post, burn multiple under 1.5) is the best risk-adjusted outcome: it preserves the option of reaching default-alive, which is negotiating leverage at the B. A **growth-heavy A** (SAR 40M at SAR 160M post) is the land-grab version — justified only if UAE expansion shows genuine pull, because bigger raises raise the exit hurdle at which founders do well. A **competitive, high-priced A** (SAR 50M at SAR 250M post, 35–45× ARR) is only printable in a hot cycle or on the back of a semi-gov mega-contract; it commits the company to 3.5×+ growth for two consecutive years, and one miss makes the B a down round — the overpriced-seed lesson, one octave higher. And in a **down-market A** (SAR 20M at SAR 80M post), the critical discipline is to *trade price rather than accept structure*: a 1.25–1.5x preference or participation demanded in a weak tape costs founders 15–25% of their proceeds at mid-range exits (Section 13 shows the arithmetic), which is far more than the valuation points it substitutes for. Structure compounds; price clears.

The strategic risk the A creates regardless of scenario: growth-committed burn makes Phase 3's "basis points on settled flow" revenue temptation acute. Moving money before the money-transmitter/PayFac decision is made — a decision the strategy explicitly defers — would put the entire SaaS valuation multiple at regulatory risk. The A-round board should ratify that boundary in writing.

---

## 6. Cap Table Engineering — the arithmetic of the story

Method: fully diluted; option pools created or refreshed *pre-money* (so existing holders bear them); all preferred 1x non-participating; founders start at 4 × 25% [Assumption].

**Base case** — canonical pre-seed (2M @ 20M post), market-standard seed (9M @ 54M post, 10% pool), efficient-to-standard A (30M @ 120M post, 25% + pool to 12%):

| Holder | Start | Post pre-seed | Post seed | Post Series A |
|---|---:|---:|---:|---:|
| Founders (4) | 100.0% | 90.0% | 66.0% | **46.2%** |
| Pre-seed investor | — | 10.0% | 7.3% | 5.1% |
| Seed investors | — | — | 16.7% | 11.7% |
| Series A investors | — | — | — | 25.0% |
| Option pool | — | — | 10.0% | 12.0% |
| Cumulative founder dilution | — | 10% | 34% | **53.8%** |

**Conservative case** — every round priced harder (pre-seed 15% for the 2M; seed 20% at SAR 35M post with a 12% pool; A at 25% with the pool held at ~12%): founders land at **~40%** post-A (85.0% → 57.8% → 40.3%).

**Aggressive case** — proof outruns plan (pre-seed 8% at SAR 25M post; seed 16.7% at SAR 72M post with an 8% pool; A 20% at SAR 200M post, pool to 10%): founders land at **~53%** (92.0% → 69.3% → 53.2%).

The spread of outcomes is the lesson: across *every* modeled path the founders reach the far side of Series A holding **40–53%** — above the ~35% median for A-stage companies. And notice what moves the number most. It is not the headline valuations, which differ by nearly 2× between cases. It is the **pool mechanics and the per-round dilution discipline** — the unglamorous terms. A founder team that wins every valuation negotiation but concedes a 12% pre-money pool at each round ends up *behind* one that takes middling prices with tight pools. Advisors, if used at all, belong inside the pool at 0.25–0.5% each on two-year vests — never as direct equity, which permanently complicates the table for a marginal contribution.

---

## 7. Valuation Methodology — which method earns trust at which stage

Valuation methods are not interchangeable; each is honest at exactly one stage of this company's life.

**At pre-seed, the only honest method is milestone/scorecard-based**, because there is nothing to multiply. What the scorecard rewards here: a complete founding C-suite (the dominant factor at this stage), a fully reconciled plan, a locked regulatory wedge, and documented intellectual honesty. What caps it: zero traction, unbuilt product, an unresolved beachhead debate still visible in the repo. That mix supports **SAR 12M post at the low end, the canonical SAR 20M as the defended base, SAR 25M as the ceiling** — against the comparable-round anchor that Saudi pre-seeds cluster at SAR 8–20M post.

**At seed, the anchor shifts to comparable rounds, disciplined by the VC method.** Saudi B2B SaaS seeds with first revenue cluster around SAR 30–75M post. The VC method is the sanity check on where in that band to sit, and running it honestly reveals something worth pausing on. Take the base exit of roughly SAR 940M (~$250M, Section 13's central case) at year 8. A pre-seed investor's 10% dilutes to about 4% by exit, returning ~19× — *below* the 25–40× a spreadsheet-driven pre-seed fund requires. The canonical price only clears for investors underwriting the $1B+ tail, where the same position returns 75×+. This is not a flaw to hide; it is the quantitative explanation of *who the pre-seed investor must be* — a thesis-driven regional fund, not a portfolio-math fund — and it should shape the outreach list, not just the deck. The seed at SAR 54M post fares better: ~10× at the base exit, 30×+ at the tail — squarely in-band for institutional seed. The A at SAR 120–160M post returns ~6× at the base exit — exactly what growth funds underwrite.

**At Series A, revenue multiples finally become honest** — there is a revenue line with a growth rate and a margin structure attached. The band for a 2.5–3×-growing, 70%+-margin, compliance-moated SaaS asset in a scarce regional market is **15–25× ARR**, yielding the SAR 90–130M pre-money range on SAR 4–6M of ARR, with the top of the band reserved for the settlement-proof story described in Section 5. Discounted-exit and tri-scenario (First Chicago) methods serve as cross-checks from seed onward, never as anchors.

The synthesis across stages: **SAR 20M → ~SAR 50M → ~SAR 140M** post-money, each step roughly 2.2–2.7×, each step purchasable with the evidence the previous round was explicitly sized to produce. Valuation ladders survive when every rung is load-bearing.

---

## 8. Financial Model Overview — the shape of the P&L through the rounds

**Year 1 is the canonical blueprint and needs no modeling:** zero revenue by design, SAR 1.91M deployed, SAR 86K remaining, ten people. [Confirmed] Its financial meaning: the company arrives at the seed gate with essentially no cash — which is precisely why the seed process must start at Month 8 (Section 3) and why pilot *prepayments* matter (the pricing strategy's annual-prepay default is a runway instrument, not just a pricing preference).

**Year 2 (first seed year)** is where revenue begins: base case ~SAR 0.9M recognized on SAR 1.5M exiting ARR, at services-heavy ~62% gross margin, with headcount stepping to ~18 and net burn around SAR 3.7M. The seed's SAR 9M covers this comfortably — the discipline is refusing to let headcount run ahead of the Phase-2 build plan.

**Year 3 (A-raise year)** in the base case: SAR 3.2M recognized on SAR 5M exiting ARR, margin climbing through 70% as implementation productizes, burn ~SAR 3.0M, and the Series A closing mid-to-late year with roughly SAR 2.4M still in the bank — the six-month buffer doing exactly its job. Conservative case exits Year 3 at SAR 2.5M ARR (the A happens later, smaller, at ~SAR 80M post); aggressive case exits at SAR 10M (the repo's SOM upper path made real, and the SAR 200M+ post A becomes available).

**Year 4 (post-A):** headcount toward 45, burn stepping to SAR 0.9–1.1M/month, base ARR to ~SAR 12.5M.

Two dates and one option define the model's risk. **Cash-out without a seed: Month 12–13** — the hardest wall in the plan. **Cash-out without an A: roughly Month 34–36.** And the option: a company that freezes hiring at seed-stage headcount (~22) and focuses purely on Saudi mid-market plausibly reaches **cash-flow break-even around Year 5 at SAR 8–10M ARR**. That profitable-niche fallback is never the plan — but its *existence* is a negotiating asset in every venture conversation, because a company that can decline capital is priced differently from one that cannot. Total capital to the Series B door: roughly **SAR 41M (~$11M)** — capital-efficient by global standards for a system-of-record company, which is itself part of the equity story.

---

## 9. Use of Funds — does each round's money match its job?

**The pre-seed's allocation is confirmed and internally coherent:** ~88% people, ~8% one-time Saudi setup, ~4% buffer. [Confirmed] For a validation round this is *correct* — proof is manufactured out of engineer-hours and founder-hours, and a pre-product company buying ads would be misallocating. Two lines nonetheless deserve pre-emptive defense in investor conversations. Founder payroll at ~36% of the round is at the top of what pre-seed investors accept; the defense is that it is four full-time C-level salaries at below-market Saudi rates — but it should be *made*, not assumed. And the zero-marketing structure means every riyal of pipeline is founder-network — fine for design partners, fragile beyond them, which is one more reason the seed must fund a real sales motion.

**The seed's money (modeled)** splits roughly 40% product/engineering (the rule engine and ledger are the round's core deliverable), 25% sales and marketing (two AEs, a sales engineer, account-based coverage of the 50–100 named accounts), and the balance across compliance depth (ZATCA/PDPL, a SOC2-class audit — which for this buyer is a *sales* investment as much as a security one), operations, and a modest founder-salary normalization that should stay below market until the A.

**The A's money (modeled)** rebalances outward: roughly 30% engineering (settlement layer, attribution hub, multi-entity), 32% go-to-market (enterprise pods, the UAE entity and launch, category marketing), with compliance/certifications, operations, and a 6% contingency making up the rest. The philosophical through-line across all three rounds: **each round funds exactly the proof the next round will price** — the pre-seed buys the claim-ledger evidence, the seed buys finance-grade trust and a repeatable motion, the A buys the second market and the settlement moat.

---

## 10. Second-Order Thinking — where decisions echo

**Today's valuation is tomorrow's obligation.** The mechanism, stated plainly: investors price *trajectory*, so each round's post-money becomes the floor psychology of the next. The canonical SAR 20M borrows from the seed; the overpriced seed borrows from the A; the competitive A borrows from the B. Every borrowing is fine *if the proof arrives on schedule* — the failure mode is not premium pricing itself but premium pricing followed by average execution, which is why Section 11's most probable scenario (partial proof at Month 12) is the one the plan must be built around.

**Dilution affects motivation non-linearly, and a four-way split quadruples the exposure.** Founders below ~30% at the A tend to start optimizing for salary and exit timing rather than terminal value — the well-known incentive cliff. This cap table clears it comfortably (40–53% post-A). But divide by four: each founder holds ~11.5%, which is healthy *only while all four remain genuine contributors*. The catastrophic version is one founder disengaging in Year 2 *without vesting in place*: roughly a quarter of the company becomes dead equity, and every subsequent investor prices the overhang or walks. This is why Section 3 called voluntary vesting at the pre-seed close worth more than any pricing term — it is the cheapest insurance in venture finance, and it can only be bought before it's needed.

**Option-pool sizing is hiring capacity wearing a legal costume.** The Phase-2 build needs engineers who hold offers from global firms; equity is the only instrument that competes. Under-pool at seed (8%) and the shortfall resurfaces at the A as a pre-money top-up — borne by the founders again, but now at higher stakes. The pool argument is never "small vs. large"; it is "sized to a named hiring plan vs. sized to a norm."

**Investor quality compounds; investor convenience doesn't.** The seed lead's real product is the Series A: their introductions, their credibility with growth funds, their procurement door-openers into semi-government. Five points of valuation from a passive investor is a visible gain traded for an invisible, larger loss three years out.

**Over-raising manufactures its own failure.** The subtle chain: an inflated post-money forces a growth plan that can justify it → the only Saudi line item that grows that fast is semi-gov mega-deals → those pay in arrears on long cycles → the *cash conversion* worsens exactly when the *expectations* rise. The valuation decision degrades the working-capital profile — a second-order effect no term sheet mentions.

**Under-raising forces weak negotiation later.** Every GCC investor sees the bank balance in diligence. A seed negotiated with under three months of cash carries a visible 20–30% timing discount. The buffer is not padding; it is price.

**Burn narrows strategy before it empties accounts.** At conservative-case post-A burn (SAR 1.3M/month), the profitable-niche fallback of Section 8 evaporates, and with it the ability to say no. The burn multiple — not the growth rate — is what preserves the right to choose.

**Cycles cut twice here.** Saudi venture capital is counter-cyclically *funded* (sovereign-linked LPs) but globally *priced* — raise into strength. And note the second cycle: semi-government revenue is Vision-2030-budget revenue, which has its own political-fiscal rhythm. A revenue line and a funding source that share a sovereign sponsor is concentration, not diversification.

**Cap-table hygiene is a due-diligence asset.** Stacked instruments, fifteen unrolled angels, direct advisor equity, a single angel above 15% — in a small regional diligence community, each is a known deal-killer. One SPV for angels; everything rolls up at seed.

**Preferences are silent until they are decisive.** The base path stacks SAR 41M of 1x preferences — invisible at a SAR 400M exit, controlling below SAR 100M. Section 13 prices the difference; the rule it produces: *always trade valuation points for structural cleanliness*, because price affects one round and structure affects every exit.

---

## 11. Scenario Matrix — nine ways the next two years go

Probabilities are subjective [Assumption] and sum to 100%.

| # | Path | P | Where it leads | The right move |
|---|---|---:|---|---|
| 1 | Lean raise + strong growth | 4% | Proof strong, cash gone; seed rushed from weakness | Insider bridge at a modest discount, then a full seed |
| 2 | Lean raise + average growth | 5% | Partial proof, empty bank | Cut to ~6 headcount at Month 6 — early, not when forced |
| 3 | Lean raise + weak growth | 3% | Not raisable | Orderly wind-down or acqui-hire; return remaining cash |
| 4 | **Canonical raise + strong growth** | **20%** | Gate hit; seed at SAR 54–72M post; founders ~46–50% at the A | Execute the base plan; start the seed Month 8 |
| 5 | **Canonical raise + average growth** | **30%** | Gate ~70% hit; seed offers at SAR 30–40M post | **Take the modest seed fast.** Do not shop for 54M; extend runway via pilot prepayments |
| 6 | Canonical raise + weak growth | 15% | Month-12 wall, thin proof | Convert 1–2 pilots to multi-year prepay; SAR 0.5–1M insider bridge; re-scope to the PRM-only wedge |
| 7 | Large raise + strong growth | 8% | Buffer + proof; strong seed available | Raise it — but cap the price at ~SAR 72M post regardless of offers (Section 4's lesson) |
| 8 | Large raise + average growth | 10% | Proof lags the SAR 25M post anchor | Spend the buffer reaching *real* proof before raising; a flat round beats a down round |
| 9 | Large raise + weak growth | 5% | Buffer masks failure | Hard pivot decision at Month 9 while cash remains — the buffer is a pivot budget, not life support |

Read the mass, not the cells: **half of all probability sits in rows 4 and 5.** The plan's central risk is not the catastrophic tail (11% across rows 3, 6's worst version, and 9) but the *ordinary middle* — a year of partial proof colliding with a premium entry price. That is why three of this document's recommendations exist specifically for row 5: start the seed early, take the modest markup quickly rather than shopping it stale, and treat annual prepayments as a financing instrument. A company that has pre-decided its row-5 playbook cannot be panicked into bad terms by it.

---

## 12. Investor Terms — what to sign, what to trade, what to walk from

The principle before the list: **price is paid once; structure is paid at every exit.** A founder should always concede valuation before conceding structure, because Section 13 can price what structure costs and it is always more than it looks.

**At pre-seed**, the term sheet should be nearly empty: 1x non-participating preference, information rights, at most an observer seat. A convertible may carry the SAR 20M post-money cap *or* a discount — never both stacked. MFN is harmless with a single instrument. Anything heavier — a board seat, participation, anti-dilution ratchets — signals an investor mispricing the stage, which is itself diligence information.

**At seed**, three terms carry the real money. The **pool shuffle** (argued in Section 4): a 10% pre-money pool costs founders ~4.5 effective points at the base seed — negotiate it against a named hiring plan. **Participation**: a 1x *participating* preference at seed costs the founders roughly SAR 9M at a SAR 200M exit — money paid in precisely the outcomes everyone is working toward; this is the hill to die on. **Anti-dilution**: broad-based weighted average is standard and fair; a full ratchet converts any future stumble into founder wipe-out mechanics — walk away, whatever the valuation. Founder re-vesting asks at seed should cover *remaining unvested* shares only (another reason to have started vesting voluntarily at pre-seed — companies that arrive without vesting get *full* resets imposed). Protective provisions should cover the standard list (new senior securities, sale, debt above ~SAR 2M, budget) and stop there; vetoes over hiring or pricing put the investor inside the operating loop.

**At Series A**, the watch-list shifts to control. Board math: founders plus independents ≥ investors, always. **Super pro-rata** rights — refuse: they let one investor consume the next round's construction. A veto over *next-round pricing* — refuse: it makes the A investor a hostage-taker in every future negotiation. Preference asks above 1x appear in down-market tapes; the exchange rate (Section 5) is to give price instead. The pool refresh must credit unused seed pool before topping up. And uniquely for this company: any strategic investor's rights package must be screened against the *neutrality moat* — information rights that leak competitive data to an ERP or hyperscaler shareholder cost enterprise deals later.

**Sharia structuring** (relevant across all rounds in this market): Ju'ala/Wakala wrappers are acceptable whenever the economics are identical to the standard instrument and the documents can convert cleanly to conventional preferred for global investors at the B — structure for the region, document for the world.

---

## 13. Exit Outcomes — who gets what, and when structure bites

Using the base post-A cap table (founders 46.2%, pool 12.0%, investors 41.8%) and the SAR 41M stack of 1x non-participating preferences [Derived]. The mechanics: at any exit, each investor takes the *greater* of their preference or their pro-rata share. Below roughly **SAR 98M (~$26M)** of exit value, preferences dominate; above it, everyone converts and the split is simple pro-rata.

| Exit value | Founders take | Investors take | Pool takes | What's really happening |
|---|---:|---:|---:|---|
| $25M (SAR 94M) | **$11.2M** | $10.9M | $2.9M | Preferences bind: investors take their SAR 41M back (≈44% of proceeds) and mostly don't profit. Founders still clear ~$2.8M each — *because* the stack is clean 1x |
| $50M (SAR 187M) | **$23.1M** | $20.9M | $6.0M | Everyone converts; preferences become irrelevant |
| $100M (SAR 375M) | **$46.2M** | $41.8M | $12.0M | Pure pro-rata |
| $250M (SAR 937M) | **$115.5M** | $104.5M | $30.0M | The base case: seed returns ~10×, A ~6× — every investor's model clears |
| $500M (SAR 1,875M) | **$231M** | $209M | $60M | — |
| $1B+ (SAR 3,750M) | **$462M** | $418M | $120M | The tail: pre-seed's SAR 2M returns ~95× — the outcome that justified the premium entry price all along |

Three prices fall out of this table. **The price of dilution:** every five points of extra cumulative founder dilution (the conservative case vs. the base case) costs the founders $12.5M at the base exit — which is what the pool negotiations of Sections 4 and 12 are actually worth in dollars. **The price of structure:** re-run the $50M exit with 1x *participating* preferred at seed and A (the terms Section 12 rejects) and founder proceeds fall from $23.1M to roughly $18.6M — a 20% founder tax at exactly the mid-range outcome that is regionally most probable. **The price of clean failure:** even the disappointing $25M exit leaves each founder with life-changing money *only* because nothing above 1x non-participating was ever signed. The exit table is the terms table, settled.

---

## 14. Recommendations — the strategy, assembled

**The path:** close the canonical **SAR 2M pre-seed at SAR 20M post** (priced; SAR 15M post is the floor before restructuring the ask rather than repricing it) → hit the Phase-1 gate with the seed process starting Month 8 → raise **SAR 8–10M at SAR 45M pre with a 10% post-money pool** (accept ≥SAR 35M *fast* in the average-growth world) → pass the Phase-2 settlement gate on the way to SAR 4–6M ARR → raise **SAR 25–35M at SAR 90–130M pre, pool to 12%**. Dilution budget: ~10% / ~26% all-in / ~27% all-in per round; founder floor **≥40% fully diluted after the A**.

**The terms floor, every round:** 1x non-participating; broad-based weighted-average anti-dilution; no participation ever; board control (founders + independents ≥ investors) through the A; pools sized to named hiring plans and rolled forward before refresh.

**The red-flag list — walk away from:** stacked SAFEs; participating preferred; full ratchets; any single angel above 15%; a conflicted strategic as lead; pools above 10% at seed; founder salary increases before the A; venture debt before ~SAR 5M ARR (regional terms at this scale are punitive); and any revenue that involves moving money before the licensing decision is formally made.

**How to maximize valuation without borrowing trouble:** sell *scarcity* (the only Saudi-native, compliance-wedged partner-revenue system of record) rather than projections; time every raise to a gate *just passed*, because evidence in hand always out-prices evidence forecast; chase the mid-market logo before the ARR volume, because one SAR 188K+ deal re-rates the seed more than double the SME revenue; run every round as a real 6–8 week process aimed at two term sheets, since competition is the only price-setting mechanism a thin market has; and keep the burn multiple at or under 1.5 from seed onward, so every subsequent raise is a choice — optionality being the only durable form of negotiating leverage.

---

## 15. Final Verdict

**Is the company financeable?** Yes — at pre-seed, on thesis, now. A complete founding C-suite, a use-of-funds reconciled to the riyal, a regulatory wedge no imported competitor carries, and a demonstrated refusal to fabricate numbers together make this a top-quartile pre-seed *story* — and the honest "validation round" framing is that story's strongest line, not a concession. It is not yet financeable at seed terms, and it should never pretend otherwise; pretending is exactly what the premium pricing cannot afford.

**What must improve before the raise (sixty days):** paper the founder vesting and shareholders' agreement — the current four-equal-founders-no-vesting posture is the likeliest single diligence killer, and it is fixable this week; formally lock the GCC beachhead (the repo still visibly carries two theses, and investors read repos); get one or two paid design partners signed or verbally committed, the cheapest possible defense of the SAR 20M price; and pre-agree the bridge protocol with the lead investor *before* it might be needed, because scenario rows 5–6 are 45% of the probability mass and a pre-negotiated bridge is the difference between a plan and a panic.

**The biggest risks, ranked:** the **Month-12 cash wall** (a 4.3% buffer with no raise-process reserve — mitigated by the Month-8 seed start and prepayment discipline); the **average-growth trap** (the single most probable path, where premium pricing turns a decent year into a flat-round signal — mitigated by taking the modest seed quickly); **paid-pilot conversion** (the entire valuation ladder rests on the behavioral bet that three to five companies will pay before the category exists); **four-founder cap-table integrity** across a seven-to-nine-year journey; and **premature fintech drift** — touching the money before the regulatory decision would gamble the SaaS multiple itself.

**What the founders should do next, in order:** sign the vesting agreements; sign the first paid design partner; close the SAR 2M; hold hires five and six until that first customer signature; build to the gate with the seed process opening at Month 8 — and treat every riyal of burn as the purchase of evidence, because in this plan evidence is the only currency that compounds.

---

*Prepared as a confidential corporate-finance analysis. Facts are cited to canonical repo documents; all round structures beyond the canonical pre-seed ask, all probabilities, and all valuation ranges are labeled assumptions or derivations benchmarked to GCC norms — decision-framing, not an offer, an audit, or a fairness opinion. Supersede only with an explicitly dated revision.*
