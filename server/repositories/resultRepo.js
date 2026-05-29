import { isMongo } from '../lib/dbState.js';
import { memory, memId } from '../lib/memory.js';
import Result from '../models/Result.js';

export async function createResult(data) {
  if (isMongo()) return Result.create(data);
  const result = {
    _id: memId(),
    ...data,
    completedAt: data.completedAt ?? new Date(),
  };
  memory.results.push(result);
  return result;
}

export async function findResultsByUser(userId) {
  if (isMongo()) {
    return Result.find({ userId }).sort({ completedAt: -1 }).lean();
  }
  return memory.results
    .filter((r) => r.userId === userId)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
}

export async function countPassedByUser(userId) {
  const results = await findResultsByUser(userId);
  return results.length;
}
