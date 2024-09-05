import { GetUser } from "@app/models"

export interface AuthState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  userInfo: string | GetUser;
  role: string;
  token: string | null;
}