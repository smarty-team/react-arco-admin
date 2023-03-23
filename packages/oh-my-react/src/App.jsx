import "./App.css";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { selectRole, setRole } from "./store/userSlice";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

// useState, useEffect, useContext
// useReducer, useCallback, useMemo, useRef, ...

// className
// inline styles
// CSS Module
function App() {
  const role = useSelector(selectRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onLogout() {
    // 清空角色
    dispatch(setRole(''))
    // 跳转登录页
    navigate('/login')
  }
  return (
    <div className="App">
      <div>
        你好, {role}
        <button onClick={onLogout}>注销</button>
      </div>

      <h2>待办事项</h2>

      {/* 新增待办 */}
      <AuthWrapper roles={['admin']}>
        <AddTodo></AddTodo>
      </AuthWrapper>

      {/* 待办列表 */}
      <TodoList></TodoList>

      {/* 过滤 */}
      <TodoFilter></TodoFilter>
    </div>
  );
}

export default App;
