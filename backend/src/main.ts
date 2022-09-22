import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cabi Admin v2 API')
    .setDescription('Cabi Admin v2 API 명세')
    .setVersion('2.0')
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, SwaggerDocument);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
}

bootstrap();
