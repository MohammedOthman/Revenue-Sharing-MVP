import api from './api';

const partnerService = {
  getAll: async () => {
    const response = await api.get('/partners');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/partners/${id}`);
    return response.data;
  },

  create: async (partnerData) => {
    const response = await api.post('/partners', partnerData);
    return response.data;
  },

  update: async (id, partnerData) => {
    const response = await api.put(`/partners/${id}`, partnerData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/partners/${id}`);
    return response.data;
  },
};

export default partnerService;
