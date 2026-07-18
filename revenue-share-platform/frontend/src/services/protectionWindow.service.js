import api from './api';

const protectionWindowService = {
  getAll: async () => {
    const response = await api.get('/protection-windows');
    return response.data.windows;
  },

  getById: async (id) => {
    const response = await api.get(`/protection-windows/${id}`);
    return response.data.window;
  },

  create: async (data) => {
    const response = await api.post('/protection-windows', data);
    return response.data.window;
  },

  update: async (id, data) => {
    const response = await api.put(`/protection-windows/${id}`, data);
    return response.data.window;
  },

  delete: async (id) => {
    const response = await api.delete(`/protection-windows/${id}`);
    return response.data;
  },

  // A released window is terminal and can no longer be edited.
  release: async (id) => {
    const response = await api.post(`/protection-windows/${id}/release`);
    return response.data.window;
  },
};

export default protectionWindowService;
