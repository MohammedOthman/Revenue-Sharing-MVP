# Partner Revenue OS — Product Definition & Requirements Document (PDR)

**Document type:** Product Definition & Requirements Document  
**Product working name:** Partner Revenue OS  
**Strategic positioning:** Partner Revenue Control Layer / Partner Revenue Operating System  
**Primary functional owner:** Head of Partnerships / Partnerships Leader  
**Primary executive validators:** CRO, CFO, CEO / GM  
**Deployment posture:** Overlay + integrations first; selective system of record for partner revenue claims over time  
**North Star statement:** “When partnerships becomes material, help me run it like a predictable revenue line—so I can scale investment without scaling chaos.”

> **Phase discipline (governing):** This PDR conforms to the canonical roadmap **Phase 1 Capture (PRM) → Phase 2 Settle → Phase 3 Orchestrate** (see `ROADMAP_ALIGNMENT_AUDIT.md` §2). Concordance: **MVP + V1 = Phase 1 Capture · V2 = Phase 2 Settle · V3 = Phase 3 Orchestrate.** The entry product is sold and experienced as an easy, claim-centric **PRM**. In Phase 1 (MVP/V1) the product **never moves money**: all payout-related features are read/calculate/display only — the system records that a payout became due and whether it was paid (entered manually or imported), but it does not approve-to-pay into any rail, execute, reverse, or clear anything. Money movement is the final step of Phase 2 (Settle) or is partnered to a rail.

---

## 1. Executive Summary

The product is a **Partner Revenue OS** designed for companies where partnerships have become commercially material but operationally difficult to control. It is not a *generic* PRM, affiliate tracker, partner portal, or dashboard. It is experienced and sold as an easy, claim-centric PRM in Phase 1 (Capture), engineered underneath as the system of record for partner revenue — a platform that turns partner activity into **attributable, governed, forecastable, finance-ready revenue**, and never a fintech in Phase 1.

The product exists because many companies reach a point where partnerships begin generating real pipeline and revenue, but the operating model remains fragmented across CRM, spreadsheets, WhatsApp, email, contracts, finance systems, and manual reporting. At that stage, leadership needs to know whether partnerships are a real revenue line or an informal relationship function that creates hidden operational chaos.

The product should help the organization answer:

- Which partners are creating revenue?
- Which revenue is truly partner-sourced, partner-influenced, reseller-driven, referral-driven, or implementation-linked?
- Which partner claims are valid?
- Which deals are protected?
- Which agreements apply?
- What payout liability exists?
- Which partners are profitable?
- Which partners deserve more investment?
- Which partners or programs create leakage, conflict, or complexity?
- How can leadership scale partner investment without scaling disputes, manual work, and finance uncertainty?

The product’s central operating object is the **Partner Revenue Claim**, not only the partner profile or the sales opportunity. A Partner Revenue Claim connects the partner, customer, opportunity, partner role, agreement, protection window, attribution status, evidence, revenue status, payout eligibility, approval history, and dispute history.

This object is the missing control layer between CRM, ERP, billing, legal agreements, finance, and partner-facing workflows.

---

## 2. Product Vision

### 2.1 Vision Statement

Build the operating system that helps companies run partnerships like a predictable revenue line by controlling the full lifecycle from partner identity, deal registration, attribution, protection, agreement rules, revenue validation, payout eligibility, partner statements, finance evidence, executive reporting, and investment decisions.

### 2.2 North Star Statement

> “When partnerships becomes material, help me run it like a predictable revenue line—so I can scale investment without scaling chaos.”

### 2.3 Strategic Interpretation

The product should make partnerships behave like a managed revenue function. That means partner-led growth should become:

- **Attributable:** leadership knows who contributed to revenue.
- **Governable:** claims, approvals, exceptions, and disputes follow clear rules.
- **Forecastable:** partner pipeline and revenue can be planned.
- **Finance-ready:** payout eligibility and liabilities can be supported with evidence.
- **Investable:** leadership can decide where to allocate more partner budget, sales support, co-marketing, enablement, or executive sponsorship.
- **Scalable:** partner revenue can grow without proportional growth in manual work, disputes, or operational friction.

### 2.4 Product Category

The product should be positioned as a **Partner Revenue OS** — a **horizontal, single-function platform** that owns one business function (partner revenue) across *every* industry and geography where B2B entities share revenue (the comparable shape is Stripe/Salesforce/Ramp owning one function across all industries), **not** an industry-specific, vertical-SaaS suite.

It should not be positioned narrowly as:

- PRM only
- Affiliate software
- Referral tracking
- Partner portal
- Commission calculator
- Sales dashboard
- Marketplace payout system
- BI dashboard
- Contract repository

The more accurate category definition is:

> A Partner Revenue OS helps companies capture partner-sourced and partner-influenced revenue, govern attribution, protect partner rights, forecast partner contribution, calculate payout eligibility, reconcile finance evidence, and decide where to scale partner investment.

### 2.5 Core Product Principle

> Do not build a *generic* PRM. Build a claim-centric PRM the buyer adopts easily, whose underlying control system turns partnership activity into governed, forecastable, finance-ready revenue. "Control layer" describes the architecture underneath — the Phase-1 go-to-market is the PRM.

---

## 3. Product Strategy

### 3.1 Strategic Thesis

Partnerships become operationally fragile when they become material. Early on, partnerships can be managed through relationships, spreadsheets, and manual follow-up. But once partners begin affecting pipeline, revenue, payouts, and executive planning, the company needs a system that can govern the function with the same discipline used for direct revenue.

The product should solve the transition from:

- Informal relationship activity
- Manual partner tracking
- Ad hoc partner claims
- Unclear attribution
- Spreadsheet payouts
- Manual reporting
- Executive skepticism

Into:

- Governed partner revenue operations
- Defensible attribution
- Partner claim ledger
- Agreement-linked eligibility
- Finance-readable evidence
- Partner ROI reporting
- Forecastable partner pipeline
- Scalable partner investment

### 3.2 Strategic Wedge

The recommended wedge is:

> **Partner Revenue Claim Ledger + Attribution Integrity**

This is stronger than “deal registration” because it positions the product around a business control point rather than a workflow form.

The wedge should include:

- Partner registry
- Agreement metadata
- Deal registration
- Partner role capture
- Attribution workflow
- Protection-window logic
- Duplicate claim detection
- Evidence trail
- CRM opportunity link
- Payout eligibility preview
- Executive dashboard
- Audit log

### 3.3 Why This Wedge

This wedge earns adoption fastest because it is owned directly by the partnerships leader, but creates value for sales, finance, external partners, and leadership.

It helps the partnerships leader prove that partnerships are not just soft relationship work. It gives them evidence, governance, and executive language.

It creates a clean expansion path:

1. Capture partner revenue claims.
2. Validate attribution.
3. Protect partner rights.
4. Link claims to agreements.
5. Preview payout eligibility.
6. Provide finance evidence.
7. Add partner statements.
8. Add settlement and reconciliation.
9. Add partner P&L and investment intelligence.

### 3.4 Deployment Strategy

The recommended deployment posture is:

> **Overlay + integrations first; selective system of record for partner revenue claims over time.**

CRM should remain the system of record for accounts, contacts, opportunities, sales stages, and sales owners. ERP and billing should remain the systems of record for invoices, collections, revenue, payments, and GL references.

The product should become the system of record for:

- Partner revenue claims
- Attribution decisions
- Protection windows
- Partner roles
- Agreement rule metadata
- Payout eligibility
- Partner revenue evidence
- Dispute history
- Partner revenue intelligence

### 3.5 Strategic Rationale for Overlay Posture

Overlay deployment reduces resistance because it does not require customers to replace CRM, ERP, billing, or finance systems. It allows the partnerships leader to adopt the product while gradually bringing in RevOps, finance, legal, sales, and IT.

The product should not say:

> “Replace your CRM or ERP.”

It should say:

> “Keep your CRM, ERP, and billing systems. We add the missing partner revenue control layer that governs attribution, protection, partner claims, payout eligibility, and executive visibility.”

---

## 4. North Star Metric and Success Model

### 4.1 Recommended North Star Metric

## Controlled Partner Revenue

**Controlled Partner Revenue** means the value of partner-sourced, partner-influenced, reseller, referral, co-sell, or implementation-linked revenue that has:

- Registered partner claim
- Validated attribution
- Linked partner role
- Active agreement rule coverage
- Visible pipeline or revenue status
- Known payout eligibility
- Audit trail
- Executive reporting visibility

### 4.2 Why Not Use “Partner Revenue” Alone

Partner revenue alone can be inflated, politically contested, or poorly supported.

Risks of a basic partner revenue metric:

- Partner-influenced revenue can be overstated.
- Partner-sourced revenue can be underreported.
- Sales can bypass attribution.
- Partners can overclaim contribution.
- Finance may not trust payout evidence.
- CRM may not have clean partner fields.
- Leadership may not know which revenue is defensible.

Controlled Partner Revenue is better because it measures not only volume but also governance quality.

### 4.3 Formula Logic

```text
Controlled Partner Revenue =
Partner-linked revenue
× Attribution confidence
× Agreement coverage
× Revenue status confidence
× Payout eligibility clarity
```

### 4.4 Supporting Metrics

#### Adoption Metrics

- Number of active internal users
- Number of active external partner users
- Partner portal login rate
- Deal registration volume
- Claim submission rate
- Claim acceptance rate
- Partner manager weekly active usage
- Sales user CRM write-back engagement
- Finance approval activity

#### Revenue Metrics

- Partner-sourced pipeline
- Partner-influenced pipeline
- Partner-sourced revenue
- Partner-influenced revenue
- Partner-sourced win rate
- Partner-influenced win rate
- Revenue per active partner
- Average deal size by partner type
- Partner revenue growth rate

#### Control Metrics

- Percentage of partner revenue with validated attribution
- Percentage of claims linked to agreements
- Percentage of claims with payout eligibility clarity
- Duplicate claim rate
- Rejected claim rate
- Disputed claim rate
- Shadow revenue risk count
- Claims with missing evidence

#### Finance Metrics

*(Phase boundary: in Phase 1 these are tracking metrics computed from recorded/imported data — the product reports them; it does not execute, approve-to-pay, or move any of the amounts until Phase 2 Settle.)*

- Payout-eligible revenue
- Estimated payout liability
- Accrued payout liability
- Approved payouts
- Pending payouts
- Paid payouts
- Payable aging
- Manual adjustment rate
- Overpayment prevention events
- Duplicate payout prevention events

#### Strategic Metrics

- Partner ROI
- Partner P&L
- Partner concentration risk
- Partner cohort performance
- Tier movement
- Partner program profitability
- Partner forecast accuracy
- Partner investment recommendations accepted

---

## 5. Ideal Customer Profile (ICP)

### 5.1 Primary ICP Definition

The best-fit customer is not every company with partnerships. The best-fit customer is:

> A company where partner-led revenue is already material enough to create attribution conflict, payout ambiguity, reporting gaps, executive pressure, and operational drag.

### 5.2 Company Characteristics

Best-fit customers typically have:

- Dedicated partnerships leader or channel leader
- 20 to 200+ active partners
- More than 3 partner types
- Partner-sourced, partner-influenced, reseller, referral, co-sell, or implementation-driven revenue
- Existing CRM adoption
- Manual partner attribution reporting
- Manual partner payout or revenue-share workflows
- Finance involvement in partner economics
- Partner agreements with variable commercial terms
- Sales conflict around partner contribution
- Executive pressure to prove partner ROI

### 5.3 Best-Fit Segments

Strong initial segments include:

- B2B SaaS companies
- Fintech companies
- Insurance and brokerage firms
- Payments companies
- Cybersecurity vendors
- Cloud and IT services providers
- ERP implementation networks
- Marketplaces
- Logistics platforms
- Real estate and proptech platforms
- Procurement platforms
- Corporate training companies
- Healthcare platforms
- Government digital transformation vendors
- Telecom ecosystem partners

### 5.4 Saudi and GCC ICP Lens

In Saudi Arabia and GCC markets, the product should target medium-to-large organizations where partnerships are tied to revenue, distribution, ecosystem growth, implementation networks, or enterprise sales.

Strong local segments include:

- Fintech and payment companies
- Insurance brokers and insurtech platforms
- B2B SaaS providers
- IT and digital transformation vendors
- Cloud and cybersecurity resellers
- Telecom ecosystem partners
- Logistics and last-mile operators
- Real estate platforms
- Healthcare aggregators
- Procurement platforms
- Tourism and hospitality platforms
- Franchise operators
- Retail groups with supplier or B2B ecosystems

### 5.5 Poor-Fit Customers

Poor-fit customers include:

- Companies with no active partner revenue
- Very early startups with fewer than 10 partners
- Companies where partnerships are only brand alliances
- Consumer-only companies with no partner-led commercial motion
- Companies with no CRM discipline
- Companies unwilling to formalize attribution and governance
- Large enterprises with deeply customized PRM and ERP workflows unless entering through diagnostic or overlay module

### 5.6 ICP Rationale

The best customers are mature enough to feel pain but not so mature that the category is already fully solved internally. The product should target organizations where partner-led growth has crossed the threshold from informal relationship management into a material revenue channel.

---

## 6. Stakeholder Mapping

### 6.1 Head of Partnerships

#### Primary Job

Prove that partnerships are a scalable revenue line, not just relationship activity.

#### Needs

- Partner Revenue Command Center
- Deal registration
- Attribution workflow
- Partner performance reporting
- Executive pack
- Partner ROI
- Partner activation metrics
- Partner trust and transparency

#### Product Rationale

The Head of Partnerships is the primary champion and functional owner. The product must give this person the evidence to win internal budget, defend the function, scale high-quality partners, and reduce operational chaos.

#### Second-Order Thinking

The partnership leader’s deeper need is political credibility. They need a system that translates relationship activity into finance and revenue language.

---

### 6.2 Partner Manager

#### Primary Job

Activate partners, manage deal flow, resolve issues, and improve partner performance.

#### Needs

- Partner tasks
- Partner profiles
- Lead and deal status
- Partner portal messages
- Enablement tracking
- Claim follow-up
- Dispute handling
- Partner health score

#### Product Rationale

Partner managers create daily adoption. If they do not use the product, the data becomes stale and leadership reporting loses trust.

#### Second-Order Thinking

Partner managers need workflow relief, not another reporting burden. The product must help them act faster, not only document work.

---

### 6.3 External Partner

#### Primary Job

Submit opportunities, track status, trust the process, and understand payout or credit status.

#### Needs

- Partner portal
- Deal submission
- Status tracking
- Rejection reasons
- Protection visibility
- Statement view
- Payout status
- Support and dispute channel

#### Product Rationale

External partner transparency increases future contribution and reduces manual follow-up.

#### Second-Order Thinking

Partner trust is not soft UX. It is a channel activation lever. Partners contribute more when they believe the process is fair and visible.

---

### 6.4 Sales Representative

#### Primary Job

Work deals without unnecessary administrative burden.

#### Needs

- CRM-native partner fields
- Claim visibility
- Partner role clarity
- Conflict alerts
- Minimal extra data entry
- Clear handoff workflow
- Simple override request process

#### Product Rationale

Sales adoption determines attribution quality. If sales sees the product as administrative friction, they will bypass it.

#### Second-Order Thinking

The product must reduce ambiguity for sales, not create another competing workflow outside CRM.

---

### 6.5 Sales Manager / CRO

#### Primary Job

Understand partner contribution to pipeline, revenue, forecast, and sales productivity.

#### Needs

- Partner-sourced pipeline
- Partner-influenced pipeline
- Win rate by partner
- Sales cycle by partner
- Forecast contribution
- Channel conflict report
- Partner productivity dashboard

#### Product Rationale

CRO validation turns the product from partnership tooling into revenue infrastructure.

#### Second-Order Thinking

The CRO needs to know whether partnerships improve revenue velocity, not just whether the company has many partners.

---

### 6.6 CFO / Finance Team

#### Primary Job

Control payout liability, prevent leakage, and ensure financial accuracy.

#### Needs

- Payout eligibility
- Accrued liability
- Partner statements
- Approval controls
- Invoice matching
- Payment status
- Overpayment risk
- Dispute exposure
- Audit trail

#### Product Rationale

CFO trust becomes critical as the product moves closer to money, statements, liabilities, settlement, and reconciliation.

#### Second-Order Thinking

The CFO does not need to love partnerships. The CFO needs to trust that partner economics are controlled and defensible.

---

### 6.7 Revenue Operations

#### Primary Job

Maintain clean revenue process, CRM hygiene, attribution quality, and reporting logic.

#### Needs

- CRM integration
- Field mapping
- Data quality dashboard
- Attribution rules
- Workflow configuration
- Funnel analytics
- Sync monitoring
- Data exports

#### Product Rationale

RevOps can accelerate adoption if the product improves data quality. RevOps can also block adoption if the product creates data chaos.

#### Second-Order Thinking

RevOps should see the product as an extension of revenue process governance, not a rogue partnership tool.

---

### 6.8 Legal

#### Primary Job

Ensure commercial terms are applied correctly and disputes are defensible.

#### Needs

- Agreement metadata
- Rule versioning
- Contract reference
- Exception log
- Dispute history
- Approval evidence
- Audit trail

#### Product Rationale

Legal becomes important when partner claims conflict with contract interpretation.

#### Second-Order Thinking

The product should reduce legal involvement by making standard commercial terms operationally clear and traceable.

---

### 6.9 IT / Security

#### Primary Job

Ensure the system is secure, integrated, reliable, and compliant.

#### Needs

- SSO
- SCIM
- API documentation
- Access controls
- Audit logs
- Data residency options
- Integration monitoring
- Data retention controls
- Sandbox environment

#### Product Rationale

IT controls enterprise readiness and procurement viability.

#### Second-Order Thinking

Bad security and integration architecture can kill an otherwise strong product in procurement.

---

### 6.10 CEO / GM / Strategy Office

#### Primary Job

Decide whether to increase investment in partnerships.

#### Needs

- Partner revenue growth
- Partner ROI
- Strategic partners
- Concentration risk
- Market coverage
- Expansion opportunities
- Partner economics
- Program recommendations

#### Product Rationale

CEO-level value is about capital allocation. The product should show whether partner-led growth deserves more investment.

#### Second-Order Thinking

The CEO does not need workflow detail. The CEO needs confidence that partnerships can scale without becoming uncontrolled complexity.

---

## 7. Future Jobs To Be Done (JTBD)

### 7.1 Stage 1 — When Partnerships Are Informal

#### JTBD

Help me know who our partners are, what they do, and whether they are active.

#### Required Features

- Partner registry
- Partner lifecycle stages
- Partner ownership
- Basic activity tracking
- Partner segmentation

#### Rationale

Early partnership functions suffer from lack of structure. They need a clear operating base before revenue attribution becomes possible.

---

### 7.2 Stage 2 — When Partner Deals Start Appearing

#### JTBD

Help me capture partner contribution before sales forgets it, disputes it, or bypasses it.

#### Required Features

- Deal registration
- Attribution workflow
- CRM link
- Protection window
- Duplicate detection

#### Rationale

This is the first moment where partner activity becomes economically meaningful.

---

### 7.3 Stage 3 — When Sales and Partnerships Start Conflicting

#### JTBD

Help me decide who deserves credit without damaging sales alignment or partner trust.

#### Required Features

- Attribution rules
- Approval workflow
- Override log
- Multi-partner split
- Dispute management
- Evidence archive

#### Rationale

Conflict increases when the channel becomes material. The product must govern credit and rights without escalating every issue to executives.

---

### 7.4 Stage 4 — When Finance Starts Asking Questions

#### JTBD

Help me prove what we owe, why we owe it, and what evidence supports it.

#### Required Features

- Agreement rulebook
- Payout eligibility
- Finance approval
- Partner statements
- Invoice references
- Audit log

#### Rationale

Finance involvement is the sign that partnerships have become a real revenue line.

---

### 7.5 Stage 5 — When Leadership Wants Predictability

#### JTBD

Help me forecast partner revenue and payout liability with enough confidence to plan investment.

#### Required Features

- Partner pipeline forecast
- Partner revenue forecast
- Payout liability forecast
- Partner cohort analysis
- Conversion trends
- Partner health scoring

#### Rationale

Predictable revenue requires forward visibility, not only historical reporting.

---

### 7.6 Stage 6 — When the Company Wants to Scale the Program

#### JTBD

Help me know which partners, partner types, incentives, and regions deserve more investment.

#### Required Features

- Partner P&L
- Partner ROI
- Tier optimization
- Program design cockpit
- Incentive simulation
- Partner concentration analysis
- Market coverage map

#### Rationale

Scaling without economics creates chaos. The product must help leadership scale investment intelligently.

---

### 7.7 Stage 7 — When the Ecosystem Becomes Complex

#### JTBD

Help me govern multiple partner motions, partner roles, agreements, entities, and payout models without losing control.

#### Required Features

- Multi-entity support
- Multi-currency support
- Advanced agreement rules
- Revenue-share complexity
- ERP integration
- Billing integration
- Settlement and reconciliation
- Tax localization

#### Rationale

The product becomes mission-critical when partner complexity crosses functional boundaries.

---

## 8. Product Architecture

The product should have 8 major layers.

---

### 8.1 Layer 1 — Partner Operating Layer

#### Purpose

Run the daily operating model of the partnership function.

#### Core Capabilities

- Partner registry
- Partner segmentation
- Partner type classification
- Partner lifecycle stages
- Partner tiers
- Partner ownership
- Partner account plans
- Partner onboarding
- Partner compliance documents
- Partner portal access
- Partner activity history

#### Rationale

Before revenue can become predictable, the company needs to know who the partner is, what role they play, what rights they have, and who owns the relationship.

#### Second-Order Thinking

Most companies already have partner names somewhere. The missing value is operational identity: role, rights, eligibility, status, activity, and economic contribution.

---

### 8.2 Layer 2 — Partner Revenue Claim Ledger

#### Purpose

Create the central ledger of partner revenue claims.

#### Core Object

**Partner Revenue Claim**

A Partner Revenue Claim connects:

- Partner
- Customer/account
- Opportunity/deal
- Partner role
- Agreement
- Protection window
- Attribution status
- Evidence
- Revenue status
- Payout eligibility
- Approval history
- Dispute history

#### Rationale

The product should not be centered only on partners or only on deals. It should be centered on the claim that a partner contributed to revenue.

#### Second-Order Thinking

If the primary object is Partner, the product becomes a directory. If the primary object is Opportunity, the product becomes a CRM add-on. If the primary object is Revenue Claim, the product becomes the control layer for partner-led revenue.

---

### 8.3 Layer 3 — Attribution and Protection Layer

#### Purpose

Decide whether partner contribution is valid and protected.

#### Core Capabilities

- Deal registration
- Partner-sourced attribution
- Partner-influenced attribution
- Co-sell attribution
- Reseller attribution
- Implementation attribution
- Referral attribution
- Multi-partner attribution
- Duplicate claim detection
- Shadow-revenue detection
- Protection-window logic
- Account protection
- Contact protection
- Product protection
- Region protection
- Approval and override workflow

#### Rationale

Predictable partner revenue requires clean attribution. Without attribution integrity, finance cannot trust payouts, sales cannot trust partner claims, and leadership cannot trust partner ROI.

#### Second-Order Thinking

Attribution is not only a technical field. It is an internal political decision about credit, compensation, and budget allocation.

---

### 8.4 Layer 4 — Agreement and Rule Engine

#### Purpose

Convert commercial agreements into operational rules.

#### Core Capabilities

- Agreement metadata
- Agreement effective dates
- Eligible products
- Eligible customer segments
- Eligible geographies
- Partner role eligibility
- Commission rate
- Revenue-share rate
- Margin-share logic
- Tiered payout logic
- First-year-only logic
- Lifetime revenue-share logic
- Cap and floor rules
- Payout conditions
- Exclusion rules
- Renewal rules
- Exception rules
- Rule simulation

#### Rationale

Legal agreements are not operational by themselves. The product must translate agreements into executable business rules.

#### Second-Order Thinking

The product should avoid becoming a full CLM at the start. It should own agreement metadata and commercial logic, not every legal drafting workflow.

---

### 8.5 Layer 5 — Revenue and Payout Eligibility Layer

#### Purpose

Turn partner contribution into finance-readable economics.

#### Core Capabilities

- Revenue event creation
- Closed-won validation
- Invoice reference
- Collection status
- Recognized revenue reference
- Payout eligibility *(preview/calculation only in Phase 1)*
- Estimated payout *(display only in Phase 1)*
- Accrued payout liability *(recorded, not executed, in Phase 1)*
- Payout approval workflow *(Phase 2 — Settle; behind the Phase-1 exit gate)*
- Partner statement
- Payable aging
- Payout batch export *(Phase 2 — Settle)*
- Adjustment handling *(recorded as data in Phase 1; execution semantics are Phase 2)*
- Refund handling *(recorded as data in Phase 1; execution semantics are Phase 2)*
- Credit note handling *(recorded as data in Phase 1; execution semantics are Phase 2)*
- Chargeback handling *(recorded as data in Phase 1; execution semantics are Phase 2)*
- Tax treatment metadata *(capture stub in Phase 1; no automated clearance)*

#### Rationale

The CFO does not only need to know which partner helped. Finance needs to know what financial obligation exists because of that partner contribution.

#### Second-Order Thinking

Do not start by moving money. Start by proving entitlement. Once entitlement becomes trusted, settlement automation becomes natural. **Explicit boundary:** in Phase 1 this layer reads, calculates, and displays; nothing in it approves-to-pay into a rail, executes, reverses, or clears money. Execution arrives in Phase 2 (Settle) — built last within that phase, or partnered to a rail.

---

### 8.6 Layer 6 — Governance and Operating Cadence Layer

#### Purpose

Make partnerships run like a managed revenue line.

#### Core Capabilities

- Weekly partnership pipeline review
- Monthly partner performance review
- Quarterly CRO/CFO partner revenue pack
- Partner tier review
- Partner investment review
- Partner risk review
- Partner P&L
- Partner cohort analysis
- Partner program scorecard
- SLA tracking
- Approval aging
- Dispute aging
- Revenue leakage report
- Shadow revenue report
- Underperforming partner watchlist

#### Rationale

Predictable revenue requires cadence. The product must create operating rituals around partner revenue, not only store data.

#### Second-Order Thinking

Executive artifacts are a distribution mechanism inside the enterprise. A credible CRO/CFO pack creates internal pull.

---

### 8.7 Layer 7 — Intelligence and Forecasting Layer

#### Purpose

Help leadership decide where to scale partner investment.

#### Core Capabilities

- Partner-sourced pipeline forecast
- Partner-influenced revenue forecast
- Partner quality scoring
- Partner conversion prediction
- Partner churn risk
- Payout liability forecast
- Partner ROI forecast
- Partner capacity scoring
- Territory coverage gaps
- Industry coverage gaps
- Partner concentration risk
- Incentive effectiveness
- Partner cohort performance
- Program design recommendations
- Anomaly detection
- Double-comping risk alerts
- Overpayment risk alerts

#### Rationale

Once partnerships become material, leadership needs investment logic. The product should answer where to put more money, sales support, co-marketing support, enablement, and executive sponsorship.

#### Second-Order Thinking

AI should not be generic “AI insights.” It should answer economically important questions: who to scale, who to cut, who to renegotiate, who to protect, and where leakage exists.

---

### 8.8 Layer 8 — Platform, Admin, Security, and Integration Layer

#### Purpose

Make the OS enterprise-ready.

#### Core Capabilities

- Role-based access control
- Approval matrix
- Delegation of authority
- SSO
- SCIM provisioning
- API keys
- Integration monitoring
- Webhook logs
- Data mapping
- Field mapping
- Audit log
- Version history
- Sandbox environment
- Data import/export
- Data warehouse sync
- Multi-entity support
- Multi-currency support
- Arabic/English support
- VAT fields
- Saudi localization fields
- Data retention policies
- Admin configuration

#### Rationale

Enterprise buyers do not only buy features. They buy control, security, governance, and operational fit.

#### Second-Order Thinking

Admin capability determines whether the product can survive procurement, IT, finance, and legal review.

---

## 9. Domain Object Model

### 9.1 Core Objects

The platform should include the following core objects:

- Partner
- Partner Contact
- Partner User
- Internal User
- Partner Organization
- Agreement
- Agreement Rule
- Product / SKU
- Customer Account
- Customer Contact
- Lead
- Opportunity / Deal
- Deal Registration
- Partner Revenue Claim
- Attribution Decision
- Protection Window
- Evidence Item
- Revenue Event
- Payout Eligibility Record
- Partner Statement
- Invoice Reference
- Payment Reference
- Dispute
- Approval
- Task
- Activity
- Audit Log
- Partner Tier
- Partner Program
- Partner P&L Record
- Forecast Record

### 9.2 Primary Object: Partner Revenue Claim

The **Partner Revenue Claim** is the atomic unit of value.

#### Required Fields

- Claim ID
- Partner ID
- Partner name
- Partner role
- Customer/account ID
- Customer/account name
- Contact ID where applicable
- Opportunity/deal ID
- CRM opportunity link
- Product/service
- Estimated deal value
- Expected close date
- Submission date
- Claim source
- Agreement ID
- Protection window start date
- Protection window end date
- Attribution status
- Payout eligibility status
- Revenue status
- Evidence status
- Owner
- Approver
- Dispute status
- Audit history

### 9.3 Partner Roles

Supported partner roles should include:

- Source / referrer
- Influencer
- Co-seller
- Reseller
- Distributor
- Implementation partner
- Marketplace partner
- Strategic alliance partner
- Affiliate
- White-label partner
- Franchise partner
- Service delivery partner

### 9.4 Attribution Statuses

Attribution statuses should include:

- Submitted
- Under review
- Accepted
- Rejected
- Duplicate
- Needs evidence
- Protected
- Expired
- Disputed
- Sales override requested
- Finance review required
- Closed-won
- Closed-lost
- Payout-eligible
- Not payout-eligible

### 9.5 Revenue Statuses

Revenue statuses should include:

- No opportunity yet
- Opportunity created
- Pipeline active
- Closed-won
- Closed-lost
- Invoiced
- Collected
- Recognized
- Refunded
- Canceled
- Adjusted

### 9.6 Payout Eligibility Statuses

Payout eligibility statuses should include:

- Not evaluated
- Eligible
- Not eligible
- Missing agreement
- Missing revenue validation
- Missing invoice
- Missing collection confirmation
- Finance review required
- Approved for statement
- Included in statement
- Paid
- Disputed
- Adjusted

---

## 10. Direct Product Features

Direct features are the features users actively touch.

---

### 10.1 Partner Revenue Command Center

#### Purpose

Give the partnerships leader one home for revenue, pipeline, claims, disputes, approvals, partner health, and investment decisions.

#### Functional Requirements

The command center should display:

- Controlled Partner Revenue
- Partner-sourced pipeline
- Partner-influenced pipeline
- Accepted claims
- Rejected claims
- Payout-eligible revenue
- Partner ROI
- Disputed revenue
- Shadow revenue risk
- Top partners
- Weak partners
- Partner revenue concentration
- Approval aging
- Dispute aging
- Payout exposure

#### Rationale

The partnerships leader needs to manage the function like a CRO manages pipeline.

#### Second-Order Thinking

This feature is not only reporting. It is a political instrument that helps the partnerships leader earn credibility with CFO, CRO, and CEO.

#### Priority

MVP / V1

---

### 10.2 Partner Registry

#### Purpose

Create the operating record for every partner.

#### Functional Requirements

Each partner profile should include:

- Partner name
- Legal entity name
- Partner type
- Partner tier
- Assigned internal owner
- Region
- Country
- Industry
- Products covered
- Agreement status
- Risk status
- Main contacts
- Compliance documents
- Activity history
- Revenue history
- Payout readiness status

#### Rationale

Without a clean partner registry, every downstream workflow becomes messy.

#### Second-Order Thinking

The registry should not be a static database. It should connect to activity, revenue, agreements, claims, and performance.

#### Priority

MVP

---

### 10.3 Partner Lifecycle Management

#### Purpose

Move partners through defined stages.

#### Lifecycle Stages

- Prospect
- Applied
- Approved
- Contracted
- Onboarding
- Activated
- Producing
- Strategic
- Dormant
- Suspended
- Terminated

#### Functional Requirements

- Configurable stages
- Stage change history
- Stage requirements
- Owner assignment
- Onboarding checklist
- Activation checklist
- Dormancy alerts
- Termination reason

#### Rationale

Predictable revenue requires knowing not just who exists, but where each partner is in their economic maturity.

#### Second-Order Thinking

Lifecycle stages create leading indicators before revenue appears.

#### Priority

MVP / V1

---

### 10.4 Deal Registration

#### Purpose

Capture partner-sourced or partner-influenced opportunities before they become messy.

#### Functional Requirements

Deal registration should support:

- Partner-submitted deals
- Internal-submitted deals
- Customer/account matching
- Contact information
- Product/service selection
- Estimated deal value
- Expected close date
- Partner role
- Evidence upload
- Submission timestamp
- Duplicate check
- Agreement check
- Approval workflow
- CRM link

#### Rationale

Deal registration is the first structured revenue signal.

#### Second-Order Thinking

This should not be positioned as form submission. It should be positioned as partner revenue claim capture.

#### Priority

MVP

---

### 10.5 Attribution Workflow

#### Purpose

Decide whether the partner deserves credit.

#### Functional Requirements

The workflow should support:

- Accepted
- Rejected
- Duplicate
- Needs evidence
- Protected
- Expired
- Disputed
- Multi-partner split
- Sales override
- Finance review required
- Decision notes
- Decision owner
- Decision timestamp
- Audit trail

#### Rationale

Revenue predictability depends on consistent attribution rules.

#### Second-Order Thinking

Attribution decisions affect partner trust, sales compensation, finance obligations, and executive reporting. They must be visible and explainable.

#### Priority

MVP

---

### 10.6 Protection Window Engine

#### Purpose

Protect partners from being bypassed after they source or influence an opportunity.

#### Functional Requirements

The engine should support:

- 30/60/90/180-day protection windows
- Custom protection windows
- Product-specific protection
- Account-level protection
- Contact-level protection
- Territory-level protection
- Renewal protection
- Expiry alerts
- Breach alerts
- Override workflow

#### Rationale

Protection windows increase partner trust and reduce shadow revenue.

#### Second-Order Thinking

Partner trust directly affects whether partners keep submitting opportunities.

#### Priority

MVP / V1

---

### 10.7 Agreement Rulebook

#### Purpose

Operationalize commercial terms.

#### Functional Requirements

The rulebook should support:

- Agreement start date
- Agreement end date
- Agreement type
- Eligible deal types
- Eligible partner roles
- Eligible products
- Eligible geographies
- Commission rates
- Revenue-share rates
- Margin-share logic
- Payout triggers
- Caps and floors
- Exclusions
- Renewal terms
- Special approvals
- Rule versioning

#### Rationale

Agreements must be translated into rules before revenue can be governed.

#### Second-Order Thinking

This is where the product moves from relationship management into financial control.

#### Priority

MVP / V1

---

### 10.8 Payout Eligibility Preview

#### Purpose

Show whether a deal may create partner payout liability.

#### Functional Requirements

The feature should show:

- Eligible / not eligible
- Missing conditions
- Estimated amount
- Agreement rule applied
- Revenue validation needed
- Finance approval needed
- Invoice required
- Partner statement status
- Explanation of calculation

#### Rationale

This gives CFO relevance without forcing full ERP integration at the beginning.

#### Second-Order Thinking

Payout preview is the bridge between partnerships and finance.

#### Priority

MVP / V1

---

### 10.9 Partner Statements

#### Purpose

Give partners transparency into what they earned and why.

#### Functional Requirements

Partner statements should include:

- Deals submitted
- Deals accepted
- Deals rejected
- Closed-won deals
- Eligible payouts
- Pending payouts
- Paid payouts
- Disputed payouts
- Adjustments
- Tax/invoice references
- Statement period
- Exportable PDF/CSV

#### Rationale

Partner statements reduce manual follow-up and increase trust.

#### Second-Order Thinking

A partner statement is the external version of the internal partner revenue ledger. It must be accurate, explainable, and confidence-building.

#### Priority

V1 / V2

---

### 10.10 Dispute Management

#### Purpose

Resolve conflicts around attribution, payout, rejection, or delay.

#### Functional Requirements

Dispute management should support:

- Dispute submission
- Evidence upload
- Dispute category
- Internal review
- Sales input
- Finance input
- Decision notes
- Adjustment creation
- Appeal workflow
- Resolution SLA
- Dispute audit trail

#### Rationale

As partnerships become material, disputes become inevitable.

#### Second-Order Thinking

Disputes are not edge cases. They are proof that the channel is economically meaningful.

#### Priority

V1

---

### 10.11 Partner P&L

#### Purpose

Show whether each partner is economically worth scaling.

#### Functional Requirements

Partner P&L should include:

- Partner-sourced revenue
- Partner-influenced revenue
- Gross margin
- Payout cost
- Co-marketing cost
- Enablement cost
- Support cost
- Net contribution
- ROI
- Payback
- Strategic value score

#### Rationale

Leadership needs to know whether partners generate profitable growth, not just activity.

#### Second-Order Thinking

Partner P&L moves the product from operational software to strategic finance infrastructure.

#### Priority

V2 / V3

---

### 10.12 Quarterly CRO/CFO Pack

#### Purpose

Turn product data into executive decision material.

#### Functional Requirements

The pack should include:

- Partner revenue growth
- Partner pipeline coverage
- Partner forecast
- Payout liability
- Dispute exposure
- Revenue leakage risk
- Partner concentration
- Partner ROI
- Program recommendations
- Investment recommendations
- Underperforming partner list
- Strategic partner list

#### Rationale

The pack helps the partnerships leader communicate in the language of revenue and finance.

#### Second-Order Thinking

The executive pack should become the product’s internal viral loop.

#### Priority

V1 / V2

---

## 11. Indirect Product Features and Platform Capabilities

Indirect features are not always headline features, but they make the product enterprise-grade.

---

### 11.1 Data Quality Engine

#### Functional Requirements

- Duplicate detection
- Account matching
- Contact matching
- Missing field detection
- CRM hygiene scoring
- Partner claim confidence
- Revenue event confidence
- Data completeness scoring
- Integration discrepancy detection

#### Rationale

Bad data kills trust in partner revenue reporting.

#### Second-Order Thinking

In this category, data quality is not technical hygiene. It is commercial credibility.

#### Priority

V1

---

### 11.2 Integration Health Monitor

#### Functional Requirements

- Last sync timestamp
- Failed webhook logs
- API error history
- Field mapping errors
- Duplicate sync warnings
- Retry queue
- Dead-letter queue
- Admin alerts
- Integration uptime dashboard

#### Rationale

If integrations fail silently, the revenue line becomes unreliable.

#### Second-Order Thinking

The product should not only integrate with systems. It should prove that integrations are healthy.

#### Priority

V1 / V2

---

### 11.3 Permission and Role Engine

#### Functional Requirements

- Internal roles
- External partner roles
- Finance-only fields
- Sales-only actions
- Partner-only visibility
- Executive read-only access
- Approval authority
- Override authority
- Field-level permissions
- Object-level permissions

#### Rationale

Partner revenue touches sensitive commercial, financial, and relationship data.

#### Second-Order Thinking

Permissions are a trust feature, not just a security feature.

#### Priority

MVP / V1

---

### 11.4 Audit Log and Event History

#### Functional Requirements

The audit log should track:

- Who created a claim
- Who approved a claim
- Who changed attribution
- Who changed payout eligibility
- Who overrode a rule
- Which integration updated the record
- What changed
- When the change happened
- Previous value
- New value

#### Rationale

Finance, legal, and partner disputes require traceability.

#### Second-Order Thinking

The audit trail becomes the product’s defense system during conflict.

#### Priority

MVP

---

### 11.5 Rule Simulation

#### Functional Requirements

The product should simulate:

- Commission rate changes
- Protection-window changes
- Tier changes
- Partner-specific rule changes
- Payout liability under multiple scenarios
- Partner profitability under multiple scenarios
- Program design alternatives

#### Rationale

Mature partnership programs need scenario planning.

#### Second-Order Thinking

Rule simulation turns the product into a strategic planning tool, not only workflow software.

#### Priority

V2 / V3

---

### 11.6 Localization Layer

#### Functional Requirements

For Saudi and GCC readiness, support:

- Arabic and English interface
- Right-to-left layout support
- Gregorian and Hijri date references where useful
- VAT number fields
- Commercial Registration fields
- National Address fields
- IBAN certificate storage
- Authorized signatory fields
- ZATCA invoice references
- Local approval hierarchy
- Local entity structures
- Local document storage requirements

#### Rationale

Localization is required for enterprise fit in Saudi and GCC markets.

#### Second-Order Thinking

Localization is not translation. It is operating-model fit.

#### Priority

V1 / V2 depending on target launch market

---

## 12. Integration Architecture

### 12.1 Integration Philosophy

The product should operate as an **overlay and logic layer** first. It should not require customers to replace CRM, ERP, billing, or finance systems.

The integration strategy should follow this sequence:

1. Manual-safe workflow
2. CSV import/export
3. CRM link and light sync
4. CRM native integration
5. Selective CRM write-back
6. Billing event import
7. ERP/accounting reference integration
8. Settlement and reconciliation integration
9. Data warehouse export
10. Advanced monitoring and automation

### 12.2 Integration Map

| Integration | Required For | Direction | Priority | Rationale |
|---|---|---:|---:|---|
| CRM | Accounts, opportunities, sales stages, owners | Read/write | Must-have | CRM is where pipeline lives |
| ERP/accounting | Invoices, vendor records, payment status, GL references | Mostly read; later write/export | V1/V2 | Finance validation and reconciliation |
| Billing/subscription | Revenue events, renewals, collections, refunds | Read | V1/V2 | Needed for revenue and payout eligibility |
| CPQ/product catalog | Product eligibility, pricing, margin, SKUs | Read | V2 | Needed for rule accuracy |
| CLM/e-signature | Agreement source, contract metadata | Read/import | V1 | Needed for agreement governance |
| Identity/SSO | Internal and partner access | Auth/read | MVP | Enterprise access control |
| Data warehouse/BI | Executive analytics and historical reporting | Export/read | V1 | Needed for enterprise reporting |
| Communication tools | Notifications, approvals, alerts | Push | V1 | Drives workflow adoption |
| Ticketing/support | Partner issues and disputes | Read/write | V2 | Useful for service-heavy ecosystems |
| Payment rails | Payout execution | Write/read | V2/V3 | Only after entitlement is trusted |
| ZATCA/e-invoicing | Saudi invoice compliance references | Write/read | V2 | Required for localized finance workflows |
| Bank/IBAN validation | Partner payout readiness | Read/verify | V2 | Reduces payout failure |
| KYC/KYB | Partner verification | Read/write | V2 | Useful for regulated sectors |
| Data enrichment | Company profile, industry, size | Read | Optional | Improves segmentation and scoring |

---

### 12.3 CRM Integration

#### Required Systems

- Salesforce
- HubSpot
- Microsoft Dynamics
- Zoho CRM

#### Objects to Ingest

- Account
- Contact
- Lead
- Opportunity
- Product
- Owner
- Stage
- Close date
- Amount
- Source fields
- Campaign fields
- Custom partner fields

#### CRM Write-Backs

- Partner involved: yes/no
- Partner name
- Partner role
- Deal registration ID
- Attribution status
- Protection window expiry
- Payout eligibility flag
- Dispute flag
- Partner claim link
- Partner owner

#### Rationale

CRM is the sales team’s system of work. The product should not force sales to abandon it.

#### Second-Order Thinking

Write back only what sales needs. Do not overload CRM with every partner finance detail.

---

### 12.4 ERP and Accounting Integration

#### Required Systems

- SAP
- Oracle
- NetSuite
- Microsoft Dynamics Finance
- QuickBooks
- Xero
- Odoo where relevant

#### Data Needed

- Customer invoice
- Invoice amount
- Invoice date
- Payment status
- Revenue recognition reference
- Vendor record
- Partner invoice
- Payment batch
- Credit note
- Refund
- Tax reference
- GL account

#### Rationale

ERP is where finance trust lives.

#### Second-Order Thinking

In MVP, do not require direct ERP integration. Start with exports, CSV imports, and finance evidence packs. Deep ERP integration should come after customers trust entitlement logic.

---

### 12.5 Billing and Subscription Integration

#### Required Systems

- Stripe Billing
- Chargebee
- Zuora
- Recurly
- Paddle
- Adyen
- Checkout.com
- HyperPay or regional PSPs where relevant

#### Data Needed

- Subscription ID
- Customer ID
- Invoice ID
- Payment status
- Renewal
- Upgrade
- Downgrade
- Refund
- Cancellation
- Usage amount
- Currency

#### Rationale

Billing tells the product whether partner-generated revenue actually materialized.

#### Second-Order Thinking

Billing integration is not only for payments. It is for proving revenue reality.

---

### 12.6 CPQ and Product Catalog Integration

#### Required Systems

- Salesforce CPQ
- HubSpot Quotes
- Oracle CPQ
- SAP CPQ
- DealHub
- PROS

#### Data Needed

- Product SKU
- Product family
- Pricing
- Discount
- Bundle
- Margin estimate
- Contract term
- Quantity
- Revenue type

#### Rationale

Agreement rules often depend on product eligibility, product family, pricing, margin, or discount.

#### Second-Order Thinking

Without product data, payout rules can become inaccurate when commission eligibility differs by product line.

---

### 12.7 CLM and E-Signature Integration

#### Required Systems

- DocuSign
- Adobe Sign
- PandaDoc
- Ironclad
- ContractBook
- SharePoint / Google Drive for document storage

#### Data Needed

- Agreement ID
- Effective date
- Expiry date
- Partner legal entity
- Agreement type
- Products covered
- Commission terms
- Termination terms
- Renewal terms
- Signed PDF link

#### Rationale

The product needs operational agreement metadata, not just document storage.

#### Second-Order Thinking

The hardest part is not storing contracts. It is translating contract terms into executable rules.

---

### 12.8 Identity and Access Management Integration

#### Required Systems

- Okta
- Microsoft Entra ID
- Google Workspace
- Auth0
- OneLogin

#### Capabilities Needed

- SSO
- SCIM provisioning
- MFA
- Partner user access
- Internal/external user separation
- Role-based permissions
- Field-level security

#### Rationale

Enterprise adoption depends on secure access control.

#### Second-Order Thinking

Partner portals create a multi-boundary security problem because external users need controlled visibility into internal commercial workflows.

---

### 12.9 Data Warehouse and BI Integration

#### Required Systems

- Snowflake
- BigQuery
- Redshift
- Databricks
- Power BI
- Tableau
- Looker

#### Data to Export

- Partner master
- Partner claims
- Attribution decisions
- Revenue events
- Payout eligibility
- Partner performance
- Disputes
- Approval aging
- Partner P&L
- Cohort metrics

#### Rationale

Large customers will want the partner revenue dataset in their enterprise analytics stack.

#### Second-Order Thinking

Becoming the source of partner revenue truth does not mean locking data inside the product. Enterprise trust increases when data can flow outward.

---

### 12.10 Communication and Collaboration Integration

#### Required Systems

- Microsoft Teams
- Slack
- Email
- WhatsApp Business where relevant
- Internal notification systems

#### Events to Push

- New deal registration
- Claim pending review
- Claim accepted or rejected
- Protection window expiring
- Dispute opened
- Finance approval needed
- Payout eligibility changed
- Partner statement ready

#### Rationale

Workflow adoption depends on timely alerts and approvals.

#### Second-Order Thinking

Notifications should drive action, not noise. Every alert should map to a required decision or meaningful update.

---

### 12.11 Ticketing and Support Integration

#### Required Systems

- Zendesk
- Freshdesk
- ServiceNow
- Jira Service Management
- Intercom

#### Data Needed

- Partner support tickets
- Dispute-related support items
- SLA data
- Issue category
- Resolution status

#### Rationale

Service-heavy ecosystems need visibility into partner issues and partner support load.

#### Second-Order Thinking

Partner support cost should eventually feed into Partner P&L.

---

### 12.12 Payment Rails and Payout Integration

#### Required Systems

- Stripe Connect
- Adyen for Platforms
- Bank transfer systems
- ERP payment files
- Local payment providers where relevant

#### Capabilities Needed

- Payout batch export
- Payment status import
- Failed payout tracking
- Partner bank readiness
- Statement-to-payment reconciliation

#### Rationale

Payment automation should only come after payout entitlement is trusted.

#### Second-Order Thinking

If payment automation is introduced before attribution and eligibility are trusted, the product amplifies financial risk.

---

### 12.13 KYC / KYB and Payout Readiness Integration

#### Capabilities Needed

- Partner legal entity verification
- Commercial registration validation
- VAT number capture
- IBAN certificate upload
- Authorized signatory capture
- Risk status
- Compliance document expiry tracking

#### Rationale

Partner payout readiness requires more than commercial attribution. Finance needs verified partner identity and payment documentation.

#### Second-Order Thinking

In regulated or finance-adjacent sectors, partner verification becomes a gating requirement for payout eligibility.

---

### 12.14 Saudi and GCC Finance Localization Integration

#### Capabilities Needed

- VAT metadata
- ZATCA invoice references
- CR number
- National Address
- Arabic legal name
- IBAN certificate
- Entity hierarchy
- Local approval chain

#### Rationale

Saudi enterprise workflows require local finance and documentation fields.

#### Second-Order Thinking

Saudi localization should be part of enterprise operating fit, not a UI translation exercise.

---

## 13. User Workflows

### 13.1 Partner Onboarding Workflow

1. Internal user creates partner profile.
2. Partner submits legal and commercial information.
3. Partner uploads compliance documents.
4. Internal owner reviews submission.
5. Legal links or uploads agreement.
6. Agreement metadata is extracted or entered.
7. Finance validates payout readiness information.
8. Admin assigns partner type and tier.
9. Partner receives portal access.
10. Partner completes enablement checklist.
11. Partner becomes active.

#### Success Metric

Time from partner invitation to active partner status.

---

### 13.2 Partner Revenue Claim Workflow

1. Partner or internal user submits a deal/claim.
2. System checks customer/account match.
3. System checks duplicate claims.
4. System checks agreement eligibility.
5. System assigns protection window.
6. Partnership manager reviews claim.
7. Sales owner confirms opportunity context.
8. Claim is accepted, rejected, or disputed.
9. Accepted claim links to CRM opportunity.
10. Claim becomes part of Controlled Partner Revenue if requirements are met.

#### Success Metric

Percentage of partner claims accepted with sufficient evidence.

---

### 13.3 Attribution Approval Workflow

1. Claim enters review queue.
2. System identifies partner role.
3. System checks prior claims and protection windows.
4. Sales receives notification.
5. Sales confirms or challenges attribution.
6. Partnership manager approves attribution.
7. Override request is escalated if needed.
8. Final attribution decision is recorded.
9. CRM is updated.
10. Audit log is preserved.

#### Success Metric

Time from claim submission to attribution decision.

---

### 13.4 Payout Eligibility Workflow

1. Deal becomes closed-won.
2. Revenue event is created or imported.
3. System checks agreement rule.
4. System checks attribution status.
5. System checks protection status.
6. System checks revenue validation.
7. System calculates estimated payout.
8. Finance reviews missing conditions.
9. Claim becomes payout-eligible or not eligible.
10. Partner statement is updated.

#### Success Metric

Time from closed-won to payout eligibility determination.

---

### 13.5 Dispute Workflow

1. Partner or internal user opens dispute.
2. System captures disputed object.
3. Evidence is uploaded.
4. Internal owner reviews history.
5. Sales and finance provide input where needed.
6. Decision is made.
7. Adjustment is applied if needed.
8. Partner is notified.
9. Audit trail is updated.
10. Dispute is closed.

#### Success Metric

Dispute resolution time and dispute recurrence rate.

---

### 13.6 Quarterly Operating Review Workflow

1. System generates quarterly partner revenue pack.
2. Partnerships leader reviews partner performance.
3. CRO reviews pipeline and revenue impact.
4. CFO reviews payout liability and control exposure.
5. CEO/GM reviews strategic investment recommendations.
6. Decisions are made on partner tiers, incentives, terminations, renegotiations, and investment.
7. Product records decisions as operating actions.

#### Success Metric

Percentage of executive partner investment decisions supported by system-generated evidence.

---

## 14. Reporting and Analytics Requirements

### 14.1 Head of Partnerships Dashboard

Should show:

- Controlled Partner Revenue
- Partner-sourced pipeline
- Partner-influenced pipeline
- Partner activation rate
- Partner contribution by type
- Partner tier movement
- Claim acceptance rate
- Rejected and disputed claims
- Underperforming partners
- Top strategic partners

### 14.2 CRO Dashboard

Should show:

- Partner-sourced opportunities
- Partner-influenced opportunities
- Win rate by partner
- Sales cycle by partner
- Partner pipeline forecast
- Channel conflict rate
- Protected revenue
- Partner impact on sales productivity

### 14.3 CFO Dashboard

Should show:

- Payout-eligible revenue
- Estimated payout liability
- Approved payouts
- Pending payouts
- Paid payouts
- Payable aging
- Disputes
- Adjustments
- Overpayment risk
- Claims missing finance evidence

### 14.4 CEO / Strategy Dashboard

Should show:

- Partner revenue growth
- Partner ROI
- Strategic partner contribution
- Partner concentration risk
- Market coverage
- Program profitability
- Partner investment recommendations
- Partner types to scale or reduce

### 14.5 Partner Dashboard

Should show:

- Submitted deals
- Accepted deals
- Rejected deals
- Protected deals
- Current opportunity status
- Eligible payouts
- Pending payouts
- Paid payouts
- Disputes
- Enablement status

---

## 15. Non-Functional Requirements

### 15.1 Security

The product must support:

- Role-based access control
- SSO
- MFA
- SCIM provisioning
- Encryption at rest
- Encryption in transit
- Secure API access
- Audit logs
- Field-level security
- Internal/external user separation

### 15.2 Reliability

The product should support:

- Integration retry logic
- Dead-letter queue
- Webhook failure handling
- Sync monitoring
- Backup and recovery
- Incident logging
- Status visibility

### 15.3 Scalability

The architecture should support:

- Thousands of partners
- Millions of events
- High-volume CRM sync
- Large partner portals
- Multi-entity deployments
- Multi-currency transactions
- Role-specific dashboards

### 15.4 Configurability

The product should support:

- Configurable partner types
- Configurable attribution rules
- Configurable approval workflows
- Configurable partner tiers
- Configurable payout conditions
- Configurable dashboards
- Configurable fields where needed

### 15.5 Auditability

The product must preserve:

- Claim history
- Attribution history
- Agreement rule versions
- Approval history
- Payout eligibility history
- Dispute decisions
- Integration updates
- Manual overrides

---

## 16. Roadmap

> **Concordance:** MVP + V1 = **Phase 1 Capture** (the PRM) · V2 = **Phase 2 Settle** · V3 = **Phase 3 Orchestrate**. No V2 capability ships before the Phase-1 exit gate (100+ real claims, 3–5 design partners with finance-accepted evidence packs, weekly active usage).

### 16.1 MVP — Control the Partner Revenue Claim *(Phase 1 — Capture)*

#### Build

- Partner registry
- Agreement metadata
- Deal registration
- Attribution workflow
- Protection window
- CRM link
- Basic partner portal
- Payout eligibility preview *(read/calculate/display only — no execution)*
- Executive dashboard
- Audit log
- CSV import/export

#### Do Not Build Yet

- Full ERP integration
- Any payout execution or approval-to-pay workflow
- Bank/payment-rail write integrations
- Automated ZATCA clearance (capture compliance fields only)
- Escrow or holding of funds
- Complex AI scoring
- Full Partner P&L
- Full CLM
- Full settlement automation

#### Rationale

MVP should prove that the product can create trusted partner revenue truth.

---

### 16.2 V1 — Make Partner Revenue Operational *(Phase 1 — Capture)*

#### Add

- CRM native integration
- CRM write-back
- Approval matrix
- Dispute workflow
- Partner statements
- Finance evidence pack
- Data quality engine
- Quarterly CRO/CFO pack
- Data warehouse export

#### Rationale

This makes the product part of the company’s operating rhythm.

---

### 16.3 V2 — Make Partner Revenue Finance-Ready *(Phase 2 — Settle)*

#### Add

- Billing integration
- ERP/accounting integration
- Invoice matching
- Collection validation
- Payout liability
- Payable aging
- Adjustments
- Refunds
- Credit notes
- Revenue recognition references

#### Rationale

This is where the product becomes CFO-grade.

---

### 16.4 V3 — Make Partner Revenue Investable *(Phase 3 — Orchestrate)*

#### Add

- Partner P&L
- Partner ROI
- Forecasting
- Tier optimization
- Incentive simulation
- Partner concentration risk
- AI recommendations
- Strategic partner planning
- Program design cockpit

#### Rationale

This is where the product becomes a strategic operating system.

---

## 17. Product Capability Matrix

| Capability | MVP | V1 | V2 | V3 |
|---|---:|---:|---:|---:|
| Partner registry | Yes | Enhanced | Enhanced | Enhanced |
| Partner lifecycle | Basic | Full | Full | Full |
| Deal registration | Yes | Enhanced | Enhanced | Enhanced |
| Partner revenue claim ledger | Yes | Full | Full | Full |
| Attribution workflow | Yes | Enhanced | Advanced | Advanced |
| Protection windows | Basic | Full | Full | Full |
| Agreement metadata | Basic | Full | Rule engine | Simulation |
| CRM link | Yes | Native sync | Advanced sync | Advanced sync |
| CRM write-back | Limited | Yes | Yes | Yes |
| Payout eligibility preview | Basic | Full | Finance-grade | Finance-grade |
| Partner statements | No | Yes | Enhanced | Enhanced |
| Dispute management | No | Yes | Enhanced | Enhanced |
| Billing integration | No | Optional | Yes | Yes |
| ERP integration | No | Optional/export | Yes | Yes |
| Settlement/reconciliation | No | No | Yes | Enhanced |
| Partner P&L | No | Basic | Yes | Advanced |
| Forecasting | No | Basic | Enhanced | Advanced |
| AI recommendations | No | No | Optional | Yes |
| CRO/CFO pack | Basic | Yes | Enhanced | Advanced |

---

## 18. Risks and Mitigations

### 18.1 Risk: CRM Data Quality Is Poor

#### Mitigation

- Data quality engine
- Manual correction workflows
- Field mapping
- Confidence scoring
- CRM write-back validation

### 18.2 Risk: Sales Does Not Adopt the Workflow

#### Mitigation

- CRM-native fields
- Minimal sales data entry
- Clear benefit to sales
- Conflict alerts
- Simple approval and override process

### 18.3 Risk: Finance Does Not Trust Payout Eligibility

#### Mitigation

- Agreement-linked rules
- Audit log
- Revenue validation steps
- Finance approval workflow
- Evidence pack

### 18.4 Risk: Product Becomes Too Broad Too Early

#### Mitigation

- Focus MVP on partner revenue claim ledger
- Delay full settlement
- Delay full ERP integration
- Delay advanced AI
- Build modularly

### 18.5 Risk: Product Is Seen as Just Another PRM

#### Mitigation

- Position around Partner Revenue OS
- Lead with Controlled Partner Revenue
- Emphasize attribution, protection, payout eligibility, and finance evidence
- Avoid generic partner portal messaging

### 18.6 Risk: Integration Complexity Slows Time-to-Value

#### Mitigation

- Manual-safe MVP
- CSV import/export
- CRM link before native integration
- Evidence export before ERP integration
- Phased integration roadmap

---

## 19. Open Product Questions

These questions should be answered during discovery and pilot design:

1. Which partner role should be supported first: referral, reseller, co-sell, implementation, or marketplace?
2. Which CRM should be prioritized first: Salesforce, HubSpot, Dynamics, or Zoho?
3. Should the MVP include an external partner portal or internal-only claim capture first?
4. What is the minimum agreement metadata needed for payout eligibility preview?
5. Should payout eligibility preview include estimated amount in MVP?
6. Who approves attribution: partnerships, sales, RevOps, or a joint workflow?
7. What are the default protection windows by partner type?
8. How will duplicate customer matching work in messy CRM environments?
9. Which executive dashboard should be built first: Head of Partnerships, CRO, CFO, or CEO?
10. Should Saudi localization be included in MVP or V1?
11. Should finance evidence packs be PDF, CSV, dashboard, or all three?
12. How much configuration should be self-serve versus implementation-led?
13. Should the product support multi-partner split attribution in MVP or V1?
14. Which integration should come after CRM: billing or ERP?
15. Which industry vertical should be the first beachhead?

---

## 20. Final Product Definition

Partner Revenue OS is a platform that helps companies run partnerships like a predictable revenue line by controlling the full lifecycle from partner identity, deal registration, attribution, protection, agreement rules, revenue validation, payout eligibility, partner statements, finance evidence, executive reporting, and investment decisions.

The product’s deepest value is not managing partners.

The product’s deepest value is helping the company turn partnership activity into governed, forecastable, finance-ready revenue.

The product should help customers answer:

- Which partners are creating revenue?
- Which revenue is truly partner-sourced or partner-influenced?
- Which partner claims are valid?
- Which deals are protected?
- Which agreements apply?
- What payout liability exists?
- Which partners are profitable?
- Which partners deserve more investment?
- Which partner programs create chaos?
- Which partner programs can scale?

The guiding principle for all product decisions is:

> Do not build a *generic* PRM. Build a claim-centric PRM the buyer adopts easily, whose underlying control system turns partnership activity into governed, forecastable, finance-ready revenue — and move no money until Phase 2 (Settle).

---

## Appendix A — One-Page Product Summary

### Product Name

Partner Revenue OS

### Category

Partner Revenue Operations / Partner Revenue Control Layer

### North Star

“When partnerships becomes material, help me run it like a predictable revenue line—so I can scale investment without scaling chaos.”

### Primary User

Head of Partnerships

### Executive Validators

CRO, CFO, CEO / GM

### Core Object

Partner Revenue Claim

### MVP Wedge

Partner Revenue Claim Ledger + Attribution Integrity

### Deployment Posture

Overlay + integrations first; system of record for partner revenue claims over time.

### MVP Must-Haves

- Partner registry
- Agreement metadata
- Deal registration
- Attribution workflow
- Protection windows
- CRM link
- Basic partner portal
- Payout eligibility preview
- Executive dashboard
- Audit log
- CSV import/export

### Expansion Modules

- CRM native integration
- Partner statements
- Finance evidence pack
- Dispute management
- Billing integration
- ERP integration
- Settlement and reconciliation
- Partner P&L
- Forecasting
- Program governance cockpit
- AI partner intelligence

### Strategic Moat

The product’s moat is the accumulated event history of partner claims, attribution decisions, agreement logic, protection windows, payout eligibility, disputes, partner performance, and revenue outcomes.

