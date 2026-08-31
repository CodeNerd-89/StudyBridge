import { generateDemoQuestionSet } from './demoQuestions.js';
import { buildSystemPrompt, buildUserPrompt } from './prompts.js';
import { normalizeQuestionSet } from './schema.js';

const parseJson = (text) => {
  const cleaned = String(text || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');
  return JSON.parse(cleaned);
};

async function generateWithGemini(input) {
  if (!process.env.GEMINI_API_KEY) return null;

  // Dynamic import keeps the offline fallback usable even when the AI SDK is unavailable.
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = process.env.GEMINI_QUIZ_MODEL || process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: buildSystemPrompt(),
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: buildUserPrompt(input) }] }],
    generationConfig: {
      temperature: 0.45,
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    },
  });

  const parsed = parseJson(result.response.text());
  return {
    questionSet: normalizeQuestionSet(parsed, input),
    provider: 'gemini',
    model: modelName,
  };
}

export async function generateQuestionSet(input) {
  try {
    const generated = await generateWithGemini(input);
    if (generated) return generated;
  } catch (error) {
    console.warn('[quiz] AI generation failed; using offline question bank:', error?.message || error);
  }

  return {
    questionSet: normalizeQuestionSet(generateDemoQuestionSet(input), input),
    provider: 'offline',
    model: 'built-in-question-bank',
  };
}
