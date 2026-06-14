import { actionTasks } from "../data/demo";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import type { ActionPlanResponseDto } from "../types/api";
import type { PlanTaskViewModel } from "../types/domain";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

type GetActionPlanInput = {
  planId?: string;
  studentProfileId: string;
  targetCareerId: string;
};

export const actionPlanService = {
  async getActionPlan(input: GetActionPlanInput): Promise<PlanTaskViewModel[]> {
    if (USE_MOCKS || !input.planId) {
      return actionTasks.map((task) => ({
        ...task,
        status: "pending",
      }));
    }

    const json = await apiClient.get<ActionPlanResponseDto>(
      endpoints.plans.detail(input.planId),
    );

    return json.tasks.map((task) => ({
      id: String(task.id ?? task.title),
      title: task.title,
      description: task.description ?? "",
      priority: "Recomendado",
      due: task.dueDate ?? "Esta semana",
      dueDate: task.dueDate,
      type: task.type,
      status: task.status,
    }));
  },
};
