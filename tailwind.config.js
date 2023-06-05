/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        header: '0 0 8px 3px rgba(0,0,0,0.3)',
      },
      colors: {
        bkg: {
          0: "hsl(var(--clr-bkg-0) / <alpha-value>)",
          100: "hsl(var(--clr-bkg-100) / <alpha-value>)",
          200: "hsl(var(--clr-bkg-200) / <alpha-value>)", 
          300: "hsl(var(--clr-bkg-300) / <alpha-value>)", 
          400: "hsl(var(--clr-bkg-400) / <alpha-value>)", 
          500: "hsl(var(--clr-bkg-500) / <alpha-value>)", 
          600: "hsl(var(--clr-bkg-600) / <alpha-value>)", 
        },
        hover : {
          1:"#07070727",
          2: "#fefefe1a",
        },

      },
      fontFamily: {
        Tilt: ['Tilt Warp', 'cursive'],
      },
    },
  },

  plugins: [],
}