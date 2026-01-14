import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // Добавлен In
import { Article } from './article.entity';
import { Category } from '../categories/category.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    const categories = await this.categoryRepo.find({
      where: { id: In(dto.categories) }, // Фикс: In для массива ID
    });
    const article = this.articleRepo.create({
      title: dto.title,
      content: dto.content,
      categories,
      published: dto.published ?? false,
    });
    return this.articleRepo.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepo.find({ relations: ['categories'] });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: string, dto: CreateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    if (dto.categories) {
      article.categories = await this.categoryRepo.find({
        where: { id: In(dto.categories) }, // Фикс: In для массива ID
      });
    }
    Object.assign(article, dto);
    return this.articleRepo.save(article);
  }

  async delete(id: string): Promise<void> {
    await this.articleRepo.delete(id);
  }
}