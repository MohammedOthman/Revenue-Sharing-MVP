import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canTransition, isTerminal, payoutReadiness, canChangeVerification } from '../src/models/claim.model.js';

test('valid claim transitions are allowed', () => {
  assert.equal(canTransition('submitted', 'under_review'), true);
  assert.equal(canTransition('submitted', 'approved'), true);
  assert.equal(canTransition('under_review', 'rejected'), true);
  assert.equal(canTransition('needs_clarification', 'under_review'), true);
});

test('terminal claims cannot transition', () => {
  assert.equal(canTransition('approved', 'under_review'), false);
  assert.equal(canTransition('rejected', 'approved'), false);
  assert.equal(isTerminal('approved'), true);
  assert.equal(isTerminal('rejected'), true);
  assert.equal(isTerminal('submitted'), false);
});

test('unknown statuses never transition', () => {
  assert.equal(canTransition('bogus', 'approved'), false);
});

test('payout-readiness requires approval plus bank and tax verification', () => {
  const base = { status: 'submitted', bank_verified: false, tax_verified: false };
  assert.deepEqual(payoutReadiness(base).missing, ['approved', 'bank_verified', 'tax_verified']);
  assert.equal(payoutReadiness(base).ready, false);

  assert.deepEqual(
    payoutReadiness({ status: 'approved', bank_verified: false, tax_verified: false }).missing,
    ['bank_verified', 'tax_verified']
  );
  assert.deepEqual(
    payoutReadiness({ status: 'approved', bank_verified: true, tax_verified: false }).missing,
    ['tax_verified']
  );

  const ready = payoutReadiness({ status: 'approved', bank_verified: true, tax_verified: true });
  assert.equal(ready.ready, true);
  assert.equal(ready.satisfied, 3);
  assert.equal(ready.total, 3);
});

test('verification inputs lock once the claim is payout-ready', () => {
  assert.equal(canChangeVerification({ payout_ready: false }), true);
  assert.equal(canChangeVerification({ payout_ready: true }), false);
});
