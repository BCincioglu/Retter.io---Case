import { Request, Response } from "express";
import { postSubmitScore } from "../services/postSubmitScore.js";

export const postSubmitScoreController = async (req:Request, res:Response): Promise<void> => {
    const { gameId, userId, score } = req.body;

    if (!gameId || !userId || typeof score !== 'number') {
        res.status(400).json({ error: 'gameId, userId, and score are required.' });
        return;
    }
    try {
        const result = await postSubmitScore(gameId, userId, score);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in postSubmitScoreController:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
    
}