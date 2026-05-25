
# Partner Revenue OS — 18-Month Practical Burn-Rate Model Builder
## 10x Practical Q&A + Input Tables + Formulas + Decision Gates

## Purpose

This MD is a practical burn-rate model builder for **Partner Revenue OS**, a Saudi/GCC B2B SaaS company building a **Partner Revenue Control Layer**.

The goal is to convert founder answers into a full 18-month monthly burn-rate model that shows:

- how much cash is burned,
- why the cash is burned,
- what capability or milestone each cost supports,
- when each cost starts,
- which costs are fixed, variable, or step-function,
- which costs are deferrable,
- which costs are dangerous to underfund,
- how revenue and customer cash receipts reduce burn,
- how much funding is needed,
- when to hire,
- when to cut,
- when to accelerate.

The model must treat the product as an enterprise workflow and finance-readiness system, not as a simple dashboard.

---

# 1. Product Context That Controls the Burn Model

## 1.1 Product Definition

Partner Revenue OS helps companies govern partner-generated revenue through:

- Partner Revenue Claim Ledger,
- partner registry,
- deal / claim submission,
- attribution workflow,
- protection windows,
- agreement metadata,
- payout eligibility preview,
- finance evidence,
- dispute tracking,
- audit log,
- dashboards,
- partner portal,
- later integrations.

## 1.2 Core Financial Implication

This product has a higher early burn than lightweight SaaS because it requires:

- workflow UX,
- multi-role permissions,
- auditability,
- evidence storage,
- rule logic,
- customer implementation,
- executive selling,
- finance trust,
- security readiness,
- Saudi/GCC localization,
- GTM education,
- consultative sales.

## 1.3 Main Burn Principle

Burn is justified only when it buys at least one of the following:

| Burn outcome | Meaning |
|---|---|
| Product trust | The platform works reliably enough for sensitive revenue workflows |
| Customer trust | Buyers believe the product can control partner revenue chaos |
| Revenue proof | Customers pay for the product |
| Implementation proof | Customers can be onboarded repeatedly |
| Activation proof | Users process real partner claims |
| Finance proof | CFO / finance users trust evidence and payout logic |
| Reference proof | Customers can become proof for the next buyer |
| Next-round proof | The company can raise capital from demonstrated progress |

If a cost does not support one of these outcomes, it should be delayed, reduced, or removed.

---

# 2. Answering Structure

For every question, answer in this format:

```text
Answer:
Assumption:
Confidence: High / Medium / Low
Source:
Impact on burn:
Can be deferred? Yes / No
Decision owner:
```

## Example

```text
Answer: Hire one backend engineer from Month 2.
Assumption: SAR 26,000 monthly gross salary.
Confidence: Medium.
Source: Founder estimate / market benchmark.
Impact on burn: Adds SAR 26,000 + employer burden monthly.
Can be deferred? No, because claim ledger and rule logic depend on backend capacity.
Decision owner: CTO.
```

---

# 3. Output After Answering

After all questions are answered, build these model outputs:

| Output | Required |
|---|---|
| 18-month gross burn | Yes |
| 18-month net burn | Yes |
| Ending cash by month | Yes |
| Funding need | Yes |
| Minimum cash balance | Yes |
| Runway by month | Yes |
| Burn by function | Yes |
| Burn by phase | Yes |
| Burn by cost behavior | Yes |
| Hiring plan | Yes |
| Product milestone cost | Yes |
| GTM cost and efficiency | Yes |
| Customer implementation cost | Yes |
| Revenue and cash collection | Yes |
| VAT working-capital treatment | Yes |
| GOSI / payroll burden assumptions | Yes |
| Zakat/CIT placeholder if applicable | Yes |
| CAC and CAC payback | Yes |
| Burn multiple | Yes |
| Base/downside/upside cases | Yes |
| Deferrable cost plan | Yes |
| Management action plan | Yes |

---

# 4. Model Tabs to Build

Use these tabs if converting this MD into Excel or Google Sheets.

| Tab | Purpose |
|---|---|
| 01_Control_Panel | Scenario switches, key assumptions, start date, currency |
| 02_Assumptions | All editable assumptions |
| 03_Product_Roadmap | Product modules by month and cost logic |
| 04_Headcount | Roles, salaries, start months, burden |
| 05_Payroll_Burden | GOSI, benefits, contractors, founder deferral |
| 06_Cloud_AI_COGS | Cloud, storage, logs, AI/API, support COGS |
| 07_GTM_Burn | Sales, marketing, events, diagnostics, tools |
| 08_Implementation_CS | Onboarding, training, CS, customer activation |
| 09_GA_Compliance | Legal, accounting, admin, Saudi costs |
| 10_Revenue_Cash | ARR, MRR, bookings, receipts, deferred revenue |
| 11_VAT_Working_Capital | VAT collected, input VAT, VAT payable/remitted |
| 12_Burn_Model | Gross burn, net burn, ending cash, runway |
| 13_SaaS_KPIs | CAC, payback, burn multiple, ARR/FTE |
| 14_Scenarios | Base/downside/upside |
| 15_Decision_Gates | Hiring, integration, GTM scale gates |
| 16_Management_Summary | CFO-style interpretation |

---

# 5. Core Formulas

## 5.1 Gross Burn

```text
Gross Burn =
Product/R&D Burn
+ GTM Burn
+ Customer Success / Implementation Burn
+ COGS Burn
+ G&A / Compliance Burn
```

## 5.2 Net Burn

```text
Net Burn =
Gross Burn
- Customer Cash Receipts
```

If VAT is included in cash movement:

```text
Net Cash Burn =
Gross Burn
+ VAT Remitted
+ Tax/Zakat Paid
- Customer Cash Receipts Excluding VAT
- VAT Collected
```

Then track VAT liability separately.

## 5.3 Ending Cash

```text
Ending Cash =
Opening Cash
+ Financing Inflow
+ Customer Cash Receipts
+ VAT Collected
- Gross Burn
- VAT Remitted
- Tax/Zakat Paid
```

## 5.4 Runway

```text
Forward 3-Month Average Net Burn =
Average(Net Burn M+1, Net Burn M+2, Net Burn M+3)

Runway =
Ending Cash / Forward 3-Month Average Net Burn
```

## 5.5 Funding Need

```text
Funding Need =
MAX(0, Target Minimum Cash Buffer - Minimum Ending Cash)
```

## 5.6 Target Minimum Cash Buffer

```text
Target Minimum Cash Buffer =
Forward 3-Month Average Net Burn × Buffer Months
```

Recommended buffer:

- Conservative: 6 months.
- Normal startup control: 4 months.
- Aggressive: 3 months.

## 5.7 Burn Multiple

```text
Burn Multiple =
Net Burn / Net New ARR
```

Use quarterly or trailing 3-month values to avoid meaningless monthly noise.

## 5.8 CAC

```text
CAC =
Sales & Marketing Spend / New Customers
```

## 5.9 CAC per ARR

```text
CAC per ARR =
Sales & Marketing Spend / New ARR
```

## 5.10 CAC Payback

```text
Monthly Gross Profit per Customer =
ARPA × Gross Margin / 12

CAC Payback Months =
CAC / Monthly Gross Profit per Customer
```

## 5.11 ARR

```text
Ending ARR =
Beginning ARR
+ New ARR
+ Expansion ARR
- Churned ARR
- Contraction ARR
```

## 5.12 Customer Cash Receipts

```text
Customer Cash Receipts =
Annual Upfront Collections
+ Monthly Subscription Collections
+ Implementation Fee Collections
+ Professional Services Collections
```

## 5.13 Deferred Revenue

```text
Deferred Revenue =
Subscription Cash Collected
- Subscription Revenue Recognized
```

---

# 6. Phase-Based Burn Architecture

## Phase 1 — Months 1–3: Foundation Build and Market Learning

### Primary objective

Build the operating foundation and validate buyer pain.

### Cost emphasis

| Cost area | Expected intensity |
|---|---|
| Product/R&D | High |
| GTM | Low to medium |
| G&A/legal | Medium |
| COGS | Low |
| CS/implementation | Low |

### Core spend

- founders,
- first engineers,
- product design,
- basic cloud,
- legal setup,
- accounting setup,
- founder-led discovery,
- sales deck,
- landing page,
- CRM setup.

### Do not overspend on

- large paid ads,
- PR agency,
- major sponsorships,
- full sales team,
- full ERP integration,
- SOC 2 certification,
- enterprise custom work.

### Practical gate

Do not move to GTM scale until the founder can clearly describe:

- who buys,
- why they care,
- what pain is urgent,
- what price range is credible,
- what blocks purchase.

---

## Phase 2 — Months 4–6: Pilot Conversion and Workflow Validation

### Primary objective

Convert early design partners or paid pilots and prove first workflows.

### Cost emphasis

| Cost area | Expected intensity |
|---|---|
| Product/R&D | High |
| GTM | Medium |
| CS/implementation | Medium |
| G&A/legal | Medium |
| COGS | Low to medium |

### Core spend

- attribution workflow,
- claim ledger hardening,
- evidence upload,
- protection windows,
- basic dashboard,
- demo environment,
- diagnostic workshops,
- first customer onboarding,
- pilot agreements,
- security baseline.

### Do not overspend on

- multi-country expansion,
- large sales hiring,
- heavy custom integrations,
- full billing/ERP integrations,
- broad partner portal expansion.

### Practical gate

By the end of Month 6, the company should have:

- at least one real pilot or paid customer,
- a working claim workflow,
- evidence that buyers understand the problem,
- a clearer implementation playbook.

---

## Phase 3 — Months 7–9: Activation and Repeatability

### Primary objective

Turn pilots into active customers and test repeatable sales.

### Cost emphasis

| Cost area | Expected intensity |
|---|---|
| Product/R&D | Medium to high |
| GTM | Medium to high |
| CS/implementation | High |
| COGS | Medium |
| G&A/legal | Medium |

### Core spend

- customer success,
- implementation manager,
- QA,
- workflow reliability,
- case studies,
- GTM hire if justified,
- targeted roundtables,
- better reporting,
- support tooling,
- role-based training.

### Practical gate

Do not hire multiple salespeople unless:

- founder has closed or nearly closed customers,
- pipeline exceeds founder capacity,
- the sales narrative is repeatable,
- implementation is not breaking.

---

## Phase 4 — Months 10–12: Commercial Hardening

### Primary objective

Create a repeatable commercial engine and harden product for more customers.

### Cost emphasis

| Cost area | Expected intensity |
|---|---|
| Product/R&D | Medium |
| GTM | High |
| CS/implementation | High |
| COGS | Medium |
| G&A/legal | Medium to high |

### Core spend

- AE or GTM lead if justified,
- solution consultant if demos are bottlenecked,
- customer marketing,
- implementation templates,
- partner portal improvements,
- saved views,
- admin configurability,
- security documentation,
- limited CRM linkage.

### Practical gate

By Month 12, management should know:

- actual ACV,
- implementation hours per customer,
- early gross margin,
- customer activation rate,
- sales cycle,
- CAC trend,
- which segment has strongest pull.

---

## Phase 5 — Months 13–18: Controlled Scale

### Primary objective

Scale only the motions that have proven conversion, activation, and reference value.

### Cost emphasis

| Cost area | Expected intensity |
|---|---|
| Product/R&D | Medium to high |
| GTM | High |
| CS/implementation | High |
| COGS | Medium to high |
| G&A/compliance | Medium to high |

### Core spend

- more sales capacity if pipeline supports it,
- CS capacity,
- enterprise-readiness,
- selective integrations,
- security/compliance maturity,
- expansion motion,
- reference selling,
- customer marketing,
- RevOps.

### Do not overspend on

- unsupported vertical expansion,
- custom implementation-heavy deals,
- AI features with unclear willingness to pay,
- integration work without repeatability.

### Practical gate

By Month 18, the company should be ready to raise the next round or make a disciplined operating decision.

---

# 7. Practical Monthly Burn Table

Use this table as the main model output.

| Month | Phase | Product/R&D Burn | GTM Burn | CS/Implementation Burn | COGS Burn | G&A/Compliance Burn | Gross Burn | Customer Cash Receipts | VAT Net Movement | Net Burn | Ending Cash | Runway | Decision |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| M1 | Foundation |  |  |  |  |  |  |  |  |  |  |  |  |
| M2 | Foundation |  |  |  |  |  |  |  |  |  |  |  |  |
| M3 | Foundation |  |  |  |  |  |  |  |  |  |  |  |  |
| M4 | Pilot |  |  |  |  |  |  |  |  |  |  |  |  |
| M5 | Pilot |  |  |  |  |  |  |  |  |  |  |  |  |
| M6 | Pilot |  |  |  |  |  |  |  |  |  |  |  |  |
| M7 | Activation |  |  |  |  |  |  |  |  |  |  |  |  |
| M8 | Activation |  |  |  |  |  |  |  |  |  |  |  |  |
| M9 | Activation |  |  |  |  |  |  |  |  |  |  |  |  |
| M10 | Hardening |  |  |  |  |  |  |  |  |  |  |  |  |
| M11 | Hardening |  |  |  |  |  |  |  |  |  |  |  |  |
| M12 | Hardening |  |  |  |  |  |  |  |  |  |  |  |  |
| M13 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |
| M14 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |
| M15 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |
| M16 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |
| M17 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |
| M18 | Scale |  |  |  |  |  |  |  |  |  |  |  |  |

---

# 8. Practical Input Questions

## A. Capital and Runway

### Q1. Starting cash at Month 1?

Your Answer:

### Q2. Target runway to preserve?

Default: 4–6 months of forward burn.

Your Answer:

### Q3. Target Month 18 milestone?

Choose one:

| Milestone type | Description |
|---|---|
| Pre-seed proof | MVP + 3–5 paying customers |
| Seed proof | 10–25 customers + SAR 1.5M–4.5M ARR |
| Strategic proof | 3–5 enterprise customers + strong reference evidence |
| Capital-efficient proof | Lower ARR but very low burn and strong retention |
| Enterprise-readiness proof | Fewer customers but high ACV and procurement readiness |

Your Answer:

### Q4. Planned funding raised before Month 18?

Your Answer:

### Q5. Minimum cash balance never to go below?

Your Answer:

---

## B. Product Build Scope

### Q6. Which MVP modules are non-negotiable?

Default non-negotiable:

| Module | Include? | Month needed | Why |
|---|---|---:|---|
| Partner registry | Yes | M3 | Needed for partner identity |
| Claim ledger | Yes | M3 | Core product object |
| Claim submission | Yes | M3/M4 | Needed for customer workflow |
| Attribution workflow | Yes | M5/M6 | Core governance value |
| Protection windows | Yes | M5/M6 | Partner trust mechanism |
| Agreement metadata | Yes | M6 | Needed for eligibility logic |
| Evidence upload | Yes | M5/M6 | Needed for trust |
| Audit log | Yes | M3/M4 | Needed for finance/legal defensibility |
| Basic dashboard | Yes | M6 | Needed for executive value |
| Basic partner portal | Maybe | M6–M9 | Useful, but can be limited |
| Payout eligibility preview | Yes | M7–M9 | CFO relevance |

Your Answer:

### Q7. Which features must not be built before Month 12?

Default defer:

| Feature | Defer until | Why |
|---|---:|---|
| Full ERP integration | M13+ | Expensive and customer-specific |
| Payment execution | M18+ | Too risky before entitlement trust |
| Advanced AI recommendations | M13+ | Needs clean data first |
| Full Partner P&L | M13+ | Needs cost/margin data |
| Full CLM | Avoid | Wrong category |
| Full settlement/reconciliation | M18+ | Needs finance maturity |

Your Answer:

---

## C. Headcount and Payroll

### Q8. Founder cash salaries by month?

| Founder | Market salary | Cash salary M1–M6 | Cash salary M7–M12 | Cash salary M13–M18 |
|---|---:|---:|---:|---:|
| CEO/Product Founder |  |  |  |  |
| CTO/Technical Founder |  |  |  |  |
| Other founder |  |  |  |  |

### Q9. Engineering hiring plan

| Role | Start month | Gross monthly salary | Employer burden % | Loaded monthly cost | Must-have? | Deferrable? |
|---|---:|---:|---:|---:|---|---|
| Full-stack engineer |  |  |  |  |  |  |
| Backend engineer |  |  |  |  |  |  |
| Frontend engineer |  |  |  |  |  |  |
| QA/test engineer |  |  |  |  |  |  |
| DevOps/cloud contractor |  |  |  |  |  |  |
| Security contractor |  |  |  |  |  |  |
| Data/analytics engineer |  |  |  |  |  |  |

### Q10. GTM hiring plan

| Role | Start month | Gross monthly salary | Employer burden % | Loaded monthly cost | Hiring trigger |
|---|---:|---:|---:|---:|---|
| GTM lead |  |  |  |  |  |
| SDR |  |  |  |  |  |
| Account Executive |  |  |  |  |  |
| Solution Consultant |  |  |  |  |  |
| Marketing/content lead |  |  |  |  |  |

### Q11. Customer success hiring plan

| Role | Start month | Gross monthly salary | Employer burden % | Loaded monthly cost | Capacity |
|---|---:|---:|---:|---:|---|
| Implementation manager |  |  |  |  |  |
| Customer success manager |  |  |  |  |  |
| Support specialist |  |  |  |  |  |

### Q12. G&A hiring plan

| Role | Start month | Gross monthly salary | Employer burden % | Loaded monthly cost |
|---|---:|---:|---:|---:|
| Finance/admin |  |  |  |  |
| HR/payroll support |  |  |  |  |
| Operations manager |  |  |  |  |

---

# 9. Payroll Burden Practical Rules

Do not use one payroll burden for everyone.

Use separate assumptions:

| Worker type | Employer burden input | Notes |
|---|---:|---|
| Saudi employee | Input required | Include applicable employer contribution and benefits |
| Non-Saudi employee | Input required | Include applicable employer contribution, visa/iqama/insurance assumptions if relevant |
| Contractor | Input required | Usually no payroll burden but may include VAT/invoice cost |
| Founder | Input required | May defer cash salary |
| Sales employee | Input required | Include commission timing |
| Part-time advisor | Input required | Retainer or success-based |

## Q13. Payroll burden assumptions

Your Answer:

---

# 10. Cloud, Infrastructure, AI/API, and COGS

## Q14. Cloud stack

Choose:

| Option | Burn profile |
|---|---|
| Lean managed cloud | Lower early burn, faster setup |
| Enterprise cloud from day one | Higher burn, stronger procurement readiness |
| Data-residency-focused setup | Higher burn, may help large Saudi/GCC customers |

Your Answer:

## Q15. Monthly base cloud cost before customers

Your Answer:

## Q16. Variable cloud cost per customer per month

Default ranges:

| Cost item | Default range |
|---|---:|
| App hosting | SAR 300–1,500/customer/month |
| Database | SAR 200–1,000/customer/month |
| Storage/evidence | SAR 100–700/customer/month |
| Logs/observability | SAR 100–500/customer/month |
| Email/notifications | SAR 50–250/customer/month |
| Security/scanning | SAR 100–500/customer/month |

Your Answer:

## Q17. AI/API usage

| AI use case | Start month | Cost driver | Monthly cap | Must-have? |
|---|---:|---|---:|---|
| Evidence summarization |  | Tokens/files |  |  |
| Duplicate claim assistance |  | Events/checks |  |  |
| Agreement rule extraction |  | Documents/pages |  |  |
| Executive report drafting |  | Reports |  |  |
| Support assistant |  | Tickets |  |  |

Your Answer:

## Q18. AI/API monthly budget cap

Default: cap AI/API spend to a percentage of revenue or per-customer maximum until pricing covers it.

Your Answer:

---

# 11. Security, Compliance, and Enterprise Readiness

## Q19. Security baseline by Month 6

| Control | Include by M6? | Cost driver |
|---|---|---|
| RBAC |  | Engineering |
| Audit logs |  | Engineering/storage |
| Encryption in transit |  | Engineering/cloud |
| Encryption at rest |  | Cloud/security |
| Secure authentication |  | Auth provider/engineering |
| Backup and restore |  | Cloud/DevOps |
| Access logs |  | Logs/storage |
| Security documentation |  | Legal/security |
| Data retention policy |  | Legal/product |

Your Answer:

## Q20. Enterprise security by Month 12 or 18

| Control | Month needed | Why |
|---|---:|---|
| SSO |  |  |
| SCIM |  |  |
| DPA |  |  |
| Vendor security questionnaire |  |  |
| Penetration test |  |  |
| SOC 2 readiness |  |  |
| ISO readiness |  |  |
| Data residency assessment |  |  |

Your Answer:

---

# 12. Saudi / KSA Operating Inputs

## Q21. Legal entity and operating setup

| Item | Start month | One-time cost | Monthly cost |
|---|---:|---:|---:|
| Incorporation / entity setup |  |  |  |
| Commercial registration |  |  |  |
| Bank account setup |  |  |  |
| VAT registration support |  |  |  |
| Payroll provider |  |  |  |
| Accounting setup |  |  |  |
| Legal templates |  |  |  |
| Bilingual contracts |  |  |  |

Your Answer:

## Q22. VAT treatment

Answer:

- VAT rate assumption:
- VAT registration month:
- VAT filing/remittance timing:
- Input VAT recoverability assumption:
- Do we invoice annual contracts upfront with VAT? Yes/No

## Q23. Zakat/CIT treatment

Answer:

- Saudi / GCC ownership:
- Foreign ownership:
- Expected taxable profit before Month 18: Yes/No
- Tax/zakat advisor needed: Yes/No
- Monthly provision modeled? Yes/No

## Q24. E-invoicing readiness

Answer:

- Tool used:
- Setup month:
- Monthly cost:
- Need integration to accounting system? Yes/No

## Q25. Localization

| Localization item | Month needed | Cost | Must-have? |
|---|---:|---:|---|
| Arabic sales deck |  |  |  |
| Arabic website section |  |  |  |
| Arabic contracts |  |  |  |
| Arabic UI |  |  |  |
| RTL support |  |  |  |
| Saudi finance fields |  |  |  |
| VAT/CR/IBAN fields |  |  |  |

Your Answer:

---

# 13. Revenue, Pricing, and Cash Receipts

## Q26. Pricing packages

| Package | ARR | Monthly equivalent | Implementation fee | Target customer |
|---|---:|---:|---:|---|
| Starter Control |  |  |  |  |
| Growth Control |  |  |  |  |
| Enterprise Control |  |  |  |  |

## Q27. Package mix

| Package | % of new customers |
|---|---:|
| Starter |  |
| Growth |  |
| Enterprise |  |

## Q28. Customer ramp

| Month | New customers | Ending customers | Notes |
|---:|---:|---:|---|
| M1 |  |  |  |
| M2 |  |  |  |
| M3 |  |  |  |
| M4 |  |  |  |
| M5 |  |  |  |
| M6 |  |  |  |
| M7 |  |  |  |
| M8 |  |  |  |
| M9 |  |  |  |
| M10 |  |  |  |
| M11 |  |  |  |
| M12 |  |  |  |
| M13 |  |  |  |
| M14 |  |  |  |
| M15 |  |  |  |
| M16 |  |  |  |
| M17 |  |  |  |
| M18 |  |  |  |

## Q29. Billing terms

| Billing type | % of customers | Cash timing |
|---|---:|---|
| Annual upfront |  |  |
| Semi-annual |  |  |
| Quarterly |  |  |
| Monthly |  |  |

## Q30. Collection delay

Your Answer:

## Q31. Implementation fee collection

| Collection timing | % |
|---|---:|
| At signing |  |
| At kickoff |  |
| At go-live |  |
| After acceptance |  |

---

# 14. Implementation and Customer Success Practical Model

## Q32. Implementation scope by package

| Task | Starter hours | Growth hours | Enterprise hours |
|---|---:|---:|---:|
| Partner data import |  |  |  |
| Agreement metadata setup |  |  |  |
| Claim workflow setup |  |  |  |
| Protection window setup |  |  |  |
| User/role configuration |  |  |  |
| Dashboard setup |  |  |  |
| Partner portal setup |  |  |  |
| Training |  |  |  |
| Finance evidence setup |  |  |  |
| Project management |  |  |  |

## Q33. Loaded hourly cost for implementation labor

Your Answer:

## Q34. Implementation margin target

Default:

| Stage | Target implementation margin |
|---|---:|
| First 5 customers | 20%–40% |
| Customers 6–15 | 40%–60% |
| Customers 16+ | 50%–70% |

Your Answer:

## Q35. Customer activation milestones

| Milestone | Target day after kickoff |
|---|---:|
| Workspace configured |  |
| Partner list uploaded |  |
| First users trained |  |
| First claim submitted |  |
| First claim reviewed |  |
| First accepted claim |  |
| First protection window |  |
| First payout eligibility preview |  |
| First dashboard review |  |
| First value review |  |

Your Answer:

---

# 15. GTM Practical Burn Model

## Q36. Primary GTM motion by phase

| Phase | Main motion | Monthly budget |
|---|---|---:|
| M1–M3 | Founder-led discovery |  |
| M4–M6 | Paid pilots / design partners |  |
| M7–M9 | Repeatable outbound + CS proof |  |
| M10–M12 | Commercial hardening |  |
| M13–M18 | Controlled scale |  |

## Q37. GTM cost lines

| Cost line | Start month | Monthly cost | Driver | Deferrable? |
|---|---:|---:|---|---|
| Founder-led sales allocation |  |  | Founder time |  |
| CRM |  |  | Users |  |
| LinkedIn/Sales tools |  |  | Seats |  |
| Data enrichment |  |  | Contacts/accounts |  |
| Website |  |  | One-time/monthly |  |
| Content |  |  | Assets/month |  |
| Design collateral |  |  | Assets/month |  |
| Paid ads |  |  | Budget |  |
| Roundtables |  |  | Events/month |  |
| Travel/client meetings |  |  | Trips/month |  |
| Diagnostic workshops |  |  | Workshops/month |  |
| Sales engineering |  |  | Hours/month |  |
| Commissions |  |  | New ARR/cash |  |
| Referral fees |  |  | Introduced ARR |  |

## Q38. GTM gating thresholds

Fill these:

| Trigger | Threshold |
|---|---:|
| Hire SDR when monthly qualified opps exceed |  |
| Hire AE when qualified pipeline exceeds |  |
| Increase paid marketing when demo-to-pilot rate exceeds |  |
| Sponsor events when expected pipeline exceeds cost by |  |
| Hire solution consultant when demos/POCs per month exceed |  |
| Hire RevOps when active pipeline opportunities exceed |  |

---

# 16. Cost Behavior Classification

Classify every cost.

| Cost | Fixed | Variable | Step-function | Notes |
|---|---|---|---|---|
| Founder salary | Yes | No | No | Can be deferred |
| Engineers | Yes | No | Step | Hired by roadmap |
| Cloud base | Yes | No | No | Minimum platform cost |
| Cloud usage | No | Yes | No | Scales with customers |
| AI/API | No | Yes | No | Usage cap required |
| Sales salaries | Yes | No | Step | Hire only after pipeline proof |
| Commissions | No | Yes | No | Tie to cash collected |
| Implementation labor | No | Yes | Step | Scales with customers |
| CSM | No | No | Step | Hire by customer capacity |
| Legal setup | Fixed one-time | No | No | Front-loaded |
| Legal review | No | Variable | No | Scales with deals |
| Accounting | Fixed | No | Step | More complex with revenue |
| Events | No | Variable | No | Discretionary |
| Office | Fixed | No | Step | Defer if possible |

---

# 17. Deferrability Matrix

Use this to control cash if burn gets too high.

| Cost | Protect | Defer | Cut first | Why |
|---|---|---|---|---|
| Core engineering for claim ledger | Yes | No | No | Strategic IP |
| Attribution workflow | Yes | No | No | Core value |
| Audit log | Yes | No | No | Finance/legal trust |
| Payout preview basic logic | Yes | Maybe | No | CFO relevance |
| Full ERP integration | No | Yes | Yes | Too early |
| Advanced AI | No | Yes | Yes | Needs data first |
| Large paid ads | No | Yes | Yes | Weak until message proven |
| Big event sponsorship | No | Yes | Yes | High cost, uncertain ROI |
| Customer success for first customers | Yes | No | No | Protect activation |
| Implementation quality | Yes | No | No | Protect references |
| Founder-led sales | Yes | No | No | Highest learning rate |
| PR agency | No | Yes | Yes | Defer before proof |
| Large office | No | Yes | Yes | Not core early |

---

# 18. Scenario Builder

## Base Case

| Variable | Base assumption |
|---|---|
| Product build | MVP live by M6–M8 |
| Customers by M18 | 20–40 |
| ARR by M18 | SAR 2M–5M |
| ACV | Medium |
| Sales cycle | 60–120 days |
| Implementation | Medium-heavy |
| Billing | Annual/semiannual mix |
| Gross margin | Improving |
| Hiring | Controlled |
| Funding need | Moderate |

## Downside Case

| Variable | Downside assumption |
|---|---|
| Product build | Delayed by 3–6 months |
| Customers by M18 | 5–15 |
| ARR by M18 | SAR 500K–2M |
| ACV | Lower |
| Sales cycle | 120–180 days |
| Implementation | Heavy |
| Billing | Monthly/slow collection |
| Gross margin | Weak |
| Hiring | Must be slowed |
| Funding need | High or bridge needed |

## Upside Case

| Variable | Upside assumption |
|---|---|
| Product build | MVP live by M5–M6 |
| Customers by M18 | 35–60 |
| ARR by M18 | SAR 5M–9M |
| ACV | Higher Growth/Enterprise mix |
| Sales cycle | 45–90 days |
| Implementation | Templated |
| Billing | Annual upfront majority |
| Gross margin | Strong |
| Hiring | Carefully accelerated |
| Funding need | Growth-oriented |

---

# 19. Practical Decision Rules

## Rule 1 — Do not scale GTM before activation proof

If customers sign but do not become active, increasing GTM spend will create churn and poor references.

## Rule 2 — Do not build integrations before repeatable demand

Integrations should be paid, repeatable, and tied to ACV.

## Rule 3 — Do not undercharge implementation

If implementation is heavy, charge for it. Free implementation hides real COGS.

## Rule 4 — Do not confuse ARR with cash

Annual contracts improve ARR, but runway depends on collection timing.

## Rule 5 — Do not count VAT as revenue

VAT is a working-capital item and future payable, not operating revenue.

## Rule 6 — Do not hire sales before founder-led learning

Sales hires scale a known motion. They rarely discover the motion alone.

## Rule 7 — Do not overbuild AI before clean data

AI is useful only after workflow data, evidence, claims, and rules are structured.

## Rule 8 — Protect customer success

First customer success produces references, case studies, renewals, and expansion.

## Rule 9 — Manage burn by gates, not emotion

Each new hire or major spend should require a measurable trigger.

---

# 20. Monthly CFO Review Questions

Every month, answer:

1. What did we burn this month?
2. What did burn produce?
3. Did we hit product milestones?
4. Did we create qualified pipeline?
5. Did pipeline convert?
6. Did customers pay cash?
7. Did customers activate?
8. Did implementation cost exceed plan?
9. Did COGS grow faster than revenue?
10. Did GTM spend improve efficiency?
11. Are we hiring ahead of proof?
12. Which costs should be cut or delayed?
13. What is current runway?
14. What is runway after committed hires?
15. What decision must be made before next month?

---

# 21. Final 25 Answers Needed to Build the Quantified 18-Month Model

Answer these in one block.

1. Starting cash:
2. Target minimum cash buffer:
3. Funding already committed:
4. Target Month 18 milestone:
5. Founder salaries and deferral:
6. MVP non-negotiable features:
7. Deferred features:
8. Engineering roles, salaries, and start months:
9. GTM roles, salaries, and start months:
10. CS/implementation roles, salaries, and start months:
11. Payroll burden assumptions:
12. Base cloud cost:
13. Cloud variable cost per customer:
14. AI/API use cases and budget cap:
15. Security/compliance target:
16. Saudi entity setup and monthly admin cost:
17. VAT handling and timing:
18. Localization needs:
19. Pricing packages:
20. Customer ramp by month:
21. Billing and collection terms:
22. Implementation fee and implementation hours:
23. GTM monthly budget by phase:
24. Churn and expansion assumptions:
25. Costs that must be protected vs costs that can be cut:

---

# 22. Final Burn-Rate Analysis Template

After answers are provided, produce this final analysis.

## Executive Summary

| Metric | Result |
|---|---:|
| Total 18-month gross burn |  |
| Total 18-month customer cash receipts |  |
| Total 18-month net burn |  |
| Minimum ending cash |  |
| Required funding need |  |
| Recommended funding including buffer |  |
| Month of peak gross burn |  |
| Month of peak net burn |  |
| Month cash runs out if unfunded |  |
| Ending ARR |  |
| Ending customers |  |
| Burn multiple |  |
| CAC payback |  |
| Runway at Month 18 |  |

## Burn by Function

| Function | 18-month burn | % of total burn | Interpretation |
|---|---:|---:|---|
| Product/R&D |  |  |  |
| GTM |  |  |  |
| CS/Implementation |  |  |  |
| COGS |  |  |  |
| G&A/Compliance |  |  |  |

## Burn by Phase

| Phase | Months | Burn | Main risk | Management action |
|---|---|---:|---|---|
| Foundation | M1–M3 |  |  |  |
| Pilot | M4–M6 |  |  |  |
| Activation | M7–M9 |  |  |  |
| Hardening | M10–M12 |  |  |  |
| Scale | M13–M18 |  |  |  |

## Funding Need

| Use of funds | Amount | Why |
|---|---:|---|
| Product/R&D |  |  |
| GTM |  |  |
| CS/Implementation |  |  |
| Cloud/COGS |  |  |
| G&A/Compliance |  |  |
| Working capital |  |  |
| Buffer |  |  |

## Management Recommendations

- Hire:
- Delay:
- Cut:
- Protect:
- Monitor weekly:
- Monitor monthly:
- Decide by Month 6:
- Decide by Month 12:
- Decide by Month 18:

---

# 23. Practical Audit Checklist

Before using the model, check:

| Check | Pass/Fail |
|---|---|
| All assumptions are editable |  |
| Revenue and cash are separated |  |
| VAT is not counted as revenue |  |
| Payroll burden is separate from salary |  |
| Founder salary deferral is explicit |  |
| Implementation cost is not hidden |  |
| AI/API has a usage cap |  |
| Cloud cost has base and variable components |  |
| GTM spend has gates |  |
| Sales hiring has pipeline triggers |  |
| CS hiring has customer capacity triggers |  |
| Integrations are deferred unless paid/repeatable |  |
| Monthly ending cash is shown |  |
| Funding need includes buffer |  |
| Scenario cases are included |  |
| Deferrable costs are identified |  |
| Monthly CFO questions are answered |  |

---

# 24. Final Principle

The right 18-month burn model for Partner Revenue OS is not:

```text
How much can we afford to spend?
```

It is:

```text
What is the minimum disciplined burn required to build trust, close paying customers, activate them, prove partner revenue governance value, and become fundable?
```

Every riyal should be tied to a product milestone, a customer milestone, a revenue milestone, or a trust milestone.
