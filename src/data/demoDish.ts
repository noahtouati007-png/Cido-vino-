import type { DishRecommendations } from "../types/wine";

export const DEMO_DISH: DishRecommendations = {
  dish: "Osso buco à la milanaise",
  sommelier_intro:
    "Un plat qui a du caractère mérite un vin qui ne se laisse pas faire. Voici ce que je te conseille, et crois-moi sur parole.",
  recommendations: [
    {
      rank: 1,
      wine_type: "Barolo",
      wine_style: "Rouge corsé, tanins nobles",
      example_bottles: ["Barolo DOCG", "Barbaresco", "Nebbiolo d'Alba"],
      region_suggestions: ["Piémont, Italie"],
      pairing_reason:
        "Les tanins fermes et l'acidité du Nebbiolo tranchent la richesse de la viande mijotée sans jamais s'excuser.",
      mafia_quote: "Un Barolo, ça ne demande pas pardon. Comme moi.",
      price_range: "35-70€",
      serving_temp: "16-18°C",
    },
    {
      rank: 2,
      wine_type: "Chianti Classico Riserva",
      wine_style: "Rouge structuré, fruits noirs",
      example_bottles: ["Chianti Classico Riserva", "Brunello di Montalcino"],
      region_suggestions: ["Toscane, Italie"],
      pairing_reason: "L'acidité du Sangiovese nettoie le palais entre chaque bouchée de viande grasse.",
      mafia_quote: "La Toscane sait ce qu'elle fait. Toujours.",
      price_range: "20-45€",
      serving_temp: "16-17°C",
    },
    {
      rank: 3,
      wine_type: "Côtes du Rhône Villages",
      wine_style: "Rouge épicé, rond",
      example_bottles: ["Gigondas", "Vacqueyras"],
      region_suggestions: ["Vallée du Rhône, France"],
      pairing_reason: "Une option plus accessible, mais qui ne déshonore pas la table.",
      mafia_quote: "Pas besoin d'être riche pour boire bien. Juste malin.",
      price_range: "12-25€",
      serving_temp: "16°C",
    },
  ],
};
