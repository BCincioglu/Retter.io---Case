import redisClient from '../utils/redisClient.js';

export const getUserRank = async (
  userId: string
): Promise<{ userId: string; rank: number; score: number }> => {
  const leaderboardKey = "leaderboard";

  // Kullanıcının skorunu al
  const score = await redisClient.zScore(leaderboardKey, userId);
  if (score === null) {
    throw new Error('User not found in leaderboard.');
  }

  // Kullanıcının sıralamasını al
  const rank = await redisClient.zRevRank(leaderboardKey, userId);
  if (rank === null) {
    throw new Error('User rank could not be determined.');
  }

  return { userId, rank: rank + 1,   score }; // Redis sıralaması 0 tabanlıdır, +1 ile düzenlenir
};
