/** @type {import ('tailwinfd').Config } */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: "media",
  theme: {
    extend: {
      screens: {
        'hr': '2000px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    'flowbite/plugin'
  ],
}

