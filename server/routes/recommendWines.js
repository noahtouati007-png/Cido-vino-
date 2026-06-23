import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { SOMMELIER_SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post("/", async (req, res) => {
  const { dish, filters = {} } = req.body;
  const { budget, preferredType, occasion } = filters;

  const filterLines = [
    budget ? `Budget souhaité: ${budget}` : null,
    preferredType ? `Type de vin préféré: ${preferredType}` : null,
    occasion ? `Occasion: ${occasion}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = `Un client veut sublimer ce plat: "${dish}".
${filterLines || "Aucune préférence particulière indiquée."}

Génère des recommandations de vins en JSON STRICT respectant exactement ce schéma:
{
  "dish": "...",
  "sommelier_intro": "...",
  "recommendations": [
    {
      "rank": 1,
      "wine_type": "...",
      "wine_style": "...",
      "example_bottles": ["...", "...", "..."],
      "region_suggestions": ["..."],
      "pairing_reason": "...",
      "mafia_quote": "...",
      "price_range": "...",
      "serving_temp": "..."
    }
  ]
}

Retourne 4 à 5 recommandations classées du meilleur accord au "correct mais acceptable". Le "sommelier_intro" est un paragraphe dans la voix mafioso-sommelier, réagissant au choix de plat du client. Chaque "mafia_quote" fait 1-2 phrases courtes, en italique de ton. Respecte les filtres donnés si fournis. Réponds uniquement avec le JSON, sans aucun texte autour.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SOMMELIER_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].text;
    const json = JSON.parse(text);
    res.json(json);
  } catch (err) {
    console.error("recommend-wines error:", err);
    res.status(502).json({ error: "Don Vino est temporairement indisponible." });
  }
});

export default router;
