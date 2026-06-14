import { useEffect, useState } from "react";
import { careerService } from "../services/careerService";
import type { CareerViewModel } from "../types/domain";

export function useCareers() {
  const [data, setData] = useState<CareerViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCareers() {
      try {
        const careers = await careerService.getCareers();

        if (active) {
          setData(careers);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Error cargando carreras.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCareers();

    return () => {
      active = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
}
