import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filter/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Set global prefix for all routes
  app.enableCors(); // Enable CORS for all routes
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips out unexpected fields
      forbidNonWhitelisted: true, // throws error if extra fields are present
      transform: true, // auto-transforms DTOs
    }),
  );
   app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
