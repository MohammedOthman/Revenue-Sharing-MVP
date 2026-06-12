/* Workflow navigator surfaces, kept out of build.mjs to stay surgical:
 *  - phaseBar(dir): fixed bottom-center Prev/Next bar walking the 22 phases
 *  - buildJourney(OUT): journey.html — the 22-phase map grouped by layer
 *  - buildCadence(OUT): cadence.html — the daily/weekly/monthly/quarterly view
 *  - headerLinks(): the journey/cadence pills injected into index.html's header
 * Driven by workflow.mjs (single source of truth).
 */
import fs from 'node:fs';
import path from 'node:path';
import { PHASES, GROUPS, CADENCE } from './workflow.mjs';

const PHASE_IDX = new Map(PHASES.map((p, i) => [p.dir, i]));

export function phaseBar(dir) {
  const i = PHASE_IDX.get(dir);
  if (i == null) return '';
  const prev = PHASES[i - 1], next = PHASES[i + 1], cur = PHASES[i];
  const chev = d => `<span class="material-symbols-outlined" style="font-size:18px">${d}</span>`;
  const link = (p, label, dirn) => p
    ? `<a href="/${p.dir}/code.html" title="${p.n}. ${p.title.replace(/"/g, '')}" style="display:inline-flex;align-items:center;gap:4px;color:#07006c;font-weight:600;text-decoration:none;padding:6px 10px;border-radius:8px">${dirn === 'prev' ? chev('chevron_left') : ''}${label}${dirn === 'next' ? chev('chevron_right') : ''}</a>`
    : `<span style="color:#b0b4c0;padding:6px 10px">${dirn === 'prev' ? '‹ Start' : 'End ›'}</span>`;
  return `<div style="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99998;display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #dce9ff;border-radius:999px;box-shadow:0 6px 20px rgba(7,0,108,.16);padding:5px 8px;font-family:Inter,system-ui,sans-serif;font-size:13px;max-width:92vw">${link(prev, 'Prev', 'prev')}<a href="/journey.html" title="Workflow journey map" style="display:inline-flex;align-items:center;gap:6px;color:#0b1c30;text-decoration:none;padding:6px 12px;border-left:1px solid #eef;border-right:1px solid #eef;white-space:nowrap"><span style="background:#e5eeff;color:#07006c;font-weight:700;border-radius:999px;padding:2px 8px;font-size:11px">Phase ${cur.n}/22</span><span class="material-symbols-outlined" style="font-size:18px">map</span></a>${link(next, 'Next', 'next')}</div>`;
}

export function headerLinks() {
  return `<div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:10px;align-items:center">
<a href="/journey.html" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#fff;background:#07006c;padding:9px 14px;border-radius:999px;text-decoration:none"><span class="material-symbols-outlined" style="font-size:16px">map</span>22-Phase Workflow Journey</a>
<a href="/cadence.html" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#07006c;background:#e5eeff;padding:9px 14px;border-radius:999px;text-decoration:none"><span class="material-symbols-outlined" style="font-size:16px">event_repeat</span>Operating Cadence</a></div>`;
}

const NAV_CSS = `:root{--bg:#f8f9ff;--surface:#fff;--line:#dce9ff;--ink:#0b1c30;--muted:#45464d;--brand:#07006c;--chip:#e5eeff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif}a{color:inherit}
header{padding:36px 32px 22px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,#eff4ff,transparent)}
header h1{font-family:'Public Sans',sans-serif;font-weight:800;font-size:28px;margin:0 0 6px}
header p{margin:0;color:var(--muted);max-width:820px;line-height:1.5}
.top{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;padding:8px 13px;border-radius:999px;text-decoration:none}
.pill.solid{background:var(--brand);color:#fff}.pill.ghost{background:var(--chip);color:var(--brand)}
main{padding:24px 32px 80px;max-width:1500px;margin:0 auto}
.tier{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:2px 8px;border-radius:999px}
.t-MVP{background:#e5eeff;color:#07006c}.t-V1{background:#dcfce7;color:#166534}.t-V2{background:#fef3c7;color:#92400e}.t-V3{background:#ede9fe;color:#5b21b6}
.material-symbols-outlined{vertical-align:middle}`;

const FONT_HEAD = `<link rel="stylesheet" href="/assets/fonts.css"/>`;

export function buildJourney(OUT) {
  const card = (p) => `<a class="pcard" href="/${p.dir}/code.html" title="${p.title.replace(/"/g, '')}">
<div class="pc-top"><span class="pnum">${p.n}</span><span class="tier t-${p.tier}">${p.tier}</span>${p.status === 'new' ? '<span class="newbadge">NEW</span>' : ''}</div>
<div class="pc-title">${p.title}</div><div class="pc-purpose">${p.purpose}</div>
<div class="pc-role"><span class="material-symbols-outlined" style="font-size:14px">badge</span> ${p.role}</div></a>`;
  const lanes = GROUPS.map((g, gi) => {
    const ps = PHASES.filter(p => p.group === g);
    return `<section class="lane"><div class="lane-h"><span class="lane-n">${gi + 1}</span><h2>${g}</h2><span class="lane-c">Phases ${ps[0].n}–${ps[ps.length - 1].n}</span></div><div class="lane-grid">${ps.map(card).join('')}</div></section>`;
  }).join('');
  const newCount = PHASES.filter(p => p.status === 'new').length;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Partner Revenue OS — 22-Phase Workflow Journey</title>${FONT_HEAD}
<style>${NAV_CSS}
.legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;font-size:12px;color:var(--muted);align-items:center}
.lane{margin-top:30px}.lane-h{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.lane-h h2{font-family:'Public Sans',sans-serif;font-size:18px;font-weight:700;margin:0}
.lane-n{width:26px;height:26px;border-radius:50%;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px}
.lane-c{font-size:12px;color:var(--muted);background:var(--chip);border-radius:999px;padding:2px 10px}
.lane-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.pcard{display:flex;flex-direction:column;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;text-decoration:none;transition:transform .12s,box-shadow .12s}
.pcard:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(7,0,108,.12);border-color:#bcd0ff}
.pc-top{display:flex;align-items:center;gap:8px}
.pnum{width:24px;height:24px;border-radius:7px;background:#0b1c30;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}
.newbadge{font-size:10px;font-weight:800;color:#166534;background:#dcfce7;border:1px solid #bbf7d0;border-radius:6px;padding:2px 6px;margin-left:auto}
.pc-title{font-family:'Public Sans',sans-serif;font-weight:700;font-size:15px;line-height:1.25}
.pc-purpose{font-size:12.5px;color:var(--muted);line-height:1.45}
.pc-role{font-size:11px;color:var(--brand);font-weight:600;margin-top:auto;display:flex;align-items:center;gap:4px}</style></head><body>
<header><div class="top"><a class="pill solid" href="/index.html"><span class="material-symbols-outlined" style="font-size:16px">grid_view</span>Overview</a><a class="pill ghost" href="/cadence.html"><span class="material-symbols-outlined" style="font-size:16px">event_repeat</span>Operating Cadence</a></div>
<h1>End-to-End Workflow — 22 Phases</h1>
<p>The full partner-revenue workflow from the End-to-End Business Workflow manual: strategy → sourcing → qualification → approval → agreement → onboarding → touchpoints → claim → preflight → attribution → CRM → revenue → payout → evidence → statement → disputes → settlement → performance → investment. Each card opens that phase's screen. <strong>${newCount} phases were newly built</strong> to close gaps against the manual.</p>
<div class="legend"><span><span class="tier t-MVP">MVP</span> Control the Claim</span><span><span class="tier t-V1">V1</span> Operational</span><span><span class="tier t-V2">V2</span> Finance-Ready</span><span><span class="tier t-V3">V3</span> Investable</span><span><span class="newbadge">NEW</span> built to close a gap</span></div></header>
<main>${lanes}</main></body></html>`;
  fs.writeFileSync(path.join(OUT, 'journey.html'), html);
}

export function buildCadence(OUT) {
  const card = (c) => `<section class="ccard"><div class="cc-h"><span class="material-symbols-outlined" style="font-size:22px;color:var(--brand)">${c.icon}</span><h2>${c.key}</h2></div>
<p class="cc-users"><span class="material-symbols-outlined" style="font-size:14px">groups</span> ${c.users}</p>
<div class="cc-sec">Activities</div><ul class="cc-acts">${c.activities.map(a => `<li>${a}</li>`).join('')}</ul>
<div class="cc-sec">Product surfaces</div><div class="cc-surf">${c.surfaces.map(([label, dir]) => `<a href="/${dir}/code.html">${label}<span class="material-symbols-outlined" style="font-size:15px">arrow_outward</span></a>`).join('')}</div></section>`;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Partner Revenue OS — Operating Cadence</title>${FONT_HEAD}
<style>${NAV_CSS}
.cgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin-top:24px}
.ccard{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;display:flex;flex-direction:column}
.cc-h{display:flex;align-items:center;gap:10px}.cc-h h2{font-family:'Public Sans',sans-serif;font-size:20px;font-weight:800;margin:0}
.cc-users{display:flex;align-items:flex-start;gap:6px;color:var(--muted);font-size:12.5px;line-height:1.4;margin:8px 0 14px}
.cc-sec{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--brand);margin:8px 0 6px}
.cc-acts{margin:0;padding-left:18px;color:var(--ink);font-size:13px;line-height:1.7}
.cc-surf{display:flex;flex-direction:column;gap:6px;margin-top:6px}
.cc-surf a{display:inline-flex;align-items:center;gap:6px;background:var(--chip);color:var(--brand);font-weight:600;font-size:12.5px;padding:7px 11px;border-radius:8px;text-decoration:none;justify-content:space-between}
.cc-surf a:hover{background:#d8e4ff}</style></head><body>
<header><div class="top"><a class="pill solid" href="/index.html"><span class="material-symbols-outlined" style="font-size:16px">grid_view</span>Overview</a><a class="pill ghost" href="/journey.html"><span class="material-symbols-outlined" style="font-size:16px">map</span>22-Phase Journey</a></div>
<h1>Operating Cadence</h1>
<p>The governance rhythm that turns workflow data into decisions — daily, weekly, monthly, and quarterly — with the users, activities, and product surfaces for each, per the End-to-End Business Workflow manual.</p></header>
<main><div class="cgrid">${CADENCE.map(card).join('')}</div></main></body></html>`;
  fs.writeFileSync(path.join(OUT, 'cadence.html'), html);
}
