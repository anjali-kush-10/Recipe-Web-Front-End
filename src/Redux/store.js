import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
