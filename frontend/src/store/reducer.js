import { combineReducers } from '@reduxjs/toolkit'
import applicationReducer from '../features/application/applicationSlice'
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/adminPage/adminPageSlice'

const rootReducer = combineReducers({ application: applicationReducer, auth: authReducer, admin: adminReducer })

export default rootReducer
