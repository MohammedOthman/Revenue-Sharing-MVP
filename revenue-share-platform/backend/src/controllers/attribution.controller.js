import {
  createAttribution, findAttributionById, getAllAttributions,
  updateAttribution, confirmAttribution, deleteAttribution,
  getAttributionStats, canEdit, isConfirmed,
} from '../models/attribution.model.js';
import { safeAudit } from '../models/audit.model.js';

const audit = (req, row, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'attribution',
  entityId: row?.id,
  action,
  metadata: { status: row?.status, ...metadata },
});

export const createAttributionController = async (req, res) => {
  try {
    if (!req.body.partnerId) return res.status(400).json({ error: 'Partner is required' });
    const row = await createAttribution({ ...req.body, tenantId: req.tenantId, createdBy: req.user.id });
    await audit(req, row, 'created');
    res.status(201).json({ message: 'Attribution decision created', attribution: row });
  } catch (error) {
    console.error('Create attribution error:', error);
    res.status(500).json({ error: 'Failed to create attribution decision' });
  }
};

export const getAllAttributionsController = async (req, res) => {
  try {
    const { status, claimId, partnerId } = req.query;
    const attributions = await getAllAttributions({ status, claimId, partnerId });
    res.json({ attributions });
  } catch (error) {
    console.error('Get attributions error:', error);
    res.status(500).json({ error: 'Failed to get attribution decisions' });
  }
};

export const getAttributionController = async (req, res) => {
  try {
    const row = await findAttributionById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Attribution decision not found' });
    res.json({ attribution: row });
  } catch (error) {
    console.error('Get attribution error:', error);
    res.status(500).json({ error: 'Failed to get attribution decision' });
  }
};

export const updateAttributionController = async (req, res) => {
  try {
    const existing = await findAttributionById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Attribution decision not found' });
    if (!canEdit(existing.status)) {
      return res.status(409).json({ error: 'A confirmed attribution decision can no longer be edited' });
    }
    const row = await updateAttribution(req.params.id, req.body);
    await audit(req, row, 'updated');
    res.json({ message: 'Attribution decision updated', attribution: row });
  } catch (error) {
    console.error('Update attribution error:', error);
    res.status(500).json({ error: 'Failed to update attribution decision' });
  }
};

export const confirmAttributionController = async (req, res) => {
  try {
    const existing = await findAttributionById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Attribution decision not found' });
    if (isConfirmed(existing.status)) {
      return res.status(409).json({ error: 'Attribution decision is already confirmed' });
    }
    const row = await confirmAttribution(req.params.id, req.user.id);
    await audit(req, row, 'confirmed');
    res.json({ message: 'Attribution decision confirmed', attribution: row });
  } catch (error) {
    console.error('Confirm attribution error:', error);
    res.status(500).json({ error: 'Failed to confirm attribution decision' });
  }
};

export const deleteAttributionController = async (req, res) => {
  try {
    await deleteAttribution(req.params.id);
    await safeAudit({
      tenantId: req.tenantId, actorUserId: req.user?.id,
      entityType: 'attribution', entityId: Number(req.params.id), action: 'deleted',
    });
    res.json({ message: 'Attribution decision deleted' });
  } catch (error) {
    console.error('Delete attribution error:', error);
    res.status(500).json({ error: 'Failed to delete attribution decision' });
  }
};

export const getAttributionStatsController = async (req, res) => {
  try {
    const stats = await getAttributionStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get attribution stats error:', error);
    res.status(500).json({ error: 'Failed to get attribution stats' });
  }
};
