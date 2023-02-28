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

async function responseHandler(res: Response) {
  // 如果状态码不在 200-299 的范围内，报错
  if (res.ok) {
    return res.json()
  } else {
    console.log(res);
    
    const error = new Error('获取数据时发生了错误')
    console.dir(error);
    
    // 将额外的信息附加到错误对象上。
    error.info = await res.json()
    error.status = res.status
    throw error
  }
}
