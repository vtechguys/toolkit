import type { Config } from "tailwindcss";
const { withTV } = require("tailwind-variants/transformer");

/** @type {import('tailwindcss').Config} */
const config: Config = withTV({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
export default config;
