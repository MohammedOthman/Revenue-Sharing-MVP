import { chromium } from 'playwright-core';

const BASE = process.env.E2E_BASE_URL || 'http://localhost:5000';
const SHOT_DIR = new URL('.', import.meta.url).pathname;
let step = 0;
const results = [];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, acceptDownloads: true });
page.setDefaultTimeout(10000);

const shot = async (name) => {
  step += 1;
  await page.screenshot({ path: `${SHOT_DIR}shot-${String(step).padStart(2, '0')}-${name}.png`, fullPage: false });
};

const check = async (label, fn) => {
  try {
    await fn();
    results.push(`PASS  ${label}`);
  } catch (err) {
    results.push(`FAIL  ${label}: ${err.message.split('\n')[0]}`);
    await shot(`FAIL-${label.replace(/[^a-z0-9]+/gi, '-').slice(0, 40)}`);
  }
};

const modalField = (labelText) =>
  page.locator(`.modal .form-group:has(label:text-is("${labelText}")) input, .modal .form-group:has(label:text-is("${labelText}")) select, .modal .form-group:has(label:text-is("${labelText}")) textarea`).first();

// ---------- 1. Login ----------
await check('login page renders', async () => {
  await page.goto(`${BASE}/login`);
  await page.waitForSelector('#email');
  const demoBox = await page.locator('.demo-credentials').count();
  if (demoBox !== 0) throw new Error('demo credentials box is visible');
});

await check('wrong password shows server error', async () => {
  await page.fill('#email', 'admin@reven.example');
  await page.fill('#password', 'wrong-password');
  await page.click('.login-btn');
  await page.waitForSelector('.error-message');
  const text = await page.textContent('.error-message');
  if (!/invalid credentials/i.test(text)) throw new Error(`unexpected error text: ${text}`);
});

await check('login succeeds and dashboard loads', async () => {
  await page.fill('#password', 'LaunchReady2026');
  await page.click('.login-btn');
  await page.waitForSelector('.dashboard-header');
  await page.waitForSelector('.stats-grid');
});
await shot('dashboard-empty');

await check('empty dashboard shows guidance, no fake activity', async () => {
  const body = await page.textContent('body');
  if (!/No contracts yet/i.test(body)) throw new Error('missing empty-contracts guidance');
  if (!/No activity recorded yet|Created user account/i.test(body)) throw new Error('activity section unexpected');
  if (/2 hours ago|5 hours ago/.test(body)) throw new Error('hardcoded fake activity present');
});

// ---------- 2. Partner ----------
await check('create partner via UI', async () => {
  await page.click('a.nav-item:has-text("Partners")');
  await page.waitForSelector('.partners-page');
  await page.click('button:has-text("+ Add Partner")');
  await page.waitForSelector('.modal');
  await modalField('Name').fill('Acme Referrals');
  await modalField('Company').fill('Acme Corp');
  await modalField('Email').fill('partners@acme.example');
  await modalField('Contact Person').fill('Sara Al-Rashid');
  await modalField('Phone').fill('+966-500-000-001');
  await page.click('.modal button:has-text("Create")');
  await page.waitForSelector('.data-table tr:has-text("Acme Referrals")');
});
await shot('partner-created');

await check('edit partner persists', async () => {
  await page.click('.data-table tr:has-text("Acme Referrals") button:has-text("Edit")');
  await page.waitForSelector('.modal');
  await modalField('Company').fill('Acme Corporation');
  await page.click('.modal button:has-text("Update")');
  await page.waitForSelector('.data-table tr:has-text("Acme Corporation")');
});

// ---------- 3. Contract ----------
await check('create contract via UI', async () => {
  await page.click('a.nav-item:has-text("Contracts")');
  await page.waitForSelector('.contracts-page');
  await page.click('button:has-text("+ Create Contract")');
  await page.waitForSelector('.modal');
  await modalField('Partner').selectOption({ index: 1 });
  await modalField('Contract Title').fill('Acme Referral Agreement 2026');
  await modalField('Start Date').fill('2026-01-01');
  await modalField('End Date (optional)').fill('2026-12-31');
  await modalField('Revenue Share %').fill('15');
  await modalField('Minimum Payout ($)').fill('100');
  await modalField('Status').selectOption('active');
  await page.click('.modal button:has-text("Create")');
  await page.waitForSelector('.data-table tr:has-text("Acme Referral Agreement 2026")');
  const row = await page.textContent('.data-table tr:has-text("Acme Referral Agreement 2026")');
  if (!row.includes('15%')) throw new Error('share % not shown');
});
await shot('contract-created');

// ---------- 4. Revenue: record + server-side computation + payout ----------
await check('record revenue; share computed server-side', async () => {
  await page.click('a.nav-item:has-text("Revenue")');
  await page.waitForSelector('.revenue-page');
  await page.click('button:has-text("+ Record Revenue")');
  await page.waitForSelector('.modal');
  await modalField('Contract').selectOption({ index: 1 });
  await modalField('Period (month)').fill('2026-06');
  await modalField('Total Revenue Amount ($)').fill('10000');
  await page.click('.modal button:has-text("Create Record")');
  await page.waitForSelector('.data-table tr:has-text("Acme Referral Agreement 2026")');
  const row = await page.textContent('.data-table tbody tr');
  if (!row.includes('1,500')) throw new Error(`expected computed share 1,500 in row: ${row}`);
  if (!row.includes('pending')) throw new Error('expected pending status');
});
await shot('revenue-recorded');

await check('process payout via UI', async () => {
  await page.click('.data-table button:has-text("Pay")');
  await page.waitForSelector('.modal:has-text("Confirm Payment")');
  await page.click('button:has-text("Confirm Payment")');
  await page.waitForSelector('.data-table tr .badge-paid, .data-table tr:has-text("paid")');
  const paidCard = await page.textContent('.summary-card:has-text("Paid Out")');
  if (!paidCard.includes('1,500')) throw new Error(`paid-out card wrong: ${paidCard}`);
});
await shot('payout-processed');

// ---------- 5. KPI ----------
await check('create KPI and update value', async () => {
  await page.click('a.nav-item:has-text("KPIs")');
  await page.waitForSelector('.kpis-page');
  await page.click('button:has-text("+ Add KPI")');
  await page.waitForSelector('.modal');
  await modalField('Contract').selectOption({ index: 1 });
  await modalField('KPI Name').fill('Monthly Referred Revenue');
  await modalField('Target Value').fill('50000');
  await modalField('Current Value').fill('0');
  await modalField('Unit').fill('USD');
  await page.click('.modal button:has-text("Create")');
  await page.waitForSelector('.kpi-card:has-text("Monthly Referred Revenue")');
  await page.fill('.kpi-card .value-input', '32000');
  await page.keyboard.press('Tab');
  await page.waitForFunction(() =>
    document.querySelector('.kpi-card')?.textContent.includes('64%')
  );
});
await shot('kpi-updated');

// ---------- 6. Legal document ----------
await check('create legal document', async () => {
  await page.click('a.nav-item:has-text("Legal Docs")');
  await page.waitForSelector('.legal-documents-page');
  await page.click('button:has-text("+ Add Document")');
  await page.waitForSelector('.modal');
  await modalField('Contract').selectOption({ index: 1 });
  await modalField('Document Name').fill('Signed Referral Agreement');
  await modalField('Document Type').selectOption('agreement');
  await modalField('Status').selectOption('signed');
  await modalField('Expiry Date (Optional)').fill('2026-12-31');
  await page.click('.modal button:has-text("Create")');
  await page.waitForSelector('.data-table tr:has-text("Signed Referral Agreement")');
});
await shot('document-created');

// ---------- 7. Dashboard reflects the truth ----------
await check('dashboard totals and audit activity are real', async () => {
  await page.click('a.nav-item:has-text("Dashboard")');
  await page.waitForSelector('.stats-grid');
  const grid = await page.textContent('.stats-grid');
  if (!grid.includes('1')) throw new Error('partner count missing');
  if (!/10,000/.test(grid)) throw new Error(`total revenue missing from: ${grid}`);
  const activity = await page.textContent('.activity-list');
  if (!/Created partner|Created contract|Created revenue share/i.test(activity)) {
    throw new Error(`audit activity not surfaced: ${activity}`);
  }
});
await shot('dashboard-final');

// ---------- 8. Renewal radar ----------
await check('expiring contract appears on renewal radar', async () => {
  await page.click('a.nav-item:has-text("Contracts")');
  await page.waitForSelector('.contracts-page');
  await page.click('button:has-text("+ Create Contract")');
  await page.waitForSelector('.modal');
  const soon = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
  await modalField('Partner').selectOption({ index: 1 });
  await modalField('Contract Title').fill('Renewal Radar Test Agreement');
  await modalField('Start Date').fill('2026-01-01');
  await modalField('End Date (optional)').fill(soon);
  await modalField('Revenue Share %').fill('10');
  await modalField('Minimum Payout ($)').fill('0');
  await modalField('Status').selectOption('active');
  await page.click('.modal button:has-text("Create")');
  await page.waitForSelector('.data-table tr:has-text("Renewal Radar Test Agreement")');

  await page.click('a.nav-item:has-text("Dashboard")');
  await page.waitForSelector('.renewal-radar');
  const radar = await page.textContent('.renewal-radar');
  if (!radar.includes('Renewal Radar Test Agreement')) throw new Error(`radar missing contract: ${radar}`);
});
await shot('renewal-radar');

// ---------- 9. CSV export ----------
await check('settlement CSV export downloads', async () => {
  await page.click('a.nav-item:has-text("Revenue")');
  await page.waitForSelector('.revenue-page');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button:has-text("Export CSV")'),
  ]);
  if (!/\.csv$/.test(download.suggestedFilename())) {
    throw new Error(`unexpected filename: ${download.suggestedFilename()}`);
  }
});

// ---------- 10. Team invite -> teammate activates account ----------
let setupLink;
await check('admin invites teammate and gets setup link', async () => {
  await page.click('a.nav-item:has-text("Team")');
  await page.waitForSelector('.data-table');
  await page.click('button:has-text("+ Invite Teammate")');
  await page.waitForSelector('.modal');
  await modalField('Full Name').fill('Invited Analyst');
  await modalField('Email').fill('analyst@reven.example');
  await page.click('.modal button:has-text("Send Invitation")');
  await page.waitForSelector('.modal textarea');
  setupLink = await page.inputValue('.modal textarea');
  if (!setupLink.includes('/reset-password?token=')) throw new Error(`bad setup link: ${setupLink}`);
  await page.click('.modal button:has-text("Close")');
  await page.waitForSelector('.data-table tr:has-text("analyst@reven.example")');
});
await shot('team-invited');

await check('teammate sets password via link and logs in', async () => {
  await page.evaluate(() => localStorage.clear());
  await page.goto(setupLink);
  await page.waitForSelector('#password');
  await page.fill('#password', 'AnalystPass2026');
  await page.fill('#confirm', 'AnalystPass2026');
  await page.click('.login-btn');
  await page.waitForURL('**/login');
  await page.fill('#email', 'analyst@reven.example');
  await page.fill('#password', 'AnalystPass2026');
  await page.click('button.login-btn');
  await page.waitForSelector('.dashboard-header');
  // Non-admin must not see the Team nav item.
  const teamNav = await page.locator('a.nav-item:has-text("Team")').count();
  if (teamNav !== 0) throw new Error('non-admin sees Team nav');
});
await shot('teammate-logged-in');

await check('forgot-password page never reveals account existence', async () => {
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${BASE}/forgot-password`);
  await page.fill('#email', 'ghost@nowhere.example');
  await page.click('.login-btn');
  await page.waitForSelector('text=/reset link is on its way/');
});

// ---------- 11. Session behaviors ----------
await check('log back in as admin', async () => {
  await page.goto(`${BASE}/login`);
  await page.fill('#email', 'admin@reven.example');
  await page.fill('#password', 'LaunchReady2026');
  await page.click('button.login-btn');
  await page.waitForSelector('.dashboard-header');
});

await check('deep-link refresh stays logged in', async () => {
  await page.goto(`${BASE}/partners`);
  await page.waitForSelector('.partners-page');
});

await check('expired/invalid token redirects to login', async () => {
  await page.evaluate(() => localStorage.setItem('token', 'invalid.token.here'));
  await page.goto(`${BASE}/contracts`);
  await page.waitForURL('**/login', { timeout: 10000 });
});

await browser.close();
console.log('\n===== E2E RESULTS =====');
results.forEach((r) => console.log(r));
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
