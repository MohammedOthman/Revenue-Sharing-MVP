# Lens 12 — The things that would change my mind

| | |
|---|---|
| **Type** | **Risk** |
| **Decides** | What to test first, before more analysis |
| **Argues against** | Further strategy work in place of cheap empirical tests |
| **One line** | Four falsifiers, none currently disproven, all cheap to test — and each far cheaper to test than to discover after the ledger is built |

---

## The frame

A strategy that cannot be wrong is not a strategy. These are the four findings that would materially change the plan, stated so they can be **tested rather than debated.**

Each is written as: **what would be true**, **how to test it**, and **what it would mean.**

---

## Falsifier 1 — Multi-party splits are settled socially, not arithmetically

**What would be true.** Senior people agree splits on a call. There is no downstream audit consequence, no dispute cost, and no one checks the arithmetic afterwards.

**Why it matters.** [Trend 03](../trends/03-multi-partner-transactions.md) is the only trend that makes a **ledger** technically necessary rather than merely desirable. If splits are social, the pain is social — and software does not get bought for social pain. Reven would be a reporting tool, and the price ceiling collapses to reporting-tool economics.

**How to test it.** Ask directly, in the next ten discovery conversations:

> *"When was the last time a counterparty disputed a split, and what did resolving it cost?"*

**No answer means no urgency.** A vivid, specific, recent answer means the opposite.

> **This is the single most important thing to test.** Everything else adjusts a number; this decides whether the category exists.

---

## Falsifier 2 — Cleared e-invoice data is not practically referenceable across counterparties

**What would be true.** Each party can see only its own cleared invoices, with no lawful, workable mechanism to reference the other's.

**Why it matters.** [Trend 07](../trends/07-e-invoicing.md) claims that when both counterparties clear through Fatoora, reconciliation becomes *"two verifiable records that must tie."* If the counterparty's cleared record is not referenceable, that degrades to **"both parties self-attest with a UUID."** Still useful — materially weaker, and a much less defensible claim.

**How to test it.** **Technically, not commercially.** Attempt an actual cross-counterparty invoice reference in a sandbox with a design partner, before the claim goes into the deck.

**What it would mean.** The e-invoicing wedge survives but shrinks from *verification* to *shared reference format*. The GTM hook and the compliance budget remain intact; the "most advanced market in the world for this product" claim would need retiring.

---

## Falsifier 3 — Counterparties refuse to co-sign

**What would be true.** Counterparties will not participate even in a **free, read-and-confirm role** — no seat cost, no onboarding, just view-and-accept.

**Why it matters.** The bilateral thesis is the seam the PERM consolidators are consolidating *around*. Without counterparty participation it collapses into **single-player partner accounting** — a real product, a much smaller one, and one the consolidators can reach.

**How to test it.** Offer the free confirming-party role in the first design-partner deployment and measure activation. See [Lens 04](04-two-sided-cold-start.md) for why the product must deliver full value even if this fails.

**What it would mean.** Reven remains viable as an internal system of record, but the network-effect narrative and a meaningful part of the long-term defensibility go away. The valuation story changes materially.

---

## Falsifier 4 — The archetypes turn out to be irreducibly bespoke

**What would be true.** "Supporting insurance" means building an **insurance product** rather than adding two archetypes to a shared rule engine.

**Why it matters.** This is the falsifier the multi-sector reframe introduced. If it holds, **Reven is a vertical company that has not chosen its vertical yet** — and the horizontal claim is a liability rather than an asset, because it spreads a pre-seed team across problems that do not share a solution.

**How to test it.** **Model three real agreements from three different sectors in the rule engine.** Not hypothetical agreements — real ones, from real design-partner conversations, with their real edge cases.

**A two-week test.** It de-risks the entire scope decision, and it should happen before the next roadmap commitment.

**What it would mean.** Pick one vertical and go deep. That is a good business too — but it is a different company, and knowing early is worth far more than discovering late.

---

## What this lens changes

- **Run these four before commissioning more analysis.** The corpus is already unusually deep in strategy; **the binding constraint is evidence, not thinking.**
- **Sequence them by cost and consequence:** falsifier 1 (ten conversations, free) → falsifier 4 (two weeks of engineering) → falsifier 2 (a sandbox test) → falsifier 3 (first design-partner deployment).
- **Write the results down whether they confirm or refute.** A confirmed assumption is an asset in a diligence conversation; a refuted one that was caught early is a bigger one.
- **None is currently disproven** — that is worth stating plainly, because it means the plan is intact but **unvalidated**, and those are different things.

---

## The argument against this lens

Falsifiers can become an excuse for **not committing** — a company that tests forever ships nothing, and design-partner conversations are not free of opportunity cost.

**Resolution:** all four tests run **inside the existing Phase-1 motion** — discovery conversations that were happening anyway, one engineering spike, one sandbox call. **None requires pausing the build.** If a test would require pausing the build, it belongs in a later phase.

---

## Related

- [`../trends/03-multi-partner-transactions.md`](../trends/03-multi-partner-transactions.md) — falsifier 1
- [`../trends/07-e-invoicing.md`](../trends/07-e-invoicing.md) — falsifier 2
- [Lens 04](04-two-sided-cold-start.md) — falsifier 3, and the mitigation
- [Lens 05](05-archetype-library.md) — falsifier 4, and the three-agreement test
- [`../Reven_Market_Sizing_TAM_SAM_SOM.md`](../Reven_Market_Sizing_TAM_SAM_SOM.md) §9 — the seven commercial validation gates
