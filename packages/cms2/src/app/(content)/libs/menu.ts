// 获取菜单数据
export function getMenu(url: string) {
  return fetch(url, { next: { revalidate: 3600 }}) // 每小时刷新
    .then((res) => res.json())
    .then((json) => flatMenu(json.data.menus)); // 拍平
}

// 转换属性结构为拍平的数组
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
//           }
//       ]
//   }
// ]
export interface MenuItem {
  key: string;
  title: string;
  type: "category" | "article";
  children?: MenuItem[];
}
export function flatMenu(menus: MenuItem[], result: MenuItem[] = []) {
  for (const menu of menus) {
    result.push(menu);
    if (menu.type === "category" && menu.children && menu.children.length) {
      flatMenu(menu.children, result);
      delete menu.children;
    }
  }
  return result;
}

export function getMenuIds(menu: MenuItem[]) {
  // 拍平
  const result = flatMenu(menu);
  // 过滤出文章
  const articles = result.filter((item) => item.type === "article");
  // 转换为需要的格式：{id: 'xxx'}
  return articles.map((article) => ({ id: article.key }));
}