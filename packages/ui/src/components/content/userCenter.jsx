import { useNavigate } from "react-router-dom";

export default function UserCenter() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex-row-reverse">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              个人中心
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/register")}>注册</a>
          </li>
          <li>
            <a onClick={() => navigate("/login")}>登录</a>
          </li>
          <li>
            <a onClick={() => navigate("/register")}>退出登录</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
