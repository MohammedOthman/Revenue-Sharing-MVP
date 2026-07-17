import express from 'express';
import { getAuditEventsController } from '../controllers/audit.controller.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

// Audit history is read-only over the API (append-only in the database).
router.use(protect);
router.get('/', getAuditEventsController);

export default router;
