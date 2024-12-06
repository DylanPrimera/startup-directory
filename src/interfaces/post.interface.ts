export interface Post {
    id: number;
    title: string;
    category: string;
    description: string;
    author: Author;
    image: string;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}
interface Author {
    id: number;
    name: string;
}