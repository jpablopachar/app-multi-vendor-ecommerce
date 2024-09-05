export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}