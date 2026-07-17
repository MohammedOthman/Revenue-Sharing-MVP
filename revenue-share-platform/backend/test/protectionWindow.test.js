import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import pool from '../src/config/database.js';
import {
  effectiveStatus, canEdit,
  createProtectionWindow, findProtectionWindowById, releaseProtectionWindow, getProtectionWindowStats,
} from '../src/models/protectionWindow.model.js';
import { createPartner } from '../src/models/partner.model.js';

test('effectiveStatus derives expired/active/released from date and status', () => {
  const today = new Date('2025-06-01');
  assert.equal(effectiveStatus('2020-01-01', 'active', today), 'expired');
  assert.equal(effectiveStatus('2030-01-01', 'active', today), 'active');
  assert.equal(effectiveStatus(null, 'active', today), 'active');
  assert.equal(effectiveStatus('2020-01-01', 'released', today), 'released'); // released wins over dates
});

test('a released window is not editable', () => {
  assert.equal(canEdit('active'), true);
  assert.equal(canEdit('released'), false);
});

// DB-gated integration
const skip = process.env.RUN_DB_TESTS !== '1';
let partnerId;

after(async () => {
  if (skip) return;
  if (partnerId) await pool.query('DELETE FROM partners WHERE id = $1', [partnerId]);
  await pool.end();
});

test('a protection window can be created and released', { skip }, async () => {
  const partner = await createPartner({ name: 'Window Co', email: `win-${Date.now()}@t.com` });
  partnerId = partner.id;

  const win = await createProtectionWindow({ partnerId, startsAt: '2026-01-01', endsAt: '2026-12-31', reason: 'first-registrant' });
  assert.equal(win.status, 'active');

  const released = await releaseProtectionWindow(win.id);
  assert.equal(released.status, 'released');

  const fetched = await findProtectionWindowById(win.id);
  assert.equal(fetched.partner_name, 'Window Co');

  const stats = await getProtectionWindowStats();
  assert.ok(Number(stats.total_windows) >= 1);
});
