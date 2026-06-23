import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useWineHistory } from "../hooks/useWineHistory";

export default function Home() {
  const { history } = useWineHistory();
  const last = history[0];

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <Header transparent />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-12 gap-12 max-w-xl mx-auto text-center animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-cream">
            Il vino non mente.
            <br />
            Gli uomini sì.
          </h1>
          <p className="font-body italic text-cream/70 text-lg mt-4">
            Scannez. Savourez. Accordez.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Link
            to="/scan"
            className="bg-gold text-bg-deep flex items-center justify-center gap-3 font-display text-xl rounded-2xl shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg"
            style={{ minHeight: 80 }}
          >
            🍷 Scanner un vin
          </Link>
          <Link
            to="/dish"
            className="glass border border-gold/40 text-cream flex items-center justify-center gap-3 font-display text-xl rounded-2xl shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg"
            style={{ minHeight: 80 }}
          >
            🍽️ Accorder un plat
          </Link>
        </div>

        {last && (
          <div className="glass rounded-2xl border border-white/10 shadow-soft p-5 w-full flex items-center justify-between gap-4 animate-slide-up">
            <div className="text-left">
              <p className="font-mono text-[10px] uppercase tracking-wide text-text-secondary">
                Dernier vin scanné
              </p>
              <p className="font-display text-lg text-cream">{last.wine_name}</p>
            </div>
            <Link
              to={`/wine/${last.barcode}`}
              className="font-mono text-xs uppercase tracking-wide text-gold underline whitespace-nowrap transition-colors duration-300 hover:text-gold-soft"
            >
              Revoir la fiche
            </Link>
          </div>
        )}
      </main>
      <footer className="text-center pb-6 font-mono text-[10px] uppercase tracking-wide text-text-secondary">
        Cibo Vino © 2025 — Omertà gustative garantie
      </footer>
    </div>
  );
}
