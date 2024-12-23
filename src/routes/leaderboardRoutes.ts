import { Router } from 'express';
import { postSubmitScoreController } from '../controllers/postSubmitScoreController.js';
import { getLeaderboardController } from '../controllers/getLeaderboardController.js';
import { getUserRankController } from '../controllers/getUserRankController.js';

const router = Router();

// Skor gönderme endpoint'i
router.post('/submit-score', postSubmitScoreController);

// Liderlik tablosu endpoint'i
router.get('/top', getLeaderboardController);

// Kullanıcı sıralaması endpoint'i
router.get('/rank', getUserRankController);

export default router;
