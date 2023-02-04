import { useNavigate } from "react-router";

import Menu from "../components/menu";
import NavBar from "../components/content/navbar";
import Content from "../components/content/content";
import Footer from "../components/content/footer";
import Loading from "../components/content/loading";
import { useState } from "react";
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
  function Collapse() {
    return (
      <div
        tabindex="0"
        className=" w-[280px] collapse collapse-open border border-base-100 bg-base-100 rounded-box mx-1"
      >
        <div class="collapse-title text-xl font-medium">
          <span className="flex-none icon-[logos--vue]"></span>Vue面试题
        </div>
        <div class="collapse-content">
          {list.map((c) => (
            <div className="btn w-full my-1">{c}</div>
          ))}
        </div>
      </div>
    );
  }

  function Hero1() {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="text-center">
          <h1 className="text-5xl font-bold">面试题大全</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>

          <div className="max-w flex flex-wrap flex-row gap-6 mb-12">
            <Collapse className="flex-auto" />
            <Collapse className="flex-auto" />
            <Collapse className="flex-auto" />

            <Collapse className="flex-auto" />

            <Collapse className="flex-auto" />

            <Collapse className="flex-auto" />
          </div>
        </div>
      </div>
    );
  }

  function Hero2() {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          {/* <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin")}
            >
              Get Started
            </button> */}

          <div className="max-w flex flex-row flex-wrap">
            {menus.map((menu) => (
              <div class="card card-side bg-base-100 shadow-xl w-90 m-2">
                <figure className="px-6 pt-6 w-full">
                  <span className="flex-none icon-[logos--vue] text-6xl"></span>
                </figure>
                <div class="card-body">
                  <h2 class="card-title w-40">Vue面试题</h2>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Watch</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar></NavBar>

        {/* <Hero1 /> */}
        <Hero2 />

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
