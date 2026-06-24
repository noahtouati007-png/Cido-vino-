import { useMemo, useState } from "react";
import Header from "../components/Header";
import RatingBranches from "../components/RatingBranches";
import { useFavorites } from "../hooks/useFavorites";
import { useWineHistory } from "../hooks/useWineHistory";
import type { WineData } from "../types/wine";

interface Candidate {
  barcode: string;
  wine_name: string;
  wine_data: WineData;
}

function Picker({
  label,
  candidates,
  selected,
  onSelect,
}: {
  label: string;
  candidates: Candidate[];
  selected: string;
  onSelect: (barcode: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <span className="font-mono text-[10px] uppercase tracking-wide text-text-secondary">{label}</span>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full text-sm"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <option value="">— Choisir —</option>
        {candidates.map((c) => (
          <option key={c.barcode} value={c.barcode}>
            {c.wine_name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-sm text-cream/85 leading-snug">{children}</div>;
}

export default function ComparePage() {
  const { favorites } = useFavorites();
  const { history } = useWineHistory();

  const candidates = useMemo<Candidate[]>(() => {
    const map = new Map<string, Candidate>();
    [...favorites, ...history].forEach((e) => {
      if (!map.has(e.barcode)) {
        map.set(e.barcode, {
          barcode: e.barcode,
          wine_name: e.wine_name,
          wine_data: e.wine_data,
        });
      }
    });
    return Array.from(map.values());
  }, [favorites, history]);

  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");

  const left = candidates.find((c) => c.barcode === leftId)?.wine_data;
  const right = candidates.find((c) => c.barcode === rightId)?.wine_data;

  const rows: Array<[string, (w: WineData) => React.ReactNode]> = [
    ["Type", (w) => w.type],
    ["Région", (w) => w.region],
    ["Millésime", (w) => w.vintage],
    ["Cépages", (w) => w.grape_varieties.join(", ")],
    ["Note", (w) => <RatingBranches rating={w.rating} />],
    ["Alcool", (w) => w.alcohol],
    ["Service", (w) => w.serve_temperature],
    ["Nez", (w) => w.tasting_notes.nose],
    ["Palais", (w) => w.tasting_notes.palate],
  ];

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col relative overflow-hidden">
      <div className="ambient-glow" />
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-2xl mx-auto w-full flex flex-col gap-6 reveal relative z-10">
        <h1 className="font-display text-3xl text-cream text-center">Comparer deux vins</h1>

        {candidates.length < 2 ? (
          <p className="font-body italic text-cream/60 text-center py-8">
            Il te faut au moins deux vins dans ta cave ou ton historique pour comparer.
          </p>
        ) : (
          <>
            <div className="flex gap-3">
              <Picker label="Vin A" candidates={candidates} selected={leftId} onSelect={setLeftId} />
              <Picker label="Vin B" candidates={candidates} selected={rightId} onSelect={setRightId} />
            </div>

            {left && right && (
              <div className="glass rounded-2xl border border-white/10 shadow-soft overflow-hidden">
                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="p-4 text-center border-r border-white/10">
                    <p className="font-display text-base text-cream leading-tight">{left.wine_name}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-display text-base text-cream leading-tight">{right.wine_name}</p>
                  </div>
                </div>
                {rows.map(([label, render]) => (
                  <div key={label} className="border-b border-white/5 last:border-b-0">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-gold text-center pt-3">
                      {label}
                    </p>
                    <div className="grid grid-cols-2">
                      <div className="p-3 border-r border-white/5 text-center">
                        <Cell>{render(left)}</Cell>
                      </div>
                      <div className="p-3 text-center">
                        <Cell>{render(right)}</Cell>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(!left || !right) && (
              <p className="font-mono text-[11px] uppercase tracking-wide text-text-secondary text-center py-6">
                Sélectionne deux vins pour lancer le duel.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
