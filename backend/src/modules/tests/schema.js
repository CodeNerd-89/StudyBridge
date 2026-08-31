const OPTION_IDS = ['a', 'b', 'c', 'd'];

const cleanText = (value, fallback = '') => String(value ?? fallback).trim();

function normalizeOptions(rawOptions) {
  if (!Array.isArray(rawOptions) || rawOptions.length !== 4) return null;

  const options = rawOptions.map((option, index) => ({
    id: OPTION_IDS[index],
    text: cleanText(option?.text ?? option),
  }));

  if (options.some((option) => !option.text)) return null;
  if (new Set(options.map((option) => option.text.toLowerCase())).size !== 4) return null;
  return options;
}

export function normalizeQuestionSet(raw, { topic, difficulty, count }) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.questions)) {
    throw new Error('Question generator returned an invalid payload');
  }

  const expected = Math.max(3, Math.min(Number(count) || 10, 30));
  if (raw.questions.length < expected) {
    throw new Error('Question generator returned too few questions');
  }

  const questions = [];
  const seenPrompts = new Set();

  for (const item of raw.questions) {
    if (questions.length >= expected) break;
    const prompt = cleanText(item?.prompt);
    const options = normalizeOptions(item?.options);
    if (!prompt || !options || seenPrompts.has(prompt.toLowerCase())) continue;

    const rawCorrect = cleanText(item?.correctOptionId).toLowerCase();
    let correctOptionId = OPTION_IDS.includes(rawCorrect) ? rawCorrect : null;

    // If the generator shuffled ids, map the original option id to the normalized position.
    if (correctOptionId && Array.isArray(item?.options)) {
      const originalIndex = item.options.findIndex((option) => cleanText(option?.id).toLowerCase() === correctOptionId);
      if (originalIndex >= 0 && originalIndex < OPTION_IDS.length) correctOptionId = OPTION_IDS[originalIndex];
    }

    if (!correctOptionId) continue;

    seenPrompts.add(prompt.toLowerCase());
    questions.push({
      id: `q${questions.length + 1}`,
      prompt,
      options,
      correctOptionId,
      explanation: cleanText(item?.explanation),
    });
  }

  if (questions.length !== expected) {
    throw new Error('Question generator returned an incomplete question set');
  }

  return {
    topic: cleanText(raw.topic, topic) || topic,
    difficulty: ['easy', 'medium', 'hard'].includes(raw.difficulty) ? raw.difficulty : difficulty,
    questions,
  };
}

export function toClientQuestions({ topic, difficulty, questions }) {
  return {
    topic,
    difficulty,
    questions: (Array.isArray(questions) ? questions : []).map((question) => ({
      id: question.id,
      prompt: question.prompt,
      options: question.options.map((option) => ({ id: option.id, text: option.text })),
    })),
  };
}
