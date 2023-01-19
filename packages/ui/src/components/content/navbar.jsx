import Theme from "./theme";
import UserCenter from "./userCenter";
export default function NavBar() {
  return (
    <div className="navbar w-full bg-base-100">
      <div className="flex-none">
        <label
          htmlFor="my-drawer"
          className="btn btn btn-square btn-ghost drawer-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      {/* <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">前端大班车</a>
      </div> */}
      <Theme></Theme>
      <UserCenter></UserCenter>
    </div>
  );
}
