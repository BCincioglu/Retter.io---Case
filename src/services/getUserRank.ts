import redisClient from '../utils/redisClient.js';
import User from '../models/User.js';

export const getUserRank = async (
  userId: string
): Promise<{ userId: string; rank: number; score: number }> => {
  const leaderboardKey = "leaderboard";

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    
    const redisValue = `${userId}:${user.userName}`; // Keep leaderboard key as "userId:UserName"

    const score = await redisClient.zScore(leaderboardKey, redisValue); // Player's best score
    if (score === null) {
      throw new Error('User not found in leaderboard.');
    }

    const rank = await redisClient.zRevRank(leaderboardKey, redisValue); // Player's best rank
    if (rank === null) {
      throw new Error('User rank could not be determined.');
    }

    return { userId, rank: rank + 1,   score };
  } catch (error:  any) {
    if (error.message === 'User not found' || error.message === 'User not found in leaderboard.' || error.message === 'User rank could not be determined.') {
      throw new Error("Invalid User ID");
    } else {
      console.error("Error in getUserRank:", error);
      throw new Error("An error occurred while getting user rank.");
    }
  }
};
