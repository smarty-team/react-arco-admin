import { useSelector } from "react-redux";
import { selectRole } from "./store/userSlice";

// 接收roles为所需角色
export default function AuthWrapper({ children, roles = [] }) {
  // 获取用户角色
  const role = useSelector(selectRole);

  // 如果没有传递roles，表明没有限制
  // 如果用户拥有所需角色，表明可以展示内容
  if (roles.length === 0 || roles.includes(role)) {
    // 如果拥有权限显示孩子内容
  	return children;
  } else {
    // 如果没有授权，则什么也不显示
  	return null
  }
}