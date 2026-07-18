import express from 'express';
import {
  createClaimController, getAllClaimsController, getClaimController,
  updateClaimController, deleteClaimController, getClaimStatsController,
  reviewClaimController, requestClarificationController,
  approveClaimController, rejectClaimController,
  verifyBankController, verifyTaxController, markPayoutReadyController,
  exportClaimsController,
} from '../controllers/claim.controller.js';
import { protect } from '../middleware/protect.js';
import { claimCreateRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

router.use(protect);

router.post('/', claimCreateRules, handleValidation, createClaimController);
router.get('/', getAllClaimsController);
router.get('/stats', getClaimStatsController);
router.get('/export', exportClaimsController);
router.get('/:id', getClaimController);
router.put('/:id', updateClaimController);
router.delete('/:id', deleteClaimController);
router.post('/:id/review', reviewClaimController);
router.post('/:id/request-clarification', requestClarificationController);
router.post('/:id/approve', approveClaimController);
router.post('/:id/reject', rejectClaimController);
router.post('/:id/verify-bank', verifyBankController);
router.post('/:id/verify-tax', verifyTaxController);
router.post('/:id/mark-payout-ready', markPayoutReadyController);

export default router;
