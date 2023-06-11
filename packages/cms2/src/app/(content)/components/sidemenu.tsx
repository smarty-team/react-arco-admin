import ActiveLink from "./active-link";
import useSWR from "swr";

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

export default function SideMenu() {
  const { data: menu, isLoading } = useSWR("/data-api/menus", getMenu);

  return (
    <>
      <ul className="menu menu-compact">
        {/* <li className="menu-title"><span>实战课程</span></li> */}
        <li>
          <a
            href="https://duz.xet.tech/s/4jUOJx?shareBind=true"
            target="_blank"
          >
            <i className="text-xl icon-[vscode-icons--file-type-vue]"></i>
            Vue3+TSX开源组件库实战
          </a>
        </li>
        <li>
          <a
            href="https://duz.xet.tech/s/1zimuF?shareBind=true"
            target="_blank"
          >
            <i className="text-xl icon-[vscode-icons--file-type-vueconfig]"></i>
            Vue源码全家桶:剖析+手写
          </a>
        </li>
        <li>
          <a
            href="https://duz.xet.tech/s/18lbuV?shareBind=true"
            target="_blank"
          >
            <i className="text-xl icon-[noto--hammer-and-wrench]"></i>
            前端工程化实践
          </a>
        </li>
        <li>
          <a href="https://duz.xet.tech/s/8D55I?shareBind=true" target="_blank">
            <i className="text-xl icon-[logos--nodejs-icon]"></i>
            Node.js与服务端
          </a>
        </li>
        {/* <li><a href="https://appuwwsm6cl6690.h5.xiaoeknow.com/p/course/big_column/p_62b2ce2ee4b0ba331dcb87c1?share_from=u_62a4606541f8b_KDYfWMVVMD&share_type=5&share_user_id=u_62a4606541f8b_KDYfWMVVMD" target="_blank">🛫 精通React</a></li> */}
      </ul>
      {!isLoading && (
        <ul className="menu menu-compact">
          {menu?.map((menuItem) => {
            if (menuItem.type === "article") {
              return (
                <li key={menuItem.key} className="w-full">
                  <ActiveLink
                    className="text-ellipsis overflow-hidden whitespace-nowrap block w-[306px]"
                    activeClassName="active"
                    href={`/posts/${menuItem.key}`}
                    title={menuItem.title}
                  >
                    {menuItem.title}
                  </ActiveLink>
                </li>
              );
            } else {
              return (
                <li className="menu-title mt-4" key={menuItem.title}>
                  <span>{menuItem.title}</span>
                </li>
              );
            }
          })}
        </ul>
      )}
    </>
  );
}
