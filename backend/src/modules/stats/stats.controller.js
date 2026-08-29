import * as statsService from './stats.service.js';

export const getStats = async (req, res) => {
  const result = await statsService.getStats();
  return res.status(result.status).json(result.body);
};
