import Router from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectUserInfo, setUserInfo } from "../stores/authSlice";
import { fetcher, post } from "./fetcher";
import useStorage from "./storage";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function useNeedLogin() {
  const [needLogin, setNeedLogin] = useState(false)
  const [message, setMessage] = useState('')

  // 如果没有用户信息，且访问次数多于3次，需要登录
  const [token] = useStorage("token");
  const [viewcount] = useStorage("viewcount", 0);

  useEffect(() => {
    if (!token && viewcount && Number(viewcount) > 2) {
      setNeedLogin(true)
      setMessage('请先登录一下再继续学习~')
    }
  }, [token, viewcount])

  // 如果token过期，需要重新登录
  // 如果userInfo存在，说明已经验证过，则不需要请求验证
  const userInfo = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  if (!userInfo && token) {
    fetch(baseUrl + "/auth/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(resp => {
        if (!resp.ok && resp.status === 401) {
          setNeedLogin(true)
          setMessage('token过期，需要重新登录~')
          throw new Error('token过期，需要重新登录')
        } else {
          return resp.json()
        }
      })
      .then(json => {
        dispatch(setUserInfo(json.data))
      })
      .catch(reason => { })
  }

  return { needLogin, message }
}

export async function useLogin(loginData) {
  // 请求登录接口
  const { token } = await post(baseUrl + "/auth/login", loginData);
  // 存储token
  localStorage.setItem("token", token);
  return token;
}

// 获取验证码
export function useCapcha() {
  const { data, error, mutate, isLoading } = useSWR(baseUrl + "/auth/captcha", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading, mutate };
}

// 请求短信验证码
export async function useSms(data) {
  const code = await post(baseUrl + "/auth/registerCode", data);
  return code;
}

export async function useSmsLogin(registerData) {
  // 请求登录接口
  const { token } = await post(baseUrl + "/auth/registerBySMS", registerData);
  return token as string;
}
