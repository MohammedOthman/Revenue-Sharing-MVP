import {
  createAmendment, findAmendmentById, getAllAmendments,
  updateAmendment, deleteAmendment, markNotified, markAcknowledged,
  getAmendmentStats, computeReadiness, withReadiness,
} from '../models/amendment.model.js';
import { safeAudit } from '../models/audit.model.js';

// Build a common audit context from the request + amendment.
const auditFor = (req, amendment, action, metadata = {}) => ({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'amendment',
  entityId: amendment?.id,
  action,
  metadata: { contractId: amendment?.contract_id, ...metadata },
});

export const createAmendmentController = async (req, res) => {
  try {
    const { contractId, contract_id } = req.body;
    if (!contractId && !contract_id) {
      return res.status(400).json({ error: 'Contract is required to start an amendment journey' });
    }

    const amendment = await createAmendment({ ...req.body, createdBy: req.user.id });
    await safeAudit(auditFor(req, amendment, 'created'));
    res.status(201).json({
      message: 'Amendment journey created successfully',
      amendment: withReadiness(amendment),
    });
  } catch (error) {
    console.error('Create amendment error:', error);
    res.status(500).json({ error: 'Failed to create amendment journey' });
  }
};

export const getAllAmendmentsController = async (req, res) => {
  try {
    const { status, contractId } = req.query;
    const amendments = await getAllAmendments({ status, contractId });
    res.json({ amendments: amendments.map(withReadiness) });
  } catch (error) {
    console.error('Get all amendments error:', error);
    res.status(500).json({ error: 'Failed to get amendment journeys' });
  }
};

export const getAmendmentController = async (req, res) => {
  try {
    const amendment = await findAmendmentById(req.params.id);
    if (!amendment) {
      return res.status(404).json({ error: 'Amendment journey not found' });
    }
    res.json({ amendment: withReadiness(amendment) });
  } catch (error) {
    console.error('Get amendment error:', error);
    res.status(500).json({ error: 'Failed to get amendment journey' });
  }
};

export const updateAmendmentController = async (req, res) => {
  try {
    const existing = await findAmendmentById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Amendment journey not found' });
    }
    // A sent notice is a fact: block edits once the journey has been notified.
    if (existing.status === 'notified' || existing.status === 'acknowledged') {
      return res.status(409).json({
        error: 'This amendment journey has already been notified and can no longer be edited',
      });
    }

    const amendment = await updateAmendment(req.params.id, req.body);
    await safeAudit(auditFor(req, amendment, 'updated'));
    res.json({
      message: 'Amendment journey updated successfully',
      amendment: withReadiness(amendment),
    });
  } catch (error) {
    console.error('Update amendment error:', error);
    res.status(500).json({ error: 'Failed to update amendment journey' });
  }
};

export const deleteAmendmentController = async (req, res) => {
  try {
    await deleteAmendment(req.params.id);
    await safeAudit({
      tenantId: req.tenantId,
      actorUserId: req.user?.id,
      entityType: 'amendment',
      entityId: Number(req.params.id),
      action: 'deleted',
    });
    res.json({ message: 'Amendment journey deleted successfully' });
  } catch (error) {
    console.error('Delete amendment error:', error);
    res.status(500).json({ error: 'Failed to delete amendment journey' });
  }
};

/**
 * Send the amendment notice. Blocked (422) until every guardrail/readiness
 * requirement passes; the response lists what is missing so the UI can explain
 * exactly why the notice cannot be sent yet.
 */
export const sendNoticeController = async (req, res) => {
  try {
    const amendment = await findAmendmentById(req.params.id);
    if (!amendment) {
      return res.status(404).json({ error: 'Amendment journey not found' });
    }
    if (amendment.status === 'notified' || amendment.status === 'acknowledged') {
      return res.status(409).json({ error: 'Notice has already been sent for this amendment journey' });
    }

    const readiness = computeReadiness(amendment);
    if (!readiness.ready) {
      return res.status(422).json({
        error: 'Notice cannot be sent until all readiness requirements are met',
        missing: readiness.missing,
        readiness,
      });
    }

    const notified = await markNotified(req.params.id);
    await safeAudit(auditFor(req, notified, 'notice_sent', {
      channels: notified.notice_channels,
      noticePeriodDays: notified.notice_period_days,
    }));
    res.json({
      message: 'Amendment notice sent',
      amendment: withReadiness(notified),
    });
  } catch (error) {
    console.error('Send amendment notice error:', error);
    res.status(500).json({ error: 'Failed to send amendment notice' });
  }
};

export const acknowledgeNoticeController = async (req, res) => {
  try {
    const amendment = await findAmendmentById(req.params.id);
    if (!amendment) {
      return res.status(404).json({ error: 'Amendment journey not found' });
    }
    if (amendment.status !== 'notified') {
      return res.status(409).json({ error: 'Only a notified amendment journey can be acknowledged' });
    }

    const acknowledged = await markAcknowledged(req.params.id, req.body?.note);
    await safeAudit(auditFor(req, acknowledged, 'acknowledged'));
    res.json({
      message: 'Amendment notice acknowledged',
      amendment: withReadiness(acknowledged),
    });
  } catch (error) {
    console.error('Acknowledge amendment notice error:', error);
    res.status(500).json({ error: 'Failed to acknowledge amendment notice' });
  }
};

export const getAmendmentStatsController = async (req, res) => {
  try {
    const stats = await getAmendmentStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get amendment stats error:', error);
    res.status(500).json({ error: 'Failed to get amendment stats' });
  }
};
