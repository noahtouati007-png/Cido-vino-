import { useCallback, useEffect, useState } from "react";
import type { ScanHistoryEntry } from "../types/wine";

const STORAGE_KEY = "cibo-vino-history";
const MAX_ENTRIES = 20;

function readHistory(): ScanHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useWineHistory() {
  const [history, setHistory] = useState<ScanHistoryEntry[]>(() => readHistory());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = useCallback((entry: ScanHistoryEntry) => {
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.barcode !== entry.barcode);
      return [entry, ...filtered].slice(0, MAX_ENTRIES);
    });
  }, []);

  const removeEntry = useCallback((barcode: string) => {
    setHistory((prev) => prev.filter((e) => e.barcode !== barcode));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
}
