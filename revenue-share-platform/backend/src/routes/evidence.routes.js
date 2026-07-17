import express from 'express';
import {
  createEvidenceItemController, getAllEvidenceItemsController, getEvidenceItemController,
  updateEvidenceItemController, deleteEvidenceItemController,
  createEvidencePackController, getAllEvidencePacksController, getEvidencePackController,
  updateEvidencePackController, deleteEvidencePackController, getEvidencePackStatsController,
  listPackItemsController, addItemToPackController, finalizeEvidencePackController,
} from '../controllers/evidence.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { evidenceItemCreateRules, evidencePackCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

router.use(authMiddleware);

// Evidence items
router.post('/items', evidenceItemCreateRules, handleValidation, createEvidenceItemController);
router.get('/items', getAllEvidenceItemsController);
router.get('/items/:id', getEvidenceItemController);
router.put('/items/:id', updateEvidenceItemController);
router.delete('/items/:id', deleteEvidenceItemController);

// Evidence packs
router.post('/packs', evidencePackCreateRules, handleValidation, createEvidencePackController);
router.get('/packs', getAllEvidencePacksController);
router.get('/packs/stats', getEvidencePackStatsController);
router.get('/packs/:id', getEvidencePackController);
router.put('/packs/:id', updateEvidencePackController);
router.delete('/packs/:id', deleteEvidencePackController);
router.get('/packs/:id/items', listPackItemsController);
router.post('/packs/:id/items', addItemToPackController);
router.post('/packs/:id/finalize', finalizeEvidencePackController);

export default router;
