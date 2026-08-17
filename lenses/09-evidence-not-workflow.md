# Lens 09 — Evidence system, not workflow system

| | |
|---|---|
| **Type** | **Architecture** |
| **Decides** | Every ambiguous product decision |
| **Argues against** | Competing on features against the PERM consolidators |
| **One line** | Workflow systems compete on breadth and lose; evidence systems accrue gravity |

---

## The frame

Two framings are available for the same product, and they lead to opposite decisions at almost every fork.

| Dimension | Workflow framing | **Evidence framing** |
|---|---|---|
| Demo shows | Pipeline, funnel, dashboard | **A statement, and its lineage** |
| Schema optimises for | Editability, throughput | **Immutability, lineage, idempotency** |
| API exposes | CRUD | **Verifiable records with provenance** |
| Buyer | Commercial ops | **Finance** |
| Competes on | Features | **Trust** |
| Loses to | Incumbents with more features | **Nothing quickly — evidence accretes** |

**Resolve every ambiguous product decision toward the right-hand column.**

---

## Rationale

### Why the workflow framing loses

The PERM category is mid-consolidation — Forrester projects ~159 vendors collapsing to roughly five horizontal winners, and the M&A record supports it. Those winners are racing on **front-office breadth**: recruit, onboard, enable, co-sell, co-market, MDF, analytics.

**A pre-seed company cannot out-feature five consolidated, capitalised platforms.** Any product framed as a workflow tool is competing directly on the axis where it is weakest, against opponents whose entire strategy is to be broader.

Worse: **AI is making front-office features cheap to replicate** ([Lens 10](10-ai-threat-and-framing.md)). The workflow lane is being commoditised in real time.

### Why the evidence framing wins

Evidence has a property features do not: **it accumulates, and it cannot be back-filled.**

A competitor can ship your feature in a quarter. A competitor cannot produce two years of settled periods that both counterparties accepted, because they were not present when those agreements were made. Every closed period is a precedent, and precedents are the actual switching cost.

This is the same insight as system-of-record gravity — **and the money record is the heaviest gravity well available**, because finance, audit and two counterparties all depend on it.

### The multi-sector bonus

An evidence system is **inherently more portable across sectors** than a workflow system:

- **Evidence requirements are set by regulators and auditors** — who are sector-blind. An auditor wants lineage, immutability and provenance whether the number is a commission, a royalty or a subcontract payment.
- **Workflows are set by sector convention** — and differ wildly. Insurance commission approval looks nothing like franchise royalty verification.

> **Building an evidence system means building once for eleven industries. Building a workflow system means building eleven times.**

That is not a small difference. It is the difference between the horizontal claim being achievable and being marketing.

---

## What it changes

- **Demo the statement and its lineage**, never the funnel. If the demo opens on a dashboard, the positioning has already slipped.
- **Ban in-place updates on money records.** Append-only, double-entry, idempotent, server-side amounts. This is the corpus's existing build-order item 1 and this lens is the reason for it.
- **Design the API around verifiable records** — provenance, hashes, cleared-invoice references — rather than around CRUD convenience.
- **Make the attribution decision a first-class versioned object** with who/when/under-which-rule/on-what-evidence. **The decision is the deliverable; the number is its output.**
- **When a feature request arrives, ask which column it serves.** Requests that improve editability, speed or convenience at the cost of immutability or lineage are the ones to refuse — politely, and by explaining what the product is.
- **Sell to finance.** The buyer follows the framing.

---

## The argument against this lens

Evidence systems can be **unusable**. Immutability, lineage and approval trails add friction, and a product nobody enjoys using does not accumulate the evidence that is supposed to be its moat. Workflow quality is what drives daily usage, and daily usage is what produces the record.

**Resolution:** the lens governs **what wins at a fork**, not what gets built. Workflow quality is necessary; it is simply not the *differentiator*, and it must never be bought at the price of the record's integrity. Build a pleasant workflow **on top of** an immutable ledger — never instead of one.

---

## Related

- [Lens 02](02-trust-is-the-product.md) — the commercial expression of the same idea
- [Lens 08](08-sell-an-artifact.md) — what the demo should open on
- [Lens 10](10-ai-threat-and-framing.md) — why the workflow lane is being commoditised
- [`../Reven_PERM_Category_Deep_Dive.md`](../Reven_PERM_Category_Deep_Dive.md) — the consolidation dynamics behind it
