import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { recordAuditEvent, safeAudit } from '../src/models/audit.model.js';
import { MIGRATIONS_DIR } from '../src/migrate.js';

test('recordAuditEvent builds the expected INSERT and params', async () => {
  const calls = [];
  const fakeQuery = async (sql, params) => { calls.push({ sql, params }); return { rows: [{ id: 1 }] }; };

  const row = await recordAuditEvent(
    { tenantId: 3, actorUserId: 5, entityType: 'amendment', entityId: 9, action: 'notice_sent', metadata: { x: 1 } },
    fakeQuery
  );

  assert.equal(row.id, 1);
  assert.match(calls[0].sql, /INSERT INTO audit_events/);
  assert.deepEqual(calls[0].params, [3, 5, 'amendment', 9, 'notice_sent', JSON.stringify({ x: 1 })]);
});

test('recordAuditEvent defaults optional fields to null and empty metadata', async () => {
  const calls = [];
  const fakeQuery = async (sql, params) => { calls.push({ params }); return { rows: [{}] }; };
  await recordAuditEvent({ entityType: 'contract', action: 'created' }, fakeQuery);
  assert.deepEqual(calls[0].params, [null, null, 'contract', null, 'created', '{}']);
});

test('recordAuditEvent requires entityType and action', async () => {
  const fakeQuery = async () => ({ rows: [{}] });
  await assert.rejects(() => recordAuditEvent({ action: 'x' }, fakeQuery), /entityType and action/);
  await assert.rejects(() => recordAuditEvent({ entityType: 'y' }, fakeQuery), /entityType and action/);
});

test('safeAudit never throws, even on invalid input', async () => {
  await assert.doesNotReject(() => safeAudit({}));
});

test('migration 003 creates an append-only audit_events table with an immutability trigger', () => {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, '003_audit_events.sql'), 'utf8');
  assert.match(sql, /CREATE TABLE IF NOT EXISTS audit_events\b/);
  assert.match(sql, /CREATE TRIGGER audit_events_no_mutate/);
  assert.match(sql, /BEFORE UPDATE OR DELETE ON audit_events/);
});
