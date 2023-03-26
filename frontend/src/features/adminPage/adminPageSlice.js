import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_DICT } from '../../constants'
import { fetchAdminData, updateAdminData as updateData } from '../../api/adminPanel'

const initialState = {
  adminData: { status: STATUS_DICT.DEFAULT, data: null },
}

export const getAdminData = createAsyncThunk('getAdminData', async data => fetchAdminData(data))
export const updateAdminData = createAsyncThunk('updateAdminData', async data => updateData(data))

const adminDataSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(getAdminData.pending, state => {
        state.adminData.status = STATUS_DICT.PENDING
      })
      .addCase(getAdminData.fulfilled, (state, action) => {
        state.adminData.status = STATUS_DICT.FINISHED
        state.adminData.data = action.payload
      })
      .addCase(getAdminData.rejected, state => {
        state.adminData.status = STATUS_DICT.FAILED
      })
      .addCase(updateAdminData.pending, state => {
        state.adminData.status = STATUS_DICT.PENDING
      })
      .addCase(updateAdminData.fulfilled, (state, action) => {
        state.adminData.status = STATUS_DICT.FINISHED
        state.adminData.data = action.payload
      })
      .addCase(updateAdminData.rejected, state => {
        state.adminData.status = STATUS_DICT.FAILED
      })
  },
})

export default adminDataSlice.reducer
