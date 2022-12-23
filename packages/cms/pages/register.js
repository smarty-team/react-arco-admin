import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Alert from "./components/alert";
import { useCapcha, useSms } from "@/libs/user";
import ReactLoading from "react-loading";
import { useEffect } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  async function onSubmit(formData) {
    // 发送验证码请求
    try {
      await useSms({ captchaId: data.id, ...formData });
      router.push({
        pathname: "/verifyCode",
        query: { phoneNumber: formData.phoneNumber },
      });
    } catch (error) {
      // 报错信息
    }
  }

  // 验证码
  const { data, isLoading, mutate, error } = useCapcha();
  useEffect(() => {
    // 有错误发生，dosomething
  }, [error]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="text-3xl">注册/登录</span>
                </label>
              </div>
              <div className="form-control">
                <div className="flex flex-row">
                  <select
                    defaultValue="+86"
                    className="select select-bordered w-2/6 max-w-xs mr-2"
                  >
                    <option>+86</option>
                    <option>+852</option>
                    <option>+1</option>
                    <option>+81</option>
                  </select>
                  <input
                    type="text"
                    placeholder="请输入手机号"
                    className="w-4/6 input input-bordered"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^1[3456789]\d{9}$/,
                    })}
                  />
                </div>
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
                <div className="flex flex-row">
                  <input
                    type="text"
                    placeholder="请输入4位验证码"
                    className="w-4/6 input input-bordered"
                    {...register("captchaCode", {
                      required: true,
                      pattern: /^[1-9a-zA-Z]{4}$/,
                    })}
                  />
                  {isLoading ? (
                    <ReactLoading type="spin" color="#fff" />
                  ) : (
                    <img src={data.image} onClick={mutate} />
                  )}
                </div>
                {errors.captchaCode && errors.captchaCode.type === "required" && (
                  <Alert message="请输入验证码"></Alert>
                )}
                {errors.captchaCode && errors.captchaCode.type === "pattern" && (
                  <Alert message="验证码输入有误"></Alert>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="获取验证码"
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}