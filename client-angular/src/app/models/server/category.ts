export interface CategoryRequest {
  name: string;
  image: string;
}

export interface CategoryPayload {
  parPage: number;
  page: number;
  searchValue: string;
}

export interface Category {
  name: string;
  image: string;
  slug: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponse {
  category: Category;
  message: string;
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
}
