import express from 'express';
import {
  createAmendmentController, getAllAmendmentsController, getAmendmentController,
  updateAmendmentController, deleteAmendmentController, sendNoticeController,
  acknowledgeNoticeController, getAmendmentStatsController,
} from '../controllers/amendment.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createAmendmentController);
router.get('/', getAllAmendmentsController);
router.get('/stats', getAmendmentStatsController);
router.get('/:id', getAmendmentController);
router.put('/:id', updateAmendmentController);
router.delete('/:id', deleteAmendmentController);
router.post('/:id/send-notice', sendNoticeController);
router.post('/:id/acknowledge', acknowledgeNoticeController);

export default router;
