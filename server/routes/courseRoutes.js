import { Router } from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourseHandler,
} from '../controllers/courseController.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', authMiddleware, requireRole('teacher', 'admin'), createCourse);
router.put('/:id', authMiddleware, requireRole('teacher', 'admin'), updateCourse);
router.delete(
  '/:id',
  authMiddleware,
  requireRole('teacher', 'admin'),
  deleteCourseHandler,
);

export default router;
