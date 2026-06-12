import api from './api';

const legalDocumentService = {
  getAll: async () => {
    const response = await api.get('/legal-documents');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/legal-documents/${id}`);
    return response.data;
  },

  create: async (documentData) => {
    const response = await api.post('/legal-documents', documentData);
    return response.data;
  },

  update: async (id, documentData) => {
    const response = await api.put(`/legal-documents/${id}`, documentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/legal-documents/${id}`);
    return response.data;
  },

  getByContract: async (contractId) => {
    const response = await api.get(`/legal-documents/contract/${contractId}`);
    return response.data;
  },

  upload: async (contractId, formData) => {
    const response = await api.post(`/legal-documents/contract/${contractId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default legalDocumentService;
