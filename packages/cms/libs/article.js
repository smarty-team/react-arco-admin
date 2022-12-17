// 获取菜单数据
export function useArticle(id) {
  return fetch("http://localhost:3000/article/" + id)
    .then((res) => res.json())
    .then((json) => json.data);
}
