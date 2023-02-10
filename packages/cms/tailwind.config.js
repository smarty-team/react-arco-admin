module.exports = {
  darkMode: ['class', '[data-theme="dark"]', '[data-theme="synthwave"]'],
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
