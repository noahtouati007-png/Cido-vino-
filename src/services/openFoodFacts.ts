import type { OpenFoodFactsProduct } from "../types/wine";

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
