/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'codif': "url('/img/codif.jpeg')",
      },
      fontFamily: {
        'roboto': ['"Roboto Serif"', "serif"]
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden","wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",],
  },
}
