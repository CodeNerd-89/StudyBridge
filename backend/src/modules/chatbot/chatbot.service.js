import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '../../config/database.js';

// Lazy-initialized singleton
let genAIClient;

const getApiKey = () => {
  const raw = process.env.GEMINI_API_KEY || '';
  return raw.replace(/^['"]|['"]$/g, '').trim();
};

const getClient = () => {
  if (!genAIClient) {
    const key = getApiKey();
    genAIClient = new GoogleGenerativeAI(key);
  }
  return genAIClient;
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
You are StudyBridge AI Admission Advisor — an elite, knowledgeable, and empathetic global education counselor helping students navigate university admissions, scholarships, exam preparation, visa procedures, and career planning.

STUDENT PROFILE (from live database):
${studentContext}

=== PARTNER UNIVERSITIES DATABASE (${universityContext.split('📌').length - 1} institutions) ===
${universityContext}

=== SCHOLARSHIP DATABASE ===
${scholarshipContext}

YOUR COUNSELING CAPABILITIES & GUIDELINES:
1. Personalized Matching & Direct Profiling:
   - Always reference the student's actual profile data (Name, CGPA, IELTS, SAT, GRE, Preferred Subject, and Country of origin).
   - Connect your advice directly to their academic strengths and highlight any score targets (e.g. recommending IELTS band targets if missing).
2. Deep & Detailed University Recommendations:
   - When a student asks for university recommendations or matches, provide **concrete, fully detailed recommendations** categorized into three clear tiers:
     * 🚀 **Reach / Dream Universities** (Highly competitive, top 1-30 world ranks)
     * 🎯 **Target / Strong Match Universities** (Great alignment with student's CGPA & test scores)
     * 🛡️ **Safety / High-Value & Budget-Friendly Options** (High acceptance rates or low/zero tuition like Germany/Europe)
   - For **every recommended university**, provide the full breakdown:
     - **Name, Rank & Location** (e.g. *University of Waterloo (Rank #45) — Canada*)
     - **Matching Program** (e.g. *B.S. in Computer Science*)
     - **Tuition & Costs** (e.g. *$34,000/year USD*)
     - **Admission Requirements vs Student's Score** (e.g. *Requires IELTS 6.5 — your score of 7.5 exceeds this!*)
     - **Acceptance Rate & Deadlines**
     - **Why it fits the student's career & academic goals**
3. Comprehensive Knowledge:
   - Answer all questions on international higher education: application materials (SOPs, LORs, CVs), test preparation (IELTS, GRE, SAT), visas & post-study work permits (OPT, CPT, PGWP, Blue Card), and scholarships.
4. Database Grounding:
   - When questions involve universities or scholarships in our partner database, use the exact figures provided (tuition, rank, acceptance rate, requirements, deadlines).
   - When recommending world universities outside the database, provide accurate global counselor knowledge and link to their official requirements.
5. Clean Markdown Formatting & Completeness:
   - Structure responses with clear headings (###), bold key metrics (**Tuition**, **IELTS Requirement**), bullet points, and clean dividers (---).
   - **CRITICAL**: Always complete your full response. Never stop midway or leave sections cut off.
`.trim();

// ---------------------------------------------------------------------------
// Main service function
// ---------------------------------------------------------------------------

export const sendMessage = async (userId, message) => {
  // --- Input validation ---
  if (!message || typeof message !== 'string' || !message.trim()) {
    return { status: 400, body: { success: false, message: 'Message is required.' } };
  }

  if (!getApiKey()) {
    console.error('Chatbot error: GEMINI_API_KEY is not configured.');
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

    // --- Call Gemini with Fallback Models ---
    const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
    const fallbackModels = [
      preferredModel,
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite-preview',
      'gemini-3-flash-preview',
      'gemini-3.5-flash-lite',
    ];
    // Remove duplicate model names while preserving order
    const candidateModels = [...new Set(fallbackModels)];

    const genAI = getClient();
    let reply = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemPrompt,
        });

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        });

        reply = result?.response?.text()?.trim();
        if (reply) break;
      } catch (err) {
        lastError = err;
        console.warn(`Gemini model ${modelName} failed, trying next fallback:`, err?.message || err);
      }
    }

    if (!reply) {
      if (lastError) throw lastError;
      return { status: 502, body: { success: false, message: 'AI service returned an empty response.' } };
    }

    return { status: 200, body: { success: true, reply } };
  } catch (err) {
    console.error('Chatbot error:', err?.status, err?.message || err);

    if (
      err?.status === 401 ||
      err?.code === 'invalid_api_key' ||
      (err?.status === 400 && (err?.message?.includes('API key') || err?.message?.includes('API_KEY')))
    ) {
      return { status: 502, body: { success: false, message: 'AI service authentication failed. Check your Gemini API key.' } };
    }
    if (err?.status === 404) {
      return { status: 502, body: { success: false, message: 'AI model not found. Please check your GEMINI_MODEL configuration.' } };
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
