import { Router } from 'express';
import {
  getStats,
  getUsers,
  getAdminCourses,
  getAdminQuizzes,
  adminDeleteCourse,
  adminDeleteQuiz,
} from '../controllers/adminController.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware, requireRole('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/courses', getAdminCourses);
router.get('/quizzes', getAdminQuizzes);
router.delete('/courses/:id', adminDeleteCourse);
router.delete('/quizzes/:id', adminDeleteQuiz);

export default router;
