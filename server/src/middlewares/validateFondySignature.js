import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

export const validateFondySignature = async (req, res, next) => {
  try {
    const { signature, response_signature_string, ...rest } = req.body;

    if (!signature) {
      throw createHttpError(400, 'Missing signature');
    }

    const password = env('FONDY_SECRET_KEY');

    // Замінюємо всі ********** на справжній пароль
    const stringToSign = response_signature_string.replace(/\*{10}/g, password);

    const calculatedSignature = crypto.createHash('sha1').update(stringToSign, 'utf8').digest('hex');

    if (calculatedSignature !== signature) {
      throw createHttpError(400, 'Invalid signature');
    }

    console.log('Fondy signature valid ✅');
    req.fondyData = rest;

    next();
  } catch (error) {
    if (!createHttpError.isHttpError(error)) {
      return next(createHttpError(500, error.message));
    }
    next(error);
  }
};
