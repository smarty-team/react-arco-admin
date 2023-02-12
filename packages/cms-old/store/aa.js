import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

export function makeStore() {
  return configureStore({
    reducer: { auth: authSlice.reducer },
  })
}
const store = makeStore()

export default store;
