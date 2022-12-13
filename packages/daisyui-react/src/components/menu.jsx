export default function Menu() {
  return (
    <ul className="menu bg-base-100 w-56">
      {/* 菜单 */}
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a className="active">Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
}
