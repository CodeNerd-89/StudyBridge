import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database.js';

const signToken = (student) =>
  jwt.sign(
    { id: student.id, email: student.email, name: student.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

// Strip the password hash before returning user data to the client
const publicUser = (student) => {
  const { password, ...rest } = student;
  return rest;
};

// Coerce optional numeric fields so empty strings/undefined become null
// and numeric strings become numbers (Prisma Int/Decimal columns reject "")
const toNumberOrNull = (value) => {
  if (value === undefined || value === null) return null;
  if (String(value).trim() === '') return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

export const register = async (payload = {}) => {
  const {
    name,
    email,
    password,
    phone,
    country,
    institution,
    subject,
    cgpa,
    satScore,
    ieltsScore,
    preferredSubject,
    profileImage,
  } = payload;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    !password ||
    typeof country !== 'string' ||
    !country.trim()
  ) {
    return { status: 400, body: { message: 'Name, email, password and country are required.' } };
  }
  if (typeof password !== 'string' || password.length < 6) {
    return { status: 400, body: { message: 'Password must be at least 6 characters long.' } };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { message: 'Please provide a valid email address.' } };
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.student.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return { status: 409, body: { message: 'An account with this email already exists.' } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone?.trim() || null,
        country: country.trim(),
        institution: institution?.trim() || null,
        subject: subject?.trim() || null,
        cgpa: toNumberOrNull(cgpa),
        satScore: toNumberOrNull(satScore),
        ieltsScore: toNumberOrNull(ieltsScore),
        preferredSubject: preferredSubject?.trim() || null,
        profileImage: profileImage?.trim() || null,
      },
    });

    const token = signToken(student);

    return {
      status: 201,
      body: { success: true, message: 'Account created successfully.', token, user: publicUser(student) },
    };
  } catch (err) {
    console.error('Register error:', err);
    return { status: 500, body: { message: 'Something went wrong while creating your account.' } };
  }
};

export const me = async (userId) => {
  if (!userId) {
    return { status: 401, body: { message: 'Unauthorized' } };
  }

  try {
    const student = await prisma.student.findUnique({ where: { id: userId } });
    if (!student) {
      return { status: 404, body: { message: 'User not found.' } };
    }

    return { status: 200, body: { success: true, user: publicUser(student) } };
  } catch (err) {
    console.error('Me error:', err);
    return { status: 500, body: { message: 'Something went wrong while loading your profile.' } };
  }
};

export const login = async (payload = {}) => {
  const { email, password } = payload;

  if (!email || !password) {
    return { status: 400, body: { message: 'Email and password are required.' } };
  }

  try {
    const student = await prisma.student.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!student) {
      return { status: 401, body: { message: 'Invalid email or password.' } };
    }

    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return { status: 401, body: { message: 'Invalid email or password.' } };
    }

    const token = signToken(student);

    return {
      status: 200,
      body: { success: true, token, user: publicUser(student) },
    };
  } catch (err) {
    console.error('Login error:', err);
    return { status: 500, body: { message: 'Something went wrong while signing you in.' } };
  }
};
