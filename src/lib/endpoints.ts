const API_PREFIX = "/v1";

export const endpoints = {
  auth: {
    guest: `${API_PREFIX}/auth/guest`,
  },

  profiles: {
    me: `${API_PREFIX}/profiles/me`,
  },

  consents: {
    create: `${API_PREFIX}/consents`,
  },

  careers: {
    list: `${API_PREFIX}/careers`,
    detail: (careerId: string) => `${API_PREFIX}/careers/${careerId}`,
    curriculum: (careerId: string) =>
      `${API_PREFIX}/careers/${careerId}/curriculum`,
  },

  vocationalReports: {
    create: `${API_PREFIX}/vocational-reports`,
    import: `${API_PREFIX}/vocational-reports/import`,
    detail: (reportId: string) =>
      `${API_PREFIX}/vocational-reports/${reportId}`,
  },

  comparisons: {
    create: `${API_PREFIX}/comparisons`,
    detail: (comparisonId: string) =>
      `${API_PREFIX}/comparisons/${comparisonId}`,
  },

  syllabi: {
    detail: (syllabusId: string) => `${API_PREFIX}/syllabi/${syllabusId}`,
    explain: (syllabusId: string) =>
      `${API_PREFIX}/syllabi/${syllabusId}/explanations`,
  },

  plans: {
    create: `${API_PREFIX}/plans`,
    detail: (planId: string) => `${API_PREFIX}/plans/${planId}`,
    update: (planId: string) => `${API_PREFIX}/plans/${planId}`,
  },

  shares: {
    create: `${API_PREFIX}/shares`,
    detail: (token: string) => `${API_PREFIX}/shares/${token}`,
  },

  events: {
    create: `${API_PREFIX}/events`,
  },

  admin: {
    careers: `${API_PREFIX}/admin/careers`,
    courses: `${API_PREFIX}/admin/courses`,
    syllabi: `${API_PREFIX}/admin/syllabi`,
  },
} as const;
