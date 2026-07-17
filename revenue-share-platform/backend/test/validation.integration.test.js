process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool, { closePools } from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';

// The health check, auth validation, and the no-token rejection short-circuit
// before any database call, so they always run. The two authenticated writes now
// pass through tenant resolution (a DB lookup), so they are DB-gated and use a
// user with a real tenant membership.
const dbSkip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let token;

before(async () => {
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
  if (dbSkip) return;
  const user = await createUser(`val-${Date.now()}@t.com`, 'password123', 'Validation Tester', 'admin');
  const tenantId = (await pool.query("SELECT id FROM tenants WHERE slug = 'default'")).rows[0].id;
  await pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status) VALUES ($1, $2, 'admin', 'active')
     ON CONFLICT (user_id, tenant_id) DO NOTHING`,
    [user.id, tenantId]
  );
  token = generateToken({ id: user.id, email: user.email, role: 'admin' });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await closePools();
});

const post = (path, body, headers = {}) =>
  fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });

test('health check is public and returns 200', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
});

test('login with missing fields is rejected with 400', async () => {
  const res = await post('/api/auth/login', {});
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.equal(json.error, 'Validation failed');
});

test('register with a short password is rejected with 400', async () => {
  const res = await post('/api/auth/register', { email: 'a@b.com', password: 'short', fullName: 'A' });
  assert.equal(res.status, 400);
});

test('a protected write without a token returns 401 before validation', async () => {
  const res = await post('/api/partners', {});
  assert.equal(res.status, 401);
});

test('partner create with a token but missing fields returns 400', { skip: dbSkip }, async () => {
  const res = await post('/api/partners', {}, { Authorization: `Bearer ${token}` });
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.ok(json.details.some((d) => d.field === 'name'), 'should flag the missing name field');
});

test('contract create with an out-of-range share percentage is rejected', { skip: dbSkip }, async () => {
  const res = await post(
    '/api/contracts',
    { partnerId: 1, title: 'X', startDate: '2026-01-01', revenueSharePercentage: 150 },
    { Authorization: `Bearer ${token}` }
  );
  assert.equal(res.status, 400);
});
