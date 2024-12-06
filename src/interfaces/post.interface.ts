export interface Post {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  slug: Slug;
  _createdAt: Date;
  author: Author;
  views: number;
}

export interface Author {
  _id: string;
  name: string;
  image: string;
  email: string;
}

export interface Slug {
  current: string;
  _type: string;
}
