export type BlogsType = {
  _id: string;
  image: string;
  author: string;
  title: string;
  categories: string[];
  description: string;
  updatedAt: string;
  clicks?: number;
};
