import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  async findAll(): Promise<Category[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, dto: CreateCategoryDto): Promise<Category> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}