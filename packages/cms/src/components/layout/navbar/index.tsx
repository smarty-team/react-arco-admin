import ToggleButton from "./toggle-button";
import UserInfo from "./user-info";
import Theme from "./theme";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  selectIsLogin,
  selectUserInfo,
  setUserInfo,
} from "../../../stores/authSlice";
import LoginButton from "./login-button";
import { useRouter } from "next/router";
import Search from "../../search";

export default function NavBar() {
  const userInfo = useAppSelector(selectUserInfo);
  const isLogin = useAppSelector(selectIsLogin);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = () => {
    dispatch(setUserInfo(null));
    router.push("/login");
  };
  return (
    <div className="navbar bg-base-100 border-b dark:border-b-slate-700">
      <ToggleButton></ToggleButton>
      <div className="flex-1">
        <Search></Search>
      </div>
      <Theme></Theme>
      {/* 如果登录显示用户信息否则显示登录按钮 */}
      {isLogin ? (
        <UserInfo info={userInfo} logout={logout}></UserInfo>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
