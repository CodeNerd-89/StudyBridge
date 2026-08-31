/**
 * Prompt engineering for mock-exam question generation.
 * The prompts force the LLM to return a STRICT JSON object validated in schema.js.
 */

export const QUESTION_JSON_CONTRACT = `
Return ONLY a single JSON object (no markdown, no code fences, no prose) with this exact shape:

{
  "topic": string,
  "difficulty": "easy" | "medium" | "hard",
  "questions": [
    {
      "id": string,
      "prompt": string,
      "options": [
        { "id": "a", "text": string },
        { "id": "b", "text": string },
        { "id": "c", "text": string },
        { "id": "d", "text": string }
      ],
      "correctOptionId": "a" | "b" | "c" | "d",
      "explanation": string
    }
  ]
}

Rules:
- Produce EXACTLY the requested number of questions.
- Each question MUST have EXACTLY 4 options with ids "a","b","c","d".
- Exactly one correct option per question.
- Do not repeat questions. Keep options plausible and mutually exclusive.
- Output must be valid, parseable JSON. No trailing commas.
`;

const EXAM_GUIDANCE = {
  general: {
    Mathematics: 'Write standard academic mathematics questions appropriate to the requested difficulty.',
    English: 'Write general English grammar, vocabulary and reading-comprehension questions.',
    Science: 'Write general science questions covering age-appropriate biology, chemistry, physics and earth science.',
  },
  IELTS: {
    Reading: 'Write IELTS-style Reading multiple-choice practice. Include a short passage or extract inside each prompt and test main idea, detail, inference, vocabulary in context or writer purpose.',
    Listening: 'Write IELTS-style Listening practice suitable for this text-only interface. Put a short realistic listening transcript inside each prompt, then ask for a detail, time, place, number, instruction or speaker intention. Do not generate mathematics questions.',
  },
  GRE: {
    'Verbal Reasoning': 'Write GRE Verbal Reasoning multiple-choice questions using text completion, vocabulary-in-context and short reading-comprehension reasoning. Do not generate mathematics questions.',
    'Quantitative Reasoning': 'Write GRE Quantitative Reasoning questions covering arithmetic, algebra, geometry, ratios, percentages and data interpretation.',
  },
  SAT: {
    'Reading and Writing': 'Write SAT Reading and Writing questions using short passages, grammar, transitions, rhetoric, evidence and vocabulary in context. Do not generate standalone mathematics questions.',
    Math: 'Write SAT Math questions covering algebra, advanced math, problem solving, data analysis and geometry/trigonometry at the requested difficulty.',
  },
};

export function buildSystemPrompt() {
  return [
    'You are an expert exam-item writer for standardized academic exams.',
    'You must keep every question aligned with the exact exam and subject/section requested.',
    'You write clear, unambiguous multiple-choice questions.',
    'You always respond with strict JSON that matches the provided contract.',
  ].join(' ');
}

export function buildUserPrompt({ topic, difficulty = 'medium', count = 10, examType = 'general' }) {
  const guidance = EXAM_GUIDANCE[examType]?.[topic] || 'Keep every question strictly aligned with the requested exam and subject/section.';

  return `
Generate a mock exam question set.

Exam: ${examType}
Subject / Section: ${topic}
Difficulty: ${difficulty}
Number of questions: ${count}

Content requirements:
${guidance}
Do not mix content from a different exam or unrelated subject/section.

${QUESTION_JSON_CONTRACT}
`.trim();
}
