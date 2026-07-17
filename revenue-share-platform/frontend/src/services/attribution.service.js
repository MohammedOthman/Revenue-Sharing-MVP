import api from './api';

const attributionService = {
  getAll: async () => {
    const response = await api.get('/attributions');
    return response.data.attributions;
  },

  getById: async (id) => {
    const response = await api.get(`/attributions/${id}`);
    return response.data.attribution;
  },

  create: async (data) => {
    const response = await api.post('/attributions', data);
    return response.data.attribution;
  },

  update: async (id, data) => {
    const response = await api.put(`/attributions/${id}`, data);
    return response.data.attribution;
  },

  delete: async (id) => {
    const response = await api.delete(`/attributions/${id}`);
    return response.data;
  },

  // A confirmed attribution of record is final and can no longer be edited.
  confirm: async (id) => {
    const response = await api.post(`/attributions/${id}/confirm`);
    return response.data.attribution;
  },
};

export default attributionService;
