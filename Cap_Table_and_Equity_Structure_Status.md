# Cap Table & Equity Structure — Current Status

> **Status: There is no cap table.** This document records the company's actual
> capitalization state as of the date below, the equity figures that do exist in the
> repository, the contradictions between them, and the specific work required to build a
> real cap table. It invents no shareholders, share counts, valuations, or names. Where
> two source documents disagree, both are recorded and the gap is flagged — not resolved.

**Date:** 2026-07-23 · **Scope:** the company's own equity/capitalization (not the product).

---

## The answer in one line

The company has no cap table — no share register, shareholders' agreement, articles of
association, term sheet, SAFE, convertible note, option pool, founder equity split, or
share counts exist anywhere in the repository. What exists is a *round intention*, and the
two documents that state it disagree.

---

## 1. What the repository actually holds on equity

Three artifacts touch capitalization. They do not reconcile.

| Field | Blueprint (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`) | Pitch deck (`Reven_Pitch_Deck.pdf`, 17 slides) | Finance model (`Pre_Seed_12M_Model_Founder_Questionnaire.md` + `..._CashFlow_PROMPT.md`) |
|---|---|---|---|
| Raise amount | **2,000,000 SAR** | not stated | blank → 🔴 INPUT REQUIRED (A2) |
| Valuation | 20M post / 18M pre (implied) | not stated | blank (N2) |
| Equity offered | **10%** | not stated | blank |
| Instrument | none named | none named | "SAFE / convertible / priced — founder's choice" (A2) |
| Founder split | 4 payroll roles (CEO/CTO/CRO/COO), no % | 3 functional "layers," no names, no % | blank (B1) |
| Option pool / ESOP | none | none | blank (B2) |
| Saudi/foreign split | not stated | not stated | blank (A7) |
| Use-of-funds split | 7.90 / 41.47 / **46.31 / 4.32** | 7.90 / 41.47 / **37.89 / 12.74** | driver-based, unpopulated |

The Blueprint is a **use-of-funds budget**, not a capitalization: it allocates 2,000,000 SAR
across setup, payroll, and buffer, and names the four founder roles as payroll lines — not as
shareholders with percentages. `README.md` labels it "the canonical 2,000,000 SAR pre-seed
ask (10% equity)."

The pitch deck — described in `README.md` as "the definitive investor pitch deck" — states
no amount, no valuation, no equity percentage, and no instrument. Its ask slide (15, "Use of
Funds") carries only the label `TARGET PRE-SEED ROUND` and four allocation percentages. Its
team slide shows three functional layers, no personal names, no C-suite titles.

The finance model is a driver-based engine **built to produce** a "GCC valuation & dilution +
SAFE-stack tracker" that "flag[s] founders <60% pre-Series-A." Every input it needs for that
tracker is blank.

---

## 2. The contradictions (recorded, not resolved)

- **Price exists / price does not exist.** The Blueprint fixes 2M for 10%. The deck you would
  hand an investor states no price. `Partner_Revenue_OS_Venture_Scale_Narrative.md` says it
  outright: "the repository **deliberately states no raise amount, valuation, burn**." The
  "canonical" figure and the investor deck disagree on whether a price exists at all.
- **Use-of-funds splits differ by exactly 8.42%.** Pillars 1–2 match across the two documents
  (7.90% and 41.47%); pillars 3–4 do not. The deck moves 8.42% (168,400 SAR) out of the
  execution team (46.31% → 37.89%) and into liquid reserve (4.32% → 12.74%).
- **Team is described two ways.** Four C-suite roles (CEO/CTO/CRO/COO) in the Blueprint; three
  unnamed functional layers (plus one "Fractional CPO") in the deck.

**Interpretation [Assumption]:** these read as planning artifacts authored at different times
and never reconciled, not as a governed capitalization. The 2M/10% is best treated as a
*placeholder ask* one document hard-coded, not a closed or offered round.

---

## 3. The furthest the data reaches

If — and it is an unverified if — 2,000,000 SAR for 10% were the round, the only structure
derivable from the repository is:

- New investor(s): **10%**
- Everyone already there (founders + any pre-existing holders): **90%, undifferentiated**

The split among the four founders is unknown; the ESOP is zero or unset; the instrument is
unchosen. This is one line and a 90% black box. It is a round headline, not a cap table.

---

## 4. What is missing, ranked by how much each blocks a real cap table

Ordered by materiality, and tied to the fact that this is (per `A7`, `MISA` references, and
the SAR base) a Saudi entity.

**1 — Founder split and reverse vesting (B1/B2 blank).** The 90% means nothing until it is
allocated, and at pre-seed investors underwrite the founders, so an unallocated founder block
is a diligence stop. On a Saudi LLC the founders hold *hisas* (units) issued at incorporation,
so the correct mechanism is **reverse vesting** — a company repurchase right over
already-issued units that lapses across, typically, four years with a one-year cliff — not
option-style forward vesting. Without it, a founder who leaves in month three keeps their full
slice with no claw-back. That is a classic early-stage cap-table failure, and nothing in the
repository prevents it.

**2 — Instrument choice (A2 blank).** The repository's own benchmark says "SAFE-dominant
(confirm KSA-specific split with local counsel)." The nuance the documents only gesture at:
the post-money SAFE is a Delaware-C-corp instrument. A Saudi LLC has no stock and no
automatic conversion-to-preferred plumbing, and SAFE enforceability in KSA is not settled the
way it is in Delaware. "10% for 2M" as a *priced* round means amending the articles and the
shareholders' register at the Ministry of Commerce (and MISA, if any foreign capital is in).
A "SAFE at a 20M cap" and a "priced 10% round" produce different cap tables, different
control, and different tax.

**3 — Valuation and dilution math.** 20,000,000 SAR post ≈ **USD 5.3M** on a ~USD 533K raise
(SAR is pegged at 3.75/USD). `Partner_Revenue_OS_Master_Strategy_Dossier.md` cites MENA
pre-seed averaging ~USD 3.7M (Carta) and warns "thin sample — don't anchor." Whether that
figure is round size or valuation changes the read, but a ~USD 5.3M post-money for a
pre-revenue, pre-MVP company sits at the top of the company's own cited band. A full pre-seed
mark pushes dilution risk into the seed: if the seed prices flat or down, anti-dilution and
founder-morale problems compound — the exact "<60% pre-Series-A" tripwire the finance model
names.

**4 — Option pool placement (B2 blank).** Pre-money versus post-money pool decides who absorbs
the dilution. A pre-money 10–15% pool is funded by the founders and quietly lowers the
effective 18M "pre" (the pool shuffle). An undefined pool means undefined founder ownership
even once the split is set.

**5 — Legal entity and Saudi/foreign ownership split (A7 blank).** This drives **Zakat** (2.5%
on the Saudi/GCC-owned net-asset base, owed even at a loss) versus **corporate income tax**
(20% on the foreign-owned share) — the finance model ties tax treatment (`J1`) directly to
`A7`. Foreign ownership requires a MISA license. And the "cap table" here is the shareholders'
register at the Ministry of Commerce; issuing or transferring *hisas* is a notarized
amendment, slower and more formal than a Delaware stock issuance.

**6 — Board and investor rights (absent).** No board, reserved matters, voting mechanics,
pre-emption, or drag/tag are defined. At 10% a pre-seed investor usually takes information
rights and pro-rata, sometimes a board observer, rarely a seat or a veto — but on an LLC these
live in the articles and a shareholders' agreement, and neither exists.

---

## 5. What to do, and the one gate

**Owner:** the CEO (the deck does not name them). Before issuing any instrument:

1. Fix the founder split and put every founder on four-year reverse vesting with a one-year
   cliff, in a signed shareholders' agreement. Do this first — every later instrument converts
   against this base.
2. Fill `A2`/`A7`/`B1`/`B2`/`N2`/`N3` and run the finance model's dilution + SAFE-stack tracker,
   so founder ownership through seed and Series A is visible against the <60% flag.
3. Choose the instrument with Saudi counsel; do not assume a US SAFE ports onto the LLC.
4. Reconcile 2M/10% to a real term sheet, or demote it in the Blueprint to a labeled
   assumption, and align deck, Blueprint, and model to one set of numbers.

**Gate:** do not sign a SAFE, note, or priced round until items 1 and 4 are done. A cap table
built on an unallocated founder block and two conflicting "asks" will not clear seed diligence.

---

## 6. Status and uncertainty

- These are planning documents. No executed instrument exists in the repository, so the honest
  status is **pre-priced / pre-formation** — there is nothing live to read as a capitalization.
- Whether the 2M/10% is a founder decision or a modeling placeholder cannot be settled from the
  repository, because the two investor-facing artifacts contradict each other.
- A real cap table could exist outside the repository (a data room, counsel's files). Within
  the repository, none does. This document should be superseded by an explicitly dated revision
  once the founder split, instrument, and entity structure are decided.

---

*Source: derived entirely from repository documents cited inline
(`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Reven_Pitch_Deck.pdf`,
`Pre_Seed_12M_Model_Founder_Questionnaire.md`, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`,
`Partner_Revenue_OS_Venture_Scale_Narrative.md`, `Partner_Revenue_OS_Master_Strategy_Dossier.md`,
`README.md`). No figures were invented. Currency conversions use the SAR/USD peg of 3.75.
This is a status and analysis document, not an offer, a valuation, or legal advice; confirm
KSA-specific structuring with local counsel.*
