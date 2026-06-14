import { createContext, useContext } from 'react'
import type { CareerId } from '../data/demo'

export type ProfileState = {
  name: string
  year: string
  interests: string[]
  skills: string[]
  doubts: string
  worry: string
}

export type AuthUser = {
  id: string
  email: string
  name: string
  phone?: string
  description?: string
  photo?: string
}

export type AppStateValue = {
  profile: ProfileState
  selectedCareers: CareerId[]
  completedTasks: string[]
  savedCourses: string[]
  selectedComparisonTab: string
  isLoading: boolean
  authUser: AuthUser | null
  setProfile: (profile: ProfileState) => void
  toggleCareer: (careerId: CareerId) => void
  toggleTask: (taskId: string) => void
  toggleSavedCourse: (courseId: string) => void
  setComparisonTab: (tab: string) => void
  setIsLoading: (value: boolean) => void
  setAuthUser: (user: AuthUser | null) => void
  updateAuthUser: (updates: Partial<AuthUser>) => void
}

export type AppStateSnapshot = Omit<AppStateValue, 'setProfile' | 'toggleCareer' | 'toggleTask' | 'toggleSavedCourse' | 'setComparisonTab' | 'setIsLoading' | 'setAuthUser' | 'updateAuthUser'>

export const STORAGE_KEY = 'utp-match-state-v1'

export const defaultProfile: ProfileState = {
  name: 'Andrea García',
  year: '5.° de secundaria',
  interests: ['Tecnología', 'Diseño'],
  skills: ['Matemáticas', 'Creatividad'],
  doubts: 'Carreras en duda',
  worry: 'No sé qué tan exigente será la carrera',
}

export const defaultState: AppStateSnapshot = {
  profile: defaultProfile,
  selectedCareers: ['systems', 'industrial'],
  completedTasks: ['courses'],
  savedCourses: ['algoritmos'],
  selectedComparisonTab: 'Resumen',
  isLoading: false,
  authUser: null,
}

export const AppStateContext = createContext<AppStateValue | null>(null)

export function readStoredState(): AppStateSnapshot {
  if (typeof window === 'undefined') {
    return defaultState
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return defaultState
  }

  try {
    const parsed = JSON.parse(saved) as Partial<AppStateSnapshot>
    return {
      ...defaultState,
      ...parsed,
      profile: parsed.profile ?? defaultState.profile,
      selectedCareers: parsed.selectedCareers ?? defaultState.selectedCareers,
      completedTasks: parsed.completedTasks ?? defaultState.completedTasks,
      savedCourses: parsed.savedCourses ?? defaultState.savedCourses,
      selectedComparisonTab: parsed.selectedComparisonTab ?? defaultState.selectedComparisonTab,
      isLoading: parsed.isLoading ?? defaultState.isLoading,
      authUser: parsed.authUser ?? defaultState.authUser,
    }
  } catch {
    return defaultState
  }
}

export function useAppContext() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
