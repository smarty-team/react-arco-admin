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
        <li></li>
        <li className="menu-title">
          <span>基础八股文</span>
        </li>
        <li>
          <a className="flex gap-4">Vue</a>
        </li>
        <li>
          <a className="flex gap-4">React</a>
        </li>
        <li>
          <a className="flex gap-4">NodeJS</a>
        </li>
        <li>
          <a className="flex gap-4">Webpack</a>
        </li>
        <li>
          <a className="flex gap-4">Javascript</a>
        </li>
        <li>
          <a className="flex gap-4">CSS</a>
        </li>
        <li>
          <a className="flex gap-4">HTML</a>
        </li>
        <li>
          <a className="flex gap-4">HTTP</a>
        </li>
        <li>
          <a className="flex gap-4">版本控制</a>
        </li>
        <li>
          <a className="flex gap-4">操作系统</a>
        </li>
        <li>
          <a className="flex gap-4">算法</a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>源码造轮子</span>
        </li>
        <li>
          <a className="flex gap-4">Mini-Vue</a>
        </li>
        <li>
          <a className="flex gap-4">Mini-Webpack</a>
        </li>
        <li>
          <a className="flex gap-4">Mini-Vite</a>
        </li>
        <li>
          <a className="flex gap-4">Mini-React</a>
        </li>
        <li>
          <a className="flex gap-4">Mini-HTTP协议</a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>实战课</span>
        </li>
        <li>
          <a className="flex gap-4">Nest中后台系统</a>
        </li>
        <li>
          <a className="flex gap-4">Nuxt实战</a>
        </li>
        <li>
          <a>Vue3组件库实战</a>
        </li>
        <li>
          <a>Webpack性能优化</a>
        </li>
        <li></li>
      </ul>
    </aside>
  );
}
