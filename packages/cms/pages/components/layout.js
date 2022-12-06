import { SideMenu } from "./side-menu";
import { LogoBar } from "./logo-bar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* 菜单 */}
      <aside className="bg-base-200 w-80 h-[100vh] flex-none">
        {/* logo */}
        <LogoBar></LogoBar>
        {/* 菜单项 */}
        <SideMenu></SideMenu>
      </aside>
      <main className="flex-1">
        {/* 导航 */}
        <nav className="w-full max-w-4xl">nav</nav>
        {/* 文章内容 */}
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}