import api from './api';

const contractService = {
  getAll: async () => {
    const response = await api.get('/contracts');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },

  create: async (contractData) => {
    const response = await api.post('/contracts', contractData);
    return response.data;
  },

  update: async (id, contractData) => {
    const response = await api.put(`/contracts/${id}`, contractData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contracts/${id}`);
    return response.data;
  },

  getByPartner: async (partnerId) => {
    const response = await api.get(`/contracts/partner/${partnerId}`);
    return response.data;
  },
};

export default contractService;
