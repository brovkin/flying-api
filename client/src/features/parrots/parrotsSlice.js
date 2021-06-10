import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../helpers/apiRequest';
import { PRESET_FILTERS } from '../../constants';

export const getParrots = createAsyncThunk(
  'parrots/getParrots',
  async (params, thunkApi) => {
    const result = await apiRequest('GET', '/parrots');

    const { data, headers } = result;

    const count = parseInt(headers['x-total-count'], 10);

    return {
      data,
      count,
    };
  }
);

const { actions, reducer } = createSlice({
  name: 'parrots',
  initialState: {
    error: false,
    loaded: false,
    items: [],
    filterBy: [],
    count: null,
  },
  reducers: {
    // changeFilter: (state, action) => {
    //   const {
    //     payload: { name, active },
    //   } = action;
    //
    //   if (active) {
    //     state.filterBy.push(name);
    //   } else {
    //     const newFilter = state.filterBy.filter((item) => item !== name);
    //
    //     if (newFilter.length) {
    //       state.filterBy = newFilter;
    //     }
    //     // } else {
    //     //   state.filterBy = PRESET_FILTERS;
    //     // }
    //   }
    // },
  },
  extraReducers: {
    [getParrots.fulfilled]: (state, action) => {
      const { data, count } = action.payload;
      state.loaded = true;
      state.error = false;
      state.filterBy = PRESET_FILTERS;
      state.items = data;
      state.count = count;
    },
    [getParrots.pending]: (state, action) => {
      state.loaded = false;
      state.error = false;
    },
    [getParrots.rejected]: (state, action) => {
      state.loaded = true;
      state.error = true;
    },
  },
});

// export const { changeFilter } = actions;

export default reducer;
