import ToggleButton from './toggle-button'
import UserInfo from './user-info'
import Theme from "./theme";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 border-b dark:border-b-slate-700">
      <ToggleButton></ToggleButton>
      <div className="flex-1">
      </div>
      <Theme></Theme>
      <UserInfo></UserInfo>
    </div>
  );
}
