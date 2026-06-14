import { apiClient } from "../lib/apiClient";
import { endpoints } from "../lib/endpoints";
import type { EventLogCreateDto } from "../types/api";

export const eventService = {
  async track(eventName: string, eventProps: Record<string, unknown> = {}) {
    try {
      await apiClient.post<unknown, EventLogCreateDto>(endpoints.events.create, {
        eventName,
        source: "web",
        occurredAt: new Date().toISOString(),
        eventProps,
      });
    } catch (error) {
      console.warn("[analytics:error]", eventName, error);
    }
  },
};
