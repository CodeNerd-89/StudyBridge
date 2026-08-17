import * as chatbotService from './chatbot.service.js';

export const sendMessage = async (req, res) => {
  const result = await chatbotService.sendMessage(req.user.id, req.body.message);
  return res.status(result.status).json(result.body);
};
