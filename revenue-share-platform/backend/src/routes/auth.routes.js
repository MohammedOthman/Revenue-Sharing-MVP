import express from 'express';
import { 
  register, login, getProfile, 
  getAllUsersController, updateUserController, deleteUserController 
} from '../controllers/auth.controller.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';
import { registerRules, loginRules, handleValidation } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.post('/register', registerRules, handleValidation, register);
router.post('/login', loginRules, handleValidation, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsersController);
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), updateUserController);
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), deleteUserController);

export default router;
