import express from 'express';
import { z } from 'zod';
import { asyncHandler } from '../lib/http.js';
import { requireAuth, requirePasswordChanged, requireRole } from '../middleware/auth.js';
import { createUser, listUsers, updateUser } from '../services/user.service.js';

const router = express.Router();
router.use(requireAuth, requirePasswordChanged, requireRole('admin'));

const context = (req) => ({
  organizationId: req.user.organization_id,
  userId: req.user.id,
  actorName: req.user.full_name,
  requestId: req.id,
});

const createSchema = z.object({
  email: z.email().max(320),
  fullName: z.string().trim().min(1).max(200),
  password: z.string().min(14).max(200),
  role: z.enum(['admin', 'operator', 'viewer']).default('operator'),
});

const updateSchema = z
  .object({
    fullName: z.string().trim().min(1).max(200).optional(),
    password: z.string().min(14).max(200).optional(),
    role: z.enum(['admin', 'operator', 'viewer']).optional(),
    status: z.enum(['active', 'disabled']).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'At least one change is required.');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({ users: await listUsers(req.user.organization_id) });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = await createUser(context(req), createSchema.parse(req.body));
    res.status(201).json({ user });
  }),
);

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await updateUser(context(req), req.params.id, updateSchema.parse(req.body));
    res.json({ user });
  }),
);

export default router;
