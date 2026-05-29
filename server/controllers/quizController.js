import { serializeQuiz } from '../lib/serializers.js';
import { scoreQuiz } from '../lib/scoreQuiz.js';
import {
  findQuizById,
  findQuizzesByCourse,
  findAllQuizzes,
  createQuiz,
  deleteQuiz,
} from '../repositories/quizRepo.js';
import { findUserById, updateUser } from '../repositories/userRepo.js';
import { createResult } from '../repositories/resultRepo.js';
import { memId } from '../lib/memory.js';

function applyAchievements(user, { passed, percent, xp }) {
  const achievements = new Set(user.achievements ?? []);
  if (passed) achievements.add('first-course');
  if (percent >= 80) achievements.add('excellent');
  if (xp >= 1000) achievements.add('marathon');
  return [...achievements];
}

export async function getQuizById(req, res) {
  try {
    const quiz = await findQuizById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Тест не найден' });
    const includeAnswers = req.user?.role === 'admin' || req.user?.role === 'teacher';
    res.json(serializeQuiz(quiz, includeAnswers));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getQuizzesByCourse(req, res) {
  try {
    const quizzes = await findQuizzesByCourse(req.params.courseId);
    res.json(
      quizzes.map((q) => ({
        id: q._id?.toString?.() ?? q._id,
        courseId: q.courseId?.toString?.() ?? q.courseId,
        title: q.title,
        passingScore: q.passingScore,
        questionCount: (q.questions ?? []).length,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function submitQuiz(req, res) {
  try {
    const quiz = await findQuizById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Тест не найден' });

    const questions = (quiz.questions ?? []).map((q, i) => ({
      ...q,
      id: q._id?.toString?.() ?? q.id ?? `q${i}`,
    }));

    const { score, maxScore, percent, mistakes } = scoreQuiz(
      questions,
      req.body.answers ?? {},
    );
    const passed = percent >= (quiz.passingScore ?? 70);

    await createResult({
      userId: req.user.id,
      quizId: req.params.id,
      score,
      maxScore,
      percent,
      mistakes,
      passed,
      completedAt: new Date(),
    });

    const user = await findUserById(req.user.id);
    if (user) {
      const xpGain = passed ? score : Math.floor(score / 2);
      const newXp = (user.xp ?? 0) + xpGain;
      const completed = new Set(
        (user.completedCourses ?? []).map((c) => c.toString?.() ?? String(c)),
      );
      if (passed) {
        completed.add(quiz.courseId?.toString?.() ?? quiz.courseId);
      }
      await updateUser(req.user.id, {
        xp: newXp,
        completedCourses: [...completed],
        achievements: applyAchievements(user, { passed, percent, xp: newXp }),
      });
    }

    const updated = await findUserById(req.user.id);

    res.json({
      score,
      maxScore,
      percent,
      passed,
      mistakes,
      xpEarned: passed ? score : Math.floor(score / 2),
      user: updated
        ? {
            id: updated._id?.toString?.() ?? updated._id,
            xp: updated.xp,
            achievements: updated.achievements,
            completedCourses: (updated.completedCourses ?? []).map(String),
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createQuizHandler(req, res) {
  try {
    const quiz = await createQuiz({
      courseId: req.body.courseId,
      title: req.body.title,
      timer: req.body.timer,
      passingScore: req.body.passingScore ?? 70,
      questions: req.body.questions ?? [],
    });
    res.status(201).json(serializeQuiz(quiz, true));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteQuizHandler(req, res) {
  try {
    const ok = await deleteQuiz(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Тест не найден' });
    res.json({ message: 'Тест удалён' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function listAllQuizzes(_req, res) {
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
