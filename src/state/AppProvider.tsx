import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ComparisonTab } from "../types/domain";
import {
  AppStateContext,
  STORAGE_KEY,
  readStoredState,
  type AppStateSnapshot,
  type AppStateValue,
  type ProfileState,
  type AuthUser,
} from "./appState";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppStateSnapshot>(() => readStoredState());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 50);

    return () => window.clearTimeout(timer);
  }, [state]);

  const toggleCareer = useCallback((careerId: string) => {
    setState((current) => {
      const exists = current.selectedCareers.includes(careerId);

      if (exists) {
        return {
          ...current,
          selectedCareers: current.selectedCareers.filter(
            (item) => item !== careerId,
          ),
        };
      }

      if (current.selectedCareers.length >= 2) {
        return current;
      }

      return {
        ...current,
        selectedCareers: [...current.selectedCareers, careerId],
      };
    });
  }, []);

  const setSelectedCareers = useCallback((careerIds: string[]) => {
    setState((current) => ({
      ...current,
      selectedCareers: careerIds.slice(0, 2),
    }));
  }, []);

  const setCompletedTasks = useCallback((taskIds: string[]) => {
    setState((current) => ({
      ...current,
      completedTasks: taskIds,
    }));
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setState((current) => {
      const completed = current.completedTasks.includes(taskId);

      return {
        ...current,
        completedTasks: completed
          ? current.completedTasks.filter((item) => item !== taskId)
          : [...current.completedTasks, taskId],
      };
    });
  }, []);

  const toggleSavedCourse = useCallback((courseId: string) => {
    setState((current) => {
      const exists = current.savedCourses.includes(courseId);

      return {
        ...current,
        savedCourses: exists
          ? current.savedCourses.filter((item) => item !== courseId)
          : [...current.savedCourses, courseId],
      };
    });
  }, []);

  const setProfile = useCallback((profile: ProfileState) => {
    setState((current) => ({ ...current, profile }));
  }, []);

  const patchProfile = useCallback((updates: Partial<ProfileState>) => {
    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        ...updates,
      },
    }));
  }, []);

  const setComparisonId = useCallback((comparisonId?: string) => {
    setState((current) => ({ ...current, comparisonId }));
  }, []);

  const setPlanId = useCallback((planId?: string) => {
    setState((current) => ({ ...current, planId }));
  }, []);

  const setVocationalReportId = useCallback((vocationalReportId?: string) => {
    setState((current) => ({ ...current, vocationalReportId }));
  }, []);

  const setShareUrl = useCallback((shareUrl?: string) => {
    setState((current) => ({ ...current, shareUrl }));
  }, []);

  const setComparisonTab = useCallback((tab: ComparisonTab) => {
    setState((current) => ({ ...current, selectedComparisonTab: tab }));
  }, []);

  const setIsLoading = useCallback((value: boolean) => {
    setState((current) => ({ ...current, isLoading: value }));
  }, []);

  const setAuthUser = useCallback((user: AuthUser | null) => {
    setState((current) => ({ ...current, authUser: user }));
  }, []);

  const updateAuthUser = useCallback((updates: Partial<AuthUser>) => {
    setState((current) => {
      if (!current.authUser) {
        return current;
      }

      return {
        ...current,
        authUser: {
          ...current.authUser,
          ...updates,
        },
      };
    });
  }, []);

  const value: AppStateValue = useMemo(
    () => ({
      ...state,
      setProfile,
      patchProfile,
      toggleCareer,
      setSelectedCareers,
      setCompletedTasks,
      toggleTask,
      toggleSavedCourse,
      setComparisonId,
      setPlanId,
      setVocationalReportId,
      setShareUrl,
      setComparisonTab,
      setIsLoading,
      setAuthUser,
      updateAuthUser,
    }),
    [
      state,
      setProfile,
      patchProfile,
      toggleCareer,
      setSelectedCareers,
      setCompletedTasks,
      toggleTask,
      toggleSavedCourse,
      setComparisonId,
      setPlanId,
      setVocationalReportId,
      setShareUrl,
      setComparisonTab,
      setIsLoading,
      setAuthUser,
      updateAuthUser,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
