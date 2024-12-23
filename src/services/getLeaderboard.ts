import redisClient from '../utils/redisClient.js';

export const getLeaderboard = async (
  limit: number,
  page: number
): Promise<{ rank: number; userId: string; score: number }[]> => {
  const leaderboardKey = "leaderboard";

  try {
    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const leaderboard = await redisClient.zRangeWithScores(leaderboardKey, start, end, { REV: true });

    return leaderboard.map((entry, index) => ({
      rank: start + index + 1,
      userId: entry.value,
      score: entry.score,
    }));
  } catch (error) {
    console.error("Error in getLeaderboard:", error);
    throw new Error("An error occurred while getting leaderboard.");
  }
};
