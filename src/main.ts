import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';  // Добавь этот импорт

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Blog API')  // Название твоего API (можно изменить)
    .setDescription('API для блога с аутентификацией, категориями и статьями')  // Описание
    .setVersion('1.0')  // Версия
    .addBearerAuth()  // Если есть JWT-авторизация (для AuthModule)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Docs будут по /api (можно изменить путь)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();