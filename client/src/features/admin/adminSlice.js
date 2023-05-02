import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from '../admin/adminService'


// Get admin from localStorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Login admin
export const loginadmin = createAsyncThunk('authadmin/login', async (admin, thunkAPI) => {
  try {
    return await adminService.loginadmin(admin)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutadmin = createAsyncThunk('authadmin/logout', async () => {
  await adminService.logoutadmin()
})

export const adminSlice = createSlice({
  name: 'authadmin',
  initialState,
  reducers: {
    resetadmin: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginadmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginadmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.admin = action.payload
      })
      .addCase(loginadmin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.admin = null
      })
      .addCase(logoutadmin.fulfilled, (state) => {
        state.admin = null
      })
  },
})

export const { resetadmin } = adminSlice.actions
export default adminSlice.reducer