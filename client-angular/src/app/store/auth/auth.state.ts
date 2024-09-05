export interface AuthState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  userInfo: string;
  role: string;
  token: string | null;
}