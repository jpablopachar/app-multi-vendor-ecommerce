import { AuthState } from "./auth.state"

export const authInitialState: AuthState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: ''
}