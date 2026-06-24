// Service worker minimaliste : cache l'app shell pour un démarrage rapide
// et un fonctionnement hors-ligne de base (historique/cave en localStorage).
const CACHE = "cibo-vino-v1";
const APP_SHELL = ["/", "/index.html", "/logo.png", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Ne jamais mettre en cache les appels API ou Open Food Facts.
  if (url.pathname.startsWith("/api") || url.hostname.includes("openfoodfacts")) {
    return;
  }

  // Navigation : réseau d'abord, repli sur le cache (offline).
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/index.html")));
    return;
  }

  // Assets : cache d'abord, sinon réseau (et on met en cache au passage).
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          if (res.ok && url.origin === self.location.origin) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(request, clone));
          }
          return res;
        })
    )
  );
});
