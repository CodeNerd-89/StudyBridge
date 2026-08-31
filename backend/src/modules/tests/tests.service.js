import { generateQuestionSet } from './llm.js';
import { createQuiz, getQuiz, createAttempt, getAttempts } from './repository.js';
import { toClientQuestions } from './schema.js';
import { createQuizToken, readQuizToken } from './quizToken.js';

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function notFound(message) {
  const error = new Error(message);
  error.status = 404;
  return error;
}


const EXAM_SECTIONS = {
  general: ['Mathematics', 'English', 'Science'],
  IELTS: ['Reading', 'Listening'],
  GRE: ['Verbal Reasoning', 'Quantitative Reasoning'],
  SAT: ['Reading and Writing', 'Math'],
};

function normalizeExamType(value) {
  const raw = String(value || 'general').trim();
  if (raw.toLowerCase() === 'general') return 'general';
  const upper = raw.toUpperCase();
  return ['IELTS', 'GRE', 'SAT'].includes(upper) ? upper : null;
}

function normalizeSection(examType, value) {
  const raw = String(value || '').trim();
  const allowed = EXAM_SECTIONS[examType] || [];
  return allowed.find((section) => section.toLowerCase() === raw.toLowerCase()) || null;
}

function maxQuestionsFor(examType, topic) {
  if (examType === 'IELTS') return 10;
  if (examType === 'GRE' && topic === 'Verbal Reasoning') return 10;
  if (examType === 'SAT' && topic === 'Reading and Writing') return 10;
  return 30;
}

export async function generateQuiz(input) {
  const examType = normalizeExamType(input.examType);
  if (!examType) throw badRequest('Invalid exam type');

  const defaultTopic = EXAM_SECTIONS[examType][0];
  const topic = normalizeSection(examType, input.topic || defaultTopic);
  if (!topic) throw badRequest(`Invalid subject/section for ${examType === 'general' ? 'General' : examType} exam`);

  const normalizedDifficulty = String(input.difficulty || 'medium').toLowerCase();
  const difficulty = ['easy','medium','hard'].includes(normalizedDifficulty) ? normalizedDifficulty : 'medium';
  const count = Math.max(3, Math.min(Number(input.count) || 10, maxQuestionsFor(examType, topic)));
  const durationSec = Math.max(60, Math.min(Number(input.durationSec) || count * 60, 7200));

  const { questionSet, provider, model } = await generateQuestionSet({ topic, examType, difficulty, count });
  const quiz = await createQuiz({
    topic: questionSet.topic || topic,
    examType,
    difficulty: questionSet.difficulty || difficulty,
    durationSec,
    questions: questionSet.questions,
    provider,
    model,
  });

  return {
    id: quiz.id,
    examType: quiz.examType,
    durationSec: quiz.durationSec,
    provider: quiz.provider,
    createdAt: quiz.createdAt,
    submissionToken: createQuizToken(quiz),
    ...toClientQuestions({ topic: quiz.topic, difficulty: quiz.difficulty, questions: quiz.questions }),
  };
}

export async function fetchQuiz(id) {
  const quiz = await getQuiz(id);
  if (!quiz) throw notFound('Exam not found');
  return {
    id: quiz.id,
    examType: quiz.examType,
    durationSec: quiz.durationSec,
    createdAt: quiz.createdAt,
    ...toClientQuestions({ topic: quiz.topic, difficulty: quiz.difficulty, questions: quiz.questions }),
  };
}

export async function submitQuiz(quizId, payload) {
  let quiz = await getQuiz(quizId);
  if (!quiz && payload?.submissionToken) {
    quiz = readQuizToken(payload.submissionToken);
  }
  if (!quiz) throw notFound('Exam not found');
  if (String(quiz.id) !== String(quizId)) throw badRequest('Exam submission does not match this exam');
  if (!payload || !Array.isArray(payload.answers)) throw badRequest('answers must be an array');

  // Client answers are [{questionId, optionId}].
  const selectedByQuestion = new Map(
    payload.answers
      .filter((a) => a && a.questionId)
      .map((a) => [String(a.questionId), a.optionId == null ? null : String(a.optionId)])
  );

  const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
  const breakdown = questions.map((question) => {
    const requestedOptionId = selectedByQuestion.get(String(question.id)) || null;
    const allowedOptionIds = new Set(question.options.map((option) => String(option.id)));
    const selectedOptionId = requestedOptionId && allowedOptionIds.has(requestedOptionId) ? requestedOptionId : null;
    const isCorrect = selectedOptionId === question.correctOptionId;
    return {
      questionId: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOptionId,
      correctOptionId: question.correctOptionId,
      isCorrect,
      explanation: question.explanation || '',
    };
  });

  const correctCount = breakdown.filter((item) => item.isCorrect).length;
  const skippedCount = breakdown.filter((item) => !item.selectedOptionId).length;
  const wrongCount = questions.length - correctCount - skippedCount;
  const total = questions.length;
  const score = correctCount;
  const percentage = total ? Number(((correctCount / total) * 100).toFixed(2)) : 0;
  const durationSec = Math.max(0, Math.min(Number(payload.durationSec) || 0, quiz.durationSec));

  const attempt = await createAttempt({
    quizId,
    userId: payload.userId ? String(payload.userId) : null,
    score,
    total,
    percentage,
    correctCount,
    wrongCount,
    skippedCount,
    durationSec,
    answers: payload.answers,
    breakdown,
  });

  return {
    attemptId: attempt.id,
    quizId,
    topic: quiz.topic,
    examType: quiz.examType,
    difficulty: quiz.difficulty,
    score,
    total,
    percentage,
    correctCount,
    wrongCount,
    skippedCount,
    durationSec,
    submittedAt: attempt.submittedAt,
    breakdown,
  };
}

export async function listPerformance(query) {
  return getAttempts({ userId: query.userId, limit: Number(query.limit) || 20 });
}
