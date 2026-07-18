import express from 'express';
import { 
  createLegalDocumentController, getAllLegalDocumentsController, getLegalDocumentController, 
  updateLegalDocumentController, deleteLegalDocumentController, getLegalDocumentStatsController 
} from '../controllers/legalDocument.controller.js';
import { protect } from '../middleware/protect.js';
import { documentCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', documentCreateRules, handleValidation, createLegalDocumentController);
router.get('/', getAllLegalDocumentsController);
router.get('/stats', getLegalDocumentStatsController);
router.get('/:id', getLegalDocumentController);
router.put('/:id', updateLegalDocumentController);
router.delete('/:id', deleteLegalDocumentController);

export default router;
