import { useState, createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import VerifyCode from "./pages/VerifyCode";
import PasswordConfirm from "./pages/PasswordConfirm";
import { ThemeContext } from "./components/content/theme";
import Index from "./pages/Index";
import Loading from "./components/content/loading";
import Landing from "./pages/Landing";
// const ThemeContext = createContext("light");

function App(props, context) {
  let [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <ThemeApp />
    </ThemeContext.Provider>
  );
}

function ThemeApp(props) {
  const ctx = useContext(ThemeContext);
  return (
    <div className="App" data-theme={ctx.theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyCode" element={<VerifyCode />} />
          <Route path="/passwordConfirm" element={<PasswordConfirm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
