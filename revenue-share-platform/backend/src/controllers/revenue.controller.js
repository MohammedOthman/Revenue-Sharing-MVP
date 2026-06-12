import { 
  createRevenueShare, findRevenueShareById, getAllRevenueShares, 
  updateRevenueShare, deleteRevenueShare, getRevenueStats, getRevenueByPeriod 
} from '../models/revenue.model.js';

export const createRevenueShareController = async (req, res) => {
  try {
    const { contractId, periodStart, periodEnd, totalRevenue, sharePercentage, shareAmount, notes } = req.body;

    if (!contractId || !periodStart || !periodEnd || !totalRevenue || !sharePercentage || !shareAmount) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const revenueShare = await createRevenueShare({ 
      contractId, periodStart, periodEnd, totalRevenue, sharePercentage, shareAmount, notes 
    });
    
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
    const updates = req.body;

    const revenueShare = await updateRevenueShare(id, updates);
    if (!revenueShare) {
      return res.status(404).json({ error: 'Revenue share record not found or no updates provided' });
    }

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
