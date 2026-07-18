import {
  createClaim, findClaimById, getAllClaims, updateClaim,
  setClaimStatus, deleteClaim, getClaimStats, canTransition, isTerminal,
  payoutReadiness, withPayoutReadiness, canChangeVerification,
  setClaimVerification, setClaimPayoutReady,
} from '../models/claim.model.js';
import { safeAudit } from '../models/audit.model.js';
import { toCsv } from '../utils/csv.js';

const audit = (req, claim, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'claim',
  entityId: claim?.id,
  action,
  metadata: { status: claim?.status, ...metadata },
});

export const createClaimController = async (req, res) => {
  try {
    const { partnerId } = req.body;
    if (!partnerId) return res.status(400).json({ error: 'Partner is required' });
    const claim = await createClaim({ ...req.body, tenantId: req.tenantId, createdBy: req.user.id });
    await audit(req, claim, 'created');
    res.status(201).json({ message: 'Claim submitted', claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Create claim error:', error);
    res.status(500).json({ error: 'Failed to create claim' });
  }
};

export const getAllClaimsController = async (req, res) => {
  try {
    const { status, partnerId, contractId } = req.query;
    const claims = await getAllClaims({ status, partnerId, contractId });
    res.json({ claims: claims.map(withPayoutReadiness) });
  } catch (error) {
    console.error('Get claims error:', error);
    res.status(500).json({ error: 'Failed to get claims' });
  }
};

export const getClaimController = async (req, res) => {
  try {
    const claim = await findClaimById(req.params.id);
    if (!claim) return res.status(404).json({ error: 'Claim not found' });
    res.json({ claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Get claim error:', error);
    res.status(500).json({ error: 'Failed to get claim' });
  }
};

export const updateClaimController = async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (isTerminal(existing.status)) {
      return res.status(409).json({ error: `A ${existing.status} claim can no longer be edited` });
    }
    const claim = await updateClaim(req.params.id, req.body);
    await audit(req, claim, 'updated');
    res.json({ message: 'Claim updated', claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Update claim error:', error);
    res.status(500).json({ error: 'Failed to update claim' });
  }
};

export const deleteClaimController = async (req, res) => {
  try {
    await deleteClaim(req.params.id);
    await safeAudit({
      tenantId: req.tenantId, actorUserId: req.user?.id,
      entityType: 'claim', entityId: Number(req.params.id), action: 'deleted',
    });
    res.json({ message: 'Claim deleted' });
  } catch (error) {
    console.error('Delete claim error:', error);
    res.status(500).json({ error: 'Failed to delete claim' });
  }
};

// Generic guarded transition used by the review/clarify endpoints.
const transition = (targetStatus, action) => async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (!canTransition(existing.status, targetStatus)) {
      return res.status(409).json({ error: `Cannot move a ${existing.status} claim to ${targetStatus}` });
    }
    const claim = await setClaimStatus(req.params.id, { status: targetStatus, note: req.body?.note });
    await audit(req, claim, action);
    res.json({ message: `Claim ${action}`, claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error(`Claim ${action} error:`, error);
    res.status(500).json({ error: `Failed to ${action} claim` });
  }
};

export const reviewClaimController = transition('under_review', 'reviewed');
export const requestClarificationController = transition('needs_clarification', 'clarification_requested');

export const approveClaimController = async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (!canTransition(existing.status, 'approved')) {
      return res.status(409).json({ error: `Cannot approve a ${existing.status} claim` });
    }
    const approvedAmount = Number(req.body?.approvedAmount ?? existing.claimed_amount);
    if (!Number.isFinite(approvedAmount) || approvedAmount < 0) {
      return res.status(400).json({ error: 'approvedAmount must be a non-negative number' });
    }
    const claim = await setClaimStatus(req.params.id, {
      status: 'approved', approvedAmount, note: req.body?.note, reviewedBy: req.user.id,
    });
    await audit(req, claim, 'approved', { approvedAmount });
    res.json({ message: 'Claim approved', claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Approve claim error:', error);
    res.status(500).json({ error: 'Failed to approve claim' });
  }
};

export const rejectClaimController = async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (!canTransition(existing.status, 'rejected')) {
      return res.status(409).json({ error: `Cannot reject a ${existing.status} claim` });
    }
    const claim = await setClaimStatus(req.params.id, {
      status: 'rejected', note: req.body?.note, reviewedBy: req.user.id,
    });
    await audit(req, claim, 'rejected');
    res.json({ message: 'Claim rejected', claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Reject claim error:', error);
    res.status(500).json({ error: 'Failed to reject claim' });
  }
};

// --- Payout-readiness (FR-04). Records verification + a payout-ready milestone.
// No money movement. Which roles may verify bank/tax or mark payout-ready is an
// open org decision; today any authenticated tenant member may. ---

const verify = (kind) => async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (!canChangeVerification(existing)) {
      return res.status(409).json({ error: 'Verification is locked once the claim is payout-ready' });
    }
    const verified = req.body?.verified === undefined ? true : req.body.verified === true;
    const claim = await setClaimVerification(req.params.id, kind, verified);
    await audit(req, claim, verified ? `${kind}_verified` : `${kind}_unverified`);
    res.json({ message: `Claim ${kind} verification recorded`, claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error(`Claim ${kind} verification error:`, error);
    res.status(500).json({ error: `Failed to record ${kind} verification` });
  }
};

export const verifyBankController = verify('bank');
export const verifyTaxController = verify('tax');

export const markPayoutReadyController = async (req, res) => {
  try {
    const existing = await findClaimById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Claim not found' });
    if (existing.payout_ready) {
      return res.status(409).json({ error: 'Claim is already payout-ready' });
    }
    const readiness = payoutReadiness(existing);
    if (!readiness.ready) {
      // Blocked, not faked — mirror the amendment send-notice gate.
      return res.status(422).json({
        error: 'Claim is not payout-ready',
        missing: readiness.missing,
        readiness,
      });
    }
    const claim = await setClaimPayoutReady(req.params.id);
    await audit(req, claim, 'payout_ready');
    res.json({ message: 'Claim marked payout-ready', claim: withPayoutReadiness(claim) });
  } catch (error) {
    console.error('Mark payout-ready error:', error);
    res.status(500).json({ error: 'Failed to mark claim payout-ready' });
  }
};

export const exportClaimsController = async (req, res) => {
  try {
    const { status, partnerId, contractId } = req.query;
    const claims = await getAllClaims({ status, partnerId, contractId });
    const csv = toCsv(claims, [
      { key: 'id' }, { key: 'partner_name', header: 'partner' }, { key: 'contract_title', header: 'contract' },
      { key: 'basis' }, { key: 'claimed_amount' }, { key: 'approved_amount' }, { key: 'currency' },
      { key: 'status' }, { key: 'bank_verified' }, { key: 'tax_verified' }, { key: 'payout_ready' },
      { key: 'created_at' },
    ]);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="claims.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Export claims error:', error);
    res.status(500).json({ error: 'Failed to export claims' });
  }
};

export const getClaimStatsController = async (req, res) => {
  try {
    const stats = await getClaimStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get claim stats error:', error);
    res.status(500).json({ error: 'Failed to get claim stats' });
  }
};
