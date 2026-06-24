// Conseils & punchlines de Don Vino pour la "suggestion du jour".
export interface DonVinoTip {
  quote: string;
  advice: string;
}

export const DON_VINO_TIPS: DonVinoTip[] = [
  {
    quote: "Un vin se respecte. Comme une famille.",
    advice: "Ouvre ton rouge 30 minutes avant de le servir. Il a besoin de respirer, comme nous tous.",
  },
  {
    quote: "La température, c'est tout. Le reste, c'est du folklore.",
    advice: "Un blanc trop froid cache ses arômes. Sors-le du frigo 10 minutes avant.",
  },
  {
    quote: "On ne juge pas un vin à son prix. On le juge à ce qu'il te raconte.",
    advice: "Goûte avant de regarder l'étiquette. Tu seras surpris.",
  },
  {
    quote: "Le verre compte autant que le vin. Crois-moi.",
    advice: "Un grand verre laisse le vin s'exprimer. Ne le remplis qu'au tiers.",
  },
  {
    quote: "Un bon accord, c'est un mariage. Pas un arrangement.",
    advice: "Le tannin aime le gras. Sers un rouge corsé avec une viande persillée.",
  },
  {
    quote: "Patience. Les meilleurs secrets vieillissent bien.",
    advice: "Garde tes grands crus couchés, à l'abri de la lumière. Le temps fait le travail.",
  },
  {
    quote: "Le rosé n'est pas un vin d'été. C'est un état d'esprit.",
    advice: "Sers-le bien frais, 8-10°C, avec une cuisine méditerranéenne.",
  },
  {
    quote: "Ne jette jamais un fond de bouteille. C'est un manque de respect.",
    advice: "Un reste de rouge ? Une sauce, un risotto. Rien ne se perd dans la famiglia.",
  },
];

// Choisit une suggestion stable pour la journée (change chaque jour).
export function tipOfTheDay(): DonVinoTip {
  const day = Math.floor(Date.now() / 86_400_000);
  return DON_VINO_TIPS[day % DON_VINO_TIPS.length];
}
