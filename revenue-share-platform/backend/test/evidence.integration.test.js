import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import pool from '../src/config/database.js';
import { generateToken } from '../src/utils/jwt.js';
import { createUser } from '../src/models/user.model.js';
import { createPartner } from '../src/models/partner.model.js';
import { createClaim } from '../src/models/claim.model.js';

// DB-gated: exercises the evidence lifecycle end to end through the real HTTP
// stack against PostgreSQL. Proves the pilot-critical guarantee: once a pack is
// finalized, neither it nor its items can change.
const skip = process.env.RUN_DB_TESTS !== '1';

let server;
let base;
let token;
let userId;
let partnerId;
let claimId;

before(async () => {
  if (skip) return;
  const user = await createUser(`evi-${Date.now()}@t.com`, 'password123', 'Evidence Tester', 'admin');
  userId = user.id;
  token = generateToken({ id: user.id, email: user.email, role: 'admin' });

  const partner = await createPartner({ name: 'Evidence Co', email: `evi-p-${Date.now()}@t.com` });
  partnerId = partner.id;
  const claim = await createClaim({ partnerId, claimedAmount: 500, basis: 'evidence test' });
  claimId = claim.id;

  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  try {
    await pool.query('DELETE FROM evidence_items WHERE added_by = $1', [userId]);
    await pool.query('DELETE FROM evidence_packs WHERE created_by = $1', [userId]);
    if (partnerId) await pool.query('DELETE FROM partners WHERE id = $1', [partnerId]); // cascades claim
    // The test user is intentionally left in place: append-only audit_events
    // reference actor_user_id and must not (cannot) be deleted.
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await pool.end();
  }
});

const req = (method, path, body) =>
  fetch(`${base}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });

test('an evidence item with no attachment is rejected (400)', { skip }, async () => {
  const res = await req('POST', '/api/evidence/items', { name: 'orphan note' });
  assert.equal(res.status, 400);
});

test('pack lifecycle: create, add item, finalize, then everything is read-only', { skip }, async () => {
  // an item attached to the claim
  let res = await req('POST', '/api/evidence/items', { name: 'Signed referral email', type: 'email', claimId });
  assert.equal(res.status, 201);
  const itemId = (await res.json()).item.id;

  // a pack for the claim
  res = await req('POST', '/api/evidence/packs', { title: 'Q1 claim evidence', claimId });
  assert.equal(res.status, 201);
  const packId = (await res.json()).pack.id;

  // add the existing item to the pack
  res = await req('POST', `/api/evidence/packs/${packId}/items`, { itemId });
  assert.equal(res.status, 200);

  // the pack now lists exactly one item
  res = await req('GET', `/api/evidence/packs/${packId}/items`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).items.length, 1);

  // finalize
  res = await req('POST', `/api/evidence/packs/${packId}/finalize`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).pack.status, 'finalized');

  // finalized pack cannot be edited
  res = await req('PUT', `/api/evidence/packs/${packId}`, { title: 'changed' });
  assert.equal(res.status, 409);

  // finalized pack cannot receive more items
  res = await req('POST', `/api/evidence/packs/${packId}/items`, { name: 'late addition', claimId });
  assert.equal(res.status, 409);

  // an item inside a finalized pack cannot be edited or removed
  res = await req('PUT', `/api/evidence/items/${itemId}`, { name: 'tampered' });
  assert.equal(res.status, 409);
  res = await req('DELETE', `/api/evidence/items/${itemId}`);
  assert.equal(res.status, 409);

  // re-finalizing is a conflict
  res = await req('POST', `/api/evidence/packs/${packId}/finalize`);
  assert.equal(res.status, 409);

  // stats count the finalized pack
  res = await req('GET', '/api/evidence/packs/stats');
  const { stats } = await res.json();
  assert.ok(Number(stats.finalized_packs) >= 1);
});
