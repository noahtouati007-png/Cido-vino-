import type { WineRecommendation } from "../types/wine";

export default function RecommendationCard({ rec }: { rec: WineRecommendation }) {
  return (
    <div className="linen-texture bg-olive-mid border border-olive-light/30 p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <span className="font-display text-5xl text-gold leading-none">
          {String(rec.rank).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-2xl text-cream">{rec.wine_type}</h3>
          <p className="font-body italic text-cream/70">{rec.wine_style}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {rec.example_bottles.map((b) => (
          <span
            key={b}
            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1 bg-olive-deep border border-olive-light/40 text-cream/90"
          >
            {b}
          </span>
        ))}
      </div>

      <p className="font-body text-cream/85">{rec.pairing_reason}</p>

      <blockquote className="border-l-2 border-gold pl-4 font-display italic text-cream/90">
        “{rec.mafia_quote}”
      </blockquote>

      <div className="flex gap-3">
        <span className="font-mono text-[11px] px-3 py-1 bg-rouge text-cream">
          {rec.price_range}
        </span>
        <span className="font-mono text-[11px] px-3 py-1 bg-olive-light text-charcoal">
          {rec.serving_temp}
        </span>
      </div>

      {rec.region_suggestions.length > 0 && (
        <p className="font-mono text-[11px] text-cream/50 uppercase tracking-wide">
          Régions: {rec.region_suggestions.join(", ")}
        </p>
      )}
    </div>
  );
}
