import express from 'express';
import {
  createKPIController, getAllKPIsController, getKPIController,
  updateKPIController, deleteKPIController, getKPIStatsController,
  updateKPIValueController, getKPIsByContractController,
} from '../controllers/kpi.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { kpiRules, kpiValueRules, idParamRule, handleValidation } from '../middleware/validate.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', kpiRules, handleValidation, createKPIController);
router.get('/', getAllKPIsController);
router.get('/stats', getKPIStatsController);
router.get('/contract/:contractId', getKPIsByContractController);
router.get('/:id', idParamRule, handleValidation, getKPIController);
router.put('/:id', idParamRule, handleValidation, updateKPIController);
router.patch('/:id/value', idParamRule, kpiValueRules, handleValidation, updateKPIValueController);
router.delete('/:id', idParamRule, handleValidation, deleteKPIController);

export default router;
