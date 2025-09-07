import createHttpError from 'http-errors';
import path from 'node:path';

import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'fs/promises';
import { env, ENV_VARS } from './env.js';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

// Обробка двох URL-адрес залежно від того, запущено локальний сервер чи продакшен
// Визначення оточення
const isProduction = process.env.NODE_ENV === 'production';

// Обробка першого чи другого redirect URL для локальної розробки чи продакшену
// ПІСЛЯ ДЕПЛОЮ ОБОВ'ЯЗКОВО ПЕРЕВІРИТИ redirect URL https://top-e-commerce.vercel.app/confirm-google-auth google-oauth.json
// також за потреби заінити redirect URL у
const curentRedirectUrl = isProduction ? oauthConfig.web.redirect_uris[1] : oauthConfig.web.redirect_uris[0];

const googleOAuthClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
  redirectUri: curentRedirectUrl,
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getUserNamePartsFromGoogleTokenPayload = (payload) => {
  const firstName = payload.given_name || 'Guest';
  const lastName = payload.family_name || '';
  return { firstName, lastName };
};
