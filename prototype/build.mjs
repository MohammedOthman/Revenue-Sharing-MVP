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

function rewriteHtml(html, recoveredKs) {
  let k = -1;
  return html
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\s*/g, '')
    .replace(/<script id="tailwind-config">[\s\S]*?<\/script>\s*/g, '')
    .replace(/<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\s*/g, '')
    .replace(/https:\/\/lh3\.googleusercontent\.com\/[^"')\s]+/g, () => {
      k++;
      return recoveredKs.has(k) ? `img-${k}.png` : '/assets/placeholder.svg';
    })
    // wire dead sidebar nav (icon + label anchors) to their canonical screens
    .replace(/(<a\b[^>]*href=")#("[^>]*>\s*<span class="material-symbols-outlined[^"]*"[^>]*>[^<]+<\/span>\s*<span[^>]*>)([^<]+)(<\/span>\s*<\/a>)/g,
      (full, pre, mid, label, post) => {
        const dest = NAV[label.trim().toLowerCase()];
        return dest ? pre + dest + mid + label + post : full;
      })
    .replace(/<\/head>/i,
      '<link rel="stylesheet" href="/assets/fonts.css"/>\n<link rel="stylesheet" href="app.css"/>\n</head>')
    .replace(/<\/body>/i, OVERVIEW_PILL + '\n</body>');
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
    const badge = e.hasCode ? '' : '<span class="badge">design only</span>';
    return `<a class="card" href="${href}"><div class="thumb"><img loading="lazy" src="${e.dir}/screen.png" alt=""/></div><div class="meta"><span class="t">${e.title}</span>${badge}</div></a>`;
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
<span class="stat">${built} screens · click any card to open</span></header>
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
    fs.writeFileSync(path.join(outDir, 'code.html'), rewriteHtml(html, recoveredKs));
    manifest.push({ dir, title, hasCode: true });
    built++;
    process.stdout.write(`  ✓ ${dir} (${(css.length / 1024).toFixed(0)}kB${recoveredKs.size ? `, ${recoveredKs.size} img` : ''})\n`);
  }

  fs.writeFileSync(path.join(OUT, 'index.html'), buildIndex(manifest, built, pngOnly));
  console.log(`\nBuilt ${built} interactive screens + ${pngOnly} design-only frames -> ${path.relative(HERE, OUT)}/`);
})().catch(e => { console.error('BUILD FAILED:', e); process.exit(1); });
