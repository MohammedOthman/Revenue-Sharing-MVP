import api from './api';

const kpiService = {
  getAll: async () => {
    const response = await api.get('/kpis');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/kpis/${id}`);
    return response.data;
  },

  create: async (kpiData) => {
    const response = await api.post('/kpis', kpiData);
    return response.data;
  },

  update: async (id, kpiData) => {
    const response = await api.put(`/kpis/${id}`, kpiData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/kpis/${id}`);
    return response.data;
  },

  getByContract: async (contractId) => {
    const response = await api.get(`/kpis/contract/${contractId}`);
    return response.data;
  },

  updateValue: async (id, value) => {
    const response = await api.patch(`/kpis/${id}/value`, { value });
    return response.data;
  },
};

export default kpiService;
