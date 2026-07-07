import {
  createRevenueShare, findRevenueShareById, getAllRevenueShares,
  updateRevenueShare, deleteRevenueShare, getRevenueStats, getRevenueByPeriod,
} from '../models/revenue.model.js';
import { findContractById } from '../models/contract.model.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';

const round2 = (n) => Math.round(n * 100) / 100;

export const createRevenueShareController = async (req, res) => {
  try {
    const { contractId, periodStart, periodEnd, totalRevenue, notes } = req.body;

    const contract = await findContractById(contractId);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // The share is computed server-side from the contract terms; a caller may
    // override the percentage explicitly, but the amount always derives from it.
    const sharePercentage =
      req.body.sharePercentage !== undefined && req.body.sharePercentage !== null
        ? Number(req.body.sharePercentage)
        : Number(contract.revenue_share_percentage);
    const computedAmount = round2((Number(totalRevenue) * sharePercentage) / 100);

    if (
      req.body.shareAmount !== undefined &&
      req.body.shareAmount !== null &&
      Math.abs(Number(req.body.shareAmount) - computedAmount) > 0.05
    ) {
      return res.status(400).json({
        error: `shareAmount ${req.body.shareAmount} does not match ${sharePercentage}% of ${totalRevenue} (expected ${computedAmount})`,
      });
    }

    const revenueShare = await createRevenueShare({
      contractId, periodStart, periodEnd, totalRevenue,
      sharePercentage, shareAmount: computedAmount, notes,
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

export const getRevenueSharesByContractController = async (req, res) => {
  try {
    const revenueShares = await getAllRevenueShares({ contractId: req.params.contractId });
    res.json({ revenueShares });
  } catch (error) {
    console.error('Get revenue shares by contract error:', error);
    res.status(500).json({ error: 'Failed to get revenue shares' });
  }
};

export const getPendingPaymentsController = async (req, res) => {
  try {
    const revenueShares = await getAllRevenueShares({ status: 'pending' });
    res.json({ revenueShares });
  } catch (error) {
    console.error('Get pending payments error:', error);
    res.status(500).json({ error: 'Failed to get pending payments' });
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
    const updates = toSnakeCaseKeys(req.body);

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

export const processPaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await findRevenueShareById(id);

    if (!existing) {
      return res.status(404).json({ error: 'Revenue share record not found' });
    }
    if (existing.status === 'paid') {
      return res.status(400).json({ error: 'This revenue share has already been paid' });
    }

    const revenueShare = await updateRevenueShare(id, {
      status: 'paid',
      paid_at: new Date(),
    });

    res.json({ message: 'Payment processed successfully', revenueShare });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
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

const csvEscape = (value) => {
  const s = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Settlement statement export — the sheet you hand a partner when they ask
// "show me how you got this number."
export const exportRevenueSharesController = async (req, res) => {
  try {
    const { status, contractId, partnerId, from, to } = req.query;
    const rows = await getAllRevenueShares({ status, contractId, partnerId, from, to });

    const header = [
      'Partner', 'Contract', 'Period Start', 'Period End',
      'Total Revenue', 'Share %', 'Share Amount', 'Status', 'Paid At', 'Notes',
    ];
    const lines = rows.map((r) => [
      r.partner_name, r.contract_title,
      r.period_start ? String(r.period_start).slice(0, 10) : (r.period_start ?? ''),
      r.period_end ? String(r.period_end).slice(0, 10) : (r.period_end ?? ''),
      r.total_revenue, r.share_percentage, r.share_amount, r.status,
      r.paid_at ? new Date(r.paid_at).toISOString().slice(0, 10) : '',
      r.notes,
    ].map(csvEscape).join(','));

    const csv = [header.join(','), ...lines].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="revenue-share-statement.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Export revenue shares error:', error);
    res.status(500).json({ error: 'Failed to export revenue shares' });
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
