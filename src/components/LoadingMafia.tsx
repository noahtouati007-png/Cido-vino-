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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-bg-deep px-8 animate-fade-in">
      <svg width="120" height="40" viewBox="0 0 180 28" fill="none" className="vine-draw">
        <path d="M5 14 H175" stroke="#2c2c38" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 14 Q75 4 85 7 Q80 14 70 14Z" fill="#d4af6a" />
        <path d="M95 14 Q100 24 110 21 Q105 14 95 14Z" fill="#d4af6a" />
        <circle cx="90" cy="14" r="3" fill="#d4af6a" style={{ filter: "drop-shadow(0 0 6px rgba(212,175,106,0.7))" }} />
      </svg>
      <p className="font-display italic text-xl text-center text-cream max-w-sm leading-relaxed animate-slide-up">
        {QUOTES[index]}
      </p>
    </div>
  );
}
