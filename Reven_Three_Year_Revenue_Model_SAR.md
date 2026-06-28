# Reven — Three-Year Revenue Model (SAR)

**Document type:** Bottom-up revenue + cost model, data-room draft.
**Currency:** SAR, **net of 15% VAT**. **As-of:** 2026-06.
**Headline scenario:** *Conservative.* Two upside scenarios (Base, Bull) shown as sensitivity.

> **Fact hygiene — read this first.** Every quantitative figure below is a **founder-set
> assumption or an analyst derivation — not a fact, not a booking, not a signed contract.**
> Tier prices are taken from `Reven_Pricing_Executive_Summary.md` (themselves *benchmarked
> recommendations to validate*). Adoption counts, conversion rates, ACV positioning, retention,
> and costs are explicit modeling inputs chosen by the founder and are labelled as such. This
> model is decision-framing for an investor conversation; it is **not** a forecast the company
> can yet stand behind on evidence. The pre-seed round exists precisely to convert these
> assumptions into validated numbers (see §9).

---

## 1. The motion in one line

**Land free → convert on proven value → expand (NRR).** Adoption is acquired cheaply (self-serve
SMEs) and freely (signed, success-gated pilots above SMB); revenue is produced by **conversion**
of those pilots to paid and **expansion** within the converted base. *"1,000 entities" is an
adoption metric, not a contract count* — revenue is concentrated in a small minority of logos.

---

## 2. Locked inputs (founder-set assumptions)

| Input | Value | Source / note |
|---|---|---|
| **SME price** | **SAR 600/yr** (SAR 50/mo per entity) | Published SME floor (`Pricing` §2); unlimited internal seats, priced per entity |
| **Conversion (headline)** | SMB **30%** · Mid **25%** · Semi-gov **20%** · Ent **20%** | Conservative case |
| **Landing ACV (low band)** | SMB **SAR 70K** · Mid **SAR 200K** · Semi-gov **SAR 700K** · Ent **SAR 560K** | Bottom of each tier band (`Pricing` §2) |
| **Net revenue retention (NRR)** | **120%** | Conservative; expansion = bands → compliance ladder → entities → settlement |
| **Free model above SMB** | **"Free-with-a-signature"** | Signed paid order, free ramp, success-gated auto-conversion |
| **Free ramp length** | SMB 3 mo · Mid 6 mo · Semi-gov/Ent 6–9 mo | Time-boxed; conversion trigger = recovered value > license cost |
| **Gross margin** | **75%** | ≥70% blended-GM hard floor (`Pricing` §4) |
| **Scope** | Revenue **+ costs** (margin, CAC payback, break-even) | Per founder selection |

---

## 3. The adoption pyramid (end-of-year entity counts)

The 1,000-entity Year-2 target is a **power-law**: it is reached on the back of self-serve SMEs
(near-zero cost to serve), **not** on the expensive top tiers.

| Tier | End Y1 | End Y2 | End Y3 | Cost to serve | Free strategy |
|---|---:|---:|---:|---|---|
| SME (self-serve, paid) | 100 | 820 | 2,050 | ~zero | Paid self-serve, infinite scale |
| SMB (Growth) | 10 *(free)* | 130 | 330 | Low | 3-mo free pilot |
| Mid-market | — | 35 | 90 | High | Capacity-capped free PoV |
| Semi-gov | 2 *(free)* | 12 | 22 | Very high | Capped, sign-before-free |
| Large enterprise | — | 3 | 8 | Very high | Capped, sign-before-free |
| **Total entities** | **112** | **1,000** | **2,500** | | |

*Year-3 entity counts are an assumed continuation of the monthly acquisition cadence; they are
the least-evidenced inputs in the model.*

---

## 4. Paid logos and exit ARR — Conservative (headline)

Paid logos = entities × conversion rate (SME converts directly as paid self-serve; SMB+ convert
from free pilots at the conservative rates).

### 4.1 Paid logos (end of year)

| Tier | End Y1 | End Y2 | End Y3 |
|---|---:|---:|---:|
| SME | 100 | 820 | 2,050 |
| SMB (30%) | 0 *(free)* | 39 | 99 |
| Mid (25%) | — | 9 | 23 |
| Semi-gov (20%) | 0 *(free)* | 2 | 4 |
| Ent (20%) | — | 1 | 2 |
| **Paid logos** | **100** | **871** | **2,178** |

### 4.2 Exit ARR (run-rate at year end, SAR)

| Tier | End Y1 | End Y2 | End Y3 |
|---|---:|---:|---:|
| SME (×600) | 60,000 | 492,000 | 1,230,000 |
| SMB (×70K) | 0 | 2,730,000 | 6,930,000 |
| Mid (×200K) | — | 1,800,000 | 4,600,000 |
| Semi-gov (×700K) | 0 | 1,400,000 | 2,800,000 |
| Ent (×560K) | — | 560,000 | 1,120,000 |
| Subtotal | **60,000** | **6,982,000** | **16,680,000** |
| + NRR expansion on retained base | — | (in Y3) | ~1,300,000 |
| **Exit ARR** | **~SAR 0.06M** | **~SAR 7.0M** | **~SAR 18.0M** |

**Concentration:** at end of Year 2, the ~51 paid SMB-and-above logos drive **~93%** of ARR; the
820 SMEs are ~7%. *SME is adoption fuel, not the revenue line.*

### 4.3 Recognized revenue (in-year, SAR)

Conversions and adds ramp through each year, so recognized (in-year) revenue is well below exit ARR.

| | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|
| **Recognized revenue** | ~SAR 0.04M | **~SAR 3.3M** | **~SAR 12.5M** |
| Exit ARR (for reference) | ~SAR 0.06M | ~SAR 7.0M | ~SAR 18.0M |

> **Year 1 is, by design, a near-zero-revenue land year** — only the self-serve SME line bills;
> the 10 SMB and 2 semi-gov pilots are free. This is consistent with the pre-seed model's
> deliberate "zero-revenue runway" assumption (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`).

---

## 5. Sensitivity — three scenarios (exit ARR, SAR)

Same adoption pyramid; conversion **and** ACV positioning flexed together.

| Scenario | Conv. (SMB/Mid/Semi-gov) | ACV band | **Y1** | **Y2** | **Y3** |
|---|---|---|---:|---:|---:|
| **Conservative** *(headline)* | 30 / 25 / 20% | Low | ~0.06M | **~7.0M** | **~18M** |
| **Base** | 50 / 40 / 35% | Mid | ~0.06M | ~16.2M | ~40M |
| **Bull** | 65 / 55 / 50% | Premium | ~0.06M | ~32M | ~80M* |

\* Bull Year 3 includes the **settlement/payout (L3) attach** beginning to land, which the
value-pool analysis estimates *"roughly doubles the ACV ceiling per logo."*

**The single biggest swing variable is conversion rate** — it is what the free-pilot program is
built to prove. Year 1 is identical across all scenarios (free land year).

---

## 6. Revenue + costs — operating picture (Conservative, SAR)

### 6.1 Cost assumptions

| | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|
| Headcount (approx.) | 10 | 20–25 | 35–45 |
| **Total cash operating cost** | **~1.9M** | **~5.5M** | **~10.0M** |
| Funded by | Pre-seed SAR 2M | **Seed (required)** | **Series A (required)** |

Year-1 cost is the pre-seed deployment (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`). Year-2/3
costs are assumptions reflecting the team scale needed to acquire 1,000→2,500 entities and to
**serve the free enterprise pilots** (Solution Architect, CSM, implementation, residency).

### 6.2 Operating cash result (recognized revenue − total cash cost)

| | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|
| Recognized revenue | ~0.04M | ~3.3M | ~12.5M |
| Total cash cost | ~1.9M | ~5.5M | ~10.0M |
| **Operating cash result** | **−1.9M** | **−2.2M** | **+2.5M** |
| Cumulative | −1.9M | −4.1M | −1.6M |

**Break-even:** the Conservative case turns **operating-cash-positive in Year 3** (≈ +SAR 2.5M),
with cumulative losses recovered early Year 4. In the Base case, break-even pulls into **mid-Year 3**.

> **Capital implication — state this plainly to the investor.** The SAR 2M pre-seed funds **Year 1
> only.** Year 2 carries a ~SAR 2.2M operating loss → a **seed round is required**. Year 3 is
> operating-positive in the Conservative case, but funding the 2,500-entity scale-up implies a
> **Series A**. This model is *not* self-funding from the pre-seed alone.

### 6.3 CAC payback (the discipline that makes "free" safe)

Under "free-with-a-signature," CAC = cost to serve the free ramp + sales effort.

| Tier | Est. CAC (free ramp + sales) | Gross/yr at conversion (ACV × 75%) | Payback (post-conversion) |
|---|---:|---:|---|
| SMB | ~SAR 20–40K | ~SAR 52.5K | < 12 months |
| Semi-gov | ~SAR 200–350K | ~SAR 525K | ~5–8 months *if it converts* |

**The risk lives in the expensive tiers.** At 20% semi-gov conversion, you serve ~5 free pilots
for every paid one — so *blended* CAC across all pilots is several times the per-deal figure.
Mitigations (non-negotiable):
1. **Sign-before-free** above SMB — a signed paid order with a free ramp, not an open giveaway.
2. **Cap concurrent free enterprise pilots** to what the SA/CSM bench can serve — this capacity,
   not demand, is the real Year-2 constraint.
3. **Instrument a value meter** in every pilot; convert when recovered leakage > annual ACV
   (purchase becomes self-funding — the ROI story in `Pricing` §6).
4. Track **land-to-convert %** per cohort as the kill metric.

---

## 7. The conversion engine (how free becomes a revenue line)

```
LAND (free)  →  ACTIVATE (ledger live, attribution running)  →
PROVE (quantify SAR leakage recovered / disputes killed / hours saved)  →
CONVERT (recovered value > annual ACV → deal is self-funding → invoice)  →
EXPAND (partner-bands → compliance L1→L2→L3 → entities/countries → settlement fee)
```

- **Conversion is mechanical, not emotional:** the trigger is a value threshold, evidenced by the
  in-product meter — not a hopeful upsell email.
- **Expansion (NRR) is the second revenue line** and the venture-scale multiplier: the compliance
  ladder (+15–30% at L2 residency), additional entities (the family-conglomerate lever), and the
  **settlement/payout attach** that uncaps ACV. Target NRR 120% (Conservative) → 130–140% (upside).

---

## 8. Two operating tracks (monthly cadence)

| Track | Tiers | Motion | Constraint |
|---|---|---|---|
| **PLG** | SME | Self-serve signup, no humans | ~zero marginal cost; scales freely |
| **Sales-assisted** | SMB+ | Monthly cohorts of signed, value-gated free-ramp pilots | SA/CSM serving capacity |

---

## 9. What must be validated to harden this model (pre-seed milestones)

| Assumption | Test | If wrong |
|---|---|---|
| Buyers pay ≥ SAR 70–110K finance-grade ACV from a real budget line | 3–5 paid conversions out of the free pilots | Re-baseline to an SMB-priced tool |
| Free pilots convert at ≥ conservative rates (30/25/20%) | Land-to-convert % per cohort | Slow the cohort cadence; fix the value meter |
| Free enterprise pilots can be served within ≥70% blended GM | Loaded cost-to-serve model on live pilots | Cap free seats; raise price; decline sub-scale gov deals |
| Monthly acquisition reaches 1,000 entities by end Y2 | Actual add rate vs plan | Re-shape the pyramid toward self-serve SME volume |

---

## 10. One-paragraph investor summary

> "Year 1 is a deliberate free land year — about **SAR 60K** from self-serve SMEs, with SMB and
> semi-government adopted free (on signed, success-gated orders) to prove finance-grade value.
> In Year 2 we scale to **1,000 entities** — overwhelmingly low-cost self-serve SMEs — and convert
> the SMB-and-above pilots on a value gate, reaching **~SAR 7M exit ARR** (conservative;
> ~SAR 16M base case), ~SAR 3.3M recognized in-year, with ~93% of revenue from ~50 paid logos.
> Year 3 reaches **~SAR 18M exit ARR** (conservative) and turns operating-cash-positive, scaling
> to ~SAR 40M in the base case as expansion and the settlement attach engage. The free tier is not
> lost revenue — it is pre-committed customer-acquisition cost. The model assumes a **seed round to
> fund Year 2 and a Series A to fund the Year-3 scale-up**; the pre-seed funds Year 1 only."

---

*All figures are founder-set assumptions and analyst derivations for decision-framing — not
forecasts, bookings, or an offer. Tier prices are benchmarked recommendations to validate.
Supersede only with an explicitly dated revision. See `Reven_Pricing_Executive_Summary.md`,
`Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`, and
`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` for the underlying inputs.*
