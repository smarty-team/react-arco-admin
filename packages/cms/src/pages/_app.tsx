import { useState } from "react";
import "highlight.js/styles/github-dark.css";
import "../styles/globals.css";
import { ThemeContext } from "../components/layout/navbar/theme";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../store";

export default function MyApp({ Component, pageProps }: AppProps) {
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
