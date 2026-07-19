import axios from 'axios';

// Reven API. Same-origin '/api/reven' works for the single-service deploy and the
// Vite dev proxy; VITE_API_URL overrides the origin for split hosting.
const base = (import.meta.env.VITE_API_URL || '') + '/api/reven';

const api = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('reven_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const data = (p) => p.then((r) => r.data);

export const reven = {
  onboard: (body) => data(api.post('/auth/onboard', body)),
  login: (body) => data(api.post('/auth/login', body)),

  listClaims: () => data(api.get('/claims')).then((d) => d.claims),
  getClaim: (id) => data(api.get(`/claims/${id}`)),
  registerClaim: (body) => data(api.post('/claims', body)),
  decideAttribution: (id, body) => data(api.post(`/claims/${id}/attribution`, body)),
  recordRevenue: (id, body) => data(api.post(`/claims/${id}/revenue`, body)),
  evaluateEligibility: (id) => data(api.post(`/claims/${id}/eligibility`)),
  recordPayment: (id, body) => data(api.post(`/claims/${id}/payment`, body)),

  listPartners: () => data(api.get('/partners')).then((d) => d.partners),
  createPartner: (body) => data(api.post('/partners', body)),
  verifyPartner: (id, body) => data(api.post(`/partners/${id}/readiness`, body)),

  listAgreements: () => data(api.get('/agreements')).then((d) => d.agreements),
  createAgreement: (body) => data(api.post('/agreements', body)),

  metrics: () => data(api.get('/metrics')),
};

export default api;
