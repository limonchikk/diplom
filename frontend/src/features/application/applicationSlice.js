import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_DICT } from '../../constants'
import { fetchApplyApplicationForm, fetchCountries } from '../../api/application'

const initialState = {
  countries: { status: STATUS_DICT.DEFAULT, data: [] },
  applicationForm: { status: STATUS_DICT.DEFAULT, applicationId: null },
}

export const getCountries = createAsyncThunk('getCountries', async () => fetchCountries())

export const applyApplicationForm = createAsyncThunk('applyForm', async data => fetchApplyApplicationForm(data))

const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    resetApplicationForm: state => {
      state.applicationForm.status = STATUS_DICT.DEFAULT
      state.applicationForm.applicationId = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCountries.pending, state => {
        state.countries.status = STATUS_DICT.PENDING
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries.status = STATUS_DICT.FINISHED
        state.countries.data = action.payload
      })
      .addCase(getCountries.rejected, state => {
        state.countries.status = STATUS_DICT.FAILED
      })
      .addCase(applyApplicationForm.pending, state => {
        state.applicationForm.status = STATUS_DICT.PENDING
      })
      .addCase(applyApplicationForm.fulfilled, (state, action) => {
        state.applicationForm.status = STATUS_DICT.FINISHED
        state.applicationForm.applicationId = action.payload
      })
      .addCase(applyApplicationForm.rejected, state => {
        state.applicationForm.status = STATUS_DICT.FAILED
      })
  },
})

export const { resetApplicationForm } = applicationSlice.actions

export default applicationSlice.reducer
