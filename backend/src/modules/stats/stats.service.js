import prisma from '../../config/database.js';

// In-memory cache with TTL
let cache = { data: null, expiresAt: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getStats = async () => {
  const now = Date.now();

  // Return cached data if still valid
  if (cache.data && now < cache.expiresAt) {
    return { status: 200, body: { success: true, data: cache.data } };
  }

  try {
    const [universityCount, scholarshipCount, studentCount] = await Promise.all([
      prisma.university.count(),
      prisma.scholarship.count(),
      prisma.student.count(),
    ]);

    const data = { universityCount, scholarshipCount, studentCount };
    cache = { data, expiresAt: now + CACHE_TTL_MS };

    return { status: 200, body: { success: true, data } };
  } catch (err) {
    console.error('Stats error:', err);
    // Serve stale cache if available, otherwise return zeros
    if (cache.data) {
      return { status: 200, body: { success: true, data: cache.data } };
    }
    return { status: 200, body: { success: true, data: { universityCount: 0, scholarshipCount: 0, studentCount: 0 } } };
  }
};
