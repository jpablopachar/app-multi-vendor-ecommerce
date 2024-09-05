/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpErrorResponse } from '@angular/common/http'
import { inject, InjectionToken } from '@angular/core'
import { AuthState, LoginUser } from '@app/models'
import { AuthService } from '@app/services'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { jwtDecode } from 'jwt-decode'
import { exhaustMap, pipe, tap } from 'rxjs'

const returnRole = (token: string | null): string => {
  if (!token) return '';

  const decodeToken = jwtDecode(token) as any;
  const expireTime = new Date(decodeToken.exp! * 1000);

  if (new Date() > expireTime) {
    localStorage.removeItem('accessToken');

    return '';
  } else {
    return decodeToken?.role;
  }
};

const initialState: AuthState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: '',
  role: returnRole(localStorage.getItem('accessToken')),
  token: localStorage.getItem('accessToken'),
};

const AUTH_STATE = new InjectionToken<AuthState>('AuthState', {
  factory: (): AuthState => initialState,
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState((): AuthState => inject(AUTH_STATE)),
  withMethods((store, authService = inject(AuthService)) => ({
    adminLogin: rxMethod<LoginUser>(
      pipe(
        tap(() => patchState(store, { loader: true })),
        exhaustMap((user: LoginUser) =>
          authService.adminLogin(user).pipe(
            tapResponse({
              next: ({ message, token }) => {
                localStorage.setItem('accessToken', token);

                patchState(store, {
                  loader: false,
                  successMessage: message,
                  token: token,
                  role: returnRole(token),
                });
              },
              error: (error: HttpErrorResponse) =>
                patchState(store, { loader: false, errorMessage: error.error }),
            })
          )
        )
      )
    ),
  }))
);
