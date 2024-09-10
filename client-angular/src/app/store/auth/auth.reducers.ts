import { returnRole } from '@app/utils'
import { createFeature, createReducer, on } from '@ngrx/store'
import { authActions } from './auth.actions'
import { AuthState } from './auth.state'

const authInitialState: AuthState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: '',
  role: returnRole(localStorage.getItem('accessToken')),
  token: localStorage.getItem('accessToken'),
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.messageClear, (state: AuthState) => ({
      ...state,
      errorMessage: '',
    })),
    on(authActions.adminLogin, (state: AuthState) => ({
      ...state,
      loader: true,
    })),
    on(authActions.adminLoginSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      successMessage: action.response.message,
      token: action.response.token,
      role: returnRole(action.response.token),
    })),
    on(authActions.adminLoginError, (state: AuthState, action) => ({
      ...state,
      loader: false,
      errorMessage: action.error,
    })),
    on(authActions.sellerLogin, (state: AuthState) => ({
      ...state,
      loader: true,
    })),
    on(authActions.sellerLoginSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      successMessage: action.response.message,
      token: action.response.token,
      role: returnRole(action.response.token),
    })),
    on(authActions.sellerLoginError, (state: AuthState, action) => ({
      ...state,
      loader: false,
      errorMessage: action.error,
    })),
    on(authActions.sellerRegister, (state: AuthState) => ({
      ...state,
      loader: true,
    })),
    on(authActions.sellerRegisterSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      successMessage: action.response.message,
      token: action.response.token,
      role: returnRole(action.response.token),
    })),
    on(authActions.sellerRegisterError, (state: AuthState, action) => ({
      ...state,
      loader: false,
      errorMessage: action.error,
    })),
    on(authActions.getUserInfo, (state: AuthState) => ({
      ...state,
    })),
    on(authActions.getUserInfoSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      userInfo: action.response.userInfo,
    })),
    on(authActions.profileImageUpload, (state: AuthState) => ({
      ...state,
      loader: true,
    })),
    on(authActions.profileImageUploadSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      userInfo: action.response.userInfo,
      successMessage: action.response.message as string,
    })),
    on(authActions.profileInfoAdd, (state: AuthState) => ({
      ...state,
      loader: true,
    })),
    on(authActions.profileInfoAddSuccess, (state: AuthState, action) => ({
      ...state,
      loader: false,
      userInfo: action.response.userInfo,
      successMessage: action.response.message as string,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
  selectUserInfo,
  selectToken,
  selectRole,
} = authFeature;
