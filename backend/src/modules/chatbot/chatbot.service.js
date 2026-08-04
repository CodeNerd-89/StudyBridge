import Groq from 'groq-sdk';
import prisma from '../../config/database.js';

// Lazy-initialized singleton
let groqClient;

const getClient = () => {
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const buildStudentContext = (student) => {
  const lines = [
    `Name: ${student.name}`,
    `Email: ${student.email}`,
    `Country: ${student.country}`,
  ];

  if (student.institution) lines.push(`Current Institution: ${student.institution}`);
  if (student.subject) lines.push(`Current Subject: ${student.subject}`);
  if (student.preferredSubject) lines.push(`Preferred Subject for Study Abroad: ${student.preferredSubject}`);
  if (student.cgpa != null) lines.push(`CGPA: ${student.cgpa}`);
  if (student.ieltsScore != null) lines.push(`IELTS Score: ${student.ieltsScore}`);
  if (student.satScore != null) lines.push(`SAT Score: ${student.satScore}`);
  if (student.greScore != null) lines.push(`GRE Score: ${student.greScore}`);

  return lines.join('\n');
};

const buildSystemPrompt = (studentContext) => `
You are StudyBridge AI Admission Advisor — a knowledgeable and supportive counselor
that helps students navigate university admissions for study-abroad programs.

STUDENT PROFILE (from our database):
${studentContext}

YOUR GUIDELINES:
1. Provide personalised advice based ONLY on the student profile shown above.
2. When comparing scores to university requirements, clearly reference the
   student's actual numbers from their profile.
3. If the student's profile is missing data needed to answer a question
   (e.g., no GRE score recorded), point this out and suggest they update
   their profile.
4. Do NOT fabricate specific admission statistics, acceptance rates, or
   cutoff scores. If you are unsure about a university's exact requirements,
   say so and recommend the student verify on the university's official website.
5. Be encouraging but honest. If the student's profile suggests they may not
   meet typical requirements, provide constructive suggestions for improvement.
6. Focus on actionable advice: what steps to take, what scores to aim for,
   which types of programs might be a good fit.
7. Keep responses concise and well-structured. Use bullet points or numbered
   lists where appropriate.
8. Only discuss topics related to university admissions, scholarships, test
   preparation, and academic planning. Politely redirect off-topic questions.
`.trim();

// ---------------------------------------------------------------------------
// Main service function
// ---------------------------------------------------------------------------

export const sendMessage = async (userId, message) => {
  // --- Input validation ---
  if (!message || typeof message !== 'string' || !message.trim()) {
    return { status: 400, body: { success: false, message: 'Message is required.' } };
  }

  if (!process.env.GROQ_API_KEY) {
    console.error('Chatbot error: GROQ_API_KEY is not configured.');
    return { status: 500, body: { success: false, message: 'AI service is not configured.' } };
  }

  try {
    // --- Load student profile ---
    const student = await prisma.student.findUnique({ where: { id: userId } });

    if (!student) {
      return { status: 404, body: { success: false, message: 'Student profile not found.' } };
    }

    // --- Build prompt ---
    const studentContext = buildStudentContext(student);
    const systemPrompt = buildSystemPrompt(studentContext);

    // --- Call Groq ---
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    const completion = await getClient().chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message.trim() },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return { status: 502, body: { success: false, message: 'AI service returned an empty response.' } };
    }

    return { status: 200, body: { success: true, reply } };
  } catch (err) {
    console.error('Chatbot error:', err);

    if (err?.status === 401 || err?.code === 'invalid_api_key') {
      return { status: 502, body: { success: false, message: 'AI service authentication failed. Check your Groq API key.' } };
    }
    if (err?.status === 429) {
      return { status: 429, body: { success: false, message: 'AI service rate limit exceeded. Please try again in a moment.' } };
    }
    if (err?.status >= 500) {
      return { status: 502, body: { success: false, message: 'AI service is temporarily unavailable.' } };
    }

    return { status: 500, body: { success: false, message: 'Something went wrong while processing your message.' } };
  }
};
