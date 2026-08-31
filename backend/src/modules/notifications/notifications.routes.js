import { Router } from 'express';
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createAdmissionUpdate,
} from './notifications.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = Router();

// User notifications routes (all require authentication)
router.get('/unread-count', authMiddleware, getUnreadCount);
router.patch('/read-all', authMiddleware, markAllAsRead);
router.patch('/:id/read', authMiddleware, markAsRead);
router.post('/admission-update', authMiddleware, createAdmissionUpdate);
router.get('/', authMiddleware, getUserNotifications);

export default router;
