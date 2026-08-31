import * as adminService from './admin.service.js';

export const updateUniversity = async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateUniversity(id, req.body);
  return res.status(result.status).json(result.body);
};

export const broadcastAnnouncement = async (req, res) => {
  const { id } = req.params;
  const result = await adminService.broadcastAnnouncement(id, req.body);
  return res.status(result.status).json(result.body);
};

export const updateScholarship = async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateScholarship(id, req.body);
  return res.status(result.status).json(result.body);
};

export const getAdminStats = async (req, res) => {
  const result = await adminService.getAdminStats();
  return res.status(result.status).json(result.body);
};
