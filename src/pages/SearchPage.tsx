import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { searchWinesByName, type WineSearchResult } from "../services/openFoodFacts";
import { tap } from "../lib/feedback";

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WineSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    tap();
    setLoading(true);
    setSearched(true);
    try {
      const r = await searchWinesByName(query.trim());
      setResults(r);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col relative overflow-hidden">
      <div className="ambient-glow" />
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-2xl mx-auto w-full flex flex-col gap-6 reveal relative z-10">
        <h1 className="font-display text-3xl text-cream text-center">Chercher un vin</h1>
        <p className="font-body italic text-cream/70 text-center -mt-3">
          Pas de code-barres ? Tape son nom.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Château Margaux, Chianti, Barolo..."
            className="flex-1 text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="bg-gold text-bg-deep font-mono text-sm px-5 rounded-xl uppercase tracking-wide shadow-glow transition-transform duration-300 hover:scale-[1.03]"
          >
            🔍
          </button>
        </form>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <span
              className="w-8 h-8 rounded-full border-2 border-t-gold border-r-gold/40 border-b-transparent border-l-transparent animate-spin"
              style={{ animationDuration: "1s" }}
            />
            <p className="font-mono text-[11px] uppercase tracking-wide text-text-secondary">
              Don Vino fouille les caves...
            </p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <p className="font-body italic text-cream/60 text-center py-8">
            Rien trouvé. Essaie un autre nom, ou scanne directement la bouteille.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {results.map((r) => (
            <button
              key={r.barcode}
              onClick={() => navigate(`/wine/${r.barcode}`)}
              className="glass rounded-2xl border border-white/10 shadow-soft p-3 flex items-center gap-4 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-soft-lg"
            >
              {r.image_url ? (
                <img src={r.image_url} alt="" className="w-12 h-12 object-contain rounded-lg shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-bg-elevated-2 flex items-center justify-center text-xl shrink-0">
                  🍷
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-display text-base text-cream truncate">{r.product_name}</p>
                {r.brands && (
                  <p className="font-mono text-[10px] uppercase tracking-wide text-text-secondary truncate">
                    {r.brands}
                  </p>
                )}
              </div>
              <span className="text-gold font-mono text-sm shrink-0">→</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
