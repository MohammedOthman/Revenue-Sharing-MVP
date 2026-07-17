import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import pool from '../src/config/database.js';
import { canEdit, isConfirmed, createAttribution, findAttributionById, confirmAttribution, getAttributionStats } from '../src/models/attribution.model.js';
import { createPartner } from '../src/models/partner.model.js';

test('proposed decisions are editable; confirmed are not', () => {
  assert.equal(canEdit('proposed'), true);
  assert.equal(canEdit('confirmed'), false);
  assert.equal(isConfirmed('confirmed'), true);
  assert.equal(isConfirmed('proposed'), false);
});

// DB-gated integration
const skip = process.env.RUN_DB_TESTS !== '1';
let partnerId;

after(async () => {
  if (skip) return;
  if (partnerId) await pool.query('DELETE FROM partners WHERE id = $1', [partnerId]);
  await pool.end();
});

test('an attribution decision can be created and confirmed', { skip }, async () => {
  const partner = await createPartner({ name: 'Attr Co', email: `attr-${Date.now()}@t.com` });
  partnerId = partner.id;

  const row = await createAttribution({ partnerId, outcome: 'credited', weight: 100, rationale: 'sole sourcer' });
  assert.equal(row.status, 'proposed');
  assert.equal(Number(row.weight), 100);

  const confirmed = await confirmAttribution(row.id, null);
  assert.equal(confirmed.status, 'confirmed');
  assert.ok(confirmed.decided_at);

  const fetched = await findAttributionById(row.id);
  assert.equal(fetched.partner_name, 'Attr Co');

  const stats = await getAttributionStats();
  assert.ok(Number(stats.confirmed_decisions) >= 1);
});
