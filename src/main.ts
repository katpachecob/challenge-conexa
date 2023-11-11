import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/swagger';
import { HttpExceptionFilter } from './utils/httpException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  app.useGlobalFilters(new HttpExceptionFilter());

  await setupSwagger(app);

  await app.listen(parseInt(process.env.PORT) || 8000, () =>
    console.log(`Running in port ${process.env.PORT || 8000}`),
  );
}
bootstrap();
