import { getAllUsers, sanitizeUser } from '../repositories/userRepo.js';
import { findCourses, deleteCourse } from '../repositories/courseRepo.js';
import { findAllQuizzes, deleteQuiz } from '../repositories/quizRepo.js';
import { serializeCourse } from '../lib/serializers.js';
import { memory } from '../lib/memory.js';
import { isMongo } from '../lib/dbState.js';
import User from '../models/User.js';
import Result from '../models/Result.js';

export async function getStats(_req, res) {
  try {
    let usersCount, coursesCount, quizzesCount, resultsCount;
    if (isMongo()) {
      usersCount = await User.countDocuments();
      coursesCount = (await findCourses()).length;
      quizzesCount = (await findAllQuizzes()).length;
      resultsCount = await Result.countDocuments();
    } else {
      usersCount = memory.users.length;
      coursesCount = memory.courses.length;
      quizzesCount = memory.quizzes.length;
      resultsCount = memory.results.length;
    }
    res.json({ usersCount, coursesCount, quizzesCount, resultsCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUsers(_req, res) {
  try {
    const users = await getAllUsers();
    res.json(users.map(sanitizeUser));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAdminCourses(_req, res) {
  try {
    const courses = await findCourses();
    res.json(courses.map(serializeCourse));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAdminQuizzes(_req, res) {
  try {
    const quizzes = await findAllQuizzes();
    res.json(
      quizzes.map((q) => ({
        id: q._id?.toString?.() ?? q._id,
        courseId: q.courseId?.toString?.() ?? q.courseId,
        title: q.title,
        passingScore: q.passingScore,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function adminDeleteCourse(req, res) {
  try {
    await deleteCourse(req.params.id);
    res.json({ message: 'Удалено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function adminDeleteQuiz(req, res) {
  try {
    await deleteQuiz(req.params.id);
    res.json({ message: 'Удалено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
