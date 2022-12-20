import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from './fetcher'

// 获取菜单数据
export function useMenu() {
  const { error, data } = useSWR("/data-api/menus", fetcher);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    if (data && data.data) {
      const menuOrigin = data.data.menus;
      const result = flatMenus(menuOrigin);
      setMenu(result);
    }
  }, [data]);
  return {
    data,
    menu,
    isLoading: !error && !data,
    isError: error,
  };
}

// 获取菜单中文章的id数据用于动态路由和预渲染
export function useMenuId() {
  return fetch("http://localhost:3000/menus")
    .then((res) => res.json())
    .then((json) => {
      // 拍平
      const result = flatMenus(json.data.menus);
      // 过滤出文章
      const articles = result.filter((item) => item.type === "article");
      // 转换为需要的格式：{params: {id: 'xxx'}}
      return articles.map((article) => ({ params: { id: article.key } }));
    });
}

// 传入menu形如：
// [
//   {
//       "key": "1",
//       "title": "前端框架",
//       "type": "category",
//       "children": [
//           {
//               "key": "639bcdc938613444f37c4365",
//               "title": "vuejs入门",
//               "type": "article"
//           },
//           {
//               "key": "639bcdda38613444f37c4366",
//               "title": "react入门",
//               "type": "article"
//           }
//       ]
//   },
//   {
//       "key": "2",
//       "title": "前端基础",
//       "type": "category",
//       "children": [
//           {
//               "key": "639bce1838613444f37c4367",
//               "title": "JS基础",
//               "type": "article"
//           }
//       ]
//   }
// ]
// 转换属性结构为拍平的数组
export function flatMenus(menus, result = []) {
  for (const menu of menus) {
    result.push(menu);
    if (menu.type === "category" && menu.children.length) {
      flatMenus(menu.children, result);
    }
  }
  return result;
}
