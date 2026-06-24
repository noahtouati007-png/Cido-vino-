import { Link, useLocation } from "react-router-dom";
import { tap } from "../lib/feedback";

const ITEMS = [
  { to: "/", label: "Accueil", icon: "🏠" },
  { to: "/search", label: "Chercher", icon: "🔍" },
  { to: "/scan", label: "Scanner", icon: "📷" },
  { to: "/cave", label: "Ma cave", icon: "🍷" },
  { to: "/history", label: "Historique", icon: "🕑" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto flex items-stretch justify-around">
        {ITEMS.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={tap}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 flex-1 transition-colors duration-300 ${
                active ? "text-gold" : "text-cream/50 hover:text-cream"
              }`}
            >
              <span
                className="text-xl leading-none transition-transform duration-300"
                style={{ transform: active ? "scale(1.15)" : "scale(1)" }}
              >
                {item.icon}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
