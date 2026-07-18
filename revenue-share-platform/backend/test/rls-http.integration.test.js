import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool, { closePools } from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';

// DB-gated: proves tenant isolation THROUGH the HTTP layer. Two users in two
// tenants hit the same API; row-level security (enforced because requests run as
// the reven_app role) confines each to its own tenant's rows.
const skip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let tokenA;
let tokenB;
let tenantA;
let tenantB;
let partnerAId;
let partnerBId;

const emails = ['iso-a-partner@t.com', 'iso-b-partner@t.com'];

const upsertTenant = async (name, slug) =>
  (await pool.query(
    `INSERT INTO tenants (name, slug) VALUES ($1, $2)
     ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id`,
    [name, slug]
  )).rows[0].id;

const addMember = async (userId, tenantId) =>
  pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status) VALUES ($1, $2, 'admin', 'active')
     ON CONFLICT (user_id, tenant_id) DO NOTHING`,
    [userId, tenantId]
  );

before(async () => {
  if (skip) return;
  tenantA = await upsertTenant('Isolation A', 'iso-a');
  tenantB = await upsertTenant('Isolation B', 'iso-b');

  const userA = await createUser(`iso-a-${Date.now()}@t.com`, 'password123', 'Iso A', 'admin');
  const userB = await createUser(`iso-b-${Date.now()}@t.com`, 'password123', 'Iso B', 'admin');
  await addMember(userA.id, tenantA);
  await addMember(userB.id, tenantB);
  tokenA = generateToken({ id: userA.id, email: userA.email, role: 'admin' });
  tokenB = generateToken({ id: userB.id, email: userB.email, role: 'admin' });

  // One partner in each tenant, inserted as the owner (bypasses RLS) with an
  // explicit tenant_id.
  await pool.query('DELETE FROM partners WHERE email = ANY($1)', [emails]);
  partnerAId = (await pool.query(
    "INSERT INTO partners (name, email, tenant_id) VALUES ('A Only', $1, $2) RETURNING id", [emails[0], tenantA]
  )).rows[0].id;
  partnerBId = (await pool.query(
    "INSERT INTO partners (name, email, tenant_id) VALUES ('B Only', $1, $2) RETURNING id", [emails[1], tenantB]
  )).rows[0].id;

  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  await pool.query('DELETE FROM partners WHERE email = ANY($1) OR email LIKE $2', [emails, 'iso-a-new-%']);
  if (server) await new Promise((resolve) => server.close(resolve));
  await closePools();
});

const get = (path, token) =>
  fetch(`${base}${path}`, { headers: { Authorization: `Bearer ${token}` } });
const post = (path, token, body) =>
  fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

test('a request from a user with no tenant membership is denied (403)', { skip }, async () => {
  const orphan = await createUser(`iso-orphan-${Date.now()}@t.com`, 'password123', 'Orphan', 'admin');
  const orphanToken = generateToken({ id: orphan.id, email: orphan.email, role: 'admin' });
  const res = await get('/api/partners', orphanToken);
  assert.equal(res.status, 403);
});

test('tenant A lists only its own partners, never tenant B', { skip }, async () => {
  const res = await get('/api/partners', tokenA);
  assert.equal(res.status, 200);
  const list = (await res.json()).partners.map((p) => p.email);
  assert.ok(list.includes(emails[0]), 'A should see its own partner');
  assert.ok(!list.includes(emails[1]), 'A must not see tenant B partner');
});

test('tenant A cannot fetch a tenant B partner by id (404)', { skip }, async () => {
  const res = await get(`/api/partners/${partnerBId}`, tokenA);
  assert.equal(res.status, 404);
});

test('a partner created by tenant A lands in tenant A and is invisible to B', { skip }, async () => {
  const res = await post('/api/partners', tokenA, { name: 'A New', email: `iso-a-new-${Date.now()}@t.com` });
  assert.equal(res.status, 201);
  const created = (await res.json()).partner;

  // The database recorded it under tenant A (via the GUC-driven default).
  const stored = await pool.query('SELECT tenant_id FROM partners WHERE id = $1', [created.id]);
  assert.equal(stored.rows[0].tenant_id, tenantA);

  // Tenant B does not see it.
  const bList = (await (await get('/api/partners', tokenB)).json()).partners.map((p) => p.id);
  assert.ok(!bList.includes(created.id), 'B must not see a partner created in tenant A');
});
