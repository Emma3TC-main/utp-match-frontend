import { apiClient } from "../lib/apiClient";
import { unwrapKey } from "../lib/apiResponse";
import { endpoints } from "../lib/endpoints";

export type AdminOverview = {
  totals: {
    records: number;
    careers: number;
    syllabi: number;
    auditEvents: number;
  };
  byStatus: {
    draft: number;
    published: number;
    archived: number;
  };
  lastUpdatedAt: string | null;
};

export const adminService = {
  async getOverview() {
    const json = await apiClient.get<unknown>(endpoints.admin.overview);
    return unwrapKey<AdminOverview>(json, "overview");
  },
};
