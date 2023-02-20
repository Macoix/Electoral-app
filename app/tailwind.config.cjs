/** @type {import('tailwindcss').Config} */
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const safeListFile = 'safelist.txt'
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './safelist.txt',
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-safelist-generator')({
      path: safeListFile,
      patterns: [
        'text-{colors}',
        'bg-{colors}',
        'dark:bg-{colors}',
        'dark:hover:bg-{colors}',
        'dark:active:bg-{colors}',
        'hover:text-{colors}',
        'hover:bg-{colors}',
        'active:bg-{colors}',
        'ring-{colors}',
        'hover:ring-{colors}',
        'focus:ring-{colors}',
        'focus-within:ring-{colors}',
        'border-{colors}',
        'focus:border-{colors}',
        'focus-within:border-{colors}',
        'dark:text-{colors}',
        'dark:hover:text-{colors}',
        'h-{height}',
        'w-{width}',
      ],
    }),
    require('@tailwindcss/typography')
  ],
}
