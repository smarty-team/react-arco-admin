import { useRouter } from "next/router";
import { useEffect } from "react";
import useStorage from "./storage";

export function useToken(articleId) {
  // 首先判断是否需要用户登录，需要登录的条件是：
  // 用户没有登录，同时查阅文章次数超过2次
  const [token] = useStorage("token");
  const [viewcount] = useStorage("viewcount", 0);

  const router = useRouter();

  // 如果用户没有登录，同时查阅文章次数超过2次，重定向去登录页
  useEffect(() => {
    if (!token && viewcount && parseInt(viewcount) > 2) {
      router.push({
        pathname: "/login",
        query: { callback: `/posts/${articleId}` },
      });
    }
    // 每次访问页面计数器加一
    localStorage.setItem("viewcount", parseInt(viewcount) + 1);
  }, [token, viewcount]);

  return token
}