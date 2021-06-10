import { configureStore } from '@reduxjs/toolkit';
import parrotsReducer from '../features/parrots/parrotsSlice';

export default configureStore({
  reducer: {
    parrots: parrotsReducer,
  },
});
