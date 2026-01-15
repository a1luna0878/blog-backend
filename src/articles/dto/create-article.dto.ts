import { IsString, IsArray, IsBoolean, IsOptional, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CategoryIdDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class CreateArticleDto {
  @ApiProperty({ example: 'Моя первая статья' })
  @IsString()
  title: string;

  @ApiProperty({
        example: ['550e8400-e29b-41d4-a716-446655440000'],
        description: 'Массив ID категорий',
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CategoryIdDto)
    private _categories?: CategoryIdDto[] | undefined;   // ← изменили на объекты, но можно и просто string[]
    public get categories(): CategoryIdDto[] | undefined {
        return this._categories;
    }
    public set categories(value: CategoryIdDto[] | undefined) {
        this._categories = value;
    }

  // Вариант проще (если хочешь оставить как было — массив строк)
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // categories?: string[];

  @ApiProperty({
    example: [{ type: 'paragraph', data: { text: 'Текст статьи...' } }],
  })
  @IsArray()
  content: any[];   // ← можно сделать строже, но пока оставим any

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}