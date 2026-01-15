import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // CREATE ARTICLE (protected)
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  // GET ALL ARTICLES (public)
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  // GET ONE ARTICLE BY ID (public)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  // UPDATE ARTICLE (protected)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: CreateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  // DELETE ARTICLE (protected)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }
}
