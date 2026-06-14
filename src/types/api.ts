// src/types/api.ts

export type UUID = string;
export type ISODateTime = string;
export type ISODate = string;

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
};

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
  studentProfileId?: UUID;
  leftCareerId: UUID | string;
  rightCareerId: UUID | string;
  vocationalReportId?: UUID;
  audienceMode: AudienceMode;
  explanationStyle: ExplanationStyle;
  includeSyllabusSignals?: boolean;
  context?: Record<string, unknown>;
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
  studentProfileId?: UUID;
  targetAudience: AudienceMode;
  tone: ExplanationStyle;
  outputFormat: "structured_json";
  includeDifficultySignals: boolean;
  context?: Record<string, unknown>;
};

export type SyllabusExplanationResponseDto = {
  explanationId?: UUID | string;
  syllabusId: UUID | string;
  courseName: string;
  targetAudience?: AudienceMode;
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
  createdAt?: ISODateTime;
};

export type AuthUserDto = {
  id: UUID | string;
  role: "guest" | "student" | "guardian" | "advisor" | "admin" | "system";
  status: "active" | "inactive" | "blocked" | "deleted";
  email?: string | null;
  displayName?: string | null;
  studentProfileId?: string | null;
};

export type AuthSessionDto = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  expiresAt: ISODateTime;
  user: AuthUserDto;
};

export type StudentProfileDto = {
  id: UUID | string;
  userId: UUID | string;
  firstName?: string;
  schoolYear: "4_secundaria" | "5_secundaria" | "egresado" | "otro";
  campusInterest?: string;
  ageBand: "under_16" | "16_17" | "18_plus" | "unknown";
  preferredLanguage: string;
  familyShareEnabled: boolean;
  interests: string[];
  strengths: string[];
  concerns: string[];
  source:
    | "onboarding"
    | "manual"
    | "auth_guest"
    | "advisor_entry"
    | "mock_demo"
    | "local-test"
    | "thunder-client";
  metadata: Record<string, unknown>;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type StudentProfileCreateDto = {
  userId?: string;
  firstName?: string;
  schoolYear: StudentProfileDto["schoolYear"];
  campusInterest?: string;
  ageBand?: StudentProfileDto["ageBand"];
  preferredLanguage?: string;
  familyShareEnabled?: boolean;
  interests?: string[];
  strengths?: string[];
  concerns?: string[];
  source?: StudentProfileDto["source"];
  metadata?: Record<string, unknown>;
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
  id: UUID;
  studentProfileId: UUID;
  targetCareerId: UUID | string;
  comparisonId?: UUID | string | null;
  targetTerm?: string;
  status: ActionPlanStatus;
  progressPercent: number;
  tasks: {
    id: UUID | string;
    title: string;
    description?: string;
    type: ActionPlanTaskType;
    dueDate?: ISODate | null;
    status: ActionPlanTaskStatus;
    relatedCareerId?: string;
    relatedSyllabusId?: string;
  }[];
  notes?: string;
  context?: Record<string, unknown>;
  createdAt?: ISODateTime;
  updatedAt?: ISODateTime;
};

export type ActionPlanCreateDto = {
  studentProfileId: UUID | string;
  targetCareerId: UUID | string;
  comparisonId?: UUID | string | null;
  targetTerm?: string;
  tasks: Array<
    Omit<ActionPlanResponseDto["tasks"][number], "id"> & {
      id?: UUID | string;
    }
  >;
  notes?: string;
  context?: Record<string, unknown>;
};

export type ShareCreateDto = {
  ownerProfileId: UUID | string;
  comparisonId?: UUID | string | null;
  planId?: UUID | string | null;
  vocationalReportId?: UUID | string | null;
  audience: "family" | "advisor" | "public_demo";
  title?: string;
  summary?: string;
  expiresAt?: string | null;
  metadata?: Record<string, unknown>;
};

export type ShareRecordDto = ShareCreateDto & {
  id: UUID | string;
  token: string;
  shareUrl: string;
  revokedAt: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
};

export type SharedSummaryDto = {
  token: string;
  audience: "family" | "advisor" | "public_demo";
  ownerProfileId: UUID | string;
  comparisonId?: UUID | string | null;
  planId?: UUID | string | null;
  vocationalReportId?: UUID | string | null;
  title: string;
  summary: string;
  status: "active" | "revoked" | "expired";
  expiresAt?: string | null;
  createdAt: ISODateTime;
};

export type EventLogCreateDto = {
  eventName: string;
  studentProfileId?: string;
  sessionId?: string;
  anonymousId?: string;
  source?: "web" | "mobile" | "backend" | "thunder-client" | "local-test" | "system";
  occurredAt?: string;
  eventProps?: Record<string, unknown>;
  requestId?: string;
};
