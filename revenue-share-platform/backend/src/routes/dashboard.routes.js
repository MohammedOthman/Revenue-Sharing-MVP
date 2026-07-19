import express from 'express';
import {
  getDashboardOverview, getRevenueTrends, getTopPerformingPartners,
  getContractStatusBreakdown, getRecentActivityController, getExpiringController,
} from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/overview', getDashboardOverview);
router.get('/revenue-trends', getRevenueTrends);
router.get('/top-partners', getTopPerformingPartners);
router.get('/recent-activity', getRecentActivityController);
router.get('/expiring', getExpiringController);

// Aliases used by the web client.
router.get('/analytics/trends', getRevenueTrends);
router.get('/analytics/partner-performance', getTopPerformingPartners);
router.get('/analytics/contract-status', getContractStatusBreakdown);

export default router;
