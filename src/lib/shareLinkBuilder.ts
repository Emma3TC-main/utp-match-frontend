class ShareLinkBuilder {
  build(planId?: string, comparisonId?: string): string {
    const url = new URL(window.location.origin);

    url.pathname = "/summary";

    if (planId) {
      url.searchParams.set("planId", planId);
    }

    if (comparisonId) {
      url.searchParams.set("comparisonId", comparisonId);
    }

    return url.toString();
  }
}

export const shareLinkBuilder = new ShareLinkBuilder();
