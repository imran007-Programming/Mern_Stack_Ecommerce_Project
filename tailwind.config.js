// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths if needed
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#D3D3D3',
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
