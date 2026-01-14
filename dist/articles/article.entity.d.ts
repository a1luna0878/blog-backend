import { Category } from '../categories/category.entity';
export declare class Article {
    id: string;
    title: string;
    categories: Category[];
    content: {
        type: 'text' | 'header' | 'image' | 'video' | 'list-ordered' | 'list-unordered';
        content: string | {
            text: string;
            level?: number;
        } | {
            url: string;
            alt?: string;
        } | {
            items: string[];
        };
    }[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}
