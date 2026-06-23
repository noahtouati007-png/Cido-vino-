import { useState } from "react";
import type { WinePairing } from "../types/wine";

const STRENGTH_COLORS: Record<WinePairing["pairing_strength"], string> = {
  parfait: "#C9A84C",
  excellent: "#7A9142",
  bien: "#4A5E2F",
  correct: "#7A2020",
};

export default function PairingCard({ pairing }: { pairing: WinePairing }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded((e) => !e)}
      className="linen-texture bg-olive-mid border border-olive-light/40 p-4 flex flex-col items-center text-center gap-2 text-left"
    >
      <span style={{ fontSize: 64, lineHeight: 1 }}>{pairing.dish_emoji}</span>
      <h3 className="font-display text-lg text-cream">{pairing.dish_name}</h3>
      <span
        className="font-mono text-[10px] uppercase tracking-wide px-2 py-1"
        style={{ backgroundColor: STRENGTH_COLORS[pairing.pairing_strength], color: "#1A1A1A" }}
      >
        {pairing.pairing_strength}
      </span>
      <p
        className={`font-body text-sm text-cream/80 italic ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {pairing.pairing_reason}
      </p>
    </button>
  );
}
