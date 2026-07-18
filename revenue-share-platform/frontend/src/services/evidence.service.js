import api from './api';

// Evidence items are metadata records (a link, an email reference, a note); the
// platform stores no files. A finalized pack is read-only.
const evidenceService = {
  // --- items ---
  getItems: async (params) => {
    const response = await api.get('/evidence/items', { params });
    return response.data.items;
  },

  createItem: async (data) => {
    const response = await api.post('/evidence/items', data);
    return response.data.item;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/evidence/items/${id}`);
    return response.data;
  },

  // --- packs ---
  getPacks: async () => {
    const response = await api.get('/evidence/packs');
    return response.data.packs;
  },

  getPack: async (id) => {
    const response = await api.get(`/evidence/packs/${id}`);
    return response.data.pack;
  },

  createPack: async (data) => {
    const response = await api.post('/evidence/packs', data);
    return response.data.pack;
  },

  deletePack: async (id) => {
    const response = await api.delete(`/evidence/packs/${id}`);
    return response.data;
  },

  addItemToPack: async (packId, body) => {
    const response = await api.post(`/evidence/packs/${packId}/items`, body);
    return response.data;
  },

  // draft -> finalized; read-only afterwards.
  finalizePack: async (id) => {
    const response = await api.post(`/evidence/packs/${id}/finalize`);
    return response.data.pack;
  },
};

export default evidenceService;
