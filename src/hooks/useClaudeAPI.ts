import { useCallback, useState } from "react";

interface UseClaudeAPIResult<TArgs extends unknown[], TResult> {
  data: TResult | null;
  loading: boolean;
  error: string | null;
  run: (...args: TArgs) => Promise<TResult | null>;
}

export function useClaudeAPI<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>
): UseClaudeAPIResult<TArgs, TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: TArgs) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fn(...args);
        setData(result);
        return result;
      } catch (e) {
        const message =
          e instanceof TypeError
            ? "Le silence du réseau est éloquent. Réessayez."
            : "Don Vino est temporairement indisponible. Les affaires l'appellent ailleurs.";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { data, loading, error, run };
}
