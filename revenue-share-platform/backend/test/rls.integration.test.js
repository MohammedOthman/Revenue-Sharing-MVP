import 'dotenv/config'; // load backend/.env so DB_* match the other tests locally (no-op in CI, which sets env directly)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import pkg from 'pg';

const { Pool } = pkg;

// DB-gated: runs only when RUN_DB_TESTS=1 and DB_* env vars point at a database
// that has had migrations applied (through 004). Proves row-level security
// isolates tenants when the app connects as the non-superuser reven_app role.
const skip = process.env.RUN_DB_TESTS !== '1';

const base = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

let owner; // superuser/owner — bypasses RLS, used for setup/teardown
let appPool; // connects as reven_app — subject to RLS
let tA;
let tB;

// Run a callback with a transaction-scoped tenant GUC, as the app role.
const asTenant = async (tenantId, fn) => {
  const c = await appPool.connect();
  try {
    await c.query('BEGIN');
    await c.query("SELECT set_config('app.current_tenant_id', $1, true)", [String(tenantId)]);
    const r = await fn(c);
    await c.query('COMMIT');
    return r;
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
};

before(async () => {
  if (skip) return;
  owner = new Pool({ ...base, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
  appPool = new Pool({ ...base, user: 'reven_app' });

  tA = (await owner.query(
    "INSERT INTO tenants (name, slug) VALUES ('RLS A', 'rls-a') ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id"
  )).rows[0].id;
  tB = (await owner.query(
    "INSERT INTO tenants (name, slug) VALUES ('RLS B', 'rls-b') ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id"
  )).rows[0].id;

  await owner.query("DELETE FROM partners WHERE email IN ('rls-a@t.com','rls-b@t.com','rls-x@t.com')");
  await owner.query("INSERT INTO partners (name, email, tenant_id) VALUES ('A Co','rls-a@t.com',$1)", [tA]);
  await owner.query("INSERT INTO partners (name, email, tenant_id) VALUES ('B Co','rls-b@t.com',$1)", [tB]);
});

after(async () => {
  if (skip) return;
  await owner.query("DELETE FROM partners WHERE email IN ('rls-a@t.com','rls-b@t.com','rls-x@t.com')");
  await owner.query("DELETE FROM tenants WHERE slug IN ('rls-a','rls-b')");
  await owner.end();
  await appPool.end();
});

test('tenant A sees only its own rows, never tenant B', { skip }, async () => {
  const rows = await asTenant(tA, (c) =>
    c.query("SELECT email FROM partners WHERE email IN ('rls-a@t.com','rls-b@t.com')").then((r) => r.rows)
  );
  assert.deepEqual(rows.map((r) => r.email), ['rls-a@t.com']);
});

test('tenant A cannot read a specific tenant B row', { skip }, async () => {
  const count = await asTenant(tA, (c) =>
    c.query("SELECT * FROM partners WHERE email = 'rls-b@t.com'").then((r) => r.rowCount)
  );
  assert.equal(count, 0);
});

test('inserting a row for another tenant is rejected by the policy', { skip }, async () => {
  await assert.rejects(() =>
    asTenant(tA, (c) =>
      c.query("INSERT INTO partners (name, email, tenant_id) VALUES ('X','rls-x@t.com',$1)", [tB])
    )
  );
});

test('with no tenant context, no rows are visible', { skip }, async () => {
  const r = await appPool.query("SELECT * FROM partners WHERE email IN ('rls-a@t.com','rls-b@t.com')");
  assert.equal(r.rowCount, 0);
});
