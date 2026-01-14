import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';

import { User } from './auth/user.entity';
import { Category } from './categories/category.entity';
import { Article } from './articles/article.entity';

@Module({
  imports: [
    // 🔑 Загружаем .env / переменные окружения (Render их видит автоматически)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🗄️ Подключение к PostgreSQL на Render через DATABASE_URL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (!databaseUrl) {
          throw new Error(
            'DATABASE_URL не найден! ' +
              'Зайди в Render → твой сервис → Environment → добавь DATABASE_URL ' +
              '(скопируй Internal Database URL из страницы PostgreSQL базы)',
          );
        }

        const url = new URL(databaseUrl);

        return {
          type: 'postgres' as const,

          // Разбираем URL на части (самый надёжный способ)
          host: url.hostname,
          port: Number(url.port) || 5432,
          username: url.username,
          password: url.password,
          database: url.pathname.replace(/^\//, ''), // убираем / в начале

          entities: [User, Category, Article],

          // Важно для Render! Без этого часто падает с ошибкой SSL или сертификата
          ssl: {
            rejectUnauthorized: false, // отключаем строгую проверку самоподписанного сертификата Render
          },

          // Настройки, которые были у тебя
          synchronize: true, // ок для pet-проекта / разработки, В ПРОДАКШЕНЕ → false + миграции!

          // Полезно для отладки (можно потом убрать или сделать условным)
          logging: process.env.NODE_ENV !== 'production' ? 'all' : false,
        };
      },
    }),

    AuthModule,
    CategoriesModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}