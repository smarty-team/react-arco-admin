import { createContext, useContext, useEffect, useState } from "react";
export const ThemeContext = createContext("light");

const themeList = [
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
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "sutumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

function List() {
  const { setTheme, theme: currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("currentTheme:", currentTheme);
  });

  const clickTheme = (theme) => () => setTheme(theme);
  return themeList.map((theme) => (
    <div
      className={
        "outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" +
        (currentTheme === theme ? " outline" : "")
      }
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
}

export default function Theme(props) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn gap-1 normal-case btn-ghost">
        <i className="icon-[mdi--theme]" i />
        主题
        <i className="icon-[ic--outline-keyboard-arrow-down]" i />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"
      >
        <div className="grid grid-cols-1 gap-3 p-3">
          <List></List>
        </div>
      </div>
    </div>
  );
}
