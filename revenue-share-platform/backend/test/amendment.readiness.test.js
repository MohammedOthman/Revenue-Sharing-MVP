import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeReadiness, withReadiness } from '../src/models/amendment.model.js';

// A fully-specified journey with all 15 readiness requirements satisfied.
const fullAmendment = () => ({
  contract_id: 1,
  article_reference: 'Article 12',
  amendment_type: 'value',
  reason: 'Adjust the revenue-share percentage.',
  public_interest_basis: 'Aligns pricing with the actual cost of service.',
  necessity_confirmed: true,
  no_new_contract_confirmed: true,
  no_nature_change_confirmed: true,
  notice_period_days: 30,
  authority_source: 'Board Resolution 2026/14',
  partner_impact: 'Percentage changes from 12.5% to 11.0%.',
  calculation_method: 'Applied to processed volume from the effective date.',
  amendment_letter_reference: 'AL-2026-014',
  notice_message: 'نص الإشعار',
  notice_channels: ['platform', 'email'],
});

test('a fully-specified journey is ready with nothing missing', () => {
  const r = computeReadiness(fullAmendment());
  assert.equal(r.ready, true);
  assert.deepEqual(r.missing, []);
  assert.equal(r.total, 15);
  assert.equal(r.satisfied, 15);
});

test('an empty journey is not ready and reports every requirement missing', () => {
  const r = computeReadiness({});
  assert.equal(r.ready, false);
  assert.equal(r.satisfied, 0);
  assert.equal(r.missing.length, 15);
  assert.ok(r.missing.includes('contract'));
  assert.ok(r.missing.includes('notice_channels'));
});

test('each individual missing field blocks readiness and is named', () => {
  const removable = {
    article_reference: 'article_reference',
    amendment_type: 'amendment_type',
    reason: 'reason',
    public_interest_basis: 'public_interest_basis',
    authority_source: 'authority_source',
    partner_impact: 'partner_impact',
    calculation_method: 'calculation_method',
    amendment_letter_reference: 'amendment_letter_reference',
    notice_message: 'notice_message',
  };
  for (const [field, key] of Object.entries(removable)) {
    const a = fullAmendment();
    delete a[field];
    const r = computeReadiness(a);
    assert.equal(r.ready, false, `${field} missing should block`);
    assert.ok(r.missing.includes(key), `missing should include ${key}`);
    assert.equal(r.satisfied, 14);
  }
});

test('a false guardrail checkbox blocks (not just falsy/undefined)', () => {
  for (const guard of ['necessity_confirmed', 'no_new_contract_confirmed', 'no_nature_change_confirmed']) {
    const a = fullAmendment();
    a[guard] = false;
    const r = computeReadiness(a);
    assert.equal(r.ready, false, `${guard}=false should block`);
    assert.ok(r.missing.includes(guard));
  }
});

test('whitespace-only text is treated as missing', () => {
  const a = fullAmendment();
  a.reason = '   ';
  assert.ok(computeReadiness(a).missing.includes('reason'));
});

test('notice period must be greater than zero', () => {
  assert.ok(computeReadiness({ ...fullAmendment(), notice_period_days: 0 }).missing.includes('notice_period_days'));
  assert.ok(computeReadiness({ ...fullAmendment(), notice_period_days: null }).missing.includes('notice_period_days'));
});

test('empty or non-array channels block readiness', () => {
  assert.ok(computeReadiness({ ...fullAmendment(), notice_channels: [] }).missing.includes('notice_channels'));
  assert.ok(computeReadiness({ ...fullAmendment(), notice_channels: null }).missing.includes('notice_channels'));
});

test('withReadiness attaches a readiness object to a row', () => {
  const withR = withReadiness(fullAmendment());
  assert.ok(withR.readiness);
  assert.equal(withR.readiness.ready, true);
  // original fields preserved
  assert.equal(withR.article_reference, 'Article 12');
});

test('withReadiness passes through null/undefined rows unchanged', () => {
  assert.equal(withReadiness(null), null);
  assert.equal(withReadiness(undefined), undefined);
});
