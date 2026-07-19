import express from 'express';
import {
  createPartnerController, getAllPartnersController, getPartnerController,
  updatePartnerController, deletePartnerController, getPartnerStatsController,
} from '../controllers/partner.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { partnerRules, partnerUpdateRules, idParamRule, handleValidation } from '../middleware/validate.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', partnerRules, handleValidation, createPartnerController);
router.get('/', getAllPartnersController);
router.get('/stats', getPartnerStatsController);
router.get('/:id', idParamRule, handleValidation, getPartnerController);
router.put('/:id', idParamRule, partnerUpdateRules, handleValidation, updatePartnerController);
router.delete('/:id', idParamRule, handleValidation, deletePartnerController);

export default router;
