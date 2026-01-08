import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // Замени на свой реальный пароль, который ты задал при установке PostgreSQL
      database: 'blog',
      entities: [User, Category, Article], // Перечисляем entities явно для надёжности
      synchronize: true, // OK для dev, в продакшене выключи
    }),
    AuthModule,
    CategoriesModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}