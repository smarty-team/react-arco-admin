import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: '',
  },
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload
    }
  },
});

export const selectRole = (state) => state.user.role;
export const selectLogin = (state) => !!state.user.role;
export const { setRole } = userSlice.actions;
export default userSlice.reducer;
