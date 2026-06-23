export type WineType = "rouge" | "blanc" | "rosé" | "pétillant" | "fortifié";

export interface TastingNotes {
  color: string;
  nose: string;
  palate: string;
  finish: string;
}

export interface WinePairing {
  dish_name: string;
  dish_emoji: string;
  pairing_reason: string;
  pairing_strength: "parfait" | "excellent" | "bien" | "correct";
}

export interface WineData {
  wine_name: string;
  type: WineType;
  region: string;
  grape_varieties: string[];
  vintage: string;
  tasting_notes: TastingNotes;
  mafia_description: string;
  mafia_signature: string;
  alcohol: string;
  serve_temperature: string;
  rating: number;
  pairing_teaser: string;
  pairings?: WinePairing[];
}

export interface OpenFoodFactsProduct {
  product_name?: string;
  brands?: string;
  image_url?: string;
  quantity?: string;
  categories?: string;
  labels?: string;
  origins?: string;
  alcohol_value?: string;
  ingredients_text?: string;
}

export interface ScanHistoryEntry {
  barcode: string;
  wine_name: string;
  type: WineType;
  image_url?: string;
  scanned_at: string;
  wine_data: WineData;
}

export type Budget = "Abordable" | "Milieu de gamme" | "Premium" | "Sans limite";
export type PreferredType = "Rouge" | "Blanc" | "Rosé" | "Pétillant" | "Fortifié" | "Pas de préférence";
export type Occasion = "Quotidien" | "Dîner romantique" | "Repas d'affaires" | "Grande fête";

export interface DishFilters {
  budget?: Budget;
  preferredType?: PreferredType;
  occasion?: Occasion;
}

export interface WineRecommendation {
  rank: number;
  wine_type: string;
  wine_style: string;
  example_bottles: string[];
  region_suggestions: string[];
  pairing_reason: string;
  mafia_quote: string;
  price_range: string;
  serving_temp: string;
}

export interface DishRecommendations {
  dish: string;
  sommelier_intro: string;
  recommendations: WineRecommendation[];
}
