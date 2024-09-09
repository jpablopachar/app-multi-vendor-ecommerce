export interface Product {
  _id: string;
  brand: string;
  category: string;
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  rating: number;
  sellerId: string;
  shopName: string;
  slug: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}

export interface ProductPayload {
  parPage: number;
  page: number;
  searchValue: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  brand: string;
  shopName: string;
  category: string;
  images: File[];
}