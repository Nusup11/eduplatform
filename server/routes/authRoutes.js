import { Router } from 'express';
import {
  register,
  login,
  me,
  updateProfile,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.patch('/me', authMiddleware, updateProfile);
router.post('/forgot-password', (_req, res) => {
  res.json({ message: 'Инструкция отправлена на email (демо)' });
});

export default router;
