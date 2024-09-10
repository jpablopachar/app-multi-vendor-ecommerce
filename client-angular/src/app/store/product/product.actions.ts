import { Product, ProductListResponse, ProductPayload, ProductUpdateRequest, ProductUpdateResponse } from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    messageClear: emptyProps(),
    addProduct: props<{ request: FormData }>(),
    addProductSuccess: props<{ response: { message: string } }>(),
    addProductError: props<{ error: string }>(),
    getProducts: props<{ payload: ProductPayload }>(),
    getProductsSuccess: props<{ response: ProductListResponse }>(),
    getProduct: props<{ productId: string }>(),
    getProductSuccess: props<{ response: { product: Product } }>(),
    editProduct: props<{ request: ProductUpdateRequest }>(),
    editProductSuccess: props<{ response: ProductUpdateResponse }>(),
    editProductError: props<{ error: string }>(),
  }
})