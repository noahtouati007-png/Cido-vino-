import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useWineHistory } from "../hooks/useWineHistory";

const TYPE_COLORS: Record<string, string> = {
  rouge: "#9b1c3f",
  blanc: "#d4af6a",
  rosé: "#d4748a",
  pétillant: "#5b8a72",
  fortifié: "#7a5a2c",
};

export default function HistoryPage() {
  const { history, removeEntry, clearHistory } = useWineHistory();

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-2xl mx-auto w-full flex flex-col gap-4 animate-fade-in">
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
            className="glass rounded-2xl border border-white/10 shadow-soft p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-soft-lg"
          >
            {entry.image_url ? (
              <img src={entry.image_url} alt={entry.wine_name} className="w-14 h-14 object-contain rounded-lg" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-bg-elevated-2" />
            )}
            <div className="flex-1">
              <Link to={`/wine/${entry.barcode}`} className="font-display text-lg text-cream block transition-colors duration-300 hover:text-gold">
                {entry.wine_name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: TYPE_COLORS[entry.type] ?? "#5b8a72", color: "#f5f5f0" }}
                >
                  {entry.type}
                </span>
                <span className="font-mono text-[10px] text-text-secondary">
                  {new Date(entry.scanned_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeEntry(entry.barcode)}
              className="font-mono text-xs text-wine-soft underline transition-colors duration-300 hover:text-wine"
            >
              Suppr.
            </button>
          </div>
        ))}

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-wine text-cream font-mono text-xs uppercase tracking-wide py-3 mt-6 rounded-xl shadow-glow-wine transition-all duration-300 hover:scale-[1.02]"
          >
            Effacer l'historique
          </button>
        )}
      </main>
    </div>
  );
}
