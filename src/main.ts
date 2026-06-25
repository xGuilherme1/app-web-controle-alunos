import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import expressEjsLayouts from 'express-ejs-layouts';
import { registerHelpers } from './helpers';
import { buildValidationErrorPayload } from 'nest-validation-view';
import {
  getAuthConfig,
  getAuthCookieName,
  isValidAuthToken,
  readCookie,
} from './auth/simple-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(buildValidationErrorPayload(errors)),
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.use(expressEjsLayouts);
  app.set('layout', 'layouts/main');

  registerHelpers(app.getHttpAdapter().getInstance());

  app.use((req: any, res: any, next: () => void) => {
    const publicPaths = ['/login', '/css/', '/js/', '/img/', '/favicon.ico'];
    const isPublicPath = publicPaths.some((path) => req.path.startsWith(path));

    if (isPublicPath) {
      return next();
    }

    const token = readCookie(req.headers.cookie, getAuthCookieName());
    const authenticated = isValidAuthToken(token, getAuthConfig());

    if (!authenticated) {
      return res.redirect('/login');
    }

    res.locals.authUser = getAuthConfig().username;

    return next();
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () =>
    Logger.log(
      `Application running in http://localhost:${port}`,
      'NestExpressApplication',
    ),
  );
}
bootstrap();
