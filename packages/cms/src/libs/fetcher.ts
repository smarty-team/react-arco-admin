export const fetcher = (...args) =>
  fetch(...args)
    .then(responseHandler)
    .then((json) => json.data);

export const fetcherWithToken = (url, token) => {
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(responseHandler)
    .then((json) => json.data);
}


export const post = (url: string, data?: any) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(responseHandler)
    .then((json) => json.data);

export interface ResponseError {
  status: number;
  message: string;
}
    
async function responseHandler(res: Response) {
  // 如果状态码不在 200-299 的范围内，报错
  if (res.ok) {
    return res.json()
  } else {
    console.log(res);
    const data = await res.json()
    const error = {
      status: data.status,
      message: data.message || '获取数据时发生了错误',
    }
    console.dir(error);
    throw error
  }
}
