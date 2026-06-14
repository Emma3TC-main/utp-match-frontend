// src/services/syllabusService.ts

import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { schemaGuard } from "../lib/schemaGuard";
import type {
  SyllabusExplanationRequestDto,
  SyllabusExplanationResponseDto,
} from "../types/api";
import type { CourseViewModel, ExplanationViewModel } from "../types/domain";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

type ExplainSyllabusInput = {
  studentProfileId: string;
  course: CourseViewModel;
};

export const syllabusService = {
  async explainSyllabus(
    input: ExplainSyllabusInput,
  ): Promise<ExplanationViewModel> {
    if (USE_MOCKS) {
      return {
        syllabusId: input.course.syllabusId ?? input.course.id,
        course: input.course,
        summary: input.course.explanation,
        plainLanguageExplanation: input.course.explanation,
        whyItMatters: input.course.impact,
        difficulty: input.course.difficulty,
        skillsYouBuild: [input.course.skill ?? "Habilidad aplicada"],
        exampleActivities: [
          "Resolver ejercicios cortos",
          "Revisar casos prácticos",
          "Preguntar dudas al docente o tutor",
        ],
        profileImpact: input.course.impact,
        recommendedPreparation: [
          "Repasar conceptos base",
          "Practicar de forma constante",
          "Guardar dudas para tutoría",
        ],
      };
    }

    const body: SyllabusExplanationRequestDto = {
      studentProfileId: input.studentProfileId,
      targetAudience: "student",
      tone: "clear_youthful",
      outputFormat: "structured_json",
      includeDifficultySignals: true,
      includeFitComment: true,
    };

    const syllabusId = input.course.syllabusId ?? input.course.id;

    const json = await apiClient.post<
      SyllabusExplanationResponseDto,
      SyllabusExplanationRequestDto
    >(endpoints.syllabi.explain(syllabusId), body);

    return schemaGuard.parseSyllabusExplanationResponse(json, input.course);
  },
};
