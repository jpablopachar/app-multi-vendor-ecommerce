import { Product } from "@app/models"

export interface ProductState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  products: Product[];
  product: string | Product;
  totalProducts: number;
}