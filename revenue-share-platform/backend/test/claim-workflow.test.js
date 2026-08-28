import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildAttributionDecision,
  calculateClaimEligibility,
} from '../src/domain/claim-workflow.js';

const now = new Date('2026-08-28T12:00:00.000Z');

test('builds a versioned attribution decision', () => {
  const decision = buildAttributionDecision(
    { attribution_version: 2 },
    { status: 'accepted', percentage: 60 },
    now,
  );
  assert.equal(decision.attribution_status, 'accepted');
  assert.equal(decision.attribution_percentage, 60);
  assert.equal(decision.attribution_version, 3);
  assert.equal(decision.claim_status, 'accepted');
});

test('forces rejected attribution to zero', () => {
  const decision = buildAttributionDecision(
    { attribution_version: 0 },
    { status: 'rejected', percentage: 90, reason: 'No evidence' },
    now,
  );
  assert.equal(decision.attribution_percentage, 0);
  assert.equal(decision.attribution_rejection_reason, 'No evidence');
});

test('requires accepted attribution before eligibility', () => {
  const result = calculateClaimEligibility(
    { attribution_status: 'pending', claim_status: 'submitted', estimated_value: 1000 },
    now,
  );
  assert.equal(result.payout_eligibility_status, 'not_eligible');
  assert.equal(result.payout_eligible, false);
  assert.deepEqual(result.eligibility_missing_conditions, ['Accept the attribution of record']);
});

test('requires a confirmed revenue event before eligibility', () => {
  const result = calculateClaimEligibility(
    {
      attribution_status: 'accepted',
      attribution_percentage: 50,
      revenue_status: 'pipeline',
      claim_status: 'accepted',
      estimated_value: 1000,
    },
    now,
  );
  assert.equal(result.payout_eligibility_status, 'missing_evidence');
  assert.equal(result.claim_status, 'accepted');
});

test('calculates an eligible payout on the attributed basis', () => {
  const result = calculateClaimEligibility(
    {
      attribution_status: 'accepted',
      attribution_percentage: 35,
      revenue_status: 'invoiced',
      claim_status: 'accepted',
      estimated_value: 84200,
    },
    now,
  );
  assert.equal(result.payout_eligibility_status, 'eligible');
  assert.equal(result.estimated_payout, 29470);
  assert.equal(result.claim_status, 'payout_eligible');
});
