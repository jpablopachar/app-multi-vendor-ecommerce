import { ProductListResponse, ProductPayload, ProductRequest } from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    messageClear: emptyProps(),
    addProduct: props<{ request: ProductRequest }>(),
    addProductSuccess: props<{ response: { message: string } }>(),
    addProductError: props<{ error: string }>(),
    getProducts: props<{ payload: ProductPayload }>(),
    getProductsSuccess: props<{ response: ProductListResponse }>(),
  }
})