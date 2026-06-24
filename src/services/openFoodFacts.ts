import type { OpenFoodFactsProduct } from "../types/wine";

export interface WineSearchResult {
  barcode: string;
  product_name: string;
  brands?: string;
  image_url?: string;
}

// Recherche un vin par nom via l'API Open Food Facts.
export async function searchWinesByName(query: string): Promise<WineSearchResult[]> {
  const url = new URL("https://world.openfoodfacts.org/cgi/search.pl");
  url.searchParams.set("search_terms", query);
  url.searchParams.set("search_simple", "1");
  url.searchParams.set("action", "process");
  url.searchParams.set("json", "1");
  url.searchParams.set("page_size", "24");
  url.searchParams.set("fields", "code,product_name,brands,image_url");
  url.searchParams.set("tagtype_0", "categories");
  url.searchParams.set("tag_contains_0", "contains");
  url.searchParams.set("tag_0", "wines");

  const res = await fetch(url.toString());
  if (!res.ok) return [];
  const data = await res.json();
  const products: Array<Record<string, unknown>> = data.products ?? [];
  return products
    .filter((p) => p.code && p.product_name)
    .map((p) => ({
      barcode: String(p.code),
      product_name: String(p.product_name),
      brands: p.brands ? String(p.brands) : undefined,
      image_url: p.image_url ? String(p.image_url) : undefined,
    }))
    .slice(0, 24);
}

export async function fetchProductByBarcode(
  barcode: string
): Promise<OpenFoodFactsProduct | null> {
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.status !== 1 || !data.product) return null;
  const p = data.product;
  return {
    product_name: p.product_name,
    brands: p.brands,
    image_url: p.image_url,
    quantity: p.quantity,
    categories: p.categories,
    labels: p.labels,
    origins: p.origins,
    alcohol_value: p.alcohol_value ? String(p.alcohol_value) : undefined,
    ingredients_text: p.ingredients_text,
  };
}
