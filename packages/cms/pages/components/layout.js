import SideMenu from "./content/sidemenu";
import NavBar from "./content/navbar/index";
import Footer from "./content/footer";

export default function Layout({ children }) {
  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* 页面内容 */}
        <NavBar></NavBar>
        {/* 内容 */}
        {children}
        <Footer></Footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* 侧边栏 */}
        <SideMenu></SideMenu>
      </div>
    </div>
  );
}
