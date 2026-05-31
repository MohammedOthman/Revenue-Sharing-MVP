/* Render screen.png thumbnails for the generated gap screens so they show a real
 * preview in index.html (like the Stitch-exported screens do). SAFETY: only the
 * 11 screens with status:'new' in workflow.mjs are rendered — the original
 * committed screen.png files are never touched.
 *
 * Renders the BUILT screen (dist/) at the Stitch 1600px width, full-page, with
 * the floating Overview/phase-bar overlays hidden, and writes the PNG into the
 * committed source at screens/<dir>/screen.png. Run after `node build.mjs`.
 */
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
import { PHASES } from './workflow.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, 'dist');
const SRC = path.join(HERE, 'screens');
const MIME = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2' };

if (!fs.existsSync(DIST)) { console.error('No dist/ — run `node build.mjs` first.'); process.exit(1); }
const NEW = PHASES.filter(p => p.status === 'new').map(p => p.dir)
  .filter(d => fs.existsSync(path.join(DIST, d, 'code.html')));

const srv = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(DIST, p);
  if (!f.startsWith(DIST) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s);
});
await new Promise(r => srv.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${srv.address().port}`;
const br = await puppeteer.launch({ args: [...chromium.args, '--no-sandbox'], executablePath: await chromium.executablePath(), headless: chromium.headless, defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 1 } });

let n = 0;
for (const dir of NEW) {
  const page = await br.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
  await page.goto(`${base}/${dir}/code.html`, { waitUntil: 'networkidle0', timeout: 30000 });
  // hide the fixed Overview FAB + phase Prev/Next bar so the thumbnail is clean
  await page.addStyleTag({ content: '[style*="z-index:99999"],[style*="z-index:99998"]{display:none!important}' });
  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: path.join(SRC, dir, 'screen.png'), fullPage: true });
  n++; process.stdout.write(`  + screens/${dir}/screen.png\n`);
  await page.close();
}
await br.close(); srv.close();
console.log(`\nRendered ${n} thumbnails for the new gap screens.`);
