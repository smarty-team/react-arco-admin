import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import authSlice from "./authSlice";

// 1. 创建store实例
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice
  }
});

// 2. 类型支持
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
