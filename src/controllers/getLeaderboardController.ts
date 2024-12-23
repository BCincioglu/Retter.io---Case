import { Request, Response } from 'express';
import { getLeaderboard } from '../services/getLeaderboard.js';

export const getLeaderboardController = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;


  try {
    const result = await getLeaderboard(limit, page);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getLeaderboardController:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
