import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../helpers/apiRequest';

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
    loading: false,
    items: [],
    count: null,
  },
  reducers: {
    addParrot: (state, action) => {
      state.items.push(action.payload);
    },
    updateParrot: (state, action) => {
      const newParrot = action.payload;
      const { id } = newParrot;

      state.items = state.items.map((item) => {
        if (item.id === id) {
          return newParrot;
        }

        return item;
      });
    },
    deleteParrot: (state, action) => {
      const { payload: id } = action;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
  extraReducers: {
    [getParrots.fulfilled]: (state, action) => {
      const { data, count } = action.payload;
      state.loading = false;
      state.error = false;
      state.items = data;
      state.count = count;
    },
    [getParrots.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getParrots.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addParrot, updateParrot, deleteParrot } = actions;

export default reducer;
