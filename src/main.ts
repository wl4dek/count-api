import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

import { AppModule } from '@/app.module';
// import { readOpenAPISpec } from '@/modules/common/utils';

import env from '@/config/env';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from '@/modules/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const refactor = new Reflector();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(refactor));
  app.useGlobalInterceptors(new TimeoutInterceptor(refactor));
  // const oas = await readOpenAPISpec(join(__dirname, 'specs', 'openapi.json'));
  // SwaggerModule.setup('docs/rest', app, oas);

  await app.listen(env.app.port);
}

bootstrap();
