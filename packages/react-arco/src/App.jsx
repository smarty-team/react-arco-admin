import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React, { useMemo } from "react";
import { getFlattenRoutes, routes } from "./routes";
import { IconDashboard } from "@arco-design/web-react/icon";
import { Icon } from "@arco-design/web-react";
import IconReact from "./assets/react.svg";

const IconFont = Icon.addFromIconFontCn({
  src: "//sf1-cdn-tos.toutiaostatic.com/obj/iconfont/index_8132353a46ca4ac1314b8903202269af.js",
})

// 排版 Typography
// Title 标题
// Text  文本
// Paragraph 段落

// 布局
// Grid 栅格
// Layout 布局
// Space 间距

function App() {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to={"/dashboard"}>
            <IconDashboard></IconDashboard>
            dashboard
          </Link>
          <Link to={"/example"}>
            <IconReact></IconReact>
            example
          </Link>
          <Link to={"/example"}>
            <IconFont type="icon-person"></IconFont>
            example1
          </Link>
        </nav>
        <Routes>
          {flattenRoutes.map((route) => {
            return (
              <Route
                key={route.key}
                path={`/${route.key}`}
                element={route.component}
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
