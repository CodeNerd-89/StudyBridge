import { Router } from 'express';
import { getChatStatus } from './ai.controller.js';

const router = Router();

router.get('/', getChatStatus);

export default router;