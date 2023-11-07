import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/AuthSlice'
import { apiSlice } from './features/apiSlice'
import { apiBlogSlice } from './features/apiBlogSlice';


const store = configureStore({
  reducer:{
    authSlice: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiBlogSlice.reducerPath]: apiBlogSlice.reducer,
  }
  ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBlogSlice.middleware,apiBlogSlice.middleware),
});
  

export type RootState = ReturnType<typeof store.getState>

export default store