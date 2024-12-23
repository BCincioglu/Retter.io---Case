import redisClient from '../utils/redisClient.js';

export const postSubmitScore = async (
  gameId: string,
  userId: string,
  score: number
): Promise<{ gameId: string, userId: string, score: number, rank: number }> => {
  const leaderboardKey = "leaderboard";
  
 try {
    const currentScore = await redisClient.zScore(leaderboardKey, userId); // Check player's current rank

    if (currentScore === null || score > currentScore) {   // If first time or new score higher set score at leaderboard
      await redisClient.zAdd(leaderboardKey, { score, value: userId });
      const rank = await redisClient.zRevRank(leaderboardKey, userId);
      return { userId, gameId,  score, rank: rank !== null ? rank + 1 : -1 };
    }

    return { userId, gameId,  score, rank: -1 }; // If it's not player's best score return rank: -1
 } catch (error) {
    console.error("Error in submitScore:", error);
    throw new Error("An error occurred while score submitting.");
 }
};
