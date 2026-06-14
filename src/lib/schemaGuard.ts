// src/lib/schemaGuard.ts

import type {
  CareerComparisonResponseDto,
  CareerCurriculumResponseDto,
  SyllabusExplanationResponseDto,
} from "../types/api";
import type {
  CareerViewModel,
  ComparisonViewModel,
  CourseViewModel,
  CycleViewModel,
  DimensionScores,
  ExplanationViewModel,
} from "../types/domain";

type ApiCareerDto = {
  id: string;
  name: string;
  faculty?: string;
  studyMode?: string;
  shortDescription?: string;
  tags?: string[];
  valueProposition?: string;
  firstCycleSummary?: string;
  dominantSkills?: string[];
  possibleRoles?: string[];
  studentFitSignals?: string[];
};

function assertObject(
  value: unknown,
  name: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    throw new Error(`${name} no tiene formato de objeto valido.`);
  }
}

function unwrapData(json: unknown): unknown {
  if (!json || typeof json !== "object") {
    return json;
  }

  const record = json as Record<string, unknown>;
  return "data" in record ? record.data : json;
}

function unwrapCareer(json: unknown): unknown {
  const data = unwrapData(json);

  if (!data || typeof data !== "object") {
    return data;
  }

  const record = data as Record<string, unknown>;
  return "career" in record ? record.career : data;
}

function unwrapCurriculum(json: unknown): unknown {
  const data = unwrapData(json);

  if (!data || typeof data !== "object") {
    return data;
  }

  const record = data as Record<string, unknown>;
  return "curriculum" in record ? record.curriculum : data;
}

function unwrapNamed(json: unknown, key: string): unknown {
  const data = unwrapData(json);

  if (!data || typeof data !== "object") {
    return data;
  }

  const record = data as Record<string, unknown>;
  return key in record ? record[key] : data;
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

function prettifyTag(tag: string): string {
  return tag
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function scoreFromId(id: string): number {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 82 + (hash % 12);
}

function inferIntensity(career: ApiCareerDto): DimensionScores {
  const text = `${career.id} ${career.name} ${(career.tags ?? []).join(" ")}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (text.includes("software") || text.includes("programacion")) {
    return {
      mathematics: 70,
      programming: 92,
      management: 45,
      communication: 58,
      logic: 88,
    };
  }

  if (text.includes("industrial") || text.includes("procesos")) {
    return {
      mathematics: 78,
      programming: 48,
      management: 86,
      communication: 64,
      logic: 76,
    };
  }

  if (text.includes("data") || text.includes("datos")) {
    return {
      mathematics: 88,
      programming: 82,
      management: 54,
      communication: 62,
      logic: 86,
    };
  }

  return {
    mathematics: 50,
    programming: 35,
    management: 45,
    communication: 50,
    logic: 55,
  };
}

function mapApiCareerToViewModel(value: unknown): CareerViewModel {
  assertObject(value, "CareerResponse");

  if (!value.id || !value.name) {
    throw new Error("La carrera recibida no tiene id o name.");
  }

  const career = value as ApiCareerDto;
  const tags = career.tags ?? [];
  const skills = career.dominantSkills ?? tags.map(prettifyTag);

  return {
    id: String(career.id),
    name: career.name,
    area: career.faculty ?? "Carrera",
    description:
      career.shortDescription ??
      career.valueProposition ??
      "Carrera disponible en el catalogo UTP.",
    match: scoreFromId(career.id),
    insight:
      career.valueProposition ??
      career.firstCycleSummary ??
      career.shortDescription ??
      "Revisa su malla y comparala con tus intereses.",
    modality: career.studyMode ?? "Modalidad por confirmar",
    badge: career.faculty ?? "UTP",
    mathLabel: "Intensidad referencial",
    matchLabel: "Alto",
    matchText: "Afinidad estimada",
    intensity: inferIntensity(career),
    courses: [],
    skills: skills.length > 0 ? skills : ["Exploracion vocacional"],
    strengths:
      career.possibleRoles ?? career.dominantSkills ?? tags.map(prettifyTag),
    risks: career.studentFitSignals ?? [
      "Revisar la malla completa",
      "Comparar cursos de primeros ciclos",
      "Validar tus intereses con un asesor",
    ],
  };
}

export const schemaGuard = {
  parseCareerResponse(json: unknown): CareerViewModel {
    return mapApiCareerToViewModel(unwrapCareer(json));
  },

  parseCareerListResponse(json: unknown): CareerViewModel[] {
    const data = unwrapData(json);
    const items =
      data && typeof data === "object"
        ? (data as Record<string, unknown>).items
        : data;

    if (!Array.isArray(items)) {
      throw new Error("La lista de carreras no tiene formato valido.");
    }

    return items.map((item) => this.parseCareerResponse(item));
  },

  parseCurriculumResponse(json: unknown): CycleViewModel[] {
    const unwrapped = unwrapCurriculum(json);
    assertObject(unwrapped, "CareerCurriculumResponse");

    const dto = unwrapped as CareerCurriculumResponseDto;

    if (!dto.careerId || !dto.careerName || !Array.isArray(dto.cycles)) {
      throw new Error("La malla curricular recibida esta incompleta.");
    }

    return dto.cycles.map((cycle) => ({
      cycle: `Ciclo ${cycle.cycleNumber}`,
      courses: cycle.courses.map(
        (course): CourseViewModel => ({
          id: String(course.courseId),
          syllabusId: course.syllabusId ? String(course.syllabusId) : undefined,
          cycle: `Ciclo ${cycle.cycleNumber}`,
          name: course.name,
          area: course.area,
          intensityLabel: "Media",
          explanation:
            course.summary ?? "Este curso forma parte de la malla curricular.",
          impact:
            course.summary ??
            "Te ayuda a desarrollar bases importantes para la carrera.",
          difficulty: ["Intensidad por confirmar"],
          skill: "Habilidad aplicada",
        }),
      ),
    }));
  },

  parseComparisonResponse(
    json: unknown,
    firstCareer: CareerViewModel,
    secondCareer: CareerViewModel,
  ): ComparisonViewModel {
    const unwrapped = unwrapNamed(json, "comparison");
    assertObject(unwrapped, "CareerComparisonResponse");

    const dto = unwrapped as CareerComparisonResponseDto;

    if (!dto.comparisonId || !dto.summary || !dto.fitNarrative) {
      throw new Error("La comparacion recibida esta incompleta.");
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
    const unwrapped = unwrapNamed(json, "explanation");
    assertObject(unwrapped, "SyllabusExplanationResponse");

    const dto = unwrapped as SyllabusExplanationResponseDto;

    if (!dto.syllabusId || !dto.courseName || !dto.plainExplanation) {
      throw new Error("La explicacion del silabo esta incompleta.");
    }

    return {
      syllabusId: String(dto.syllabusId),
      course,
      summary: dto.plainExplanation,
      plainLanguageExplanation: dto.plainExplanation,
      whyItMatters: dto.whyItMatters,
      difficulty: [
        `Practica: ${dto.difficultySignals.practiceIntensity}/10`,
        `Lectura: ${dto.difficultySignals.readingIntensity}/10`,
        `Abstraccion: ${dto.difficultySignals.abstractReasoning}/10`,
        `Tolerancia al error: ${dto.difficultySignals.frustrationTolerance}/10`,
      ],
      difficultySignals: dto.difficultySignals,
      skillsYouBuild: dto.skillsYouBuild,
      exampleActivities: dto.exampleActivities ?? [],
      profileImpact: dto.fitComment ?? dto.whyItMatters,
      recommendedPreparation: dto.recommendedPreparation ?? [],
      modelProvider: dto.modelMetadata.provider,
      modelName: dto.modelMetadata.model,
      fallbackUsed: dto.modelMetadata.fallbackUsed,
    };
  },
};
