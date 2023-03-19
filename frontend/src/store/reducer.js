import { combineReducers } from '@reduxjs/toolkit';
import applicationReducer from '../features/application/applicationSlice';

const rootReducer = combineReducers({ application: applicationReducer });

export default rootReducer;