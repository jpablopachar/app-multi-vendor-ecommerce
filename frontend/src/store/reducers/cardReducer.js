import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addToCard = createAsyncThunk(
  'card/addToCard',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-card', info)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCardProducts = createAsyncThunk(
  'card/getCardProducts',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-card-products/${userId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCardProduct = createAsyncThunk(
  'card/deleteCardProduct',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-card-product/${cardId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantityIncrement = createAsyncThunk(
  'card/quantityIncrement',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cardId}`)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantityDecrement = createAsyncThunk(
  'card/quantityDecrement',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cardId}`)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const cardReducer = createSlice({
  name: 'card',
  initialState: {
    cardProducts: [],
    cardProductCount: 0,
    wishListCount: 0,
    wishList: [],
    price: 0,
    errorMessage: '',
    successMessage: '',
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCard.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
      })
      .addCase(addToCard.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
        state.cardProductCount = state.cardProductCount + 1
      })
      .addCase(getCardProducts.fulfilled, (state, { payload }) => {
        state.cardProducts = payload.cardProducts
        state.price = payload.price
        state.cardProductCount = payload.cardProductCount
        state.shippingFee = payload.shippingFee
        state.outOfStockProducts = payload.outOfStockProducts
        state.buyProductItem = payload.buyProductItem
      })
      .addCase(deleteCardProduct.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(quantityIncrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(quantityDecrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
  },
})

export const { messageClear } = cardReducer.actions
export default cardReducer.reducer
