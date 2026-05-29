import { isMongo } from '../lib/dbState.js';
import { memory, memId } from '../lib/memory.js';
import Quiz from '../models/Quiz.js';

export async function findQuizById(id) {
  if (isMongo()) return Quiz.findById(id).lean();
  return memory.quizzes.find((q) => q._id === id) ?? null;
}

export async function findQuizzesByCourse(courseId) {
  if (isMongo()) return Quiz.find({ courseId }).lean();
  return memory.quizzes.filter((q) => q.courseId === courseId);
}

export async function findAllQuizzes() {
  if (isMongo()) return Quiz.find().lean();
  return memory.quizzes;
}

export async function createQuiz(data) {
  if (isMongo()) return Quiz.create(data);
  const quiz = { _id: memId(), ...data };
  memory.quizzes.push(quiz);
  return quiz;
}

export async function deleteQuiz(id) {
  if (isMongo()) return Quiz.findByIdAndDelete(id);
  const idx = memory.quizzes.findIndex((q) => q._id === id);
  if (idx === -1) return null;
  memory.quizzes.splice(idx, 1);
  return true;
}
