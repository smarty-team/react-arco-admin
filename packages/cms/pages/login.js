import Head from "next/head";
import { useRouter } from "next/router";
import { useLogin } from "@/libs/user";
import Layout from "./components/layout";
import Alert from "./components/alert";
import { useState } from "react";

export default function Login() {

  const [phoneNumber, setPhoneNumber] = useState('13611177421')
  const [password, setPassword] = useState('888888')
  
  function onChange(val, key) {
    if (key === 'phoneNumber') {
      setPhoneNumber(val)
    } else {
      setPassword(val)
    }
  }
  
  const router = useRouter();
  const onLogin = async () => {
    try {
      const token = await useLogin({
        phoneNumber,
        password,
      });
      // 存储token
      localStorage.setItem("token", token);
      // 回跳到登录前页面
      router.push(router.query.callback);
    } catch (error) {
      // 显示错误信息
    }
  };

  return (
    <div>
      <Head>
        <title>用户登录</title>
      </Head>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">前端大班车</h1>
            <p className="py-6">
              Talk is cheap. Show me the code.Talk is cheap. Show me the
              code.Talk is cheap. Show me the code.
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
                  value={phoneNumber}
                  onChange={(e) => onChange(e.target.value, 'phoneNumber')}
                />
                <Alert></Alert>
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="请输入密码"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => onChange(e.target.value, 'password')}
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
                <button
                  className="btn btn-primary"
                  onClick={onLogin}
                >
                  登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
