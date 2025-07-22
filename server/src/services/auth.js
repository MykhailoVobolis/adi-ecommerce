import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { createSession } from '../utils/createSession.js';
import { parseToken } from '../utils/parseToken.js';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { getUserNamePartsFromGoogleTokenPayload, validateCode } from '../utils/googleOAuth2.js';

// Функція для перевірки чи існує вже акаунт у юзера
export const checkUserEmail = async (payload) => {
  const normalizedEmail = normalizeEmail(payload.email);
  // повертаємо true, якщо email ВІЛЬНИЙ та false якщо ЗАЙНЯТИЙ
  return !(await UsersCollection.exists({ email: normalizedEmail }));
};

// Функція для register юзера
export const registerUser = async (payload) => {
  // перевірка на унікальність email
  const normalizedEmail = normalizeEmail(payload.email);
  const user = await UsersCollection.findOne({ email: normalizedEmail });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// Функція для login юзера
export const loginUser = async (payload) => {
  const normalizedEmail = normalizeEmail(payload.email);
  const user = await UsersCollection.findOne({ email: normalizedEmail });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const { _id } = user;
  const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await SessionsCollection.deleteOne({ userId: _id });

  const newSession = createSession(_id);

  return await SessionsCollection.create({
    ...newSession,
  });
};

// Функція для logout юзера
export const logoutUser = async (accessToken) => {
  // Знаходимо сесію за `accessToken`
  const session = await SessionsCollection.findOne({
    accessToken: accessToken,
  });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }
  // Видаляємо сесію з бази
  await SessionsCollection.deleteOne({ _id: session._id });
};

// Функція для refresh
export const refreshUsersSession = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw createHttpError(400, 'Refresh token is required');
  }

  const { _id } = parseToken(refreshToken, 'refresh');

  const session = await SessionsCollection.findOne({
    userId: _id,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession(_id);

  await SessionsCollection.deleteOne({ userId: _id, refreshToken });

  return await SessionsCollection.create({
    ...newSession,
  });
};

// Функція для login за допомогою GoogleOAuth2.0
export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    const { firstName, lastName } = getUserNamePartsFromGoogleTokenPayload(payload);

    user = await UsersCollection.create({
      email: payload.email,
      firstName,
      lastName,
      password,
    });
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession(user._id);

  return await SessionsCollection.create({
    ...newSession,
  });
};
