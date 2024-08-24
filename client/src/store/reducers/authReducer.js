import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)

    try {
      const { data } = await api.post('/auth/admin-login', info, {
        withCredentials: true,
      })

      console.log(data)

      localStorage.setItem('accessToken', data.token)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sellerLogin = createAsyncThunk(
  'auth/sellerLogin',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)

    try {
      const { data } = await api.post('/auth/seller-login', info, {
        withCredentials: true,
      })

      console.log(data)

      localStorage.setItem('accessToken', data.token)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sellerRegister = createAsyncThunk(
  'auth/sellerRegister',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)

    try {
      const { data } = await api.post('/auth/seller-register', info, {
        withCredentials: true,
      })

      console.log(data)

      localStorage.setItem('accessToken', data.token)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loader = true
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.message
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
      })
      .addCase(sellerLogin.pending, (state) => {
        state.loader = true
      })
      .addCase(sellerLogin.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.message
      })
      .addCase(sellerLogin.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
      })
      .addCase(sellerRegister.pending, (state) => {
        state.loader = true
      })
      .addCase(sellerRegister.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.message
      })
      .addCase(sellerRegister.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.message
      })
  },
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
