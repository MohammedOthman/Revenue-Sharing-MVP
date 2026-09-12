# Reven — Execution Plan: The Next Two Quarters

The sharp front door to the analysis stack (`Reven_Product_Architecture_Audit.md` → `Reven_PERM_Category_Deep_Dive.md` → `Reven_100`/`Reven_1000_Strategic_Implications.md`). Everything above is *what's true*; this is *what to do about it now*. Item refs like `[#612]` point into the 1,000-atlas.

---

## The one thing
**Stop building a PRM demo. Start building the bilateral, compliance-native partner-revenue settlement system-of-record — ledger first.** You have an A-grade plan and a throwaway CRUD app; the only risk that matters this year is that the moat (claim ledger + cross-tenant identity + ZATCA/WHT) stays unbuilt while AppDirect (now PartnerStack + Tackle) closes the seam. The window is **quarters**.

---

## Decide this week (3 forks that gate everything else)
1. **Beachhead: GCC-compliance, or global.** Recommendation: **GCC/Saudi**. It's the only lane where you get a non-copyable wedge (ZATCA/WHT) *and* a regulatory forcing function (Wave 24, 30 Jun 2026). This unblocks the data model, the compliance build, and the ICP. `[#121–140, #941–960]`
2. **GTM label: keep "orchestrator" internal; lead externally with "partner-revenue & settlement system of record."** Naming your own category beats fighting Crossbeam/Impartner/WorkSpan on a word they own. `[#201–260]`
3. **The current app is throwaway.** Quarantine or delete it; do not "extend" it. Rebuild at the data spine. `[#58, #861–880]`

---

## Build order (the only sequence that matters)
Each step is gated on the prior. Resist building anything below your current line.
1. **Append-only Partner Revenue Claim ledger** — immutable, double-entry, idempotent; server-side amounts (never client-supplied). `[#401–440]`
2. **Cross-tenant partner identity** — ship in the MVP; impossible to retrofit; the seed of the network. `[#53, #581–590]`
3. **One visible loop** — claim → attribution → eligibility → audited statement, demoable in days. `[#60, #461–500]`
4. **ZATCA/WHT — *capture* in the MVP, *clearance* in Settle** — in Phase 1/MVP only *capture* ZATCA/WHT fields and emit eligibility evidence (no money moved, no auto-clearance — per the PDR's "Do Not Build Yet" list). The automated clearance-model e-invoice (XML/PDF-A3, ECDSA stamp, TLV QR) + WHT engine (15%/10%) is the **first Phase-2/Settle build**, timed to the 30 Jun 2026 Wave-24 *readiness* clock. Proof sentence: *"payouts come out ZATCA-clean and both sides reconcile."* `[#501–540]`
5. **Integrations** — Salesforce/HubSpot + one billing/ERP + reliable webhooks. `[#561–580]`
**Defer:** AI/forecasting, Partner P&L, money rails, breadth. `[#75, #80]`

---

## The Phase-1 exit gate (your single go/no-go)
Do not raise a Settle round or build Phase 2 until **all** are true:
- **100+ real claims** processed through the ledger
- **3–5 design partners** with a **finance-accepted evidence pack**
- **Weekly active usage** by partner-ops/finance
- **Time-to-first-claim < 14 days**
- One undeniable proof sentence from a CFO: *"these numbers reconcile."*
`[#841–860]`

---

## The 10 highest-leverage moves (do these; ignore the other 990 until these ship)
1. Make the **Partner Revenue Claim** the core object, not the partner profile. `[#401]`
2. **Append-only ledger + idempotency** from commit one; ban in-place money UPDATEs. `[#421–440]`
3. **Cross-tenant identity** in the MVP. `[#53]`
4. **Bilateral reconciliation**: both counterparties settle against one mutually-approved ruleset. `[#441–460, #490]`
5. **ZATCA + WHT engine** as the wedge feature, shipped before 30 Jun 2026. `[#501–540]`
6. Sell the **CFO as economic buyer**; demo *"show me the reconciliation."* `[#301–340]`
7. Stand up the **3–5 design-partner program** now; trade white-glove for data + references. `[#821–840]`
8. Hire the wedge: **ledger/fintech-infra engineer + KSA tax SME**. `[#881–900]`
9. **Instrument NRR/expansion + the exit-gate metrics** from customer one. `[#841–860, #196]`
10. **Fix the doc/code truth gap** (README claims MongoDB over a Postgres app) before any diligence. `[#95-equivalent, audit §3]`

---

## First two hires
- **Staff/principal engineer with ledger or payments-infra experience** (Modern Treasury / TigerBeetle / Stripe-style). The moat is financial engineering, not CRUD.
- **KSA tax/compliance SME** (ZATCA Phase-2 + WHT/VAT). The wedge is regulatory depth global horizontals won't replicate.
`[#881–900]`

---

## Capital
Size the round to reach the **Settle proof** ("the CFO trusts these numbers"), not the Capture demo. The valuation step-change is at the ledger + reconciliation, not the portal. Sequence the moat story to the raise: **Seed = counter-positioning; Series A = switching-cost/retention data; Series B = network economies igniting.** `[#901–920]`

---

## Watch (the competitive clock)
Monitor **AppDirect (PartnerStack + Tackle), Impartner (Orchestration Studio), ZINFI, 360insights, Crossbeam** for any move into **bilateral settlement or KSA compliance** — that's the only thing that closes your seam early. AppDirect has the partner graph + marketplace settlement; your defensible gap is *two-sided, ZATCA-clean* settlement they don't yet have. Acquisition by one of them is a legitimate good outcome — design clean, embeddable APIs for it. `[#761–780, #921–940]`

---

## Kill-criteria (intellectual honesty)
Stop or pivot if, in design-partner discovery, you find:
- Buyers only want **CRM-style partner reporting**, not a system of record.
- **No CFO/finance** owner cares about reconciliation/audit (pain is *tolerated, not urgent*).
- Reconciliation **breaks on real data**, or partners won't commit/pay.
`[#961–980]`

---

## Two-quarter timeline

| | Q3 2026 (now → +3mo) | Q4 2026 (+3 → +6mo) |
|---|---|---|
| **Decisions** | Beachhead, label, kill-the-CRUD; ICP filter live | — |
| **Product** | Ledger + cross-tenant identity + one loop | ZATCA/WHT hook + first integration |
| **GTM** | Recruit 3–5 design partners; "Wave 24 readiness" campaign | Convert pilots (6–10wk each); first CFO reference |
| **Team** | Ledger eng + KSA tax SME hired | — |
| **Proof** | First reconciled period in the ledger | **Hit the Phase-1 exit gate** → open Settle/Series-A motion |
| **Hook** | — | Land before the **30 Jun 2026 ZATCA Wave 24** deadline as dated proof |

---

*Net: vision is right, the app is not, and the gap is execution against a closing window. Build the moat (ledger → identity → loop → compliance), prove it with 3–5 finance-accepted design partners, and let owning the money record — not the word "orchestrator" — earn you the platform.*
