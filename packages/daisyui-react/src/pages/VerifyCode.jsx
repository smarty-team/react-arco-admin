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
                <span className="text-3xl">输入验证码</span>
              </label>
              <label className="label">
                <span className="text text-gray-400">
                  验证码已发送至 +86 13611388415
                </span>
              </label>
            </div>
            <div className="form-control">
              <div className="flex flex-row">
                <input
                  type="text"
                  placeholder=""
                  className="w-3/6 input input-bordered mr-2"
                />
                <button className="w-3/6 btn btn-outline">重新发送</button>
              </div>
            </div>
            <div className="form-control">
              <div className="flex flex-row">
                <input
                  type="text"
                  placeholder=""
                  className="w-3/6 input input-bordered mr-2"
                />
                <button className="w-3/6 btn btn-outline" disabled="disabled">
                  重新发送(52s)
                </button>
              </div>
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
