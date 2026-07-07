import api from './api';

const legalDocumentService = {
  getAll: async (params = {}) => {
    const response = await api.get('/legal-documents', { params });
    return response.data.documents;
  },

  getById: async (id) => {
    const response = await api.get(`/legal-documents/${id}`);
    return response.data.document;
  },

  create: async (documentData) => {
    const response = await api.post('/legal-documents', documentData);
    return response.data.document;
  },

  update: async (id, documentData) => {
    const response = await api.put(`/legal-documents/${id}`, documentData);
    return response.data.document;
  },

  delete: async (id) => {
    const response = await api.delete(`/legal-documents/${id}`);
    return response.data;
  },

  getByContract: async (contractId) => {
    const response = await api.get(`/legal-documents/contract/${contractId}`);
    return response.data.documents;
  },
};

export default legalDocumentService;
