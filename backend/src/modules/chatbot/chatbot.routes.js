import { Router } from 'express';
import { sendMessage } from './chatbot.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, sendMessage);

export default router;
