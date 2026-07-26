# Reven Plain-Language Copy Guide (B2B UX Writing Standard)

**Problem.** The product's current content and UI use expert/strategy terminology ("revenue events,"
"allocations," "network liquidity," "attribution," "coopetition governance"). End users — partner
managers, sales ops, and finance staff — should never need a glossary to get paid or pay a partner.

**Goal.** Every label, heading, button, and message in Reven answers, in plain words, one of the
user's real questions: *Who are my partners? What deals are moving? Who gets credit? Who gets paid
what, and why? What's wrong, and how do I fix it?*

---

## 1. B2B copywriting principles applied (the acquired technique set)

1. **Lead with the user's outcome, not the system's mechanism.** "See who gets paid and why," not
   "Multi-party allocation engine." Mechanism goes in tooltips, not titles.
2. **Verb-first buttons.** Every button starts with an action verb and names its object plainly:
   "Record a sale," "Calculate payouts," "Claim credit." Never noun-labels like "Allocation Run."
3. **One name per concept, everywhere.** If it's "payout" on the dashboard, it is never "settlement,"
   "disbursement," or "allocation" anywhere else. Consistency beats precision.
4. **Grade 7–8 reading level.** Short sentences. No Latin, no finance-speak, no strategy vocabulary
   from internal docs leaking into the UI.
5. **Second person, active voice.** "You haven't added any partners yet" — not "No partner entities
   configured."
6. **Explain money in sentences, not schemas.** Every split shows a plain-English explanation:
   "Acme gets 2,500 SAR (25%) because they brought this customer."
7. **Every screen opens with a one-line purpose statement.** A user landing anywhere should know in
   5 seconds what the page is for and what to do first.
8. **Empty states teach.** What is this page + why it matters + the first button to press.
9. **Errors say what happened, why, and the fix** — in that order, without codes or blame.
10. **Numbers carry their meaning.** Show currency, period, and direction ("+12% vs last month"),
    never bare figures.
11. **Progressive disclosure.** Simple words on the surface; the precise technical term available in
    a tooltip or "Learn more" for power users and auditors.
12. **Confirmation copy states the consequence.** "This will send 4,200 SAR to TechServe and can't
    be undone" — not "Are you sure?"

---

## 2. Terminology map (jargon → plain language)

### Navigation
| Current (expert) | Plain replacement |
|---|---|
| Dashboard | Home |
| Network | Find Partners |
| Organizations | My Company |
| Customers & Accounts | Customers |
| Pipeline | Deals |
| Agreements | Agreements *(keep — already plain; sub-copy: "the deal terms you've signed with partners")* |
| Revenue Events | Sales & Revenue |
| Claims & Attribution | Credit Claims |
| Allocations & Settlements | Payouts |
| Disputes & Governance | Disputes & Rules |
| Trust & Reputation | Trust Score |
| Intelligence | Insights |
| KPIs | Goals |
| Legal Documents | Documents |
| Integrations Hub | Connected Apps |
| Admin | Settings |

### Core concepts
| Current | Plain replacement |
|---|---|
| Revenue event | A sale (or renewal / upsell / usage charge — named by what it is) |
| Allocation / allocation run | Payout calculation → "how the money is split" |
| Settlement | Payment / "mark as paid" |
| Payment statement | Payout statement ("like a payslip for partners") |
| Revenue claim | Credit claim ("say you helped on this deal") |
| Attribution | Credit ("who gets credit for this sale") |
| Protection window | Deal protection ("this lead is yours until <date>") |
| Reversal / clawback | Refund adjustment / money returned |
| Holdback / reserve | Safety hold ("part of the payout held back temporarily") |
| Waterfall allocation | Payout order ("who gets paid first") |
| Agreement compiler | Payout rules builder ("turn your agreement into automatic payout rules") |
| Simulation | Payout preview ("test with example numbers before going live") |
| Network liquidity metrics | Network activity |
| Revenue leakage | Missed payouts / unclaimed money |
| Opportunity routing | Sending a deal to a partner |
| Capability matching | Partner matching |
| Coopetition / channel conflict | Overlap rules ("what happens when two partners work the same customer") |
| Adjudication / verdict | Decision |
| Contribution-based allocation | Split by effort ("paid based on what each partner actually did") |
| Trust tiers (Bronze–Platinum) | Keep names; explain: "Higher trust = faster approvals, less money held back" |
| Evidence hierarchy | Proof strength ("system records count more than screenshots") |
| Ecosystem pathway P&L | Route profitability ("which path from lead to sale makes the most money") |

### Buttons (examples of the standard)
| Current | Plain replacement |
|---|---|
| Create revenue event | Record a sale |
| Run allocation | Calculate payouts |
| Approve allocation | Approve payouts |
| Generate statement | Create payout statement |
| Record settlement | Mark as paid |
| Submit claim | Claim credit |
| Grant protection | Protect this lead |
| Route to partner | Send to partner |
| Compile agreement | Create payout rules |
| Simulate | Preview payouts |
| Raise dispute | Flag a problem |
| Assign reviewer | Choose a neutral reviewer |
| Record verdict | Record the decision |
| Form account team | Build the deal team |
| Release reserve | Release held funds |

---

## 3. Gaps identified (beyond word swaps)

1. **No screen explains itself** — every page needs a one-line purpose subtitle.
2. **Scores without meaning** — trust score, confidence score, and data-quality score need "what
   this means for you" text (e.g., "87 — your claims are approved automatically up to 10,000 SAR").
3. **Splits without stories** — every payout line needs its plain-English "because…" explanation.
4. **No onboarding path** — first-run experience should walk a new company through: add your company
   → invite a partner → set up an agreement → record a sale → see the payout.
5. **Empty states are dead ends** — each needs purpose + first action.
6. **Errors and confirmations are generic** — rewrite to consequence-first plain language.
7. **No glossary** — one Help page mapping plain terms to the formal/contractual terms, for
   auditors and lawyers who need the precise vocabulary.
8. **Dates, currency, and status chips** need human formats: "Due in 5 days," "Paid on time,"
   "Held: 500 SAR until Mar 3."

---

## 4. Definition of done

A new user who has never heard the words "attribution," "allocation," or "settlement" can, without
help: invite a partner, create an agreement, record a sale, understand exactly who gets paid what
and why, and get a partner paid — reading nothing but the UI.
