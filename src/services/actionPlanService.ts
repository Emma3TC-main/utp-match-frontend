import { planService } from "./planService";
import type { PlanTaskViewModel } from "../types/domain";

type GetActionPlanInput = {
  planId?: string;
  studentProfileId: string;
  targetCareerId: string;
};

export const actionPlanService = {
  async getActionPlan(input: GetActionPlanInput): Promise<PlanTaskViewModel[]> {
    if (input.planId) {
      const plans = await planService.listPlans(input.studentProfileId);
      return plans.find((plan) => plan.id === input.planId)?.tasks ?? [];
    }

    const plans = await planService.listPlans(
      input.studentProfileId,
      input.targetCareerId,
    );

    return plans[0]?.tasks ?? [];
  },
};
