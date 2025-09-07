import path from 'node:path';

export const ACCESS_TOKEN_LIFETIME = 60 * 60 * 1000; // Терміну життя access токену - 60 хв.
export const REFRESH_TOKEN_LIFETIME = 30 * 24 * 3600 * 1000; // Терміну життя refresh токену - 30 днів

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
