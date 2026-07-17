import {
  createEvidenceItem, findEvidenceItemById, getAllEvidenceItems, getEvidenceItemsByPack,
  updateEvidenceItem, setEvidenceItemPack, deleteEvidenceItem, hasAttachment,
} from '../models/evidenceItem.model.js';
import {
  createEvidencePack, findEvidencePackById, findEvidencePackWithItems, getAllEvidencePacks,
  updateEvidencePack, finalizeEvidencePack, deleteEvidencePack, getEvidencePackStats,
  canModifyPack, canFinalizePack,
} from '../models/evidencePack.model.js';
import { safeAudit } from '../models/audit.model.js';

const auditItem = (req, row, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'evidence_item',
  entityId: row?.id,
  action,
  metadata: { pack_id: row?.pack_id, ...metadata },
});

const auditPack = (req, row, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId,
  actorUserId: req.user?.id,
  entityType: 'evidence_pack',
  entityId: row?.id,
  action,
  metadata: { status: row?.status, ...metadata },
});

// --- Evidence items ---

export const createEvidenceItemController = async (req, res) => {
  try {
    const { claimId, amendmentId, packId } = req.body;
    if (!hasAttachment({ claimId, amendmentId, packId })) {
      return res.status(400).json({ error: 'Evidence must attach to a claim, an amendment, or a pack' });
    }
    if (packId) {
      const pack = await findEvidencePackById(packId);
      if (!pack) return res.status(404).json({ error: 'Evidence pack not found' });
      if (!canModifyPack(pack.status)) {
        return res.status(409).json({ error: 'A finalized evidence pack can no longer receive items' });
      }
    }
    const row = await createEvidenceItem({ ...req.body, tenantId: req.tenantId, addedBy: req.user.id });
    await auditItem(req, row, 'created');
    res.status(201).json({ message: 'Evidence item created', item: row });
  } catch (error) {
    console.error('Create evidence item error:', error);
    res.status(500).json({ error: 'Failed to create evidence item' });
  }
};

export const getAllEvidenceItemsController = async (req, res) => {
  try {
    const { claimId, amendmentId, packId, type } = req.query;
    const items = await getAllEvidenceItems({ claimId, amendmentId, packId, type });
    res.json({ items });
  } catch (error) {
    console.error('Get evidence items error:', error);
    res.status(500).json({ error: 'Failed to get evidence items' });
  }
};

export const getEvidenceItemController = async (req, res) => {
  try {
    const item = await findEvidenceItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Evidence item not found' });
    res.json({ item });
  } catch (error) {
    console.error('Get evidence item error:', error);
    res.status(500).json({ error: 'Failed to get evidence item' });
  }
};

export const updateEvidenceItemController = async (req, res) => {
  try {
    const existing = await findEvidenceItemById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Evidence item not found' });
    if (existing.pack_status === 'finalized') {
      return res.status(409).json({ error: 'This item is inside a finalized pack and can no longer be edited' });
    }
    const row = await updateEvidenceItem(req.params.id, req.body);
    await auditItem(req, row, 'updated');
    res.json({ message: 'Evidence item updated', item: row });
  } catch (error) {
    console.error('Update evidence item error:', error);
    res.status(500).json({ error: 'Failed to update evidence item' });
  }
};

export const deleteEvidenceItemController = async (req, res) => {
  try {
    const existing = await findEvidenceItemById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Evidence item not found' });
    if (existing.pack_status === 'finalized') {
      return res.status(409).json({ error: 'This item is inside a finalized pack and can no longer be removed' });
    }
    await deleteEvidenceItem(req.params.id);
    await safeAudit({
      tenantId: req.tenantId, actorUserId: req.user?.id,
      entityType: 'evidence_item', entityId: Number(req.params.id), action: 'deleted',
    });
    res.json({ message: 'Evidence item deleted' });
  } catch (error) {
    console.error('Delete evidence item error:', error);
    res.status(500).json({ error: 'Failed to delete evidence item' });
  }
};

// --- Evidence packs ---

export const createEvidencePackController = async (req, res) => {
  try {
    const row = await createEvidencePack({ ...req.body, tenantId: req.tenantId, createdBy: req.user.id });
    await auditPack(req, row, 'created');
    res.status(201).json({ message: 'Evidence pack created', pack: row });
  } catch (error) {
    console.error('Create evidence pack error:', error);
    res.status(500).json({ error: 'Failed to create evidence pack' });
  }
};

export const getAllEvidencePacksController = async (req, res) => {
  try {
    const { status, claimId } = req.query;
    const packs = await getAllEvidencePacks({ status, claimId });
    res.json({ packs });
  } catch (error) {
    console.error('Get evidence packs error:', error);
    res.status(500).json({ error: 'Failed to get evidence packs' });
  }
};

export const getEvidencePackController = async (req, res) => {
  try {
    const pack = await findEvidencePackWithItems(req.params.id);
    if (!pack) return res.status(404).json({ error: 'Evidence pack not found' });
    res.json({ pack });
  } catch (error) {
    console.error('Get evidence pack error:', error);
    res.status(500).json({ error: 'Failed to get evidence pack' });
  }
};

export const updateEvidencePackController = async (req, res) => {
  try {
    const existing = await findEvidencePackById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Evidence pack not found' });
    if (!canModifyPack(existing.status)) {
      return res.status(409).json({ error: 'A finalized evidence pack can no longer be edited' });
    }
    const row = await updateEvidencePack(req.params.id, req.body);
    await auditPack(req, row, 'updated');
    res.json({ message: 'Evidence pack updated', pack: row });
  } catch (error) {
    console.error('Update evidence pack error:', error);
    res.status(500).json({ error: 'Failed to update evidence pack' });
  }
};

export const listPackItemsController = async (req, res) => {
  try {
    const pack = await findEvidencePackById(req.params.id);
    if (!pack) return res.status(404).json({ error: 'Evidence pack not found' });
    const items = await getEvidenceItemsByPack(req.params.id);
    res.json({ items });
  } catch (error) {
    console.error('List pack items error:', error);
    res.status(500).json({ error: 'Failed to list pack items' });
  }
};

// Add an item to a pack: either attach an existing item ({ itemId }) or create
// a new one inline (item fields). Blocked once the pack is finalized.
export const addItemToPackController = async (req, res) => {
  try {
    const pack = await findEvidencePackById(req.params.id);
    if (!pack) return res.status(404).json({ error: 'Evidence pack not found' });
    if (!canModifyPack(pack.status)) {
      return res.status(409).json({ error: 'A finalized evidence pack can no longer receive items' });
    }

    if (req.body.itemId) {
      const item = await findEvidenceItemById(req.body.itemId);
      if (!item) return res.status(404).json({ error: 'Evidence item not found' });
      if (item.pack_status === 'finalized') {
        return res.status(409).json({ error: 'This item is already in a finalized pack' });
      }
      const row = await setEvidenceItemPack(req.body.itemId, pack.id);
      await auditItem(req, row, 'attached_to_pack', { pack_id: pack.id });
      return res.json({ message: 'Evidence item added to pack', item: row });
    }

    if (!req.body.name) {
      return res.status(400).json({ error: 'Provide itemId to attach an existing item, or name to create a new one' });
    }
    const row = await createEvidenceItem({
      ...req.body, packId: pack.id, tenantId: req.tenantId, addedBy: req.user.id,
    });
    await auditItem(req, row, 'created', { pack_id: pack.id });
    res.status(201).json({ message: 'Evidence item created in pack', item: row });
  } catch (error) {
    console.error('Add item to pack error:', error);
    res.status(500).json({ error: 'Failed to add item to pack' });
  }
};

export const finalizeEvidencePackController = async (req, res) => {
  try {
    const existing = await findEvidencePackById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Evidence pack not found' });
    if (!canFinalizePack(existing.status)) {
      return res.status(409).json({ error: 'Evidence pack is already finalized' });
    }
    const row = await finalizeEvidencePack(req.params.id);
    await auditPack(req, row, 'finalized', { item_count: existing.item_count });
    res.json({ message: 'Evidence pack finalized', pack: row });
  } catch (error) {
    console.error('Finalize evidence pack error:', error);
    res.status(500).json({ error: 'Failed to finalize evidence pack' });
  }
};

export const deleteEvidencePackController = async (req, res) => {
  try {
    await deleteEvidencePack(req.params.id);
    await safeAudit({
      tenantId: req.tenantId, actorUserId: req.user?.id,
      entityType: 'evidence_pack', entityId: Number(req.params.id), action: 'deleted',
    });
    res.json({ message: 'Evidence pack deleted' });
  } catch (error) {
    console.error('Delete evidence pack error:', error);
    res.status(500).json({ error: 'Failed to delete evidence pack' });
  }
};

export const getEvidencePackStatsController = async (req, res) => {
  try {
    const stats = await getEvidencePackStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get evidence pack stats error:', error);
    res.status(500).json({ error: 'Failed to get evidence pack stats' });
  }
};
