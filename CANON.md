# CANON — the governing rules

**What this is.** The binding content of the repository, extracted from the four canon documents into
one place. Every rule below is traced to its source. **This file adds nothing and decides nothing** — it
is a consolidation, not a new authority. Where the sources disagree, §11 records the disagreement
rather than resolving it.

**Sources (the canon set).**

| # | File | What it contributes |
| --- | --- | --- |
| **S1** | `README.md` | Phase model, positioning rule, phase discipline |
| **S2** | `ROADMAP_ALIGNMENT_AUDIT.md` | Canonical phase table, finance boundary, phase-naming concordance, the four mandates |
| **S3** | `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` | Phase definitions end-to-end, design rules, exit gates, kill-criteria, moat sequencing, GCC wedge |
| **S4** | `BRAND.md` | Brand truth |

> **Precedence caveat.** S3 is named source of truth by both S1 and S2 §2. However
> `Partner_Revenue_OS_Master_Strategy_Dossier.md` opens by declaring that it *"consolidates and
> supersedes"* S3. That conflict is **unresolved** — see §11.1. This file extracts from S3 because
> S1 and S2 point there; the Dossier does not contradict any rule below, it restates them.

---

## 1. The founder's four mandates

The standard everything in the repo is audited against. `[S2 §"Audited against the founder's mandate"]`

1. The product enters the market as a **PRM** (Partner Relationship Management).
2. The solution is **not directly in finance now** — no money movement in the entry product.
3. Expansion into **Revenue-Sharing Infrastructure for B2B entities** happens **after multiple gated phases**.
4. This sequencing must be **clear and consistent across every phase in every repo document**.

---

## 2. The phase model

The canonical sequencing. All documents conform to this. `[S1 §"The governing phase model"; S2 §2]`

| Phase | Name | Timeline | What it is | Finance boundary |
| --- | --- | --- | --- | --- |
| **1** | **Capture** — claim-centric, compliance-native **PRM** | ~Months 0–9 | Partner registry, deal/claim registration, attribution, protection windows, payout-**readiness preview**, cross-tenant identity, GCC compliance **capture stubs** | **No money movement. No settlement automation. Calculate, track, and prepare only.** |
| **2** | **Settle** — bilateral revenue system-of-record | ~Months 9–24 | Rule engine, append-only double-entry ledger, bilateral reconciliation, dispute workflow, compliance engine (ZATCA/WHT/VAT), ERP/billing integration | Settlement/disbursement built **last** within the phase — or **partnered to a rail**. Be the ledger-of-record **without moving money** first. |
| **3** | **Orchestrate** — partnership network, idea → activation | Months 24+ | Partner P&L, forecasting, co-sell, the multi-company network on cross-tenant identity | Basis points on settled flow only here. MoR / PayFac / money-transmitter is a **separate, later, explicit decision — never an implicit feature.** |

**Renamed from the original framing** `[S3 §B3]`:

| Phase | Old name | Re-engineered name | The one-sentence job |
| --- | --- | --- | --- |
| 1 | "PRM" | **Capture** | Be the partner team's daily tool *and* quietly capture the claim + cross-company link |
| 2 | "Revenue-sharing" | **Settle** | Be the shared, auditable ledger two companies trust to split, reconcile, and pay — compliance-native |
| 3 | "Orchestration" | **Orchestrate** | Be the network where partnerships are designed, activated, and run — monetized on the money layer |

---

## 3. The positioning rule

`[S1 §"Positioning rule"; S2 §2 "The PRM-first reconciliation"]`

> The entry product is **sold and experienced as an easy, claim-centric PRM** — never a *generic* PRM,
> and **never a fintech in Phase 1**. "Control layer" / "revenue OS" language describes the
> **architecture underneath**, not the Phase-1 go-to-market.

**The governing interpretation.** Wherever a repo document says "not a PRM," read it as "**not a
*generic* PRM** — a claim-centric PRM whose data model is built for Phase 2/3." Its core object is the
Partner Revenue Claim; its identity model is cross-tenant. `[S2 §2]`

**The approved standard sentence** (use verbatim in field-facing documents) `[S2 §3.2 F-6]`:

> *"Experienced and sold as an easy, claim-centric PRM; engineered underneath as the system of record
> for partner revenue — never a generic PRM, never a fintech in Phase 1."*

**The Trojan horse, stated fully** `[S3 §B3]`:

> To the buyer it feels like an easy PRM (partner registry, deal registration, status, payout-readiness)
> so it adopts like a tool. Underneath, its atomic object is the Partner Revenue Claim and its identity
> model is cross-tenant (ADR-0003), so the same data becomes the substrate for Phase-2 settlement and the
> Phase-3 network. And it counter-positions on the one axis incumbents can't cheaply copy: finance-grade,
> ZATCA-cleared, WHT-correct, Sharia-aligned revenue handling.

---

## 4. The finance boundary

Applies to every document and every build decision. `[S2 §2 "The finance boundary rule"]`

**✅ Allowed in Phase 1**
- Calculating payout *eligibility*
- Previewing amounts
- Tracking readiness
- Capturing compliance fields (WHT status, VAT treatment, ZATCA fields)
- Audit logs
- Evidence packs

**❌ Not allowed in Phase 1**
- Executing payouts
- Holding or routing funds
- Settlement automation
- Escrow
- Bank / payment-rail **write** integrations
- Automated ZATCA clearance
- Refund / chargeback **execution** (recording them as data is fine)
- Invoicing that moves money

**The read-vs-operate rule.** In Phase 1 every finance-system integration is **read-only** (evidence,
validation, reconciliation data). No write/execute integration with any payment rail, PSP, bank, or
clearance API ships in Phase 1. Cataloguing a rail is not a commitment to build it early.
`[S2 §3.2 F-3, §5]`

**The payout-feature rule** (the sentence added to both PDRs) `[S2 §3.2 F-2]`:

> *All payout-related MVP features are read/calculate/display only. The system records that a payout
> became due and whether it was paid (entered manually or imported); it does not approve-to-pay into any
> rail, execute, reverse, or clear anything until Phase 2 (Settle), and money movement itself is the
> final step of Phase 2 or partnered out.*

**The GTM rule** `[S2 §3.2 F-5]`:

> *Phase-1 pilots must never promise payout execution, settlement automation, escrow, or automated ZATCA
> clearance. Sell the preview and the evidence pack; settlement is the Phase-2 expansion conversation.*

---

## 5. The gates

**Phase discipline** `[S1]`: no Phase-2 capability ships before the Phase-1 exit gate; no money moves
before the Phase-2 settlement gate. Nothing from Phase 2 ships until Phase 1's exit gate is met — this is
a **veto**, and kill-criteria are written down so founder excitement cannot override them. `[S3 §F5]`

### 5.1 Phase-1 exit gate — all must be true `[S1; S3 §Phase 1]`
- **100+ real claims** processed on messy CRM data
- **3–5 design partners** with a finance reviewer accepting an evidence pack
- **Weekly active usage** by partner-ops / finance
- **Time-to-first-claim < ~14 days**
- One undeniable proof sentence: *"their payouts now reconcile and produce a ZATCA-clean invoice"*

### 5.2 Phase-1 kill-criteria `[S3 §Phase 1]`
Stop or pivot if: buyers only want CRM-style partner reporting; no executive cares; partners won't commit
or pay; capture friction is too high to feed Phase 2.

### 5.3 Money-movement gate (even inside Phase 2) `[S2 §2]`
Requires: settlement idempotency proven · clean ERP reconciliation · CFO reference trust. **And even
then — partner the rail before becoming one.**

### 5.4 Phase-2 exit gate `[S3 §Phase 2]`
Settlement idempotent (zero double-pays) · deductions explained pre-settlement · refunds flow through
eligibility → ledger reversal → clawback-by-netting · clean ERP reconciliation · **NRR signal
>110–120%** via module attach · a CFO says on a reference call *"we trust these numbers."*

### 5.5 Phase-2 kill-criteria `[S3 §Phase 2]`
CFOs won't trust the numbers even with evidence; reconciliation breaks on real data; the dispute pain
proves *tolerated* rather than urgent.

---

## 6. The three non-negotiable design rules

`[S3 §B3]`

1. **Embed, don't portal.** Phase 1 lives where work happens (CRM, Slack/Teams, email). The standalone
   portal is the thing buyers are fleeing — counter-position it.
2. **Network primitive on day one.** Cross-tenant partner identity ships in the MVP. Cheap to build
   early, near-impossible to retrofit; it is the seed of the Phase-3 network.
3. **Counter-position, don't compete on features.** Never sell "a better PRM." Sell *"the only partner
   tool whose payouts come out ZATCA-cleared, WHT-correct, and reconcilable for both companies' finance
   teams"* — a sentence unavailable to PartnerStack, Impartner, or Crossbeam.

---

## 7. Phase 1 — the build list

**Build only this** `[S3 §Phase 1]`
1. Partner registry + governed intake (source + owner + dedupe)
2. Claim registration + preflight
3. One Attribution of Record (human-decided, model stubbed)
4. Protection window + expiry notice
5. Payout-readiness + first-payout milestone
6. **Cross-tenant partner identity**
7. **GCC compliance capture stubs** (WHT status, VAT treatment, ZATCA fields) — before automating clearance
8. CRM link + event/audit log

**Do not build yet** `[S3 §Phase 1]`
Full ERP/billing integration · settlement automation · multi-touch scoring · full P&L · the network UI ·
marketplace attribution.

**Who buys.** Head of Partnerships (champion) · CFO/Finance (validator — payouts must be defensible and
compliant) · RevOps (process validator/blocker).

**GTM.** Founder-led sales into one GCC beachhead; 3–5 design partners with commitment and a path to
paid; MEDDPICC (watch the Paper Process); "teach the problem." **No PLG, no AE hires, no paid marketing**
until reply/discovery resonance.

**Pricing.** Annual SaaS + implementation; Starter/Growth/Enterprise; price on **active partners or
partner-attributed revenue** — never seats or portals.

---

## 8. The moat architecture

**7 Powers sequencing** `[S3 §Part D]`

| Power | When available | How it is built here | Status |
| --- | --- | --- | --- |
| **Counter-positioning** | Day one | Compliance-native, finance-grade revenue handling incumbents won't copy without cannibalizing their transaction model | Available now — **lead with it** |
| **Switching costs** | Phase 2 | Bilateral history, evidence packs, audit trail, operating-cadence rituals | Earned in Settle |
| **Network economies** | Phase 3 | Cross-tenant identity → one partner across many customers → the network | Terminal moat; **seed day one** |
| **Cornered resource** | Phase 2–3 | Proprietary bilateral revenue/attribution graph + a Shariah/audit credential | Accrues with data |
| **Scale / Process / Brand** | Later | Productized onboarding; category ownership on the money layer | Aspirational |

**Embedded-finance staging — do not skip a step** `[S3 §Part D]`
1. Be the SoR for the rev-share agreement + reconciliation (software ARR, agent/net accounting, low liability)
2. Once you hold the ledger + dispute data, layer settlement and take basis points
3. Full MoR/PayFac is a multi-year, regulated, balance-sheet commitment — **a later decision, not an MVP feature**

⚠️ **ASC-606 principal-vs-agent:** holding or disbursing funds can make *you* the principal — gross
revenue, real liability. This is the mechanism behind the whole "ledger before money" rule.

---

## 9. The GCC wedge — five execution rules

`[S3 §Part E]`

1. **Build compliance into the engine, not as localization** — ZATCA clearance (UBL 2.1 XML,
   cryptographic stamp, QR), the WHT matrix, reverse-charge VAT, multi-entity, AR/EN bilingual invoices.
   Not deployable in KSA without it — which is exactly why it is a moat once you have it.
2. **Right-size GTM** — 6–18 month cycles, multi-signatory approvals, channel-led distribution (local
   SIs/distributors), an **RHQ** for public-sector deals. No PLG velocity.
3. **Make Sharia-alignment deliberate and scholar-validated** — commission-on-actual-performance
   (permissible); avoid guaranteed/fixed returns (riba) and ambiguous terms (gharar); earn a
   Shariah-board sign-off you can market.
4. **Fix the TAM story before any deck** — retire "$133B by 2030" (already met). Build a **bottom-up**
   TAM; use IDC ICT-spend ~$39.6B (2025) as addressable spend; cite the $131.9B digital economy only as
   macro context, attributed correctly (absolute → MCIT/Vision 2030; 16% of GDP → GASTAT).
5. **Use the VC tailwind for the raise, not as demand proof.**

**The concrete value proposition** `[S3 §Part E]`:
> *"Partner payouts that come out automatically ZATCA-cleared, withholding-tax-correct, reverse-charge-VAT-aware,
> bilingual, and reconcilable for both companies' finance teams."*

⚠️ **Open compliance number.** S3 specifies "the **15/5/20** WHT matrix." Two non-canon documents quote
different rates — `Reven_Execution_Plan_Next_2_Quarters.md` ("15%/10%") and
`Reven_100_Strategic_Implications.md` ("15% royalties / 10% services"). These are not reconciled anywhere
in the repo. **Confirm with a KSA tax SME before any of these numbers reaches a customer, a deck, or the
rules engine.**

---

## 10. Evidence discipline

The rule that governs every number written in this repository. `[S3 §"Evidence standard", §F7]`

- Never smuggle an assumption in as a fact.
- Tag claims `[Confirmed]` / `[Assumption]` / `[Validation need]`.
- Tag external statistics with source and bias. Vendor-published statistics are **interested** sources —
  rated Med/Low unless an independent body (Gartner, Forrester, Canalys/Omdia, HubSpot, MAGNiTT,
  MCIT/GASTAT, ZATCA, PwC, AAOIFI) or an SEC filing corroborates.
- Corroborate across **≥2 independent sources** — or **drop the claim**. Do not carry it with a caveat.
- Load-bearing figures carry their primary URL so a human can certify it in a browser.
- **Never invent traction, customer validation, willingness-to-pay, ACV, or company financials.**
  Every price is a benchmarked hypothesis to test, not a fact.

This standard has been enforced in practice: the "~24% partner-sourced revenue" and "74%" statistics were
removed from the corpus, and a commit exists titled *"Remove weakly-sourced planted figures from the
prompt (de-hallucinate)."* It is a genuine diligence signal — preserve it verbatim.

---

## 11. The phase-naming concordance

Five naming schemes are in use across the corpus. They map as follows. `[S2 §2]`

| Canonical | PDR roadmap | Venture Narrative | Burn Prompt | GTM / Cadence timeline | Pricing docs |
| --- | --- | --- | --- | --- | --- |
| **Phase 1 Capture** | MVP + V1 | Wedge → Repeatable Product | Foundation → Pilot → Activation | Months 1–9 | Phase 0 pilots + Phase 1 Capture |
| **Phase 2 Settle** | V2 | Platform Expansion | Commercial Hardening (entry) | Months 10–18 | Phase 2 Settle (Stages 2–3) |
| **Phase 3 Orchestrate** | V3 | Category Ownership → Outcome | (beyond horizon) | (beyond horizon) | Phase 3 Orchestrate (Stages 4–5) |

Also: the Onboarding Manual's **25 phases are a customer journey**, not the product roadmap. Its journey
through Phase 24 runs entirely on Product Phase 1; its Phase 25 (Expansion) is where Product Phase 2
enters. `[S2 §3.2 F-4]`

---

## 12. Brand truth

`[S4]`

- **The logo is a wordmark:** `Reven` set as a bold, geometric, monolinear letterform in deep navy, with
  **two electric-blue square accents** — upper-left of the **R**, lower-right foot of the **n**, sitting
  on a diagonal. They are the signature: **never removed, recolored, or repositioned.**
- **Canonical files:** `brand/reven-logo.svg` (navy, light backgrounds) · `brand/reven-logo-light.svg`
  (reversed, dark backgrounds) · `revenue-share-platform/frontend/src/components/brand/Brandmark.jsx`
  (in-app: `<Wordmark>` full lockup, `<Brandmark>` compact **R**).

| Token | Hex | Role |
| --- | --- | --- |
| Navy (ink) | `#0C1B3C` | The wordmark on light; deep-navy surfaces derive from it |
| Page base | `#0A1122` | App background |
| Electric blue | `#2A5BF5` | The brand accent — logo squares, primary actions, active states |
| Off-white | `#EAEEF7` | The wordmark on dark; primary text |
| **Brass** | `#CBA254` | **Monetary values only.** Never a second brand color |

- **Do:** clear space ≥ the height of one accent square on every side; navy on light, off-white on dark; keep both squares.
- **Don't:** put the mark in a filled tile; add shadow or glow; stretch, rotate, or recolor the letterforms; drop or move the squares; set "Reven" in a substitute typeface and call it the logo.
- **Typography (product, not the logo):** native serif for display, neutral system sans for UI, monospace **only** for real data (amounts, IDs, timestamps). Full palette derives from these anchors in `frontend/src/styles/tokens.css`.
- **Provenance:** the SVGs are a faithful rebuild, not the founder's original vector. If the original (SVG/AI/PDF) exists, commit it over these files.

---

## 13. What is NOT settled

Four open decisions sit inside or against the canon set. They are recorded here so nobody mistakes an
open question for a governing rule.

**13.1 · Which strategy document is source of truth.**
S1 and S2 §2 name S3. `Partner_Revenue_OS_Master_Strategy_Dossier.md` declares it supersedes S3 and the
Deep-Dive Companion. Both claims are live. *Nothing below the surface conflicts — the Dossier restates
the same phase model — but the precedence must be declared once.*

**13.2 · Which PDR binds.**
`partner-revenue-os-PDR-v5.md` is called "the binding product source of truth" by
`Reven_Pricing_Architecture_Deep_Research.md` — a pricing document, not canon. `Partner_Revenue_OS_PDR.md`
(4× longer) is neither marked superseded nor binding, and
`Partner_Revenue_OS_End_to_End_Business_Workflow.pdf` (22 phases) is referenced by neither.

**13.3 · The external category label.**
Canon (§3) says the entry product is sold as an easy, claim-centric PRM.
`Reven_Execution_Plan_Next_2_Quarters.md` says *"Stop building a PRM demo"* and *"lead externally with
'partner-revenue & settlement system of record'."* Both read as governing. **This is a decision, not a
wording slip.**

**13.4 · The beachhead.**
GCC/Saudi vs global co-sell. Consistently *recommended* as GCC across the corpus (S3 §Part E), and the
Execution Plan recommends locking it — but S2 §3.2 F-7 records it as **flagged unresolved** in the
Venture Narrative: "a decision to lock, not a doc contradiction."

---

## 14. Source trace

| Rule | Source | Located at |
| --- | --- | --- |
| The four mandates | S2 | Header block |
| Phase model table | S1, S2 | S1 §"Governing phase model"; S2 §2 |
| Phase renaming | S3 | §B3 |
| Positioning rule | S1, S2 | S1 §"Positioning rule"; S2 §2 |
| Standard PRM sentence | S2 | §3.2 F-6 |
| Trojan-horse statement | S3 | §B3 |
| Finance boundary lists | S2 | §2 |
| Read-vs-operate rule | S2 | §3.2 F-3, §5 |
| Payout-feature rule | S2 | §3.2 F-2 |
| GTM Phase-1 rule | S2 | §3.2 F-5 |
| Phase discipline / veto | S1, S3 | S1; S3 §F5 |
| Phase-1 exit gate | S1, S3 | S3 §Phase 1 |
| Phase-1 kill-criteria | S3 | §Phase 1 |
| Money-movement gate | S2 | §2 |
| Phase-2 exit gate + kill-criteria | S3 | §Phase 2 |
| Three design rules | S3 | §B3 |
| Phase-1 build / don't-build | S3 | §Phase 1 |
| 7 Powers sequencing | S3 | §Part D |
| Embedded-finance staging | S3 | §Part D |
| GCC five rules + value proposition | S3 | §Part E |
| Evidence discipline | S3 | §"Evidence standard", §F7 |
| Phase-naming concordance | S2 | §2 |
| Customer-journey vs product-phase | S2 | §3.2 F-4 |
| Brand truth | S4 | Whole file |
| Open decisions | S2, S3 | S2 §3.2 F-7; cross-doc |

---

*Consolidated 2026-07-28 from the four canon documents. If a canon source changes, change it there
first — then re-extract. This file never becomes the place where a rule is invented.*
