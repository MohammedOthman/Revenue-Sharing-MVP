import express from 'express';
import { 
  createRevenueShareController, getAllRevenueSharesController, getRevenueShareController, 
  updateRevenueShareController, deleteRevenueShareController, 
  getRevenueStatsController, getRevenueByPeriodController 
} from '../controllers/revenue.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createRevenueShareController);
router.get('/', getAllRevenueSharesController);
router.get('/stats', getRevenueStatsController);
router.get('/trends', getRevenueByPeriodController);
router.get('/:id', getRevenueShareController);
router.put('/:id', updateRevenueShareController);
router.delete('/:id', deleteRevenueShareController);

export default router;
