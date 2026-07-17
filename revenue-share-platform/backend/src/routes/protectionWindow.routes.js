import express from 'express';
import {
  createProtectionWindowController, getAllProtectionWindowsController, getProtectionWindowController,
  updateProtectionWindowController, releaseProtectionWindowController, deleteProtectionWindowController,
  getProtectionWindowStatsController,
} from '../controllers/protectionWindow.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { protectionWindowCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', protectionWindowCreateRules, handleValidation, createProtectionWindowController);
router.get('/', getAllProtectionWindowsController);
router.get('/stats', getProtectionWindowStatsController);
router.get('/:id', getProtectionWindowController);
router.put('/:id', updateProtectionWindowController);
router.delete('/:id', deleteProtectionWindowController);
router.post('/:id/release', releaseProtectionWindowController);

export default router;
