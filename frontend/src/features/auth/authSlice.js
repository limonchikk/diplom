import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_DICT } from '../../constants'
import { fetchJwtToken } from '../../api/login'

const initialState = {
  token: '',
  status: STATUS_DICT.DEFAULT,
}

export const applyLogin = createAsyncThunk('getJwtToken', async data => fetchJwtToken(data))

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(applyLogin.pending, state => {
        state.status = STATUS_DICT.PENDING
      })
      .addCase(applyLogin.fulfilled, (state, action) => {
        state.status = STATUS_DICT.FINISHED
        state.token = action.payload
      })
      .addCase(applyLogin.rejected, state => {
        state.status = STATUS_DICT.FAILED
      })
  },
})

export default authSlice.reducer
