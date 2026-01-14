import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Category } from '../categories/category.entity';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticlesService {
    private articleRepo;
    private categoryRepo;
    constructor(articleRepo: Repository<Article>, categoryRepo: Repository<Category>);
    create(dto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    update(id: string, dto: CreateArticleDto): Promise<Article>;
    delete(id: string): Promise<void>;
}
