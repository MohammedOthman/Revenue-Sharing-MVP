import api from './api';

const kpiService = {
  getAll: async (params = {}) => {
    const response = await api.get('/kpis', { params });
    return response.data.kpis;
  },

  getById: async (id) => {
    const response = await api.get(`/kpis/${id}`);
    return response.data.kpi;
  },

  create: async (kpiData) => {
    const response = await api.post('/kpis', kpiData);
    return response.data.kpi;
  },

  update: async (id, kpiData) => {
    const response = await api.put(`/kpis/${id}`, kpiData);
    return response.data.kpi;
  },

  delete: async (id) => {
    const response = await api.delete(`/kpis/${id}`);
    return response.data;
  },

  getByContract: async (contractId) => {
    const response = await api.get(`/kpis/contract/${contractId}`);
    return response.data.kpis;
  },

  updateValue: async (id, value) => {
    const response = await api.patch(`/kpis/${id}/value`, { value });
    return response.data.kpi;
  },
};

export default kpiService;
