# Cap Table, Venture Structure & Governance Dossier — Reven / Partner Revenue OS

> **Status:** Working reference + status-of-record. **Part I is the authoritative statement of the
> company's current cap-table position.** Parts II–IV are an expert knowledge base (VC contracts,
> cap-table mechanics, governance/board, legal & entity structure) tailored to a **KSA pre-seed**.
> Part V applies it to Reven; Part VI is a fill-in workbook that converts today's `🔴 INPUT REQUIRED`
> blanks into a cap table of record.
>
> **Scope note.** This is decision-support, not legal or tax advice. Every KSA statutory rate is
> flagged **verify** — confirm with Saudi counsel (corporate + MISA) and a licensed Zakat/CIT advisor
> before filing or signing. Consistent with the repo's finance discipline: **no invented company
> numbers.** Every figure is tiered **🟢 company fact · 📊 external benchmark (guidance only) ·
> 🔴 INPUT REQUIRED**.

---

## How to read this document

| Tier | Meaning | Rule |
|---|---|---|
| 🟢 | **Company fact** — founder-provided or from a canonical repo doc | Used as-is, cited to source |
| 📊 | **External benchmark** — market/reference range | *Guidance only; never silently used as the company's number* |
| 🔴 | **INPUT REQUIRED** — not yet decided or recorded | Model runs symbolically around it until the founder fills it |

Sources of record used below: [`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`](Pre_Seed_2M_SAR_Financial_Model_Blueprint.md)
(canonical ask), [`Pre_Seed_12M_Model_Founder_Questionnaire.md`](Pre_Seed_12M_Model_Founder_Questionnaire.md)
and [`Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`](Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md)
(the open capital-structure inputs), and [`README.md`](README.md) / [`CLAUDE.md`](CLAUDE.md) (phase model).

---

# PART 0 — Executive summary

**The one-line answer to "what is the cap table currently?"**
There is a **stated round, not yet a cap table.** The repo fixes the *size and price* of the pre-seed
raise — **2,000,000 SAR for 10%, a 20,000,000 SAR post-money** 🟢 — but **no shareholder-level cap
table exists**: founder-by-founder splits, the ESOP/option pool, any pre-existing SAFEs/convertibles,
share counts, par value, vesting, and the Saudi-vs-foreign ownership split are all **🔴 INPUT
REQUIRED** in the founder questionnaires. A cap table is a per-holder register of who owns what on a
fully-diluted basis; today only the incoming investor's *aggregate* 10% slice is specified.

**What that means practically.** You can quote the round on a term sheet, but you **cannot yet issue
shares, model founder dilution to Series A, or pass an investor's cap-table diligence** until the
blanks in Part I.2 are filled. Part VI is the workbook to do exactly that.

**Three decisions to make before signing anything (detail in Part V):**
1. **Entity/domicile** — KSA-only opco vs. a holding company ("the flip") above it. Drives investor
   familiarity, tax (Zakat vs CIT), and exit. *Hardest to change later — decide first.* (§IV.1)
2. **Instrument** — priced equity round vs. SAFE/convertible. At a 20M post the round is priced-shaped;
   confirm. In the GCC, **priced rounds and simple agreements both exist — do not import US default
   norms wholesale.** (§II.1)
3. **Founder split + vesting + IP assignment** — the cheapest thing to get right now and the most
   expensive to fix after a co-founder leaves. (§IV.2)

---

# PART I — The current cap table (status of record)

## I.1 What is fixed today (🟢 canonical)

From [`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`](Pre_Seed_2M_SAR_Financial_Model_Blueprint.md)
§1 — the declared single source of truth for the pre-seed ask:

| Term | Value | Tier |
|---|---|---|
| Amount raised | **2,000,000.00 SAR** | 🟢 |
| Equity offered | **10%** | 🟢 |
| Implied post-money valuation | **20,000,000.00 SAR** (2,000,000 ÷ 10%) | 🟢 |
| Implied pre-money valuation | **18,000,000.00 SAR** (20,000,000 − 2,000,000) | 🟢 |
| Round stage | Pre-seed | 🟢 |
| Modeling scenario | 12-month, zero-revenue runway | 🟢 |
| Team on the cap table (by role) | **4 founders** — CEO, CTO, CRO, COO | 🟢 |
| Execution team | 6 hires from Month 2 (**salaried; no equity terms stated**) | 🟢 |
| Phase at raise | Phase 1 — Capture (PRM); no money movement in scope | 🟢 |

That is the **entire** set of equity facts of record. It defines the **investor's aggregate slice**
and the **valuation**, nothing below the line.

## I.2 What is undefined — 🔴 INPUT REQUIRED (the missing cap table)

Every field a real cap table needs, and where the repo currently leaves it blank:

| Missing input | Why it matters | Repo cell (blank today) |
|---|---|---|
| **Founder-by-founder equity split** (CEO/CTO/CRO/COO %) | The largest block of the pre-money 90%; unknowable without it | *(not captured anywhere)* |
| **ESOP / option pool** size & timing | Whether the 10% investor slice sits *beside* or *on top of* an option pool changes every founder % | Questionnaire **B2** "Founder/ESOP equity pool?" |
| **Instrument & cap/discount** of the pre-seed | SAFE vs convertible vs priced changes when/if dilution lands | Questionnaire **A2** |
| **Existing SAFEs/convertibles** (amount/cap/discount) | Any prior instrument converts into the next priced round and dilutes everyone | Questionnaire **N3** "Existing SAFEs … for a cap-table/SAFE-stack tracker" |
| **Saudi/GCC vs foreign ownership %** | Drives **Zakat vs CIT**, MISA licensing, incentives | Questionnaire **A7** |
| **Expected next-round valuation / dilution** | Needed to model founders-to-Series-A (the <60% guardrail) | Questionnaire **N2** |
| **Share count / par value / share classes** | A cap table is denominated in shares, not just % | *(not captured anywhere)* |
| **Vesting / cliff / acceleration** on founder + employee equity | Unvested founder equity is the #1 pre-seed diligence gap | *(not captured anywhere)* |
| **Entity & domicile** (opco only vs holdco/flip) | Determines *which* company's shares the cap table even describes | *(not captured anywhere)* |

**Bottom line:** the round is priced; the ownership ledger is not yet built. Parts II–IV give you the
expertise to fill these correctly; Part VI is the template.

## I.3 Illustrative post-round cap table (reconstructed — ⚠️ illustrative, not company data)

The math below shows the **shape** of the table once the blanks are filled. **The founder split and
ESOP figures are placeholders** chosen only to demonstrate mechanics — they are **not** Reven facts.
Only the **10% / 90% split and the 20M post** are 🟢; everything itemized under "pre-money 90%" is 🔴.

**Assume** (illustratively) a 1,000,000-share pre-money company, an even 4-way founder split, and
**no** ESOP yet:

| Holder | Shares | % (fully diluted) | Tier |
|---|---:|---:|---|
| Founder A (CEO) | 225,000 | 22.5% | 🔴 illustrative |
| Founder B (CTO) | 225,000 | 22.5% | 🔴 illustrative |
| Founder C (CRO) | 225,000 | 22.5% | 🔴 illustrative |
| Founder D (COO) | 225,000 | 22.5% | 🔴 illustrative |
| **Founders subtotal** | **900,000** | **90.0%** | *(aggregate 90% is 🟢; the split is 🔴)* |
| Pre-seed investor(s) | 100,000 | 10.0% | 🟢 aggregate |
| ESOP pool | 0 | 0.0% | 🔴 (B2 unfilled) |
| **Total (post-round)** | **1,000,000** | **100.0%** | |

To issue 10% to the investor, the company **creates and issues 100,000 new shares** to sit alongside
the founders' 900,000 — new shares are *issued*, existing shares are not *sold* (see §II.4 "issuance
vs. transfer"). Post-money share price in this illustration = 20,000,000 SAR ÷ 1,000,000 = **20.00 SAR/share**;
the investor pays 100,000 × 20.00 = **2,000,000 SAR**. ✅

## I.4 The option-pool shuffle (why B2 changes every founder's number)

If investors require, say, a **10% post-money ESOP created *before* they invest** (the standard "pool
shuffle"), the pool is carved out of the **pre-money**, so **founders absorb the entire dilution** and
the investor still lands at a clean 10%:

| Holder | % post-round (no pool) | % post-round (10% pool, pre-money) |
|---|---:|---:|
| Founders (aggregate) | 90.0% | **80.0%** |
| Pre-seed investor | 10.0% | 10.0% |
| ESOP (unissued pool) | 0.0% | **10.0%** |

**The lesson:** *where* the pool is created (pre- vs post-money) is a **negotiated economic term worth
several points of founder ownership**, not an accounting detail. Until **B2** is answered, the founder
line in every table above is indeterminate. (See §II.4 for the general dilution waterfall.)

---

# PART II — DIRECT: VC contracts & cap-table mechanics

*The instruments that create cap-table entries, and the math that moves them.*

## II.1 Financing instruments (GCC-tailored)

| Instrument | What it is | Cap-table effect | When it fits | GCC/KSA note |
|---|---|---|---|---|
| **Priced equity round** | Investor buys newly issued **preferred shares** at a set price/valuation | **Immediate** new line + new share class | Valuation is defensible; both sides want certainty | A **20M post** is priced-shaped. KSA priced rounds use a **Shareholders' Agreement (SHA)** + amended Articles |
| **SAFE** (Simple Agreement for Future Equity) | A right to *future* shares at the next priced round; **not debt** | **No shares until conversion**; sits in a "SAFE stack" tracked separately | Speed, low legal cost, defer valuation | Enforceable, but **less standardized** in GCC than US; counsel must confirm conversion mechanics under the governing law you choose |
| **Convertible note** | Like a SAFE but **debt** — interest + maturity date | Converts to shares at next round; until then a **liability** | Bridge; investor wants debt protection | **Interest = riba risk** for Sharia-sensitive investors → prefer SAFE or a **Murabaha/Musharaka**-structured instrument (see §IV.3) |
| **Non-dilutive** (grants/guarantees) | Money that **does not touch the cap table** | **None** | Extend runway without dilution | Repo canon: **Kafalah = loan *guarantee*; TAQADAM/NTDP = grants; SVC/Jada = fund-of-funds via VCs** — keep off the equity ledger |

> **📊 benchmark, do not adopt as fact:** MENA seed rounds commonly land **$1–5M at ~$11–18M post-money**
> (repo pricing doc, external). US/Carta dilution and pool norms **do not transfer to the GCC** — the
> founder questionnaires say this explicitly. Treat any US template's defaults as a starting negotiation
> position, not a rule.

**Post-money vs pre-money SAFEs matter enormously.** A **post-money SAFE** (YC's 2018+ form) fixes the
investor's % of the company *as of conversion* — meaning **later SAFEs dilute founders, not earlier SAFE
holders**. Stacking several post-money SAFEs silently transfers ownership from founders to the SAFE
holders. If you use SAFEs, **maintain the stack tracker (N3) and model the aggregate conversion**, or
you will be surprised at the priced round.

## II.2 Term sheet anatomy — separate **economics** from **control**

A term sheet is mostly non-binding but sets every downstream document. Read it in two columns:

**Economics (who gets what money):**
- **Valuation** (pre/post-money) and **price per share**.
- **Liquidation preference** — see §II.4. Standard early-stage: **1× non-participating**.
- **Option pool** — size and **pre- vs post-money** (§I.4).
- **Anti-dilution** — broad-based weighted average is standard; **full ratchet is founder-hostile**.
- **Dividends** — usually non-cumulative, "if declared," at this stage.
- **Pro-rata / participation rights** — investor's right to keep their % in future rounds.

**Control (who decides what):**
- **Board composition** (§III.1).
- **Protective provisions / reserved matters** (§III.2).
- **Voting thresholds** and what needs preferred consent.
- **Information & inspection rights** (§III.4).
- **Founder vesting** (§IV.2), **drag-along / tag-along**, **ROFR / co-sale** (§II.3).

> **Rule of thumb:** founders over-negotiate *valuation* and under-negotiate *control and preference
> stacking*. A slightly lower valuation with clean 1× non-participating preference, a founder-favorable
> board, and narrow protective provisions usually beats a higher headline number wrapped in control terms.

## II.3 The priced-round document set (what actually gets signed)

| Document | Purpose |
|---|---|
| **Term Sheet** | Non-binding summary of the deal (binding: confidentiality, exclusivity/no-shop) |
| **Share Subscription / Purchase Agreement (SSA/SPA)** | The purchase itself: price, shares, **reps & warranties**, conditions, closing |
| **Shareholders' Agreement (SHA)** | The governance constitution: board, reserved matters, transfers, drag/tag, ROFR, pre-emption, founder vesting. **In GCC deals the SHA carries most of what a US "Voting/IRA/ROFR" trio carries** |
| **Amended Articles of Association (M&AA / Charter)** | The company's constitutional document filed with the registry; defines share classes, preferences, and what the SHA relies on |
| **Investors' Rights** (information, pro-rata, registration) | Often folded into the SHA in GCC practice rather than a standalone US-style IRA |
| **Disclosure Letter** | Founders' exceptions to the warranties — the honesty document that limits liability |
| **Board & shareholder resolutions** | Authorize the issuance, adopt the new Articles, appoint directors |

*US comparison:* a Delaware/NVCA priced round splits control across **SPA + Voting Agreement + IRA +
ROFR/Co-Sale Agreement + Amended Charter**. GCC/ADGM/DIFC deals typically **consolidate into SPA + SHA
+ Articles**. Same economic substance, fewer documents.

## II.4 Cap-table mechanics you must be able to compute

- **Fully-diluted shares** = all issued shares **+** all options (granted *and* unissued pool) **+**
  all shares that would result from converting SAFEs/notes/warrants. **Ownership % is always on the
  fully-diluted base**, never issued-only — this is the #1 cap-table error.
- **Issuance vs. transfer.** A financing **issues new shares** (company sells primary shares, cash goes
  *into* the company, everyone else is diluted). A **secondary** is a **transfer** (an existing holder
  sells to a buyer, cash goes *to the seller*, totals unchanged). Founders' pre-seed rounds are almost
  always primary issuance.
- **Pre/post-money price.** `Post-money = Pre-money + New investment`. `Price/share = Pre-money ÷
  fully-diluted shares *before* the new money` (with the pool-shuffle wrinkle in §I.4).
- **The dilution waterfall** (each new event dilutes everyone junior to it):
  `Founders → +ESOP → +SAFE/note conversion → +priced preferred`. Order and pre/post-money framing
  decide who absorbs each carve-out.
- **Liquidation preference** (who gets paid first on exit):
  - **1× non-participating** — investor takes *the greater of* their money back **or** their as-converted
    %. Founder-friendly, market standard early.
  - **Participating ("double dip")** — investor takes money back **and then also** shares the rest pro-rata.
    Founder-hostile; resist at pre-seed.
  - **Capped participating** — participation up to a multiple, then converts. A middle ground.
  - **Preference stacking** across rounds (senior/pari-passu) decides Series-A-vs-seed payout order at exit.
- **Anti-dilution** (protects investors in a **down round**):
  - **Broad-based weighted average** — mild, market standard.
  - **Narrow-based weighted average** — harsher.
  - **Full ratchet** — re-prices *all* prior shares to the down-round price; **severe founder dilution** — avoid.
- **Pro-rata rights** — let an investor buy enough in the next round to **maintain their %**; compounds
  their ownership and consumes round allocation over time.
- **Pay-to-play** — investors who don't participate pro-rata in a future round lose preferences (convert
  to common). Rare at pre-seed; appears in down markets.

## II.5 Worked multi-round dilution (illustrative shape, not Reven data)

Starting from the §I.3 illustration (founders 90% / pre-seed 10%, no pool), showing how a founder block
erodes — **the pattern the questionnaire's "flag founders <60% pre-Series-A" guardrail is watching:**

| Event | Founders (aggregate) | Investors (cumulative) | ESOP |
|---|---:|---:|---:|
| After pre-seed (§I.3) | 90.0% | 10.0% | 0% |
| Create 10% ESOP (post-money) | 81.0% | 9.0% | 10.0% |
| Seed: sell 15%, top pool to 12% | ~64–66% | ~24–25% | 12% |
| Series A: sell 18–20% | **~52–54%** | ~40%+ | ~12–14% |

The numbers are illustrative, but the **trajectory is real**: with a normal pool + two more rounds,
an even 4-founder team is already brushing the **<60% pre-Series-A** flag. Levers that protect it:
right-size the pool (don't over-provision), raise the *minimum* dilution needed per round, use
**pro-rata discipline**, and keep preference **non-participating** so the *exit* economics aren't
quietly worse than the ownership %.

---

# PART III — INDIRECT: governance & the board

*Ownership decides economics; governance decides **control**. They are not the same, and founders lose
companies they still mostly own by mishandling the second.*

## III.1 Board composition by stage

| Stage | Typical board | Control reality |
|---|---|---|
| Pre-incorporation | Founders only | Founders control absolutely |
| **Pre-seed (Reven now)** | **Founders only, or founders + 1 lead investor** | Keep it **founder-majority**; a 2–3 seat board is normal |
| Seed | 2 founders + 1 investor (2–1) *or* + 1 independent (3–2) | Balance tips toward shared control |
| Series A | Founder(s) + lead + independent (often 2–2–1) | **Independent seat frequently becomes the swing vote** |

**Design principles for pre-seed:** (1) keep the board **small and odd-numbered** to avoid deadlock;
(2) give away board seats **more slowly than equity** — a 10% investor does **not** automatically need a
seat (an **observer seat** is often enough); (3) define the **independent director** selection mechanism
now (mutual consent), because that seat later decides tie-breaks including CEO removal.

## III.2 Protective provisions / reserved matters (the real control terms)

These are actions the company **cannot take without investor/preferred consent**, regardless of board
or shareholder majority. Standard, defensible early-stage list:

- Amend the Articles/charter or the rights of the preferred shares.
- Create senior/pari-passu new share classes.
- Sell/merge/liquidate the company (change of control).
- Increase/decrease the board size; change the option pool beyond an agreed cap.
- Take on debt above a threshold; related-party transactions.
- Change the business fundamentally; pay dividends.

**Founder guardrails:** keep the list **short and specific**; set **monetary thresholds** so ordinary
operations don't need consent; ensure provisions require the **preferred *as a class*** (not any single
small investor's veto); avoid provisions that hand day-to-day operational control to investors.

## III.3 Voting, quorum, consents, drag & tag

- **Shareholder vs board matters** — ordinary operations sit with the board/management; constitutional
  changes sit with shareholders. The SHA/Articles draw the line.
- **Supermajority thresholds** — some actions need 75%+; make sure a **small investor can't block**
  routine financing.
- **Written consents & quorum** — define quorum so a single director can't stall the board by not
  showing up; allow written resolutions for speed.
- **Drag-along** — majority can *compel* the minority to sell in a bona-fide exit (prevents holdouts
  blocking an acquisition). **Tag-along / co-sale** — minority can *join* a sale on the same terms
  (protects small holders when founders sell). Pre-seed founders want **drag** (clean exits) and should
  accept reasonable **tag**.

## III.4 Information & inspection rights

Investors typically get: **audited/annual financials, quarterly/monthly management accounts, the
budget, and the cap table on request.** Reasonable and worth granting cleanly — a founder who runs the
[`Monthly_CFO_Review_Manual.md`](Monthly_CFO_Review_Manual.md) cadence already produces most of it. Cap
these rights to **major investors** (a minimum-ownership threshold) so the reporting burden doesn't
scale with every small cheque.

## III.5 Founder control levers (own less, still steer)

- **Board control** — retain founder-majority board seats; the board, not the shareholder %, runs the company.
- **Dual-class / super-voting shares** — founder shares carry more votes per share. Powerful but
  **check enforceability** in your chosen domicile (common in Cayman/Delaware; constrained in some GCC
  registries — see §IV.1).
- **Founder vesting with acceleration** — protects the *team* against a departing co-founder (§IV.2).
- **Reserved "founder matters"** — a small set of actions needing founder consent, mirroring investor
  protective provisions.
- **Voting agreements / proxies** — bind how certain shares vote (e.g., early angels vote with founders).

---

# PART IV — ADJACENT: legal & entity structure

*The structure decisions that sit around the cap table and are the most expensive to change later.*

## IV.1 Domicile & "the flip" — KSA opco vs. holding company

The single most consequential structural choice, and one the repo has **not** recorded (🔴). Options:

| Structure | What it is | Pros | Cons / KSA notes |
|---|---|---|---|
| **KSA-only opco** (LLC/closed JSC via **MISA** if foreign-owned) | Everything in one Saudi entity | Simplest; aligns with **RHQ/local-content/Vision-2030** preference; MISA allows up to **100% foreign ownership** in many tech activities | Some VC terms (preferred classes, super-voting, SAFE conversion) are **less standardized** in the local registry; secondary transfers can be heavier |
| **Holdco + KSA opco ("the flip")** — holding company in **ADGM, DIFC, Cayman, or Delaware** owning the Saudi opco | Investors subscribe to the holdco | **Investor-familiar** instruments & preferences; cleaner international exit/M&A; common-law flexibility (ADGM/DIFC/Cayman) | Cost + complexity; **transfer-pricing** between holdco and opco; may reduce KSA-local incentives; **tax residency** care |
| **ADGM/DIFC entity** specifically | Common-law free-zone holdco within the UAE | Common-law courts, VC-standard docs, GCC-proximate | Still needs the KSA opco for on-the-ground operations/MISA |

**Decision drivers:** where your **lead investors** are (GCC funds are comfortable with ADGM/DIFC; some
global funds still prefer Cayman/Delaware); your **exit thesis** (the repo's strategy narrative frames
strategic acquisition as the likely exit — acquirers prefer clean, familiar holdco structures); and
**tax** (below). **Flipping *after* you've issued shares and taken money is painful and taxable** —
which is why this belongs *before* the cap table is populated.

## IV.2 Founder agreements (do these now — cheapest insurance in the company)

- **Founder vesting** — even founders' own shares should vest (typ. **4-year vest, 1-year cliff**) so a
  co-founder who leaves in month 6 doesn't walk away with a quarter of the company. This is a **cap-table
  protection**, not a trust issue — investors will require it, and doing it pre-emptively is a strong signal.
- **IP assignment** — **all** founder/contractor IP must be assigned to the company in writing. Missing
  IP assignment is a **deal-killer in diligence**; for a money-movement product it's existential.
- **Acceleration** — **single-trigger** (on change of control) vs **double-trigger** (change of control
  *and* termination). **Double-trigger is market and founder-reasonable.**
- **Founder/roles/decision-rights agreement** — who decides what, what happens on departure, dispute
  resolution, and **the founder split itself** (the 🔴 in Part I). Put the split *in writing with vesting*.
- **Restrictive covenants** — confidentiality, non-compete/non-solicit (scope them to what's enforceable
  in KSA), and a leaver's-shares mechanism (good-leaver / bad-leaver).

## IV.3 Employee equity in KSA (the ESOP question, B2)

- **Direct-share ESOP** — real shares/options. Cleanest cap-table treatment but adds many small
  shareholders to a KSA register (administratively heavier locally than in Cayman/Delaware) — a reason
  founders often run employee equity **at the holdco**.
- **Phantom equity / SARs (Stock Appreciation Rights)** — a **contractual cash bonus tracking share
  value**; **no actual shares issued**. Common in GCC to avoid registry friction and to sidestep some
  Sharia/ownership complications. Doesn't dilute the legal cap table but is a real economic claim — track it.
- **Sharia lens** — equity ownership is **Sharia-compatible** (it's ownership, not interest); avoid
  **guaranteed returns** on any employee/instrument structure (that's the **riba** line the strategy docs
  flag re: Wakala — *"the agent must never guarantee a minimum return"*). Structure incentive pools as
  genuine equity or genuine profit-share, not guaranteed yield.
- **Tax/payroll** — confirm KSA treatment of option exercise / phantom payouts for **GOSI and personal
  tax** with an advisor (**verify** — rules and enforcement evolve).
- **Sizing** — pre-seed pools commonly **10–15% fully-diluted**; **don't over-provision** (unissued pool
  dilutes founders in the shuffle — §I.4). Reven has **6 execution hires** from Month 2 (🟢) with **no
  equity terms stated** (🔴) — B2 should set the pool *and* the per-hire grant policy.

## IV.4 Regulatory & tax overlay (ties to the repo's KSA reference)

From [`Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`](Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md)
Part 3 — **all rates flagged verify:**

- **Zakat vs CIT is an *ownership-driven* split** (this is why questionnaire **A7** is a cap-table
  input, not just a tax input): the **Saudi/GCC-owned** portion of equity is subject to **Zakat (≈2.5%)**;
  the **foreign-owned** portion to **Corporate Income Tax (20%)**. **Your cap table's nationality mix
  literally determines your tax base.** A foreign-heavy cap table raises CIT exposure; local co-founders
  or GCC funds shift weight to Zakat.
- **MISA license** — required for foreign ownership; enables up to 100% foreign ownership in eligible
  activities; fees vary — **get a current quote**.
- **WHT** — dividends to non-residents commonly **5%**; royalties **15%** (foreign SaaS/AI sometimes
  classed as royalty — disputed). Relevant to **how returns leave the company** to foreign holders.
- **RHQ 0% CIT/WHT (30y)** — MNC-only; **not** applicable to native pre-seed (don't model it).
- **ZATCA e-invoicing / SDAIA / CST** — operational compliance the finance docs already track; not
  cap-table items but part of the diligence surface.
- **Non-dilutive mechanics (keep off the cap table):** **Kafalah = guarantee (liability, not equity);
  SVC/Jada = fund-of-funds (accessed *via* VCs, not direct); TAQADAM/NTDP = grants.** Misclassifying any
  of these as equity corrupts the cap table.

## IV.5 Diligence-readiness & cap-table hygiene

What an investor's counsel will ask for — build it as you go, not the night before:

- [ ] **Cap table of record** (fully-diluted, per-holder, with instruments) — *the deliverable Part VI builds.*
- [ ] **Share register / statutory books** up to date and matching the cap table.
- [ ] **Signed founder agreements** with **vesting** and **IP assignment** (§IV.2).
- [ ] **SAFE/note stack** documented and its aggregate conversion modeled (N3).
- [ ] **Board & shareholder resolutions** authorizing every issuance.
- [ ] **Option plan** documented; grants approved; pool reconciled to the cap table (B2).
- [ ] **Entity documents** (Articles, MISA license, CR) current; ownership matches the register.
- [ ] **No verbal promises** of equity that aren't on the cap table (the classic hidden liability).
- [ ] **Tax status** (Zakat/CIT/WHT posture) consistent with the ownership mix (A7).

---

# PART V — Applied to Reven: what to decide now

1. **Populate the cap table before signing (Part VI).** You have a priced round shape (2M/10%/20M 🟢)
   but no ledger. Fill founder split, ESOP (B2), instrument/cap (A2), any SAFEs (N3), and share count.
2. **Lock the entity/domicile first (§IV.1).** Decide KSA-only vs holdco/flip *before* issuing shares —
   it's the one choice that's punishing to reverse and it dictates *which* company's cap table this is.
   Align it with where your lead investors sit and the repo's **acquisition-exit** thesis.
3. **Confirm the instrument (§II.1).** A 20M post reads as a **priced round**; if you'd rather defer
   valuation, a **post-money SAFE** with a cap is the alternative — but then keep the **SAFE-stack
   tracker (N3)** and model conversion, and prefer **SAFE over interest-bearing notes** for Sharia-sensitive
   investors (riba).
4. **Protect the founder block to the <60% guardrail (§II.5).** Right-size the ESOP, keep preference
   **1× non-participating**, take **board control not just equity**, and model dilution to Series A now.
5. **Sign founder vesting + IP assignment this quarter (§IV.2).** Cheapest, highest-leverage cap-table
   protection; also removes the most common diligence blocker for a money-movement product.
6. **Set the ownership-mix intentionally (§IV.4).** A7 isn't just tax admin — the Saudi/GCC-vs-foreign
   split **chooses your Zakat/CIT base.** Decide it with the tax posture in view.
7. **Keep non-dilutive money off the cap table (§IV.4).** Kafalah/grants/FoF are runway, not equity.

---

# PART VI — Fill-in cap-table workbook (converts 🔴 → cap table of record)

Complete these and the company has a real cap table. Cross-references to the questionnaire cells in
brackets. **Do not invent values — leave blanks as 🔴 until the founder confirms.**

### VI.1 Entity & instrument
| Field | Value | Ref |
|---|---|---|
| Legal entity & domicile (opco only / holdco+opco / ADGM / DIFC / Cayman / DE) | 🔴 | §IV.1 |
| Pre-seed instrument (priced / SAFE / convertible) | 🔴 | A2 |
| Valuation cap / discount (if SAFE/note) | 🔴 | A2 |
| Authorized share count & par value | 🔴 | §II.4 |
| Share classes (common / preferred; rights) | 🔴 | §II.3 |

### VI.2 Founders (one row each) — split must sum to the pre-money block
| Founder (role) | Shares | % (FD) | Vesting (yrs / cliff) | IP assigned? |
|---|---:|---:|---|---|
| CEO | 🔴 | 🔴 | 🔴 | 🔴 |
| CTO | 🔴 | 🔴 | 🔴 | 🔴 |
| CRO | 🔴 | 🔴 | 🔴 | 🔴 |
| COO | 🔴 | 🔴 | 🔴 | 🔴 |

### VI.3 Option pool (ESOP)
| Field | Value | Ref |
|---|---|---|
| Pool size (% FD) | 🔴 | B2 |
| Created pre- or post-money? | 🔴 | §I.4 |
| Instrument (options / phantom / SAR) | 🔴 | §IV.3 |
| Per-hire grant policy (the 6 execution hires) | 🔴 | §IV.3 |

### VI.4 Existing instruments (SAFE / convertible stack)
| Holder | Amount | Cap | Discount | Post-/pre-money SAFE? |
|---|---:|---:|---:|---|
| 🔴 | 🔴 | 🔴 | 🔴 | 🔴 (N3) |

### VI.5 This round
| Field | Value | Ref |
|---|---|---|
| Amount | **2,000,000 SAR** 🟢 | I.1 |
| Equity | **10%** 🟢 | I.1 |
| Post-money | **20,000,000 SAR** 🟢 | I.1 |
| Liquidation preference | 🔴 (recommend 1× non-participating) | §II.4 |
| Anti-dilution | 🔴 (recommend broad-based WA) | §II.4 |
| Board seat / observer? | 🔴 | §III.1 |
| Pro-rata rights? | 🔴 | §II.4 |

### VI.6 Ownership mix (tax base)
| Field | Value | Ref |
|---|---|---|
| Saudi/GCC ownership % | 🔴 | A7 → Zakat base |
| Foreign ownership % | 🔴 | A7 → CIT base |

---

# Glossary (direct · indirect · adjacent)

**Anti-dilution** — repricing that protects investors in a down round (broad-based WA = mild; full
ratchet = severe). · **Cap table** — per-holder register of ownership on a fully-diluted basis. ·
**Drag-along / tag-along** — majority can compel a sale / minority can join one. · **ESOP** — employee
share/option pool. · **Fully diluted** — all shares + all options (incl. unissued pool) + all
convertibles. · **Liquidation preference** — order and multiple of payout on exit (1× non-participating
= market early). · **MISA** — Saudi Ministry of Investment; licenses foreign ownership. · **Option-pool
shuffle** — creating the pool pre-money so founders absorb its dilution. · **Phantom equity / SAR** —
cash bonus tracking share value; no shares issued. · **Post-money SAFE** — SAFE whose % is fixed at
conversion; later SAFEs dilute founders. · **Preferred shares** — investor class with preference/control
rights. · **Pro-rata rights** — right to maintain % in future rounds. · **Protective provisions /
reserved matters** — actions needing preferred consent regardless of board majority. · **SAFE** — Simple
Agreement for Future Equity; not debt. · **SHA** — Shareholders' Agreement (governance constitution;
carries most GCC control terms). · **The flip** — placing a holding company (ADGM/DIFC/Cayman/DE) above
the KSA opco. · **Vesting / cliff** — equity earned over time; acceleration on defined triggers. ·
**Zakat vs CIT** — Saudi/GCC-owned equity → Zakat (~2.5%); foreign-owned → CIT (20%); set by the cap
table's nationality mix. · **Riba** — interest; avoid guaranteed returns (relevant to notes and
incentive structures).

---

## Sources & cross-references
- [`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`](Pre_Seed_2M_SAR_Financial_Model_Blueprint.md) — canonical 2M SAR / 10% / 20M post ask (Part I.1).
- [`Pre_Seed_12M_Model_Founder_Questionnaire.md`](Pre_Seed_12M_Model_Founder_Questionnaire.md) — open capital-structure cells A2, A7, B2, N2, N3.
- [`Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`](Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md) — Part 3 KSA reference (Zakat/CIT/WHT/MISA), SAFE-stack & <60% guardrail, non-dilutive mechanics.
- [`Monthly_CFO_Review_Manual.md`](Monthly_CFO_Review_Manual.md) — reporting cadence that satisfies investor information rights.
- [`README.md`](README.md) / [`CLAUDE.md`](CLAUDE.md) — governing phase model (this round sits entirely in Phase 1 — Capture).

*This dossier records the cap-table position as of the repo state on this branch and provides the
framework to complete it. Supersede only with an explicitly dated revision. Not legal or tax advice —
confirm KSA statutory items with Saudi counsel and a licensed Zakat/CIT advisor before filing or signing.*
