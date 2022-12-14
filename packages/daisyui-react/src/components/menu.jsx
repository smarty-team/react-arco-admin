export default function Menu() {
  return (
    <aside class="bg-base-200 w-80">
      <div class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
        <a
          href="/"
          aria-current="page"
          aria-label="Homepage"
          class="flex-0 btn btn-ghost px-2"
        >
          <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span class="lowercase">daisy</span>{" "}
            <span class="text-base-content uppercase">UI</span>
          </div>
        </a>{" "}
        <a
          href="/docs/changelog"
          class="link link-hover font-mono text-xs text-opacity-50"
        >
          <div data-tip="Changelog" class="tooltip tooltip-bottom">
            2.43.2
          </div>
        </a>
      </div>
      <div class="h-4"></div>
      <ul className="menu menu-compact flex flex-col p-0 px-4">
        {/* 菜单 */}
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
        <li></li>
        <li class="menu-title">
          <span>导航栏</span>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a class="flex gap-4">Button 按钮</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </aside>
  );
}
