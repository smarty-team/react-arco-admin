'use client'
import useSWR from "swr";

import ToggleButton from "./toggle-button";
import Theme from "./theme";

import LoginButton from "./login-button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NavBar() {

  const { data } = useSWR(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );
  
  return (
    <div className="navbar bg-base-100 border-b dark:border-b-slate-700">
      <ToggleButton></ToggleButton>
      <div className="flex-1"></div>
      <Theme></Theme>
      {data ? <div>{data.name}</div> : <LoginButton />}
    </div>
  );
}
