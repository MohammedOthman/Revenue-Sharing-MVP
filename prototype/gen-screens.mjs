/* Generate the 11 gap-filling screens (full Material-3 / Tailwind Stitch style)
 * so the product matches all 22 phases of the End-to-End Business Workflow PDF.
 *
 * Fidelity approach: reuse the exact <head> (design tokens + icon style) from a
 * real exported screen, plus the standard sidebar shell, so build.mjs compiles
 * these identically to the originals (per-page Tailwind, vendored fonts, nav
 * wiring, Overview button). Each screen's body reflects that phase's PDF spec:
 * capabilities, key fields, controls, KPIs, with realistic sample data.
 *
 * Idempotent: writes screens/<dir>/code.html. Re-run after editing specs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHASES } from './workflow.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, 'screens');
const SHELL_FROM = path.join(SRC, 'partner_revenue_command_center', 'code.html');

// ---- reuse exact <head> (design tokens) from a real screen, swap the title ----
const shellHtml = fs.readFileSync(SHELL_FROM, 'utf8');
const HEAD_RAW = shellHtml.slice(0, shellHtml.indexOf('</head>') + '</head>'.length);
function head(title) {
  return HEAD_RAW.replace(/<title>[\s\S]*?<\/title>/, `<title>Partner Revenue OS - ${title}</title>`);
}

// ---- component helpers (Material-3 token classes used across the export) ----
const BADGE = {
  green:   'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]',
  amber:   'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
  red:     'bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]',
  neutral: 'bg-surface-container text-on-surface-variant border border-border-subtle',
  primary: 'bg-surface-container-high text-tertiary-container border border-[#bcd0ff]',
};
const badge = (text, kind = 'neutral') =>
  `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${BADGE[kind] || BADGE.neutral}">${text}</span>`;

const icon = (name, cls = '') => `<span class="material-symbols-outlined ${cls}">${name}</span>`;

const sidebar = (active) => {
  const items = [
    ['Dashboard', 'dashboard'], ['Partners', 'handshake'], ['Claims', 'receipt_long'],
    ['Approvals', 'verified'], ['Settings', 'settings'],
  ];
  const li = ([label, ic]) => {
    const on = label === active;
    return `<li><a class="flex items-center gap-3 px-4 py-3 rounded ${on ? 'text-primary font-bold bg-surface-container translate-x-1' : 'text-on-surface-variant font-medium hover:bg-surface-container-high'} transition-all" href="#">
<span class="material-symbols-outlined"${on ? " style=\"font-variation-settings: 'FILL' 1;\"" : ''}>${ic}</span>
<span class="font-body-md text-body-md">${label}</span></a></li>`;
  };
  return `<nav class="hidden md:flex flex-col h-full py-6 bg-surface-container-low fixed left-0 top-0 w-sidebar-width border-r border-border-subtle z-40">
<div class="px-6 mb-8">
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface">Partner Revenue OS</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant mt-1">Revenue Control Layer</p>
</div>
<ul class="flex flex-col gap-2 px-4 flex-grow">${items.map(li).join('')}</ul>
<div class="px-6 mt-auto"><div class="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-surface-container-lowest">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">${icon('person', 'text-sm')}</div>
<div><p class="font-body-sm text-body-sm font-bold">Admin User</p><p class="font-label-caps text-label-caps text-on-surface-variant">Head of Partnerships</p></div>
</div></div></nav>`;
};

// metric/KPI cards
const metric = (m) => `<div class="bg-surface-container-lowest border border-border-subtle rounded-lg p-6 flex flex-col relative overflow-hidden">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">${m.label}</p>
<span class="font-display-metrics text-display-metrics ${m.tone === 'amber' ? 'text-status-amber' : m.tone === 'red' ? 'text-status-red' : 'text-primary'} font-bold">${m.value}</span>
${m.sub ? `<div class="flex items-center gap-1 mt-3 ${m.subTone === 'red' ? 'text-status-red' : m.subTone === 'amber' ? 'text-status-amber' : 'text-secondary'}">${icon(m.subIcon || 'trending_up', 'text-sm')}<span class="font-body-sm text-body-sm font-medium">${m.sub}</span></div>` : ''}
${m.bar != null ? `<div class="w-full bg-surface-container-low h-1.5 rounded-full mt-4 overflow-hidden"><div class="bg-primary h-full" style="width:${m.bar}%"></div></div>` : ''}
</div>`;
const metricsGrid = (arr, cols = 4) => `<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${cols} gap-4 mb-8">${arr.map(metric).join('')}</div>`;

// panel/card
const panel = (title, body, opts = {}) => `<div class="bg-surface-container-lowest border border-border-subtle rounded-lg ${opts.pad === false ? '' : 'p-6'} mb-6">
${title ? `<div class="flex items-center justify-between mb-4 ${opts.pad === false ? 'px-6 pt-6' : ''}"><h3 class="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">${opts.icon ? icon(opts.icon, 'text-primary text-xl') : ''}${title}</h3>${opts.action || ''}</div>` : ''}
${body}</div>`;

// data table; cols: [labels], rows: [[cells]]; right-align numeric via opts.right indices
const table = (cols, rows, opts = {}) => {
  const right = new Set(opts.right || []);
  const th = cols.map((c, i) => `<th class="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider ${right.has(i) ? 'text-right' : 'text-left'}">${c}</th>`).join('');
  const tr = rows.map(r => `<tr class="border-t border-border-subtle hover:bg-surface-base transition-colors">${r.map((cell, i) => `<td class="px-4 py-3 font-body-sm text-body-sm ${right.has(i) ? 'text-right font-data-mono' : 'text-on-surface'}">${cell}</td>`).join('')}</tr>`).join('');
  return `<div class="overflow-x-auto"><table class="w-full min-w-[640px]"><thead><tr class="bg-surface-base">${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
};

// field grid (key/value)
const fields = (arr, cols = 2) => `<div class="grid grid-cols-1 md:grid-cols-${cols} gap-x-8 gap-y-4">${arr.map(([k, v]) => `<div class="flex flex-col"><span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">${k}</span><span class="font-body-md text-body-md text-on-surface mt-1">${v}</span></div>`).join('')}</div>`;

// checklist with states
const CHK = { done: ['check_circle', 'text-secondary'], pending: ['radio_button_unchecked', 'text-on-surface-variant'], fail: ['cancel', 'text-status-red'], warn: ['warning', 'text-status-amber'] };
const checklist = (items) => `<ul class="flex flex-col gap-3">${items.map(([label, st, note]) => {
  const [ic, c] = CHK[st] || CHK.pending;
  return `<li class="flex items-start gap-3">${icon(ic, `${c} text-[20px] mt-0.5`)}<div><span class="font-body-md text-body-md text-on-surface">${label}</span>${note ? `<span class="block font-body-sm text-body-sm text-on-surface-variant">${note}</span>` : ''}</div></li>`;
}).join('')}</ul>`;

// vertical timeline
const timeline = (items) => `<ol class="relative border-l border-border-subtle ml-2">${items.map(t => `<li class="mb-6 ml-6">
<span class="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full ${t.kind === 'amber' ? 'bg-status-amber' : t.kind === 'red' ? 'bg-status-red' : 'bg-secondary'}"></span>
<div class="flex items-center gap-2"><span class="font-body-md text-body-md font-bold text-on-surface">${t.title}</span>${t.tag ? badge(t.tag, t.tagKind || 'neutral') : ''}</div>
<span class="font-label-caps text-label-caps text-on-surface-variant">${t.time}</span>
${t.desc ? `<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">${t.desc}</p>` : ''}</li>`).join('')}</ol>`;

// stepper across the top
const stepper = (steps, activeIdx) => `<div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2">${steps.map((s, i) => `<div class="flex items-center gap-2 shrink-0">
<div class="flex items-center gap-2 px-3 py-1.5 rounded-full ${i === activeIdx ? 'bg-primary text-on-primary' : i < activeIdx ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}">
<span class="font-body-sm text-body-sm font-bold">${i < activeIdx ? '✓' : i + 1}</span><span class="font-body-sm text-body-sm font-medium whitespace-nowrap">${s}</span></div>
${i < steps.length - 1 ? `<span class="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>` : ''}</div>`).join('')}</div>`;

const kpiStrip = (arr) => `<div class="flex flex-wrap gap-4">${arr.map(([label, val]) => `<div class="flex-1 min-w-[160px] bg-surface-base border border-border-subtle rounded-lg p-4"><p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">${label}</p><p class="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">${val}</p></div>`).join('')}</div>`;

// assemble a full page
function page({ dir, navActive, title, phaseN, tier, role, subtitle, actions, body }) {
  const ph = PHASES.find(p => p.dir === dir);
  const tierKind = { MVP: 'primary', V1: 'green', V2: 'amber', V3: 'neutral' }[tier] || 'neutral';
  const chips = `<div class="flex flex-wrap items-center gap-2 mt-2">
${badge(`Phase ${phaseN} of 22`, 'primary')}${badge(tier, tierKind)}<span class="font-label-caps text-label-caps text-on-surface-variant">${icon('badge', 'text-[14px] align-middle mr-1')}${role}</span></div>`;
  return `${head(title)}
<body class="bg-surface-base text-on-background font-body-md min-h-screen flex flex-col md:flex-row">
${sidebar(navActive)}
<header class="md:hidden flex justify-between items-center w-full px-margin-mobile h-16 bg-surface-container-lowest border-b border-border-subtle fixed top-0 z-50">
<h1 class="font-headline-sm text-headline-sm font-bold text-on-background">Partner Revenue OS</h1>
<button class="text-on-surface-variant p-2">${icon('menu')}</button></header>
<main class="flex-1 md:ml-[260px] pt-16 md:pt-0 pb-24 md:pb-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1600px] mx-auto">
<div class="py-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div><h2 class="font-headline-lg text-headline-lg font-bold text-on-background">${title}</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">${subtitle}</p>${chips}</div>
<div class="flex gap-3 flex-wrap">${(actions || []).map(a => `<button class="px-4 py-2 ${a.primary ? 'bg-primary text-on-primary' : 'border border-border-subtle text-on-surface hover:bg-surface-container'} rounded font-body-md text-body-md transition-colors flex items-center gap-2">${a.icon ? icon(a.icon, 'text-sm') : ''}${a.text}</button>`).join('')}</div>
</div>
${body}
</main>
</body></html>`;
}

// =====================================================================
// SCREEN SPECS — one per gap phase
// =====================================================================
const screens = {};

// P1 — Partner Strategy & Program Thesis
screens.partner_strategy_program_thesis = page({
  dir: 'partner_strategy_program_thesis', navActive: 'Settings', phaseN: 1, tier: 'MVP',
  role: 'CEO / CRO / Head of Partnerships', title: 'Partner Strategy & Program Thesis',
  subtitle: 'Define why partnerships exist and tie the program to a measurable commercial constraint.',
  actions: [{ text: 'Save Draft', icon: 'save' }, { text: 'Submit for Approval', icon: 'send', primary: true }],
  body:
    metricsGrid([
      { label: 'Active Programs', value: '4' },
      { label: '% Partners On A Program', value: '86%', bar: 86 },
      { label: 'Program Approval Cycle', value: '9 days' },
      { label: 'Program-Level Revenue', value: '$18.2M', sub: '+14% vs last year' },
    ]) +
    panel('Program Thesis — Cloud GTM Reseller Program', fields([
      ['Program Name', 'Cloud GTM Reseller Program'], ['Program Owner', 'Sarah Jenkins'],
      ['Objective', 'Reseller distribution + market access'], ['Target Segment', 'Mid-market, EMEA & GCC'],
      ['Target Partner Type', 'Reseller / Distributor'], ['Commercial Model', '15% margin on Cloud SKUs'],
      ['Attribution Model', 'Sourced + Influenced'], ['Payout Model', 'On invoice collected'],
      ['Expected Contribution', '$6.0M ARR'], ['Expected Cost', '$0.9M'],
      ['Primary KPI', 'Partner-sourced ARR'], ['Review Cadence', 'Quarterly'],
    ]), { icon: 'flag' }) +
    panel('Constraint This Program Solves', `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
${['Market access', 'Reseller distribution', 'Variable-cost growth'].map(c => `<div class="bg-surface-base border border-border-subtle rounded-lg p-4 flex items-center gap-2">${icon('check_circle', 'text-secondary')}<span class="font-body-md text-body-md">${c}</span></div>`).join('')}</div>`, { icon: 'target' }) +
    panel('Executive Validators & Approval', table(
      ['Validator', 'Role', 'Status'],
      [
        ['Maria Chen', 'CEO / GM — strategic ambition', badge('Approved', 'green')],
        ['David Park', 'CRO — revenue relevance', badge('Approved', 'green')],
        ['Lena Osei', 'CFO — economics & cost control', badge('In Review', 'amber')],
      ]), { icon: 'verified_user' }),
});

// P2 — Segmentation & Role Taxonomy
screens.partner_segmentation_role_taxonomy = page({
  dir: 'partner_segmentation_role_taxonomy', navActive: 'Settings', phaseN: 2, tier: 'V1',
  role: 'Strategy / RevOps', title: 'Segmentation & Role Taxonomy',
  subtitle: 'Define partner roles and contribution models — the foundation attribution depends on.',
  actions: [{ text: 'Add Role', icon: 'add', primary: true }],
  body:
    metricsGrid([
      { label: 'Active Partner Roles', value: '8' },
      { label: '% Valid Role Classification', value: '92%', bar: 92 },
      { label: 'Contribution Types', value: '14' },
      { label: 'Dispute Rate (low-role-clarity)', value: '3.1%', tone: 'amber' },
    ], 4) +
    panel('Role Taxonomy', table(
      ['Role', 'Allowed Claim Types', 'Default Attribution', 'Protection Window', 'Evidence Req.', 'Risk'],
      [
        ['Reseller', 'Reseller transaction', 'Sourced', '90 days', 'Order + invoice', badge('Low', 'green')],
        ['Referral', 'Referral, sourced lead', 'Sourced', '60 days', 'Intro email', badge('Low', 'green')],
        ['Co-seller', 'Co-sell opportunity', 'Influenced (split)', '45 days', 'Activity log', badge('Med', 'amber')],
        ['Implementation', 'Implementation contribution', 'Post-sale influence', '30 days', 'SOW + milestones', badge('Med', 'amber')],
        ['Marketplace', 'Marketplace claim', 'Marketplace transacted', '30 days', 'Transaction ID', badge('Low', 'green')],
        ['Strategic Alliance', 'Influence (multi-touch)', 'Influenced (scored)', '120 days', 'Exec confirmation', badge('High', 'red')],
      ]), { icon: 'category', action: badge('role → attribution → evidence → payout', 'neutral') }) +
    panel('Partner Segments Mapped', `<div class="flex flex-wrap gap-2">${['Source / Referrer', 'Influencer', 'Co-seller', 'Reseller', 'Distributor', 'Implementation', 'Marketplace', 'Strategic Alliance', 'Affiliate', 'White-label', 'Technology Integration', 'Advisory'].map(s => `<span class="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm border border-border-subtle">${s}</span>`).join('')}</div>`, { icon: 'hub' }),
});

// P3 — Sourcing & Intake
screens.partner_sourcing_intake = page({
  dir: 'partner_sourcing_intake', navActive: 'Partners', phaseN: 3, tier: 'MVP',
  role: 'Partner Managers', title: 'Partner Sourcing & Intake',
  subtitle: 'Capture every potential partner with a source and owner before commitments become informal.',
  actions: [{ text: 'New Intake', icon: 'add' }, { text: 'Inbound Applications', icon: 'inbox', primary: true }],
  body:
    metricsGrid([
      { label: 'Intake Volume (30d)', value: '37' },
      { label: 'Intake → Qualified', value: '61%', bar: 61 },
      { label: 'Duplicate Rate', value: '8%', tone: 'amber' },
      { label: 'Avg Intake Review', value: '1.4 days' },
    ]) +
    panel('Partner Intake Queue', table(
      ['Partner', 'Source', 'Proposed Role', 'Program Match', 'Owner', 'Duplicate', 'Status'],
      [
        ['Helix Cloud Ltd', 'Inbound application', 'Reseller', 'Cloud GTM', 'A. Mercer', badge('None', 'green'), badge('Queued', 'neutral')],
        ['Northwind Advisory', 'Sales introduction', 'Advisory', 'Enterprise', 'S. Jenkins', badge('Review', 'amber'), badge('Dup Review', 'amber')],
        ['Vertex Integrators', 'Event — GITEX', 'Implementation', 'Cloud GTM', 'A. Mercer', badge('None', 'green'), badge('Queued', 'neutral')],
        ['Falcon Distribution', 'Customer referral', 'Distributor', 'Cloud GTM', 'M. Reed', badge('None', 'green'), badge('Assigned', 'green')],
      ], { right: [] }), { icon: 'inbox' }) +
    panel('Intake Record — Helix Cloud Ltd', fields([
      ['Legal Name', 'Helix Cloud Limited'], ['Trade Name', 'Helix Cloud'],
      ['Website / Domain', 'helixcloud.io'], ['Country / Region', 'UAE — GCC'],
      ['Partner Source', 'Inbound application'], ['Proposed Type', 'Reseller'],
      ['Internal Sponsor', 'A. Mercer'], ['Duplicate Match Confidence', '4% (clear)'],
    ]), { icon: 'how_to_reg' }) +
    panel('Controls', checklist([
      ['Every partner has a source', 'done'],
      ['Every partner has an owner', 'done'],
      ['Duplicate detection before qualification', 'done'],
      ['External applications do not auto-create active records', 'done'],
    ]), { icon: 'shield' }),
});

// P4 — Qualification Scorecard
screens.partner_qualification_scorecard = page({
  dir: 'partner_qualification_scorecard', navActive: 'Partners', phaseN: 4, tier: 'MVP',
  role: 'Partnerships / Sales / Finance', title: 'Partner Qualification Scorecard',
  subtitle: 'Score strategic fit and risk; decide reject, park, nurture, pilot, or approve.',
  actions: [{ text: 'Park', icon: 'pause' }, { text: 'Reject', icon: 'block' }, { text: 'Approve for Onboarding', icon: 'check', primary: true }],
  body:
    metricsGrid([
      { label: 'Partner Fit Score', value: '78 / 100', bar: 78 },
      { label: 'Risk Score', value: '22 / 100', tone: 'amber' },
      { label: 'Expected ROI', value: '4.1x' },
      { label: 'Qualification → Approval', value: '54%', bar: 54 },
    ]) +
    panel('Fit & Risk Dimensions — Helix Cloud Ltd', table(
      ['Dimension', 'Owner', 'Score', 'Notes'],
      [
        ['Strategic fit', 'Partnerships', badge('High', 'green'), 'Aligns to Cloud GTM thesis'],
        ['Commercial potential', 'Partnerships', badge('High', 'green'), '$1.2M pipeline identified'],
        ['Account overlap / conflict', 'Sales', badge('Low', 'green'), 'No active sales conflict'],
        ['Compliance risk', 'Legal', badge('Medium', 'amber'), 'KYB pending for regulated sector'],
        ['Finance complexity', 'Finance', badge('Low', 'green'), 'Standard margin model'],
      ]), { icon: 'fact_check' }) +
    panel('Decision', `<div class="flex flex-col md:flex-row gap-4">
<div class="flex-1">${checklist([['High-risk routed to Legal/Compliance', 'done'], ['Payout-bearing model routed to Finance', 'done'], ['Qualification decision recorded', 'pending']])}</div>
<div class="flex-1 bg-surface-base border border-border-subtle rounded-lg p-4">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Recommendation</p>
<p class="font-headline-sm text-headline-sm font-bold text-secondary">Approve — Pilot (90 days)</p>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2">Fit 78, Risk 22. Pilot with quarterly review before full tier assignment.</p></div></div>`, { icon: 'gavel' }),
});

// P5 — Approval Workflow & Matrix
screens.partner_approval_workflow = page({
  dir: 'partner_approval_workflow', navActive: 'Approvals', phaseN: 5, tier: 'V1',
  role: 'Approval Matrix / Legal / Finance', title: 'Partner Approval Workflow',
  subtitle: 'Formally approve via the approval matrix and delegation of authority; create the operating record.',
  actions: [{ text: 'Request Changes', icon: 'edit' }, { text: 'Approve & Create Record', icon: 'verified', primary: true }],
  body:
    metricsGrid([
      { label: 'Approval Cycle Time', value: '3.2 days' },
      { label: 'Approval Aging (>5d)', value: '2', tone: 'amber' },
      { label: 'Conditional Approval Rate', value: '18%' },
      { label: 'Approver SLA Compliance', value: '94%', bar: 94 },
    ]) +
    panel('Approval Matrix — by partner scenario', table(
      ['Scenario', 'Required Approvers', 'Status'],
      [
        ['Low-risk referral partner', 'Head of Partnerships', badge('Auto-eligible', 'green')],
        ['Revenue-share partner', 'Partnerships + Finance', badge('In Review', 'amber')],
        ['Reseller partner', 'Partnerships + Sales/CRO + Legal', badge('In Review', 'amber')],
        ['Strategic alliance', 'Exec sponsor + Legal + Finance', badge('Queued', 'neutral')],
        ['Saudi payout-bearing partner', 'Finance + local documentation', badge('Queued', 'neutral')],
      ]), { icon: 'account_tree' }) +
    panel('Current Approval — Helix Cloud Ltd (Reseller)', timeline([
      { time: 'Today 09:12', title: 'Partnerships approved', tag: 'Approved', tagKind: 'green', desc: 'S. Jenkins — fit confirmed.' },
      { time: 'Today 10:40', title: 'Sales / CRO approved', tag: 'Approved', tagKind: 'green', desc: 'No territory conflict.' },
      { time: 'Pending', title: 'Legal review', tag: 'Pending', tagKind: 'amber', kind: 'amber', desc: 'KYB documentation under review.' },
    ]), { icon: 'how_to_reg' }) +
    panel('Controls', checklist([
      ['Approval authority is configurable (DoA)', 'done'],
      ['Conditional approval lists unresolved conditions', 'warn', '1 condition open: KYB docs'],
      ['Partner cannot onboard until approval complete', 'done'],
      ['All approvals timestamped with approver identity', 'done'],
    ]), { icon: 'shield' }),
});

// P9 — Ecosystem Touchpoint Ledger
screens.ecosystem_touchpoint_ledger = page({
  dir: 'ecosystem_touchpoint_ledger', navActive: 'Partners', phaseN: 9, tier: 'V1',
  role: 'Partner Managers / RevOps', title: 'Ecosystem Touchpoint Ledger',
  subtitle: 'Capture meaningful partner actions across the journey — before, during, and after a formal claim.',
  actions: [{ text: 'Add Touchpoint', icon: 'add' }, { text: 'Import from CRM', icon: 'sync', primary: true }],
  body:
    metricsGrid([
      { label: 'Touchpoints / Account', value: '6.4' },
      { label: 'Linked to Opportunities', value: '73%', bar: 73 },
      { label: 'Low-Confidence Matches', value: '11%', tone: 'amber' },
      { label: 'Unclaimed Influence', value: '$2.1M', tone: 'amber', subIcon: 'visibility', sub: 'detected' },
    ]) +
    panel('Account Journey Timeline — Globex Corp', timeline([
      { time: 'Jan 14', title: 'Partner introduced buyer', tag: 'Referral', tagKind: 'green', desc: 'Helix Cloud — intro to VP Eng.' },
      { time: 'Feb 02', title: 'Partner attended discovery call', tag: 'Influence', tagKind: 'neutral', desc: 'Technical scoping support.' },
      { time: 'Feb 20', title: 'Partner supported technical validation', tag: 'Influence', tagKind: 'neutral', kind: 'amber', desc: 'POC environment configured.' },
      { time: 'Mar 05', title: 'Marketplace lead generated', tag: 'Marketplace', tagKind: 'green', desc: 'Private offer accepted.' },
    ]), { icon: 'timeline' }) +
    panel('Touchpoint Ledger', table(
      ['Touchpoint', 'Partner', 'Account', 'Type', 'Journey Stage', 'Confidence', 'Status'],
      [
        ['TP-3391', 'Helix Cloud', 'Globex Corp', 'Introduction', 'Awareness', badge('High', 'green'), badge('Matched', 'green')],
        ['TP-3392', 'Helix Cloud', 'Globex Corp', 'Technical validation', 'Evaluation', badge('Med', 'amber'), badge('Review', 'amber')],
        ['TP-3401', 'Vertex', 'Initech', 'Implementation', 'Post-sale', badge('High', 'green'), badge('Matched', 'green')],
      ]), { icon: 'list_alt' }),
});

// P11 — Claim Preflight & Exception Queue
screens.claim_preflight_exception_queue = page({
  dir: 'claim_preflight_exception_queue', navActive: 'Claims', phaseN: 11, tier: 'MVP',
  role: 'Partner Managers', title: 'Claim Preflight & Exception Queue',
  subtitle: 'Check completeness, duplicates, agreement coverage, and protection conflicts before attribution.',
  actions: [{ text: 'Run Preflight', icon: 'play_arrow' }, { text: 'Send Back for Info', icon: 'undo' }, { text: 'Pass to Attribution', icon: 'arrow_forward', primary: true }],
  body:
    metricsGrid([
      { label: 'Preflight Pass Rate', value: '82%', bar: 82 },
      { label: 'Duplicate Claim Rate', value: '6%', tone: 'amber' },
      { label: 'Missing Evidence Rate', value: '14%', tone: 'amber' },
      { label: 'Avg Time In Preflight', value: '5.1 hrs' },
    ]) +
    panel('Preflight — CLM-8924-B · Project Apex (Nexus Technologies)', `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>${checklist([
      ['Partner status active', 'done'],
      ['Claim type eligible for role', 'done'],
      ['Account / contact matched to CRM', 'warn', 'Match confidence 71% — review'],
      ['Duplicate claim check', 'done', 'No duplicate partner claims'],
      ['Existing protection window', 'done', 'No conflict'],
      ['Agreement rule coverage', 'fail', 'No active agreement rule — payout blocked, attribution allowed'],
      ['Required evidence complete', 'warn', '1 of 2 artifacts uploaded'],
    ])}</div>
<div class="bg-surface-base border border-border-subtle rounded-lg p-4">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Preflight Outcome</p>
<p class="font-headline-sm text-headline-sm font-bold text-status-amber">Manual Review</p>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2">Agreement gap blocks payout eligibility but not strategic attribution. Routed to exception queue.</p></div></div>`, { icon: 'rule' }) +
    panel('Exception Queue', table(
      ['Claim', 'Partner', 'Flag', 'Routing', 'Status'],
      [
        ['CLM-8924-B', 'Nexus Technologies', badge('Agreement Gap', 'amber'), 'Partner Manager', badge('Manual Review', 'amber')],
        ['CLM-8902-A', 'Acme Corp', badge('Duplicate Risk', 'red'), 'RevOps', badge('Manual Review', 'amber')],
        ['CLM-8898-C', 'TechFlow Inc', badge('Missing Evidence', 'amber'), 'Partner', badge('Needs Info', 'neutral')],
        ['CLM-8890-D', 'Global Systems', badge('Pass', 'green'), '—', badge('Ready', 'green')],
      ]), { icon: 'inventory_2' }),
});

// P14 — CRM Link & Sync Monitor
screens.crm_link_sync_monitor = page({
  dir: 'crm_link_sync_monitor', navActive: 'Settings', phaseN: 14, tier: 'MVP',
  role: 'RevOps / Sales', title: 'CRM Link & Sync Monitor',
  subtitle: 'Match claims to CRM accounts/opportunities, write back partner fields, and monitor sync health.',
  actions: [{ text: 'Resolve Matches', icon: 'rule' }, { text: 'Configure Write-Back', icon: 'settings', primary: true }],
  body:
    metricsGrid([
      { label: 'Claims Linked to CRM', value: '88%', bar: 88 },
      { label: 'CRM Match Confidence', value: '93%', bar: 93 },
      { label: 'Write-Back Success', value: '99.2%', bar: 99 },
      { label: 'Sync Errors (24h)', value: '3', tone: 'amber' },
    ]) +
    panel('Account / Opportunity Matching', table(
      ['Claim', 'Account', 'CRM Opportunity', 'Match Basis', 'Confidence', 'Status'],
      [
        ['CLM-8924-B', 'Nexus Technologies', 'SFDC-009812', 'Domain + CRM ID', badge('98%', 'green'), badge('Linked', 'green')],
        ['CLM-8902-A', 'Acme Corp', 'SFDC-009790', 'Account name', badge('71%', 'amber'), badge('Review', 'amber')],
        ['CLM-8898-C', 'TechFlow Inc', '— (create task)', 'No match', badge('—', 'neutral'), badge('Pending', 'neutral')],
      ]), { icon: 'link' }) +
    panel('CRM Write-Back Fields', `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>${checklist([['partner involved: yes', 'done'], ['partner name + role', 'done'], ['attribution status', 'done'], ['protection window expiry', 'done'], ['payout eligibility flag', 'warn', 'hidden in CRM by config'], ['dispute flag', 'done']])}</div>
<div class="bg-surface-base border border-border-subtle rounded-lg p-4">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Sync Health — Salesforce Production</p>
<div class="flex items-center gap-2 mb-2">${badge('Connected', 'green')}<span class="font-body-sm text-body-sm text-on-surface-variant">last sync 6 min ago</span></div>
${checklist([['Read-first before write-back', 'done'], ['Finance details excluded from CRM', 'done'], ['Sync errors routed to admin queue', 'warn', '3 errors pending']])}</div></div>`, { icon: 'sync_alt' }),
});

// P15 — Revenue Event Validation
screens.revenue_event_validation = page({
  dir: 'revenue_event_validation', navActive: 'Claims', phaseN: 15, tier: 'V2',
  role: 'Finance Ops', title: 'Revenue Event Validation',
  subtitle: 'Confirm whether partner-attributed pipeline became real, invoiced, and collected revenue.',
  actions: [{ text: 'Request Correction', icon: 'undo' }, { text: 'Validate Revenue Event', icon: 'task_alt', primary: true }],
  body:
    metricsGrid([
      { label: 'Claims w/ Revenue Linkage', value: '79%', bar: 79 },
      { label: 'Closed-won → Validated', value: '4.3 days' },
      { label: 'Missing Invoice Rate', value: '9%', tone: 'amber' },
      { label: 'Refund Adjustment Rate', value: '2.1%' },
    ]) +
    panel('Revenue Event — CLM-8924-B', fields([
      ['Revenue Basis (per agreement)', 'Invoice collected'], ['CRM Stage', 'Closed-won'],
      ['Invoice ID', 'INV-8821'], ['Invoice Amount', '$124,500.00'],
      ['Collection Status', 'Collected — 2023-11-20'], ['Revenue Recognition', 'Recognized'],
    ]) + `<div class="mt-4">${stepper(['Opportunity', 'Closed-won', 'Invoiced', 'Collected', 'Recognized'], 4)}</div>`, { icon: 'verified' }) +
    panel('Revenue Status Ledger', table(
      ['Claim', 'Account', 'Status', 'Basis', 'Amount', 'Confidence'],
      [
        ['CLM-8924-B', 'Nexus Technologies', badge('Collected', 'green'), 'Invoice collected', '$124,500', badge('High', 'green')],
        ['CLM-8902-A', 'Acme Corp', badge('Invoiced', 'amber'), 'Closed-won', '$86,500', badge('Med', 'amber')],
        ['CLM-8881-F', 'Initech', badge('Refunded', 'red'), 'Credit note', '-$12,000', badge('High', 'green')],
      ], { right: [4] }), { icon: 'receipt' }) +
    panel('Controls', checklist([
      ['Closed-won does not always equal payout-ready', 'done'],
      ['Agreement rule determines valid revenue basis', 'done'],
      ['Refunds & cancellations update payout eligibility', 'done'],
      ['Manual adjustments require finance approval', 'done'],
    ]), { icon: 'shield' }),
});

// P16 — Payout Eligibility Workspace
screens.payout_eligibility_workspace = page({
  dir: 'payout_eligibility_workspace', navActive: 'Approvals', phaseN: 16, tier: 'MVP',
  role: 'Finance', title: 'Payout Eligibility Workspace',
  subtitle: 'Decide commercial payout eligibility from attribution, agreement rules, revenue, and evidence.',
  actions: [{ text: 'Finance Override', icon: 'edit' }, { text: 'Mark Eligible', icon: 'paid', primary: true }],
  body:
    metricsGrid([
      { label: 'Estimated Payout Liability', value: '$1.2M', tone: 'amber', subIcon: 'warning', subTone: 'amber', sub: 'elevated' },
      { label: 'Payout-Eligible Revenue', value: '$8.4M' },
      { label: 'Missing Condition Rate', value: '12%', tone: 'amber' },
      { label: 'Finance Approval Time', value: '2.1 days' },
    ]) +
    panel('Eligibility Checks — CLM-8924-B', `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>${checklist([
      ['Active partner', 'done'], ['Active agreement', 'done'], ['Accepted attribution', 'done'],
      ['Valid protection window', 'done'], ['Eligible claim type / product / geo', 'done'],
      ['Valid revenue event', 'done'], ['Required invoice / collection evidence', 'done'],
      ['No unresolved dispute', 'done'], ['No exclusion / clawback condition', 'done'],
    ])}</div>
<div class="bg-surface-base border border-border-subtle rounded-lg p-4 flex flex-col">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Estimated Payout</p>
<span class="font-display-metrics text-display-metrics text-primary font-bold">$18,675</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2">15% margin on $124,500 collected (Cloud GTM rule v2.4).</p>
<div class="mt-3">${badge('Eligible', 'green')}</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-3">Payout eligibility ≠ payment execution.</p></div></div>`, { icon: 'rule' }) +
    panel('Finance Review Queue', table(
      ['Claim', 'Partner', 'Est. Payout', 'Missing Conditions', 'Status'],
      [
        ['CLM-8924-B', 'Nexus Technologies', '$18,675', '—', badge('Eligible', 'green')],
        ['CLM-8902-A', 'Acme Corp', '$12,975', 'Revenue not collected', badge('Finance Review', 'amber')],
        ['CLM-8898-C', 'TechFlow Inc', '—', 'Agreement gap', badge('Not Eligible', 'red')],
      ], { right: [2] }), { icon: 'account_balance_wallet' }),
});

// P17 — Finance Evidence Pack
screens.finance_evidence_pack = page({
  dir: 'finance_evidence_pack', navActive: 'Approvals', phaseN: 17, tier: 'V1',
  role: 'Finance / Audit', title: 'Finance Evidence Pack',
  subtitle: 'Package immutable, sourced evidence for finance, accounting, legal, and audit review.',
  actions: [{ text: 'Export PDF/CSV', icon: 'download' }, { text: 'Request Info', icon: 'help' }, { text: 'Approve & Freeze Pack', icon: 'lock', primary: true }],
  body:
    metricsGrid([
      { label: 'Evidence Completeness', value: '96%', bar: 96 },
      { label: 'Finance Approval Rate', value: '91%', bar: 91 },
      { label: 'Evidence Rework Rate', value: '7%', tone: 'amber' },
      { label: 'Audit Issues (qtr)', value: '0', subIcon: 'verified', sub: 'clean' },
    ]) +
    panel('Evidence Pack — CLM-8924-B · Nexus Technologies', `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>${checklist([
      ['Partner profile + legal entity', 'done', 'Source: Registry'],
      ['Agreement reference + rule applied', 'done', 'Source: Rulebook v2.4'],
      ['Claim submission + evidence artifacts', 'done', 'Source: Claim Ledger'],
      ['Attribution timeline + decision', 'done', 'Source: Attribution Workspace'],
      ['Protection window', 'done', 'Source: Protection Engine'],
      ['CRM opportunity', 'done', 'Source: SFDC-009812'],
      ['Revenue event + invoice/payment ref', 'done', 'Source: INV-8821'],
      ['Payout calculation', 'done', '$18,675'],
      ['Approval + dispute history', 'done', 'Source: Audit Log'],
    ])}</div>
<div class="bg-surface-base border border-border-subtle rounded-lg p-4 flex flex-col">
<p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Pack Status</p>
<div class="flex items-center gap-2 mb-3">${badge('Ready to Freeze', 'green')}</div>
${fields([['Pack Version', 'v1 (draft)'], ['Items', '14 / 14 sourced'], ['Finance Owner', 'Lena Osei'], ['Provenance', 'Every item traceable']], 1)}
<p class="font-body-sm text-body-sm text-on-surface-variant mt-3">Finance-approved versions are immutable; later changes create a new version.</p></div></div>`, { icon: 'inventory_2' }) +
    panel('Controls', checklist([
      ['Evidence pack shows source of each item', 'done'],
      ['Finance-approved versions are immutable', 'done'],
      ['Adjustments require a new version', 'done'],
      ['Missing evidence blocks approval where required', 'done'],
    ]), { icon: 'shield' }),
});

// ---- write files ----
let written = 0;
for (const [dir, html] of Object.entries(screens)) {
  const out = path.join(SRC, dir);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'code.html'), html);
  written++;
  process.stdout.write(`  + ${dir}\n`);
}
console.log(`\nGenerated ${written} gap screens into screens/.`);
