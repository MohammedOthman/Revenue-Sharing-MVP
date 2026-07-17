import api from './api';

const amendmentService = {
  getAll: async () => {
    const response = await api.get('/amendments');
    return response.data.amendments;
  },

  getById: async (id) => {
    const response = await api.get(`/amendments/${id}`);
    return response.data.amendment;
  },

  create: async (data) => {
    const response = await api.post('/amendments', data);
    return response.data.amendment;
  },

  update: async (id, data) => {
    const response = await api.put(`/amendments/${id}`, data);
    return response.data.amendment;
  },

  delete: async (id) => {
    const response = await api.delete(`/amendments/${id}`);
    return response.data;
  },

  // Blocked server-side (422) until every readiness requirement is met.
  sendNotice: async (id) => {
    const response = await api.post(`/amendments/${id}/send-notice`);
    return response.data.amendment;
  },

  acknowledge: async (id, note) => {
    const response = await api.post(`/amendments/${id}/acknowledge`, { note });
    return response.data.amendment;
  },
};

export default amendmentService;
