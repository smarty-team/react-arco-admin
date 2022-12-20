import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import VerifyCode from "./pages/VerifyCode";
import PasswordConfirm from "./pages/PasswordConfirm";
function App() {
  return (
    <div className="App" data-theme="bumblebee">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyCode" element={<VerifyCode />} />
          <Route path="/passwordConfirm" element={<PasswordConfirm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
