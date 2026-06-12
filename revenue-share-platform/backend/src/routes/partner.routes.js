import express from 'express';
import { 
  createPartnerController, getAllPartnersController, getPartnerController, 
  updatePartnerController, deletePartnerController, getPartnerStatsController 
} from '../controllers/partner.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createPartnerController);
router.get('/', getAllPartnersController);
router.get('/stats', getPartnerStatsController);
router.get('/:id', getPartnerController);
router.put('/:id', updatePartnerController);
router.delete('/:id', deletePartnerController);

export default router;
