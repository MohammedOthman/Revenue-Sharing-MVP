import api from './api';

const contractService = {
  getAll: async (params = {}) => {
    const response = await api.get('/contracts', { params });
    return response.data.contracts;
  },

  getById: async (id) => {
    const response = await api.get(`/contracts/${id}`);
    return response.data.contract;
  },

  create: async (contractData) => {
    const response = await api.post('/contracts', contractData);
    return response.data.contract;
  },

  update: async (id, contractData) => {
    const response = await api.put(`/contracts/${id}`, contractData);
    return response.data.contract;
  },

  delete: async (id) => {
    const response = await api.delete(`/contracts/${id}`);
    return response.data;
  },

  getByPartner: async (partnerId) => {
    const response = await api.get(`/contracts/partner/${partnerId}`);
    return response.data.contracts;
  },

  getStats: async () => {
    const response = await api.get('/contracts/stats');
    return response.data.stats;
  },
};

export default contractService;
