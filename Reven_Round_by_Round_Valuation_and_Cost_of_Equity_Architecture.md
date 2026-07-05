# Reven / Partner Revenue OS — Round-by-Round Valuation Narrative & Cost-of-Equity Architecture

**Document type:** Valuation engineering & corporate-finance dossier — Pre-Seed → Seed → Series A → Path to Profitability → IPO on Tadawul (TASI).
**Inputs:** the full repository corpus (canonical strategy, PDR, pricing architecture + red team, GTM/CFO/onboarding manuals, `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, Saudi Value-Pool & ICP analysis, product architecture audit) and the *Cost of Equity: 150 Strategic Levers, Layers, and Valuation Engineering Considerations* framework (lever numbers `#1–#150`, layers `A–O` cited throughout).
**Evidence discipline (inherited from the repo):** confirmed repo facts are stated as facts; every market benchmark is directional; every forward number is an **[Assumption]** or an **[Illustrative scenario]** — this document *engineers the valuation architecture*, it does not fabricate traction. FX: USD 1 ≈ SAR 3.75.

> **The one-line thesis of this document.** Reven's valuation at every round is not a number to be negotiated — it is the *price of a specific bundle of un-retired risks*. Each round exists to retire a named subset of the 150 cost-of-equity levers; the valuation step-up between rounds is the market re-pricing the levers that moved from "open scenario" to "evidenced fact." The company that manages its lever-retirement schedule manages its valuation.

---

## 0. The governing principle: allocate every risk exactly once

The Cost of Equity framework's central rule governs everything below:

> *Do not add a premium for a risk that is already embedded in beta, cash-flow forecasts, downside scenarios, or the equity risk premium. A high-quality cost-of-equity model is not the one with the highest discount rate; it is the one that allocates each uncertainty to the correct place in the valuation architecture.* (`#146` double-counting prevention)

Applied to Reven, the framework's allocation table becomes the **round-by-round operating rule**:

| Type of uncertainty | Correct treatment | Where it lives for Reven |
|---|---|---|
| Broad market exposure | Beta × ERP | Only meaningful from late growth / IPO onward |
| Country & currency | Currency-consistent rate + country premium | SAR cash flows, SAR discount rate; KSA country risk in the spine (§2) |
| Contract / execution / regulatory events | **Probability-weighted scenarios** | Phase gates (Capture→Settle→Orchestrate), ZATCA timing, AppDirect shock, money-movement licensing |
| Financing & dilution risk | **Explicit funding-round & dilution model** | §10 dilution arc — never a discount-rate add-on |
| Operating volatility | Forecast cases (margin, working capital) | NRR base/bull cases, GM floor ≥70%, DSO 60–90 |
| Terminal uncertainty | Fade, terminal margin, terminal reinvestment | §8–9 (layer `N`, `#131–140`) |
| Governance & information risk | Specific premium **only if not reflected elsewhere** | Shrinks each round as controls/audits accumulate (layer `H`) |
| Liquidity | Liquidity premium / DLOM / explicit exit assumptions | Private-stage DLOM → free-float & index mechanics at TASI (layer `I`) |

For a **venture-backed company** the framework is explicit: value is **not** produced by jamming a 60–80% discount rate into a DCF. It is produced by modeling *survival probability, fundraising needs, dilution, liquidation preferences, customer concentration, time to breakeven, exit routes, and downside scenarios* explicitly (`#121–130`, `#147`), and discounting the surviving cash flows at a defensible rate. The "cost of equity" quoted at each early round below is therefore an **implied blended IRR** — a diagnostic, not an input.

---

## 1. What is actually being priced: three stacked assets

The canonical phase model (Capture → Settle → Orchestrate) is not just a product roadmap — it is **three financially distinct assets stapled together**, each with its own cash-flow character, risk profile, and correct valuation method (`#111` definition of the equity claim; `#112` project-vs-corporate risk):

| Asset | Phase | Cash-flow character | Valuation regime | Dominant lever layers |
|---|---|---|---|---|
| **A1 — The Capture wedge** | Phase 1 (M0–9) | Subscription SaaS, SAR 95–110K+ ACV floor, GM ≥75%; zero-revenue during pre-seed year | Real option on A2; scenario-weighted milestone value | `M` venture (`#121–130`), `H` key-person, `E` earnings quality (absent → to be created) |
| **A2 — The Settle annuity** | Phase 2 (M9–24) | System-of-record subscription + fenced per-payout fees; NRR gate 110–120%; CFO-budget revenue (downturn-resistant, compliance-anchored) | Growth-SaaS quality-adjusted multiples → early DCF | `E` cash-flow resilience (`#41–50`), `G` moat durability (`#61–70`), `F` reinvestment (`#51–60`) |
| **A3 — The Orchestrate network** | Phase 3 (M24+) | Capped bps on revenue-under-management + data licensing (~100% GM); network economics | Terminal-value driver; optionality until proven | `N` terminal (`#131–140`), `G` network moats, `L`/`#120` exit-route optionality |
| **A3′ — The flow/settlement attach (L3)** | Late Phase 2/3 | Per-payout + FX/WHT handling on a ~SAR 4.5–6B (~$1.2–1.6B) KSA tech payout base [derived, repo] | Payments-multiple revenue — **deliberately capped** so the company stays valued as software | `D`/`K` fintech tail risk (`#105`), `#39` structure |

Two structural consequences drive everything downstream:

1. **The valuation step-change sits at the ledger, not the portal.** The repo's execution plan says it verbatim: *"the valuation step-change is at the ledger + reconciliation, not the portal."* In lever terms: A1 alone is a commoditized-PRM-adjacent tool with a >100×-disputed TAM; A2 is a bilateral settlement **system of record** — the verified white space — which converts revenue recurrence (`#41`) from "subscription renewal" to "rip-out loses your audit history" (`#62` switching costs at their strongest form). Rounds must be *timed to gates*, not to calendar quarters.
2. **Revenue-mix is a multiple decision, not just a pricing decision.** The pricing corpus is explicit: payments-flavored revenue is valued ~4.5× vs. 9–12× for SaaS gross profit (Toast/Shift4 discipline). Keeping subscription + ~100%-GM data licensing as the **majority of gross profit**, with bps capped/fenced/reported separately, is valuation engineering executed through the P&L (`#46` gross-margin volatility, `#50` accounting quality, `#132` terminal margin).

**The honest ceiling (carried through every round).** The red-team re-baseline is adopted here as the base case: **expected outcome SAR 37–112M ARR ($10–30M), ceiling SAR 75–225M ARR ($20–60M), base-case exit SAR 190M–1.1B ($50–300M strategic)**, with $100M ARR / unicorn outcomes treated as *optionality* (the A3 tail), not the plan. Financing the company on a unicorn clock is itself named — in the repo — as a cause of death. Every round below is sized and priced to be survivable under the base case and exposed to the tail.

---

## 2. The KSA cost-of-equity spine (layers A, B, J)

Before round mechanics, the macro spine every stage inherits. All figures are directional benchmarks **[Assumption — refresh at each round]**:

| Component | Level (indicative) | Rationale & levers |
|---|---:|---|
| Nominal risk-free (SAR) | ~4.5–5.0% | 10Y Saudi sovereign/sukuk; SAR–USD peg makes the US 10Y + a thin sovereign spread the anchor (`#1`, `#4` maturity matching — use the 10Y, not T-bills, for a long-duration software asset) |
| Mature-market ERP | ~4.5–5.5% | (`#5`) — expands in risk-off regimes (`#8`); assume mid-cycle |
| KSA country risk premium | ~+0.7–1.2% | Saudi A/A1-rated; CRP is *modest* (`#91`). Do **not** double-charge: PDPL/ZATCA/regulatory exposure is priced in *cash-flow scenarios*, not stacked on the CRP (`#146`) |
| Currency consistency | Model in SAR end-to-end | `#143` — SAR revenue, SAR costs, SAR discount rate. The peg means no material FX beta (`#17`) for a KSA-only book; FX risk *enters* with GCC expansion (UAE AED also pegged — still benign) and would be priced in cash flows, not the rate |
| Mature public tech beta (terminal) | ~0.9–1.2 | Tadawul-listed tech/enterprise software peers (`#21–24`); Reven's mature form (compliance-anchored SoR, CFO budget) argues for the *low* end of software beta — recurring, non-discretionary spend (`#14` cuts the other way for the PRM-tool framing; the compliance framing wins) |
| **Terminal public Ke (TASI-listed)** | **~10–12%** | CAPM build; see §9.4 |
| **Mature private Ke (pre-IPO)** | **~13–16%** | Build-up: spine + size (`#101`, justified — thin management bench, limited capital access) + illiquidity (`#102`) |

**KSA-specific fiscal mechanics (priced in cash flows, never the rate):** zakat 2.5% on the Saudi/GCC-owned zakat base (owed even pre-revenue), CIT 20% on the foreign-owned share — meaning the **cap table's nationality mix changes after-tax FCFE** (`#95` tax-policy exposure; a genuinely unusual KSA lever: raising from foreign VCs has a *tax* cost, not just a governance cost); VAT 15% pass-through (never revenue); WHT 5/15/20% on cross-border payments (a *product opportunity* and a vendor-cost line); annual-prepay billing vs. net-60/90 DSO shapes working capital (`#47`).

**The venture overlay.** From pre-seed through Series A, the spine above is *not* the discount rate — it is the rate applied to **survival-weighted scenario cash flows**. The implied blended IRRs below (50–70% pre-seed → ~11% public) are what the scenario math *produces*, consistent with observed VC hurdle behavior (`#148` implied-cost-of-equity triangulation).

---

## 3. The cost-of-equity glidepath (master table)

The whole dossier in one table. Each round's job is the "levers retired" column; the step-up is the re-pricing of exactly those levers.

| Stage | Timing [Assumption] | Valuation regime | Implied blended Ke / target IRR | Dominant open levers | Levers retired *by* this stage's milestones |
|---|---|---|---:|---|---|
| **Pre-seed** (struck: SAR 2.0M @ SAR 20M post) | M0–12 | Milestone/option pricing; VC-method sanity check | ~55–70% | `#121` stage, `#122` survival, `#123` time-to-breakeven, `#124` financing dependency, `#71` key-person, `#128` PMF absent, `#129` sales-cycle | MVP exists on real claims; pain evidenced; beachhead locked; first paid pilots |
| **Seed** | M12–18 | Graduation-probability pricing (multiples not yet meaningful) | ~40–55% | `#128` PMF partial, `#44` extreme concentration, `#56` unit-economics immaturity, `#124` financing dependency, `#67` competitive window | Phase-1 exit gate: 100+ claims, 3–5 paying logos, activation ≥70%, MRR SAR 37–115K+, repeatable motion |
| **Series A** | M30–40 | Quality-adjusted ARR multiples; first hybrid DCF | ~30–40% | `#45` NRR durability, `#58` CAC efficiency, `#69` complexity, `#65` platform dependency, `#126` down-round risk | Phase-2 Settle gate: idempotent settlement, CFO references, NRR signal 110–120%, GM ≥70%, audit passed |
| **Growth / path to profitability** (B, maybe C) | Y4–7 | DCF + multiples convergence; Rule of 40 | ~18–25% → 13–16% | `#51–53` reinvestment & incremental ROIC, `#132` terminal margin, `#44` residual concentration, `#105` flow-attach tail risk | FCF breakeven or credible glide; NRR ≥105–115% durable; burn multiple <1.5; GCC replication evidence |
| **TASI IPO** | Y7–10 | Public comps + CAPM DCF | ~10–12% | `#81–90` liquidity/float/coverage, `#85` lock-ups, `#131–140` terminal architecture | 3-yr audited track record, controls, board, float ≥30% (Main) — liquidity levers convert from discount to premium |

Read the Ke column as **the price of un-retired risk**: roughly 45–60 points of "cost of equity" at pre-seed are not compensation for market beta — they are survival probability and dilution expressed as a rate. The company cannot negotiate that number down; it can only *retire the levers that produce it*.

---

## 4. ROUND 1 — PRE-SEED: SAR 2,000,000 for 10% (SAR 20M post) — the round as struck

### 4.1 The deal and what the price actually means

Confirmed repo facts (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`): **SAR 2.0M raised for 10% → SAR 20M (~$5.33M) post-money, SAR 18M (~$4.8M) pre-money**; a deliberately conservative **12-month zero-revenue runway**; ~88% of proceeds to people (4 founders + 6 hires from M2, 10 heads total), ~8% one-time KSA setup/legal, 4.32% emergency buffer; average burn ≈ SAR 159.5K/month.

A pre-revenue, pre-MVP company has no intrinsic-value anchor — so what does SAR 20M post *mean* in corporate-finance terms? Three simultaneous readings, all of which must be internally consistent (`#148` triangulation):

1. **A dilution-governance equilibrium.** 10% is the *real* content of the price. It keeps the founders ≥90% into seed — preserving enough founder equity through the A round that incentive alignment (`#76`) and future-round marketability survive. Regional pre-seed dilution commonly runs 10–20%; striking at the bottom of that band is a founder-favorable term won by the quality of the documented strategy corpus, not by traction (there is none, and the repo says so honestly — `#75` disclosure quality already earning its discount-reduction).
2. **A milestone budget with a price attached.** The round is sized by the repo's own method — milestone runway × real KSA burn + buffer — not by a vanity number. SAR 2.0M ÷ SAR ~159.5K/mo ≈ 12.5 months of fully-loaded runway. The zero-revenue assumption is the correct conservatism: it removes revenue-timing risk from the *financing* model entirely (`#124` financing dependency is total during this year; the round IS the company's oxygen, so it is sized so that no commercial slippage can kill it inside the window).
3. **A claim on a scenario tree.** The VC-method sanity check below.

### 4.2 The VC-method sanity check (worked, illustrative)

**[Illustrative scenario — the arithmetic is the point, not the precision.]** Take the red-team base case as the success branch: strategic exit of SAR 190M–1.1B ($50–300M) in years 7–9. Assume the pre-seed 10% is diluted by subsequent rounds (seed ~18%, A ~20%, B ~15%, option pool refreshes ~10% cumulative) to ~**5.0–5.6%** at exit (§10):

| Branch | Exit value (SAR) | Pre-seed proceeds (≈5.3%) | Gross MOIC on SAR 2.0M |
|---|---:|---:|---:|
| Failure / acqui-hire (p ≈ 55–65%) | ~0–10M | ~0 | ~0× |
| Base strategic exit (p ≈ 25–35%) | 190M–1,100M | SAR 10–58M | **5–29×** |
| Tail: Orchestrate/network works, IPO-scale (p ≈ 5–10%) | 1,500M–4,000M+ | SAR 80–210M+ | **40–105×** |

Expected MOIC ≈ (0.3 × ~15×) + (0.07 × ~70×) ≈ **9–10× expected-weighted**, i.e., a ~35–45% expected IRR over 8 years with realistic failure mass — a *fair-to-attractive* pre-seed at SAR 20M post **only because the tail exists**. This is the decisive insight for the founders' own narrative: **at SAR 20M post, the pre-seed investor is not paying for the PRM tool (A1) — a PRM tool alone cannot return the fund. They are paying for a cheap option on the Settle system-of-record (A2) with a free look at the network tail (A3).** Every pitch conversation should price the option, not the tool.

The framework's rule (`#122`): this is why no discount rate appears above. Survival probability is modeled as probability, not smuggled into an 80% Ke that no one can audit (`#150`).

### 4.3 The dominant levers at pre-seed and their correct treatment

Layer `M` (venture) owns this round almost entirely:

- **`#121` Stage maturity / `#128` PMF evidence — the deepest discount source.** Zero revenue, and (per the product architecture audit) the shipped code is a discarded scaffold: Capture ~10% built, Settle 0%. The single most valuation-accretive act of the next 12 months is converting "A− strategy corpus, D codebase" into "working ledger on 100+ real claims with a finance-accepted evidence pack." That one milestone simultaneously retires technical risk, pain risk, adoption risk, and part of commercial risk — four levers with one stone. It is the pre-seed's entire job.
- **`#71` Key-person / founder dependency.** Four founders drawing modest flat salaries (SAR 715K total over 12 months — real but disciplined) with a 6-person execution team. Founder-led sales is the *plan*, which means revenue is founder-embodied for ~24 months. Treatment: not a premium — a **succession/process artifact**: documented sales playbooks (the GTM manual already exists — unusual at this stage), dual-founder coverage of the CFO-facing pitch. Investors will not price this down until they see a deal closed by someone other than the CEO; that's a seed-to-A lever.
- **`#124` Financing dependency / `#123` time to breakeven.** Total, and honestly modeled (zero-revenue year; next-raise trigger at 9–12 months runway remaining; 6–9-month MENA raise processes). The mitigation is already engineered: the seed process must *start ~M9*, i.e., the Phase-1 exit-gate evidence must exist by M9, not M12. **The milestone calendar and the fundraising calendar are the same calendar.** Slippage here is the #1 down-round mechanism (`#126`).
- **`#129` Enterprise sales-cycle risk.** GCC cycles 6–18 months vs. a 12-month runway — the scariest structural mismatch in the model. Mitigations engineered in the corpus: 60–90-day paid pilots (SAR 19–56K, creditable), the ZATCA Wave-24 deadline (30 Jun 2026) as a procurement-compressing forcing function, and design-partner conversion triggers. Priced as scenario timing (pilot-conversion slip cases), not as a rate.
- **`#60` Future dilution probability.** Certain and large — at least seed + A + B ahead. Treated in §10's explicit dilution model. The 10% pre-seed take is the first move in that plan.
- **`#150` Valuation governance — the quiet asset.** The repo's anti-hallucination culture (deliberately blank ACVs, dropped untraceable stats, reconciled-to-the-riyal use of funds) is, in cost-of-equity terms, a **information-risk reducer** (`#75`): it will not change the survival math, but it measurably improves *round execution* — faster diligence, fewer retrades, better instrument terms. Keep every valuation assumption sourced, dated, owned.

### 4.4 What the SAR 2.0M must buy (milestone → lever mapping)

The CFO manual's rule — *"burn must buy proof"* — restated as lever retirement:

| Months | Milestone (repo-defined) | Lever(s) retired | Valuation consequence at seed |
|---|---|---|---|
| M1–3 | Beachhead locked (GCC-regulated); 15–20 discovery interviews; pain quantified at named accounts | `#54` TAM certainty (partially), `#128` demand signal | Converts "two competing wedge theses" — flagged as the #1 strategic risk — into one narrative; removes the seed investor's easiest pass |
| M4–6 | Working claim ledger + attribution MVP on real, messy CRM data; ≥1 **paid** pilot | `#128` PMF, technical risk, `#56` first unit-economics data | The single largest re-rating event of the year |
| M7–9 | 3–5 paid design partners; activation ≥70%; time-to-first-claim <14 days; finance-accepted evidence pack | `#41` revenue recurrence (first proof), `#44` (still concentrated — acknowledged), adoption risk | Meets the repo's seed bar; seed process launches |
| M10–12 | Known real ACV, implementation hours/logo, early GM, CAC trend; MRR SAR 37–115K+ | `#56` unit economics, `#48`/implementation margin, scalability risk | Sets the seed round's *pricing* evidence, not just its *possibility* |

### 4.5 Structural round notes

- **Instrument.** SAFE/convertible vs. priced: the blueprint states a priced 10% — clean and honest. If any bridge is later needed, cap it at the seed target, never uncapped (`#39` — instruments senior to common are a real cost-of-common-equity increase even when they aren't "debt").
- **Preference discipline from day one.** 1× non-participating liquidation preference, no ratchets, no cumulative dividends. Every deviation stacks the `#125` preference overhang that silently raises the required return on *common* — and MENA down-round anti-dilution math (`#126`) has killed more cap tables than valuation ever did.
- **The buffer is a covenant to yourself.** SAR 86,410 (4.3%) emergency cash: the CFO manual's runway-RAG (<6 months = red, freeze discretionary spend) should be treated as an internal covenant with the same seriousness as an external one (`#36` analog).

---

## 5. ROUND 2 — SEED: pricing the graduation, not the revenue

### 5.1 Trigger conditions (do not raise before the gate)

The repo defines the bar precisely; raising *before* it means pricing against hope (expensive), raising long *after* it means runway pressure (also expensive). The gate: **MVP processing 100+ real claims · 3–5 paying/activated design partners · finance-accepted evidence packs · weekly active usage · time-to-first-claim <14 days · MRR ~SAR 37–115K+ ($10–30K) · 15–20% MoM · NRR >100% signal · a locked beachhead — plus 18–24 months of forward runway asked**.

### 5.2 Sizing and pricing logic **[Assumptions — MENA benchmarks from repo]**

- **Size: SAR 6–15M ($1.6–4M).** Derivation, per the repo's own raise-sizing formula: the seed must fund the entire **Settle build** (rule engine, append-only ledger, bilateral reconciliation, compliance engine, billing/ERP integration — the two named critical hires: staff ledger/payments-infra engineer + KSA tax SME), the growth of the logo base to ~25–50 (SOM Year-2 shape, ~SAR 7.5–15M / $2–4M ARR), **through the Phase-2 gate plus a 6–9-month Series-A process buffer**: ≈ 20–24 months × a stepped-up burn of ~SAR 350–550K/mo. Sizing to anything less re-opens `#124` at the worst possible moment (mid-Settle-build).
- **Price: SAR 41–67M ($11–18M) post** — the MENA seed band the repo itself cites — implying a **2.1–3.4× step-up** over the pre-seed's SAR 20M and **~15–25% dilution**.
- **Why ARR multiples are the wrong tool and must be refused in the negotiation.** At SAR 0.5–1.4M ARR, the implied "multiple" is 30–130× — a meaningless statistic that anchors the conversation to the *smallest* asset (A1's revenue) rather than the thing being sold (the evidenced option on A2). The correct pricing logic, stated openly to investors: *the seed prices the probability that a team which has hit every gate on schedule converts a proven Capture wedge into the Settle system-of-record, in a market with a verified structural white space and a dated regulatory forcing function.* That is a graduation probability × Series-A value calculation (`#147` — scenario, not multiple).

### 5.3 The corporate-finance lens on what the seed buys

The seed is the **conversion financing between the two P&Ls**: A1's tool economics (partnerships-budget, %-tolerant, small) fund the construction of A2's infrastructure economics (finance-budget, predictability-seeking, large). Three lens-specific observations:

1. **The moat is bought this round, consumed in all later rounds.** Phase-2 deliverables — the append-only double-entry ledger, bilateral reconciliation, ZATCA clearance engine, a passed real audit, a Shariah sign-off — are what turn `#61` moat durability from "roadmap-grade" (the venture narrative's own honest label) into fact. Every riyal of seed capital should be auditable against a moat artifact.
2. **Concentration is the accepted, disclosed risk.** With 3–5 customers, `#44` is at its lifetime maximum. The correct treatment (per the framework): *do not* let investors both haircut the forecast for concentration *and* demand a concentration premium in the rate (`#146`). Offer instead the mitigation schedule: 50–100-account named universe, 3–4× pipeline coverage, disqualification discipline.
3. **The competitive window is a scenario node, not a fear.** AppDirect (Tackle Dec 2025 + PartnerStack Apr 2026) could ship bilateral settlement in 2–4 quarters — but is structurally non-neutral (the marketplace takes a cut). Model it as a dated branch: if AppDirect ships neutral-grade settlement before Reven's Phase-2 gate, the A3 tail compresses and the base case shifts toward earlier strategic exit (possibly *to* a consolidator — the repo already designs for embeddability). That branch materially affects the *seed investor's* exit-route analysis (`#120`, `#130`) and honestly supports the "why now" urgency: the white space is real and it is closing in quarters.

### 5.4 Seed-stage lever map

| Lever | State at seed | Treatment |
|---|---|---|
| `#128` PMF | Partially retired (paying pilots ≠ durable PMF) | Success metric for the round: renewals + module attach, not logo count |
| `#56` unit economics | First real data (ACV, implementation hours, GM) | Priced in forecast cases; the CFO manual's red-flag thresholds (CAC payback >18mo, LTV:CAC <3) are the seed investor's diligence screen |
| `#45` NRR | Signal only | Use red-team-remediated planning bases: **100–105% base / 115% bull, GRR ≥90–95% floor** — "if it only works at 120% NRR, it doesn't work" |
| `#124` financing dependency | Reduced but real (A round ahead) | Explicit runway covenant: initiate A at ≤12 months remaining |
| `#102` illiquidity | Full | Not separately priced — it is inside the target-IRR convention (`#146`) |
| `#75`/`#150` information risk | Low and falling | Monthly CFO-manual metrics pack = investor reporting; a diligence-speed asset |

### 5.5 Failure modes and the down-round playbook

If the gate is missed at M12: the repo's kill-criteria (buyers only want CRM reporting; no CFO cares; reconciliation breaks on real data) are the *honest* signals to take a bridge only if a specific, dated, evidence-generating milestone remains — otherwise the correct corporate-finance decision is an early strategic process while the team and cash retain option value. A bridge priced as an uncapped note "to avoid setting a price" merely transfers the down-round pain to the common (`#125`, `#126`). Write this playbook down *now*, while nobody needs it.

---

## 6. ROUND 3 — SERIES A: pricing the system of record

### 6.1 Trigger: the Settle gate is the A-round term sheet

The Phase-2 exit gate and the Series-A diligence list are the same document: **settlement idempotent (zero double-pays) · deductions explained pre-settlement · clawback-by-netting works on real reversals · clean ERP reconciliation · NRR signal 110–120% via module attach · a CFO saying "we trust these numbers" on a reference call · a passed real audit**. Commercially [Assumptions]: ~25–60 logos, **ARR ~SAR 7.5–19M ($2–5M)**, blended GM ≥70% with implementation fenced <20% of revenue, burn multiple ≤1.5–2.0.

### 6.2 Pricing: multiples become usable — but only quality-adjusted

**[Illustrative]** Target: **~SAR 150–260M ($40–70M) post** (the repo's own "Series A toward ~$50M valuation" anchor sits mid-band), raising **SAR 30–60M ($8–16M)** for ~20–25% dilution — an implied **8–15× forward ARR**, defensible *only* through the quality adjustments:

| Quality axis | Reven evidence at gate | Multiple effect |
|---|---|---|
| Revenue durability (`#41–45`) | SoR stickiness + compliance budget (non-discretionary; survives downturns) + NRR 110%+ signal | The repo's own rule of thumb: **10 NRR points ≈ 20–30% valuation** — the single highest-leverage metric in the company |
| Gross margin & mix (`#46`, `#50`) | ≥70% blended, SaaS GP majority, services <20% | Protects the *software* multiple; the moment payments GP dominates, the comp set re-rates toward ~4.5× |
| Moat state (`#61–66`) | Passed audit, ZATCA-cleared outputs in production, bilateral ledger live at N logo-pairs | Converts "roadmap moat" discount into SoR premium |
| Concentration (`#44`) | Falling but still material (top-5 likely >50% of ARR) | Honest haircut in forecast cases — resist it appearing twice |
| Market ceiling (`#54`) | KSA SAM SAR 560M–1.5B ($150–400M) [derived]; GCC replication (UAE e-invoicing Jan 2027) as the dated expansion proof point | The A narrative must show the *second* market's gate schedule, or the base-case ceiling caps the multiple |

### 6.3 The corporate-finance lens: three A-round decisions that outlive the round

1. **The Ke regime shifts — and reporting should shift with it.** From Series A, the framework's private-company build-up becomes the *primary* architecture (spine ~10–11% + industry + size + illiquidity ≈ high-teens fundamentals) with **scenarios reserved for genuinely discrete events** (`#147`): money-movement licensing (the PayFac/MTL decision is explicitly deferred in the strategy — keep it a *dated decision node*, because becoming regulated changes the company's risk class, `#105`), the AppDirect branch, GCC expansion gates. The residual gap between ~high-teens fundamentals and the ~30–40% observed A-round hurdle *is* the remaining survival/dilution risk — watching that gap close round-over-round is the cleanest health metric the board can track (`#148`).
2. **Preference-stack hygiene is now cumulative.** Three layers of preferences exist post-A. Keep the whole stack 1× non-participating, pari passu if possible. The framework is blunt (`#39`, `#125`): common equity can carry far more risk than headline enterprise value suggests; every structured term sold for headline valuation is borrowed from the IPO story (TASI listings want clean, convertible-free cap tables — §9).
3. **Capital allocation gets its first real test (`#73`).** The A proceeds split across: (a) Settle deepening in KSA, (b) UAE/GCC replication, (c) early Orchestrate/network primitives. The incremental-ROIC discipline (`#52`) says fund (a) to the gate, (b) on the e-invoicing calendar, and (c) only the cross-tenant identity substrate already carried since Phase 1 — premature platform expansion being the #1 documented startup killer per the corpus's own evidence.

---

## 7. STAGE 4 — PATH TO PROFITABILITY: growth capital and the fundamentals takeover

### 7.1 Two honest endstates, financed differently

**[Scenario architecture]** From ~SAR 19M ($5M) ARR the tree forks, and the *financing strategy must be chosen before the fork resolves*:

- **Base case (red-team):** ARR plateaus toward SAR 37–112M ($10–30M) as the KSA+GCC book saturates; the correct play is an **early pivot to profitability** — burn multiple <1, FCF breakeven by ~Y6 — making the company self-determining and auctionable (strategic exit SAR 190M–1.1B) rather than dependent on a growth round that base-case metrics won't command. In this branch a Series B is *optional or skipped*; venture debt / revenue-based facilities (post-A, with >12 months runway and NRR >100%) bridge working capital (`#40` sustainable debt capacity is real but modest — annual-prepay billing already self-funds much of the motion).
- **Bull case:** Settle economics replicate across GCC and the flow attach lands; ARR passes SAR 112M ($30M) with NRR ≥115% durable; a **Series B of SAR 75–190M ($20–50M) at SAR 375–750M ($100–200M) post** funds the Orchestrate build and the network ignition — the round where (per the strategy corpus's own moat sequencing) "Series B = network economies igniting" must be *evidenced by cross-tenant adoption*, not asserted.

The discipline that keeps both branches open: **default-alive by Year 5.** Every quarter of Rule-of-40 ≥ 40 (growth% + FCF margin%) earned before the fork preserves the choice; every quarter below it forecloses the base-case exit at acceptable prices (`#149` — this is the assumption that actually changes the decision).

### 7.2 Revenue-mix engineering — the multiple defense (restated as P&L covenants)

Adopted from the pricing corpus as standing valuation policy:
- Subscription + data licensing ≥ **60–70% of gross profit** at all times; the settlement/flow layer capped, fenced, **reported as a separate segment** from the first riyal (`#50` — this is what lets the eventual IPO comp set be software, not payments).
- bps take **≤25 net**, late, attach-only; never a visible % skim of the partner's money (the neutrality moat is also a pricing rule).
- Services <20% of revenue as a board metric; implementation margin never negative.
- GM floor 70% blended — below it, "diligence asks whether this is even software."

### 7.3 FCFE mechanics in KSA (what "profitability" means here)

- **Zakat/CIT blend:** after foreign VC rounds, the P&L carries a blended zakat (2.5% on Saudi-owned base) + CIT (20% on foreign share) charge — model FCFE per the *actual cap table*, and note the second-order effect: a future TASI listing that Saudi-fies the register shifts the blend back toward zakat, a small but real FCFE tailwind unique to this market (`#95`, `#145` tax consistency).
- **Working capital:** annual-prepay contracts (drawdown-billed) vs. net-60/90 enterprise DSO and milestone-billed semi-government deals — the deferred-revenue balance becomes a financing asset; semi-gov mix must be capped or FCF quality degrades even as revenue grows (`#47`).
- **Maintenance vs. growth spend (`#48`):** by this stage, separate "run the SoR" engineering (COGS-adjacent, permanent) from expansion build — the terminal-margin story (§9) depends on this ledger being clean for three audited years before listing.

### 7.4 Cost of equity through this stage

Fundamentals build-up: spine (~10–11%) + size premium (shrinking as ARR passes SAR 100M+) + illiquidity (~2–3%) → **~13–16% by IPO-minus-two-years**, with scenario weighting now confined to the flow-attach licensing node and GCC regulatory calendars. The glidepath's last big compression — from ~20% to ~11% — is bought almost entirely by **liquidity and governance levers**, which is exactly what an IPO is for.

---

## 8. STAGE 5 — IPO ON TASI: converting the liquidity layer

### 8.1 Why TASI is the *coherent* listing venue (not just the patriotic one)

- **The moat is jurisdictional.** ZATCA-native clearance, WHT engines, PDPL residency, Sharia-certified revenue-share structures — the deepest moats are *legible to Saudi public investors* in a way no NASDAQ analyst will price. Listing where the moat is understood is a `#86` (analyst coverage/information asymmetry) decision.
- **Vision 2030 flow alignment.** The buyer base (government-adjacent funds, local institutions, retail) actively seeks listed digital-economy exposure; tech scarcity on Tadawul has historically produced **rich multiples for profitable software/IT franchises** (the Elm / solutions-by-stc class) [directional — refresh comps at the time].
- **Sharia screening is a liquidity lever (`#88`–`#89` inverted).** A company whose *product* is Sharia-certified and whose balance sheet passes the debt-ratio screens is investable by the full Islamic-fund universe — in KSA that *widens* the marginal-investor pool and lowers the required return, the exact mechanism the framework describes for foreign-ownership restrictions, running in reverse.
- **The honest counterweight:** TASI wants **profitability and dividends**; a cash-burning growth story lists badly there. The §7 path-to-profitability discipline is therefore not merely prudent — it is the listing prerequisite.

### 8.2 Two listing paths **[indicative requirements — verify current CMA/Tadawul rulebooks before any decision]**

| | **Nomu (Parallel Market)** | **Main Market (TASI)** |
|---|---|---|
| Indicative threshold | Market cap ≥ ~SAR 10M; lighter float (~20% / qualified investors) | Market cap ≥ ~SAR 300M; **≥30% free float**; ~200+ public shareholders |
| Track record | Lighter (≈1 year+) | ~3 years audited financials + operational track record |
| Investor base | Qualified investors only → thinner liquidity | Full retail + institutional + index flows |
| Strategic use | **Stepping-stone listing** at ~SAR 150–400M valuation in the base case; transition to Main after seasoning | The bull-case venue: needs ~SAR 400M+ cap comfortably above the floor |
| Cost-of-equity effect | Partial liquidity conversion (`#81–83` improve, `#86–87` stay weak) | Full conversion: float, coverage, **index inclusion** (`#87` — TASI, then FTSE/MSCI EM flows) |

Base-case arithmetic **[Illustrative]**: at SAR 75–112M ($20–30M) revenue growing 25–35% with FCF margins 10–20%, a SAR 450–900M market cap is defensible at 5–8× EV/Revenue or ~25–35× P/E — inside Main-Market territory *if* the three-year audited track record and controls exist. The bull case (Orchestrate/network live) supports multiples above that on the data-licensing and network layers.

### 8.3 IPO readiness = the I-layer and H-layer lever conversion

The IPO is best understood in the framework's terms as **a purchased conversion of ~4–6 points of cost of equity**, from illiquidity/size/information premiums into market pricing:

| Lever | Pre-IPO state | Listing action |
|---|---|---|
| `#81–83` liquidity, spread, float | DLOM-priced | ≥30% float; stabilize with cornerstone local institutions |
| `#84` shareholder concentration | VC-heavy register | Structured sell-down; avoid overhang signaling |
| `#85` lock-ups | — | Staggered founder/VC lock-ups (12/6 months typical); publish the schedule — surprise supply is a self-inflicted `#85` |
| `#86` coverage | None | Local research sponsorship; bilingual (AR/EN) reporting from day one |
| `#87` index inclusion | None | Engineer float and cap for TASI index eligibility, then EM index screens — passive flow is the cheapest permanent demand the company will ever acquire |
| `#74`–`#78` governance/controls | Private-grade | CMA-grade board (independents, audit committee), SOCPA/IFRS audits ×3 years, internal controls, related-party hygiene — start the clock **three years before** the intended window |
| `#39`/`#125` preference stack | 3–4 layers | Full conversion to ordinary shares at listing; negotiate conversion mechanics *at the Series A*, not at the IPO |

### 8.4 The public cost of equity (worked, indicative)

CAPM at listing (`#141` model selection — CAPM is now the *right* tool for the first time in the company's life):

> **Ke ≈ Rf (≈4.5–5.0% SAR 10Y) + β (0.9–1.1, Tadawul software/IT peers, re-levered to a near-zero-debt structure `#23–24`) × ERP incl. KSA premium (≈5.5–6.5%) ≈ 10–12%.**

Discipline notes from the framework: no size premium *and* an illiquid-small-cap haircut *and* a thin-float discount stacked together (`#146`) — post-listing, thin liquidity shows up in the price, not in a stacked rate; terminal assumptions must cohere (`#131–136`): terminal growth ≤ KSA long-run nominal GDP (~4–5%), terminal margins earned by the fade-resistant layers (SoR switching costs + network data, `#138` — the competitive-fade period, not the growth rate, is where the terminal value really lives), terminal reinvestment consistent with the growth claimed (`#134`).

**What the public market re-prices vs. the last private round:** duration risk (rates sensitivity of a long-duration asset, `#6`), the marginal investor's factor preferences (`#8` — TASI rewards dividends/FCF; plan a modest payout policy earlier than a US SaaS would), and quarterly earnings-quality scrutiny (`#49–50` — the append-only ledger the company *sells* becomes the ledger it is judged by; there is narrative power in that symmetry).

---

## 9. The master lever-map: 15 layers × 5 stages

How each of the framework's layers `A–O` binds at each stage (**●** dominant / **◐** material / **○** background):

| Layer | Pre-seed | Seed | Series A | Growth→FCF | TASI IPO |
|---|:-:|:-:|:-:|:-:|:-:|
| A. Macro & capital markets (`#1–10`) | ○ (funding-window timing only) | ◐ (MENA VC cycle) | ◐ | ◐ (rates → multiple env.) | ● (Ke spine, ERP regime) |
| B. Systematic exposure (`#11–20`) | ○ | ○ | ◐ (customer-budget sensitivity `#14`) | ◐ | ● (beta construction) |
| C. Beta discipline (`#21–30`) | — | — | ○ (peer-set selection begins) | ◐ | ● (pure-play comps, re-levering) |
| D. Leverage & structure (`#31–40`) | ◐ (`#39` instrument choice) | ◐ (preference hygiene) | ● (`#125` stack) | ● (venture debt, prepay float) | ◐ (clean conversion) |
| E. Cash-flow resilience (`#41–50`) | ○ (design intent) | ◐ (first recurrence proof) | ● (NRR/GRR/GM the pricing axes) | ● | ● (earnings quality) |
| F. Growth & reinvestment (`#51–60`) | ◐ (`#58`, `#60`) | ◐ | ● (`#52` incremental ROIC test) | ● (Rule of 40) | ◐ |
| G. Competitive durability (`#61–70`) | ◐ (counter-positioning only) | ◐ (window vs. AppDirect) | ● (SoR switching costs real) | ● (network ignition) | ◐ (fade period `#138`) |
| H. Governance & management (`#71–80`) | ● (`#71` key-person) | ◐ | ◐ (board build) | ◐ | ● (CMA-grade governance) |
| I. Liquidity & access (`#81–90`) | ○ (priced in IRR convention) | ○ | ○ | ◐ (secondaries) | ● (the layer the IPO converts) |
| J. Country/currency/legal (`#91–100`) | ◐ (KSA base, SAR peg) | ◐ | ◐ (GCC expansion) | ◐ | ◐ (CRP in spine; Sharia widens pool) |
| K. Specific-risk architecture (`#101–110`) | ◐ (`#104` data exposure by design) | ◐ | ◐ (`#105` if flow attach) | ● (flow-attach tail) | ◐ |
| L. Claim/asset-specific (`#111–120`) | ● (`#111` what 10% of what) | ◐ | ● (`#119–120` control/exit routes) | ● (exit optionality) | ◐ |
| M. Venture layers (`#121–130`) | ● (the whole round) | ● | ◐ (residual) | ○ | — |
| N. Terminal value (`#131–140`) | ○ (implicit in tail) | ○ | ◐ (first DCFs) | ● | ● (the IPO *is* a terminal-value sale) |
| O. Model design & governance (`#141–150`) | ● (`#150` from day one) | ● | ● | ● | ● (never stops) |

---

## 10. The dilution & ownership arc **[Illustrative scenario — plan, not prophecy]**

| Event | Raise (SAR) | Post-money (SAR) | New-investor % | Founders (fully diluted) | Pre-seed investor |
|---|---:|---:|---:|---:|---:|
| Pre-seed (struck) | 2.0M | 20M | 10% | ~90%* | 10.0% |
| ESOP top-up (pre-seed→seed) | — | — | ~8–10% pool | ~81% | ~9.1% |
| Seed | 6–15M | 41–67M | ~15–22% | ~64–69% | ~7.2–7.7% |
| Series A | 30–60M | 150–260M | ~20–25% | ~49–54% | ~5.6–6.1% |
| Series B (bull branch only) / skipped (base) | 75–190M | 375–750M | ~15–20% | ~40–45% | ~4.6–5.2% |
| IPO primary + float | — | 450M–1B+ | ~10–15% primary | ~34–40% | ~4.0–4.7% |

*Before any ESOP. Two design rules: (1) **founders should cross the IPO with >30%** — both for TASI-market signaling (concentrated committed ownership reads as strength there, `#84`) and for the decade of decisions still ahead; (2) every ESOP refresh belongs in the *pre-money* negotiation of each round — the difference compounds to several points of founder equity by IPO.

---

## 11. Valuation governance: the operating system (`#141–150`)

The repo already runs an anti-hallucination culture; formalize it as valuation governance:

1. **A living assumption register** — every valuation-relevant assumption (ACV, NRR base/bull, GM, survival probabilities, comp sets) carries *source, date, owner, sensitivity range* (`#150`). The monthly CFO-manual pack already collects the inputs; add the register as a standing page.
2. **One risk, one home** (`#146`). Before every board discussion of "the discount rate" or "the multiple," run the §0 allocation table and ask where each named risk already lives. The most common double-count in venture pricing — concentration haircut in the forecast *plus* a concentration argument on the multiple — should be caught by the founders, out loud. It is a credibility weapon.
3. **Triangulate every round** (`#148`): implied multiple vs. quality-adjusted comps; implied investor IRR vs. stage norms; implied graduation probability vs. base rates. If the three disagree, investigate before negotiating.
4. **Decision-boundary sensitivity** (`#149`): at every stage, name the one variable that actually changes the decision. Today it is *pilot-to-paid conversion*; at seed it becomes *module-attach NRR*; at A it is *GCC replication cost*; at growth it is *Rule of 40*; at IPO it is *the fade period*. Spend analytical effort there, not on decimal places of ERP.
5. **The narrative symmetry.** Reven sells companies an append-only, auditable, evidence-backed ledger of who is owed what. Its own equity story should be run the same way: every claimed valuation lever with evidence attached, every retired risk documented, every open risk dated and owned. The product discipline *is* the valuation discipline — and by IPO, the market will be pricing exactly that.

---

*Prepared as a strategy and corporate-finance analysis. It is not an offer, a fairness opinion, an audit, or tax/Shariah/legal advice. Confirmed figures are limited to those in this repository (notably the SAR 2.0M / 10% / SAR 20M post pre-seed blueprint). All forward valuations, round sizes, probabilities, multiples, listing requirements, and rates are labeled assumptions or illustrative scenarios to be re-benchmarked at each round (CMA/Tadawul rules, MAGNiTT/SVC round data, Damodaran-class ERP/CRP updates, and current sovereign curves).*
