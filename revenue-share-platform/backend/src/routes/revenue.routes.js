import express from 'express';
import {
  createRevenueShareController, getAllRevenueSharesController, getRevenueShareController,
  updateRevenueShareController, deleteRevenueShareController,
  getRevenueStatsController, getRevenueByPeriodController,
  exportRevenueSharesController,
} from '../controllers/revenue.controller.js';
import { protect } from '../middleware/protect.js';
import { revenueCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', revenueCreateRules, handleValidation, createRevenueShareController);
router.get('/', getAllRevenueSharesController);
router.get('/stats', getRevenueStatsController);
router.get('/trends', getRevenueByPeriodController);
router.get('/export', exportRevenueSharesController);
router.get('/:id', getRevenueShareController);
router.put('/:id', updateRevenueShareController);
router.delete('/:id', deleteRevenueShareController);

export default router;
