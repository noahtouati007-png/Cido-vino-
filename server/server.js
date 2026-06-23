import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import describeWine from "./routes/describeWine.js";
import pairWine from "./routes/pairWine.js";
import recommendWines from "./routes/recommendWines.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
  })
);
app.use(express.json());

app.use("/api/describe-wine", describeWine);
app.use("/api/pair-wine", pairWine);
app.use("/api/recommend-wines", recommendWines);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Cibo Vino backend running on http://localhost:${PORT}`);
});
