import ActiveLink from "./active-link";

export default function SideMenu({ menu }) {
  const checkAuth = () => {
    // 文章阅览数增加
    const viewcount = localStorage.getItem("viewcount")
      ? parseInt(localStorage.getItem("viewcount")!)
      : 0;
    localStorage.setItem("viewcount", viewcount + 1 + "");
  };
  return (
    <ul>
      {menu.map((menuItem) => {
        if (menuItem.type === "article") {
          return (
            <li key={menuItem.key}>
              <ActiveLink
                onClick={checkAuth}
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
  );
}
