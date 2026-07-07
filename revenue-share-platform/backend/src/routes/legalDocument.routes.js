import express from 'express';
import {
  createLegalDocumentController, getAllLegalDocumentsController, getLegalDocumentController,
  updateLegalDocumentController, deleteLegalDocumentController, getLegalDocumentStatsController,
  getLegalDocumentsByContractController,
} from '../controllers/legalDocument.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { legalDocumentRules, idParamRule, handleValidation } from '../middleware/validate.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', legalDocumentRules, handleValidation, createLegalDocumentController);
router.get('/', getAllLegalDocumentsController);
router.get('/stats', getLegalDocumentStatsController);
router.get('/contract/:contractId', getLegalDocumentsByContractController);
router.get('/:id', idParamRule, handleValidation, getLegalDocumentController);
router.put('/:id', idParamRule, handleValidation, updateLegalDocumentController);
router.delete('/:id', idParamRule, handleValidation, deleteLegalDocumentController);

export default router;
