import express from 'express';
import {
  createAttributionController, getAllAttributionsController, getAttributionController,
  updateAttributionController, confirmAttributionController, deleteAttributionController,
  getAttributionStatsController,
} from '../controllers/attribution.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { attributionCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', attributionCreateRules, handleValidation, createAttributionController);
router.get('/', getAllAttributionsController);
router.get('/stats', getAttributionStatsController);
router.get('/:id', getAttributionController);
router.put('/:id', updateAttributionController);
router.delete('/:id', deleteAttributionController);
router.post('/:id/confirm', confirmAttributionController);

export default router;
