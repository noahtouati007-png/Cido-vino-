import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useWineHistory } from "../hooks/useWineHistory";

export default function Home() {
  const { history } = useWineHistory();
  const last = history[0];

  return (
    <div className="min-h-screen bg-olive-deep flex flex-col">
      <Header transparent />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-12 gap-10 max-w-xl mx-auto text-center">
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
            className="bg-gold text-charcoal flex items-center justify-center gap-3 font-display text-xl"
            style={{ minHeight: 80 }}
          >
            🍷 Scanner un vin
          </Link>
          <Link
            to="/dish"
            className="bg-olive-mid border border-gold text-cream flex items-center justify-center gap-3 font-display text-xl"
            style={{ minHeight: 80 }}
          >
            🍽️ Accorder un plat
          </Link>
        </div>

        {last && (
          <div className="linen-texture bg-olive-mid border border-olive-light/40 p-4 w-full flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-mono text-[10px] uppercase tracking-wide text-cream/50">
                Dernier vin scanné
              </p>
              <p className="font-display text-lg text-cream">{last.wine_name}</p>
            </div>
            <Link
              to={`/wine/${last.barcode}`}
              className="font-mono text-xs uppercase tracking-wide text-gold underline whitespace-nowrap"
            >
              Revoir la fiche
            </Link>
          </div>
        )}
      </main>
      <footer className="text-center pb-6 font-mono text-[10px] uppercase tracking-wide text-cream/40">
        Cibo Vino © 2025 — Omertà gustative garantie
      </footer>
    </div>
  );
}
