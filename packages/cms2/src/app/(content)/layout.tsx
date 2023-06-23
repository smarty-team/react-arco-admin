"use client";

import "highlight.js/styles/github-dark.css";
import "./globals.css";

import { useState } from "react";

import SideMenu from "./components/sidemenu";
import NavBar from "./components/navbar/index";
import Footer from "./components/footer";

import { ThemeContext } from "./theme-context";
import Providers from "../components/Provider";

import Script from "next/script";

function createMarkup() {
  return {
    __html: `var _hmt = _hmt || [];
      (function() {
        console.log('createMarkup');
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?83882d256e3353ab5f39c27a3fa50b23";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
  };
}

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
        <Providers>
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
        </Providers>
        <Script
          id="baidu-analytics"
          dangerouslySetInnerHTML={createMarkup()}
        ></Script>
      </body>
    </html>
  );
}
