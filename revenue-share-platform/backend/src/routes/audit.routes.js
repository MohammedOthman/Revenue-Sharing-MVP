import express from 'express';
import { getAuditEventsController } from '../controllers/audit.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Audit history is read-only over the API (append-only in the database).
router.use(authMiddleware);
router.get('/', getAuditEventsController);

export default router;
