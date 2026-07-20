// HTTP handlers for the Reven Phase-1 PRM. Thin: parse, delegate to the service,
// map domain errors to status codes. All tenant scoping comes from req.tenantId
// (set by revenAuth), never from the request body.
import * as svc from './service.js';

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.status || 500;
    if (status === 500) console.error('Reven error:', err);
    res.status(status).json({ error: err.message || 'Internal error' });
  }
};

// ---- Auth / onboarding ----
export const onboard = handle(async (req, res) => {
  const { tenantName, slug, country, email, password, fullName } = req.body;
  if (!tenantName || !slug || !email || !password || !fullName) {
    throw Object.assign(new Error('tenantName, slug, email, password, fullName are required'), { status: 400 });
  }
  const result = await svc.onboardTenant({ tenantName, slug, country, email, password, fullName });
  res.status(201).json(result);
});

export const login = handle(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw Object.assign(new Error('email and password are required'), { status: 400 });
  res.json(await svc.loginTenantUser({ email, password }));
});

// ---- Partners ----
export const createPartner = handle(async (req, res) => {
  if (!req.body.displayName && !req.body.legalName) {
    throw Object.assign(new Error('displayName or legalName is required'), { status: 400 });
  }
  res.status(201).json(await svc.createPartner(req.tenantId, req.user, req.body));
});
export const listPartners = handle(async (req, res) => {
  res.json({ partners: await svc.listPartners(req.tenantId) });
});
export const verifyPartner = handle(async (req, res) => {
  res.json({ partner: await svc.verifyPartnerReadiness(req.tenantId, req.user, req.params.id, req.body) });
});

// ---- Agreements ----
export const createAgreement = handle(async (req, res) => {
  if (!req.body.name) throw Object.assign(new Error('name is required'), { status: 400 });
  res.status(201).json({ agreement: await svc.createAgreement(req.tenantId, req.user, req.body) });
});
export const listAgreements = handle(async (req, res) => {
  res.json({ agreements: await svc.listAgreements(req.tenantId) });
});

// ---- Claims ----
export const registerClaim = handle(async (req, res) => {
  if (!req.body.tenantPartnerId || !req.body.customerAccountName) {
    throw Object.assign(new Error('tenantPartnerId and customerAccountName are required'), { status: 400 });
  }
  res.status(201).json(await svc.registerClaim(req.tenantId, req.user, req.body));
});
export const listClaims = handle(async (req, res) => {
  res.json({ claims: await svc.listClaims(req.tenantId) });
});
export const getClaim = handle(async (req, res) => {
  const result = await svc.getClaim(req.tenantId, req.params.id);
  if (!result) throw Object.assign(new Error('Claim not found'), { status: 404 });
  res.json(result);
});
export const decideAttribution = handle(async (req, res) => {
  res.json(await svc.decideAttribution(req.tenantId, req.user, req.params.id, req.body));
});
export const recordRevenue = handle(async (req, res) => {
  if (req.body.amount == null) throw Object.assign(new Error('amount is required'), { status: 400 });
  res.status(201).json({ revenueEvent: await svc.recordRevenue(req.tenantId, req.user, req.params.id, req.body) });
});
export const evaluateEligibility = handle(async (req, res) => {
  res.json({ eligibility: await svc.evaluateEligibility(req.tenantId, req.user, req.params.id) });
});
export const recordPayment = handle(async (req, res) => {
  res.json(await svc.recordPayment(req.tenantId, req.user, req.params.id, req.body));
});

// ---- Metrics ----
export const metrics = handle(async (req, res) => {
  res.json(await svc.getGateMetrics(req.tenantId));
});
