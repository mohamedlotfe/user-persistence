import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeORMQueryExceptionFilter } from './utils/error-hnadling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeORMQueryExceptionFilter())
  await app.listen(3000);
}
bootstrap();
