import redisClient from '../utils/redisClient.js';

export const getUserRank = async (
  userId: string
): Promise<{ userId: string; rank: number; score: number }> => {
  const leaderboardKey = "leaderboard";

  try {
    const score = await redisClient.zScore(leaderboardKey, userId); // Player's best score
    if (score === null) {
      throw new Error('User not found in leaderboard.');
    }

    const rank = await redisClient.zRevRank(leaderboardKey, userId); // Player's best rank
    if (rank === null) {
      throw new Error('User rank could not be determined.');
    }

    return { userId, rank: rank + 1,   score };
  } catch (error) {
    console.error("Error in getUserRank:", error);
    throw new Error("An error occurred while getting user rank.");
  }
};
