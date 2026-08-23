import express from 'express';
import { asyncHandler } from '../lib/http.js';
import { requireAuth, requirePasswordChanged, requireRole } from '../middleware/auth.js';
import {
  bulkCreateRecords,
  createRecord,
  deleteRecord,
  getRecord,
  listRecords,
  updateRecord,
} from '../services/entity.service.js';

const router = express.Router();
router.use(requireAuth, requirePasswordChanged);

const context = (req) => ({
  organizationId: req.user.organization_id,
  userId: req.user.id,
  actorName: req.user.full_name,
  requestId: req.id,
});

router.get(
  '/:type',
  asyncHandler(async (req, res) => {
    const records = await listRecords({
      organizationId: req.user.organization_id,
      type: req.params.type,
      sort: req.query.sort,
      limit: req.query.limit,
      filter: req.query.filter,
    });
    res.json({ records });
  }),
);

router.get(
  '/:type/:id',
  asyncHandler(async (req, res) => {
    const record = await getRecord({
      organizationId: req.user.organization_id,
      type: req.params.type,
      id: req.params.id,
    });
    res.json({ record });
  }),
);

router.post(
  '/:type',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const record = await createRecord(context(req), req.params.type, req.body);
    res.status(201).json({ record });
  }),
);

router.post(
  '/:type/bulk',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const records = await bulkCreateRecords(context(req), req.params.type, req.body?.records);
    res.status(201).json({ records });
  }),
);

router.patch(
  '/:type/:id',
  requireRole('admin', 'operator'),
  asyncHandler(async (req, res) => {
    const record = await updateRecord(
      context(req),
      req.params.type,
      req.params.id,
      req.body?.data ?? req.body,
      req.body?.version,
    );
    res.json({ record });
  }),
);

router.delete(
  '/:type/:id',
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    await deleteRecord(context(req), req.params.type, req.params.id);
    res.status(204).end();
  }),
);

export default router;
