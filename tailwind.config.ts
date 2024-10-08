import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        card: "var(--card)",
        border: "var(--border)",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "var(--cta)",
        "cta-active": "var(--cta-active)",
        "cta-gray": "var(--cta-gray)",
        "cta-text": "var(--cta-text)",
        pear: "var(--pear)",
        tan: "var(--tan)",
        btn: "var(--btn)",
        ring_gray: "var(--ring-gray)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "200%": "200%",
      },
      keyframes: {
        typing: {
          "0%": { width: "0%" },
          "50%": { width: "422px" },
          "80%": { width: "422px" },
          "100%": { width: "0%" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        typing: "typing 5s steps(40, end) infinite, blink 1s step-end infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
});

export default config;
