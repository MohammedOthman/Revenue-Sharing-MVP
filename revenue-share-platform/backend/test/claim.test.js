import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canTransition, isTerminal } from '../src/models/claim.model.js';

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
