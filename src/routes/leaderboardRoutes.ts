import { Router } from 'express';
import { postSubmitScoreController } from '../controllers/postSubmitScoreController.js';
import { getLeaderboardController } from '../controllers/getLeaderboardController.js';
import { getUserRankController } from '../controllers/getUserRankController.js';

const router = Router();

router.post('/submit-score', postSubmitScoreController);

router.get('/top', getLeaderboardController);

router.get('/rank', getUserRankController);

export default router;
