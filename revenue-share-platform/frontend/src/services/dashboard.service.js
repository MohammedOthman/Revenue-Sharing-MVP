import api from './api';

const dashboardService = {
  getOverview: async () => {
    const response = await api.get('/dashboard/overview');
    return response.data.overview;
  },

  getRevenueTrends: async (periodType = 'month') => {
    const response = await api.get(`/dashboard/revenue-trends?periodType=${periodType}`);
    return response.data.trends;
  },

  getTopPartners: async (limit = 5) => {
    const response = await api.get(`/dashboard/top-partners?limit=${limit}`);
    return response.data;
  },
};

export default dashboardService;
