/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        header: "0 0 8px 3px rgba(0,0,0,0.3)",
        mainContainer: "rgba(149,157,165,0.2) 0px 8px 24px",
      },
      spacing: {
        26: "6.56rem",
        "1em": ".5em",
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
        hover: {
          1: "#07070727",
          2: "#fefefe1a",
        },

        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        teal: colors.teal,
        sky: colors.sky,
        blue: colors.blue,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
      },
      fontFamily: {
        Tilt: ["Tilt Warp", "cursive"],
      },
    },
  },

  plugins: [require("@tailwindcss/container-queries")],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(red|orange|yellow|lime|green|teal|sky|blue|violet|fuchsia|black)/,
    },
  ],
};
