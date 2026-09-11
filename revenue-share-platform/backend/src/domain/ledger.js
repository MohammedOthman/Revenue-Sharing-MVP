import { HttpError } from '../lib/http.js';

export const LEDGER_EVENTS = Object.freeze({
  CLAIM_REGISTERED: 'claim_registered',
  ATTRIBUTION_DECIDED: 'attribution_decided',
  REVENUE_RECORDED: 'revenue_recorded',
  ELIGIBILITY_EVALUATED: 'eligibility_evaluated',
  PAYOUT_RECORDED: 'payout_recorded',
});

export const LEDGER_ACCOUNTS = Object.freeze({
  PIPELINE_VALUE: 'pipeline_value',
  PIPELINE_CONTROL: 'pipeline_control',
  ATTRIBUTED_VALUE: 'attributed_value',
  ATTRIBUTION_CONTROL: 'attribution_control',
  ELIGIBLE_OBLIGATION: 'eligible_obligation',
  ELIGIBILITY_CONTROL: 'eligibility_control',
  RECORDED_PAYOUT: 'recorded_payout',
  PAYOUT_CONTROL: 'payout_control',
});

const EVENT_SET = new Set(Object.values(LEDGER_EVENTS));

export function toMinorUnits(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) {
    throw new HttpError(400, 'INVALID_LEDGER_AMOUNT', 'Ledger amounts must be finite and non-negative.');
  }
  return Math.round(value * 100);
}

export function fromMinorUnits(amountMinor) {
  return Number(amountMinor) / 100;
}

export function normalizeCurrency(currency) {
  const code = String(currency || 'USD').trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(code)) {
    throw new HttpError(400, 'INVALID_CURRENCY', 'currency must be a three-letter ISO code.');
  }
  return code;
}

function line(account, direction, amountMinor) {
  if (!Number.isInteger(amountMinor) || amountMinor < 0) {
    throw new HttpError(400, 'INVALID_LEDGER_LINE', 'Ledger lines must use non-negative integer minor units.');
  }
  if (!['debit', 'credit'].includes(direction)) {
    throw new HttpError(400, 'INVALID_LEDGER_LINE', 'Ledger direction must be debit or credit.');
  }
  return { account, direction, amount_minor: amountMinor };
}

function pair(debitAccount, creditAccount, amountMinor) {
  if (amountMinor === 0) return [];
  return [line(debitAccount, 'debit', amountMinor), line(creditAccount, 'credit', amountMinor)];
}

export function assertJournalBalanced(lines) {
  const debit = lines.filter((item) => item.direction === 'debit').reduce((sum, item) => sum + item.amount_minor, 0);
  const credit = lines.filter((item) => item.direction === 'credit').reduce((sum, item) => sum + item.amount_minor, 0);
  if (debit !== credit) {
    throw new HttpError(500, 'UNBALANCED_JOURNAL', 'A journal must balance before it can be posted.', {
      debit,
      credit,
    });
  }
  return lines;
}

export function buildIdempotencyKey(event, claim) {
  if (!EVENT_SET.has(event)) {
    throw new HttpError(400, 'INVALID_LEDGER_EVENT', 'Unsupported ledger event.');
  }
  const id = claim.id || claim._id;
  if (!id) throw new HttpError(400, 'INVALID_LEDGER_EVENT', 'A claim id is required to post a journal.');

  switch (event) {
    case LEDGER_EVENTS.CLAIM_REGISTERED:
      return `claim:${id}:registered`;
    case LEDGER_EVENTS.ATTRIBUTION_DECIDED:
      return `claim:${id}:attribution:v${Number(claim.attribution_version) || 1}`;
    case LEDGER_EVENTS.REVENUE_RECORDED:
      return `claim:${id}:revenue:${claim.revenue_status}:${claim.revenue_event_date || 'unspecified'}`;
    case LEDGER_EVENTS.ELIGIBILITY_EVALUATED:
      return `claim:${id}:eligibility:${claim.eligibility_evaluated_date || claim.version || 'unspecified'}`;
    case LEDGER_EVENTS.PAYOUT_RECORDED:
      return `claim:${id}:payout:${claim.payout_reference || claim.payout_recorded_date || 'unspecified'}`;
    default:
      return `claim:${id}:${event}`;
  }
}

function attributedBasis(claim) {
  const revenueBasis = Number(claim.actual_revenue) > 0
    ? Number(claim.actual_revenue)
    : Number(claim.estimated_value) || 0;
  return revenueBasis * ((Number(claim.attribution_percentage) || 0) / 100);
}

export function buildClaimJournal(event, claim) {
  if (!EVENT_SET.has(event)) {
    throw new HttpError(400, 'INVALID_LEDGER_EVENT', 'Unsupported ledger event.');
  }

  const currency = normalizeCurrency(claim.currency);
  let lines = [];
  let memo = '';

  if (event === LEDGER_EVENTS.CLAIM_REGISTERED) {
    lines = pair(
      LEDGER_ACCOUNTS.PIPELINE_VALUE,
      LEDGER_ACCOUNTS.PIPELINE_CONTROL,
      toMinorUnits(claim.estimated_value || 0),
    );
    memo = `Registered claim against ${claim.customer_account || 'unspecified account'}.`;
  }

  if (event === LEDGER_EVENTS.ATTRIBUTION_DECIDED) {
    lines = pair(
      LEDGER_ACCOUNTS.ATTRIBUTED_VALUE,
      LEDGER_ACCOUNTS.ATTRIBUTION_CONTROL,
      toMinorUnits(attributedBasis(claim)),
    );
    memo = `Attribution ${claim.attribution_status} at ${Number(claim.attribution_percentage) || 0}%.`;
  }

  if (event === LEDGER_EVENTS.REVENUE_RECORDED) {
    lines = pair(
      LEDGER_ACCOUNTS.PIPELINE_VALUE,
      LEDGER_ACCOUNTS.PIPELINE_CONTROL,
      toMinorUnits(claim.actual_revenue || 0),
    );
    memo = `Revenue evidence ${claim.revenue_status}${claim.revenue_reference ? ` (${claim.revenue_reference})` : ''}`;
  }

  if (event === LEDGER_EVENTS.ELIGIBILITY_EVALUATED) {
    const eligible = claim.payout_eligibility_status === 'eligible' ? Number(claim.estimated_payout) || 0 : 0;
    lines = pair(
      LEDGER_ACCOUNTS.ELIGIBLE_OBLIGATION,
      LEDGER_ACCOUNTS.ELIGIBILITY_CONTROL,
      toMinorUnits(eligible),
    );
    memo = claim.eligibility_explanation || 'Eligibility evaluated.';
  }

  if (event === LEDGER_EVENTS.PAYOUT_RECORDED) {
    lines = pair(
      LEDGER_ACCOUNTS.RECORDED_PAYOUT,
      LEDGER_ACCOUNTS.PAYOUT_CONTROL,
      toMinorUnits(claim.paid_amount || claim.approved_payout || 0),
    );
    memo = `First-payout milestone recorded${claim.payout_reference ? ` (${claim.payout_reference})` : ''}. No money moved.`;
  }

  assertJournalBalanced(lines);

  return {
    event,
    claim_id: claim.id || claim._id,
    currency,
    memo,
    idempotency_key: buildIdempotencyKey(event, claim),
    lines,
    metadata: {
      partner_name: claim.partner_name || null,
      customer_account: claim.customer_account || null,
      claim_status: claim.claim_status || null,
      attribution_status: claim.attribution_status || null,
      revenue_status: claim.revenue_status || null,
      payout_eligibility_status: claim.payout_eligibility_status || null,
    },
  };
}

export function publicJournal(journal, lines) {
  const debit = lines
    .filter((item) => item.direction === 'debit')
    .reduce((sum, item) => sum + Number(item.amount_minor), 0);
  return {
    id: journal.id,
    event: journal.event,
    claim_id: journal.claim_id,
    currency: journal.currency,
    memo: journal.memo,
    idempotency_key: journal.idempotency_key,
    metadata: journal.metadata,
    amount: fromMinorUnits(debit),
    amount_minor: debit,
    created_at: journal.created_at,
    lines: lines.map((item) => ({
      id: item.id,
      account: item.account,
      direction: item.direction,
      amount: fromMinorUnits(item.amount_minor),
      amount_minor: Number(item.amount_minor),
      currency: item.currency,
    })),
  };
}
