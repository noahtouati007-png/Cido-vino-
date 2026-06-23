import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kaki de luxe: olive profond + or (kept old names as aliases so existing classNames don't break)
        "bg-deep": "#131b12",
        "bg-elevated": "#1c2819",
        "bg-elevated-2": "#243422",
        "olive-deep": "#131b12",
        "olive-mid": "#1c2819",
        "olive-light": "#5c7a45",
        olive: "#3b4f2c",
        "olive-soft": "#5c7a45",
        cream: "#f1ecd8",
        "text-secondary": "#a9b09a",
        gold: "#c6a558",
        "gold-soft": "#e3cb8f",
        rouge: "#6e1f2e",
        wine: "#6e1f2e",
        "wine-soft": "#9c3a4b",
        blanc: "#f1ecd8",
        charcoal: "#131b12",
        "rose-wine": "#d4748a",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        signature: ["Marcellus", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(198, 165, 88, 0.18), 0 8px 30px -8px rgba(198, 165, 88, 0.28)",
        "glow-wine": "0 0 0 1px rgba(110, 31, 46, 0.25), 0 8px 30px -8px rgba(110, 31, 46, 0.4)",
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.45)",
        "soft-lg": "0 12px 48px -8px rgba(0, 0, 0, 0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
