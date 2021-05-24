import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MAIN_API } from '../../constants';
import { apiRequest } from '../../helpers/apiRequest';

export const authenticationUser = createAsyncThunk(
  'auth/authentication',
  async (authParams, thunkAPI) => {
    const response = await axios.post(
      MAIN_API + '/api/v1/users/authentication',
      authParams
    );
    return response.data;
  }
);

export const authorizeUser = createAsyncThunk(
  'auth/authorize',
  async (token, thunkApi) => {
    const response = await axios.get(MAIN_API + '/api/v1/users/authorize', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (params, thunkApi) => {
    const { userId, token } = params;
    const response = await axios.get(MAIN_API + `/api/v1/users/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  }
);

export const setUserData = createAsyncThunk(
  'auth/setUserData',
  async ({ id, values }, thunkApi) => {
    const result = await apiRequest('POST', `/users/update/${id}`, values);

    return result.data;
  }
);

export const setUserPassword = createAsyncThunk(
  'auth/setUserPassword',
  async ({ id, values }, thunkApi) => {
    const result = await apiRequest('POST', `/users/update_pass/${id}`, values);
    return result.data;
  }
);

const { reducer } = createSlice({
  name: 'auth',
  initialState: {
    error: false,
    loading: false,
    user: null,
  },
  reducers: {
    setError: (state) => {
      state.error = true;
    },
  },
  extraReducers: {
    [authenticationUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [authenticationUser.pending]: (state, action) => {
      state.error = false;
    },
    [authenticationUser.rejected]: (state, action) => {
      state.error = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.error = false;
      state.user = action.payload.user;
    },
    [getUser.rejected]: (state, action) => {
      state.error = true;
    },
    [setUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
    },
    [setUserData.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [setUserData.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    // password
    [setUserPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    [setUserPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [setUserPassword.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default reducer;
