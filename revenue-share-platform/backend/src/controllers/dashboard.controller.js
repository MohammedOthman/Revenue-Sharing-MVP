import { getPartnerStats } from '../models/partner.model.js';
import { getContractStats, getExpiringContracts } from '../models/contract.model.js';
import { getRevenueStats, getRevenueByPeriod, getTopPartners } from '../models/revenue.model.js';
import { getKPIStats } from '../models/kpi.model.js';
import { getLegalDocumentStats, getExpiringDocuments } from '../models/legalDocument.model.js';
import { getRecentActivity } from '../models/audit.model.js';

const num = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getDashboardOverview = async (req, res) => {
  try {
    const [partnerStats, contractStats, revenueStats, kpiStats, legalDocStats] = await Promise.all([
      getPartnerStats(),
      getContractStats(),
      getRevenueStats(),
      getKPIStats(),
      getLegalDocumentStats(),
    ]);

    const totalContracts = num(contractStats.total_contracts);
    const pct = (count) => (totalContracts > 0 ? Math.round((num(count) / totalContracts) * 100) : 0);

    res.json({
      overview: {
        // Flat fields consumed by the dashboard UI (numbers, not strings).
        totalPartners: num(partnerStats.total_partners),
        activePartners: num(partnerStats.active_partners),
        totalContracts,
        activeContracts: num(contractStats.active_contracts),
        totalRevenue: num(revenueStats.total_revenue),
        totalShareAmount: num(revenueStats.total_share_amount),
        totalPaidAmount: num(revenueStats.total_paid_amount),
        pendingPayments: num(revenueStats.total_pending_amount),
        contractStatus: {
          active: pct(contractStats.active_contracts),
          pending: pct(contractStats.draft_contracts),
          expired: pct(contractStats.expired_contracts),
        },
        // Full per-module stats for richer clients.
        partners: partnerStats,
        contracts: contractStats,
        revenue: revenueStats,
        kpis: kpiStats,
        legalDocuments: legalDocStats,
      },
    });
  } catch (error) {
    console.error('Get dashboard overview error:', error);
    res.status(500).json({ error: 'Failed to get dashboard overview' });
  }
};

export const getRevenueTrends = async (req, res) => {
  try {
    const { periodType } = req.query;
    const trends = await getRevenueByPeriod(periodType || 'month');
    res.json({ trends });
  } catch (error) {
    console.error('Get revenue trends error:', error);
    res.status(500).json({ error: 'Failed to get revenue trends' });
  }
};

export const getTopPerformingPartners = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 50);
    const topPartners = await getTopPartners(limit);
    res.json({ topPartners });
  } catch (error) {
    console.error('Get top performing partners error:', error);
    res.status(500).json({ error: 'Failed to get top performing partners' });
  }
};

export const getContractStatusBreakdown = async (req, res) => {
  try {
    const stats = await getContractStats();
    const total = num(stats.total_contracts);
    const pct = (count) => (total > 0 ? Math.round((num(count) / total) * 100) : 0);
    res.json({
      contractStatus: {
        total,
        active: num(stats.active_contracts),
        draft: num(stats.draft_contracts),
        expired: num(stats.expired_contracts),
        percentages: {
          active: pct(stats.active_contracts),
          draft: pct(stats.draft_contracts),
          expired: pct(stats.expired_contracts),
        },
      },
    });
  } catch (error) {
    console.error('Get contract status breakdown error:', error);
    res.status(500).json({ error: 'Failed to get contract status breakdown' });
  }
};

// Renewal radar: contracts and documents approaching their end/expiry date.
export const getExpiringController = async (req, res) => {
  try {
    const days = Math.min(parseInt(req.query.days, 10) || 30, 365);
    const [contracts, documents] = await Promise.all([
      getExpiringContracts(days),
      getExpiringDocuments(days),
    ]);
    res.json({ expiring: { days, contracts, documents } });
  } catch (error) {
    console.error('Get expiring error:', error);
    res.status(500).json({ error: 'Failed to get expiring items' });
  }
};

export const getRecentActivityController = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const activity = await getRecentActivity(limit);
    res.json({ activity });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({ error: 'Failed to get recent activity' });
  }
};
