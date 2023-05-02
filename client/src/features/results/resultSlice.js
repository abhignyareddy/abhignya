import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resultService from './resultService'

// Get result from localStorage
const result = JSON.parse(localStorage.getItem('result'))

const initialState = {
  result: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const getuserresult = createAsyncThunk('user/test/getuserresult', async (data, thunkAPI) => {
  try {
    return await resultService.getuserresult(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getallusersresult = createAsyncThunk('user/test/getallusersresult', async ( data,thunkAPI) => {
  try {
    return await resultService.getallusersresult(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const resultSlice = createSlice({
  name: 'testresult',
  initialState,
  reducers: {
    resetresult: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getuserresult.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getuserresult.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.result = action.payload
      })
      .addCase(getuserresult.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.result = null
      })
      .addCase(getallusersresult.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getallusersresult.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getallusersresult.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetresult } = resultSlice.actions
export default resultSlice.reducer