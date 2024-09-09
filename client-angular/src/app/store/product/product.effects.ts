import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { ProductListResponse } from '@app/models'
import { ProductService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { productActions } from './product.actions'

export const categoryAddEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.addProduct),
      switchMap(({ request }) => {
        return productService.addProduct(request).pipe(
          map((response: { message: string }) => {
            return productActions.addProductSuccess({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              productActions.addProductError({
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
    productService: ProductService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.getProducts),
      switchMap(({ payload }) => {
        return productService.getProducts(payload).pipe(
          map((response: ProductListResponse) => {
            return productActions.getProductsSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
