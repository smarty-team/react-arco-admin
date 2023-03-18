import { useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import { useSelector } from "react-redux";
import { todoStorage } from "./store/todoSlice";

// useState, useEffect, useContext
// useReducer, useCallback, useMemo, useRef, ...

// className
// inline styles
// CSS Module
function App() {

  return (
    <div className="App">
      <h2>待办事项</h2>

      {/* 新增待办 */}
      <AddTodo></AddTodo>

      {/* 待办列表 */}
      <TodoList></TodoList>

      {/* 过滤 */}
      <TodoFilter></TodoFilter>
    </div>
  );
}

export default App;
