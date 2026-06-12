import express from 'express';
import { 
  createLegalDocumentController, getAllLegalDocumentsController, getLegalDocumentController, 
  updateLegalDocumentController, deleteLegalDocumentController, getLegalDocumentStatsController 
} from '../controllers/legalDocument.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createLegalDocumentController);
router.get('/', getAllLegalDocumentsController);
router.get('/stats', getLegalDocumentStatsController);
router.get('/:id', getLegalDocumentController);
router.put('/:id', updateLegalDocumentController);
router.delete('/:id', deleteLegalDocumentController);

export default router;
