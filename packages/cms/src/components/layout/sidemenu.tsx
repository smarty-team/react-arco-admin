import ActiveLink from "./active-link";

export default function SideMenu({ menu }) {
  return (
    <ul>
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
  );
}
