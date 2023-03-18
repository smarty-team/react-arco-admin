import { createSlice } from '@reduxjs/toolkit';

// createSlice定义子模块
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  // `reducers`就是我们用来修改状态的方法
  reducers: {
    increment: (state) => {
      // Redux Toolkit 使我们可以直接修改状态，大幅减少模版代码
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});
// 导出actionsCreator便于用户使用，例如：dispatch(increment())
export const { increment, decrement } = counterSlice.actions;
// 导出子模块reducer
export default counterSlice.reducer;