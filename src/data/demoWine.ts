import type { WineData } from "../types/wine";

export const DEMO_WINE: WineData = {
  wine_name: "Château Sangue Antico",
  type: "rouge",
  region: "Toscane",
  grape_varieties: ["Sangiovese", "Cabernet Sauvignon"],
  vintage: "2018",
  tasting_notes: {
    color: "Grenat profond, reflets pourpres",
    nose: "Cerise noire, tabac, sous-bois humide",
    palate: "Tanins serrés, fruits noirs mûrs, une pointe de réglisse",
    finish: "Long, épicé, persistant comme un bon secret",
  },
  mafia_description:
    "Ce vin, il a vécu. Comme moi, il a connu des caves froides et des nuits longues. Tu le bois, et tu comprends pourquoi certains secrets méritent d'être gardés. Très longtemps.",
  mafia_signature: "— Don Bacco, Consigliere des Grands Crus",
  alcohol: "14.5%",
  serve_temperature: "16-18°C",
  rating: 4,
  pairing_teaser: "Un vin qui ne pardonne qu'aux plats qui osent.",
  pairings: [
    { dish_name: "Osso buco", dish_emoji: "🍖", pairing_reason: "La richesse de la viande mijotée répond aux tanins avec autorité.", pairing_strength: "parfait" },
    { dish_name: "Pecorino affiné", dish_emoji: "🧀", pairing_reason: "Le sel et le gras du fromage adoucissent le vin sans le trahir.", pairing_strength: "excellent" },
    { dish_name: "Risotto aux champignons", dish_emoji: "🍄", pairing_reason: "Les notes terreuses se répondent comme deux frères de sang.", pairing_strength: "excellent" },
    { dish_name: "Tartare de bœuf", dish_emoji: "🥩", pairing_reason: "Fraîcheur et puissance, un duel honorable.", pairing_strength: "bien" },
    { dish_name: "Tarte aux figues", dish_emoji: "🥧", pairing_reason: "Le sucré flatte la structure, mais reste à sa place.", pairing_strength: "bien" },
    { dish_name: "Plateau de charcuterie", dish_emoji: "🍢", pairing_reason: "Un classique qui ne déçoit jamais, même un dimanche.", pairing_strength: "correct" },
  ],
};

export const DEMO_BARCODE = "demo";
