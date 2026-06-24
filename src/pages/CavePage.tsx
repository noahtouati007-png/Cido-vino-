import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import StarRating from "../components/StarRating";
import { useFavorites } from "../hooks/useFavorites";

const TYPE_COLORS: Record<string, string> = {
  rouge: "#9b1c3f",
  blanc: "#d4af6a",
  rosé: "#d4748a",
  pétillant: "#5b8a72",
  fortifié: "#7a5a2c",
};

export default function CavePage() {
  const { favorites, removeFavorite, updateFavorite } = useFavorites();
  const [editing, setEditing] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");

  const startEdit = (barcode: string, note?: string) => {
    setEditing(barcode);
    setDraftNote(note ?? "");
  };

  const saveNote = (barcode: string) => {
    updateFavorite(barcode, { user_note: draftNote.trim() });
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col relative overflow-hidden">
      <div className="ambient-glow" />
      <Header />
      <main className="flex-1 px-6 pt-24 pb-12 max-w-2xl mx-auto w-full flex flex-col gap-4 reveal relative z-10">
        <h1 className="font-display text-3xl text-cream text-center mb-1">Ma Cave</h1>
        <p className="font-mono text-[11px] uppercase tracking-wide text-text-secondary text-center mb-4">
          {favorites.length} vin{favorites.length > 1 ? "s" : ""} dans ta collection
        </p>

        {favorites.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center flex flex-col gap-3">
            <span className="text-5xl">🍷</span>
            <p className="font-body italic text-cream/70">
              Ta cave est vide. Ajoute tes coups de cœur depuis une fiche vin.
            </p>
            <Link
              to="/scan"
              className="font-mono text-xs uppercase tracking-wide text-gold underline self-center"
            >
              Scanner un vin →
            </Link>
          </div>
        )}

        {favorites.map((fav) => (
          <div
            key={fav.barcode}
            className="glass rounded-2xl border border-white/10 shadow-soft p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-soft-lg"
          >
            <div className="flex items-center gap-4">
              {fav.image_url ? (
                <img src={fav.image_url} alt="" className="w-14 h-14 object-contain rounded-lg" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-bg-elevated-2 flex items-center justify-center text-2xl">
                  🍷
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/wine/${fav.barcode}`}
                  className="font-display text-lg text-cream block truncate transition-colors duration-300 hover:text-gold"
                >
                  {fav.wine_name}
                </Link>
                <span
                  className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full inline-block mt-1"
                  style={{ backgroundColor: TYPE_COLORS[fav.type] ?? "#5b8a72", color: "#0a0a0c" }}
                >
                  {fav.type}
                </span>
              </div>
              <button
                onClick={() => removeFavorite(fav.barcode)}
                aria-label="Retirer"
                className="text-wine-soft hover:text-wine text-xl shrink-0"
              >
                ♥
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-text-secondary">
                Ma note
              </span>
              <StarRating
                value={fav.user_rating ?? 0}
                onChange={(v) => updateFavorite(fav.barcode, { user_rating: v })}
              />
            </div>

            {editing === fav.barcode ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Bu pour l'anniv de Marco, parfait avec l'osso buco..."
                  rows={3}
                  className="w-full text-sm"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setEditing(null)}
                    className="font-mono text-[11px] uppercase tracking-wide text-text-secondary px-3 py-1.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => saveNote(fav.barcode)}
                    className="bg-gold text-bg-deep font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-lg"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            ) : fav.user_note ? (
              <button
                onClick={() => startEdit(fav.barcode, fav.user_note)}
                className="text-left font-body italic text-sm text-cream/80 border-l-2 border-gold/40 pl-3"
              >
                {fav.user_note}
              </button>
            ) : (
              <button
                onClick={() => startEdit(fav.barcode)}
                className="text-left font-mono text-[11px] uppercase tracking-wide text-gold/70 hover:text-gold"
              >
                + Ajouter une note
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
