import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { SOMMELIER_SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post("/", async (req, res) => {
  const { barcode, product } = req.body;

  const productSummary = product
    ? JSON.stringify(product)
    : `Aucune donnée trouvée pour le code-barres ${barcode}. Vin inconnu.`;

  const prompt = `Voici les données produit d'un vin scanné (code-barres: ${barcode}):
${productSummary}

Génère une fiche de vin complète en JSON STRICT respectant exactement ce schéma:
{
  "wine_name": "...",
  "type": "rouge | blanc | rosé | pétillant | fortifié",
  "region": "...",
  "grape_varieties": ["..."],
  "vintage": "...",
  "tasting_notes": {
    "color": "...",
    "nose": "...",
    "palate": "...",
    "finish": "..."
  },
  "mafia_description": "...",
  "mafia_signature": "...",
  "alcohol": "...",
  "serve_temperature": "...",
  "rating": 1-5,
  "pairing_teaser": "..."
}

Le "mafia_description" doit faire 3-4 phrases, dans la voix d'un sommelier mafioso italien sage. Sombrement poétique, confiant, légèrement menaçant mais charmant.
Le "mafia_signature" est une ligne de signature courte (1 phrase), comme une formule de clôture.
Le "pairing_teaser" est une phrase évocatrice annonçant les accords mets-vins à venir.
Si les données produit sont absentes ou incomplètes, invente des détails plausibles et cohérents pour un vin de ce type. Réponds uniquement avec le JSON, sans aucun texte autour.`;

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
    console.error("describe-wine error:", err);
    res.status(502).json({ error: "Don Vino est temporairement indisponible." });
  }
});

export default router;
