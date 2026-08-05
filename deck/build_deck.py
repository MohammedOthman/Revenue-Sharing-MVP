#!/usr/bin/env python3
"""Build the Reven pre-seed investor deck.

Structure: Sequoia's live ten sections (Writing a Business Plan, modified
13 Mar 2025) sequenced on Andy Raskin's five strategic-narrative beats, with
Sequoia's own presentation opener (What's changed → What you do → Fast facts).

Every figure carries a source. Figures the research could not verify are absent;
founder-supplied values appear as explicit [BRACKETED] placeholders.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reven_deck import *          # noqa
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

d = Deck()
S = lambda *a, **k: d.slide(*a, **k)
N = d.note

BODY = 6.55          # bottom of the safe body area
SRC_Y = 6.62


# ═══════════════════════════════════════════════════════ 01 · COMPANY PURPOSE
s = title_slide(
    d,
    "Pre-seed · Riyadh, Saudi Arabia · August 2026",
    "The system of record\nfor the money one business\nowes another.",
    "Reven is the shared, audited record of partner-sourced revenue — the claim, the "
    "attribution, the eligibility and the evidence — for the commissions, revenue shares, "
    "rebates and referral fees that two companies must agree on.",
    "Confidential",
)
d.n = 1
text(s, W - M - 3.5, 2.34, 3.5, 1.4,
     [[("“", {"size": 40, "color": BRAND_500, "font": F_DISPLAY})],
      [("Two companies,\none number,\nno argument.", {"size": 19, "color": TEXT_MID, "font": F_DISPLAY})]],
     align=PP_ALIGN.RIGHT, spacing=1.2)
N(s, "Sequoia, Company purpose: 'define your company in a single declarative sentence.' "
     "Say the sentence. Do not add features. The line on the right is the promised land and "
     "it recurs on slides 7 and 20 — it is the sentence you want repeated after you leave the room.")


# ═════════════════════════════════════════════════════════ 02 · FAST FACTS
s = S()
assertion(s, "Reven: [N] people in Riyadh, Phase 1 in build, pre-revenue,\n"
             "raising [amount] for [N] months to reach [milestone].",
          kicker="Fast facts", size=28)
facts = [("Founded", "[Month Year]"), ("Location", "Riyadh, KSA"), ("Team", "[N] full-time"),
         ("Product", "Phase 1 — Capture, in build"), ("Revenue", "Pre-revenue"),
         ("Raising", "[amount] · [equity]%"), ("Runway", "[N] months")]
x0, y0 = M, 2.95
for i, (k, v) in enumerate(facts):
    cx = x0 + (i % 4) * 2.92
    cy = y0 + (i // 4) * 1.30
    text(s, cx, cy, 2.7, 0.28, k, size=9, color=TEXT_LO, font=F_SANS, bold=True,
         caps=True, tracking=1.8)
    line(s, cx, cy + 0.32, 2.55, color=EDGE)
    text(s, cx, cy + 0.46, 2.7, 0.5, v, size=15, color=TEXT_HI, font=F_DISPLAY)
source_note(s, "Sequoia, “How to Present to Investors” — the third of three opening slides, "
               "inside the first five minutes. Say “pre-revenue” plainly; hiding the stage reads as evasion.")
N(s, "Give the facts before the argument so they can weigh everything that follows. Every value "
     "on this slide is yours to fill — none of it can come from research.")


# ═══════════════════════════════════════════════ 03 · WHAT'S CHANGED (the shift)
s = S()
assertion(s, "In Saudi Arabia the commission invoice stopped being a PDF between two\n"
             "companies and became a document the tax authority clears before it can\n"
             "be issued — and the threshold has fallen 8,000-fold in three and a half years.",
          kicker="Why now  ·  the undeniable shift", size=25)

# --- the ratchet: descending staircase, log-spaced
steps = [("SAR 3bn", "Wave 1", "Jan 2023", 0.00),
         ("500m", "W2", "Jul 2023", 0.085),
         ("250m", "W3", "Oct 2023", 0.18),
         ("100m", "W5", "2024", 0.28),
         ("40m", "W8", "2024", 0.39),
         ("10m", "W14", "2025", 0.50),
         ("750k", "W23", "Mar 2026", 0.615),
         ("SAR 375,000", "Wave 24", "30 Jun 2026", 0.74),
         ("SAR 187,500", "Wave 25", "1 Feb 2027", 1.00)]
gx, gy, gw, gh = M, 2.80, 9.05, 2.55
for i, (label, wave, when, t) in enumerate(steps):
    bx = gx + t * (gw - 1.15)
    top = gy + t * (gh - 0.42)
    major = i in (0, 7, 8)
    col = BRAND_500 if major else RGBColor(0x1E, 0x2E, 0x55)
    rect(s, bx, top, 1.02, 0.145, fill=col)
    if major:
        rect(s, bx, top, 1.02, 0.145, fill=BRAND_500)
        text(s, bx, top - 0.42, 1.60, 0.3, label, size=12.5,
             color=BRASS_300, font=F_MONO, bold=True)
        text(s, bx, top + 0.24, 1.60, 0.44,
             [[(wave, {"color": TEXT_MID, "size": 9.5, "bold": True})],
              [(when, {"color": TEXT_LO, "size": 9})]], font=F_SANS, spacing=1.2)
vline(s, gx - 0.14, gy - 0.10, gh + 0.55, color=EDGE)
text(s, gx - 0.14, gy + gh + 0.60, 9.2, 0.3,
     "Every step was announced in advance. Thresholds do not go back up.",
     size=10.5, color=TEXT_LO, font=F_SANS)

# right rail
rx = 10.35
rect(s, rx - 0.30, 2.72, 2.90, 3.05, fill=INK_850, line=EDGE, radius=0.04)
text(s, rx - 0.06, 2.98, 2.45, 0.3, "What it means", size=9, color=BRAND_300,
     font=F_SANS, bold=True, caps=True, tracking=1.8)
bullet_block(s, rx - 0.06, 3.36, 2.5, [
    "Phase 1 (generation) 4 Dec 2021; Phase 2 (integration) 1 Jan 2023.",
    "A standard B2B invoice is cleared by ZATCA before the buyer ever sees it.",
    "A clawback is a credit note (381). A true-up is a debit note (383). Both are cleared filings.",
], size=9.5, gap=0.72)
source_note(s, "ZATCA (Zakat, Tax and Customs Authority), e-invoicing roll-out phases and detailed guidelines. "
               "Wave 24 announced 26 Sep 2025, integration by 30 Jun 2026. Wave 25 announced 24 Jul 2026, "
               "integration by 1 Feb 2027 — confirm at source before circulating (see Assumption register, A-1).")
N(s, "Open on something that has already happened, not something you predict. Raskin: naming the change "
     "first keeps the room out of a defensive crouch — you are not telling them their process is broken, "
     "you are telling them the law moved. Three billion riyals down to three hundred and seventy-five "
     "thousand, which is the VAT registration line. A commission is an invoice. That invoice is now a "
     "cleared government document.")


# ══════════════════════════════════════════════════ 04 · WINNERS AND LOSERS
s = S()
assertion(s, "The company that can characterise, evidence and file every partner\n"
             "payment closes its month. The company that cannot is missing a filing\n"
             "deadline by hand, at 1% a month, forever.",
          kicker="Why now  ·  the stakes", size=25)

table(s, M, 2.78, 5.72,
      ["Payment type", "Rate", "Basis"],
      [["Management fees", ("20%", {"color": BRASS_300, "font": F_MONO}), "Art. 68"],
       ["Royalties / IP", ("15%", {"color": BRASS_300, "font": F_MONO}), "Art. 68"],
       ["Technical / consulting — unrelated", ("5%", {"color": BRASS_300, "font": F_MONO}), "Art. 68"],
       ["Technical / consulting — related", ("15%", {"color": STOP, "font": F_MONO}), "3× the rate"],
       ["Rent, freight, air tickets", ("5%", {"color": BRASS_300, "font": F_MONO}), "Art. 68"],
       ["VAT on the commission leg", ("15%", {"color": BRASS_300, "font": F_MONO}), "Separate supply*"]],
      colw=[3.20, 1.32, 1.20], rowh=0.545, size=10.5)

bx = 6.85
rect(s, bx, 2.72, 5.62, 3.72, fill=INK_850, line=EDGE, radius=0.04)
text(s, bx + 0.34, 2.98, 5.0, 0.34, "The rate is a judgement, not a lookup",
     size=15, color=TEXT_HI, font=F_DISPLAY)
bullet_block(s, bx + 0.34, 3.44, 5.0, [
    ("5% or 15%?", "turns on whether the counterparty is related to you."),
    ("15% or 20%?", "turns on whether the payment is a royalty or a management fee."),
    ("Separate supply, or none at all?", "turns on whether the agent is disclosed or "
     "undisclosed — partner and reseller arrangements often sit on the undisclosed side."),
], size=10.5, gap=0.74)
rect(s, bx + 0.34, 5.62, 5.0, 0.62, fill=RGBColor(0x1A, 0x14, 0x0B), line=BRASS_500, radius=0.06)
text(s, bx + 0.56, 5.76, 4.65, 0.4,
     "Returns due by the 10th, every month.  1% of unpaid tax per 30 days — simple, uncapped.",
     size=10, color=BRASS_300, font=F_SANS, bold=True)
source_note(s, "Saudi Income Tax Law Article 68; ZATCA withholding-tax guidance; ZATCA VAT Agents Guideline. "
               "*A disclosed agent's commission is a supply of services separate from the supply it arranges; "
               "an undisclosed agent is generally treated as principal.")
N(s, "Here is the part that decides the outcome. The withholding rate on a partner payment is not one "
     "number — it is five, fifteen or twenty depending on what kind of payment it is, and it triples from "
     "five to fifteen if the counterparty is related to you. Getting that right requires knowing what the "
     "payment is and who the counterparty is. That is a data model. It is not a column in a spreadsheet.")


# ═══════════════════════════════════════════════════════════ 05 · THE PROBLEM
s = S()
assertion(s, "Two companies, two ledgers, one payment — and neither version is the one\n"
             "a regulator or an auditor will accept.",
          kicker="Problem", size=27)

# the two-ledger diagram
dy = 2.78
for i, (nm, sub) in enumerate([("Company A", "computes what it is owed"),
                               ("Company B", "computes what it owes")]):
    cx = M + i * 4.45
    rect(s, cx, dy, 3.15, 1.18, fill=INK_850, line=EDGE, radius=0.05)
    text(s, cx + 0.30, dy + 0.28, 2.6, 0.3, nm, size=14, color=TEXT_HI, font=F_DISPLAY)
    text(s, cx + 0.30, dy + 0.66, 2.6, 0.5, sub, size=10, color=TEXT_LO, font=F_SANS)
text(s, M + 3.22, dy + 0.36, 1.20, 0.5, "email\n⇄", size=11, color=TEXT_FAINT,
     font=F_SANS, align=PP_ALIGN.CENTER, spacing=1.3)
rect(s, M + 9.05, dy, 3.05, 1.18, fill=RGBColor(0x0E, 0x1A, 0x14), line=OK, radius=0.05)
text(s, M + 9.35, dy + 0.28, 2.5, 0.3, "The cleared invoice", size=14, color=OK, font=F_DISPLAY)
text(s, M + 9.35, dy + 0.64, 2.5, 0.44, "legally real — and neither\nledger touches it",
     size=9.5, color=TEXT_MID, font=F_SANS, spacing=1.3)

y = 4.30
cols = [
    ("01", "The failure is bilateral",
     "Not that one company computes wrong — that two companies compute separately and reconcile by "
     "email. Every commission tool on the market solves one side of it."),
    ("02", "Gross-or-net is a restatement risk",
     "IFRS 15 B34–B38 / ASC 606 decide gross versus net on a principal-versus-agent control test. "
     "The evidence for that judgement is attribution fact, and it lives in spreadsheets."),
    ("03", "Commission is a capitalised asset",
     "Under ASC 340-40 the cost of obtaining a contract is capitalised and amortised over the expected "
     "customer life. This is audited data — which is why the buyer is the controller."),
]
for i, (n_, t_, b_) in enumerate(cols):
    column(s, M + i * 4.13, y, 3.75, n_, t_, b_, bodysize=10.5, bh=1.55)
source_note(s, "IFRS 15 ¶B34–B38 · ASC 606 · ASC 340-40. No research house — Gartner, Forrester, IDC or "
               "Omdia/Canalys — publishes a total for B2B partner commissions, revenue shares, rebates and "
               "referral fees as a single category. The money is unmeasured because it is unowned.", y=6.58)
N(s, "Every company here already has software that computes what it thinks it is owed. What no company has "
     "is a record the other side also settles against. And the two accounting judgements hanging off it are "
     "audited. When we say system of record we mean the record an auditor accepts, not a dashboard.")


# ═════════════════════════════════════ 06 · WHY NOBODY FIXED IT (the category)
s = S()
assertion(s, "The incumbent is the spreadsheet — and the reason no partner-software\n"
             "vendor displaced it is that the category was defined to stop before the money.",
          kicker="Problem  ·  competitive alternatives", size=26)

rect(s, M, 2.62, 6.35, 3.42, fill=INK_850, line=EDGE, radius=0.04)
text(s, M + 0.34, 2.86, 5.7, 0.3,
     "G2's six inclusion criteria for Partner Relationship Management",
     size=11.5, color=BRAND_300, font=F_SANS, bold=True)
crit = ["Portals to communicate and exchange information and content",
        "Onboarding, training and certification of partners",
        "Access management by user, group or role",
        "Workflows, notifications and alerts",
        "Deal management or deal registration",
        "Tracking the effectiveness of MDF, co-op and co-branded activity"]
cy = 3.30
for i, c in enumerate(crit):
    text(s, M + 0.34, cy, 0.30, 0.3, f"{i+1}", size=9.5, color=TEXT_FAINT, font=F_MONO)
    text(s, M + 0.70, cy - 0.02, 5.25, 0.36, c, size=10, color=TEXT_MID, font=F_SANS)
    cy += 0.38
text(s, M + 0.34, 5.66, 5.7, 0.3,
     "No payout.   No invoicing.   No tax.   No reconciliation.   No ledger.",
     size=10.5, color=STOP, font=F_SANS, bold=True)

quote(s, 7.75, 2.68, 4.75,
      "While some PRM solutions may also track compliance with laws, contractual agreements, "
      "and incentive and loyalty programs, these are typically considered as secondary capabilities.",
      "G2 — PRM category definition", size=13.5)
rect(s, 7.75, 4.52, 4.72, 1.52, fill=INK_850, line=EDGE, radius=0.04)
text(s, 8.05, 4.74, 4.2, 0.3, "And where payout does appear", size=10.5, color=BRAND_300,
     font=F_SANS, bold=True)
text(s, 8.05, 5.08, 4.15, 0.9,
     "…it is Rebate Management — a supplier-to-reseller category outside the partnerships tree. "
     "One party disbursing money in one direction. Not a ledger two counterparties both settle against.",
     size=9.5, color=TEXT_MID, font=F_SANS, spacing=1.4)
source_note(s, "G2 Data API, category “partner-relationship-management-prm” and its parent "
               "“Partnerships Management” (five child categories), retrieved 5 August 2026.")
N(s, "This is not our claim about our competitors. This is the independent review marketplace's definition "
     "of what our competitors are, pulled from G2's API this morning. Six required capabilities, none of them "
     "financial in the settlement sense. The category boundary was drawn around the money. That is where we start.")


# ═══════════════════════════════════════════════════════ 07 · PROMISED LAND
s = S(bg=NAVY)
eyebrow(s, M, 1.55, "Solution  ·  the promised land")
text(s, M, 2.00, 11.3, 1.9,
     "Both companies close the month against one number\nneither has to argue about — and it is the same\nnumber the tax authority already cleared.",
     size=32, color=TEXT_HI, font=F_DISPLAY, spacing=1.16, tracking=-0.4)
y = 4.55
for i, (nm, tick) in enumerate([("Company A · finance", "closes"), ("Company B · finance", "closes")]):
    cx = M + i * 8.05
    rect(s, cx, y, 3.30, 0.98, fill=INK_820, line=EDGE, radius=0.05)
    text(s, cx + 0.30, y + 0.24, 2.7, 0.3, nm, size=11.5, color=TEXT_MID, font=F_SANS)
    text(s, cx + 0.30, y + 0.56, 2.7, 0.3, "✓  " + tick, size=12, color=OK, font=F_SANS, bold=True)
rect(s, M + 4.05, y - 0.12, 3.72, 1.22, fill=INK_850, line=BRAND_500, radius=0.05)
text(s, M + 4.30, y + 0.10, 3.2, 0.3, "ONE RECORD", size=9.5, color=BRAND_300, font=F_SANS,
     bold=True, caps=True, tracking=2.2, align=PP_ALIGN.CENTER)
text(s, M + 4.30, y + 0.44, 3.2, 0.5, "cleared · attributed\n· evidenced", size=13, color=TEXT_HI,
     font=F_DISPLAY, align=PP_ALIGN.CENTER, spacing=1.2)
N(s, "No data on this slide. Describe the state of the world, not the product. Raskin's test: the promised "
     "land is not having your technology, it is what life is like thanks to having it. If the sentence "
     "contains the word ledger or platform, it has been written wrong.")


# ═══════════════════════════════════════════════════════ 08 · THE CORE INSIGHT
s = S()
assertion(s, "A ledger only one side trusts is just an invoice. The durable asset is one\n"
             "mutually approved ruleset both counterparties settle against — and the\n"
             "regulator has already made the settlement document itself shared.",
          kicker="Solution  ·  the insight", size=25)

# five-corner diagram
cy = 3.55
boxes = [(M + 0.00, "Company A", "access point"), (M + 3.05, "", ""), (M + 4.55, "", ""),
         (M + 8.35, "Company B", "access point")]
rect(s, M, cy, 2.55, 1.05, fill=INK_850, line=EDGE, radius=0.05)
text(s, M + 0.26, cy + 0.24, 2.1, 0.3, "Company A", size=13, color=TEXT_HI, font=F_DISPLAY)
text(s, M + 0.26, cy + 0.58, 2.1, 0.3, "access point", size=9.5, color=TEXT_LO, font=F_MONO)
rect(s, M + 8.35, cy, 2.55, 1.05, fill=INK_850, line=EDGE, radius=0.05)
text(s, M + 8.61, cy + 0.24, 2.1, 0.3, "Company B", size=13, color=TEXT_HI, font=F_DISPLAY)
text(s, M + 8.61, cy + 0.58, 2.1, 0.3, "access point", size=9.5, color=TEXT_LO, font=F_MONO)
rect(s, M + 3.20, cy - 0.22, 4.95, 1.50, fill=INK_820, line=BRAND_500, lw=1.4, radius=0.05)
text(s, M + 3.48, cy - 0.02, 4.4, 0.3, "THE SHARED RULESET", size=9.5, color=BRAND_300,
     font=F_SANS, bold=True, caps=True, tracking=2.2)
text(s, M + 3.48, cy + 0.32, 4.4, 0.8,
     "approved by both · versioned · append-only\nclaim · attribution · eligibility · characterisation · evidence",
     size=11, color=TEXT_MID, font=F_SANS, spacing=1.4)
line(s, M + 2.55, cy + 0.52, 0.65, color=EDGE_STRONG)
line(s, M + 8.15, cy + 0.52, 0.20, color=EDGE_STRONG)
rect(s, M + 4.60, cy + 1.58, 2.15, 0.62, fill=RGBColor(0x0E, 0x1A, 0x14), line=OK, radius=0.06)
text(s, M + 4.80, cy + 1.74, 1.9, 0.3, "ZATCA · Fatoora", size=11, color=OK, font=F_SANS, bold=True,
     align=PP_ALIGN.CENTER)
vline(s, M + 5.67, cy + 1.28, 0.30, color=EDGE_STRONG)

bullet_block(s, M, 5.62, 11.4, [
    ("The shared artefact already legally exists.", "ZATCA clears the standard B2B invoice before "
     "issuance, so both counterparties are already bound to one stamped document, one identity, one "
     "timestamp. We do not have to persuade two companies to adopt a shared record — we attach the "
     "partner economics to the record they are already legally bound to."),
], size=11, gap=0.5)
source_note(s, "Architecture pattern: Peppol's four-corner model (five-corner where a regulator sits in the "
               "loop) — each side connects only to its own access point, interoperability guaranteed by a "
               "shared specification rather than pairwise integration.")
N(s, "The eureka is that we do not have to invent a shared record — the regulator built one. What ZATCA "
     "holds is that an invoice was issued at a rate. What it does not hold is why: who sourced the deal, "
     "under what protection window, whether the claim was eligible under which version of the agreement, "
     "whether the counterparty is related. Those facts determine the amount and the rate, and they exist "
     "nowhere but in email.")


# ═════════════════════════════════════════════════════ 09 · PRODUCT — CAPTURE
s = S()
assertion(s, "Phase 1 delivers complete value to one company on day one, requires zero\n"
             "consent from the counterparty — and captures exactly the data the\n"
             "settlement layer will need.",
          kicker="Product  ·  shipping now", size=25)

items = [("Partner registry", "identity, lifecycle, ownership, onboarding"),
         ("Claim registration", "the deal/claim is the atomic object — not the partner profile"),
         ("Attribution of record", "one canonical decision: model-advised, human-decided, contestable"),
         ("Protection windows", "deal protection as an audited right, with expiry notification"),
         ("Eligibility preview", "computed by one authoritative service, always with an explanation"),
         ("Evidence packs", "the claim, the attribution, the ruleset version, the documents"),
         ("Tax-field capture", "characterisation and counterparty relationship recorded at claim time"),
         ("Append-only ledger", "accrued and eligible states recorded — never executed")]
for i, (k, v) in enumerate(items):
    cx = M + (i % 2) * 6.15
    cy = 2.88 + (i // 2) * 0.74
    rect(s, cx, cy + 0.12, 0.075, 0.075, fill=BRAND_500)
    text(s, cx + 0.28, cy, 5.6, 0.28, k, size=12, color=TEXT_HI, font=F_SANS, bold=True)
    text(s, cx + 0.28, cy + 0.28, 5.6, 0.32, v, size=9.5, color=TEXT_LO, font=F_SANS)

rect(s, M, 5.84, 11.6, 0.50, fill=RGBColor(0x1A, 0x0F, 0x0E), line=STOP, radius=0.05)
text(s, M + 0.30, 5.95, 11.0, 0.3,
     "No money movement.  No approval-to-pay.  No payment-rail integration.  No automated tax clearance.  "
     "Phase 1 calculates, records and prepares — nothing else.",
     size=10.5, color=RGBColor(0xF0, 0xA0, 0x96), font=F_SANS, bold=True)
source_note(s, "Cold-start precedent: Crossbeam's account mapping scaled because each side uploads only its "
               "own list and only the intersection is revealed — no negotiation, no shared ruleset, no "
               "agreement about money. Crossbeam and Reveal merged June 2024; 25,000+ companies had adopted "
               "one or the other by 2024, and Crossbeam now cites over 30,000. Phase 1 must clear the same bar.")
N(s, "Replace this slide with three real screenshots before you present: claim registration, the attribution "
     "record with its protection window, and an evidence pack as finance receives it. The design constraint "
     "is the important part — a company gets full value without its partner ever logging in. We are not "
     "asking two CFOs to agree on anything in year one.")


# ══════════════════════════════════════════════════════ 10 · THE MAGIC GIFTS
s = S()
assertion(s, "Every capability exists to remove one specific thing standing between\n"
             "a finance team and a closed month.",
          kicker="Product  ·  what each thing is for", size=27)
gifts = [
    ("“Finance rebuilds the partner statement by hand every month.”",
     "Evidence pack — the claim, the attribution, the ruleset version and the supporting documents, "
     "exported in the form finance accepts."),
    ("“Nobody agrees who sourced the deal, and the argument happens after the money is due.”",
     "Attribution-of-record + protection windows — the decision is made and timestamped before the "
     "deal closes, not litigated after."),
    ("“Is this 5%, 15% or 20% — and is this counterparty related to us?”",
     "Tax-field capture — characterisation and counterparty relationship recorded at claim time, "
     "carried through to the payout and the filing."),
    ("“A clawback is a phone call, and then a fight.”",
     "Credit and debit note handling — a true-up is a 383, a clawback is a 381; each sequenced, "
     "timestamped and cleared."),
]
cy = 2.78
for obstacle, gift in gifts:
    text(s, M, cy, 6.55, 0.62, obstacle, size=15, color=TEXT_HI, font=F_DISPLAY, spacing=1.16)
    text(s, M + 6.95, cy + 0.04, 4.65, 0.66, gift, size=9.5, color=TEXT_MID, font=F_SANS, spacing=1.42)
    line(s, M, cy + 0.78, 11.6, color=EDGE_SOFT)
    cy += 0.94
source_note(s, "Titled by the obstacle, never by the feature — Raskin's fourth beat. “Evidence pack” is a "
               "feature; “finance stops rebuilding the statement by hand” is what someone pays for.")
N(s, "The third row is the one that only works if you are built here. Five versus fifteen percent turns on "
     "whether the counterparty is related to you; fifteen versus twenty turns on whether it is a royalty or "
     "a management fee. A global tool ships that as a config flag. It is not one.")


# ══════════════════════════════════════════════════════════ 11 · THE ROADMAP
s = S()
assertion(s, "You cannot settle what you never captured, and you cannot orchestrate a\n"
             "network with no settled truth — so the money layer is earned in sequence.",
          kicker="Roadmap  ·  sequencing as judgement", size=26)

phases = [
    (BRAND_500, "PHASE 1", "Capture", "Months 0–9",
     "Claim-centric PRM. Registry, claim registration, attribution-of-record, protection, "
     "eligibility preview, evidence packs, tax capture.",
     ["Full value to one company — zero counterparty consent",
      "Earns the attribution record: the fact base for the rate"]),
    (BRASS_400, "PHASE 2", "Settle", "Months 9–24",
     "Rule engine + append-only bilateral ledger. Both counterparties settle against one "
     "mutually approved ruleset. Disputes, e-invoicing, withholding, ERP.",
     ["A ledger with no captured claims has nothing to reconcile",
      "Earns the right to charge on the flow through our record"]),
    (HOLD, "PHASE 3", "Orchestrate", "Months 24+",
     "Cross-company partner network, partner P&L, forecasting, co-sell — and basis points on "
     "settled flow. Money movement stays a separate, later decision.",
     ["A network whose members dispute last quarter is a directory",
      "Earns network economies: a late-stage power, not an origination one"]),
]
for i, (tone, tag, nm, win, body, bs) in enumerate(phases):
    phase_band(s, M + i * 3.95, 2.58, 3.70, 3.22, i, tag, nm, win, body, bs, tone=tone, dim=(i == 2))

rect(s, M, 5.82, 11.6, 0.40, fill=INK_870, line=EDGE_SOFT, radius=0.05)
text(s, M + 0.28, 5.92, 11.1, 0.3,
     [("Written kill criteria:  ", {"bold": True, "color": WARN}),
      ("Capture must sell standalone at target ACV before we build Settle. A counterparty pair must "
       "sign one ruleset before we build Orchestrate.", {"color": TEXT_MID})],
     size=9.5, font=F_SANS)
rect(s, M, 6.26, 11.6, 0.40, fill=INK_850, line=EDGE, radius=0.05)
text(s, M + 0.28, 6.36, 11.1, 0.3,
     [("Toast FY2024:  ", {"bold": True, "color": TEXT_HI}),
      ("81.7% of revenue is fintech, but a 2.55% gross take is ", {"color": TEXT_MID}),
      ("55 bps net", {"color": BRASS_300, "bold": True, "font": F_MONO}),
      (".    ServiceTitan:  ", {"color": TEXT_MID}),
      ("~70% still subscription", {"color": TEXT_HI, "bold": True}),
      (", payments take ~25 bps of GTV.", {"color": TEXT_MID})],
     size=10, font=F_SANS)
source_note(s, "Toast FY2024 SEC filings · ServiceTitan S-1 · Shopify FY2024 (verify at filing) · a16z, "
               "“Vertical Operating Systems”.", y=6.72)
N(s, "The most useful thing I can tell you about this roadmap is what we deliberately did not build. We could "
     "have started with the ledger. We didn't, because a ledger with no captured claims has nothing to settle "
     "and a network with no settled ledger has nothing to orchestrate. Toast, ServiceTitan and Shopify all did "
     "the record first and the money second. None of them did it the other way round. And ServiceTitan is "
     "still seventy percent subscription today — the flow layer is an addition, not a replacement.")


# ════════════════════════════════════════════ 12 · WHY NOW I — THE REGULATORY CLOCK
s = S()
assertion(s, "This is not a market we have to create. It is a deadline that exists whether\n"
             "or not we do — and Saudi Arabia reaches it about three years before the EU.",
          kicker="Why now  ·  force 1, the ratchet", size=26)

ty = 3.62
line(s, M, ty, 11.5, color=EDGE_STRONG)
marks = [
    (0.000, "Jan 2025", "DE receipt", False),
    (0.075, "Jan 2026", "Belgium B2B", False),
    (0.155, "Feb 2026", "Poland KSeF", False),
    (0.255, "Jun 2026", "KSA Wave 24", True),
    (0.335, "Jul 2026", "UAE ASP", False),
    (0.415, "Sep 2026", "France receive", False),
    (0.505, "Jan 2027", "UAE mandatory", False),
    (0.585, "Feb 2027", "KSA Wave 25", True),
    (0.665, "Sep 2027", "France SMEs", False),
    (0.745, "Jan 2028", "Germany all", False),
    (0.865, "Jul 2030", "ViDA intra-EU", False),
    (0.985, "Jan 2035", "ViDA converge", False),
]
for t, when, what, hot in marks:
    x = M + t * 11.15
    up = hot
    rect(s, x, ty - 0.055, 0.075, 0.115, fill=BRAND_500 if hot else TEXT_FAINT)
    if up:
        text(s, x - 0.30, ty - 0.78, 1.75, 0.5,
             [[(what, {"color": BRAND_300, "size": 10, "bold": True})],
              [(when, {"color": TEXT_MID, "size": 9, "font": F_MONO})]], font=F_SANS, spacing=1.2)
        vline(s, x + 0.03, ty - 0.24, 0.19, color=BRAND_500)
    else:
        row = marks.index((t, when, what, hot)) % 2
        oy = ty + (0.18 if row == 0 else 0.62)
        vline(s, x + 0.03, ty + 0.06, 0.10 if row == 0 else 0.54, color=EDGE)
        text(s, x - 0.26, oy, 1.52, 0.50,
             [[(when, {"color": TEXT_LO, "size": 8.5, "font": F_MONO})],
              [(what, {"color": TEXT_FAINT, "size": 8.5})]], font=F_SANS, spacing=1.2)

cards = [
    ("Saudi Arabia — already here", BRAND_500,
     "Wave 24 at SAR 375,000 (the mandatory VAT registration threshold) was due 30 Jun 2026. "
     "Wave 25 at SAR 187,500 — below the mandatory line — is due 1 Feb 2027."),
    ("The EU — hard law, dated", TEXT_MID,
     "VAT in the Digital Age adopted as Council Directive (EU) 2025/516, 11 Mar 2025, in force 14 Apr 2025. "
     "Intra-EU structured e-invoicing plus near-real-time reporting from 1 Jul 2030; convergence by 1 Jan 2035."),
    ("The GCC is fragmenting", BRASS_400,
     "The UAE runs a Peppol five-corner model on PINT AE. Saudi runs clearance. Two neighbouring states, "
     "two architecturally incompatible stacks. One global build cannot sweep the region."),
]
for i, (t_, c_, b_) in enumerate(cards):
    cx = M + i * 3.95
    rect(s, cx, 4.86, 3.70, 1.52, fill=INK_850, line=EDGE, radius=0.04)
    rect(s, cx, 4.86, 3.70, 0.04, fill=c_)
    text(s, cx + 0.26, 5.04, 3.25, 0.3, t_, size=11.5, color=TEXT_HI, font=F_SANS, bold=True)
    text(s, cx + 0.26, 5.36, 3.2, 0.92, b_, size=9, color=TEXT_MID, font=F_SANS, spacing=1.38)
source_note(s, "ZATCA · Council Directive (EU) 2025/516 · UAE Ministerial Decisions 243 & 244 of 2025 · "
               "national mandates (BE, PL, FR, DE). Counter-example, volunteered: the United States moved the "
               "other way — the One Big Beautiful Bill Act (2025) restored the Form 1099-K threshold to $20,000 "
               "and 200+ transactions, retroactive to 2022. The US is the outlier, not the model.")
N(s, "Sequoia's own question is: why hasn't this been built before now. The answer is that until three years "
     "ago there was no forcing function. This was a spreadsheet problem, and spreadsheet problems don't get "
     "budget. It became a filing obligation, and filings get budget. Notice the shape of the map — the EU's "
     "intra-EU requirement lands in 2030 and convergence in 2035. Saudi arrives in 2026 and 2027. We are not "
     "early to a trend. We are on time in the market that got there first.")


# ═════════════════════════════════════════ 13 · WHY NOW II — THE ECONOMIC FORCES
s = S()
assertion(s, "Direct acquisition got expensive at exactly the moment the channels that fed\n"
             "it stopped working — so growth migrated to revenue that arrives through\n"
             "somebody else, and every one of those creates a bilateral money obligation.",
          kicker="Why now  ·  forces 2–5, the economics", size=25)

stat_card(s, M, 2.80, 2.72, 1.92, "$2.00", "New CAC ratio",
          "of S&M to buy $1.00 of new ARR (2024, up 14% YoY)", money=True, valsize=30)
stat_card(s, M + 2.95, 2.80, 2.72, 1.92, "$1.00", "Expansion CAC",
          "the same dollar, bought through a relationship you already have", money=True, valsize=30)
stat_card(s, M + 5.90, 2.80, 2.72, 1.92, "8%", "Click-through",
          "when an AI summary appears, vs 15% when none does; 1% on the summary's own links", valsize=30)
stat_card(s, M + 8.85, 2.80, 2.72, 1.92, "6.3", "Partners / customer",
          "reconciliation cost scales with counterparties, not revenue", valsize=30)

y2 = 4.92
bullet_block(s, M, y2, 5.75, [
    ("Distribution moved onto third-party rails.", "Hyperscaler cloud-marketplace software sales are "
     "forecast to rise from $30bn (2024) to $163bn by 2030 — a 29.1% CAGR — with partners facilitating "
     "nearly 60% of marketplace transactions by 2030. Every one is a three-party transaction."),
], size=10.5, gap=0.5)
bullet_block(s, M + 6.10, y2, 5.5, [
    ("The rails for machine commerce are done; the accounting is not.", "Mastercard Agent Pay and Visa "
     "Intelligent Commerce (Apr 2025), Google's AP2 with 60+ organisations (Sep 2025), OpenAI/Stripe's "
     "Agentic Commerce Protocol (Sep 2025). Not one answers who gets credit for the sale, or what share "
     "each party is owed."),
], size=10.5, gap=0.5)

rect(s, M, 5.94, 11.6, 0.44, fill=INK_870, line=EDGE_SOFT, radius=0.05)
text(s, M + 0.26, 6.05, 11.1, 0.3,
     [("The number that argues against us, first:  ", {"bold": True, "color": WARN}),
      ("partner share of the addressable IT market falls to 66.7% in 2026 from 70.1% — because AI capex "
       "inflates the direct denominator. Partner-delivered spend still grew 6.7% on a $6.07tn base.",
       {"color": TEXT_MID})],
     size=9.5, font=F_SANS)
source_note(s, "Benchmarkit, 2025 B2B SaaS Performance Metrics (with Pavilion) · Pew Research Center, "
               "22 Jul 2025 (900 US adults, 68,879 searches) · Omdia, 6 Oct 2025 and 28 Jan 2026 · "
               "Google Cloud, Mastercard, Visa, OpenAI/Stripe announcements Apr 2025 – Jun 2026.")
N(s, "I want to give you the number that argues against me first. Partner share of IT spend is falling — "
     "70.1 down to 66.7 percent. That is real. It is falling because AI infrastructure capex inflates the "
     "direct denominator, not because the channel is shrinking. The number I actually care about is the last "
     "one: the average customer now works with six point three partners. Reconciliation cost does not scale "
     "with revenue. It scales with counterparties.")


# ══════════════════════════════════════════════════════════ 14 · MARKET
s = S()
assertion(s, "We size this by counting the Saudi businesses inside the mandate and\n"
             "multiplying by what we charge — because the category-level number does\n"
             "not exist, and we would rather show the arithmetic than borrow someone's.",
          kicker="Market potential  ·  bottom-up", size=25)

rungs = [("1.91M", "active commercial registrations", "+12% YoY; 71,000+ new in Q2 2026", True),
         ("×  %", "inside a live ZATCA wave", "Wave 24 = every mandatorily VAT-registered entity", True),
         ("×  %", "running a partner programme", "no public source exists — our own discovery base rate", False),
         ("×  %", "reachable by our motion", "sector, size and buying-centre filters", False),
         ("×  ACV", "annual contract value", "see Business model", False)]
cx = M
for i, (v, lab, sub, sourced) in enumerate(rungs):
    w = 2.22
    col = BRAND_500 if sourced else WARN
    rect(s, cx, 2.82, w, 1.92, fill=INK_850, line=EDGE, radius=0.04)
    rect(s, cx, 2.82, w, 0.04, fill=col)
    text(s, cx + 0.22, 3.02, w - 0.4, 0.44, v, size=20,
         color=BRASS_300 if i == 0 else TEXT_HI, font=F_MONO if i == 0 else F_DISPLAY)
    text(s, cx + 0.22, 3.52, w - 0.4, 0.52, lab, size=10, color=TEXT_HI, font=F_SANS, bold=True, spacing=1.3)
    text(s, cx + 0.22, 4.10, w - 0.4, 0.44, sub, size=8.5, color=TEXT_LO, font=F_SANS, spacing=1.3)
    text(s, cx + 0.22, 4.50, w - 0.4, 0.2, "SOURCED" if sourced else "ASSUMED", size=7.5,
         color=col, font=F_SANS, bold=True, caps=True, tracking=1.6)
    cx += w + 0.10
rect(s, M, 4.92, 11.6, 0.04, fill=EDGE)

y3 = 5.14
bullet_block(s, M, y3, 5.75, [
    ("Where the firms form.", "35.2% of new SME registrations in Q2 2025 (28,181) were in Riyadh Province, "
     "ahead of Makkah at 18.1% and the Eastern Region at 16.2%. 259,000 new commercial registrations were "
     "issued Kingdom-wide in 2025."),
], size=10.5, gap=0.5)
bullet_block(s, M + 6.10, y3, 5.5, [
    ("The enterprise tier is compounding, and the budget exists.", "MISA issued 15,728 investment licences "
     "in the first nine months of 2025 against 14,320 for all of 2024. MENA IT spending is forecast at "
     "$169bn in 2026 (+8.9%), software at $20.4bn (+13.9%)."),
], size=10.5, gap=0.5)
source_note(s, "Saudi Ministry of Commerce · Monsha'at SME Monitor Q2-2025 · Vision 2030 Annual Report 2025 · "
               "MISA Economic and Investment Monitor Q3 2025 · Gartner, 4 Aug 2025. Note: software is not the "
               "fastest-growing MENA IT segment — data centre systems is, at +37.3%.")
N(s, "I am not going to show you a market study, because Sequoia's own guidance says not to and because for "
     "this category the study genuinely does not exist — nobody sizes B2B partner commissions as a market. "
     "So here is the arithmetic instead. Every input in blue has a source on this page. Every input in amber "
     "is an assumption I am making and will defend. The one I am least certain of is the third rung, and I "
     "will show you exactly how I got there.")


# ═══════════════════════════════════════════════════════ 15 · COMPETITION
s = S()
assertion(s, "Our real competitor is a spreadsheet and an emailed PDF. The software\n"
             "competitors are genuinely better at partner marketing — and are consolidating\n"
             "into one commerce platform that structurally cannot be neutral.",
          kicker="Competition & alternatives", size=25)

# 2x2 map
mx, my, mw, mh = M, 2.85, 6.35, 3.15
rect(s, mx, my, mw, mh, fill=INK_870, line=EDGE, radius=0.02)
vline(s, mx + mw / 2, my, mh, color=EDGE)
line(s, mx, my + mh / 2, mw, color=EDGE)
text(s, mx, my + mh + 0.10, mw, 0.26, "single-sided record            →            bilateral record of record",
     size=8.5, color=TEXT_FAINT, font=F_SANS, align=PP_ALIGN.CENTER)
text(s, mx - 0.78, my + mh / 2 - 0.15, 0.72, 0.5, "generic\n↑ localised", size=8.5, color=TEXT_FAINT,
     font=F_SANS, align=PP_ALIGN.RIGHT, spacing=1.3)


def dot(x, y, label, sub, color=TEXT_MID, big=False):
    r = 0.13 if big else 0.085
    rect(s, x, y, r, r, fill=color)
    text(s, x + 0.20, y - 0.09, 2.9, 0.28, label, size=10.5,
         color=TEXT_HI if big else TEXT_MID, font=F_SANS, bold=big)
    if sub:
        text(s, x + 0.20, y + 0.14, 2.9, 0.26, sub, size=8, color=TEXT_FAINT, font=F_SANS)


dot(mx + 0.42, my + 2.74, "The spreadsheet", "the incumbent — what we actually lose to", STOP, big=True)
dot(mx + 0.42, my + 1.72, "PartnerStack · Impartner", "better at recruitment & marketing")
dot(mx + 0.42, my + 2.24, "Crossbeam", "explicitly does not touch money")
dot(mx + 3.40, my + 1.72, "AppDirect", "closest on capability — non-neutral")
dot(mx + 3.40, my + 0.62, "Reven", "bilateral · ZATCA/WHT localised", BRAND_500, big=True)

rx = 7.65
rect(s, rx, 2.85, 4.82, 1.42, fill=INK_850, line=EDGE, radius=0.04)
text(s, rx + 0.28, 3.04, 4.3, 0.3, "What we concede, in writing", size=11, color=BRAND_300,
     font=F_SANS, bold=True)
text(s, rx + 0.28, 3.36, 4.28, 0.82,
     "PartnerStack, Impartner and Crossbeam are better than us at partner recruitment, partner marketing "
     "and ecosystem data, and will be for years. We do not compete on breadth of front-office tooling.",
     size=9.5, color=TEXT_MID, font=F_SANS, spacing=1.4)

rect(s, rx, 4.42, 4.82, 1.62, fill=RGBColor(0x14, 0x1B, 0x30), line=BRAND_500, radius=0.04)
text(s, rx + 0.28, 4.60, 4.32, 0.3, "Neutrality is the thing they cannot buy",
     size=11, color=BRAND_300, font=F_SANS, bold=True)
text(s, rx + 0.28, 4.92, 4.28, 1.0,
     "AppDirect acquired Tackle.io (Dec 2025) and PartnerStack (Apr 2026) — get-found, get-chosen, "
     "get-paid under one owner. It settles as the marketplace, taking a cut of the transaction it would "
     "be adjudicating. A party with an economic interest in the amount cannot be the record both "
     "counterparties trust.",
     size=9.5, color=TEXT_MID, font=F_SANS, spacing=1.38)
source_note(s, "AppDirect / PartnerStack / BetaKit announcements (price reported at “upwards of $150m”, terms "
               "undisclosed) · Crossbeam–Reveal all-stock merger, Jun 2024 · vendor-published pricing: "
               "Crossbeam $4,800/yr + $1,800/seat, Supernode from $25,000/yr; Salesforce PRM $25/member/month "
               "or $10/login — both charge real money for products that never touch the money.")
N(s, "The honest answer to who do you lose to is Excel and an emailed statement. I will take the rest head-on. "
     "AppDirect just bought Tackle and PartnerStack — it is the most serious competitor here and it can build "
     "ZATCA clearance. What it cannot do is become neutral, because it takes a cut of the transaction it "
     "would be adjudicating. That is not a feature gap. It is a structural one.")


# ═══════════════════════════════════════════════════════ 16 · BUSINESS MODEL
s = S()
assertion(s, "We charge a subscription for the record and refuse a take rate on partner\n"
             "money — and when the settlement layer ships, the flow fee is tens of basis\n"
             "points, not percent.",
          kicker="Business model", size=25)

cols2 = [("Pricing metric", "Active partner programmes, with unlimited internal seats — so price scales "
          "with the money governed, not with how many people look at it. [Founder-supplied: bands and ACV.]"),
         ("What we refuse", "A visible percentage of the partner's money. Incumbents that take one are "
          "described by their buyers as a tax on their own success. Refusing it early is the positioning, "
          "not a concession."),
         ("The flow layer, later", "A flat per-payout fee when Reven runs settlement; basis points on "
          "settled flow only at Phase 3 scale. Capped, fenced and reported separately.")]
for i, (t_, b_) in enumerate(cols2):
    column(s, M + i * 4.13, 2.72, 3.75, f"0{i+1}", t_, b_, bodysize=10.5, bh=1.30)

rect(s, M, 5.02, 11.6, 1.34, fill=INK_850, line=EDGE, radius=0.04)
text(s, M + 0.30, 5.18, 11.0, 0.3, "Why we model the flow layer on net, not gross",
     size=11.5, color=BRAND_300, font=F_SANS, bold=True)
bars = [("Toast FY2024 — gross take", "2.55%", 1.00, TEXT_FAINT),
        ("Toast FY2024 — net take (21.7% margin)", "55 bps", 0.216, BRASS_400),
        ("ServiceTitan — payments take on GTV", "25 bps", 0.098, BRASS_400),
        ("Stripe Billing — published rate", "0.70%", 0.275, TEXT_LO)]
by = 5.50
for lab, val, frac, col in bars:
    text(s, M + 0.30, by, 3.5, 0.24, lab, size=8.5, color=TEXT_MID, font=F_SANS)
    rect(s, M + 3.90, by + 0.035, 5.20 * frac, 0.135, fill=col)
    text(s, M + 9.28, by - 0.01, 1.0, 0.24, val, size=9.5,
         color=BRASS_300 if col == BRASS_400 else TEXT_LO, font=F_MONO, bold=True)
    by += 0.235
text(s, M + 10.45, 5.54, 1.95, 0.7, "Model on net.\nPresent on gross profit.", size=9.5,
     color=TEXT_HI, font=F_DISPLAY, spacing=1.3)
source_note(s, "Toast FY2024 SEC filings ($4,053M fintech revenue, 21.7% gross margin, $159.1bn gross payment "
               "volume) · ServiceTitan S-1 · Stripe published pricing. Retention underwritten conservatively: "
               "median SaaS net revenue retention ~101% (Benchmarkit 2025); SaaS Capital reports 102% median "
               "for the $25–50k ACV band. Base case 100–105%, bull 115%, gross retention tracked as the floor.")
N(s, "Two things I want to be explicit about. First, we do not take a percentage of what a partner is owed. "
     "Second, when we do earn a flow fee in Phase 2, the honest number is basis points. Toast's headline take "
     "is two and a half percent; its net take is fifty-five basis points, because most of the gross is "
     "pass-through. Any founder who shows you two percent of a big number has not read the filings.")


# ═══════════════════════════════════════════════════════════ 17 · EVIDENCE
s = S()
assertion(s, "We have no revenue. We have [N] dated, countable, falsifiable pieces of\n"
             "evidence that this is real — here they are.",
          kicker="Evidence  ·  in place of traction", size=27)
rows = [("Design partners", "[N] named, or described precisely enough to check — sector, size, ZATCA wave, "
         "and the role of the person who signed", "[date]"),
        ("Signed LOIs / paid pilots", "[N] — priced, not free. Structured, priced proofs-of-concept close "
         "materially better, and in KSA a free pilot reads as an incomplete product", "[date]"),
        ("Discovery interviews", "[N] conversations — and the hit rate at which partner reconciliation "
         "appeared unprompted in the interviewee's top three problems", "[date]"),
        ("Regulatory validation", "who reviewed the tax-field model and the characterisation logic, "
         "and when", "[date]"),
        ("Live product", "a demo link, not a mockup — claim → attribution → eligibility → evidence pack",
         "[date]")]
cy = 2.92
for k, v, dt in rows:
    rect(s, M, cy + 0.12, 0.075, 0.075, fill=BRAND_500)
    text(s, M + 0.28, cy, 2.75, 0.3, k, size=12, color=TEXT_HI, font=F_SANS, bold=True)
    text(s, M + 3.15, cy - 0.02, 7.15, 0.56, v, size=10, color=TEXT_MID, font=F_SANS, spacing=1.38)
    text(s, M + 10.55, cy, 1.05, 0.3, dt, size=9.5, color=TEXT_LO, font=F_MONO, align=PP_ALIGN.RIGHT)
    line(s, M, cy + 0.62, 11.6, color=EDGE_SOFT)
    cy += 0.76
rect(s, M, 6.00, 11.6, 0.50, fill=RGBColor(0x1A, 0x0F, 0x0E), line=STOP, radius=0.05)
text(s, M + 0.28, 6.12, 11.1, 0.3,
     "This slide is where a pre-revenue deck earns belief or loses it. If it cannot be filled with dated, "
     "checkable items, do not raise yet.",
     size=10, color=RGBColor(0xF0, 0xA0, 0x96), font=F_SANS, bold=True)
source_note(s, "Sequoia's own guidance for the Financials section of a pre-revenue company is “If you have any, "
               "please include.” That is written permission to spend this page on evidence instead of a "
               "fabricated five-year model.")
N(s, "We are pre-revenue, so I am not going to show you a hockey stick. I am going to show you the things that "
     "would have to be false for this to be wrong.")


# ═══════════════════════════════════════════════════════════════ 18 · TEAM
s = S()
assertion(s, "Three unsolved parts of this problem. One of us for each.",
          kicker="Team  ·  founder–market fit", size=29)
tri = [("The regulatory judgement", "Characterisation, clearance, withholding, VAT — the part a global "
        "vendor ships as a config flag and gets wrong.", "[Founder] — [specific KSA tax / e-invoicing evidence]"),
       ("The bilateral finance operation", "Getting two finance teams to settle against one ruleset and "
        "accept one evidence pack.", "[Founder] — [bilateral finance / partner-ops evidence]"),
       ("The ledger", "Append-only, idempotent, bitemporal, cross-tenant — financial engineering, not CRUD.",
        "[Founder] — [ledger / payments-infrastructure evidence]")]
for i, (problem, why, who) in enumerate(tri):
    cx = M + i * 4.13
    rect(s, cx, 2.86, 3.75, 3.30, fill=INK_850, line=EDGE, radius=0.04)
    rect(s, cx, 2.86, 3.75, 0.04, fill=BRAND_500)
    text(s, cx + 0.30, 3.12, 3.2, 0.28, "UNSOLVED", size=8.5, color=BRAND_300, font=F_SANS,
         bold=True, caps=True, tracking=2.0)
    text(s, cx + 0.30, 3.44, 3.2, 0.62, problem, size=17, color=TEXT_HI, font=F_DISPLAY, spacing=1.14)
    text(s, cx + 0.30, 4.18, 3.2, 0.96, why, size=10, color=TEXT_MID, font=F_SANS, spacing=1.42)
    line(s, cx + 0.30, 5.24, 3.15, color=EDGE)
    text(s, cx + 0.30, 5.42, 3.2, 0.62, who, size=10, color=BRASS_300, font=F_SANS, spacing=1.4)
source_note(s, "Lead with the problem, not the CV. Two named hires the plan funds first: a staff engineer with "
               "ledger or payments-infrastructure experience, and a KSA tax/compliance specialist "
               "(ZATCA Phase 2 + WHT/VAT).")
N(s, "The pre-seed bar is two questions: can a venture-scale business be built in this market, and is this the "
     "team to build it. Answer the second by mapping each unsolved part of the problem to a person and the "
     "evidence they can solve it.")


# ═══════════════════════════════════════════════════════════════ 19 · THE ASK
s = S()
assertion(s, "We are raising [amount] for [N] months to hit three dated milestones that\n"
             "de-risk the Series A — not to ship three features.",
          kicker="The ask  ·  and the operating plan", size=27)

ms = [("[Date]", "[N] paying Capture customers", "drawn from the Wave 24/25 cohort",
       "De-risks:  will anyone pay for the record alone?"),
      ("[Date]", "One bilateral pilot", "both counterparties approve the same ruleset and settle against it",
       "De-risks:  the entire Phase 2 thesis"),
      ("[Date]", "ZATCA-cleared credit & debit notes in production", "381 and 383, sequenced and cleared",
       "De-risks:  can we operate inside the mandate?")]
by = 2.90
line(s, M + 1.45, by + 0.30, 10.0, color=EDGE)
for i, (dt, t_, sub, risk) in enumerate(ms):
    x = M + 1.45 + i * 3.42
    rect(s, x - 0.055, by + 0.20, 0.145, 0.22, fill=BRAND_500)
    text(s, M, by + 0.16, 1.30, 0.3, dt, size=11, color=BRASS_300, font=F_MONO,
         align=PP_ALIGN.RIGHT) if i == 0 else None
    text(s, x - 0.06, by - 0.34, 3.2, 0.28, dt, size=10, color=BRASS_300, font=F_MONO)
    text(s, x - 0.06, by + 0.62, 3.2, 0.56, t_, size=13.5, color=TEXT_HI, font=F_DISPLAY, spacing=1.16)
    text(s, x - 0.06, by + 1.26, 3.2, 0.5, sub, size=9.5, color=TEXT_LO, font=F_SANS, spacing=1.36)
    text(s, x - 0.06, by + 1.84, 3.2, 0.44, risk, size=9.5, color=BRAND_300, font=F_SANS,
         bold=True, spacing=1.32)

rect(s, M, 5.30, 11.6, 0.98, fill=INK_850, line=EDGE, radius=0.04)
uses = [("[%]", "Engineering — the ledger and the rule engine"),
        ("[%]", "Regulatory & compliance — KSA tax specialist, ZATCA integration"),
        ("[%]", "Design partners & go-to-market"),
        ("[%]", "Operations, legal & buffer")]
for i, (p, lab) in enumerate(uses):
    cx = M + 0.30 + i * 2.86
    text(s, cx, 5.48, 2.6, 0.3, p, size=17, color=BRASS_300, font=F_MONO)
    text(s, cx, 5.82, 2.6, 0.34, lab, size=9, color=TEXT_MID, font=F_SANS, spacing=1.3)
source_note(s, "Milestones name risks removed, not features shipped. All figures and dates on this slide are "
               "founder-supplied — see the assumption register.")
N(s, "A missing operating plan is the single most common pre-seed failure. Name the risk each milestone "
     "removes, then the date, then the number.")


# ═════════════════════════════════════════════════════════════ 20 · VISION
s = S(bg=NAVY)
eyebrow(s, M, 1.42, "Vision")
text(s, M, 1.86, 11.4, 2.0,
     "In five years, two companies in different countries\nsettle a partner payout against one record that both\ntheir auditors and both their tax authorities accept.",
     size=30, color=TEXT_HI, font=F_DISPLAY, spacing=1.16, tracking=-0.4)

vy = 4.20
rect(s, M, vy, 2.30, 0.86, fill=INK_820, line=EDGE, radius=0.05)
text(s, M + 0.24, vy + 0.20, 1.9, 0.3, "Company A", size=12, color=TEXT_HI, font=F_DISPLAY)
text(s, M + 0.24, vy + 0.50, 1.9, 0.26, "Riyadh", size=9, color=TEXT_LO, font=F_MONO)
rect(s, M + 9.30, vy, 2.30, 0.86, fill=INK_820, line=EDGE, radius=0.05)
text(s, M + 9.54, vy + 0.20, 1.9, 0.3, "Company B", size=12, color=TEXT_HI, font=F_DISPLAY)
text(s, M + 9.54, vy + 0.50, 1.9, 0.26, "Frankfurt", size=9, color=TEXT_LO, font=F_MONO)
rect(s, M + 2.75, vy - 0.30, 1.55, 0.52, fill=RGBColor(0x0E, 0x1A, 0x14), line=OK, radius=0.07)
text(s, M + 2.75, vy - 0.19, 1.55, 0.3, "ZATCA", size=9.5, color=OK, font=F_SANS, bold=True,
     align=PP_ALIGN.CENTER)
rect(s, M + 7.30, vy - 0.30, 1.55, 0.52, fill=RGBColor(0x0E, 0x1A, 0x14), line=OK, radius=0.07)
text(s, M + 7.30, vy - 0.19, 1.55, 0.3, "ViDA", size=9.5, color=OK, font=F_SANS, bold=True,
     align=PP_ALIGN.CENTER)
rect(s, M + 4.55, vy - 0.16, 2.50, 1.20, fill=INK_850, line=BRAND_500, lw=1.4, radius=0.05)
text(s, M + 4.55, vy + 0.06, 2.50, 0.3, "ONE RECORD", size=9.5, color=BRAND_300, font=F_SANS,
     bold=True, caps=True, tracking=2.0, align=PP_ALIGN.CENTER)
text(s, M + 4.55, vy + 0.42, 2.50, 0.5, "Partner\nRevenue OS", size=14, color=TEXT_HI, font=F_DISPLAY,
     align=PP_ALIGN.CENTER, spacing=1.16)
line(s, M + 2.30, vy + 0.43, 2.25, color=EDGE_STRONG)
line(s, M + 7.05, vy + 0.43, 2.25, color=EDGE_STRONG)

line(s, M, 5.60, 11.6, color=EDGE)
text(s, M, 5.78, 7.4, 0.62,
     "ViDA requires structured e-invoicing plus near-real-time digital reporting for intra-EU B2B from "
     "1 July 2030, and full domestic convergence by 1 January 2035. Saudi Arabia arrives roughly three "
     "years early. We intend to be the layer above it before the EU gets there.",
     size=10, color=TEXT_MID, font=F_SANS, spacing=1.42)
text(s, M + 8.20, 5.60, 3.4, 0.7, "“Two companies,\none number,\nno argument.”",
     size=16, color=BRAND_300, font=F_DISPLAY, align=PP_ALIGN.RIGHT, spacing=1.22)
N(s, "This is the only slide where you name the category. Nineteen slides borrow language the buyer already "
     "uses — ZATCA Phase 2, partner-led revenue. Coining a category early confuses buyers more often than it "
     "creates one. Five years out, a Saudi company and a German company settle a partner payout against a "
     "single record both auditors sign and both tax authorities accept. Somebody is going to build that "
     "record. The only real question is whose ledger both sides sign.")


# ══════════════════════════════════════════════════════════════ APPENDIX ════
s = section_slide(d, "A", "Appendix", "The hard questions,\nthe mechanics, and what\nwe could not verify.",
                  "Volunteering the objection is worth more than defending it.")
N(s, "Do not present the appendix. Let it be found.")

# --- A1/A2: hard questions
qa = [
    ("If this is so obvious, why hasn't PartnerStack, Impartner or Tipalti built it?",
     "Because the category was defined not to. G2's PRM inclusion criteria require six capabilities — none of "
     "them settlement, payout, invoicing, tax or reconciliation — and G2 states in its own words that "
     "compliance and contractual tracking are “typically considered as secondary capabilities.” Where payout "
     "does appear it is Rebate Management: one party disbursing in one direction, outside the partnerships "
     "tree. The gap is structural, not an oversight."),
    ("AppDirect just bought PartnerStack and Tackle. Why won't they localise for Saudi in a quarter?",
     "The concession first: a well-capitalised acquirer could buy a Saudi e-invoicing service provider "
     "tomorrow. We are not claiming they can't build it. Our defence is that the bilateral primitive is in "
     "our data model from day one and they would be retrofitting it — and that AppDirect settles as the "
     "marketplace, taking a cut of the transaction it would be adjudicating. Also, the localisation is not "
     "one build: the UAE runs Peppol five-corner, Saudi runs clearance."),
    ("It only works if both sides adopt. How do you cold-start a two-sided record?",
     "Phase 1 delivers complete value to a single company with zero counterparty consent — a design "
     "constraint, not a hope, and it has a precedent in Crossbeam's account mapping (25,000+ companies, "
     "30,000+ today). The counter-argument we take seriously: almost no great network was built by bolting a "
     "network onto a tool. So the cross-tenant bilateral primitive ships in the Phase 1 data model, not "
     "retrofitted in Phase 2. Hold us to that."),
    ("Saudi GDP just contracted. Isn't your beachhead shrinking — and why Riyadh rather than San Francisco?",
     "Volunteered before you ask: the headline is an oil story, and I will not present a full-year 2025 "
     "number as a run rate. What did not reverse are the stock measures — non-oil ~55% of GDP, private sector "
     "51% against a 47% baseline and a 65% target — and firm formation: 1.91m active commercial "
     "registrations, +12% YoY. Most importantly, the mandate does not move with the oil price. Wave 24's "
     "deadline was not contingent on GDP. And the capital is here: Saudi startups raised $1.72bn across 257 "
     "deals in 2025, 45% of MENA's $3.8bn."),
]
s = S()
assertion(s, "The four questions we expect first.", kicker="Appendix A  ·  the hard questions", size=29)
cy = 2.44
for q, a in qa:
    text(s, M, cy, 11.5, 0.32, "Q.  " + q, size=12.5, color=TEXT_HI, font=F_DISPLAY)
    text(s, M + 0.42, cy + 0.34, 11.05, 0.66, a, size=9, color=TEXT_MID, font=F_SANS, spacing=1.38)
    line(s, M, cy + 0.94, 11.6, color=EDGE_SOFT)
    cy += 1.02
N(s, "Put these in the back and offer them. Volunteering the objection is worth more than defending it.")

qa2 = [
    ("Basis points on settled flow sounds like a fantasy revenue line. Justify it.",
     "We don't put it in the base case, and when we model it we model it from filings. Toast's gross fintech "
     "take is 2.55% of $159.1bn of volume; its net is 55 bps at a 21.7% gross margin. ServiceTitan's payments "
     "take is ~0.25% of GTV and subscription is still ~70% of revenue. The durable number is tens of basis "
     "points, earned at volume — which is precisely why Phase 3 is Phase 3. There is also a strategic reason "
     "to price low: a high percentage take invites the counterparties to settle around you."),
    ("Your TAM is going to be made up. Convince me it isn't.",
     "It is constructed, and we say so on the slide. No research house publishes a total for B2B partner "
     "commissions, revenue shares, rebates and referral fees as a category — two independent research passes "
     "searched and found nothing. That absence is itself the finding: the money is unmeasured because it is "
     "unowned. So we build it bottom-up and label every input sourced or assumed on the same page. The "
     "weakest rung is partner-programme penetration, which exists in no public source and which I ground in "
     "my own discovery base rate."),
    ("You're pre-revenue with no urgent demand signal. Why isn't that fatal?",
     "Because this is a Hard Fact market in Sequoia's own product-market-fit taxonomy: customers “have "
     "resigned themselves to just living with the problem,” the obstacle is force of habit, and the path "
     "requires first educating the market and then capturing it. Two companies reconciling by email do not "
     "experience it as a problem; they experience it as the weather. That is a diagnosis, not an excuse — it "
     "means we budget for market education, and the urgency we rely on is a filing deadline with a 1%-a-month "
     "penalty, not our marketing."),
    ("If ZATCA already clears the invoice, aren't you a thin layer over a government API?",
     "The cleared invoice is the settlement event, not the agreement. ZATCA holds that an invoice was issued, "
     "to whom, at what rate, at what time. It does not hold who sourced the deal, under what protection "
     "window, whether the claim was eligible under which version of which ruleset, or whether the counterparty "
     "is related — which moves the rate from 5% to 15%. Those facts determine the amount, they are agreed "
     "between two companies, and today they exist nowhere but in email. That is also why a tax vendor can't "
     "do this: tax vendors don't hold attribution, and partner vendors don't hold tax."),
]
s = S()
assertion(s, "And the four that decide it.", kicker="Appendix A  ·  the hard questions", size=29)
cy = 2.44
for q, a in qa2:
    text(s, M, cy, 11.5, 0.32, "Q.  " + q, size=12.5, color=TEXT_HI, font=F_DISPLAY)
    text(s, M + 0.42, cy + 0.34, 11.05, 0.66, a, size=9, color=TEXT_MID, font=F_SANS, spacing=1.38)
    line(s, M, cy + 0.94, 11.6, color=EDGE_SOFT)
    cy += 1.02

# --- A3: assumption register
s = S()
assertion(s, "What is sourced, what is assumed, and what must be confirmed\n"
             "before this deck circulates.",
          kicker="Appendix B  ·  assumption register", size=27)
cats = [
    ("Founder-supplied", "absent from all research", STOP,
     ["Fast facts — founding date, headcount, stage, raise, use of funds",
      "All evidence on slide 17: design partners, LOIs, interview counts, pilot data",
      "Team bios and founder–market fit",
      "Ask, runway, hiring plan and all three milestone dates",
      "Reven's own pricing bands, ACV and unit economics",
      "The partner-programme penetration rate in the market arithmetic",
      "Who tried this a decade ago, and what stopped them"]),
    ("Confirm at the primary source", "one pass only, or a conflict", WARN,
     ["ZATCA Wave 25 (SAR 187,500 / 1 Feb 2027) — screenshot the announcement. "
      "Wave 24 carries the argument alone if it does not hold",
      "The whole Saudi regulatory block: wave thresholds, WHT rates, VAT treatment, "
      "document type codes",
      "Shopify's FY2024 revenue mix, at the filing",
      "Poland's KSeF dates — postponed repeatedly",
      "The market-absence claim — the searches for Europe, India, LATAM and China "
      "were never run"]),
    ("Cut, and must not come back", "failed adversarial verification", HOLD,
     ["Play Bigger's “76% to the category king”; DocSend's deck-attention seconds",
      "Every figure in the payout-economy sizing pass — none survived",
      "The 94% spreadsheet-error rate; contract-leakage percentages; quota attainment 57%",
      "SDAIA's “48 enforcement decisions”; the ZATCA amnesty cliff; DAC7 as mandating "
      "a partner registry",
      "“Half of every venture dollar in MENA” — it is 45%",
      "“~600 RHQs against a target of 500” — 780+ against a target of 480",
      "“93% of Vision 2030 indicators on target” — 309 of 390, which is 79%"]),
]
for i, (title_, sub_, tone, items_) in enumerate(cats):
    cx = M + i * 3.95
    rect(s, cx, 2.72, 3.70, 3.52, fill=INK_850, line=EDGE, radius=0.04)
    rect(s, cx, 2.72, 3.70, 0.045, fill=tone)
    text(s, cx + 0.28, 2.92, 3.2, 0.3, title_, size=12.5, color=TEXT_HI, font=F_SANS, bold=True)
    text(s, cx + 0.28, 3.20, 3.2, 0.26, sub_, size=8.5, color=tone, font=F_SANS,
         bold=True, caps=True, tracking=1.2)
    iy = 3.58
    for it in items_:
        rect(s, cx + 0.28, iy + 0.085, 0.055, 0.055, fill=tone)
        text(s, cx + 0.48, iy - 0.02, 3.0, 0.42, it, size=8.5, color=TEXT_MID,
             font=F_SANS, spacing=1.34)
        iy += 0.155 * max(1, -(-len(it) // 47)) + 0.085
source_note(s, "Evidence base: nine parallel research angles, each adversarially fact-checked by an "
               "independent pass instructed to default to refuted where a claim could not be confirmed. "
               "Figures that failed verification were deleted, not softened.")
N(s, "This page is not decoration. It is the reason the rest of the deck can be trusted: every number "
     "that was cut was cut because somebody would Google it.")

# --- A4: how this deck is built
s = S()
assertion(s, "How this deck is built — so the next version stays honest.",
          kicker="Appendix C  ·  method", size=29)
meth = [
    ("The skeleton", "Sequoia's live “Writing a Business Plan” — ten sections, in order: Company purpose · "
     "Problem · Solution · Why now? · Market potential · Competition/alternatives · Business model · Team · "
     "Financials · Vision. There is no Product section and no Traction section, and there is a Vision closer."),
    ("The opener", "Sequoia's “How to Present to Investors”: three slides in the first five minutes — "
     "What's changed? · What you do · Fast facts — then an agenda, then ask the room what to address. "
     "The shift comes before the problem."),
    ("The spine", "Andy Raskin's five beats, in order: name a big relevant change · show winners and losers · "
     "tease the promised land · introduce capabilities as the gifts that overcome obstacles · present "
     "evidence you can make the story come true. Opening on change rather than problem keeps the room "
     "out of a defensive crouch."),
    ("The diagnosis", "Sequoia's Arc PMF taxonomy: this is a Hard Fact market — customers have “resigned "
     "themselves to just living with the problem” and the obstacle is force of habit. Naming the archetype "
     "converts a weak demand signal from a weakness into a stated strategy."),
    ("Every headline is an assertion", "A full sentence that states the point, never a topic label. Paste the "
     "twenty headlines into a blank page: if that page is not a persuasive argument on its own to someone "
     "who has never heard of ZATCA, the deck is not finished — because it will be forwarded to exactly "
     "that person."),
    ("Two artefacts, one narrative", "A read-alone deck that survives being emailed, and a twelve-slide "
     "twenty-minute live cut: keep 1, 2, 3, 4, 6, 7, 9, 11, 12, 15, 17, 19 — fold 5 into 4 and 8 into 7, "
     "demo 10, offer 13/14/16, say 18 and 20 rather than sliding them."),
]
cy = 2.72
for i, (k, v) in enumerate(meth):
    cx = M + (i % 2) * 6.05
    yy = cy + (i // 2) * 1.28
    text(s, cx, yy, 5.5, 0.3, k, size=11.5, color=BRAND_300, font=F_SANS, bold=True)
    text(s, cx, yy + 0.32, 5.55, 0.9, v, size=9, color=TEXT_MID, font=F_SANS, spacing=1.40)
source_note(s, "Sequoia Capital, “Writing a Business Plan” (15 Mar 2019, modified 13 Mar 2025) and “How to "
               "Present to Investors” · Sequoia Arc, PMF Framework · Andy Raskin, “The Greatest Sales Deck I've "
               "Ever Seen” (2016) · April Dunford, positioning from competitive alternatives · Barbara Minto, "
               "The Pyramid Principle. Sequoia publishes no template file of its own.")
N(s, "Keep this page in the file. It is the instruction set for whoever edits the deck next.")


out = "/home/user/Revenue-Sharing-MVP/Reven_Investor_Deck_2026.pptx"
d.save(out)
SECTIONS = [
    "Company purpose", "Fast facts", "Why now · the shift", "Why now · the stakes",
    "Problem", "Problem · alternatives", "Solution", "Solution · the insight",
    "Product", "Product", "Roadmap", "Why now · regulation", "Why now · economics",
    "Market potential", "Competition", "Business model", "Evidence", "Team",
    "The ask", "Vision", "Appendix", "Appendix A · hard questions",
    "Appendix A · hard questions", "Appendix B · register", "Appendix C · method",
]
html_write("/tmp/claude-0/-home-user-Revenue-Sharing-MVP/0719142d-c9e5-5d0e-b654-ff6a224741dc/"
           "scratchpad/deck.html", sections=SECTIONS)
print("saved", out, "|", len(d.prs.slides._sldIdLst), "slides")
