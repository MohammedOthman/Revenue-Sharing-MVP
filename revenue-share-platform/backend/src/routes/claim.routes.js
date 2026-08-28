import express from 'express';
import { z } from 'zod';
import { asyncHandler } from '../lib/http.js';
import { requireAuth, requirePasswordChanged, requireRole } from '../middleware/auth.js';
import {
  decideClaimAttribution,
  evaluateClaimEligibility,
  recordClaimPayout,
  recordClaimRevenue,
} from '../services/claim-workflow.service.js';

const router = express.Router();
router.use(requireAuth, requirePasswordChanged);

const context = (req) => ({
  organizationId: req.user.organization_id,
  userId: req.user.id,
  actorName: req.user.full_name,
  requestId: req.id,
});

const version = z.number().int().positive();

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
    const record = await decideClaimAttribution(context(req), req.params.id, input);
    res.json({ record });
  }),
);

router.post(
  '/:id/eligibility',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const input = z.object({ version }).parse(req.body);
    const record = await evaluateClaimEligibility(context(req), req.params.id, input.version);
    res.json({ record });
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
        reference: z.string().trim().max(200).optional(),
      })
      .parse(req.body);
    const record = await recordClaimRevenue(context(req), req.params.id, input);
    res.json({ record });
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
    const record = await recordClaimPayout(context(req), req.params.id, input);
    res.json({ record });
  }),
);

export default router;
