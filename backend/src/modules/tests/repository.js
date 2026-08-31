import { randomUUID } from 'node:crypto';

const quizzes = new Map();
const attempts = [];
const MAX_QUIZZES = 250;
const MAX_ATTEMPTS = 1000;

function trimQuizzes() {
  while (quizzes.size > MAX_QUIZZES) {
    const firstKey = quizzes.keys().next().value;
    quizzes.delete(firstKey);
  }
}

export async function createQuiz(data) {
  const quiz = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  quizzes.set(quiz.id, quiz);
  trimQuizzes();
  return quiz;
}

export async function getQuiz(id) {
  return quizzes.get(String(id)) || null;
}

export async function createAttempt(data) {
  const attempt = {
    ...data,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  attempts.unshift(attempt);
  if (attempts.length > MAX_ATTEMPTS) attempts.length = MAX_ATTEMPTS;
  return attempt;
}

export async function getAttempts({ userId, limit = 20 } = {}) {
  const normalizedUserId = userId == null ? null : String(userId);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 100));
  return attempts
    .filter((attempt) => !normalizedUserId || String(attempt.userId) === normalizedUserId)
    .slice(0, safeLimit)
    .map(({ breakdown, answers, ...summary }) => summary);
}
