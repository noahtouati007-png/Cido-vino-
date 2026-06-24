import { tipOfTheDay } from "../data/donVinoQuotes";

export default function DonVinoTip() {
  const tip = tipOfTheDay();

  return (
    <div className="glass rounded-2xl border border-gold/20 shadow-soft p-5 w-full text-left relative overflow-hidden">
      <span className="absolute -top-2 right-3 font-display text-6xl text-gold/10 select-none">
        "
      </span>
      <p className="font-mono text-[10px] uppercase tracking-wide text-gold mb-2">
        Le conseil de Don Vino
      </p>
      <p className="font-display italic text-cream text-lg leading-snug relative z-10">
        {tip.quote}
      </p>
      <p className="font-body text-cream/70 text-sm mt-3 leading-relaxed">{tip.advice}</p>
    </div>
  );
}
