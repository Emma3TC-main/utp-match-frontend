import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import { unwrapKey } from "../lib/apiResponse";
import type { ShareCreateDto, SharedSummaryDto, ShareRecordDto } from "../types/api";

export const shareService = {
  async createShare(input: ShareCreateDto) {
    const json = await apiClient.post<unknown, ShareCreateDto>(
      endpoints.shares.create,
      {
        ...input,
        metadata: input.metadata ?? {
          source: "frontend",
        },
      },
    );

    return unwrapKey<ShareRecordDto>(json, "share");
  },

  async getSharedSummary(token: string) {
    const json = await apiClient.get<unknown>(endpoints.shares.detail(token));
    return unwrapKey<SharedSummaryDto>(json, "summary");
  },
};
