import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});