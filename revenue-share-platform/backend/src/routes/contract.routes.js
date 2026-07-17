import express from 'express';
import { 
  createContractController, getAllContractsController, getContractController, 
  updateContractController, deleteContractController, getContractStatsController 
} from '../controllers/contract.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { contractCreateRules, contractUpdateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', contractCreateRules, handleValidation, createContractController);
router.get('/', getAllContractsController);
router.get('/stats', getContractStatsController);
router.get('/:id', getContractController);
router.put('/:id', contractUpdateRules, handleValidation, updateContractController);
router.delete('/:id', deleteContractController);

export default router;
