# Trend 07 — E-invoicing makes commercial outcomes easier to reference and verify

| | |
|---|---|
| **Class** | **Moat-making** — the strongest and best-dated trend on the list |
| **Use it for** | **The primary GTM hook.** Lead every outbound message with the deadline |
| **Dated clock** | **1 February 2027** — ZATCA Wave 25 |
| **One line** | A claim is an assertion; a cleared e-invoice is a state-verified fact — and from Wave 25 both sides of an intermediary payment are e-invoiced for the first time |

> ⚠️ **Correction that changes the calendar.** The corpus previously ran on **Wave 24 (SAR 375,000, 30 June 2026)**. **That deadline has passed.** Wave 25 is live, and it is a *stronger* hook.

---

## The claim

Saudi Arabia's e-invoicing mandate is turning every B2B invoice into a cleared, cryptographically stamped, machine-readable object — making commercial outcomes verifiable rather than merely asserted.

---

## Rationale — why it is true

ZATCA's Phase 2 (Integration) has ratcheted down by revenue threshold, roughly **halving each wave** until it reaches the entire VAT base:

| Wave | Threshold (VAT-subject revenue) | Integration deadline | Status as of 2026-08-17 |
|---|---|---|---|
| Wave 23 | > SAR 750,000 | 31 March 2026 | Passed |
| **Wave 24** | **> SAR 375,000** (in 2022, 2023 or 2024) | **30 June 2026** | **Passed** — announced 26 Sep 2025 |
| **Wave 25** | **> SAR 187,500** (in *any* of 2022–2025) | **1 February 2027** | **LIVE** — announced 24 July 2026 |

(HIGH.)

At SAR 187,500 the mandate reaches effectively the entire **~600,000-firm VAT-registered base** (MED) — **every sector, no exceptions.** Each invoice carries a UUID, an invoice hash, a cryptographic stamp and a hash chain, cleared through Fatoora before issuance for standard B2B invoices.

---

## Why now

**This is the live window, and it is roughly five and a half months out.**

Wave 25 was announced on 24 July 2026. The previous hook expired on 30 June.

But the substantive point is better than the correction. Consider what each wave captured:

- **Wave 24 pulled in the payers** — the larger firms that pay intermediaries.
- **Wave 25 pulls in the payees** — the sub-broker, the single-unit franchisee, the freight agent, the subcontractor, the affiliate.

> **Reven's product needs both.** For the first time, **both sides of an intermediary payment are e-invoiced**, which is precisely what makes invoice-anchored bilateral reconciliation possible in principle for essentially any commercial relationship in the Kingdom.

---

## Strategic implication

This is what makes Reven's core claim **technically achievable in Saudi Arabia before anywhere else.**

A revenue-share claim is an *assertion*. A cleared e-invoice is a *state-verified fact*. When both counterparties clear through Fatoora, reconciliation stops being *"two spreadsheets that disagree"* and becomes *"two verifiable records that must tie."*

> **For this specific product, Saudi Arabia is the most advanced market in the world — not a compromise beachhead, not a localization tax, but the best possible place to build it.**

And because the mandate is **sector-blind**, that advantage applies to insurance commission, franchise royalty, agent settlement and subcontract flow-through *simultaneously*. **A single compliance investment unlocks every sector at once** — exactly the economics a horizontal product needs, and the reason a compliance wedge beats a vertical wedge here.

The mandate also manufactures the two hardest things in enterprise sales: **budget that cannot be cut**, and **a deadline**.

### Two precision points that keep this honest

**1. E-invoicing verifies the payment leg, not the attribution leg.** A cleared invoice proves an invoice of a given value exists between two parties. It does **not** prove which intermediary sourced or influenced the underlying transaction. ZATCA hardens the *second half* of Reven's problem and leaves the *first half* — attribution — exactly where it was: a governed decision Reven must produce, evidence and defend. **That is a feature, not a gap** — the verifiable half becomes free while the hard, defensible half stays Reven's. But the pitch must not overclaim.

**2. Do not sell e-invoicing.** That category is crowded — a ~$143M KSA e-invoicing software market (MED) with many accredited providers. Reven sells **revenue-share settlement that is e-invoicing-native.** The compliance is the proof, not the product.

---

## Operational implication

- **Use 1 February 2027 as the dated proof sentence** across campaign, deck and timeline: *"land before 1 February 2027."*
- **Phase 1 (Capture):** capture ZATCA and WHT fields on claims and counterparties, and emit eligibility evidence. **Do not build clearance.**
- **Phase 2 (Settle):** clearance artifacts — UBL 2.1 XML / PDF-A3, ECDSA cryptographic stamp, TLV QR — plus the WHT engine.
- **Add the invoice-reference link now.** Every claim and every statement carries the counterparty's cleared-invoice **UUID and hash**. This single field turns the ledger from an internal record into a *verifiable* one. **Cheap today, expensive to backfill across historical claims later.**
- **Model self-billing explicitly.** In insurance, franchising and agency models the principal frequently raises the invoice on the counterparty's behalf. **Self-billed commission invoices are where ZATCA compliance and revenue-share settlement physically meet** — and they are common outside technology.
- **Partner rather than build for clearance.** Integrate an accredited ZATCA solution provider. Buy the commodity; own the ledger.

---

## What would falsify it

If cleared-invoice data proves **practically inaccessible to the counterparty** — each party able to see only its own cleared invoices, with no lawful, workable mechanism to reference the other's — then invoice-anchored bilateral reconciliation degrades to *"both parties self-attest with a UUID."* Still useful; materially weaker.

**Test this technically before it becomes a load-bearing claim in the deck.**

---

## Sources

- ZATCA — Wave 25 criteria (announced 24 Jul 2026): https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx
- ZATCA — Wave 24 criteria: https://zatca.gov.sa/en/Pages/news_1426.aspx
- ZATCA — e-invoicing roll-out phases: https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/Roll-out-phases.aspx
- VATupdate — Wave 25, threshold halved to SAR 187,500, deadline 1 Feb 2027: https://www.vatupdate.com/2026/07/27/zatca-announces-wave-25-of-e-invoicing-threshold-halved-to-sar-187500-integration-deadline-1-february-2027/
- VATupdate — Wave 24 deadline 30 Jun 2026 (SAR 375,000): https://www.vatupdate.com/2026/06/16/wave-24-deadline-30-june-2026-sar-375000-threshold/
- Jaicome — full ZATCA integration wave table: https://www.jaicome.sa/en/blog/zatca-integration-wave-deadlines/
