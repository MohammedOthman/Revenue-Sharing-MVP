import express from 'express';
import {
  register, login, getProfile,
  getAllUsersController, updateUserController, deleteUserController,
  forgotPassword, resetPassword, checkResetToken, inviteUser,
} from '../controllers/auth.controller.js';
import { authMiddleware, optionalAuthMiddleware, roleMiddleware } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import {
  registerRules, loginRules, idParamRule, handleValidation,
  forgotPasswordRules, resetPasswordRules, inviteRules,
} from '../middleware/validate.js';

const router = express.Router();

// Public (optionalAuth lets admins create accounts through the same endpoint)
router.post('/register', authLimiter, optionalAuthMiddleware, registerRules, handleValidation, register);
router.post('/login', authLimiter, loginRules, handleValidation, login);
router.post('/forgot-password', authLimiter, forgotPasswordRules, handleValidation, forgotPassword);
router.post('/reset-password', authLimiter, resetPasswordRules, handleValidation, resetPassword);
router.get('/reset-token/:token', authLimiter, checkResetToken);

// Protected
router.get('/profile', authMiddleware, getProfile);
router.post('/invite', authMiddleware, roleMiddleware('admin'), inviteRules, handleValidation, inviteUser);
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsersController);
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), idParamRule, handleValidation, updateUserController);
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), idParamRule, handleValidation, deleteUserController);

export default router;
