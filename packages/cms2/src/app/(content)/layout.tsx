"use client";

import "highlight.js/styles/github-dark.css";
import "./globals.css";

import { useState } from "react";

import SideMenu from "./components/sidemenu";
import NavBar from "./components/navbar/index";
import Footer from "./components/footer";

import { ThemeContext } from "./theme-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");
  return (
    <html lang="zh_cn">
      {/* 主题 */}
      <body data-theme={theme}>
        <ThemeContext.Provider
          value={{
            theme,
            setTheme,
          }}
        >
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
                <a className="btn btn-ghost text-2xl w-[154px] mb-4">
                  前端大班车
                </a>
                <SideMenu />
              </div>
            </div>
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
