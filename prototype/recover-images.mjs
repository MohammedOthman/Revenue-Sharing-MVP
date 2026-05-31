/* Recover the real avatar/logo/map images that the Stitch screens reference from
 * the (blocked) lh3.googleusercontent.com host. Those bytes aren't in the export
 * EXCEPT baked into each screen.png full-page render. This tool crops each <img>
 * region straight out of screen.png and keeps the ones that come back as a real
 * image (dropping blanks that result from pages the export down-scaled).
 *
 * Method: each screen.png is the page rendered at viewport WIDTH 1600 (DPR 1) and
 * scaled so its long edge <= 1600 (scale s = png_width / 1600). Rendering dist/
 * at 1600 x round(png_h/s) reproduces that layout, so each <img>'s CSS box maps
 * to screen.png pixels via x*s, y*s, w*s, h*s.
 *
 * Requires `node build.mjs` to have produced dist/ first (for correct layout).
 * Writes good crops to recovered/<dir>/<imgIndex>.png + recovered/manifest.json.
 * Re-run only when screens/ changes; recovered/ is committed and consumed by build.mjs.
 */
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core'; import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, 'dist'); const SRC = path.join(HERE, 'screens'); const OUT = path.join(HERE, 'recovered');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const pngDims = f => { const b = fs.readFileSync(f); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };

// A crop is a real image (not a blank/misaligned region) if it has enough texture
// and isn't near-white. Calibrated against the full set (keeps 22, drops 6 blanks).
function isReal(stats) {
  const ch = stats.channels.slice(0, 3);
  const sd = ch.reduce((a, c) => a + c.stdev, 0) / 3;
  const mean = ch.reduce((a, c) => a + c.mean, 0) / 3;
  return !(sd < 24 || (mean > 238 && sd < 46));
}

if (!fs.existsSync(DIST)) { console.error('No dist/ — run `node build.mjs` first.'); process.exit(1); }
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(DIST, p);
  if (!f.startsWith(DIST) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const dirs = fs.readdirSync(SRC).filter(d => {
  const f = path.join(SRC, d, 'code.html');
  return fs.existsSync(f) && fs.existsSync(path.join(SRC, d, 'screen.png')) && /lh3\.googleusercontent/.test(fs.readFileSync(f, 'utf8'));
}).sort();

const browser = await puppeteer.launch({ args: [...chromium.args, '--no-sandbox'], executablePath: await chromium.executablePath(), headless: chromium.headless });
const manifest = []; let kept = 0, dropped = 0;
for (const dir of dirs) {
  const sp = path.join(SRC, dir, 'screen.png'); const { w: pw, h: ph } = pngDims(sp); const s = pw / 1600; const vh = Math.round(ph / s);
  const page = await browser.newPage(); await page.setViewport({ width: 1600, height: vh, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/${dir}/code.html`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 300));
  const boxes = await page.$$eval('img', els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }));
  await page.close();
  let k = -1;
  for (const b of boxes) {
    k++;
    if (b.w < 4 || b.h < 4) continue;
    const left = Math.max(0, Math.round(b.x * s)), top = Math.max(0, Math.round(b.y * s));
    const width = Math.min(Math.round(b.w * s), pw - left), height = Math.min(Math.round(b.h * s), ph - top);
    if (width < 1 || height < 1) continue;
    const buf = await sharp(sp).extract({ left, top, width, height }).png().toBuffer();
    if (!isReal(await sharp(buf).stats())) { dropped++; continue; }
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    fs.writeFileSync(path.join(OUT, dir, `${k}.png`), buf);
    manifest.push({ dir, k, width, height }); kept++;
  }
}
await browser.close(); server.close();
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Recovered ${kept} real images, dropped ${dropped} blank/misaligned -> recovered/`);
