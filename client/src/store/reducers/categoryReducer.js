import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const categoryAdd = createAsyncThunk(
  'category/categoryAdd',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('image', image)

      const { data } = await api.post('/category-add', formData, {
        withCredentials: true,
      })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categories: [],
    total: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
        state.categories = [...state.categories, payload.category]
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.total = payload.total
        state.categories = payload.categories
      })
  },
})

export const { messageClear } = categoryReducer.actions
export default categoryReducer.reducer
