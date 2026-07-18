import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool, { closePools } from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';

// DB-gated: proves the CSV export path serves tenant-scoped rows as text/csv.
const skip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let token;
let tenantId;
const email = `export-p-${Date.now()}@t.com`;

before(async () => {
  if (skip) return;
  const user = await createUser(`export-${Date.now()}@t.com`, 'password123', 'Export Tester', 'admin');
  tenantId = (await pool.query("SELECT id FROM tenants WHERE slug = 'default'")).rows[0].id;
  await pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status) VALUES ($1, $2, 'admin', 'active')
     ON CONFLICT (user_id, tenant_id) DO NOTHING`,
    [user.id, tenantId]
  );
  token = generateToken({ id: user.id, email: user.email, role: 'admin' });
  await pool.query(
    "INSERT INTO partners (name, email, tenant_id) VALUES ('Export Co', $1, $2)",
    [email, tenantId]
  );
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  await pool.query('DELETE FROM partners WHERE email = $1', [email]);
  if (server) await new Promise((resolve) => server.close(resolve));
  await closePools();
});

test('partners export returns tenant-scoped CSV with a header row', { skip }, async () => {
  const res = await fetch(`${base}/api/partners/export`, { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type') || '', /text\/csv/);
  const body = await res.text();
  const lines = body.split('\r\n');
  assert.equal(lines[0], 'id,name,email,company,type,status,contact_person,phone,created_at');
  assert.ok(body.includes(email), 'the exported CSV should include the tenant partner');
});
