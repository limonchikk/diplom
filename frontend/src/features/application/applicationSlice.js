import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_DICT } from '../../constants'
import { fetchApplications, fetchApplyApplicationForm, fetchCountries } from '../../api/application'

const initialState = {
  countries: { status: STATUS_DICT.DEFAULT, data: [] },
  applicationForm: { status: STATUS_DICT.DEFAULT, applicationId: null },
  applications: { status: STATUS_DICT.DEFAULT, data: null },
}

export const getCountries = createAsyncThunk('getCountries', async () => fetchCountries())
export const applyApplicationForm = createAsyncThunk('applyForm', async data => fetchApplyApplicationForm(data))
export const getApplications = createAsyncThunk('getApplications', async params => fetchApplications(params))

const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    resetApplicationForm: state => {
      state.applicationForm.status = STATUS_DICT.DEFAULT
      state.applicationForm.applicationId = null
    },
    resetApplications: state => {
      state.applications.status = STATUS_DICT.DEFAULT
      state.applications.data = null
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
      .addCase(getApplications.pending, state => {
        state.applications.status = STATUS_DICT.PENDING
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.applications.status = STATUS_DICT.FINISHED
        state.applications.data = action.payload
      })
      .addCase(getApplications.rejected, state => {
        state.applications.status = STATUS_DICT.FAILED
      })
  },
})

export const { resetApplicationForm, resetApplications } = applicationSlice.actions

export default applicationSlice.reducer
