import { isMongo } from '../lib/dbState.js';
import { memory, memId } from '../lib/memory.js';
import User from '../models/User.js';
import { sanitizeUser } from '../lib/serializers.js';

export async function findUserByEmail(email) {
  if (isMongo()) return User.findOne({ email });
  return memory.users.find((u) => u.email === email) ?? null;
}

export async function findUserById(id) {
  if (isMongo()) return User.findById(id);
  return memory.users.find((u) => u._id === id) ?? null;
}

export async function createUser(data) {
  if (isMongo()) {
    const { _id, ...rest } = data;
    return User.create(rest);
  }
  const user = { _id: data._id ?? memId(), ...data };
  memory.users.push(user);
  return user;
}

export async function updateUser(id, updates) {
  if (isMongo()) {
    return User.findByIdAndUpdate(id, updates, { new: true });
  }
  const idx = memory.users.findIndex((u) => u._id === id);
  if (idx === -1) return null;
  memory.users[idx] = { ...memory.users[idx], ...updates };
  return memory.users[idx];
}

export async function getAllUsers() {
  if (isMongo()) return User.find().select('-password').lean();
  return memory.users.map((u) => {
    const { password, ...rest } = u;
    return rest;
  });
}

export async function getLeaderboard(limit = 20) {
  if (isMongo()) {
    return User.find().sort({ xp: -1 }).limit(limit).select('name xp').lean();
  }
  return [...memory.users]
    .sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
    .slice(0, limit)
    .map((u) => ({ _id: u._id, name: u.name, xp: u.xp ?? 0 }));
}

export { sanitizeUser };
