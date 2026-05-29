import { Router } from 'express';
import { getMyAnalytics } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, getMyAnalytics);

export default router;
