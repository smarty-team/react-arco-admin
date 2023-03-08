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
    <>
      <ul className="menu menu-compact">
        {/* <li className="menu-title"><span>实战课程</span></li> */}
        <li>
          <a
            href="https://duz.xet.tech/s/1cJU74"
            target="_blank"
          >
            <i className="text-xl icon-[vscode-icons--file-type-reactts]"></i>
            React全栈进阶实战课
          </a>
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
            Vue2|3源码全家桶剖析+手写
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
      <ul className="menu menu-compact">
        {menu.map((menuItem) => {
          if (menuItem.type === "article") {
            return (
              <li key={menuItem.key} className="w-full">
                <ActiveLink
                  onClick={checkAuth}
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
    </>
  );
}
