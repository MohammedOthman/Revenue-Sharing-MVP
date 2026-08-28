import {
  buildAttributionDecision,
  calculateClaimEligibility,
} from '../domain/claim-workflow.js';
import { HttpError } from '../lib/http.js';
import { getRecord, updateRecord } from './entity.service.js';

async function loadClaim(context, id) {
  return getRecord({
    organizationId: context.organizationId,
    type: 'PartnerClaim',
    id,
  });
}

export async function decideClaimAttribution(context, id, input) {
  const claim = await loadClaim(context, id);
  return updateRecord(
    context,
    'PartnerClaim',
    id,
    buildAttributionDecision(claim, input),
    input.version,
  );
}

export async function evaluateClaimEligibility(context, id, expectedVersion) {
  const claim = await loadClaim(context, id);
  return updateRecord(
    context,
    'PartnerClaim',
    id,
    calculateClaimEligibility(claim),
    expectedVersion,
  );
}

export async function recordClaimPayout(context, id, input) {
  const claim = await loadClaim(context, id);
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

  return updateRecord(
    context,
    'PartnerClaim',
    id,
    {
      approved_payout: amount,
      paid_amount: amount,
      payment_status: 'paid',
      claim_status: 'paid',
      payout_recorded_date: new Date().toISOString(),
      payout_reference: input.reference || '',
    },
    input.version,
  );
}
