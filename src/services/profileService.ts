import { apiClient } from "../lib/apiClient";
import { unwrapKey } from "../lib/apiResponse";
import { endpoints } from "../lib/endpoints";
import type { StudentProfileCreateDto, StudentProfileDto } from "../types/api";
import type { ProfileState } from "../state/appState";

function mapSchoolYear(year: ProfileState["year"]): StudentProfileDto["schoolYear"] {
  return year;
}

export function mapProfileDtoToState(profile: StudentProfileDto): ProfileState {
  return {
    id: String(profile.id),
    userId: String(profile.userId),
    name: profile.firstName ?? "",
    year: profile.schoolYear,
    interests: profile.interests,
    skills: profile.strengths,
    doubts: profile.campusInterest ?? "",
    worry: profile.concerns.join(", "),
  };
}

export const profileService = {
  async createProfile(profile: ProfileState, userId?: string) {
    const body: StudentProfileCreateDto = {
      userId,
      firstName: profile.name || undefined,
      schoolYear: mapSchoolYear(profile.year),
      campusInterest: profile.doubts || undefined,
      ageBand: "unknown",
      preferredLanguage: "es-PE",
      familyShareEnabled: false,
      interests: profile.interests,
      strengths: profile.skills,
      concerns: profile.worry ? [profile.worry] : [],
      source: "onboarding",
      metadata: {
        frontend: "utp-match",
      },
    };

    const json = await apiClient.post<unknown, StudentProfileCreateDto>(
      endpoints.profiles.create,
      body,
    );

    return unwrapKey<StudentProfileDto>(json, "profile");
  },

  async getCurrentProfile(profileId?: string | null) {
    const json = await apiClient.get<unknown>(endpoints.profiles.me, {
      headers: profileId ? { "x-student-profile-id": profileId } : undefined,
    });

    return unwrapKey<StudentProfileDto>(json, "profile");
  },
};
