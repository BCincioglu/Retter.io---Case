import { Request, Response } from 'express';
import { getUserRank } from '../services/getUserRank.js';

export const getUserRankController = async (req: Request, res: Response): Promise<void> => {
  const {  userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: 'gameId and userId are required.' });
    return;
  }

  try {
    const result = await getUserRank(userId as string);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getUserRankController:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
