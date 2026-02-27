import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    "./compiler/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#EAF2FF",
          100: "#C8DEFF",
          400: "#4C9AFF",
          600: "#0052CC",
          700: "#0043A8",
        },
      },
      keyframes: {
        "drop-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":       { transform: "scale(1.04)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "drop-pulse": "drop-pulse 0.8s ease-in-out infinite",
        "fade-in":    "fade-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
