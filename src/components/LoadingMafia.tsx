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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-olive-deep px-8">
      <svg width="120" height="40" viewBox="0 0 180 28" fill="none" className="vine-draw">
        <path d="M5 14 H175" stroke="#7A9142" strokeWidth="1" strokeLinecap="round" />
        <path d="M70 14 Q75 4 85 7 Q80 14 70 14Z" fill="#C9A84C" />
        <path d="M95 14 Q100 24 110 21 Q105 14 95 14Z" fill="#C9A84C" />
        <circle cx="90" cy="14" r="3" fill="#C9A84C" />
      </svg>
      <p className="font-display italic text-xl text-center text-cream max-w-sm">
        {QUOTES[index]}
      </p>
    </div>
  );
}
