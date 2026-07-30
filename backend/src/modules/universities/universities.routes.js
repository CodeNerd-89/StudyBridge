import { Router } from 'express';
import { listScholarships, listUniversities } from './universities.controller.js';

const router = Router();

router.get('/', listUniversities);
router.get('/scholarships', listScholarships);

export default router;