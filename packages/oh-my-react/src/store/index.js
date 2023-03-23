import { configureStore } from "@reduxjs/toolkit";
import counter from "./counterSlice";
import todos, { todoStorage } from "./todoSlice";
import visibility from "./visibilitySlice";
import user from "./userSlice";

// 声明一个中间件：只要是和todos相关的action，我们都触发保存行为
const storageMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith("todos/")) {
    next(action);
    todoStorage.save(store.getState().todos.value);
  } else {
    next(action);
  }
};

// configureStore()创建一个store实例
export const store = configureStore({
  middleware: (gDM) => gDM().concat(storageMiddleware),
  reducer: {
    // counter即为模块名称
    counter,
    todos,
    visibility,
    user,
  },
});
