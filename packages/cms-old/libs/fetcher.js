export const fetcher = (...args) =>
  fetch(...args)
    .then(responseHandler)
    .then((json) => json.data);

export const fetcherWithToken = (url, token) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(responseHandler)
    .then((json) => json.data);

export const post = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(responseHandler)
    .then((json) => json.data);

async function responseHandler(res) {
    // 如果状态码不在 200-299 的范围内，
  // 我们仍然尝试解析并抛出它。
  if (!res.ok) {
    const error = new Error('获取数据时发生了错误')
    // 将额外的信息附加到错误对象上。
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
  // if (res.ok) {
  //   return res.json();
  // } else {
  //   const error = new Error(res.statusText);
  //   error.response = { status: res.status, statusText: res.statusText };
  //   throw error;
  // }
}
