// Reven Phase-1 PRM routes, mounted at /api/reven.
// Auth routes are public; everything else requires a tenant-scoped token.
import express from 'express';
import * as c from './controller.js';
import { revenAuth } from './tenantAuth.js';

const router = express.Router();

// Public: create a tenant + owner, or sign in.
router.post('/auth/onboard', c.onboard);
router.post('/auth/login', c.login);

// Everything below is tenant-isolated.
router.use(revenAuth);

router.get('/partners', c.listPartners);
router.post('/partners', c.createPartner);
router.post('/partners/:id/readiness', c.verifyPartner);

router.get('/agreements', c.listAgreements);
router.post('/agreements', c.createAgreement);

router.get('/claims', c.listClaims);
router.post('/claims', c.registerClaim);
router.get('/claims/:id', c.getClaim);
router.post('/claims/:id/attribution', c.decideAttribution);
router.post('/claims/:id/revenue', c.recordRevenue);
router.post('/claims/:id/eligibility', c.evaluateEligibility);
router.post('/claims/:id/payment', c.recordPayment);

router.get('/metrics', c.metrics);

export default router;
