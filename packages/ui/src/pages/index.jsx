import { useNavigate } from "react-router";

import Menu from "../components/menu";
import NavBar from "../components/content/navbar";
import Content from "../components/content/content";
import Footer from "../components/content/footer";
import Loading from "../components/content/loading";
import { useState } from "react";
import Hero from "../components/hero";
export default function Index() {
  const navigate = useNavigate();

  const [display, setDispllay] = useState(true);

  setTimeout(() => {
    setDispllay(false);
  }, 500);

  const list = [
    "Vue组件之间通信方式有哪些",
    "v-if和v-for哪个优先级更高？",
    "简述 Vue 的生命周期以及每个阶段做的事",
    "能说一说双向绑定使用和原理吗？",
    "Vue中如何扩展一个组件",
    "子组件可以直接改变父组件的数据",
    "Vue要做权限管理该怎么做",
    "Vue组件之间通信方式有哪些",
    "Vue组件之间通信方式有哪些",
  ];

  const menus = [
    { name: "Vue面试题", icon: `icon-[vscode-icons--file-type-vue]` },
    { name: "React面试题", icon: `icon-[vscode-icons--file-type-reactjs]` },
    { name: "NodeJS面试题", icon: `icon-[logos--nodejs-icon]` },
    { name: "Webpack面试题", icon: `icon-[vscode-icons--file-type-webpack]` },
    { name: "Linux面试题", icon: `icon-[logos--linux-tux]` },
  ];

  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar></NavBar>
        <Hero></Hero>
        <Footer></Footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Menu></Menu>
      </div>

      <Loading display={display}></Loading>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
    </div>
  );
}
