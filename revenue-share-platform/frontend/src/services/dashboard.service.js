import api from './api';

const dashboardService = {
  getOverview: async () => {
    const response = await api.get('/dashboard/overview');
    return response.data.overview;
  },

  getRevenueTrends: async (periodType = 'month') => {
    const response = await api.get('/dashboard/revenue-trends', { params: { periodType } });
    return response.data.trends;
  },

  getTopPartners: async (limit = 5) => {
    const response = await api.get('/dashboard/top-partners', { params: { limit } });
    return response.data.topPartners;
  },

  getContractStatus: async () => {
    const response = await api.get('/dashboard/analytics/contract-status');
    return response.data.contractStatus;
  },

  getExpiring: async (days = 30) => {
    const response = await api.get('/dashboard/expiring', { params: { days } });
    return response.data.expiring;
  },

  getRecentActivity: async (limit = 10) => {
    const response = await api.get('/dashboard/recent-activity', { params: { limit } });
    return response.data.activity;
  },
};

export default dashboardService;
