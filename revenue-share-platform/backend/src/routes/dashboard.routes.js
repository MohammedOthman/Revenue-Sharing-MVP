import express from 'express';
import { 
  getDashboardOverview, getRevenueTrends, getTopPerformingPartners 
} from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get('/overview', getDashboardOverview);
router.get('/revenue-trends', getRevenueTrends);
router.get('/top-partners', getTopPerformingPartners);

export default router;
