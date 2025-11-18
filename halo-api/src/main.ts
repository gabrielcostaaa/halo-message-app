import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilita CORS para permitir requisições do React Native
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Servir arquivos estáticos (avatares)
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Halo API running on: http://localhost:${port}`);
  console.log(`📡 WebSocket server ready for connections`);
  console.log(`🖼️  Avatars available at: http://localhost:${port}/avatars/`);
}

void bootstrap();
