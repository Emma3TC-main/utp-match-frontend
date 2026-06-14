import { createContext, useContext } from "react";
import type { ComparisonTab } from "../types/domain";

export type ProfileState = {
  id?: string;
  userId?: string;
  name: string;
  year: "4_secundaria" | "5_secundaria" | "egresado" | "otro";
  interests: string[];
  skills: string[];
  doubts: string;
  worry: string;
};

export type AuthUser = {
  id: string;
  email?: string | null;
  name: string;
  role?: string;
  studentProfileId?: string | null;
  phone?: string;
  description?: string;
  photo?: string;
};

export type AppStateSnapshot = {
  profile: ProfileState;
  selectedCareers: string[];
  completedTasks: string[];
  savedCourses: string[];
  comparisonId?: string;
  planId?: string;
  vocationalReportId?: string;
  shareUrl?: string;
  selectedComparisonTab: ComparisonTab;
  isLoading: boolean;
  authUser: AuthUser | null;
};

export type AppStateValue = AppStateSnapshot & {
  setProfile: (profile: ProfileState) => void;
  patchProfile: (updates: Partial<ProfileState>) => void;
  toggleCareer: (careerId: string) => void;
  setSelectedCareers: (careerIds: string[]) => void;
  setCompletedTasks: (taskIds: string[]) => void;
  toggleTask: (taskId: string) => void;
  toggleSavedCourse: (courseId: string) => void;
  setComparisonId: (comparisonId?: string) => void;
  setPlanId: (planId?: string) => void;
  setVocationalReportId: (vocationalReportId?: string) => void;
  setShareUrl: (shareUrl?: string) => void;
  setComparisonTab: (tab: ComparisonTab) => void;
  setIsLoading: (value: boolean) => void;
  setAuthUser: (user: AuthUser | null) => void;
  updateAuthUser: (updates: Partial<AuthUser>) => void;
};

export const STORAGE_KEY = "utp-match-state-v1";

export const defaultProfile: ProfileState = {
  id: undefined,
  userId: undefined,
  name: "",
  year: "5_secundaria",
  interests: [],
  skills: [],
  doubts: "",
  worry: "",
};

export const defaultState: AppStateSnapshot = {
  profile: defaultProfile,
  selectedCareers: [],
  completedTasks: [],
  savedCourses: [],
  comparisonId: undefined,
  planId: undefined,
  vocationalReportId: undefined,
  shareUrl: undefined,
  selectedComparisonTab: "Resumen",
  isLoading: false,
  authUser: null,
};

export const AppStateContext = createContext<AppStateValue | null>(null);

export function readStoredState(): AppStateSnapshot {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<AppStateSnapshot>;

    return {
      ...defaultState,
      ...parsed,
      profile: {
        ...defaultState.profile,
        ...(parsed.profile ?? {}),
      },
      selectedCareers: parsed.selectedCareers ?? defaultState.selectedCareers,
      completedTasks: parsed.completedTasks ?? defaultState.completedTasks,
      savedCourses: parsed.savedCourses ?? defaultState.savedCourses,
      comparisonId: parsed.comparisonId ?? defaultState.comparisonId,
      planId: parsed.planId ?? defaultState.planId,
      vocationalReportId:
        parsed.vocationalReportId ?? defaultState.vocationalReportId,
      shareUrl: parsed.shareUrl ?? defaultState.shareUrl,
      selectedComparisonTab:
        parsed.selectedComparisonTab ?? defaultState.selectedComparisonTab,
      isLoading: parsed.isLoading ?? defaultState.isLoading,
      authUser: parsed.authUser ?? defaultState.authUser,
    };
  } catch {
    return defaultState;
  }
}

export function useAppContext() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
