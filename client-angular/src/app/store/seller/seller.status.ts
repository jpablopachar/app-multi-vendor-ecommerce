import { InfoUser } from "@app/models"

export interface SellerState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  sellers: InfoUser[];
  seller: string | InfoUser;
  totalSellers: number;
}