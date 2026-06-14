import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { schemaGuard } from "../lib/schemaGuard";
import type { CareerComparisonRequestDto } from "../types/api";
import type { CareerViewModel, ComparisonViewModel } from "../types/domain";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

type CreateComparisonInput = {
  studentProfileId?: string;
  firstCareer: CareerViewModel;
  secondCareer: CareerViewModel;
};

export const comparisonService = {
  async createComparison(
    input: CreateComparisonInput,
  ): Promise<ComparisonViewModel> {
    if (USE_MOCKS) {
      return {
        comparisonId: crypto.randomUUID(),
        firstCareer: input.firstCareer,
        secondCareer: input.secondCareer,
        selectedTab: "Resumen",
        summary: `${input.firstCareer.name} vs. ${input.secondCareer.name}`,
        dimensions: {
          left: input.firstCareer.intensity,
          right: input.secondCareer.intensity,
        },
        fitNarrative: `${input.firstCareer.insight} ${input.secondCareer.insight}`,
        risksOrWarnings: [
          ...input.firstCareer.risks.slice(0, 2),
          ...input.secondCareer.risks.slice(0, 2),
        ],
        recommendedQuestions: [
          "Que problema te gustaria resolver cada dia?",
          "Te motiva mas programar, gestionar o comunicar?",
          "Que curso te genera curiosidad?",
        ],
        nextBestActions: [
          "Revisar cursos clave",
          "Guardar comparacion",
          "Conversar con un estudiante",
        ],
        createdAt: new Date().toISOString(),
      };
    }

    const body: CareerComparisonRequestDto = {
      studentProfileId: input.studentProfileId,
      leftCareerId: input.firstCareer.id,
      rightCareerId: input.secondCareer.id,
      audienceMode: "student",
      explanationStyle: "clear_youthful",
      includeSyllabusSignals: true,
    };

    const json = await apiClient.post<unknown, CareerComparisonRequestDto>(
      endpoints.comparisons.create,
      body,
    );

    return schemaGuard.parseComparisonResponse(
      json,
      input.firstCareer,
      input.secondCareer,
    );
  },
};
