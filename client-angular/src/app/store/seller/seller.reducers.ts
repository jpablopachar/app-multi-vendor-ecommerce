import { InfoUser } from '@app/models'
import { createFeature, createReducer, on } from '@ngrx/store'
import { sellerActions } from './seller.actions'
import { SellerState } from './seller.status'

const categoryInitialState: SellerState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  sellers: [],
  seller: '',
  totalSellers: 0,
};

const sellerFeature = createFeature({
  name: 'seller',
  reducer: createReducer(
    categoryInitialState,
    on(sellerActions.messageClear, (state: SellerState) => ({
      ...state,
      errorMessage: '',
      successMessage: '',
    })),
    on(sellerActions.getSellers, (state: SellerState) => ({
      ...state,
      loader: true,
    })),
    on(sellerActions.getSellersSuccess, (state: SellerState, action) => ({
      ...state,
      loader: false,
      sellers: action.response.sellers,
      totalSellers: action.response.totalSellers,
    })),
    on(sellerActions.getSeller, (state: SellerState) => ({
      ...state,
      loader: true,
    })),
    on(sellerActions.getSellerSuccess, (state: SellerState, action) => ({
      ...state,
      loader: false,
      seller: action.response.seller,
    })),
    on(sellerActions.sellerStatusUpdate, (state: SellerState) => ({
      ...state,
      loader: true,
    })),
    on(
      sellerActions.sellerStatusUpdateSuccess,
      (state: SellerState, action) => ({
        ...state,
        loader: false,
        seller: action.response.seller as InfoUser,
        successMessage: action.response.message,
      })
    )
  ),
});

export const {
  name: sellerFeatureKey,
  reducer: sellerReducer,
  selectLoader,
  selectSuccessMessage,
  selectErrorMessage,
  selectSellers,
  selectSeller,
} = sellerFeature;
