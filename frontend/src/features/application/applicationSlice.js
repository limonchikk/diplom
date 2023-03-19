import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {STATUS_DICT} from "../../constants";
import {fetchCountries} from "../../api/application";

const initialState = {
 countries: { status: STATUS_DICT.DEFAULT, data: [] }
}

export const getCountries = createAsyncThunk(
    'addUser',
    async () => fetchCountries(),
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, (state) => {
                state.countries.status = STATUS_DICT.PENDING;
            })
            .addCase(getCountries.fulfilled, (state, action) => {
                state.countries.status = STATUS_DICT.FINISHED;
                state.countries.data = action.payload;
            })
            .addCase(getCountries.rejected, (state) => {
                state.countries.status = STATUS_DICT.FAILED;
            })
    },
});

export default countriesSlice.reducer;
