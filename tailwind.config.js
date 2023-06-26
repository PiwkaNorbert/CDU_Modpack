/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/*/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundOpacity: ["active"],

      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      animation: {
        "bounce-slow": "bounce-slow 2s linear infinite",
        "pulse-slow": "pulse-slow 10s linear infinite",
        breathing: "breathing 5s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(7px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        breathing: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        heart: "url('/heart.svg')",
        heartBreak: "url('/heartbreak.svg')",
        comment: "url('/chat-circle-fill.svg')",
      },
      boxShadow: {
        header: "0 0 8px 3px rgba(0,0,0,0.3)",
        mainContainer: "rgba(149,157,165,0.2) 0px 8px 24px",
      },
      spacing: {
        26: "6.56rem",
        "1em": ".5em",
      },
      colors: {
        bg: "hsl(var(--clr-bg) / <alpha-value>)",
        text: "hsl(var(--clr-text) / <alpha-value>)",
        acc: "hsl(var(--clr-acc) / <alpha-value>)",
        pri: "hsl(var(--clr-pri) / <alpha-value>)",
        sec: "hsl(var(--clr-sec) / <alpha-value>)",

        borderColor: {
          0: "hsl(var(--clr-border-0) / <alpha-value>)",
        },
        hover: {
          1: "#07070727",
          2: "#fefefe1a",
          3: "#00000010",
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
        /(bg|text|border|shadow|hover)-(red|orange|yellow|lime|green|teal|sky|blue|violet|fuchsia|black)/,
    },
  ],
};
