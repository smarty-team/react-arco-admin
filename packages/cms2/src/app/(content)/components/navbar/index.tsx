'use client'
// import useSWR from "swr";

import ToggleButton from "./toggle-button";
import Theme from "./theme";

import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { selectIsLogin } from "@/app/store/authSlice";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NavBar() {

  // const { data } = useSWR(
  //   "https://jsonplaceholder.typicode.com/users/1",
  //   fetcher
  // );
  
  const isLogin = useSelector(selectIsLogin)
   
  return (
    <div className="navbar bg-base-100 border-b dark:border-b-slate-700">
      <ToggleButton></ToggleButton>
      <div className="flex-1"></div>
      <Theme></Theme>
      {isLogin ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
