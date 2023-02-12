import { createSlice } from "@reduxjs/toolkit";

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: false,
  },
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    }
  },
});

export const { setAuthState } = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export default authSlice.reducer;
