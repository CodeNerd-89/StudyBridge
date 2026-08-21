import { Router } from 'express';
import { login, me, register, googleLogin, completeProfile } from './auth.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/google', googleLogin);
router.get('/me', authMiddleware, me);
router.put('/profile', authMiddleware, completeProfile);

export default router;