# Lens 02 — Trust is the product; software is the delivery mechanism

| | |
|---|---|
| **Type** | Positioning |
| **Decides** | What you protect at cost, and who you are actually competing with |
| **Argues against** | Treating Reven as a features race against PERM vendors |
| **One line** | What the customer buys is a number two companies both accept — everything else is packaging |

---

## The frame

Strip away the interface, the integrations and the workflows, and what remains is one deliverable:

> **A number that two independent companies both accept.**

Software is how that number gets produced, stored and delivered. It is not what is being bought. A customer who could get the same number by another means — and trust it — would not need the software.

---

## Rationale, and three consequences

### 1. Neutrality is an asset requiring active protection

Reven sits *between* two counterparties. That position only holds while both believe Reven is not working for the other one. Three things would destroy it, and each is individually tempting:

- **A take-rate on counterparty money.** Reven would become the thing its customers are trying to control. (See [Lens on verified variable cost](../trends/11-verified-variable-cost.md) for why this is also positionally inconsistent.)
- **Side-taking in disputes.** The moment Reven adjudicates rather than evidences, it becomes a party rather than a referee.
- **Monetising one counterparty's data to the other.** The fastest possible way to lose both.

> *A referee who takes a cut of the score is not a referee.*

### 2. The real competitor is not a PERM vendor

The competitive frame in most of the corpus is AppDirect, Impartner, ZINFI, Crossbeam. That is the right frame for *the technology channel* and the wrong frame for the business.

**The actual incumbent is the spreadsheet** — and, above a certain contract size, the Big-4 or sector consultant doing this reconciliation manually for a fee. Those two hold something close to **100% share today.**

They lose on exactly one axis: **they produce an answer once; they do not produce a repeatable, verifiable answer.** A consultant's reconciliation is correct and dead the moment it is delivered. A ledger's is correct and alive.

**Multi-sector, this is even more true than in technology.** In insurance commission reconciliation and franchise royalty verification there is frequently *no software competitor at all* — only a process, a spreadsheet, and an annual argument.

### 3. The moat compounds through accumulated agreement, not features

Every settled period that **both parties accepted** is a precedent: this is how we split, under this rule, evidenced this way, approved by these people.

Two years of precedents cannot be re-derived by a competitor at any price, because the competitor was not present when the agreements were made. This is why the ledger-before-money-movement sequencing is the single most important architectural decision in the corpus — and why a features-led competitor cannot catch up simply by shipping faster.

---

## What it changes

- **Refuse the take-rate permanently and say so in writing**, including in the pricing page. The refusal is a trust asset, not a concession — advertise it.
- **Design dispute handling to evidence, never to adjudicate.** Reven shows both sides the same record and the same rule; it does not decide who is right.
- **Benchmark against the spreadsheet and the consultant**, not against PERM vendors. The ROI case, the demo and the discovery questions should all be built against "what you do today," which is manual.
- **Instrument accumulated agreement as a retention metric** — settled periods both parties accepted. It is the truest available proxy for switching cost, and no competitor can show it.

---

## The argument against this lens

"Trust is the product" can become an excuse for shipping too little. Trust is *earned through* working software; a beautiful principle with a broken import flow earns nothing.

**Resolution:** the lens governs *what you protect*, not *how much you build*. It says never trade neutrality for revenue — it does not say the product can be thin.

---

## Related

- [Lens 09](09-evidence-not-workflow.md) — the architectural expression of the same idea
- [Lens 08](08-sell-an-artifact.md) — how to say it in one sentence
- [`../trends/11-verified-variable-cost.md`](../trends/11-verified-variable-cost.md) — why the pricing model follows from neutrality
