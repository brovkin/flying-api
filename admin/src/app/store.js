import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import parrotsReducer from '../features/parrots/parrotsSlice';
import commonReducer from '../features/common/commonSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    parrots: parrotsReducer,
    common: commonReducer,
  },
});
