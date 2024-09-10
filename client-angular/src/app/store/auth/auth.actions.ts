import { AuthResponse, LoginUser, RegisterUser, ShopInfo, UserInfoResponse } from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    messageClear: emptyProps(),
    AdminLogin: props<{ request: LoginUser }>(),
    AdminLoginSuccess: props<{ response: AuthResponse }>(),
    AdminLoginError: props<{ error: string }>(),
    SellerLogin: props<{ request: LoginUser }>(),
    SellerLoginSuccess: props<{ response: AuthResponse }>(),
    SellerLoginError: props<{ error: string }>(),
    SellerRegister: props<{ request: RegisterUser }>(),
    SellerRegisterSuccess: props<{ response: AuthResponse }>(),
    SellerRegisterError: props<{ error: string }>(),
    GetUserInfo: emptyProps(),
    GetUserInfoSuccess: props<{ response: UserInfoResponse }>(),
    ProfileImageUpload: props<{ request: FormData }>(),
    ProfileImageUploadSuccess: props<{ response: UserInfoResponse }>(),
    ProfileInfoAdd: props<{ request: ShopInfo }>(),
    ProfileInfoAddSuccess: props<{ response: UserInfoResponse }>(),
  }
})