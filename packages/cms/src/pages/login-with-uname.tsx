import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useLogin } from "../libs/user";
import Alert from "../components/alert";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { phoneNumber: "13611177421", password: "888888" },
  });

  const router = useRouter();
  const onLogin = async (data) => {
    try {
      await useLogin(data);
      
      // 回跳到登录前页面
      router.push(router.query.callback);
    } catch (error) {
      // 显示错误信息
      console.error(error);
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
              <form onSubmit={handleSubmit(onLogin)}>
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
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^1[3456789]\d{9}$/,
                    })}
                  />
                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "required" && (
                      <Alert message="请输入手机号"></Alert>
                    )}
                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "pattern" && (
                      <Alert message="手机号输入有误"></Alert>
                    )}
                </div>
                <div className="form-control">
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="input input-bordered"
                    {...register("password", { required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <Alert message="请输入密码"></Alert>
                  )}
                  <label className="label">
                    <Link
                      href="/register"
                      className="label-text-alt link link-hover"
                    >
                      注册账号
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input className="btn btn-primary" type="submit"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
