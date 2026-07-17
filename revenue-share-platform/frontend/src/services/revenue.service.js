import api from './api';

const revenueService = {
  getAll: async () => {
    const response = await api.get('/revenue');
    return response.data.revenueShares;
  },

  getById: async (id) => {
    const response = await api.get(`/revenue/${id}`);
    return response.data.revenueShare;
  },

  create: async (revenueData) => {
    const response = await api.post('/revenue', revenueData);
    return response.data.revenueShare;
  },

  update: async (id, revenueData) => {
    const response = await api.put(`/revenue/${id}`, revenueData);
    return response.data.revenueShare;
  },

  delete: async (id) => {
    const response = await api.delete(`/revenue/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/revenue/stats');
    return response.data.stats;
  },
};

export default revenueService;
