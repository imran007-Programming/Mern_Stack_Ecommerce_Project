/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': "400px",
      'sm': '414px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'custom-min': { 'min': '360px' },  // Minimum width of 360px
        'custom-max': { 'max': '800px' },  // Maximum width of 800px
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',     // Firefox
          '&::-webkit-scrollbar': {
            display: 'none',  // Chrome, Safari, and Opera
          },
        },
      })
    },
  ],
}
