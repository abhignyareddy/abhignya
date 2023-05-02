import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import testeduserService from './testedService'

const initialState = {
  testedusers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get user testedusers
export const getAllTestedUsers = createAsyncThunk(
  'testedusers/getAll',
  async (_, thunkAPI) => {
    try {
      return await testeduserService.getAllTestedUsers()
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
export const testedusersSlice = createSlice({
  name: 'testeduser',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTestedUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTestedUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.testedusers = action.payload
      })
      .addCase(getAllTestedUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = testedusersSlice.actions
export default testedusersSlice.reducer