import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { SentryFilter } from './common/filters/sentry.filter';
import { CustomLogger } from './logger/logger.service';

async function bootstrap() {
  dotenv.config();

  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   integrations: [
  //     new Sentry.Integrations.Http({ tracing: true }),
  //     new Tracing.Integrations.Express({ app }),
  //   ],
  //   tracesSampleRate: 1.0,
  // });

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const customLogger = app.get(CustomLogger);
  app.useLogger(customLogger);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

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

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
