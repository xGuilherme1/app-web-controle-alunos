import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'app_auth';

export type AuthConfig = {
  username: string;
  password: string;
  secret: string;
};

export const getAuthConfig = (): AuthConfig => ({
  username: process.env.AUTH_USERNAME ?? 'admin',
  password: process.env.AUTH_PASSWORD ?? 'admin',
  secret: process.env.AUTH_SECRET ?? 'dev-secret-change-me',
});

export const getAuthCookieName = (): string => COOKIE_NAME;

export const createAuthToken = (username: string, secret: string): string => {
  const signature = createHmac('sha256', secret).update(username).digest('hex');

  return `${username}.${signature}`;
};

export const isValidAuthToken = (
  token: string | undefined,
  config = getAuthConfig(),
): boolean => {
  if (!token) return false;

  const [username, signature] = token.split('.');

  if (!username || !signature || username !== config.username) return false;

  const expected = createAuthToken(username, config.secret).split('.')[1];
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(signatureBuffer, expectedBuffer);
};

export const readCookie = (
  cookieHeader: string | undefined,
  name: string,
): string | undefined => {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const found = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  if (!found) return undefined;

  return decodeURIComponent(found.slice(name.length + 1));
};

export const buildAuthCookie = (token: string): string =>
  `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`;

export const buildLogoutCookie = (): string =>
  `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
