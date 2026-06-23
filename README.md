# Cibo Vino

> *Il vino non mente. Gli uomini sì.*

Cibo Vino is a luxury wine intelligence app: scan a wine's barcode for a mafioso-sommelier-style tasting card and food pairings, or enter a dish to get ranked wine recommendations — all narrated in the voice of a wise, slightly menacing Italian Don.

## Tech Stack

- **Frontend**: React + TypeScript (Vite), React Router, Tailwind CSS
- **Barcode scanning**: `@zxing/library`
- **Wine data**: Open Food Facts API
- **AI**: Anthropic Claude (`claude-sonnet-4-6`), proxied through an Express backend
- **Storage**: LocalStorage (last 20 scans)

## Project Structure

```
cibo-vino/
├── public/              # logo.png, manifest.json, sw.js
├── src/
│   ├── components/      # Header, WineCard, Scanner, dividers, loading states...
│   ├── pages/            # Home, ScanPage, WineResultPage, DishPage, DishResultsPage, HistoryPage
│   ├── hooks/            # useScanner, useWineHistory, useClaudeAPI
│   ├── services/         # openFoodFacts.ts, api.ts
│   ├── types/            # wine.ts
│   └── styles/           # globals.css (design tokens)
├── server/
│   ├── server.js
│   ├── routes/           # describeWine, pairWine, recommendWines
│   └── prompts/          # systemPrompt.js (mafioso sommelier persona)
└── README.md
```

## Setup

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

This installs both the frontend (root) and backend (`server/`) dependencies. Or do it manually:

```bash
npm install
cd server && npm install
```

### 2. Add your Anthropic API key

Copy the example env file and add your key:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
ANTHROPIC_API_KEY=sk-ant-your-real-key
PORT=3001
```

### 3. Run in development

From the project root, run both frontend and backend together:

```bash
npm run dev:all
```

This starts:
- Vite dev server on `http://localhost:5173` (frontend, proxies `/api/*` to the backend)
- Express server on `http://localhost:3001` (backend)

Or run them separately in two terminals:

```bash
npm run dev          # frontend only
npm run dev:server   # backend only
```

### 4. Camera access for local dev

Browsers require a secure context (HTTPS) or `localhost` to grant camera permissions. `npm run dev` already runs Vite with `--host`, exposing the dev server on your LAN — if you test from another device (e.g. a phone), you'll need HTTPS (use a tool like `mkcert` + Vite's `server.https` option, or a tunneling service) since only `localhost` itself is exempt from the HTTPS requirement.

## Build for production

```bash
npm run build
```

Outputs a static bundle to `dist/`. Serve `dist/` behind any static host, and run the Express server (`cd server && npm start`) separately, proxying `/api` requests to it in your production reverse proxy.

## Logo

Place your logo PNG at `public/logo.png` (displayed at max-height 48px in the header). A placeholder has been generated — replace it with your real asset.

## Notes

- All Claude calls use `claude-sonnet-4-6`, `max_tokens: 1500`, with a shared mafioso-sommelier system prompt (`server/prompts/systemPrompt.js`).
- Scan history persists in LocalStorage, capped at 20 entries, newest first.
- Error states (API timeout, unknown barcode, camera denied, no network) are all rendered as themed olive-deep cards with the logo.
