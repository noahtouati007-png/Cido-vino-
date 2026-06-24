import { useState } from "react";
import { tap } from "../lib/feedback";

const KEY = "cibo-vino-onboarded";

const STEPS = [
  {
    emoji: "🍷",
    title: "Benvenuto dans la famiglia",
    text: "Cibo Vino, c'est ton consigliere du vin. Scanne, écoute, savoure.",
  },
  {
    emoji: "📷",
    title: "Scanne n'importe quelle bouteille",
    text: "Pointe le code-barres. Don Vino te raconte tout : cépage, arômes, secrets.",
  },
  {
    emoji: "🍽️",
    title: "Trouve l'accord parfait",
    text: "Dis-nous ton plat, on te trouve le vin. Un mariage, pas un arrangement.",
  },
  {
    emoji: "❤️",
    title: "Compose ta cave",
    text: "Garde tes coups de cœur, note-les, compare-les. Tout reste entre nous.",
  },
];

export default function Onboarding() {
  const [visible, setVisible] = useState(() => localStorage.getItem(KEY) !== "1");
  const [step, setStep] = useState(0);

  if (!visible) return null;

  const finish = () => {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  };

  const next = () => {
    tap();
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else finish();
  };

  const s = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 overflow-hidden bg-bg-deep animate-fade-in">
      <div className="ambient-glow" />
      <button
        onClick={finish}
        className="absolute top-6 right-6 z-10 font-mono text-[11px] uppercase tracking-wide text-text-secondary hover:text-cream"
      >
        Passer
      </button>

      <div key={step} className="relative z-10 flex flex-col items-center text-center gap-5 max-w-sm reveal">
        <span className="text-7xl" style={{ filter: "drop-shadow(0 0 16px rgba(198,165,88,0.35))" }}>
          {s.emoji}
        </span>
        <h2 className="font-display text-3xl text-cream">{s.title}</h2>
        <p className="font-body text-cream/75 leading-relaxed">{s.text}</p>
      </div>

      <div className="relative z-10 mt-10 flex gap-2">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? "w-6 bg-gold" : "w-1.5 bg-cream/20"
            }`}
          />
        ))}
      </div>

      <button
        onClick={next}
        className="relative z-10 mt-8 bg-gold text-bg-deep font-display text-lg px-10 py-3 rounded-2xl shadow-glow transition-transform duration-300 hover:scale-[1.03]"
      >
        {step < STEPS.length - 1 ? "Continuer" : "C'est parti"}
      </button>
    </div>
  );
}
