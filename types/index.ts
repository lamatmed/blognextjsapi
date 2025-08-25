// types/index.ts
export interface User {
  id: string;
  phone: string;
  name?: string;
  image?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  userId: string;
  user: User;
}