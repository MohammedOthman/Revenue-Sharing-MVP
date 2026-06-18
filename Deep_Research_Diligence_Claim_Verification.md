# Deep-Research Verification — Reven / Partner Revenue OS Diligence Claims

**Type:** Independent, adversarial fact-check of the load-bearing external claims in the Reven corpus and in `Investor_Diligence_130_Hardest_Questions.md`.
**Method:** 6 parallel research agents → fan-out WebSearch → fetch/extract → adversarial verification (try to *refute* each claim) → ≥2 independent sources per claim, prefer primary/independent over vendor. **~46 falsifiable claims** across 5 angles.
**As-of:** 18 June 2026.

> **Environment caveat (important):** Direct page-fetch (`WebFetch`) returned **HTTP 403 on most primary domains** (SEC, Gartner, ZATCA, SAMA, vendor IR, MAGNiTT) in this sandbox — the same block the corpus itself hit. Verdicts therefore rest on **multiple mutually-consistent search-indexed extracts** of those primary sources, not on rendering the primary page. Confidence is graded accordingly; load-bearing figures should be certified against the linked primary URL in an unblocked browser before external use.

---

## 0. Verdict scorecard

| Angle | Claims | ✅ Confirmed | ◐ Mixed | ✗ Refuted | ? Unverifiable |
|---|---:|---:|---:|---:|---:|
| Competition & consolidation | 10 | 8 | 2 | 0 | 0 |
| Category & market size | 8 | 4 | 4 | 0 | 0 |
| KSA regulatory | 10 | 8 | 2 | 0 | 0 |
| Demand statistics (debunk) | 8 | 3 | 2 | 2 | 1 |
| Base-rates & SaaS/payments | 10 | 6 | 4 | 0 | 0 |
| **Total** | **46** | **29** | **14** | **2** | **1** |

**Headline:** the *directional* thesis is **well-supported** — the partner economy is large and partner-mediated, the GCC compliance forces are real and dated, the competitive window is genuinely consolidating, and the unicorn base-rate is genuinely hostile. But **~17 of 46 claims need a correction or a caveat**, several stats must be **struck entirely**, and **one of the corpus's own analytical claims is backwards** (Toast). Net effect on the diligence doc: it **holds and in places gets sharper** (the window is closing faster and the base-rate is worse than even stated); a handful of supporting figures must be fixed or dropped.

---

## 1. The corrections that matter most (fix before any investor contact)

These are the claims that are **wrong, fabricated, or misattributed** in the corpus/marketing PDFs and would damage credibility if an investor checks them:

1. **STRIKE — "~24% median partner-sourced revenue / top-quartile >40%."** No such survey exists; it is a fabricated reformatting of the real HubSpot×Canalys stat ("50% attribute 26%+"). *(The corpus already flagged this for removal — confirm it's gone from the marketing PDFs too.)*
2. **STRIKE — "42% of CFOs, per a 2024 EY Revenue Assurance study."** **No EY "Revenue Assurance study" exists.** Fabricated citation.
3. **STRIKE / re-label — "EY: partner programs leak 1–5% of EBITDA."** Citation-laundered (blogs citing blogs); where an EY context exists it's about *general quote-to-cash* leakage, **not partner programs**. Never present as "EY found."
4. **DROP as data — "10–30% of partner payouts leaked."** Unverifiable; no independent primary source. Use the defensible **3–8% sales-comp error** figure instead (Gartner / Joe Galvin), attributed precisely.
5. **RE-LABEL — "Partner Attribution Leak."** It is a **Magentrix (vendor) trademark**, magnitude unquantified — use as a named *vendor concept*, never as a measured fact.
6. **FIX (your own analysis is backwards) — Toast.** The corpus says Toast fintech "dwarfs software on revenue, not profit (~22% GM)." The margin (~22%) and revenue share (~82%) are right, but the conclusion is **wrong**: Toast fintech is **also the larger gross-profit contributor (~1.7× subscription's GP dollars)**. This matters because you cite Toast to argue embedded-fintech is a revenue-not-profit mirage — the data says the opposite.
7. **FIX attribution — Canalys was acquired by Informa (2023), not Omdia (2024).** (Later rebranded under Omdia.) Minor, but it's the kind of error a diligence analyst catches.
8. **FIX the bps argument (see §6).** "We'll net 25–60 bps as a neutral non-custodian" vs "Adyen nets ~15.5 bps" is a **category error**, not just an inconsistency — Adyen is the wrong yardstick.

---

## 2. Competition & consolidation — the window IS closing (8/10 confirmed)

| # | Claim | Verdict | Conf | Finding / correction |
|---|---|---|---|---|
| 1 | AppDirect acquired Tackle.io, Dec 2025 | ✅ | High | Announced **Dec 1, 2025**. **Terms undisclosed** — do *not* cite a price. Tackle last valued ~$1.25B, supports >$20B marketplace volume. |
| 2 | AppDirect acquired PartnerStack ~Apr 2026, ~$150–250M | ✅ | High | Announced **Apr 14, 2026**. Terms officially undisclosed; BetaKit sources report **"just over $150M, primarily AppDirect stock."** AppDirect's ~6th acquisition in ~10–12 months. |
| 3 | Combined entity: ~138,000 partners; "get found, get chosen, get paid" | ✅ | High | "**138,000+ B2B partners**" cited across coverage; slogan is verbatim AppDirect positioning. |
| 4 | Crossbeam acquired Reveal, Jun 2024, all-stock; ~25–30K co. network | ✅ | High | **Jun 25, 2024**, all-stock; ~25K at merger → **"30,000+ companies"** now. Money-free account-mapping (ELG), not settlement. |
| 5 | impact.com: $30/mo or 3% (higher of) + ~2.5% network fee | ✅ | Med-High | Confirmed via impact.com Starter billing docs + 3rd-party reviews. |
| 6 | PartnerStack take fee ~1–3% (some cite 3–15%) | ◐ | Med | A %-fee on commissions is confirmed and **opaque/demo-gated**; best-documented range is **3–15%**, *not* 1–3%. **Lead with 3–15%.** |
| 7 | WorkSpan "Partner Revenue Flows" + GenAI Co-Sell Agent on AWS, ~Jul 2025 | ✅ | High | Launched on the **AWS AI Agent Marketplace, Jul 17, 2025** (inaugural cohort). |
| 8 | Impartner editions ~$25K/$45K/$75K; ~$80–150K+ w/ modules | ✅ | Med-High | G2: Emerge $25K / Ignite $45K / Pro $75K. Module-loaded upper bound directionally supported (estimate). |
| 9 | Kiflo ~$149/$399/$699–799/mo, per active partner, unlimited seats | ✅ | High | Tiers $149/$399/**$699** (top), unlimited seats, priced by active partners. **Correction:** top is **$699/mo (~$7.5–8.4K/yr)**; "$799" not confirmed. |
| 10 | No neutral, two-sided **bilateral settlement system-of-record** owned | ✅* | Med | Holds, **with caveats**. RecVue (one company pays its partners), **SETTL** ("installed in *your* Salesforce org"), PartnerStack/Tipalti/Trolley (unilateral rails), Crossbeam (money-free), AppDirect (intermediary) — none is a *neutral, jointly-trusted* two-sided ledger. **But:** RecVue launched "Revenue Share on Salesforce" **June 2026** — adjacent players are **creeping toward** it. It's a *positioning* gap, not a capability vacuum. |

**Net read:** the broad "partner network + payouts + marketplace" stack is **consolidating fast under a funded incumbent (AppDirect)**; the *narrow* neutral-bilateral-settlement wedge is still uncrowded but **time-boxed to ~12–24 months**. This **strengthens** diligence Q16/Q32–36: the window is real and closing.

---

## 3. Category & market size — directional story holds, headline TAM does not (4/8 clean)

| # | Claim | Verdict | Conf | Finding / correction |
|---|---|---|---|---|
| 1 | Gartner transitioning PRM → PERM; 2025 **Market Guide** (not MQ) | ✅ | High | Confirmed (Gartner doc 6982766). Exact term: "Partner **and** Ecosystem RM." No Magic Quadrant exists → immature category, as stated. |
| 2 | PRM TAM spans >100× ($0.78B → ~$90B) | ✅ | High | Confirmed but the spread is a **definitional artifact**: software-only ≈ **$1–4B** (FactMR $776M; MRFR $3.42B); the ~$90B figures (Grand View, Precedence) are **services-inclusive** and shouldn't anchor a software TAM. |
| 3 | Marketplace $30B→$163B by 2030, ~29% CAGR (Omdia); Omdia bought Canalys 2024 | ◐ | High | Endpoints + Omdia attribution correct. **Two corrections:** ~29% is Omdia's *2025–2030* CAGR (2024→2030 is **~32.6%**); and **Informa acquired Canalys in 2023**, not "Omdia in 2024." |
| 4 | HubSpot×Canalys×Partnership Leaders 2022: 50% attribute 26%+; 40% no partner-ops FTE; n=664 | ✅ | High | Verbatim confirmed. This is your **strongest, most-defensible** demand stat — lead with it. |
| 5 | Canalys/Omdia: ~70% of IT spend via channel (2025) | ✅ | High | Confirmed — but **declining** (73% '23 → 70% '25 → ~66.7% '26 forecast). Don't present as permanent/rising. |
| 6 | Forrester State of Partner Ecosystems 2025: ~67% expect strong indirect growth | ✅ | High | Real (Forrester's own survey). Title is loosely worded; figure is sound. |
| 7 | Microsoft ~95% revenue partner-influenced; IDC $8.45–$10.93 multiplier | ◐ | High | 95% = "commercial revenue **flows through** partners" (softer than "influenced"). **$8.45 and $10.93 are not a range** — they're **two partner types** (services-led $8.45, software-led $10.93). IDC study is **Microsoft-commissioned**. |
| 8 | Salesforce State of Sales 7th ed. (4,050 resp., 22 countries, Aug–Sep 2025) | ◐ | High | Methodology confirmed, but: 86→94% is partner-selling **adoption** (not "tool adoption"); **"89% say partner selling more important" is REFUTED** — the 89% is about **AI**; the real partner stat is **83%**. Usage-pricing #1 ✅; 8 tools ✅; "84% plan to consolidate" applies to teams **without an all-in-one platform**. Single interested vendor source — high load-bearing risk. |

**Net read:** present the market as a **software-only floor (~$1–4B)** with the big numbers footnoted as broader scope; the "why now" is real but leans heavily on **one vendor survey** with two mis-stated sub-figures. Reinforces diligence Q2–3, Q9, Q23.

---

## 4. KSA regulatory — facts hold; moat is real but bundled (8/10 confirmed)

| # | Claim | Verdict | Conf | Finding / correction |
|---|---|---|---|---|
| 1 | ZATCA Phase-2 clearance; Wave 24 = >SAR 375K; deadline ~30 Jun 2026 | ◐ | High | Threshold + date correct; measured against **2022/2023/2024** revenue (not current-year). **Wave 24 is the lowest/broadest wave to date** and the latest announced (Wave 23 = SAR 750K, 31 Mar 2026). Later waves are speculation. |
| 2 | No mandated/certified vendor; liability on taxpayer | ✅ | High | ZATCA's provider directory is explicitly **non-binding/not an endorsement**; any compliant solution allowed. Confirms your **Q14**: compliance is becoming table-stakes. |
| 3 | WHT: royalties 15% / technical 5% / mgmt 20% / other 15%; monthly by 10th | ✅ | High | Confirmed. **Nuance:** the 5% technical rate **rises to 15% for related-party/affiliate** payments. |
| 4 | No US–KSA tax treaty | ✅ | High | Confirmed. A **US–KSA TIEA was signed 14 Apr 2026 — info-exchange only, not a DTT**, so no WHT relief. |
| 5 | Jan-2024 ZATCA software-payments guideline (royalty vs commercial profits) | ✅ | High | Confirmed: distribution/reproduction/sublicense rights → royalty 15%; mere use/resale → commercial profits (0% if no PE); bespoke dev → 5%. |
| 6 | PDPL enforceable 14 Sep 2024; cross-border limits; SAR 5M penalty | ✅ | High | Confirmed. **Precision:** SAR 5M is the **administrative** ceiling (Art. 36); criminal track (Art. 35, sensitive-data misuse) is up to **SAR 3M + 2 yrs**; repeat offenses can double. |
| 7 | RHQ required for government contracts since Jan 2024; <SAR 1M exempt | ✅ | High | Confirmed. **Softened 2025–26** by an Etimad exemption mechanism + carve-outs (sole compliant bid / ≥25% cheaper), but core rule + SAR 1M threshold stand. |
| 8 | Sharia: Ju'ala = AAOIFI SS-15, Wakala = SS-46; guaranteed return = riba | ✅ | High | Both standard numbers confirmed directly. SS-46 is specifically *investment* agency; guaranteed capital return = riba. |
| 9 | Zakat ~2.5%; Apr-2024 regs floor base at net assets → owed pre-revenue | ◐ | Med-High | Rate ✅ (2.5% Hijri / ~2.578% Gregorian). **Overstated:** Zakat is a **net-worth/equity** levy (so a positive-equity loss-maker *can* owe it), but a genuine net loss with no adjusted profit **can yield no base**; the 2024 regs added a **max** cap, not a hard floor. Reframe as "net-worth-based, can apply pre-profit," not "always owed at a loss." |
| 10 | Lean = first SAMA open-banking/PIS licensee ~Mar 2026; sarie cap | ✅ | High | Lean got the **first Major Payment Institution licence (PIS+AIS), announced 26 Mar 2026** (a 2nd firm licensed same day). **sarie per-txn cap = SAR 20,000.** |

**Net read (confirms Q14, Q105–112):** every compliance *rule* is publicly codified → the **baseline is table-stakes** any competent vendor/advisor can meet. The defensible moat is the **hard-to-copy composite**: RHQ + local entity (gates gov revenue), Sharia-certified contract structures, SAMA-rail-aware money movement, and defensible WHT/royalty positions — operational, capital- and relationship-intensive, not a rulebook clone.

---

## 5. Demand statistics — the "never use" list (2 fabricated, 1 unverifiable)

| # | Claim | Verdict | Conf | Finding |
|---|---|---|---|---|
| 1 | "24% median / >40% top-quartile partner-sourced revenue" | ✗ | High | **Fabricated reformat** of HubSpot's "50% attribute 26%+." No such survey. |
| 2 | "EY: partner programs leak 1–5% of EBITDA" | ◐ | Med | **Misattributed/citation-laundered**; EY context is *general* quote-to-cash, not partner programs. |
| 3 | "42% of CFOs, 2024 EY Revenue Assurance study" | ✗ | High | **Fabricated** — no such EY study exists. |
| 4 | "Partner Attribution Leak: ≥¼ of partner deals booked as direct" | ◐ | High | **Magentrix trademark**; magnitude is the vendor's own unquantified assertion. |
| 5 | "10–30% of partner payouts leaked" | ? | Med | **Unverifiable** — no independent primary source; an unsourced amalgam. |
| 6 | Sales-comp overpayment/error ~3–8% (3% of $500M = $15M) | ✅ | Med-High | **Real** — Gartner (Joe Galvin) / Xactly. Use this *instead of* the leakage figures. |
| 7a | "88% of POCs never reach production" | ✅ | High | Real — **IDC + Lenovo CIO Playbook 2024**, specifically **AI POCs**. Attribute precisely; don't generalize. |
| 7b | "95% of GenAI pilots show no P&L return" | ✅ | High | Real — **MIT NANDA, GenAI Divide 2025.** |
| 8 | "AI agents: 130K leads → 3,200 opps in 4 months" | ✅ | High | Real but it's **Salesforce's own internal Agentforce** result, not a survey finding. |

**Net read:** your ROI/why-now case must be rebuilt on the **defensible** survivors (HubSpot 50%/26%+, Canalys 70%, Gartner 3–8% comp error, MIT/IDC pilot-failure stats) and the customer's **own pilot-measured** numbers — never the fabricated leakage trio. Directly reinforces diligence Q5.

---

## 6. Base-rates & SaaS/payments benchmarks (6/10 clean) — incl. the bps question

| # | Claim | Verdict | Conf | Finding / correction |
|---|---|---|---|---|
| 1 | MENA ~8 unicorns (2020–H1'25), none horizontal B2B SaaS | ◐ | Med | **"None horizontal B2B SaaS" CONFIRMED.** "8" is single-tracker; broader definitions give **~10–11** (Jahez, Property Finder, Salla) — **still none horizontal B2B SaaS**. Closest software unicorn = **Foodics (vertical)**; the one horizontal candidate, **Unifonic, is NOT a confirmed unicorn** (~$146M raised). Best phrasing: *"~8–11 new MENA unicorns since 2020, none horizontal B2B SaaS."* |
| 2 | KSA VC: $750M FY24; $860M H1'25 (+116%); 56% of MENA | ✅ | High | All confirmed (MAGNiTT/SVC via SPA/Arab News/Zawya). **Caveat:** KSA was **40%** of MENA in FY24 vs **56%** in H1'25 — don't conflate. |
| 3 | NRR median ~101%, SMB ~97%, 120%+ enterprise/top-decile, mean-reverts | ✅ | High | Confirmed (median fell ~108%→~101%, 2022→2024). "SMB ~97%" is the **optimistic** end of the 90–97% band. Reinforces **Q75** — 120%+ is not a defensible base assumption. |
| 4 | Toast: fintech ~82% of revenue at ~22% GM, "dwarfs revenue not profit" | ◐ | High | Revenue share (~81.7%) ✅ and ~22% margin ✅, **but the conclusion is BACKWARDS:** fintech is **also the larger gross-profit contributor (~1.7× subscription GP)**. *Fix this in the corpus.* |
| 5 | Adyen blended net take ~15.5 bps | ✅ | High | FY2024 **~15.5 bps** ✅; risen to **~17 bps** in 2025. |
| 6 | ServiceTitan/BILL ~25–26 bps; Stripe Billing 0.7% | ◐ | Med-High | ServiceTitan **~25 bps** ✅; Stripe Billing **0.7%** ✅; **BILL is NOT ~25–26 bps** — blended ~1.1%, transaction-fees/TPV ~30 bps. Drop BILL from the comp. |
| 7 | Burn-multiple bands (Sacks): <1 / 1–1.5 / 1.5–2 / 2–3 / >3 | ✅ | High | Exact match to Sacks' 2020 framework. |
| 8 | KSA digital economy SAR 495B/$131.9B/~15% (MCIT); GASTAT 16% '24; IDC $39.6B '25 | ✅ | High | All confirmed; the ~15% (MCIT/Vision 2030) and 16.0% (GASTAT) are distinct instruments for 2024 — corpus distinguishes them correctly. |
| 9 | Startup Genome: ~74% of high-growth startups fail from premature scaling | ✅ | Med-High | Confirmed (2011, ~3,200 internet startups). **Caveat:** 15-year-old, self-selected sample, associational — directional only. |
| 10 | Centaurs ~1.6% of funded cloud cos.; unicorns ~0.07% | ◐ | Med-High | Centaur 1.6% ✅ (**Bessemer**, SOTC 2022). **0.07% is Aileen Lee/Cowboy Ventures 2013, NOT Bessemer**, and rests on a different denominator — don't merge them. Bessemer's own line: Centaurs are "~7× rarer than unicorns." |

### The bps question (resolves diligence Q37 & Q76 — and sharpens it)
The corpus (and the diligence doc) frame the Orchestrate endgame's "25–60 bps net as a neutral non-custodian" as **internally inconsistent vs Adyen's ~15.5 bps**. The verified, more precise finding:

- **Adyen is the wrong benchmark — it's a category error.** ~15.5 bps is a *pure-PSP processing* take on raw volume, the most commoditized, scale-competed layer.
- **Software-bundled platforms sustainably net multiples of that:** ServiceTitan **~25 bps**, Stripe Billing **0.7%**, BILL **~1.1% blended** — *because they own the workflow/software*, not because of payments mechanics.
- **"Neutral / non-custodial" is a monetization *headwind*, not a tailwind** — it removes float, card economics, and balance-sheet take. So a neutral non-custodian can plausibly exceed 15.5 bps **only if** it monetizes attribution/orchestration/software value on top.
- **Bottom line:** the corpus's *number* (25 bps-ish) is defensible **only with the right argument and comps** (vertical-SaaS-plus-payments, not Adyen). The Red Team was right that "above Adyen because we touch less" is wrong — but the deeper fix is to **stop benchmarking to Adyen at all** and justify bps via bundled software value. Update Q76 accordingly: it's not that the endgame economics are impossible — it's that the stated *rationale* for them is.

**Net read on outcome base-rate (confirms Q11, Q127):** a **horizontal-B2B-SaaS unicorn from MENA has a zero base-rate to date**; $100M ARR is a ~1.6%-of-funded event; premature scaling kills ~74%. The honest base-case remains a **strong regional outcome + strategic exit**, with the unicorn arc as option value — and the verification makes that case *more* firmly than the corpus stated it.

---

## 7. What this does to the diligence doc and the pitch

**Strengthened (use these — they survived adversarial checking):**
- The **closing competitive window** (Q16, Q32–36): AppDirect/Tackle (Dec 2025) + PartnerStack (Apr 2026, ~$150M+, 138K partners) and WorkSpan's AWS agent are **confirmed and recent** — the urgency is real.
- The **compliance-as-table-stakes** risk (Q14, Q105–112): confirmed by ZATCA's "any compliant vendor" stance and the SAR-375K Wave 24 universalization.
- The **hostile unicorn base-rate** (Q11, Q127): confirmed and arguably worse — zero MENA horizontal-B2B-SaaS unicorns under any reasonable definition.
- The **120%+ NRR is not a base assumption** (Q75): confirmed (median ~101%).
- The **strongest demand anchor** is HubSpot's "50% attribute 26%+" + Canalys 70% — both independently verified.

**Must fix / soften:**
- Strike the **fabricated stats** (24% median; 42%-of-CFOs EY; 10–30% leakage) and the **misattributed** ones (EY EBITDA leakage; Partner Attribution Leak as fact). — Q5.
- Correct **Toast** (it's the larger GP contributor — your framing is backwards) and **re-argue the bps** via vertical-SaaS comps, not Adyen. — Q37, Q76.
- Fix small attributions: **Canalys←Informa(2023)**, **0.07%←Cowboy Ventures(2013)**, **Microsoft $8.45/$10.93 are two partner types**, **PartnerStack take fee is 3–15%**, **Omdia CAGR/years mismatch**, **drop BILL from the bps comp**.
- Caveat the **single-vendor-survey dependence** of the "why now" (Salesforce State of Sales), with two sub-figures already mis-stated (the "89%" is about AI; "tool adoption" mislabel).

**Unchanged bottom line:** the verification does **not** rescue the thesis from its core gaps (no product, no team-tech, no traction) — those are internal facts no external source touches. But it confirms the *market reading* is largely sound, the *competitive clock* is real, and the *honest outcome* is a regional leader/acquisition, not a unicorn. The most actionable output: **a clean, citation-safe stat sheet** (below) to replace the fabricated figures everywhere they appear.

---

## 8. Citation-safe stat sheet (drop-in replacements)

| Use this (verified) | Source | Replaces (do not use) |
|---|---|---|
| 50% of orgs attribute 26%+ of revenue to partners; 40% have no partner-ops FTE (n=664) | HubSpot×Canalys×Partnership Leaders, *State of Partner Ops & Programs 2022* | "~24% median / >40% top-quartile" |
| ~70% of IT spend flows through partners (2025, declining from 73%) | Canalys/Omdia | — |
| Manual sales-comp processes overpay ~3–8% of incentive payouts | Gartner (Joe Galvin), via Xactly | "10–30% payout leakage"; "EY 1–5% EBITDA"; "42% of CFOs" |
| Marketplace software $30B (2024) → $163B (2030) | Omdia (2025) | (keep; fix CAGR to ~32.6% 2024–30) |
| ~88% of AI POCs don't reach production | IDC + Lenovo, CIO Playbook 2024 | generic "POCs fail" |
| 95% of GenAI pilots show no P&L return | MIT NANDA, GenAI Divide 2025 | — |
| KSA VC $860M H1'25 (+116% YoY, 56% of MENA) | MAGNiTT/SVC | — |
| Adyen blended net take ~15.5 bps (FY24) / ServiceTitan ~25 bps / Stripe Billing 0.7% | SEC/IR filings, Meritech | "BILL ~25–26 bps"; "neutral non-custodian nets >Adyen" rationale |

---

## Sources (grouped; certify load-bearing URLs in an unblocked browser)

**Competition:** businesswire.com (AppDirect–Tackle, Dec 1 2025; AppDirect–PartnerStack, Apr 14 2026) · betakit.com (PartnerStack price) · appdirect.com/blog (138K / slogan) · prnewswire.com + tech.eu (Crossbeam–Reveal, Jun 2024) · crossbeam.com (30K) · help.impact.com (Starter billing) · support.partnerstack.com + affinco.com (take fee 3–15%) · einpresswire.com + workspan.com (GenAI agent, Jul 17 2025) · g2.com/vendr (Impartner) · kiflo.com/pricing · settl.pro / recvue.com (white-space adjacents).

**Category/market:** gartner.com/documents/6982766 (PERM Market Guide) · factmr.com / marketresearchfuture.com / grandviewresearch.com / precedenceresearch.com (PRM TAM) · omdia.tech.informa.com + ciodive.com (marketplace) · crunchbase.com (Informa–Canalys 2023) · hubspot.com / businesswire.com (State of Partner Ops 2022) · channelfutures.com (70% channel) · forrester.com (RES182126) · blogs.microsoft.com + IDC #EUR149732822 (95% / $8.45–$10.93) · salesforce.com (State of Sales 7th ed.).

**KSA regulatory:** zatca.gov.sa (Wave 24; solution-provider directory) · ey.com / grantthornton.sa (waves) · taxsummaries.pwc.com (WHT) · irs.gov + state.gov (no DTT) · kpmg.com/sa + dlapiper.com (software-payments guideline) · clydeco.com + morganlewis.com (PDPL) · deloitte.com + twobirds.com (RHQ) · aaoifi.com (SS-15, SS-46) · ey.com + dhruvaconsultants.com (Zakat 2024 regs) · finextra.com + wamda.com (Lean licence) · alahli.com (sarie SAR 20K cap).

**Stats debunk:** hubspot.com (real source) · ey.com/dna-of-the-cfo + corporate-reporting-survey (no "Revenue Assurance study") · magentrix.com (Attribution Leak trademark) · xactlycorp.com (3–8% comp error) · cio.com + lenovo (88% AI POCs) · fortune.com/MIT NANDA (95%) · salesforce.com (Agentforce 130K→3,200).

**Base-rates/benchmarks:** multiples.vc + wamda.com (MENA unicorns) · spa.gov.sa + arabnews.com + magnitt.com (KSA VC) · chartmogul.com + keybanc (NRR) · sec.gov (Toast 10-K/8-K; ServiceTitan S-1; BILL) · investors.adyen.com + statista.com (Adyen bps) · stripe.com/billing (0.7%) · sacks.substack.com (burn multiple) · stats.gov.sa + trade.gov (KSA digital economy/IDC) · startupgenome.com (premature scaling) · bvp.com/atlas + techcrunch.com/Aileen Lee (Centaurs/unicorns).

> *All external figures are directional, corroborated across ≥2 independent search-indexed sources but not certified against primary pages in this environment (universal 403). Confidence tags reflect that. Company-specific facts (no product, no traction, team) are internal and were not the subject of this external verification.*
