import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark elegant base (kept old names as aliases so existing classNames don't break)
        "bg-deep": "#0a0a0c",
        "bg-elevated": "#14141a",
        "bg-elevated-2": "#1c1c24",
        "olive-deep": "#0a0a0c",
        "olive-mid": "#16161d",
        "olive-light": "#2c2c38",
        cream: "#f5f5f0",
        "text-secondary": "#a3a3ad",
        gold: "#d4af6a",
        "gold-soft": "#e6c98f",
        rouge: "#9b1c3f",
        wine: "#9b1c3f",
        "wine-soft": "#c2486a",
        blanc: "#f5f5f0",
        charcoal: "#0a0a0c",
        "rose-wine": "#d4748a",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 175, 106, 0.15), 0 8px 30px -8px rgba(212, 175, 106, 0.25)",
        "glow-wine": "0 0 0 1px rgba(155, 28, 63, 0.2), 0 8px 30px -8px rgba(155, 28, 63, 0.35)",
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.5)",
        "soft-lg": "0 12px 48px -8px rgba(0, 0, 0, 0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
