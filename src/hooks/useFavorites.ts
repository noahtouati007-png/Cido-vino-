import { useCallback, useEffect, useState } from "react";
import type { FavoriteEntry } from "../types/wine";

const STORAGE_KEY = "cibo-vino-favorites";

function readFavorites(): FavoriteEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Cross-component sync: a tiny event so every mounted hook stays in sync.
const EVENT = "cibo-favorites-changed";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(() => readFavorites());

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const persist = useCallback((next: FavoriteEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isFavorite = useCallback(
    (barcode: string) => favorites.some((f) => f.barcode === barcode),
    [favorites]
  );

  const addFavorite = useCallback(
    (entry: FavoriteEntry) => {
      const current = readFavorites();
      if (current.some((f) => f.barcode === entry.barcode)) return;
      persist([entry, ...current]);
    },
    [persist]
  );

  const removeFavorite = useCallback(
    (barcode: string) => {
      persist(readFavorites().filter((f) => f.barcode !== barcode));
    },
    [persist]
  );

  const toggleFavorite = useCallback(
    (entry: FavoriteEntry) => {
      const current = readFavorites();
      if (current.some((f) => f.barcode === entry.barcode)) {
        persist(current.filter((f) => f.barcode !== entry.barcode));
        return false;
      }
      persist([entry, ...current]);
      return true;
    },
    [persist]
  );

  const updateFavorite = useCallback(
    (barcode: string, patch: Partial<Pick<FavoriteEntry, "user_rating" | "user_note">>) => {
      persist(
        readFavorites().map((f) => (f.barcode === barcode ? { ...f, ...patch } : f))
      );
    },
    [persist]
  );

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    updateFavorite,
  };
}
