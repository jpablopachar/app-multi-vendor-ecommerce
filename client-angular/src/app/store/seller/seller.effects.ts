import { inject } from '@angular/core'
import {
  InfoUser,
  SellerListResponse,
  SellerStatusUpdateResponse
} from '@app/models'
import { SellerService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { sellerActions } from './seller.actions'

export const getSellersEffect = createEffect(
  (
    actions$ = inject(Actions),
    sellerService: SellerService = inject(SellerService)
  ) => {
    return actions$.pipe(
      ofType(sellerActions.getSellers),
      switchMap(({ payload }) => {
        return sellerService.getSellers(payload).pipe(
          map((response: SellerListResponse) => {
            return sellerActions.getSellersSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getSellerEffect = createEffect(
  (
    actions$ = inject(Actions),
    sellerService: SellerService = inject(SellerService)
  ) => {
    return actions$.pipe(
      ofType(sellerActions.getSeller),
      switchMap(({ sellerId }) => {
        return sellerService.getSeller(sellerId).pipe(
          map((response: { seller: InfoUser }) => {
            return sellerActions.getSellerSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const sellerStatusUpdateEffect = createEffect(
  (
    actions$ = inject(Actions),
    sellerService: SellerService = inject(SellerService)
  ) => {
    return actions$.pipe(
      ofType(sellerActions.sellerStatusUpdate),
      switchMap((body) => {
        return sellerService.sellerStatusUpdate(body).pipe(
          map((response: SellerStatusUpdateResponse) => {
            return sellerActions.sellerStatusUpdateSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
