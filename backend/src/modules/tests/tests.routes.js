import { Router } from 'express';
import * as controller from './tests.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const router = Router();
router.use(authMiddleware);
router.post('/generate', asyncHandler(controller.generate));
router.get('/performance', asyncHandler(controller.performance));
router.get('/:quizId', asyncHandler(controller.getOne));
router.post('/:quizId/submit', asyncHandler(controller.submit));

export default router;
