import { Router } from 'express';
import {
  getQuizById,
  getQuizzesByCourse,
  submitQuiz,
  createQuizHandler,
  deleteQuizHandler,
  listAllQuizzes,
} from '../controllers/quizController.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/course/:courseId', getQuizzesByCourse);
router.get('/all', authMiddleware, requireRole('admin'), listAllQuizzes);
router.get('/:id', authMiddleware, getQuizById);
router.post('/:id/submit', authMiddleware, submitQuiz);
router.post('/', authMiddleware, requireRole('teacher', 'admin'), createQuizHandler);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteQuizHandler);

export default router;
