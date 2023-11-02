import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default  authSlice.reducer;

