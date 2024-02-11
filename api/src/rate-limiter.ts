import { Redis } from 'ioredis';
import * as E from 'fp-ts/Either';
import { hoursToSeconds } from 'date-fns/hoursToSeconds';

interface User {
  id: string;
}

interface Environment {
  id: string;
}

type EmailType = 'magic-code' | 'invitation' | 'password-reset';

type RateLimiterKey =
  `email-rate-limiter:${User['id']}:${Environment['id']}:${EmailType}`;

const maxDailyLimitAllowed = 10;

export class RateLimiter {
  redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  async rateLimit(user: User, environment: Environment, emailType: EmailType) {
    const key = this.getRateLimitKey(user, environment, emailType);

    try {
      const currentValue = await this.redis.get(key);

      if (!currentValue) {
        const expirationInSeconds = hoursToSeconds(24);

        await this.redis.set(key, 1, 'EX', expirationInSeconds);
      }

      if (Number(currentValue) >= maxDailyLimitAllowed) {
        return E.left('You have reached your daily email sending quota.');
      }

      await this.redis.incr(key);

      return E.right(null);
    } catch (err) {
      if (err instanceof Error) {
        return E.left(err.message);
      }

      return E.left('Unknown error');
    }
  }

  private getRateLimitKey(
    user: User,
    environment: Environment,
    emailType: EmailType,
  ): RateLimiterKey {
    return `email-rate-limiter:${user.id}:${environment.id}:${emailType}`;
  }
}
