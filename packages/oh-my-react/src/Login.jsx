import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setRole } from "./store/userSlice";

export default function Login() {
  // 添加用户角色状态
  const [role, setUserRole] = useState("admin");
	// 修改全局中角色状态
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const onLogin = () => {
    // 设置用户角色
    dispatch(setRole(role))
    // ..
    navigate('/')
  }
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="radio"
          name="role"
          value="admin"
          checked={role === "admin"}
          onChange={() => setUserRole("admin")}
        />
        admin
        <input
          type="radio"
          name="role"
          value="user"
          checked={role === "user"}
          onChange={() => setUserRole("user")}
        />
        user
      </div>
      <button onClick={onLogin}>登录</button>
    </div>
  )
}