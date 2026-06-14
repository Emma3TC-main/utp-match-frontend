import { useEffect, useState } from "react";
import { actionPlanService } from "../services/actionPlanService";
import type { PlanTaskViewModel } from "../types/domain";

type UseActionPlanInput = {
  studentProfileId: string;
  targetCareerId: string;
};

export function useActionPlan(input: UseActionPlanInput) {
  const [tasks, setTasks] = useState<PlanTaskViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      try {
        setLoading(true);
        setError(null);

        const result = await actionPlanService.getActionPlan(input);

        if (active) {
          setTasks(result);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error cargando plan.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [input.studentProfileId, input.targetCareerId]);

  return {
    tasks,
    setTasks,
    loading,
    error,
  };
}
