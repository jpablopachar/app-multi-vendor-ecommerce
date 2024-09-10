import { InfoUser } from "@app/models";

export interface AuthState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  userInfo: string | InfoUser;
  role: string;
  token: string | null;
}