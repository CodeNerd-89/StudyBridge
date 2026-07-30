import * as testsService from './tests.service.js';

export const getQuizStatus = async (req, res) => {
  const result = await testsService.getQuizStatus();
  return res.status(result.status).json(result.body);
};