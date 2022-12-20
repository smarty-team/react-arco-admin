import ToggleButton from './toggle-button'
import UserInfo from './user-info'

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <ToggleButton></ToggleButton>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">前端大班车</a>
      </div>
      <UserInfo></UserInfo>
    </div>
  );
}
