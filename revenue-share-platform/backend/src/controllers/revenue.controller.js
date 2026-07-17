import {
  createRevenueShare, findRevenueShareById, getAllRevenueShares,
  updateRevenueShare, deleteRevenueShare, getRevenueStats, getRevenueByPeriod,
  calculateShareAmount,
} from '../models/revenue.model.js';
import { safeAudit } from '../models/audit.model.js';

const audit = (req, entityId, action, metadata = {}) => safeAudit({
  tenantId: req.tenantId, actorUserId: req.user?.id,
  entityType: 'revenue_share', entityId, action, metadata,
});

export const createRevenueShareController = async (req, res) => {
  try {
    const { contractId, periodStart, periodEnd, totalRevenue, sharePercentage, notes } = req.body;

    if (!contractId || !periodStart || !periodEnd || totalRevenue === undefined || sharePercentage === undefined) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Share amount is derived server-side, not taken from the request.
    const revenueShare = await createRevenueShare({
      contractId, periodStart, periodEnd, totalRevenue, sharePercentage, notes,
    });

    await audit(req, revenueShare.id, 'created', { share_amount: revenueShare.share_amount });
    res.status(201).json({ message: 'Revenue share record created successfully', revenueShare });
  } catch (error) {
    console.error('Create revenue share error:', error);
    res.status(500).json({ error: 'Failed to create revenue share record' });
  }
};

export const getAllRevenueSharesController = async (req, res) => {
  try {
    const { status, contractId } = req.query;
    const revenueShares = await getAllRevenueShares({ status, contractId });
    res.json({ revenueShares });
  } catch (error) {
    console.error('Get all revenue shares error:', error);
    res.status(500).json({ error: 'Failed to get revenue shares' });
  }
};

export const getRevenueShareController = async (req, res) => {
  try {
    const { id } = req.params;
    const revenueShare = await findRevenueShareById(id);
    
    if (!revenueShare) {
      return res.status(404).json({ error: 'Revenue share record not found' });
    }
    
    res.json({ revenueShare });
  } catch (error) {
    console.error('Get revenue share error:', error);
    res.status(500).json({ error: 'Failed to get revenue share record' });
  }
};

export const updateRevenueShareController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // If revenue or percentage changes, recompute the share amount server-side
    // from the merged values so it can never be set directly by the client.
    if (updates.totalRevenue !== undefined || updates.sharePercentage !== undefined) {
      const existing = await findRevenueShareById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Revenue share record not found' });
      }
      const total = updates.totalRevenue ?? existing.total_revenue;
      const pct = updates.sharePercentage ?? existing.share_percentage;
      updates.shareAmount = calculateShareAmount(total, pct);
    } else {
      // Never allow a direct share-amount override on update.
      delete updates.shareAmount;
      delete updates.share_amount;
    }

    const revenueShare = await updateRevenueShare(id, updates);
    if (!revenueShare) {
      return res.status(404).json({ error: 'Revenue share record not found or no updates provided' });
    }

    await audit(req, revenueShare.id, 'updated', { share_amount: revenueShare.share_amount });
    res.json({ message: 'Revenue share record updated successfully', revenueShare });
  } catch (error) {
    console.error('Update revenue share error:', error);
    res.status(500).json({ error: 'Failed to update revenue share record' });
  }
};

export const deleteRevenueShareController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRevenueShare(id);
    await audit(req, Number(id), 'deleted');
    res.json({ message: 'Revenue share record deleted successfully' });
  } catch (error) {
    console.error('Delete revenue share error:', error);
    res.status(500).json({ error: 'Failed to delete revenue share record' });
  }
};

export const getRevenueStatsController = async (req, res) => {
  try {
    const stats = await getRevenueStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get revenue stats error:', error);
    res.status(500).json({ error: 'Failed to get revenue stats' });
  }
};

export const getRevenueByPeriodController = async (req, res) => {
  try {
    const { periodType } = req.query;
    const data = await getRevenueByPeriod(periodType || 'month');
    res.json({ data });
  } catch (error) {
    console.error('Get revenue by period error:', error);
    res.status(500).json({ error: 'Failed to get revenue by period' });
  }
};
