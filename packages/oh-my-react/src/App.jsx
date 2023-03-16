import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  // 声明状态
  const [todos, setTodos] = useState([
    { id: 1, title: "创建项目", completed: true },
    { id: 2, title: "组件化开发", completed: false },
    { id: 3, title: "掌握JSX", completed: false },
    { id: 4, title: "掌握hooks", completed: false },
  ]);

  // const xxx = true ? <div>xxx</div> : null

  const changeState = (e, currentTodo) => {
    currentTodo.completed = e.target.checked;
    // 必须重新设置状态，否则组件不会重新渲染
    // 更新数组需要全新对象，否则组件不会重新渲染
    setTodos([...todos]);
  };

  // 表示新增的待办事项的名称
  const [newTodo, setNewTodo] = useState("");
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  // 用户回车且输入框有内容则添加一个新待办
  const addTodo = (e) => {
    if (e.code === "Enter" && newTodo) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  // 删除待办
  const removeTodo = (todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const initial = {
    title: "",
    completed: false,
  };
  // 正在编辑的待办
  const [editedTodo, setEditedTodo] = useState(initial);

  // 用户双击触发编辑模式
  const editTodo = (todo) => {
    // 克隆一个todo用于编辑
    // setBeforeEditCache(todo.title);
    setEditedTodo({ ...todo });
  };
  // 受控组件要求的事件处理
  const onEditing = (e) => {
    const title = e.target.value;
    if (title) {
      setEditedTodo({ ...editedTodo, title: e.target.value });
    } else {
      // title为空删除该项
      removeTodo(editedTodo);
    }
  };
  const onEdited = (e) => {
    // 监听enter
    if (e.code === "Enter") {
      if (editedTodo.title) {
        // 获取对应待办并更新
        const todo = todos.find((todo) => todo.id === editedTodo.id);
        todo.title = editedTodo.title;
        setTodos([...todos]);
      }
      setEditedTodo(initial);
    }
  };
  const cancelEdit = (e) => {
    setEditedTodo(initial);
  };

  return (
    <div className="App">
      <h2>待办事项</h2>

      {/* 新增待办 */}
      <div>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="该学啥了?"
          value={newTodo}
          onChange={changeNewTodo}
          onKeyUp={addTodo}
        />
      </div>

      {/* 条件 */}
      {/* { xxx } */}
      {/* 列表 */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            className={[
              "todo",
              todo.completed ? "completed" : "",
              editedTodo.title && editedTodo.id === todo.id ? "editing" : "",
            ].join(" ")}
            key={todo.id}
          >
            <div className="view">
              {/* 受控组件: 赋值和事件处理 */}
              <input
                className="toggle"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => changeState(e, todo)}
              />
              <span onDoubleClick={() => editTodo(todo)}>{todo.title}</span>
              <button className="destroy" onClick={() => removeTodo(todo)}>
                X
              </button>
            </div>
            {/* 声明editedTodo状态, onChange处理状态变化 */}
            {/* onKeyUp处理修改确认，onBlur退出编辑模式 */}
            <input
              className="edit"
              type="text"
              value={editedTodo.title}
              onChange={onEditing}
              onKeyUp={onEdited}
              onBlur={cancelEdit}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
