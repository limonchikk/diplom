import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_DICT } from '../../constants'
import {
  fetchApplications,
  fetchApplyApplicationForm,
  fetchCountries,
  fetchDocuments,
  sendQuestion,
} from '../../api/application'

const initialState = {
  countries: { status: STATUS_DICT.DEFAULT, data: [] },
  applicationForm: { status: STATUS_DICT.DEFAULT, applicationId: null },
  applications: { status: STATUS_DICT.DEFAULT, data: null },
  documents: { status: STATUS_DICT.DEFAULT, data: null },
  question: { status: STATUS_DICT.DEFAULT, data: null },
}

export const getCountries = createAsyncThunk('getCountries', async () => fetchCountries())
export const applyApplicationForm = createAsyncThunk('applyForm', async data => fetchApplyApplicationForm(data))
export const getApplications = createAsyncThunk('getApplications', async params => fetchApplications(params))
export const getDocuments = createAsyncThunk('getDocument', async params => fetchDocuments(params))
export const sendApplicantQuestion = createAsyncThunk('sendQuestion', async data => sendQuestion(data))

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
    resetQuestion: state => {
      state.question.status = STATUS_DICT.DEFAULT
      state.question.data = null
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
      .addCase(getDocuments.pending, state => {
        state.documents.status = STATUS_DICT.PENDING
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.documents.status = STATUS_DICT.FINISHED
        state.documents.data = action.payload
      })
      .addCase(getDocuments.rejected, state => {
        state.documents.status = STATUS_DICT.FAILED
      })
      .addCase(sendApplicantQuestion.pending, state => {
        state.question.status = STATUS_DICT.PENDING
      })
      .addCase(sendApplicantQuestion.fulfilled, (state, action) => {
        state.question.status = STATUS_DICT.FINISHED
        state.question.data = action.payload
      })
      .addCase(sendApplicantQuestion.rejected, state => {
        state.question.status = STATUS_DICT.FAILED
      })
  },
})

export const { resetApplicationForm, resetApplications, resetQuestion } = applicationSlice.actions

export default applicationSlice.reducer
