// End-to-end API tests. They require a DEDICATED test database and are
// skipped entirely unless TEST_DATABASE_URL is set (the suite truncates
// all tables). CI provides a throwaway Postgres service for this.
import test from 'node:test';
import assert from 'node:assert/strict';

const TEST_DB = process.env.TEST_DATABASE_URL || '';
const dbAvailable = Boolean(TEST_DB);

let baseUrl;
let server;
let pool;

if (dbAvailable) {
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = TEST_DB;
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-api-tests';
  process.env.LOG_REQUESTS = 'false';

  const { validateEnv } = await import('../src/config/env.js');
  validateEnv();
  const { createTables } = await import('../src/models/schema.js');
  const dbModule = await import('../src/config/database.js');
  pool = dbModule.default;
  const { default: app } = await import('../src/app.js');

  await createTables();
  await pool.query(
    'TRUNCATE audit_logs, legal_documents, kpis, revenue_shares, contracts, partners, users RESTART IDENTITY CASCADE'
  );

  server = app.listen(0);
  await new Promise((resolve) => server.on('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;

  test.after(async () => {
    server.close();
    await pool.end();
  });
}

const api = async (method, path, { token, body } = {}) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response
  }
  return { status: res.status, data };
};

const state = {};

test('health endpoint reports database status', { skip: !dbAvailable }, async () => {
  const { status, data } = await api('GET', '/api/health');
  assert.equal(status, 200);
  assert.equal(data.status, 'ok');
  assert.equal(data.database, 'up');
});

test('first registered user becomes admin (bootstrap)', { skip: !dbAvailable }, async () => {
  const { status, data } = await api('POST', '/api/auth/register', {
    body: { email: 'founder@test.example', password: 'strongpass1', fullName: 'Founder', role: 'user' },
  });
  assert.equal(status, 201);
  assert.equal(data.user.role, 'admin');
  state.adminToken = data.token;
});

test('anonymous registration is locked after bootstrap', { skip: !dbAvailable }, async () => {
  const { status } = await api('POST', '/api/auth/register', {
    body: { email: 'stranger@test.example', password: 'strongpass1', fullName: 'Stranger' },
  });
  assert.equal(status, 403);
});

test('admin can create users; role from body is ignored for non-admins', { skip: !dbAvailable }, async () => {
  const created = await api('POST', '/api/auth/register', {
    token: state.adminToken,
    body: { email: 'analyst@test.example', password: 'strongpass1', fullName: 'Analyst' },
  });
  assert.equal(created.status, 201);
  assert.equal(created.data.user.role, 'user');
  state.userToken = created.data.token;

  const escalation = await api('POST', '/api/auth/register', {
    token: state.userToken,
    body: { email: 'evil@test.example', password: 'strongpass1', fullName: 'Evil', role: 'admin' },
  });
  assert.equal(escalation.status, 403);
});

test('weak passwords are rejected', { skip: !dbAvailable }, async () => {
  const { status } = await api('POST', '/api/auth/register', {
    token: state.adminToken,
    body: { email: 'weak@test.example', password: 'short', fullName: 'Weak' },
  });
  assert.equal(status, 400);
});

test('login works and rejects bad credentials', { skip: !dbAvailable }, async () => {
  const bad = await api('POST', '/api/auth/login', {
    body: { email: 'founder@test.example', password: 'wrongpass' },
  });
  assert.equal(bad.status, 401);

  const good = await api('POST', '/api/auth/login', {
    body: { email: 'founder@test.example', password: 'strongpass1' },
  });
  assert.equal(good.status, 200);
  assert.ok(good.data.token);
});

test('protected routes require a token', { skip: !dbAvailable }, async () => {
  const { status } = await api('GET', '/api/partners');
  assert.equal(status, 401);
});

test('partner CRUD with validation', { skip: !dbAvailable }, async () => {
  const invalid = await api('POST', '/api/partners', {
    token: state.adminToken,
    body: { name: 'No Email Partner', email: 'not-an-email' },
  });
  assert.equal(invalid.status, 400);

  const created = await api('POST', '/api/partners', {
    token: state.adminToken,
    body: { name: 'Test Partner', email: 'partner@test.example', company: 'Testco', type: 'referral' },
  });
  assert.equal(created.status, 201);
  state.partnerId = created.data.partner.id;

  // camelCase update keys must map onto snake_case columns
  const updated = await api('PUT', `/api/partners/${state.partnerId}`, {
    token: state.adminToken,
    body: { contactPerson: 'Jane Doe', phone: '+1-555-0100' },
  });
  assert.equal(updated.status, 200);
  assert.equal(updated.data.partner.contact_person, 'Jane Doe');

  const list = await api('GET', '/api/partners', { token: state.adminToken });
  assert.equal(list.status, 200);
  assert.equal(list.data.partners.length, 1);

  const badId = await api('GET', '/api/partners/undefined', { token: state.adminToken });
  assert.equal(badId.status, 400);
});

test('contract creation validates percentage range and partner existence', { skip: !dbAvailable }, async () => {
  const badPct = await api('POST', '/api/contracts', {
    token: state.adminToken,
    body: {
      partnerId: state.partnerId, title: 'Bad', startDate: '2026-01-01', revenueSharePercentage: 150,
    },
  });
  assert.equal(badPct.status, 400);

  const missingPartner = await api('POST', '/api/contracts', {
    token: state.adminToken,
    body: { partnerId: 9999, title: 'Ghost', startDate: '2026-01-01', revenueSharePercentage: 10 },
  });
  assert.equal(missingPartner.status, 404);

  const created = await api('POST', '/api/contracts', {
    token: state.adminToken,
    body: {
      partnerId: state.partnerId, title: 'Test Agreement', startDate: '2026-01-01',
      endDate: '2026-12-31', revenueSharePercentage: 15, minimumPayout: 100, status: 'active',
    },
  });
  assert.equal(created.status, 201);
  state.contractId = created.data.contract.id;
});

test('revenue share amount is computed server-side from contract terms', { skip: !dbAvailable }, async () => {
  const created = await api('POST', '/api/revenue', {
    token: state.adminToken,
    body: {
      contractId: state.contractId, periodStart: '2026-06-01', periodEnd: '2026-06-30', totalRevenue: 10000,
    },
  });
  assert.equal(created.status, 201);
  assert.equal(Number(created.data.revenueShare.share_percentage), 15);
  assert.equal(Number(created.data.revenueShare.share_amount), 1500);
  state.revenueId = created.data.revenueShare.id;

  const inconsistent = await api('POST', '/api/revenue', {
    token: state.adminToken,
    body: {
      contractId: state.contractId, periodStart: '2026-07-01', periodEnd: '2026-07-31',
      totalRevenue: 10000, shareAmount: 9999,
    },
  });
  assert.equal(inconsistent.status, 400);
});

test('payment processing is idempotent-guarded', { skip: !dbAvailable }, async () => {
  const paid = await api('POST', `/api/revenue/${state.revenueId}/process-payment`, { token: state.adminToken });
  assert.equal(paid.status, 200);
  assert.equal(paid.data.revenueShare.status, 'paid');
  assert.ok(paid.data.revenueShare.paid_at);

  const again = await api('POST', `/api/revenue/${state.revenueId}/process-payment`, { token: state.adminToken });
  assert.equal(again.status, 400);
});

test('KPI create and value patch', { skip: !dbAvailable }, async () => {
  const created = await api('POST', '/api/kpis', {
    token: state.adminToken,
    body: { contractId: state.contractId, name: 'Monthly Revenue', targetValue: 50000, unit: 'USD' },
  });
  assert.equal(created.status, 201);
  const kpiId = created.data.kpi.id;

  const patched = await api('PATCH', `/api/kpis/${kpiId}/value`, {
    token: state.adminToken,
    body: { value: 32000 },
  });
  assert.equal(patched.status, 200);
  assert.equal(Number(patched.data.kpi.actual_value), 32000);
});

test('legal documents accept web-client field aliases', { skip: !dbAvailable }, async () => {
  const created = await api('POST', '/api/legal-documents', {
    token: state.adminToken,
    body: {
      contractId: state.contractId, title: 'Signed Agreement', type: 'agreement',
      expiryDate: '2027-01-01', notes: 'Countersigned copy',
    },
  });
  assert.equal(created.status, 201);
  assert.equal(created.data.document.document_name, 'Signed Agreement');
  assert.equal(created.data.document.notes, 'Countersigned copy');

  // Legacy mount keeps working
  const list = await api('GET', '/api/documents', { token: state.adminToken });
  assert.equal(list.status, 200);
  assert.equal(list.data.documents.length, 1);
});

test('dashboard overview returns flat numeric fields', { skip: !dbAvailable }, async () => {
  const { status, data } = await api('GET', '/api/dashboard/overview', { token: state.adminToken });
  assert.equal(status, 200);
  assert.equal(typeof data.overview.totalPartners, 'number');
  assert.equal(data.overview.totalPartners, 1);
  assert.equal(data.overview.totalContracts, 1);
  assert.equal(data.overview.totalRevenue, 10000);
  assert.ok(data.overview.contractStatus);
});

test('mutations are recorded in the audit log', { skip: !dbAvailable }, async () => {
  const { status, data } = await api('GET', '/api/dashboard/recent-activity', { token: state.adminToken });
  assert.equal(status, 200);
  assert.ok(Array.isArray(data.activity));
  assert.ok(data.activity.length > 0);
  const partnerCreate = data.activity.find((a) => a.entity === 'partners' && a.method === 'POST');
  assert.ok(partnerCreate, 'expected partner creation in audit log');
  assert.equal(partnerCreate.user_email, 'founder@test.example');
});

test('invite -> set password -> login flow (email unconfigured returns setup link)', { skip: !dbAvailable }, async () => {
  const invited = await api('POST', '/api/auth/invite', {
    token: state.adminToken,
    body: { email: 'teammate@test.example', fullName: 'Teammate' },
  });
  assert.equal(invited.status, 201);
  assert.equal(invited.data.emailDelivered, false);
  assert.ok(invited.data.setupLink, 'expected setupLink when email is not configured');

  const tokenParam = new URL(invited.data.setupLink).searchParams.get('token');
  assert.ok(tokenParam);

  const check = await api('GET', `/api/auth/reset-token/${tokenParam}`);
  assert.equal(check.status, 200);
  assert.equal(check.data.valid, true);
  assert.equal(check.data.purpose, 'invite');

  const weak = await api('POST', '/api/auth/reset-password', {
    body: { token: tokenParam, password: 'short' },
  });
  assert.equal(weak.status, 400);

  const set = await api('POST', '/api/auth/reset-password', {
    body: { token: tokenParam, password: 'chosen-by-user-9' },
  });
  assert.equal(set.status, 200);

  const login = await api('POST', '/api/auth/login', {
    body: { email: 'teammate@test.example', password: 'chosen-by-user-9' },
  });
  assert.equal(login.status, 200);

  // Single-use: the same token cannot be replayed.
  const replay = await api('POST', '/api/auth/reset-password', {
    body: { token: tokenParam, password: 'another-password-1' },
  });
  assert.equal(replay.status, 400);

  // Non-admins cannot invite.
  const forbidden = await api('POST', '/api/auth/invite', {
    token: state.userToken,
    body: { email: 'nope@test.example', fullName: 'Nope' },
  });
  assert.equal(forbidden.status, 403);
});

test('forgot-password never reveals whether an account exists', { skip: !dbAvailable }, async () => {
  const known = await api('POST', '/api/auth/forgot-password', { body: { email: 'founder@test.example' } });
  const unknown = await api('POST', '/api/auth/forgot-password', { body: { email: 'ghost@test.example' } });
  assert.equal(known.status, 200);
  assert.equal(unknown.status, 200);
  assert.deepEqual(known.data, unknown.data);
});

test('expiring contracts/documents surface on the renewal radar', { skip: !dbAvailable }, async () => {
  const soon = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);
  const contract = await api('POST', '/api/contracts', {
    token: state.adminToken,
    body: {
      partnerId: state.partnerId, title: 'Expiring Soon Agreement', startDate: '2026-01-01',
      endDate: soon, revenueSharePercentage: 10, status: 'active',
    },
  });
  assert.equal(contract.status, 201);

  const doc = await api('POST', '/api/legal-documents', {
    token: state.adminToken,
    body: { contractId: state.contractId, title: 'Expiring NDA', type: 'nda', expiryDate: soon },
  });
  assert.equal(doc.status, 201);

  const { status, data } = await api('GET', '/api/dashboard/expiring?days=30', { token: state.adminToken });
  assert.equal(status, 200);
  assert.ok(data.expiring.contracts.some((c) => c.title === 'Expiring Soon Agreement'));
  assert.ok(data.expiring.documents.some((d) => d.document_name === 'Expiring NDA'));
});

test('settlement CSV export returns correct rows', { skip: !dbAvailable }, async () => {
  const res = await fetch(`${baseUrl}/api/revenue/export`, {
    headers: { Authorization: `Bearer ${state.adminToken}` },
  });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/csv/);
  const csv = await res.text();
  const lines = csv.split('\n');
  assert.equal(lines[0].split(',')[0], 'Partner');
  assert.ok(csv.includes('Test Agreement'));
  assert.ok(csv.includes('1500'));
});

test('unknown API routes return JSON 404', { skip: !dbAvailable }, async () => {
  const { status, data } = await api('GET', '/api/nope', { token: state.adminToken });
  assert.equal(status, 404);
  assert.equal(data.error, 'Route not found');
});

if (!dbAvailable) {
  test('API test suite requires TEST_DATABASE_URL (skipped)', () => {
    console.log('Set TEST_DATABASE_URL to a disposable Postgres database to run API tests.');
  });
}
