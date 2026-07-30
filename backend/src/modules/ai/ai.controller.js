import * as aiService from './ai.service.js';

export const getChatStatus = async (req, res) => {
  const result = await aiService.getChatStatus();
  return res.status(result.status).json(result.body);
};