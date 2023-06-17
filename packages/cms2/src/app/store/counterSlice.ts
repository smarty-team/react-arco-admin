import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 1. 声明状态类型
export interface CounterState {
  count: number;
}

// 2. 初始值
const initialState: CounterState = {
  count: 1,
};

// 3. 创建状态模块slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    inc: (state) => {
      state.count += 1;
    },
    dec: (state) => {
      state.count -= 1;
    },
  },
});

// 4. 导出actionCreator
// dispatch({type: 'counter', payload: 1})
// dispatch(inc())
export const { setCount, inc, dec } = counterSlice.actions;
export default counterSlice.reducer;