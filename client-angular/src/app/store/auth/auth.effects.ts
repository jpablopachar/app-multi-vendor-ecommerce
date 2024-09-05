import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthResponse, GetUserResponse } from '@app/models'
import { AuthService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { authActions } from './auth.actions'

export const adminLoginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.adminLogin),
      switchMap(({ request }) => {
        return authService.adminLogin(request).pipe(
          map((response: AuthResponse) => {
            localStorage.setItem('accessToken', response.token);

            return authActions.adminLoginSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.adminLoginError({ error: errorResponse.error.error })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const sellerLoginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.sellerLogin),
      switchMap(({ request }) => {
        return authService.sellerLogin(request).pipe(
          map((response: AuthResponse) => {
            localStorage.setItem('accessToken', response.token);

            return authActions.sellerLoginSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.sellerLoginError({ error: errorResponse.error.error })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const sellerRegisterEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.sellerRegister),
      switchMap(({ request }) => {
        return authService.sellerRegister(request).pipe(
          map((response: AuthResponse) => {
            localStorage.setItem('accessToken', response.token);

            return authActions.sellerRegisterSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.sellerRegisterError({
                error: errorResponse.error.error,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const getUserInfoEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getUserInfo),
      switchMap(() =>
        authService
          .getUserInfo()
          .pipe(
            map((response: GetUserResponse) =>
              authActions.getUserInfoSuccess({ response })
            )
          )
      )
    );
  },
  { functional: true }
);
