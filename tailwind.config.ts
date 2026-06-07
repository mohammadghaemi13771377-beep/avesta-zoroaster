import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#05080D",
        royal: "#071521",
        gold: {
          DEFAULT: "#D6A84F",
          100: "#FFF0BE",
          200: "#F2D58A",
          300: "#E7BF66",
          400: "#D6A84F",
          600: "#9A641E"
        },
        "gold-light": "#F2D58A",
        parchment: "#F5EFE2",
        warm: {
          DEFAULT: "#FFF8EA",
          50: "#FFF8EA",
          100: "#F5EFE2"
        },
        obsidian: {
          950: "#05080D"
        },
        muted: "#B9B9B9"
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        display: ["var(--font-cinzel)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        gold: "0 0 34px rgba(214, 168, 79, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
