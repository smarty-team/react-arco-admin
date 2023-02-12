import { useSms, useSmsLogin } from "@/libs/user";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "./components/alert";

export default function verifyCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  const router = useRouter();

  let timer = null;

  const [btnText, setBtnText] = useState("重新发送(60s)");
  const [isDisabled, setDisabled] = useState(true);
  const [validTime, setValidTime] = useState(60);

  const timeRef = useRef();
  timeRef.current = validTime;

  function resentSms() {
    // 发送请求
    useSms(router.query.phoneNumber)
    // 重新计时
    retime();
  }
  function retime() {
    // 清除上次倒计时
    if (timer) {
      clearInterval(timer);
    }

    // 重置状态
    setBtnText("重新发送(60s)");
    setDisabled(true);
    setValidTime(60);

    // 重新开启倒计时
    timer = setInterval(() => {
      if (timeRef.current > 0) {
        setValidTime(timeRef.current - 1);
        setBtnText(`重新发送(${timeRef.current}s)`);
      } else {
        // 倒计时结束，可以重新发送
        setDisabled(false);
        setBtnText("重新发送");
      }
    }, 1000);
  }

  useEffect(() => {
    // 初始化立即启动一个倒计时器
    retime();
  }, []);

  async function onSubmit({smsCode}) {
    const data = await useSmsLogin({
      phoneNumber: router.query.phoneNumber,
      smsCode,
      verifyCode: "0000",
    });
    // 登录成功
    if (data) {
      router.push(router.query.callback || '/')
    } else {
      alert('登录错误，请重试')
    }
  }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="text-3xl">输入验证码</span>
                </label>
                <label className="label">
                  <span className="text text-gray-400">
                    验证码已发送至 +86 {router.query.phoneNumber}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <div className="flex flex-row">
                  <input
                    type="text"
                    placeholder=""
                    autoComplete="off"
                    className="w-3/6 input input-bordered mr-2"
                    {...register("smsCode", {
                      required: true,
                      pattern: /^\d{4}$/,
                    })}
                  />
                  <button
                    className="w-3/6 btn btn-outline"
                    disabled={isDisabled}
                    onClick={resentSms}
                  >
                    {btnText}
                  </button>
                </div>
                {errors.smsCode && errors.smsCode.type === "pattern" && (
                  <Alert message="验证码输入有误"></Alert>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="登录"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
