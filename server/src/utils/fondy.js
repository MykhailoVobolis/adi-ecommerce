import CloudIpsp from 'cloudipsp-node-js-sdk';
import { env } from './env.js';

export const fondy = new CloudIpsp({
  merchantId: env('FONDY_MERCHANT_ID'),
  secretKey: env('FONDY_SECRET_KEY'),
});
