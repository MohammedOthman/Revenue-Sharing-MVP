import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assertEntityType,
  publicRecord,
  recordLabel,
  sanitizeRecordData,
} from '../src/domain/entities.js';

test('accepts and normalizes a valid partner claim', () => {
  const record = sanitizeRecordData('PartnerClaim', {
    partner_name: '  Najd Cloud  ',
    customer_account: 'Riyad Bank',
    claim_type: 'referral_claim',
    estimated_value: 84000,
    metadata: { source: 'crm' },
  });

  assert.equal(record.partner_name, 'Najd Cloud');
  assert.equal(record.estimated_value, 84000);
  assert.deepEqual(record.metadata, { source: 'crm' });
  assert.equal(record.claim_status, 'submitted');
  assert.equal(record.payment_status, 'pending');
});

test('prevents clients from bypassing claim workflow actions', () => {
  const created = sanitizeRecordData('PartnerClaim', {
    partner_name: 'Najd Cloud',
    customer_account: 'Riyad Bank',
    claim_type: 'referral_claim',
    estimated_value: 84000,
    claim_status: 'paid',
    payment_status: 'paid',
  });
  assert.equal(created.claim_status, 'submitted');
  assert.equal(created.payment_status, 'pending');
  assert.throws(
    () => sanitizeRecordData('PartnerClaim', { payment_status: 'paid' }, { partial: true }),
    (error) => error.code === 'WORKFLOW_ACTION_REQUIRED',
  );
  const internal = sanitizeRecordData(
    'PartnerClaim',
    { payment_status: 'paid' },
    { partial: true, allowWorkflowFields: true },
  );
  assert.equal(internal.payment_status, 'paid');
});

test('rejects missing required claim fields', () => {
  assert.throws(
    () => sanitizeRecordData('PartnerClaim', { partner_name: 'Najd Cloud' }),
    /customer_account is required/,
  );
});

test('removes server-owned metadata and blocks invalid field names', () => {
  const record = sanitizeRecordData('Partner', { legal_name: 'Acme', id: 'spoofed', version: 99 });
  assert.equal(record.id, undefined);
  assert.equal(record.version, undefined);
  assert.throws(
    () => sanitizeRecordData('Partner', { legal_name: 'Acme', 'bad-field': true }),
    /Invalid field name/,
  );
});

test('keeps the audit entity read-only', () => {
  assert.equal(assertEntityType('AuditEvent'), 'AuditEvent');
  assert.throws(() => assertEntityType('AuditEvent', { writable: true }), /does not exist/);
});

test('does not allow a partial update to clear a required field', () => {
  assert.throws(
    () => sanitizeRecordData('Partner', { legal_name: ' ' }, { partial: true }),
    (error) => error.code === 'INVALID_RECORD' && /legal_name/.test(error.message),
  );
});

test('rejects unsupported lifecycle values and invalid percentages', () => {
  assert.throws(
    () => sanitizeRecordData('Partner', { legal_name: 'Acme', lifecycle_status: 'deleted' }),
    (error) => error.code === 'INVALID_RECORD',
  );
  assert.throws(
    () => sanitizeRecordData('Agreement', { partner_name: 'Acme', agreement_type: 'referral_agreement', revenue_share_rate: 101 }),
    (error) => error.code === 'INVALID_RECORD',
  );
});

test('server metadata takes precedence in public records', () => {
  const record = publicRecord({
    id: 'server-id',
    data: { id: 'client-id', legal_name: 'Acme' },
    version: 3,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-02T00:00:00Z',
  });
  assert.equal(record.id, 'server-id');
  assert.equal(record._id, 'server-id');
  assert.equal(record.version, 3);
  assert.equal(recordLabel(record), 'Acme');
});
