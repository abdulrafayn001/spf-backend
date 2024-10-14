import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: process.env.FE_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  logger.log(`Application listening on ${port}`);
}
bootstrap();
