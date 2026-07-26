# The Path to Orchestration & Partnership Intelligence — Reven Scaling Roadmap

**Product:** Partner Revenue OS (commercial brand: **Reven**)
**Purpose:** One consolidated answer to two questions — *(1) what is the full roadmap for scaling into a partnership‑orchestration / partnership‑intelligence layer, and (2) what pre‑orchestrator maturity must be reached to earn the right to expand there?* This document synthesizes the strategy already distributed across the corpus into a single decision‑grade reference. It **adds no new strategy**; it consolidates and sequences the existing one and cites where each claim lives.

> **Phase‑discipline concordance** (per `ROADMAP_ALIGNMENT_AUDIT.md` §2, finding F‑4). Three numbering schemes coexist in this repo — keep them distinct:
> 1. **Product roadmap — 3 phases:** Capture → Settle → Orchestrate ( ≡ **MVP + V1 / V2 / V3** ).
> 2. **Partner‑lifecycle workflow — 22 phases** (Define Strategy … Executive Operating Review): the *operating process a program runs*, not the product roadmap.
> 3. **Onboarding‑manual — 25 customer‑journey phases:** all run *inside* product Phase 1.
> This document uses scheme (1) unless it explicitly says "workflow phase."

---

## 0. The one‑page answer

**Do we have a full, clear roadmap to become a full orchestrator layer?** Yes. It is the **reverse‑engineered climb**: design the terminal network first, work back to the system‑of‑record it needs, then to the smallest tool that captures the data the SoR needs — and put one network primitive in the wedge on day one. Named for clarity: **Capture → Settle → Orchestrate** (`Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` Part F1; `Master_Strategy_Dossier.md`).

**Do we understand the pre‑orchestrator requirements?** Yes, and they are *gated, not aspirational.* You cannot build or sell Phase 3 until Phase 1 and Phase 2 each clear a hard exit gate with written kill‑criteria — because **premature platform expansion is the #1 documented startup killer** (Startup Genome: 74% of high‑growth internet startups failed from premature scaling). The gates are what turn three phases into three *earned* phases.

**The two disciplines that govern the whole climb:**
- **Discipline 1 — Earn each altitude with the layer beneath it.** The same data that Capture collects becomes the substrate for Settle; the trust and bilateral data that Settle earns become the substrate for Orchestrate. Selling a high layer before the one beneath it is trusted is the core strategic error (`Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §7.3).
- **Discipline 2 — Internal ambition ≠ external banner.** "Orchestrator / partnership intelligence" is the **internal north star**; the **external category** is *"the partner‑revenue & settlement system of record."* Crossbeam owns "Ecosystem‑Led Growth"; Gartner renamed the category **PERM**; Impartner shipped "Orchestration Studio"; WorkSpan is an "Ecosystem Orchestration Platform." Leading with "orchestrator" walks into their guns. Arrive at orchestration *through* the money ledger, don't claim it on day one (`Reven_Product_Architecture_Audit.md` §2.1; `Reven_100_Strategic_Implications.md` #21–22).

**The one honest caveat:** the *plan* is venture‑grade (A−); the *shipped app* is a throwaway CRUD scaffold that builds a sliver of Capture and **none** of the moat. The gap to the goal is **execution, not vision** — and there is a competitive clock (§7).

---

## 1. The terminal vision — what "orchestrator / partnership intelligence" actually is

The endgame is **not** "a workflow tool for running partnerships." It is a **control point over capital allocation**:

> **Own the ledger every Partner P&L runs on.** (`Master_Strategy_Dossier.md`; `Partner_Revenue_OS_Venture_Scale_Narrative.md`)

Concretely, the orchestration / intelligence layer is where:
- **The Partner P&L** — a defensible, audit‑grade, per‑partner profit‑and‑loss and ROI view (partner‑sourced + influenced revenue − payout cost − MDF/co‑marketing − enablement − support = **net contribution**) — exists and is trusted at budget time. Most programs today track partner *revenue* but never *cost‑to‑serve*; a high‑revenue reseller can net less than a mid‑tier referrer (`Partner_Revenue_OS_PDR.md` Layer 7; 150‑levers #146).
- **The quarterly partner‑investment decision runs on the product** — incentive redesign, tier changes, renegotiation, new programs — turning workflow history into capital allocation (workflow phase 22; 150‑levers #149).
- **The multi‑company network lights up** — one partner represented across many customers' tenants, co‑sell account mapping, and a two‑sided settlement record both finance teams trust simultaneously (`ROADMAP_ALIGNMENT_AUDIT.md` §2; 150‑levers Layer 12).
- **"Partnership intelligence" is the L5 layer on top of the proprietary graph** — partner ROI, effort‑share/health scoring, forecasting, tier/incentive simulation, influence decay, decision→outcome measurement, and AI recommendations, plus a proprietary cross‑tenant benchmark — a **"Controlled Partner Revenue" index** no point tool can assemble (`partner-revenue-os-PDR-v5.md` §19 V3; `Reven_100_Strategic_Implications.md` #37, #67).

**Discipline note on AI/intelligence:** the defensible role of AI is *on top of a proprietary cross‑tenant data asset*. An agent with no exclusive data is a commodity wrapper. Build the data/settlement moat first; the intelligence layer is a thin, late layer — an *outcome* of owning the data, not the headline (`Reverse_Engineered_Strategy_Deep_Dive_Companion.md`; `Reven_100_Strategic_Implications.md` #5).

---

## 2. The governing architecture — the climb, in one picture

### 2.1 The altitude stack (why each rung earns the next)

| Rung | Layer | What it is | Why it compounds |
|---|---|---|---|
| **L1** | Capture — claim ledger | The Partner Revenue Claim as system of record | Table stakes; the on‑ramp that collects the data |
| **L2** | Trust / information — attribution quality | One defensible Attribution of Record | **The moat seed** — competitors are structurally blind here |
| **L3** | Finance / compliance — ZATCA/WHT/VAT | Finance‑grade, audit‑defensible output | Flips the buyer from Head of Partnerships → CFO |
| **L4** | Settlement / flow — bilateral ledger | The shared money‑of‑record two firms reconcile | Switching costs become real; money is non‑substitutable |
| **L5** | Intelligence / orchestration | Partner P&L, ROI, simulation, benchmark | Owns the **capital‑allocation decision** |
| **L6** | Network | Cross‑tenant partner identity → partner network | The deepest, terminal **data network effect** |

*Source: `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` §7.3.* Each step is both a bigger slice of the value pool **and** a higher switching cost — which is why pricing each layer to unlock the next makes expansion the default.

### 2.2 The three phases ↔ releases ↔ funding

| Phase | Release | Timeline | Funding stage | The one‑sentence job |
|---|---|---|---|---|
| **1 — Capture** | MVP + V1 | ~Mo 0–9 | Pre‑seed → Seed | Be the partner team's daily tool *and* quietly capture the claim + cross‑company link |
| **2 — Settle** | V2 | ~Mo 9–24 | Series A | Be the shared, auditable ledger two companies trust to split, reconcile, and pay — compliance‑native |
| **3 — Orchestrate** | V3 | Mo 24+ | Series B → scale | Be the network + intelligence layer where partnerships are designed, run, and funded — monetized on the money layer |

*Governing rule (stated identically in three docs): **no V2 capability ships before the Phase‑1 exit gate is met** (`partner-revenue-os-PDR-v5.md:309`).*

### 2.3 The architectural spine (the parts that must exist for the endgame)

**10 capability layers** (`partner-revenue-os-PDR-v5.md` §7): Partner Operating · Partner Revenue Claim Ledger · Attribution & Protection · **Ecosystem Attribution Hub (the moat)** · Agreement & Rule Engine · Revenue & Eligibility · Financial Ledger & Settlement · Governance & Cadence · **Intelligence & Forecasting** · Platform/Security/Integration.

**The 10 ADRs** encode the irreversible early decisions. Four are load‑bearing for the orchestration endgame:
- **ADR‑0003 — Multi‑tenant with cross‑tenant partner identity.** *One partner identity spans tenants.* This is the **network substrate** — near‑impossible to retrofit, so it ships in the MVP even though the network lights up in Phase 3.
- **ADR‑0005 — Append‑only double‑entry payout ledger.** Money facts are immutable; corrections are reversals; accrued/eligible/approved/paid are distinct facts — the difference between "a tool" and "a system of record."
- **ADR‑0002 — Event‑sourced writes** and **ADR‑0007 — dedicated identity‑resolution/MDM service** (deterministic + probabilistic matching) — the engine that makes attribution and the network possible at scale.

**The atomic object — the Partner Revenue Claim** (`partner-revenue-os-PDR-v5.md` §12): the claim record moves `Draft → Submitted → Preflight → InAttribution → Decided`. The **money** moves on a separate **Ledger Entry**: **Accrued → Eligible → Approved → Paid** (reverse: Reversed / Clawed‑Back). In the MVP only **Accrued/Eligible** exist and are *recorded, not executed*; **Approved/Paid/Reversed** arrive in V2 (Settle).

**Why any of this is defensible — the four economic problems it solves** (`partner-revenue-os-PDR-v5.md` §2): adverse selection (screening partners whose quality you can't observe), moral hazard (eliciting effort you can't verify), hold‑up (protecting sunk selling investment under incomplete contracts → deal‑registration/protection as engineered quasi‑property rights), and credible commitment (a self‑enforcing relational contract sustained by trust). These are the "why" — cite v5, not the older PDR, which doesn't use this framing.

---

## 3. The pre‑orchestrator requirements — step by step (the gates you must clear)

This is the heart of the answer. **You do not earn Orchestrate by building it. You earn it by clearing two gates below it.**

### 3.1 Phase 1 — CAPTURE (the maturity you must reach first)

**Build (only this):** partner registry + governed intake (source+owner+dedupe); claim registration + preflight; **one Attribution of Record** (human‑decided, model *stubbed*); protection window + expiry notice; payout‑**readiness preview**; **cross‑tenant partner identity**; **GCC compliance capture stubs** (WHT status, VAT treatment, ZATCA fields — captured, not automated); CRM link + event/audit log. First visible loop: **register → attribute → preview eligibility → first‑payout milestone visible**, in days.

**The finance boundary (non‑negotiable):** everything payout‑related is **read / calculate / display only**. The first‑payout milestone is *recorded* (manual entry or import), never executed. No approval‑to‑pay, no rail integration, no automated ZATCA clearance, no holding of funds (`partner-revenue-os-PDR-v5.md:316`; `ROADMAP_ALIGNMENT_AUDIT.md` §2).

**Do NOT build yet:** settlement automation, any payout execution, bank/payment‑rail writes, automated ZATCA clearance, full P&L, advanced multi‑touch scoring, marketplace attribution.

**Phase‑1 EXIT GATE — all must be true before any Phase‑2 work or a Settle raise:**
- **100+ real claims** processed on messy CRM data
- **3–5 design partners** with a **finance reviewer accepting an evidence pack**
- **Weekly active usage** by partner‑ops / finance
- **Time‑to‑first‑claim < ~14 days**
- One undeniable proof sentence: *"their payouts now reconcile and produce a ZATCA‑clean invoice."*

**Kill‑criteria (stop or pivot):** buyers only want CRM‑style partner reporting; no executive cares; partners won't commit/pay; capture friction is too high to feed Phase 2.

**Moat accrued here:** the identity‑resolution data flywheel starts + you bank **counter‑positioning** (compliance‑native). These are *seeds, not yet a moat.*

**Pricing here:** annual SaaS on a buyer‑friendly metric — **per active partner**, unlimited internal seats — plus implementation. Indicative ACV **$6–50K**; GM ≥75%, NRR ≥105%, CAC payback <18mo. *Never* seats/portals, *never* a % of the partner's money yet (`Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` §1; `Reven_Pricing_Executive_Summary.md`).

### 3.2 Phase 2 — SETTLE (the maturity that actually creates the moat)

**Build:** agreement→rule engine (versioned, bitemporal); **append‑only double‑entry ledger** (approved/paid/reversed; clawback‑by‑netting); **bilateral reconciliation + dispute workflow (the white space)**; finance evidence packs, statements, eligibility‑with‑explanation; **compliance engine** (ZATCA clearance, WHT 15/5/20, reverse‑charge VAT, multi‑entity, AR/EN bilingual docs); billing/ERP integration, invoice/collection matching, FX. **Settlement/disbursement is built LAST inside the phase — or partnered to a rail.** Be the ledger‑of‑record *without moving money* first, to dodge the money‑transmitter / PayFac / merchant‑of‑record trap.

**The buyer shifts:** the **CFO is now the economic buyer.** You've moved from "partner tool" to "revenue infrastructure."

**Phase‑2 EXIT GATE:**
- Settlement **idempotent — zero double‑pays**
- Deductions **explained pre‑settlement**; refunds flow eligibility → ledger reversal → clawback‑by‑netting
- **Clean ERP reconciliation** on real data; passes a real audit
- **NRR signal > 110–120%** via module attach
- A CFO says on a reference call: *"we trust these numbers."*

**Kill‑criteria:** CFOs won't trust the numbers even with evidence; reconciliation breaks on real data; the dispute pain proves *tolerated*, not urgent (→ Phase 2 timing slips, monetization thesis weakens).

**Moat accrued here — this is where it becomes real:** **switching costs** (a finance SoR whose rip‑out loses history, evidence, and audit trail), **bilateral data no competitor has**, and **compliance trust** (a passed audit, a Shariah sign‑off).

**Pricing here:** keep the SaaS base; add a **thin transactional layer** — a small per‑payout fee ($0.25–0.50) and, *only with caps and declining tiers*, **10–30 bps on settled volume**. The CFO owns this budget and resists uncapped percentages. Indicative ACV **$25–250K+**; GM ≥70% blended.

### 3.3 What must be TRUE to earn Orchestrate (the readiness checklist)

Before Phase 3 is built *or named externally*, all of the following must hold:

| Dimension | The threshold |
|---|---|
| **Product maturity** | Phase‑1 gate cleared **and** Phase‑2 gate cleared: idempotent settlement, clean ERP reconciliation, a passed audit |
| **Data** | The bilateral revenue/attribution graph has accumulated; identity resolution has measured precision/recall on real design‑partner data (the single experiment that discharges the PDR's biggest assumption) |
| **Trust** | A CFO on a reference call says *"we trust these numbers"*; finance/compliance trust earned by passing real audits |
| **References** | 2–3 anchor logos / 3–5 paying, activated customers; referenceable by design |
| **Financial metrics** | **NRR the headline gate:** >100% at seed → **>110–120% to exit Settle** → 120–130% at Orchestrate. Blended **GM ≥70%** at every phase |
| **Network thesis** | Cross‑tenant rollout is gated on a *credible network‑effect thesis* (a bilateral‑utility cold‑start that gives the larger party value before the counterparty joins), not built on hope |
| **Category discipline** | Develop the "Controlled Partner Revenue" POV now; **don't declare the category until you have king‑grade proof** |

*Sources: `Master_Strategy_Dossier.md`; `Partner_Revenue_OS_Venture_Scale_Narrative.md`; `Reverse_Engineered_Strategy_Deep_Dive_Companion.md`; `partner-revenue-os-PDR-v5.md` §22.*

---

## 4. Phase 3 — ORCHESTRATE / Partnership Intelligence (what it becomes)

**Build (V3 "Investable"):** partner **P&L and ROI**; effort‑share + partner‑health scoring; **forecasting**; cohort & concentration analysis; tier/incentive simulation; **full multi‑touch credit recommendation** + influence decay; **identity‑resolution/MDM at scale**; decision→outcome measurement; **AI recommendations**; and the **partner network** (one partner across many customers; co‑sell account mapping) lit up on the cross‑tenant identity carried since the MVP.

**Exit criteria for V3:** a defensible partner P&L exists per partner and program; the **executive review runs from the product**; decisions are logged and their outcomes measured.

**Monetization:** a **small net basis‑point rate on partner‑revenue / GMV under management**, with **declining tiers + caps**, positioned as *cost‑of‑rail, not rake*. Durable embedded‑fintech net take is **~25–60 bps** (Toast ~54, ServiceTitan ~25, BILL ~26) — a **volume game** that works at nine/ten‑figure flow, *not* pre‑seed, so it always rides on top of the SaaS base. Charge on the payout/commission base, **never on gross revenue**; the take‑rate ceiling is ~3% and buyers resent visible skims (`Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` §1, §3).

**Positioning discipline (again):** monetize the **money layer** and the **intelligence layer**; position as *the revenue/settlement SoR the ecosystem runs on*, adjacent to ELG — **not** as "the orchestrator." Keep the network + benchmark + intelligence layers **proprietary** even while supporting open data exchange at the boundaries, or the network value diffuses and you capture none of it (`Reven_1000_Strategic_Implications.md` #678).

---

## 5. The monetization arc that funds the climb

```
Phase 0  Design partners     $5–15K paid pilots (proof, not economics)
Phase 1  Capture             Per‑active‑partner annual SaaS + implementation   $6–50K ACV   · GM ≥75% · NRR ≥105%
Phase 2  Settle              SaaS base + per‑payout fee + capped 10–30 bps      $25–250K ACV · GM ≥70% · NRR ≥115–120%
Phase 3  Orchestrate         Net 25–60 bps on revenue‑under‑management + caps   6–7 figures  · NRR ≥120–130%
```

**The single most important pricing rule:** the most‑resented model is the visible **% take‑rate on payouts** (PartnerStack 3–15%, Paddle 5%). Be the **neutral Switzerland** that does *not* skim a percentage of the partner's money in Phases 1–2; introduce ad‑valorem pricing **late, capped, and only on flow you provably enable**. Target capturing ~10–20% of measurable value (≈ sub‑30 bps of partner‑attributed revenue) — never a visible cut.

---

## 6. The moat sequence (7 Powers — sequenced, not simultaneous)

| Power | When it's available | How it's built here |
|---|---|---|
| **Counter‑positioning** | **Day one** | Compliance‑native, finance‑grade revenue handling incumbents won't copy without cannibalizing their transaction model — *lead with it* |
| **Switching costs** | Phase 2 (Settle) | Bilateral history, evidence packs, audit trail, operating‑cadence rituals — rip‑out loses the record *and* the rhythm |
| **Cornered resource** | Phase 2–3 | The proprietary bilateral revenue/attribution graph + a Shariah/audit credential |
| **Network economies** | Phase 3 (Orchestrate) | Cross‑tenant identity → a partner across many customers → the network. **Terminal, winner‑take‑most. Seeded day one, ignited last.** |

**Map the moat story to the raise:** Seed = counter‑positioning; Series A = switching‑cost / retention data; Series B = network economies igniting. Raise enough to reach the **Settle proof** ("the CFO trusts these numbers"), not just the Capture demo — the valuation step‑change is at the ledger + reconciliation, not the portal.

---

## 7. The honest reality — what stands between the plan and the goal

1. **Plan A−, build D.** The strategy corpus is venture‑grade and ~90% aligned to the goal. The shipped `revenue-share-platform/` app is a single‑tenant, untested CRUD scaffold with a broken UI: **no claim ledger, no cross‑tenant identity, no multi‑tenancy, no reconciliation, no compliance engine** — and the revenue share amount is trusted from the browser. It builds a *sliver* of Capture and **none** of the moat. Treat it as a clickable demo, not a foundation; rebuild at the data spine (`Reven_Product_Architecture_Audit.md` §3).
2. **The competitive clock is ringing.** AppDirect acquired **Tackle.io (Dec 2025)** and **PartnerStack (Apr 2026)** — assembling Capture + payouts + marketplace settlement, i.e. *this thesis*. What they may **not** have is **bilateral, compliance‑native (ZATCA/WHT) settlement‑as‑SoR** — precisely the seam. But it's structurally non‑neutral (a marketplace taking a cut), and neutrality is the one thing it can't claim. The window to plant the settlement‑SoR flag is **measured in quarters** (`Reven_PERM_Category_Deep_Dive.md` §5.5; `Reven_Execution_Plan_Next_2_Quarters.md`).
3. **The #1 unresolved decision — beachhead.** GCC‑regulated B2B (compliance wedge, capital‑efficient, non‑copyable) vs. global co‑sell/marketplace SaaS (bigger, more competitive). The corpus recommends **GCC/Saudi** and says the choice must be **locked before seed** — it gates the data model, the compliance build, and the ICP (`Partner_Revenue_OS_Venture_Scale_Narrative.md`; `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md`).

**The ICP that makes the wedge concrete:** mid‑market‑to‑large **technology vendors and their channel/SI partners in KSA**, biased to **RHQs and firms selling into government/regulated buyers**, running material reseller/co‑sell/referral programs, already on a CRM, facing **ZATCA/WHT/PDPL** obligations. Firmographic filter: **20–200 active partners, partner revenue >20–25%, one overstretched partner‑ops person on spreadsheets, real audit exposure.** Auto‑disqualify <10% partner revenue and direct‑sales‑dominant cultures. The forcing function: **ZATCA Wave 24 (turnover > SAR 375k, integrate by 30 Jun 2026).**

---

## 8. The near‑term critical path (next two quarters)

**The one thing:** stop building a PRM demo; start building the **bilateral, compliance‑native partner‑revenue settlement SoR — ledger first.**

**Decide this week:** (1) beachhead = GCC/Saudi; (2) external label = "partner‑revenue & settlement system of record," keep "orchestrator" internal; (3) the current app is throwaway — quarantine it, rebuild at the data spine.

**Build order (each step gated on the prior — resist building anything below your current line):**
1. **Append‑only Partner Revenue Claim ledger** — immutable, double‑entry, idempotent; **server‑side amounts (never client‑supplied)**.
2. **Cross‑tenant partner identity** — ship in the MVP; impossible to retrofit; the seed of the network.
3. **One visible loop** — claim → attribution → eligibility → audited statement, demoable in days.
4. **ZATCA/WHT — *capture* in the MVP, *clearance* in Settle** — timed to the 30 Jun 2026 Wave‑24 readiness clock.
5. **Integrations** — Salesforce/HubSpot + one billing/ERP + reliable, idempotent webhooks.

**Defer:** AI/forecasting, Partner P&L, money rails, breadth.

**First two hires:** a **staff/principal engineer with ledger or payments‑infra experience** (Modern Treasury / TigerBeetle / Stripe‑style) and a **KSA tax/compliance SME** (ZATCA Phase‑2 + WHT/VAT). The moat is financial engineering + regulatory depth, not CRUD.

---

## 9. Non‑negotiables / guardrails (the discipline that keeps the roadmap true)

- **Hold the gates.** Nothing from Phase 2 ships before the Phase‑1 exit gate; no money moves before the Phase‑2 gate. Write kill‑criteria so founder excitement can't override them.
- **Network primitive on day one.** Cross‑tenant identity in the MVP — cheap now, impossible to retrofit.
- **Ledger‑of‑record before money movement.** Be the SoR first; add basis‑points‑on‑flow only after the SoR is entrenched. Watch ASC‑606 principal‑vs‑agent: holding/disbursing funds can make *you* the principal.
- **Counter‑position, don't compete on features.** Never sell "a better PRM." Sell "the only partner tool whose payouts come out ZATCA‑cleared, WHT‑correct, and reconcilable for both companies' finance teams."
- **Narrate breadth, sequence depth.** Show the full platform arc; ship only the wedge.
- **Blended GM ≥ 70% and no visible take‑rate early.** Below 70%, diligence asks "is this even software?"
- **Never call yourself the orchestrator externally until every layer beneath it is trusted.**

---

### Appendix — where each part of this roadmap lives in the corpus

| Topic | Source of truth |
|---|---|
| Capture→Settle→Orchestrate, exit gates, kill‑criteria, moat sequence | `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md`; `Partner_Revenue_OS_Master_Strategy_Dossier.md` |
| Phase concordance, finance boundary, edit audit | `ROADMAP_ALIGNMENT_AUDIT.md` |
| 10 layers, 10 ADRs, claim data model, release plan (MVP→V3), North Star | `partner-revenue-os-PDR-v5.md`; `Partner_Revenue_OS_PDR.md` |
| 22‑phase workflow, 12 orchestration layers, 150 levers | `Partnership_Orchestration_150_Levers_and_Layers.md` |
| PERM consolidation, the settlement seam, the clock | `Reven_PERM_Category_Deep_Dive.md`; `Reven_Product_Architecture_Audit.md` |
| ICP, Saudi value pool (L1–L3), 3‑yr SOM ramp | `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` |
| Pricing arc (5 stages → 3 phases), bps, NRR gates | `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md`; `Reven_Pricing_Executive_Summary.md` |
| Do‑now, build order, first hires | `Reven_Execution_Plan_Next_2_Quarters.md` |
| Strategic implications atlas (100 / 1000) | `Reven_100_Strategic_Implications.md`; `Reven_1000_Strategic_Implications.md` |

*This document is a synthesis/consolidation of the existing corpus for navigation and decision‑making; it introduces no new commercial figures. All external market figures inherit the corpus's evidence standard (multi‑source‑corroborated, not primary‑fetched) and should be certified before external use.*
