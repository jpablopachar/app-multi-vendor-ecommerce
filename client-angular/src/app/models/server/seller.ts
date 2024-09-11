import { InfoUser } from "./auth"

export interface SellerListResponse {
  sellers: InfoUser[];
  totalSellers: number;
}

export interface SellerStatusUpdateResponse {
  message: string;
  seller: InfoUser | null;
}