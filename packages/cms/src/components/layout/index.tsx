import SideMenu from "./sidemenu";
import NavBar from "./navbar/index";
import Footer from "./footer";
import Link from "next/link";

export default function Layout({ menu, children }) {
  return (
    <div className="bg-base-100 drawer drawer-mobile">
      {/* 开关按钮 */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {/* 抽屉内容 */}
      <div className="drawer-content">
        {/* 页面内容 */}
        <NavBar></NavBar>
        {/* 内容 */}
        {children}
        <Footer></Footer>
      </div>
      {/* 抽屉侧边 */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* 侧边栏 */}
        <div className="menu w-80 bg-base-200 p-2">
          <Link href="/" className="btn btn-ghost text-2xl w-[154px] mb-4">前端大班车</Link>
          <SideMenu menu={menu}></SideMenu>
        </div>
      </div>
    </div>
  );
}
