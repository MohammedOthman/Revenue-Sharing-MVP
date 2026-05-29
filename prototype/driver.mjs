/* Launch + drive the built prototype. No external server or browser needed:
 *   - serves ./dist over a tiny built-in static server (ephemeral port),
 *   - launches the Chromium bundled in @sparticuz/chromium (npm, not a CDN),
 *   - screenshots each target page into ./shots and reports console errors.
 *
 * Run `node build.mjs` first (this serves dist/, it does not build it).
 *
 *   node driver.mjs                         # default representative set
 *   node driver.mjs index command_center    # 'index' or any screens/<dir> name
 *
 * Exits non-zero if a page fails to load or logs console errors -> smoke test.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, 'dist');
const SHOTS = path.join(HERE, 'shots');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };

const DEFAULT = ['index', 'partner_revenue_command_center', 'revenue_reconciliation_settlement_center',
  'attribution_approval_workspace', 'partner_onboarding_kyc_portal'];

function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const file = path.join(DIST, p);
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); return res.end('not found');
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

(async () => {
  if (!fs.existsSync(DIST)) { console.error('No dist/ — run `node build.mjs` first.'); process.exit(1); }
  fs.mkdirSync(SHOTS, { recursive: true });
  const targets = (process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT)
    .map(t => t === 'index' ? { name: 'index', url: '/index.html' } : { name: t, url: `/${t}/code.html` });

  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({
    args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
  });

  let failures = 0;
  for (const t of targets) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    try {
      const resp = await page.goto(base + t.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 400)); // let webfonts paint
      const file = path.join(SHOTS, `${t.name}.png`);
      await page.screenshot({ path: file });
      const status = resp ? resp.status() : 0;
      const ok = status === 200 && errors.length === 0;
      if (!ok) failures++;
      console.log(`${ok ? '✓' : '✗'} ${t.name.padEnd(40)} HTTP ${status}  errors=${errors.length}  -> ${path.relative(HERE, file)}`
        + (errors.length ? `\n    ${errors.slice(0, 3).join('\n    ')}` : ''));
    } catch (e) {
      failures++;
      console.log(`✗ ${t.name.padEnd(40)} LOAD FAILED: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${targets.length - failures}/${targets.length} screens rendered cleanly. Screenshots in ${path.relative(HERE, SHOTS)}/`);
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error('DRIVER FAILED:', e); process.exit(1); });
