import express from 'express';
import {
  createContractController, getAllContractsController, getContractController,
  updateContractController, deleteContractController, getContractStatsController,
  getContractsByPartnerController,
} from '../controllers/contract.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { contractRules, idParamRule, handleValidation } from '../middleware/validate.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', contractRules, handleValidation, createContractController);
router.get('/', getAllContractsController);
router.get('/stats', getContractStatsController);
router.get('/partner/:partnerId', getContractsByPartnerController);
router.get('/:id', idParamRule, handleValidation, getContractController);
router.put('/:id', idParamRule, handleValidation, updateContractController);
router.delete('/:id', idParamRule, handleValidation, deleteContractController);

export default router;
