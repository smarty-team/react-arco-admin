import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLogin } from "./store/userSlice";

export default function RequireAuth({ children }) {
  // 检查用户是否登录
  let isLogin = useSelector(selectLogin);
  // 获取当前url地址
  let location = useLocation();

  if (!isLogin) {
    // 如果未登录重定向到 /login 页面, 同时保存当前location以便登录成功之后回跳回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
	// 如果登录显示RequireAuth孩子内容
  return children;
}