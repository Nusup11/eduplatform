import { serializeCourse } from '../lib/serializers.js';
import {
  findCourses,
  findCourseById,
  createCourse as createCourseDoc,
  updateCourse as updateCourseDoc,
  deleteCourse,
} from '../repositories/courseRepo.js';
import { findQuizzesByCourse } from '../repositories/quizRepo.js';
import { memId } from '../lib/memory.js';

export async function getCourses(req, res) {
  try {
    const courses = await findCourses({
      category: req.query.category,
      search: req.query.search,
    });
    res.json(courses.map(serializeCourse));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getCourseById(req, res) {
  try {
    const c = await findCourseById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Курс не найден' });
    const quizzes = await findQuizzesByCourse(req.params.id);
    res.json({
      ...serializeCourse(c),
      quizzes: quizzes.map((q) => ({
        id: q._id?.toString?.() ?? q._id,
        title: q.title,
        passingScore: q.passingScore,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createCourse(req, res) {
  try {
    const course = await createCourseDoc({
      _id: memId(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.user.id,
      lessons: req.body.lessons ?? [],
    });
    res.status(201).json(serializeCourse(course));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateCourse(req, res) {
  try {
    const course = await updateCourseDoc(req.params.id, req.body);
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    res.json(serializeCourse(course));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteCourseHandler(req, res) {
  try {
    const ok = await deleteCourse(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Курс не найден' });
    res.json({ message: 'Курс удалён' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
