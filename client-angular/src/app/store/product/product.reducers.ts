import { createFeature, createReducer, on } from '@ngrx/store'
import { productActions } from './product.actions'
import { ProductState } from './product.state'

const productInitialState: ProductState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  products: [],
  product: '',
  totalProducts: 0,
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    productInitialState,
    on(productActions.messageClear, (state: ProductState) => ({
      ...state,
      errorMessage: '',
      successMessage: '',
    })),
    on(productActions.addProduct, (state: ProductState) => ({
      ...state,
      loader: true,
    })),
    on(productActions.addProductSuccess, (state: ProductState, action) => ({
      ...state,
      loader: false,
      successMessage: action.response.message,
    })),
    on(productActions.addProductError, (state: ProductState, action) => ({
      ...state,
      loader: false,
      errorMessage: action.error,
    })),
    on(productActions.getProducts, (state: ProductState) => ({
      ...state,
    })),
    on(productActions.getProductsSuccess, (state: ProductState, action) => ({
      ...state,
      products: action.response.products,
      totalProducts: action.response.totalProducts,
    }))
  ),
});

export const {
  name: productFeatureKey,
  reducer: productReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
  selectProducts,
} = productFeature;
