import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../components/api/authAPI/authApiSlice';

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});
