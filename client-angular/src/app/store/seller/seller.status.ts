import { InfoUser } from "@app/models"

export interface CategoryState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  sellers: InfoUser[];
  seller: string | InfoUser;
  totalSellers: number;
}