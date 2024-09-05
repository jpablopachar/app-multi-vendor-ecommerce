import { AuthResponse, LoginUser } from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    AdminLogin: props<{ request: LoginUser }>(),
    AdminLoginSuccess: props<{ response: AuthResponse }>(),
    AdminLoginError: props<{ error: string }>(),
    messageClear: emptyProps(),
  }
})