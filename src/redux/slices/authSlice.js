import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
      return state;
    },
    logout: (state) => {
      state.user = null;
      return state;
    },
  },
});

export const { logout, addUser } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;