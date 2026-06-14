// src/types/api.ts

export type UUID = string;
export type ISODateTime = string;
export type ISODate = string;

export type AudienceMode = "student" | "family" | "advisor";

export type ExplanationStyle =
  | "clear_youthful"
  | "family_friendly"
  | "technical_light";

export type ApiDimensionScores = {
  math: number;
  coding: number;
  management: number;
  communication: number;
  practice: number;
};

export type CareerComparisonRequestDto = {
  studentProfileId: UUID;
  leftCareerId: UUID | string;
  rightCareerId: UUID | string;
  vocationalReportId?: UUID;
  audienceMode: AudienceMode;
  explanationStyle: ExplanationStyle;
  includeSyllabusSignals?: boolean;
};

export type CareerHighlightDto = {
  careerId: UUID | string;
  title: string;
  body: string;
};

export type ModelMetadataDto = {
  provider?: string;
  model?: string;
  promptVersion?: string;
  fallbackUsed?: boolean;
  cacheHit?: boolean;
  [key: string]: unknown;
};

export type CareerComparisonResponseDto = {
  comparisonId: UUID;
  summary: string;
  dimensions: {
    left: ApiDimensionScores;
    right: ApiDimensionScores;
  };
  careerHighlights?: CareerHighlightDto[];
  fitNarrative: string;
  risksOrWarnings?: string[];
  recommendedQuestions: string[];
  nextBestActions?: string[];
  modelMetadata?: ModelMetadataDto;
  createdAt: ISODateTime;
};

export type CareerCurriculumResponseDto = {
  careerId: UUID | string;
  careerName: string;
  faculty?: string;
  studyMode?: string;
  cycles: {
    cycleNumber: number;
    courses: {
      courseId: UUID | string;
      name: string;
      credits: number;
      area: string;
      summary?: string;
      syllabusId?: UUID | string;
      intensity?: Record<string, number>;
    }[];
  }[];
};

export type SyllabusExplanationRequestDto = {
  studentProfileId: UUID;
  targetAudience: AudienceMode;
  tone: ExplanationStyle;
  outputFormat: "structured_json";
  includeDifficultySignals: boolean;
  includeFitComment?: boolean;
};

export type SyllabusExplanationResponseDto = {
  syllabusId: UUID | string;
  courseName: string;
  plainExplanation: string;
  whyItMatters: string;
  difficultySignals: {
    practiceIntensity: number;
    readingIntensity: number;
    abstractReasoning: number;
    frustrationTolerance: number;
  };
  skillsYouBuild: string[];
  exampleActivities?: string[];
  fitComment?: string;
  recommendedPreparation?: string[];
  modelMetadata: ModelMetadataDto;
};

export type ActionPlanTaskStatus = "pending" | "done" | "skipped";

export type ActionPlanTaskType =
  | "review_syllabus"
  | "talk_family"
  | "attend_event"
  | "ask_advisor"
  | "compare_again"
  | "prepare_skill";

export type ActionPlanStatus = "draft" | "active" | "completed" | "archived";

export type ActionPlanResponseDto = {
  id?: UUID;
  studentProfileId: UUID;
  targetCareerId: UUID | string;
  targetTerm?: string;
  status: ActionPlanStatus;
  tasks: {
    id?: UUID | string;
    title: string;
    description?: string;
    type: ActionPlanTaskType;
    dueDate?: ISODate;
    status: ActionPlanTaskStatus;
  }[];
  notes?: string;
  createdAt?: ISODateTime;
};
