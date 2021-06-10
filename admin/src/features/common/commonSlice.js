import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { COUNTRIES_API_URL_BY_NAME } from '../../constants';
import axios from 'axios';

export const getCountries = createAsyncThunk(
  'common/getCountries',
  async (params, thunkApi) => {
    const result = await axios.get(COUNTRIES_API_URL_BY_NAME);

    return result.data;
  }
);

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: {
    error: false,
    loading: false,
    countries: [],
  },
  reducers: {},
  extraReducers: {
    [getCountries.fulfilled]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.error = false;
      state.countries = payload;
    },
    [getCountries.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getCountries.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default reducer;
