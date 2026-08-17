# Saudi Riyal Map — Market Sizing, Value Pool, Capture Surfaces, and Ceiling (Independent Rebuild)

**Document type:** Market sizing and value-capture analysis, rebuilt from zero.
**Scope:** Kingdom of Saudi Arabia, first market. GCC used only for the expansion multiplier in §5.
**Independence rule:** No figure in this document is inherited from any prior document in this repository. Every external number carries a source, a period, and a confidence tag (HIGH = official statistic, audited filing, or regulator text; MED = reputable secondary source relaying a primary release; LOW = single weak source or wide-variance model). Every number we computed ourselves is labelled **[derived]** with the arithmetic shown. Where sources conflict, both numbers appear; nothing is silently averaged.
**Method:** Six targeted research clusters (macro & firm universe; real estate & automotive; e-commerce, delivery & travel; telecom, IT channel, franchise & FMCG; payments, insurance & banking; comparable-vendor economics & long-tail flows) plus a deep-research harness pass (5 search angles, ~30 sources fetched, 25 falsifiable claims extracted). The harness's 3-vote adversarial verification completed for only two claims before hitting a compute limit — both were confirmed (the Insurance Authority as issuer of the canonical 2024 market report, 3-0; Rasan's intermediated-GWP trajectory checked against the CMA prospectus, 2-0) and none was refuted. Every other load-bearing figure is therefore verified by triangulation: it was found independently by at least two research passes or corroborated across at least two unrelated outlets relaying the same primary release, and its confidence tag reflects that standard rather than a completed formal vote. Research window: 15 July 2026. FX: USD 1 = SAR 3.75.
**Companion documents:** `partner-revenue-os-PDR-v5.md` (product), `GTM_Operating_Manual.md` (GTM stages). This document supersedes the market-sizing content of `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`; §8 reconciles the two.

---

## 0. The answer

Four numbers define the market, and each one forces a decision.

1. **The commission pool — SAR 35–60B per year gross, SAR 28–50B addressable [derived].** Saudi businesses pay other businesses roughly SAR 35–60 billion a year in commissions, revenue shares, royalties, referral fees, trade incentives, and agent payouts across the twelve flows we could evidence (§1–§2); SAR 28–50B of it is genuinely addressable by a claims/attribution/settlement platform. Adding adjacent payment-economics pools (card acquiring) lifts the gross figure to SAR 40–70B. This is the money the product governs: the leakage, disputes, and reconciliation on this pool are the ROI a CFO can underwrite.
2. **The flow base — roughly SAR 500–850B per year [derived].** The commission pool sits on top of intermediated transaction value (marketplace GMV, intermediated premiums, brokered property sales, channel-routed IT, franchised system sales). This is the base a settlement layer earns basis points on in Phase 3, and it is 10–20× the commission pool.
3. **The software market — SAM ≈ SAR 150–650M per year [derived].** Built bottom-up from the population of commission *payers* (≈800–1,500 core program operators plus a 1,500–3,500-logo mid-market tail) priced at what comparable vendors actually charge (Impact.com, PartnerStack, Tipalti, CaptivateIQ ACV data, §3). A realistic 3-year SOM is SAR 10–20M ARR (base case; scenarios in §3.4).
4. **The ceiling — SAR 0.5–1.2B per year in KSA, ≈ SAR 1–2.4B GCC-wide [derived].** Summing every capture surface at dominant-share maturity (SaaS + share-of-payouts + bps-on-flow + FX + compliance + financing, §4–§5). Saudi Arabia is about half the GCC economy (IMF Article IV 2025, HIGH), so a GCC build-out roughly doubles the ceiling.

The three decisions these numbers force:

- **Sell against the pool, price against the software market.** The SAR 35–60B pool is the sales narrative and the ROI warranty; the SAR 150–650M SAM is what revenue plans may be built on. Conflating them is the single most common sizing error, and the gap between them (≈100×) is why the wedge must be a workflow product, not a fintech, on day one.
- **Insurance distribution is the beachhead, not IT/SaaS.** It has the best combination in the map: a SAR ~3B commission pool on SAR ~33B of intermediated premiums, ~50 addressable logos, regulator-manufactured pain (Insurance Authority conduct regime, the 2% motor-TPL commission cap, IFRS-17 acquisition-cost accounting), and a listed proof-of-economics (Rasan). §7 ranks all ten segments.
- **Do not build money movement before the rails exist.** SAMA licensed the first open-banking fintechs in March 2026 for account information only; payment initiation is still sandbox-only (HIGH). Basis-points-on-flow (surface C, ceiling SAR 260–780M) is real but gated ~2027+; until then the ledger, rules, and compliance layers are the defensible ground.

The single largest uncertainty: five of the nineteen flows in the map have no published KSA number at all (marketplace seller payouts, dealer F&I commissions, TPA fees, mortgage-broker fees, coalition-loyalty settlements). §9 lists what would close each gap. Where the map says "no data," that is a verified absence, not an omission.

---

## 1. The riyal map — every evidenced B2B intermediary flow in Saudi Arabia

Ranked by addressable commission pool, not by industry size. "Addressable" asks: does a *recurring bilateral claim → attribution → settlement* problem exist that a third-party system of record can own?

### 1.1 Summary table

| # | Flow (payer → payee) | Flow base (SAR/yr) | Commission pool (SAR/yr) | Confidence | Addressability |
|---|---|---|---|---|---|
| 1 | Insurers → brokers/agents/aggregators | GWP 76.1B (2024); ~43.6% intermediated ≈ 33B | 2.1B official (2022); ≈3.0B scaled to 2024 [derived] | HIGH base / MED pool | High — recurring, regulated, concentrated |
| 2 | E-commerce marketplaces → 3P sellers (fee retained) | GMV 92–197B (defs. conflict) | 7–16B [derived, LOW] | LOW-MED | High for payout ops; GMV opacity limits sizing |
| 3 | Food-delivery platforms → restaurants (fee retained) | GMV 18–26B | 2.7–3.2B [derived] | MED | High — multi-homing merchants, price war |
| 4 | Real-estate parties → brokers | Sales 267.8B (2024); 336.6B (2025) | ≤6.7–8.4B upper bound [derived, 2.5% legal cap] | MED | Medium — per-deal, escrowed, fragmented |
| 5 | IT vendors → channel partners (margin/rebates/MDF) | Channel-routed IT ≈ 42–63B [derived] | 3.5–7B [derived, LOW-MED] | MED inputs | High — global PRM category exists; KSA compliance gap |
| 6 | Recruitment: employers → licensed offices (Musaned) | ~825k contracts/yr | 6.6–9.9B [derived, LOW] | HIGH volumes / LOW pool | Low — state platform already intermediates |
| 7 | Franchisors ← franchisees (royalties + marketing funds) | System sales 56–60B | 2.8–4.8B [derived, LOW] | MED base / LOW pool | Medium-high — formalizing under Franchise Law |
| 8 | Hotels → OTAs (commission) | Online hotel GBV ~8.6B (2024) | 1.3–2.2B [derived] | MED | Medium — hotel-side reconciliation wedge |
| 9 | Advertisers → media agencies | Ad market ~23.6B (2024) | 2.4–3.5B [derived, LOW] | LOW-MED | Low-medium — retainer models, entrenched tools |
| 10 | BNPL providers ← merchants (MDR-like fee) | BNPL GMV ~36.8B (2024) | 1.8–2.6B [derived, LOW] | LOW-MED | Low as commissions; high as data/ops adjacency |
| 11 | Telecom operators → dealers/distributors | Operator revenue 104.5B (2024) | ~1.5–2.5B point estimate; ≤4.3B ceiling [derived, LOW] | HIGH inputs / LOW pool | Medium — 3 buyers, entrenched in-house systems |
| 12 | FMCG manufacturers → retailers/distributors (trade spend) | CPG mfr revenue ~100–150B [derived] | 10–30B [derived, LOW] — partially addressable | MED norms / LOW pool | Low-medium — TPM is a separate category; settlement slice only |
| 13 | Airlines → travel agencies | OTA air GBV ~7.1B | ≈0 base commission (Saudia 0% since 2012); GDS incentives + service fees, unquantified | MED-HIGH | Low — commission model dismantled |
| 14 | Card acquiring: merchants → acquirers/PSPs (MDR) | POS 668B + mada e-com 197B (2024) | 5.7–9.8B [derived] — **adjacent**, not partner rev-share | HIGH base / LOW-MED pool | Adjacent — sizing context for rails, not the wedge |
| 15 | Remittances: senders → banks/exchange houses | Outward 212.8B (2024) | consumer-priced margin ~5–6% — **adjacent** | HIGH | Adjacent — consumer flow, not B2B rev-share |
| 16 | Healthcare insurers → TPAs | Health GWP 42.2B (2024) | no KSA fee data (ME TPA market ~SAR 18.75B, LOW) | HIGH base / NO-DATA pool | Medium — few logos, regulated; pool opaque |
| 17 | Banks/finance cos → auto dealers (F&I) & mortgage brokers | New mortgages 91.1B/yr; 826k new cars/yr | NO PUBLIC DATA (verified absence) | HIGH bases | Unknown — likely material, undisclosable today |
| 18 | Education: institutions → student-recruitment agents | no KSA data | no KSA data (global norm 10–15% of first-year tuition) | NO-DATA | Low near-term |
| 19 | Loyalty coalitions (qitaf, Alfursan) — partner settlements | qitaf >15.7M members; banks buy miles | NO PUBLIC DATA | NO-DATA | Monitor only |

**[derived] Gross evidenced pool (rows 1–13): ≈ SAR 35–60B/yr. Addressable core (excluding recruitment and the abolished airline row): ≈ SAR 28–50B/yr. With adjacent payment pools (rows 14–15): ≈ SAR 40–70B/yr.** Arithmetic in §2. The wide ranges are honest: five pools rest on rate-norms × base rather than disclosed totals.

### 1.2 Insurance distribution — the best-evidenced pool in the Kingdom (rank 1)

**Who pays whom.** 29 insurers/reinsurers pay commissions to 88 licensed brokers, agents, and ~5 licensed aggregators when a policy binds; the Insurance Authority (IA) caps motor-TPL commission at 2% of premium (SAMA decision, Aug 2017, still in the rulebook — HIGH) and Tameeni's motor commissions run 2% (TPL) to 10–15% (comprehensive) per the Rasan IPO prospectus (MED).

**The numbers.**
- Total GWP SAR 76.1B in 2024, +16.3% YoY; health SAR 42.2B, general SAR 26.2B — IA Saudi Insurance Market Report 2024 via SPA/Argaam (HIGH).
- Commissions incurred by insurers: **SAR 2.1B in 2022**, when brokers intermediated 38.4% of premiums and agents 5.2% (SAMA 16th Insurance Market Report via Beinsure/Middle East Briefing — MED; several secondary sources mislabel this as 2024). The 2024 commissions line sits in the IA report PDF, which was not retrievable in this environment (§9).
- [derived] 2022 commission ratio = 2.1 / 53.3 GWP = 3.9%. Applied to 2024 GWP: 76.1B × 3.9% ≈ **SAR 3.0B/yr** — LOW confidence on the scaling (IFRS-17 changed how acquisition costs are reported).
- The aggregator proof point: Rasan (Tadawul 8313) reported FY2025 revenue of SAR 653M (+82%) on SAR 8.5B of platform GWP (+30%) — an effective take of 7.7% of GWP [derived; overstated as a pure aggregation rate because revenue includes the Treza leasing line] — company disclosures via Argaam/Zawya (HIGH). The growth history checks against the IPO prospectus: intermediated GWP SAR 1.4B (2020) → SAR 6.6B (2023), a 69% CAGR (CMA prospectus; adversarially verified 2-0). Sell-side coverage puts Tameeni at ~47% of KSA retail motor policies and Rasan's network at ~24 insurer partners (Derayah initiation, Mar 2026 — MED-LOW, single analyst source, unverified).

**Why it is addressable.** Commission flows here are recurring (monthly/quarterly bordereaux), bilateral (insurer ↔ intermediary reconciliation), regulated (caps, disclosure, IA conduct regime), and concentrated (top-10 brokers place 76.4% of broker-intermediated premiums — ANB Capital, MED). Every property of the flow matches a claims-ledger product. The buyers exist on both sides: insurers need payable-side commission subledgers (IFRS-17 amortization); brokers/aggregators need receivable-side reconciliation.

### 1.3 Marketplace and platform commissions — the largest addressable flow, the least transparent (ranks 2–3)

**Who pays whom.** Marketplaces retain a referral fee from third-party seller proceeds (Amazon.sa publishes 5–15% by category, MED-HIGH; noon runs ~5–27%, MED) and remit the balance as seller payouts on weekly/biweekly cycles. Food-delivery platforms retain 12–25% from restaurant order value (HungerStation ~15% fixed — Rest of World, MED; Keeta entered at 12–20% — LOW) plus 1–3% COD/settlement deductions.

**The numbers.**
- E-commerce base: SAMA counted SAR 197.4B of e-commerce payments via mada cards in 2024, +25.8% YoY (HIGH — and this *understates* the market: it excludes Visa/Mastercard credit-card volume). Research-firm GMV estimates conflict by definition: SAR ~92.5B (Research&Markets 2024) vs SAR ~105B (Mordor 2025) vs an outlier at SAR ~836B (IMARC). All three reported, none averaged; the outlier is excluded from our working range for scope confusion.
- [derived, LOW] Marketplace fee pool: taking SAR 92–197B as the bracket and 8–15% blended marketplace take on the ~50–70% of volume that is marketplace-routed → **SAR 7–16B/yr**. This is the widest error bar in the map because neither noon nor Amazon discloses KSA GMV or seller payouts (verified absence).
- Food delivery: Jahez (Tadawul 9526) discloses GMV SAR 6.5B and take rate 14.6% for FY2024, GMV SAR 7.2B FY2025 (HIGH). Redseer puts GCC aggregator GMV at USD 11B with KSA ≈ half → KSA ≈ SAR 20.6B (MED); cross-checked against Jahez's market share (32% company claim, 20–28% later estimates) → market GMV SAR 18–26B [derived]. At ~15% blended commission → **pool SAR 2.7–3.2B/yr [derived]**.
- The commission war is live: Jahez's net income fell from SAR 188M (FY2024) to SAR 73M (FY2025) under Keeta's entry (150M+ orders in its first year — Argaam, MED-HIGH). Keeta reached ~33% order share by Nov 2025 per one secondary source (MED-LOW; conflicts with earlier Redseer shares — both reported).
- Salla (68k+ merchants, SAR ~50B cumulative GMV — MED-HIGH) and Zid (~80k merchants — MED) monetize by subscription, not take rate — they are channels to merchants, not commission payers at scale.

**Why it is addressable, and the caveat.** Platforms settle with tens of thousands of merchants on published-but-disputed terms; multi-homing restaurants reconcile three platforms' statements monthly. The payout-operations problem is exactly a settlement-ledger problem. The caveat: the large platforms have engineering organizations and treat settlement as core IP — the entry sold to platforms is compliance/audit/merchant-facing transparency, while the entry sold to *merchant groups* (franchise F&B operators, virtual-brand operators) is commission audit across platforms.

### 1.4 Real-estate brokerage — a legally capped, newly licensed pool (rank 4)

- Sales base: SAR 267.8B of sales deals in 2024 (+27% YoY; 236,690 deals) per Ministry of Justice data via Argaam, corroborated by Al Rajhi Capital's MoJ/Knight Frank series (MED); SAR 336.6B across 265,190 deals in 2025 per the MoJ Real Estate Exchange (MED — scope includes some non-sale operations). A widely cited "SAR 2.5 trillion, 622k deals" 2024 figure is the Exchange's *all-operations* total (it includes mortgage registrations); we use the sales-only series (conflict reported, LOW for the big number).
- The law fixes the rate: the Real Estate Brokerage Law (in force 18 Jan 2023) caps sales commission at 2.5% of transaction value and lease commission at 2.5% of first-year rent, total across all brokers per deal, unless otherwise agreed in writing (REGA — HIGH). >148,000 FAL brokerage licenses have been issued since the law took effect; >46,000 were active in early 2024 (REGA via SPA — HIGH; Argaam — MED).
- [derived] Upper-bound commission pool = 267.8B × 2.5% = **SAR 6.7B (2024)**, SAR 8.4B on the 2025 Exchange figure. Upper bound because the brokered share of deals is not published — many transactions close without a licensed broker.
- Rental: Ejar registered >1.5M contracts in Jan–Sep 2024 (REGA — HIGH) but publishes no contract values. A rough bound is possible from consumer rent guides (Riyadh one-bedroom ≈ SAR 28–55k/yr; national averages lower — Dlight/Sands of Wealth/Expatica, LOW): [derived, LOW] ~1.6M residential contracts/yr × SAR 20–40k average rent × 2.5% ≈ SAR 0.8–1.6B, plus ~380k commercial contracts at higher rents ≈ SAR 0.4–1.0B → **rental brokerage plausibly SAR 1–2.5B/yr**. This bound is excluded from the §2 headline sums because its rent inputs are consumer-guide grade; official Ejar values would replace it (§9).

Addressability is medium, not high: commissions are one-shot per transaction, often escrowed, and the 148k licensees are overwhelmingly individuals. The recurring settlement problem lives with **developers** (off-plan sales commissions to agencies across long projects) and **co-brokerage/referral splits** among the newly licensed brokerages — a narrower but real wedge.

### 1.5 IT channel — the global category's home turf, thin local disclosure (rank 5)

- Base: KSA ICT market SAR 180B in 2024 per CST (HIGH; includes telecom services); IDC puts ICT *spend* at USD 37.4B / SAR 140B (MED). Enterprise software estimates conflict by ~6×: Statista USD 613M (2024) vs Grand View USD 3.53B (2025) — definitions differ; both reported, neither averaged.
- [derived] Enterprise-relevant portion (software + IT services + cloud, net of telecom and devices) ≈ SAR 60–90B. Canalys's global benchmark says >70% of IT transacts through partners (MED-HIGH; no KSA-specific split exists) → channel-routed IT ≈ SAR 42–63B/yr.
- Channel economics: distributor gross margins run ~6–9% (Logicom disclosures; Redington net margin 1.35% [derived from FY25 filings] — MED), vendor rebate/MDF budgets ~2–5% of channel revenue (practitioner guides — LOW-MED). → [derived] **channel margin + incentive pool ≈ SAR 3.5–7B/yr** (LOW-MED).
- No KSA-only revenue is disclosed by any major distributor operating in the Kingdom (Redington, Logicom report regionally; Mindware, AlJammaz are private — verified absence).

Addressable and strategically important despite the LOW pool precision: this is where global PRM/ecosystem tools (Impact.com, PartnerStack, Salesforce PRM) already define willingness to pay, and where their KSA compliance gap (ZATCA integration, WHT on cross-border rebates, Arabic, PDPL residency) is the differentiation. The RHQ population (~600–700 licensed regional headquarters by late 2025 — HIGH/MED) is the concentrated sub-segment: foreign principals running KSA channel programs under local tax rules.

### 1.6 The rest of the map, briefly — and what each line is worth knowing

- **Recruitment (rank 6).** Musaned processed 412,399 domestic-labor contracts in H1 2024 (HRSD — HIGH) at regulated fee caps by nationality (SAR 5,900–14,700 — HIGH). [derived, LOW] Flow ≈ SAR 6.6–9.9B/yr. Not a target: the state platform *is* the settlement layer, and offices are micro-fragmented. The lesson it teaches is different — Musaned is the Kingdom's proof that regulated intermediary flows migrate onto mandated platforms.
- **Franchising (rank 7).** 1,788 registered franchises by Q3 2024, up from 185 at end-2021 (Ministry of Commerce via SPA — MED-HIGH); market estimates SAR 56–60B system sales (MED/LOW-MED, two sources consistent, one diverging at USD 21B). At global royalty norms (5–8% royalty + marketing funds — MED, no KSA tariff exists) → [derived, LOW] **royalty flow SAR 2.8–4.8B/yr**. Cenomi Retail's audited accounts show why nobody can see this flow: royalty economics sit inside cost-of-goods transfer pricing, with only SAR 13.4M visible as a "royalty" payable (HIGH). Formalization under the Franchise Law's disclosure regime is the tailwind.
- **Hotel-OTA commissions (rank 8).** Online hotel GBV ≈ SAR 8.6B (2024, VIDEC via WiT — MED) at 15–25% OTA commission norms (global — MED) → [derived] **SAR 1.3–2.2B/yr**, concentrated at Booking.com (~60% share) and Almosafer. The wedge is hotel-side: reconciliation of commissions across OTAs for hotel groups, in a market adding 100k+ keys under Vision 2030.
- **Advertising (rank 9).** KSA total ad market ≈ SAR 23.6B (IMARC — MED-LOW); digital ≈ SAR 12–15B (IAB MENA share [derived]; Statista conflicts at USD 4.0B — both reported). Agency compensation at 10–15% norms (MED, global) → [derived, LOW] **SAR 2.4–3.5B/yr**. Entrenched agency-of-record contracts and global tools make it a later segment.
- **BNPL (rank 10).** GMV ≈ SAR 36.8B (2024) with Tabby+Tamara at ~93% share (Termsheet — LOW-MED); merchant fees 5–7% typical (LOW-MED) → [derived, LOW] **merchant-fee pool SAR 1.8–2.6B/yr**. This is MDR-like pricing, not partner revenue share; its relevance is as a data point for what Saudi merchants tolerate as a take rate, and as future payout-rail partners (both are now SAMA-licensed finance companies — MED-HIGH).
- **Telecom dealer commissions (rank 11).** The one audited number in the Kingdom: Mobily's "advertisement, promotion and sales commissions" = SAR 741.9M FY2024 (4.1% of revenue; audited note 34 — HIGH), with capitalized dealer-commission contract costs of SAR 364.2M → 638.8M (2024→2025 — HIGH). stc and Zain do not break out dealer commissions (verified absence). [derived, LOW] Applying Mobily's ratio to sector revenue of SAR 104.5B gives a ≤SAR 4.3B ceiling for advertising+commissions; the dealer-commission-only flow is plausibly **SAR 1.5–2.5B/yr**. Three buyers, deep in-house systems — opportunistic enterprise deals only.
- **FMCG trade spend (rank 12).** Global CPG trade-promotion norms are ~20% of manufacturer revenue (McKinsey — MED-HIGH; no MENA-specific figure exists). On a [derived] KSA branded-CPG manufacturer base of SAR 100–150B → **SAR 10–30B/yr** of trade spend, the largest single pool in the map — but Trade Promotion Management is its own software category, and audited accounts (Almarai: revenue net of volume rebates; SAR 649M accrued volume discounts + trade support at end-2025 — HIGH) show the flow is booked as revenue deductions, not payouts. Addressable slice: rebate *settlement and audit* for distributors and mid-size manufacturers, not TPM planning.
- **Airline agency commissions (rank 13).** Saudia abolished base commission on international tickets issued in KSA in June 2012 (MED-HIGH); agencies live on service fees and GDS segment incentives, and the 2024 Ministry of Finance mandate moved government flight bookings direct, bypassing agencies entirely (Seera FY24 disclosures — HIGH). A cautionary tale for every commission pool: rates can go to zero by decree.
- **Adjacent pools (ranks 14–15), for context only.** Card acquiring: POS SAR 668B + mada e-com SAR 197B (2024, SAMA — HIGH) at mada's 0.8%/SAR 40 MDR cap and 1.95–2.6% PSP bundles → [derived] SAR 5.7–9.8B/yr acceptance revenue. Remittances: SAR 212.8B outward (2024, SAMA — HIGH) at 5.2–6.2% average consumer cost (World Bank — HIGH). Neither is B2B revenue share; both size the rails the Phase-3 settlement layer would ride or partner with.
- **No-data flows (ranks 16–19).** Healthcare TPA fees (health GWP SAR 42.2B is HIGH; the TPA fee rate has no KSA disclosure), auto F&I and mortgage-broker commissions (bases are HIGH — 826,580 new vehicles 2024, SAR 91.1B new mortgages 2024; the commission lines are simply not public), education-agent commissions, and loyalty-coalition settlements. Each is flagged with its closing source in §9 rather than guessed at.

---

## 2. What the map sums to (the value pool, stated honestly)

- **Gross evidenced commission pool: ≈ SAR 35–60B/yr [derived].** Sum of the evidenced pools in rows 1–13: insurance ~3.0B + marketplaces 7–16B + delivery 2.7–3.2B + real estate 2–6.7B (low end assumes only ~30% of deals are brokered at the cap; the brokered share is unpublished) + IT channel 3.5–7B + franchise 2.8–4.8B + OTA-hotel 1.3–2.2B + advertising 2.4–3.5B + BNPL 1.8–2.6B + telecom 1.5–2.5B + domestic recruitment 6.6–9.9B = SAR 34.6–61.4B, rounded to 35–60B.
- **Addressable core: ≈ SAR 28–50B/yr [derived].** The gross pool minus domestic recruitment (the state platform already owns that settlement layer) and the airline row (commission abolished): SAR 28.0–51.5B, rounded. Adding the adjacent payments pools (card acquiring 5.7–9.8B) lifts the gross figure to ≈ SAR 40–70B/yr. Five flows contribute nothing to any of these sums because they have no data (rows 16–19); the true pool is therefore *larger* than stated.
- **Flow base: ≈ SAR 500–850B/yr [derived].** E-commerce GMV 92–197B + delivery GMV 18–26B + intermediated premiums ~33B + brokered property sales up to 268B (brokered share unpublished; the low end assumes half) + OTA GBV ~16B + BNPL GMV 37B (partially overlapping e-commerce; excluded from the low end) + franchise system sales 56–60B + channel-routed IT 42–63B + trade-promoted CPG revenue 100–150B. Summing the conservative column gives ≈ SAR 490B; the upper column ≈ SAR 850B. Precision here would be false precision; the order of magnitude — half a trillion riyals and up — is what matters for Phase-3 flow economics.
- **Reference frame:** GASTAT's Comprehensive Economic Survey puts total business-sector operating revenues at SAR 5,292B (2023 — HIGH). The evidenced commission pool is ~0.7–1.1% of business revenues; the flow base is ~9–16%. Both ratios are sane for an economy at KSA's intermediation depth, which is a soft cross-check that the map is neither missing half the economy nor double-counting it.

What was deliberately left out: government-to-business subsidies and incentive programs (not bilateral commercial flows), construction subcontracting (progress-billing, a different product), securities brokerage and asset-management fees (exchange-settled), and wholesale trade margins as such (buy-sell margins are not commissions; only their rebate/incentive layer counts, and it is inside the FMCG row).

---

## 3. Market sizing — the software market (TAM / SAM / SOM)

### 3.1 The sizing rule this document follows

The TAM for a partner-revenue platform is *not* the commission pool. It is what the population of commission payers will pay for software that registers claims, attributes revenue, computes eligibility, and settles. We size it bottom-up from the payer universe × evidenced ACVs, then cross-check top-down. The two methods must land in the same corridor or the number is wrong.

### 3.2 Bottom-up: the payer universe

Counts from §1 sources (regulator registers, filings, market structure):

| Segment (program operators who pay commissions) | KSA logo count | Evidence anchor |
|---|---|---|
| Insurers + aggregators + top brokers | ~50 | 29 insurers/reinsurers (trade.gov/IA); ~5 aggregators; 88 brokers, top-10 = 76.4% of broker GWP |
| Marketplaces & platforms at scale (e-com, delivery, OTA, mobility, classifieds-transactional, B2B marketplaces) | 30–60 | Jahez, HungerStation, Keeta, noon, Amazon.sa, Salla/Zid merchant base operators, Almosafer/Almatar, Syarah, etc. |
| Telecom (MNO/MVNO/ISP) | ~10 | 3 MNOs + MVNOs + channels-by-stc |
| Banks, finance companies, PSPs running referral/agent programs | 60–110 | ~14 SAMA-licensed banks (local + digital, SAMA register); 76 SAMA-licensed finance cos (Jul 2026 — MED-HIGH); 27+ licensed PSPs |
| IT vendors/distributors/SIs with KSA channel programs | 100–250 | Distributor set + RHQ principals + local software vendors |
| Active franchisors (multi-unit) | 400–800 | 1,788 registered (MoC), discounted for shell/single-unit registrations |
| Developers & proptech paying recurring broker commissions | 50–150 | NHC ecosystem + listed/major developers + off-plan (Wafi) projects |
| FMCG manufacturers/distributors (rebate settlement slice) | 50–150 early | Almarai/Savola tier + multinationals' KSA entities + national distributors |
| TPAs, health, education, logistics, misc. | 30–80 | ~10 TPAs; aggregators; consolidators |
| **Core universe** | **≈ 800–1,500** | |
| Mid-market tail (smaller referral/affiliate/agent programs) | ≈ 1,500–3,500 | 10–20% incidence on 18,723 medium enterprises (Monsha'at, end-2023 — HIGH) + large-firm remainder |

**Incidence assumption, labelled:** the 10–20% partner-program incidence on medium enterprises is an analyst assumption — no KSA survey of partner-program incidence exists. It is the single most sensitive input in the SAM (±SAR 100M+ swing) and is listed in §9 as closable by primary research (a 200-firm survey).

### 3.3 Pricing anchors, from vendors' actual economics (not list prices)

- PRM/partnership platforms: PartnerStack ACVs USD 30k–100k+ (Vendr — MED) plus a 3–15% override on partner payouts (MED); Impact.com effective take ≈ 5.4% of the >USD 5B payouts it processes [derived from company releases — MED], enterprise contracts >USD 250k (LOW-MED).
- Commission/ICM software: CaptivateIQ median ACV USD 35.3k; Everstage USD 41.1k (Vendr deal data — MED); Xactly averages USD 96.7k (SMB) to USD 274.6k (enterprise) (SpendHound — MED).
- Payments-only layer: Tipalti earns ≈ 26 bps of the USD 70B it moves [derived — MED] on platform fees of USD 15–60k/yr.
- Floor: Salesforce PRM at USD 25/member/month (HIGH).

Blended KSA ACV assumptions [derived]: core logos SAR 120–300k/yr (USD 32–80k — mid-market PRM/ICM territory, defensible given compliance content); tail SAR 30–60k/yr.

### 3.4 The corridor

- **SAM [derived] = core (800–1,500 × SAR 120–300k = SAR 96–450M) + tail (1,500–3,500 × SAR 30–60k = SAR 45–210M) ≈ SAR 150–650M/yr.**
- Top-down cross-check 1: Grand View's KSA enterprise software market (USD 3.53B / SAR 13.2B, 2025 — MED) → SAM is 1–5% of enterprise software spend. Plausible for a horizontal finance-ops category.
- Top-down cross-check 2: global channel-management software ≈ USD 7.46B (Canalys 2024 — MED); KSA at ~0.6–1% of world GDP "fair share" → SAR 170–280M. Inside the corridor.
- The corridor's midpoint (~SAR 300–400M) is the honest planning number; quote the range, not the midpoint, to boards.
- **TAM (software, GCC): ≈ SAR 300M–1.3B/yr [derived]** — KSA corridor × ~2.0 GCC multiplier (§5).
- **SOM (3-year, KSA-first):**

| Scenario | Logos by Y3 | Blended ACV | ARR | What has to be true |
|---|---|---|---|---|
| Conservative | 25–40 | SAR 150–200k | **SAR 4–8M** | 6–12-month enterprise cycles; insurance wedge only |
| Base | 50–90 | SAR 180–250k | **SAR 10–20M** | Insurance + platforms + franchise; payout-override fees begin |
| Stretch | 100–140 | SAR 220–280k | **SAR 25–35M** | Category leadership; aggregator/marketplace anchor logos; GCC entry started |

The binding constraint is sales capacity and cycle time, not market room: even the stretch case captures less than a quarter of the SAM floor (SAR 35M ÷ 150M ≈ 23%) and under a tenth of the corridor midpoint.

---

## 4. Value capture — every monetization surface on the map

Seven surfaces, each with its benchmark take rate and its KSA ceiling at maturity. They stack; they do not all arrive at once.

| Surface | Mechanism | Benchmark | KSA ceiling [derived] | Gate |
|---|---|---|---|---|
| A. SaaS subscription | Platform fee per program operator | PartnerStack/ICM ACVs (§3.3) | SAR 400–650M/yr (= upper SAM) | None — day 1 |
| B. Share of payouts | 3–15% override on partner rewards processed | PartnerStack 3–15%; Impact ~5.4% effective | SAR 30–200M — 10–20% routing of a 10–20B programmatic commission base at a 3–5% effective override | Claims volume through platform |
| C. Bps on settled flow | Payments-layer margin on payout volume | Tipalti ~26 bps | SAR 13–78M at 5–10% of 100–300B flow; SAR 260–780M full-flow (implausible solo) | Open-banking PIS licensing / rail partner; ~2027+ |
| D. FX on cross-border payouts | Spread on international partner payments | Trolley 1.9–3.5%; PayPal ~3–4%; price at 0.5–1% | SAR 25–150M on SAR 5–15B cross-border flow | Cross-border corridors (RHQ/franchise/OTA segments) |
| E. Compliance add-ons | ZATCA e-invoice generation for commissions (self-billing), WHT computation/filing, IFRS-17 commission subledger, PDPL-resident deployment | per-entity SAR 20–80k/yr | SAR 20–160M on 1,000–2,000 entities | ZATCA **Wave 25** completion (1 Feb 2027) makes this table-stakes — and, by e-invoicing the payee side, makes commission self-billing verifiable |
| F. Receivables financing | Early-pay on platform-verified commission receivables; origination 0.5–1% (partner bank holds balance sheet) | SAIBOR ~4.8%, repo 4.25% falling (MED) | SAR 10–80M on SAR 2–8B financed | Verified-claims ledger + bank partnership |
| G. Data & benchmarking | Commission-rate and program-performance benchmarks | — | SAR 5–20M | Cross-tenant scale (Phase 3) |

Three second-order points on capture design (argued from the evidence, not preference):

1. **Surface B is the bridge, C is the destination, and the order is fixed by SAMA.** Payment initiation is sandbox-only as of March 2026 (first open-banking licenses were AIS-only — SPA/Pinsent Masons, HIGH), and SAMA's Open Banking Framework release 2 (Sep 2024) explicitly brings business/B2B payment initiation inside the regulated perimeter (MED — framework text relayed by multiple advisories, formal vote not completed). Until PIS rails are licensed and priced, "bps on flow" means being a regulated money handler — a different company. The override fee (B) monetizes flow *without touching money*, exactly as PartnerStack prices it.
2. **Surface E is what the global comparables cannot copy quickly.** Wave 24 pulls every VAT-registrant above SAR 375k into integrated e-invoicing by 30 June 2026 (ZATCA — HIGH). Commission settlements are VATable, self-billed supplies; WHT on cross-border payouts runs 5–20% by type (PwC — HIGH). A settlement record that natively emits compliant e-invoices and WHT computations is a regulatory artifact Impact.com/PartnerStack do not produce today (LOW — their KSA compliance roadmaps are not public; treat as a current gap, not a permanent one).
3. **Surface F prices off a falling curve.** With repo at 4.25% and SAIBOR ~4.8% (MED), 60–90-day commission receivables carry ~0.8–1.2% of value in financing cost. Real, but cyclical — treat as an attach product with a bank partner, never as the core margin.

---

## 5. Market ceiling — what "winning everything" is worth

- **KSA ceiling [derived]: ≈ SAR 0.5–1.2B/yr revenue at maturity.** The sum of surfaces A–G at dominant share: SaaS 400–650M + B 30–200M + C 13–78M + D 25–150M + E 20–160M + F 10–80M + G 5–20M, then discounted for overlap (B/C partially cannibalize; E partially bundles into A). Not a forecast — the asymptote.
- **GCC ceiling [derived]: ≈ SAR 1–2.4B/yr.** The IMF's 2025 Article IV places Saudi Arabia at about half the GCC economy (HIGH), so GDP-parity doubles the ceiling. Two sector-intensity caveats, one in each direction: UAE real-estate brokerage and remittance intensity run *above* KSA per unit of GDP (raises the multiplier); KSA's regulatory-compliance wedge (ZATCA-style clearance e-invoicing) has no exact UAE equivalent yet (lowers the differentiated share). Net: hold 2.0× as the planning multiplier with ±0.4 uncertainty.
- **What would have to be true to touch the KSA ceiling:** (a) 60–80% penetration of the ~50-logo insurance segment and 3+ of the top-10 platforms; (b) PIS-era rail partnership giving 5–10% of programmatic payout flow; (c) the compliance surface bundled into >1,000 entities. Each is independently plausible; jointly they imply category ownership over ~7–10 years.
- **The strongest reason the ceiling is unreachable:** the biggest flows belong to platforms that can build inward (Jahez, noon, Rasan run settlement as core IP), and the second-biggest sit inside three telecom operators and global TPM incumbents. If every at-scale platform self-builds, the reachable ceiling compresses toward SaaS-only ≈ SAR 300–500M. This is the bear case to underwrite, and it still supports the SOM scenarios in §3.4.

---

## 6. Second-order effects — twelve mechanism chains with dates

Each chain: verified event → operational change → consequence for the wedge. These are where the map moves over the next 24 months.

1. **ZATCA Wave 24 (deadline 30 Jun 2026 — HIGH).** Every business above SAR 375k VATable revenue must integrate with FATOORA → every B2B invoice becomes structured, cryptographically stamped data → commission claims can bind to invoice-level truth → adjudication cost per claim falls → the addressable base extends below the enterprise tier, and evidence packs become machine-verifiable. Consequence: compliance-native claims ledger stops being a feature and becomes the entry ticket; foreign PRM tools without FATOORA emission are structurally late.
2. **IA conduct regime + the 2% motor-TPL commission cap (Aug 2017, in force — HIGH) + IFRS-17.** Insurers must evidence per-policy commission computation and amortize acquisition costs → commission subledgers become audit artifacts → insurance CFOs acquire a budgeted, non-discretionary reason to buy. Consequence: the beachhead sells to compliance, not productivity.
3. **Rasan's economics are now public (FY2025: SAR 653M revenue on SAR 8.5B GWP — HIGH).** Every insurer and broker can see what aggregation takes → pressure to audit and negotiate commissions rises on both sides → both sides need the same ledger. Consequence: the aggregator is simultaneously the anchor-customer archetype and the build-inward risk; sign one early.
4. **Nusuk direct Umrah booking (from 20 Aug 2025 — HIGH) + the MoF direct-booking mandate for government flights (2024 — HIGH).** The state is disintermediating two agency ecosystems by decree → religious-travel and government-travel commissions compress toward zero → the travel wedge narrows to OTA-hotel reconciliation and corporate leisure. Consequence: do not build an Umrah-agent ICP; Saudia's 2012 commission abolition already showed the terminal state.
5. **The Keeta price war (150M+ orders in year one; Jahez net income 188M → 73M — HIGH/MED).** Merchants multi-home across three platforms → three commission statements, three deduction schemes, monthly → merchant-side commission-audit demand appears at franchise-group scale; platform-side, margin pressure pushes settlement-ops outsourcing. Consequence: the F&B franchise operator becomes a dual-flow customer (royalties inbound to franchisor + platform commissions outbound), one ledger serving both — the strongest mid-market entry in the map.
6. **Open banking sequencing (AIS licensed 26 Mar 2026; PIS sandbox-only — HIGH).** Payout rails stay bank-file/PSP-based near-term → Phase-3 bps-on-flow is gated ~2027+ → when PIS licenses land, transfer itself commoditizes within quarters. Consequence: the durable margin is in rules, ledger, and compliance, never in moving the money; partner for rails, do not become one.
7. **Rate path (repo 4.75% → 4.25% across late 2025 — MED).** Falling rates compress receivables-financing spreads → surface F shrinks as it matures → price it as an attach, revenue-share it with a bank, and never let the model depend on it.
8. **Saudization economics.** Partner-ops adjudication is manual clerical work in finance departments → Saudization raises the loaded cost of exactly this labor → automation ROI improves each year. (Directional — no public KSA wage series for partner-ops roles exists; labelled as reasoning, not measurement.)
9. **RHQ mass (600–700 licensed by late 2025 — HIGH/MED) + MISA licensing at records (14,321 licenses 2024; 7,742 in Q1 2026 alone — MED).** Foreign principals must run KSA channel programs locally, under WHT (5–20% by payment type — HIGH) and PDPL residency → cross-border payout compliance concentrates in an identifiable, well-funded population. Consequence: the RHQ cluster is the second beachhead, and surface D+E revenue attaches to it disproportionately.
10. **Franchise Law disclosure regime (in force Apr 2020; registry at 1,788 and compounding — MED-HIGH).** Royalty terms move from informal to registered → royalty settlement becomes contractual and auditable → a 400–800-franchisor segment forms with recurring, percentage-based bilateral flows. Consequence: franchise royalty settlement is the most PRM-shaped flow outside insurance and IT, at mid-market ACVs.
11. **Real Estate Brokerage Law (2.5% cap; 148k licenses — HIGH).** Commissions legally bounded and brokers licensed → co-brokerage splits and developer-to-agency programs formalize → a narrow but real settlement surface around developers and top brokerages; Ejar rails could eventually expose rental-commission data (today: absent).
12. **E-invoicing exposes the pools this document could not see.** As Wave 24+ data accumulates inside ZATCA, commission and rebate flows (marketplace fees, F&I, TPA fees) become measurable by the regulator even though they are invisible to researchers today → future policy attention (caps, disclosure) on currently opaque pools is a live possibility — as already happened to insurance TPL, airline agencies, real estate, and domestic recruitment. Consequence: regulation keeps manufacturing wedges; the map in §1 is not static.

---

## 7. ICP ranking, derived from the map

Scoring each segment 1–5 on: pool size, logo concentration, regulatory pull, data accessibility (can the product bind to invoices/policies/orders?), willingness-to-pay evidence, and competitive whitespace. Scores are analyst judgments on the §1 evidence — the inputs are cited, the weighting is ours.

| Rank | Segment | Pool | Conc. | Reg. pull | Data | WTP | Whitespace | Total /30 | The one-line case |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Insurers + aggregators (commission settlement) | 4 | 5 | 5 | 4 | 4 | 4 | **26** | SAR 3B pool, 50 logos, regulator-manufactured budget |
| 2 | RHQ / foreign principals' KSA channel programs | 3 | 4 | 5 | 3 | 4 | 4 | **23** | WHT+ZATCA+PDPL pain, funded buyers, PRM-aware |
| 3 | Franchisors (royalty settlement) | 3 | 3 | 4 | 3 | 3 | 5 | **21** | 400–800 logos, formalizing flows, no incumbent |
| 4 | Platforms/marketplaces (payout ops & audit layer) | 5 | 5 | 3 | 5 | 3 | 2 | **23**→discount to **20** for build-inward risk | Biggest flows, sharpest buyers, highest self-build risk |
| 5 | F&B franchise groups (dual-flow: royalties + platform commissions) | 3 | 3 | 3 | 4 | 3 | 4 | **20** | Mid-market wedge created by the delivery price war |
| 6 | Banks/finance/BNPL referral programs | 3 | 4 | 4 | 3 | 3 | 2 | **19** | Regulated and concentrated, but long cycles and vendor-risk gauntlets |
| 7 | Developers & top brokerages (off-plan commissions, co-broke splits) | 3 | 3 | 3 | 3 | 2 | 4 | **18** | Real pool, newly licensed ecosystem, per-deal cadence |
| 8 | Hotel groups (OTA commission reconciliation) | 2 | 3 | 2 | 3 | 3 | 4 | **17** | Clean pain, modest pool, tourism tailwind |
| 9 | FMCG distributors/mid-size mfrs (rebate settlement slice) | 4 | 2 | 2 | 3 | 3 | 2 | **16** | Huge pool, wrong category boundary — enter via distributors |
| 10 | Telecom operators (dealer commission settlement) | 3 | 5 | 2 | 3 | 2 | 1 | **16** | Three buyers, entrenched in-house; opportunistic only |

Explicitly ruled out, with reasons: domestic-recruitment offices (the state platform is the settlement layer), Umrah external agents (being disintermediated by Nusuk), airline agencies (commission model abolished 2012), media agencies (entrenched contracts, later), education agents and loyalty coalitions (no measurable KSA pool today — revisit when data exists).

The composite ICP statement the GTM manual's blank template should carry: **"KSA program operators that pay recurring, percentage-based commissions to ≥20 business counterparties under a regulator-shaped constraint (IA caps/IFRS-17, WHT, Franchise Law, ZATCA), starting with insurers/aggregators and RHQ channel principals, expanding to franchisors and platform payout-ops."**

---

## 8. Audit against the prior internal analysis (computed after the rebuild)

The prior `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` (June 2026) was not used as an input. Comparing outputs after the fact:

| Claim | Prior document | This rebuild | Verdict |
|---|---|---|---|
| L1 economic pool | ~$15–20B/yr partner-attributed *tech* revenue (top-down: IT spend × 70% channel share) | SAR 42–63B (~$11–17B) channel-routed IT [derived, same method, updated inputs]; plus a direct, whole-economy commission-pool measurement of SAR 35–60B that the prior doc estimated only as a "$40–70B whole-economy ceiling" | Tech-pool figure **holds** within error; the rebuild replaces the speculative whole-economy ceiling with twelve evidenced flows — the direction of the correction is that the *commission pool* (earnings) and the *attributed-revenue pool* (flow) must never be presented as one number |
| L2 SAM | ~$150–400M (SAR 560–1,500M), logos × $50–90k ACV | SAR 150–650M, logos × ACVs anchored to Vendr/vendor-disclosure data | Overlapping but the rebuild's **top end is ~2× lower**; prior ACV assumptions were defensible, prior logo count (2,000–4,500) roughly matches core+tail (2,300–5,000) |
| L2 SOM (3-yr) | ~$5–10M ARR (SAR 19–38M) | SAR 4–35M scenario band; base SAR 10–20M | **Consistent**; the rebuild adds explicit logo × ACV drivers per scenario |
| L3 adjacency | "≈ doubles ACV ceiling"; FX 1.9–3% | Surfaces B–G individually sized with benchmarks; ceiling math in §5 | Prior claim directionally right, **now decomposed and gated** (PIS timing was absent from the prior doc) |
| Beachhead | IT/SaaS-channel × RHQ intersection | Insurance distribution first; RHQ second; franchise third | **Changed.** The insurance pool's evidence quality (regulator data, listed-company take rates, caps, IFRS-17) beats the IT channel's (no KSA-specific channel data at all) — the prior doc under-weighted data accessibility as a wedge criterion |

Bottom line of the audit: the prior sizing arithmetic mostly survives contact with primary sources, but two things change materially — the beachhead moves to insurance, and every headline number now carries a confidence tag and a named source, which the fundraising narrative can defend line by line.

---

## 9. What we could not find, and exactly what closes each gap

| Gap | Why it matters | The closing source |
|---|---|---|
| IA 2024/2025 commissions-incurred line | Turns the SAR 3.0B insurance pool from [derived] to official | Insurance Authority Saudi Insurance Market Report PDF (ia.gov.sa) — retrievable outside this environment's proxy; table "commissions incurred" |
| noon / Amazon.sa KSA GMV & seller payouts | Halves the error bar on the largest addressable flow | Not published anywhere; best proxy: SAMA e-commerce payment series + seller-count disclosures; a 20-seller survey of effective take rates would bound it |
| Marketplace/e-commerce GMV definition conflict (92B vs 197B) | SAM row 2 swings ~2× | Ministry of Commerce / CST digital-economy reports reconcile payment-side vs GMV-side definitions |
| Dealer F&I commissions (banks → auto dealers) | Possibly a SAR 1–3B invisible pool | Bank fee-expense notes do NOT disclose it — verified by reading Riyad Bank's FY2024 note 22 directly (fee expense = card products SAR 1,146M, share brokerage SAR 104M, other banking services SAR 298M; no dealer line). Dealer commissions are capitalized into loan effective interest rates, so closing this requires SAMA disclosure requests or dealer/lender interviews, not filings |
| TPA fee rates (CCHI/IA) | Health is the biggest premium pool (SAR 42.2B) with an unsized service layer | CCHI annual report; IA licensed-companies register PDF; 3 TPA interviews |
| Ejar rental contract values | Rental commission pool now bounded at SAR 1–2.5B/yr [derived, LOW] from consumer-guide rents (§1.4); official values would firm it | REGA/Ejar data releases; average-rent series from GASTAT RPI would bound it properly |
| Telecom dealer-commission-only lines (stc, Zain) | Row 11 rests on one operator's audited ratio | stc FY notes on stc.com.sa (blocked here); investor-relations Q&A |
| Partner-program incidence among medium firms | The single most sensitive SAM input (±SAR 100M+) | 200-firm primary survey (2 weeks, one analyst) — no public source exists |
| MENA-specific trade-spend %, franchise royalty tariffs, KSA agency commission norms | Rows 7, 9, 12 rest on global norms | Trade interviews; Franchise disclosure documents now filed under the Franchise Law are inspectable at MoC |
| GCC per-flow equivalents | §5 multiplier is GDP-parity, not flow-measured | Repeat this map's method on UAE (IA-equivalent: CBUAE; DLD for real estate; company filings largely overlap) |

Method note on source access: this environment's proxy blocked direct fetches of many primary domains (ia.gov.sa, sama.gov.sa PDFs, rega.gov.sa, stc.com.sa, saudiexchange.sa, argaam.com pages). Figures from those institutions were captured through search-indexed text of the official releases and, where possible, audited-filing PDFs mirrored on Argaam's public document store, and are tagged accordingly. Every such figure should be re-verified against the primary PDF before external (investor/regulator) use.

---

*Prepared 15 July 2026. FX SAR 3.75/USD throughout. All [derived] figures show their arithmetic at first use; confidence tags follow each external figure. Conflicting sources are reported side by side in §1 and never averaged.*
