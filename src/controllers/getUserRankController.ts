import { Request, Response } from 'express';
import { getUserRank } from '../services/getUserRank.js';

export const getUserRankController = async (req: Request, res: Response): Promise<void> => {
  const {  userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: 'userId are required.' });
    return;
  }

  try {
    const result = await getUserRank(userId as string);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === 'Invalid User ID') {
      res.status(404).json({ error: error.message });
    }else {
      console.error('Error in getUserRankController:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};
