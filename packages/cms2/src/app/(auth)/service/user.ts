import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const fetcher = (url: string) =>
  fetch(url)
    .then(responseHandler)
    .then((json) => json.data);
// 获取验证码
export function useCapcha() {
  const { data, error, mutate, isLoading } = useSWR(
    baseUrl + "/auth/captcha",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}

// 请求短信验证码
export async function useSms(data: any) {
  const code = await fetch(baseUrl + "/auth/registerCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(responseHandler)
    .then((json) => json.data);
  return code;
}

export async function useSmsLogin(registerData: any): Promise<string> {
  // 请求登录接口
  const { token } = await fetch(baseUrl + "/auth/registerBySMS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(registerData),
  })
    .then(responseHandler)
    .then((json) => json.data);
  return token;
}

async function responseHandler(res: Response) {
  // 如果状态码不在 200-299 的范围内，报错
  if (res.ok) {
    return res.json();
  } else {
    console.log(res);
    const data = await res.json();
    const error = {
      status: data.status,
      message: data.message || "获取数据时发生了错误",
    };
    console.dir(error);
    throw error;
  }
}
export interface ResponseError {
  status: number;
  message: string;
}