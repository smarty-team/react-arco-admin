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
          <span>面试宝典</span>
        </li>
        <li>
          <a className="flex gap-4">Javascript</a>
        </li>
        <li>
          <a className="flex gap-4">HTML与浏览器</a>
        </li>
        <li>
          <a className="flex gap-4">CSS与布局</a>
        </li>
        <li>
          <a className="flex gap-4">服务器端常识</a>
        </li>
        <li>
          <a className="flex gap-4">MVVM框架</a>
        </li>
        <li>
          <a className="flex gap-4">工程化与Webpack</a>
        </li>
        <li>
          <a className="flex gap-4">性能与安全</a>
        </li>
        <li>
          <a className="flex gap-4">数据结构与算法</a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>精品实战课</span>
        </li>
        <li>
          <a className="flex gap-4">Vue源码实战</a>
        </li>
        <li>
          <a className="flex gap-4">Vue组件库实现</a>
        </li>
        <li>
          <a className="flex gap-4">前端工程化实战</a>
        </li>
        <li>
          <a className="flex gap-4">NodeJS实战</a>
        </li>
        <li>
          <a className="flex gap-4">Nest实战</a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a className="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a className="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li className="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a className="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a className="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
      </ul>
    </aside>
  );
}
