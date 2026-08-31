import * as notificationsService from './notifications.service.js';

export const getUserNotifications = async (req, res) => {
  const result = await notificationsService.getUserNotifications(req.user?.id, req.query);
  return res.status(result.status).json(result.body);
};

export const getUnreadCount = async (req, res) => {
  const result = await notificationsService.getUnreadCount(req.user?.id);
  return res.status(result.status).json(result.body);
};

export const markAsRead = async (req, res) => {
  const result = await notificationsService.markNotificationAsRead(req.user?.id, req.params.id);
  return res.status(result.status).json(result.body);
};

export const markAllAsRead = async (req, res) => {
  const result = await notificationsService.markAllNotificationsAsRead(req.user?.id);
  return res.status(result.status).json(result.body);
};

export const createAdmissionUpdate = async (req, res) => {
  const result = await notificationsService.createAdmissionUpdate(req.body);
  return res.status(result.status).json(result.body);
};
