import type { WineData } from "../types/wine";
import OliveBranchDivider from "./OliveBranchDivider";
import RatingBranches from "./RatingBranches";
import PairingCard from "./PairingCard";

const TYPE_COLORS: Record<string, string> = {
  rouge: "#9b1c3f",
  blanc: "#d4af6a",
  rosé: "#d4748a",
  pétillant: "#5b8a72",
  fortifié: "#7a5a2c",
};

interface Props {
  wine: WineData;
  imageUrl?: string;
  onRevealPairings: () => void;
  pairingsLoading?: boolean;
  showPairings: boolean;
  onShare?: () => void;
}

function DefaultBottleSVG() {
  return (
    <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="mx-auto drop-shadow-2xl">
      <rect x="48" y="0" width="24" height="30" fill="#2c2c38" />
      <path d="M40 30 L80 30 L88 70 L88 190 Q88 200 78 200 L42 200 Q32 200 32 190 L32 70 Z" fill="#14141a" stroke="#d4af6a" strokeWidth="1.5" />
      <rect x="38" y="90" width="44" height="56" fill="#d4af6a" opacity="0.15" />
    </svg>
  );
}

export default function WineCard({
  wine,
  imageUrl,
  onRevealPairings,
  pairingsLoading,
  showPairings,
  onShare,
}: Props) {
  const typeColor = TYPE_COLORS[wine.type] ?? "#5b8a72";

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto px-4 pb-16 reveal">
      <div className="flex justify-center pt-8">
        {imageUrl ? (
          <img src={imageUrl} alt={wine.wine_name} className="h-52 object-contain drop-shadow-2xl" />
        ) : (
          <DefaultBottleSVG />
        )}
      </div>

      <div className="text-center">
        <h1 className="font-display text-4xl text-cream">{wine.wine_name}</h1>
        <span
          className="inline-block mt-3 font-mono text-xs uppercase tracking-wide px-3 py-1 rounded-full"
          style={{ backgroundColor: typeColor, color: "#0a0a0c" }}
        >
          {wine.type}
        </span>
        <p className="font-mono text-xs uppercase tracking-wide text-text-secondary mt-3">
          {wine.region} · {wine.vintage}
        </p>
        <div className="flex justify-center mt-4">
          <RatingBranches rating={wine.rating} />
        </div>
      </div>

      <blockquote className="glass rounded-2xl shadow-soft p-6 relative">
        <span className="absolute top-2 left-4 font-display text-5xl text-gold opacity-40">"</span>
        <p className="font-display italic text-cream text-lg relative z-10 pt-2 leading-relaxed">
          {wine.mafia_description}
        </p>
        <p className="font-mono text-xs uppercase tracking-wide text-gold text-right mt-4">
          {wine.mafia_signature}
        </p>
      </blockquote>

      <div className="grid grid-cols-1 gap-2 glass rounded-2xl p-2">
        {([
          ["Couleur", wine.tasting_notes.color],
          ["Nez", wine.tasting_notes.nose],
          ["Palais", wine.tasting_notes.palate],
          ["Finale", wine.tasting_notes.finish],
        ] as const).map(([label, value]) => (
          <div key={label} className="flex gap-3 border-b border-white/5 last:border-b-0 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-wide text-gold w-20 shrink-0">
              {label}
            </span>
            <span className="font-body text-cream/85">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <span className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-bg-elevated-2 border border-white/10 text-cream/80">
          {wine.serve_temperature}
        </span>
        <span className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-wine text-cream">
          {wine.alcohol}
        </span>
      </div>

      <OliveBranchDivider />

      <p className="font-body italic text-center text-cream/80 leading-relaxed">{wine.pairing_teaser}</p>

      {!showPairings && (
        <button
          onClick={onRevealPairings}
          disabled={pairingsLoading}
          className="bg-gold text-bg-deep font-mono uppercase tracking-wide text-sm py-4 w-full rounded-xl shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg disabled:opacity-60 disabled:hover:scale-100"
        >
          {pairingsLoading ? "Don Vino réfléchit..." : "Découvrir les accords mets 🍽️"}
        </button>
      )}

      {showPairings && wine.pairings && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-slide-up">
          {wine.pairings.map((p) => (
            <PairingCard key={p.dish_name} pairing={p} />
          ))}
        </div>
      )}

      {onShare && (
        <button
          onClick={onShare}
          className="font-mono text-xs uppercase tracking-wide text-cream/60 underline self-center transition-colors duration-300 hover:text-gold"
        >
          Partager cette fiche
        </button>
      )}
    </div>
  );
}
