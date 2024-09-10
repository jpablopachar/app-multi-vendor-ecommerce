export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  name: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface InfoUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  payment: string;
  method: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  shopInfo?: ShopInfo;
}

export interface ShopInfo {
  division: string;
  district: string;
  shopName: string;
  sub_district: string;
}

export interface UserInfoResponse {
  userInfo: InfoUser;
  message?: string;
}