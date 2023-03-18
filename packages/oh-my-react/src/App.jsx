import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TodoList from "./TodoList";
import { useFilter, useTodos } from "./hooks";
import TodoFilter from "./TodoFilter";
import { Counter } from "./store";

// useState, useEffect, useContext
// useReducer, useCallback, useMemo, useRef, ...

const STORAGE_KEY = "todomvc-react";
export const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

// className
// inline styles
// CSS Module
function App() {
  const { todos, addTodo, removeTodo, updateTodo } = useTodos(
    todoStorage.fetch()
  );
  // const xxx = true ? <div>xxx</div> : null

  // 表示新增的待办事项的名称
  const [newTodo, setNewTodo] = useState("");
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  // 用户回车且输入框有内容则添加一个新待办
  const onAddTodo = (e) => {
    if (e.code === "Enter" && newTodo) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const { visibility, setVisibility, filteredTodos } = useFilter(todos);

  return (
    <div className="App">
      <h2>待办事项</h2>

      <Counter></Counter>

      {/* 新增待办 */}
      <div>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="该学啥了?"
          value={newTodo}
          onChange={changeNewTodo}
          onKeyUp={onAddTodo}
        />
      </div>

      {/* 待办列表 */}
      <TodoList
        {...{ todos: filteredTodos, removeTodo, updateTodo }}
      ></TodoList>

      {/* 过滤 */}
      <TodoFilter {...{ visibility, setVisibility }}></TodoFilter>
    </div>
  );
}

export default App;
