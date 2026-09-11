import { withTransaction } from '../config/database.js';
import {
  buildAttributionDecision,
  buildRevenueEvidence,
  calculateClaimEligibility,
} from '../domain/claim-workflow.js';
import { LEDGER_EVENTS } from '../domain/ledger.js';
import { HttpError } from '../lib/http.js';
import { getRecordWithClient, updateRecordWithClient } from './entity.service.js';
import { postClaimJournal } from './ledger.service.js';

async function loadClaim(client, context, id) {
  return getRecordWithClient(client, {
    organizationId: context.organizationId,
    type: 'PartnerClaim',
    id,
  });
}

async function applyWorkflow(context, id, event, mutate) {
  return withTransaction(async (client) => {
    const claim = await loadClaim(client, context, id);
    const { input, expectedVersion } = mutate(claim);
    const record = await updateRecordWithClient(
      client,
      context,
      'PartnerClaim',
      id,
      input,
      expectedVersion,
      { allowWorkflowFields: true },
    );
    const { journal } = await postClaimJournal(client, context, event, record);
    return { record, journal };
  });
}

export async function decideClaimAttribution(context, id, input) {
  return applyWorkflow(context, id, LEDGER_EVENTS.ATTRIBUTION_DECIDED, (claim) => ({
    input: buildAttributionDecision(claim, input),
    expectedVersion: input.version,
  }));
}

export async function evaluateClaimEligibility(context, id, expectedVersion) {
  return applyWorkflow(context, id, LEDGER_EVENTS.ELIGIBILITY_EVALUATED, (claim) => ({
    input: calculateClaimEligibility(claim),
    expectedVersion,
  }));
}

export async function recordClaimRevenue(context, id, input) {
  return applyWorkflow(context, id, LEDGER_EVENTS.REVENUE_RECORDED, (claim) => ({
    input: buildRevenueEvidence(claim, input),
    expectedVersion: input.version,
  }));
}

export async function recordClaimPayout(context, id, input) {
  return applyWorkflow(context, id, LEDGER_EVENTS.PAYOUT_RECORDED, (claim) => {
    if (claim.payout_eligibility_status !== 'eligible') {
      throw new HttpError(409, 'CLAIM_NOT_ELIGIBLE', 'Only an eligible claim can be recorded as paid.');
    }
    if (claim.payment_status === 'paid') {
      throw new HttpError(409, 'PAYOUT_ALREADY_RECORDED', 'This claim is already recorded as paid.');
    }

    const amount = Number(input.amount ?? claim.approved_payout ?? claim.estimated_payout);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new HttpError(400, 'INVALID_PAYOUT_AMOUNT', 'The recorded payout must be greater than zero.');
    }

    return {
      input: {
        approved_payout: amount,
        paid_amount: amount,
        payment_status: 'paid',
        claim_status: 'paid',
        payout_recorded_date: new Date().toISOString(),
        payout_reference: input.reference || '',
      },
      expectedVersion: input.version,
    };
  });
}
