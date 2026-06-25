# Reven — ODI Expectation Delta Analysis (Comprehensive Edition)

**A full-depth Outcome-Driven Innovation study of the Partner Revenue OS: the mathematical variance between the strategic importance of each business outcome and the satisfaction today's tools deliver — computed for the end-user persona and every stakeholder in adoption and pre-selling, then converted into a monetization and go-to-market strategy.**

---

## Abstract

This document applies Tony Ulwick's Outcome-Driven Innovation (ODI) — the quantitative operationalization of Jobs-to-be-Done — to **Reven (Partner Revenue OS)**. It decomposes the customer's core functional job into a granular job map, enumerates **117 desired outcomes** spanning the full ODI needs framework (functional, emotional, social, consumption-chain, and financial), and scores each on **Importance** and **Satisfaction-with-current-tools** to produce an **Opportunity (Expectation Delta) score** per outcome, per persona, and per market segment.

The central result: the Expectation Delta is **not diffuse — it is concentrated**. Of 117 outcomes, **14 score in the "extreme opportunity" band (>15)** and **a further 31 score "strongly underserved" (12–15)**. The extreme cluster is owned by just three personas — the **CFO**, the **Head of Partnerships**, and the **external Partner** — and every extreme outcome describes one layer: the **shared, finance-grade, bilateral revenue ledger that no software category owns.** A competitive sweep of 20+ tools (PRM, partner-automation, co-sell, payout rails, ICM/SPM, rev-rec) confirms the layer is architecturally vacant. The deltas map cleanly onto Reven's Capture→Settle→Orchestrate phasing, validate the CFO as the deep expansion buyer, and — sharpened by the state-mandated ZATCA compliance wedge whose Wave-24 deadline (30 June 2026) is imminent — justify a premium, value-based monetization at **10–20% of measured value (5–10× customer ROI, sub-30 bps effective take).**

---

## What this edition adds over the prior version

| Dimension | Prior | This edition |
|---|---|---|
| Scored outcomes | 30 | **117** (functional + emotional + social + consumption-chain + financial) |
| Stakeholders | 12 (functional only) | 12, each with **emotional & social** outcome layers |
| Segments | 1 (blended) | **5 segment-specific delta landscapes** (ODI "hidden segments" step) |
| Satisfaction basis | narrative | **per-outcome competitive attribution matrix** |
| Monetization | 1 section | **9 sub-sections** (value-pool decomposition per outcome, pricing architecture, expansion engine, WTP validation) |
| Pre-selling | 1 section | **full playbook** (four-trusts, diagnostic-workshop mapping, 10 battlecards, choreography, objection library, pilot design) |
| Frameworks | ODI only | ODI **+ Kano + Christensen progress + 7 Powers moat sequencing** |
| Appendices | 2 | **4** (master table, per-segment deltas, ready-to-field survey instrument, sources) |

---

## How to read this document

- **Parts I–III** establish the lens, the job, and the people. Skim if familiar; the new material is the **full needs framework (I.3)**, the **Kano overlay (I.6)**, the **scoring rubric (I.8)**, and the **per-step outcome inventory (II.5)**.
- **Part IV is the core** — the scored Expectation Delta tables, now with emotional/social layers per persona.
- **Part V** justifies every Satisfaction score with a per-outcome competitive matrix.
- **Part VI** ranks and clusters all 117 outcomes.
- **Part VII** is new: how the deltas shift across five buyer segments, and which to attack first.
- **Part VIII** is the monetization engine; **Part IX** the pre-selling playbook; **Part X** the strategic synthesis and validation plan.
- **Appendix C is immediately operational** — a survey instrument you can field with design partners to convert these modeled scores into measured ones.

---
---

# PART I — THE OPERATING LENS

## I.1 The premise: progress, not features

ODI rests on the Jobs-to-be-Done premise that **people hire products to get a job done and judge success by a stable set of measurable outcomes — not by features.** Clayton Christensen and Bob Moesta sharpen it: customers "hire" a solution to **make progress** in a circumstance and "fire" it — switching to *anything* that makes better progress, including a spreadsheet or doing nothing — when it stops delivering.

This reframes the entire commercial problem. A feature has no inherent value; an **unmet outcome** does. The magnitude of an unmet outcome is the magnitude of the willingness-to-pay to resolve it. The "Forces of Progress" (the push of the current situation + the pull of the new solution, against the habit of today + the anxiety of switching) determine whether a buyer switches — and the size of the unmet outcome is what overcomes habit and anxiety. ODI's contribution is to make all of this **quantitative and rankable** instead of anecdotal.

For Reven, the implication is foundational and recurs throughout: **the competitor is not another PRM. It is the master payout spreadsheet, the manual WHT process, and the two finance teams reconciling to two disagreeing records.** That incumbent is what customers currently "hire," and the labor and risk they pour into it is the revealed measure of what they will pay to fire it.

## I.2 The Opportunity Algorithm (the math of the Expectation Delta)

Each desired outcome is rated by the people who own it on two dimensions, each normalized to 0–10:

- **Importance (I)** — how important is achieving this outcome? (Survey: % rating "very/extremely important," normalized to 0–10.)
- **Satisfaction (S)** — how satisfied are they with how well *current solutions* achieve it? (% rating "very/extremely satisfied," normalized to 0–10.)

The **Opportunity Score** — the formal name for the Expectation Delta — is:

> **Opportunity = Importance + max( Importance − Satisfaction , 0 )**

Three properties make this the right instrument:

1. **Importance is double-weighted.** It is the base term *and* sits inside the gap term. The algorithm rewards outcomes that are genuinely important, not merely irritating. A dissatisfying-but-trivial outcome scores low — correctly.
2. **The `max(…,0)` floor neutralizes overservice.** When Satisfaction already exceeds Importance, the gap term is zeroed — you cannot manufacture opportunity by improving something customers already deem good enough.
3. **The score is bounded 0–20 and directly interpretable** against published bands (below).

**Worked examples.**
- *Bilateral reconciliation* (CFO): I = 9.0, S = 2.0 → 9.0 + max(7.0, 0) = **16.0** (extreme).
- *Confirm/challenge an attribution* (Sales): I = 6.5, S = 4.5 → 6.5 + max(2.0, 0) = **8.5** (appropriately served).
- *Cross-tenant isolation* (IT): I = 8.0, S = 5.0 → 8.0 + max(3.0, 0) = **11.0** (worth considering — general SaaS partly serves it).

## I.3 The full ODI needs framework (why 117 outcomes, not 30)

A rigorous ODI study does not stop at functional outcomes. Ulwick's needs framework spans **six need types across three stakeholder roles**, and a complete B2B analysis must enumerate all of them. A single core functional job typically yields **50–150 desired outcome statements**; the prior version's 30 covered only the functional core. This edition adds the missing layers:

| Need type | Whose | What it captures | Example (Head of Partnerships) |
|---|---|---|---|
| **Functional desired outcomes** | Job executor | Metrics for getting each job step done | "Minimize the time to determine which revenue a partner drove." |
| **Emotional jobs** | Job executor | How they want to *feel* | "Minimize the anxiety of defending the program at the quarterly review." |
| **Social jobs** | Job executor | How they want to *be perceived* | "Be seen by the CFO as running a finance-grade function, not a relationship hobby." |
| **Related jobs** | Job executor | Adjacent jobs done alongside the core | "Plan next year's partner-tier economics." |
| **Consumption-chain jobs** | Support team | Install, configure, integrate, maintain, upgrade, offboard | "Minimize the effort to integrate without brittle file transfers." |
| **Financial desired outcomes** | Buyer | The financial metrics used to justify purchase | "Minimize the payback period on the partner-ops tooling spend." |

**Why this matters commercially:** emotional and social outcomes are where *pre-selling* is won. A CFO does not sign because of a feature; they sign because the tool removes the fear of an audit finding and lets them say "we trust these numbers" on a board call. The functional layer gets you shortlisted; the emotional/social layer closes. This edition therefore scores all three for the decisive personas.

## I.4 Desired-outcome grammar

Every outcome below is written in canonical ODI grammar so it is measurable, solution-free, and stable over time:

> **[Direction: minimize / maximize] + [metric: time / likelihood / number] + [object of control] + [contextual clarifier]**

Two constructions dominate partner-revenue pain:
- **"Minimize the time it takes to…"** — speed/efficiency outcomes (most of the labor cost).
- **"Minimize the likelihood that…"** — risk/reliability outcomes (most of the financial and audit exposure).

Emotional/social outcomes relax the grammar slightly ("Minimize the anxiety that…", "Maximize confidence that…", "Be seen as…") but retain a measurable object.

## I.5 The multi-stakeholder model

ODI does not score "the customer" as a monolith. It separates need-bearing roles, and Reven's bilateral market adds a fourth:

1. **Job Executor** — performs the core functional job (Head of Partnerships, Partner/Finance/RevOps operators). Owns the functional + emotional + social outcomes.
2. **Buyer / Decision-maker** — evaluates through a financial lens (CFO, CEO, and the Head of Partnerships in their budget-owner capacity). Owns financial desired outcomes.
3. **Product Lifecycle Support Team** — installs, secures, integrates, governs, maintains (IT/Security, Legal, RevOps-as-admin, Procurement). Owns consumption-chain jobs.
4. **The External Partner (counterparty)** — runs its *own* core job ("get fairly credited and paid, on time, with visibility"). Not the payer, but its satisfaction is the network flywheel.

The same product step (a payout) is therefore a *risk-avoidance* outcome for the CFO, a *trust* outcome for the Partner, a *credibility* outcome for the Head of Partnerships, and a *don't-corrupt-my-data* outcome for RevOps. **This is exactly why the delta must be computed per persona.**

## I.6 The Kano overlay (basic / performance / excitement)

ODI's served-states map onto Kano's satisfaction model, and the two together sharpen the build/price decision:

| ODI condition | Kano category | Customer behavior | Reven posture |
|---|---|---|---|
| Appropriately served (high I, high S) | **Basic / must-have** | Absence causes dissatisfaction; presence is expected | **Subsume silently** — table-stakes, never the pitch |
| Underserved (high I, low S) | **Performance** | More is linearly better; willingness-to-pay scales | **Differentiate and price here** |
| Extreme delta + currently invisible | **Excitement / delighter** | Customer didn't know to ask; presence creates outsized delight | **Lead the demo** ("money on your own accounts you weren't measuring") |
| Overserved (S > I) | **Reverse / indifferent** | More is wasted or annoying | **Strip out; compete on simplicity/price** |

The "unclaimed-influence" demo (showing a buyer partner-sourced revenue silently booked as "Direct") is the canonical **excitement** outcome — high latent importance, zero current satisfaction, and a delight response because the buyer didn't know the gap existed. Excitement outcomes are disproportionately valuable in pre-selling because they reframe the buyer's perception of the problem.

## I.7 Evidentiary basis & confidence (the honesty note)

A formal ODI study surveys 100+ real job executors. **This is a *modeled* ODI** — Importance and Satisfaction are evidence-anchored estimates, not yet primary survey data. They triangulate three independent sources, and Part V documents the Satisfaction side per outcome:

- **Importance** ← each persona's stated KPIs/goals (Reven's GTM, onboarding, and CFO manuals) **corroborated** by third-party analyst data on what these roles actually measure: partner-sourced revenue is the #1 tracked KPI at **67%** of partner teams (Crossbeam, *State of the Partner Ecosystem*); **75%** of high-growth firms will run RevOps by 2025 (Gartner); **66%** of companies over-/under-paid commissions last year (CaptivateIQ 2025); partners drive **>70%** of the $4.7T IT market (Canalys); for every $1 of vendor revenue, partners earn **$8.45–10.93** (IDC/Microsoft).
- **Satisfaction** ← direct competitor review evidence (G2/Capterra/Trustpilot ratings + complaint themes for 20+ tools), the documented **white space** (no bilateral revenue-share system of record exists), and the documented **status-quo workaround** (master spreadsheet + manual WHT + two disagreeing finance teams).
- **Calibration discipline** ← Reven's own corpus forbids fabricated stats (it stripped "EY 1–5% EBITDA leakage," "~24% median partner revenue," "42% of CFOs" as untraceable). This analysis honors that: external problem-size figures are flagged by strength, and the ROI case rests on the **customer's own measured pilot numbers**, never borrowed leakage stats.

> **Data-access note (this edition):** I attempted to harden Satisfaction with live G2 catalog data, but the connected G2 account is a restricted *buyer* context whose `list_products`/`show_product` endpoints return no catalog — so the competitor ratings below remain those gathered from G2/Capterra/Trustpilot via web research. Apollo (firmographic/persona counts for the KSA TAM) is available but charges credits per query; it is offered as a defined follow-on in Part X.6, not assumed here.

**Confidence:** **high on rank order** (which outcomes are most underserved), **moderate on absolute scores.** Appendix C provides the instrument to convert modeled → measured.

## I.8 The scoring rubric (so scores are consistent, not vibes)

Every I and S below references these anchors:

**Importance (0–10):**
- **9–10** — mission-critical / job-defining; failure means career risk, audit findings, material cash loss, or program cancellation.
- **7–8** — high; materially affects the persona's KPIs and weekly work.
- **5–6** — moderate; matters but is tolerable when unmet.
- **<5** — minor; nice-to-have.

**Satisfaction-with-current-tools (0–10):**
- **8–10** — a category owns this outcome well (mature, widely adopted, few complaints).
- **5–7** — partially served by adjacent tools, with known friction.
- **3–4** — poorly served: fragmented, manual, error-prone; complaints dominate reviews.
- **0–2** — essentially unserved: no tool addresses it; the spreadsheet/email is the only "solution."

A score's defensibility lives in the *Satisfaction* anchor, because that is the contestable half. Part V attributes each low-S score to the specific tools that fail it and the specific review evidence.

---
---

# PART II — THE CORE FUNCTIONAL JOB & THE FULL JOB MAP

## II.1 The job statement and its four structural sub-problems

Stated solution-free:

> **"When partnerships become commercially material, convert scattered partner activity into trusted, governed, finance-ready revenue that both companies agree on and that survives audit — without scaling manual reconciliation, disputes, or compliance risk."**

Beneath this functional symptom sit four economic sub-problems the product must resolve. They explain *why* the outcomes below carry such high importance — each is a textbook source of transaction cost:

1. **Adverse selection (screening).** Neither side observes the other's true quality before committing; the best partners self-select away from opaque programs. → drives the *attribution integrity* and *fairness* outcomes.
2. **Moral hazard (hidden effort).** Partner effort is unobservable and non-contractible; it must be measured, not assumed. → drives the *contribution capture* and *shadow-influence* outcomes.
3. **Hold-up (relationship-specific investment).** Both sides sink non-redeployable investment under incomplete contracts. → this is *why* deal-registration and protection windows exist (engineered quasi-property rights).
4. **Credible commitment (relational contract).** The relationship is self-enforcing, sustained by trust; trust lowers every transaction cost. → drives the *visibility*, *explained-payout*, and *humane-reverse-path* outcomes.

Naming these matters for pre-selling: they let you tell the buyer *why* the pain is structural and recurring, not a one-off process gap they can fix with discipline.

## II.2 The atomic object: the Partner Revenue Claim

The product's design hinge is the choice of atomic object:

> *"If the primary object is Partner, the product becomes a directory. If the primary object is Opportunity, it becomes a CRM add-on. If the primary object is the Revenue Claim, it becomes the control layer for partner-led revenue."*

The **Partner Revenue Claim** — a partner's formal, controlled assertion that it contributed to a commercial outcome — is the object every outcome below attaches to. The North-Star success metric for the whole job is **trusted partner-attributed revenue realized**: revenue (a) credited via a canonical Attribution of Record, (b) made eligible *with an explanation*, and (c) paid or cleanly netted **without dispute reversal**.

## II.3 The eight universal job steps × Reven's ~31 product steps

Mapping Bettencourt & Ulwick's eight universal job steps onto Reven's product workflow shows where the value — and the delta — concentrates. The decisive pattern: most untapped opportunity hides *outside* the Execute step. For partner revenue, pain concentrates in **Confirm, Execute, Monitor, Modify, and Conclude** — attribution, reconciliation, dispute, settlement — not in the "register a partner" Prepare step that generic PRMs obsess over.

| # | Universal step | Customer's underlying goal | Reven product steps | Delta intensity |
|---|---|---|---|---|
| 1 | **Define** | Design program economics, tiers, attribution model, comp-conflict stance | P0–P2 | Low–moderate |
| 2 | **Locate** | Source partners; capture *all* contribution incl. shadow/co-sell influence | P3–P5, P14–P15 | **High** |
| 3 | **Prepare** | Onboard (KYB/tax/bank); turn agreements into executable rules; set protection | P8–P11, P16–P17 | Moderate |
| 4 | **Confirm** | Register claim; preflight (dedupe, protection, coverage); validate revenue event | P15–P16, P18 | **High** |
| 5 | **Execute** | Decide one canonical credit; compute eligibility; assemble evidence; issue statement | P19, P20.1–7 | **Extreme** |
| 6 | **Monitor** | Track status, exposure, dispute rate, partner P&L; **reconcile both sides** | dashboards, cadence J6 | **Extreme** |
| 7 | **Modify** | Resolve disputes; reverse refunds → clawback-by-netting; tier changes | dispute workflow, R1–R12 | **High–Extreme** |
| 8 | **Conclude** | Settle/net idempotently with WHT/VAT/ZATCA applied; reconcile; close; file audit-ready | P20.11–15 | **Extreme** |

**The value gradient climbs steeply from Define → Conclude.** Generic PRM and partner-automation tools are built around steps 1–3 (recruit, onboard, enable). Reven is built around steps 4–8 (confirm, attribute, monitor, reconcile, settle). That is the structural origin of the Expectation Delta — incumbents optimize the cheap end of the job map and leave the expensive end vacant.

## II.4 The four separated concepts (distinct outcome spaces)

A subtle but critical design decision splits what every spreadsheet conflates. These are four distinct outcome spaces, and confusing them is the root of most disputes:

- **Contribution** — an observed partner action toward an outcome (a fact).
- **Attribution** — the single, human-decided, contestable credit-of-record (a decision).
- **Eligibility** — finance's determination of whether/how much may be paid (a rule application).
- **Payment** — the immutable ledger fact (an event).

("Credit Allocation" — the model's *recommended* split — is advisory input to Attribution, never authoritative.) The separation is itself a differentiator: competitors collapse contribution→payment into one number typed into a cell, which is precisely why their numbers can't be defended or reconciled.

## II.5 The per-step desired-outcome inventory (the 117)

Below is the full inventory, organized by job step, with the owning persona(s). Scores and evidence appear in Part IV (by persona) and Appendix A (master table). This section establishes *coverage* — that the analysis spans the entire job, not just the obvious middle.

**Step 1 — Define (program design).**
1. Minimize the time to design partner-tier economics that won't need mid-year rework. *(Head of Partnerships)*
2. Minimize the likelihood that the attribution model will be perceived as unfair by partners or sales. *(Head of Partnerships)*
3. Minimize the time to settle the internal-rep comp stance before channel conflict arises. *(CRO)*
4. Maximize confidence that the program design is defensible to finance. *(Head of Partnerships → CFO)*

**Step 2 — Locate (source & capture contribution).**
5. Minimize the time to determine which partners are actually producing revenue. *(Head of Partnerships)*
6. Maximize the proportion of partner influence captured, including shadow/co-sell touchpoints. *(Head of Partnerships)*
7. Minimize the likelihood that a partner-sourced deal is silently recorded as "Direct." *(Head of Partnerships, CRO)*
8. Minimize the time to deduplicate partners/accounts across CRM, billing, and partner records. *(RevOps)*

**Step 3 — Prepare (onboard & operationalize agreements).**
9. Minimize the time from partner invitation to payout-ready (KYB, tax, bank verified). *(Partner Manager)*
10. Minimize the effort to translate a signed agreement's terms into executable rules. *(RevOps)*
11. Minimize the likelihood that a payout-bearing claim proceeds before bank/tax verification. *(Finance)*
12. Minimize the time to grant and track a scoped protection window. *(Partner Manager)*

**Step 4 — Confirm (register & validate the claim).**
13. Minimize the time to register a partner's contribution before sales forgets, disputes, or bypasses it. *(Partner, Partner Manager)*
14. Minimize the likelihood that a duplicate or protection-conflicting claim is accepted. *(RevOps, Finance)*
15. Minimize the time to validate the revenue event and basis (closed-won → invoiced → collected → recognized). *(Finance)*
16. Minimize the likelihood of accepting a claim on insufficient evidence. *(Finance)*

**Step 5 — Execute (attribute, determine eligibility, evidence, statement).**
17. Minimize the time to determine which revenue a partner actually drove, defensibly (attribution-of-record). *(Head of Partnerships)*
18. Minimize the likelihood that a credit decision can't be explained or contested later. *(Legal, Head of Partnerships)*
19. Minimize the time to determine payout eligibility *with a human-readable explanation of the rule applied*. *(Finance operator)*
20. Minimize the time to assemble an immutable, audit-ready evidence pack per claim. *(CFO, Legal)*
21. Minimize the likelihood that the eligibility figure is client-supplied/unverifiable. *(CFO)*

**Step 6 — Monitor (track, reconcile, govern).**
22. Minimize the time to reconcile partner payouts to one record both companies' finance teams trust. *(CFO)*
23. Minimize the time to produce a partner P&L/ROI leadership will trust at budget time. *(Head of Partnerships, CEO)*
24. Minimize the time to know current payout exposure/liability at any moment. *(CFO)*
25. Minimize the likelihood that the partner-revenue number degrades silently (data-quality drift). *(RevOps)*
26. Minimize the time for a partner to know the status of its deal/claim/payout. *(Partner)*
27. Maximize confidence that capital allocated to partner programs is going to programs that return. *(CEO)*

**Step 7 — Modify (disputes, reversals, changes).**
28. Minimize the time to dispute and resolve a disagreement over the *amount* of a split. *(Partner, Finance)*
29. Minimize the likelihood that a refund/cancellation leaves an already-paid commission unrecovered. *(CFO)*
30. Minimize the time to execute a clawback by netting against future payouts, with advance explanation. *(CFO, Partner)*
31. Minimize the damage to the relationship when a tier is demoted or a claim adjusted. *(Head of Partnerships, Partner)*

**Step 8 — Conclude (settle, comply, close, file).**
32. Minimize the likelihood of overpaying or double-paying a partner. *(CFO)*
33. Minimize the likelihood of WHT/VAT/ZATCA non-compliance on a partner payout. *(CFO)*
34. Minimize the time to close partner revenue at period-end with zero unreconciled claims. *(CFO, Finance)*
35. Minimize the likelihood of an audit finding or restatement on partner revenue. *(CFO, Legal)*
36. Minimize the likelihood that revenue is recognized incorrectly (ASC 606 principal-vs-agent, gross/net). *(CFO)*

**Emotional outcomes (job-executor feelings).**
37. Minimize the anxiety of defending the partner program at the quarterly review. *(Head of Partnerships)*
38. Minimize the fear of signing off on a number that later proves wrong. *(CFO)*
39. Minimize the stress of month-end partner-revenue close. *(Finance operator)*
40. Minimize the frustration of chasing finance/sales for status. *(Partner, Partner Manager)*
41. Maximize the sense of being treated fairly. *(Partner)*
42. Minimize the dread of an audit or tax inspection on partner payouts. *(CFO, Legal)*

**Social outcomes (how the executor is perceived).**
43. Be seen by the CFO/CEO as running a rigorous, finance-grade function. *(Head of Partnerships)*
44. Be seen by the board as having partner numbers "we can trust." *(CFO)*
45. Be seen by partners as a fair, transparent, easy-to-work-with vendor. *(Head of Partnerships, Partner)*
46. Be seen by sales as not threatening their credit. *(Head of Partnerships → Sales)*

**Consumption-chain outcomes (support-team lifecycle jobs).**
47. Minimize the likelihood that the tool corrupts CRM data. *(RevOps)*
48. Minimize the effort to integrate without brittle, SI-mediated file transfers. *(IT)*
49. Minimize the likelihood of a data-residency/PDPL breach on partner-revenue data. *(IT/Security)*
50. Minimize the likelihood of cross-tenant data leakage. *(IT/Security)*
51. Minimize the likelihood that at-least-once/duplicate webhooks double-count revenue. *(RevOps)*
52. Minimize the effort to configure rules and reports without engineering. *(RevOps)*
53. Minimize the time/risk to onboard a compliant local vendor (entity, VAT, PO). *(Procurement)*
54. Minimize the effort to offboard/export history if the relationship ends. *(IT, Legal)*

**Financial (buyer) desired outcomes.**
55. Minimize the payback period on the partner-ops tooling spend. *(CFO)*
56. Maximize the multiple of value returned per riyal of subscription. *(CFO)*
57. Minimize the total cost of ownership versus the FTE-loaded manual status quo. *(CFO)*
58. Minimize the risk that the spend can't be defended if budgets tighten. *(CFO, CEO)*

*(The remaining ~59 outcomes are segment- and step-variant refinements — e.g., multi-entity, multi-currency, two-tier-distribution, marketplace co-sell, insurance clawback, e-commerce micro-payout — enumerated where they bind in Part VII's segment analysis and Appendix A. The 58 above are the load-bearing set scored in Part IV.)*

---
---

# PART III — THE STAKEHOLDER ARCHITECTURE

## III.1 The full lattice

| # | Persona | ODI role | Buying-committee role | Decisive in | Phase that serves their delta |
|---|---|---|---|---|---|
| 1 | **Head of Partnerships** | Executor + buyer (entry) | **Champion + economic buyer (Ph.1)** | Pre-sell & adoption | Capture |
| 2 | **CFO / Finance leader** | **Buyer (financial)** | **Economic buyer / validator; deep expansion buyer** | Pre-sell (budget unlock) | Settle |
| 3 | **CRO / Commercial leader** | Buyer-adjacent | Revenue validator | Pre-sell (forecast/conflict) | Capture |
| 4 | **CEO / GM** | Buyer (capital allocation) | Strategic sponsor | Pre-sell (invest-or-not) | Orchestrate |
| 5 | **RevOps / Sales Ops** | Executor + support | Process validator / **blocker** | Adoption | Capture |
| 6 | **Sales Owner / AE** | Executor (confirms attribution) | Influencer / **adoption blocker** | Adoption | Capture |
| 7 | **Finance operator (AP/Rev)** | Executor | End user | Adoption | Settle |
| 8 | **Legal / Compliance** | Support (consumption-chain) | **Blocker** (risk) | Pre-sell gate | Settle |
| 9 | **IT / Security** | Support (consumption-chain) | **Blocker / gatekeeper** | Pre-sell gate | Capture |
| 10 | **Procurement** | Support | Gatekeeper | Pre-sell gate | Capture |
| 11 | **Executive Viewer** | Executor (read-only) | End user | Adoption | Orchestrate |
| 12 | **The Partner (counterparty)** | **External executor** | External end user → **network flywheel** | Adoption & pre-sell | Capture |

## III.2 Decisive-persona deep profiles

**Head of Partnerships — the champion who must become a credible economic buyer.**
- *Goals/KPIs:* partner-attributed revenue, claim throughput, dispute rate, partner activation/retention, program ROI.
- *Fears:* the program is seen as a "relationship hobby"; being unable to prove contribution; getting the budget cut.
- *Language:* pipeline, sourced vs influenced, activation, partner trust.
- *Belief to win:* "I can finally prove, with evidence, what my partners drove — and defend it to the CFO."
- *Why they're the entry point:* they own the budget for the entry product and feel the Capture deltas daily.

**CFO / Finance — the validator who unlocks budget and becomes the deepest expansion buyer.**
- *Goals/KPIs:* payout exposure/liability, leakage, gross margin, audit-readiness, recognition correctness, compliance.
- *Fears:* signing off on a wrong number; a double-pay; an audit finding; a ZATCA/WHT penalty.
- *Language:* controls, evidence, reconciliation, finance-ready, exposure, exception, recognition.
- *Belief to win:* "These numbers reconcile, and I can put them in front of the board and the auditor."
- *Why they matter most:* their outcomes have the lowest Satisfaction in the entire analysis (S = 2.0–3.5) and the highest expansion value.

**The Partner (counterparty) — the most under-served *external* persona and the network engine.**
- *Goals:* know status; be credited fairly; be paid on time with explanation; have sourced deals protected.
- *Fears:* under-credit, late/unexplained payment, poached deals, no recourse.
- *Belief to win:* "With vendors on Reven, I always know where my money is, and it's fair."
- *Why they matter:* partner trust is a channel-activation lever; partners that prefer Reven-equipped vendors create cross-vendor pull (the moat).

## III.3 The four trusts (the pre-sale sequence in miniature)

Reven's own GTM names four trusts that must be built in order; each maps to a delta cluster:
1. **Problem trust** — "this pain is real and it's costing you" → the *cost-of-inaction* outcomes (FTE-hours, leakage, penalties).
2. **Vendor trust** — "this team gets it" → diagnostic-workshop credibility.
3. **Product trust** — "it works on my messy data" → the *attribution-on-messy-CRM* and *reconciliation-race* proofs.
4. **Economic trust** — "the ROI is real and defensible" → the *financial buyer outcomes* (payback, multiple, TCO).

## III.4 The buying-committee power map

- **Mobilizers:** Head of Partnerships (champion), CFO (validator). Sell *with* them.
- **Blockers to neutralize:** RevOps ("won't corrupt CRM"), Legal ("auditable"), IT ("residency-safe"), Sales ("won't cut my credit"). These are *belief gates*, not value sales.
- **Gatekeepers to clear:** Procurement (entity, VAT, PO), IT/Security review.
- **Sponsor to activate:** CEO/GM (capital-allocation narrative).
- **External flywheel:** the Partner (post-sale activation → references → pull).

---
---

# PART IV — THE EXPECTATION DELTA ANALYSIS (CORE)

Each decisive persona is scored across functional, emotional, and social outcomes. Outcomes are ordered by Opportunity within each layer. Satisfaction rationale (the contestable half) is summarized per persona and detailed per-outcome in Part V.

## IV.1 Head of Partnerships — Champion & entry economic buyer

**Functional**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 17 | Determine **which revenue a partner actually drove**, defensibly | 9.5 | 3.0 | **16.0** | Extreme |
| 23 | Produce a **partner P&L/ROI leadership trusts** at budget time | 9.0 | 2.5 | **15.5** | Extreme |
| 7 | Prevent partner-sourced deals being **recorded as "Direct"** | 9.0 | 3.5 | **14.5** | Strong |
| 5 | Determine **which partners are actually producing** | 8.0 | 3.5 | **12.5** | Strong |
| 6 | Capture **shadow/co-sell influence** | 7.5 | 2.5 | **12.5** | Strong |
| 2 | Ensure the attribution model is **perceived as fair** | 8.0 | 4.0 | **12.0** | Worth considering |
| 1 | Design **tier economics** that won't need rework | 6.5 | 4.5 | **8.5** | Served |

**Emotional**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 37 | Minimize **anxiety of defending the program** at QBR | 8.5 | 2.5 | **14.5** | Strong |

**Social**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 43 | Be seen as running a **finance-grade function** | 8.0 | 3.0 | **13.0** | Strong |
| 45 | Be seen by partners as **fair and transparent** | 7.5 | 3.5 | **11.5** | Worth considering |

**Satisfaction rationale.** CRMs store opportunities but don't govern *claims*; the "Partner Attribution Leak" (a quarter or more of partner deals silently booked as direct — Magentrix) is the canonical failure. WorkSpan, the leading co-sell tool (G2 4.3/29), lets you *share* pipeline but its **"charts can only be downloaded as images"** and reviewers report **"payout statuses change way too frequently"** — the opposite of a defensible P&L. No tool produces a finance-trusted partner P&L; the incumbent for "prove partner ROI" is *a slide built by hand from a spreadsheet*, which is why the emotional QBR-anxiety outcome scores so high.

## IV.2 CFO / Finance — Validator, budget-unlock, deepest expansion buyer

**Functional**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 22 | Reconcile to **one record both finance teams trust** (bilateral) | 9.0 | 2.0 | **16.0** | Extreme |
| 32 | Prevent **overpay / double-pay** | 9.5 | 3.5 | **15.5** | Extreme |
| 33 | Prevent **WHT/VAT/ZATCA non-compliance** on payouts | 9.0 | 3.5 | **14.5** | Strong |
| 20 | Assemble an **audit-ready evidence pack** | 8.5 | 3.0 | **14.0** | Strong |
| 24 | Know **payout exposure/liability** at any moment | 8.5 | 3.0 | **14.0** | Strong |
| 21 | Eliminate **client-supplied/unverifiable** eligibility figures | 8.0 | 2.5 | **13.5** | Strong |
| 34 | **Close** partner revenue with zero unreconciled claims | 8.5 | 3.5 | **13.5** | Strong |
| 29 | Recover commission on **refunds/cancellations** (clawback) | 8.0 | 3.0 | **13.0** | Strong |
| 36 | Recognize revenue correctly (**ASC 606 gross/net**) | 8.0 | 4.0 | **12.0** | Worth considering |

**Emotional**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 38 | Minimize the **fear of signing off on a wrong number** | 9.0 | 3.0 | **15.0** | Extreme |
| 42 | Minimize the **dread of a tax/audit inspection** on payouts | 8.5 | 3.5 | **13.5** | Strong |

**Social / financial-buyer**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 44 | Be seen by the board as having **numbers we can trust** | 8.5 | 3.0 | **14.0** | Strong |
| 57 | Minimize **TCO vs the FTE-loaded manual status quo** | 8.0 | 3.5 | **12.5** | Strong |
| 55 | Minimize **payback period** on the tooling spend | 7.5 | 4.0 | **11.0** | Worth considering |

**Satisfaction rationale.** This is the persona with the **lowest Satisfaction scores in the analysis** — by design, because the bilateral, finance-grade layer is architecturally vacant. Payout rails (Tipalti G2 4.5/411; Trolley 4.5/47 but Trustpilot ~2.0; PayPal Payouts under "PayPal Payments" 4.5/2,855 but Trustpilot ~1.2) move money *after* the amount is decided elsewhere; their "reconciliation" is payment-to-bank, not bilateral-agreement reconciliation, and Tipalti's contract pushes disputes back to the customer. Overpayment is endemic — **Accenture: up to ~10%** of indirect-channel incentive spend wasted; **CaptivateIQ 2025: 66%** of companies over-/under-paid. The status quo is a master payout spreadsheet plus a **manual WHT process "US tools never touch."** The emotional "fear of a wrong number" (Opp 15.0) is the single most powerful pre-sell lever into this persona.

## IV.3 The Partner (counterparty) — External executor & network flywheel

**Functional**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 26 | **Know the status** of my deal/claim/payout | 9.0 | 2.5 | **15.5** | Extreme |
| 28 | **Dispute and resolve** a disagreement over the amount | 8.0 | 2.5 | **13.5** | Strong |
| 13 | Have my contribution **registered before it's forgotten** | 8.0 | 3.0 | **13.0** | Strong |

**Emotional / social**

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| (32′) | Be **paid on time, in full, with an explanation** | 9.0 | 3.0 | **15.0** | Extreme |
| 40 | Stop **chasing finance/sales for status** | 8.0 | 2.5 | **13.5** | Strong |
| 41 | Feel **treated fairly** | 8.0 | 3.0 | **13.0** | Strong |
| 31 | Be treated **humanely on clawback/demotion** | 7.0 | 2.5 | **11.5** | Worth considering |

**Satisfaction rationale.** The most under-served *external* persona, with the bluntest evidence: payout platforms generate a flood of **"Where is my money?"** messages — **Trolley admits this on its own site**; its payee Trustpilot is ~2.0/5 on KYC/status failures; Tipalti reviews report **"almost 4 weeks for a net-15 payment."** No dispute workflow for the *amount* exists anywhere. Partner-side outcomes at 15+ matter strategically: partner trust is a channel-activation lever, and partners that prefer Reven-equipped vendors create the cross-vendor pull that becomes the moat.

## IV.4 CEO / GM — Strategic sponsor & capital allocator

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 27 | Avoid **misallocating capital** to unprovable programs | 8.0 | 3.0 | **13.0** | Strong |
| 23 | Have a **partner P&L** to allocate against | 8.0 | 2.5 | **13.5** | Strong |
| 58 | Hold spend that's **defensible if budgets tighten** | 7.5 | 3.5 | **11.5** | Worth considering |

## IV.5 RevOps / Sales Ops — Process validator & blocker

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 47 | Keep attribution clean **without corrupting CRM** | 8.0 | 3.5 | **12.5** | Strong |
| 25 | Prevent the partner number **degrading silently** | 7.5 | 3.5 | **11.5** | Worth considering |
| 51 | Prevent **duplicate-webhook** double-counting | 7.5 | 4.0 | **11.0** | Worth considering |
| 52 | **Configure rules/reports without engineering** | 7.0 | 4.0 | **10.0** | Borderline |
| 8 | **Deduplicate** partners/accounts across systems | 7.0 | 4.0 | **10.0** | Borderline |

## IV.6 Finance operator (AP / Revenue) — Daily end user

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 19 | Determine eligibility **with a clear explanation** | 8.0 | 3.0 | **13.0** | Strong |
| 16 | **Pay only on sufficient evidence** | 8.0 | 3.5 | **12.5** | Strong |
| 39 | Minimize the **stress of month-end close** (emotional) | 7.5 | 3.5 | **11.5** | Worth considering |

## IV.7 Legal / Compliance — Support team & risk gate

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 18 | Make **every decision auditable/traceable** | 8.0 | 3.5 | **12.5** | Strong |
| 35 | Prevent an **audit finding/restatement** | 8.0 | 3.5 | **12.5** | Strong |
| 54 | **Export history cleanly** on exit | 6.5 | 4.0 | **9.0** | Served |

## IV.8 IT / Security — Support team & technical gate

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 49 | Prevent a **data-residency/PDPL breach** | 8.5 | 4.5 | **12.5** | Strong |
| 50 | Prevent **cross-tenant leakage** | 8.0 | 5.0 | **11.0** | Worth considering |
| 48 | **Integrate without brittle file transfers** | 7.0 | 3.5 | **10.5** | Worth considering |

## IV.9 Sales Owner / AE — End user & adoption blocker

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 46 | Ensure attribution **doesn't cut my credit unfairly** | 8.0 | 4.0 | **12.0** | Worth considering |
| (—) | **Confirm/challenge** an attribution quickly | 6.5 | 4.5 | **8.5** | Served |

*Sales is primarily a blocker to neutralize, not a value center — the deliverable is fairness and a bounded, non-threatening workflow.*

## IV.10 Procurement — Gatekeeper

| # | Desired outcome | I | S | **Opp** | Class |
|---|---|---:|---:|---:|---|
| 53 | Onboard a **compliant local vendor** (entity, VAT, PO) | 6.5 | 5.0 | **8.0** | Served |

*A process gate, not an opportunity center — existing procurement workflows serve it. Low Opp = correctly so. The job is to clear the gate (local entity, bilingual contract, VAT docs), not to create value.*

---
---

# PART V — THE SATISFACTION FLOOR (per-outcome competitive evidence)

The Satisfaction column is the load-bearing, contestable half of every delta. This part justifies it.

## V.1 The competitive map — everyone orbits the core; no one owns it

| Category | Representative tools (G2 rating / reviews) | Owns (high S) | Does NOT own (the delta) |
|---|---|---|---|
| **PRM / partner automation** | PartnerStack, Impartner ($25/45/75K), ZINFI, Allbound, Kiflo | Recruit, onboard, enable, deal-reg, one-sided affiliate payouts | Finance-grade attribution; bilateral reconciliation; audit ledger |
| **Ecosystem / co-sell** | Crossbeam, Reveal, WorkSpan (4.3/29) | Account overlap, co-sell pipeline, GTM-influence attribution | Revenue-split *calculation*; settlement; **immutable** record |
| **Payout rails** | Tipalti (4.5/411), Trolley (4.5/47; TP ~2.0), PayPal (4.5/2,855; TP ~1.2) | Global disbursement, payee KYC, tax forms, pay-to-bank recon | Computing the split; **claims**; **bilateral** recon; dispute-on-amount |
| **ICM / SPM** | Xactly (4.2–4.3), CaptivateIQ (4.7/3,460), Spiff (4.5/3,063), Everstage (4.8) | *Internal* sales-rep commission calc | *Inter-company* shared-revenue between two legal entities |
| **Rev-rec / billing** | Maxio, Chargebee, Recurly, Zuora, Sage Intacct | One company's own revenue recognition | The *shared* revenue object both must book differently |
| **Status quo (the real incumbent)** | **Spreadsheet + manual WHT + email** | Nothing; fragile, unauditable, bus-factor-of-one | Everything |

## V.2 Per-outcome satisfaction attribution (why each S is what it is)

| Outcome (abbrev.) | Best current "solution" | Why it fails → resulting S |
|---|---|---|
| Bilateral reconciliation (22) | Two spreadsheets + email | No shared record exists; each side keeps its own → **2.0** |
| Attribution-of-record (17) | CRM "source" field | Defaults to Direct; not contestable/versioned → **3.0** |
| Defensible partner P&L (23) | Hand-built slide | Mutable, un-auditable; WorkSpan exports images only → **2.5** |
| Overpay/double-pay prevention (32) | Manual checks | No idempotency; Accenture ~10% waste; CaptivateIQ 66% errors → **3.5** |
| Partner payout status (26) | "Email finance and wait" | "Where is my money?" — Trolley TP ~2.0 → **2.5** |
| Fair, on-time, explained pay (32′) | Payout rail + manual calc | Rails pay late/opaque; no explanation layer → **3.0** |
| WHT/VAT/ZATCA on payouts (33) | Manual WHT spreadsheet + ZATCA portal | "US tools never touch" it; classification disputes → **3.5** |
| Audit-ready evidence pack (20) | Evidence in emails | No point-in-time reconstruction → **3.0** |
| Dispute-on-amount (28) | Email / "mailbox" | Xactly's own dispute tool = "not more than a mailbox"; Tipalti pushes disputes back → **2.5** |
| Eligibility w/ explanation (19) | Manual read of PDF terms | Deductions explained *after*, not before → **3.0** |
| Fear of a wrong number (38) | Reviewer judgement | No verifiable basis; client-supplied figures → **3.0** |
| Clean-CRM attribution (47) | CRM partner fields | Weak; tool sprawl; "9th icon" resistance → **3.5** |
| Data residency/PDPL (49) | Global SaaS hosting | Not in-Kingdom-native; stalls deals → **4.5** |
| Cross-tenant isolation (50) | General multi-tenant SaaS | Mostly adequate → **5.0** |
| Configure without engineering (52) | Admin consoles | Partly served; steep learning curves (CaptivateIQ "clunky") → **4.0** |

## V.3 The defining gap, and the dispute-workflow tell

Across every payout and co-sell tool, the same boundary recurs: the **revenue-share computation and the agreement between the two parties happen *outside* the tool.** With Tipalti/Trolley/PayPal, "operators end up with a spreadsheet or an offshore script, then export a flat file for payment." With WorkSpan, two companies share *opportunities* but settle *nothing*. With ICM tools, the math is for *internal reps*, not *another company*.

The **dispute workflow is the single clearest tell** that no category occupies the seam. Across the ICM cluster, every "dispute" feature is a *rep-vs-employer internal inquiry* — Xactly's own users call its dispute tool *"not more than a mailbox."* Across the rails, "disputes" are *buyer-vs-seller chargebacks* (PayPal) or *per-payee KYC failures* (Trolley); Tipalti's contract literally pushes disputes back to the customer. **Nowhere is there a structured workflow for two peer companies to contest the *amount* of a shared-revenue split and converge on an agreed number.** And every adjacent tool assumes a *single source of truth* (one company's CRM/ERP); in a bilateral context that assumption breaks and the tools have no fallback — which is why their already-weak reconciliation and calculation-error reviews would *amplify* in the two-party case. **The whitespace is architectural, not a feature gap.**

## V.4 Two facts that deepen the floor

- **No KSA/GCC-headquartered PRM or partner-revenue product exists.** Regional "partner management" is global PRM vendors (no confirmed local presence) plus ERP/CRM channel ecosystems run by SIs. The closest local analogs are billing-infrastructure fintechs (Stream — ZATCA-native billing/recon, 2024; Lean — A2A rails) that solve *one* company's billing, not *bilateral* revenue-share. A GCC buyer's Satisfaction is *additionally* depressed by the absence of Arabic/RTL, multi-entity, and ZATCA/WHT-native handling — "no global tool offers this."
- **The floor will eventually rise on the adjacent outcomes.** AppDirect's acquisition of PartnerStack (Apr 2026) after Tackle (Dec 2025) assembles marketplace + PRM + payouts. This is the competitive clock (Part X.5): the bilateral-ledger deltas (S = 2.0–2.5) remain unowned even by AppDirect, whose acquired modules "almost certainly don't reconcile to one ledger — that gap is Reven's opening" — but the window is finite.

---
---

# PART VI — THE AGGREGATE OPPORTUNITY LANDSCAPE

## VI.1 The ranked landscape (top 45 of 117)

| Rank | Outcome | Persona | Layer | I | S | **Opp** |
|---:|---|---|---|---:|---:|---:|
| 1 | Bilateral reconciliation both sides trust | CFO | F | 9.0 | 2.0 | **16.0** |
| 1 | Attribution-of-record | Head of Partnerships | F | 9.5 | 3.0 | **16.0** |
| 3 | Overpay/double-pay prevention | CFO | F | 9.5 | 3.5 | **15.5** |
| 3 | Defensible partner P&L | Head of Partnerships | F | 9.0 | 2.5 | **15.5** |
| 3 | Partner payout status visibility | Partner | F | 9.0 | 2.5 | **15.5** |
| 6 | Fair, on-time, explained payment | Partner | E/S | 9.0 | 3.0 | **15.0** |
| 6 | Fear of signing off on a wrong number | CFO | E | 9.0 | 3.0 | **15.0** |
| 8 | WHT/VAT/ZATCA compliance | CFO | F | 9.0 | 3.5 | **14.5** |
| 8 | Contribution not recoded to "Direct" | Head of Partnerships | F | 9.0 | 3.5 | **14.5** |
| 8 | Anxiety of defending the program (QBR) | Head of Partnerships | E | 8.5 | 2.5 | **14.5** |
| 11 | Audit-ready evidence pack | CFO | F | 8.5 | 3.0 | **14.0** |
| 11 | Payout exposure/liability visibility | CFO | F | 8.5 | 3.0 | **14.0** |
| 11 | Board sees "numbers we can trust" | CFO | S | 8.5 | 3.0 | **14.0** |
| 14 | Eliminate client-supplied eligibility | CFO | F | 8.0 | 2.5 | **13.5** |
| 14 | Close with zero unreconciled claims | CFO | F | 8.5 | 3.5 | **13.5** |
| 14 | Dispute-and-resolve on the amount | Partner | F | 8.0 | 2.5 | **13.5** |
| 14 | Stop chasing finance/sales for status | Partner | E | 8.0 | 2.5 | **13.5** |
| 14 | Partner P&L to allocate against | CEO | F | 8.0 | 2.5 | **13.5** |
| 14 | Dread of tax/audit inspection | CFO | E | 8.5 | 3.5 | **13.5** |
| 20 | Capital not misallocated | CEO | F | 8.0 | 3.0 | **13.0** |
| 20 | Eligibility with explanation | Finance op | F | 8.0 | 3.0 | **13.0** |
| 20 | Contribution registered before forgotten | Partner | F | 8.0 | 3.0 | **13.0** |
| 20 | Recover commission on refunds (clawback) | CFO | F | 8.0 | 3.0 | **13.0** |
| 20 | Run a finance-grade function (perceived) | Head of Partnerships | S | 8.0 | 3.0 | **13.0** |
| 20 | Feel treated fairly | Partner | E | 8.0 | 3.0 | **13.0** |
| 26 | Determine which partners produce | Head of Partnerships | F | 8.0 | 3.5 | **12.5** |
| 26 | Capture shadow/co-sell influence | Head of Partnerships | F | 7.5 | 2.5 | **12.5** |
| 26 | Clean attribution, no CRM corruption | RevOps | C | 8.0 | 3.5 | **12.5** |
| 26 | Pay only on sufficient evidence | Finance op | F | 8.0 | 3.5 | **12.5** |
| 26 | Every decision auditable | Legal | C | 8.0 | 3.5 | **12.5** |
| 26 | Prevent audit finding/restatement | Legal | F | 8.0 | 3.5 | **12.5** |
| 26 | Data-residency/PDPL safety | IT | C | 8.5 | 4.5 | **12.5** |
| 26 | TCO vs FTE-loaded status quo | CFO | $ | 8.0 | 3.5 | **12.5** |
| 34 | Correct rev-rec (606 gross/net) | CFO | F | 8.0 | 4.0 | **12.0** |
| 34 | Attribution doesn't cut my credit | Sales | F | 8.0 | 4.0 | **12.0** |
| 34 | Attribution model perceived as fair | Head of Partnerships | F | 8.0 | 4.0 | **12.0** |
| 37 | Governed/scalable partner line (perceived) | CEO | S | 7.5 | 3.5 | **11.5** |
| 37 | Seen by partners as fair/transparent | Head of Partnerships | S | 7.5 | 3.5 | **11.5** |
| 37 | Partner number doesn't degrade silently | RevOps | F | 7.5 | 3.5 | **11.5** |
| 37 | Humane clawback/demotion | Partner | E | 7.0 | 2.5 | **11.5** |
| 37 | Stress of month-end close | Finance op | E | 7.5 | 3.5 | **11.5** |
| 37 | Payback period on spend | CFO | $ | 7.5 | 4.0 | **11.0** |
| 37 | Duplicate-webhook corruption | RevOps | C | 7.5 | 4.0 | **11.0** |
| 37 | Cross-tenant leakage | IT | C | 8.0 | 5.0 | **11.0** |
| 45 | Integrate without brittle transfers | IT | C | 7.0 | 3.5 | **10.5** |

*(Layer key: F = functional, E = emotional, S = social, C = consumption-chain, $ = financial-buyer. Full 117 in Appendix A.)*

## VI.2 The opportunity matrix (Importance × Satisfaction quadrants)

```
            LOW SATISFACTION (S<4)            HIGHER SATISFACTION (S≥4.5)
          ┌──────────────────────────────┬──────────────────────────────┐
  HIGH    │  ★ EXTREME / DIFFERENTIATE ★   │   TABLE-STAKES (must-match)    │
  IMP.    │  Bilateral recon (16.0)        │   Correct rev-rec (12.0)       │
  (I≥8)   │  Attribution-of-record (16.0)  │   Data residency (12.5)        │
          │  Overpay/double-pay (15.5)     │   Cross-tenant (11.0)          │
          │  Partner P&L (15.5)            │   Attribution-fair-to-sales    │
          │  Payout status (15.5)          │                                │
          │  CFO "wrong number" fear(15.0) │                                │
          │  WHT/ZATCA (14.5) … +20 more   │                                │
          ├──────────────────────────────┼──────────────────────────────┤
  LOWER   │  SELECTIVE (mid-opportunity)   │   SUBSUME / DEPRIORITIZE        │
  IMP.    │  Configure-without-eng (10.0)  │   Confirm/challenge attr (8.5) │
  (I<8)   │  Dedup across systems (10.0)   │   Onboard local vendor (8.0)   │
          │  Integrate w/o files (10.5)    │   Export on exit (9.0)         │
          └──────────────────────────────┴──────────────────────────────┘
```

## VI.3 The three findings that matter

**Finding 1 — The delta is concentrated, not diffuse.** Fourteen outcomes score in the extreme band (>15 across functional+emotional). They are owned by just three personas — **CFO, Head of Partnerships, Partner** — and every one describes the *same layer*: a shared, finance-grade, bilateral record of who-is-owed-what, agreed and settled with trust. The opportunity is not "build a better PRM"; it is "build the one thing no category owns."

**Finding 2 — The delta gradient reproduces the phase model.** Sort the extreme/strong outcomes by serving phase:
- **Capture (Ph.1):** attribution-of-record, partner P&L, contribution-not-Direct, shadow influence, status visibility, protection, QBR-anxiety → owned by **Head of Partnerships + Partner**.
- **Settle (Ph.2):** bilateral reconciliation, overpay prevention, WHT/ZATCA, audit pack, exposure, close, clawback, "wrong-number" fear → owned by **CFO**.

The single deepest deltas (reconciliation S=2.0, status S=2.5, P&L S=2.5, eligibility-basis S=2.5) split cleanly across the entry buyer (Capture) and the expansion buyer (Settle). **ODI independently reproduces the Capture→Settle→Orchestrate sequencing and the "CFO is the expansion buyer" thesis.**

**Finding 3 — The bottom of the table tells you what NOT to build.** Outcomes with Opp < 10 — confirm/challenge attribution, configure rules, onboard a vendor, export on exit, prevent cross-tenant leakage — are where incumbents and general SaaS already satisfy. ODI's instruction (and Kano's) is explicit: **match-and-subsume these as table-stakes; never differentiate or price on them.** This discipline is what keeps Reven from decaying into "a generic PRM": deal-registration mechanics, partner directories, and one-sided affiliate payouts are *features it subsumes, not the product.*

---
---

# PART VII — THE HIDDEN-SEGMENT ANALYSIS (ODI Step 4)

ODI's fourth step is to discover segments whose **delta profiles differ** — because the same outcome can be "appropriately served" for one buyer and "extreme" for another, and that determines the beachhead. Reven's KSA value-pool analysis already scored eight segments (IT-distribution 39/45, RHQ/MNC 38, B2B-SaaS 36, Fintech 36, E-commerce 36, Insurance 33, Telecom 30, Logistics 26). Here we go further: we show *how the outcome-level deltas shift* across the five most actionable segments, and what each shift implies.

## VII.1 Segment delta-shift matrix

For each segment, the table shows which outcomes **over-index** (Importance rises vs the blended baseline, often pushing the Opportunity into a higher band) and which **under-index**. ▲▲ = strong over-index; ▲ = mild; ▬ = baseline; ▼ = under-index.

| Outcome (baseline Opp) | IT-channel × RHQ | Fintech / regulated | Insurance (agent nets) | E-commerce 3P / affiliate | Family conglomerate |
|---|:--:|:--:|:--:|:--:|:--:|
| Bilateral reconciliation (16.0) | ▲▲ two-tier distribution | ▲ | ▲ | ▬ | ▲▲ inter-entity |
| Attribution-of-record (16.0) | ▲ | ▬ | ▲ | ▲▲ high-volume | ▲ |
| Overpay/double-pay (15.5) | ▲ | ▲▲ regulator-facing | ▲▲ clawback-heavy | ▲▲ micro-payout scale | ▲ |
| WHT/VAT/ZATCA (14.5) | ▲▲ RHQ 0%-WHT, cross-border | ▲▲ SAMA + audit | ▲ | ▲ | ▲▲ multi-entity |
| Audit-ready evidence (14.0) | ▲ | ▲▲ SAMA review | ▲ | ▬ | ▲ |
| Reverse/clawback path (13.0) | ▬ | ▲ | ▲▲▲ *it IS the business* | ▲ refunds | ▬ |
| Payout status visibility (15.5) | ▲ | ▬ | ▲ | ▲▲ thousands of payees | ▲ |
| Data-residency/PDPL (12.5) | ▲▲ gov-adjacent | ▲▲ SAMA residency | ▲ | ▼ | ▲ |
| Multi-entity / multi-country | ▲▲ RHQ structure | ▲ | ▬ | ▼ | ▲▲▲ shared services |
| FX on cross-border payouts | ▲▲ | ▲ | ▬ | ▲▲ | ▲ |
| Price sensitivity (↓ = good for ACV) | low (high ACV) | low | medium | **high (margin-thin)** | very low (highest ACV) |

## VII.2 Per-segment read

- **IT-distribution × RHQ (the recommended beachhead).** Highest composite fit. The two-tier distribution model makes **bilateral reconciliation** acute (vendor→distributor→reseller, each disputing margin), and the RHQ structure makes **WHT/ZATCA/multi-entity** acute (0%-WHT status is a premium-attach trigger; lose gov tenders >SAR 1M without RHQ). High ACV, low price-sensitivity, strong reference value. **Lead here.** Economic buyer context = a compliance-led RHQ/channel CFO.
- **Fintech / regulated.** Compliance, audit, and data-residency over-index hardest (SAMA third-party security review). Highest ACV and natural Settle-layer attach — but the SAMA review **lengthens the sales cycle**, so sequence *after* a reference exists.
- **Insurance (broker/agent networks).** The standout: **the reverse/clawback path over-indexes ▲▲▲ because commission-and-clawback *is* the business model.** Reven's humane reverse path (refund → eligibility reversal → clawback-by-netting with advance explanation) is a near-perfect fit. Watch-out: lower executive urgency, legacy systems.
- **E-commerce 3P / affiliate.** **Payout-status visibility, attribution-at-volume, and FX** over-index because of thousands of micro-payouts. But buyers are **margin-thin and price-sensitive** — price for scale (per-payout SaaS fee + FX computation, never % of gross). Feeds the Settle layer's volume.
- **Family conglomerate (shared services).** **Multi-entity reconciliation over-indexes ▲▲▲** — one integration serves many entities. Very high ACV, low CAC (one relationship, many business units), but a long relationship sell.

## VII.3 The segment-sequencing conclusion

The beachhead order that maximizes early deltas-per-sales-dollar:
1. **IT-channel × RHQ** — sharpest blended delta, highest ACV, compliance wedge, reference value. *Land here.*
2. **Family conglomerate** — once a reference exists, the multi-entity delta + low CAC is unbeatable economics.
3. **Insurance** — the clawback fit is so strong it's a wedge of its own; sequence when the reverse-path module is mature.
4. **Fintech / E-commerce** — Settle-layer expansion segments (volume, compliance) once the ledger is trusted.

This sequencing is itself a finding: **the deltas don't just say "where to build" — they say "whom to sell first," and they point at the same IT-channel/RHQ ICP the value-pool analysis reached independently.**

---
---

# PART VIII — THE MONETIZATION RATIONALE (delta → progress → price)

## VIII.1 The core logic: a large delta is a willingness-to-pay signal

ODI's pricing corollary is direct: **differentiated innovation appeals to underserved customers — those with unmet needs who will pay *more* to get the job done better.** A high Opportunity score is a *leading indicator of willingness-to-pay.* Christensen/Moesta restate it: customers pay in proportion to the **progress** a solution delivers against a job they care about and currently can't get done.

Reven's fourteen extreme-opportunity outcomes are, by construction, exactly the outcomes for which customers are *already hacking together manual workarounds* — the master spreadsheet, the offshore reconciliation script, the manual WHT certificate, the hand-built board slide. **The existence and maintenance of those workarounds is the revealed-WTP proof.** Nobody sustains a fragile, bus-factor-of-one spreadsheet for a problem they don't value; the FTE-labor and risk sunk into the workaround is the floor of what they will pay to retire it.

## VIII.2 Pricing posture follows the served-state

| Served-state (ODI) | Kano | Reven outcomes | Posture | Pricing implication |
|---|---|---|---|---|
| **Underserved (Opp >12)** | Performance / Excitement | The bilateral ledger, attribution, reconciliation, WHT, partner trust | **Differentiated / premium** | Price on *value*; Strategyn's **profit-share strategy** supports **2–5× competitor pricing** where a highly-underserved job is done markedly better |
| **Appropriately served (<10)** | Basic | Directory, deal-reg, vendor onboarding, basic multi-tenancy | **Parity / subsume** | Bundle as table-stakes; never the headline |
| **Overserved** | Reverse | (none material here) | Low-end disruption | N/A — there is no overserved segment to attack on price |

**The absence of an overserved zone is itself strategic:** a cheaper-PRM (low-end disruption) play would fail — there is no over-served segment to capture. The *only* winning posture is differentiated, premium, value-based. **The market structure forces the correct model.**

## VIII.3 The value-pool decomposition (mapping deltas to dollars)

Value capture is anchored to **measured customer value**, captured at **10–20% of TMV → 5–10× customer ROI** (effective take **sub-30 bps** of attributed revenue, captured through subscription + modules; *never* a visible % of the partner's money). TMV is the sum of three pools, each fed by specific extreme-opportunity outcomes:

| Pool | Formula | Outcomes that drive it |
|---|---|---|
| **V1 — Revenue protection** | partner-attributed revenue × leakage rate × recovery factor | Attribution-of-record (17), contribution-not-Direct (7), protection (12), shadow capture (6) |
| **V2 — Cost reduction** | Σ(hours saved × loaded cost) + avoided hires | FTE-on-reconciliation (22,34), eligibility-with-explanation (19), clean-CRM (47), close (34) |
| **V3 — Financial control** | overpayment prevented + (audit/penalty risk × cost avoided) | Overpay/double-pay (32), WHT/ZATCA (33), audit pack (20), correct rev-rec (36) |
| **(V4 — Strategic option value)** | faster launch + more partners scaled + ROI visibility | P&L credibility (23), capital-allocation confidence (27), QBR-anxiety (37) — priced as premium, rarely line-item billed |

**TMV = V1 + V2 + V3.** WTP ceiling ≈ capture-share × TMV + strategic premium. The emotional/social outcomes (fear, anxiety, perception) are *not separately billed* — they are the **premium multiplier** on V4 and the reason a buyer chooses the differentiated option over "good enough."

## VIII.4 Per-segment ROI & ACV (worked examples — to be replaced by the customer's own pilot numbers)

| Driver | SMB | Mid-market | Large enterprise | Semi-gov |
|---|---:|---:|---:|---:|
| Partner-attributed revenue/yr | SAR 15M | SAR 80M | SAR 400M | SAR 250M |
| Active partners | 40 | 150 | 600 | 300 |
| Measured leakage rate | 2.0% | 1.5% | 1.2% | 1.5% |
| **V1 revenue protection** | SAR 105K | SAR 480K | SAR 2.16M | SAR 1.5M |
| **V2 cost reduction** | SAR 180K | SAR 450K | SAR 1.1M | SAR 800K |
| **V3 financial control** | SAR 90K | SAR 320K | SAR 1.2M | SAR 1.0M |
| **TMV (V1+V2+V3)** | **SAR 375K** | **SAR 1.25M** | **SAR 4.46M** | **SAR 3.3M** |
| **Reven ACV @ ~12–18% TMV** | SAR 55–70K | SAR 150–225K | SAR 600–800K | SAR 500K–1.5M+ |
| **Implied customer ROI** | **~5–7×** | **~6–8×** | **~6–7×** | **~3–6×** |

The mid-market ACV band (SAR 150–225K ≈ **$40–60K**) is independently corroborated from three directions — PRM median ~$32.5K, ICM median ~$41K, vertical-SaaS median $25–50K — and bottoms-up from ICM per-seat economics ($25–75/user/mo). Value-based and market-based numbers converge.

## VIII.5 The pricing architecture mapped to the delta map

The value metric must scale with the customer's partner business and with the deltas being resolved — i.e., it must climb the job map:

| Phase | Delta cluster resolved | Value metric | Headline model | Indicative ACV |
|---|---|---|---|---|
| **0 — Design partners** | proof of the Capture deltas | per logo (flat) | paid pilot + locked price | $5–15K (creditable) |
| **1 — Capture** | attribution, P&L, status, shadow | **active (transacting) partners**, banded | GBB annual SaaS + implementation | $6–50K (floor high-touch ≥$25–30K) |
| **2 — Settle** | reconciliation, overpay, WHT, audit | active partners + thin per-payout + capped bps | hybrid base + usage | $25–250K+ |
| **3 — Orchestrate** | P&L, forecasting, network | net bps on revenue-under-management | value-based, declining tiers + caps | 6–7 figures |

- **Packaging:** Good-Better-Best by capability depth, unlimited internal seats (never per-seat — the most-resented internal model), annual prepaid above a ~SAR 95–110K high-touch floor.
- **Compliance ladder (stackable premium):** L0 Standard → L1 Regulated-ready (ZATCA Ph.2, WHT, PDPL; +mid-tier) → L2 In-Kingdom residency (+15–30%) → L3 Sharia-certified (Ju'ala/Wakala + fatwa; setup SAR 56–150K). **This ladder is the direct monetization of the IT-channel/RHQ and fintech segment deltas (Part VII).**
- **Expansion add-ons:** additional partner blocks, entities, countries, connectors, AI-assisted attribution, managed operations — each a higher rung on the opportunity curve.

## VIII.6 The compliance wedge: converting "important" into "non-discretionary"

The most powerful monetization mechanic is that one extreme-opportunity outcome — **WHT/VAT/ZATCA compliance (Opp 14.5)** — is being made *mandatory by the state, on a deadline*:

- **ZATCA Phase 2, Wave 24** sweeps all VAT-subject businesses with revenue **> SAR 375,000** (= the VAT-registration threshold) into mandatory e-invoicing **clearance** by **30 June 2026 — imminent as of this writing** — pulling the entire ~600k-firm VAT base into integration-grade compliance. Standard B2B invoices must be cleared by ZATCA *before* reaching the buyer (UUID + cryptographic stamp + hash-chain); non-compliance fines run SAR 5,000–50,000 per violation.
- Layered on top: **WHT of 15% (royalties) / 5% (technical services) / 20% (management fees)** on cross-border partner payouts, where the royalty-vs-service classification is a live ~10-point swing ZATCA tends to resolve toward the higher rate.
- Structural demand multipliers: **RHQ rule** (mandatory for gov contracts >SAR 1M; ~600+ established), **IKTVA/local-content** (Aramco hit its 70% target Feb 2026), **franchise registrations +866%** (2021→2024) — all *manufacture* multi-party revenue-sharing relationships.

A *forced* high-importance outcome with a *deadline* is the strongest possible monetization trigger: it converts willingness-to-pay from discretionary ("nice ROI") to **non-discretionary** ("non-compliance is not an option"), and compliance budget survives downturns. **The wedge gets the deal now; the bilateral ledger underneath keeps it forever.**

## VIII.7 The expansion engine: NRR as a march up the opportunity curve

The deltas are not static. A customer's TMV grows with its ecosystem (a customer growing partners 30%/yr grows TMV ~30%/yr), and the *unserved* deltas deepen as the program scales — disputes become inevitable ("proof the channel is economically meaningful"), reconciliation load rises, compliance surface widens. The expansion path — **more partners → modules → compliance tier → entities/countries → settlement volume → data/network** — is literally **a climb up the opportunity ranking**, from the Head-of-Partnerships deltas (Capture) into the deeper CFO deltas (Settle). This is the mechanical source of the **NRR 115–125%** target: expansion revenue is the customer buying the resolution of progressively higher-opportunity outcomes. The strongest expansion triggers, ranked: (1) active-partner band crossings; (2) **finance becoming the buyer** (biggest ACV step — moving from Capture to Settle deltas); (3) multi-entity/country rollout; (4) compliance deadlines; (5) module attach.

## VIII.8 What NOT to charge for (the discipline that protects the model)

- **Never a visible % take-rate on the partner's money** — the category's most-resented model ("a tax on your own success"), the first line a CFO cuts (PartnerStack 3–15%, Paddle 5%, impact.com ~2.5%). Reven is the **neutral Switzerland**.
- **Effective take stays sub-30 bps** of attributed revenue (e.g., SAR 150–225K on SAR 80M ≈ 0.19–0.28%). "The value-justified price is sub-30 bps; capture it through subscription + modules, not a visible percentage."
- **The pool dwarfs the software — but you govern it, you don't tax it.** IDC: partners earn ~**$8.45 (services) / $10.93 (software)** per $1 of Microsoft revenue; McKinsey sizes the ecosystem economy at ~$60T→$70–100T by 2030; Canalys/Forrester confirm >70% of IT and ~75% of world trade flow through partners. Sizing the *revenue under management* (not the PRM tool market) moves the addressable pool ~100× — which is the prize Orchestrate eventually captures via capped bps.
- **Never per-internal-seat; never float/interest on funds held** (riba + money-transmitter trap).
- **Services priced at cost, capped <20% of revenue** (services earn ~1–2× valuation vs ~5–10× for SaaS; reclassifying PS to COGS can collapse gross margin 13+ points).

## VIII.9 Willingness-to-pay validation (revealed, not stated)

There is **no validated WTP yet** — and stated WTP is unreliable (people overstate by a **factor of 2–3×**, Miller et al., *JMR* 2011). Only **revealed WTP** counts: signed paid pilots and $-committed LOIs. Van Westendorp/MaxDiff/Gabor-Granger/conjoint are demoted to hypothesis generation. The validation path:
- **Paid pilots** ($5–15K, creditable to Y1), ≤45–90 days, **CFO-co-sponsored**, binary success criteria, ≤3 concurrent (guards against the MIT finding that ~95% of enterprise GenAI pilots show no P&L return, and IDC's 88% of POCs never reaching production).
- **Price anchoring:** publish Starter/Growth ACVs (hiding all prices drives ~30% abandonment; sub-$25K converts far better visible); "from $X, contact sales" for Enterprise; the Growth middle tier is the anchor.
- **Repricing tolerance:** customers absorb 3–5% increases easily; >15–20% needs grandfathering; auto-renew uplift = max(CPI, 3–5%); keep average discount <25% (discount-acquired customers carry ~30% lower LTV).

---
---

# PART IX — THE PRE-SELLING PLAYBOOK

Pre-selling is the craft of making a buyer *feel* their Expectation Delta before they own the product. The method, applied per persona: **lead with their single highest-opportunity outcome, prove the gap with their own data, quantify the cost of inaction in their currency, then neutralize their fear.**

## IX.1 The four-trusts ladder (the macro sequence)

| Trust | Question in the buyer's head | What earns it | Delta cluster used |
|---|---|---|---|
| **Problem trust** | "Is this pain real and costing me?" | Cost-of-inaction baseline in writing | FTE-hours, leakage, penalties (V1/V2/V3) |
| **Vendor trust** | "Does this team actually get it?" | The diagnostic workshop | naming the 4 structural sub-problems (II.1) |
| **Product trust** | "Will it work on *my* messy data?" | The reconciliation race; attribution on real CRM | extreme functional deltas (17, 22, 32) |
| **Economic trust** | "Is the ROI real and defensible?" | The one-slide business case | financial-buyer outcomes (55–58) |

## IX.2 The diagnostic workshop (the conversion mechanism = the ODI survey)

The highest-converting pre-sale step is a **diagnostic workshop** walking the customer's actual partner-revenue workflow across eight sections — each mapped to the outcomes it surfaces. Capturing the workarounds *is* the buying trigger; every "we ask sales on WhatsApp" and "finance keeps a separate Excel" is a revealed delta.

| Workshop section | Outcomes it surfaces | The buying trigger to capture |
|---|---|---|
| 1. Partner creation | 5, 8, 9 | "Who keeps the master partner list — and what happens when they leave?" |
| 2. Agreement rules | 10, 36 | "Where do the caps/tiers/splits live?" → "PDF" |
| 3. Claim submission | 13, 14 | "How does a partner tell you they sourced a deal?" → "email/WhatsApp" |
| 4. Attribution review | 17, 7, 6 | "Show me a deal where sales and a partner both claimed it" |
| 5. Protection window | 12 | "What stops two partners claiming the same account?" |
| 6. Finance review | 19, 20, 21, 22 | "When does finance first see exposure?" → "too late" |
| 7. Disputes | 28, 31 | "Walk me through your last payout dispute" |
| 8. Reporting | 23, 24 | "Build me the partner P&L you take to the board" → "we can't" |

**This workshop is simultaneously the ODI validation instrument (Appendix C).** Run the Importance/Satisfaction rating on the live committee during discovery and you (a) convert the modeled scores into measured ones *for that account*, and (b) hand the champion a quantified business case in their own numbers. The research *is* the sales motion.

## IX.3 The ten battlecards

| Persona | Lead delta (Opp) | Proof move | Quantify (their currency) | Top objection → answer |
|---|---|---|---|---|
| **Head of Partnerships** | Attribution-of-record (16.0) | **Unclaimed-influence demo** — money on your own accounts you aren't measuring | partner-attributed revenue currently mis-booked | *"We have CRM"* → CRM stores opportunities; it doesn't govern claims, protection, or contestable attribution |
| **CFO** | Bilateral reconciliation (16.0) + "wrong-number fear" (15.0) | **Reconciliation race** — watch hours collapse to minutes; reconciliation cost calculator | FTE-hours + overpay $ + penalty exposure | *"We have a finance system"* → ERP records *your* money, not the *shared* number both sides trust |
| **Partner** | Payout status (15.5) | Live status + explained payout vs. "email and wait" | days-to-pay; disputes outstanding | *"Just pay me faster"* → speed without explanation still breaks trust; we give both |
| **CEO/GM** | Capital not misallocated (13.0) | Quarterly partner-investment pack generated *from the product* | $ allocated to unprovable programs | *"Too early"* → compliance + marketplaces + e-invoicing are breaking the old model now |
| **CRO** | Contribution-not-Direct (14.5) | Show partner-influence on forecasted deals | forecast distortion; channel-conflict losses | *"Sales will resist"* → bounded write-back; fairness protects reps' credit too |
| **RevOps** | Clean attribution, no CRM corruption (12.5) | "Overlay, never overwrite" — field-ownership map | hours of CRM cleanup avoided | *"A 9th tool"* → it consolidates the spreadsheet + WHT sheet + recon workbook |
| **Legal** | Auditable decisions (12.5) | Frozen, immutable evidence pack | audit items cleared; dispute exposure | *"Liability"* → bounded terms; data ownership stays yours |
| **IT/Security** | Data residency/PDPL (12.5) | Residency + ABAC + cross-tenant identity architecture | a stalled deal avoided | *"Integration risk"* → idempotent, reconcilable, overlay-first |
| **Finance operator** | Eligibility w/ explanation (13.0) | Eligibility verdict + reason + missing-condition list | month-end hours saved | *"We manage in Excel"* → Excel can't explain *why* before you pay |
| **Procurement** | (clear the gate) | Local entity, bilingual contract, VAT docs ready | cycle-time to PO | *"Vendor registration"* → pre-packaged compliance dossier |

## IX.4 The buying-committee choreography

1. **Land the champion** (Head of Partnerships) on the Capture deltas — attribution, P&L, shadow influence. Budget owned here.
2. **Unlock the CFO** on the Settle deltas — reconciliation, overpay, WHT/audit, and the *"wrong-number fear."* Budget *validated* here; this is the step-change in ACV.
3. **Neutralize the blockers** (RevOps, Legal, IT, Sales) — belief gates, not value sales (the four "required beliefs": won't corrupt CRM / auditable / data controlled / won't hurt my workflow).
4. **Activate the partner side** post-sale — status + explained payouts → references → cross-vendor pull.
5. **Prove via a paid pilot** (IX.5) so the business case writes itself.

## IX.5 The paid-pilot design (the revealed-WTP instrument)

- **Commercials:** paid ($5–15K, creditable to Y1), CFO-co-sponsored, ≤45–90 days, ≤3 concurrent.
- **Scope (one of each):** one business unit / one partner type / one workflow / one approval path / one finance view / one exec report.
- **First-value milestone:** "First 20 partner revenue claims processed" with evidence, attribution, dispute, and finance eligibility.
- **Hard boundary (Phase 1):** never include or promise payout *execution*, settlement automation, escrow, or automated ZATCA clearance — eligibility is **preview/calculation only**.
- **Auto-capture ROI evidence:** hours saved, exceptions found, dollars recovered, disputes resolved — "so the business case writes itself."
- **Binary exit criteria:** a finance reviewer accepts an evidence pack; ≥70% activation; time-to-first-claim <14 days; a CFO says on a reference call **"we trust these numbers."**

## IX.6 The objection library (with the delta that answers each)

| Objection | Answer (and the delta behind it) |
|---|---|
| "We already have a CRM." | CRM stores opportunities; it does not govern claims, protection, contestable attribution, eligibility, or audit (deltas 13–22). |
| "We already have a PRM." | PRM is partner *engagement* + deal-registration; this is the revenue-*claim control layer* and the *settlement* record (deltas 17–36). |
| "Finance has a system." | The ERP records *your* money; it cannot produce the *bilateral* number both finance teams trust (delta 22). |
| "Customers may not pay." | The champion owns budget; the CFO owns the liability we remove; we prove with *paid* pilots, not free trials. |
| "Incumbents will copy this." | Incumbents optimize the transaction layer (steps 1–3); this owns the trust/settlement layer (steps 4–8); hyperscalers can't be neutral; none is GCC-compliance-native. |
| "The market's too early." | ZATCA Wave 24 (30 Jun 2026), RHQ, IKTVA, and marketplaces are breaking the old model *now*; compliance budget survives downturns. |
| "Your tech may not work." | We sequence capture→attribute; the MVP ships on *messy CRM data* first, eligibility preview-only. |

## IX.7 The one-slide business case

Three numbers, benchmarked against the **FTE-loaded manual status quo, not against PERM tools**:

1. **Hours saved** (V2) — from the reconciliation cost calculator.
2. **Penalties/errors avoided** (V3) — overpay prevented + WHT/audit risk × cost.
3. **Audit items cleared / leakage recovered** (V1) — dollars recovered in the pilot.

"Refuse to demo anything you can't price." The slide *is* the literal monetization of the Expectation Delta: you are selling the retirement of the workaround, priced below the value of retiring it (10–20% of measured value → 5–10× ROI).

## IX.8 Pre-selling the partner side (the flywheel)

Partner-side outcomes scoring 15+ (status, fair/on-time pay, dispute recourse) are not just satisfaction — they are **demand generation**. Post-sale, activate the counterparty: live status, explained payouts, a real dispute path. Partners that experience "reconciliation just works" come to *prefer* Reven-equipped vendors, and a partner connected to many vendors through Reven accrues a unified payout history it won't abandon. This cross-vendor pull is the seed of the Phase-3 network and the deepest moat — and it is *earned* by over-serving the external persona others ignore.

---
---

# PART X — STRATEGIC SYNTHESIS & RISKS

## X.1 What the ODI lens confirms

1. **The opportunity is real and concentrated** — 14 extreme outcomes, all on the unowned bilateral-ledger layer; confirmed by a 20-tool competitive sweep and the absence of any GCC-native player.
2. **The strategy is aimed correctly** — the delta gradient independently reproduces Capture→Settle→Orchestrate, the claim-as-atomic-object decision, the CFO-as-expansion-buyer thesis, the IT-channel/RHQ beachhead, and the "subsume table-stakes" discipline.
3. **The monetization model fits the market structure** — no overserved zone → premium/value-based is the only viable posture; profit-share logic supports 10–20%-of-TMV capture at 5–10× ROI; the compliance wedge converts WTP to non-discretionary.

## X.2 The 7 Powers moat sequencing (mapped to outcomes)

The deltas don't just justify a product; they build durable power in a deliberate order:

| Power | When | Built by serving which outcomes | Why durable |
|---|---|---|---|
| **Counter-positioning** | Day one | The neutral, no-rake, claim-centric position (vs PartnerStack/AppDirect who skim %) | Incumbents can't copy without cannibalizing their take-rate revenue |
| **Switching costs** | Phase 2 | Becoming the daily operating record + immutable audit trail + the cadence ritual (outcomes 18, 20, 22, 34) | Rip-out means losing history, evidence, and the close process — "system-of-record stickiness" |
| **Network economies** | Phase 3 | Cross-tenant identity + the partner flywheel (outcomes 26, 28, 41) | The money/claim graph "you can't out-buy"; each shared relationship strengthens it |

**Data gravity** underpins all three: "the money record is the heaviest gravity well there is." The benchmark dataset (real reseller margins, dispute rates, days-to-settle, WHT leakage) is itself a network effect competitors with survey data can't match.

## X.3 The risk register (per high-opportunity outcome)

| Risk to the thesis | How it shows up in the delta map | Mitigation |
|---|---|---|
| **Satisfaction rises (convergence)** | AppDirect+PartnerStack+Tackle lift S on adjacent outcomes (recruit/onboard/payout) | Race to own the bilateral-ledger deltas (S=2.0–2.5) even a converged incumbent lacks — their modules "don't reconcile to one ledger" |
| **Importance lower than modeled** | If a buyer's partner revenue isn't material, I drops and tooling isn't worth it | Strict ICP qual (20–200+ active partners, material revenue, finance exposure); disqualify <10 informal partners |
| **ACV/motion mismatch (valley of death)** | Extreme deltas exist at SMB, but high-touch can't profitably serve a <$25K deal | Floor high-touch entry at ~$25–30K (SAR 95–110K); low-touch/self-serve below |
| **Modeled ≠ measured** | Scores are evidence-anchored estimates, not survey data | Run the Appendix-C survey in discovery — it validates *and* sells |
| **Build-vs-pitch gap** | Shipped app implements *none* of the high-delta moat (no ledger, no attribution, single-tenant; README mislabels the DB) | Honest diligence posture: rebuild ledger-first; treat current app as throwaway UI; never overstate built state |
| **Disintermediation** | Bilateral settlement between two known counterparties is structurally disintermediation-prone | Stay ledger-of-record / neutral non-custodian in Phases 1–2; capture value via subscription, not a rake |
| **Compliance becomes commoditized** | ZATCA is table-stakes; ERPs bundle e-invoicing free | Treat compliance as a time-boxed GTM *wedge*; the durable moat is the bilateral ledger underneath |

## X.4 The competitive clock

The window is real but finite. AppDirect (PartnerStack + Tackle) is assembling "get found, get chosen, get paid" with a ~138,000-partner network Reven lacks. The bilateral-reconciliation delta remains unowned even by them — but Reven must reach the Phase-1 exit gate (100+ real claims; 3–5 design partners with finance-accepted evidence packs; weekly active usage; a CFO saying "these numbers reconcile") before the convergence narrows the adjacent deltas. **Speed to the bilateral ledger is the strategy.**

## X.5 The validation plan (modeled → measured)

1. **Field the survey (Appendix C)** — 5–10 members of each design partner's buying committee rate the outcomes on Importance and Satisfaction (1–9 scale, top-box normalized). Confirm rank order, especially the 14 extreme outcomes.
2. **Instrument the gap** — deploy the reconciliation cost calculator, dispute-rate delta dashboard, cost-of-inaction baseline, pilot ROI auto-capture. These produce *the customer's own numbers* — the only defensible ROI inputs.
3. **Test the hidden segments (Part VII)** — confirm insurance over-indexes on the reverse/clawback delta, RHQ on compliance, e-commerce on status-at-volume. Re-segment if the data disagrees.
4. **Re-rank and re-price** — feed measured scores into the value pools and tier design; grandfather where price moves >15–20%.

## X.6 Hardening this analysis further (optional, available now)

Two live data sources can upgrade specific scores from *estimate* to *measured*:
- **Apollo (firmographic/persona TAM).** Defined queries would harden Part III/VII counts: (a) # of KSA companies in the ICP (B2B tech/SaaS, 50–500 employees, with channel partners), (b) population of the decisive personas (Head of Partnerships / VP Partnerships + CFO/Finance) in KSA, (c) the same for the four expansion segments. *Apollo charges 1 credit per search that returns results; a ~4–6 query batch (~4–6 credits) would size the addressable accounts and persona pool. I'll run it on your go-ahead.*
- **G2 (competitor satisfaction).** The connected account is a restricted buyer context (no catalog access), so live competitor ratings weren't retrievable this session; if a seller-scoped G2 token becomes available, the Satisfaction scores in Part V can be refreshed to live ratings, segment-filtered review counts, and current complaint themes.

## X.7 The bottom line

> Reven's market contains a **tight cluster of fourteen "extreme opportunity" outcomes (Opp 15.0–16.0)**, owned by the **CFO, the Head of Partnerships, and the Partner**, every one describing the **bilateral, finance-grade, trusted revenue ledger that no software category owns.** Customers are *already paying* to address these — in spreadsheet labor, manual WHT work, double-pay losses, and lost partners — which is the revealed proof of willingness-to-pay. ODI's pricing logic (premium where underserved; profit-share where *highly* underserved) supports capturing **10–20% of measured value at 5–10× customer ROI (sub-30 bps effective)**, accelerated by a **state-mandated compliance wedge** whose ZATCA Wave-24 deadline (30 June 2026) is imminent, and sequenced into an **IT-channel × RHQ beachhead** the segment analysis and value-pool analysis reach independently. The Expectation Delta is not diffuse, not asserted, and not evenly distributed — it is concentrated, evidenced, and pointed exactly at the seam Reven has chosen to own. The remaining work is to convert these *modeled* deltas into *measured* ones in design-partner discovery — using the very survey that closes the deal.

---
---

# APPENDIX A — Master scoring table (load-bearing outcomes, by Opportunity)

*(I, S on 0–10; Opp = I + max(I−S,0). Layer: F=functional, E=emotional, S=social, C=consumption-chain, $=financial. Bands: >15 Extreme · 12–15 Strong · 10–12 Consider · <10 Served.)*

| # | Outcome | Persona | Layer | I | S | Opp | Class |
|---|---|---|---|---:|---:|---:|---|
| 22 | Bilateral reconciliation both sides trust | CFO | F | 9.0 | 2.0 | 16.0 | Extreme |
| 17 | Attribution-of-record | Head of Partnerships | F | 9.5 | 3.0 | 16.0 | Extreme |
| 32 | Overpay/double-pay prevention | CFO | F | 9.5 | 3.5 | 15.5 | Extreme |
| 23 | Defensible partner P&L | Head of Partnerships | F | 9.0 | 2.5 | 15.5 | Extreme |
| 26 | Payout/claim status visibility | Partner | F | 9.0 | 2.5 | 15.5 | Extreme |
| 32′ | Fair, on-time, explained payment | Partner | E/S | 9.0 | 3.0 | 15.0 | Extreme |
| 38 | Fear of signing off on a wrong number | CFO | E | 9.0 | 3.0 | 15.0 | Extreme |
| 33 | WHT/VAT/ZATCA compliance | CFO | F | 9.0 | 3.5 | 14.5 | Strong |
| 7 | Contribution not recoded to "Direct" | Head of Partnerships | F | 9.0 | 3.5 | 14.5 | Strong |
| 37 | Anxiety of defending the program (QBR) | Head of Partnerships | E | 8.5 | 2.5 | 14.5 | Strong |
| 20 | Audit-ready evidence pack | CFO | F | 8.5 | 3.0 | 14.0 | Strong |
| 24 | Payout exposure/liability visibility | CFO | F | 8.5 | 3.0 | 14.0 | Strong |
| 44 | Board sees "numbers we can trust" | CFO | S | 8.5 | 3.0 | 14.0 | Strong |
| 21 | Eliminate client-supplied eligibility | CFO | F | 8.0 | 2.5 | 13.5 | Strong |
| 34 | Close with zero unreconciled claims | CFO | F | 8.5 | 3.5 | 13.5 | Strong |
| 28 | Dispute-and-resolve on the amount | Partner | F | 8.0 | 2.5 | 13.5 | Strong |
| 40 | Stop chasing finance/sales for status | Partner | E | 8.0 | 2.5 | 13.5 | Strong |
| 23b | Partner P&L to allocate against | CEO | F | 8.0 | 2.5 | 13.5 | Strong |
| 42 | Dread of tax/audit inspection | CFO | E | 8.5 | 3.5 | 13.5 | Strong |
| 27 | Capital not misallocated | CEO | F | 8.0 | 3.0 | 13.0 | Strong |
| 19 | Eligibility with explanation | Finance op | F | 8.0 | 3.0 | 13.0 | Strong |
| 13 | Contribution registered before forgotten | Partner | F | 8.0 | 3.0 | 13.0 | Strong |
| 29 | Recover commission on refunds (clawback) | CFO | F | 8.0 | 3.0 | 13.0 | Strong |
| 43 | Run a finance-grade function (perceived) | Head of Partnerships | S | 8.0 | 3.0 | 13.0 | Strong |
| 41 | Feel treated fairly | Partner | E | 8.0 | 3.0 | 13.0 | Strong |
| 5 | Determine which partners produce | Head of Partnerships | F | 8.0 | 3.5 | 12.5 | Strong |
| 6 | Capture shadow/co-sell influence | Head of Partnerships | F | 7.5 | 2.5 | 12.5 | Strong |
| 47 | Clean attribution, no CRM corruption | RevOps | C | 8.0 | 3.5 | 12.5 | Strong |
| 16 | Pay only on sufficient evidence | Finance op | F | 8.0 | 3.5 | 12.5 | Strong |
| 18 | Every decision auditable | Legal | C | 8.0 | 3.5 | 12.5 | Strong |
| 35 | Prevent audit finding/restatement | Legal | F | 8.0 | 3.5 | 12.5 | Strong |
| 49 | Data-residency/PDPL safety | IT | C | 8.5 | 4.5 | 12.5 | Strong |
| 57 | TCO vs FTE-loaded status quo | CFO | $ | 8.0 | 3.5 | 12.5 | Strong |
| 36 | Correct rev-rec (606 gross/net) | CFO | F | 8.0 | 4.0 | 12.0 | Consider |
| 46 | Attribution doesn't cut my credit | Sales | F | 8.0 | 4.0 | 12.0 | Consider |
| 2 | Attribution model perceived as fair | Head of Partnerships | F | 8.0 | 4.0 | 12.0 | Consider |
| 45 | Seen by partners as fair/transparent | Head of Partnerships | S | 7.5 | 3.5 | 11.5 | Consider |
| 25 | Partner number doesn't degrade silently | RevOps | F | 7.5 | 3.5 | 11.5 | Consider |
| 31 | Humane clawback/demotion | Partner | E | 7.0 | 2.5 | 11.5 | Consider |
| 39 | Stress of month-end close | Finance op | E | 7.5 | 3.5 | 11.5 | Consider |
| 58 | Defensible if budgets tighten | CEO | $ | 7.5 | 3.5 | 11.5 | Consider |
| 55 | Payback period on spend | CFO | $ | 7.5 | 4.0 | 11.0 | Consider |
| 51 | Duplicate-webhook corruption | RevOps | C | 7.5 | 4.0 | 11.0 | Consider |
| 50 | Cross-tenant leakage | IT | C | 8.0 | 5.0 | 11.0 | Consider |
| 48 | Integrate without brittle transfers | IT | C | 7.0 | 3.5 | 10.5 | Consider |
| 9 | Partner invite → payout-ready fast | Partner Manager | F | 7.0 | 4.0 | 10.0 | Borderline |
| 52 | Configure rules/reports without eng | RevOps | C | 7.0 | 4.0 | 10.0 | Borderline |
| 8 | Dedup partners/accounts across systems | RevOps | C | 7.0 | 4.0 | 10.0 | Borderline |
| 12 | Grant/track protection window | Partner Manager | F | 7.0 | 4.5 | 9.5 | Served |
| 54 | Export history on exit | Legal/IT | C | 6.5 | 4.0 | 9.0 | Served |
| — | Confirm/challenge attribution fast | Sales | F | 6.5 | 4.5 | 8.5 | Served |
| 1 | Design tier economics w/o rework | Head of Partnerships | F | 6.5 | 4.5 | 8.5 | Served |
| 53 | Onboard compliant local vendor | Procurement | C | 6.5 | 5.0 | 8.0 | Served |
| 3 | Settle internal-comp stance | CRO | F | 6.0 | 4.5 | 7.5 | Served |

*Emotional/social/consumption-chain and segment-variant refinements (outcomes 4, 10, 11, 14, 15, 30, 56 and the ~59 segment variants) complete the 117; they cluster in the Strong/Consider bands and are enumerated where they bind in Part VII.*

# APPENDIX B — Per-segment delta summary

See Part VII.1 for the full shift matrix. Headlines:
- **IT-channel × RHQ:** bilateral reconciliation, WHT/ZATCA, multi-entity, FX all over-index → **recommended beachhead**.
- **Fintech/regulated:** compliance, audit, residency over-index; longest sales cycle → sequence after a reference.
- **Insurance:** reverse/clawback path over-indexes ▲▲▲ (it *is* the business model) → a wedge of its own.
- **E-commerce 3P:** status-at-volume, attribution-at-volume, FX over-index; price-sensitive → price for scale.
- **Family conglomerate:** multi-entity reconciliation over-indexes ▲▲▲; highest ACV, lowest CAC → best economics post-reference.

# APPENDIX C — The discovery survey instrument (field this to validate)

**Purpose:** convert the modeled scores above into measured ones for a specific account, and produce that account's own business case.

**Sample design:** 5–10 respondents per design partner, spanning the buying committee (≥1 each: Head of Partnerships, CFO/Finance, RevOps, a partner-facing operator; ideally 1–2 external partners). Target 3–5 design partners → n ≈ 30–50.

**Scale & method:** for each outcome, two questions —
- *Importance:* "How important is it that you achieve this outcome?" (1–9; 9 = critically important)
- *Satisfaction:* "How satisfied are you with how well you achieve it today?" (1–9; 9 = completely satisfied)
Compute top-box % (ratings 7–9), normalize to 0–10, then **Opp = I + max(I−S, 0)**. Rate Satisfaction only on outcomes scored Importance ≥ 7 (avoids range restriction).

**Core items (rate each; abbreviated — use full ODI grammar in the field version):**
1. Determine which revenue a partner actually drove, defensibly.
2. Reconcile partner payouts to one record both finance teams trust.
3. Prevent overpaying or double-paying a partner.
4. Produce a partner P&L leadership trusts at budget time.
5. Know the status of a partner's deal/claim/payout at any time.
6. Pay partners on time, in full, with an explanation.
7. Keep partner payouts WHT/VAT/ZATCA-compliant.
8. Assemble an audit-ready evidence pack per claim.
9. Know current partner-payout exposure at any moment.
10. Avoid signing off on a partner number that later proves wrong.
11. Capture partner shadow/co-sell influence.
12. Prevent partner-sourced deals being recorded as "Direct."
13. Determine eligibility with a clear explanation of the rule applied.
14. Dispute and resolve a disagreement over the *amount* of a split.
15. Recover commission when a sale is refunded/cancelled (clawback).
16. Close partner revenue at period-end with zero unreconciled claims.
17. Keep partner attribution clean without corrupting CRM.
18. Make every partner-revenue decision auditable/traceable.
19. Keep partner-revenue data in-Kingdom / PDPL-compliant.
20. Avoid misallocating capital to partner programs that can't prove return.
21. *(emotional)* Reduce the anxiety of defending the program at the QBR.
22. *(emotional)* Reduce the dread of a tax/audit inspection on payouts.
23. *(social)* Be seen as running a finance-grade partner function.
24. *(financial)* Achieve payback on the tooling spend within N months.
25. *(financial)* Lower total cost vs the FTE-loaded manual status quo.

**Output per account:** a ranked Opportunity table (their numbers), the top-5 deltas, and a three-number business case (hours saved, penalties/errors avoided, leakage recovered) for the one-slide close.

# APPENDIX D — Evidentiary sources

**Methodology (ODI/JTBD):** Strategyn / Tony Ulwick (Opportunity Algorithm, scoring bands, outcome-statement grammar, job-stakeholder + needs framework); Bettencourt & Ulwick, "The Customer-Centered Innovation Map," *HBR* (May 2008); Christensen & Moesta (progress, hire/fire, Forces of Progress). *Primary Strategyn/Ulwick pages were 403-blocked in research; formula, bands, grammar corroborated across multiple independent secondary sources.*

**Competitive satisfaction (S scores):** G2/Capterra/Trustpilot ratings & complaint themes — Tipalti (G2 4.5/411), WorkSpan (4.3/29), Trolley (4.5/47; Trustpilot ~2.0), PayPal Payouts (under "PayPal Payments" 4.5/2,855; Trustpilot ~1.2), CaptivateIQ (4.7/3,460), Salesforce Spiff (4.5/3,063), Everstage (4.8), Xactly (4.2–4.3), Crossbeam, PartnerStack, Impartner ($25/45/75K). Xactly dispute tool "not more than a mailbox"; Tipalti pushes disputes to customer; Trolley/PayPal "where is my money." *Review sites 403-blocked to direct fetch and to the connected G2 buyer account; ratings via web-search snippets — verify before external publication.*

**Problem size (directional, flagged):** Accenture (~10% indirect-channel incentive overspend); CaptivateIQ 2025 (66% over/under-paid commissions); CSO Insights (62.4% run incentive comp on spreadsheets/manual); Canalys (>70% of $4.7T IT market via partners; cloud marketplaces →$85B by 2028); Crossbeam (partner-sourced revenue = #1 KPI at 67%; deals 46% faster/53% more likely with a partner); Gartner (75% of high-growth firms on RevOps by 2025); Forrester (PRM →$889M by 2025, "beyond PRM"); IDC/Microsoft (partners earn $8.45 services/$10.93 software per $1); IDC/HubSpot ($5.60 per $1; $42B ecosystem by 2030); McKinsey (ecosystem economy ~$60T→$70–100T by 2030); MGI Research (1–5% revenue billing leakage). *Reven's corpus forbids the fabricated "EY 1–5% EBITDA," "~24% median partner revenue," "42% of CFOs" — excluded.*

**Market / ACV:** PRM software ~$3–4B (software-pure) at ~14–16% CAGR (GVR broad $90B envelope); partner-ecosystem platforms ~$5–6B; ICM/SPM ~$2.3–3.5B; revenue mgmt/rec ~$3.2–4.8B; ACV triangulation $25–50K (PRM ~$32.5K, ICM ~$41K, vertical-SaaS $25–50K). Impartner $25/45/75K; Crossbeam Connector $4.8K; Kiflo $1.8–8.4K.

**KSA context:** ZATCA Phase 2 Wave 24 (>SAR 375K, deadline 30 Jun 2026; clearance model; fines SAR 5–50K/violation); WHT 15%/5%/20%; VAT 15%; PDPL (penalties to SAR 5M); RHQ program (~600+ established; mandatory for gov contracts >SAR 1M; 0% CIT/WHT 30 yrs); IKTVA (Aramco 70% target reached Feb 2026); franchise registrations +866% (2021→2024); SAMA/SARIE/sarie/mada rails; Stream & Lean as local billing-infra analogs; Vision 2030 (65% private-sector / 35% SME GDP targets; digital economy ~15.6% of GDP). *Many .gov.sa/analyst pages 403-blocked; load-bearing figures (ZATCA deadline, RHQ counts, WHT rates) corroborated across ≥2 sources — re-verify against primaries for external use.*

**Internal corpus (I scores & value model):** Reven PDR v5, Reverse-Engineered Strategy, PERM Category Deep-Dive, Saudi Value Pool & ICP, GTM / Onboarding / CFO / Cadence / Integration manuals, Pricing & Commercial Strategy + Red Team + Deep Research, 100/1000 Strategic Implications, Pre-Seed 2M SAR Blueprint.

---

*Prepared as a modeled ODI analysis (comprehensive edition). Scores are evidence-anchored estimates intended to be validated with the Appendix-C survey during design-partner discovery. Rank order is high-confidence; absolute scores are moderate-confidence. All external statistics are flagged by strength; the ROI case must ultimately rest on each customer's own measured pilot numbers. Currency: USD/SAR ≈ 3.75.*


