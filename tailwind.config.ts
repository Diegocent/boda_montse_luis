import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F2F8",
        lilac: "#8B6BA0",
        lilacDark: "#6E4E85",
        lilacSoft: "#B794D0",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
