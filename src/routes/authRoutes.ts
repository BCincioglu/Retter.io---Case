import { Router, Request, Response } from 'express';
import { generateToken } from '../utils/tokenGenerator.js';

const router = Router();

router.post('/login', (req: Request, res: Response): void => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const token = generateToken(userId);
  res.status(200).json({ token });
});

export default router;
