import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { unwrapKey } from "../lib/apiResponse";
import type { AuthSessionDto } from "../types/api";

type CreateGuestSessionInput = {
  displayName?: string;
  source?: "web";
  metadata?: Record<string, unknown>;
};

export const authService = {
  async createGuestSession(input: CreateGuestSessionInput) {
    const json = await apiClient.post<unknown, CreateGuestSessionInput>(
      endpoints.auth.guestSession,
      {
        displayName: input.displayName,
        source: "web",
        metadata: input.metadata ?? {},
      },
    );

    return unwrapKey<AuthSessionDto>(json, "session");
  },

  async logout(accessToken?: string) {
    const json = await apiClient.post<unknown, { accessToken?: string }>(
      endpoints.auth.logout,
      { accessToken },
    );

    return unwrapKey<boolean>(json, "revoked");
  },
};
