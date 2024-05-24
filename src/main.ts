import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const port: number = configService.getOrThrow('PORT');

  const config = new DocumentBuilder()
    .setTitle('V1 Super Backend API Documentation')
    .setDescription('API Documentations for FoodStyles ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
