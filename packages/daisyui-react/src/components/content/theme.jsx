import { createContext, useContext, useState } from "react";
export const ThemeContext = createContext("light");

export default function Theme(props) {
  const { setTheme } = useContext(ThemeContext);
  //   setTimeout(() => {
  //     setTheme("light");
  //   }, 2000);
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-outline btn-success">
        主题
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">light</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-red-500"
              onClick={() => setTheme("light")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">dark</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onClick={() => setTheme("dark")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">cupcake</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onClick={() => setTheme("cupcake")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">bumblebee</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onClick={() => setTheme("bumblebee")}
            />
          </label>
        </div>
      </ul>
    </div>
  );
}
