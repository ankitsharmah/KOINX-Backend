import express from 'express';
import { getStats } from '../controllers/statsController.js';
import { getDeviation } from '../controllers/deviationController.js';
const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

export default router
