import "./App.css";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { selectRole, setRole } from "./store/userSlice";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import { useTitle, useRequest } from "ahooks";
import { useEffect } from "react";
import { setTodos } from "./store/todoSlice";

// useState, useEffect, useContext
// useReducer, useCallback, useMemo, useRef, ...

// className
// inline styles
// CSS Module

// ahooks分类：
// - 数据请求 useRequest
// - Scene 表格 滚动 翻页
// - LifeCycle 挂载 卸载
// - State： 状态处理 cookie localStorage
// - Effect: 定时器、防抖、节流
// - DOM：操作DOM

// 数据获取：
// - 传统axios
//   axios.get(url, {}).then(res => res.xxxx)
// - hooks
//   {data, loading, error} = useRequest(getTodos)

function getTodos() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "创建项目", completed: true },
        { id: 2, title: "组件和JSX", completed: true },
        { id: 3, title: "react hooks", completed: false },
      ])
    }, 2000);
  })
  // return Promise.resolve([
  //   { id: 1, title: "创建项目", completed: true },
  //   { id: 2, title: "组件和JSX", completed: true },
  //   { id: 3, title: "react hooks", completed: false },
  // ]);
}

function App() {
  const role = useSelector(selectRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onLogout() {
    // 清空角色
    dispatch(setRole(""));
    // 跳转登录页
    navigate("/login");
  }

  useTitle("TodoMVC");

  const { data, loading, error } = useRequest(getTodos);
  useEffect(() => {
    if (data) {
      dispatch(setTodos(data));
    }
  }, [data]);

  return (
    <div className="App">
      <div>
        你好, {role}
        <button onClick={onLogout}>注销</button>
      </div>

      <h2>待办事项</h2>

      {/* 新增待办 */}
      <AuthWrapper roles={["admin"]}>
        <AddTodo></AddTodo>
      </AuthWrapper>

      {/* 待办列表 */}
      {loading ? <div>loading...</div> : <TodoList></TodoList>}
      
      {/* 过滤 */}
      <TodoFilter></TodoFilter>
    </div>
  );
}

export default App;
