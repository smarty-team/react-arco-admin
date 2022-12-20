import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Alert from "../components/alert";
function App() {
  const navigate = useNavigate();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">前端大班车</h1>
          <p className="py-6">
            Talk is cheap. Show me the code.Talk is cheap. Show me the code.Talk
            is cheap. Show me the code.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="text-3xl">登录</span>
              </label>
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="请输入手机号"
                className="input input-bordered"
              />
              <Alert></Alert>
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="请输入密码"
                className="input input-bordered"
              />
              <Alert></Alert>
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={() => navigate("/register")}
                >
                  忘记密码?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
