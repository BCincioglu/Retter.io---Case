import redisClient from '../utils/redisClient.js';

export const postSubmitScore = async (
  gameId: string,
  userId: string,
  score: number
): Promise<{ gameId: string, userId: string, score: number, rank: number }> => {
  const leaderboardKey = "leaderboard";

  const currentScore = await redisClient.zScore(leaderboardKey, userId);
  if (currentScore === null || score > currentScore) {
    await redisClient.zAdd(leaderboardKey, { score, value: userId });
  }

  const rank = await redisClient.zRevRank(leaderboardKey, userId);
  return { userId, gameId,  score, rank: rank !== null ? rank + 1 : -1 };
};
