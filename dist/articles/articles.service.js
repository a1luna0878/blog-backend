"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
const category_entity_1 = require("../categories/category.entity");
let ArticlesService = class ArticlesService {
    articleRepo;
    categoryRepo;
    constructor(articleRepo, categoryRepo) {
        this.articleRepo = articleRepo;
        this.categoryRepo = categoryRepo;
    }
    async create(dto) {
        const categories = await this.categoryRepo.find({
            where: { id: (0, typeorm_2.In)(dto.categories) },
        });
        const article = this.articleRepo.create({
            title: dto.title,
            content: dto.content,
            categories,
            published: dto.published ?? false,
        });
        return this.articleRepo.save(article);
    }
    async findAll() {
        return this.articleRepo.find({ relations: ['categories'] });
    }
    async findOne(id) {
        const article = await this.articleRepo.findOne({
            where: { id },
            relations: ['categories'],
        });
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        return article;
    }
    async update(id, dto) {
        const article = await this.findOne(id);
        if (dto.categories) {
            article.categories = await this.categoryRepo.find({
                where: { id: (0, typeorm_2.In)(dto.categories) },
            });
        }
        Object.assign(article, dto);
        return this.articleRepo.save(article);
    }
    async delete(id) {
        await this.articleRepo.delete(id);
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map