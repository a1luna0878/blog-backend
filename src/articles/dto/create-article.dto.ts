import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'Моя первая статья' })
  @IsString()
  title: string;

  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440000'],
    description: 'Массив ID категорий',
  })
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty({
    example: [{ type: 'paragraph', data: { text: 'Текст статьи...' } }],
  })
  @IsArray()
  content: any[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}