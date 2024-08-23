import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { SentryFilter } from './common/filters/sentry.filter';
import { CustomLogger } from './common/logger/logger.service';

async function bootstrap() {
  dotenv.config();

  // Initialize Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [Sentry.nestIntegration()],
    tracesSampleRate: 1.0,
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  // Use helmet for security headers
  app.use(helmet());

  const customLogger = app.get(CustomLogger);
  app.useLogger(customLogger);

  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Use Sentry interceptor
  app.useGlobalInterceptors(new SentryInterceptor());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('TaskMagnet API')
    .setDescription('API documentation for TaskMagnet project')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapterHost, customLogger));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
