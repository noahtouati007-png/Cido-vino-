import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoadingMafia from "../components/LoadingMafia";
import ErrorCard from "../components/ErrorCard";
import OliveBranchDivider from "../components/OliveBranchDivider";
import RecommendationCard from "../components/RecommendationCard";
import { recommendWines } from "../services/api";
import type { DishFilters, DishRecommendations } from "../types/wine";

interface LocationState {
  dish: string;
  filters: DishFilters;
}

export default function DishResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [result, setResult] = useState<DishRecommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state?.dish) {
      navigate("/dish");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    recommendWines(state.dish, state.filters)
      .then((data) => {
        if (!cancelled) setResult(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Don Vino est temporairement indisponible. Les affaires l'appellent ailleurs.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep">
      <Header />
      <div className="pt-24 px-6 pb-16">
        {loading && <LoadingMafia />}
        {!loading && error && <ErrorCard message={error} />}
        {!loading && !error && result && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in">
            <h1 className="font-display text-3xl text-cream text-center">{result.dish}</h1>
            <p className="font-body italic text-cream/80 text-center leading-relaxed">
              {result.sommelier_intro}
            </p>
            <OliveBranchDivider />
            {result.recommendations.map((rec, i) => (
              <div key={rec.rank}>
                <RecommendationCard rec={rec} />
                {i < result.recommendations.length - 1 && <OliveBranchDivider />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
