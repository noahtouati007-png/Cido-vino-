import { useEffect, useState } from "react";

const QUOTES = [
  "Don Vino consulte ses archives...",
  "Les grandes vérités prennent du temps...",
  "Le vin se dévoile à ceux qui savent attendre...",
  "Patience, ami. La précipitation est l'ennemi du bon vin.",
];

export default function LoadingMafia() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-bg-deep px-8 overflow-hidden animate-fade-in">
      <div className="ambient-glow" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <span
            className="absolute inset-0 rounded-full border-2 border-t-gold border-r-gold/40 border-b-transparent border-l-transparent animate-spin"
            style={{ animationDuration: "1.1s" }}
          />
          <span className="text-3xl" style={{ filter: "drop-shadow(0 0 10px rgba(198,165,88,0.5))" }}>
            🍷
          </span>
        </div>

        <p
          key={index}
          className="font-display italic text-xl text-center text-cream max-w-sm leading-relaxed animate-slide-up"
        >
          {QUOTES[index]}
        </p>

        <div className="flex gap-2">
          {QUOTES.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-gold scale-125" : "bg-cream/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
