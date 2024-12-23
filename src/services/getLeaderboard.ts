import redisClient from '../utils/redisClient.js';

export const getLeaderboard = async (
  limit: number,
  page: number
): Promise<{ rank: number; userId: string; score: number }[]> => {
  const leaderboardKey = "leaderboard";

  // Sayfalandırma hesaplamaları
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Liderlik tablosunu al
  const leaderboard = await redisClient.zRangeWithScores(leaderboardKey, start, end, { REV: true });

  // Sıralama ve kullanıcı bilgilerini düzenle
  return leaderboard.map((entry, index) => ({
    rank: start + index + 1, // 1 tabanlı sıralama
    userId: entry.value,
    score: entry.score,
  }));
};
