type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

class AnalyticsClient {
  track(name: string, props?: AnalyticsProps): void {
    console.info("[analytics]", name, props ?? {});
    void import("../services/eventService").then(({ eventService }) =>
      eventService.track(name, props ?? {}),
    );
  }
}

export const analyticsClient = new AnalyticsClient();
