import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LoadingMafia from "../components/LoadingMafia";
import ErrorCard from "../components/ErrorCard";
import WineCard from "../components/WineCard";
import { fetchProductByBarcode } from "../services/openFoodFacts";
import { describeWine, pairWine } from "../services/api";
import { useWineHistory } from "../hooks/useWineHistory";
import type { WineData } from "../types/wine";

export default function WineResultPage() {
  const { barcode = "" } = useParams();
  const { addEntry } = useWineHistory();

  const [wine, setWine] = useState<WineData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPairings, setShowPairings] = useState(false);
  const [pairingsLoading, setPairingsLoading] = useState(false);
  const pairingsRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    savedRef.current = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const product = await fetchProductByBarcode(barcode);
        if (cancelled) return;
        setImageUrl(product?.image_url);
        const data = await describeWine(barcode, product);
        if (cancelled) return;
        setWine(data);
      } catch {
        if (!cancelled) {
          setError("Don Vino est temporairement indisponible. Les affaires l'appellent ailleurs.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [barcode]);

  useEffect(() => {
    if (wine && !savedRef.current) {
      savedRef.current = true;
      addEntry({
        barcode,
        wine_name: wine.wine_name,
        type: wine.type,
        image_url: imageUrl,
        scanned_at: new Date().toISOString(),
        wine_data: wine,
      });
    }
  }, [wine, barcode, imageUrl, addEntry]);

  const handleRevealPairings = useCallback(async () => {
    if (!wine) return;
    setPairingsLoading(true);
    try {
      const result = await pairWine(wine.wine_name, wine.type);
      setWine((w) => (w ? { ...w, pairings: result.pairings } : w));
      setShowPairings(true);
      setTimeout(() => {
        pairingsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError("Don Vino est temporairement indisponible. Les affaires l'appellent ailleurs.");
    } finally {
      setPairingsLoading(false);
    }
  }, [wine]);

  const handleShare = useCallback(() => {
    if (!wine) return;
    if (navigator.share) {
      navigator.share({
        title: wine.wine_name,
        text: wine.pairing_teaser,
      });
    }
  }, [wine]);

  return (
    <div className="min-h-screen bg-olive-deep">
      <Header />
      <div className="pt-20">
        {loading && <LoadingMafia />}
        {!loading && error && (
          <div className="px-6">
            <ErrorCard message={error} />
          </div>
        )}
        {!loading && !error && wine && (
          <div ref={pairingsRef}>
            <WineCard
              wine={wine}
              imageUrl={imageUrl}
              onRevealPairings={handleRevealPairings}
              pairingsLoading={pairingsLoading}
              showPairings={showPairings}
              onShare={handleShare}
            />
          </div>
        )}
      </div>
    </div>
  );
}
