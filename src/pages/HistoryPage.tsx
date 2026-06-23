import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useWineHistory } from "../hooks/useWineHistory";

const TYPE_COLORS: Record<string, string> = {
  rouge: "#7A2020",
  blanc: "#C9A84C",
  rosé: "#D4748A",
  pétillant: "#7A9142",
  fortifié: "#4A5E2F",
};

export default function HistoryPage() {
  const { history, removeEntry, clearHistory } = useWineHistory();

  return (
    <div className="min-h-screen bg-olive-deep flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-2xl mx-auto w-full flex flex-col gap-4">
        <h1 className="font-display text-3xl text-cream text-center mb-4">
          Historique des scans
        </h1>

        {history.length === 0 && (
          <p className="font-body italic text-cream/60 text-center">
            Aucun vin scanné pour l'instant.
          </p>
        )}

        {history.map((entry) => (
          <div
            key={entry.barcode}
            className="linen-texture bg-olive-mid border border-olive-light/30 p-4 flex items-center gap-4"
          >
            {entry.image_url ? (
              <img src={entry.image_url} alt={entry.wine_name} className="w-14 h-14 object-contain" />
            ) : (
              <div className="w-14 h-14 bg-olive-deep" />
            )}
            <div className="flex-1">
              <Link to={`/wine/${entry.barcode}`} className="font-display text-lg text-cream block">
                {entry.wine_name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="font-mono text-[10px] uppercase px-2 py-0.5"
                  style={{ backgroundColor: TYPE_COLORS[entry.type] ?? "#7A9142", color: "#F0EBD8" }}
                >
                  {entry.type}
                </span>
                <span className="font-mono text-[10px] text-cream/40">
                  {new Date(entry.scanned_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeEntry(entry.barcode)}
              className="font-mono text-xs text-rouge underline"
            >
              Suppr.
            </button>
          </div>
        ))}

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-rouge text-cream font-mono text-xs uppercase tracking-wide py-3 mt-6"
          >
            Effacer l'historique
          </button>
        )}
      </main>
    </div>
  );
}
