import type { WineData } from "../types/wine";
import OliveBranchDivider from "./OliveBranchDivider";
import RatingBranches from "./RatingBranches";
import PairingCard from "./PairingCard";

const TYPE_COLORS: Record<string, string> = {
  rouge: "#7A2020",
  blanc: "#C9A84C",
  rosé: "#D4748A",
  pétillant: "#7A9142",
  fortifié: "#4A5E2F",
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
    <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="mx-auto">
      <rect x="48" y="0" width="24" height="30" fill="#4A5E2F" />
      <path d="M40 30 L80 30 L88 70 L88 190 Q88 200 78 200 L42 200 Q32 200 32 190 L32 70 Z" fill="#2D3B1F" stroke="#7A9142" strokeWidth="2" />
      <rect x="38" y="90" width="44" height="56" fill="#7A9142" opacity="0.25" />
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
  const typeColor = TYPE_COLORS[wine.type] ?? "#7A9142";

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto px-4 pb-16">
      <div className="flex justify-center pt-8">
        {imageUrl ? (
          <img src={imageUrl} alt={wine.wine_name} className="h-52 object-contain" />
        ) : (
          <DefaultBottleSVG />
        )}
      </div>

      <div className="text-center">
        <h1 className="font-display text-4xl text-cream">{wine.wine_name}</h1>
        <span
          className="inline-block mt-2 font-mono text-xs uppercase tracking-wide px-3 py-1"
          style={{ backgroundColor: typeColor, color: "#F0EBD8" }}
        >
          {wine.type}
        </span>
        <p className="font-mono text-xs uppercase tracking-wide text-cream/60 mt-2">
          {wine.region} · {wine.vintage}
        </p>
        <div className="flex justify-center mt-3">
          <RatingBranches rating={wine.rating} />
        </div>
      </div>

      <blockquote className="linen-texture bg-olive-mid p-6 relative">
        <span className="absolute top-2 left-3 font-display text-5xl text-gold opacity-50">“</span>
        <p className="font-display italic text-cream text-lg relative z-10 pt-2">
          {wine.mafia_description}
        </p>
        <p className="font-mono text-xs uppercase tracking-wide text-gold text-right mt-4">
          {wine.mafia_signature}
        </p>
      </blockquote>

      <div className="grid grid-cols-1 gap-2">
        {([
          ["Couleur", wine.tasting_notes.color],
          ["Nez", wine.tasting_notes.nose],
          ["Palais", wine.tasting_notes.palate],
          ["Finale", wine.tasting_notes.finish],
        ] as const).map(([label, value]) => (
          <div key={label} className="flex gap-3 border-b border-olive-light/20 py-2">
            <span className="font-mono text-xs uppercase tracking-wide text-gold w-20 shrink-0">
              {label}
            </span>
            <span className="font-body text-cream/85">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <span className="font-mono text-[11px] px-3 py-1 bg-olive-light text-charcoal">
          {wine.serve_temperature}
        </span>
        <span className="font-mono text-[11px] px-3 py-1 bg-rouge text-cream">
          {wine.alcohol}
        </span>
      </div>

      <OliveBranchDivider />

      <p className="font-body italic text-center text-cream/80">{wine.pairing_teaser}</p>

      {!showPairings && (
        <button
          onClick={onRevealPairings}
          disabled={pairingsLoading}
          className="bg-gold text-charcoal font-mono uppercase tracking-wide text-sm py-4 w-full"
        >
          {pairingsLoading ? "Don Vino réfléchit..." : "Découvrir les accords mets 🍽️"}
        </button>
      )}

      {showPairings && wine.pairings && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wine.pairings.map((p) => (
            <PairingCard key={p.dish_name} pairing={p} />
          ))}
        </div>
      )}

      {onShare && (
        <button
          onClick={onShare}
          className="font-mono text-xs uppercase tracking-wide text-cream/60 underline self-center"
        >
          Partager cette fiche
        </button>
      )}
    </div>
  );
}
