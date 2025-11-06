export interface SubCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
  subcategories: SubCategory[];
  createdAt: Date;
  updatedAt: Date;
}