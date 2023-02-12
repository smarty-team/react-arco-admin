import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const server = process.env.SERVER;

// 获取菜单数据
export function getMenu() {
  return fetch(server + "/menus")
    .then((res) => res.json())
    .then((json) => json.data.menus);
}

export function getMenuIds(menu) {
  // 拍平
  const result = flatMenu(menu);
  // 过滤出文章
  const articles = result.filter((item) => item.type === "article");
  // 转换为需要的格式：{params: {id: 'xxx'}}
  return articles.map((article) => ({ params: { id: article.key } }));
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
export function flatMenu(menus, result = []) {
  for (const menu of menus) {
    result.push(menu);
    if (menu.type === "category" && menu.children.length) {
      flatMenu(menu.children, result);
    }
  }
  return result;
}

export function useMenu() {
  const { error, data, isLoading } = useSWR(baseUrl + "/menus", fetcher);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    if (data) {
      const result = flatMenu(data.menus);
      setMenu(result);
    }
  }, [data]);
  return {
    menu,
    isLoading,
    isError: error,
  };
}

// 获取菜单中文章的id数据用于动态路由和预渲染
export function useMenuId() {
  // 直接在服务端发送请求到数据服务器
  return fetch(server + "/menus")
    .then((res) => res.json())
    .then((json) => {
      // 拍平
      const result = flatMenu(json.data.menus);
      // 过滤出文章
      const articles = result.filter((item) => item.type === "article");
      // 转换为需要的格式：{params: {id: 'xxx'}}
      return articles.map((article) => ({ params: { id: article.key } }));
    });
}
