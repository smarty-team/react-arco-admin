import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

// 1. 创建store实例
export const store = configureStore({
  reducer: {
    counter: counterSlice,
  }
});

// 2. 类型支持
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;