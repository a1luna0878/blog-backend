import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post() @UseGuards(JwtAuthGuard) create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Put(':id') @UseGuards(JwtAuthGuard) update(@Param('id') id: string, @Body() dto: CreateCategoryDto) { return this.service.update(id, dto); }
  @Delete(':id') @UseGuards(JwtAuthGuard) delete(@Param('id') id: string) { return this.service.delete(id); }
}