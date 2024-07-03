import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
  });

  const hbs = require('handlebars');
  hbs.registerHelper('toJSON', function (obj) {
    return JSON.stringify(obj, null, 3);
  });

  hbs.create();

  app.setViewEngine({
    engine: {
      handlebars: hbs,
    },
    templates: join(__dirname, '..', 'views'),
  });
  await app.listen(3000);
}

bootstrap();
