# Trend 02 — Cloud marketplaces are turning partnerships into formal procurement and billing channels

| | |
|---|---|
| **Class** | Market-making — with one narrow competitive danger |
| **Use it for** | Proof that intermediated revenue wants a settlement substrate. Not for differentiation |
| **Dated clock** | None |
| **One line** | Platforms have converted partnership from a relationship into a billed, settled, take-rated transaction — and the remittance file that comes back reconciles to nothing |

> **Restate the trend before using it.** As written it is software-only. **The general form is bigger and applies across the whole book: platform intermediation is formalizing commercial relationships into billed, settled, take-rated transactions.** Cloud marketplaces are one instance.

---

## The claim

Platforms have inserted themselves between supplier and customer, turning a handshake into a transaction with a purchase order, a billing record, a take rate and a contractual settlement.

---

## Rationale — why it is true

**The general case, across sectors.** OTAs did this to hotels. Insurance aggregators and bancassurance did it to brokerage. Marketplaces did it to retail. Delivery platforms did it to restaurants. Cloud marketplaces did it to software. In every case the intermediary relationship acquired a formal billing rail and a deducted fee.

| Sector instance | KSA anchor | Confidence |
|---|---|---|
| Retail marketplaces | Salla ~68–80k merchants, ~$13.3bn cumulative GMV; Noon ~100% third-party | MED–HIGH |
| Travel distribution | Hospitality $29.0bn (2026); hotels actively pushing direct to reduce OTA commission | MED–HIGH |
| Cloud marketplaces | See below — thinner penetration in KSA than the US | MED |

**The software instance, in numbers:**

| Evidence | Figure | Confidence |
|---|---|---|
| B2B software transacted through cloud marketplaces | **>$45bn/yr, +35–40% YoY** | MED |
| Trajectory | ~$85bn by 2028; ~$163bn by 2030 | MED |
| Share of established ISV marketplace revenue from private offers | **65–75%** | MED |
| AWS top-1,000 customers with an active Marketplace subscription | **99%** | MED |

**The mechanism most people miss:** a marketplace is not a storefront, it is a **budget instrument**. Enterprises hold multi-year committed cloud spend and retire it by buying third-party software through the marketplace. That is why growth comes through *private offers* — negotiated deals routed through the rail — rather than through self-service listings. The buyer's motive is not discovery; it is drawing down a commitment already paid for.

---

## Why now

Platform intermediation has crossed the point where it **generates its own reconciliation problem**, in every sector at once.

- A hotel booking can carry an OTA commission, a wholesaler net-rate margin, a loyalty cost and a corporate agent override — and the hotel's finance team receives a remittance that ties to nothing.
- A software deal can carry a hyperscaler take rate, a resale margin, a co-sell incentive and a private-offer discount — same result.

In KSA specifically, hotels are now actively pushing direct channels **to reduce OTA commission cost** (MED–HIGH) — a sector-level admission that intermediation economics have grown large enough to manage deliberately. That is exactly the condition that creates demand to *measure* them.

---

## Strategic implication

This trend is simultaneously Reven's **best proof-of-need** and its **most dangerous adjacency** — and conflating the two would be a serious error.

**Proof.** Platforms demonstrate empirically that intermediated revenue *wants* a formal settlement substrate. The market built one and routed $45bn/yr through it. Reven's thesis is the general case of what platforms proved in each special case.

**Danger — and it is narrow.** AppDirect/Tackle already perform *cloud-marketplace-side* reconciliation. If the pitch drifts toward "reconcile your marketplace revenue," it walks into the guns of a far better-capitalised incumbent that owns the rail. **But that danger exists in one sector only.** No incumbent does OTA-to-hotel, aggregator-to-broker, or platform-to-merchant bilateral settlement. Reading it as a general threat would be a strategic error.

**The resolution is a positioning discipline:**

> **Treat the platform as an input to the claim ledger, never as the arena.**

Reven ingests platform remittance and disbursement files as *revenue events* and reconciles them against claims — sitting **above** multiple routes (direct, intermediary, platform) rather than inside one. Reven's seam is **bilateral settlement between two counterparties' finance teams**, which is unowned in every sector.

**A useful secondary effect:** platforms have normalized paying a percentage on intermediated revenue (AWS/Azure/GCP ~3%, renewals ~1.5%, HIGH). That is helpful anchoring for a capped settlement fee much later — and it is **not** a licence to price Reven's software as a take rate.

---

## Operational implication

- **Build a generic remittance-file ingestion adapter** — one parser architecture with per-source mappings — rather than a cloud-marketplace-specific connector. The first three mappings should come from the two chosen sectors plus one hyperscaler, not from three hyperscalers.
- **Represent the multi-leg transaction in the data spine now:** one revenue event → *N* claims with different bases. A ledger that cannot express a platform-routed, agent-sourced, sub-contracted transaction cannot express 2026 in any sector.
- **KSA calibration:** cloud-marketplace penetration is thinner in the Kingdom than in the US, while OTA, aggregator and marketplace intermediation are thick. Weight adapter work accordingly — selling marketplace reconciliation to a Saudi ISV in 2026 is a year early.
- **Discovery move:** ask to see a remittance file. **The number of manual adjustments on it is the opportunity size.**

---

## What would falsify it

If in the chosen sectors the platform remits a clean, already-reconciled statement that finance accepts without adjustment, the pain sits with the platform rather than with Reven's buyer. Separately, if beachhead accounts' intermediated revenue never touches a hyperscaler marketplace, the software instance is a **global-expansion argument rather than a beachhead one** — real, but not load-bearing for the next four quarters.

---

## Sources

- State of Cloud Marketplaces 2026: https://www.automatum.io/blog-posts/state-of-cloud-marketplaces-2026
- Cloud marketplaces as a SaaS revenue route: https://www.saasmag.com/cloud-marketplaces-new-channel-saas-revenue-2027/
- Cloud marketplaces going mainstream: https://newsletter.partnerinsight.io/p/one-chart-shows-cloud-marketplaces-going-mainstream
- AppDirect + Tackle.io (Dec 2025): https://www.appdirect.com/about/press/releases/appdirect-and-tackle-io-to-unite-to-extend-leadership-in-b2b-subscription-commerce-with-native-hyperscaler-marketplace-integration
- AppDirect + PartnerStack (Apr 2026): https://www.appdirect.com/about/press/releases/appdirect-acquires-partnerstack-creating-the-unified-subscription-commerce-platform-for-partner-led-growth
- Saudi hospitality market outlook: https://www.mordorintelligence.com/industry-reports/hospitality-industry-in-saudi-arabia
