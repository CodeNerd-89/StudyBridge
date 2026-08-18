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

// ---------------------------------------------------------------------------
// Build university & scholarship context from database
// ---------------------------------------------------------------------------

const buildUniversityContext = (universities) => {
  if (!universities || universities.length === 0) {
    return 'No university data available in the database.';
  }

  return universities.map((u) => {
    const courses = Array.isArray(u.courses) ? u.courses.join(', ') : 'N/A';
    const lines = [
      `📌 ${u.name} (Rank #${u.ranking})`,
      `   Location: ${u.city || 'N/A'}, ${u.country}`,
      `   Tuition: $${u.tuitionAnnualUsd?.toLocaleString() || 'N/A'}/year`,
      `   Acceptance Rate: ${u.acceptanceRate != null ? u.acceptanceRate + '%' : 'N/A'}`,
      `   Application Fee: $${u.applicationFee || 'N/A'}`,
      `   Application Deadline: ${u.applicationDeadline || 'N/A'}`,
      `   IELTS Requirement: ${u.ieltsRequirement != null ? u.ieltsRequirement : 'Not specified'}`,
      `   GRE Requirement: ${u.greRequirement != null ? u.greRequirement : 'Not required'}`,
      `   Courses: ${courses}`,
      `   Website: ${u.websiteUrl || 'N/A'}`,
    ];
    return lines.join('\n');
  }).join('\n\n');
};

const buildScholarshipContext = (scholarships) => {
  if (!scholarships || scholarships.length === 0) {
    return 'No scholarship data available in the database.';
  }

  return scholarships.map((s) => {
    const lines = [
      `💰 ${s.name}`,
      `   Country: ${s.country}`,
      `   Amount: $${s.amountUsd?.toLocaleString() || 'N/A'}/year`,
      `   Funding Level: ${s.fundingLevel}`,
      `   Eligibility: ${s.eligibility || 'N/A'}`,
      `   Deadline: ${s.deadline || 'N/A'}`,
      `   Website: ${s.websiteUrl || 'N/A'}`,
    ];
    return lines.join('\n');
  }).join('\n\n');
};

const buildSystemPrompt = (studentContext, universityContext, scholarshipContext) => `
You are StudyBridge AI Admission Advisor — a knowledgeable and supportive counselor
that helps students navigate university admissions for study-abroad programs.

STUDENT PROFILE (from our database):
${studentContext}

=== UNIVERSITY DATABASE (${universityContext.split('📌').length - 1} universities) ===
${universityContext}

=== SCHOLARSHIP DATABASE ===
${scholarshipContext}

YOUR GUIDELINES:
1. Provide personalised advice based on the student profile AND the university/scholarship
   data shown above. This data comes from our live database.
2. When comparing scores to university requirements, clearly reference the
   student's actual numbers from their profile against the specific
   requirements from the database.
3. If the student's profile is missing data needed to answer a question
   (e.g., no GRE score recorded), point this out and suggest they update
   their profile.
4. When asked about a university or scholarship that IS in the database above,
   use the exact data provided (tuition, requirements, deadlines, etc.).
5. When asked about a university NOT in the database, clearly state that you
   don't have detailed data for that university in your records and recommend
   the student check the university's official website.
6. For scholarship questions, reference the specific scholarships listed
   in the database. Match scholarships by country relevance to the student.
7. Be encouraging but honest. If the student's profile suggests they may not
   meet typical requirements, provide constructive suggestions for improvement.
8. Focus on actionable advice: what steps to take, what scores to aim for,
   which types of programs might be a good fit.
9. Keep responses concise and well-structured. Use bullet points or numbered
   lists where appropriate.
10. Only discuss topics related to university admissions, scholarships, test
    preparation, and academic planning. Politely redirect off-topic questions.
11. When recommending universities, proactively match the student's scores
    and preferred subject to suitable programs from the database.
12. You can suggest universities where the student's IELTS/GRE scores meet
    or exceed requirements, and flag universities where they fall short.
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

    // --- Load universities and scholarships from database ---
    const [universities, scholarships] = await Promise.all([
      prisma.university.findMany({ orderBy: { ranking: 'asc' } }),
      prisma.scholarship.findMany({ orderBy: { name: 'asc' } }),
    ]);

    // --- Build prompt ---
    const studentContext = buildStudentContext(student);
    const universityContext = buildUniversityContext(universities);
    const scholarshipContext = buildScholarshipContext(scholarships);
    const systemPrompt = buildSystemPrompt(studentContext, universityContext, scholarshipContext);

    // --- Call Groq ---
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    const completion = await getClient().chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message.trim() },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return { status: 502, body: { success: false, message: 'AI service returned an empty response.' } };
    }

    return { status: 200, body: { success: true, reply } };
  } catch (err) {
    console.error('Chatbot error:', err?.status, err?.message || err);

    if (err?.status === 401 || err?.code === 'invalid_api_key') {
      return { status: 502, body: { success: false, message: 'AI service authentication failed. Check your Groq API key.' } };
    }
    if (err?.status === 404) {
      return { status: 502, body: { success: false, message: 'AI model not found. Please check your GROQ_MODEL configuration.' } };
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
