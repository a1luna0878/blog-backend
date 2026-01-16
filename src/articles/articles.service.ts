import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
    const categoryIds = dto.categories || [];
    const categories = categoryIds.length
      ? await this.categoryRepo.findBy({ id: In(categoryIds) })
      : [];

    if (categoryIds.length && categories.length !== categoryIds.length) {
      throw new BadRequestException('Одна или несколько категорий не найдены');
    }

    const article = this.articleRepo.create({
      title: dto.title,
      content: dto.content || [],
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

    if (dto.categories !== undefined) {
      const categoryIds = dto.categories || [];
      article.categories = categoryIds.length
        ? await this.categoryRepo.findBy({ id: In(categoryIds) })
        : [];
    }

    if (dto.title !== undefined) article.title = dto.title;
    if (dto.content !== undefined) article.content = dto.content || [];
    if (dto.published !== undefined) article.published = dto.published;

    return this.articleRepo.save(article);
  }

  async delete(id: string): Promise<void> {
    const result = await this.articleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Article not found');
    }
  }
}