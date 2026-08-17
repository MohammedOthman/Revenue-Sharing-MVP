# Lens 11 — Concentration risk, and why both seams are hedges

| | |
|---|---|
| **Type** | **Risk** |
| **Decides** | What gets built during Phase 1 rather than deferred |
| **Argues against** | Framing multi-sector scope and the country pack as "expansion" |
| **One line** | Both hedges are nearly free today and impossible later — and "expansion" framing correctly defers them, thereby losing them forever |

---

## The frame

**KSA-first is the right call.** It is the only lane offering a non-copyable compliance wedge *and* a dated regulatory forcing function.

It also concentrates the risk into three correlated single points of failure:

| Concentration | The risk | Evidence it is real |
|---|---|---|
| **One regulator** (ZATCA) | Timelines move | **Wave 25's existence proves the ladder keeps extending** — and Wave 24's expiry proves dates pass while materials do not update |
| **One programme** (RHQ) | Incentives are policy-dependent | It is a government attraction programme; attraction programmes get revised |
| **One macro variable** (oil) | Drives the spending that underwrites enterprise budgets | 2025 averaged ~USD 65 against a ~USD 94 fiscal break-even |

**These are correlated, not independent.** A sustained oil downturn pressures government spending, which pressures the giga-projects, which pressures the RHQ value proposition, which pressures the enterprise budgets Reven sells into. They fail together or not at all.

---

## Rationale

Two seams hedge this concentration. Both share a decisive property: **nearly free today, impossible later.**

### Hedge 1 — multi-sector scope

Diversifies across **demand cycles within one country** — something a single-sector competitor structurally cannot do:

| Sector | Cycle exposure |
|---|---|
| Construction, consulting | Government capex — most exposed |
| **Insurance** | **Defensive** — health and motor are mandatory lines; grew 10.7% in 2025 |
| Franchising | Consumer-driven — a different cycle again |
| Logistics | Trade volumes — a third cycle |

> **Choosing one defensive and one cyclical first sector is a deliberate hedge — and it is available only because the product is horizontal.** ([Lens 06](06-materiality-function.md) covers the selection.)

### Hedge 2 — the country pack

Diversifies across **regulators.** If ZATCA slips, the UAE mandate does not. If the RHQ programme changes, UAE free-zone dynamics do not.

The architectural requirement is specific: `country → {invoice model, WHT table, tax IDs, residency, currency, language, local-content fields}` as **configuration**, with ledger, rule engine and reconciliation kept country-agnostic. **Write the KSA pack as a pack, not as the core.**

### Why the framing matters more than the argument

Both hedges are usually described as **expansion**. That framing is fatal, and predictably so:

> A disciplined pre-seed company **correctly defers expansion** in favour of the wedge. So "expansion" framing gets these deferred — and because both are impossible to retrofit, deferring them **loses them permanently.**

The same work, framed as **risk management**, gets built during Phase 1 — where it belongs, and where it costs almost nothing.

This is not wordplay. It is the difference between a schema decision made in week three and a rewrite in year three.

---

## What it changes

- **Reframe both internally as risk management, not expansion.** Say it in the build-order document, so the next person to prioritise sees the right category.
- **Write the KSA compliance logic as a country pack from the first commit**, even though no second country is planned. The cost is a directory structure and a configuration boundary.
- **Write the sector logic as archetypes** ([Lens 05](05-archetype-library.md)) for the identical reason. Same engineering idea, same free-now/impossible-later property.
- **Choose two first sectors on different cycles.** Not two construction-adjacent sectors, however similar the buyers look.
- **Do not build the UAE pack yet.** Build the *seam*, validate KSA, open UAE at the Phase-1 exit gate. The hedge is the seam, not the second country.
- **Monitor the correlated trio** — ZATCA wave announcements, RHQ programme changes, oil against fiscal break-even — as a single risk indicator rather than three.

---

## The argument against this lens

Every "nearly free, impossible later" argument is a **generic case for premature generality**, and premature generality is one of the most reliable ways to slow a young company down. Taken to its conclusion, it justifies abstracting everything.

**Resolution:** the test is whether the abstraction is **retrofittable**. Most are — you can add a feature flag, a new endpoint or a second workflow later. **A ledger's country semantics and a rule engine's archetype model are not**, because they determine the shape of records already written. Apply this lens only where retrofit is genuinely impossible, and reject it everywhere else.

---

## Related

- [Lens 05](05-archetype-library.md) — the sector seam
- [Lens 06](06-materiality-function.md) — choosing sectors on different cycles
- [`../trends/13-gcc-divergence.md`](../trends/13-gcc-divergence.md) — the country-pack instruction in full
- [`../trends/10-economic-uncertainty.md`](../trends/10-economic-uncertainty.md) — the macro variable
