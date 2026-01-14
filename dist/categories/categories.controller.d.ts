import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private service;
    constructor(service: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    findAll(): Promise<import("./category.entity").Category[]>;
    findOne(id: string): Promise<import("./category.entity").Category>;
    update(id: string, dto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    delete(id: string): Promise<void>;
}
