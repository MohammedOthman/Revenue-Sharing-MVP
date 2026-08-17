# Lens 06 — The materiality function is the ICP

| | |
|---|---|
| **Type** | Go-to-market |
| **Decides** | Who you target, when you score them, and which sectors go first |
| **Argues against** | Demographic ICPs ("B2B SaaS, 20–200 partners") |
| **One line** | Pain is a product of four factors — and under seat pricing that product predicts *conversion*, not *qualification* |

---

## The frame

Pain is roughly proportional to:

> ### revenue-share flow × counterparties per transaction × compliance exposure × counterparty formality

| Factor | Why it predicts urgency |
|---|---|
| **Revenue-share flow** | Intermediary payments as a share of revenue. High share = material enough to be audited |
| **Counterparties per transaction** | Two parties settle by trust; five need a ledger ([trend 03](../trends/03-multi-partner-transactions.md)) |
| **Compliance exposure** | ZATCA + WHT + sector regulator. **Non-discretionary budget** |
| **Counterparty formality** | Licensed, identifiable counterparties make bilateral onboarding tractable ([Lens 04](04-two-sided-cold-start.md)) |

It is a **product, not a sum** — a zero on any factor collapses the score. That is the point: a company with enormous partner revenue but a single counterparty per deal and no compliance exposure does not need this product.

---

## Rationale

### Why a formula beats a demographic

The corpus's inherited ICP — *"B2B SaaS, 20–200 partners"* — is a **demographic**. It describes what a company *is*, not what it *feels*. Demographics travel badly across sectors and produce false positives: plenty of B2B SaaS companies with 100 partners have no pain at all, because one partner touches each deal and nobody audits the number.

The materiality function describes **the condition that creates urgency**, and it works in any sector without translation. It explains, without special pleading, why:

- A **40-franchisee franchisor with cross-border royalties** outscores a local software vendor with four resellers — high flow, formal counterparties, WHT exposure on every royalty.
- An **insurance broker network** scores high on all four — licensed counterparties, regulated data, commission flow, multi-party settlement.
- The **RHQ cut wins *within* whichever sector is chosen** rather than being a sector of its own.

### What changed under SAR 50/seat pricing

Under the old per-active-partner enterprise model, materiality had to be **proven before the first sale** — you could not sell a six-figure contract to a company that did not feel the pain.

**Under SAR 50 per seat, anyone can land.** That is the entire point of the price. Materiality is no longer a gate.

> **But the score still predicts who converts to an enterprise contract — and conversion is what the whole model rests on.**

So the function did not become less important. It moved from the front of the funnel to the middle, and from qualification to forecasting.

---

## What it changes

- **Score at landing, not before it.** Do not use the materiality function to decide who may buy — the price is there precisely so that question does not need asking. Use it to predict who will expand.
- **Instrument land-to-expand by score band.** This is the critical instrumentation: does a high-scoring cohort convert materially better than a low-scoring one?
  - **If yes** — the ICP thesis is validated and targeting can be sharpened with confidence.
  - **If no** — the ICP thesis is *wrong*, and targeting should be rebuilt from **observed conversion** rather than from theory. That would be an uncomfortable finding and a very valuable one.
- **Weight sector selection by the four factors**, not by familiarity. On this scoring the strongest non-obvious candidates are **insurance** (highest published flow, licensed counterparties, chronic manual reconciliation) and **franchising** (published royalty flow, verification is the sector's defining dispute, regional expansion into the GCC).
- **Use the fourth factor to break ties.** Counterparty formality is the one most often ignored and the one that most affects whether the bilateral model works at all.

---

## The argument against this lens

Four factors multiplied together produce a score with **false precision** — none of the inputs is measurable to better than an order of magnitude at discovery stage, and multiplying four rough estimates compounds the error.

**Resolution:** use it as an **ordering device, not a scoring device.** It reliably tells you that a franchisor outranks a small ISV. It does not reliably tell you that one scores 340 and the other 85. Rank; do not compute.

---

## Related

- [Lens 04](04-two-sided-cold-start.md) — where counterparty formality comes from and why it matters
- [Lens 05](05-archetype-library.md) — choosing the two first sectors
- [`../Reven_Market_Sizing_TAM_SAM_SOM.md`](../Reven_Market_Sizing_TAM_SAM_SOM.md) §9 — conversion as validation gate 4
