import redisClient from '../utils/redisClient.js';
import User from '../models/User.js';

export const postSubmitScore = async (
  gameId: string,
  userId: string,
  score: number
): Promise<{ gameId: string, userId: string, score: number, rank: number }> => {
  const leaderboardKey = "leaderboard";

  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  }
  
  const redisValue = `${userId}:${user.userName}`; // Keep leaderboard key as "userId:UserName"

 try {
    const currentScore = await redisClient.zScore(leaderboardKey, redisValue); // Check player's current rank
    if (currentScore === null || score > currentScore) {   // If first time or new score higher set score at leaderboard
      await redisClient.zAdd(leaderboardKey, { score, value: redisValue });
      const rank = await redisClient.zRevRank(leaderboardKey, redisValue);
      return { userId, gameId,  score, rank: rank !== null ? rank + 1 : -1 };
    }

    return { userId, gameId,  score, rank: -1 }; // If it's not player's best score return rank: -1
 } catch (error) {
    console.error("Error in submitScore:", error);
    throw new Error("An error occurred while score submitting.");
 }
};
