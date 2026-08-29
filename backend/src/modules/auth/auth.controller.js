import * as authService from './auth.service.js';

export const googleLogin = async (req, res) => {
  const result = await authService.googleLogin(req.body);
  return res.status(result.status).json(result.body);
};

export const register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(result.status).json(result.body);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(result.status).json(result.body);
};

export const me = async (req, res) => {
  const result = await authService.me(req.user.id);
  return res.status(result.status).json(result.body);
};

export const completeProfile = async (req, res) => {
  const result = await authService.completeProfile(req.user.id, req.body);
  return res.status(result.status).json(result.body);
};

export const getStudentCount = async (req, res) => {
  const result = await authService.getStudentCount();
  return res.status(result.status).json(result.body);
};