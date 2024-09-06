import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { CategoryListResponse, CategoryResponse } from '@app/models'
import { CategoryService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { categoryActions } from './category.actions'

export const categoryAddEffect = createEffect(
  (
    actions$ = inject(Actions),
    categoryService: CategoryService = inject(CategoryService)
  ) => {
    return actions$.pipe(
      ofType(categoryActions.categoryAdd),
      switchMap(({ request }) => {
        return categoryService.categoryAdd(request).pipe(
          map((response: CategoryResponse) => {
            return categoryActions.categoryAddSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              categoryActions.categoryAddError({
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

export const getCategoriesEffect = createEffect(
  (
    actions$ = inject(Actions),
    categoryService: CategoryService = inject(CategoryService)
  ) => {
    return actions$.pipe(
      ofType(categoryActions.getCategories),
      switchMap(({ payload }) => {
        return categoryService.getCategories(payload).pipe(
          map((response: CategoryListResponse) => {
            return categoryActions.getCategoriesSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
