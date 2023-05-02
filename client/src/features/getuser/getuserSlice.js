import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getuserService from './getuserService'

const initialState = {
  allusers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get user allusers
export const getAllUsers = createAsyncThunk(
  'allusers/getAll',
  async (_, thunkAPI) => {
    try {
      return await getuserService.getAllUsers()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const allusersSlice = createSlice({
  name: 'alluser',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allusers = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = allusersSlice.actions
export default allusersSlice.reducer