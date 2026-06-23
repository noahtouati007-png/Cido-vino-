import { useState } from "react";
import type { WinePairing } from "../types/wine";

const STRENGTH_COLORS: Record<WinePairing["pairing_strength"], string> = {
  parfait: "#d4af6a",
  excellent: "#5b8a72",
  bien: "#7a5a2c",
  correct: "#9b1c3f",
};

export default function PairingCard({ pairing }: { pairing: WinePairing }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded((e) => !e)}
      className="glass rounded-2xl border border-white/10 shadow-soft p-4 flex flex-col items-center text-center gap-2 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg"
    >
      <span style={{ fontSize: 64, lineHeight: 1 }}>{pairing.dish_emoji}</span>
      <h3 className="font-display text-lg text-cream">{pairing.dish_name}</h3>
      <span
        className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-full"
        style={{ backgroundColor: STRENGTH_COLORS[pairing.pairing_strength], color: "#0a0a0c" }}
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
