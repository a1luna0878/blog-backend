import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Category } from './category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])]

})
export class CategoriesModule {}
