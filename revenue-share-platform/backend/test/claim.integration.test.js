import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import pool from '../src/config/database.js';
import { createPartner } from '../src/models/partner.model.js';
import { createClaim, findClaimById, setClaimStatus, getClaimStats } from '../src/models/claim.model.js';

// DB-gated: needs a migrated database (through 005). Exercises the claim
// lifecycle end to end against real PostgreSQL.
const skip = process.env.RUN_DB_TESTS !== '1';

let partnerId;

after(async () => {
  if (skip) return;
  if (partnerId) await pool.query('DELETE FROM partners WHERE id = $1', [partnerId]); // cascades to claims
  await pool.end();
});

test('a claim can be submitted and approved with a server-set amount', { skip }, async () => {
  const partner = await createPartner({ name: 'Claim Co', email: `claim-${Date.now()}@t.com` });
  partnerId = partner.id;

  const claim = await createClaim({ partnerId, claimedAmount: 1000, basis: 'Q1 referrals' });
  assert.equal(claim.status, 'submitted');
  assert.equal(Number(claim.claimed_amount), 1000);
  assert.equal(claim.approved_amount, null);

  const approved = await setClaimStatus(claim.id, { status: 'approved', approvedAmount: 900, reviewedBy: null, note: 'partial' });
  assert.equal(approved.status, 'approved');
  assert.equal(Number(approved.approved_amount), 900);

  const fetched = await findClaimById(claim.id);
  assert.equal(fetched.status, 'approved');
  assert.equal(fetched.partner_name, 'Claim Co');

  const stats = await getClaimStats();
  assert.ok(Number(stats.total_claims) >= 1);
  assert.ok(Number(stats.approved_claims) >= 1);
});
