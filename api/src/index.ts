import express from 'express';
import bodyParser from 'body-parser';
import { RateLimiter } from './rate-limiter';
import * as E from 'fp-ts/Either';
import WorkOS from '@workos-inc/node';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const mockRequestData = {
  user: { id: 'test' },
  environment: { id: 'sandbox' },
  emailType: 'magic-code',
} as const;

app.get('/rate-limit-test', async (req, res) => {
  const rateLimiter = new RateLimiter();

  const { user, environment, emailType } = mockRequestData;

  const result = await rateLimiter.rateLimit(user, environment, emailType);

  return E.isLeft(result)
    ? res.status(429).send(result.left)
    : res.send('Hello, World!');
});

app.get('/workos', async (req, res) => {
  const workos = new WorkOS('test', {
    apiHostname: "localhost",
    port: 7000,
    https: false,
  });

  // const response = await workos.userManagement.sendPasswordResetEmail({
  //   email: 'laurabeatriserafim@gmail.com',
  //   passwordResetUrl: 'https://your-app.com/reset-password',
  // });

  const response = await workos.userManagement.sendMagicAuthCode({
    email: 'laurabeatriserafim@gmail.com',
  });

  console.log({ response })

  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
