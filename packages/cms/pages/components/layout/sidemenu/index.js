import ActiveLink from "components/active-link";

export default function SideMenu({ menu }) {
  return (
    <>
      {menu && (
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
      )}
    </>
  );
}
