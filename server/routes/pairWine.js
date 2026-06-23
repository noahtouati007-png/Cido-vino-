import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { SOMMELIER_SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post("/", async (req, res) => {
  const { wine_name, type } = req.body;

  const prompt = `Pour le vin "${wine_name}" (type: ${type}), propose 6 suggestions d'accords mets-vins en JSON STRICT respectant exactement ce schéma:
{
  "pairings": [
    {
      "dish_name": "...",
      "dish_emoji": "...",
      "pairing_reason": "...",
      "pairing_strength": "parfait | excellent | bien | correct"
    }
  ]
}

Retourne exactement 6 suggestions, variées (pas seulement des plats de viande), avec un emoji pertinent pour chaque plat et une raison courte en français. Réponds uniquement avec le JSON, sans aucun texte autour.`;

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
    console.error("pair-wine error:", err);
    res.status(502).json({ error: "Don Vino est temporairement indisponible." });
  }
});

export default router;
