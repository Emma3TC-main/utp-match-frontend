import { useCallback, useState } from "react";
import { analyticsClient } from "../lib/analyticsClient";
import { comparisonService } from "../services/comparisonService";
import type { CareerViewModel, ComparisonViewModel } from "../types/domain";

type CreateComparisonInput = {
  studentProfileId?: string;
  firstCareer: CareerViewModel;
  secondCareer: CareerViewModel;
};

export function useCreateComparison() {
  const [data, setData] = useState<ComparisonViewModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (input: CreateComparisonInput) => {
    try {
      setLoading(true);
      setError(null);

      const comparison = await comparisonService.createComparison(input);

      setData(comparison);

      analyticsClient.track("comparison_created", {
        leftCareerId: input.firstCareer.id,
        rightCareerId: input.secondCareer.id,
      });

      return comparison;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error creando comparacion.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
  };
}
