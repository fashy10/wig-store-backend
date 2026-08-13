import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allows your Next.js frontend (on a different domain) to talk to this API
  app.enableCors({
    origin: true, // during development; tighten this to your real frontend URL once deployed
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Wig store API running on port ${port}`);
}
bootstrap();
