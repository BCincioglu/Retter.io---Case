import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

const app: Application = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(bodyParser.json());

app.use('/leaderboard', leaderboardRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });