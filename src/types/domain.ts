// src/types/domain.ts

export type CareerId =
  | "systems"
  | "industrial"
  | "administration"
  | "marketing"
  | "civil"
  | "law"
  | "psychology"
  | "architecture";

export type MatchLabel = "Alto" | "Medio" | "Bajo";

export type DimensionScores = {
  mathematics: number;
  programming: number;
  management: number;
  communication: number;
  logic: number;
};

export type Course = {
  id: string;
  cycle: string;
  name: string;
  explanation: string;
  difficulty: string[];
  impact: string;
  syllabusId?: string;

  area?: string;
  intensityLabel?: string;
  skill?: string;
};

export type CourseData = Course & {
  area: string;
  intensityLabel: string;
  skill: string;
};

export type Career = {
  id: CareerId | string;
  name: string;
  area: string;
  description: string;
  match: number;
  insight: string;

  // Props visuales usadas por MatchScore / CareerCard
  modality?: string;
  badge?: string;
  mathLabel?: string;
  matchLabel?: MatchLabel;
  matchText?: string;

  intensity: DimensionScores;

  courses: Course[];
  skills: string[];
  strengths: string[];
  risks: string[];
};

export type CareerData = Omit<
  Career,
  "id" | "courses" | "modality" | "badge" | "matchLabel" | "matchText"
> & {
  id: CareerId;
  modality: string;
  badge: string;
  matchLabel: MatchLabel;
  matchText: string;
  mathLabel?: string;
  courses: CourseData[];
};

export type ActionTask = {
  id: string;
  title: string;
  description: string;
  priority: "Alta prioridad" | "Recomendado" | "Personal" | string;
  due: string;
};

/**
 * ViewModels del diagrama frontend
 */

export type CareerViewModel = Career;

export type CourseViewModel = Course;

export type CycleViewModel = {
  cycle: string;
  courses: CourseViewModel[];
};

export type ComparisonTab =
  | "Resumen"
  | "Intensidad"
  | "Primer ciclo"
  | "Habilidades"
  | "Insights";

export type Session = {
  userId: string;
  name: string;
  email: string;
};

// Añade al final de src/types/domain.ts

export type ComparisonDimensionPair = {
  left: DimensionScores;
  right: DimensionScores;
};

export type ComparisonViewModel = {
  comparisonId?: string;
  firstCareer: CareerViewModel;
  secondCareer: CareerViewModel;
  selectedTab: ComparisonTab;
  summary?: string;
  dimensions?: ComparisonDimensionPair;
  fitNarrative?: string;
  risksOrWarnings?: string[];
  recommendedQuestions?: string[];
  nextBestActions?: string[];
  createdAt?: string;
};

export type ExplanationViewModel = {
  syllabusId?: string;
  course: CourseViewModel;
  summary: string;
  plainLanguageExplanation: string;
  whyItMatters?: string;
  difficulty: string[];
  difficultySignals?: {
    practiceIntensity: number;
    readingIntensity: number;
    abstractReasoning: number;
    frustrationTolerance: number;
  };
  skillsYouBuild?: string[];
  exampleActivities?: string[];
  profileImpact: string;
  recommendedPreparation?: string[];
  modelProvider?: string;
  modelName?: string;
  fallbackUsed?: boolean;
};

export type PlanTaskViewModel = ActionTask & {
  type?:
    | "review_syllabus"
    | "talk_family"
    | "attend_event"
    | "ask_advisor"
    | "compare_again"
    | "prepare_skill";
  status?: "pending" | "done" | "skipped";
  dueDate?: string;
};

export type PlanViewModel = {
  id: string;
  studentProfileId: string;
  targetCareerId: string;
  comparisonId?: string | null;
  status: "draft" | "active" | "completed" | "archived";
  progressPercent: number;
  tasks: PlanTaskViewModel[];
  notes?: string;
};
