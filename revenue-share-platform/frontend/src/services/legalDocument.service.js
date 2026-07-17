import api from './api';

// Backend mounts legal documents at /api/documents. In Phase 1 these are
// document metadata / evidence links (no file upload/storage yet).
const legalDocumentService = {
  getAll: async () => {
    const response = await api.get('/documents');
    return response.data.documents;
  },

  getById: async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data.document;
  },

  create: async (documentData) => {
    const response = await api.post('/documents', documentData);
    return response.data.document;
  },

  update: async (id, documentData) => {
    const response = await api.put(`/documents/${id}`, documentData);
    return response.data.document;
  },

  delete: async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
};

export default legalDocumentService;
