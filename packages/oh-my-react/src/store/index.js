import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// configureStore()创建一个store实例
export const store = configureStore({
  reducer: {
    // counter即为模块名称
    counter: counterReducer,
  },
});