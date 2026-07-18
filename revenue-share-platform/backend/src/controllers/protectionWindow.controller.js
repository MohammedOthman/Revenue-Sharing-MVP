import {
  createProtectionWindow, findProtectionWindowById, getAllProtectionWindows,
  updateProtectionWindow, releaseProtectionWindow, deleteProtectionWindow,
  getProtectionWindowStats, withEffectiveStatus, canEdit,
} from '../models/protectionWindow.model.js';
import { safeAudit } from '../models/audit.model.js';

const audit = (req, row, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'protection_window',
  entityId: row?.id,
  action,
  metadata: { status: row?.status, ...metadata },
});

export const createProtectionWindowController = async (req, res) => {
  try {
    if (!req.body.partnerId) return res.status(400).json({ error: 'Partner is required' });
    const row = await createProtectionWindow({ ...req.body, tenantId: req.tenantId, createdBy: req.user.id });
    await audit(req, row, 'created');
    res.status(201).json({ message: 'Protection window created', window: withEffectiveStatus(row) });
  } catch (error) {
    console.error('Create protection window error:', error);
    res.status(500).json({ error: 'Failed to create protection window' });
  }
};

export const getAllProtectionWindowsController = async (req, res) => {
  try {
    const { status, partnerId, contractId } = req.query;
    const rows = await getAllProtectionWindows({ status, partnerId, contractId });
    res.json({ windows: rows.map(withEffectiveStatus) });
  } catch (error) {
    console.error('Get protection windows error:', error);
    res.status(500).json({ error: 'Failed to get protection windows' });
  }
};

export const getProtectionWindowController = async (req, res) => {
  try {
    const row = await findProtectionWindowById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Protection window not found' });
    res.json({ window: withEffectiveStatus(row) });
  } catch (error) {
    console.error('Get protection window error:', error);
    res.status(500).json({ error: 'Failed to get protection window' });
  }
};

export const updateProtectionWindowController = async (req, res) => {
  try {
    const existing = await findProtectionWindowById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Protection window not found' });
    if (!canEdit(existing.status)) {
      return res.status(409).json({ error: 'A released protection window can no longer be edited' });
    }
    const row = await updateProtectionWindow(req.params.id, req.body);
    await audit(req, row, 'updated');
    res.json({ message: 'Protection window updated', window: withEffectiveStatus(row) });
  } catch (error) {
    console.error('Update protection window error:', error);
    res.status(500).json({ error: 'Failed to update protection window' });
  }
};

export const releaseProtectionWindowController = async (req, res) => {
  try {
    const existing = await findProtectionWindowById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Protection window not found' });
    if (existing.status === 'released') {
      return res.status(409).json({ error: 'Protection window is already released' });
    }
    const row = await releaseProtectionWindow(req.params.id);
    await audit(req, row, 'released');
    res.json({ message: 'Protection window released', window: withEffectiveStatus(row) });
  } catch (error) {
    console.error('Release protection window error:', error);
    res.status(500).json({ error: 'Failed to release protection window' });
  }
};

export const deleteProtectionWindowController = async (req, res) => {
  try {
    await deleteProtectionWindow(req.params.id);
    await safeAudit({
      tenantId: req.tenantId, actorUserId: req.user?.id,
      entityType: 'protection_window', entityId: Number(req.params.id), action: 'deleted',
    });
    res.json({ message: 'Protection window deleted' });
  } catch (error) {
    console.error('Delete protection window error:', error);
    res.status(500).json({ error: 'Failed to delete protection window' });
  }
};

export const getProtectionWindowStatsController = async (req, res) => {
  try {
    const stats = await getProtectionWindowStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get protection window stats error:', error);
    res.status(500).json({ error: 'Failed to get protection window stats' });
  }
};
