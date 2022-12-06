// import Link from "next/link";
import ActiveLink from "./active-link";
import { useEffect, useState } from "react";
import { useMenus, flatMenus } from "../../libs/menus";

export function SideMenu() {
  // 请求获取menus
  const { menus } = useMenus();
  const [flattenMenus, setFlattenMenus] = useState([]);
  useEffect(() => {
    if (menus && menus.length) {
      const result = flatMenus(menus);
      setFlattenMenus(result);
    }
  }, [menus]);

  return (
    <>
      <ul className="menu bg-base-100 p-2 rounded-box">
        {flattenMenus.map((menu) => {
          if (menu.id) {
            return (
              <li key={menu.title}>
                <ActiveLink activeClassName="active" href={`/posts/${menu.id}`}>
                  {menu.title}
                </ActiveLink>
              </li>
            );
          } else {
            return (
              <li className="menu-title" key={menu.title}>
                <span>{menu.title}</span>
              </li>
            );
          }
        })}
      </ul>
      
    </>
  );
}
