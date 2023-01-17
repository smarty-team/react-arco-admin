export default function Menu() {
  return (
    <aside className="bg-base-200 w-80">
      <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
        <a
          href="/"
          aria-current="page"
          aria-label="Homepage"
          className="flex-0 btn btn-ghost px-2"
        >
          <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span className="lowercase">🚌 前端</span>{" "}
            <span className="text-base-content uppercase">大班车</span>
          </div>
        </a>{" "}
      </div>
      <div className="h-4"></div>
      <ul className="menu menu-compact flex flex-col p-0 px-4">
        {/* 菜单 */}
        <li>
          <a href="/" id="" class="flex gap-4   ">
            <span class="flex-none">
              <span className="icon-[mdi--map-marker-multiple]"></span>
            </span>{" "}
            <span class="flex-1">路线图</span>{" "}
          </a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>基础八股文</span>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--vue]"></span>Vue
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[vscode-icons--file-type-reactjs]"></span>
            React
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--nodejs-icon]"></span>
            NodeJS
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--webpack]"></span>
            Webpack
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--javascript]"></span>
            Javascript
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[vscode-icons--file-type-css]"></span>
            CSS
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[vscode-icons--file-type-html]"></span>
            HTML
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[simple-icons--aiohttp]"></span>
            HTTP
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[mdi--git]"></span>
            版本控制
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--linux-tux]"></span>
            操作系统
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[tabler--logic-nand]"></span>
            算法
          </a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>源码造轮子</span>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--vue]"></span>
            简写Vue
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--webpack]"></span>
            简写Webpack
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--vitejs]"></span>
            简写Vite
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--react]"></span>
            简写React
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[simple-icons--aiohttp]"></span>
            简写HTTP协议
          </a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>实战课</span>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[vscode-icons--file-type-nestjs]"></span>
            Nest中后台系统
          </a>
        </li>
        <li>
          <a className="flex gap-2">
            <span className="flex-none icon-[logos--nuxt-icon]"></span>
            Nuxt实战
          </a>
        </li>
        <li>
          <a>
            <span className="flex-none icon-[logos--vue]"></span>
            Vue3组件库实战
          </a>
        </li>
        <li>
          <a>
            <span className="flex-none icon-[logos--webpack]"></span>
            Webpack性能优化
          </a>
        </li>
        <li></li>
      </ul>
    </aside>
  );
}
