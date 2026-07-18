import api from './api';

const claimService = {
  getAll: async () => {
    const response = await api.get('/claims');
    return response.data.claims;
  },

  getById: async (id) => {
    const response = await api.get(`/claims/${id}`);
    return response.data.claim;
  },

  create: async (data) => {
    const response = await api.post('/claims', data);
    return response.data.claim;
  },

  update: async (id, data) => {
    const response = await api.put(`/claims/${id}`, data);
    return response.data.claim;
  },

  delete: async (id) => {
    const response = await api.delete(`/claims/${id}`);
    return response.data;
  },

  review: async (id) => {
    const response = await api.post(`/claims/${id}/review`);
    return response.data.claim;
  },

  // Amounts are server-controlled: approve records approved_amount (defaults to
  // the claimed amount when omitted). No money moves.
  approve: async (id, approvedAmount, note) => {
    const response = await api.post(`/claims/${id}/approve`, { approvedAmount, note });
    return response.data.claim;
  },

  reject: async (id, note) => {
    const response = await api.post(`/claims/${id}/reject`, { note });
    return response.data.claim;
  },

  // Payout-readiness (FR-04): record verification and the payout-ready milestone.
  // No money moves; mark-payout-ready is blocked (422) until approved + verified.
  verifyBank: async (id, verified = true) => {
    const response = await api.post(`/claims/${id}/verify-bank`, { verified });
    return response.data.claim;
  },

  verifyTax: async (id, verified = true) => {
    const response = await api.post(`/claims/${id}/verify-tax`, { verified });
    return response.data.claim;
  },

  markPayoutReady: async (id) => {
    const response = await api.post(`/claims/${id}/mark-payout-ready`);
    return response.data.claim;
  },
};

export default claimService;
