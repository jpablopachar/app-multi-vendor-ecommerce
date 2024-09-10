export interface CategoryRequest {
  name: string;
  image: File;
}

export interface CategoryPayload {
  parPage: number | string;
  page: number | string;
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
