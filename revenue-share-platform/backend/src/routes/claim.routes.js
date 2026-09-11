import express from 'express';
import { z } from 'zod';
import { asyncHandler } from '../lib/http.js';
import { parseRecordId, recordVersionSchema } from '../lib/validation.js';
import { requireAuth, requirePasswordChanged, requireRole } from '../middleware/auth.js';
import {
  decideClaimAttribution,
  evaluateClaimEligibility,
  recordClaimPayout,
  recordClaimRevenue,
} from '../services/claim-workflow.service.js';
import { getRecord } from '../services/entity.service.js';
import { listClaimLedger, listOrganizationLedger } from '../services/ledger.service.js';

const router = express.Router();
router.use(requireAuth, requirePasswordChanged);

const context = (req) => ({
  organizationId: req.user.organization_id,
  userId: req.user.id,
  actorName: req.user.full_name,
  requestId: req.id,
});

const version = recordVersionSchema;

router.get(
  '/ledger',
  asyncHandler(async (req, res) => {
    const journals = await listOrganizationLedger({
      organizationId: req.user.organization_id,
      limit: req.query.limit,
    });
    res.json({ journals });
  }),
);

router.get(
  '/:id/ledger',
  asyncHandler(async (req, res) => {
    const id = parseRecordId(req.params.id);
    await getRecord({
      organizationId: req.user.organization_id,
      type: 'PartnerClaim',
      id,
    });
    const journals = await listClaimLedger({
      organizationId: req.user.organization_id,
      claimId: id,
    });
    res.json({ journals });
  }),
);

router.post(
  '/:id/attribution',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const input = z
      .object({
        status: z.enum(['accepted', 'rejected']),
        percentage: z.number().min(0).max(100).optional(),
        reason: z.string().trim().max(2000).optional(),
        version,
      })
      .parse(req.body);
    const result = await decideClaimAttribution(context(req), parseRecordId(req.params.id), input);
    res.json(result);
  }),
);

router.post(
  '/:id/eligibility',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const input = z.object({ version }).parse(req.body);
    const result = await evaluateClaimEligibility(
      context(req),
      parseRecordId(req.params.id),
      input.version,
    );
    res.json(result);
  }),
);

router.post(
  '/:id/revenue',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const input = z
      .object({
        version,
        status: z.enum(['pipeline', 'closed_won', 'invoiced', 'collected', 'recognized', 'lost']),
        actualRevenue: z.number().nonnegative().optional(),
        payoutRate: z.number().min(0).max(100).optional(),
        reference: z.string().trim().max(200).optional(),
      })
      .parse(req.body);
    const result = await recordClaimRevenue(context(req), parseRecordId(req.params.id), input);
    res.json(result);
  }),
);

router.post(
  '/:id/payout',
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    const input = z
      .object({
        version,
        amount: z.number().positive().optional(),
        reference: z.string().trim().max(200).optional(),
      })
      .parse(req.body);
    const result = await recordClaimPayout(context(req), parseRecordId(req.params.id), input);
    res.json(result);
  }),
);

export default router;
