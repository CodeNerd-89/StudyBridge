import { Router } from 'express';
import { getQuizStatus } from './tests.controller.js';

const router = Router();

router.get('/', getQuizStatus);

export default router;