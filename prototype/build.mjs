/* Offline build for the Stitch "Partner Revenue OS" export.
 *
 *   screens/<name>/code.html  (pristine Stitch output, depends on blocked CDNs)
 *     -->  dist/<name>/{code.html, app.css, screen.png}  +  dist/assets/  +  dist/index.html
 *
 * For each screen it:
 *   1. reads the page's inline `tailwind.config` (MD3 design tokens),
 *   2. compiles a per-page app.css with the real Tailwind engine,
 *   3. rewrites <head> to drop the blocked Play-CDN + Google-Fonts and point at
 *      locally-vendored fonts.css + the compiled app.css,
 *   4. swaps blocked remote avatar images for a local placeholder.
 * Then it emits index.html linking every screen, grouped by journey phase.
 *
 * Idempotent: dist/ is wiped and rebuilt each run. screens/ is never modified.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';
import { phaseBar, headerLinks, buildJourney, buildCadence } from './nav-pages.mjs';
import { PHASES } from './workflow.mjs';
const NEW_DIRS = new Set(PHASES.filter(p => p.status === 'new').map(p => p.dir));

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, 'screens');
const OUT = path.join(HERE, 'dist');
const RECOVERED = path.join(HERE, 'recovered'); // real images recovered from screen.png (see recover-images.mjs)

// Make the gallery a clickable flow: the screens' sidebar nav items are dead
// (href="#"); map each nav label to a canonical destination screen so they work.
const NAV = {
  dashboard:     '/partner_revenue_command_center/code.html',
  partners:      '/partner_registry/code.html',
  claims:        '/enhanced_revenue_claim_portal_with_simulation/code.html',
  approvals:     '/attribution_approval_workspace/code.html',
  settings:      '/gcc_saudi_localization_settings_with_rationales/code.html',
  documentation: '/developer_hub_api_management_with_rationales/code.html',
  statements:    '/partner_portal_statement_view/code.html',
  support:       '/index.html',
};

// The global-navigation screen ships unresolved Stitch {{DATA:SCREEN:SCREEN_NN}}
// placeholders; resolve each to its real screen (inferred from the nav label).
// Any unknown id falls back to the index so no dead placeholder ever survives.
const SCREEN_MAP = {
  SCREEN_46: 'partner_revenue_command_center',                    // Command Center
  SCREEN_43: 'advanced_ecosystem_attribution_hub_with_rationales',// Network
  SCREEN_41: 'revenue_reconciliation_settlement_center',          // Settlements
  SCREEN_24: 'enhanced_revenue_claim_portal_with_simulation',     // Claims
  SCREEN_14: 'partner_registry',                                  // Partners
  SCREEN_29: 'deal_registration_claim_capture',                   // Deals
};

// Deep-links that play the product journey: per-screen, wire key controls
// (primary buttons / "View All" / table rows) to the relevant screen. Consumed
// at runtime by deeplink.js. Only the named controls are wired.
const C = p => `/${p}/code.html`;
const CLAIM = C('enhanced_revenue_claim_portal_with_simulation'); // "New Claim" target, used widely
const DEEPLINKS = {
  // ---- Command Center & registry ----
  partner_revenue_command_center: {
    rowsByTable: [C('attribution_approval_workspace'), C('dispute_management_workspace')],
    viewAll:     [C('attribution_approval_workspace'), C('dispute_management_workspace')],
    buttons: [{ text: 'Review', href: C('attribution_approval_workspace') }],
  },
  partner_registry: {
    rows: C('partner_profile_kyc_vault_with_rationales'),
    buttons: [{ text: 'Add Partner', href: C('partner_sourcing_intake') }],
  },
  partner_profile_kyc_vault_with_rationales: {
    rows: C('agreement_rulebook_configuration'),
    buttons: [
      { text: 'Edit Profile', href: C('partner_onboarding_kyc_portal') },
      { text: 'View Full Contract Archive', href: C('agreement_rulebook_configuration') },
      { text: 'Request Audit', href: C('finance_evidence_pack') },
    ],
  },

  // ---- Phase 1–5: strategy → segmentation → sourcing → qualification → approval ----
  partner_strategy_program_thesis: {
    buttons: [{ text: 'Submit for Approval', href: C('partner_segmentation_role_taxonomy') }],
  },
  partner_segmentation_role_taxonomy: {
    buttons: [{ text: 'Add Role', href: C('partner_sourcing_intake') }],
  },
  partner_sourcing_intake: {
    rows: C('partner_qualification_scorecard'),
    buttons: [{ text: 'Inbound Applications', href: C('partner_qualification_scorecard') }],
  },
  partner_qualification_scorecard: {
    buttons: [{ text: 'Approve for Onboarding', href: C('partner_approval_workflow') }],
  },
  partner_approval_workflow: {
    buttons: [{ text: 'Approve & Create Record', href: C('agreement_rulebook_configuration') }],
  },
  partner_verification_portal_b2b_copy: {
    buttons: [{ text: 'Save & Proceed', href: C('partner_onboarding_activation_hub_with_rationales') }],
  },
  partner_verification_dashboard_pending: {
    buttons: [{ text: 'New Claim', href: CLAIM }],
  },

  // ---- Phase 6–8: agreement → integration → onboarding ----
  agreement_rulebook_configuration: {
    rows: C('multi_partner_split_configuration_with_rationales'),
    buttons: [
      { text: 'Publish Rulebook', href: C('integration_health_data_mapping_with_rationales') },
      { text: 'New Agreement Type', href: C('commercial_rulebook_b2b_copy') },
    ],
  },
  agreement_rulebook_with_rationales_1: {
    rows: C('multi_partner_split_configuration_with_rationales'),
    buttons: [{ text: 'Publish Rulebook', href: C('integration_health_data_mapping_with_rationales') }],
  },
  agreement_rulebook_with_rationales_2: {
    rows: C('multi_partner_split_configuration_with_rationales'),
    buttons: [{ text: 'Publish Rulebook', href: C('integration_health_data_mapping_with_rationales') }],
  },
  agreement_rulebook_multi_role_support: {
    rows: C('multi_partner_split_configuration_with_rationales'),
    buttons: [{ text: 'Publish Rulebook', href: C('integration_health_data_mapping_with_rationales') }],
  },
  commercial_rulebook_b2b_copy: {
    rows: C('multi_partner_split_configuration_with_rationales'),
    buttons: [
      { text: 'Activate Commercial Terms', href: C('integration_health_data_mapping_with_rationales') },
      { text: 'Simulate Payout Logic', href: C('incentive_simulation_rule_sandbox') },
    ],
  },
  multi_partner_split_configuration_with_rationales: {
    buttons: [
      { text: 'Commit Split', href: C('attribution_approval_workspace') },
      { text: 'Escalate to Dispute', href: C('dispute_management_workspace') },
    ],
  },
  partner_tier_program_sandbox_with_rationales: {
    rows: C('partner_registry'),
    buttons: [
      { text: 'Add Custom Tier', href: C('partner_segmentation_role_taxonomy') },
      { text: 'Save Draft Ruleset', href: C('agreement_rulebook_configuration') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  integration_health_data_mapping_with_rationales: {
    rows: C('crm_link_sync_monitor'),
    viewAll: [C('crm_link_sync_monitor')],
    buttons: [
      { text: 'New Connection', href: C('crm_link_sync_monitor') },
      { text: 'Manage All Schema Mappings', href: C('crm_link_sync_monitor') },
    ],
  },
  partner_onboarding_kyc_portal: {
    buttons: [{ text: 'Save & Continue', href: C('partner_onboarding_activation_hub_with_rationales') }],
  },
  partner_onboarding_with_rationales: {
    buttons: [{ text: 'Save & Continue', href: C('partner_onboarding_activation_hub_with_rationales') }],
  },
  partner_onboarding_activation_hub_with_rationales: {
    buttons: [{ text: 'New Claim', href: CLAIM }],
  },

  // ---- Phase 9–13: touchpoints → claim → preflight → attribution → multi-touch ----
  ecosystem_touchpoint_ledger: {
    rows: C('advanced_ecosystem_attribution_hub_with_rationales'),
    buttons: [
      { text: 'Import from CRM', href: CLAIM },
      { text: 'Add Touchpoint', href: CLAIM },
    ],
  },
  enhanced_revenue_claim_portal_with_simulation: {
    buttons: [
      { text: 'Submit to Ledger', href: C('claim_preflight_exception_queue') },
      { text: 'New Claim', href: C('deal_registration_claim_capture') },
    ],
  },
  deal_registration_claim_capture: {
    buttons: [{ text: 'Submit Claim', href: C('claim_preflight_exception_queue') }],
  },
  claim_submission_portal_b2b_copy: {
    buttons: [{ text: 'Finalize Submission', href: C('claim_preflight_exception_queue') }],
  },
  claim_preflight_exception_queue: {
    rows: C('attribution_approval_workspace'),
    buttons: [{ text: 'Pass to Attribution', href: C('attribution_approval_workspace') }],
  },
  attribution_approval_workspace: {
    buttons: [
      { text: 'Open Dispute', href: C('dispute_management_workspace') },
      { text: 'Accept Attribution', href: C('crm_link_sync_monitor') },
    ],
  },
  advanced_ecosystem_attribution_hub_with_rationales: {
    buttons: [
      { text: 'Add Evidence', href: C('attribution_approval_workspace') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  ecosystem_attribution_b2b_copy: {
    buttons: [
      { text: 'Add Evidence', href: C('attribution_approval_workspace') },
      { text: 'New Claim', href: CLAIM },
    ],
  },

  // ---- Phase 14–18: CRM link → revenue → payout → evidence → statement ----
  crm_link_sync_monitor: {
    rows: C('revenue_event_validation'),
    buttons: [{ text: 'Configure Write-Back', href: C('revenue_event_validation') }],
  },
  revenue_event_validation: {
    rows: C('payout_eligibility_workspace'),
    buttons: [{ text: 'Validate Revenue Event', href: C('payout_eligibility_workspace') }],
  },
  payout_eligibility_workspace: {
    rows: C('finance_evidence_pack'),
    buttons: [{ text: 'Mark Eligible', href: C('finance_evidence_pack') }],
  },
  finance_evidence_pack: {
    buttons: [{ text: 'Approve & Freeze Pack', href: C('partner_portal_statement_view') }],
  },
  partner_portal_statement_view: {
    rows: C('attribution_approval_workspace'),
    buttons: [{ text: 'Register New Deal', href: C('deal_registration_claim_capture') }],
  },

  // ---- Phase 19–20: disputes → settlement ----
  dispute_management_workspace: {
    buttons: [{ text: 'Accept Dispute & Adjust', href: C('resolution_ledger_with_financial_sync') }],
  },
  resolution_workspace_b2b_copy: {
    buttons: [
      { text: 'Approve Claim & Reconcile', href: C('revenue_reconciliation_settlement_center') },
      { text: 'Deny Claim with Rationale', href: C('dispute_management_workspace') },
    ],
  },
  resolution_ledger_with_financial_sync: {
    buttons: [{ text: 'New Claim', href: CLAIM }],
  },
  revenue_reconciliation_settlement_center: {
    rows: C('advanced_settlement_recovery_hub_b2b_copy'),
    buttons: [{ text: 'Approve Batch', href: C('revenue_settlement_center_b2b_copy') }],
  },
  revenue_settlement_center_b2b_copy: {
    rows: C('advanced_settlement_recovery_hub_b2b_copy'),
    buttons: [
      { text: 'Authorize Settlement', href: C('advanced_settlement_recovery_hub_b2b_copy') },
      { text: 'Execute ERP Sync', href: C('integration_health_data_mapping_with_rationales') },
    ],
  },
  advanced_settlement_recovery_hub_b2b_copy: {
    rows: C('dispute_management_workspace'),
    buttons: [
      { text: 'Execute Pending Batches', href: C('revenue_settlement_center_b2b_copy') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  shadow_revenue_detection_engine: {
    rows: C('shadow_revenue_resolution_workspace_with_rationales'),
    viewAll: [C('shadow_revenue_resolution_workspace_with_rationales')],
    buttons: [{ text: 'Convert Claim', href: CLAIM }],
  },
  shadow_revenue_resolution_workspace_with_rationales: {
    buttons: [
      { text: 'Manual Credit Assignment', href: C('multi_partner_split_configuration_with_rationales') },
      { text: 'New Claim', href: CLAIM },
    ],
  },

  // ---- Phase 21–22: performance → executive investment ----
  partner_performance_scorecard_with_rationales: {
    buttons: [
      { text: 'Adjust Tier', href: C('partner_tier_program_sandbox_with_rationales') },
      { text: 'Export Detailed ROI', href: C('partner_roi_analysis_b2b_copy') },
    ],
  },
  partner_profit_loss_with_rationales: {
    buttons: [{ text: 'Adjust Payout Rules', href: C('agreement_rulebook_configuration') }],
  },
  partner_profit_loss_analysis: {
    buttons: [{ text: 'Adjust Payout Rules', href: C('agreement_rulebook_configuration') }],
  },
  partner_roi_analysis_b2b_copy: {
    buttons: [{ text: 'Adjust Payout Rules', href: C('agreement_rulebook_configuration') }],
  },
  executive_dashboard_b2b_copy: {
    rowsByTable: [C('attribution_approval_workspace'), C('dispute_management_workspace')],
    viewAll:     [C('attribution_approval_workspace'), C('dispute_management_workspace')],
    buttons: [{ text: 'Audit Claim', href: C('attribution_approval_workspace') }],
  },
  quarterly_executive_pack_cro_cfo: {
    rows: C('partner_concentration_risk_map_with_rationales'),
    viewAll: [C('partner_concentration_risk_map_with_rationales')], // only "View All Risks" matches
    buttons: [{ text: 'Review Allocation Model', href: C('strategic_roi_investment_cockpit_with_rationales') }],
  },
  strategic_roi_investment_cockpit_with_rationales: {
    rows: C('partner_performance_scorecard_with_rationales'),
    buttons: [
      { text: 'Approve Reallocation', href: C('quarterly_executive_pack_cro_cfo') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  strategic_incentive_strategy_cockpit_with_rationales: {
    buttons: [
      { text: 'Rule Deployment', href: C('agreement_rulebook_configuration') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  incentive_simulation_rule_sandbox: {
    buttons: [{ text: 'Save Scenario', href: C('strategic_incentive_strategy_cockpit_with_rationales') }],
  },
  partner_concentration_risk_map_with_rationales: {
    buttons: [
      { text: 'View Pipeline Candidates', href: C('partner_registry') },
      { text: 'New Claim', href: CLAIM },
    ],
  },

  // ---- Developer & governance (supporting) ----
  developer_hub_api_management_with_rationales: {
    rows: C('developer_api_gateway_with_rationales'),
    buttons: [
      { text: 'Explore Dev Portal', href: C('developer_api_gateway_with_rationales') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  gcc_saudi_localization_settings_with_rationales: {
    buttons: [
      { text: 'Save Configuration', href: C('global_entity_currency_governance_with_rationales') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
  global_entity_currency_governance_with_rationales: {
    rows: C('gcc_saudi_localization_settings_with_rationales'),
    buttons: [
      { text: 'Add Entity', href: C('gcc_saudi_localization_settings_with_rationales') },
      { text: 'View Role Matrix', href: C('partner_approval_workflow') },
      { text: 'New Claim', href: CLAIM },
    ],
  },
};
const INPUT_CSS = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n';

// .woff2 files copied out of node_modules into dist/assets/ (referenced by fonts.css)
const FONT_FILES = [
  ['material-symbols', 'material-symbols-outlined.woff2'],
  ...[400, 500, 600, 700].map(w => ['@fontsource/inter', `files/inter-latin-${w}-normal.woff2`]),
  ...[400, 600, 700, 800, 900].map(w => ['@fontsource/public-sans', `files/public-sans-latin-${w}-normal.woff2`]),
];

function extractTheme(html) {
  const m = html.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/);
  if (!m) return { theme: {}, darkMode: 'class' };
  const body = m[1].trim().replace(/^tailwind\.config\s*=\s*/, '').replace(/;?\s*$/, '');
  try {
    const cfg = new Function('return (' + body + ')')();
    return { theme: cfg.theme || {}, darkMode: cfg.darkMode || 'class' };
  } catch (e) {
    console.warn('  ! config parse failed, empty theme:', e.message);
    return { theme: {}, darkMode: 'class' };
  }
}

async function compile(html, theme, darkMode) {
  const config = {
    content: [{ raw: html, extension: 'html' }],
    darkMode,
    theme,
    plugins: [forms, containerQueries],
  };
  const res = await postcss([tailwindcss(config)]).process(INPUT_CSS, { from: undefined });
  return res.css;
}

// Each <img> references the blocked lh3 host in DOM/source order. The k-th such
// reference is swapped for the real image recovered from screen.png (recovered/<dir>/<k>.png,
// produced by recover-images.mjs) when available, else a local placeholder.
// Fixed circular "Overview" button so any screen can return to the index hub.
// Compact FAB in the bottom-left corner (standard help-bubble pattern) so it
// stays clear of primary action bars (bottom-right) and page content.
const OVERVIEW_PILL = `<a href="/index.html" title="Overview — all screens" aria-label="Overview — all screens" style="position:fixed;left:16px;bottom:16px;z-index:99999;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;background:#07006c;color:#fff;border-radius:50%;box-shadow:0 6px 18px rgba(7,0,108,.45);text-decoration:none"><span class="material-symbols-outlined" style="font-size:22px">grid_view</span></a>`;

function rewriteHtml(html, recoveredKs, dir) {
  let k = -1;
  const dl = DEEPLINKS[dir];
  const dlScript = dl
    ? `<script>window.__DL=${JSON.stringify(dl)}</script>\n<script src="/assets/deeplink.js"></script>`
    : '';
  return html
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\s*/g, '')
    .replace(/<script id="tailwind-config">[\s\S]*?<\/script>\s*/g, '')
    .replace(/<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\s*/g, '')
    .replace(/https:\/\/lh3\.googleusercontent\.com\/[^"')\s]+/g, () => {
      k++;
      return recoveredKs.has(k) ? `img-${k}.png` : '/assets/placeholder.svg';
    })
    // resolve unresolved Stitch screen placeholders to real screens
    .replace(/\{\{DATA:SCREEN:(SCREEN_\d+)\}\}/g, (_m, id) =>
      SCREEN_MAP[id] ? `/${SCREEN_MAP[id]}/code.html` : '/index.html')
    // wire dead sidebar nav (icon + label anchors) to their canonical screens
    .replace(/(<a\b[^>]*href=")#("[^>]*>\s*<span class="material-symbols-outlined[^"]*"[^>]*>[^<]+<\/span>\s*<span[^>]*>)([^<]+)(<\/span>\s*<\/a>)/g,
      (full, pre, mid, label, post) => {
        const dest = NAV[label.trim().toLowerCase()];
        return dest ? pre + dest + mid + label + post : full;
      })
    .replace(/<\/head>/i,
      '<link rel="stylesheet" href="/assets/fonts.css"/>\n<link rel="stylesheet" href="app.css"/>\n</head>')
    .replace(/<\/body>/i, OVERVIEW_PILL + '\n' + phaseBar(dir) + '\n' + dlScript + '\n</body>');
}

function titleOf(html, dir) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  let t = (m ? m[1] : '').trim().replace(/^Partner Revenue OS\s*[-—:]\s*/i, '').trim();
  if (!t) t = dir.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return t;
}

const GROUPS = [
  ['Onboarding & Identity', /onboarding|kyc|verification|registry|profile/],
  ['Command Center', /command_center/],
  ['Revenue Claims', /claim|deal_registration/],
  ['Attribution & Ecosystem', /attribution|ecosystem|concentration/],
  ['Agreements & Rulebook', /agreement|rulebook|split|tier/],
  ['Reconciliation & Settlement', /reconciliation|settlement|ledger|recovery/],
  ['Disputes & Resolution', /dispute|resolution|shadow/],
  ['Intelligence & Strategy', /roi|incentive|profit_loss|scorecard|performance|simulation|sandbox/],
  ['Partner Portal', /partner_portal/],
  ['Executive Reporting', /executive|quarterly/],
  ['Developer & Integrations', /developer|api_gateway|integration/],
  ['Admin, Governance & Localization', /admin|localization|gcc|entity_currency|governance|settings|navigation/],
];
const groupOf = dir => (GROUPS.find(([, re]) => re.test(dir)) || ['Other'])[0];

function writeAssets() {
  const dir = path.join(OUT, 'assets');
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(HERE, 'fonts.css'), path.join(dir, 'fonts.css'));
  fs.copyFileSync(path.join(HERE, 'placeholder.svg'), path.join(dir, 'placeholder.svg'));
  fs.copyFileSync(path.join(HERE, 'deeplink.js'), path.join(dir, 'deeplink.js'));
  for (const [pkg, rel] of FONT_FILES) {
    const from = path.join(HERE, 'node_modules', pkg, rel);
    fs.copyFileSync(from, path.join(dir, path.basename(rel)));
  }
}

function buildIndex(manifest, built, pngOnly) {
  const byGroup = {};
  for (const e of manifest) (byGroup[groupOf(e.dir)] ||= []).push(e);
  const order = GROUPS.map(g => g[0]).concat('Other');
  const card = e => {
    const href = e.hasCode ? `${e.dir}/code.html` : `${e.dir}/screen.png`;
    const badge = e.hasCode ? (NEW_DIRS.has(e.dir) ? '<span class="badge new">new</span>' : '') : '<span class="badge">design only</span>';
    const thumb = e.hasPng ? `<div class="thumb"><img loading="lazy" src="${e.dir}/screen.png" alt=""/></div>` : `<div class="thumb" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#eef3ff,#e5eeff)"><span class="material-symbols-outlined" style="font-size:40px;color:#9bb4e0">draft</span></div>`;
    return `<a class="card" href="${href}">${thumb}<div class="meta"><span class="t">${e.title}</span>${badge}</div></a>`;
  };
  const sections = order.filter(g => byGroup[g]).map(g =>
    `<section><h2>${g} <span class="count">${byGroup[g].length}</span></h2><div class="grid">${byGroup[g].map(card).join('')}</div></section>`).join('\n');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Partner Revenue OS — Prototype Journey</title>
<link rel="stylesheet" href="/assets/fonts.css"/>
<style>
  :root{--bg:#f8f9ff;--surface:#fff;--line:#dce9ff;--ink:#0b1c30;--muted:#45464d;--brand:#07006c;--chip:#e5eeff}
  *{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif}
  header{padding:40px 32px 24px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,#eff4ff,transparent)}
  header h1{font-family:'Public Sans',sans-serif;font-weight:800;font-size:30px;margin:0 0 6px}
  header p{margin:0;color:var(--muted);max-width:760px;line-height:1.5}
  .stat{display:inline-block;margin-top:14px;font-size:13px;color:var(--brand);background:var(--chip);padding:6px 12px;border-radius:999px;font-weight:600}
  main{padding:24px 32px 64px;max-width:1400px;margin:0 auto} section{margin-top:32px}
  h2{font-family:'Public Sans',sans-serif;font-size:18px;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px}
  .count{font-size:12px;font-weight:600;color:var(--muted);background:var(--chip);border-radius:999px;padding:2px 9px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
  .card{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .12s,box-shadow .12s}
  .card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(7,0,108,.12);border-color:#bcd0ff}
  .thumb{aspect-ratio:16/10;background:#eef3ff;overflow:hidden;border-bottom:1px solid var(--line)}
  .thumb img{width:100%;height:100%;object-fit:cover;object-position:top}
  .meta{padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px}
  .t{font-weight:600;font-size:14px;line-height:1.3}
  .badge{font-size:10px;font-weight:700;color:#8a6d00;background:#fff4d6;padding:3px 7px;border-radius:6px;white-space:nowrap}
</style></head><body>
<header><h1>Partner Revenue OS — Prototype Journey</h1>
<p>Interactive walkthrough of the end-to-end product UI (MVP → V3), compiled to run fully offline. ${built} interactive screens${pngOnly ? ` + ${pngOnly} design-only frames` : ''}, grouped by the journey phases from the Technical Handoff &amp; PDR.</p>
<span class="stat">${built} screens · click any card to open</span>${headerLinks()}</header>
<main>${sections}</main></body></html>`;
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  writeAssets();

  const dirs = fs.readdirSync(SRC, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name).sort();

  const manifest = [];
  let built = 0, pngOnly = 0;
  for (const dir of dirs) {
    const srcDir = path.join(SRC, dir);
    const htmlPath = path.join(srcDir, 'code.html');
    const pngPath = path.join(srcDir, 'screen.png');
    const hasCode = fs.existsSync(htmlPath);
    const hasPng = fs.existsSync(pngPath);
    if (!hasCode && !hasPng) continue;            // e.g. revenue_ledger_protocol (DESIGN.md only)
    const outDir = path.join(OUT, dir);
    fs.mkdirSync(outDir, { recursive: true });
    if (hasPng) fs.copyFileSync(pngPath, path.join(outDir, 'screen.png'));

    if (!hasCode) { manifest.push({ dir, title: dir.replace(/_/g, ' '), hasCode: false }); pngOnly++; continue; }

    let html = fs.readFileSync(htmlPath, 'utf8');
    const title = titleOf(html, dir);
    const { theme, darkMode } = extractTheme(html);
    const css = await compile(html, theme, darkMode);
    fs.writeFileSync(path.join(outDir, 'app.css'), css);

    // wire in any real images recovered from screen.png for this screen
    const recDir = path.join(RECOVERED, dir);
    const recoveredKs = new Set();
    if (fs.existsSync(recDir)) {
      for (const f of fs.readdirSync(recDir)) {
        const m = f.match(/^(\d+)\.png$/);
        if (m) { const k = +m[1]; recoveredKs.add(k); fs.copyFileSync(path.join(recDir, f), path.join(outDir, `img-${k}.png`)); }
      }
    }
    fs.writeFileSync(path.join(outDir, 'code.html'), rewriteHtml(html, recoveredKs, dir));
    manifest.push({ dir, title, hasCode: true, hasPng });
    built++;
    process.stdout.write(`  ✓ ${dir} (${(css.length / 1024).toFixed(0)}kB${recoveredKs.size ? `, ${recoveredKs.size} img` : ''})\n`);
  }

  fs.writeFileSync(path.join(OUT, 'index.html'), buildIndex(manifest, built, pngOnly));
  buildJourney(OUT);
  buildCadence(OUT);
  console.log(`\nBuilt ${built} interactive screens + ${pngOnly} design-only frames -> ${path.relative(HERE, OUT)}/`);
})().catch(e => { console.error('BUILD FAILED:', e); process.exit(1); });
