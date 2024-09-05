// import {routerNavigationAction} from '@ngrx/router-store'
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
    on(authActions.messageClear, (state: AuthState) => ({
      ...state,
      errorMessage: '',
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
} = authFeature;
