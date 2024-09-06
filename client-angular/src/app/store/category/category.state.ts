import { Category } from "@app/models"

export interface CategoryState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  categories: Category[];
  total: number;
}