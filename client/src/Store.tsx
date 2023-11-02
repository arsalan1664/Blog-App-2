import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/AuthSlice'
import { apiSlice } from './features/apiSlice'


const store = configureStore({
  reducer:{
    authSlice: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }
  ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
  

export type RootState = ReturnType<typeof store.getState>

export default store