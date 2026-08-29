import { Router } from 'express';
import { getStats } from './stats.controller.js';

const router = Router();

router.get('/', getStats);

export default router;
