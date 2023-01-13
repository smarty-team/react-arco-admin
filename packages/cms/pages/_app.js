// import 'github-markdown-css'
import "highlight.js/styles/github-dark.css";
import "../styles/globals.css";
import { useState } from "react";
import { ThemeContext } from "@/libs/theme-context";

function App({ Component, pageProps }) {
  let [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div data-theme={theme}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
