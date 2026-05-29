import { randomUUID } from 'crypto';

export const memory = {
  users: [],
  courses: [],
  quizzes: [],
  results: [],
};

export function memId() {
  return randomUUID();
}
