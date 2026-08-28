import { HttpError } from '../lib/http.js';

const ATTRIBUTABLE = new Set(['accepted', 'partially_accepted']);
const REVENUE_CONFIRMED = new Set(['closed_won', 'invoiced', 'collected', 'recognized']);

export function buildAttributionDecision(claim, { status, percentage, reason }, decidedAt = new Date()) {
  if (!['accepted', 'rejected'].includes(status)) {
    throw new HttpError(400, 'INVALID_ATTRIBUTION_DECISION', 'Attribution must be accepted or rejected.');
  }

  const decidedPercentage = status === 'rejected' ? 0 : Number(percentage);
  if (!Number.isFinite(decidedPercentage) || decidedPercentage < 0 || decidedPercentage > 100) {
    throw new HttpError(400, 'INVALID_ATTRIBUTION_PERCENTAGE', 'Attribution must be between 0 and 100 percent.');
  }

  return {
    attribution_status: status,
    attribution_percentage: decidedPercentage,
    attribution_decision_date: decidedAt.toISOString(),
    attribution_version: (Number(claim.attribution_version) || 0) + 1,
    attribution_rejection_reason: status === 'rejected' ? reason || 'Rejected by reviewer' : '',
    claim_status: status,
  };
}

export function calculateClaimEligibility(claim, evaluatedAt = new Date()) {
  let status;
  let explanation;
  let missing = [];
  let estimatedPayout = Number(claim.estimated_payout) || 0;

  if (!ATTRIBUTABLE.has(claim.attribution_status)) {
    status = 'not_eligible';
    explanation = 'Attribution of record is not accepted, so the claim is not payout eligible.';
    missing = ['Accept the attribution of record'];
  } else if (!REVENUE_CONFIRMED.has(claim.revenue_status)) {
    status = 'missing_evidence';
    explanation = 'Attribution is accepted, but a closed-won or later revenue event is still required.';
    missing = ['Record a closed-won, invoiced, collected, or recognized revenue event'];
  } else {
    status = 'eligible';
    estimatedPayout = Math.round(
      ((Number(claim.estimated_value) || 0) * (Number(claim.attribution_percentage) || 0)) / 100,
    );
    explanation = `Attribution is accepted at ${Number(claim.attribution_percentage) || 0}% and revenue is ${String(
      claim.revenue_status,
    ).replaceAll('_', ' ')}.`;
  }

  return {
    payout_eligibility_status: status,
    payout_eligible: status === 'eligible',
    eligibility_explanation: explanation,
    eligibility_missing_conditions: missing,
    eligibility_evaluated_date: evaluatedAt.toISOString(),
    estimated_payout: estimatedPayout,
    claim_status: status === 'eligible' ? 'payout_eligible' : claim.claim_status,
  };
}
