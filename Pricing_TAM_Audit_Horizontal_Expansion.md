# Pricing × TAM Audit — Does Our Pricing Fit (and Grow) a Horizontal, Multi-Region TAM?

**Date:** 2026-06-13 · **Scope:** Audit the Partner Revenue OS ("Reven") pricing structure and every pricing element against the strategic mandate below, and recommend changes where pricing fights the mandate.

**Strategic mandate being tested (from leadership):**
1. We must **not** be identified or positioned as **vertical SaaS**.
2. We **expand vertically only when the needs of partner revenue / revenue-sharing between B2B businesses and entities demand it** (vertical depth is on-demand, not the strategy).
3. Our **entry and expansion is horizontal** — every sector, and every **GCC + MENA + Europe + North American** market that has entities doing partnerships.

> **Method & confidence.** This audit triangulates our internal pricing/TAM corpus (`Reven_Pricing_*`, `Partner_Revenue_OS_Pricing_*`, `Saudi_Value_Pool_*`, `partner-revenue-os-PDR-v5.md`) against ~150 external sources gathered in five parallel research streams. External figures are source-graded **[A]** top-tier (Gartner, IDC, Forrester, Grand View, McKinsey, Allied, government/regulator) · **[B]** mid-tier · **[C]** SEO "report-mill" (directional only). Where category numbers diverge >10×, the divergence is flagged and the defensible figure used. Internal numbers marked `[Assumption→validate]` in source docs are **not yet proven** and are treated as hypotheses.

---

## 0. Verdict (read this first)

**Our pricing *architecture* is right for horizontal expansion. Our pricing *framing, denomination, TAM, and growth motion* are still built for a single-country (KSA) wedge.** The two are now in tension, and that tension is exactly what leadership's mandate exposes.

| | Current state | Fits the horizontal/global mandate? |
|---|---|---|
| **Value/invoice metric** — per *active (transacting) partner*, unlimited seats | Sector-agnostic, predictable, grows with the customer | ✅ **KEEP** — already horizontal-ready |
| **Refusing the early/uncapped take-rate** | % refused early, capped bps only late | ✅ **KEEP** — validated by the market |
| **Hybrid + modular packaging** (Operations→Control→Orchestration→Ecosystem) | Floor + modules + late usage | ✅ **KEEP** — this is the TAM-maximizing shape |
| **TAM model** | Sized **KSA-only** (~$15–20B pool → ~$200M SAM → $5–10M SOM) | ❌ **FIX** — single-country TAM cannot underwrite a 4-region horizontal thesis |
| **Denomination & compliance load** | **SAR-quoted**, ZATCA/WHT/Sharia-loaded | ❌ **FIX** — this is a GCC *wedge*, not a global *frame*; reads as "vertical-by-geography" |
| **What we actually meter** | Active-partner *count* only (volume/RUM deferred & contested) | ⚠️ **EVOLVE** — count tracks customer headcount, not value flowing; the TAM *multiplier* (economic activity) is left on the table |
| **Growth motion** | Founder-led, services-heavy, $6–50K, ~20-mo payback | ❌ **FIX** — cannot execute "every sector × 4 regions"; add PLG self-serve entry |

**Bottom line:** keep the spine, re-base the TAM globally, de-localize the frame (multi-currency + compliance-as-module), add a *non-custodial* volume layer to capture the economic-activity TAM multiplier without the take-rate failure modes, and add a self-serve entry to make horizontal reach affordable. Five concrete changes in §11.

---

## 1. What we price today (the as-is)

From `Reven_Pricing_Architecture_Deep_Research.md`, `Reven_Pricing_Executive_Summary.md`, `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`:

- **Model:** hybrid platform subscription, billed on **active (transacting) partners in bands × capability tier**, **unlimited internal seats**, annual prepaid above an ACV floor, **stackable GCC compliance premium (L0→L3)**, fenced implementation fee, flat per-payout rail fee (late), and a **capped, Sharia-structured bps-on-revenue-under-management layer reintroduced only late**.
- **Value metric (North Star):** *trusted partner-attributed revenue realized*. **Invoice unit:** *active (transacting) partners*. **Expansion layer:** payouts processed, revenue events, then (late, capped) bps on RUM.
- **Tiers (SAR):** SME `600–1,788/yr` → SMB `67–150K` → Mid-market `188–450K` → Semi-gov `600K–2.5M+` → Enterprise `560K–1.9M+`.
- **Denomination/tax:** quoted in **SAR**, VAT-inclusive 15%; WHT-royalty trap (15% if the fee is characterised as a royalty vs 5% service vs 0% business-profit).
- **Stated philosophy:** "Sell like the PRM category the Head of Partnerships already budgets for… per *active partner*, unlimited seats," and **refuse the resented % -of-payout model** at the moment finance is most price-sensitive.
- **TAM (from `Saudi_Value_Pool_*`):** Layer 1 ~**$15–20B** KSA partner-attributed revenue → Layer 2 software SAM ~**$150–400M (base $200M)** → 3-yr SOM ~**$5–10M ARR**. **US/EU explicitly deferred** as "entrenched."
- **Documented red-team weaknesses** (`Partner_Revenue_OS_Pricing_Strategy_Red_Team.md`): the **ACV/motion "valley of death"** ($6–50K on a services-heavy, two-buyer, sales-led motion → ~20-mo payback); the **bps endgame is inconsistent** (targets 25–60 bps net vs Adyen's blended ~15.5 bps for a non-custodian); the **seat→payments→network "business-model wedge" is "the failing kind" (3 different P&Ls)**; and **NRR ≥120% has no base-rate support** (median ~101%).

---

## 2. The audit, finding by finding

### Finding 1 — The value metric is already horizontal-ready. **KEEP.**

"Per active (transacting) partner, unlimited seats" passes Kyle Poyar's three-part value-metric test (grows with the customer; communicates value; predictable) **and is identical in definition across every sector and region** — a retailer in Riyadh, a SaaS vendor in Berlin, a distributor in Toronto all have "active partners." That is precisely the sector-agnostic spine horizontal platforms are built on (Stripe = % of transaction; Shopify = % of GMV; Rippling = per employee), where verticals are reached through **modules, not re-pricing** ([a16z](https://a16z.com/fintech-scales-vertical-saas/); [Tanay Jaipuria](https://www.tanayj.com/p/the-evolution-of-saas-companies); [SaaStr/Parker Conrad](https://www.saastr.com/rippling-ceo-parker-conrads-theory-of-the-compound-startup/)). **No change needed — this is the asset the rest of the fix is built around.**

### Finding 2 — Refusing the *early/uncapped* take-rate is validated by the market. **KEEP (with nuance in Finding 4).**

The competitor scan confirms our instinct: pure PRMs (ZINFI, Channeltivity, Kiflo, Allbound/Channelscaler, Zift) take **no revenue share** and bill flat/per-partner-band; **Partnero actively markets "0% take-rate" as a wedge** ([Partnero](https://www.partnero.com/pricing)); and the only %-of-partner-revenue players — **PartnerStack** (~1–3% of partner revenue **plus** a 3–15% override on commissions) and **Impact.com** (~2.5% on partner-driven sales) — are the most criticised for it ([Affonso](https://affonso.io/blog/partnerstack-pricing-guide); [Uppercut](https://uppercut.co/blog/impact-com-pricing)). Leading with subscription (not a rake) is correct, and in the GCC it is also *de-risking* (see Finding 4). **Keep the refusal as a wedge — but don't let it foreclose the TAM multiplier.**

### Finding 3 — The TAM is single-country; a horizontal, 4-region thesis needs a re-based TAM. **FIX.**

Our docs size TAM **for KSA only** and **defer US/EU**. That is internally coherent for a beachhead, but it directly contradicts mandate #3 — and the red-team's sharpest point lands here: **zero of MENA's ~8 unicorns (2020–H1 2025) is a horizontal B2B SaaS**, so a KSA-only frame cannot underwrite a venture-scale outcome. The horizontal/global posture is not a nice-to-have; **it is the thing that makes the TAM large enough to matter.**

There is **no named "B2B revenue-sharing platform" market** (itself a category-creation narrative), so the defensible TAM is built bottom-up from adjacent software-only segments:

| Layer | Segments | Size (today) | Growth | Source grade |
|---|---|---|---|---|
| **Core SAM (the literal product)** | PRM software **~$3.5B** + affiliate/referral software **~$3.5–4B** + through-channel marketing automation **~$1.1B** | **~$8–10B** | ~12–16% CAGR → ~$20B+ by 2030 | [A]/[B] |
| **Adjacent TAM (revenue-sharing/payouts angle)** | + AP-automation/B2B-payments **~$7B** + RevOps **→ ~$15B by 2030** | **+~$22–30B** | 12–15% | [A] |
| **Outer ceiling (umbrella only)** | Global enterprise-app SaaS **$218B (Gartner 2024)**; global SaaS **$399B→$819B by 2030** | — | 12% | [A] |

**Regional shape of that SAM** (why horizontal-across-regions *adds* denominator rather than diluting it): North America = **44% of global SaaS**, Europe = **24%**, and **GCC is the fastest-growing at ~18% CAGR** (≈1.5× global), with MEA enterprise software **$10.5B→$21.4B by 2030** ([Grand View](https://www.grandviewresearch.com/horizon/outlook/software-as-a-service-saas-market/north-america); [Grand View MEA](https://www.grandviewresearch.com/horizon/outlook/enterprise-software-market/mea)). **A KSA-only frame addresses a low-single-digit-% slice of the reachable market; the horizontal frame is ~50× larger.**

> ⚠️ **Data-quality guardrails for any external deck:** do **not** cite the circulating "$38.35T affiliate market" (a data error) or Grand View's **$90B "PRM"** headline (services-inclusive — misrepresents the software SAM). PRM estimates span ~100× by scope; always state the scope alongside the number.

**Implication for pricing:** the TAM is unlocked by *coverage* (sectors × regions) on **one constant price spine**, not by per-sector or per-country price lists. The pricing must therefore be re-expressed in global terms (Findings 4–5) for the TAM in this section to be real.

### Finding 4 — Pricing is SAR-denominated and GCC-compliance-loaded: a wedge, not a global frame. **FIX.**

Today the list price is in **SAR**, and the compliance ladder (ZATCA/WHT/PDPL/Sharia) is woven into the tier value. For a beachhead that's a strength; for a horizontal/global identity it **reads as "vertical SaaS by geography"** — the exact label mandate #1 forbids. The regional research says the model should **flex by region while the spine stays constant**:

| Dimension | GCC (KSA/UAE) | Europe | North America |
|---|---|---|---|
| **Quote in** | **SAR/AED** (localizing lifts close rates **+15–25%**) | **EUR** (regional pricing ≈ **+25% rev/customer**) | **USD** |
| **Most-accepted model** | Subscription / fee-on-volume (custodial take-rate is **license-gated** by SAMA & CBUAE RPSCS) | Subscription + usage (custody → PSD2 PI/EMI) | **Take-rate / usage culturally accepted** (PayFac vs state MTLs) |
| **Tax to price around** | KSA VAT 15% / UAE 5%; **KSA WHT 15% royalty vs 5% service vs 0% business-profit — decided by contract drafting** | VAT, B2B reverse-charge / OSS; ViDA e-invoicing → 2030 | Sales tax; **$100k/200-txn economic nexus**; marketplace-facilitator laws |
| **E-invoicing** | **ZATCA Phase 2 live, near-universal** | ViDA DRR phasing | none (nexus self-assessment) |

Sources: [Monetizely localization](https://www.getmonetizely.com/articles/how-can-saas-companies-master-pricing-localization-for-global-success), [SAMA rulebook](https://rulebook.sama.gov.sa/en/law-payments-and-payment-services), [CBUAE RPSCS](https://rulebook.centralbank.ae/en/rulebook/retail-payment-services-and-card-schemes-regulation), [DLA Piper KSA software-payments WHT](https://www.dlapiper.com/en/insights/publications/gulf-tax-insights/2024/gulf-tax-insights-february-2024/taxation-of-software-payments-in-saudi-arabia), [Tax Foundation US nexus](https://taxfoundation.org/data/all/state/economic-nexus-by-state-2024/), [ECB SEPA Instant](https://www.ecb.europa.eu/paym/retail/instant_payments/html/instant_payments_regulation.en.html).

**Fix:** publish **multi-currency list pricing (USD anchor + EUR + SAR + AED)**; recast the GCC compliance ladder as **one of several regional compliance *modules*** (a "GCC pack" alongside an "EU ViDA/SEPA pack" and a "NA nexus/PayFac pack"), so compliance is an *add-on that travels*, never the product's identity. **Structurally, this is the single most important move to stop looking like vertical-by-geography SaaS.**

### Finding 5 — "Active partners" under-captures the TAM *multiplier*. **EVOLVE — add a non-custodial volume layer.**

Billing on partner **count** scales with the customer's headcount of partners (~GDP-like), whereas the documented TAM expanders — and the strongest external evidence — point to monetising **economic activity** (revenue processed / payouts / transactions): a16z finds embedding the money layer **expands a market's TAM 2–5×**; usage-based companies run **120–130%+ NRR vs ~110%** seat-based, and **~32–40% of growth** comes from expansion ([a16z](https://a16z.com/fintech-scales-vertical-saas/); [OpenView/EasyVC](https://easyvc.ai/blog/openview-saas-webinar-the-latest-insights-benchmarks-takeaways/); [Monetizely land-and-expand](https://www.getmonetizely.com/articles/land-and-expand-pricing-models-that-support-upsells-and-expansion-revenue)).

**This is the crux that resolves the internal contradiction.** Our red-team is right that a **custodial % -of-payout / bps-on-RUM rake is a trap** (resented; 25–60 bps net is *above* Adyen's ~15.5; license-gated by SAMA/CBUAE/PSD2/MTLs; WHT-royalty and Sharia exposure; "3 P&Ls" business-model wedge). The external research is *also* right that monetising economic activity is the TAM multiplier. **Both are satisfied by a non-custodial, metered SaaS usage layer:**

- Meter on **volume processed through the system of record** (revenue-events reconciled / payouts orchestrated / GMV attributed) **as a software fee** — characterised as business-profit software access, **not** a royalty (protects the KSA 0–5% WHT treatment), and **without holding funds** (stays outside SAMA/CBUAE/PSD2/MTL money-transmission perimeters; move money via licensed PSP partners — Stripe Connect/Tipalti/local PSP — and pass through a thin transparent rail fee, never a rake competing with Adyen).
- Wrap it in the trust mechanics that make usage pricing work: a **predictable platform-fee floor + a metered value layer + spending caps/transparent example bills** (the dominant hybrid shape — ~61% of SaaS, and hybrids report ~38% higher growth/NRR) ([SaaS Mag](https://www.saasmag.com/hybrid-pricing-saas-growth-2026/)).

Net: **keep active-partner as the buyer-friendly primary invoice unit** (it lands the PRM wedge and is license-safe), and **add an optional, capped, non-custodial volume meter as the expansion vector** — capturing the economic-activity TAM upside without any of the red-team's failure modes.

### Finding 6 — The ACV/motion "valley of death" caps horizontal reach. **FIX — add PLG self-serve entry + enforce the ACV floor.**

You cannot enter "every sector × 4 regions" on a founder-led, services-heavy motion selling $6–15K deals at ~20-month payback — the red-team correctly calls this the most concrete arithmetic flaw in the plan. The horizontal mandate *requires* a low-CAC funnel: **PLG self-serve at the bottom (formalise the near-free SME tier into a true self-serve/PLG entry), sales-assist above the ACV floor (~$25–30K).** PLG drives **2–3× growth at lower CAC**; pure self-serve scales to ~$50M ARR, with sales-assist layered $10–50M ([OpenView PLG](https://openviewpartners.com/blog/your-guide-to-product-led-growth-benchmarks/); [SaaS Mag PLG 2026](https://www.saasmag.com/product-led-growth-next-chapter-saas-2026/)). This simultaneously **fixes the payback math and is the mechanism for horizontal breadth.** Pair it with: enforce the ~$25–30K high-touch floor (no two-buyer services motion below it), and keep services <20% of revenue and fenced.

---

## 3. Positioning guardrails so pricing never reads as "vertical SaaS"

1. **Lead the pricing page with the sector-agnostic spine** (active partners + optional volume), under a horizontal category ("the system of record for partner revenue & revenue-sharing between businesses") — never a vertical label.
2. **Express every vertical as a module, not a price list.** Insurance commission/clawback, fintech agent-network rev-share, IT-channel co-sell, Sharia revenue-share = **add-on modules invoked "only as partner-revenue needs demand"** — which is literally mandate #2. **Never publish per-vertical pricing** (fragmentation is a documented pitfall; keep to 3–4 tiers + a uniform metric).
3. **Express every region as a compliance/payments module** on the same spine (GCC pack / EU pack / NA pack). The constant spine + light regional & vertical packaging is the Stripe/Ramp/Rippling pattern that scales horizontally.

---

## 4. Recommended pricing architecture (the to-be)

**Spine (global, constant in every sector & region):**
- **Primary invoice unit:** active (transacting) partners, in bands, **unlimited internal seats**.
- **Floor:** predictable annual platform fee per tier (CFO-friendly, forecastable).
- **Capability tiers (packaging, not pricing-by-vertical):** Operations → Control → Orchestration → Ecosystem Enterprise.

**Expansion vectors (land-and-expand on the same spine):**
- **Non-custodial volume meter** (revenue-events / payouts orchestrated / attributed GMV) — capped, transparent, software-characterised. *This is the TAM multiplier.*
- **Modules:** statements, disputes, analytics, multi-entity, data/benchmark licensing.
- **Regional packs (modules):** GCC compliance (ZATCA/WHT/PDPL/Sharia) · EU (ViDA/SEPA/reverse-charge) · NA (sales-tax nexus/PayFac).

**Motion & commercials:**
- **PLG self-serve entry** (formalised SME tier) → **sales-assist above ~$25–30K ACV floor**.
- **Multi-currency list:** USD anchor + EUR + SAR + AED; localize tax display.
- **Money movement** via licensed PSP partners + thin transparent rail fee — **never a custodial rake**.
- **Plan NRR at 105% base / 115% bull** (not 120%+), per the red-team correction.

**Explicitly do NOT:** pursue a custodial % -of-payout/bps-on-RUM rake as the growth engine; gate near-zero-cost basics (SSO/audit logs) to force upgrades; or build per-vertical/per-country price lists.

---

## 5. The TAM number to put in the deck (re-based for the mandate)

- **SAM (literal product, software-only):** **~$8–10B today → ~$20B+ by 2030** (PRM + affiliate/referral + TCMA), all [A]/[B] sources, scope stated.
- **Adjacent TAM (revenue-sharing/payouts):** **+~$22–30B** (AP-automation + RevOps).
- **Outer ceiling (umbrella only):** global enterprise SaaS **$218B** (Gartner 2024).
- **Regional wedge story:** GCC ~18% CAGR (fastest), MEA enterprise software $10.5B→$21.4B by 2030; expansion into EU (24% of global SaaS) and NA (44%) is what turns a ~$200M KSA SAM into a multi-billion reachable SAM. **The horizontal mandate is the TAM thesis.**

---

## 6. Risks, contradictions, and confidence

- **Resolved contradiction:** red-team "no take-rate" vs external "take-rate is the TAM multiplier" → reconciled via a **non-custodial, capped, software-characterised volume meter** (Finding 5). This is the highest-leverage recommendation and the one most worth pressure-testing with tax counsel (KSA WHT characterisation) and a payments lawyer (SAMA/CBUAE/PSD2/MTL perimeter).
- **Execution risk (real):** horizontal "boil the ocean" fails wide-and-shallow; the mitigation is *architecture horizontal, entry deliberate* — beachhead first, but on a price spine that already travels. PLG + land-and-expand keeps CAC sane.
- **Confidence:** internal pricing/TAM extraction = **high** (direct from docs, file-cited). External market sizes = **medium** (category divergence up to ~100×; software-only anchors and [A] sources used; two report-mill figures explicitly excluded). Strategy claims (a16z 2–5× multiplier; usage-NRR premium; hybrid dominance) = **high** (consistent across multiple strong sources).

---

## Sources (external, deduplicated)

**TAM / market size:** Grand View (PRM, SaaS, MEA enterprise software, NA/EU SaaS, AP automation, RevOps) · Gartner (enterprise-app SaaS $218B; IT spend 2026) · Allied (RevOps) · Fact.MR (PRM software) · Research & Markets (affiliate platform; channel marketing) · Forrester/Jay McBain (75% of trade is indirect) · BlueWeave/MarkNtel/Ken (GCC SaaS & Saudi cloud).
**Competitor pricing:** PartnerStack ([Affonso](https://affonso.io/blog/partnerstack-pricing-guide)), Impact.com ([Uppercut](https://uppercut.co/blog/impact-com-pricing)), Crossbeam, Allbound/Channelscaler, ZINFI, Channeltivity, Kiflo, Magentrix, Zift, WorkSpan, Partnero, TUNE, Everflow, Tipalti, Tremendous, Stripe/Connect, Snowflake, Twilio, Salesforce, HubSpot; take-rate benchmarks (CRV, Origami, Tidemark, WallStreetPrep).
**Horizontal vs vertical & value metric:** a16z (fintech scales vertical SaaS; embedded-fintech TAM 2–5×) · Tidemark (market-structure/operational-TAM; marketplace take-rates) · Bessemer (AI pricing; state of cloud) · OpenView/Kyle Poyar (usage-based 2.0; value-metric test; PLG benchmarks) · Stripe (usage-based pricing) · Tanay Jaipuria (seats→take-rate) · SaaStr/Rippling (compound startup).
**TAM-expanding pricing:** OpenView/High Alpha & Chargebee (hybrid ~61%; +38% growth/NRR) · m3ter/IdeaPlan/Fullview & Snowflake 10-Q (usage NRR 120–130%+) · Monetizely/Prospeo (expansion = 32–40% of growth; modular +35%) · BillingPlatform/Zuora (consumption floors).
**Regional / tax / rails:** Monetizely (localization +15–25% / +25% rev/customer) · SAMA & CBUAE rulebooks (payment licensing) · DLA Piper/KPMG/PwC (KSA WHT software-payments) · ZATCA/Sovos (e-invoicing) · ECB/EPC (SEPA Instant) · EU Commission (ViDA) · Tax Foundation/Avalara (US nexus) · Cognitive/Grand View/ITP (GCC-MEA SI & distributor economy).

*Full URL list is preserved in the research run; figures graded [A]/[B]/[C] in-line. Several [A] publisher pages (Gartner, Grand View, a16z, OpenView, High Alpha) return 403 to automated fetch — exact decimals should be confirmed on-page before external publication.*
