import { Router } from 'express';
import { getFollowedUniversities } from '../universities/universities.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

// GET /api/users/me/followed-universities
router.get('/me/followed-universities', authMiddleware, getFollowedUniversities);

export default router;
