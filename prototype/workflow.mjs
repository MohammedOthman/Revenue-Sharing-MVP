/* Single source of truth for the End-to-End Business Workflow (the 60-page PDF).
 * Drives: the 22-phase journey navigator (journey.html), the operating-cadence
 * view (cadence.html), the phase-ordered Back/Next chain, and the deep-links.
 * Each phase maps to its canonical screen (existing or newly generated).
 */

// tier: which roadmap stage the phase first appears in (Part F).
// status: 'existing' (already in the export), 'new' (generated to fill a gap).
export const PHASES = [
  { n: 1,  title: 'Define Partner Strategy & Program Thesis', dir: 'partner_strategy_program_thesis',        group: 'Strategy & Setup',          tier: 'MVP', role: 'CEO / CRO / Head of Partnerships', status: 'new',
    purpose: 'Define why partnerships exist and tie the program to a measurable commercial constraint.' },
  { n: 2,  title: 'Build Segmentation & Ecosystem Map',        dir: 'partner_segmentation_role_taxonomy',     group: 'Strategy & Setup',          tier: 'V1',  role: 'Strategy / RevOps',               status: 'new',
    purpose: 'Define partner roles and contribution models — the foundation attribution depends on.' },
  { n: 3,  title: 'Source & Intake Potential Partners',        dir: 'partner_sourcing_intake',                group: 'Partner Lifecycle',         tier: 'MVP', role: 'Partner Managers',                status: 'new',
    purpose: 'Capture every potential partner with source + owner before commitments become informal.' },
  { n: 4,  title: 'Qualify Partner Fit',                       dir: 'partner_qualification_scorecard',        group: 'Partner Lifecycle',         tier: 'MVP', role: 'Partnerships / Sales / Finance',  status: 'new',
    purpose: 'Score strategic fit and risk; decide reject / park / nurture / pilot / approve.' },
  { n: 5,  title: 'Approve Partner & Create Operating Record', dir: 'partner_approval_workflow',              group: 'Partner Lifecycle',         tier: 'V1',  role: 'Approval Matrix / Legal / Finance',status: 'new',
    purpose: 'Formally approve via the approval matrix & delegation of authority; create the record.' },
  { n: 6,  title: 'Structure Agreement & Rulebook',            dir: 'agreement_rulebook_configuration',       group: 'Partner Lifecycle',         tier: 'MVP', role: 'Legal / Partnerships',            status: 'existing',
    purpose: 'Translate legal/commercial terms into executable, versioned rules.' },
  { n: 7,  title: 'Configure Integration & Data Foundation',   dir: 'integration_health_data_mapping_with_rationales', group: 'Partner Lifecycle',  tier: 'MVP', role: 'Admin / RevOps',                  status: 'existing',
    purpose: 'Prepare the CRM/ERP/billing data foundation; monitor sync health and data quality.' },
  { n: 8,  title: 'Onboard & Activate Partner',                dir: 'partner_onboarding_activation_hub_with_rationales', group: 'Partner Lifecycle', tier: 'V1', role: 'Partner Managers',                status: 'existing',
    purpose: 'Give the partner the access, rules, and enablement needed to contribute correctly.' },
  { n: 9,  title: 'Capture Ecosystem Touchpoints',             dir: 'ecosystem_touchpoint_ledger',            group: 'Ecosystem & Claims',        tier: 'V1',  role: 'Partner Managers / RevOps',       status: 'new',
    purpose: 'Capture partner actions across the journey, before/around a formal claim.' },
  { n: 10, title: 'Create Partner Revenue Claim',              dir: 'enhanced_revenue_claim_portal_with_simulation', group: 'Ecosystem & Claims',  tier: 'MVP', role: 'Partner / Partner Manager',       status: 'existing',
    purpose: 'The atomic operating event: a formal claim that a partner contributed to revenue.' },
  { n: 11, title: 'Run Claim Preflight',                       dir: 'claim_preflight_exception_queue',        group: 'Ecosystem & Claims',        tier: 'MVP', role: 'Partner Managers',                status: 'new',
    purpose: 'Validate completeness, duplicates, agreement gaps, and protection conflicts early.' },
  { n: 12, title: 'Decide Attribution & Apply Protection',     dir: 'attribution_approval_workspace',         group: 'Attribution & CRM',         tier: 'MVP', role: 'Partnerships / Sales',            status: 'existing',
    purpose: 'Decide credit and apply protection windows over account/opportunity/region.' },
  { n: 13, title: 'Advanced Multi-Touch Ecosystem Attribution',dir: 'advanced_ecosystem_attribution_hub_with_rationales', group: 'Attribution & CRM', tier: 'V3', role: 'RevOps',                          status: 'existing',
    purpose: 'Score and allocate credit across multiple partner contributions on a journey.' },
  { n: 14, title: 'Link Claim to CRM & Sales Process',         dir: 'crm_link_sync_monitor',                  group: 'Attribution & CRM',         tier: 'MVP', role: 'RevOps / Sales',                  status: 'new',
    purpose: 'Match claims to CRM accounts/opportunities, write back partner fields, monitor sync.' },
  { n: 15, title: 'Validate Revenue Event',                    dir: 'revenue_event_validation',               group: 'Revenue & Finance',         tier: 'V2',  role: 'Finance Ops',                     status: 'new',
    purpose: 'Confirm whether attributed pipeline became real, invoiced, collected revenue.' },
  { n: 16, title: 'Determine Payout Eligibility',              dir: 'payout_eligibility_workspace',           group: 'Revenue & Finance',         tier: 'MVP', role: 'Finance',                         status: 'new',
    purpose: 'Decide commercial payout eligibility from attribution, rules, revenue, evidence.' },
  { n: 17, title: 'Create Finance Evidence Pack',              dir: 'finance_evidence_pack',                  group: 'Revenue & Finance',         tier: 'V1',  role: 'Finance / Audit',                 status: 'new',
    purpose: 'Package immutable, sourced evidence for finance, accounting, legal, and audit.' },
  { n: 18, title: 'Update Partner Statement',                  dir: 'partner_portal_statement_view',          group: 'Revenue & Finance',         tier: 'V1',  role: 'Partner',                         status: 'existing',
    purpose: 'Give partners transparent status on claims, payout eligibility, and disputes.' },
  { n: 19, title: 'Manage Disputes & Adjustments',             dir: 'dispute_management_workspace',           group: 'Disputes & Settlement',     tier: 'V1',  role: 'Partnerships / Finance / Legal',  status: 'existing',
    purpose: 'Resolve conflict over attribution, payout, protection, or revenue with an audit trail.' },
  { n: 20, title: 'Reconcile & Prepare Settlement',           dir: 'revenue_reconciliation_settlement_center',group: 'Disputes & Settlement',     tier: 'V2',  role: 'Finance',                         status: 'existing',
    purpose: 'Reconcile approved obligations against finance systems; prepare payout batches.' },
  { n: 21, title: 'Review Partner Performance & P&L',          dir: 'partner_performance_scorecard_with_rationales', group: 'Performance & Investment', tier: 'V3', role: 'Head of Partnerships / CFO',   status: 'existing',
    purpose: 'Review whether each partner, program, and model is economically valuable.' },
  { n: 22, title: 'Executive Operating Review & Investment',   dir: 'quarterly_executive_pack_cro_cfo',        group: 'Performance & Investment',  tier: 'V1',  role: 'CEO / CFO / CRO',                 status: 'existing',
    purpose: 'Convert workflow history into partner investment decisions at monthly/quarterly cadence.' },
];

// Journey groups in order (for the navigator swimlanes).
export const GROUPS = [
  'Strategy & Setup', 'Partner Lifecycle', 'Ecosystem & Claims',
  'Attribution & CRM', 'Revenue & Finance', 'Disputes & Settlement', 'Performance & Investment',
];

export const TIERS = ['MVP', 'V1', 'V2', 'V3'];
export const TIER_LABEL = {
  MVP: 'MVP — Control the Claim',
  V1: 'V1 — Operational',
  V2: 'V2 — Finance-Ready',
  V3: 'V3 — Investable',
};

// Operating cadence (Part E).
export const CADENCE = [
  { key: 'Daily', icon: 'today', users: 'Partner Managers, Partnerships Ops, Sales Owners, RevOps',
    activities: ['Review new partner intakes', 'Review new claims', 'Resolve missing evidence', 'Validate CRM matches', 'Respond to sales confirmation requests', 'Check expiring protection windows', 'Clear integration errors'],
    surfaces: [['Claim review queue', 'claim_preflight_exception_queue'], ['Exception queue', 'claim_preflight_exception_queue'], ['CRM match review', 'crm_link_sync_monitor'], ['Protection alerts', 'attribution_approval_workspace'], ['Partner intake', 'partner_sourcing_intake']] },
  { key: 'Weekly', icon: 'date_range', users: 'Head of Partnerships, Partner Managers, Sales Managers, RevOps',
    activities: ['Partner pipeline review', 'Accepted/rejected claim review', 'Top partner review', 'Sales conflict review', 'Unresolved disputes', 'Data quality review', 'Partner activation review'],
    surfaces: [['Command Center', 'partner_revenue_command_center'], ['Attribution workspace', 'attribution_approval_workspace'], ['Dispute ledger', 'dispute_management_workspace'], ['Activation hub', 'partner_onboarding_activation_hub_with_rationales']] },
  { key: 'Monthly', icon: 'calendar_month', users: 'Head of Partnerships, CRO, CFO delegate, RevOps, Finance Ops',
    activities: ['Controlled partner revenue review', 'Payout liability review', 'Finance evidence gaps', 'Partner performance review', 'Program profitability', 'Concentration risk', 'Payout & statement readiness'],
    surfaces: [['Payout eligibility', 'payout_eligibility_workspace'], ['Finance evidence pack', 'finance_evidence_pack'], ['Partner P&L', 'partner_profit_loss_with_rationales'], ['Concentration risk', 'partner_concentration_risk_map_with_rationales']] },
  { key: 'Quarterly', icon: 'event', users: 'CEO/GM, CFO, CRO, Head of Partnerships, Strategy Office',
    activities: ['Strategic partner portfolio review', 'Program ROI review', 'Investment decisions', 'Incentive redesign', 'Tier changes', 'Renegotiation decisions', 'New program approvals'],
    surfaces: [['Quarterly CRO/CFO pack', 'quarterly_executive_pack_cro_cfo'], ['Strategic ROI cockpit', 'strategic_roi_investment_cockpit_with_rationales'], ['Incentive simulation', 'incentive_simulation_rule_sandbox'], ['Program thesis', 'partner_strategy_program_thesis']] },
];

export const TIER_KIND = { MVP: 'primary', V1: 'green', V2: 'amber', V3: 'neutral' };
