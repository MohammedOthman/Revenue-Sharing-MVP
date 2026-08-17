# Lens 05 — Horizontal product, sequenced go-to-market: the archetype is the real surface area

| | |
|---|---|
| **Type** | **Architecture** (with a GTM guardrail) |
| **Decides** | What "supporting a sector" means, and what the roadmap is measured in |
| **Argues against** | Both "we're a tech-channel product" and "we sell to everyone" |
| **One line** | Add archetypes, not verticals — a sector is supported when its revenue-share shape is expressible, not when it has a dashboard |

> **This lens was added by the multi-sector reframe.** "Every sector with revenue share" is only a real claim if the rule engine can express each sector's shape. Otherwise it is an aspiration with a marketing page.

---

## The frame

The scope decision — *every industry with partnership and revenue-share economics* — is a **product** statement.

**It must not silently become a go-to-market statement**, because a pre-seed company selling into twelve sectors sells into none.

| | Decision | Answer |
|---|---|---|
| **Product** | How many sectors can the system represent? | **All of them** — one ledger, one attribution engine, one compliance layer |
| **Go-to-market** | How many sectors does the team sell into? | **Two**, until the Phase-1 exit gate. Everything else inbound-only |

Conflating these is how horizontal companies die. Separating them is what makes horizontal survivable.

---

## Rationale

### What makes the horizontal claim real

Not the UI. Not per-sector templates. **The contract archetype library** — the set of revenue-share shapes the rule engine can express. That is the product's true surface area:

| Archetype | Sectors | Distinguishing mechanic |
|---|---|---|
| **Commission on value** | Insurance, real estate, travel, freight | % of premium or price, often tiered, with cancellation clawback |
| **Override / super-commission** | Insurance, telecom, distribution | Second-level commission on a sub-network's production |
| **Royalty on gross sales** | Franchising, licensing, media | % of **counterparty-reported** revenue → *verification is the core problem* |
| **Resale margin** | Technology, distribution, automotive | Buy/sell spread rather than a fee |
| **Take rate** | Marketplaces, platforms, e-commerce | Platform-deducted **before** remittance → reconcile *net* against *gross* |
| **Flow-through / subcontract** | Construction, EPC, services | Pass-through with retention, milestones, local-content reporting |
| **Trailer / recurring** | Banking, asset management, insurance | Ongoing payment for a one-time introduction |
| **Profit / contingent share** | Insurance, JV, consortium | Paid on an **outcome** computed after the period closes |

Eight archetypes cover the eleven industries in the sizing model. **That is a tractable engineering surface — and it is far smaller than eleven vertical products.**

### The definition that follows

> **A sector is "supported" when its archetypes are expressible and its compliance fields are captured — not when someone has built it a dashboard.**

This is the single most useful sentence in the lens, because it makes "do we support insurance?" an **answerable engineering question** rather than a sales judgement.

### The symmetry with the country pack

The architecture that separates **country** from **core** (ZATCA vs Peppol, WHT tables, residency) is the same engineering idea as the one that separates **sector** from **core** (archetypes, vocabulary).

> **Build both seams once. They are the same idea, and both are nearly free now and impossible later.**

---

## What it changes

- **Make archetypes the roadmap unit.** "Which archetypes ship in Q4" is a far better roadmap primitive than "which verticals ship," and it is what makes the horizontal claim demonstrable to an investor.
- **Ship 3–4 archetypes in Phase 1**, chosen to cover the two selected sectors. Not eight.
- **Write the vocabulary layer as configuration**, not as forks. The same object is a commission statement, a royalty statement, an agent settlement or a subcontractor certificate depending on a label set. **One data model, per-sector nouns.**
- **Choose the two first sectors deliberately** — see [Lens 06](06-materiality-function.md) — and write the choice down. Leaving it implicit is how a horizontal company ends up selling to nobody.
- **Run the three-agreement test before committing the roadmap** (see below).

---

## The test that de-risks the whole scope decision

> **Model three real agreements from three different sectors in the rule engine — before committing to the horizontal roadmap.**

If all three are expressible with shared primitives, horizontal is real and the archetype library is the roadmap. If each needs bespoke logic, **Reven is a vertical company that has not chosen its vertical yet**, and the horizontal claim is a liability rather than an asset.

**This is a two-week test.** It de-risks more than any additional analysis could, and it should happen before the next roadmap commitment.

---

## The argument against this lens

Eight archetypes may be an underestimate. Real agreements carry idiosyncrasies — tiered overrides with seasonal accelerators, retentions released against milestones, profit-shares with contested cost bases — and each near-miss becomes a special case.

**Resolution:** that is precisely what the three-agreement test measures. The lens does not assume the archetype count is small; it asserts that **the count is the thing to measure**, and that measuring it early is cheap.

---

## Related

- [`../trends/04-local-content.md`](../trends/04-local-content.md) — flow-through as a distinct archetype
- [`../trends/13-gcc-divergence.md`](../trends/13-gcc-divergence.md) — the country-pack seam, same engineering idea
- [Lens 12](12-falsifiers.md) — falsifier #4: archetypes turn out to be irreducibly bespoke
