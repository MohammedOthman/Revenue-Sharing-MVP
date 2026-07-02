# Reven Network OS Blueprint — Part 13: Multi-Enterprise Revenue Network

**Purpose.** Line-by-line decode of `MultiEnterprise_Revenue_Network.docx` (Part 13 — Multi-Enterprise
Revenue Network and Network Effects), with a strategic rationale for every item and its translation
into concrete Reven product surface: **categories** (navigation modules), **functions** (backend
capabilities / data objects), and **buttons** (user actions). This is the specification used to
upgrade the Reven product on Replit from a bilateral revenue-share MVP into a multi-enterprise
partnership operating system.

**Baseline (what Reven / `revenue-share-platform/` does today).** Users, flat partner records,
single-partner contracts carrying one `revenue_share_percentage`, period revenue records computed as
`total_revenue × share %`, KPIs per contract, legal-document metadata, JWT auth, and a dashboard.
Everything is bilateral, single-company-perspective, and percentage-only. Every gap named below is a
gap against this baseline.

**Phase-model fit.** This blueprint is the product expression of the repo's governing sequence —
Capture (PRM) → Settle (revenue system-of-record) → Orchestrate (partnership network) — and the
document's own Phases 1–4 map onto Settle → Orchestrate (see §9).

---

## 0. The Mandate (document preamble)

| Line | Strategic rationale | Product translation |
|---|---|---|
| "Do not analyze partnerships as separate bilateral agreements between one company and individual partners." | Bilateral framing is the root architectural constraint of every PRM/commission tool; it caps the product's value at contract administration and makes it replaceable. Escaping it is what creates network effects and defensibility. | Re-architect the core: an **Organization** (company) is a first-class network participant, not a row in a `partners` table owned by one tenant. Every downstream object is multi-party by default. |
| "Design a multi-enterprise revenue network in which multiple companies can jointly create, influence, deliver, retain, expand, attribute, allocate, and settle revenue." | These 8 verbs are the full revenue lifecycle. A product that owns the whole verb chain becomes the system-of-record for inter-company commerce — the "operating system" position the user demands. | The 8 verbs become the product's module spine: Opportunities (create/influence), Delivery & Success (deliver/retain/expand), Attribution & Claims (attribute), Allocation Engine (allocate), Settlements (settle). |
| One revenue event may involve: lead-gen, referral, reseller/distributor, technology, product-provider, implementation, delivery, financing, customer-success, data/intelligence, marketplace-operator partners. | Real enterprise deals are already multi-party; the money is split in spreadsheets and emails today. Supporting ≥12 concurrent participant types on one event is the wedge no bilateral tool can follow. | **Revenue Event** object supports unlimited participants, each attached with a role (see §2), evidence, and an allocation line. UI: "Add participant" button on every revenue event. |

---

## 1. Network Revenue Graph

**Section rationale.** A graph is the only data model in which "who contributed to which dollar via
which agreement" stays queryable as the network grows. Tables with single foreign keys (today's
schema) cannot answer multi-party attribution questions. The graph is also the moat: once several
companies' commercial truth lives in one shared graph, leaving means losing the shared record.

Rationale and translation for each node type the document requires:

| Graph object | Why it must exist (strategic rationale) | Reven translation |
|---|---|---|
| Companies | The network's atoms; participants must exist independently of any one tenant's partner list so two companies can both "see" the same counterparty. | `organizations` module; **Network Directory** page; "Invite company" button. |
| Legal entities | Settlement, tax, and contracts bind to legal entities, not brands; multinationals need several per company. | `legal_entities` under each organization; entity picker on agreements & settlements. |
| Business units | P&L ownership and conflict rules (e.g., a BU competes where another cooperates) live below company level. | `business_units` under entities; assignable as party on agreements/opportunities. |
| Products and services | Allocation and bundling rules are product-specific; product-partner fit analysis (§7) needs product nodes. | `products` catalog per organization; attachable to deals, bundles, agreements. |
| Customers / Accounts | The revenue source; account-level ownership and protection rules (§6) anchor here. Customer = commercial relationship, account = sellable unit within it. | `customers` and `accounts` objects; account detail page shows all partner touches. |
| Leads / Opportunities / Deals | The pre-revenue funnel must live in-graph so attribution starts at first touch, not at invoice — otherwise claims are unverifiable after the fact. | Funnel objects with stage tracking; "Register lead", "Convert to opportunity", "Close deal" buttons. |
| Agreements | The legal layer that authorizes economic rights; every allocation must trace to an agreement clause. | Evolved `contracts` → **Agreements** module supporting multi-party signatories. |
| Partner roles | Role is per-event, not per-partner (see §2); the graph edge "org X played role R in event E" is the atomic unit of attribution. | `event_roles` join object: organization × revenue event × role × evidence. |
| Revenue events | The atomic fact of money recognized; everything else (claims, allocations, settlements) hangs off it. | `revenue_events` object replacing period-lump `revenue_shares`; types: new sale, renewal, expansion, usage, milestone. |
| Revenue claims | A claim is an assertion of contribution *before* it's validated — separating claim from allocation is what makes disputes, evidence, and confidence scoring possible. | **Claims** module; "Submit claim" button with evidence attachment; claim states: draft → submitted → validated → allocated / rejected. |
| Protection windows | Time-boxed exclusivity (e.g., 90-day referral protection) is the #1 source of channel conflict; making it a first-class object automates the fights away. | `protection_windows` on accounts/leads per partner; auto-expiry; "Grant protection" button; conflict alerts on overlap. |
| Incentive rules | Rules must be data, not contract prose, so the engine (§3) can execute them deterministically. | `incentive_rules` produced by the Agreement Compiler; rule builder UI. |
| Payment statements | Partners need an auditable, period-based statement (like a payroll slip) before money moves; this is the trust artifact. | **Statements** page per partner per period; "Generate statement", "Approve statement" buttons; PDF export. |
| Settlements | The actual money-movement record, distinct from the statement, so payment status, method, currency, and reconciliation are trackable. | `settlements` object; statuses pending → approved → paid → reconciled; "Record settlement" button. |
| Disputes | Disagreement is guaranteed in multi-party splits; a structured dispute object keeps conflicts inside the platform instead of killing the partnership. | **Disputes** module (see §6); "Raise dispute" button on any claim/allocation/statement. |
| Reversals | Churn, refunds, and non-payment mean revenue un-happens; without reversal objects, clawbacks are manual and trust collapses. | `reversals` linked to original revenue event; auto-generated negative allocation lines; clawback tracking. |
| Partner performance data | Feeds trust scoring (§5) and network intelligence (§7); it must be a graph node so reputation is computed, not asserted. | `partner_performance` computed metrics store; surfaces in Trust profiles and Intelligence dashboards. |
| "Explain how each object connects... shared version of commercial truth." | The point of the graph is a **single shared ledger of commercial facts** that all parties see identically — this kills reconciliation cost, the biggest hidden tax on partnerships. | Every object carries full audit trail + party-scoped visibility; a "Shared record" indicator shows which counterparties see the same data. |

---

## 2. Dynamic Partner Contribution Model

**Section rationale.** Static partner types ("reseller") assign economics by identity; dynamic roles
assign economics by **behavior in each deal**. This is the conceptual unlock that makes multi-party
splits fair and computable: the same company can be demand generator on deal A and delivery partner
on deal B. Fairness-by-contribution is also what attracts partners into the network — nobody joins a
network that mis-pays them.

The 16 roles, each with rationale:

| Role | Strategic rationale |
|---|---|
| Demand generator | Marketing-sourced pipeline is real economic contribution invisible to CRM "source" fields; pricing it in attracts media/content partners. |
| Account opener | First qualified access to a buyer is scarce and valuable; recognizing it separately stops account-openers being squeezed out at closing. |
| Influencer | Advisors/analysts sway deals without touching the paper; unpriced influence leaks out of the network into informal kickbacks. |
| Opportunity creator | Converting an account into a concrete opportunity is a distinct, evidence-able act (meeting, scoped need) deserving distinct rights. |
| Product provider | The party whose product is sold; in bundles there are several, so provider must be a role, not "the vendor". |
| Solution architect | Pre-sales design work determines win-rate and delivery cost; compensating it keeps technical partners engaged pre-revenue. |
| Seller | The party that executes the commercial close; often not the product owner (co-sell, marketplace). |
| Distributor | Aggregation/logistics/credit provision in the middle of the chain; its margin logic differs from a referral fee. |
| Integrator | Making products work together is a distinct value-add from building or selling them. |
| Delivery partner | Implementation quality drives retention; giving delivery a revenue stake aligns it with outcomes, not billable hours. |
| Customer-success contributor | Post-sale adoption work protects the revenue base; a role lets CS partners earn from renewals they secured. |
| Retention contributor | Explicitly pricing retention converts churn-fighting from cost center to revenue right. |
| Expansion contributor | Upsell/cross-sell inside existing accounts is the cheapest revenue; a role makes farming as rewarded as hunting. |
| Data provider | Intelligence that sources or de-risks deals (intent data, market maps) becomes monetizable inside the network. |
| Financing provider | Deal financing unlocks otherwise-dead deals; its compensation (fee/points) must ride the same rails. |
| Marketplace operator | The platform/ecosystem owner takes a take-rate; modeling it as a role lets Reven itself, or client marketplaces, participate transparently. |

The 6 per-role definitions the document demands, and why:

| Definition required | Rationale | Translation |
|---|---|---|
| What contribution qualifies | Prevents role inflation ("everyone claims influencer"); qualification criteria make claims objective. | Role templates with qualification checklists in the Role Taxonomy admin screen. |
| What evidence is required | Evidence-gated claims are the difference between a ledger and a rumor mill; ties into §5 evidence hierarchy. | Required-evidence config per role; claim form enforces attachments/system links. |
| What revenue rights may be earned | Caps and shapes economics per role so agreements compile deterministically. | Rights ranges per role feeding the Allocation Engine. |
| What risks exist | Each role carries failure modes (fake leads, channel stuffing, delivery failure) that reserves/clawbacks must price. | Risk flags per role → default holdback/reserve suggestions. |
| How contribution is measured | Quantified contribution enables contribution-based allocation (§3) instead of political splits. | Measurable contribution metrics per role (meetings held, integrations shipped, NRR delta). |
| How the role affects revenue allocation | Closes the loop: role → weight → allocation line, fully explainable. | Allocation explanations show per-role weights on every split. |

**Product surface:** Role Taxonomy admin category; "Assign role" button on every event participant;
role badge chips throughout UI.

---

## 3. Multi-Party Allocation and Agreement Compiler

**Section rationale.** This is the economic kernel — the feature that makes Reven a *settlement
authority* instead of a tracker. Converting agreements into machine-readable rules ("compiling"
contracts) removes the spreadsheet layer where errors, leakage, and disputes breed. Every mechanism
below exists because some real deal shape cannot be expressed without it; missing mechanisms = deals
Reven can't serve = enterprises that churn.

| Mechanism | Strategic rationale | Engine capability |
|---|---|---|
| Fixed and variable revenue shares | Baseline; today's single-% model. Variable (by product, volume, period) covers most real contracts the fixed % can't. | Rule: % or amount, conditional on dimensions (product, region, period). |
| Tiered revenue shares | Volume tiers are the standard motivator in channel programs; without them Reven can't host a serious reseller program. | Threshold tables with retroactive/marginal tier modes. |
| Margin-based allocation | Distributors/resellers think in margin, not revenue %; margin rules let cost-bearing parties be paid on economics that match their risk. | Cost inputs per line → allocation on gross margin. |
| Contribution-based allocation | The payoff of §2: splits weighted by measured contribution — the only defensible logic when 4+ parties touch one deal. | Role-weight matrix × contribution scores → split. |
| Usage-based allocation | SaaS/consumption revenue arrives continuously; partners must share in usage streams or the model dies at the modern business model. | Metered revenue events allocated per usage period. |
| Milestone-based allocation | Services/implementation revenue recognizes at milestones; ties partner payout to delivery reality. | Milestone objects gating allocation release. |
| Customer-lifetime-value allocation | Rewards parties whose contribution shows up over the customer's life (CS, retention roles), not just at closing. | Trailing allocation across the account's future events. |
| Renewal allocation | Renewals are where B2B profit lives; explicit renewal rights prevent the "who owns year 2" fight. | Renewal events auto-linked to origin parties with configurable decay. |
| Expansion and cross-sell allocation | Expansion attribution is the most contested claim type; codified rules make farming economics predictable. | Expansion events with origin-vs-expander split rules. |
| Waterfall allocation | Complex deals pay parties in priority order (recover costs, then guarantee, then split) — standard in structured commerce. | Ordered allocation stages with remainder cascade. |
| Cost-recovery mechanisms | Some parties must recoup hard costs before profit-sharing starts, or they won't participate. | Cost pools recovered ahead of shares in the waterfall. |
| Minimum guarantees | De-risks a partner's investment in the network; the acquisition tool for anchor partners. | Guaranteed floor amounts with true-up logic. |
| Revenue floors and caps | Both sides need bounded exposure; caps make CFOs sign, floors make partners commit. | Min/max bounds per rule, per period, per party. |
| Accelerators and decelerators | Performance-curved rates steer behavior (accelerate desired products, decelerate discount abuse). | Rate multipliers keyed to KPI/target attainment (reuses KPI module). |
| Holdbacks and reserves | Multi-party trust demands escrow-like buffers against reversals; reserves priced by trust score (§5) reward good actors. | Reserve % per rule; reserve ledger; scheduled release. |
| Reversals and clawbacks | Refunds/churn/non-payment must automatically un-wind allocations or the ledger diverges from reality — fatal for a settlement authority. | Reversal events generate negative allocations, netted against reserves first. |
| Multi-currency and multi-entity settlement | Cross-border networks (incl. the SAR-based Saudi ICP in this repo's strategy docs) are the target market; single-currency = single-country toy. | Currency per event/agreement; FX-rate capture at event time; settlement per legal entity. |
| "Convert commercial agreements into machine-readable rules that automate eligibility, allocation, approval, reserve, reversal, and settlement." | The compiler pipeline is the automation spine — every dollar flows eligibility → allocation → approval → reserve → reversal-check → settlement with zero manual math. This is the "no mistakes" requirement made structural. | **Agreement Compiler**: term-sheet builder UI → compiled rule set → simulation preview ("Test this agreement" button) → activation. Full pipeline states on every allocation. |

**Product surface:** Agreements category (multi-party wizard, rule builder, compile & simulate
buttons); Allocations category (run allocation, approve, view waterfall explanation buttons).

---

## 4. Network Liquidity and Revenue Activation Loops

**Section rationale.** Sections 1–3 make the network *correct*; section 4 makes it *alive*.
Liquidity mechanisms manufacture the transactions the settlement engine then monetizes — this is
the flywheel that turns a compliance tool into a growth engine, and the source of network effects
(each mechanism gets better with more participants).

| Mechanism | Strategic rationale | Product translation |
|---|---|---|
| Partner discovery | Companies can't collaborate with partners they can't find; the directory is the network's front door. | Searchable **Network Directory** with capability/industry/region filters. |
| Capability matching | Raw directories don't convert; matching (need ↔ capability) creates qualified partner supply on demand. | "Find partners for this opportunity" button → ranked matches. |
| Co-selling opportunity routing | Routing live opportunities to the right partners is the highest-value liquidity event — it creates revenue that didn't exist. | Opportunity board with "Route to partner" / "Accept / Decline" buttons and SLA timers. |
| Customer introduction routing | Warm intros are the currency of B2B; structured intro routing captures them as attributable, protectable events. | "Request introduction" / "Make introduction" flows that auto-create claims + protection windows. |
| Joint proposal formation | Multi-party deals need a shared proposal artifact; owning it keeps the deal (and its attribution) inside Reven. | Joint proposal workspace on opportunities, with party roles and proposed splits pre-agreed. |
| Account-team formation | Naming a cross-company team on an account formalizes who's inside the deal — the raw material for §6 conflict prevention. | "Form account team" button; team roster per account. |
| Product and service bundling | Bundles are pre-packaged multi-party deals — repeatable liquidity instead of one-off matchmaking. | Bundle builder combining multiple orgs' products with a pre-compiled split agreement. |
| Partner enablement | Unenabled partners don't transact; enablement content/certification raises per-partner conversion. | Enablement section per program: materials, certifications, readiness status. |
| Implementation handoff | Sale→delivery handoffs are where customers get dropped and delivery partners get shut out; structured handoff protects both revenue and attribution. | "Hand off to delivery partner" workflow with acceptance + milestone linkage. |
| Renewal and expansion coordination | Renewals involving multiple original contributors need coordinated plays or they churn silently. | Renewal calendar with multi-party renewal plans and alerts. |
| Referral loops | Referrals-beget-referrals only when referrers visibly get paid fast; the loop is the growth engine. | Referral tracking with status transparency and time-to-payout display. |
| Reputation loops | Public performance signals (§5) make good partners magnetic — reputation earns deal flow, which builds reputation. | Trust badges on directory profiles; match-ranking weighted by trust score. |
| Intelligence loops | Network-level data ("this combo converts 3×") flows back as recommendations, making every participant smarter than they could be alone — the data moat. | Recommendation cards: "Partners like you also work with…", "This pathway converts best". |
| Partner portfolio reallocation | Ecosystems decay without pruning; systematic reallocation shifts investment from dead partnerships to compounding ones. | Portfolio review screen with invest / maintain / redesign / exit tags (feeds §7). |

The 15 liquidity metrics, and why each is on the dashboard: **Active companies / active partners /
active opportunities** (network pulse — supply and demand volume); **opportunity-match rate** (does
discovery convert to collaboration?); **partner-to-partner conversion rate** (true P2P liquidity,
not hub-and-spoke); **time to first revenue** (activation speed — the onboarding north star);
**repeat collaboration rate** (retention of *relationships*, the network's compounding unit);
**average partners per successful deal** (multi-party depth — proof the network out-performs
bilateral); **cross-sell and expansion rate** (post-sale value creation); **network revenue
density** (revenue per participant — quality of liquidity, not just quantity); **partner retention**
(participant churn kills networks quietly); **partner trust score** (aggregate health of §5);
**revenue leakage rate** (unclaimed/misallocated revenue — the core ROI Reven sells); **dispute
rate** (friction gauge; rising disputes predict partner churn); **settlement speed** (cash velocity
— the #1 partner-satisfaction driver).

**Product surface:** Network Liquidity dashboard category with all 15 metrics, trends, and drill-downs.

---

## 5. Trust, Evidence, and Commercial Reputation

**Section rationale.** Companies won't route money and customer data through strangers. Trust
infrastructure substitutes *computed, evidence-based reputation* for personal relationships — which
is precisely what lets the network scale past the founder's rolodex. It also creates the incentive
gradient: good behavior → higher score → tangible privileges → more revenue, making trust
self-reinforcing rather than policed.

| Element | Strategic rationale | Product translation |
|---|---|---|
| Evidence hierarchy | Not all proof is equal (system-integrated events > documents > screenshots > assertions); ranking evidence makes claim validation consistent and automatable. | Evidence types ranked 1–5; claim forms show evidence strength; validators see the hierarchy. |
| Proof-of-contribution standards | Each role (§2) needs a published bar for "you contributed"; standards convert disputes into checklist reviews. | Per-role proof standards in Role Taxonomy; enforced at claim submission. |
| Claim confidence scoring | Auto-scoring claims by evidence strength lets high-confidence claims auto-approve and routes only weak ones to humans — throughput without loss of integrity. | Confidence score (0–100) on every claim; auto-approval threshold configurable. |
| Data-quality scoring | Garbage inputs poison allocation; scoring each party's data quality prices the reconciliation burden they impose. | Data-quality score per organization from completeness/timeliness/correction rates. |
| Partner trust scoring | The composite currency of the network; a single legible number that gates privileges. | Trust score (0–100) composed of the sub-scores; visible on every partner profile. |
| Dispute-frequency scoring | Chronic disputants impose friction costs on counterparties; pricing it deters weaponized disputes. | Disputes raised/lost rate feeding trust score. |
| Payment reliability scoring | Paying parties late/never is the network's existential risk; reliability must be visible before someone extends effort. | On-time settlement rate per paying organization, shown in directory. |
| Compliance scoring | Enterprise buyers demand KYC/contract/regulatory hygiene from network counterparties; a score makes it checkable at match time. | Compliance checklist completion (docs, KYC status) per organization. |
| Partner reputation tiers | Tiers (e.g., Bronze→Platinum) compress scores into statuses people compete for — gamified trust. | Tier badges with defined thresholds; tier history. |
| Privileges and restrictions linked to trust score | Scores without consequences are decoration. Faster approvals, wider protection windows, lower reserves, better opportunity access — trust must pay, literally. | Privilege matrix per tier: auto-approval limits, protection-window length, reserve %, match ranking boost, opportunity access level. Enforced by the engine, shown on a "Your tier benefits" screen. |

---

## 6. Coopetition, Channel Conflict, and Dispute Governance

**Section rationale.** Partners in one deal are competitors in the next; unmanaged conflict is the
#1 reason partner programs die. Codifying conflict rules *in advance* converts relationship-ending
fights into routine, time-bound adjudications — governance is what makes coopetition survivable, and
neutrality here is Reven's licence to operate (see §8).

| Mechanism | Strategic rationale | Product translation |
|---|---|---|
| Account ownership rules | Most conflicts are really "whose account is this?"; explicit ownership state ends ambiguity. | Ownership assignments on accounts with effective dates and rule source. |
| Territory rights | Geographic/segment carve-outs are the classic channel peace treaty; must be machine-checkable at lead registration. | Territory definitions per agreement; auto-conflict check on new leads/opportunities. |
| Protection windows | Time-boxed rights balance protection with liquidity (perpetual claims freeze the network; zero protection kills investment). | Window objects with role scope + expiry; countdown visible; auto-release. |
| First-touch versus meaningful-contribution rules | The two canonical attribution philosophies conflict; agreements must declare which applies so the engine can adjudicate mechanically. | Attribution-mode setting per agreement/program; claim validation applies the declared mode. |
| Multiple-partner revenue splits | When two claims are both valid, splitting beats winner-take-all — keeps both partners in the network. | Split resolution flow proposing rule-based splits on overlapping claims. |
| Direct-sales conflict rules | Vendor's own sales team vs partner is the most poisonous conflict; pre-agreed compensation rules (e.g., partner still paid on direct-touch deals) preserve trust. | Direct-deal registration + partner compensation rules for house-account overlaps. |
| Distributor and reseller conflict rules | Multi-tier channels create tier-jumping disputes (vendor selling around distributor); rules preserve the tier economics. | Tier-chain definitions on agreements; violations flagged. |
| Parent and subsidiary conflict rules | Corporate families blur account boundaries (subsidiary of a protected parent?); explicit family rules prevent double-claiming. | Corporate-family links on organizations/accounts; family-aware conflict checks. |
| Multi-country customer-account rules | Global accounts bought in one country, delivered in another, cross territory rules; needs its own resolution logic. | Country-scoped account rules; multi-country account flag triggering review. |
| Escalation paths | Defined escalation (account team → managers → adjudication) keeps conflicts progressing instead of festering. | Dispute stages with role-based routing and stage SLAs. |
| Independent dispute review | A neutral reviewer (not either party) is what makes losing acceptable; institutionalized neutrality = the network's court. | Neutral-reviewer assignment (platform admin or panel); review verdict records with reasons. |
| Time-bound adjudication | Justice delayed is partners churned; hard clocks force resolution and make dispute cost predictable. | SLA timers per dispute stage; auto-escalation on breach; resolution-time reporting. |
| Reversal and clawback processes | Post-verdict money movement must be automatic or verdicts are theater. | Verdicts execute engine actions: reallocate, reverse, release/absorb reserves — with full audit trail. |

**Product surface:** Governance category: Conflict Rules admin, Disputes queue ("Raise dispute",
"Escalate", "Assign reviewer", "Record verdict" buttons), Clawbacks log.

---

## 7. Network Intelligence and Ecosystem Portfolio Management

**Section rationale.** The settlement graph generates a dataset nobody else has: verified,
money-backed records of which partner combinations actually produce profitable revenue. Refined
into intelligence, it upgrades Reven from record-keeper to advisor — and intelligence derived from
network-wide data is the moat a single company's BI can never replicate.

Nine required insights, each with rationale: **highest-performing partner combinations** (deals are
made by combos, not individuals — combos are the true unit of ecosystem performance);
**most profitable customer-acquisition pathways** (CAC-by-pathway redirects program spend to what
works); **strongest product-partner combinations** (product-market fit has a partner dimension;
route each product through its best channel); **fastest routes to enterprise revenue** (time-to-
revenue by pathway tells partners which door to walk through); **partners that improve retention and
expansion** (post-sale value is invisible in bookings-only analytics — this rescues CS/delivery
partners from being under-valued); **partners that create low-quality or uncollectible revenue**
(bad-revenue detection protects the whole network's economics and feeds trust scores); **ecosystem
bottlenecks that delay revenue activation** (finding the stage where deals stall tells the operator
exactly what to fix); **partner programs deserving more investment** (capital allocation on
evidence); **partnerships to redesign, pause, or terminate** (pruning is as valuable as planting —
and politically easier when data says it).

Three P&L levels and why the trio matters:

| Level | Rationale | Translation |
|---|---|---|
| Individual Partner P&L | The basic accountability unit: full revenue, cost (incentives, enablement, disputes, reversals), and margin per partner. | Partner P&L statement page per organization. |
| Partner Combination P&L | Combos have emergent economics (A+B outperforms A and B separately); this is invisible at individual level and is the network's secret alpha. | Combination analytics: P&L per recurring partner pairing/trio. |
| Ecosystem Pathway P&L | End-to-end route economics (lead source → seller → delivery → renewal) reveal which *pipelines*, not just parties, deserve investment. | Pathway explorer: funnel-path visualization with P&L per path. |

**Product surface:** Intelligence category: Combination Explorer, Pathway Explorer, Partner P&L,
Portfolio Actions board (invest / redesign / pause / terminate recommendations with reasons).

---

## 8. Neutral Operator and Interoperability Model

**Section rationale.** Two survival constraints in one section. **Neutrality:** competitors will
only share commercial data with an operator that has no stake in any deal — neutrality is the
business-model precondition for multi-enterprise data sharing. **Interoperability:** every
participant already has CRM/ERP/billing systems of record; a rip-and-replace pitch dies in
procurement. Reven must sit *above* existing systems as the control layer — reading facts from them,
computing shared truth, and writing settlement-ready outputs back — which also makes the repo's
`Integration_Layer_and_API_Data_Flows_Manual.md` the implementation companion for this section.

Eleven required connections, each with its data purpose: **CRM** (leads/opportunities/accounts in —
attribution starts at first touch; claim status back); **ERP** (orders, fulfillment, cost data for
margin-based rules); **billing systems** (invoices/payments — the revenue events themselves;
collection status gates allocations); **accounting systems** (GL postings of allocations/reserves so
statements reconcile to books); **contract lifecycle management** (executed agreements in → compiler
terms verified against source contracts); **partner portals** (existing portals become network
on-ramps rather than competitors); **data warehouses** (bulk analytical sync out — enterprises
demand their data in their warehouse); **identity and access management** (SSO/SCIM — enterprise
security table stakes for cross-company access); **payment and treasury systems** (settlement
execution rails; payout status back to statements); **product usage systems** (usage events for
usage-based allocation and adoption signals for CS roles); **customer-success systems** (health
scores/renewal risk evidencing retention-contributor claims).

"Shared commercial intelligence and trusted settlement readiness **without replacing** each
company's systems of record" — the product's diplomatic posture: Reven owns the *inter-company*
truth layer; each company keeps its *intra-company* systems. Translation: **Integrations Hub**
category — connector cards per system type, API-key/webhook management, field-mapping UI, sync logs,
CSV import as the universal fallback, and a public REST API so participants can integrate anything.

---

## 9. Phased Build Recommendation

**Rationale for phasing itself:** each phase's output is the next phase's input — attribution
integrity (1) makes multi-party allocation trustworthy (2), which makes routed opportunities
economically safe (3), which generates the density that reputation and automation need (4). Shipping
phase 4 features on phase 1 data would produce confidently wrong numbers — the exact opposite of the
"no mistakes" mandate.

| Phase | Content | Why this order | Reven scope |
|---|---|---|---|
| 1 | Bilateral revenue claim and attribution integrity | Trust in the *numbers* precedes trust in the *network*; start where customers already hurt (leakage, misattribution) with their existing bilateral partners. | Revenue events, claims + evidence, protection windows, basic allocation, statements, reversals — hardened. |
| 2 | Multi-party allocation and partner-network workflows | With facts trusted, add many-to-one economics: the compiler, waterfalls, reserves, multi-party agreements, disputes. | Full §3 engine + §2 roles + §6 governance. |
| 3 | Opportunity routing and ecosystem intelligence | Liquidity features need the settled base to pay routed deals correctly; intelligence needs accumulated settlement data. | §4 routing/matching/co-sell + §7 analytics. |
| 4 | Network liquidity, reputation, and automated commercial orchestration | Reputation requires history; automation requires proven rules. The end state: high-trust actors transact with near-zero manual approval. | §5 trust economy fully wired to privileges; §4 loops automated; auto-approval, auto-settlement-readiness. |

---

## 10. Consolidated Product Map (categories → functions → buttons)

Final navigation architecture for Reven:

1. **Dashboard** — executive overview + the 15 network-liquidity metrics.
2. **Network** — Directory, partner discovery/matching, organization profiles, trust badges, invitations. *(Buttons: Invite company, Find partners, Request introduction)*
3. **Organizations & Entities** — my company, legal entities, business units, corporate family links, products catalog.
4. **Customers & Accounts** — accounts, ownership, protection windows, account teams. *(Buttons: Grant protection, Form account team)*
5. **Pipeline** — leads, opportunities, deals; co-sell routing; joint proposals; bundles. *(Buttons: Register lead, Route to partner, Accept/Decline, Create joint proposal, Build bundle)*
6. **Agreements** — multi-party agreement wizard, term builder, Agreement Compiler, simulation. *(Buttons: Compile agreement, Simulate, Activate)*
7. **Revenue Events** — event capture (sale/renewal/expansion/usage/milestone), reversals. *(Buttons: Record event, Add participant, Reverse event)*
8. **Claims & Attribution** — claim submission, evidence, confidence scores, validation queue. *(Buttons: Submit claim, Attach evidence, Validate, Reject)*
9. **Allocations & Settlements** — allocation runs, waterfall explanations, approvals, reserves, statements, settlements, multi-currency. *(Buttons: Run allocation, Approve, Generate statement, Record settlement, Release reserve)*
10. **Disputes & Governance** — disputes queue, conflict rules, territory/ownership admin, adjudication, clawbacks. *(Buttons: Raise dispute, Escalate, Assign reviewer, Record verdict)*
11. **Trust & Reputation** — trust scores, sub-scores, tiers, privileges matrix, evidence standards.
12. **Intelligence** — partner P&L, combination P&L, pathway P&L, portfolio actions, recommendations.
13. **KPIs & Performance** — existing KPI module, now feeding accelerators and contribution measurement.
14. **Legal Documents** — existing module, linked to multi-party agreements.
15. **Integrations Hub** — connectors (CRM/ERP/billing/accounting/CLM/warehouse/IAM/payments/usage/CS), API keys, webhooks, CSV import, sync logs.
16. **Admin** — users, roles/permissions (multi-org RBAC), role taxonomy, currencies, audit log.

**Maturity requirements (the "100% ready to deploy" bar):** multi-tenant organization isolation with
cross-org shared objects; role-based access control per organization; full audit trail on every
financial object; validation and error states on all forms; seeded realistic demo data covering a
multi-party deal end-to-end (lead → routed opportunity → multi-party agreement → revenue event →
claims → allocation waterfall → statement → settlement → dispute → clawback); responsive, polished
enterprise UI; empty states, loading states, and explanatory copy so a new enterprise user can
self-serve.
