# Roadmap & Product-Feature Audit — PRM-First Alignment
## Verification of the corpus against the strategy: PRM now → revenue-sharing infrastructure for B2B entities in later phases

**Date:** 12 June 2026
**Scope:** all 16 markdown documents and 4 PDFs in this repository (~18,300 lines of markdown + ~110 PDF pages), audited document-by-document.
**The standard audited against (founder's stated strategy):**
1. The current product (Phase 1 / MVP) is a **PRM** — partner management, deal registration, tracking, attribution, commission *calculation* and reporting. A B2B SaaS workflow tool.
2. The product is **not directly in finance now** — no payment execution, no payouts, no money movement/custody/settlement execution, no regulated financial activity in the current phase.
3. Expansion into **revenue-sharing infrastructure / revenue control for B2B entities** happens only across multiple later phases.
4. This phasing must be **clear and consistent across all repo documents**.

---

## 1. Verdict summary

| Question | Verdict |
|---|---|
| Is the roadmap fit for the goal (PRM → revenue-sharing infrastructure)? | **YES — fit.** Every document sequences the product the same way: workflow/PRM wedge first, revenue-share system of record second, money movement and orchestration last. |
| Is the product kept out of direct finance now? | **YES — consistently.** No document places payment execution, custody, or settlement execution in the MVP/current phase. The strongest statements: PDR "Do not start by moving money. Start by proving entitlement"; Integration Manual MVP scope: "Do not build deep ERP or payout execution yet" (payout execution is explicitly V3-only, `Integration_Layer_and_API_Data_Flows_Manual.md:766–769`); Dossier: "be ledger-of-record *without moving money* first — dodge the PayFac/money-transmitter trap" (`Partner_Revenue_OS_Master_Strategy_Dossier.md:125,156`). Pricing is SaaS-only in Phase 1; per-payout fees and bps-on-flow are gated to Phases 2–3 in all three pricing documents. |
| Is the phasing clear across all repo documents? | **NO — this was the main gap, now addressed.** The sequencing is *substantively* consistent, but the corpus used **seven different phase vocabularies** with no cross-reference, the README was empty, and several documents lacked explicit "what we do NOT do now" boundary language. The new `README.md` establishes the canonical 3-phase model and cross-walk; the remaining per-document fixes are listed in §4. |

**One deliberate nuance to be aware of (not a defect):** three documents say the product "is not a
generic PRM" (`partner-revenue-os-PDR-v5.md:73`, `GTM_Operating_Manual.md:13`,
`Large_Enterprise_Client_Onboarding_Manual.md:9`), while the strategy dossier defines Phase 1 as a
"claim-centric **embedded PRM**" (`Partner_Revenue_OS_Master_Strategy_Dossier.md:70–76`). These are
reconciled positions, not a contradiction: the **product surface** is PRM (your entry strategy);
the **marketing category** is "Partner Revenue Control Layer," because "a better PRM" is a
commoditized pitch with no counter-position. The README now states both rules explicitly.

---

## 2. Criterion-by-criterion findings

### 2.1 PRM-first as current scope — PASS

- **Master Strategy Dossier** (`Partner_Revenue_OS_Master_Strategy_Dossier.md:70–120`): Phase 1
  "Capture" = "claim-centric, workflow-embedded, compliance-native PRM" — registry, claim/deal
  registration, attribution decision, protection window, payout-readiness, CRM link. Build list is
  8 items, all PRM workflow; "Don't build yet: ERP/billing integration, settlement automation…"
- **PDR** (`Partner_Revenue_OS_PDR.md` §16.1, lines 1563–1592): MVP = "Control the Partner Revenue
  Claim" — registry, intake, agreement metadata, claim ledger, attribution workflow, protection,
  CRM link, payout-eligibility *preview*, executive dashboard. "Do not build yet: full payout
  execution; full settlement automation."
- **PDR v5** (`partner-revenue-os-PDR-v5.md:305–314`): same MVP cut (FR-01–FR-15), all workflow.
- **Workflow PDF** (pages 57–59): identical MVP scope; "Payment execution may come later in the
  product roadmap" (p.40).
- **Pricing strategy** (`Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md:146–163`): Phase 1
  monetizes exactly like the PRM/partner-ops category — annual SaaS on active partners +
  implementation fee. "This is the only phase you can broadly monetize today."

### 2.2 No direct finance now — PASS (zero violations found)

Money-touching capability placement across the corpus:

| Capability | Earliest phase | Source |
|---|---|---|
| Payout-eligibility **calculation/preview** (informational) | Phase 1 / MVP | PDR §10.8; Workflow PDF p.35 ("Payout eligibility does not equal payment execution") |
| Finance evidence pack, partner statements | V1 (Phase 1) | PDR §16.2 |
| Billing/ERP **read**, invoice matching, ZATCA clearance, WHT computation | V2 (Phase 2) | `Integration_Layer_and_API_Data_Flows_Manual.md:768` |
| **Approved-payout export** (file to customer's AP/ERP — customer pays) | V2 (Phase 2) | `Integration_Layer_and_API_Data_Flows_Manual.md:768` |
| **Payout execution** (PSP split, PIS/sarie), settlement reconciliation | **V3 only (Phase 3)** | `Integration_Layer_and_API_Data_Flows_Manual.md:769`; risk register line 774: "payout execution in V3" |
| Per-payout fees, bps on settled volume (pricing) | Phase 2, late | `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md:165–173` |
| bps on revenue-under-management (pricing) | Phase 3 | same doc, lines 175–183; `Reven_Pricing_Architecture_Deep_Research.md:268–269` ("Defer… Never the headline pre-scale") |

Supporting design stance: the Red Team document independently endorses the **no-custody design**
as de-risking (`Partner_Revenue_OS_Pricing_Strategy_Red_Team.md:237`), and the Deep-Dive Companion
names the licensing trap explicitly: "Touching funds makes you a PayFac/money-transmitter (FBO
accounts, state MTLs). Mitigation: be the ledger-of-record WITHOUT moving money first"
(`Reverse_Engineered_Strategy_Deep_Dive_Companion.md:56`).

The CFO manual contains **zero** payment-rail costs, money-transmission licensing costs, float
income, or payment-processing revenue lines in the pre-seed budget — consistent with a pure SaaS
posture.

### 2.3 Revenue-sharing infrastructure as later phases — PASS

All roadmaps put the revenue-sharing system of record in the second phase and money
movement/orchestration in the third:

- Dossier Part IV: Capture (~M0–9) → Settle (~M9–24) → Orchestrate (M24+), with explicit exit
  gates and kill criteria per phase, and settlement/disbursement built "**last — or partner for
  the rail**" even within Settle (`Partner_Revenue_OS_Master_Strategy_Dossier.md:125`).
- Venture narrative Stage 3 (V2) carries "billing/ERP integration, invoice matching,
  settlement/reconciliation, payout liability" (`Partner_Revenue_OS_Venture_Scale_Narrative.md:167`).
- Market-analysis PDFs put settlement-rail drivers (G4) and settlement take-rate pricing (J133) at
  the 18mo+ horizon only.

### 2.4 Phase clarity & consistency across the repo — FAIL (now remediated at the top level)

The substance agrees; the *naming* did not. Seven vocabularies coexisted with no map:

1. MVP→V1→V2→V3 (PDR, PDR v5, Workflow PDF, Integration manual)
2. Capture→Settle→Orchestrate (Dossier, Reverse-Engineered Strategy)
3. Stage 1–5 (Venture narrative)
4. Phase 0–3 tied to funding stages (Pricing docs)
5. Foundation→Pilot→Activation→Commercial Hardening, M1–18 + 29 GTM stages (GTM/cadence/burn docs)
6. "Phases 1–25" meaning *customer-journey steps* (Onboarding manual — overloads the word "Phase")
7. Horizons Now / 6–18mo / 18mo+ (Market-analysis PDFs)

Consequences found in the audit: a reader of the GTM manual or onboarding manual alone cannot tell
where the product-phase boundary sits; the CFO manual references "MVP" and "next raise" with no
phase mapping at all; the catalogue PDFs rely on an unexplained "Horizon" column.

**Remediation applied:** `README.md` now defines the canonical 3-phase model, the hard no-finance
boundary, and the full cross-walk table. Per-document edits remain recommended (§4).

---

## 3. Per-document scorecard

| Document | PRM-first | No finance now | Later-phase expansion | Phase clarity |
|---|---|---|---|---|
| `Partner_Revenue_OS_PDR.md` | PASS | PASS | PASS | PASS (MVP/V1/V2/V3, undated) |
| `partner-revenue-os-PDR-v5.md` | PASS | PASS | PASS | PASS |
| `Partner_Revenue_OS_End_to_End_Business_Workflow.pdf` | PASS | PASS | PASS | PASS |
| `Integration_Layer_and_API_Data_Flows_Manual.md` | PASS | **PASS — strongest doc** (payout execution explicitly V3) | PASS | PASS |
| `Partner_Revenue_OS_Master_Strategy_Dossier.md` (+ 2 companions) | PASS | PASS | PASS | PASS (Capture/Settle/Orchestrate) |
| `Partner_Revenue_OS_Venture_Scale_Narrative.md` | PASS | PASS | PASS | PARTIAL — Stage 1–5 unmapped; line 134 lists "settlement, clawback" inside the core ledger description without the records-vs-executes distinction |
| Pricing trilogy (3 docs) | PASS | PASS (SaaS-only Phase 1; fees gated) | PASS | PASS |
| `GTM_Operating_Manual.md` | PASS | PARTIAL — no explicit "we do not execute payments" gatekeeping for sales | PASS (silent, no contradiction) | PARTIAL — 29 stages/18 months unmapped to product phases |
| `Internal_Operating_Cadence_Manual.md` | PASS | PASS | PARTIAL — no post-M18/Phase-2 product roadmap reference | PARTIAL |
| `Large_Enterprise_Client_Onboarding_Manual.md` | PASS | PASS (line 1060: "Finance eligibility is not the same as payment execution") | PARTIAL — expansion items (payout accrual, collection status, ERP export, lines 2968–2978) lack a regulatory gate note | FAIL — "Phases 1–25" overloads "Phase" |
| `Monthly_CFO_Review_Manual.md` | PASS | PASS | PARTIAL (no phase naming at all) | PARTIAL |
| Market Analysis PDFs 01–03 | PASS | PASS | PASS | PARTIAL — Horizon column unmapped to phases (01 maps Land/Expand/Own; 02–03 don't) |

---

## 4. Findings & required fixes (prioritized)

**F1 — Empty README / no canonical phase statement. FIXED.**
The repo had no top-level statement of positioning. `README.md` now carries the canonical model,
the no-finance boundary, and the vocabulary cross-walk. *Keep it authoritative: update it first
whenever phasing changes.*

**F2 — Phase-vocabulary fragmentation. FIXED.**
Canonical cross-walk added to `README.md` §3, plus a phase-mapping cross-reference added at the
top of `GTM_Operating_Manual.md` (§0.1), `Internal_Operating_Cadence_Manual.md` (§0),
`Monthly_CFO_Review_Manual.md` (§0), `Large_Enterprise_Client_Onboarding_Manual.md` (intro note:
its "Phases 1–25" are customer-journey steps, not product phases), `Partner_Revenue_OS_PDR.md`
(§2.6), and `Partner_Revenue_OS_Venture_Scale_Narrative.md` (§8 stage↔phase mapping).

**F3 — Missing explicit "not a fintech now" boundary in sales-facing docs. FIXED.**
Added "what we do NOT sell/do in Phase 1" blocks (no payment execution, no fund custody, no
settlement execution; the product calculates and evidences, the customer's systems pay) to:
`GTM_Operating_Manual.md` §0.1 ("Phase Scope and the Hard Boundary — read before selling"),
`Large_Enterprise_Client_Onboarding_Manual.md` (intro + §3.2), `partner-revenue-os-PDR-v5.md` §6
(new "Regulatory boundary" non-goal), and `Partner_Revenue_OS_PDR.md` §2.6.

**F4 — No regulatory/licensing gate on expansion features. FIXED.**
`Large_Enterprise_Client_Onboarding_Manual.md` §35.3 now carries a regulatory-gate note (payout
accrual / collection status are Phase 2 capabilities requiring a documented PayFac/MTL/SAMA
review before build or sale), and the expansion decision criteria gained two mandatory bullets
(regulatory/compliance review; legal+finance approval for any money-touching feature) — matching
the gate the strategy dossier already mandates (`Partner_Revenue_OS_Master_Strategy_Dossier.md:281`).

**F5 — "Payout eligibility preview" terminology. MITIGATED.**
The term is retained (it is used correctly throughout), but clarifying glosses now appear at
first use in the GTM, onboarding, cadence, and CFO manuals: *preview/eligibility = the system
calculates and explains what is owed; payment executes in the customer's systems until Phase 3.*
Optional further step: globally rename to "payout-eligibility reporting" in a future doc pass.

**F6 — Venture narrative carried two stats its own companion docs ordered removed. FIXED.**
Per the Dossier's instructions (line 41; Strategy lines 282, 354):
- The untraceable **"~24% median / >40% top-quartile"** stat (was at lines 97, 357, 395) is
  replaced with the verified HubSpot×Canalys×Partnership Leaders 2022 figure (50% of orgs
  attribute 26%+ of revenue to partners; 40% have no partner-ops FTE), with a source-note
  documenting the substitution.
- The stale **"~$87B by 2025 → ~$133B by 2030"** GCC TAM (was at lines 99, 399) is replaced with
  2024 actuals per Dossier Part VI: digital economy ~SAR 495B (~$132B, MCIT/Vision 2030; 16.0% of
  GDP per GASTAT) with IDC ICT spend ~$39.6B (2025) as the addressable-spend anchor.
- Bonus fix in the same class: the unquantified "Partner Attribution Leak: a quarter or more…"
  vendor claim (line 112) is rewritten as mechanism-real / magnitude-unverified, per the
  Dossier's "never cite a leak percentage" rule.

**F7 — CFO manual has no phase linkage. FIXED.**
Cross-reference added in its §0 (canonical phases; pre-seed funds Phase 1 only; no payment-rail
or licensing cost lines by design; pointer to Integration Manual §20).

**F8 — Venture narrative line 134 ambiguity. FIXED.**
The core-architecture ledger description now reads "settlement **records**, clawback-by-netting —
the ledger *records* settlement outcomes; payment execution stays in the customer's systems
until V3."

**F9 — Market-analysis PDFs 02–03 horizon mapping. ADDRESSED via README cross-walk.**
If these PDFs are regenerated, add a "Horizon ↔ Phase" legend (Now=Phase 1, 6–18mo=Phase 2,
18mo+=Phase 3) and rephrase driver G4's settlement-rail language to make explicit that Reven
*uses/integrates* those rails in Phase 3 — it does not *provide* them today.

---

## 5. What was checked and how

Each document was read in full and assessed against the four criteria, with findings cited by
file:line (markdown) or page (PDF). Money-movement language was traced phase-by-phase
(payout/settlement/execution/custody/rails/licensing) across all 20 files; pricing structures were
checked for any flow-based monetization in Phase 1 (none found); phase vocabularies were extracted
verbatim from every document and reconciled into the cross-walk now in `README.md` §3.

**Bottom line:** the corpus is fit for the stated goal. The product is a PRM first, deliberately
and consistently kept out of direct finance, with revenue-sharing infrastructure earned across
gated later phases. The gaps were presentational (naming, boundaries, two stale stats), not
strategic — the top-level ones are fixed in this commit, and §4 lists the remaining per-document
edits in priority order.
