import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getCategories = createAsyncThunk(
  'product/getCategories',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-categories')

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-products')

      console.log(data);

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const productPriceRange = createAsyncThunk(
  'product/productPriceRange',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/product-price-range-latest')

      console.log(data);

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
    priceRange: {
      low: 0,
      high: 100,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.categories
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.latestProduct = payload.latestProduct
        state.topRatedProduct = payload.topRatedProduct
        state.discountProduct = payload.discountProduct
      })
      .addCase(productPriceRange.fulfilled, (state, { payload }) => {
        state.latestProduct = payload.latestProduct
        state.priceRange = payload.priceRange
      })
  },
})

export default homeReducer.reducer
