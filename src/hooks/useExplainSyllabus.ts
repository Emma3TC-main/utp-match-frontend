import { useState } from "react";
import { analyticsClient } from "../lib/analyticsClient";
import { syllabusService } from "../services/syllabusService";
import type { CourseViewModel, ExplanationViewModel } from "../types/domain";

type ExplainSyllabusInput = {
  studentProfileId: string;
  course: CourseViewModel;
};

export function useExplainSyllabus() {
  const [data, setData] = useState<ExplanationViewModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate(input: ExplainSyllabusInput) {
    try {
      setLoading(true);
      setError(null);

      const explanation = await syllabusService.explainSyllabus(input);

      setData(explanation);

      analyticsClient.track("syllabus_explained", {
        courseId: input.course.id,
      });

      return explanation;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error explicando sílabo.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    mutate,
    data,
    loading,
    error,
  };
}
