/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 2s linear infinite',
        "pulse-slow": "pulse-slow 10s linear infinite",
        breathing: "breathing 5s ease-in-out infinite",
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0px)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(7px)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'heart': "url('public/heart.svg')",
        'heartBreak': "url('public/heartbreak.svg')",
        'comment': "url('public/chat-circle-fill.svg')",
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
        bkg: {
          0: "hsl(var(--clr-bkg-0) / <alpha-value>)",
          50: "hsl(var(--clr-bkg-50) / <alpha-value>)",
          100: "hsl(var(--clr-bkg-100) / <alpha-value>)",
          200: "hsl(var(--clr-bkg-200) / <alpha-value>)",
          300: "hsl(var(--clr-bkg-300) / <alpha-value>)",
          400: "hsl(var(--clr-bkg-400) / <alpha-value>)",
          500: "hsl(var(--clr-bkg-500) / <alpha-value>)",
          600: "hsl(var(--clr-bkg-600) / <alpha-value>)",
        },
        borderColor:{
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
        /(bg|text|border)-(red|orange|yellow|lime|green|teal|sky|blue|violet|fuchsia|black)/,
    },
  ],
};
