import express from 'express';
import {
  createRevenueShareController, getAllRevenueSharesController, getRevenueShareController,
  updateRevenueShareController, deleteRevenueShareController,
  getRevenueStatsController, getRevenueByPeriodController,
  getRevenueSharesByContractController, getPendingPaymentsController, processPaymentController,
  exportRevenueSharesController,
} from '../controllers/revenue.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { revenueRules, idParamRule, handleValidation } from '../middleware/validate.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', revenueRules, handleValidation, createRevenueShareController);
router.get('/', getAllRevenueSharesController);
router.get('/stats', getRevenueStatsController);
router.get('/trends', getRevenueByPeriodController);
router.get('/pending-payments', getPendingPaymentsController);
router.get('/export', exportRevenueSharesController);
router.get('/contract/:contractId', getRevenueSharesByContractController);
router.get('/:id', idParamRule, handleValidation, getRevenueShareController);
router.put('/:id', idParamRule, handleValidation, updateRevenueShareController);
router.post('/:id/process-payment', idParamRule, handleValidation, processPaymentController);
router.delete('/:id', idParamRule, handleValidation, deleteRevenueShareController);

export default router;
