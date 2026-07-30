import * as authService from './auth.service.js';

export const register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(result.status).json(result.body);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(result.status).json(result.body);
};

export const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};