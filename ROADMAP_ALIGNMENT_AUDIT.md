# Roadmap & Product Feature Audit — PRM-First Alignment

**Audit date:** 2026-06-12
**Scope:** All 16 markdown strategy documents in this repository (~18,300 lines)
**Audited against the founder's mandate:**

> 1. The product enters the market as a **PRM** (Partner Relationship Management).
> 2. The solution is **not directly in finance now** — no money movement in the entry product.
> 3. Expansion into **Revenue-Sharing Infrastructure for B2B entities** (more revenue control) happens **after multiple gated phases**.
> 4. This sequencing must be **clear and consistent across every phase in every repo document**.

---

## 1. Verdict summary

| Mandate | Verdict | Notes |
|---|---|---|
| PRM-first entry | ⚠️ **Split across doc generations** | Newer strategy docs comply (PRM-shaped entry, "Trojan horse"). Older docs (both PDRs, GTM Manual, Venture Narrative, Burn Prompt, Onboarding Manual) explicitly say "NOT a PRM." |
| No direct finance now | ✅ **Substantively compliant, with creep risks** | No document puts money *movement* in Phase 1. But the PDR MVPs include payout approval workflow, refund/chargeback handling, and ledger liability states without an explicit "no execution" boundary; the Integration Manual catalogs payment rails ungated. |
| Multi-phase expansion into revenue control | ✅ **Compliant in the canon** | Capture → Settle → Orchestrate is explicitly gated in the canonical strategy docs and all three pricing docs. |
| Clarity across all phases/docs | ❌ **Not yet** | Five different phase-naming schemes coexist; no single governing statement existed before this document. |

---

## 2. The governing phase model (canonical — all documents conform to this)

Source of truth: `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` (Part B3 / Part C), reinforced by `Partner_Revenue_OS_Master_Strategy_Dossier.md`.

| Phase | Name | Timeline | What it is | Finance boundary |
|---|---|---|---|---|
| **1** | **Capture** — claim-centric, compliance-native **PRM** | ~Months 0–9 | The partner team's daily tool: partner registry, deal/claim registration, attribution, protection windows, payout-**readiness preview**, cross-tenant identity, GCC compliance **capture stubs** | **Calculate / track / prepare only. No money movement, no settlement automation, no payout execution, no automated tax clearance.** |
| **2** | **Settle** — bilateral revenue system-of-record | ~Months 9–24 | The shared auditable ledger two companies trust: rule engine, double-entry ledger, bilateral reconciliation, dispute workflow, compliance engine (ZATCA/WHT/VAT), ERP/billing integration | Settlement/disbursement built **last** within the phase — or **partnered to a rail**. Be the ledger-of-record **without moving money** first. |
| **3** | **Orchestrate** — partnership network, idea → activation | Months 24+ | Partner P&L, forecasting, co-sell, the multi-company network on cross-tenant identity | Basis points on settled flow only here. Merchant-of-record / PayFac / money-transmitter status is a **separate, later, explicit decision — never an implicit feature.** |

**The PRM-first reconciliation (governing interpretation):** the entry product **is sold and experienced as a PRM** — that is the adoption wedge the founder mandates. It is not a *generic* PRM: its core object is the Partner Revenue Claim and its identity model is cross-tenant. Wherever a repo document says "not a PRM," read it as "**not a generic PRM** — a claim-centric PRM whose data model is built for Phase 2/3." Wherever a document says "control layer" or "revenue OS," that describes the **architecture underneath**, not the Phase-1 go-to-market positioning.

**The finance boundary rule (applies to every document):**

- ✅ **Allowed in Phase 1:** calculating payout *eligibility*, previewing amounts, tracking readiness, capturing compliance fields (WHT status, VAT treatment, ZATCA fields), audit logs, evidence packs.
- ❌ **Not allowed in Phase 1:** executing payouts, holding or routing funds, settlement automation, escrow, bank/payment-rail write integrations, automated ZATCA clearance, refund/chargeback *execution* (recording them as data is fine), invoicing that moves money.
- 🚦 **Phase 2 entry requires the Phase-1 exit gate:** 100+ real claims processed, 3–5 design partners with a finance-accepted evidence pack, weekly active usage, time-to-first-claim < ~14 days.
- 🚦 **Money movement (even in Phase 2) requires:** settlement idempotency proven, clean ERP reconciliation, CFO reference trust — and even then, partner the rail before becoming one.

**Phase-naming concordance** (all schemes used in the repo map as follows):

| Canonical | PDR roadmap | Venture Narrative | Burn Prompt | GTM / Cadence timeline | Pricing docs |
|---|---|---|---|---|---|
| Phase 1 Capture | MVP + V1 | Wedge → Repeatable Product | Foundation → Pilot → Activation | Months 1–9 (discovery → activation) | Phase 0 pilots + Phase 1 Capture |
| Phase 2 Settle | V2 | Platform Expansion | Commercial Hardening (entry) | Months 10–18 (hardening → controlled scale) | Phase 2 Settle (Stages 2–3 in Reven doc) |
| Phase 3 Orchestrate | V3 | Category Ownership → Outcome | (beyond model horizon) | (beyond manual horizon) | Phase 3 Orchestrate (Stages 4–5 in Reven doc) |

---

## 3. Document-by-document findings

### 3.1 Aligned — no changes required

| Document | Verdict |
|---|---|
| `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` | **Canonical.** Defines Capture→Settle→Orchestrate, PRM-as-Trojan-horse entry, explicit exit gates and kill-criteria, finance deferred ("settlement/disbursement last — or partner for the rail"; MoR/PayFac is "a later decision, not an MVP feature"). |
| `Partner_Revenue_OS_Master_Strategy_Dossier.md` | Aligned. "Be ledger-of-record without moving money in v1 to avoid the PayFac/money-transmitter trap." Phase 1 explicitly defers ERP/billing/settlement. |
| `Reverse_Engineered_Strategy_Deep_Dive_Companion.md` | Aligned. Validates the canon; "be the ledger-of-record WITHOUT moving money first; add settlement later." |
| `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` | Aligned. Phase 1 priced like the PRM category (active partners, annual SaaS); refuses % take-rate early; per-payout fee gated to the Phase-2 product gate. |
| `Partner_Revenue_OS_Pricing_Strategy_Red_Team.md` | Aligned (and adds rigor: ship and retain the subscription wedge before writing settlement or network code). |
| `Reven_Pricing_Architecture_Deep_Research.md` | Aligned. "Reven" = commercial brand for Partner Revenue OS. No Settle-flow monetization in Phase 1. Five pricing stages map cleanly onto the three phases. |
| `Monthly_CFO_Review_Manual.md` | No issues — company-level financial controls only; assumes nothing about product payout execution. |

### 3.2 Misaligned or unclear — required edits

**F-1 · Both PDRs reject the PRM entry the founder mandates.** *(Severity: HIGH — positioning)*
- `Partner_Revenue_OS_PDR.md:81` — "Do not build a PRM." Also lines 15, 63–73.
- `partner-revenue-os-PDR-v5.md:72-74` — "**What it is not:** a PRM directory…"
- **Fix:** amend to "not a *generic* PRM" and add the governing interpretation from §2 above. The PDRs' architecture (claim ledger, attribution, cross-tenant identity) is exactly right — only the positioning language contradicts the mandate.

**F-2 · PDR MVPs include settlement *infrastructure* without an explicit no-execution boundary.** *(Severity: HIGH — finance creep)*
- `Partner_Revenue_OS_PDR.md:956` "Payout approval workflow", `:960-963` adjustment/refund/credit-note/chargeback handling, `:270-279` payout-liability metrics, `:1210-1226` full payout state machine including "Paid" — all in MVP scope.
- `partner-revenue-os-PDR-v5.md:311` accrued/eligible ledger states in MVP; `:313` MVP aha ends at "first-payout milestone visible."
- These are calculation/tracking (permissible) but the docs never draw the execute-vs-track line, and "payout approval workflow" + reversal *handling* read as settlement machinery.
- **Fix:** add one sentence to each MVP scope: *"All payout-related MVP features are read/calculate/display only. The system records that a payout became due and whether it was paid (entered manually or imported); it does not approve-to-pay into any rail, execute, reverse, or clear anything until Phase 2 (Settle), and money movement itself is the final step of Phase 2 or partnered out."* Move "payout approval workflow" and refund/chargeback *execution* semantics explicitly behind the Phase-1 exit gate.

**F-3 · Integration Manual catalogs payment rails with no phase gating.** *(Severity: HIGH — finance creep)*
- `Integration_Layer_and_API_Data_Flows_Manual.md:74` "multi-party settlement flows: collect → split → disburse to third-party IBANs"; `:350-370` (§15) sarie / PayTabs split-payout / Lean / Tarabut presented as part of the integration layer; `:217` uses old MVP/V1/V2/V3 labels; `:211` blurs *reading* finance systems (Phase-1-acceptable) with *operating* them.
- **Fix:** label §15 and all settlement/treasury/payment-rail flows **Phase 2 (Settle) — build last or partner**; mark bank/PSP integrations as **read-only in Phase 1, write/execute in Phase 2+**; add the canonical phase names alongside MVP/V1/V2/V3 per the concordance table in §2.

**F-4 · Five phase-naming schemes, no cross-reference.** *(Severity: MEDIUM — clarity)*
- PDRs: MVP/V1/V2/V3 · Strategy docs: Capture/Settle/Orchestrate · Venture Narrative: Wedge/Repeatable/Platform/Category · Burn Prompt: Foundation/Pilot/Activation/Hardening · GTM Manual: 29 stages + 18-month roadmap · Onboarding Manual: 25 *customer-journey* phases.
- **Fix:** every document gets a one-line header pointing at the concordance table in §2 of this audit. The Onboarding Manual should state that its 25 phases are the *customer journey within* product Phase 1 (with expansion §35.3 = Phase 2), not the product roadmap.

**F-5 · GTM Manual demos payout language to CFOs without the Phase-1 disclaimer.** *(Severity: MEDIUM — over-promising risk)*
- `GTM_Operating_Manual.md:1035-1048` (demo shows "payout eligibility… finance sees evidence"; CFO demo focus = "Payout eligibility, evidence, audit"); `:1068-1080` business case quantifies overpayment risk.
- Preview ≠ execution, but nothing stops a CFO from hearing "settlement."
- **Fix:** add to the demo script and pilot-design stages: *"Phase-1 pilots must never promise payout execution, settlement automation, escrow, or automated ZATCA clearance. Sell the preview and the evidence pack; settlement is the Phase-2 expansion conversation."*

**F-6 · "NOT a PRM" language repeated in field-facing docs.** *(Severity: MEDIUM — same root cause as F-1)*
- `GTM_Operating_Manual.md:13,96-110` · `Partner_Revenue_OS_Venture_Scale_Narrative.md:28` · `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md:47-49` · `Large_Enterprise_Client_Onboarding_Manual.md:9,189`.
- **Fix:** standardize on the approved sentence: *"Experienced and sold as an easy, claim-centric PRM; engineered underneath as the system of record for partner revenue — never a generic PRM, never a fintech in Phase 1."*

**F-7 · Minor / already flagged in the canon.**
- Venture Narrative still carries the untraceable "~24% median partner-sourced revenue" stat — the canonical doc already orders its removal (`Reverse_Engineered_Strategy…md:282,354`).
- Stale GCC TAM ("$133B by 2030") must be retired wherever it appears (same source, Part E).
- Beachhead (GCC vs. global co-sell) is consistently *recommended* as GCC but flagged unresolved in the Venture Narrative — a decision to lock, not a doc contradiction.
- Naming: **Reven** (commercial brand) vs **Partner Revenue OS** (internal/technical) is declared in `Reven_Pricing_Architecture_Deep_Research.md:3` — acceptable, keep declaring it wherever "Reven" first appears in a doc.

---

## 4. Why the current roadmap IS fit for the goal (with the fixes above)

1. **PRM first, genuinely.** Phase 1 Capture is a partner team's daily tool — registry, deal registration, attribution, protection windows. That is PRM functionality, priced against the PRM category, sold to the Head of Partnerships. The claim-centric data model underneath doesn't change what the buyer adopts; it protects the expansion path.
2. **Not directly finance now, by design and by gate.** No document monetizes or executes money movement in Phase 1. The pricing corpus unanimously refuses early take-rates. Settlement is the *last* thing built even inside Phase 2, behind a CFO-trust gate, with the explicit instruction to partner the rail and avoid the PayFac/money-transmitter trap.
3. **Multiple phases into revenue control, gated.** Capture → Settle → Orchestrate has measurable exit gates (100+ claims / settlement idempotency + NRR / network density) and written kill-criteria, which is precisely the "expand after multiple phases" discipline the goal requires.
4. **The b2b revenue-sharing endgame is architecturally seeded, not prematurely built:** cross-tenant partner identity ships in the MVP (cheap now, impossible to retrofit) so the Phase-3 network and the bilateral settlement system-of-record remain reachable without making Phase 1 a fintech.

The misalignments found are **language and gating-clarity problems, not architecture problems**. Apply the F-1…F-6 edits and the corpus is fully consistent with the mandate.

---

## 5. Edit checklist (tracking)

- [ ] `Partner_Revenue_OS_PDR.md` — F-1 positioning amendment; F-2 no-execution boundary in MVP scope; move payout-approval/reversal execution behind Phase-1 gate; add phase concordance header.
- [ ] `partner-revenue-os-PDR-v5.md` — F-1; F-2; concordance header.
- [ ] `Integration_Layer_and_API_Data_Flows_Manual.md` — F-3 phase-gate §15 + read-vs-write labels; concordance header.
- [ ] `GTM_Operating_Manual.md` — F-5 demo/pilot disclaimer; F-6 standardized sentence; map 18-month roadmap to phases.
- [ ] `Internal_Operating_Cadence_Manual.md` — concordance header; add quarterly check: "Is Phase-1 scope still claim-centric and non-financial?"
- [ ] `Large_Enterprise_Client_Onboarding_Manual.md` — F-4 customer-journey vs product-phase note; F-6 sentence.
- [ ] `Partner_Revenue_OS_Venture_Scale_Narrative.md` — F-6 sentence; remove "~24%" stat; concordance header.
- [ ] `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` — F-6 sentence.
