import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "olive-deep": "#2D3B1F",
        "olive-mid": "#4A5E2F",
        "olive-light": "#7A9142",
        cream: "#F0EBD8",
        gold: "#C9A84C",
        rouge: "#7A2020",
        blanc: "#F7F3E8",
        charcoal: "#1A1A1A",
        "rose-wine": "#D4748A",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Cormorant Garamond", "serif"],
        mono: ["DM Mono", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
} satisfies Config;
