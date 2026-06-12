import api from './api';

const revenueService = {
  getAll: async () => {
    const response = await api.get('/revenue');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/revenue/${id}`);
    return response.data;
  },

  create: async (revenueData) => {
    const response = await api.post('/revenue', revenueData);
    return response.data;
  },

  update: async (id, revenueData) => {
    const response = await api.put(`/revenue/${id}`, revenueData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/revenue/${id}`);
    return response.data;
  },

  getByContract: async (contractId) => {
    const response = await api.get(`/revenue/contract/${contractId}`);
    return response.data;
  },

  getPendingPayments: async () => {
    const response = await api.get('/revenue/pending-payments');
    return response.data;
  },

  processPayment: async (id) => {
    const response = await api.post(`/revenue/${id}/process-payment`);
    return response.data;
  },
};

export default revenueService;
