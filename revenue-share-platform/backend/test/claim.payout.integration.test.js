import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool, { closePools } from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';

// DB-gated: exercises the payout-readiness gate (FR-04) end to end through HTTP.
// Phase 1 records a payout-ready milestone; no money moves. The gate blocks the
// milestone until the claim is approved and both bank and tax are verified.
const skip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let token;
let partnerId;
let claimId;

before(async () => {
  if (skip) return;
  const user = await createUser(`payout-${Date.now()}@t.com`, 'password123', 'Payout Tester', 'admin');
  const tenantId = (await pool.query("SELECT id FROM tenants WHERE slug = 'default'")).rows[0].id;
  await pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status) VALUES ($1, $2, 'admin', 'active')
     ON CONFLICT (user_id, tenant_id) DO NOTHING`,
    [user.id, tenantId]
  );
  token = generateToken({ id: user.id, email: user.email, role: 'admin' });

  // Seed a partner + claim in the caller's tenant so RLS exposes them.
  partnerId = (await pool.query(
    "INSERT INTO partners (name, email, tenant_id) VALUES ('Payout Co', $1, $2) RETURNING id",
    [`payout-p-${Date.now()}@t.com`, tenantId]
  )).rows[0].id;
  claimId = (await pool.query(
    `INSERT INTO partner_revenue_claims (partner_id, claimed_amount, currency, status, tenant_id)
     VALUES ($1, 1000, 'SAR', 'submitted', $2) RETURNING id`,
    [partnerId, tenantId]
  )).rows[0].id;

  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  if (partnerId) await pool.query('DELETE FROM partners WHERE id = $1', [partnerId]); // cascades claim
  if (server) await new Promise((resolve) => server.close(resolve));
  await closePools();
});

const post = (path, body) =>
  fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });

test('payout-ready is blocked until the claim is approved and bank + tax are verified', { skip }, async () => {
  // Before approval: blocked, all three requirements missing.
  let res = await post(`/api/claims/${claimId}/mark-payout-ready`);
  assert.equal(res.status, 422);
  let body = await res.json();
  assert.deepEqual(body.missing, ['approved', 'bank_verified', 'tax_verified']);

  // Approve the claim.
  res = await post(`/api/claims/${claimId}/approve`, { approvedAmount: 900 });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).claim.payout_readiness.satisfied, 1);

  // Still blocked: bank and tax remain.
  res = await post(`/api/claims/${claimId}/mark-payout-ready`);
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).missing, ['bank_verified', 'tax_verified']);

  // Verify bank, then tax.
  res = await post(`/api/claims/${claimId}/verify-bank`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).claim.bank_verified, true);
  res = await post(`/api/claims/${claimId}/verify-tax`);
  assert.equal(res.status, 200);
  const afterTax = (await res.json()).claim;
  assert.equal(afterTax.tax_verified, true);
  assert.equal(afterTax.payout_readiness.ready, true);

  // Now the milestone records.
  res = await post(`/api/claims/${claimId}/mark-payout-ready`);
  assert.equal(res.status, 200);
  const ready = (await res.json()).claim;
  assert.equal(ready.payout_ready, true);
  assert.ok(ready.payout_ready_at);

  // Idempotency + lock: re-marking conflicts, and verification is now locked.
  res = await post(`/api/claims/${claimId}/mark-payout-ready`);
  assert.equal(res.status, 409);
  res = await post(`/api/claims/${claimId}/verify-bank`, { verified: false });
  assert.equal(res.status, 409);
});
