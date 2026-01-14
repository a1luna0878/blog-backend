import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticlesController {
    private service;
    constructor(service: ArticlesService);
    create(dto: CreateArticleDto): Promise<import("./article.entity").Article>;
    findAll(): Promise<import("./article.entity").Article[]>;
    findOne(id: string): Promise<import("./article.entity").Article>;
    update(id: string, dto: CreateArticleDto): Promise<import("./article.entity").Article>;
    delete(id: string): Promise<void>;
}
