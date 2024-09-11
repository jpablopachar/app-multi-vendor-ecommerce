import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getSellersRequest = createAsyncThunk(
  'product/getSellerRequest',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getSeller = createAsyncThunk(
  'product/getSeller',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sellerStatusUpdate = createAsyncThunk(
  'product/sellerStatusUpdate',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sellerReducer = createSlice({
  name: 'seller',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    seller: '',
    totalSellers: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellersRequest.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers
        state.totalSellers = payload.totalSellers
      })
      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller
      })
      .addCase(sellerStatusUpdate.fulfilled, (state, { payload }) => {
        state.seller = payload.seller
        state.successMessage = payload.message
      })
  },
})

export const { messageClear } = sellerReducer.actions
export default sellerReducer.reducer
