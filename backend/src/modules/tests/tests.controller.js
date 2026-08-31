import * as testsService from './tests.service.js';

export async function generate(req, res) {
  const quiz = await testsService.generateQuiz(req.body || {});
  return res.status(201).json(quiz);
}

export async function performance(req, res) {
  const attempts = await testsService.listPerformance({
    ...req.query,
    userId: req.user?.id,
  });
  return res.json({ attempts });
}

export async function getOne(req, res) {
  const quiz = await testsService.fetchQuiz(req.params.quizId);
  return res.json(quiz);
}

export async function submit(req, res) {
  const result = await testsService.submitQuiz(req.params.quizId, {
    ...(req.body || {}),
    userId: req.user?.id,
  });
  return res.json(result);
}

// Kept for compatibility with any older imports.
export async function getQuizStatus(_req, res) {
  return res.json({ success: true, message: 'Exam API is ready' });
}
