import assert from 'node:assert/strict';
import test from 'node:test';
import {
  LEDGER_ACCOUNTS,
  LEDGER_EVENTS,
  assertJournalBalanced,
  buildClaimJournal,
  buildIdempotencyKey,
  fromMinorUnits,
  toMinorUnits,
} from '../src/domain/ledger.js';

const claim = {
  id: '11111111-1111-4111-8111-111111111111',
  partner_name: 'Diriyah Partners',
  customer_account: 'Elm',
  currency: 'SAR',
  estimated_value: 84200,
  actual_revenue: 84200,
  attribution_status: 'accepted',
  attribution_percentage: 35,
  attribution_version: 3,
  revenue_status: 'invoiced',
  revenue_event_date: '2026-08-28T12:00:00.000Z',
  payout_rate: 10,
  payout_eligibility_status: 'eligible',
  estimated_payout: 2947,
  eligibility_evaluated_date: '2026-08-28T12:05:00.000Z',
  eligibility_explanation: 'Revenue is invoiced, the agreement rate is 10%, and attribution is accepted at 35%.',
  paid_amount: 2947,
  payout_recorded_date: '2026-08-28T12:10:00.000Z',
  payout_reference: 'MILESTONE-1',
};

test('converts major units without floating residue', () => {
  assert.equal(toMinorUnits(2947), 294700);
  assert.equal(fromMinorUnits(294700), 2947);
  assert.equal(toMinorUnits(10.125), 1013);
});

test('registers a balanced pipeline journal', () => {
  const journal = buildClaimJournal(LEDGER_EVENTS.CLAIM_REGISTERED, claim);
  assert.equal(journal.idempotency_key, `claim:${claim.id}:registered`);
  assert.equal(journal.currency, 'SAR');
  assert.equal(journal.lines.length, 2);
  assert.equal(journal.lines[0].account, LEDGER_ACCOUNTS.PIPELINE_VALUE);
  assert.equal(journal.lines[0].amount_minor, 8420000);
  assertJournalBalanced(journal.lines);
});

test('posts attributed value from the accepted percentage', () => {
  const journal = buildClaimJournal(LEDGER_EVENTS.ATTRIBUTION_DECIDED, claim);
  assert.equal(journal.idempotency_key, `claim:${claim.id}:attribution:v3`);
  assert.equal(journal.lines[0].amount_minor, 2947000);
  assert.equal(journal.lines[0].account, LEDGER_ACCOUNTS.ATTRIBUTED_VALUE);
});

test('does not post an eligible obligation until the claim is eligible', () => {
  const journal = buildClaimJournal(LEDGER_EVENTS.ELIGIBILITY_EVALUATED, {
    ...claim,
    payout_eligibility_status: 'missing_evidence',
    estimated_payout: 2947,
  });
  assert.deepEqual(journal.lines, []);
});

test('posts the eligible obligation from the server-calculated payout', () => {
  const journal = buildClaimJournal(LEDGER_EVENTS.ELIGIBILITY_EVALUATED, claim);
  assert.equal(journal.lines[0].account, LEDGER_ACCOUNTS.ELIGIBLE_OBLIGATION);
  assert.equal(journal.lines[0].amount_minor, 294700);
});

test('records a payout milestone without implying settlement rails', () => {
  const journal = buildClaimJournal(LEDGER_EVENTS.PAYOUT_RECORDED, claim);
  assert.match(journal.memo, /No money moved/);
  assert.equal(journal.idempotency_key, `claim:${claim.id}:payout:MILESTONE-1`);
  assert.equal(journal.lines[0].account, LEDGER_ACCOUNTS.RECORDED_PAYOUT);
});

test('versions attribution keys so later decisions append instead of overwrite', () => {
  assert.equal(
    buildIdempotencyKey(LEDGER_EVENTS.ATTRIBUTION_DECIDED, { id: claim.id, attribution_version: 1 }),
    `claim:${claim.id}:attribution:v1`,
  );
  assert.notEqual(
    buildIdempotencyKey(LEDGER_EVENTS.ATTRIBUTION_DECIDED, { id: claim.id, attribution_version: 1 }),
    buildIdempotencyKey(LEDGER_EVENTS.ATTRIBUTION_DECIDED, { id: claim.id, attribution_version: 2 }),
  );
});

test('rejects an unbalanced manual journal', () => {
  assert.throws(
    () => assertJournalBalanced([
      { account: 'a', direction: 'debit', amount_minor: 100 },
      { account: 'b', direction: 'credit', amount_minor: 40 },
    ]),
    /must balance/,
  );
});
