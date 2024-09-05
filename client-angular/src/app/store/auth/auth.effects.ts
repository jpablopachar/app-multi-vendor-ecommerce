import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthResponse } from '@app/models'
import { AuthService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { authActions } from './auth.actions'

export const adminLoginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
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
