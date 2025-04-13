import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
   const uploadDir = join(process.cwd(), 'public');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
    app.use('/public', express.static(join(process.cwd(), 'public'))); 
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
