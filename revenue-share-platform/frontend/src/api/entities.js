import { api } from './client';

const entity = (type) => ({
  type,
  list: async (sort = '-created_date', limit = 200) => {
    const { data } = await api.get(`/entities/${type}`, { params: { sort, limit } });
    return data.records;
  },
  filter: async (query, sort = '-created_date', limit = 200) => {
    const { data } = await api.get(`/entities/${type}`, {
      params: { filter: JSON.stringify(query || {}), sort, limit },
    });
    return data.records;
  },
  get: async (id) => {
    const { data } = await api.get(`/entities/${type}/${id}`);
    return data.record;
  },
  create: async (record) => {
    const { data } = await api.post(`/entities/${type}`, record);
    return data.record;
  },
  update: async (id, updates, version) => {
    const { data } = await api.patch(`/entities/${type}/${id}`, { data: updates, version });
    return data.record;
  },
  delete: async (id) => api.delete(`/entities/${type}/${id}`),
  bulkCreate: async (records) => {
    const { data } = await api.post(`/entities/${type}/bulk`, { records });
    return data.records;
  },
});

export const Partner = entity('Partner');
export const PartnerProgram = entity('PartnerProgram');
export const Agreement = entity('Agreement');
const partnerClaim = entity('PartnerClaim');
export const PartnerClaim = {
  ...partnerClaim,
  decideAttribution: async (id, decision) => {
    const { data } = await api.post(`/claims/${id}/attribution`, decision);
    return data.record;
  },
  evaluateEligibility: async (id, version) => {
    const { data } = await api.post(`/claims/${id}/eligibility`, { version });
    return data.record;
  },
  recordRevenue: async (id, evidence) => {
    const { data } = await api.post(`/claims/${id}/revenue`, evidence);
    return data.record;
  },
  recordPayout: async (id, payout) => {
    const { data } = await api.post(`/claims/${id}/payout`, payout);
    return data.record;
  },
  listLedger: async (id) => {
    const { data } = await api.get(`/claims/${id}/ledger`);
    return data.journals;
  },
};
export const EcosystemTouchpoint = entity('EcosystemTouchpoint');
export const PartnerStatement = entity('PartnerStatement');
export const Dispute = entity('Dispute');
export const AuditEvent = entity('AuditEvent');
export const Decision = entity('Decision');
export const ActionItem = entity('ActionItem');
export const Forecast = entity('Forecast');
export const Customer = entity('Customer');
export const Deal = entity('Deal');
export const Activity = entity('Activity');
export const LedgerEntry = entity('LedgerEntry');
export const RevenueEvent = entity('RevenueEvent');
export const RuleVersion = entity('RuleVersion');
export const Evidence = entity('Evidence');
export const Approval = entity('Approval');
export const FXRate = entity('FXRate');
