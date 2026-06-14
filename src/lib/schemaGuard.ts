import type {
  CareerComparisonResponseDto,
  SyllabusExplanationResponseDto,
} from "../types/api";
import type {
  CareerViewModel,
  ComparisonViewModel,
  CourseViewModel,
  DimensionScores,
  ExplanationViewModel,
} from "../types/domain";

function assertObject(
  value: unknown,
  name: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    throw new Error(`${name} no tiene formato de objeto válido.`);
  }
}

function mapApiDimensionsToFrontend(dimensions: {
  math: number;
  coding: number;
  management: number;
  communication: number;
  practice: number;
}): DimensionScores {
  return {
    mathematics: dimensions.math,
    programming: dimensions.coding,
    management: dimensions.management,
    communication: dimensions.communication,
    logic: dimensions.practice,
  };
}

export const schemaGuard = {
  parseCareerResponse(json: unknown): CareerViewModel {
    assertObject(json, "CareerResponse");

    if (!json.id || !json.name) {
      throw new Error("La carrera recibida no tiene id o name.");
    }

    return json as CareerViewModel;
  },

  parseCareerListResponse(json: unknown): CareerViewModel[] {
    if (!Array.isArray(json)) {
      throw new Error("La lista de carreras no tiene formato válido.");
    }

    return json.map((item) => this.parseCareerResponse(item));
  },

  parseComparisonResponse(
    json: unknown,
    firstCareer: CareerViewModel,
    secondCareer: CareerViewModel,
  ): ComparisonViewModel {
    assertObject(json, "CareerComparisonResponse");

    const dto = json as CareerComparisonResponseDto;

    if (!dto.comparisonId || !dto.summary || !dto.fitNarrative) {
      throw new Error("La comparación recibida está incompleta.");
    }

    return {
      comparisonId: dto.comparisonId,
      firstCareer,
      secondCareer,
      selectedTab: "Resumen",
      summary: dto.summary,
      dimensions: {
        left: mapApiDimensionsToFrontend(dto.dimensions.left),
        right: mapApiDimensionsToFrontend(dto.dimensions.right),
      },
      fitNarrative: dto.fitNarrative,
      risksOrWarnings: dto.risksOrWarnings ?? [],
      recommendedQuestions: dto.recommendedQuestions,
      nextBestActions: dto.nextBestActions ?? [],
      createdAt: dto.createdAt,
    };
  },

  parseSyllabusExplanationResponse(
    json: unknown,
    course: CourseViewModel,
  ): ExplanationViewModel {
    assertObject(json, "SyllabusExplanationResponse");

    const dto = json as SyllabusExplanationResponseDto;

    if (!dto.syllabusId || !dto.courseName || !dto.plainExplanation) {
      throw new Error("La explicación del sílabo está incompleta.");
    }

    return {
      syllabusId: String(dto.syllabusId),
      course,
      summary: dto.plainExplanation,
      plainLanguageExplanation: dto.plainExplanation,
      whyItMatters: dto.whyItMatters,
      difficulty: [
        `Práctica: ${dto.difficultySignals.practiceIntensity}/10`,
        `Lectura: ${dto.difficultySignals.readingIntensity}/10`,
        `Abstracción: ${dto.difficultySignals.abstractReasoning}/10`,
        `Tolerancia al error: ${dto.difficultySignals.frustrationTolerance}/10`,
      ],
      difficultySignals: dto.difficultySignals,
      skillsYouBuild: dto.skillsYouBuild,
      exampleActivities: dto.exampleActivities ?? [],
      profileImpact: dto.fitComment ?? dto.whyItMatters,
      recommendedPreparation: dto.recommendedPreparation ?? [],
    };
  },
};
