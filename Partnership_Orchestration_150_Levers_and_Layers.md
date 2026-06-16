# Partnership Orchestration & Ecosystem-Led Business Models

## 150 Levers & Layers — a deep, externally-grounded analysis for the Revenue-Sharing Product (Reven / Partner Revenue OS)

**Purpose.** Map every lever a revenue-sharing platform can pull to *manage a partnership internally* (inside the company that runs the program) and *orchestrate it externally* (advance the partnership outward — to the partner, the co-sell motion, and the wider ecosystem). Each lever ties to (a) a cited external framework/practice, (b) the product's own model (the 22-phase workflow, the Capture→Settle→Orchestrate roadmap, the 7-Powers moat map), or both.

**Evidence discipline (per the user's instruction — don't invent, don't hallucinate).**
- `[ext]` = grounded in a named external source (academic or industry). `[repo]` = grounded in this repository's own strategy/product model. `[ext+repo]` = both.
- Direction tags: **(I)** internal management lever · **(E)** external orchestration lever · **(I/E)** spans both.
- Confidence on numbers: figures are tagged `[vendor]` (vendor self-report / advocacy, directional only), `[analyst]` (named analyst firm), `[primary]` (regulator/marketplace/standard), or `[indicative]` (practitioner rule-of-thumb, unverified primary). **Several headline stats could not be fully verified at source** — see the Verification Appendix; nothing here invents a number.
- The single most important correction surfaced by the research: the often-quoted *"~a quarter of partner deals get misbooked as direct"* figure **could not be confirmed in any retrieved source**. "Partner Attribution Leak" is real and named (Magentrix) but should be cited *qualitatively*, not as a percentage.

**Source legend (full URLs in the Sources section):** Canalys/Omdia *Channels Ecosystem Landscape*; Gartner *PERM Market Guide* (Sept 2025); Forrester *State of Partner Ecosystems 2025*; IDC ecosystem-orchestration prediction; Crossbeam/ELG Insider; Reveal / Nearbound (Fuller & Rowley); PartnerStack, Tipalti, Trolley, Magentrix, Impartner, HubSpot, Veeam; AWS/Azure/GCP Marketplace docs; IFRS 15 / ASC 606 / ASC 340-40; and the strategy classics — Jacobides–Cennamo–Gawer (2018), Adner (2012/2017), Iansiti & Levien (2004), Williamson & De Meyer (2012), Rochet–Tirole (2003), Eisenmann–Parker–Van Alstyne (2006/2011), Parker–Van Alstyne–Choudary (2016), Gawer & Cusumano (2002), Ghazawneh & Henfridsson (2010/2013). Repo: `workflow.mjs`, `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md`, `Partner_Revenue_OS_Venture_Scale_Narrative.md`.

---

## The 12 layers (the "stack")

| # | Layer | Governs | I/E balance |
|---|---|---|---|
| 1 | Ecosystem Strategy & Orchestration Design | Why the program exists; the orchestrator's role & value architecture | Mostly **I**, sets up **E** |
| 2 | Partner Segmentation, Roles & Archetypes | Who is in the ecosystem and what role each plays | **I/E** |
| 3 | Partner Lifecycle, Sourcing & Onboarding | Getting partners in, activated, and operating-record-clean | **I**, partner-facing **E** |
| 4 | Enablement, Certification & Partner Experience | Making partners able and willing to contribute | **E**, measured **I** |
| 5 | Ecosystem Touchpoints, Attribution & Credit | Who actually drove which revenue — the defensible truth | **I/E** |
| 6 | Co-Sell, Marketplace & Ecosystem-Led Growth | Advancing deals *with and through* partners | **E** |
| 7 | Revenue-Sharing & Incentive Commercial Design | What gets paid, to whom, for what behavior | **I/E** |
| 8 | Deal Registration, Protection & Channel-Conflict Governance | Property rights over opportunities; conflict control | **I/E** |
| 9 | Settlement, Reconciliation & the Bilateral Ledger | The shared, auditable money-of-record between two firms | **I/E** |
| 10 | Finance, Tax, Compliance & Revenue Recognition | CFO-grade correctness and audit defensibility | **I** |
| 11 | Data, Identity, Integration & Platform Architecture | The substrate; cross-tenant identity; boundary resources | **I/E** |
| 12 | Governance, Trust, Neutrality, Network Effects & Measurement | The moat layer; the Partner P&L; the network | **I/E** |

---

## LAYER 1 — Ecosystem Strategy & Orchestration Design
*Governs why the program exists and what role the company plays in the ecosystem. Without this layer, every lever below optimizes a program that may not deserve to exist.*

- **1. Program thesis tied to a commercial constraint (I)** `[repo]` — Phase 1 of the workflow ("Define Partner Strategy & Program Thesis") forces the program to be tied to a *measurable* constraint (pipeline gap, CAC, coverage), not "we should have partners." Rationale: a revenue-sharing tool that can't state the constraint it relieves can't price itself or defend its budget.
- **2. Orchestrator-vs-builder choice (I)** `[ext]` — Williamson & De Meyer's first key: *pinpoint where value is created* before deciding what to own vs. orchestrate. Rationale: the product should make explicit which activities the company keeps (claim/attribution/settlement) and which it orchestrates to partners — this is the strategic spine of the whole stack.
- **3. "Smart power" / indirect coordination posture (I/E)** `[ext]` — Williamson & De Meyer: the orchestrator leads a *loosely-coupled* network through influence, not command-and-control. Rationale: a rev-share platform governs parties it doesn't employ; design for incentive-alignment and transparency, not mandates.
- **4. Architecture of differentiated partner roles (I/E)** `[ext+repo]` — W&DM's second key + workflow Phase 2 ("Segmentation & Ecosystem Map"). Rationale: attribution and payout rules are only coherent once each partner has a distinct, non-overlapping role — the foundation everything downstream depends on.
- **5. Stimulate complementary partner investments (E)** `[ext]` — W&DM third key; ties to Jacobides' *non-generic complementarities*. Rationale: the program should reward partners for co-specialized investment (integrations, certifications, joint solutions), because non-redeployable investment is what makes the ecosystem sticky.
- **6. Value architecture (activities · actors · positions · links) (I)** `[ext]` — Adner's *Ecosystem as Structure*: a value proposition materializes only when partners align on activities, positions, and the links (matériel, information, influence, **funds**) between them. Rationale: Reven literally instruments one of Adner's four link types — *funds* — and should model the other three as context.
- **7. Minimum Viable Ecosystem (MVE) (I)** `[ext]` — Adner: the smallest partner configuration that delivers value and can scale. Rationale: maps to the MVP wedge — don't try to govern the whole ecosystem at launch; govern the claim for the smallest viable set.
- **8. Co-innovation & adoption-chain risk mapping (I)** `[ext]` — Adner's two ecosystem risks. Rationale: a partner program can be "sold" but stall because a dependency isn't ready (co-innovation) or an intermediary won't adopt (adoption-chain); the product's onboarding/activation telemetry is where these risks show up early.
- **9. Keystone (not dominator) positioning (I/E)** `[ext]` — Iansiti & Levien: keystones create *and* share value and improve ecosystem health; dominators over-capture and drain it. Rationale: a neutral revenue-share system-of-record must visibly *share* value (fair attribution, transparent statements) to avoid being seen as a value-dominator chokepoint.
- **10. Ecosystem health as a north-star (I)** `[ext]` — Iansiti & Levien's three measures: *productivity, robustness, niche creation*. Rationale: gives the Partner P&L (Layer 12) a richer scorecard than revenue alone — is the ecosystem getting more efficient, more resilient, more diverse?
- **11. Customer-led ecosystem orchestration as market direction (I)** `[ext]` — IDC predicted "70% of vendors pursuing a customer-led ecosystem orchestration strategy by 2025" `[analyst — stat verified, exact pub date unconfirmed]`. Rationale: positions the product on the side of where analysts say the market is heading, not against it.
- **12. Counter-positioning as day-one power (I)** `[repo]` — 7-Powers map: *counter-positioning* (compliance-native, finance-grade handling incumbents won't copy without cannibalizing their transaction model) is available immediately. Rationale: the strategy layer should bake the moat in from screen one, not bolt it on.
- **13. Phase discipline / premature-scaling guard (I)** `[repo]` — Capture→Settle→Orchestrate with hard exit gates (100+ real claims; CFO-accepted evidence pack). Rationale: the strategy layer must prevent building Phase-2 settlement before Phase-1 capture earns the right — a governance lever on the company itself.
- **14. Category posture: "the money-layer SoR," not "orchestration" banner (E)** `[repo]` — explicit positioning discipline: don't plant the "partnership orchestration" flag (Crossbeam owns ELG); position adjacent as the revenue/settlement system-of-record the ecosystem runs on. Rationale: avoids a category fight you can't yet win while still capturing the orchestration *function*.

---

## LAYER 2 — Partner Segmentation, Roles & Archetypes
*Governs who is in the ecosystem and how the system models them. Attribution, rules, and rev-share are undefinable until roles are.*

- **15. Canonical partner-type taxonomy (I/E)** `[ext]` — referral, affiliate, reseller/VAR, distributor, MSP, ISV/tech, SI/GSI, OEM, agency, alliance, marketplace/CSP (Crossbeam, TD SYNNEX, PartnerStandard). Rationale: the product's data model must represent each type's distinct economics, or it silently forces everyone into a "reseller" shape (the incumbent failure mode).
- **16. Forrester build / sell / service / influence framing (I/E)** `[ext]` — partners grouped by motion: *build* (ISV/co-innovation), *sell* (resellers/MSPs), *service* (SI/GSI/consultants), *influence* (referral/affiliate/advocate/alliance). Rationale: a clean four-quadrant model that maps directly to which contribution each partner can claim.
- **17. Transacting vs non-transacting split (I/E)** `[ext]` — Forrester: ecosystems span transacting channels and a fast-growing non-transacting "influencer" channel ("nontransacting partners entering the market far outweigh traditional resale-type partners"). Rationale: rev-share for *influence* (not just resale) is exactly the white space Reven targets.
- **18. Trifurcated channel: influencer / transactional / retention (E)** `[ext]` — Forrester's pre-/at-/post-transaction split. Rationale: justifies paying partners for *retention* contribution (Layer 5/12), not just sourcing — a lever incumbents under-serve.
- **19. Multi-role / coopetition representation (I)** `[ext+repo]` — Jacobides' multilateral dependence; the same partner can be reseller on one deal and co-seller on another. Rationale: the claim object must allow one partner to hold different roles per opportunity — legacy PRM assumes a single downstream role.
- **20. Partner fit/qualification scorecard (I)** `[repo]` — workflow Phase 4 scores strategic fit and risk (reject / park / nurture / pilot / approve). Rationale: governs which partners even enter the rev-share ledger; keeps the ecosystem's *productivity* (lever 10) high.
- **21. Tier model (Registered → Silver → Gold → Platinum) (I/E)** `[ext]` — keyed to revenue, certs, CSAT, business-planning commitments (Magentrix; HubSpot's Gold→Elite). Rationale: tiers are the throttle that ties benefits/discount/MDF eligibility to demonstrated contribution.
- **22. Tier thresholds & "tiering compliance" (I)** `[ext]` — illustrative thresholds (~$500K/2 certs Silver; ~$1M/5 certs Gold) and the risk of partners holding a tier without sustaining performance (Unifyr) `[indicative]`. Rationale: the system should continuously re-test tier eligibility, not grant it permanently.
- **23. Strategic alliance vs long-tail segmentation (I/E)** `[ext]` — keystone/niche logic (Iansiti & Levien): a few keystone alliances vs many niche players need different governance and economics. Rationale: don't apply enterprise-alliance overhead to a long-tail affiliate, or vice-versa.
- **24. Partner concentration & risk mapping (I)** `[repo]` — the cadence's monthly "concentration risk" review and `partner_concentration_risk_map` screen. Rationale: a rev-share book over-dependent on one partner is a finance risk; segmentation must surface it.
- **25. Ecosystem map / "who do we both serve" (E)** `[ext]` — Canalys "data and mapping" + "recruitment and visualization" categories; Crossbeam account mapping. Rationale: segmentation isn't only internal taxonomy — it's the external overlap graph that powers co-sell (Layer 6).

---

## LAYER 3 — Partner Lifecycle, Sourcing & Onboarding
*Governs getting partners in, activated, and into a clean operating record. The internal "factory" that feeds the ecosystem.*

- **26. Canonical lifecycle model (I)** `[ext]` — Recruit → Onboard → Activate → Enable → Engage/Scale → Grow → Renew/Offboard (Kiflo, Impartner, Introw, PartnerStack). Rationale: every lifecycle stage is a state in the partner record; the product should make stage transitions explicit and measurable.
- **27. Governed sourcing & intake (source + owner + dedupe) (I)** `[repo]` — workflow Phase 3 captures every potential partner with source and owner *before commitments become informal*. Rationale: the #1 hygiene failure is partners that exist in someone's inbox but not the system; intake is where attribution integrity begins.
- **28. Approval matrix & delegation of authority (I)** `[repo]` — Phase 5 formal approval via approval matrix/legal/finance. Rationale: a rev-share obligation is a financial liability; who can create one must be governed like any spend authority.
- **29. Agreement → executable rulebook (I/E)** `[ext+repo]` — Phase 6 translates legal/commercial terms into *versioned, executable* rules. Rationale: the contract is the source of truth for payout; if it isn't machine-executable and versioned, every payout is a manual reinterpretation (and a dispute waiting to happen).
- **30. Onboarding speed as an activation driver (I/E)** `[ext]` — best-in-class onboarding cited at 7–14 days; <30% activation "signals systemic onboarding failure" `[indicative]`. Rationale: time-to-first-claim is the product's leading indicator (repo targets <14 days); onboarding friction directly suppresses ledger volume.
- **31. Activation rate as the core lifecycle metric (I)** `[ext]` — % of signed partners who reach "active" (first login / first deal / first sale); >40% early-stage, >60% mature `[indicative/vendor]`. Rationale: "the gap between signed and active is the most common, quietly expensive problem in channel programs" — the product should make it impossible to ignore.
- **32. 90-day activation window / time-to-first-deal (I)** `[ext]` — partners registering a first deal within 30 days are "4–5× more likely to remain active at 12 months" `[vendor, unverified primary]`. Rationale: directional but actionable — instrument the first-claim clock and intervene inside the window.
- **33. Partner readiness scoring (I)** `[ext]` — weighted model (training 30% / cert 25% / resources 20% / marketing 15% / process 10%) (ZINFI-class). Rationale: a single readiness score gates access to leads, deal-reg, and higher rev-share — turning enablement into an economic gate.
- **34. Self-service partner portal (E)** `[ext]` — branded hub for training, collateral, deal-reg, statements (PRM core). Rationale: the external face of the program; for Reven the highest-value portal surface is the *statement/claim status* view (Phase 18), not generic collateral.
- **35. Lead distribution / routing (E)** `[ext]` — auto-route leads by geo, specialization, tier, capacity (PRM core). Rationale: a fairness lever — routing rules are an early, visible test of whether the orchestrator is a neutral keystone (lever 9).
- **36. Offboarding & deactivation with history retention (I)** `[ext+repo]` — lifecycle endpoint; append-only ledger means rip-out loses history. Rationale: offboarding a partner must preserve the immutable claim/settlement record for audit and clawback — a switching-cost and compliance lever at once.
- **37. Cross-tenant partner identity seeded at onboarding (I/E)** `[repo]` — Phase-1 "build cross-tenant partner identity" even before the network exists. Rationale: the terminal network moat (Layer 12) is impossible to retrofit; seed the identity primitive during onboarding from day one.
- **38. Integration & data-foundation setup (I)** `[repo]` — Phase 7 prepares CRM/ERP/billing data and monitors sync health. Rationale: onboarding the *partner* and onboarding the *data* are different jobs; the latter determines whether claims can ever be validated against real revenue.

---

## LAYER 4 — Enablement, Certification & Partner Experience
*Governs whether partners are able and willing to contribute correctly. Mostly external (partner-facing), measured internally.*

- **39. Role-based enablement & playbooks (E)** `[ext]` — seller/SE/marketer certification tracks, segmented training (Highspot, Partnership Leaders). Rationale: enabled partners produce cleaner claims (right product, right attribution), reducing downstream disputes.
- **40. Certification gating (E)** `[ext]` — HubSpot requires a valid cert with re-certification every 25 months; "certified partners generate up to 6× more revenue" `[vendor, primary unverified]`. Rationale: even if the 6× is directional, certification is a low-cost gate that correlates with quality — wire it to tier and rev-share.
- **41. "Better-together" solution enablement (E)** `[ext]` — Jacobides' supermodular complementarity: teach partners the joint value, not just the product. Rationale: drives co-specialized investment (lever 5) that makes the partnership non-redeployable.
- **42. Ease-of-Doing-Business (EoDB) as a design principle (E)** `[ext]` — repeatedly cited *above* short-term profitability in partner vendor choice; "fewer clicks, fewer logins… ease will win" (PartnerStack, Impartner). Rationale: for a multi-stakeholder finance product, partner-side simplicity is a competitive weapon — the partner's only job should be a clean claim + a clear statement.
- **43. Friction telemetry (login ≠ engagement) (I)** `[ext]` — "if partners log in but don't register deals, that's a friction problem" (Impartner). Rationale: the product should distinguish *presence* from *contribution* and alert on the gap.
- **44. Partner NPS / satisfaction (I)** `[ext]` — PX metric set (Partner NPS, retention, portal adoption, deal velocity). Rationale: a leading indicator of partner churn and of whether the orchestrator is trusted (Layer 12).
- **45. Transparent statements as an experience lever (E)** `[repo]` — Phase 18 partner statement view (status on claims, payout eligibility, disputes). Rationale: the single biggest partner-trust lever in a rev-share product is *"can the partner see, at any moment, what they earned and why"* — opacity is the root of partner churn.
- **46. Partner communication & expectation-setting (E)** `[ext]` — Canalys PRM "communication" activity. Rationale: protection-window expiry, claim-status changes, and payout timing must be proactively communicated or they become disputes.
- **47. Joint business planning / QBRs (I/E)** `[ext]` — tier-linked business reviews (Magentrix Platinum QBR). Rationale: the cadence ritual where the Partner P&L (Layer 12) is shared and next-period investment is agreed — a switching-cost-building habit.
- **48. Through-Channel Marketing Automation (TCMA) (E)** `[ext]` — co-branded campaign execution (Canalys/Forrester TCMA category). Rationale: adjacent to Reven's core but a source of *influence* touchpoints (Layer 5) that should be captured as attributable activity.
- **49. Enablement-to-economics link (I)** `[ext]` — readiness score (33) → tier (21) → rev-share (Layer 7). Rationale: the product's differentiation is making enablement *economically consequential*, not a content library — close the loop from training to payout eligibility.
- **50. Partner-experience instrumentation as a data asset (I)** `[ext+repo]` — PX signals feed the identity-resolution/contribution graph. Rationale: every enablement and engagement event is a touchpoint that improves attribution accuracy and seeds the data moat.

---

## LAYER 5 — Ecosystem Touchpoints, Attribution & Credit Allocation
*The heart of the product: who actually drove which revenue, defensibly. This is the binding constraint the venture thesis is built on.*

- **51. The Partner Revenue Claim as the atomic object (I/E)** `[repo]` — the canonical record binding partner, deal, role, agreement, protection window, attribution decision, evidence, revenue status, payout eligibility, approvals, disputes. Rationale: the entire platform is "govern one object well"; the claim is the unit of property-rights and the unit of payment.
- **52. Sourced / influenced / won-with separation (I)** `[ext]` — three buckets that must be cleanly separated; "influenced" requires judgment, which is where misbooking concentrates (Unifyr, PartnerStack). Rationale: the product must make the *influenced* bucket auditable, because that's both the largest white space and the easiest to game.
- **53. One "Attribution of Record" (I)** `[repo]` — Phase 12: a single human-decided attribution of record (model stubbed in MVP). Rationale: finance needs *one* defensible answer per claim, not a dashboard of competing models — the "of record" discipline is what makes it audit-grade.
- **54. Ecosystem touchpoint ledger (I/E)** `[repo]` — Phase 9 captures partner actions across the journey, *before/around* a formal claim. Rationale: multi-touch attribution is impossible without first capturing the touchpoint graph; capture precedes scoring (the deliberate sequence).
- **55. Multi-touch / contribution scoring (I)** `[ext+repo]` — Phase 13 advanced attribution; Shapley-style fair credit as the premium layer. Rationale: first-/last-touch is "arbitrary and incentive-distorting"; contribution-fair credit is the defensible position incumbents can't credibly claim — but it's also the hardest layer (execution risk concentrates here).
- **56. Protection windows as audited property rights (E)** `[repo]` — Phase 12 applies protection over account/opportunity/region with expiry. Rationale: reframes "deal registration" from a land-grab into an *audited right* with a clear start, scope, and expiry — a fairness and conflict-reduction lever.
- **57. Duplicate / conflict detection at preflight (I)** `[repo]` — Phase 11 claim preflight validates completeness, duplicates, agreement gaps, protection conflicts *early*. Rationale: catching conflicts before attribution is decided is far cheaper than resolving disputes after payout.
- **58. "Partner Attribution Leak" as a problem frame (I/E)** `[ext]` — the silent loss of partner credit via brittle field-mapping CRM↔PRM integrations (Magentrix). **No verified % exists** — cite qualitatively. Rationale: a strong qualitative pain narrative for discovery; do not attach a fabricated percentage to it.
- **59. Rep-behavior counter-incentive (I)** `[ext]` — direct reps avoid tagging partners to keep credit; if partners fear reclassification they "stop sourcing" (Unifyr, PartnerStack). Rationale: the product must make partner-tagging the path of least resistance and make reclassification visible/contestable, or attribution data decays.
- **60. Attribution timing: at creation, not at close (I)** `[ext]` — "attribution gets set at close more often than at deal creation," making data reverse-engineered/unreliable (Forecastable). Rationale: capturing attribution at claim creation (Phase 10) is a structural fix to a known data-quality failure.
- **61. CRM link & write-back (I/E)** `[repo]` — Phase 14 matches claims to CRM accounts/opportunities, writes back partner fields, monitors sync. Rationale: the overlay must keep CRM as the opportunity SoR while injecting the partner-revenue truth CRM structurally lacks.
- **62. Contestability / appeal of attribution (E)** `[ext+repo]` — disputes workflow (Phase 19) lets partners contest credit with an audit trail. Rationale: contestable attribution is what makes it *fair* (keystone behavior, lever 9) and what makes the data trustworthy over time.
- **63. Account mapping / overlap data as attribution input (E)** `[ext]` — Crossbeam-style overlap identifies where partner influence already exists. Rationale: external overlap signal is one of the cleanest *influence* inputs; integrating it strengthens the influenced-bucket case (lever 52).
- **64. Evidence binding per touchpoint (I)** `[repo]` — each claim/touchpoint carries sourced evidence toward the finance evidence pack (Phase 17). Rationale: attribution that can't be evidenced isn't finance-grade; bind proof at capture, not at audit time.

---

## LAYER 6 — Co-Sell, Marketplace & Ecosystem-Led Growth
*Governs advancing deals with and through partners — the external orchestration engine.*

- **65. Ecosystem-Led Growth (ELG) motion (E)** `[ext]` — turning the partner ecosystem into a scalable revenue source via overlap data, intros, co-sell (Crossbeam). Rationale: ELG is the demand-side motion that *produces* the claims Reven governs; the product should ingest ELG signals, not compete with them.
- **66. Account mapping / overlap intelligence (E)** `[ext]` — the foundational ELG data layer ("who do we both know"). Rationale: overlap is the trigger for co-sell and a high-quality influence signal for attribution (lever 63).
- **67. Ecosystem-Qualified Lead (EQL) (E)** `[ext]` — a prospect already using a partner's product (clearer intent/budget/timeline); claimed faster conversion `[vendor]`. Rationale: EQLs are a distinct claim type with their own economics; model them rather than flattening into "referral."
- **68. Nearbound motion (E)** `[ext]` — "outbound targets, inbound attracts, nearbound *surrounds* the customer" (Fuller & Rowley). Rationale: names the strategy where partners validate the vendor inside the buyer's evaluation — high-leverage influence that deserves attributable credit.
- **69. Partner-sourced vs partner-influenced pipeline (I/E)** `[ext]` — distinct pipeline categories with distinct value (Crossbeam case studies, e.g., Pigment 16% sourced `[vendor]`). Rationale: separating the two is both an attribution requirement (Layer 5) and a co-sell reporting need.
- **70. Lifecycle co-sell (prospect → land → expand → retain) (E)** `[ext]` — partners help at every stage, not just sourcing (Reveal). Rationale: justifies rev-share for expansion and retention contribution — the trifurcated model (lever 18) made operational.
- **71. Hyperscaler co-sell registration (ACE / Partner Center) (E)** `[ext]` — AWS ACE referral motions; Azure co-sell tiers (Listed → Co-Sell Eligible → IP Co-Sell Eligible). Rationale: hyperscaler co-sell is where the largest co-sell claims now originate; the product must ingest these as first-class claim sources.
- **72. Marketplace private offers (CPPO / MPO) (E)** `[ext+primary]` — channel-partner private offers (AWS CPPO; Azure Multiparty Private Offers). Rationale: each private offer is a *multi-party* revenue-split event — precisely the bilateral settlement Reven targets in Phase 2.
- **73. Committed-spend drawdown (EDP / MACC) awareness (I/E)** `[ext+primary]` — marketplace purchases retire the customer's cloud commitment; MACC counts 100% of eligible sales. Rationale: this is *why* buyers route through marketplace; the product's revenue base must read the marketplace transaction, not CRM's gross.
- **74. Marketplace take-rate modeling (I)** `[primary]` — AWS Jan-2024 tiered fees (3% / 2% / 1.5% by TCV; 20% server; +0.5% CPPO; 1.5% renewal); Azure ~3% (1.5% renewal); GCP ~3% (cut from 20% in 2021). Rationale: the platform fee changes the net split; rev-share math is wrong if it ignores the marketplace's cut.
- **75. Co-sell economics / uplift evidence (E)** `[ext/analyst]` — Forrester TEI (AWS-commissioned): marketplace deals ~80% larger, +27% win rate, ~40% faster `[analyst, sponsor-biased]`; Crossbeam network +11.7% avg win-rate lift `[vendor]`. Rationale: the ROI story for co-sell; use the named-analyst figures, flag sponsor bias, avoid the un-sourced ones.
- **76. Marketplace growth as market timing (E)** `[ext/analyst]` — Omdia: hyperscaler marketplace software $30B (2024) → $163B (2030), 29.1% CAGR `[analyst]`. Rationale: the strongest, named third-party "why now" for the co-sell/settlement layer.
- **77. Co-sell handoff & warm-intro orchestration (E)** `[ext]` — partner stays in the deal providing intel/influence/intros (Reveal). Rationale: the handoff is a touchpoint to capture; orchestrating it well is where "influenced" credit is earned and proven.
- **78. Neutrality vs marketplace-cut conflict (I/E)** `[ext+repo]` — AppDirect/marketplaces take a cut → structurally non-neutral; Reven's edge is being the neutral ledger both sides trust. Rationale: the external orchestration value prop is *Switzerland* — a settlement SoR a conflicted marketplace can't credibly be.

---

## LAYER 7 — Revenue-Sharing & Incentive Commercial Design
*Governs what gets paid, to whom, for what behavior. The lever set that most directly shapes partner behavior — and overpayment risk.*

- **79. Compensation structure per partner type (I/E)** `[ext]` — referral % (~20–25% typical `[vendor]`), reseller margin/discount (20–40% `[vendor]`), distributor (8–15% `[indicative]`), co-sell commission (8–12% ACV `[vendor]`). Rationale: a rev-share engine must natively support each structure; one rate card can't fit referral + resale + co-sell.
- **80. Recurring vs one-time commission (I)** `[ext]` — % of ARR/MRR over life vs one-time bounty; recurring aligns to retention. Rationale: as revenue goes continuous (usage pricing), one-time payout structurally breaks — the product's thesis; rev-share must be computable continuously.
- **81. Tiered accelerators (I)** `[ext]` — rate steps up with attainment (e.g., 5%→7%→10%); ~82% of SaaS use accelerators `[vendor]`. Rationale: drives overperformance; the rule engine must express thresholds and accelerators as versioned rules (lever 29).
- **82. Clawback rules & windows (I/E)** `[ext]` — recover paid commission on cancellation/non-payment/early churn; windows 60/90/180 days; >50% of SaaS use clawbacks `[vendor]`. Rationale: clawback is where rev-share meets revenue-recognition risk; the ledger must support clawback-by-netting (Phase-2 design).
- **83. Clawback vs chargeback mechanics (I)** `[ext]` — clawback = funds returned; chargeback = deducted from future earnings; a bank chargeback is a "forced clawback of recognized revenue." Rationale: distinct ledger events with distinct accounting; conflating them corrupts both the payout and the books.
- **84. SPIFFs / targeted bonuses (E)** `[ext]` — short-term incentive on a product/behavior; risks: dilution, deal-splitting, entitlement if perpetual (Unifyr, Everstage). Rationale: useful behavior nudges, but the product should cap concurrent SPIFFs and flag gaming.
- **85. Margin-stacking controls (I)** `[ext]` — base discount + deal-reg uplift + rebate + MDF + SPIFF can compound past intended margin; mitigate with per-tier max-margin caps (Unifyr). Rationale: overpayment usually comes from *stacking*, not any single lever; the engine needs explicit stacking rules.
- **86. Partner-CAC guardrail (I)** `[ext]` — rule-of-thumb: partner-assisted CAC < ~40% of first-year ACV `[indicative]`. Rationale: a unit-economics governor that ties incentive design back to the Partner P&L (Layer 12).
- **87. MDF / co-op funds (I/E)** `[ext]` — accrual co-op (1–3% of purchases, backward-looking) vs proposal-based MDF (forward, discretionary); ~28% run a hybrid `[vendor]`. Rationale: MDF is rev-share's sibling — money flowing *to* partners for demand-gen; should sit in the same ledger with the same ROI proof.
- **88. Incentive simulation / sandbox (I)** `[repo]` — `incentive_simulation_rule_sandbox`; quarterly "incentive redesign." Rationale: lets the company model a rate/tier change's payout impact *before* committing — a high-value finance lever unique to a rules-driven ledger.
- **89. Value-based platform pricing thesis (I)** `[ext+repo]` — move toward ~1–3% of partner-attributed revenue under management vs per-seat; charge the % on the *payout* base, never gross (effective take-rate cap ~3%). Rationale: aligns the product's own price to value governed — but only credible once it's the SoR (Phase 2+).
- **90. Platform pricing axis choice (I)** `[ext]` — per-seat (PartnerStack from ~$25/user/mo `[vendor]`), per-partner-managed (Impartner $25K/$45K/$75K editions `[vendor]`), or % of attributed revenue/GMV. Rationale: the pricing axis is itself a strategic lever; per-partner/RUM scales with value, per-seat doesn't.
- **91. Sharia-compliant rev-share design (I/E)** `[repo]` — commission-on-actual-performance (permissible); avoid guaranteed/fixed returns (riba) and ambiguous terms (gharar); scholar sign-off. Rationale: a GCC-specific compliance lever that is also a marketable moat global tools can't retrofit.
- **92. Multi-currency / FX-aware payout economics (I)** `[ext]` — same-currency local rails cheaper; non-default routes via SWIFT at higher fees; FX spread monetization potential (PartnerStack, Tipalti). Rationale: cross-border rev-share has real FX leakage; modeling it is both a partner-fairness and a margin lever.

---

## LAYER 8 — Deal Registration, Protection & Channel-Conflict Governance
*Governs property rights over opportunities and the prevention of partner-vs-partner and partner-vs-direct conflict.*

- **93. Deal registration mechanism (I/E)** `[ext]` — partner notifies vendor of a named opportunity; on approval gets exclusivity + margin protection for a period (Magentrix, Fullcast). Rationale: the foundational conflict-control primitive; Reven reframes it as an audited claim (lever 56) rather than a land-grab.
- **94. Protection-window sizing (I)** `[ext]` — typically 30–90 days; rule: ≥75% of average sales-cycle length (Magentrix, Fullcast). Rationale: too short and partners lose protection mid-deal; too long and accounts get locked; the system should default to a cycle-relative window.
- **95. Registration margin uplift (I/E)** `[ext]` — registering a qualifying deal earns +5–15 points (commonly 5–10; Veeam up to 10) `[vendor/primary-ish]`. Rationale: the economic incentive that makes partners surface deals early — feeds clean, early attribution (lever 60).
- **96. First-to-register with tie-breakers (I)** `[ext]` — priority by timestamp; ties broken by relationship depth, stage, customer preference (Magentrix). Rationale: pure first-to-register rewards speed over contribution; tie-breakers reintroduce fairness — a keystone behavior.
- **97. Territory / global scope rules (I)** `[ext]` — define whether first-to-register wins globally vs in-territory, with multi-territory priority (Magentrix). Rationale: cross-border ecosystems need explicit scope or conflict is guaranteed; the rule engine must express geography.
- **98. Automated duplicate-collision detection (I)** `[ext+repo]` — flag colliding registrations (PRM) ↔ Phase 11 preflight. Rationale: machine detection at registration is the cheapest possible point to resolve a conflict.
- **99. Direct-vs-partner conflict control (I/E)** `[ext]` — co-sell comp that lets the direct rep retire quota on partner deals so they don't fight partners (Crossbeam, Everstage). Rationale: channel conflict is often *internal*; aligning direct-sales comp is as important as partner rules.
- **100. Rules of engagement as published policy (E)** `[ext]` — transparent overlap/routing/credit rules (Introw). Rationale: conflict is reduced by *predictability*; publishing the rules of engagement is a trust lever (Layer 12).
- **101. Dispute-to-resolution workflow with audit trail (I/E)** `[repo]` — Phase 19 resolves attribution/payout/protection/revenue conflict with an immutable trail. Rationale: even perfect rules generate edge cases; a fair, logged dispute process is what keeps partners sourcing (lever 59) and is itself audit evidence.

---

## LAYER 9 — Settlement, Reconciliation & the Bilateral Ledger
*Governs the shared, auditable money-of-record between two firms. The Phase-2 moat — "the part incumbents leave thin."*

- **102. Append-only, double-entry claim ledger (I)** `[ext+repo]` — accrued → eligible → approved → paid, clawback-by-netting; each entry tied to contract/schedule/approval (HubiFi audit-log; repo Phase-2). Rationale: an immutable ledger is the difference between "a tool" and "the system of record" — and the root of switching costs.
- **103. Revenue-event validation (I)** `[repo]` — Phase 15 confirms attributed pipeline became *real, invoiced, collected* revenue. Rationale: payout on pipeline (not realized revenue) is how programs overpay; gating payout on revenue events is core finance discipline.
- **104. Payout-eligibility determination (I)** `[repo]` — Phase 16 decides eligibility from attribution + rules + revenue + evidence. Rationale: separates *attribution* (who contributed) from *eligibility* (what's actually payable) — two decisions incumbents blur.
- **105. Bilateral reconciliation (the white space) (I/E)** `[ext+repo]` — a shared ledger two companies reconcile against bank/sales data; unilateral payout rails (PartnerStack/Tipalti) can't do it. Rationale: "neither side fully trusts the other's spreadsheet" — being the neutral bilateral SoR is the defensible position.
- **106. Reconciliation against billing/ERP (I)** `[repo]` — Phase 20 reconciles approved obligations against finance systems; invoice/collection matching, FX. Rationale: a payout that doesn't reconcile to the GL is an audit finding; reconciliation is where finance trust is earned or lost.
- **107. Settlement / disbursement built last (or partnered) (I)** `[repo]` — disbursement after the SoR is entrenched, or partner a rail; avoid becoming a regulated MoR prematurely. Rationale: holding/moving funds can make you the *principal* (ASC 606) with real liability — sequence it deliberately.
- **108. Idempotent settlement (zero double-pays) (I)** `[repo]` — Phase-2 exit gate: settlement idempotent, deductions explained pre-settlement. Rationale: the one error a finance SoR cannot make is paying twice; idempotency is a hard gate, not a feature.
- **109. Statement generation with explanation (E)** `[repo]` — Phase 18 statements show eligibility *with explanation* and dispute status. Rationale: "eligibility with explanation" is the partner-trust lever and the dispute-deflection lever simultaneously.
- **110. Per-payout fee & method modeling (I)** `[ext]` — e.g., PartnerStack Stripe $2.25 + 0.25% capped $20 `[vendor]`; Tipalti 200+ countries/120+ currencies. Rationale: payout cost is a real margin item; the ledger should model net-of-fees so partner statements are accurate.
- **111. Mass-payout orchestration & payee KYC (I)** `[ext]` — bulk disbursement with KYC/AML/sanctions screening at onboarding (Tipalti, Trolley). Rationale: at scale, payee compliance is non-optional; better to capture KYC at partner onboarding (Layer 3) than at first payout.
- **112. Adjustment / netting / refund flow (I)** `[repo]` — refunds flow eligibility → ledger reversal → clawback-by-netting (Phase-2). Rationale: real money moves both directions; the ledger must reverse cleanly, not just add.
- **113. Settlement as basis-points expansion path (I)** `[ext+repo]` — once you hold the ledger + dispute data, take bps of flow; watch ASC 606 principal-vs-agent. Rationale: the embedded-finance upside — but only natural *because* the SoR makes the money movement non-substitutable.

---

## LAYER 10 — Finance, Tax, Compliance & Revenue Recognition
*Governs CFO-grade correctness and audit defensibility. The layer that flips the buyer from Head of Partnerships to CFO.*

- **114. Principal-vs-agent (gross vs net) determination (I)** `[ext]` — control test (IFRS 15 B34–B38 / ASC 606): principal books gross, agent books net commission; per *performance obligation*, not per contract. Rationale: the product must know which side each party is, because it determines top-line and gross-margin % (what investors price on).
- **115. "Same money, two books" dual representation (I)** `[ext]` — the port 60:40 example: one party gross, the other net, on the same cash. Rationale: a bilateral SoR must produce *both* parties' correct, different statements from one shared record — a capability no unilateral tool has.
- **116. Variable-consideration handling (I)** `[ext]` — commissions/rebates/refunds are variable consideration; estimate via expected-value or most-likely-amount; constrain to "highly probable no significant reversal." Rationale: clawback-exposed rev-share must be recognized under the constraint — the ledger needs to model probability-weighted exposure.
- **117. Commission capitalization (ASC 340-40) (I)** `[ext]` — incremental costs of obtaining a contract (sales commissions) are capitalized and amortized over the benefit period (may exceed contract term if renewals expected); <12-month practical expedient. Rationale: partner commissions often must be capitalized, not expensed; finance-grade output should support this, not just cash payout.
- **118. ZATCA e-invoicing clearance (I)** `[repo]` — UBL 2.1 XML, cryptographic stamp, QR, real-time clearance; commission invoices/credit/debit notes cleared *before* issuance. Rationale: in KSA this is non-discretionary and incumbent-proof; building it into the engine (not as localization) is the wedge.
- **119. Withholding-tax matrix (I)** `[ext+repo]` — KSA WHT (royalties 15% / technical 5% / management 20% / residual 15%); US FDAP default 30% reduced only with valid W-8 (PwC, IRS). Rationale: cross-border rev-share is a *tax* event; getting WHT wrong is a liability, so the payout engine must compute it pre-payment.
- **120. Reverse-charge / self-billing VAT (I)** `[ext]` — EU B2B reverse charge (supplier invoices without VAT; buyer self-assesses); self-billing lets the payer issue the commission invoice. Rationale: commission invoicing has VAT mechanics most partner tools ignore; correctness here is finance trust.
- **121. Tax-form generation (1099 / 1042-S / W-8/W-9 / DAC7) (I)** `[ext]` — collect W-8/W-9 at onboarding; auto-withhold by jurisdiction/treaty; issue 1099/1042-S; meet DAC7 (Trolley, Tipalti). Rationale: information reporting is table-stakes at payout scale; capture forms early, generate filings automatically.
- **122. Immutable audit evidence pack (I)** `[ext+repo]` — Phase 17 packages sourced, immutable evidence; required fields: user, timestamp, type, before/after, source; PCAOB walkthrough-ready. Rationale: the evidence pack accepted by a real finance reviewer *is* the Phase-1 exit gate — audit-defensibility is the product, not a report.
- **123. Recognition-grade outputs for both standards (I)** `[ext]` — IFRS 15 and ASC 606 parity. Rationale: a GCC-anchored, globally-expanding product must emit numbers an auditor in either regime accepts.
- **124. Multi-entity / bilingual (AR/EN) documents (I)** `[repo]` — multi-entity, Arabic/RTL bilingual invoices/statements. Rationale: a deployment requirement in KSA and a moat global tools underserve.
- **125. Compliance-capture stubs before automation (I)** `[repo]` — Phase-1 captures WHT status / VAT treatment / ZATCA fields *before* automating clearance. Rationale: capturing compliance metadata early de-risks Phase-2 settlement and signals finance-grade intent from the MVP.
- **126. Concentration & payout-liability review (I)** `[repo]` — monthly cadence: payout-liability review, concentration risk, finance-evidence gaps. Rationale: surfaces accrued liability and single-partner exposure before they become balance-sheet surprises — a CFO-facing governance lever.

---

## LAYER 11 — Data, Identity, Integration & Platform Architecture
*Governs the substrate. Cross-tenant identity, boundary resources, and integration depth — where the data moat and the network are seeded.*

- **127. Overlay-first deployment (I/E)** `[ext+repo]` — sit on top of CRM/ERP/billing; they remain SoR for opportunities/payments, Reven is SoR for partner-revenue claims. Rationale: lowers adoption cost and avoids ripping out the system of record — the realistic path to becoming a *new* SoR.
- **128. Identity resolution / record linkage (I)** `[ext+repo]` — match partners/customers/opportunities across companies (deterministic + probabilistic, e.g., Splink-class). Rationale: "the moat is data and finance trust, not UI" — every resolved match improves attribution and compounds (lever 138).
- **129. Cross-tenant partner identity (I/E)** `[repo]` — one partner represented across many customers' tenants. Rationale: the primitive that turns a single-tenant tool into a *network* (Layer 12); must be seeded day one because it can't be retrofitted.
- **130. Boundary resources (APIs/SDKs) for complementors (E)** `[ext]` — Ghazawneh & Henfridsson: the tools+rules third parties use to build on the platform; balance *resourcing* (openness) vs *securing* (control). Rationale: how Reven lets partners/ISVs extend it without losing control — the platform-governance lever.
- **131. Integration depth (CRM → billing → ERP) (I)** `[ext+repo]` — bidirectional, finance-grade integrations (Phase 7/14/20). Rationale: depth raises switching costs (a 7-Powers lever) and is the only way claims reconcile to real money.
- **132. Integration health & data-quality monitoring (I)** `[repo]` — `integration_health_data_mapping` screen; daily "clear integration errors." Rationale: attribution and settlement are only as good as the sync; data-quality telemetry is an operational must.
- **133. Bitemporal / versioned rules & data (I)** `[repo]` — agreement→rule engine is versioned and bitemporal. Rationale: payouts must be reproducible "as of" the rule version in force at the time — essential for audit and dispute defense.
- **134. Modularity & defined interfaces (I/E)** `[ext]` — Jacobides: modularity "enables ecosystem emergence… coordinate without hierarchical fiat"; Gawer & Cusumano's architecture lever. Rationale: a modular claim/rule/ledger/evidence architecture lets each module raise the value of the next (the NRR engine) and lets partners plug in.
- **135. Marketplace & integration ingestion (E)** `[ext]` — Canalys "marketplace and integrations" category; ingest hyperscaler co-sell/private-offer data (Layer 6). Rationale: the architecture must treat marketplace transactions as first-class claim sources, not manual entries.
- **136. Data residency & sovereignty (I)** `[repo]` — KSA/GCC data residency (PDPL context). Rationale: a compliance requirement and a moat — global tools must retrofit; region-native design wins on this axis.
- **137. Single source of truth vs federated reads (I)** `[ext+repo]` — Reven is SoR for the claim; reads from CRM/ERP for accounts/invoices. Rationale: clarity about *what* Reven is authoritative for prevents the "9th tool" rejection (lever 14) and the data-ownership fights.
- **138. Proprietary bilateral revenue/attribution graph (I)** `[repo]` — accumulated claim/attribution/agreement/settlement history. Rationale: the "cornered resource" — a graph competitors can't replicate because it accrues only with two-sided usage over time.

---

## LAYER 12 — Governance, Trust, Neutrality, Network Effects & Measurement
*The moat layer and the investment layer: how the orchestrator stays trusted, compounds network effects, and turns workflow history into the Partner P&L and investment decisions.*

- **139. Neutrality as structural advantage ("multi-cloud Switzerland") (I/E)** `[ext+repo]` — a neutral cross-company attribution/settlement authority is structurally unavailable to conflicted hyperscalers/marketplaces. Rationale: neutrality is the one thing a marketplace-cut competitor can't copy — protect it deliberately (don't take sides, don't take a gross cut).
- **140. Platform-leadership levers (scope / architecture / complementor relations / internal org) (I/E)** `[ext]` — Gawer & Cusumano's four levers. Rationale: a structured checklist for governing the platform: what to build vs orchestrate, how open, how to balance compete/collaborate, and what internal "neutral broker" structure preserves trust.
- **141. Generativity–control tension management (I/E)** `[ext]` — Ghazawneh & Henfridsson: openness spurs third-party innovation, control protects the platform. Rationale: the ongoing governance dial — too closed kills the ecosystem, too open kills the moat.
- **142. Roles-facing-similar-rules governance (I)** `[ext]` — Jacobides: standardized rule-sets per role avoid bespoke contracts with every partner. Rationale: the rule engine (lever 29) should govern by *role-class*, making the program scalable without linear legal overhead.
- **143. Two-sided onboarding economics (network bootstrap) (E)** `[ext+repo]` — Rochet–Tirole "get both sides on board"; Parker et al.'s eight launch strategies; cross-tenant identity makes onboarding the *other* side cheap. Rationale: the path from tool to network runs through solving the chicken-and-egg — and the identity primitive is the subsidy that lowers the second side's cost.
- **144. Network effects (same-side / cross-side) (E)** `[ext+repo]` — Parker et al.'s four effect types; repo's "network economies" as the terminal, winner-take-most moat. Rationale: each partner-across-many-customers raises value for all sides — the venture-scale outcome, seeded but not yet real.
- **145. Switching costs via operating-cadence rituals (I)** `[ext+repo]` — daily/weekly/monthly/quarterly cadence (claim queues, pipeline reviews, payout-liability, QBRs). Rationale: becoming the *ritual* (not just the database) is classic SoR stickiness — rip-out loses the operating rhythm, not just data.
- **146. Partner P&L / cost-to-serve (I)** `[ext+repo]` — Phase 21; most programs track partner *revenue* but not cost-to-serve (discounts + MDF + management + support). Rationale: the product's V3 prize — letting leadership see true partner contribution margin, where a high-revenue reseller may net less than a mid-tier referrer.
- **147. Partner ROI & program-profitability measurement (I)** `[ext]` — ROI = (partner revenue − program cost) / cost; targets >3× ROI, CAC payback <120 days `[indicative]`; mature programs ~28% of revenue via partners (Forrester) `[analyst]`. Rationale: the metric tree that justifies (or kills) the program at budget time — the defensible numbers leadership currently lacks.
- **148. Forecasting & tier/incentive simulation (I)** `[repo]` — Phase 21/22 + incentive sandbox (lever 88). Rationale: turns the ledger from a record into a *decision tool* — the quarterly partner-investment decision runs on it.
- **149. Executive operating review & investment decision (I)** `[repo]` — Phase 22 converts workflow history into investment decisions (incentive redesign, tier changes, renegotiation, new programs) at quarterly cadence. Rationale: the terminal purpose — "own the ledger every Partner P&L runs on"; this is where workflow history becomes capital allocation.
- **150. Category metric ownership: "Controlled Partner Revenue" (E)** `[repo]` — define and own the executive language/metric. Rationale: the brand/category lever — earned only with reference customers, but the long-game move from *a product* to *the standard* by which partner revenue is measured.

---

## Verification Appendix (what's solid, what to re-check)

**Strongest, primary-anchored facts** (cite freely): marketplace take-rates (AWS Jan-2024 tiered 3/2/1.5%, 20% server, +0.5% CPPO, 1.5% renewal; Azure ~3%; GCP cut 20%→3% in 2021; Apple/Google 30%→15%; Shopify 0%-to-$1M); IFRS 15/ASC 606 principal-vs-agent control test and the port 60:40 dual-booking example; ASC 340-40 commission capitalization; WHT/FDAP default 30% with W-8 treaty relief; the academic frameworks (every named role/lever tied to its source).

**Named-analyst (use, attribute, note any sponsor bias):** Omdia $30B→$163B marketplace (29.1% CAGR); Forrester ~28% of revenue via partnerships for mature programs, ~67% expecting indirect-revenue growth, "build/sell/service/influence"; Forrester TEI co-sell uplift (80%/27%/40% — **AWS-commissioned**); Gartner PERM (Sept 2025) capability set; IDC "70% by 2025" (**stat surfaced repeatedly; exact source document/date unconfirmed**).

**Vendor / indicative — directional only:** virtually all Crossbeam/Reveal/PartnerStack/Impartner uplift and benchmark figures (win-rate lifts, EQL conversion, activation rates, time-to-first-deal, "6× certified," "291% pipeline with 10+ partners", clawback/accelerator adoption %, reseller/referral/distributor margin ranges). Treat as illustrative, not proof.

**Could NOT verify — do not cite as numbers:**
- The "**~quarter of partner deals misbooked as direct**" figure — "Partner Attribution Leak" is a real named concept (Magentrix) but **no quantified % was found**. Use qualitatively. *(This tempers a figure used in earlier "why-now" framing.)*
- Forrester "**partner ecosystem makes ~5× the vendor's revenue**" multiplier — frequently cited via third parties; verify against the original before use.
- EU e-invoicing "**2028**" mandate date — directionally correct (ViDA) but member-state-specific; verify before quoting as fixed.

**Method caveat:** every primary domain returned HTTP 403 to full-page fetch in this environment, so figures rest on search-surfaced source quotes, not full-page reads. Re-open the primary URLs in the Sources section before external publication of any specific number.

---

## Sources (grouped)

**Analyst / industry frameworks**
- Canalys/Omdia — *Channels Ecosystem Landscape* 2022/2023/2025: https://canalys.com/channels-ecosystem-landscape-2023 · https://omdia.tech.informa.com/blogs/2025/jan/channels-ecosystem-landscape-2025
- Gartner — *Market Guide for Partner & Ecosystem Relationship Management (PERM)* (Sept 23, 2025): https://www.gartner.com/en/documents/6982766 · analysis: https://www.360insights.com/blog/what-the-2025-gartner-market-guide-means-for-the-future-of-partner-ecosystem-relationship-management
- Forrester — *State of Partner Ecosystems 2025*: https://www.forrester.com/blogs/the-state-of-partner-ecosystems-2025/ · *Partner Attribution Is Broken*: https://www.forrester.com/blogs/partner-attribution-is-broken-heres-why-b2b-executives-must-lead-the-fix
- IDC — ecosystem-orchestration prediction (70% by 2025): https://www.idc.com/getdoc.jsp?containerId=prMETA51198123
- Crossbeam / ELG Insider — ELG, account mapping, maturity (Explorer/Producer/Connector/Supernode), stats compilation: https://www.crossbeam.com/what-is-ecosystem-led-growth · https://maturity.crossbeam.com/ · https://insider.crossbeam.com/entry/every-stat-we-have-that-proves-the-value-of-partnerships · *2023 State of the Partner Ecosystem*: https://insider.crossbeam.com/entry/the-2023-state-of-the-partner-ecosystem-report
- Reveal / Nearbound — *The Nearbound Manifesto*: https://reveal.co/blog/the-nearbound-manifesto · Fuller & Rowley, *Nearbound and the Rise of the Who Economy* (2024)
- PartnerStack × Wynter — *State of Partnerships in GTM 2026*: https://partnerstack.com/articles/state-of-partnerships-gtm-2026-report-press-release · *Four Stages of Partnership Maturity*: https://partnerstack.com/articles/four-stages-of-partnership-maturity-benchmarking-framework-for-program-leaders

**Co-sell / marketplace (primary + analyst)**
- AWS Marketplace — reduced/tiered listing fees (Jan 2024): https://aws.amazon.com/about-aws/whats-new/2024/01/aws-marketplace-simplified-reduced-listing-fees/ · private offers: https://docs.aws.amazon.com/marketplace/latest/userguide/creating-private-offer.html
- Microsoft Learn — Multiparty Private Offers / co-sell / MACC: https://learn.microsoft.com/en-us/partner-center/marketplace-offers/multiparty-private-offers-for-channel-partners · https://learn.microsoft.com/en-us/partner-center/referrals/co-sell-overview
- Google Cloud — marketplace rev-share cut to 3% (CNBC, Sep 2021): https://www.cnbc.com/2021/09/26/google-lowers-its-cloud-marketplace-revenue-share-to-3percent-from-20percent.html · private-offer pricing: https://cloud.google.com/marketplace/docs/partners/offers/private-offer-pricing
- Omdia — hyperscaler marketplace $163B by 2030 (Oct 2025): https://omdia.tech.informa.com/pr/2025/oct/hyperscaler-cloud-marketplace-sales-to-hit-us-163-billion-us-dollars-by-2030
- Forrester TEI (AWS-commissioned) — co-sell uplift: https://aws.amazon.com/blogs/awsmarketplace/total-economic-impact-partner-opportunity-analysis-aws-marketplace-sellers-forrester/
- Tackle — cloud GTM / ACE / MACC guides: https://tackle.io/blog/the-basics-of-aws-co-sell-how-to-get-started-with-the-ace-portal/ · https://tackle.io/blog/breaking-down-the-microsoft-azure-consumption-commitment-macc/

**Commercial / incentive design**
- Magentrix — deal registration, tiers, channel conflict, *Partner Attribution Leak™*: https://www.magentrix.com/blog/unified-deal-registration-improves-prm-a-channel-sales-must-have · https://www.magentrix.com/blog/what-is-partner-attribution-leak-tm
- Veeam — Deal Registration Program Guide (uplift points): https://na.ingrammicro.com/Ingram/media/North-America-US/EN-US/V/veeam/docs/Veeam_Deal_Registration_Program_Guide_AMER.pdf
- 360insights / Channel Scaler — MDF vs co-op: https://www.360insights.com/blog/market-development-funds-101-mdf-and-co-op-explained · https://channelscaler.com/resources/blog/when-it-comes-to-mdf-should-you-go-accrual-or-proposal-based/
- Everstage / Unifyr — accelerators, clawbacks, SPIFFs, margin stacking, tiering compliance: https://www.everstage.com/sales-incentive/saas-sales-incentive-plan · https://www.unifyr.com/atlas/margin-stacking/
- Impartner / HubSpot — PRM pricing, Solutions Partner tiers: https://www.g2.com/products/impartner-prm/pricing · https://www.hubspot.com/partners/how-tiers-work

**Settlement / finance / tax**
- PartnerStack payouts, Tipalti mass payouts, Trolley tax: https://partnerstack.com/payouts · https://tipalti.com/resources/learn/mass-payouts/ · https://trolley.com/tax/
- IFRS 15 / ASC 606 principal-vs-agent (gross/net) + port 60:40: https://ifrscommunity.com/knowledge-base/principal-vs-agent-revenue-gross-vs-net/ · https://www.cpdbox.com/ifrs-revenue-principal-agent/ · IFRS IC "Principal vs Agent: Software Reseller" (May 2022): https://www.ifrs.org/content/dam/ifrs/supporting-implementation/agenda-decisions/2022/principal-versus-agent-software-reseller-may-2022.pdf
- Variable consideration (BDO): https://www.bdo.co.uk/en-gb/insights/business-edge/business-edge-2017/ifrs-15-in-the-spotlight-variable-consideration · ASC 340-40 (BillingPlatform): https://billingplatform.com/blog/asc-340-40
- Clawback/chargeback (DealHub / Chargebacks911): https://dealhub.io/glossary/clawback/ · https://chargebacks911.com/saas-chargebacks/
- Audit log / SOX (HubiFi): https://www.hubifi.com/blog/immutable-audit-log-basics
- Cross-border withholding (IRS / WTP / PwC-class): https://www.irs.gov/individuals/international-taxpayers/withholding-on-specific-income · https://www.wtpadvisors.com/withholding-tax-101-when-us-companies-must-file-1042-1042-s-and-how-treaties-change-it/

**Platform / ecosystem strategy (academic)**
- Williamson & De Meyer (2012), *Ecosystem Advantage*, CMR 55(1): https://journals.sagepub.com/doi/10.1525/cmr.2012.55.1.24
- Jacobides, Cennamo & Gawer (2018), *Towards a Theory of Ecosystems*, SMJ 39(8): https://sms.onlinelibrary.wiley.com/doi/full/10.1002/smj.2904
- Adner (2017), *Ecosystem as Structure*, J. Management 43(1): https://journals.sagepub.com/doi/10.1177/0149206316678451 · *The Wide Lens* (2012): https://ronadner.com/the-wide-lens-frameworks/
- Iansiti & Levien (2004), *The Keystone Advantage* / *Strategy as Ecology* (HBR): https://hbr.org/2004/03/strategy-as-ecology
- Rochet & Tirole (2003), *Platform Competition in Two-Sided Markets*, JEEA 1(4): https://www.tse-fr.eu/sites/default/files/medias/doc/wp/2002/platform.pdf
- Eisenmann, Parker & Van Alstyne (2006), *Strategies for Two-Sided Markets* (HBR): https://hbr.org/2006/10/strategies-for-two-sided-markets · (2011) *Platform Envelopment*, SMJ: https://www.hbs.edu/ris/Publication%20Files/07-104.pdf
- Parker, Van Alstyne & Choudary (2016), *Platform Revolution*: https://wwnorton.com/books/Platform-Revolution
- Gawer & Cusumano (2002), *Platform Leadership* / MIT SMR: https://sloanreview.mit.edu/article/the-elements-of-platform-leadership/
- Ghazawneh & Henfridsson (2010/2013), *Boundary Resources Model*: https://aisel.aisnet.org/icis2010_submissions/48/

**Repository (internal model)**
- `prototype/workflow.mjs` — the 22-phase end-to-end workflow & operating cadence
- `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` — Capture→Settle→Orchestrate, 7-Powers moat map, GCC-compliance execution rules
- `Partner_Revenue_OS_Venture_Scale_Narrative.md` — the core insight (attribution as binding constraint), beachhead, defensibility roadmap

---

*Prepared as a deep-research synthesis (6-angle web search + adversarial verification + cross-mapping to the product's own model). 150 levers across 12 layers; internal/external tagged; grounded in cited sources or the repo; confidence-flagged; nothing invented.*
