import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private repo;
    constructor(repo: Repository<Category>);
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, dto: CreateCategoryDto): Promise<Category>;
    delete(id: string): Promise<void>;
}
