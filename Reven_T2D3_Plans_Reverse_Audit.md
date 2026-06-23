# Reven — Reverse-Audit of the Plans, Venture-Scale Narrative & T2D3 Scale Economics (SAR)

**Document type:** Adversarial Reverse-Audit · Internal-Consistency & Arithmetic Check · Venture-Scale / T2D3 Stress-Test
**Product:** Partner Revenue OS (brand: **Reven**)
**Audits:** `Partner_Revenue_OS_Venture_Scale_Narrative.md`, `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` (§6, §8.4), `Reven_T2D3_Reverse_Engineered_Forecast.md`, `Reven_Execution_Plan_Next_2_Quarters.md`, `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`.
**Currency:** **SAR throughout** (per standing instruction). USD shown only where a benchmark is natively USD; FX **SAR 3.75 = USD 1**.
**Date:** 2026-06-23.

> **Reading discipline.** This is a *reverse-audit*: I first reverse-engineer the **implicit assumption** each plan depends on, then audit whether it holds — for **internal consistency, arithmetic, cross-document contradiction, and timing**. Severity legend: **🔴 Fatal** (breaks the plan if unaddressed) · **🟠 Serious** (materially changes the outcome) · **🟡 Manageable** (watch / instrument) · **🟢 Sound** (a load-bearing strength — do not break). Evidence tags: **[Confirmed]** = in a repo doc; **[Derived]** = computed here; **[External]** = third-party benchmark. The company is pre-revenue/pre-seed; every forward number is a hypothesis, and the audit's job is to find where the hypotheses **contradict each other**, not to predict.

---

## 1. Audit verdict on one page

**The plans are internally coherent on *strategy and sequencing* and honest about *evidence*, but the T2D3 scale economics contain four structural tensions that, unaddressed, convert the "unicorn" into a "near-unicorn" (~SAR 2.25–3.0B) and hide an unfunded ramp.** The narrative's own self-score (~7.0/10, "fundable on thesis, gated on first proof" [Confirmed]) survives the audit; the *economics* need the corrections below.

| # | Sev | The plan's claim | The reverse-engineered problem | The fix |
|---|:--:|---|---|---|
| **A1** | 🔴 | T2D3 starts at a ~SAR 5.6M ARR seed base | There's an **unlabeled, unfunded rung** between the zero-revenue pre-seed exit (~SAR 0.45–1.35M ARR run-rate) and the T2D3 "Y0" — the seed year hides ~2 triples no one named | Name the **seed-year ramp** as its own gated rung; size the seed round to fund it, not just "land 3–5 logos" |
| **A2** | 🔴 | Lead GCC-regulated; keep global as the "Stage-3 prize" | The T2D3 ladder **brushes the GCC ceiling (~SAR 113–225M ARR) at Y4** and *requires* global live by **Y3** — global is not a later option, it's load-bearing by year three | Pull global co-sell into the **Series-A** use-of-funds; lock the beachhead now but fund the bridge earlier |
| **A3** | 🟠 | Blended NRR 120%+ | The logo-volume engine (SME/SMB, faster to close) drags NRR toward ~97–101%; 120% needs a **revenue-mix that is enterprise-dominant**, which fights the count engine | Govern on **revenue mix, not logo mix**; cap SMB's share of *ARR*; the SME tier stays a wedge (land-to-expand %), never an ARR pillar |
| **A4** | 🟠 | GM ≥75% Phase 1 / ≥70% blended | KSA enterprise/gov implementation (800–3,000+ hrs) + **net-60–120 DSO gov cash drag** threatens both margin and runway | Fence + push implementation to SI by Phase 2; **annual prepay**; decline sub-scale gov deals that can't clear ≥70% GM |
| **A5** | 🟠 | Default-alive, capital-efficient | T2D3 to SAR 375M ARR implies **~SAR 370M cumulative net-new ARR** → **~SAR 490–560M cumulative burn** at a *good* burn multiple. That is **not** "capital-efficient" in absolute SAR | Separate the two stories: **Scenario A** = default-alive ~SAR 113–225M ARR; **Scenario B/T2D3** = capital-hungry unicorn bid. Don't sell both at once |
| **A6** | 🟡 | SAR 375M ARR → ~SAR 3.0–3.75B (unicorn) | The 8–10× multiple sits **above** the broad-SaaS median (~5×); Scenario-B GM (72–75%) more honestly earns **6–8×** → **SAR 2.25–3.0B** | Underwrite the **near-unicorn** base case; the clean SAR 3.75B needs the *top* multiple **and** the full ARR **and** a material ~100%-GM data line |
| **A7** | 🟠 | Land before the **30 Jun 2026 ZATCA Wave 24** deadline as dated proof | Today is **2026-06-23**; the product is pre-MVP, and the execution plan itself puts the **ZATCA/WHT hook in Q4 2026** — **3–6 months *after* the deadline**. The dated-proof hook is **already unachievable** | Re-anchor to the **rolling later waves** + RHQ tender mandate (still live); drop "land before 30 Jun 2026" as a claim |
| **A8** | 🟡 | A repeatable sales motion lands the logos | Y2's **~151 new sales-led logos** imply ~**12–15 quota-carrying AEs** + SEs/CSMs at 6–18-mo KSA cycles — a GTM org the plans never cost | Cost the **GTM headcount ramp** in the Series-A model; gate it on magic number ≥1.0 |
| **A9** | 🟡 | "Active partners" is the value metric | It **undercharges high-value-per-partner accounts** and is gameable | Ship the **revenue-under-management expansion axis in Settle** (already the repo's stated fix) — but it must *actually ship*, or NRR underperforms |

**Net:** nine findings, **two fatal-if-ignored (A1, A2)**, both *timing/funding* problems rather than *thesis* problems. The thesis is sound; the **ladder is drawn too clean** — it omits the hardest year (the seed-year ramp) and treats the mandatory expansion (global) as optional. Corrected, the central case is a **SAR 2.25–3.0B near-unicorn** that *can* reach the SAR 3.75B line if the multiple and the data layer cooperate.

---

## 2. Scope & method

I reverse-engineered the **load-bearing assumption** behind each plan, then audited it three ways:
1. **Internal arithmetic** — does the math close? (T2D3 ladder, logos × ACV, NRR identity, burn envelope.)
2. **Cross-document consistency** — do the narrative, the pricing economics, the SOM, the execution plan, and the pre-seed model agree? (This is where the contradictions live.)
3. **Timing reality** — measured against today, **2026-06-23**, and the dated forcing functions the plans rely on.

What I did **not** do: invent the blank financials (the repo deliberately leaves cash/CAC/ACV blank — I respect that and audit the *structure*, not fabricated cells).

---

## 3. The plans, restated in SAR (the T2D3 ladder converted)

The standing instruction is SAR. Here is the `Reven_T2D3_Reverse_Engineered_Forecast.md` spine converted — **this table is now the canonical SAR statement of the ladder** (sales-led book; SME self-serve tier excluded per that doc's §5b):

| T2D3 rung | Mult. | End ARR (SAR) | New logos | Blended ACV (SAR) | NRR | Round (SAR) |
|---|:--:|---:|---:|---:|:--:|---|
| **Pre-seed (now)** | — | **0** (zero-revenue) | 3–5 paid pilots | pilot SAR ~19–56K | — | **2.0M raised @ 20M post** [Confirmed] |
| **Y0 — seed base** | — | **~5.6M** | ~60 | ~94K (SMB band) | — | seed ~3.75–18.75M @ ~41–68M post [External] |
| **Y1** | ×3 | **~16.9M** | ~82 | ~120K | 108% | — |
| **Y2** | ×3 | **~50.6M** | ~151 | ~173K | 115% | Series A → ~188M valuation [External] |
| **Y3** | ×2 | **~101M** | ~135 | ~236K (Mid band) | 120% | — |
| **Y4** | ×2 | **~203M** | ~211 | ~319K | 122% | Series B (growth) |
| **Y5** | ×2 | **~375M** | ~271 | ~413K (Mid band) | 125% | Centaur → **~3.0–3.75B** [Derived] |

**Arithmetic audit of the ladder itself: 🟢 it closes.** Using `End = Begin × NRR + New-logo ARR`, each rung's derived new-logo bookings reconcile to the T2D3 multiple, and the terminal ~910 logos × ~SAR 413K ≈ SAR 375M matches the pricing doc's independent "~830 × SAR 450K" [Confirmed §6.2]. **The internal math is sound. The problems are at the *edges* of the ladder (before Y0, above Y3) and in the *assumptions feeding it* (NRR mix, GM, capital, multiple) — §4–§12.**

**Cross-check against the pricing tiers (SAR), a quiet confirmation 🟢:** Y0 blended SAR 94K sits in the **SMB Growth band (SAR 67–150K)**; the book shifts to **Mid-market (SAR 188–450K)** by Y3–Y5 (blended SAR 236–413K). That upward drift *is* the mandated enterprise mix-shift — so the ladder and the tier architecture agree. No contradiction here.

---

## 4. A1 🔴 — The missing rung: pre-seed exit → T2D3 "Y0"

**Reverse-engineered assumption:** "T2D3 starts at ~SAR 5.6M ARR, and the pre-seed delivers that base."

**Audit — it does not, and the gap is the single most under-planned stretch.** The pre-seed is **zero-revenue by design** [Confirmed: financial model §1], and its exit gate is only **~SAR 37.5–112.5K MRR (≈ SAR 0.45–1.35M ARR run-rate)** with 2–3 anchor logos [Confirmed: pricing §3 exit gate]. So between the pre-seed exit and the T2D3 "Y0" base (~SAR 5.6M ARR) sits a **~4–12× ramp** that:
- **No document names as a rung.** The clean ×3/×3/×2/×2/×2 ladder makes Y1 look like the first hard year. It isn't — the *seed year* (getting from ~SAR 1M to ~SAR 5.6M) is **itself ~two triples**, and it happens *before* the official ladder starts.
- **Is only partially funded.** The pre-seed (SAR 2.0M) explicitly funds the *zero-revenue* build, not the ramp. The seed round must fund both the ramp *and* the start of Y1 — yet the narrative sizes the seed to "MVP + 3–5 paid design partners" [Confirmed], i.e., to the *pre-seed* deliverables, not to a SAR 5.6M ARR push.

> **Fix.** Insert an explicit **"Seed-Year Ramp" rung** between pre-seed and Y0: from ~SAR 1M to ~SAR 5.6M ARR, gated on a repeatable motion (not just logos), and **size the seed round to fund that ramp** — closer to the top of the SAR 3.75–18.75M band, with runway to the first T2D3 triple. Calling Y1 "the first triple" understates the climb by two triples; the team should plan for **four triples to SAR 50M, not two.**

---

## 5. A2 🔴 — The KSA ceiling vs. the T2D3 requirement to travel

**Reverse-engineered assumption:** "Lead GCC-regulated; global co-sell is the Stage-3 prize, lockable later." [Confirmed: Narrative §7, §16]

**Audit — the T2D3 economics make global *mandatory by Y3*, contradicting the "later prize" framing.** In SAR:
- The pricing doc's own ceiling: **GCC alone caps at ~SAR 113–225M ARR** [Confirmed §6.1].
- The ladder hits **SAR 101M at Y3** (≈ 45–89% of that ceiling) and **SAR 203M at Y4** — *inside or past* the GCC ceiling.
- The KSA software SAM is ~SAR 563M–1.5B base ~SAR 750M (USD ~$150–400M); **Y4 SAR 203M ARR ≈ 27% of the entire KSA SAM** [Derived]. No company takes a quarter of its home SAM.

**Therefore global co-sell must be contributing pipeline by Y3 and revenue by Y3–Y4** — but the narrative defers it ("the choice must be *locked* before seed"; expansion is "Stage 3"). **The plan's *sequencing* and the plan's *economics* disagree on when global turns on.** This is the same fact the forecast's §10 reconciliation flags, sharpened: it is not just that "GCC is a floor" — it is that **the ladder is arithmetically impossible past Y3 without funded global expansion**, and nothing currently funds it that early.

> **Fix.** Keep the GCC *wedge* for landing, but move **global co-sell from "Stage-3 prize" to a Series-A use-of-funds line** (Y2–Y3). The Series-A story is no longer "scale KSA" — it is "KSA proof + the first global co-sell logos." If the team genuinely wants a GCC-only company, that's **Scenario A (SAR 113–225M ARR, default-alive)** — an excellent outcome, but it is **not** a T2D3/unicorn plan, and the two should not be pitched interchangeably (see A5).

---

## 6. A3 🟠 — NRR 120% needs a revenue-mix the logo engine fights

**Reverse-engineered assumption:** "Blended NRR climbs 105%→125% on module attach + partner-count growth." [Confirmed]

**Audit — directionally fine, but the *mix* is the catch.** Repo benchmarks [External]: **SMB NRR ~97%, enterprise ~118%, private median ~101%.** A blended **120%+** is only reachable if **enterprise logos dominate the *revenue* (not the count)**. The tension: the **logo-count engine that produces T2D3's volume is SMB/SME-weighted** (faster to close, lower CAC) — and that same weighting **drags NRR down**. You cannot hit 120% NRR on an SMB-dominant *revenue* base.

This is reconcilable — my forecast's blended ACV rising into the **Mid band (SAR 236–413K)** by Y3–Y5 implies the revenue *is* enterprise-skewing — but it is a **discipline, not an automatic outcome**. If the team chases logo count (easier) and lets SMB dominate ARR, NRR caps ~108–112% (Scenario A), the multiple compresses, and the ladder stalls at Y3.

> **Fix.** Govern on **revenue mix, not logo mix**: set a standing rule that **SMB ≤ ~X% of *new ARR*** (not new logos), bias the AE comp plan toward mid/enterprise, and keep the **SME tier as a pure wedge measured on land-to-expand %** (never counted in the ARR-pillar math — already corrected in the forecast §5b). Instrument **NRR by segment** from logo #1 so the drag is visible early.

---

## 7. A4 🟠 — Services/implementation drag on GM and cash (the gov DSO trap)

**Reverse-engineered assumption:** "Annual SaaS + implementation, GM ≥75% Phase 1 / ≥70% blended." [Confirmed]

**Audit — two distinct risks, both KSA-specific.**
- **Margin:** semi-gov implementation runs **800–3,000+ hours** and **SAR 300K–1.5M+** per deal [Confirmed §pricing implementation table]; enterprise impl is **0.5–1.0×+ ACV**. If gov/enterprise deals dominate *early* (they have the highest WTP and reference value — exactly what the ICP analysis recommends landing), **services can swamp gross profit** before the platform amortizes. The ≥75% GM target is achievable *only* if implementation is **fenced, contribution-positive, and pushed to SI partners by Phase 2** — which the pricing doc mandates but which is a *future* action, not a Phase-1 reality.
- **Cash:** semi-gov pays **in arrears, net-60–120+ DSO**, with **VAT float and Zakat 2.5% owed pre-revenue** [Confirmed §8.3]. A book that lands marquee gov logos early for references can be **ARR-rich and cash-poor** — the classic GCC enterprise trap.

> **Fix.** (a) **Annual prepay / milestone disbursement** as a hard term on every deal that can bear it (pulls CAC payback toward ~8mo *and* funds the DSO gap). (b) **Decline sub-scale gov deals** that can't clear ≥70% GM after loaded cost-to-serve. (c) Treat the first 1–2 marquee gov logos as **reference investments** (cash-negative, eyes open), not as proof the unit economics work — measure the economics on the **mid-market** cohort.

---

## 8. A5 🟠 — T2D3 is capital-hungry; "default-alive" belongs to Scenario A

**Reverse-engineered assumption:** "The company is capital-efficient and default-alive." [Confirmed framing, Narrative]

**Audit — true for Scenario A, *false* for the T2D3/Scenario-B unicorn bid, and the plans blur them.** The ladder adds **~SAR 370M of cumulative net-new ARR** (Y0→Y5) [Derived]. The repo's **burn-multiple gate (<2, target <1.5)** [Confirmed] means cumulative net burn ≈ **SAR 490–560M** even at a *disciplined* 1.3–1.5×. That is a lot of primary capital and dilution — the opposite of "capital-efficient" in absolute terms. "Capital-efficient" is a **ratio** (burn multiple), not an **absolute** (total raised); the narrative uses the comforting word in a way that can mislead.

- **Scenario A (subscription-only, GCC→some global):** ~SAR 113–225M ARR, genuinely **default-alive**, lowest capital, lowest ceiling. *This* is the "capital-efficient" company.
- **Scenario B (T2D3 to SAR 375M):** requires raising on the order of **SAR 490–560M** lifetime across seed→B→growth (partly offset by deferred-revenue self-funding and the ~100%-GM data line, but still nine-figure SAR). High ceiling, **not** default-alive without continuous fundraising.

> **Fix.** Pitch **one** of these, not a blur. To investors underwriting a unicorn, own the capital intensity (it's normal for T2D3). To investors/founders prioritizing control and survivability, own Scenario A and **drop the unicorn language**. The dangerous version is selling "capital-efficient *and* unicorn" — that's Scenario A's risk profile with Scenario B's ambition, which the burn math says you can't have both of.

---

## 9. A6 🟡 — The multiple assumption sits above the median

**Reverse-engineered assumption:** "SAR 375M ARR × ~8–10× = ~SAR 3.0–3.75B unicorn." [Derived from §6.1]

**Audit — the 8–10× is the *optimistic* end of the repo's own range.** Same doc [Confirmed §8.1]: broad SaaS **~5×**, payments **~4.5×**, elite Cloud-100 **~20×**, Scenario B **6–10×**. At Scenario-B blended **GM 72–75%**, a market valuing on gross profit more honestly pays **~6–8×**:
- 6× → **SAR 2.25B** · 8× → **SAR 3.0B** · 10× → **SAR 3.75B (the clean unicorn)**.

So the **central case is a SAR 2.25–3.0B near-unicorn**; the SAR 3.75B line needs **all three** of: the full SAR 375M ARR, a top-of-range 10× multiple, *and* a material ~100%-GM **data-licensing** line (the only thing that pulls a flow-touching business toward the elite multiple).

> **Fix.** Underwrite the **SAR 2.25–3.0B base case** and treat SAR 3.75B as the **bull**. Protect the multiple the only way that works: keep **subscription + ~100%-GM data dominant in gross profit** (Toast discipline), cap and fence the flow layer, and **narrate the equity story on gross profit**, not GMV.

---

## 10. A7 🟠 — The ZATCA Wave 24 window vs. the build timeline

**Reverse-engineered assumption:** "We land before the **30 Jun 2026 ZATCA Wave 24** deadline as dated proof." [Confirmed: Execution Plan timeline]

**Audit — a hard internal contradiction against the calendar.** Today is **2026-06-23** — the Wave 24 readiness deadline is **7 days away**, and the product is **pre-MVP** ("an A-grade plan and a throwaway CRUD app" [Confirmed]). The execution plan's *own* two-quarter timeline puts:
- Ledger + identity + one loop in **Q3 2026** (now → +3mo), and
- The **ZATCA/WHT hook in Q4 2026** (+3 → +6mo) — i.e., **~Oct–Dec 2026**, **3–6 months *after* the 30 Jun 2026 deadline.**

So the plan **cannot** "land before 30 Jun 2026"; its own schedule lands ZATCA capability after it. The dated-proof hook is **already unachievable**. [Derived contradiction]

**Mitigating nuance (keeps the wedge alive 🟢):** ZATCA e-invoicing rolls in **successive waves** through 2026–2027 for lower-turnover bands, and the **RHQ government-tender mandate + PDPL + WHT** pressures are continuous, not a single dated event. So the *compliance wedge* survives — but the *specific Wave 24 "dated proof" marketing hook* is gone.

> **Fix.** Drop "land before 30 Jun 2026" from the plan and the deck. Re-anchor the forcing function to the **rolling later waves** and the **RHQ/tender/PDPL** mandates (all still live), and re-time the "Wave readiness" campaign to the **next** applicable wave the MVP can actually serve. Update `Reven_Execution_Plan_Next_2_Quarters.md` so the hook row is achievable.

---

## 11. A8 🟡 — The sales capacity the logo ramp implies is uncosted

**Reverse-engineered assumption:** "A repeatable sales motion lands the logos." [Confirmed intent]

**Audit — the ramp implies a GTM org the plans never size.** Y2 requires **~151 new sales-led logos in one year**. At KSA enterprise cycles of **6–18 months** and a productive enterprise AE closing **~8–15 deals/yr**, that's **~12–15 quota-carrying AEs**, plus SDRs, sales engineers, and CSMs — a substantial Series-A GTM org. The pre-seed model funds **6 execution hires, only one of them an Inside Sales Executive** [Confirmed: financial model §3]. The jump from *one* seller to a *~15-AE engine* by Y2 is real, expensive, and unmodeled.

> **Fix.** Put a **GTM headcount ramp** in the Series-A model (AEs, SEs, CSMs, leadership), **gated on magic number ≥1.0** (don't hire ahead of efficiency). Note that the **SME self-serve wedge** deliberately offloads the long tail from the sales org — which is exactly why it must stay zero-touch (A3 / forecast §5b).

---

## 12. A9 🟡 — "Active partners" undercharges; the RUM axis must actually ship

**Reverse-engineered assumption:** "Active partners is the value metric across the journey." [Confirmed]

**Audit — already red-teamed in the pricing doc (Decision 1), and the audit confirms the residual risk.** The active-partner metric **undercharges accounts where *few* partners drive *huge* revenue** (value ≠ partner count) and is **gameable** (prune inactive partners to cut cost). The repo's fix is to **add a revenue-under-management / per-payout axis in Settle**. The audit point: this is a *future* dependency the NRR ramp (A3) silently relies on — **if the RUM axis doesn't ship in Settle, NRR underperforms and the back half of the ladder (which is 61–68% expansion-driven) misses.**

> **Fix.** Treat the **Settle-phase RUM/per-payout axis as a committed deliverable, not an option** — it is the mechanism that makes the 120% NRR (A3) and the ACV climb to SAR 413K (A6) real. Define "active = submitted a claim / had an attributed deal in the period" to defuse gaming [Confirmed fix].

---

## 13. What's sound (🟢 — do not break these)

- **The phase discipline** (Capture→Settle→Orchestrate; no money movement in Phase 1) — the spine that keeps the company from becoming a regulated fintech prematurely. **Sound.**
- **The anti-hallucination culture** (blank financials, de-hallucinated figures) — a genuine diligence signal and the reason this audit can trust the *structure*. **Sound.**
- **The SME affordability anchoring** (Reven Start from SAR 50/mo, *below* a Salla store / one Zoho seat; self-serve only; off the enterprise pricing surface) — correctly keeps the wedge cheap without diluting the premium. **Sound.**
- **Refusing the uncapped take-rate** (neutral-Switzerland wedge; % lives only in the payments layer, the KSA norm) — protects both the buyer relationship and the multiple. **Sound.**
- **The honest SOM↔T2D3 reconciliation** (KSA floor ~SAR 19–38M ARR Y3; the rest is the travel bet) — the docs name the gap rather than hide it. **Sound.**
- **The cross-tenant identity graph seeded in the MVP** — the one moat that's impossible to retrofit; correctly placed at commit one. **Sound.**

---

## 14. The reverse-audited ladder (SAR) — risk-adjusted base / bear / bull

Applying A1–A6 to the clean ladder gives an **honest three-case** (SAR ARR):

| | Y0 | Y2 | Y3 | Y5 | Terminal valuation | What it assumes |
|---|---:|---:|---:|---:|---:|---|
| **Bear (Scenario A, GCC-bound)** | ~5.6M | ~30M | ~50M | **~113–225M** | **~SAR 0.6–1.3B** @ 5–6× | Global never funds; SMB-heavy; NRR ~108–112%. **Default-alive, sub-unicorn.** |
| **Base (audited T2D3)** | ~5.6M | ~50.6M | ~101M | **~375M** | **~SAR 2.25–3.0B** @ 6–8× | Seed-year ramp funded (A1); global live by Y3 (A2); enterprise-mix NRR 120% (A3); data line emerging (A6). **Near-unicorn.** |
| **Bull (clean T2D3 unicorn)** | ~5.6M | ~50.6M | ~101M | **~375M+** | **~SAR 3.75B** @ 10× | Base **plus** a material ~100%-GM data-licensing line and a top-of-range software multiple. **Unicorn.** |

> **The audited bottom line.** The clean §8.4/forecast ladder is the **bull**, presented as the base. The **honest base case is the near-unicorn (SAR 2.25–3.0B)**, contingent on funding the hidden seed-year ramp and pulling global expansion forward to Series A. The **bear is a genuinely good company** (default-alive, SAR 0.6–1.3B) — which is why A5 matters: *don't let the bull's ambition be sold with the bear's capital efficiency.*

---

## 15. Audit scorecard & the 10 fixes before seed

| Dimension audited | Grade | One-line |
|---|:--:|---|
| Ladder arithmetic (internal) | 🟢 A | Closes; matches the pricing doc independently |
| SAR tier ↔ ACV consistency | 🟢 A | Blend drifts SMB→Mid as mandated |
| Pre-seed → Y0 funding (A1) | 🔴 C | Hidden ~2-triple ramp, under-funded |
| GCC ceiling ↔ T2D3 timing (A2) | 🔴 C | Global is mandatory by Y3, framed as optional |
| NRR mix realism (A3) | 🟠 B− | 120% needs enterprise-revenue dominance |
| GM & cash under gov mix (A4) | 🟠 B− | Services + DSO threaten both |
| Capital-efficiency framing (A5) | 🟠 B− | "Default-alive" ≠ T2D3; don't blur |
| Multiple/valuation (A6) | 🟡 B | Base is near-unicorn, not unicorn |
| ZATCA Wave 24 timing (A7) | 🟠 B− | Dated hook already missed; rebase to later waves |
| Evidence discipline | 🟢 A | Blank-financial honesty holds up |

**The 10 fixes before the seed raise:**
1. **Name and fund the seed-year ramp** (SAR ~1M → ~5.6M ARR) as its own gated rung (A1).
2. **Move global co-sell into the Series-A plan**, not "Stage 3" (A2).
3. **Govern NRR on revenue mix**; cap SMB's share of *ARR* (A3).
4. **Commit the Settle RUM/per-payout axis** as a deliverable, not an option (A9).
5. **Make annual prepay / milestone disbursement a standing term** to beat DSO (A4).
6. **Decline sub-≥70%-GM gov deals**; measure unit economics on the mid-market cohort (A4).
7. **Pitch one scenario** — unicorn-with-capital, *or* default-alive Scenario A — never the blur (A5).
8. **Underwrite the SAR 2.25–3.0B base case**; protect the multiple with a real data line (A6).
9. **Delete "land before 30 Jun 2026"**; re-anchor to rolling waves + RHQ/PDPL; fix the execution-plan hook row (A7).
10. **Cost the GTM headcount ramp** in the Series-A model, gated on magic number ≥1.0 (A8).

---

## Sources & confidence

**Internal [Confirmed]:** `Partner_Revenue_OS_Venture_Scale_Narrative.md` (Land→Expand→Own, NRR target, self-score, beachhead framing); `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` (§6 scenarios + unicorn arithmetic, §8.1 benchmarks, §8.4 ladder); `Reven_T2D3_Reverse_Engineered_Forecast.md` (the ladder being audited); `Reven_Execution_Plan_Next_2_Quarters.md` (two-quarter timeline, ZATCA hook); `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` (zero-revenue round, 6 execution hires); `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (SAM/SOM, ceiling, ICP, gov DSO).

**External [External]:** Battery (T2D3); Bessemer/KeyBanc/SaaS Capital (NRR by segment, CAC payback, multiples); ZATCA wave schedule; MENA seed/Series-A valuation benchmarks. Used directionally.

**Derived [Derived]:** all SAR conversions (×3.75), the burn envelope, the ceiling-vs-ladder comparison, the three-case valuation range, and the seed-year-ramp gap.

> **Disclaimer.** An adversarial reverse-audit for internal decision-making, not an offer, valuation, or forecast of results. The company is pre-revenue/pre-seed; findings test the *consistency of the plans*, not market truth. The strongest finding is not that the thesis is wrong — it is that the **ladder is drawn too clean**: it hides the hardest year and treats mandatory expansion as optional. Fix those two and the near-unicorn base case is coherent.
