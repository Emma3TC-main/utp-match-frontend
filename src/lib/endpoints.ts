const API_PREFIX = "/v1";

export const endpoints = {
  auth: {
    status: `${API_PREFIX}/auth/status`,
    guestSession: `${API_PREFIX}/auth/guest-session`,
    me: `${API_PREFIX}/auth/me`,
    logout: `${API_PREFIX}/auth/logout`,
  },

  profiles: {
    create: `${API_PREFIX}/profiles`,
    list: `${API_PREFIX}/profiles`,
    me: `${API_PREFIX}/profiles/me`,
    updateMe: `${API_PREFIX}/profiles/me`,
    detail: (profileId: string) => `${API_PREFIX}/profiles/${profileId}`,
    update: (profileId: string) => `${API_PREFIX}/profiles/${profileId}`,
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
    list: `${API_PREFIX}/vocational-reports`,
    detail: (reportId: string) =>
      `${API_PREFIX}/vocational-reports/${reportId}`,
    recommendations: (reportId: string) =>
      `${API_PREFIX}/vocational-reports/${reportId}/recommendations`,
  },

  comparisons: {
    create: `${API_PREFIX}/comparisons`,
    detail: (comparisonId: string) =>
      `${API_PREFIX}/comparisons/${comparisonId}`,
  },

  syllabi: {
    list: `${API_PREFIX}/syllabi`,
    detail: (syllabusId: string) => `${API_PREFIX}/syllabi/${syllabusId}`,
    explain: (syllabusId: string) =>
      `${API_PREFIX}/syllabi/${syllabusId}/explanations`,
  },

  plans: {
    create: `${API_PREFIX}/plans`,
    list: `${API_PREFIX}/plans`,
    detail: (planId: string) => `${API_PREFIX}/plans/${planId}`,
    update: (planId: string) => `${API_PREFIX}/plans/${planId}`,
    updateTaskStatus: (planId: string, taskId: string) =>
      `${API_PREFIX}/plans/${planId}/tasks/${taskId}/status`,
  },

  shares: {
    create: `${API_PREFIX}/shares`,
    list: `${API_PREFIX}/shares`,
    detail: (token: string) => `${API_PREFIX}/shares/${token}`,
    revoke: (token: string) => `${API_PREFIX}/shares/${token}/revoke`,
  },

  events: {
    create: `${API_PREFIX}/events`,
  },

  admin: {
    status: `${API_PREFIX}/admin/status`,
    overview: `${API_PREFIX}/admin/catalog/overview`,
    careers: `${API_PREFIX}/admin/catalog/careers`,
    syllabi: `${API_PREFIX}/admin/catalog/syllabi`,
    auditSummary: `${API_PREFIX}/admin/audit-summary`,
  },

  ai: {
    status: `${API_PREFIX}/ai/status`,
    ask: `${API_PREFIX}/ai/ask`,
  },
} as const;
