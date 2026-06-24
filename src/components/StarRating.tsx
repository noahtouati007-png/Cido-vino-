import { tap } from "../lib/feedback";

interface Props {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

// Notation perso cliquable (grappes/étoiles).
export default function StarRating({ value, onChange, max = 5 }: Props) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Votre note">
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            aria-label={`${n} sur ${max}`}
            onClick={() => {
              tap();
              onChange(n === value ? 0 : n);
            }}
            className="text-2xl leading-none transition-transform duration-200 hover:scale-125"
            style={{ filter: active ? "drop-shadow(0 0 6px rgba(198,165,88,0.5))" : "none" }}
          >
            <span className={active ? "opacity-100" : "opacity-25 grayscale"}>🍇</span>
          </button>
        );
      })}
    </div>
  );
}
