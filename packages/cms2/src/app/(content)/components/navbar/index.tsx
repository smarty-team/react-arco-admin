'use client'

import ToggleButton from "./toggle-button";
import Theme from "./theme";

import LoginButton from "./login-button";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 border-b dark:border-b-slate-700">
      <ToggleButton></ToggleButton>
      <div className="flex-1"></div>
      <Theme></Theme>
      <LoginButton />
    </div>
  );
}
