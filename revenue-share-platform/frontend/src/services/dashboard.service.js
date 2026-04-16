import api from './api';

const dashboardService = {
  getOverview: async () => {
    const response = await api.get('/dashboard/overview');
    return response.data;
  },

  getRevenueTrends: async (period = '30') => {
    const response = await api.get(`/dashboard/analytics/trends?period=${period}`);
    return response.data;
  },

  getPartnerPerformance: async () => {
    const response = await api.get('/dashboard/analytics/partner-performance');
    return response.data;
  },

  getContractStatus: async () => {
    const response = await api.get('/dashboard/analytics/contract-status');
    return response.data;
  },
};

export default dashboardService;
