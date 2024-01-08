/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  darkMode: "class",
  mode: "jit",
  content: ["./index.html", "./src/*/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundOpacity: ["active"],
      gridTemplateColumns: {
        "auto-fit": "auto, 1fr",
      },
      gridTemplateRows: {
        "auto-fit": "auto, 1fr",
      },

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
        "bounce-slow-x": {
          "0%, 100%": {
            transform: "translateX(0px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(7px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      backgroundImage: {
        oldBG: "url('/back.jpg')",
        oldBGDark: "url('/backDark.jpg')",
      },
      boxShadow: {
        header: "0 0 8px 3px rgba(0,0,0,0.3)",
        mainContainer: "rgba(149,157,165,0.2) 0px 8px 24px",
        custom: "var(--shadow)",
      },
      spacing: {
        26: "6.56rem",
        "1em": ".5em",
      },
      colors: {
        bg: "hsl(var(--clr-bg) / <alpha-value>)",
        card: "hsl(var(--clr-bg-card) / <alpha-value>)",
        text: {
          1: "hsl(var(--clr-text) / <alpha-value>)",
          2: "hsl(var(--clr-text-2) / <alpha-value>)",
        },
        pri: "hsl(var(--clr-pri) / <alpha-value>)",
        sec: "hsl(var(--clr-sec) / <alpha-value>)",
        acc: "hsl(var(--clr-acc) / <alpha-value>)",
        border: "hsl(var(--clr-border) / <alpha-value>)",
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
        minecraft: "var(--font-minecraft)",
        displayfont: "var(--displayfont)",
        default: "var(--defaultfont)",
      },
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
  // safelist: [
  //   {
  //     pattern:
  //       /(bg|text|border|shadow|hover|min|steps|step|daisy|animate)-(oldBGDark|oldBG|red|orange|yellow|lime|green|teal|sky|blue|violet|fuchsia|black|h|gray|slate|gradient|dashed|dotted|grey|primary|bounce|steps|step|step-primary)/,
  //     variants: ["dark", "hover", "responsive", "first", "last", "group-hover"],
  //   },
  // ],
};
