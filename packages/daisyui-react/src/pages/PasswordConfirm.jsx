import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Alert from "../components/alert";

export default function PasswordConfirm() {
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
                <span className="text-3xl">修改密码</span>
              </label>
              <label className="label">
                <span className="text text-gray-400">
                  密码长度 6-24 位，至少包含字母、数字、符号 2 中组合
                </span>
              </label>
            </div>

            <div className="form-control">
              <input
                type="password"
                placeholder="输入旧密码"
                className="input input-bordered"
              />
              <Alert></Alert>
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="输入新密码"
                className="input input-bordered"
              />
              <Alert></Alert>
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="输入新密码"
                className="input input-bordered"
              />
              <Alert></Alert>
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
