import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import parrotsReducer from '../features/parrots/parrotsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    parrots: parrotsReducer,
  },
});
