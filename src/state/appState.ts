import { createContext, useContext } from "react";
import type { ComparisonTab } from "../types/domain";

export type ProfileState = {
  name: string;
  year: string;
  interests: string[];
  skills: string[];
  doubts: string;
  worry: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  description?: string;
  photo?: string;
};

export type AppStateSnapshot = {
  profile: ProfileState;
  selectedCareers: string[];
  completedTasks: string[];
  savedCourses: string[];
  selectedComparisonTab: ComparisonTab;
  isLoading: boolean;
  authUser: AuthUser | null;
};

export type AppStateValue = AppStateSnapshot & {
  setProfile: (profile: ProfileState) => void;
  toggleCareer: (careerId: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSavedCourse: (courseId: string) => void;
  setComparisonTab: (tab: ComparisonTab) => void;
  setIsLoading: (value: boolean) => void;
  setAuthUser: (user: AuthUser | null) => void;
  updateAuthUser: (updates: Partial<AuthUser>) => void;
};

export const STORAGE_KEY = "utp-match-state-v1";

export const defaultProfile: ProfileState = {
  name: "Andrea García",
  year: "5.° de secundaria",
  interests: ["Tecnología", "Diseño"],
  skills: ["Matemáticas", "Creatividad"],
  doubts: "Carreras en duda",
  worry: "No sé qué tan exigente será la carrera",
};

export const defaultState: AppStateSnapshot = {
  profile: defaultProfile,
  selectedCareers: ["systems", "industrial"],
  completedTasks: ["courses"],
  savedCourses: ["algoritmos"],
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
      profile: parsed.profile ?? defaultState.profile,
      selectedCareers: parsed.selectedCareers ?? defaultState.selectedCareers,
      completedTasks: parsed.completedTasks ?? defaultState.completedTasks,
      savedCourses: parsed.savedCourses ?? defaultState.savedCourses,
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
