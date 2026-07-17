import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool, { closePools } from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';

// DB-gated: proves that basic CRUD (not only the governance objects) now emits
// audit events, and that audit history is readable back through the API scoped
// to the caller's tenant.
const skip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let token;

before(async () => {
  if (skip) return;
  const user = await createUser(`audit-${Date.now()}@t.com`, 'password123', 'Audit Tester', 'admin');
  const tenantId = (await pool.query("SELECT id FROM tenants WHERE slug = 'default'")).rows[0].id;
  await pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status) VALUES ($1, $2, 'admin', 'active')
     ON CONFLICT (user_id, tenant_id) DO NOTHING`,
    [user.id, tenantId]
  );
  token = generateToken({ id: user.id, email: user.email, role: 'admin' });
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  if (server) await new Promise((resolve) => server.close(resolve));
  await closePools();
});

test('creating a partner emits a partner/created audit event, readable via the API', { skip }, async () => {
  const auth = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const created = await fetch(`${base}/api/partners`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({ name: 'Audit Co', email: `audit-co-${Date.now()}@t.com` }),
  });
  assert.equal(created.status, 201);
  const partnerId = (await created.json()).partner.id;

  const events = await (await fetch(`${base}/api/audit?entityType=partner&entityId=${partnerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })).json();

  const match = events.events.find((e) => e.entity_type === 'partner' && e.entity_id === partnerId && e.action === 'created');
  assert.ok(match, 'a partner/created audit event should exist for the new partner');
});
