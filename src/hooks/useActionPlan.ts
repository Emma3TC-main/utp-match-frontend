import { useEffect, useState } from "react";
import { actionPlanService } from "../services/actionPlanService";
import type { PlanTaskViewModel } from "../types/domain";

type UseActionPlanInput = {
  studentProfileId: string;
  targetCareerId: string;
};

export function useActionPlan(input: UseActionPlanInput) {
  const { studentProfileId, targetCareerId } = input;
  const [tasks, setTasks] = useState<PlanTaskViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      try {
        setLoading(true);
        setError(null);

        const result = await actionPlanService.getActionPlan({
          studentProfileId,
          targetCareerId,
        });

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
  }, [studentProfileId, targetCareerId]);

  return {
    tasks,
    setTasks,
    loading,
    error,
  };
}
