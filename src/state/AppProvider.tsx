import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { CareerId } from '../data/demo'
import { AppStateContext, STORAGE_KEY, readStoredState, type AppStateSnapshot, type AppStateValue, type ProfileState } from './appState'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppStateSnapshot>(() => readStoredState())

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }, 50)
    return () => window.clearTimeout(timer)
  }, [state])

  const toggleCareer = useCallback((careerId: CareerId) => {
    setState((current) => {
      const exists = current.selectedCareers.includes(careerId)

      if (exists) {
        return {
          ...current,
          selectedCareers: current.selectedCareers.filter((item) => item !== careerId),
        }
      }

      if (current.selectedCareers.length >= 2) {
        return current
      }

      return {
        ...current,
        selectedCareers: [...current.selectedCareers, careerId],
      }
    })
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    setState((current) => {
      const completed = current.completedTasks.includes(taskId)

      return {
        ...current,
        completedTasks: completed
          ? current.completedTasks.filter((item) => item !== taskId)
          : [...current.completedTasks, taskId],
      }
    })
  }, [])

  const toggleSavedCourse = useCallback((courseId: string) => {
    setState((current) => {
      const exists = current.savedCourses.includes(courseId)

      return {
        ...current,
        savedCourses: exists
          ? current.savedCourses.filter((item) => item !== courseId)
          : [...current.savedCourses, courseId],
      }
    })
  }, [])

  const setProfile = useCallback((profile: ProfileState) => {
    setState((current) => ({ ...current, profile }))
  }, [])

  const setComparisonTab = useCallback((tab: string) => {
    setState((current) => ({ ...current, selectedComparisonTab: tab }))
  }, [])

  const setIsLoading = useCallback((value: boolean) => {
    setState((current) => ({ ...current, isLoading: value }))
  }, [])

  const value: AppStateValue = {
    ...state,
    setProfile,
    toggleCareer,
    toggleTask,
    toggleSavedCourse,
    setComparisonTab,
    setIsLoading,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
