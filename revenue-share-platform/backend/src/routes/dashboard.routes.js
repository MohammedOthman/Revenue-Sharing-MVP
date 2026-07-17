import express from 'express';
import { 
  getDashboardOverview, getRevenueTrends, getTopPerformingPartners 
} from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/overview', getDashboardOverview);
router.get('/revenue-trends', getRevenueTrends);
router.get('/top-partners', getTopPerformingPartners);

export default router;
