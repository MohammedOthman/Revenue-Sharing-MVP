import express from 'express';
import { 
  createKPIController, getAllKPIsController, getKPIController, 
  updateKPIController, deleteKPIController, getKPIStatsController 
} from '../controllers/kpi.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createKPIController);
router.get('/', getAllKPIsController);
router.get('/stats', getKPIStatsController);
router.get('/:id', getKPIController);
router.put('/:id', updateKPIController);
router.delete('/:id', deleteKPIController);

export default router;
