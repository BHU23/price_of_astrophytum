import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   'custom-light': '#f0f4f8',
      //   'custom-dark': '#0e1111',
      //   'primary-light': '#CBF9D5',
      //   'primary-meduim': '#37A47F',
      //   'primary-dark': '#1C2A1B',
      // },
      colors: {
        background: "rgba(var(--background))",
        // border: "rgba(var(--border))",
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

      keyframes: {
        typing: {
          "0%": { width: "0%" },
          "50%": { width: "422px" },
          "80%": { width: "422px" }, // Pause at the end of the sentence
          "100%": { width: "0%" }, // Erase the text
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        typing: "typing 5s steps(40, end) infinite, blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
