import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcherWithToken, post } from "./fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 获取用户信息
export function useUser({
  redirectTo = "", // 重定向地址
  callback = "", // 回跳地址
} = {}) {
  let token = "";

  if (typeof window !== "undefined") {
    // 获取本地存储的token
    token = localStorage.getItem("token");

    // token不存在则重定向到登录页
    if (!token) {
      const route = {
        pathname: redirectTo || "/login",
        query: { callback },
      };
      Router.push(route);
    }
  }

  // 请求用户信息
  const { data: user, error } = useSWR(
    [baseUrl + "/auth/info", token],
    fetcherWithToken
  );

  // 如果error存在，状态码为401，说明token过期，需要重新登录
  useEffect(() => {
    if (error) {
      const status = error.response?.status;
      if (status == 401) {
        const route = {
          pathname: redirectTo || "/login",
          query: { callback },
        };
        Router.push(route);
      }
    }
  }, [error]);

  return { user, error };
}

export async function useLogin(loginData) {
  // 请求登录接口
  const { token } = await post(baseUrl + "/auth/login", loginData);
  return token;
}

export async function useSms(phoneNumber) {
  // 请求登录接口
  const msg = await post(baseUrl + "/auth/registerCode", { phoneNumber });
  return msg;
}

export async function useSmsLogin(registerData) {
  // 请求登录接口
  const { token } = await post(baseUrl + "/auth/registerBySMS", registerData);
  return token;
}
