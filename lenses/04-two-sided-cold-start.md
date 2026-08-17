# Lens 04 — The two-sided cold start is the biggest un-de-risked assumption

| | |
|---|---|
| **Type** | **Risk** |
| **Decides** | Whether the first customer gets any value at all |
| **Argues against** | Treating cross-tenant identity as purely an architecture decision |
| **One line** | A marketplace cold-start problem wearing a system-of-record costume |

> **This is the lens most likely to be fatal if ignored, and the plan currently does not state which way it is going.**

---

## The frame

Bilateral reconciliation requires **both** counterparties to participate. Every document in the corpus treats cross-tenant identity as an *architecture* decision — something to get right in the schema.

It is at least as much a **go-to-market** decision. And framed correctly, it is a familiar and dangerous shape:

> **If the product only delivers value when both sides sign up, the first customer gets nothing — and the sales motion silently doubles in difficulty.**

That is a chicken-and-egg marketplace problem. Marketplace problems have well-known failure modes and well-known mitigations, and neither is currently written down.

---

## Rationale

### Why it is easy to miss

The corpus is right that **cross-tenant identity cannot be retrofitted** — it must be in the MVP. That correct architectural conclusion has quietly stood in for a GTM conclusion that was never reached. "We built it multi-tenant" is not the same as "a customer gets value on day one without their partner."

### Why it is dangerous

A bilateral product with no single-player value has three compounding problems:

1. **No first customer.** Whoever signs first has nobody to reconcile against.
2. **Doubled sales motion.** Every deal requires convincing two organisations, one of which is not your customer and has no budget for you.
3. **Attribution of failure.** When the counterparty does not engage, the customer blames the product, not the counterparty.

### The mitigation

Make the product **fully valuable single-player first**, then let the network assemble itself:

| Capability | Value without any counterparty participation |
|---|---|
| Claim ledger | The company's own record of what it owes and why |
| Attribution decision with lineage | Defensible internally, to finance and to audit |
| Evidence pack | Sent to finance today, with no counterparty involvement |
| ZATCA / WHT field capture | Compliance value, entirely internal |
| Eligibility preview | "What will I owe, and why" — internal decision support |

Then: **let the counterparty join free, in a read-and-confirm role.** Not a paid seat. Not an onboarding project. A view of their own claims and a button to accept or dispute a statement.

> **Land single-player; let the network assemble one confirmation at a time.**

### The multi-sector upside — visible only after the reframe

In the long-tail technology channel, a vendor may have hundreds or thousands of small partners, most of whom will never log in. That is the hardest possible cold-start.

**In the sectors the multi-sector reframe brings into scope, the counterparties are licensed, identifiable and few per principal:**

| Sector | Counterparties per principal | Formality |
|---|---|---|
| Franchising | ~40 franchisees | Contracted, named, legally bound |
| Insurance | Licensed brokers and agents | **Licensed by the Insurance Authority** |
| Freight / logistics | Named agents and forwarders | Contracted, often licensed |
| Construction | Named subcontractors | Contracted, with retention held |
| Long-tail tech channel | Hundreds to thousands | Often anonymous, self-registered |

**Bilateral onboarding is far more tractable in the first four than in the last one.** A franchisor can plausibly get 40 franchisees to confirm statements; a SaaS vendor cannot get 4,000 affiliates to do anything.

> **That is a concrete argument for choosing a formal-counterparty sector first — and it is not visible from an ICT-first vantage point.**

---

## What it changes

- **Write the single-player-first principle into the PDR and the execution plan explicitly.** It is currently an unstated assumption carrying real risk.
- **Gate the MVP on single-player value:** a customer must be able to reach the "these numbers reconcile" moment with zero counterparty participation. If they cannot, the MVP is not done.
- **Build the free confirming-party role in Phase 1**, not Phase 2. It is small — view own claims, accept or dispute — and it is what converts each deal into a network node.
- **Weight sector selection by counterparty formality** (see [Lens 06](06-materiality-function.md), where it is the fourth factor).
- **Track counterparty activation as a leading indicator**, but never let it gate the customer's own value.

---

## The argument against this lens

If bilateral confirmation turns out to be easy — counterparties join readily because *they* want to see what they are owed — then single-player-first is wasted caution, and the network compounds faster than modelled.

**Resolution:** the mitigation costs almost nothing. Single-player value is required anyway for the first customer. **Build for the pessimistic case and be pleasantly surprised**, because the optimistic case has no recovery path if it is wrong.

---

## Related

- [`../trends/03-multi-partner-transactions.md`](../trends/03-multi-partner-transactions.md) — why cross-tenant identity matters in the first place
- [Lens 06](06-materiality-function.md) — counterparty formality as an ICP factor
- [Lens 12](12-falsifiers.md) — falsifier #3: counterparties refuse to co-sign
