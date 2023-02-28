export default function ({info, logout}) {
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="/logo.svg" />

          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a onClick={logout}>退出登录</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
