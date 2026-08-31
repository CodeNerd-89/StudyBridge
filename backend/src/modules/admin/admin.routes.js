import { Router } from 'express';
import authMiddleware, { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  updateUniversity,
  broadcastAnnouncement,
  updateScholarship,
  getAdminStats,
} from './admin.controller.js';

const router = Router();

// Protect all admin endpoints with both JWT auth and Admin role verification
router.use(authMiddleware);
router.use(requireAdmin);

router.get('/stats', getAdminStats);
router.put('/universities/:id', updateUniversity);
router.post('/universities/:id/announcement', broadcastAnnouncement);
router.put('/scholarships/:id', updateScholarship);

export default router;
