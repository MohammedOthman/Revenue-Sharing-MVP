process.env.JWT_SECRET = 'test-secret';

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import { generateToken } from '../src/utils/jwt.js';

// These exercise the real HTTP stack. Validation failures and auth rejections
// short-circuit before any database call, so no PostgreSQL is required.
let server;
let base;

before(async () => {
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

const token = generateToken({ id: 1, email: 'admin@example.com', role: 'admin' });

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

test('partner create with a token but missing fields returns 400', async () => {
  const res = await post('/api/partners', {}, { Authorization: `Bearer ${token}` });
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.ok(json.details.some((d) => d.field === 'name'), 'should flag the missing name field');
});

test('contract create with an out-of-range share percentage is rejected', async () => {
  const res = await post(
    '/api/contracts',
    { partnerId: 1, title: 'X', startDate: '2026-01-01', revenueSharePercentage: 150 },
    { Authorization: `Bearer ${token}` }
  );
  assert.equal(res.status, 400);
});
