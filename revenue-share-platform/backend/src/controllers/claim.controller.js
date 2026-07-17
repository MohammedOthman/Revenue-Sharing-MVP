import {
  createClaim, findClaimById, getAllClaims, updateClaim,
  setClaimStatus, deleteClaim, getClaimStats, canTransition, isTerminal,
} from '../models/claim.model.js';
import { safeAudit } from '../models/audit.model.js';

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
    res.status(201).json({ message: 'Claim submitted', claim });
  } catch (error) {
    console.error('Create claim error:', error);
    res.status(500).json({ error: 'Failed to create claim' });
  }
};

export const getAllClaimsController = async (req, res) => {
  try {
    const { status, partnerId, contractId } = req.query;
    const claims = await getAllClaims({ status, partnerId, contractId });
    res.json({ claims });
  } catch (error) {
    console.error('Get claims error:', error);
    res.status(500).json({ error: 'Failed to get claims' });
  }
};

export const getClaimController = async (req, res) => {
  try {
    const claim = await findClaimById(req.params.id);
    if (!claim) return res.status(404).json({ error: 'Claim not found' });
    res.json({ claim });
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
    res.json({ message: 'Claim updated', claim });
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
    res.json({ message: `Claim ${action}`, claim });
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
    res.json({ message: 'Claim approved', claim });
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
    res.json({ message: 'Claim rejected', claim });
  } catch (error) {
    console.error('Reject claim error:', error);
    res.status(500).json({ error: 'Failed to reject claim' });
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
