import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { setMongoMode } from './lib/dbState.js';
import { runSeed, DEMO_ACCOUNTS } from './seed/runSeed.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', demo: DEMO_ACCOUNTS });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

async function start() {
  try {
    await connectDB();
    setMongoMode();
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('MongoDB unavailable — using in-memory store:', err.message);
  }

  await runSeed();

  app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`);
    console.log('Demo login:', DEMO_ACCOUNTS.admin, '/', DEMO_ACCOUNTS.password);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
