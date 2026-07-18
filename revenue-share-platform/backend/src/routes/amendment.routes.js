import express from 'express';
import {
  createAmendmentController, getAllAmendmentsController, getAmendmentController,
  updateAmendmentController, deleteAmendmentController, sendNoticeController,
  acknowledgeNoticeController, getAmendmentStatsController,
} from '../controllers/amendment.controller.js';
import { protect } from '../middleware/protect.js';
import { amendmentCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', amendmentCreateRules, handleValidation, createAmendmentController);
router.get('/', getAllAmendmentsController);
router.get('/stats', getAmendmentStatsController);
router.get('/:id', getAmendmentController);
router.put('/:id', updateAmendmentController);
router.delete('/:id', deleteAmendmentController);
router.post('/:id/send-notice', sendNoticeController);
router.post('/:id/acknowledge', acknowledgeNoticeController);

export default router;
