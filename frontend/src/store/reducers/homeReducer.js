import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getCategories = createAsyncThunk(
  'product/getCategories',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/getCategories')

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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories
    })
  },
})

export default homeReducer.reducer
