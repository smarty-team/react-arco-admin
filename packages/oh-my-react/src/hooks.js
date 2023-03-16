import { useEffect, useMemo, useState } from "react";
import { todoStorage } from "./App";

// 接收初始数据，将其声明为状态，同时提供状态操作方法给外界使用
export function useTodos(data) {
  const [todos, setTodos] = useState(data);

  useEffect(() => {
    todoStorage.save(todos)
  }, [todos])
  
  const addTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        title,
        completed: false,
      },
    ]);
  }
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  const updateTodo = (editedTodo) => {
    const todo = todos.find((todo) => todo.id === editedTodo.id);
    Object.assign(todo, editedTodo)
    setTodos([...todos]);
  }
  return {todos, addTodo, removeTodo, updateTodo}
}


export function useFilter(todos) {
  const [visibility, setVisibility] = useState("all");
  // 如果todos或者`visibility`变化，我们将重新计算`filteredTodos`
  const filteredTodos = useMemo(() => {
    if (visibility === "all") {
      return todos;
    } else if (visibility === "active") {
      return todos.filter((todo) => todo.completed === false);
    } else {
      return todos.filter((todo) => todo.completed === true);
    }
  }, [todos, visibility]);
  return {visibility, setVisibility, filteredTodos}
}