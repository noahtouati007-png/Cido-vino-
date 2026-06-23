import type {
  DishFilters,
  DishRecommendations,
  OpenFoodFactsProduct,
  WineData,
  WinePairing,
} from "../types/wine";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export function describeWine(
  barcode: string,
  product: OpenFoodFactsProduct | null
): Promise<WineData> {
  return postJSON<WineData>("/describe-wine", { barcode, product });
}

export function pairWine(wineName: string, type: string): Promise<{ pairings: WinePairing[] }> {
  return postJSON("/pair-wine", { wine_name: wineName, type });
}

export function recommendWines(
  dish: string,
  filters: DishFilters
): Promise<DishRecommendations> {
  return postJSON("/recommend-wines", { dish, filters });
}
