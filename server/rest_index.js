import express from 'express';
import cors from 'cors';
import { router } from './src/api/router.js';

export const restApp = express();

restApp.use(cors());
restApp.use(express.json());

restApp.use('/api', router);
