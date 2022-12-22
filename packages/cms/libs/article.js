const baseUrl = process.env.SERVER

// 获取菜单数据
export function useArticle(id) {
  return fetch(baseUrl + "/article/" + id)
    .then((res) => res.json())
    .then((json) => json.data);
}
