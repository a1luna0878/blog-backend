
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { User } from './auth/user.entity';
import { Category } from './categories/category.entity';
import { Article } from './articles/article.entity';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      port: 5432,
      username: 'postgres', // Дефолтный юзер
      password: 'root', // Твой пароль из установки (или '' если без)
      database: 'blog', // БД, которую создал
      entities: [User, Category, Article],
      synchronize: true, // Авто-создаёт таблицы (только для dev!)
    }),
    AuthModule,
    CategoriesModule,
    ArticlesModule,
  ],
  controllers: [AppController, CategoriesController, ArticlesController],
  providers: [AppService, CategoriesService, ArticlesService],
})
export class AppModule {}