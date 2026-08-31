import crypto from 'node:crypto';

const VERSION = 'v1';
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const error = new Error('JWT_SECRET is required for exam submission tokens');
    error.status = 500;
    throw error;
  }
  return crypto.createHash('sha256').update(secret).digest();
}

export function createQuizToken(quiz) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', secretKey(), iv);
  const payload = JSON.stringify({
    ...quiz,
    tokenExpiresAt: Date.now() + MAX_AGE_MS,
  });
  const ciphertext = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, iv.toString('base64url'), tag.toString('base64url'), ciphertext.toString('base64url')].join('.');
}

export function readQuizToken(token) {
  try {
    const [version, ivPart, tagPart, cipherPart] = String(token || '').split('.');
    if (version !== VERSION || !ivPart || !tagPart || !cipherPart) return null;

    const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey(), Buffer.from(ivPart, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagPart, 'base64url'));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(cipherPart, 'base64url')),
      decipher.final(),
    ]).toString('utf8');

    const payload = JSON.parse(plaintext);
    if (!payload?.id || !Array.isArray(payload?.questions)) return null;
    if (!payload.tokenExpiresAt || Date.now() > Number(payload.tokenExpiresAt)) return null;
    delete payload.tokenExpiresAt;
    return payload;
  } catch {
    return null;
  }
}
