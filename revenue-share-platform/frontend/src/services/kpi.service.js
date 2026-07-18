import api from './api';

const kpiService = {
  getAll: async () => {
    const response = await api.get('/kpis');
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
};

export default kpiService;
