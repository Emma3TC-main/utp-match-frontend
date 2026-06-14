import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { unwrapItems, unwrapKey } from "../lib/apiResponse";
import type {
  ActionPlanCreateDto,
  ActionPlanResponseDto,
  ActionPlanTaskStatus,
} from "../types/api";
import type { CareerViewModel, PlanTaskViewModel, PlanViewModel } from "../types/domain";

function toPriority(type: string): string {
  if (type === "review_syllabus") return "Alta prioridad";
  if (type === "talk_family") return "Personal";
  return "Recomendado";
}

function toDueLabel(dueDate?: string | null): string {
  if (!dueDate) return "Esta semana";
  return dueDate;
}

function mapPlan(dto: ActionPlanResponseDto): PlanViewModel {
  return {
    id: String(dto.id),
    studentProfileId: String(dto.studentProfileId),
    targetCareerId: String(dto.targetCareerId),
    comparisonId: dto.comparisonId ? String(dto.comparisonId) : null,
    status: dto.status,
    progressPercent: dto.progressPercent,
    notes: dto.notes,
    tasks: dto.tasks.map(
      (task): PlanTaskViewModel => ({
        id: String(task.id),
        title: task.title,
        description: task.description ?? "",
        priority: toPriority(task.type),
        due: toDueLabel(task.dueDate),
        dueDate: task.dueDate ?? undefined,
        type: task.type,
        status: task.status,
      }),
    ),
  };
}

function buildInitialTasks(career: CareerViewModel): ActionPlanCreateDto["tasks"] {
  const firstCourse = career.courses[0];

  // Temporal frontend seed: backend plans accepts tasks, but does not yet
  // generate recommended tasks from a career by itself.
  return [
    {
      title: "Revisar curso clave",
      description: firstCourse
        ? `Empieza por ${firstCourse.name}.`
        : "Explora los cursos iniciales.",
      type: "review_syllabus",
      status: "pending",
      relatedCareerId: career.id,
      relatedSyllabusId: firstCourse?.syllabusId,
    },
    {
      title: "Conversar tu decision",
      description: "Usa tu comparacion y dudas clave.",
      type: "talk_family",
      status: "pending",
      relatedCareerId: career.id,
    },
    {
      title: "Practicar una habilidad",
      description:
        career.skills[0]
          ? `Empieza con ${career.skills[0]}.`
          : "Elige una habilidad inicial.",
      type: "prepare_skill",
      status: "pending",
      relatedCareerId: career.id,
    },
  ];
}

export const planService = {
  async listPlans(studentProfileId: string, targetCareerId?: string) {
    const json = await apiClient.get<unknown>(endpoints.plans.list, {
      query: {
        studentProfileId,
        targetCareerId,
      },
    });

    return unwrapItems<ActionPlanResponseDto>(json).map(mapPlan);
  },

  async createPlan(input: {
    studentProfileId: string;
    targetCareer: CareerViewModel;
    comparisonId?: string;
  }) {
    const body: ActionPlanCreateDto = {
      studentProfileId: input.studentProfileId,
      targetCareerId: input.targetCareer.id,
      comparisonId: input.comparisonId ?? null,
      tasks: buildInitialTasks(input.targetCareer),
      notes: `Plan generado para ${input.targetCareer.name}.`,
      context: {
        source: "frontend",
      },
    };

    const json = await apiClient.post<unknown, ActionPlanCreateDto>(
      endpoints.plans.create,
      body,
    );

    return mapPlan(unwrapKey<ActionPlanResponseDto>(json, "plan"));
  },

  async updateTaskStatus(planId: string, taskId: string, status: ActionPlanTaskStatus) {
    const json = await apiClient.patch<unknown, { status: ActionPlanTaskStatus }>(
      endpoints.plans.updateTaskStatus(planId, taskId),
      { status },
    );

    return mapPlan(unwrapKey<ActionPlanResponseDto>(json, "plan"));
  },
};
