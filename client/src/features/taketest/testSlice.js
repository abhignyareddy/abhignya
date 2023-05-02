import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import testService from './testService'


// Get question from localStorage
const question = JSON.parse(localStorage.getItem('question'))

const initialState = {
  question: question ? question : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const getquestion = createAsyncThunk('user/questions', async ( thunkAPI) => {
  try {
    return await testService.getquestion()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getallquestion = createAsyncThunk('user/admin/questions', async ( thunkAPI) => {
  try {
    return await testService.getquestion()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const testCompleted = createAsyncThunk('user/test/postuser', async ( data,thunkAPI) => {
  try {
    return await testService.testCompleted(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const testSlice = createSlice({
  name: 'testdata',
  initialState,
  reducers: {
    resettest: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getquestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getquestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.question = action.payload
      })
      .addCase(getquestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.question = null
      })
      .addCase(testCompleted.pending, (state) => {
        state.isLoading = true
      })
      .addCase(testCompleted.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(testCompleted.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getallquestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getallquestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getallquestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resettest } = testSlice.actions
export default testSlice.reducer