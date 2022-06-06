
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getGlobalFilters } from './utils/filters';
import { getGlobalInterceptors } from './utils/interceptors';
import { getGlobalPipes } from './utils/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost)

  app.useGlobalPipes(...getGlobalPipes())
  app.useGlobalFilters(...getGlobalFilters(httpAdapterHost))
  app.useGlobalInterceptors(...getGlobalInterceptors())

  await app.listen(3000);
}
bootstrap();
