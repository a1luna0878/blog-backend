import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]; // Many-to-many связь

  @Column('jsonb')
  content: {
    type: 'text' | 'header' | 'image' | 'video' | 'list-ordered' | 'list-unordered';
    content: string | { text: string; level?: number } | { url: string; alt?: string } | { items: string[] };
  }[];

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}