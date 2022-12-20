// import Link from "next/link";
import ActiveLink from "components/active-link";
import { useMenu } from "libs/menu";
import ErrorMsg from "./error-msg";

export default function SideMenu() {
  // 请求获取menus
  const { error, menu, isLoading } = useMenu();

  if (isLoading) {
    return <>加载中...</>;
  }

  if (error) {
    return <ErrorMsg></ErrorMsg>;
  }

  return (
    <>
      <ul className="menu w-80 bg-base-200 p-2">
        {menu.map((menuItem) => {
          if (menuItem.type === "article") {
            return (
              <li key={menuItem.key}>
                <ActiveLink
                  activeClassName="active"
                  href={`/posts/${menuItem.key}`}
                >
                  {menuItem.title}
                </ActiveLink>
              </li>
            );
          } else {
            return (
              <li className="menu-title" key={menuItem.key}>
                <span>{menuItem.title}</span>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
