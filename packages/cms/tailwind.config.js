const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  darkMode: ["class", '[data-theme="dark"]', '[data-theme="synthwave"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    addDynamicIconSelectors(),
  ],
};
