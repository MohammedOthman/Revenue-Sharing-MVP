import api from './api';

const partnerService = {
  getAll: async (params = {}) => {
    const response = await api.get('/partners', { params });
    return response.data.partners;
  },

  getById: async (id) => {
    const response = await api.get(`/partners/${id}`);
    return response.data.partner;
  },

  create: async (partnerData) => {
    const response = await api.post('/partners', partnerData);
    return response.data.partner;
  },

  update: async (id, partnerData) => {
    const response = await api.put(`/partners/${id}`, partnerData);
    return response.data.partner;
  },

  delete: async (id) => {
    const response = await api.delete(`/partners/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/partners/stats');
    return response.data.stats;
  },
};

export default partnerService;
