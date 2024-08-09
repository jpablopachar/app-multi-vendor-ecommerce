import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (info) => {
    console.log(info)

    try {

    } catch (error) {
      
    }
  }
)

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    userInfo: ''
  },
  reducers: {},
  extraReducers: () => {}
})

export default authReducer.reducer