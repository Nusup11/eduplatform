import { Router } from 'express';
import { getLeaderboard } from '../repositories/userRepo.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await getLeaderboard(20);
    res.json(
      users.map((u) => ({
        id: u._id?.toString?.() ?? u._id,
        name: u.name,
        xp: u.xp ?? 0,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
