import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
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
                <span className="text-3xl">注册/登录</span>
              </label>
            </div>
            <div className="form-control">
              <div className="flex flex-row">
                <select class="select select-bordered w-2/6 max-w-xs mr-2">
                  <option disabled selected>
                    +86
                  </option>
                  <option>+86</option>
                  <option>+852</option>
                  <option>+1</option>
                  <option>+81</option>
                </select>
                <input
                  type="text"
                  placeholder="请输入手机号"
                  className="w-4/6 input input-bordered"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/verifyCode")}
              >
                获取验证码
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
