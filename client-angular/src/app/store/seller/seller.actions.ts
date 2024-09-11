import {
  InfoUser,
  Payload,
  SellerListResponse,
  SellerStatusUpdateResponse
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const sellerActions = createActionGroup({
  source: 'Seller',
  events: {
    messageClear: emptyProps(),
    getSellers: props<{ payload: Payload }>(),
    getSellersSuccess: props<{ response: SellerListResponse }>(),
    getSeller: props<{ sellerId: string }>(),
    getSellerSuccess: props<{ response: { seller: InfoUser } }>(),
    sellerStatusUpdate: props<{ sellerId: string }>(),
    sellerStatusUpdateSuccess: props<{
      response: SellerStatusUpdateResponse;
    }>(),
  },
});
