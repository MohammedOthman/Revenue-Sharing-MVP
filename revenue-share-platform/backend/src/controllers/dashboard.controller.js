import { 
  getPartnerStats 
} from '../models/partner.model.js';
import { 
  getContractStats 
} from '../models/contract.model.js';
import { 
  getRevenueStats, getRevenueByPeriod 
} from '../models/revenue.model.js';
import { 
  getKPIStats 
} from '../models/kpi.model.js';
import { 
  getLegalDocumentStats 
} from '../models/legalDocument.model.js';

export const getDashboardOverview = async (req, res) => {
  try {
    const [partnerStats, contractStats, revenueStats, kpiStats, legalDocStats] = await Promise.all([
      getPartnerStats(),
      getContractStats(),
      getRevenueStats(),
      getKPIStats(),
      getLegalDocumentStats()
    ]);

    res.json({
      overview: {
        partners: partnerStats,
        contracts: contractStats,
        revenue: revenueStats,
        kpis: kpiStats,
        legalDocuments: legalDocStats
      }
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
    const { limit = 5 } = req.query;
    // This would require a more complex query joining revenue_shares with partners
    // For now, returning a simplified version
    res.json({ 
      message: 'Top performing partners endpoint - implement custom query based on your needs',
      topPartners: [] 
    });
  } catch (error) {
    console.error('Get top performing partners error:', error);
    res.status(500).json({ error: 'Failed to get top performing partners' });
  }
};
