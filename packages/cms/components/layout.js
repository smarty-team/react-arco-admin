import { SideMenu } from "./side-menu";
import layout from "./layout.module.css";
import { LogoBar } from "./logo-bar";

export default function Layout({ children }) {
  return (
    <div className={layout.container}>
      {/* 菜单 */}
      <aside className={`bg-base-200 ${layout.menu}`}>
        {/* logo */}
        <LogoBar></LogoBar>
        {/* 菜单项 */}
        <SideMenu></SideMenu>
      </aside>
      <main className={layout.main}>
        {/* 导航 */}
        <nav className={layout.nav}>nav</nav>
        {/* 文章内容 */}
        <div className={layout.content}>{children}</div>
      </main>
    </div>
  );
}