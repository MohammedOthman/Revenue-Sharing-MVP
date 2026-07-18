import express from 'express';
import {
  createPartnerController, getAllPartnersController, getPartnerController,
  updatePartnerController, deletePartnerController, getPartnerStatsController,
  exportPartnersController,
} from '../controllers/partner.controller.js';
import { protect } from '../middleware/protect.js';
import { partnerCreateRules, partnerUpdateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', partnerCreateRules, handleValidation, createPartnerController);
router.get('/', getAllPartnersController);
router.get('/stats', getPartnerStatsController);
router.get('/export', exportPartnersController);
router.get('/:id', getPartnerController);
router.put('/:id', partnerUpdateRules, handleValidation, updatePartnerController);
router.delete('/:id', deletePartnerController);

export default router;
