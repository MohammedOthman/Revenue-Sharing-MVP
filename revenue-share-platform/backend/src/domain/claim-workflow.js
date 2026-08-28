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
  } else if (!Number.isFinite(Number(claim.payout_rate)) || Number(claim.payout_rate) <= 0) {
    status = 'missing_evidence';
    explanation = 'Revenue is confirmed, but the governing agreement payout rate is missing.';
    missing = ['Record the governing agreement payout rate'];
  } else {
    status = 'eligible';
    const revenueBasis = Number(claim.actual_revenue) > 0
      ? Number(claim.actual_revenue)
      : Number(claim.estimated_value) || 0;
    estimatedPayout = Math.round(
      revenueBasis
        * (Number(claim.payout_rate) / 100)
        * ((Number(claim.attribution_percentage) || 0) / 100),
    );
    explanation = `Revenue is ${String(claim.revenue_status).replaceAll('_', ' ')}, the agreement rate is ${Number(
      claim.payout_rate,
    )}%, and attribution is accepted at ${Number(claim.attribution_percentage) || 0}%.`;
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

export function buildRevenueEvidence(
  claim,
  { status, actualRevenue, payoutRate, reference },
  recordedAt = new Date(),
) {
  if (!['pipeline', 'closed_won', 'invoiced', 'collected', 'recognized', 'lost'].includes(status)) {
    throw new HttpError(400, 'INVALID_REVENUE_STATUS', 'Revenue status is not supported.');
  }
  const amount = actualRevenue === undefined ? Number(claim.actual_revenue) || 0 : Number(actualRevenue);
  if (!Number.isFinite(amount) || amount < 0) {
    throw new HttpError(400, 'INVALID_REVENUE_AMOUNT', 'Actual revenue must be a non-negative number.');
  }
  const rate = payoutRate === undefined ? claim.payout_rate : Number(payoutRate);
  if (rate !== undefined && (!Number.isFinite(Number(rate)) || Number(rate) < 0 || Number(rate) > 100)) {
    throw new HttpError(400, 'INVALID_PAYOUT_RATE', 'Payout rate must be between 0 and 100 percent.');
  }
  return {
    revenue_status: status,
    actual_revenue: amount,
    payout_rate: rate,
    revenue_event_date: recordedAt.toISOString(),
    revenue_reference: reference || '',
  };
}
