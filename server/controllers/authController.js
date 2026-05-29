import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/authMiddleware.js';
import {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  sanitizeUser,
} from '../repositories/userRepo.js';
function signToken(user) {
  const id = user._id?.toString?.() ?? user._id;
  return jwt.sign({ id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }
    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(400).json({ message: 'Email уже занят' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password: hash,
      role: 'student',
      xp: 0,
      achievements: [],
      completedCourses: [],
    });
    const token = signToken(user);
    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    const token = signToken(user);
    res.json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function me(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, email } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) {
      const existing = await findUserByEmail(email);
      const myId = req.user.id;
      if (existing && (existing._id?.toString?.() ?? existing._id) !== myId) {
        return res.status(400).json({ message: 'Email уже занят' });
      }
      updates.email = email;
    }
    const user = await updateUser(req.user.id, updates);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
