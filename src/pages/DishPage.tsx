import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import type { Budget, DishFilters, Occasion, PreferredType } from "../types/wine";

const BUDGETS: Budget[] = ["Abordable", "Milieu de gamme", "Premium", "Sans limite"];
const TYPES: PreferredType[] = ["Rouge", "Blanc", "Rosé", "Pétillant", "Fortifié", "Pas de préférence"];
const OCCASIONS: Occasion[] = ["Quotidien", "Dîner romantique", "Repas d'affaires", "Grande fête"];

function Chip<T extends string>({
  label,
  active,
  onClick,
}: {
  label: T;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-xs uppercase tracking-wide px-3 py-2 border ${
        active ? "bg-gold text-charcoal border-gold" : "border-olive-light text-cream/70"
      }`}
    >
      {label}
    </button>
  );
}

export default function DishPage() {
  const navigate = useNavigate();
  const [dish, setDish] = useState("");
  const [budget, setBudget] = useState<Budget | undefined>();
  const [preferredType, setPreferredType] = useState<PreferredType | undefined>();
  const [occasion, setOccasion] = useState<Occasion | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dish.trim()) return;
    const filters: DishFilters = { budget, preferredType, occasion };
    navigate("/dish/results", { state: { dish: dish.trim(), filters } });
  };

  return (
    <div className="min-h-screen bg-olive-deep flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-xl mx-auto w-full flex flex-col gap-8">
        <h1 className="font-display text-3xl text-cream text-center">
          Quel plat voulez-vous sublimer ?
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            placeholder="Ex: Osso buco, saumon gravlax, tarte Tatin..."
            className="text-xl w-full"
          />

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-cream/50 mb-2">Budget</p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(budget === b ? undefined : b)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-cream/50 mb-2">
              Type préféré
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  active={preferredType === t}
                  onClick={() => setPreferredType(preferredType === t ? undefined : t)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-cream/50 mb-2">
              Occasion
            </p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  active={occasion === o}
                  onClick={() => setOccasion(occasion === o ? undefined : o)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-gold text-charcoal font-display text-lg py-4"
          >
            Trouver mes vins
          </button>
        </form>
      </main>
    </div>
  );
}
