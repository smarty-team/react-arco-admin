import 'github-markdown-css'
import "../styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";
import { ThemeContext } from "@/libs/theme-context";
import store from "../store";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
