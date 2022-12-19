// 获取菜单数据
export function useArticle(id) {
  return fetch(process.env.host + "/article/" + id)
    .then((res) => res.json())
    .then((json) => json.data);
}
