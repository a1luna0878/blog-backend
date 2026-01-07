import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsArray()
  categories: string[]; // IDs категорий

  @IsArray()
  content: any[];

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
