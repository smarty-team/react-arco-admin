import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";

export default function AddTodo() {
  // 表示新增的待办事项的名称
  const [newTodo, setNewTodo] = useState("");
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  // 这里只需要dispatch通知新增
  const dispatch = useDispatch();
  const onAddTodo = (e) => {
    if (e.code === "Enter" && newTodo) {
      // addTodo(newTodo)
      // 修改新增待办调用方式
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };
  return (
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
  );
}
