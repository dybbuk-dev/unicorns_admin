import RateLimit from 'express-rate-limit';
// import MongoStore from 'rate-limit-mongo';
// import { getConfig } from '../config';

export function createRateLimiter({
  max,
  windowMs,
  message,
}: {
  max: number;
  windowMs: number;
  message: string;
}) {
  return RateLimit({
    max,
    windowMs,
    message,
    skip: (req) => {
      if (req.method === 'OPTIONS') {
        return true;
      }

      if (req.originalUrl.endsWith('/import')) {
        return true;
      }

      return false;
    },
  });
}
