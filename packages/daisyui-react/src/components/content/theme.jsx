import { createContext, useContext, useState } from "react";
export const ThemeContext = createContext("light");

export default function Theme(props) {
  const { setTheme } = useContext(ThemeContext);
  // setTimeout(() => {
  //   setTheme("light");
  // }, 2000);
  const ary = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
  ];

  const clickTheme = (theme) => (e) => setTheme(theme);

  const list = ary.map((theme) => (
    <div
      class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline"
      data-set-theme="light"
      data-act-class="outline"
      onClick={clickTheme(theme)}
    >
      <div class="">
        <div
          data-theme={theme}
          class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div class="grid grid-cols-5 grid-rows-3">
            <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
              <div class="flex-grow text-sm font-bold">{theme}</div>{" "}
              <div class="flex flex-shrink-0 flex-wrap gap-1">
                <div class="bg-primary w-2 rounded"></div>{" "}
                <div class="bg-secondary w-2 rounded"></div>{" "}
                <div class="bg-accent w-2 rounded"></div>{" "}
                <div class="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn gap-1 normal-case btn-ghost">
        <i className="icon-[mdi--theme]" i />
        主题
        <i className="icon-[ic--outline-keyboard-arrow-down]" i />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div className="grid grid-cols-1 gap-3 p-3">
          {list}

          {/* <div className="form-control">
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
          </label> */}
        </div>
      </ul>
    </div>
  );
}
