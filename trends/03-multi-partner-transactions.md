# Trend 03 — Companies increasingly use multiple partners in the same transaction

| | |
|---|---|
| **Class** | **Mechanism-making** — the product argument |
| **Use it for** | **Lead with this externally.** It is the only trend that makes a *ledger* technically necessary rather than merely desirable |
| **Dated clock** | None — but the tooling failure is already here |
| **One line** | With one counterparty you settle by trust; with five you need an arithmetic both sides accept — and nothing on the market does that |

> **Recommendation: move this to position one.** Every other trend makes a system of record *desirable*. This is the one that makes it *necessary*.

---

## The claim

The multi-party transaction is now the default, not the exception — several counterparties each with a claim on the same deal.

---

## Rationale — why it is true

This is sector-general by construction, and the original framing understated it badly:

| Sector | The parties to a single transaction |
|---|---|
| **Construction / EPC** | Prime contractor, JV partner, chain of subcontractors — each with flow-down terms and retention |
| **Travel** | OTA, wholesaler, DMC, corporate agent, loyalty programme |
| **Insurance** | Broker, sub-broker or bancassurance channel, TPA, reinsurer — each with a claim on the premium |
| **Logistics** | Origin agent, forwarder, carrier, customs broker, last-mile partner — settling across borders |
| **Healthcare** | Referring provider, network, TPA, insurer |
| **Technology** | Hyperscaler, ISV, systems integrator, referral partner |

2026 ecosystem reporting describes multi-partner deals as **the default rather than the exception**, with larger deal sizes, higher win rates and faster procurement when several parties go to market together (MED).

**The cause is common to all of them:** buyers buy **outcomes**, and no single party delivers an outcome.

---

## Why now

Because this is the trend that **breaks the installed tooling**, and it broke recently in the sectors that were previously simple.

**Single-counterparty attribution is solved everywhere.** Every PRM registers a deal to one partner. Every insurance system books a commission to one broker code. That problem has been handled for a decade.

**Multi-party attribution is solved nowhere.** Splitting credit across three to five counterparties with different agreements, different rates, different currencies and different tax treatments — with a live dispute whenever the split is contested — has no product.

As multi-party became the default through 2025–26, the dominant failure mode moved:

> from ***"we can't track our partners"*** → to ***"we can't agree who gets what."***

The first is an ops complaint. **The second is a finance escalation — and finance escalations create budget.**

---

## Strategic implication

**1. It converts "nice to have" into "system of record."** With one counterparty you settle by trust and memory. With five you need an arithmetic both sides accept, applied to a rule both approved, recorded where neither can silently edit it. That is not a feature of a PRM — it is a different category of software, in any sector.

**2. It forces bilaterality.** Multiple counterparties means multiple finance teams, multiple ERPs and multiple versions of the truth. Reconciliation ***between*** counterparties — not reporting ***within*** one — is the seam the PERM consolidators are consolidating *around* rather than *into*.

**3. It seeds the network.** Every multi-party transaction is inherently a multi-tenant event. Cross-tenant identity is what turns each one into a **node** rather than a record. It is the cheapest network-effect option available — and **it expires the moment the ledger ships without it.**

---

## Operational implication

- **Multi-party attribution belongs in the data model on commit one**, even if the interface ships single-claimant first. Retrofitting splits onto a single-claimant schema is a rewrite, not a migration.
- **Model attribution as an explicit, versioned decision with lineage** — who decided the split, under which rule version, on what evidence, who approved, what changed. Not a computed column. **In this product the decision is the deliverable**; the number is only its output.
- **Make disputes a first-class object**, not a support ticket. Disputes are where the finance buyer feels the pain, where the evidence proves its worth, and where switching cost forms. *A dispute resolved inside Reven is a customer that cannot leave.*
- **Ship cross-tenant counterparty identity in the MVP.**
- **Demo script, in the customer's own sector:** take a real transaction with three counterparties and show both sides reaching the same split against one mutually-approved ruleset. **No incumbent can currently reproduce that.**

---

## What would falsify it

If splits are settled by **relationship rather than arithmetic** — senior people agreeing on a call, with no downstream audit consequence — then the pain is social, not systemic, and software does not get bought.

**Test it directly, and early:**

> *"When was the last time a counterparty disputed a split, and what did resolving it cost?"*

No answer means no urgency. This is the single most important question in the next ten discovery conversations.

---

## Sources

- Impartner — mastering multi-partner deals: https://impartner.com/resources/blog/mastering-multi-partner-deals
- Bridge Partners — 2026 Ecosystem Compass Report: https://www.bridge.partners/insights/the-2026-ecosystem-compass-report
- PartnerStack — Scaling Revenue Precision in 2026: https://partnerstack.com/resources/research-lab/report-partnerstack-is-scaling-revenue-precision-in-2026
- Gartner — PERM Market Guide 6982766 (23 Sep 2025): https://www.gartner.com/en/documents/6982766
- Forrester — channel-software consolidation (~159 → ~5): https://go.forrester.com/blogs/the-decade-of-the-channel-ecosystem-accelerates-with-massive-software-consolidation/
